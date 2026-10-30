
import type { BusinessTask } from '../../types/businessTask'

interface TaskRowActionsProps {
  task: BusinessTask
  deletingId: number | null
  onEdit: (task: BusinessTask) => void
  onDelete: (id: number) => void
}

function TaskRowActions({
  task,
  deletingId,
  onEdit,
  onDelete,
}: TaskRowActionsProps) {
  return (
    <td className="p-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg bg-indigo-50 px-4 py-2 text-indigo-600 hover:bg-indigo-100"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          disabled={deletingId !== null}
          className="rounded-lg bg-red-50 px-4 py-2 text-red-600 hover:bg-red-100 disabled:opacity-50"
        >
          {deletingId === task.id
            ? 'Deleting...'
            : 'Delete'}
        </button>
      </div>
    </td>
  )
}

export default TaskRowActions
