import Skeleton from "../ui/Skeleton";

export default function AnalyticsOverviewSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading analytics overview"
      className="space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className="nf-surface space-y-4 rounded-2xl p-5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-36" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="nf-surface space-y-5 rounded-2xl p-6">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-4/5" />
            <Skeleton className="h-3 w-3/5" />
          </div>
        ))}
      </div>
    </div>
  );
}
