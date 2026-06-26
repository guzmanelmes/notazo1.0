import { cn } from '@/lib/utils'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  fullScreen?: boolean
  label?: string
}

const sizeClasses = {
  sm: 'h-6 w-6 border-2',
  md: 'h-10 w-10 border-3',
  lg: 'h-16 w-16 border-4',
}

export function Loader({ size = 'md', fullScreen, label = 'Cargando...' }: LoaderProps) {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={cn(
          'animate-spin rounded-full border-brand-200 border-t-brand-600 dark:border-gray-700 dark:border-t-brand-400',
          sizeClasses[size]
        )}
        role="status"
        aria-label={label}
      />
      {label && (
        <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse-soft">{label}</p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
        role="alert"
        aria-busy="true"
      >
        {spinner}
      </div>
    )
  }

  return spinner
}
