import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import Reveal from "./Reveal";
import { asArray, formatMonth } from "@/lib/format";

// Image shape per width on large screens (full class names for Tailwind).
const ASPECT = { 2: "", 3: "", 4: "lg:aspect-[16/8]", 6: "lg:aspect-[21/9]" };

/**
 * Whole card is clickable via a stretched title link; the external links sit above it.
 * The image area only exists when the project has an image, so text-only cards stay clean.
 */
export default function ProjectCard({ project, index = 0, spanClass = "", cols = 2 }) {
  const { slug, title, summary, imageUrl, liveUrl, repoUrl, technologies, publishedAt } = project;
  return (
    <Reveal delay={Math.min(index, 6) * 70} className={`h-full ${spanClass}`}>
      <article className="glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-2xl">
        {imageUrl && (
          <div className={`relative aspect-[16/10] overflow-hidden ${ASPECT[cols] ?? ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
          </div>
        )}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          {publishedAt && <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{formatMonth(publishedAt)}</p>}
          <h3 className="mt-1 text-xl font-semibold tracking-tight">
            <Link href={`/work/${slug}`} className="after:absolute after:inset-0 after:content-['']">
              {title}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{summary}</p>
          {asArray(technologies).length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {technologies.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {(liveUrl || repoUrl) && (
            <div className="relative z-10 mt-auto flex gap-4 pt-5 text-sm font-medium">
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:underline">
                  <ExternalLink className="h-4 w-4" /> Live
                </a>
              )}
              {repoUrl && (
                <a href={repoUrl} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:underline">
                  <Github className="h-4 w-4" /> Code
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}
