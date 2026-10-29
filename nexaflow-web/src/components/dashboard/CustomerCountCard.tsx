
import { useEffect, useState } from 'react'
import { dashboardService } from '../../services/dashboardService'

function CustomerCountCard() {
  const [count, setCount] = useState<number | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    dashboardService.getCustomerCount()
      .then((result) => {
        if (active) setCount(result)
      })
      .catch(() => {
        if (active) setError(true)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        Total Customers
      </p>

      <p className="mt-3 text-3xl font-bold text-slate-900">
        {error ? 'Error' : count === null ? 'Loading...' : count}
      </p>
    </div>
  )
}

export default CustomerCountCard
