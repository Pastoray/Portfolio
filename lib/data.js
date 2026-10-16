import { cache } from "react";
import * as config from "@/data/portfolioConfig";
import { prisma, hasDatabase } from "./prisma";

const byDateDesc = (field) => (a, b) => new Date(b[field] ?? 0) - new Date(a[field] ?? 0);
const plain = (v) => JSON.parse(JSON.stringify(v)); // Dates -> ISO strings for client components

function fromConfig() {
  return {
    profile: config.profile,
    pages: config.pages,
    work: [...config.workExperience].sort(byDateDesc("startDate")),
    education: [...config.education].sort(byDateDesc("startDate")),
    projects: [...config.projects].sort(byDateDesc("publishedAt")),
    posts: [...config.posts].sort(byDateDesc("publishedAt")),
    gallery: [...config.gallery].sort(byDateDesc("takenAt")),
    skills: [...config.skills].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    source: "config",
  };
}

/**
 * Loads everything the site needs. Wrapped in React `cache` so the layout,
 * page and generateMetadata share one query per request.
 *
 * Uses the database when DATABASE_URL is set, otherwise (or on failure)
 * falls back to data/portfolioConfig.js so the site never renders broken.
 */
export const getPortfolioData = cache(async () => {
  if (!hasDatabase()) return fromConfig();
  try {
    const [profile, experiences, projects, posts, gallery, skills] = await Promise.all([
      prisma.profileInfo.findFirst({ orderBy: { updatedAt: "desc" } }),
      prisma.experience.findMany({ orderBy: { startDate: "desc" } }),
      prisma.project.findMany({ where: { visible: true }, orderBy: { publishedAt: "desc" } }),
      prisma.post.findMany({ where: { visible: true }, orderBy: { publishedAt: "desc" } }),
      prisma.galleryItem.findMany({ where: { visible: true }, orderBy: { takenAt: "desc" } }),
      prisma.skill.findMany({ where: { visible: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }] }),
    ]);
    const fallback = fromConfig();
    return plain({
      profile: profile ?? fallback.profile,
      pages: fallback.pages,
      work: experiences.filter((e) => e.type === "WORK"),
      education: experiences.filter((e) => e.type === "EDUCATION"),
      projects,
      posts,
      gallery,
      skills,
      source: "database",
    });
  } catch (err) {
    console.error("[getPortfolioData] database unavailable, using config:", err.message);
    return fromConfig();
  }
});
