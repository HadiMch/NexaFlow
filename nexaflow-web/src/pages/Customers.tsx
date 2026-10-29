
import { useState } from 'react'
import CustomerForm from '../components/customers/CustomerForm'
import CustomerTable from '../components/customers/CustomerTable'
import { useCustomers } from '../hooks/useCustomers'
import type { Customer, CustomerInput } from '../types/customer'

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
  } = useCustomers()

  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

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
    const confirmed = window.confirm('Are you sure you want to delete this customer?')

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
      <h1 className="text-3xl font-bold text-slate-900">
        Customers
      </h1>

      <p className="mt-2 text-slate-500">
        Manage your business customers here.
      </p>

      <CustomerForm
        editingCustomer={editingCustomer}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={() => setEditingCustomer(null)}
      />

      {loading ? (
        <p className="mt-8 text-slate-500">
          Loading customers...
        </p>
      ) : error ? (
        <p role="alert" className="mt-8 text-red-600">
          {error}
        </p>
      ) : (
        <CustomerTable
          customers={customers}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default Customers
