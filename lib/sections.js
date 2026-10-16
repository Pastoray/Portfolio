import { asArray } from "./format";

/**
 * Route registry. The navigation and footer are derived from this list, so
 * adding data adds a route entry and removing all items for a content type
 * removes it. `icon` is a key resolved in components/FloatingNav.jsx.
 */
export function buildSections({ projects, posts, gallery }) {
  return [
    { href: "/", label: "Home", icon: "home", show: true },
    { href: "/about", label: "About", icon: "user", show: true },
    { href: "/blog", label: "Blog", icon: "book", show: asArray(posts).length > 0 },
    { href: "/work", label: "Work", icon: "grid", show: asArray(projects).length > 0 },
    { href: "/gallery", label: "Gallery", icon: "image", show: asArray(gallery).length > 0 },
  ].filter((s) => s.show);
}
