
import type { Ref } from 'react'
import { X } from 'lucide-react'
import type { ModalHeaderProps } from '../../types/modal'

interface Props extends ModalHeaderProps {
  closeRef: Ref<HTMLButtonElement>
}

export default function ModalHeader({
  title,
  description,
  titleId,
  descriptionId,
  disableClose,
  onClose,
  closeRef,
}: Props) {
  return (
    <div
      className="flex shrink-0 items-start justify-between gap-4 border-b px-5 py-4 sm:px-6"
      style={{
        borderColor: 'var(--nf-border)',
      }}
    >
      <div className="min-w-0">
        <h2
          id={titleId}
          className="nf-text-primary text-xl font-bold tracking-tight"
        >
          {title}
        </h2>

        {description && (
          <p
            id={descriptionId}
            className="nf-text-muted mt-1 text-sm"
          >
            {description}
          </p>
        )}
      </div>

      <button
        ref={closeRef}
        type="button"
        disabled={disableClose}
        onClick={onClose}
        aria-label="Close dialog"
        className="nf-button-ghost nf-focusable rounded-lg p-2 disabled:opacity-40"
      >
        <X size={20} />
      </button>
    </div>
  )
}
