
import { useState } from 'react'
import ProductForm from '../components/inventory/ProductForm'
import ProductTable from '../components/inventory/ProductTable'
import { useProducts } from '../hooks/useProducts'
import type { Product, ProductInput } from '../types/product'

function Inventory() {
  const {
    products,
    loading,
    error,
    saving,
    deletingId,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts()

  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  async function handleSubmit(data: ProductInput): Promise<boolean> {
    if (editingProduct) {
      const success = await updateProduct(editingProduct.id, data)

      if (success) {
        setEditingProduct(null)
      }

      return success
    }

    return await addProduct(data)
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (!confirmed) return

    const success = await deleteProduct(id)

    if (success) {
      if (editingProduct?.id === id) {
        setEditingProduct(null)
      }
    } else {
      alert('Failed to delete product.')
    }
  }

  function handleEdit(product: Product) {
    setEditingProduct(product)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">
        Inventory Management
      </h1>

      <p className="mt-2 text-slate-500">
        Manage your products, prices, and stock quantities.
      </p>

      <ProductForm
        key={editingProduct?.id ?? 'new'}
        editingProduct={editingProduct}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={() => setEditingProduct(null)}
      />

      {loading ? (
        <p className="mt-8 text-slate-500">
          Loading products...
        </p>
      ) : error ? (
        <p role="alert" className="mt-8 text-red-600">
          {error}
        </p>
      ) : (
        <ProductTable
          products={products}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Inventory
