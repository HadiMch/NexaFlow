
import { useCallback, useEffect, useState } from 'react'
import { customerService } from '../services/customerService'
import type { Customer, CustomerInput } from '../types/customer'

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchCustomers = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await customerService.getAll()
      setCustomers(data)
    } catch {
      setError('Failed to load customers.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    async function loadCustomers() {
      try {
        const data = await customerService.getAll()
        if (active) setCustomers(data)
      } catch {
        if (active) setError('Failed to load customers.')
      } finally {
        if (active) setLoading(false)
      }
    }

    loadCustomers()

    return () => {
      active = false
    }
  }, [])

  const addCustomer = async (data: CustomerInput) => {
    setSaving(true)

    try {
      const customer = await customerService.create(data)

      setCustomers((prev) => [...prev, customer])
      return true
    } catch {
      return false
    } finally {
      setSaving(false)
    }
  }

  const updateCustomer = async (id: number, data: CustomerInput) => {
    setSaving(true)

    try {
      await customerService.update(id, data)
      await fetchCustomers()
      return true
    } catch {
      return false
    } finally {
      setSaving(false)
    }
  }

  const deleteCustomer = async (id: number) => {
    setDeletingId(id)

    try {
      await customerService.delete(id)

      setCustomers((prev) =>
        prev.filter((customer) => customer.id !== id)
      )

      return true
    } catch {
      return false
    } finally {
      setDeletingId(null)
    }
  }

  return {
    customers,
    loading,
    error,
    saving,
    deletingId,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  }
}
