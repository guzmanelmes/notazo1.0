import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import { SEO } from '@/components/seo/SEO'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'
import { AdBannerMiddle } from '@/components/ads/AdBannerMiddle'
import { useSemestres } from '@/hooks/useSemestres'
import { calcularPromedioPonderado } from '@/lib/calculations'
import { cn, roundTo } from '@/lib/utils'

export function Dashboard() {
  const { semestres } = useSemestres()

  // Stats globales
  const stats = useMemo(() => {
    const todosLosRamos = semestres.flatMap((s) =>
      s.evaluaciones
        .filter((e) => e.nota !== null)
        .map((e) => ({
          ...e,
          semestre: s.nombre,
          color: s.color,
          promedio: (e.nota as number) * (e.ponderacion / 100),
        }))
    )

    const totalEvaluaciones = todosLosRamos.length
    const promedioGeneral =
      totalEvaluaciones > 0
        ? todosLosRamos.reduce((acc, e) => acc + (e.nota as number), 0) / totalEvaluaciones
        : 0

    const promediosPorSemestre = semestres
      .map((s) => {
        const r = calcularPromedioPonderado(s.evaluaciones)
        return {
          nombre: s.nombre.length > 16 ? s.nombre.slice(0, 16) + '…' : s.nombre,
          promedio: r.valido ? r.promedio : 0,
          color: s.color,
          valido: r.valido,
        }
      })
      .filter((s) => s.valido)

    // Distribución por rango
    const rangos = {
      'Excelente (6.5-7.0)': 0,
      'Muy bueno (5.5-6.4)': 0,
      'Bueno (5.0-5.4)': 0,
      'Aprobado (4.0-4.9)': 0,
      'Reprobado (<4.0)': 0,
    }
    todosLosRamos.forEach((e) => {
      const n = e.nota as number
      if (n >= 6.5) rangos['Excelente (6.5-7.0)']++
      else if (n >= 5.5) rangos['Muy bueno (5.5-6.4)']++
      else if (n >= 5.0) rangos['Bueno (5.0-5.4)']++
      else if (n >= 4.0) rangos['Aprobado (4.0-4.9)']++
      else rangos['Reprobado (<4.0)']++
    })

    const distribucion = Object.entries(rangos).map(([name, value]) => ({ name, value }))

    return {
      totalSemestres: semestres.length,
      totalEvaluaciones,
      promedioGeneral: roundTo(promedioGeneral, 2),
      promediosPorSemestre,
      distribucion,
    }
  }, [semestres])

  const COLORS_PIE = ['#10b981', '#3b82f6', '#06b6d4', '#f59e0b', '#ef4444']

  const hasData = stats.totalEvaluaciones > 0

  return (
    <>
      <SEO
        title="Dashboard Académico"
        description="Visualiza tu rendimiento académico con gráficos claros. Promedios por semestre, distribución de notas y más."
        canonical="/dashboard"
        keywords="dashboard notas, estadísticas notas, rendimiento académico chile"
      />

      <div className="container-app py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Dashboard Académico</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Visualiza tu rendimiento y la evolución de tus notas.
          </p>
        </div>

        <AdBannerTop />

        {!hasData ? (
          <Card className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400" aria-hidden="true">
                <path d="M3 3v18h18" />
                <path d="m19 9-5 5-4-4-3 3" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">Sin datos para mostrar</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Agrega evaluaciones a tus semestres y vuelve aquí para ver gráficos y estadísticas.
            </p>
            <Link
              to="/calculadora-de-notas"
              className="btn-base gradient-bg px-5 py-2.5 text-sm font-semibold text-white mt-6 inline-flex"
            >
              Ir a la calculadora
            </Link>
          </Card>
        ) : (
          <>
            {/* Stats principales */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <StatCard
                label="Semestres activos"
                value={stats.totalSemestres.toString()}
                color="blue"
                icon={<SemestreIcon />}
              />
              <StatCard
                label="Evaluaciones registradas"
                value={stats.totalEvaluaciones.toString()}
                color="emerald"
                icon={<EvalIcon />}
              />
              <StatCard
                label="Promedio general"
                value={stats.promedioGeneral.toFixed(2)}
                color={stats.promedioGeneral >= 4 ? 'amber' : 'red'}
                icon={<PromedioIcon />}
              />
            </div>

            {/* Gráfico 1: Promedios por semestre */}
            {stats.promediosPorSemestre.length > 0 && (
              <Card className="mb-6">
                <CardHeader title="Promedio por semestre" subtitle="Comparación de tu rendimiento entre semestres." />
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.promediosPorSemestre} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
                      <YAxis domain={[0, 7]} tick={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px',
                        }}
                        formatter={(value: number) => [value.toFixed(2), 'Promedio']}
                      />
                      <Bar dataKey="promedio" radius={[8, 8, 0, 0]}>
                        {stats.promediosPorSemestre.map((entry, idx) => (
                          <Cell key={idx} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            <AdBannerMiddle />

            {/* Gráfico 2: Distribución de notas (pie) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader title="Distribución de notas" subtitle="Cómo se reparten tus evaluaciones." />
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.distribucion.filter((d) => d.value > 0)}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={(entry: { value?: number }) => entry.value}
                      >
                        {stats.distribucion.map((_, idx) => (
                          <Cell key={idx} fill={COLORS_PIE[idx % COLORS_PIE.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          fontSize: '14px',
                        }}
                      />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        wrapperStyle={{ fontSize: '12px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Semestres detalle */}
              <Card>
                <CardHeader title="Detalle por semestre" />
                <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
                  {semestres.map((s) => {
                    const r = calcularPromedioPonderado(s.evaluaciones)
                    return (
                      <div key={s.id} className="rounded-lg border border-gray-200 dark:border-gray-700 p-3">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                            <span className="font-semibold truncate">{s.nombre}</span>
                          </div>
                          <span
                            className={cn(
                              'text-lg font-black tabular-nums',
                              r.valido && r.promedio >= 4.0
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : r.valido
                                  ? 'text-red-600 dark:text-red-400'
                                  : 'text-gray-400'
                            )}
                          >
                            {r.valido ? r.promedio.toFixed(2) : '—'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {s.evaluaciones.length} evaluaciones · {s.evaluaciones.filter((e) => e.nota !== null).length} con nota
                        </p>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

            <Card className="mb-6 bg-gradient-to-br from-brand-50 to-brand-100/50 dark:from-brand-900/30 dark:to-brand-800/20 border-brand-200 dark:border-brand-800">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold">¿Quieres más herramientas?</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Descubre qué nota necesitas, convierte puntajes o calcula tu NEM.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link to="/que-nota-necesito" className="btn-base px-4 py-2 text-sm font-semibold gradient-bg text-white">
                    ¿Qué nota?
                  </Link>
                  <Link to="/puntaje-a-nota" className="btn-base px-4 py-2 text-sm font-semibold border border-brand-300 dark:border-brand-700">
                    Puntaje → Nota
                  </Link>
                </div>
              </div>
            </Card>
          </>
        )}

        <AdBannerBottom />
      </div>
    </>
  )
}

interface StatCardProps {
  label: string
  value: string
  color: 'blue' | 'emerald' | 'amber' | 'red'
  icon: React.ReactNode
}

function StatCard({ label, value, color, icon }: StatCardProps) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  }
  return (
    <Card hover className="p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {label}
          </p>
          <p className="text-3xl sm:text-4xl font-black tabular-nums mt-1">{value}</p>
        </div>
        <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center', colorMap[color])}>
          {icon}
        </div>
      </div>
    </Card>
  )
}

function SemestreIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}
function EvalIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 13l2 2 4-4" />
    </svg>
  )
}
function PromedioIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  )
}
