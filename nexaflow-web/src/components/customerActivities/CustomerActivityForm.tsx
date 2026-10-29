
import { useState } from 'react'
import type {
  CustomerActivity,
  CustomerActivityType,
  UpdateCustomerActivityInput,
} from '../../types/customerActivity'

interface CustomerActivityFormProps {
  editingActivity: CustomerActivity | null
  saving: boolean
  onSubmit: (data: UpdateCustomerActivityInput) => Promise<boolean>
  onCancel: () => void
}

function CustomerActivityForm({
  editingActivity,
  saving,
  onSubmit,
  onCancel,
}: CustomerActivityFormProps) {
  const [type, setType] = useState<CustomerActivityType>(
    editingActivity?.type ?? 'Call'
  )

  const [description, setDescription] = useState(
    editingActivity?.description ?? ''
  )

  const [followUpDate, setFollowUpDate] = useState(
    editingActivity?.followUpDate
      ? editingActivity.followUpDate.slice(0, 16)
      : ''
  )

  const [error, setError] = useState('')

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (!description.trim()) {
      setError('Please enter a description.')
      return
    }

    const success = await onSubmit({
      type,
      description: description.trim(),
      followUpDate: followUpDate
        ? new Date(followUpDate).toISOString()
        : null,
    })

    if (success && !editingActivity) {
      setType('Call')
      setDescription('')
      setFollowUpDate('')
    }

    if (!success) {
      setError('Failed to save customer activity.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-xl bg-white p-6 shadow-sm"
    >
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        {editingActivity ? 'Edit Activity' : 'Record New Activity'}
      </h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="activity-type"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Activity Type
          </label>

          <select
            id="activity-type"
            value={type}
            onChange={(e) =>
              setType(e.target.value as CustomerActivityType)
            }
            className="w-full rounded-lg border border-slate-300 p-3"
          >
            <option value="Call">Call</option>
            <option value="Email">Email</option>
            <option value="Meeting">Meeting</option>
            <option value="Note">Note</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="activity-description"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Description
          </label>

          <textarea
            id="activity-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            maxLength={1000}
            rows={4}
            placeholder="Describe the customer interaction..."
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        <div>
          <label
            htmlFor="activity-followup"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Follow-up Date (Optional)
          </label>

          <input
            id="activity-followup"
            type="datetime-local"
            value={followUpDate}
            onChange={(e) => setFollowUpDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving
              ? 'Saving...'
              : editingActivity
                ? 'Update Activity'
                : 'Add Activity'}
          </button>

          {editingActivity && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-300 px-5 py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default CustomerActivityForm