
import type { CustomerActivity } from '../../types/customerActivity'

interface CustomerActivityTableProps {
  activities: CustomerActivity[]
  deletingId: number | null
  onEdit: (activity: CustomerActivity) => void
  onDelete: (id: number) => void
}

function CustomerActivityTable({
  activities,
  deletingId,
  onEdit,
  onDelete,
}: CustomerActivityTableProps) {
  function formatDate(date: string | null) {
    if (!date) return '-'

    return new Date(date).toLocaleString()
  }

  return (
    <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Activity History
      </h3>

      {activities.length === 0 ? (
        <p className="text-slate-500">
          No activities recorded for this customer yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Description</th>
                <th className="p-3">Follow-up</th>
                <th className="p-3">Created</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr
                  key={activity.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="p-3">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-700">
                      {activity.type}
                    </span>
                  </td>

                  <td className="max-w-xs whitespace-pre-wrap break-words p-3 text-slate-700">
                    {activity.description}
                  </td>

                  <td className="p-3 text-slate-600">
                    {formatDate(activity.followUpDate)}
                  </td>

                  <td className="p-3 text-slate-600">
                    {formatDate(activity.createdAt)}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(activity)}
                        className="rounded-lg bg-indigo-50 px-3 py-2 text-indigo-600 hover:bg-indigo-100"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(activity.id)}
                        disabled={deletingId !== null}
                        className="rounded-lg bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100 disabled:opacity-50"
                      >
                        {deletingId === activity.id
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

export default CustomerActivityTable