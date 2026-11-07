import { ListTodo } from "lucide-react";

import type { AnalyticsOverview } from "../../types/analytics";

import AnalyticsProgressBar from "./AnalyticsProgressBar";

interface TaskStatusChartProps {
  overview: AnalyticsOverview;
}

export default function TaskStatusChart({ overview }: TaskStatusChartProps) {
  const total = overview.totalTasks;

  const statuses = [
    {
      label: "To Do",
      value: overview.todoTasks,
      color: "var(--nf-text-muted)",
    },
    {
      label: "In Progress",
      value: overview.inProgressTasks,
      color: "var(--nf-primary)",
    },
    {
      label: "Completed",
      value: overview.completedTasks,
      color: "var(--nf-success)",
    },
  ];

  return (
    <section className="nf-surface flex h-full flex-col rounded-2xl p-5 sm:p-6">
      <header className="flex items-start gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: "var(--nf-primary-soft)",
            color: "var(--nf-primary-text)",
          }}
        >
          <ListTodo size={20} aria-hidden="true" />
        </div>

        <div>
          <h2 className="nf-section-title">Task Status Distribution</h2>

          <p className="nf-section-description">
            Breakdown of tasks by current status.
          </p>
        </div>
      </header>

      <div className="mt-7 flex-1 space-y-6">
        {statuses.map((status) => (
          <AnalyticsProgressBar
            key={status.label}
            label={status.label}
            value={status.value}
            total={total}
            color={status.color}
          />
        ))}
      </div>

      <div
        className="mt-6 border-t pt-4"
        style={{ borderColor: "var(--nf-border)" }}
      >
        <p className="nf-text-secondary text-sm">
          Total Tasks:{" "}
          <strong className="nf-text-primary tabular-nums">
            {total.toLocaleString()}
          </strong>
        </p>
      </div>
    </section>
  );
}
