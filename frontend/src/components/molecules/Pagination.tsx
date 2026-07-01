import { Button } from '@atoms/Button'
import type { PaginationState } from '@/types/ui'

type PaginationProps = PaginationState & {
  onPrev: () => void
  onNext: () => void
  className?: string
}

export function Pagination({ page, totalPages, onPrev, onNext, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className={`flex items-center justify-center gap-4 py-6 ${className}`}
    >
      <Button
        variant="secondary"
        onClick={onPrev}
        disabled={page === 0}
        aria-label="Previous page"
      >
        ← Prev
      </Button>
      <span className="text-sm text-gray-600 font-medium min-w-[120px] text-center">
        Page {page + 1} of {totalPages}
      </span>
      <Button
        variant="secondary"
        onClick={onNext}
        disabled={page >= totalPages - 1}
        aria-label="Next page"
      >
        Next →
      </Button>
    </nav>
  )
}
