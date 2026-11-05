
import { ChevronLeft, ChevronRight } from 'lucide-react'

import Button from '../ui/Button'

interface CustomerPaginationProps {
  page: number
  totalPages: number
  totalCount: number
  loading: boolean
  onPageChange: (page: number) => void
}

export default function CustomerPagination({
  page,
  totalPages,
  totalCount,
  loading,
  onPageChange,
}: CustomerPaginationProps) {
  const pageCount = Math.max(totalPages, 1)

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <p
        className="nf-text-muted text-sm"
        aria-live="polite"
      >
        {totalCount.toLocaleString()}{' '}
        {totalCount === 1 ? 'customer' : 'customers'} found
      </p>

      <nav
        aria-label="Customer pagination"
        className="flex items-center gap-2"
      >
        <Button
          variant="outline"
          size="sm"
          icon={<ChevronLeft size={16} />}
          disabled={loading || page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        <span className="nf-text-secondary px-2 text-xs sm:text-sm">
          Page {page} of {pageCount}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={loading || page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <ChevronRight size={16} />
        </Button>
      </nav>
    </div>
  )
}
