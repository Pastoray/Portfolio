import Link from "next/link";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-5 pb-20 pt-44 sm:px-8">
      <p className="mb-3 text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">404</p>
      <h1 className="text-5xl font-semibold tracking-tighter sm:text-7xl">
        Page not found<span className="text-sky-500">.</span>
      </h1>
      <p className="mt-5 max-w-lg text-lg text-slate-500 dark:text-slate-400">That page doesn&apos;t exist, or it has moved.</p>
      <Link href="/" className="btn-primary mt-8">
        Back home
      </Link>
    </div>
  );
}
