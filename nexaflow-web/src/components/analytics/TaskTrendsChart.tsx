import { Activity, CalendarDays, RefreshCw } from "lucide-react";
import type { AnalyticsPeriod, TaskTrend } from "../../types/analytics";
import Button from "../ui/Button";
import Skeleton from "../ui/Skeleton";
import TaskTrendRow from "./TaskTrendRow";

interface TaskTrendsChartProps {
  trends: TaskTrend[];
  period: AnalyticsPeriod;
  onPeriodChange: (period: AnalyticsPeriod) => void;
  loading: boolean;
  error: string;
  onRetry?: () => void;
}

const periods: AnalyticsPeriod[] = [7, 14, 30];

export default function TaskTrendsChart({
  trends,
  period,
  onPeriodChange,
  loading,
  error,
  onRetry,
}: TaskTrendsChartProps) {
  const maxValue = Math.max(
    1,
    ...trends.map((trend) =>
      Math.max(trend.createdTasks, trend.completedTasks),
    ),
  );

  const totalCreated = trends.reduce(
    (sum, trend) => sum + trend.createdTasks,
    0,
  );

  const totalCompleted = trends.reduce(
    (sum, trend) => sum + trend.completedTasks,
    0,
  );

  const hasActivity = totalCreated > 0 || totalCompleted > 0;

  return (
    <section className="nf-surface overflow-hidden rounded-2xl">
      <header
        className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        style={{ borderColor: "var(--nf-border)" }}
      >
        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              color: "var(--nf-primary-text)",
              background: "var(--nf-primary-soft)",
            }}
          >
            <Activity size={20} aria-hidden="true" />
          </div>

          <div>
            <h2 className="nf-section-title">Task Activity Trends</h2>

            <p className="nf-section-description">
              Daily task creation and completion, including today (UTC).
            </p>
          </div>
        </div>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Task trends reporting period"
        >
          {periods.map((days) => {
            const active = days === period;

            return (
              <button
                key={days}
                type="button"
                aria-pressed={active}
                onClick={() => onPeriodChange(days)}
                className="nf-motion rounded-lg border px-3 py-2 text-xs font-semibold"
                style={{
                  color: active
                    ? "var(--nf-primary-text)"
                    : "var(--nf-text-secondary)",
                  background: active
                    ? "var(--nf-primary-soft)"
                    : "var(--nf-surface)",
                  borderColor: active
                    ? "var(--nf-primary)"
                    : "var(--nf-border)",
                }}
              >
                {days} Days
              </button>
            );
          })}
        </div>
      </header>

      <div className="p-5 sm:p-6" aria-busy={loading}>
        {loading ? (
          <div
            className="space-y-5"
            role="status"
            aria-label="Loading task trends"
          >
            <Skeleton className="h-5 w-48" />

            {Array.from({ length: Math.min(period, 8) }, (_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton className="h-4 w-14" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <p
              role="alert"
              className="text-sm"
              style={{ color: "var(--nf-danger)" }}
            >
              {error}
            </p>

            {onRetry && (
              <Button
                variant="outline"
                icon={<RefreshCw size={16} />}
                onClick={onRetry}
              >
                Try Again
              </Button>
            )}
          </div>
        ) : trends.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <CalendarDays
              size={30}
              style={{ color: "var(--nf-text-muted)" }}
              aria-hidden="true"
            />

            <h3 className="nf-text-primary mt-4 font-semibold">
              No trend data available
            </h3>

            <p className="nf-text-muted mt-2 text-sm">
              No daily reporting data was returned for this period.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span
                  className="h-3 w-3 rounded"
                  style={{
                    background: "var(--nf-primary)",
                  }}
                />

                <span className="nf-text-secondary">Created:</span>

                <strong className="nf-text-primary tabular-nums">
                  {totalCreated.toLocaleString()}
                </strong>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <span
                  className="h-3 w-3 rounded"
                  style={{
                    background: "var(--nf-success)",
                  }}
                />

                <span className="nf-text-secondary">Completed:</span>

                <strong className="nf-text-primary tabular-nums">
                  {totalCompleted.toLocaleString()}
                </strong>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              {trends.map((trend) => (
                <TaskTrendRow
                  key={trend.date}
                  trend={trend}
                  maxValue={maxValue}
                />
              ))}
            </div>

            {!hasActivity && (
              <p className="nf-text-muted mt-6 text-center text-sm">
                No task activity recorded during this reporting period.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}