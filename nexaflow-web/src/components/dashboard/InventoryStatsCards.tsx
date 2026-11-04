
import { useEffect, useState } from 'react'

import {
  Boxes,
  Package,
  AlertTriangle,
  Wallet,
} from 'lucide-react'

import { productService } from '../../services/productService'
import type { InventoryStats } from '../../types/product'
import StatCard from './StatCard'

const moneyFormatter = new Intl.NumberFormat(
  'en-US',
  {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
)

export default function InventoryStatsCards() {
  const [stats, setStats] = useState<InventoryStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    productService.getStats().then((data) => {
        if (active) {
          setStats(data)
          setError(false)
        }
      })
      .catch(() => {
        if (active) {
          setError(true)
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [])

  const cards = [
    {
      title: 'Inventory Products',
      value: stats?.totalProducts,
      icon: Package,
      tone: 'blue' as const,
      description: 'Products registered',
    },
    {
      title: 'Total Stock Quantity',
      value: stats?.totalStockQuantity,
      icon: Boxes,
      tone: 'violet' as const,
      description: 'Units in inventory',
    },
    {
      title: 'Low Stock Products',
      value: stats?.lowStockProducts,
      icon: AlertTriangle,
      tone: 'amber' as const,
      description: 'Products below stock threshold',
    },
    {
      title: 'Inventory Value',
      value: stats
        ? moneyFormatter.format(stats.totalInventoryValue)
        : undefined,
      icon: Wallet,
      tone: 'emerald' as const,
      description: 'Total recorded inventory value',
    },
  ]

  return (
    <>
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          tone={card.tone}
          description={card.description}
          loading={loading}
          error={
            error
              ? 'Unable to load inventory'
              : undefined
          }
        />
      ))}
    </>
  )
}