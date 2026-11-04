
import DashboardHeader from '../components/dashboard/DashboardHeader'
import DashboardAiBanner from '../components/dashboard/DashboardAiBanner'
import DashboardQuickActions from '../components/dashboard/DashboardQuickActions'

import CustomerCountCard from '../components/dashboard/CustomerCountCard'
import InventoryStatsCards from '../components/dashboard/InventoryStatsCards'
import BusinessTaskStatsCards from '../components/dashboard/BusinessTaskStatsCards'

export default function Dashboard() {
  return (
    <div className="nf-page space-y-8 pb-6">
      <DashboardHeader />

      <DashboardAiBanner />

      <section aria-labelledby="business-overview-title">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="business-overview-title"
              className="nf-section-title"
            >
              Business Overview
            </h2>

            <p className="nf-section-description">
              Essential metrics from your business records.
            </p>
          </div>

          <span className="nf-text-muted text-xs">
            Current recorded totals
          </span>
        </div>

        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <CustomerCountCard />
          <InventoryStatsCards />
        </div>
      </section>

      <BusinessTaskStatsCards />

      <DashboardQuickActions />
    </div>
  )
}
