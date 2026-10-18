import { PortableText } from "@portabletext/react";
import { imageUrl } from "@/lib/sanity/image";
import { paragraphs } from "@/lib/text";

// Headings use `!mt-*` because the parent's `space-y-*` would otherwise override the margin.
const components = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2 className="!mt-12 text-3xl font-semibold tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="!mt-10 text-2xl font-semibold tracking-tight">{children}</h3>,
    h4: ({ children }) => <h4 className="!mt-8 text-xl font-semibold">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-sky-500/60 pl-5 italic text-slate-600 dark:text-slate-300">{children}</blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
  },

  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-slate-900/10 px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/10">{children}</code>
    ),
    link: ({ children, value }) => {
      const href = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer noopener" : undefined}
          className="underline decoration-sky-500/60 underline-offset-4 transition hover:decoration-sky-500"
        >
          {children}
        </a>
      );
    },
  },

  types: {
    image: ({ value }) => {
      const src = imageUrl(value, { width: 1600 });
      if (!src) return null;
      return (
        <figure className="my-2">
          <div className="glass overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={value.alt ?? ""} loading="lazy" className="w-full" />
          </div>
          {value.caption && <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">{value.caption}</figcaption>}
        </figure>
      );
    },

    code: ({ value }) => {
      if (!value?.code) return null;
      const label = value.filename || (value.language && value.language !== "text" ? value.language : null);
      return (
        <figure className="my-2">
          {label && <figcaption className="mb-2 font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</figcaption>}
          <pre className="glass overflow-x-auto rounded-xl p-4 text-sm leading-relaxed">
            <code className="font-mono">{value.code}</code>
          </pre>
        </figure>
      );
    },
  },
};

/**
 * Renders a Sanity Portable Text body. When there is none (for example content that
 * still comes from data/portfolioConfig.js), it falls back to plain-text paragraphs.
 * Render it inside a container that sets the spacing, e.g. `space-y-6 text-lg leading-relaxed`.
 */
export default function RichText({ value, fallback }) {
  if (Array.isArray(value) && value.length > 0) {
    return <PortableText value={value} components={components} />;
  }
  return paragraphs(fallback).map((p, i) => <p key={i}>{p}</p>);
}
