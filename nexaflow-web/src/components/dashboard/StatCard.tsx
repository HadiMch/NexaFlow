
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

  const displayValue =
    typeof value === 'number'
      ? value.toLocaleString()
      : value ?? '—'

  return (
    <article
      data-tone={tone}
      className="nf-stat-card nf-motion group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border p-5 shadow-sm hover:-translate-y-0.5"
    >
      <div
        aria-hidden="true"
        className="nf-stat-accent absolute inset-x-0 top-0 h-1"
      />

      <div className="flex items-start justify-between gap-3">
        <p className="nf-text-muted min-w-0 pt-1 text-sm font-medium leading-5">
          {title}
        </p>

        <div className="nf-stat-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
          <Icon
            size={21}
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </div>
      </div>

      {error ? (
        <div
          role="alert"
          className="mt-5 flex items-center gap-2 text-sm"
          style={{ color: 'var(--nf-danger)' }}
        >
          <AlertCircle size={17} className="shrink-0" />
          <span>{error}</span>
        </div>
      ) : (
        <p className="nf-text-primary mt-4 break-words text-3xl font-bold tracking-tight">
          {displayValue}
        </p>
      )}

      {description && (
        <p className="nf-text-muted mt-auto pt-3 text-xs leading-5">
          {description}
        </p>
      )}
    </article>
  )
}
