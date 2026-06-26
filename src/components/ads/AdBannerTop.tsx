import { AdPlaceholder } from './AdPlaceholder'

/**
 * Banner superior — recomendado entre el navbar y el contenido principal.
 * Tamaño típico: 728x90 (leaderboard) o responsive.
 */
export function AdBannerTop({ className }: { className?: string }) {
  return <AdPlaceholder size="Leaderboard 728x90" className={className} variant="horizontal" />
}
