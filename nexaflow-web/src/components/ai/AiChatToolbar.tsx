import { Bot, Sparkles } from "lucide-react";

export default function AiChatToolbar() {
  return (
    <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 bg-white/95 px-4 py-3.5 dark:border-slate-700 dark:bg-slate-900/95 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-500/20">
          <Bot size={23} strokeWidth={1.8} />

          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-violet-500 dark:border-slate-900">
            <Sparkles size={9} />
          </span>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              NexaFlow AI
            </h2>

            <span className="hidden rounded-md bg-indigo-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300 sm:inline-flex">
              Assistant
            </span>
          </div>

          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
            GPT-OSS 20B · GroqCloud
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />

        <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Groq-powered
        </span>
      </div>
    </div>
  );
}
