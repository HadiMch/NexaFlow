
import { useEffect, useState } from 'react'
import { analyticsService } from '../../services/analyticsService'

import type {
  AnalyticsPeriod,
  TaskTrend,
} from '../../types/analytics'

export function useTaskTrends(days: AnalyticsPeriod) {
  const [trends, setTrends] = useState<TaskTrend[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadTrends() {
      if (!active) return

      setLoading(true)
      setError('')

      try {
        const result = await analyticsService.getTaskTrends(days)

        if (active) {
          setTrends(result)
        }
      } catch {
        if (active) {
          setTrends([])
          setError('Failed to load task trends.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    const timeout = setTimeout(() => {
      void loadTrends()
    }, 0)

    return () => {
      active = false
      clearTimeout(timeout)
    }
  }, [days])

  return { trends, loading, error }
}
