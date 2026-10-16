import { Download, MapPin } from "lucide-react";
import SocialLinks from "./SocialLinks";
import LocalTime from "./LocalTime";
import Reveal from "./Reveal";
import { asArray } from "@/lib/format";

const initial = (name) => name?.replace(/[^\p{L}\p{N}]/gu, "").charAt(0).toUpperCase() || "•";

/** Profile header for the About route: portrait card on the left, name/headline/bio on the right. */
export default function About({ profile }) {
  const { fullName, headline, bio, location, timezone, avatarUrl, languages, resumeUrl, socials } = profile;
  const langs = asArray(languages);

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-10 pt-36 sm:px-8 lg:grid-cols-12 lg:pt-44">
      <Reveal className="glass flex flex-col items-center gap-4 self-start rounded-2xl p-8 text-center lg:col-span-4">
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt={fullName} className="h-44 w-44 rounded-full object-cover ring-1 ring-slate-900/10 dark:ring-white/20" />
        ) : (
          <div className="grid h-44 w-44 place-items-center rounded-full bg-gradient-to-br from-sky-400/30 to-indigo-400/30 text-6xl font-semibold">{initial(fullName)}</div>
        )}
        {(location || timezone) && (
          <div className="flex flex-col items-center gap-2">
            {location && (
              <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <MapPin className="h-4 w-4" />
                {location}
              </p>
            )}
            {timezone && <LocalTime timezone={timezone} />}
          </div>
        )}
        {langs.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2">
            {langs.map((l) => (
              <li key={l} className="chip">
                {l}
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      <div className="lg:col-span-8">
        <h1 className="animate-rise text-5xl font-semibold leading-none tracking-tighter sm:text-7xl">{fullName}</h1>
        {headline && (
          <p className="animate-rise mt-5 text-xl text-slate-500 sm:text-2xl dark:text-slate-400" style={{ animationDelay: "80ms" }}>
            {headline}
          </p>
        )}
        <div className="animate-rise mt-6" style={{ animationDelay: "140ms" }}>
          <SocialLinks socials={socials} />
        </div>
        {bio && (
          <p className="animate-rise mt-8 max-w-2xl text-lg leading-relaxed" style={{ animationDelay: "200ms" }}>
            {bio}
          </p>
        )}
        {resumeUrl && (
          <a href={resumeUrl} target="_blank" rel="noreferrer noopener" className="btn-glass mt-8">
            <Download className="h-4 w-4" />
            Download résumé
          </a>
        )}
      </div>
    </section>
  );
}
