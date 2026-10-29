
import { useCallback, useEffect, useState } from 'react'
import { customerActivityService } from '../services/customerActivityService'
import type {
  CustomerActivity,
  CreateCustomerActivityInput,
  UpdateCustomerActivityInput,
} from '../types/customerActivity'


export function useCustomerActivities(customerId: number | null) {
  const [activities, setActivities] = useState<CustomerActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const refreshActivities = useCallback(() => {
    setRefreshKey((previous) => previous + 1)
  }, [])


  useEffect(() => {
    let active = true

    const loadActivities = async () => {
      if (customerId === null) {
        if (active) {
          setActivities([])
          setLoading(false)
        }
        return
      }

      setLoading(true)

      try {
        const result = await customerActivityService.getByCustomer(customerId)

        if (active) {
          setActivities(result)
          setError('')
        }
      } catch {
        if (active) {
          setError('Failed to load customer activities.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }


    void loadActivities()


    return () => {
      active = false
    }
  }, [customerId, refreshKey])


  const addActivity = async (
    data: CreateCustomerActivityInput
  ): Promise<boolean> => {
    setSaving(true)


    try {
      await customerActivityService.create(data)
      refreshActivities()
      return true
    } catch {
      return false
    } finally {
      setSaving(false)
    }
  }


  const updateActivity = async (
    id: number,
    data: UpdateCustomerActivityInput
  ): Promise<boolean> => {
    setSaving(true)

    try {
      await customerActivityService.update(id, data)
      refreshActivities()
      return true
    } catch {
      return false
    } finally {
      setSaving(false)
    }
  }


  const deleteActivity = async (id: number): Promise<boolean> => {
    setDeletingId(id)

    try {
      await customerActivityService.delete(id)
      refreshActivities()
      return true
    } catch {
      return false
    } finally {
      setDeletingId(null)
    }
  }

  
  return {
    activities,
    loading,
    error,
    saving,
    deletingId,
    refreshActivities,
    addActivity,
    updateActivity,
    deleteActivity,
  }
}
