
import type {
  TaskPriority,
  TaskStatus,
} from '../../types/businessTask'

import type { TaskSort } from '../../hooks/tasks/useTaskFilters'

interface TaskFiltersProps {
  search: string
  onSearchChange: (value: string) => void

  statusFilter: TaskStatus | 'All'
  onStatusChange: (value: TaskStatus | 'All') => void

  priorityFilter: TaskPriority | 'All'
  onPriorityChange: (value: TaskPriority | 'All') => void

  sortBy: TaskSort
  onSortChange: (value: TaskSort) => void
}

function TaskFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
}: TaskFiltersProps) {
  return (
    <>
      {/* Search */}
      <div className="mt-8 rounded-xl bg-white p-4 shadow-sm">
        <label
          htmlFor="task-search"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Search Tasks
        </label>

        <input
          id="task-search"
          type="search"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search by title or description..."
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Filters and Sorting */}
      <div className="mt-4 flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm">
        {/* Status */}
        <div className="min-w-48 flex-1">
          <label
            htmlFor="status-filter"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Filter by Status
          </label>

          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(
                e.target.value as TaskStatus | 'All'
              )
            }
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="All">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Priority */}
        <div className="min-w-48 flex-1">
          <label
            htmlFor="priority-filter"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Filter by Priority
          </label>

          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) =>
              onPriorityChange(
                e.target.value as TaskPriority | 'All'
              )
            }
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Sorting */}
        <div className="min-w-48 flex-1">
          <label
            htmlFor="task-sort"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Sort Tasks
          </label>

          <select
            id="task-sort"
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as TaskSort)
            }
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="dueSoon">
              Deadline (Earliest First)
            </option>
            <option value="priority">
              Priority (High to Low)
            </option>
          </select>
        </div>
      </div>
    </>
  )
}

export default TaskFilters