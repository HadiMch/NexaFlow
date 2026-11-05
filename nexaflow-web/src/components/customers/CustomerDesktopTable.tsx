
import type { Customer } from '../../types/customer'
import CustomerRowActions from './CustomerRowActions'

interface CustomerDesktopTableProps {
  customers: Customer[]
  deletingId: number | null
  onEdit: (customer: Customer) => void
  onDelete: (id: number) => void
  onViewActivities: (customer: Customer) => void
}

export default function CustomerDesktopTable({
  customers,
  deletingId,
  onEdit,
  onDelete,
  onViewActivities,
}: CustomerDesktopTableProps) {
  
    return (
    <div className="hidden overflow-x-auto md:block">
      <table className="w-full min-w-[820px] text-left text-sm">
        <thead
          style={{
            background: 'var(--nf-surface-muted)',
            color: 'var(--nf-text-muted)',
          }}
        >
          <tr>
            <th scope="col" className="px-5 py-4 font-semibold">
              Customer
            </th>
            <th scope="col" className="px-5 py-4 font-semibold">
              Email
            </th>
            <th scope="col" className="px-5 py-4 font-semibold">
              Phone
            </th>
            <th scope="col" className="px-5 py-4 font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="nf-customer-row border-t"
              style={{
                borderColor: 'var(--nf-border-soft)',
              }}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="nf-customer-avatar">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="nf-text-primary font-semibold">
                      {customer.name}
                    </p>

                    <p className="nf-text-muted mt-1 text-xs">
                      #{customer.id}
                    </p>
                  </div>
                </div>
              </td>

              <td className="nf-text-secondary break-all px-5 py-4">
                {customer.email}
              </td>

              <td className="nf-text-secondary px-5 py-4">
                {customer.phone || '—'}
              </td>

              <td className="px-5 py-4">
                <CustomerRowActions
                  customer={customer}
                  deletingId={deletingId}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onViewActivities={onViewActivities}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
