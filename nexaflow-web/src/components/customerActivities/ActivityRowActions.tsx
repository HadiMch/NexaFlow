import { Pencil, Trash2 } from "lucide-react";
import type { CustomerActivity } from "../../types/customerActivity";
import Button from "../ui/Button";

interface ActivityRowActionsProps {
  activity: CustomerActivity;
  deletingId: number | null;
  onEdit: (activity: CustomerActivity) => void;
  onDelete: (id: number) => void;
}

export default function ActivityRowActions({
  activity,
  deletingId,
  onEdit,
  onDelete,
}: ActivityRowActionsProps) {
  const isDeleting = deletingId === activity.id;
  const isBusy = deletingId !== null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        icon={<Pencil size={15} />}
        disabled={isBusy}
        onClick={() => onEdit(activity)}
      >
        Edit
      </Button>

      <Button
        variant="danger"
        size="sm"
        icon={<Trash2 size={15} />}
        disabled={isBusy}
        loading={isDeleting}
        onClick={() => onDelete(activity.id)}
      >
        Delete
      </Button>
    </div>
  );
}
