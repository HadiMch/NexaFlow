
import type { BusinessTask } from '../../types/businessTask'
import TaskStatusBadge from './TaskStatusBadge'
import TaskDeadlineCell from './TaskDeadlineCell'
import TaskRowActions from './TaskRowActions'

interface BusinessTaskRowProps {
  task: BusinessTask
  deletingId: number | null
  currentTime: number | null
  onEdit: (task: BusinessTask) => void
  onDelete: (id: number) => void
}

function BusinessTaskRow({
  task,
  deletingId,
  currentTime,
  onEdit,
  onDelete,
}: BusinessTaskRowProps) {
  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50">
      <td className="p-3">
        <p className="font-medium text-slate-900">
          {task.title}
        </p>

        {task.description && (
          <p className="mt-1 max-w-xs whitespace-pre-wrap break-words text-slate-500">
            {task.description}
          </p>
        )}
      </td>

      <td className="p-3">
        <TaskStatusBadge
          value={task.priority}
          variant="priority"
        />
      </td>

      <td className="p-3">
        <TaskStatusBadge
          value={task.status}
          variant="status"
        />
      </td>

      <TaskDeadlineCell
        task={task}
        currentTime={currentTime}
      />

      <TaskRowActions
        task={task}
        deletingId={deletingId}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </tr>
  )
}

export default BusinessTaskRow
