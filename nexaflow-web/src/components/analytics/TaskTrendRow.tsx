import type { TaskTrend } from "../../types/analytics";

interface TaskTrendRowProps {
  trend: TaskTrend;
  maxValue: number;
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

export default function TaskTrendRow({ trend, maxValue }: TaskTrendRowProps) {
  const date = new Date(`${trend.date}T00:00:00Z`);

  const label = Number.isNaN(date.getTime())
    ? trend.date
    : dateFormatter.format(date);

  const bars = [
    {
      label: "Created",
      count: trend.createdTasks,
      color: "var(--nf-primary)",
    },
    {
      label: "Completed",
      count: trend.completedTasks,
      color: "var(--nf-success)",
    },
  ];

  return (
    <div
      className="grid grid-cols-[65px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[85px_minmax(0,1fr)]"
      aria-label={`${label}: ${trend.createdTasks} created, ${trend.completedTasks} completed`}
    >
      <span className="nf-text-muted text-xs font-medium">{label}</span>

      <div className="space-y-2">
        {bars.map((bar) => {
          const width = (Math.max(0, bar.count) / maxValue) * 100;

          return (
            <div key={bar.label} className="flex items-center gap-3">
              <div
                className="h-3 min-w-0 flex-1 overflow-hidden rounded-full"
                style={{
                  background: "var(--nf-surface-muted)",
                }}
                role="img"
                aria-label={`${bar.label}: ${bar.count} tasks`}
              >
                <div
                  className="nf-motion h-full rounded-full"
                  style={{
                    width: `${Math.min(100, width)}%`,
                    background: bar.color,
                  }}
                />
              </div>

              <span className="nf-text-secondary w-8 shrink-0 text-right text-xs font-semibold tabular-nums">
                {bar.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
