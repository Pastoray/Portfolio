import Section from "./ui/Section";
import Reveal from "./Reveal";
import { asArray } from "@/lib/format";

/** Skills grouped by category. Categories come from the data, so new ones appear automatically. */
export default function SkillsGrid({ skills, title }) {
  const items = asArray(skills);
  const categories = [...new Set(items.map((s) => s.category || "General"))];

  return (
    <Section id="skills" title={title} isEmpty={items.length === 0}>
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal key={cat} delay={i * 70}>
            <div className="glass glass-hover h-full rounded-2xl p-5">
              <dt className="mb-3 text-sm font-semibold">{cat}</dt>
              <dd className="flex flex-wrap gap-2">
                {items
                  .filter((s) => (s.category || "General") === cat)
                  .map((s) => (
                    <span key={s.name} className="chip">
                      {s.name}
                    </span>
                  ))}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
