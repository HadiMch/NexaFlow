
import type { HTMLAttributes } from 'react'

type BadgeVariant =
  | 'neutral'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'

interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  dot?: boolean
}

export default function Badge({
  variant = 'neutral',
  dot = false,
  children,
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={`
        nf-badge nf-badge-${variant}
        inline-flex max-w-full items-center gap-1.5
        rounded-full border px-2.5 py-1
        text-xs font-semibold
        ${className}
      `}
    >
      {dot && (
        <span
          aria-hidden="true"
          className="nf-badge-dot h-1.5 w-1.5 shrink-0 rounded-full"
        />
      )}

      {children}
    </span>
  )
}
