import { getPortfolioData } from "@/lib/data";
import { asArray } from "@/lib/format";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import PostCard from "@/components/PostCard";

export const revalidate = 60;
export const metadata = { title: "Blog" };

export default async function BlogPage() {
  const { posts, pages } = await getPortfolioData();
  const list = asArray(posts);

  return (
    <>
      <PageHeader eyebrow={pages.blog.eyebrow} title={pages.blog.title} subtitle={pages.blog.subtitle} />
      {list.length === 0 ? (
        <EmptyState title="No articles yet" text="New posts will show up here." />
      ) : (
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 pb-16 pt-6 sm:grid-cols-2 sm:px-8 lg:grid-cols-3">
          {list.map((p, i) => (
            <PostCard key={p.id ?? p.slug} post={p} index={i} variant={i === 0 ? "feature" : "card"} />
          ))}
        </div>
      )}
    </>
  );
}
