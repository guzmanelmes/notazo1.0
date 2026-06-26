import { useMemo, useState } from 'react'
import { SEO } from '@/components/seo/SEO'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useHistory } from '@/hooks/useHistory'
import { calcularNotaNecesaria, mensajeMotivacional, colorPorPromedio } from '@/lib/calculations'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'notazo:que-necesito'

interface FormState {
  promedioActual: string
  ponderacionPendiente: string
  notaObjetivo: string
}

export function QueNotaNecesito() {
  const [valores, setValores] = useLocalStorage<FormState>(STORAGE_KEY, {
    promedioActual: '',
    ponderacionPendiente: '40',
    notaObjetivo: '4.0',
  })
  const { addEntry } = useHistory()
  const [tocado, setTocado] = useState(false)

  const handleChange = (campo: keyof FormState, valor: string) => {
    setValores((prev) => ({ ...prev, [campo]: valor }))
  }

  const resultado = useMemo(() => {
    const p = Number(valores.promedioActual.replace(',', '.'))
    const pond = Number(valores.ponderacionPendiente.replace(',', '.'))
    const obj = Number(valores.notaObjetivo.replace(',', '.'))

    if (Number.isNaN(p) || Number.isNaN(pond) || Number.isNaN(obj)) return null
    if (valores.promedioActual === '' || valores.ponderacionPendiente === '' || valores.notaObjetivo === '') {
      return null
    }

    return calcularNotaNecesaria({
      promedioActual: p,
      ponderacionPendiente: pond,
      notaObjetivo: obj,
    })
  }, [valores])

  const colores = resultado && resultado.posible ? colorPorPromedio(resultado.notaNecesaria) : null

  const handleGuardar = () => {
    if (!resultado || !resultado.posible) return
    addEntry({
      tipo: 'que-necesito',
      titulo: 'Cálculo: ¿Qué nota necesito?',
      resumen: `Con promedio ${valores.promedioActual}, necesitas un ${resultado.notaNecesaria.toFixed(2)} en la evaluación de ${valores.ponderacionPendiente}% para llegar a ${valores.notaObjetivo}`,
      promedio: resultado.notaNecesaria,
      datos: {
        promedioActual: valores.promedioActual,
        ponderacionPendiente: valores.ponderacionPendiente,
        notaObjetivo: valores.notaObjetivo,
        notaNecesaria: resultado.notaNecesaria.toFixed(2),
      },
    })
    const btn = document.getElementById('btn-guardar-qn')
    if (btn) {
      const original = btn.textContent
      btn.textContent = '✓ Guardado'
      setTimeout(() => { if (btn) btn.textContent = original }, 1500)
    }
  }

  return (
    <>
      <SEO
        title="¿Qué nota necesito? - Calculadora"
        description="Descubre qué nota necesitas en tu próxima evaluación para alcanzar tu objetivo académico. Ingresa tu promedio actual y la ponderación pendiente."
        canonical="/que-nota-necesito"
        keywords="qué nota necesito, calculadora nota necesaria, nota para aprobar, promedio final chile"
      />

      <div className="container-app py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">¿Qué nota necesito?</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Ingresa tu promedio actual y la ponderación pendiente para saber qué nota te falta.
          </p>
        </div>

        <AdBannerTop />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulario */}
          <Card>
            <CardHeader
              title="Datos"
              subtitle="Completa los tres campos para calcular."
            />
            <div className="space-y-4">
              <Input
                label="Promedio actual"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1.0"
                max="7.0"
                placeholder="Ej: 5.2"
                value={valores.promedioActual}
                onChange={(e) => handleChange('promedioActual', e.target.value)}
                onBlur={() => setTocado(true)}
                hint="Tu promedio acumulado hasta ahora."
                suffix="/ 7.0"
              />
              <Input
                label="Ponderación pendiente"
                type="number"
                inputMode="decimal"
                step="1"
                min="1"
                max="100"
                placeholder="Ej: 40"
                value={valores.ponderacionPendiente}
                onChange={(e) => handleChange('ponderacionPendiente', e.target.value)}
                hint="El porcentaje que falta por evaluar."
                suffix="%"
              />
              <Input
                label="Nota objetivo final"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1.0"
                max="7.0"
                placeholder="Ej: 4.0"
                value={valores.notaObjetivo}
                onChange={(e) => handleChange('notaObjetivo', e.target.value)}
                hint="El promedio final que quieres alcanzar."
                suffix="/ 7.0"
              />
              <Button
                onClick={() => {
                  setValores({ promedioActual: '', ponderacionPendiente: '40', notaObjetivo: '4.0' })
                  setTocado(false)
                }}
                variant="ghost"
                fullWidth
              >
                Limpiar
              </Button>
            </div>
          </Card>

          {/* Resultado */}
          <div>
            <Card hover className={cn(
              'border-2',
              !resultado
                ? 'border-gray-200 dark:border-gray-700'
                : resultado.posible
                  ? 'border-brand-300 dark:border-brand-700'
                  : 'border-red-300 dark:border-red-700'
            )}>
              <div className="text-center py-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Necesitas sacarte
                </p>
                {resultado ? (
                  <p
                    className={cn(
                      'text-7xl sm:text-8xl font-black tabular-nums',
                      resultado.posible ? 'text-brand-600 dark:text-brand-400' : 'text-red-600 dark:text-red-400'
                    )}
                  >
                    {resultado.notaNecesaria.toFixed(2)}
                  </p>
                ) : (
                  <p className="text-7xl sm:text-8xl font-black text-gray-300 dark:text-gray-700">
                    —
                  </p>
                )}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Escala 1.0 – 7.0
                </p>

                {resultado && (
                  <>
                    <div
                      className={cn(
                        'mt-5 rounded-xl p-4',
                        resultado.posible
                          ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-800 dark:text-brand-200'
                          : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                      )}
                    >
                      <p className="text-sm font-medium">{resultado.mensaje}</p>
                    </div>

                    {resultado.posible && colores && (
                      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 italic">
                        "{mensajeMotivacional(resultado.notaNecesaria)}"
                      </p>
                    )}

                    <Button
                      id="btn-guardar-qn"
                      onClick={handleGuardar}
                      disabled={!resultado.posible}
                      fullWidth
                      className="mt-6"
                    >
                      Guardar en historial
                    </Button>
                  </>
                )}

                {tocado && !resultado && (
                  <p className="mt-6 text-sm text-amber-600 dark:text-amber-400">
                    Completa todos los campos con valores válidos.
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>

        <AdBannerBottom />
      </div>
    </>
  )
}
