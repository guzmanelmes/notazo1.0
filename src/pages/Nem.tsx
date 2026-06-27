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
import { calcularNEM } from '@/lib/calculations'
import { cn, roundTo } from '@/lib/utils'

const STORAGE_KEY = 'notazo:nem'

interface FormState {
  // Promedios anuales (1°, 2°, 3°, 4° medio)
  primero: string
  segundo: string
  tercero: string
  cuarto: string
}

export function Nem() {
  const [valores, setValores] = useLocalStorage<FormState>(STORAGE_KEY, {
    primero: '',
    segundo: '',
    tercero: '',
    cuarto: '',
  })
  const { addEntry } = useHistory()

  const handleChange = (campo: keyof FormState, valor: string) => {
    setValores((prev) => ({ ...prev, [campo]: valor }))
  }

  const resultado = useMemo(() => {
    const notas = [valores.primero, valores.segundo, valores.tercero, valores.cuarto]
      .map((v) => Number(v.replace(',', '.')))
      .filter((n) => !Number.isNaN(n) && n >= 1.0 && n <= 7.0)

    if (notas.length === 0) return null
    return calcularNEM({ notas })
  }, [valores])

  const handleGuardar = () => {
    if (!resultado) return
    addEntry({
      tipo: 'nem',
      titulo: 'Cálculo NEM',
      resumen: `NEM calculado: ${resultado.promedio.toFixed(2)} (${valores.primero || '—'}, ${valores.segundo || '—'}, ${valores.tercero || '—'}, ${valores.cuarto || '—'})`,
      promedio: resultado.promedio,
      datos: {
        primero: valores.primero,
        segundo: valores.segundo,
        tercero: valores.tercero,
        cuarto: valores.cuarto,
        nemFinal: resultado.promedio.toFixed(2),
      },
    })
    const btn = document.getElementById('btn-guardar-nem')
    if (btn) {
      const original = btn.textContent
      btn.textContent = '✓ Guardado'
      setTimeout(() => { if (btn) btn.textContent = original }, 1500)
    }
  }

  const notas = [valores.primero, valores.segundo, valores.tercero, valores.cuarto]
  const notasValidas = notas.filter((v) => {
    const n = Number(v.replace(',', '.'))
    return !Number.isNaN(n) && n >= 1.0 && n <= 7.0
  })

  return (
    <>
      <SEO
        title="Calculadora NEM (Notas de Enseñanza Media) - Chile"
        description="Calcula tu NEM promedio de enseñanza media para la PAES. Ingresa tus promedios de 1° a 4° medio y obtén tu NEM al instante."
        canonical="/nem"
        keywords="calculadora NEM, notas enseñanza media, NEM Chile, promedio notas media, PAES NEM"
      />

      <div className="container-app py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Calculadora NEM</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Calcula tu promedio de Notas de Enseñanza Media (NEM) para la PAES.
          </p>
        </div>

        <AdBannerTop />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              title="Promedios anuales"
              subtitle="Ingresa el promedio de cada año de enseñanza media."
            />
            <div className="space-y-4">
              <Input
                label="1° Medio"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1.0"
                max="7.0"
                placeholder="Ej: 6.2"
                value={valores.primero}
                onChange={(e) => handleChange('primero', e.target.value)}
                suffix="/ 7.0"
              />
              <Input
                label="2° Medio"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1.0"
                max="7.0"
                placeholder="Ej: 5.8"
                value={valores.segundo}
                onChange={(e) => handleChange('segundo', e.target.value)}
                suffix="/ 7.0"
              />
              <Input
                label="3° Medio"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1.0"
                max="7.0"
                placeholder="Ej: 6.0"
                value={valores.tercero}
                onChange={(e) => handleChange('tercero', e.target.value)}
                suffix="/ 7.0"
              />
              <Input
                label="4° Medio"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="1.0"
                max="7.0"
                placeholder="Ej: 6.3"
                value={valores.cuarto}
                onChange={(e) => handleChange('cuarto', e.target.value)}
                suffix="/ 7.0"
              />

              <div className="text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                💡 Deja en blanco los años que aún no has cursado. El cálculo se hace con los años válidos.
              </div>
            </div>
          </Card>

          <Card hover className={cn(
            'border-2',
            !resultado
              ? 'border-gray-200 dark:border-gray-700'
              : resultado.promedio >= 6.0
                ? 'border-emerald-300 dark:border-emerald-700'
                : resultado.promedio >= 5.0
                  ? 'border-blue-300 dark:border-blue-700'
                  : resultado.promedio >= 4.0
                    ? 'border-amber-300 dark:border-amber-700'
                    : 'border-red-300 dark:border-red-700'
          )}>
            <div className="text-center py-6">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Tu NEM
              </p>
              {resultado ? (
                <>
                  <p
                    className={cn(
                      'text-7xl sm:text-8xl font-black tabular-nums',
                      resultado.promedio >= 6.0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : resultado.promedio >= 5.0
                          ? 'text-blue-600 dark:text-blue-400'
                          : resultado.promedio >= 4.0
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-red-600 dark:text-red-400'
                    )}
                  >
                    {resultado.promedio.toFixed(2)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Promedio de {notasValidas.length} {notasValidas.length === 1 ? 'año' : 'años'}
                  </p>

                  {/* Visualización de los años */}
                  <div className="mt-5 flex justify-center gap-2 flex-wrap">
                    {notas.map((n, idx) => {
                      const num = Number(n.replace(',', '.'))
                      const valido = !Number.isNaN(num) && num >= 1.0 && num <= 7.0
                      if (!valido) return null
                      return (
                        <div key={idx} className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-center min-w-[60px]">
                          <div className="text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400">
                            {idx + 1}°M
                          </div>
                          <div className="text-base font-bold tabular-nums">{roundTo(num, 1)}</div>
                        </div>
                      )
                    })}
                  </div>

                  <Button
                    id="btn-guardar-nem"
                    onClick={handleGuardar}
                    fullWidth
                    className="mt-6"
                  >
                    Guardar en historial
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-7xl sm:text-8xl font-black text-gray-300 dark:text-gray-700">—</p>
                  <p className="mt-3 text-sm text-gray-500">Ingresa al menos un promedio válido.</p>
                </>
              )}
            </div>
          </Card>
        </div>

        <AdBannerMiddle />

        <Card className="mt-6">
          <h2 className="text-xl font-bold mb-3">¿Qué es el NEM?</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            El <strong>NEM (Notas de Enseñanza Media)</strong> es el promedio de las notas de
            1° a 4° medio. Es uno de los factores que componen el puntaje de la <strong>PAES</strong> para
            el ingreso a la educación superior, junto con el ranking de notas y las pruebas
            obligatorias (Competencia Lectora y Competencia Matemática).
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
            Cuanto más alto sea tu NEM, mayor será tu puntaje en la PAES. Por eso es tan
            importante mantener un buen rendimiento a lo largo de toda la enseñanza media.
          </p>
        </Card>

        <AdBannerBottom />
      </div>
    </>
  )
}
