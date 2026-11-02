
import { useEffect, useState } from 'react'
import { analyticsService } from '../../services/analyticsService'
import type { AnalyticsOverview } from '../../types/analytics'

export function useAnalyticsOverview() {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadOverview() {
      try {
        const result = await analyticsService.getOverview()

        if (active) {
          setOverview(result)
          setError('')
        }
      } catch {
        if (active) {
          setError('Failed to load analytics overview.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadOverview()

    return () => {
      active = false
    }
  }, [])

  return { overview, loading, error }
}
