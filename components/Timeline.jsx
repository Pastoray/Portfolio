import { MapPin } from "lucide-react";
import Reveal from "./Reveal";
import { asArray, formatRange } from "@/lib/format";

/** Generic timeline used for both work history and education. Renders nothing when empty. */
export default function Timeline({ title, items }) {
  const list = asArray(items);
  if (!list.length) return null;

  return (
    <div>
      <h3 className="mb-6 text-xl font-semibold tracking-tight">{title}</h3>
      <ol className="relative space-y-5 border-l border-slate-900/10 pl-6 dark:border-white/10">
        {list.map((item, i) => (
          <Reveal as="li" delay={Math.min(i, 5) * 80} key={item.id ?? item.key ?? `${item.organization}-${item.startDate}`} className="relative">
            <span className="absolute -left-[1.85rem] top-6 h-2.5 w-2.5 rounded-full bg-sky-500 ring-4 ring-slate-50 dark:ring-slate-950">
              {!item.endDate && <span className="absolute inset-0 animate-ping rounded-full bg-sky-400/70" />}
            </span>
            <div className="glass glass-hover rounded-2xl p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">{formatRange(item.startDate, item.endDate)}</p>
              <h4 className="mt-1 text-lg font-semibold">{item.title}</h4>
              <p className="text-slate-600 dark:text-slate-300">{item.organization}</p>
              {item.location && (
                <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                  <MapPin className="h-3.5 w-3.5" />
                  {item.location}
                </p>
              )}
              {item.description && <p className="mt-3 text-sm leading-relaxed">{item.description}</p>}
              {asArray(item.highlights).length > 0 && (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">
                  {item.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              {asArray(item.technologies).length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.technologies.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
