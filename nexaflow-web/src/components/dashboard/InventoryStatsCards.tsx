
import { useEffect, useState } from 'react'
import { productService } from '../../services/productService'
import type { InventoryStats } from '../../types/product'

function InventoryStatsCards() {
  const [stats, setStats] = useState<InventoryStats | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    productService.getStats().then((data) => {
        if (active) setStats(data)
      })
      .catch(() => {
        if (active) setError(true)
      })

    return () => {
      active = false
    }
  }, [])

  const cards = [
    {
      title: 'Inventory Products',
      value: stats?.totalProducts,
    },
    {
      title: 'Total Stock Quantity',
      value: stats?.totalStockQuantity,
    },
    {
      title: 'Low Stock Products',
      value: stats?.lowStockProducts,
    },
    {
      title: 'Inventory Value',
      value: stats
        ? `$${stats.totalInventoryValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`
        : undefined,
    },
  ]

  return (
    <>
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <p className="mt-3 text-3xl font-bold text-slate-900">
            {error ? 'Error' : card.value ?? 'Loading...'}
          </p>
        </div>
      ))}
    </>
  )
}

export default InventoryStatsCards
