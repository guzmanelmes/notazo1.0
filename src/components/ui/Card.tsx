import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  children: ReactNode
}

export function Card({ className, hover, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'card-base p-5 sm:p-6',
        hover && 'transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  action?: ReactNode
}

export function CardHeader({ title, subtitle, icon, action }: CardHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="flex items-start gap-3 min-w-0">
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
