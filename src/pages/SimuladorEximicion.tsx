import { useMemo } from 'react'
import { SEO } from '@/components/seo/SEO'
import { Card, CardHeader } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useHistory } from '@/hooks/useHistory'
import { calcularEximicion } from '@/lib/calculations'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'notazo:eximicion'

interface FormState {
  promedioActual: string
  notaMinimaEximicion: string
}

export function SimuladorEximicion() {
  const [valores, setValores] = useLocalStorage<FormState>(STORAGE_KEY, {
    promedioActual: '',
    notaMinimaEximicion: '5.5',
  })
  const { addEntry } = useHistory()

  const handleChange = (campo: keyof FormState, valor: string) => {
    setValores((prev) => ({ ...prev, [campo]: valor }))
  }

  const resultado = useMemo(() => {
    const p = Number(valores.promedioActual.replace(',', '.'))
    const n = Number(valores.notaMinimaEximicion.replace(',', '.'))
    if (Number.isNaN(p) || Number.isNaN(n)) return null
    if (valores.promedioActual === '') return null

    return calcularEximicion({ promedioActual: p, notaMinimaEximicion: n })
  }, [valores])

  const handleGuardar = () => {
    if (!resultado) return
    addEntry({
      tipo: 'eximicion',
      titulo: 'Simulación de eximición',
      resumen: resultado.eximido
        ? `Eximido con promedio ${valores.promedioActual} (mínimo ${valores.notaMinimaEximicion})`
        : `No eximido. Promedio ${valores.promedioActual}, faltan puntos para llegar a ${valores.notaMinimaEximicion}`,
      promedio: Number(valores.promedioActual),
      datos: {
        promedioActual: valores.promedioActual,
        notaMinimaEximicion: valores.notaMinimaEximicion,
        resultado: resultado.eximido ? 'Eximido' : 'Debe rendir examen',
      },
    })
    const btn = document.getElementById('btn-guardar-exi')
    if (btn) {
      const original = btn.textContent
      btn.textContent = '✓ Guardado'
      setTimeout(() => { if (btn) btn.textContent = original }, 1500)
    }
  }

  return (
    <>
      <SEO
        title="Simulador de Eximición"
        description="Averigua si te eximes del examen final según tu promedio actual. Ingresa tu promedio y la nota mínima de eximición."
        canonical="/simulador-eximicion"
        keywords="simulador eximicion, eximir examen chile, nota eximicion, promedio eximicion"
      />

      <div className="container-app py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Simulador de Eximición</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Descubre si te eximes del examen final con tu promedio actual.
          </p>
        </div>

        <AdBannerTop />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Datos"
              subtitle="Ingresa tu promedio y la nota de eximición de tu institución."
            />
            <div className="space-y-4">
              <Input
                label="Promedio actual"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1.0"
                max="7.0"
                placeholder="Ej: 5.8"
                value={valores.promedioActual}
                onChange={(e) => handleChange('promedioActual', e.target.value)}
                hint="Tu promedio acumulado hasta ahora."
                suffix="/ 7.0"
              />
              <Input
                label="Nota mínima para eximirse"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1.0"
                max="7.0"
                placeholder="5.5"
                value={valores.notaMinimaEximicion}
                onChange={(e) => handleChange('notaMinimaEximicion', e.target.value)}
                hint="Lo más común en Chile es 5.5 o 6.0. Confirma con tu institución."
                suffix="/ 7.0"
              />
            </div>
          </Card>

          <Card hover className={cn(
            'border-2 overflow-hidden',
            !resultado
              ? 'border-gray-200 dark:border-gray-700'
              : resultado.eximido
                ? 'border-emerald-300 dark:border-emerald-700'
                : 'border-amber-300 dark:border-amber-700'
          )}>
            <div className="text-center py-6">
              {resultado ? (
                resultado.eximido ? (
                  <>
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 mb-4 animate-bounce-in">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                      ¡Eximido!
                    </h2>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 max-w-xs mx-auto">
                      {resultado.mensaje}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400 mb-4 animate-bounce-in">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
                      Debes rendir examen
                    </h2>
                    <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 max-w-xs mx-auto">
                      {resultado.mensaje}
                    </p>
                  </>
                )
              ) : (
                <>
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-gray-800 mb-4">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-400">
                    Ingresa tu promedio
                  </h2>
                  <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
                    Completa el campo para ver si te eximes.
                  </p>
                </>
              )}

              <Button
                id="btn-guardar-exi"
                onClick={handleGuardar}
                disabled={!resultado}
                fullWidth
                className="mt-6"
              >
                Guardar en historial
              </Button>
            </div>
          </Card>
        </div>

        <AdBannerBottom />
      </div>
    </>
  )
}
