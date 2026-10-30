
import { useEffect, useState } from 'react'
import { businessTaskService } from '../../services/businessTaskService'
import type { BusinessTaskStats } from '../../types/businessTask'

export function useBusinessTaskStats() {
  const [stats, setStats] = useState<BusinessTaskStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    let requestInProgress = false

    async function loadStats() {
      if (requestInProgress) return

      requestInProgress = true

      try {
        const result = await businessTaskService.getStats()

        if (active) {
          setStats(result)
          setError('')
        }
      } catch {
        if (active) {
          setError('Failed to load task statistics.')
        }
      } finally {
        requestInProgress = false

        if (active) {
          setLoading(false)
        }
      }
    }

    void loadStats()

    const interval = setInterval(() => {
      if (active) void loadStats()
    }, 10_000)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  return { stats, loading, error }
}