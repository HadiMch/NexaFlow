
export default function AiChatToolbar() {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 font-bold text-white">
          N
        </div>

        <div>
          <p className="text-sm font-bold text-slate-900">
            NexaFlow AI
          </p>

          <p className="text-xs text-slate-500">
            GPT-OSS 20B · GroqCloud
          </p>
        </div>
      </div>

      <span className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Ready
      </span>
    </div>
  )
}
