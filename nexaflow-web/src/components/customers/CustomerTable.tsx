
import type { Customer } from '../../types/customer'
import CustomerEmptyState from './CustomerEmptyState'
import CustomerMobileList from './CustomerMobileList'
import CustomerDesktopTable from './CustomerDesktopTable'

interface CustomerTableProps {
  customers: Customer[]
  deletingId: number | null
  onEdit: (customer: Customer) => void
  onDelete: (id: number) => void
  onViewActivities: (customer: Customer) => void
}

export default function CustomerTable({
  customers,
  deletingId,
  onEdit,
  onDelete,
  onViewActivities,
}: CustomerTableProps) {
  if (customers.length === 0) {
    return <CustomerEmptyState />
  }

  const actions = {
    customers,
    deletingId,
    onEdit,
    onDelete,
    onViewActivities,
  }

  return (
    <>
      <CustomerMobileList {...actions} />
      <CustomerDesktopTable {...actions} />
    </>
  )
}
