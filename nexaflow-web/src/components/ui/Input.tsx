
import { useId } from 'react'

import type {
  InputHTMLAttributes,
  ReactNode,
} from 'react'

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leadingIcon?: ReactNode
}

export default function Input({
  label,
  error,
  helperText,
  leadingIcon,
  id,
  className = '',
  required,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const errorId = `${inputId}-error`
  const helperId = `${inputId}-helper`

  const descriptionId = [
    error ? errorId : null,
    helperText ? helperId : null,
  ].filter(Boolean).join(' ') || undefined

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="nf-text-secondary block text-sm font-semibold"
        >
          {label}

          {required && (
            <span
              className="ml-1"
              style={{ color: 'var(--nf-danger)' }}
            >
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leadingIcon && (
          <span className="nf-text-muted pointer-events-none absolute inset-y-0 left-3 flex items-center">
            {leadingIcon}
          </span>
        )}

        <input
          {...props}
          id={inputId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={descriptionId}
          className={`
            nf-input nf-motion
            w-full min-h-11 rounded-xl border
            px-3.5 py-2.5 text-sm outline-none
            disabled:cursor-not-allowed disabled:opacity-60
            ${leadingIcon ? 'pl-10' : ''}
            ${error ? 'nf-input-error' : ''}
            ${className}
          `}
        />
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs"
          style={{ color: 'var(--nf-danger)' }}
        >
          {error}
        </p>
      )}

      {helperText && (
        <p
          id={helperId}
          className="nf-text-muted text-xs"
        >
          {helperText}
        </p>
      )}
    </div>
  )
}
