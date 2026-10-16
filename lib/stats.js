import { asArray } from "./format";

const YEAR_MS = 365.25 * 24 * 3600 * 1000;

/** Derives headline numbers from the data itself, so nothing here is hardcoded. Zero values are omitted. */
export function buildStats({ work, projects, skills, posts }) {
  const starts = asArray(work)
    .map((w) => new Date(w.startDate).getTime())
    .filter(Number.isFinite)
    .sort((a, b) => a - b);
  const years = starts.length ? Math.max(1, Math.round((Date.now() - starts[0]) / YEAR_MS)) : 0;

  return [
    { value: years, suffix: "+", label: "Years of experience" },
    { value: asArray(projects).length, suffix: "", label: "Projects shipped" },
    { value: asArray(skills).length, suffix: "", label: "Technologies" },
    { value: asArray(posts).length, suffix: "", label: "Articles written" },
  ].filter((s) => s.value > 0);
}
