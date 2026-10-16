import { getPortfolioData } from "@/lib/data";
import { asArray } from "@/lib/format";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import ProjectGrid from "@/components/Projects";

export const revalidate = 60;
export const metadata = { title: "Work" };

export default async function WorkPage() {
  const { projects, pages } = await getPortfolioData();
  const list = asArray(projects);

  return (
    <>
      <PageHeader eyebrow={pages.work.eyebrow} title={pages.work.title} subtitle={pages.work.subtitle} />
      {list.length === 0 ? (
        <EmptyState title="No projects yet" text="New work will show up here." />
      ) : (
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-6 sm:px-8">
          <ProjectGrid projects={list} />
        </div>
      )}
    </>
  );
}
