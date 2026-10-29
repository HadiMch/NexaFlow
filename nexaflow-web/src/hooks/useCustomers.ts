
import { useCallback, useEffect, useState } from 'react'
import { customerService } from '../services/customerService'
import type { Customer, CustomerInput } from '../types/customer'

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [totalCount, setTotalCount] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const fetchCustomers = useCallback(async () => {
    setRefreshKey((previous) => previous + 1)
  }, [])

  useEffect(() => {
    let active = true

    const timeout = setTimeout(async () => {
      if (active) setLoading(true)
      
        try {
        const result = await customerService.getAll(
          page,
          pageSize,
          search
        )

        if (active) {
          setCustomers(result.items)
          setTotalCount(result.totalCount)
          setTotalPages(result.totalPages)
          setError('')
        }
      } catch {
        if (active) setError('Failed to load customers.')
      } finally {
        if (active) setLoading(false)
      }
    }, search ? 300 : 0)

    return () => {
      active = false
      clearTimeout(timeout)
    }
  }, [page, pageSize, search, refreshKey])

  const addCustomer = async (data: CustomerInput): Promise<boolean> => {
    setSaving(true)
    try {
      await customerService.create(data)
      await fetchCustomers()
      return true
    } catch {
      return false
    } finally {
      setSaving(false)
    }
  }

  const updateCustomer = async (
    id: number,
    data: CustomerInput
  ): Promise<boolean> => {
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

  const deleteCustomer = async (id: number): Promise<boolean> => {
    setDeletingId(id)
    try {
      await customerService.delete(id)

      if (customers.length === 1 && page > 1) {
        setPage(page - 1)
      } else {
        await fetchCustomers()
      }

      return true
    } catch {
      return false
    } finally {
      setDeletingId(null)
    }
  }

  const changeSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  return {
    customers,
    loading,
    error,
    saving,
    deletingId,
    page,
    pageSize,
    search,
    totalCount,
    totalPages,
    setPage,
    changeSearch,
    fetchCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  }
}
