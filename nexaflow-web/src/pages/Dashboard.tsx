
import {
  ArrowUpRight,
  LayoutDashboard,
} from 'lucide-react'

import CustomerCountCard from '../components/dashboard/CustomerCountCard'
import InventoryStatsCards from '../components/dashboard/InventoryStatsCards'
import BusinessTaskStatsCards from '../components/dashboard/BusinessTaskStatsCards'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Dashboard introduction */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
            <LayoutDashboard size={14} />
            Business Overview
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Monitor your business performance and manage
            operations from one place.
          </p>
        </div>

        <a
          href="/analytics"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600"
        >
          View Analytics
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Business statistics */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Business Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            A quick look at your customers and inventory.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <CustomerCountCard />
          <InventoryStatsCards />
        </div>
      </section>

      {/* Task statistics */}
      <section>
        <BusinessTaskStatsCards />
      </section>
    </div>
  )
}
