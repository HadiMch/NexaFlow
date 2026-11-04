
import DashboardHeader from '../components/dashboard/DashboardHeader'
import DashboardAiBanner from '../components/dashboard/DashboardAiBanner'
import DashboardQuickActions from '../components/dashboard/DashboardQuickActions'
import CustomerCountCard from '../components/dashboard/CustomerCountCard'
import InventoryStatsCards from '../components/dashboard/InventoryStatsCards'
import BusinessTaskStatsCards from '../components/dashboard/BusinessTaskStatsCards'

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-6">
      <DashboardHeader />

      <DashboardAiBanner />

      {/* Business Overview */}
      <section aria-labelledby="business-overview-title">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="business-overview-title"
              className="text-lg font-bold tracking-tight text-slate-900"
            >
              Business Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Essential metrics from your business records.
            </p>
          </div>

          <span className="text-xs text-slate-400">
            Current recorded totals
          </span>
        </div>

        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <CustomerCountCard />
          <InventoryStatsCards />
        </div>
      </section>

      {/* Tasks Overview */}
      <BusinessTaskStatsCards />

      {/* Quick Access */}
      <DashboardQuickActions />
    </div>
  )
}
