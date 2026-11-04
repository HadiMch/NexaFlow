
import type {
  HTMLAttributes,
  ReactNode,
} from 'react'

interface CardProps
  extends HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  action?: ReactNode
  noPadding?: boolean
}

export default function Card({
  title,
  description,
  action,
  noPadding = false,
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`nf-surface min-w-0 overflow-hidden ${className}`}
    >
      {(title || description || action) && (
        <div className="nf-card-header flex flex-wrap items-start justify-between gap-3 border-b px-5 py-4">
          <div className="min-w-0">
            {title && (
              <h3 className="nf-text-primary text-base font-bold tracking-tight">
                {title}
              </h3>
            )}

            {description && (
              <p className="nf-text-muted mt-1 text-sm leading-6">
                {description}
              </p>
            )}
          </div>

          {action}
        </div>
      )}

      <div className={noPadding ? '' : 'p-5'}>
        {children}
      </div>
    </div>
  )
}
