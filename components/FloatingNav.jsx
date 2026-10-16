"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Image as ImageIcon, LayoutGrid, User } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const ICONS = { home: Home, user: User, book: BookOpen, grid: LayoutGrid, image: ImageIcon };

const isActive = (href, path) => (href === "/" ? path === "/" : path === href || path.startsWith(`${href}/`));

export default function FloatingNav({ items }) {
  const pathname = usePathname() ?? "/";

  return (
    <nav
      aria-label="Primary"
      className="glass fixed left-1/2 top-4 z-50 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full p-1.5"
    >
      {items.map(({ href, label, icon }) => {
        const Icon = ICONS[icon] ?? Home;
        const on = isActive(href, pathname);
        return (
          <Link
            key={href}
            href={href}
            aria-current={on ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition duration-200 ${
              on ? "bg-slate-900/10 dark:bg-white/15" : "hover:bg-slate-900/5 dark:hover:bg-white/10"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className={icon === "home" ? "sr-only" : "hidden sm:inline"}>{label}</span>
          </Link>
        );
      })}
      <span className="mx-1 h-5 w-px shrink-0 bg-slate-900/10 dark:bg-white/10" />
      <ThemeToggle />
    </nav>
  );
}
