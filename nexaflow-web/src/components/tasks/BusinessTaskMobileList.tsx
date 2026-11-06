import { CalendarClock, ClipboardList } from "lucide-react";

import type { BusinessTask } from "../../types/businessTask";

import { formatTaskDate } from "../../utils/tasks/taskDates";

import TaskStatusBadge from "./TaskStatusBadge";
import TaskRowActions from "./TaskRowActions";

interface BusinessTaskMobileListProps {
  tasks: BusinessTask[];
  deletingId: number | null;
  currentTime: number | null;
  onEdit: (task: BusinessTask) => void;
  onDelete: (id: number) => void;
}

export default function BusinessTaskMobileList({
  tasks,
  deletingId,
  currentTime,
  onEdit,
  onDelete,
}: BusinessTaskMobileListProps) {
  return (
    <div className="space-y-3 p-4 md:hidden">
      {tasks.map((task) => {
        const deadline = task.dueDate ? new Date(task.dueDate).getTime() : null;

        const overdue =
          deadline !== null &&
          Number.isFinite(deadline) &&
          currentTime !== null &&
          deadline < currentTime &&
          task.status !== "Completed";

        return (
          <article
            key={task.id}
            className="rounded-xl border p-4"
            style={{
              background: "var(--nf-surface-muted)",
              borderColor: "var(--nf-border)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "var(--nf-primary-soft)",
                  color: "var(--nf-primary-text)",
                }}
              >
                <ClipboardList size={19} aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="nf-text-primary break-words text-sm font-bold">
                  {task.title}
                </h3>

                <p className="nf-text-muted mt-1 text-xs">Task #{task.id}</p>
              </div>
            </div>

            {task.description && (
              <p className="nf-text-secondary mt-4 whitespace-pre-wrap break-words text-sm leading-6">
                {task.description}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <TaskStatusBadge value={task.priority} variant="priority" />

              <TaskStatusBadge value={task.status} variant="status" />
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs">
              <CalendarClock
                size={16}
                aria-hidden="true"
                style={{
                  color: overdue ? "var(--nf-danger)" : "var(--nf-text-muted)",
                }}
              />

              <span
                style={{
                  color: overdue
                    ? "var(--nf-danger)"
                    : "var(--nf-text-secondary)",
                }}
              >
                {formatTaskDate(task.dueDate)}
                {overdue ? " · Overdue" : ""}
              </span>
            </div>

            <div
              className="mt-4 border-t pt-4"
              style={{ borderColor: "var(--nf-border)" }}
            >
              <TaskRowActions
                task={task}
                deletingId={deletingId}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
