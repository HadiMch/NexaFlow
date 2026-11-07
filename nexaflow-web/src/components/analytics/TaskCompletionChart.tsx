import { CheckCircle2 } from "lucide-react";

import type { AnalyticsOverview } from "../../types/analytics";

import AnalyticsProgressBar from "./AnalyticsProgressBar";

interface TaskCompletionChartProps {
  overview: AnalyticsOverview;
}

export default function TaskCompletionChart({
  overview,
}: TaskCompletionChartProps) {
  const rate = Number.isFinite(overview.taskCompletionRate)
    ? Math.max(0, Math.min(100, overview.taskCompletionRate))
    : 0;

  return (
    <section className="nf-surface flex h-full flex-col rounded-2xl p-5 sm:p-6">
      <header className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "var(--nf-success-soft)",
            color: "var(--nf-success)",
          }}
        >
          <CheckCircle2 size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="nf-section-title">Task Completion Performance</h2>

          <p className="nf-section-description">
            Overall progress toward completing business tasks.
          </p>
        </div>
      </header>

      <div className="mt-7 flex-1">
        <div className="flex flex-wrap items-end gap-2">
          <span
            className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl"
            style={{ color: "var(--nf-primary-text)" }}
          >
            {rate.toFixed(1)}%
          </span>

          <span className="nf-text-muted pb-1 text-sm">completed</span>
        </div>

        <div className="mt-6">
          <AnalyticsProgressBar
            label="Overall task completion"
            value={rate}
            total={100}
            color="var(--nf-primary)"
            showDetails={false}
            formatAsPercentage
          />
        </div>

        <p className="nf-text-secondary mt-5 text-sm leading-6">
          <strong className="nf-text-primary">
            {overview.completedTasks.toLocaleString()}
          </strong>{" "}
          of{" "}
          <strong className="nf-text-primary">
            {overview.totalTasks.toLocaleString()}
          </strong>{" "}
          tasks completed.
        </p>
      </div>
    </section>
  );
}
