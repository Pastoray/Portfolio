import { getPortfolioData } from "@/lib/data";
import { buildStats } from "@/lib/stats";
import { asArray } from "@/lib/format";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import TechStack from "@/components/TechStack";
import Section from "@/components/ui/Section";
import ProjectGrid from "@/components/Projects";
import PostCard from "@/components/PostCard";
import Contact from "@/components/Contact";

export const revalidate = 60;

export default async function HomePage() {
  const data = await getPortfolioData();
  const { profile, pages, skills } = data;
  const projects = asArray(data.projects);
  const posts = asArray(data.posts);

  // Featured first, then newest; show a teaser of three.
  const featuredWork = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)).slice(0, 3);

  return (
    <>
      <Hero profile={profile} hasProjects={projects.length > 0} />
      <Stats stats={buildStats(data)} />
      <TechStack skills={skills} title={pages.home.stack} />

      <Section
        title={pages.home.featuredWork}
        isEmpty={featuredWork.length === 0}
        action={projects.length > featuredWork.length ? { href: "/work", label: "All projects" } : { href: "/work", label: "Details" }}
      >
        <ProjectGrid projects={featuredWork} />
      </Section>

      <Section title={pages.home.latestPosts} isEmpty={posts.length === 0} action={{ href: "/blog", label: "All articles" }}>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <PostCard key={p.id ?? p.slug} post={p} index={i} />
          ))}
        </div>
      </Section>

      <Contact profile={profile} />
    </>
  );
}
