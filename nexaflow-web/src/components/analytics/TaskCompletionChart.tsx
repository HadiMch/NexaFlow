
import type { AnalyticsOverview } from '../../types/analytics'

interface TaskCompletionChartProps {
  overview: AnalyticsOverview
}

function TaskCompletionChart({
  overview,
}: TaskCompletionChartProps) {
  const rate = Math.max(
    0,
    Math.min(100, overview.taskCompletionRate)
  )

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">
        Task Completion Performance
      </h2>

      <div className="flex items-end gap-2">
        <span className="text-5xl font-bold text-indigo-600">
          {rate.toFixed(1)}%
        </span>
        <span className="pb-1 text-sm text-slate-500">
          completed
        </span>
      </div>

      <div
        className="mt-5 h-4 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label="Overall task completion"
        aria-valuenow={rate}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-indigo-600"
          style={{ width: `${rate}%` }}
        />
      </div>

      <p className="mt-4 text-sm text-slate-600">
        {overview.completedTasks} of {overview.totalTasks} tasks
        completed
      </p>
    </section>
  )
}

export default TaskCompletionChart
