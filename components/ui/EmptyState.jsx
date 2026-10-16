import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Nothing here yet", text = "Check back soon." }) {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="glass flex flex-col items-center gap-3 rounded-2xl px-6 py-16 text-center">
        <Inbox className="h-8 w-8 text-slate-400" />
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{text}</p>
      </div>
    </div>
  );
}
