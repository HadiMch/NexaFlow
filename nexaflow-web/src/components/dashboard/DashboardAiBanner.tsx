
import { Link } from 'react-router'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function DashboardAiBanner() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 px-6 py-7 text-white shadow-lg shadow-indigo-200/50 sm:px-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/15"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -bottom-28 h-64 w-64 rounded-full border border-white/10 bg-white/5"
      />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-5">
        <div className="max-w-xl">
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-indigo-100">
            <Sparkles size={16} />
            NexaFlow AI
          </div>

          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
            Your business, powered by intelligence.
          </h2>

          <p className="mt-2 text-sm leading-6 text-indigo-100">
            Ask questions, explore business statistics,
            and get practical recommendations with your
            AI Assistant.
          </p>
        </div>

        <Link
          to="/ai-assistant"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
        >
          Open AI Assistant
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  )
}
