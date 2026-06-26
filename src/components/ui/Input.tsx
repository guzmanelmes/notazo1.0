import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  suffix?: ReactNode
  leftIcon?: ReactNode
}

export function Input({
  label,
  hint,
  error,
  suffix,
  leftIcon,
  className,
  id,
  ...rest
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full rounded-xl border bg-white px-3 py-2.5 text-sm sm:text-base text-gray-900 placeholder-gray-400 transition-colors',
            'border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20',
            'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500',
            'dark:focus:border-brand-400',
            Boolean(leftIcon) && 'pl-10',
            Boolean(suffix) && 'pr-12',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...rest}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-sm font-medium text-gray-500 dark:text-gray-400">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${inputId}-hint`} className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
          {hint}
        </p>
      )}
    </div>
  )
}
