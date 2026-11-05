
import { AlertTriangle } from 'lucide-react'
import Button from './Button'
import Modal from './Modal'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      size="md"
      title={title}
      description="Please review this action carefully."
      disableClose={loading}
      onClose={onCancel}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: 'var(--nf-danger-soft)',
            color: 'var(--nf-danger)',
          }}
        >
          <AlertTriangle size={23} />
        </div>

        <div>
          <p className="nf-text-secondary text-sm leading-7">
            {description}
          </p>

          <p className="nf-text-muted mt-2 text-xs">
            This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button
          variant="outline"
          disabled={loading}
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          loading={loading}
          onClick={onConfirm}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
