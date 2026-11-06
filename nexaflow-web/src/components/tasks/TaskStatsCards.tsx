import {
  Activity,
  CheckCircle2,
  ClipboardList,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { BusinessTask } from "../../types/businessTask";

import { useCurrentTime } from "../../hooks/useCurrentTime";
import { calculateTaskStatistics } from "../../utils/taskStatistics";

interface TaskStatsCardsProps {
  tasks: BusinessTask[];
}

const statIcons: Record<string, LucideIcon> = {
  "Total Tasks": ClipboardList,
  "To Do": Clock3,
  "In Progress": Activity,
  Completed: CheckCircle2,
  Overdue: AlertTriangle,
};

export default function TaskStatsCards({ tasks }: TaskStatsCardsProps) {
  const currentTime = useCurrentTime();
  const stats = calculateTaskStatistics(tasks, currentTime);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = statIcons[stat.label] ?? ClipboardList;
        const overdue = stat.label.toLowerCase().includes("overdue");

        return (
          <article
            key={stat.label}
            className="nf-surface nf-motion rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="nf-text-secondary text-sm font-medium">
                {stat.label}
              </p>

              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: overdue
                    ? "var(--nf-danger-soft)"
                    : "var(--nf-primary-soft)",
                  color: overdue
                    ? "var(--nf-danger)"
                    : "var(--nf-primary-text)",
                }}
              >
                <Icon size={19} aria-hidden="true" />
              </div>
            </div>

            <p className="nf-text-primary mt-4 text-3xl font-bold tracking-tight tabular-nums">
              {stat.value}
            </p>
          </article>
        );
      })}
    </div>
  );
}
