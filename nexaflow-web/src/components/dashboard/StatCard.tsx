
import type { LucideIcon } from 'lucide-react'
import { AlertCircle } from 'lucide-react'
import { StatCardSkeleton } from '../ui/Skeleton'

type StatTone =
  | 'indigo'
  | 'blue'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'violet'

interface StatCardProps {
  title: string
  value: string | number | undefined | null
  icon: LucideIcon
  description?: string
  tone?: StatTone
  loading?: boolean
  error?: string
}

const toneStyles: Record<
  StatTone,
  { icon: string; background: string; accent: string }
> = {
  indigo: {
    icon: 'text-indigo-600',
    background: 'bg-indigo-50',
    accent: 'bg-indigo-500',
  },
  blue: {
    icon: 'text-sky-600',
    background: 'bg-sky-50',
    accent: 'bg-sky-500',
  },
  emerald: {
    icon: 'text-emerald-600',
    background: 'bg-emerald-50',
    accent: 'bg-emerald-500',
  },
  amber: {
    icon: 'text-amber-600',
    background: 'bg-amber-50',
    accent: 'bg-amber-500',
  },
  rose: {
    icon: 'text-rose-600',
    background: 'bg-rose-50',
    accent: 'bg-rose-500',
  },
  violet: {
    icon: 'text-violet-600',
    background: 'bg-violet-50',
    accent: 'bg-violet-500',
  },
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  description,
  tone = 'indigo',
  loading = false,
  error,
}: StatCardProps) {
  if (loading) {
    return <StatCardSkeleton />
  }

  const styles = toneStyles[tone]
  const displayValue =typeof value === 'number' ? value.toLocaleString() : (value ?? '—')

  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50">
      {/* Top accent */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-1 ${styles.accent}`}
      />

      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 pt-1 text-sm font-medium leading-5 text-slate-500">
          {title}
        </p>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.background}`}
        >
          <Icon
            size={21}
            strokeWidth={1.9}
            className={styles.icon}
            aria-hidden="true"
          />
        </div>
      </div>

      {error ? (
        <div
          role="alert"
          className="mt-5 flex items-center gap-2 text-sm text-rose-600"
        >
          <AlertCircle size={17} className="shrink-0" />
          <span>{error}</span>
        </div>
      ) : (
        <p className="mt-4 break-words text-3xl font-bold tracking-tight text-slate-900">
          {displayValue}
        </p>
      )}

      {description && (
        <p className="mt-auto pt-3 text-xs leading-5 text-slate-400">
          {description}
        </p>
      )}
    </article>
  )
}