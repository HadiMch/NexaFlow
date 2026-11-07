import {
  ArrowDownUp,
  CheckCircle2,
  ListPlus,
  TrendingUp,
  Activity,
} from "lucide-react";

import type { AnalyticsPeriod, TaskTrend } from "../../types/analytics";

import AnalyticsMetricCard from "./AnalyticsMetricCard";

interface PeriodPerformanceSummaryProps {
  trends: TaskTrend[];
  period: AnalyticsPeriod;
}

export default function PeriodPerformanceSummary({
  trends,
  period,
}: PeriodPerformanceSummaryProps) {
  const created = trends.reduce((total, day) => total + day.createdTasks, 0);

  const completed = trends.reduce(
    (total, day) => total + day.completedTasks,
    0,
  );

  const averageCreated = created / period;
  const averageCompleted = completed / period;
  const netActivity = created - completed;

  const metrics = [
    {
      label: "Tasks Created",
      value: created.toLocaleString(),
      icon: ListPlus,
      tone: "primary" as const,
    },
    {
      label: "Tasks Completed",
      value: completed.toLocaleString(),
      icon: CheckCircle2,
      tone: "success" as const,
    },
    {
      label: "Average Created / Day",
      value: averageCreated.toFixed(2),
      icon: TrendingUp,
      tone: "primary" as const,
    },
    {
      label: "Average Completed / Day",
      value: averageCompleted.toFixed(2),
      icon: Activity,
      tone: "success" as const,
    },
    {
      label: "Created Minus Completed",
      value: netActivity.toLocaleString(),
      icon: ArrowDownUp,
      tone: "neutral" as const,
    },
  ];

  return (
    <section className="mt-6 space-y-5">
      <div>
        <h2 className="nf-section-title">Period Performance Summary</h2>

        <p className="nf-section-description">
          Task activity over the last {period} days, including today (UTC).
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {metrics.map((metric) => (
          <AnalyticsMetricCard key={metric.label} {...metric} />
        ))}
      </div>

      <p className="nf-text-muted text-xs leading-6">
        Created minus completed is an activity comparison, not the current
        number of pending tasks. Completed tasks may have been created before
        this reporting period.
      </p>
    </section>
  );
}
