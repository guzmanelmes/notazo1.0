import { Link } from 'react-router-dom'
import { SEO } from '@/components/seo/SEO'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'
import { useHistory } from '@/hooks/useHistory'
import { exportarHistorialPDF } from '@/lib/pdfExport'
import { formatDate, cn } from '@/lib/utils'
import type { HistoryEntry } from '@/types'

const tipoLabel: Record<HistoryEntry['tipo'], string> = {
  promedio: 'Promedio',
  'que-necesito': '¿Qué nota?',
  examen: 'Examen final',
  eximicion: 'Eximición',
  puntaje: 'Puntaje → Nota',
  nem: 'NEM',
}

const tipoColor: Record<HistoryEntry['tipo'], string> = {
  promedio: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  'que-necesito': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  examen: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  eximicion: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  puntaje: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  nem: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
}

export function Historial() {
  const { history, removeEntry, clearHistory } = useHistory()

  const handleExportar = () => {
    exportarHistorialPDF(history)
  }

  const handleLimpiar = () => {
    if (confirm('¿Borrar todo el historial? Esta acción no se puede deshacer.')) {
      clearHistory()
    }
  }

  return (
    <>
      <SEO
        title="Historial"
        description="Revisa tu historial de cálculos y descárgalo en PDF."
        canonical="/historial"
        keywords="historial notas, exportar historial pdf"
      />

      <div className="container-app py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">Historial</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Tus cálculos guardados. Todo queda en tu dispositivo.
            </p>
          </div>
          {history.length > 0 && (
            <div className="flex gap-2">
              <Button onClick={handleExportar} variant="primary" leftIcon={<PdfIcon />}>
                Exportar PDF
              </Button>
              <Button onClick={handleLimpiar} variant="ghost">
                Vaciar
              </Button>
            </div>
          )}
        </div>

        <AdBannerTop />

        {history.length === 0 ? (
          <Card className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Sin cálculos guardados todavía</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Cuando uses cualquiera de nuestras calculadoras y presiones "Guardar en historial",
              aparecerá aquí.
            </p>
            <Link
              to="/calculadora-de-notas"
              className="btn-base gradient-bg px-4 py-2.5 text-sm sm:text-base text-white font-semibold mt-6 inline-flex"
            >
              Ir a la calculadora
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {history.map((entry) => (
              <Card key={entry.id} hover className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-bold', tipoColor[entry.tipo])}>
                        {tipoLabel[entry.tipo]}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(entry.fecha)}
                      </span>
                    </div>
                    <h3 className="font-bold text-base sm:text-lg">{entry.titulo}</h3>
                    <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">{entry.resumen}</p>
                    {entry.promedio !== undefined && (
                      <p className="mt-2 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Resultado: </span>
                        <span className="font-bold text-brand-600 dark:text-brand-400">
                          {entry.promedio.toFixed(2)}
                        </span>
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEntry(entry.id)}
                    className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                    aria-label="Eliminar entrada"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <AdBannerBottom />
      </div>
    </>
  )
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

function PdfIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
