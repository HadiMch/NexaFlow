
import {
  ClipboardList,
  Circle,
  Clock3,
  CircleCheck,
  AlertCircle,
} from 'lucide-react'

import { useBusinessTaskStats } from '../../hooks/tasks/useBusinessTaskStats'
import StatCard from './StatCard'

export default function BusinessTaskStatsCards() {
  const { stats, loading, error } = useBusinessTaskStats()

  const cards = [
    {
      title: 'Total Tasks',
      value: stats?.totalTasks,
      icon: ClipboardList,
      tone: 'indigo' as const,
      description: 'All business tasks',
    },
    {
      title: 'To Do',
      value: stats?.todoTasks,
      icon: Circle,
      tone: 'blue' as const,
      description: 'Waiting to be started',
    },
    {
      title: 'In Progress',
      value: stats?.inProgressTasks,
      icon: Clock3,
      tone: 'violet' as const,
      description: 'Currently being worked on',
    },
    {
      title: 'Completed',
      value: stats?.completedTasks,
      icon: CircleCheck,
      tone: 'emerald' as const,
      description: 'Successfully finished',
    },
    {
      title: 'Overdue',
      value: stats?.overdueTasks,
      icon: AlertCircle,
      tone: 'rose' as const,
      description: 'Past the due date',
    },
  ]

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-lg font-bold tracking-tight text-slate-900">
          Task Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monitor task workloads, progress, and deadlines.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            tone={card.tone}
            loading={loading}
            error={
              error
                ? error
                : !loading && !stats
                  ? 'Task statistics unavailable'
                  : undefined
            }
            description={card.description}
          />
        ))}
      </div>
    </section>
  )
}
