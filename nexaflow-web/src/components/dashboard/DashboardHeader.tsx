
import { Link } from 'react-router'

import {
  ArrowRight,
  BarChart3,
  LayoutDashboard,
} from 'lucide-react'

import Badge from '../ui/Badge'

export default function DashboardHeader() {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <Badge variant="primary">
          <LayoutDashboard size={14} />
          Business Command Center
        </Badge>

        <h1 className="nf-text-primary mt-3 text-3xl font-bold tracking-tight">
          Business Dashboard
        </h1>

        <p className="nf-text-muted mt-2 max-w-2xl text-sm leading-6">
          Your central workspace for monitoring business
          operations, inventory, and team productivity.
        </p>
      </div>

      <Link
        to="/analytics"
        className="nf-button-outline nf-motion nf-focusable inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold"
      >
        <BarChart3 size={17} />
        View Analytics
        <ArrowRight size={15} />
      </Link>
    </header>
  )
}
