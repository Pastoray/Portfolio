import { getPortfolioData } from "@/lib/data";
import { asArray } from "@/lib/format";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import Reveal from "@/components/Reveal";

export const revalidate = 60;
export const metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const { gallery, pages } = await getPortfolioData();
  const list = asArray(gallery);

  return (
    <>
      <PageHeader eyebrow={pages.gallery.eyebrow} title={pages.gallery.title} subtitle={pages.gallery.subtitle} />
      {list.length === 0 ? (
        <EmptyState title="Nothing in the gallery yet" text="New photos will show up here." />
      ) : (
        // CSS columns give a masonry layout with no layout math and no JS.
        <div className="mx-auto w-full max-w-6xl columns-1 gap-4 px-5 pb-16 pt-6 sm:columns-2 sm:px-8 lg:columns-3">
          {list.map((g, i) => (
            <Reveal key={g.id ?? g.key ?? g.imageUrl} delay={Math.min(i % 3, 2) * 80} className="mb-4 break-inside-avoid">
              <a href={g.imageUrl} target="_blank" rel="noreferrer noopener" className="glass group relative block overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.imageUrl} alt={g.title || g.caption || ""} loading="lazy" className="w-full transition duration-700 group-hover:scale-[1.04]" />
                {(g.title || g.caption) && (
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {g.title && <span className="block text-sm font-semibold">{g.title}</span>}
                    {g.caption && <span className="block text-xs text-white/80">{g.caption}</span>}
                  </span>
                )}
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}
