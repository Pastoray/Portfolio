import { Code2 } from "lucide-react";
import Section from "./ui/Section";
import { asArray } from "@/lib/format";

function Badge({ skill, hidden }) {
  return (
    <li aria-hidden={hidden || undefined} className={`badge shrink-0 !px-4 !py-2.5 ${hidden ? "motion-reduce:hidden" : ""}`}>
      {skill.iconSlug ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`https://cdn.simpleicons.org/${encodeURIComponent(skill.iconSlug)}`} alt="" width={20} height={20} loading="lazy" className="h-5 w-5" />
      ) : (
        <Code2 className="h-4 w-4 opacity-60" />
      )}
      {skill.name}
    </li>
  );
}

/**
 * One auto-scrolling badge row. Items are repeated until a half-track is wide enough,
 * then the track is doubled so translateX(-50%) loops seamlessly.
 */
function MarqueeRow({ items, reverse = false }) {
  if (!items.length) return null;
  const reps = Math.max(1, Math.ceil(14 / items.length));
  const half = Array.from({ length: reps }, () => items).flat();
  const track = [...half, ...half];

  return (
    <div className="mask-fade-x overflow-hidden motion-reduce:overflow-x-auto">
      <ul className={`flex w-max gap-3 hover:[animation-play-state:paused] motion-reduce:animate-none ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {track.map((s, i) => (
          <Badge key={`${s.name}-${i}`} skill={s} hidden={i >= items.length} />
        ))}
      </ul>
    </div>
  );
}

export default function TechStack({ skills, title }) {
  const items = asArray(skills);
  const split = items.length >= 6;
  const rowA = split ? items.filter((_, i) => i % 2 === 0) : items;
  const rowB = split ? items.filter((_, i) => i % 2 === 1) : [];

  return (
    <Section id="stack" title={title} isEmpty={items.length === 0}>
      <div className="space-y-3">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </Section>
  );
}
