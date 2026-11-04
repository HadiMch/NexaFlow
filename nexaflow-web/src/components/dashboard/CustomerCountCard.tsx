
import { useEffect, useState } from 'react'
import { UsersRound } from 'lucide-react'
import { dashboardService } from '../../services/dashboardService'
import StatCard from './StatCard'

export default function CustomerCountCard() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    dashboardService
      .getCustomerCount().then((result) => {
        if (active) {
          setCount(result)
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

  return (
    <StatCard
      title="Total Customers"
      value={count}
      icon={UsersRound}
      tone="indigo"
      loading={loading}
      error={error ? 'Unable to load customers' : undefined}
      description="Customers in your database"
    />
  )
}