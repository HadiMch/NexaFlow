
import type { BusinessTask } from '../../types/businessTask'
import { useCurrentTime } from '../../hooks/useCurrentTime'
import BusinessTaskRow from './BusinessTaskRow'

interface BusinessTaskTableProps {
  tasks: BusinessTask[]
  deletingId: number | null
  onEdit: (task: BusinessTask) => void
  onDelete: (id: number) => void
}

function BusinessTaskTable({
  tasks,
  deletingId,
  onEdit,
  onDelete,
}: BusinessTaskTableProps) {
  const currentTime = useCurrentTime()

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">
        Task List
      </h2>

      {tasks.length === 0 ? (
        <p className="text-slate-500">
          No tasks match your filters.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="p-3">Task</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <BusinessTaskRow
                  key={task.id}
                  task={task}
                  currentTime={currentTime}
                  deletingId={deletingId}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default BusinessTaskTable
