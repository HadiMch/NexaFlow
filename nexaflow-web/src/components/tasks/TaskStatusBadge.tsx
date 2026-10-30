
import type {
  TaskPriority,
  TaskStatus,
} from '../../types/businessTask'

interface TaskStatusBadgeProps {
  value: TaskPriority | TaskStatus
  variant: 'priority' | 'status'
}

function TaskStatusBadge({
  value,
  variant,
}: TaskStatusBadgeProps) {
  function getBadgeColor() {
    if (variant === 'priority') {
      switch (value) {
        case 'High':
          return 'bg-red-50 text-red-700'
        case 'Medium':
          return 'bg-amber-50 text-amber-700'
        default:
          return 'bg-emerald-50 text-emerald-700'
      }
    }

    switch (value) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700'
      case 'In Progress':
        return 'bg-blue-50 text-blue-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${getBadgeColor()}`}
    >
      {value}
    </span>
  )
}

export default TaskStatusBadge
