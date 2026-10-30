
import { useBusinessTaskStats } from '../../hooks/tasks/useBusinessTaskStats'

function BusinessTaskStatsCards() {
  const { stats, loading, error } = useBusinessTaskStats()

  if (loading) {
    return (
      <p className="mt-4 text-slate-500">
        Loading task statistics...
      </p>
    )
  }

  if (error || !stats) {
    return (
      <p role="alert" className="mt-4 text-red-600">
        {error || 'Task statistics unavailable.'}
      </p>
    )
  }

  const cards = [
    { label: 'Total Tasks', value: stats.totalTasks },
    { label: 'To Do', value: stats.todoTasks },
    { label: 'In Progress', value: stats.inProgressTasks },
    { label: 'Completed', value: stats.completedTasks },
    { label: 'Overdue', value: stats.overdueTasks },
  ]

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Task Overview
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {card.label}
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default BusinessTaskStatsCards
