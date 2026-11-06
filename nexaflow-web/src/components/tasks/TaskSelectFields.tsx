import { useId } from "react";

import type { TaskPriority, TaskStatus } from "../../types/businessTask";

interface TaskSelectFieldsProps {
  priority: TaskPriority;
  status: TaskStatus;
  saving: boolean;
  onPriorityChange: (value: TaskPriority) => void;
  onStatusChange: (value: TaskStatus) => void;
}

export default function TaskSelectFields({
  priority,
  status,
  saving,
  onPriorityChange,
  onStatusChange,
}: TaskSelectFieldsProps) {
  const id = useId();

  const selectClass =
    "nf-input nf-motion min-h-11 w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none disabled:opacity-60";

  return (
    <>
      <div>
        <label
          htmlFor={`${id}-priority`}
          className="nf-text-secondary mb-1.5 block text-sm font-semibold"
        >
          Priority
        </label>

        <select
          id={`${id}-priority`}
          value={priority}
          disabled={saving}
          onChange={(event) =>
            onPriorityChange(event.target.value as TaskPriority)
          }
          className={selectClass}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label
          htmlFor={`${id}-status`}
          className="nf-text-secondary mb-1.5 block text-sm font-semibold"
        >
          Status
        </label>

        <select
          id={`${id}-status`}
          value={status}
          disabled={saving}
          onChange={(event) => onStatusChange(event.target.value as TaskStatus)}
          className={selectClass}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </>
  );
}
