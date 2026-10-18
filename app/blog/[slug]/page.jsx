import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPortfolioData } from "@/lib/data";
import { asArray, formatMonth } from "@/lib/format";
import { readingTime } from "@/lib/text";
import RichText from "@/components/RichText";

export const revalidate = 60;

export async function generateStaticParams() {
  const { posts } = await getPortfolioData();
  return asArray(posts).map((p) => ({ slug: p.slug }));
}

async function find(params) {
  const { slug } = await params;
  const { posts } = await getPortfolioData();
  return asArray(posts).find((p) => p.slug === slug);
}

export async function generateMetadata({ params }) {
  const post = await find(params);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }) {
  const post = await find(params);
  if (!post) notFound();
  const { title, excerpt, content, body, coverUrl, tags, publishedAt } = post;
  const minutes = readingTime(content);

  return (
    <article className="mx-auto w-full max-w-3xl px-5 pb-16 pt-36 sm:px-8 sm:pt-44">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>
      <p className="mt-8 text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">
        {formatMonth(publishedAt)}
        {minutes > 0 && ` · ${minutes} min read`}
      </p>
      <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tighter sm:text-6xl">{title}</h1>
      <p className="mt-5 text-xl text-slate-500 dark:text-slate-400">{excerpt}</p>

      {coverUrl && (
        <div className="glass mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverUrl} alt="" className="h-full w-full object-cover" />
        </div>
      )}

      <div className="mt-10 space-y-6 text-lg leading-relaxed">
        <RichText value={body} fallback={content} />
      </div>

      {asArray(tags).length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t} className="chip !px-3 !py-1 !text-sm">
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
