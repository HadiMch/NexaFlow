
interface SkeletonProps {
  className?: string
}

export default function Skeleton({
  className = '',
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`
        animate-pulse rounded-lg
        bg-slate-200/80
        ${className}
      `}
    />
  )
}

export function StatCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading statistics"
      className="nf-surface p-5"
    >
      <Skeleton className="h-4 w-28" />

      <div className="mt-5">
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="mt-4">
        <Skeleton className="h-3 w-40 max-w-full" />
      </div>
    </div>
  )
}
