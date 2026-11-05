
import { Activity, Pencil, Trash2 } from 'lucide-react'
import type { Customer } from '../../types/customer'
import Button from '../ui/Button'

interface CustomerRowActionsProps {
  customer: Customer
  deletingId: number | null
  onEdit: (customer: Customer) => void
  onDelete: (id: number) => void
  onViewActivities: (customer: Customer) => void
}

export default function CustomerRowActions({
  customer,
  deletingId,
  onEdit,
  onDelete,
  onViewActivities,
}: CustomerRowActionsProps) {
  const isDeleting = deletingId === customer.id
  const isBusy = deletingId !== null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        icon={<Activity size={15} />}
        onClick={() => onViewActivities(customer)}
      >
        Activities
      </Button>

      <Button
        variant="outline"
        size="sm"
        icon={<Pencil size={15} />}
        onClick={() => onEdit(customer)}
      >
        Edit
      </Button>

      <Button
        variant="danger"
        size="sm"
        icon={<Trash2 size={15} />}
        disabled={isBusy}
        loading={isDeleting}
        onClick={() => onDelete(customer.id)}
      >
        Delete
      </Button>
    </div>
  )
}
