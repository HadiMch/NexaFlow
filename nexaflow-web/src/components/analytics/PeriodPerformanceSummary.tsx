
import type {
  AnalyticsPeriod,
  TaskTrend,
} from '../../types/analytics'

interface PeriodPerformanceSummaryProps {
  trends: TaskTrend[]
  period: AnalyticsPeriod
}

function PeriodPerformanceSummary({
  trends,
  period,
}: PeriodPerformanceSummaryProps) {
  const created = trends.reduce(
    (total, day) => total + day.createdTasks,
    0
  )

  const completed = trends.reduce(
    (total, day) => total + day.completedTasks,
    0
  )

  const averageCreated = created / period
  const averageCompleted = completed / period

  const netActivity = created - completed

  const metrics = [
    {
      label: 'Tasks Created',
      value: created.toString(),
    },
    {
      label: 'Tasks Completed',
      value: completed.toString(),
    },
    {
      label: 'Average Created / Day',
      value: averageCreated.toFixed(2),
    },
    {
      label: 'Average Completed / Day',
      value: averageCompleted.toFixed(2),
    },
    {
      label: 'Created Minus Completed',
      value: netActivity.toString(),
    },
  ]

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Period Performance Summary
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Task activity over the last {period} days,
          including today (UTC).
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-slate-200 p-4"
          >
            <p className="text-sm text-slate-500">
              {metric.label}
            </p>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs text-slate-500">
        The difference between created and completed tasks is
        an activity comparison, not the current count of pending
        tasks. Completion events can include tasks created
        before this period.
      </p>
    </section>
  )
}

export default PeriodPerformanceSummary
