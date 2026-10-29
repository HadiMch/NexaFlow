
import { useState } from 'react'
import CustomerForm from '../components/customers/CustomerForm'
import CustomerTable from '../components/customers/CustomerTable'
import { useCustomers } from '../hooks/useCustomers'
import type { Customer, CustomerInput } from '../types/customer'
import CustomerActivitiesPanel from '../components/customerActivities/CustomerActivitiesPanel'


function Customers() {
  const {
    customers,
    loading,
    error,
    saving,
    deletingId,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    page,
    search,
    totalCount,
    totalPages,
    setPage,
    changeSearch,
  } = useCustomers()

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  async function handleSubmit(data: CustomerInput): Promise<boolean> {
    if (editingCustomer) {
      const success = await updateCustomer(editingCustomer.id, data)

      if (success) {
        setEditingCustomer(null)
      }

      return success
    }

    return await addCustomer(data)
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this customer?'
    )

    if (!confirmed) return

    const success = await deleteCustomer(id)

    if (success) {
      if (editingCustomer?.id === id) {
        setEditingCustomer(null)
      }
    } else {
      alert('Failed to delete customer.')
    }
  }

  function handleEdit(customer: Customer) {
    setEditingCustomer(customer)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* Page Header */}
      <h1 className="text-3xl font-bold text-slate-900">
        Customers
      </h1>

      <p className="mt-2 text-slate-500">
        Manage your business customers here.
      </p>

      {/* Add / Edit Form */}
      <CustomerForm
        key={editingCustomer?.id ?? 'new'}
        editingCustomer={editingCustomer}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={() => setEditingCustomer(null)}
      />

      {/* Search */}
      <div className="mt-8 rounded-xl bg-white p-4 shadow-sm">
        <input
          type="search"
          value={search}
          onChange={(e) => changeSearch(e.target.value)}
          placeholder="Search customers by name..."
          aria-label="Search customers by name"
          className="w-full rounded-lg border border-slate-300 p-3 text-slate-900 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      {/* Customer Results */}
      {loading ? (
        <p className="mt-8 text-slate-500">
          Loading customers...
        </p>
      ) : error ? (
        <p role="alert" className="mt-8 text-red-600">
          {error}
        </p>
      ) : (
        <>
          <CustomerTable
            customers={customers}
            deletingId={deletingId}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onViewActivities={(customer) => {setSelectedCustomer(customer)}}
          />
          
          {selectedCustomer && (
            <CustomerActivitiesPanel
             key={selectedCustomer.id}
             customer={selectedCustomer}
             onClose={() => setSelectedCustomer(null)}
            />
          )}

          {/* Pagination */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              {totalCount} customer(s) found
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={page <= 1 || loading}
                onClick={() => setPage(page - 1)}
                className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40"
              >
                Previous
              </button>

              <span className="text-sm text-slate-700">
                Page {page} of {Math.max(totalPages, 1)}
              </span>

              <button
                type="button"
                disabled={page >= totalPages || loading}
                onClick={() => setPage(page + 1)}
                className="rounded-lg border bg-white px-4 py-2 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Customers
