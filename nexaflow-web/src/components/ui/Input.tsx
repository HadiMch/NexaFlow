
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

  const descriptionId = error
    ? errorId
    : helperText
      ? helperId
      : undefined

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <div className="relative">
        {leadingIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
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
            nf-motion w-full min-h-11 rounded-xl
            border bg-white px-3.5 py-2.5
            text-sm text-slate-900
            outline-none transition-colors
            placeholder:text-slate-400
            focus:ring-2
            disabled:cursor-not-allowed
            disabled:bg-slate-100
            disabled:text-slate-500
            ${
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
                : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
            }
            ${leadingIcon ? 'pl-10' : ''}
            ${className}
          `}
        />
      </div>

      {error ? (
        <p
          id={errorId}
          role="alert"
          className="text-xs text-red-600"
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={helperId}
          className="text-xs text-slate-500"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  )
}
