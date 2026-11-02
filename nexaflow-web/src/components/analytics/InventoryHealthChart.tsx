
import type { AnalyticsOverview } from '../../types/analytics'

interface InventoryHealthChartProps {
  overview: AnalyticsOverview
}

function InventoryHealthChart({
  overview,
}: InventoryHealthChartProps) {
  const total = overview.totalProducts
  const lowStock = overview.lowStockProducts
  const healthy = Math.max(total - lowStock, 0)

  const lowStockPercentage =
    total > 0 ? (lowStock / total) * 100 : 0

  const healthyPercentage =
    total > 0 ? (healthy / total) * 100 : 0

  return (
    <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">
        Inventory Health
      </h2>

      <div className="space-y-5">
        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-slate-700">
              Healthy Stock
            </span>
            <span className="text-slate-500">
              {healthy} ({healthyPercentage.toFixed(1)}%)
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${healthyPercentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <span className="font-medium text-slate-700">
              Low Stock
            </span>
            <span className="text-slate-500">
              {lowStock} ({lowStockPercentage.toFixed(1)}%)
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: `${lowStockPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default InventoryHealthChart
