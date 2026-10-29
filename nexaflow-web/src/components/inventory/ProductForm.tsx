
import { useState, type FormEvent } from 'react'
import type { Product, ProductInput } from '../../types/product'

interface ProductFormProps {
  editingProduct: Product | null
  saving: boolean
  onSubmit: (data: ProductInput) => Promise<boolean>
  onCancel: () => void
}

function ProductForm({editingProduct, saving, onSubmit, onCancel,}: ProductFormProps) {
  const [name, setName] = useState(editingProduct?.name ?? '')
  const [sku, setSku] = useState(editingProduct?.sku ?? '')
  const [quantity, setQuantity] = useState(editingProduct?.quantity.toString() ?? '0')
  const [price, setPrice] = useState(editingProduct?.price.toString() ?? '0')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    const parsedQuantity = Number(quantity)
    const parsedPrice = Number(price)

    if (!name.trim() || !sku.trim()) {
      setError('Product name and SKU are required.')
      return
    }

    if (
      !Number.isInteger(parsedQuantity) ||parsedQuantity < 0 ||!Number.isFinite(parsedPrice) ||
      parsedPrice < 0 ||parsedPrice > 999999999) {
      setError('Enter a valid quantity and price.')
      return
    }

    const success = await onSubmit({
      name: name.trim(),
      sku: sku.trim(),
      quantity: parsedQuantity,
      price: parsedPrice,
    })

    if (success) {
      if (!editingProduct) {
        setName('')
        setSku('')
        setQuantity('0')
        setPrice('0')
      }
    } else {
      setError('Failed to save product. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        {editingProduct ? 'Edit Product' : 'Add Product'}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="product-name" className="mb-1 block text-sm text-slate-600">
            Product Name
          </label>
          <input
            id="product-name"
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={150}
          />
        </div>

        <div>
          <label htmlFor="product-sku" className="mb-1 block text-sm text-slate-600">
            SKU
          </label>
          <input
            id="product-sku"
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
            maxLength={50}
          />
        </div>

        <div>
          <label htmlFor="product-quantity" className="mb-1 block text-sm text-slate-600">
            Quantity
          </label>
          <input
            id="product-quantity"
            type="number"
            min="0"
            step="1"
            required
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="product-price" className="mb-1 block text-sm text-slate-600">
            Price
          </label>
          <input
            id="product-price"
            type="number"
            min="0"
            max="999999999"
            step="0.01"
            required
            className="w-full rounded-lg border border-slate-300 p-3 text-slate-900"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving
            ? 'Saving...'
            : editingProduct
              ? 'Save Changes'
              : 'Add Product'}
        </button>

        {editingProduct && (
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg bg-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ProductForm
