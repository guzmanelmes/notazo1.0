import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  color?: 'brand' | 'success' | 'warning' | 'danger'
  showLabel?: boolean
  label?: string
  className?: string
}

const colorClasses = {
  brand: 'bg-brand-600',
  success: 'bg-emerald-600',
  warning: 'bg-amber-500',
  danger: 'bg-red-600',
}

export function ProgressBar({
  value,
  max = 100,
  color = 'brand',
  showLabel,
  label,
  className,
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
          {showLabel && (
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {pct.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', colorClasses[color])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
