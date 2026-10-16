import Link from "next/link";
import SocialLinks from "./SocialLinks";

export default function Footer({ profile, items }) {
  return (
    <footer className="mx-auto mt-10 w-full max-w-6xl px-5 pb-10 sm:px-8">
      <div className="glass flex flex-col items-center justify-between gap-6 rounded-2xl px-6 py-6 sm:flex-row">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium">
          {items.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <SocialLinks socials={profile.socials} />
      </div>
    </footer>
  );
}
