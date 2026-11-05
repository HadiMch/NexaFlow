
import { UsersRound } from 'lucide-react'

export default function CustomerEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{
          background: 'var(--nf-primary-soft)',
          color: 'var(--nf-primary-text)',
        }}
      >
        <UsersRound size={25} aria-hidden="true" />
      </div>

      <h3 className="nf-text-primary mt-4 text-lg font-bold">
        No customers found
      </h3>

      <p className="nf-text-muted mt-2 max-w-sm text-sm">
        Try another search or add your first customer.
      </p>
    </div>
  )
}
