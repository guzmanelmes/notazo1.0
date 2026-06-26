import { cn } from '@/lib/utils'

/**
 * Placeholder de banner publicitario.
 *
 * Para activar AdSense real:
 * 1. Obtén tu ID de cliente (ca-pub-XXXXXXXXXXXXXXXX)
 * 2. Reemplaza el contenido del <div> interior por el bloque de AdSense
 * 3. Asegúrate de cargar el script en index.html
 *
 * Ejemplo AdSense:
 * <ins class="adsbygoogle"
 *      style={{ display: 'block' }}
 *      data-ad-client="ca-pub-XXXXXXXX"
 *      data-ad-slot="XXXXXXXXXX"
 *      data-ad-format="auto"
 *      data-full-width-responsive="true"></ins>
 * <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
 */

interface AdPlaceholderProps {
  size: string
  className?: string
  variant?: 'horizontal' | 'rectangle' | 'vertical'
}

const variantClasses = {
  horizontal: 'h-24 sm:h-28',
  rectangle: 'h-64',
  vertical: 'h-96',
}

export function AdPlaceholder({ size, className, variant = 'horizontal' }: AdPlaceholderProps) {
  return (
    <div
      role="complementary"
      aria-label="Espacio publicitario"
      className={cn(
        'my-6 w-full overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50',
        'flex items-center justify-center',
        variantClasses[variant],
        className
      )}
    >
      <div className="text-center px-4">
        <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Publicidad
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Espacio AdSense · {size}
        </div>
        <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          Reemplazar por código oficial de AdSense
        </div>
      </div>
    </div>
  )
}
