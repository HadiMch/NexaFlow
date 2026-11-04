
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

const variants: Record<BadgeVariant, string> = {
  neutral:
    'border-slate-200 bg-slate-100 text-slate-700',

  primary:
    'border-indigo-100 bg-indigo-50 text-indigo-700',

  success:
    'border-emerald-100 bg-emerald-50 text-emerald-700',

  warning:
    'border-amber-100 bg-amber-50 text-amber-700',

  danger:
    'border-red-100 bg-red-50 text-red-700',
}

const dotColors: Record<BadgeVariant, string> = {
  neutral: 'bg-slate-500',
  primary: 'bg-indigo-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
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
        inline-flex max-w-full items-center
        gap-1.5 rounded-full border
        px-2.5 py-1 text-xs font-semibold
        ${variants[variant]}
        ${className}
      `}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotColors[variant]}`}
        />
      )}

      {children}
    </span>
  )
}
