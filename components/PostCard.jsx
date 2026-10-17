import Link from "next/link";
import Reveal from "./Reveal";
import { asArray, formatMonth } from "@/lib/format";
import { readingTime } from "@/lib/text";

/** variant="feature" is the wide image-left layout used for the newest post. */
export default function PostCard({ post, index = 0, variant = "card" }) {
  const { slug, title, excerpt, coverUrl, tags, publishedAt, content } = post;
  const minutes = readingTime(content);
  const feature = variant === "feature";

  return (
    <Reveal delay={Math.min(index, 6) * 70} className={`h-full ${feature ? "md:col-span-2 lg:col-span-3" : ""}`}>
      <article className={`glass glass-hover group relative flex h-full overflow-hidden rounded-2xl ${feature ? "flex-col md:flex-row" : "flex-col"}`}>
        {coverUrl && (
          <div className={`relative overflow-hidden ${feature ? "aspect-[16/10] md:w-1/2" : "aspect-[16/9]"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverUrl} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
          </div>
        )}
        <div className={`flex flex-1 flex-col justify-center p-5 ${feature ? "md:p-10" : ""}`}>
          <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {formatMonth(publishedAt)}
            {minutes > 0 && ` · ${minutes} min read`}
          </p>
          <h3 className={`mt-2 font-semibold tracking-tight ${feature ? "text-2xl sm:text-3xl" : "text-xl"}`}>
            <Link href={`/blog/${slug}`} className="after:absolute after:inset-0 after:content-['']">
              {title}
            </Link>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{excerpt}</p>
          {asArray(tags).length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </Reveal>
  );
}
