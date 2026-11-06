import type { BusinessTask } from "../../types/businessTask";

import TaskStatusBadge from "./TaskStatusBadge";
import TaskRowActions from "./TaskRowActions";

import { formatTaskDate } from "../../utils/tasks/taskDates";

interface BusinessTaskRowProps {
  task: BusinessTask;
  deletingId: number | null;
  currentTime: number | null;
  onEdit: (task: BusinessTask) => void;
  onDelete: (id: number) => void;
}

export default function BusinessTaskRow({
  task,
  deletingId,
  currentTime,
  onEdit,
  onDelete,
}: BusinessTaskRowProps) {
  const deadline = task.dueDate ? new Date(task.dueDate).getTime() : null;

  const overdue =
    deadline !== null &&
    Number.isFinite(deadline) &&
    currentTime !== null &&
    deadline < currentTime &&
    task.status !== "Completed";

  return (
    <tr
      className="nf-customer-row border-t"
      style={{ borderColor: "var(--nf-border-soft)" }}
    >
      <td className="max-w-xs px-4 py-4 align-top">
        <p className="nf-text-primary break-words font-semibold">
          {task.title}
        </p>

        {task.description && (
          <p className="nf-text-muted mt-1 whitespace-pre-wrap break-words text-xs leading-5">
            {task.description}
          </p>
        )}
      </td>

      <td className="px-4 py-4 align-top">
        <TaskStatusBadge value={task.priority} variant="priority" />
      </td>

      <td className="px-4 py-4 align-top">
        <TaskStatusBadge value={task.status} variant="status" />
      </td>

      <td className="px-4 py-4 align-top">
        <span
          className="whitespace-nowrap text-xs font-medium"
          style={{
            color: overdue ? "var(--nf-danger)" : "var(--nf-text-secondary)",
          }}
        >
          {formatTaskDate(task.dueDate)}
          {overdue && <span className="ml-1 font-bold">· Overdue</span>}
        </span>
      </td>

      <td className="px-4 py-4 align-top">
        <TaskRowActions
          task={task}
          deletingId={deletingId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
}
