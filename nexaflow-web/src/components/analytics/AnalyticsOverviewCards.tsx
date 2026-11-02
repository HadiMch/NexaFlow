
import type { AnalyticsOverview } from '../../types/analytics'

interface AnalyticsOverviewCardsProps {
  overview: AnalyticsOverview
}

function AnalyticsOverviewCards({
  overview,
}: AnalyticsOverviewCardsProps) {
  const formatNumber = (value: number) =>
    new Intl.NumberFormat().format(value)

  const cards = [
    {
      label: 'Total Customers',
      value: formatNumber(overview.totalCustomers),
    },
    {
      label: 'Total Products',
      value: formatNumber(overview.totalProducts),
    },
    {
      label: 'Stock Quantity',
      value: formatNumber(overview.totalStockQuantity),
    },
    {
      label: 'Inventory Value',
      value: formatNumber(overview.totalInventoryValue),
    },
    {
      label: 'Low Stock Products',
      value: formatNumber(overview.lowStockProducts),
    },
    {
      label: 'Total Tasks',
      value: formatNumber(overview.totalTasks),
    },
    {
      label: 'Completed Tasks',
      value: formatNumber(overview.completedTasks),
    },
    {
      label: 'Pending Tasks',
      value: formatNumber(overview.pendingTasks),
    },
    {
      label: 'Overdue Tasks',
      value: formatNumber(overview.overdueTasks),
    },
    {
      label: 'Task Completion Rate',
      value: `${overview.taskCompletionRate.toFixed(2)}%`,
    },
  ]

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">
            {card.label}
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  )
}

export default AnalyticsOverviewCards
