import { RotateCcw, Plus, Sparkles } from "lucide-react";

interface AiPageHeaderProps {
  onResetSize: () => void;
  onNewChat: () => void;
}

export default function AiPageHeader({
  onResetSize,
  onNewChat,
}: AiPageHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
            <Sparkles size={13} />
            AI Workspace
          </span>

          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Powered by Groq
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          NexaFlow AI Assistant
        </h1>

        <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          Your intelligent workspace for business insights, productivity, and
          ideas.
        </p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onResetSize}
          className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 md:inline-flex"
        >
          <RotateCcw size={15} />
          Reset Size
        </button>

        <button
          type="button"
          onClick={onNewChat}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20 transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          <Plus size={17} strokeWidth={2.5} />
          New Chat
        </button>
      </div>
    </header>
  );
}
