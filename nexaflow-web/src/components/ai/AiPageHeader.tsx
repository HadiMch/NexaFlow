
interface AiPageHeaderProps {
  onResetSize: () => void
  onNewChat: () => void
}

export default function AiPageHeader({
  onResetSize,
  onNewChat,
}: AiPageHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-3">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            AI WORKSPACE
          </span>

          <span className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Powered by Groq
          </span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          NexaFlow AI Assistant
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Business intelligence, productivity, and ideas.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onResetSize}
          className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 md:block"
        >
          Reset Size
        </button>

        <button
          type="button"
          onClick={onNewChat}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
        >
          + New Chat
        </button>
      </div>
    </header>
  )
}
