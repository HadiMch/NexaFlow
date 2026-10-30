
import type { BusinessTask } from '../../types/businessTask'
import { useCurrentTime } from '../../hooks/useCurrentTime'
import { calculateTaskStatistics } from '../../utils/taskStatistics'

interface TaskStatsCardsProps {
  tasks: BusinessTask[]
}

function TaskStatsCards({ tasks }: TaskStatsCardsProps) {
  const currentTime = useCurrentTime()

  const stats = calculateTaskStatistics(tasks, currentTime)

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">
            {stat.label}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export default TaskStatsCards
