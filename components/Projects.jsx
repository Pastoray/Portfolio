import ProjectCard from "./ProjectCard";
import { asArray } from "@/lib/format";

export default function ProjectGrid({ projects }) {
  const list = asArray(projects);
  if (!list.length) return null;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3">
      {list.map((p, i) => (
        <ProjectCard key={p.id ?? p.slug} project={p} index={i} />
      ))}
    </div>
  );
}
