import { cache } from "react";
import * as config from "@/data/portfolioConfig";
import { hasSanity } from "@/lib/sanity/env";
import { getClient } from "@/lib/sanity/client";
import { imageUrl } from "@/lib/sanity/image";
import { PROJECTS_QUERY, POSTS_QUERY, GALLERY_QUERY } from "@/lib/sanity/queries";

const REVALIDATE_SECONDS = 60; // new Sanity content appears within a minute, no redeploy

const list = (v) => (Array.isArray(v) ? v : []);
const byDateDesc = (field) => (a, b) => new Date(b[field] ?? 0) - new Date(a[field] ?? 0);

/** Everything from data/portfolioConfig.js. Also the fallback for Sanity-managed content. */
function fromConfig() {
  return {
    profile: config.profile,
    pages: config.pages,
    work: [...list(config.workExperience)].sort(byDateDesc("startDate")),
    education: [...list(config.education)].sort(byDateDesc("startDate")),
    projects: [...list(config.projects)].sort(byDateDesc("publishedAt")),
    posts: [...list(config.posts)].sort(byDateDesc("publishedAt")),
    gallery: [...list(config.gallery)].sort(byDateDesc("takenAt")),
    skills: [...list(config.skills)].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    source: "config",
  };
}

// Sanity documents -> the same shapes the components already use.

const mapProject = (p) => ({
  id: p._id,
  slug: p.slug,
  title: p.title,
  summary: p.summary,
  description: p.description ?? "", // plain text of the body, used as a fallback
  body: p.body ?? null, // Portable Text, rendered by components/RichText.jsx
  imageUrl: imageUrl(p.image),
  liveUrl: p.liveUrl ?? null,
  repoUrl: p.repoUrl ?? null,
  technologies: list(p.technologies),
  featured: Boolean(p.featured),
  publishedAt: p.publishedAt,
});

const mapPost = (p) => ({
  id: p._id,
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  content: p.content ?? "", // plain text, used for reading time
  body: p.body ?? null,
  coverUrl: imageUrl(p.coverImage),
  tags: list(p.tags),
  publishedAt: p.publishedAt,
});

const mapGalleryItem = (g) => ({
  id: g._id,
  title: g.title ?? null,
  caption: g.caption ?? null,
  imageUrl: imageUrl(g.image),
  takenAt: g.takenAt,
});

let warned = false;

/**
 * Loads everything the site needs. Wrapped in React `cache` so the layout, pages and
 * generateMetadata share one set of queries per request.
 *
 *  - Projects, blog posts and gallery come from Sanity (published content only).
 *  - Profile, skills, work history, education and page copy come from data/portfolioConfig.js.
 *  - If NEXT_PUBLIC_SANITY_PROJECT_ID is missing, or Sanity can't be reached, the site falls back
 *    to the content in the config file instead of breaking.
 */
export const getPortfolioData = cache(async () => {
  const base = fromConfig();

  if (!hasSanity) {
    if (!warned) {
      warned = true;
      console.warn("[getPortfolioData] NEXT_PUBLIC_SANITY_PROJECT_ID is not set - using content from data/portfolioConfig.js.");
    }
    return base;
  }

  try {
    const client = getClient();
    const options = { next: { revalidate: REVALIDATE_SECONDS } };
    const [projects, posts, gallery] = await Promise.all([
      client.fetch(PROJECTS_QUERY, {}, options),
      client.fetch(POSTS_QUERY, {}, options),
      client.fetch(GALLERY_QUERY, {}, options),
    ]);

    return {
      ...base,
      projects: list(projects).map(mapProject),
      posts: list(posts).map(mapPost),
      gallery: list(gallery).map(mapGalleryItem).filter((g) => g.imageUrl),
      source: "sanity",
    };
  } catch (err) {
    console.error("[getPortfolioData] Sanity request failed, using content from data/portfolioConfig.js:", err?.message ?? err);
    return base;
  }
});
