import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

/**
 * Shared section shell. Returns null when `isEmpty` so empty arrays never leave
 * orphaned headings or gaps in the layout.
 */
export default function Section({ id, title, eyebrow, action, isEmpty = false, children, className = "" }) {
  if (isEmpty) return null;
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20 ${className}`}>
      {(title || eyebrow || action) && (
        <Reveal as="header" className="mb-10 flex items-end justify-between gap-4">
          <div>
            {eyebrow && <p className="mb-2 text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">{eyebrow}</p>}
            {title && <h2 className="section-title">{title}</h2>}
          </div>
          {action && (
            <Link href={action.href} className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
              {action.label}
              <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          )}
        </Reveal>
      )}
      {children}
    </section>
  );
}
