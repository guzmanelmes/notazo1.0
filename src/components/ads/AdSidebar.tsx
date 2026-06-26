import { AdPlaceholder } from './AdPlaceholder'

/**
 * Sidebar — solo visible en pantallas grandes (lg+).
 * Tamaño típico: 300x600 (half page) o 160x600 (skyscraper).
 */
export function AdSidebar({ className }: { className?: string }) {
  return (
    <aside className={`hidden lg:block sticky top-24 ${className ?? ''}`} aria-label="Sidebar publicitario">
      <AdPlaceholder size="Half Page 300x600" variant="vertical" />
    </aside>
  )
}
