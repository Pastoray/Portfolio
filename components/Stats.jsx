import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function Stats({ stats }) {
  if (!stats?.length) return null;
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <dl className="glass grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-slate-900/10 p-0 dark:bg-white/10 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 80} className="bg-white/60 px-6 py-7 dark:bg-slate-950/60">
            <dd className="gradient-text text-4xl font-semibold tracking-tight sm:text-5xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </dd>
            <dt className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.label}</dt>
          </Reveal>
        ))}
      </dl>
    </div>
  );
}
