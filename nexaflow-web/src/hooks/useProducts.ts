
import { useCallback, useEffect, useState } from 'react'
import { productService } from '../services/productService'
import type { Product, ProductInput } from '../types/product'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await productService.getAll()
      setProducts(data)
    } catch {
      setError('Failed to load products.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    productService.getAll()
      .then((data) => {
        if (active) setProducts(data)
      })
      .catch(() => {
        if (active) setError('Failed to load products.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const addProduct = async (data: ProductInput): Promise<boolean> => {
    setSaving(true)

    try {
      const product = await productService.create(data)
      setProducts((prev) => [...prev, product])
      return true
    } catch {
      return false
    } finally {
      setSaving(false)
    }
  }

  const updateProduct = async (
    id: number,
    data: ProductInput
  ): Promise<boolean> => {
    setSaving(true)

    try {
      await productService.update(id, data)
      await fetchProducts()
      return true
    } catch {
      return false
    } finally {
      setSaving(false)
    }
  }

  const deleteProduct = async (id: number): Promise<boolean> => {
    setDeletingId(id)

    try {
      await productService.delete(id)
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      )
      return true
    } catch {
      return false
    } finally {
      setDeletingId(null)
    }
  }

  return {
    products,
    loading,
    error,
    saving,
    deletingId,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}