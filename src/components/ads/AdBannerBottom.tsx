import { AdPlaceholder } from './AdPlaceholder'

/**
 * Banner inferior — antes del footer.
 * Tamaño típico: 728x90 o responsive.
 */
export function AdBannerBottom({ className }: { className?: string }) {
  return <AdPlaceholder size="Leaderboard 728x90" className={className} variant="horizontal" />
}
