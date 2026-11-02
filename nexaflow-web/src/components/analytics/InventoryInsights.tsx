
import type { AnalyticsOverview } from '../../types/analytics'

interface InventoryInsightsProps {
  overview: AnalyticsOverview
}

function InventoryInsights({ overview }: InventoryInsightsProps) {
  const {
    totalProducts,
    totalInventoryValue,
    lowStockProducts,
    totalStockQuantity,
  } = overview

  const averageValue =
    totalProducts > 0
      ? totalInventoryValue / totalProducts
      : 0

  const lowStockRate =
    totalProducts > 0
      ? (lowStockProducts / totalProducts) * 100
      : 0

  const averageQuantity =
    totalProducts > 0
      ? totalStockQuantity / totalProducts
      : 0

  const formatNumber = (value: number) =>
    new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(value)

  const insights = [
    {
      label: 'Average Inventory Value per Product',
      value: formatNumber(averageValue),
      description: 'Total inventory value divided by product count',
    },
    {
      label: 'Average Stock Quantity',
      value: formatNumber(averageQuantity),
      description: 'Average units available per product',
    },
    {
      label: 'Low Stock Percentage',
      value: `${lowStockRate.toFixed(1)}%`,
      description: 'Percentage of products requiring attention',
    },
  ]

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        Inventory Performance Insights
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Key inventory indicators calculated from current stock data.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {insights.map((insight) => (
          <div
            key={insight.label}
            className="rounded-xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-sm text-slate-500">
              {insight.label}
            </p>

            <p className="mt-3 text-2xl font-bold text-slate-900">
              {insight.value}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {insight.description}
            </p>
          </div>
        ))}
      </div>

      {lowStockProducts > 0 && (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="font-medium text-amber-800">
            Inventory Attention Required
          </p>

          <p className="mt-1 text-sm text-amber-700">
            {lowStockProducts} product(s) are at or below the
            low-stock threshold of 5 units.
          </p>
        </div>
      )}
    </section>
  )
}

export default InventoryInsights
