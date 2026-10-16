export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="mx-auto w-full max-w-6xl px-5 pb-6 pt-36 sm:px-8 sm:pt-44">
      {eyebrow && <p className="animate-rise mb-3 text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">{eyebrow}</p>}
      <h1 className="animate-rise text-5xl font-semibold leading-[1.05] tracking-tighter sm:text-7xl" style={{ animationDelay: "60ms" }}>
        {title}
      </h1>
      {subtitle && (
        <p className="animate-rise mt-5 max-w-2xl text-lg text-slate-500 dark:text-slate-400" style={{ animationDelay: "120ms" }}>
          {subtitle}
        </p>
      )}
    </header>
  );
}
