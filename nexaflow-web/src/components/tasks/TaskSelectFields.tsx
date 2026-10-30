
import type {
  TaskPriority,
  TaskStatus,
} from '../../types/businessTask'

interface TaskSelectFieldsProps {
  priority: TaskPriority
  status: TaskStatus
  onPriorityChange: (value: TaskPriority) => void
  onStatusChange: (value: TaskStatus) => void
}

function TaskSelectFields({
  priority,
  status,
  onPriorityChange,
  onStatusChange,
}: TaskSelectFieldsProps) {
  return (
    <>
      <div>
        <label
          htmlFor="task-priority"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Priority
        </label>

        <select
          id="task-priority"
          value={priority}
          onChange={(e) =>
            onPriorityChange(e.target.value as TaskPriority)
          }
          className="w-full rounded-lg border border-slate-300 p-3"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="task-status"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Status
        </label>

        <select
          id="task-status"
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value as TaskStatus)
          }
          className="w-full rounded-lg border border-slate-300 p-3"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </>
  )
}

export default TaskSelectFields
