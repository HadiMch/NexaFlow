
import type { Customer } from '../../types/customer'

interface CustomerTableProps {
  customers: Customer[]
  deletingId: number | null
  onEdit: (customer: Customer) => void
  onDelete: (id: number) => void
  onViewActivities: (customer: Customer) => void
}

function CustomerTable({
  customers,
  deletingId,
  onEdit,
  onDelete,
  onViewActivities,
}: CustomerTableProps) {
  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Customer List
      </h2>

      {customers.length === 0 ? (
        <p className="text-slate-500">No customers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="p-3 text-slate-600">
                    {customer.id}
                  </td>

                  <td className="p-3 font-medium text-slate-900">
                    {customer.name}
                  </td>

                  <td className="p-3 text-slate-600">
                    {customer.email}
                  </td>

                  <td className="p-3 text-slate-600">
                    {customer.phone || '-'}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      
                      <button
                        type="button"
                        onClick={() => onViewActivities(customer)}
                        className="rounded-lg bg-emerald-50 px-4 py-2 text-emerald-700 hover:bg-emerald-100"
                      >
                        Activities
                      </button>
                      
                      
                      <button
                        type="button"
                        onClick={() => onEdit(customer)}
                        className="rounded-lg bg-indigo-50 px-4 py-2 text-indigo-600 hover:bg-indigo-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(customer.id)}
                        disabled={deletingId !== null}
                        className="rounded-lg bg-red-50 px-4 py-2 text-red-600 hover:bg-red-100 disabled:opacity-50"
                      >
                        {deletingId === customer.id
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

export default CustomerTable
