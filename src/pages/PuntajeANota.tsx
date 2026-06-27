import { useMemo } from 'react'
import { SEO } from '@/components/seo/SEO'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'
import { AdBannerMiddle } from '@/components/ads/AdBannerMiddle'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useHistory } from '@/hooks/useHistory'
import { puntajeANota } from '@/lib/calculations'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'notazo:puntaje'

interface FormState {
  puntaje: string
  puntajeMaximo: string
  exigencia: string
  notaMinima: string
}

export function PuntajeANota() {
  const [valores, setValores] = useLocalStorage<FormState>(STORAGE_KEY, {
    puntaje: '',
    puntajeMaximo: '100',
    exigencia: '60',
    notaMinima: '4.0',
  })
  const { addEntry } = useHistory()

  const handleChange = (campo: keyof FormState, valor: string) => {
    setValores((prev) => ({ ...prev, [campo]: valor }))
  }

  const resultado = useMemo(() => {
    const p = Number(valores.puntaje.replace(',', '.'))
    const pm = Number(valores.puntajeMaximo.replace(',', '.'))
    const ex = Number(valores.exigencia.replace(',', '.'))
    const nm = Number(valores.notaMinima.replace(',', '.'))
    if (Number.isNaN(p) || Number.isNaN(pm)) return null
    if (valores.puntaje === '') return null

    return puntajeANota({
      puntaje: p,
      puntajeMaximo: pm,
      exigencia: Number.isNaN(ex) ? 60 : ex,
      notaMinima: Number.isNaN(nm) ? 4.0 : nm,
    })
  }, [valores])

  const handleGuardar = () => {
    if (!resultado) return
    addEntry({
      tipo: 'puntaje',
      titulo: 'Conversión puntaje → nota',
      resumen: `${valores.puntaje}/${valores.puntajeMaximo} (${resultado.porcentaje}%) = nota ${resultado.nota.toFixed(2)}`,
      promedio: resultado.nota,
      datos: {
        puntaje: valores.puntaje,
        puntajeMaximo: valores.puntajeMaximo,
        exigencia: valores.exigencia,
        notaMinima: valores.notaMinima,
        notaObtenida: resultado.nota.toFixed(2),
      },
    })
    const btn = document.getElementById('btn-guardar-pn')
    if (btn) {
      const original = btn.textContent
      btn.textContent = '✓ Guardado'
      setTimeout(() => { if (btn) btn.textContent = original }, 1500)
    }
  }

  return (
    <>
      <SEO
        title="Convertir Puntaje a Nota (1.0 a 7.0)"
        description="Convierte cualquier puntaje a la escala chilena de notas 1.0 a 7.0. Configura la exigencia y la nota mínima de aprobación."
        canonical="/puntaje-a-nota"
        keywords="convertir puntaje a nota, puntaje a nota chile, calculadora puntaje nota, escala notas chilenas, puntaje PAES a nota"
      />

      <div className="container-app py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Convertir Puntaje a Nota</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Convierte un puntaje bruto (sobre 100, 1000, etc.) a la escala chilena de notas 1.0 a 7.0.
          </p>
        </div>

        <AdBannerTop />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Datos"
              subtitle="Ingresa tu puntaje y configura los parámetros."
            />
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Puntaje obtenido"
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  min="0"
                  placeholder="72"
                  value={valores.puntaje}
                  onChange={(e) => handleChange('puntaje', e.target.value)}
                />
                <Input
                  label="Puntaje máximo"
                  type="number"
                  inputMode="decimal"
                  step="1"
                  min="1"
                  placeholder="100"
                  value={valores.puntajeMaximo}
                  onChange={(e) => handleChange('puntajeMaximo', e.target.value)}
                />
              </div>

              <Input
                label="Exigencia (nota 4.0)"
                type="number"
                inputMode="decimal"
                step="1"
                min="1"
                max="99"
                placeholder="60"
                value={valores.exigencia}
                onChange={(e) => handleChange('exigencia', e.target.value)}
                hint="Porcentaje de puntaje necesario para obtener un 4.0. Lo estándar es 60%."
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
                value={valores.notaMinima}
                onChange={(e) => handleChange('notaMinima', e.target.value)}
                hint="En Chile suele ser 4.0."
                suffix="/ 7.0"
              />

              {/* Presets rápidos */}
              <div>
                <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                  Presets rápidos:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setValores((p) => ({ ...p, puntajeMaximo: '100', exigencia: '60' }))}
                  >
                    Prueba /100 (60%)
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setValores((p) => ({ ...p, puntajeMaximo: '1000', exigencia: '60' }))}
                  >
                    PAES /1000
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setValores((p) => ({ ...p, puntajeMaximo: '70', exigencia: '70' }))}
                  >
                    Solemne /70
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <Card hover className={cn(
            'border-2',
            !resultado
              ? 'border-gray-200 dark:border-gray-700'
              : resultado.aprobado
                ? 'border-emerald-300 dark:border-emerald-700'
                : 'border-red-300 dark:border-red-700'
          )}>
            <div className="text-center py-6">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Nota equivalente
              </p>
              {resultado ? (
                <>
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-2xl sm:text-3xl font-bold text-gray-500">
                      {valores.puntaje}/{valores.puntajeMaximo}
                    </p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400" aria-hidden="true">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p
                    className={cn(
                      'text-7xl sm:text-8xl font-black tabular-nums mt-2',
                      resultado.aprobado
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-600 dark:text-red-400'
                    )}
                  >
                    {resultado.nota.toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {resultado.porcentaje}% de logro · Escala 1.0 – 7.0
                  </p>

                  <div
                    className={cn(
                      'mt-5 rounded-xl p-4',
                      resultado.aprobado
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200'
                        : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                    )}
                  >
                    <p className="text-sm font-medium">{resultado.mensaje}</p>
                  </div>

                  <Button
                    id="btn-guardar-pn"
                    onClick={handleGuardar}
                    fullWidth
                    className="mt-6"
                  >
                    Guardar en historial
                  </Button>
                </>
              ) : (
                <p className="text-7xl sm:text-8xl font-black text-gray-300 dark:text-gray-700">—</p>
              )}
            </div>
          </Card>
        </div>

        <AdBannerMiddle />

        <Card className="mt-6">
          <h2 className="text-xl font-bold mb-2">¿Cómo funciona la conversión?</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            La fórmula utilizada es la estándar chilena usada por universidades y en pruebas como la PAES:
          </p>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
            <li>
              Si tu puntaje es menor al de exigencia, tu nota estará entre{' '}
              <strong>1.0 y {valores.notaMinima || '4.0'}</strong>.
            </li>
            <li>
              Si tu puntaje es igual o mayor al de exigencia, tu nota estará entre{' '}
              <strong>{valores.notaMinima || '4.0'} y 7.0</strong>.
            </li>
            <li>
              El cálculo es lineal (una regla de tres simple) entre los tramos.
            </li>
          </ul>
        </Card>

        <AdBannerBottom />
      </div>
    </>
  )
}
