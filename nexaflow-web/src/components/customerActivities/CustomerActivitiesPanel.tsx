
import { useState } from 'react'
import { useCustomerActivities } from '../../hooks/useCustomerActivities'
import type { Customer } from '../../types/customer'
import type {
  CustomerActivity,
  UpdateCustomerActivityInput,
} from '../../types/customerActivity'
import CustomerActivityForm from './CustomerActivityForm'
import CustomerActivityTable from './CustomerActivityTable'

interface CustomerActivitiesPanelProps {
  customer: Customer
  onClose: () => void
}

function CustomerActivitiesPanel({
  customer,
  onClose,
}: CustomerActivitiesPanelProps) {
  const {
    activities,
    loading,
    error,
    saving,
    deletingId,
    addActivity,
    updateActivity,
    deleteActivity,
  } = useCustomerActivities(customer.id)

  const [editingActivity, setEditingActivity] =
    useState<CustomerActivity | null>(null)

  async function handleSubmit(
    data: UpdateCustomerActivityInput
  ): Promise<boolean> {
    if (editingActivity) {
      const success = await updateActivity(editingActivity.id, data)

      if (success) {
        setEditingActivity(null)
      }

      return success
    }

    return addActivity({
      ...data,
      customerId: customer.id,
    })
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Delete this customer activity?')) return

    const success = await deleteActivity(id)

    if (success && editingActivity?.id === id) {
      setEditingActivity(null)
    }

    if (!success) {
      window.alert('Failed to delete the activity.')
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-indigo-100 bg-slate-50 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Activities — {customer.name}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage customer interactions and follow-ups.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-100"
        >
          Close
        </button>
      </div>

      <CustomerActivityForm
        key={editingActivity?.id ?? 'new'}
        editingActivity={editingActivity}
        saving={saving}
        onSubmit={handleSubmit}
        onCancel={() => setEditingActivity(null)}
      />

      {loading ? (
        <p className="mt-6 text-slate-500">Loading activities...</p>
      ) : error ? (
        <p role="alert" className="mt-6 text-red-600">
          {error}
        </p>
      ) : (
        <CustomerActivityTable
          activities={activities}
          deletingId={deletingId}
          onEdit={setEditingActivity}
          onDelete={handleDelete}
        />
      )}
    </section>
  )
}

export default CustomerActivitiesPanel
