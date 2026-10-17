import ProjectCard from "./ProjectCard";
import { assignSpans } from "@/lib/layout";
import { asArray } from "@/lib/format";

export default function ProjectGrid({ projects }) {
  const list = asArray(projects);
  if (!list.length) return null;

  const placed = assignSpans(list, (p) => p.featured);
  const odd = list.length % 2 === 1; // 2-column tablet layout: let the last card fill the row

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
      {placed.map(({ item, span, cols }, i) => (
        <ProjectCard
          key={item.id ?? item.slug}
          project={item}
          index={i}
          cols={cols}
          spanClass={`${odd && i === placed.length - 1 ? "sm:col-span-2" : ""} ${span}`}
        />
      ))}
    </div>
  );
}
