
import { Link } from 'react-router'

import {
  ArrowRight,
  Boxes,
  ClipboardCheck,
  UsersRound,
} from 'lucide-react'

import Card from '../ui/Card'

const quickActions = [
  {
    title: 'Manage Customers',
    description: 'View and manage customer records.',
    path: '/customers',
    icon: UsersRound,
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'Manage Inventory',
    description: 'Review products and stock levels.',
    path: '/inventory',
    icon: Boxes,
    color: 'bg-sky-50 text-sky-600',
  },
  {
    title: 'Manage Tasks',
    description: 'Organize tasks and track progress.',
    path: '/tasks',
    icon: ClipboardCheck,
    color: 'bg-violet-50 text-violet-600',
  },
]

export default function DashboardQuickActions() {
  return (
    <section aria-labelledby="quick-access-title">
      <div className="mb-5">
        <h2
          id="quick-access-title"
          className="text-lg font-bold tracking-tight text-slate-900"
        >
          Quick Access
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Navigate directly to your everyday workflows.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickActions.map((action) => {
          const Icon = action.icon

          return (
            <Link
              key={action.path}
              to={action.path}
              className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-indigo-200 group-hover:shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
                  >
                    <Icon size={23} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
                  />
                </div>

                <h3 className="mt-5 text-base font-bold text-slate-900">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {action.description}
                </p>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}