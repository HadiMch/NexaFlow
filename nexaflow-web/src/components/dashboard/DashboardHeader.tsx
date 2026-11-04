
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

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Business Dashboard
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Your central workspace for monitoring business
          operations, inventory, and team productivity.
        </p>
      </div>

      <Link
        to="/analytics"
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600"
      >
        <BarChart3 size={17} />
        View Analytics
        <ArrowRight size={15} />
      </Link>
    </header>
  )
}
