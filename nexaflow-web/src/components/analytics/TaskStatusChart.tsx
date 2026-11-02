
import type { AnalyticsOverview } from '../../types/analytics'

interface TaskStatusChartProps {
  overview: AnalyticsOverview
}

function TaskStatusChart({ overview }: TaskStatusChartProps) {
  const total = overview.totalTasks

  const statuses = [
    {
      label: 'To Do',
      value: overview.todoTasks,
      color: 'bg-slate-500',
    },
    {
      label: 'In Progress',
      value: overview.inProgressTasks,
      color: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: overview.completedTasks,
      color: 'bg-emerald-500',
    },
  ]

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">
        Task Status Distribution
      </h2>

      <div className="space-y-5">
        {statuses.map((status) => {
          const percentage =
            total > 0 ? (status.value / total) * 100 : 0

          return (
            <div key={status.label}>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">
                  {status.label}
                </span>

                <span className="text-slate-500">
                  {status.value} ({percentage.toFixed(1)}%)
                </span>
              </div>

              <div
                className="h-3 overflow-hidden rounded-full bg-slate-100"
                role="progressbar"
                aria-label={status.label}
                aria-valuenow={status.value}
                aria-valuemin={0}
                aria-valuemax={total || 1}
              >
                <div
                  className={`h-full rounded-full ${status.color}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        <p className="text-sm text-slate-500">
          Total Tasks: <strong>{total}</strong>
        </p>
      </div>
    </section>
  )
}

export default TaskStatusChart
