import Section from "./ui/Section";
import Timeline from "./Timeline";
import { asArray } from "@/lib/format";

export default function Experience({ work, education, title }) {
  const hasWork = asArray(work).length > 0;
  const hasEdu = asArray(education).length > 0;

  return (
    <Section id="experience" title={title} isEmpty={!hasWork && !hasEdu}>
      {/* Asymmetric: work gets 7 columns, education 5. A lone column takes the full width. */}
      <div className="grid gap-12 lg:grid-cols-12">
        {hasWork && (
          <div className={hasEdu ? "lg:col-span-7" : "lg:col-span-12"}>
            <Timeline title="Work experience" items={work} />
          </div>
        )}
        {hasEdu && (
          <div className={hasWork ? "lg:col-span-5" : "lg:col-span-12"}>
            <Timeline title="Education" items={education} />
          </div>
        )}
      </div>
    </Section>
  );
}
