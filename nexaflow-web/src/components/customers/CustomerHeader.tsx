
import { Plus, UsersRound } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'

interface CustomerHeaderProps {
  totalCount: number
  onAdd: () => void
}

export default function CustomerHeader({
  totalCount,
  onAdd,
}: CustomerHeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <Badge variant="primary">
          <UsersRound size={14} aria-hidden="true" />
          Customer Relationship Management
        </Badge>

        <h1 className="nf-text-primary mt-3 text-3xl font-bold tracking-tight">
          Customers
        </h1>

        <p className="nf-text-muted mt-2 max-w-2xl text-sm leading-6">
          Manage customer records, relationships,
          and communication from one workspace.
        </p>

        <p className="nf-text-secondary mt-3 text-sm">
          <span className="nf-text-primary font-bold">
            {totalCount.toLocaleString()}
          </span>
          {' '}matching customers
        </p>
      </div>

      <Button
        icon={<Plus size={18} />}
        onClick={onAdd}
      >
        Add Customer
      </Button>
    </header>
  )
}
