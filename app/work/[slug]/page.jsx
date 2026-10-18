import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getPortfolioData } from "@/lib/data";
import { asArray, formatMonth } from "@/lib/format";
import RichText from "@/components/RichText";

export const revalidate = 60;

export async function generateStaticParams() {
  const { projects } = await getPortfolioData();
  return asArray(projects).map((p) => ({ slug: p.slug }));
}

async function find(params) {
  const { slug } = await params;
  const { projects } = await getPortfolioData();
  return asArray(projects).find((p) => p.slug === slug);
}

export async function generateMetadata({ params }) {
  const project = await find(params);
  return project ? { title: project.title, description: project.summary } : {};
}

export default async function ProjectPage({ params }) {
  const project = await find(params);
  if (!project) notFound();
  const { title, summary, description, body, imageUrl, liveUrl, repoUrl, technologies, publishedAt } = project;

  return (
    <article className="mx-auto w-full max-w-4xl px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
      <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>
      <p className="mt-8 text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">{formatMonth(publishedAt)}</p>
      <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tighter sm:text-6xl">{title}</h1>
      <p className="mt-5 text-xl text-slate-500 dark:text-slate-400">{summary}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noreferrer noopener" className="btn-primary">
            <ExternalLink className="h-4 w-4" /> Live site
          </a>
        )}
        {repoUrl && (
          <a href={repoUrl} target="_blank" rel="noreferrer noopener" className="btn-glass">
            <Github className="h-4 w-4" /> Source code
          </a>
        )}
      </div>

      {imageUrl && (
        <div className="glass mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mt-10 space-y-5 text-lg leading-relaxed">
        <RichText value={body} fallback={description} />
      </div>

      {asArray(technologies).length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-2">
          {technologies.map((t) => (
            <li key={t} className="chip !px-3 !py-1 !text-sm">
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
