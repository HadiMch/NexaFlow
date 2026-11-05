
import { Mail, Phone } from 'lucide-react'
import type { Customer } from '../../types/customer'
import CustomerRowActions from './CustomerRowActions'

interface CustomerMobileListProps {
  customers: Customer[]
  deletingId: number | null
  onEdit: (customer: Customer) => void
  onDelete: (id: number) => void
  onViewActivities: (customer: Customer) => void
}

export default function CustomerMobileList({
  customers,
  deletingId,
  onEdit,
  onDelete,
  onViewActivities,
}: CustomerMobileListProps) {
  return (
    <div className="space-y-3 p-4 md:hidden">
      {customers.map((customer) => (
        <article
          key={customer.id}
          className="rounded-xl border p-4"
          style={{
            background: 'var(--nf-surface-muted)',
            borderColor: 'var(--nf-border)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="nf-customer-avatar">
              {customer.name.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="nf-text-primary truncate font-semibold">
                {customer.name}
              </p>

              <p className="nf-text-muted text-xs">
                Customer #{customer.id}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <p className="nf-text-secondary flex items-start gap-2 break-all text-sm">
              <Mail
                size={16}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              {customer.email}
            </p>

            <p className="nf-text-secondary flex items-start gap-2 text-sm">
              <Phone
                size={16}
                className="mt-0.5 shrink-0"
                aria-hidden="true"
              />
              {customer.phone || 'No phone number'}
            </p>
          </div>

          <div
            className="mt-4 border-t pt-4"
            style={{ borderColor: 'var(--nf-border)' }}
          >
            <CustomerRowActions
              customer={customer}
              deletingId={deletingId}
              onEdit={onEdit}
              onDelete={onDelete}
              onViewActivities={onViewActivities}
            />
          </div>
        </article>
      ))}
    </div>
  )
}
