import { useMemo } from 'react'
import { SEO } from '@/components/seo/SEO'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useHistory } from '@/hooks/useHistory'
import { calcularNotaExamen, APROBACION_DEFAULT } from '@/lib/calculations'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'notazo:examen'

interface FormState {
  notaPresentacion: string
  ponderacionExamen: string
  notaAprobacion: string
}

export function CalculadoraExamenFinal() {
  const [valores, setValores] = useLocalStorage<FormState>(STORAGE_KEY, {
    notaPresentacion: '',
    ponderacionExamen: '30',
    notaAprobacion: APROBACION_DEFAULT.toFixed(1),
  })
  const { addEntry } = useHistory()

  const handleChange = (campo: keyof FormState, valor: string) => {
    setValores((prev) => ({ ...prev, [campo]: valor }))
  }

  const resultado = useMemo(() => {
    const np = Number(valores.notaPresentacion.replace(',', '.'))
    const pe = Number(valores.ponderacionExamen.replace(',', '.'))
    const na = Number(valores.notaAprobacion.replace(',', '.'))
    if (Number.isNaN(np) || Number.isNaN(pe) || Number.isNaN(na)) return null
    if (valores.notaPresentacion === '') return null

    return calcularNotaExamen({
      notaPresentacion: np,
      ponderacionExamen: pe,
      notaAprobacion: na,
    })
  }, [valores])

  const handleGuardar = () => {
    if (!resultado || !resultado.posible) return
    addEntry({
      tipo: 'examen',
      titulo: 'Cálculo examen final',
      resumen: `Con presentación ${valores.notaPresentacion}, necesitas ${resultado.notaExamen.toFixed(2)} en el examen (${valores.ponderacionExamen}%) para aprobar con ${valores.notaAprobacion}`,
      promedio: resultado.notaExamen,
      datos: {
        notaPresentacion: valores.notaPresentacion,
        ponderacionExamen: valores.ponderacionExamen,
        notaAprobacion: valores.notaAprobacion,
        notaExamen: resultado.notaExamen.toFixed(2),
      },
    })
    const btn = document.getElementById('btn-guardar-ex')
    if (btn) {
      const original = btn.textContent
      btn.textContent = '✓ Guardado'
      setTimeout(() => { if (btn) btn.textContent = original }, 1500)
    }
  }

  return (
    <>
      <SEO
        title="Calculadora de Examen Final"
        description="Calcula la nota mínima que necesitas en tu examen final para aprobar el ramo. Ingresa tu nota de presentación y la ponderación del examen."
        canonical="/calculadora-examen-final"
        keywords="calculadora examen final, nota examen, aprobar ramo, nota presentación chile"
      />

      <div className="container-app py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Calculadora de Examen Final</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Averigua qué nota necesitas en el examen final para aprobar el ramo.
          </p>
        </div>

        <AdBannerTop />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Datos del ramo"
              subtitle="Completa con tu situación académica actual."
            />
            <div className="space-y-4">
              <Input
                label="Nota de presentación"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1.0"
                max="7.0"
                placeholder="Ej: 5.0"
                value={valores.notaPresentacion}
                onChange={(e) => handleChange('notaPresentacion', e.target.value)}
                hint="Tu promedio acumulado antes del examen (acumulado de controles, tareas, etc.)."
                suffix="/ 7.0"
              />
              <Input
                label="Ponderación del examen"
                type="number"
                inputMode="decimal"
                step="1"
                min="1"
                max="99"
                placeholder="Ej: 30"
                value={valores.ponderacionExamen}
                onChange={(e) => handleChange('ponderacionExamen', e.target.value)}
                hint="El porcentaje que vale el examen final."
                suffix="%"
              />
              <Input
                label="Nota mínima de aprobación"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1.0"
                max="7.0"
                placeholder="4.0"
                value={valores.notaAprobacion}
                onChange={(e) => handleChange('notaAprobacion', e.target.value)}
                hint="En Chile suele ser 4.0."
                suffix="/ 7.0"
              />
            </div>
          </Card>

          <Card hover className={cn(
            'border-2',
            !resultado
              ? 'border-gray-200 dark:border-gray-700'
              : resultado.posible
                ? 'border-emerald-300 dark:border-emerald-700'
                : 'border-red-300 dark:border-red-700'
          )}>
            <div className="text-center py-6">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Necesitas en el examen
              </p>
              {resultado ? (
                <p
                  className={cn(
                    'text-7xl sm:text-8xl font-black tabular-nums',
                    resultado.posible
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-red-600 dark:text-red-400'
                  )}
                >
                  {resultado.notaExamen.toFixed(2)}
                </p>
              ) : (
                <p className="text-7xl sm:text-8xl font-black text-gray-300 dark:text-gray-700">—</p>
              )}
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Escala 1.0 – 7.0</p>

              {resultado && (
                <>
                  <div
                    className={cn(
                      'mt-5 rounded-xl p-4',
                      resultado.posible
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                    )}
                  >
                    <p className="text-sm font-medium">{resultado.mensaje}</p>
                  </div>

                  <Button
                    id="btn-guardar-ex"
                    onClick={handleGuardar}
                    disabled={!resultado.posible}
                    fullWidth
                    className="mt-6"
                  >
                    Guardar en historial
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>

        <AdBannerBottom />
      </div>
    </>
  )
}
