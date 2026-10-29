
import type { Product } from '../../types/product'

interface ProductTableProps {
  products: Product[]
  deletingId: number | null
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

function ProductTable({products,
  deletingId,onEdit,onDelete,}: ProductTableProps) {
  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Inventory Products
      </h2>

      {products.length === 0 ? (
        <p className="text-slate-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Product</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="p-3 text-slate-600">
                    {product.id}
                  </td>

                  <td className="p-3 font-medium text-slate-900">
                    {product.name}
                  </td>

                  <td className="p-3 text-slate-600">
                    {product.sku}
                  </td>

                  
                  <td className="p-3">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    product.quantity === 0? 'bg-red-100 text-red-700': product.quantity <= 5? 'bg-amber-100 text-amber-700'
                    : 'bg-green-100 text-green-700'}`}>
                      {product.quantity === 0? 'Out of Stock': product.quantity <= 5? `Low Stock (${product.quantity})`
                      : `In Stock (${product.quantity})`}
                    </span>
                  </td>


                  <td className="p-3 text-slate-600">
                    ${product.price.toFixed(2)}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(product)}
                        className="rounded-lg bg-indigo-50 px-4 py-2 text-indigo-600 hover:bg-indigo-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(product.id)}
                        disabled={deletingId !== null}
                        className="rounded-lg bg-red-50 px-4 py-2 text-red-600 hover:bg-red-100 disabled:opacity-50"
                      >
                        {deletingId === product.id
                          ? 'Deleting...'
                          : 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProductTable
