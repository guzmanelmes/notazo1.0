import { SEO } from '@/components/seo/SEO'
import { Card, CardHeader } from '@/components/ui/Card'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerMiddle } from '@/components/ads/AdBannerMiddle'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'
import { Link } from 'react-router-dom'

const ESCALA = [
  { rango: '6.5 – 7.0', concepto: 'Excelente', color: 'emerald', descripcion: 'Rendimiento destacado. Excede las expectativas.' },
  { rango: '5.5 – 6.4', concepto: 'Muy bueno', color: 'emerald', descripcion: 'Supera los objetivos de aprendizaje.' },
  { rango: '5.0 – 5.4', concepto: 'Bueno', color: 'blue', descripcion: 'Cumple sólidamente con los objetivos.' },
  { rango: '4.5 – 4.9', concepto: 'Suficiente alto', color: 'amber', descripcion: 'Cumple con lo esperado, con holgura.' },
  { rango: '4.0 – 4.4', concepto: 'Aprobado', color: 'amber', descripcion: 'Nota mínima de aprobación en Chile.' },
  { rango: '3.0 – 3.9', concepto: 'Reprobado', color: 'orange', descripcion: 'No alcanza los objetivos mínimos.' },
  { rango: '2.0 – 2.9', concepto: 'Deficiente', color: 'red', descripcion: 'Rendimiento muy por debajo de lo esperado.' },
  { rango: '1.0 – 1.9', concepto: 'Muy deficiente', color: 'red', descripcion: 'No demuestra los aprendizajes requeridos.' },
]

const colorMap: Record<string, string> = {
  emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  orange: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
}

export function EscalaNotas() {
  return (
    <>
      <SEO
        title="Escala de Notas en Chile (1.0 a 7.0) - Guía Completa"
        description="Conoce la escala de notas chilena: qué significa cada nota, equivalencias, conceptos y cómo se evalúa en enseñanza media y universitaria."
        canonical="/escala-de-notas"
        keywords="escala de notas chile, escala 1 a 7, notas chilenas, sistema de notas chile, equivalencia notas"
      />

      <div className="container-app py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Escala de Notas en Chile</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Conoce cómo funciona el sistema de evaluación chileno, qué significa cada nota
            y en qué tramo te encuentras.
          </p>
        </div>

        <AdBannerTop />

        <Card className="mb-6">
          <h2 className="text-xl font-bold mb-3">¿Cómo funciona la escala chilena?</h2>
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
            <p>
              En Chile, el sistema de evaluación oficial usa una <strong>escala numérica de 1,0 a 7,0</strong>,
              con incrementos de 0,1. La <strong>nota mínima de aprobación es 4,0</strong>, y la máxima
              es 7,0. Esta escala se aplica tanto en enseñanza básica (desde 1° básico), enseñanza media
              como en educación superior.
            </p>
            <p className="mt-2">
              El rendimiento se mide generalmente con <strong>promedio ponderado</strong>, donde cada evaluación
              tiene un porcentaje de incidencia sobre la nota final del ramo.
            </p>
          </div>
        </Card>

        <AdBannerMiddle />

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">¿Qué significa cada nota?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
            {ESCALA.map((item) => (
              <div
                key={item.rango}
                className={`rounded-xl border p-4 ${colorMap[item.color]}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl font-black tabular-nums">{item.rango}</span>
                  <span className="text-sm font-bold uppercase tracking-wider">
                    {item.concepto}
                  </span>
                </div>
                <p className="text-sm mt-1">{item.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader title="Promedio acumulado" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              El <strong>promedio acumulado</strong> es el promedio ponderado de todas las
              notas obtenidas en un período (semestre, año, carrera). Es fundamental para:
            </p>
            <ul className="mt-3 text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
              <li>Postular a becas y beneficios</li>
              <li>Avanzar de nivel</li>
              <li>Acceder a programas de intercambio</li>
              <li>Mantener la calidad de alumno regular</li>
            </ul>
          </Card>

          <Card>
            <CardHeader title="Eximición" />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              En muchas instituciones puedes <strong>eximirte del examen final</strong> si tu
              promedio es igual o superior a un umbral (generalmente 5,5 o 6,0). Esto significa
              que tu nota de presentación es tu nota final sin rendir examen.
            </p>
            <Link
              to="/simulador-eximicion"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              Simular eximición →
            </Link>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader title="Equivalencias internacionales" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 font-semibold">Chile (1-7)</th>
                  <th className="text-left py-2 font-semibold">USA (A-F)</th>
                  <th className="text-left py-2 font-semibold">España (0-10)</th>
                  <th className="text-left py-2 font-semibold">Argentina (0-10)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                <tr>
                  <td className="py-2 font-bold">7.0</td>
                  <td>A+</td>
                  <td>10 (Matrícula de Honor)</td>
                  <td>10</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">6.0 – 6.9</td>
                  <td>A</td>
                  <td>9 – 10 (Sobresaliente)</td>
                  <td>8 – 9</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">5.0 – 5.9</td>
                  <td>B</td>
                  <td>7 – 8 (Notable)</td>
                  <td>6 – 7</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">4.0 – 4.9</td>
                  <td>C</td>
                  <td>5 – 6 (Aprobado)</td>
                  <td>4 – 5</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">3.0 – 3.9</td>
                  <td>D</td>
                  <td>0 – 4 (Suspenso)</td>
                  <td>2 – 3</td>
                </tr>
                <tr>
                  <td className="py-2 font-bold">1.0 – 2.9</td>
                  <td>F</td>
                  <td>0 (Suspenso)</td>
                  <td>0 – 1</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            * Las equivalencias son aproximadas y pueden variar según la institución y el país.
          </p>
        </Card>

        <Card className="mb-6 bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-900/30 dark:to-brand-800/20 border-brand-200 dark:border-brand-800">
          <div className="text-center py-4">
            <h3 className="text-xl font-bold mb-2">Calcula tu promedio ahora</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Usa nuestras herramientas gratuitas para calcular tu promedio, saber qué nota necesitas o convertir puntajes.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/calculadora-de-notas" className="btn-base gradient-bg px-5 py-2.5 text-sm font-semibold text-white">
                Calculadora
              </Link>
              <Link to="/que-nota-necesito" className="btn-base px-5 py-2.5 text-sm font-semibold border border-brand-300 dark:border-brand-700">
                ¿Qué nota necesito?
              </Link>
              <Link to="/puntaje-a-nota" className="btn-base px-5 py-2.5 text-sm font-semibold border border-brand-300 dark:border-brand-700">
                Puntaje → Nota
              </Link>
            </div>
          </div>
        </Card>

        <AdBannerBottom />
      </div>
    </>
  )
}
