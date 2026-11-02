
import { useCallback, useEffect, useState } from 'react'
import { businessTaskService } from '../../services/businessTaskService'

import type {
  BusinessTask,
  CreateBusinessTaskInput,
  UpdateBusinessTaskInput,
} from '../../types/businessTask'

export function useBusinessTasks() {
  const [tasks, setTasks] = useState<BusinessTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  // Trigger task list refresh
  const refreshTasks = useCallback(() => {
    setRefreshKey((previous) => previous + 1)
  }, [])

  // Load tasks when mounted or refreshed
  useEffect(() => {
    let active = true

    async function loadTasks() {
      if (!active) return

      setLoading(true)

      try {
        const result = await businessTaskService.getAll()

        if (active) {
          setTasks(result)
          setError('')
        }
      } catch {
        if (active) {
          setError('Failed to load tasks. Please try again.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    const timeout = setTimeout(() => {
      void loadTasks()
    }, 0)

    return () => {
      active = false
      clearTimeout(timeout)
    }
  }, [refreshKey])

  // Create task
  const addTask = async (
    data: CreateBusinessTaskInput
  ): Promise<boolean> => {
    setSaving(true)

    try {
      await businessTaskService.create(data)
      refreshTasks()
      return true
    } catch {
      return false
    } finally {
      setSaving(false)
    }
  }

  // Update task
  const updateTask = async (
    id: number,
    data: UpdateBusinessTaskInput
  ): Promise<boolean> => {
    setSaving(true)

    try {
      await businessTaskService.update(id, data)
      refreshTasks()
      return true
    } catch {
      return false
    } finally {
      setSaving(false)
    }
  }

  // Delete task
  const deleteTask = async (id: number): Promise<boolean> => {
    setDeletingId(id)

    try {
      await businessTaskService.delete(id)
      refreshTasks()
      return true
    } catch {
      return false
    } finally {
      setDeletingId(null)
    }
  }

  return {
    tasks,
    loading,
    error,
    saving,
    deletingId,
    refreshTasks,
    addTask,
    updateTask,
    deleteTask,
  }
}
