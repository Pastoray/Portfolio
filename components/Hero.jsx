import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Typewriter from "./Typewriter";
import SocialLinks from "./SocialLinks";
import { asArray } from "@/lib/format";

const initial = (name) => name?.replace(/[^\p{L}\p{N}]/gu, "").charAt(0).toUpperCase() || "•";

export default function Hero({ profile, hasProjects }) {
  const { fullName, intro = {}, heroWords, socials, avatarUrl, availability } = profile;
  const words = asArray(heroWords);
  const hasIntro = intro.prefix || intro.emphasis || intro.suffix;

  return (
    <section id="top" className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-36 sm:px-8 lg:grid-cols-12 lg:items-end lg:pt-48">
      {/* Left: greeting + typed display word + actions */}
      <div className="animate-rise lg:col-span-6">
        <p className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Hi, I&apos;m {fullName}
        </p>

        {words.length > 0 && (
          <h1 className="mt-6 min-h-[1.05em] text-6xl font-semibold leading-none tracking-tighter sm:text-7xl lg:text-[6.5rem]">
            <Typewriter words={words} />
          </h1>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {hasProjects && (
            <Link href="/work" className="btn-primary">
              View my work <ArrowRight className="h-4 w-4" />
            </Link>
          )}
          <a href="#contact" className="btn-glass">
            Get in touch
          </a>
          <SocialLinks socials={socials} className="ml-1" />
        </div>
      </div>

      {/* Right: intro statement + about pill */}
      <div className="animate-rise lg:col-span-6" style={{ animationDelay: "150ms" }}>
        {hasIntro && (
          <p className="text-2xl font-medium leading-snug text-slate-500 sm:text-3xl dark:text-slate-400">
            {intro.prefix}
            {intro.emphasis && <strong className="font-semibold text-slate-800 dark:text-slate-100">{intro.emphasis}</strong>}
            {intro.suffix}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/about" className="glass glass-hover group inline-flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-5 text-sm font-medium">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarUrl} alt="" className="h-9 w-9 rounded-full object-cover" />
            ) : (
              <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-900/10 text-sm font-semibold dark:bg-white/15">{initial(fullName)}</span>
            )}
            About – {fullName}
            <ArrowUpRight className="h-4 w-4 opacity-60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          {availability && <span className="badge">{availability}</span>}
        </div>
      </div>
    </section>
  );
}
