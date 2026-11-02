
import type {
  AnalyticsPeriod,
  TaskTrend,
} from '../../types/analytics'

interface TaskTrendsChartProps {
  trends: TaskTrend[]
  period: AnalyticsPeriod
  onPeriodChange: (period: AnalyticsPeriod) => void
  loading: boolean
  error: string
}

function TaskTrendsChart({
  trends,
  period,
  onPeriodChange,
  loading,
  error,
}: TaskTrendsChartProps) {
  const maxValue = Math.max(
    1,
    ...trends.map((item) =>
      Math.max(item.createdTasks, item.completedTasks)
    )
  )

  const totalCreated = trends.reduce(
    (sum, item) => sum + item.createdTasks,
    0
  )

  const totalCompleted = trends.reduce(
    (sum, item) => sum + item.completedTasks,
    0
  )

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`))

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Task Activity Trends
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Daily task creation and completion activity
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {([7, 14, 30] as const).map((days) => (
            <button
              key={days}
              type="button"
              onClick={() => onPeriodChange(days)}
              aria-pressed={period === days}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                period === days
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {days} Days
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="mt-8 text-slate-500">
          Loading task trends...
        </p>
      ) : error ? (
        <p role="alert" className="mt-8 text-red-600">
          {error}
        </p>
      ) : (
        <>
          <div className="mt-6 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-blue-500" />
              Created: <strong>{totalCreated}</strong>
            </span>

            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-emerald-500" />
              Completed: <strong>{totalCompleted}</strong>
            </span>
          </div>

          <div className="mt-6 space-y-3">
            {trends.map((item) => (
              <div
                key={item.date}
                className="grid grid-cols-[65px_minmax(0,1fr)] items-center gap-3 sm:grid-cols-[85px_minmax(0,1fr)]"
              >
                <span className="text-xs text-slate-500">
                  {formatDate(item.date)}
                </span>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="h-3 min-w-0 flex-1 rounded bg-slate-100">
                      <div
                        className="h-full rounded bg-blue-500"
                        style={{
                          width: `${
                            (item.createdTasks / maxValue) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="w-6 text-right text-xs text-slate-500">
                      {item.createdTasks}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-3 min-w-0 flex-1 rounded bg-slate-100">
                      <div
                        className="h-full rounded bg-emerald-500"
                        style={{
                          width: `${
                            (item.completedTasks / maxValue) * 100
                          }%`,
                        }}
                      />
                    </div>
                    <span className="w-6 text-right text-xs text-slate-500">
                      {item.completedTasks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalCreated === 0 && totalCompleted === 0 && (
            <p className="mt-5 text-sm text-slate-500">
              No task activity recorded during this period.
            </p>
          )}
        </>
      )}
    </section>
  )
}

export default TaskTrendsChart
