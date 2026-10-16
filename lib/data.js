import { cache } from "react";
import * as config from "@/data/portfolioConfig";

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
  return fromConfig();
});
