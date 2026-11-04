
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
    tone: 'indigo',
  },
  {
    title: 'Manage Inventory',
    description: 'Review products and stock levels.',
    path: '/inventory',
    icon: Boxes,
    tone: 'blue',
  },
  {
    title: 'Manage Tasks',
    description: 'Organize tasks and track progress.',
    path: '/tasks',
    icon: ClipboardCheck,
    tone: 'violet',
  },
]

export default function DashboardQuickActions() {
  return (
    <section aria-labelledby="quick-access-title">
      <div className="mb-5">
        <h2
          id="quick-access-title"
          className="nf-section-title"
        >
          Quick Access
        </h2>

        <p className="nf-section-description">
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
              <Card
                data-tone={action.tone}
                className="nf-stat-card nf-motion h-full group-hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="nf-stat-icon flex h-12 w-12 items-center justify-center rounded-xl">
                    <Icon size={23} />
                  </div>

                  <ArrowRight
                    size={18}
                    className="nf-text-muted nf-motion group-hover:translate-x-1"
                  />
                </div>

                <h3 className="nf-text-primary mt-5 text-base font-bold">
                  {action.title}
                </h3>

                <p className="nf-text-muted mt-2 text-sm leading-6">
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
