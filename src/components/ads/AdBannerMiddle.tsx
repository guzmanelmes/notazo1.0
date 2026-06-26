import { AdPlaceholder } from './AdPlaceholder'

/**
 * Banner medio — recomendado dentro del contenido, entre secciones.
 * Tamaño típico: 300x250 (medium rectangle) o responsive.
 */
export function AdBannerMiddle({ className }: { className?: string }) {
  return <AdPlaceholder size="Medium Rectangle 300x250" className={className} variant="rectangle" />
}
