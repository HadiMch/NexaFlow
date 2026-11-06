import { Pencil, Trash2 } from "lucide-react";

import type { BusinessTask } from "../../types/businessTask";

import Button from "../ui/Button";

interface TaskRowActionsProps {
  task: BusinessTask;
  deletingId: number | null;
  onEdit: (task: BusinessTask) => void;
  onDelete: (id: number) => void;
}

export default function TaskRowActions({
  task,
  deletingId,
  onEdit,
  onDelete,
}: TaskRowActionsProps) {
  const busy = deletingId !== null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        icon={<Pencil size={15} />}
        disabled={busy}
        onClick={() => onEdit(task)}
      >
        Edit
      </Button>

      <Button
        variant="danger"
        size="sm"
        icon={<Trash2 size={15} />}
        disabled={busy}
        loading={deletingId === task.id}
        onClick={() => onDelete(task.id)}
      >
        Delete
      </Button>
    </div>
  );
}
