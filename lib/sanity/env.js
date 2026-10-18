// Publishable values only (safe in the browser bundle). No secrets live here.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Keep this hard-coded: it pins the query API behaviour. Bump it deliberately.
export const apiVersion = "2026-10-17";

/** False when NEXT_PUBLIC_SANITY_PROJECT_ID is not set: the site then runs from data/portfolioConfig.js alone. */
export const hasSanity = Boolean(projectId);
