import { getPortfolioData } from "@/lib/data";
import { buildStats } from "@/lib/stats";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Experience from "@/components/Experience";
import SkillsGrid from "@/components/SkillsGrid";
import Contact from "@/components/Contact";

export const revalidate = 60;
export const metadata = { title: "About" };

export default async function AboutPage() {
  const data = await getPortfolioData();
  const { profile, pages, work, education, skills } = data;

  return (
    <>
      <About profile={profile} />
      <Stats stats={buildStats(data)} />
      <Experience work={work} education={education} title={pages.about.experience} />
      <SkillsGrid skills={skills} title={pages.about.skills} />
      <Contact profile={profile} />
    </>
  );
}
