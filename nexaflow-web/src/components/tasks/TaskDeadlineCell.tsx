
import type { BusinessTask } from '../../types/businessTask'

interface TaskDeadlineCellProps {
  task: BusinessTask
  currentTime: number | null
}

function TaskDeadlineCell({
  task,
  currentTime,
}: TaskDeadlineCellProps) {
  const isOverdue =
    currentTime !== null &&
    task.dueDate !== null &&
    task.status !== 'Completed' &&
    new Date(task.dueDate).getTime() < currentTime

  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleString()
    : '-'

  return (
    <td className="p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={
            isOverdue
              ? 'font-medium text-red-600'
              : 'text-slate-600'
          }
        >
          {formattedDate}
        </span>

        {isOverdue && (
          <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
            Overdue
          </span>
        )}
      </div>
    </td>
  )
}

export default TaskDeadlineCell
