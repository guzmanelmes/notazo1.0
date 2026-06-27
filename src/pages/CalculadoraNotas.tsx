import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SEO } from '@/components/seo/SEO'
import { Card, CardHeader } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { AdBannerTop } from '@/components/ads/AdBannerTop'
import { AdBannerMiddle } from '@/components/ads/AdBannerMiddle'
import { AdBannerBottom } from '@/components/ads/AdBannerBottom'
import { useSemestres } from '@/hooks/useSemestres'
import { useHistory } from '@/hooks/useHistory'
import {
  calcularPromedioPonderado,
  colorPorPromedio,
  mensajeMotivacional,
  validarNota,
  validarPonderacion,
} from '@/lib/calculations'
import { cn, uid } from '@/lib/utils'
import type { Evaluacion } from '@/types'

function crearEvaluacionVacia(): Evaluacion {
  return {
    id: uid('eval'),
    nombre: '',
    nota: null,
    ponderacion: 0,
  }
}

export function CalculadoraNotas() {
  const {
    semestres,
    semestreActivo,
    semestreActivoId,
    setSemestreActivo,
    crearSemestre,
    eliminarSemestre,
    renombrarSemestre,
    actualizarEvaluaciones,
  } = useSemestres()
  const [nuevoSemestre, setNuevoSemestre] = useState('')
  const [editandoNombre, setEditandoNombre] = useState(false)
  const [nombreTemp, setNombreTemp] = useState('')
  const { addEntry } = useHistory()

  const evaluaciones = semestreActivo?.evaluaciones ?? []
  const resultado = useMemo(() => calcularPromedioPonderado(evaluaciones), [evaluaciones])
  const colores = colorPorPromedio(resultado.promedio)

  const handleGuardar = () => {
    if (!resultado.valido || !semestreActivo) return
    addEntry({
      tipo: 'promedio',
      titulo: `Promedio: ${semestreActivo.nombre}`,
      resumen: `${evaluaciones.filter((e) => e.nota !== null).length} evaluaciones con promedio ${resultado.promedio.toFixed(2)}`,
      promedio: resultado.promedio,
      datos: {
        semestre: semestreActivo.nombre,
        evaluaciones: evaluaciones.map((e) => ({
          nombre: e.nombre,
          nota: e.nota,
          ponderacion: e.ponderacion,
        })),
        sumaPonderaciones: resultado.sumaPonderaciones,
      },
    })
    const btn = document.getElementById('btn-guardar')
    if (btn) {
      const original = btn.textContent
      btn.textContent = '✓ Guardado'
      setTimeout(() => { if (btn) btn.textContent = original }, 1500)
    }
  }

  const handleCrear = () => {
    const nombre = nuevoSemestre.trim() || `Semestre ${semestres.length + 1}`
    crearSemestre(nombre)
    setNuevoSemestre('')
  }

  const handleEliminar = (id: string, nombre: string) => {
    if (confirm(`¿Eliminar "${nombre}" y todas sus evaluaciones?`)) {
      eliminarSemestre(id)
    }
  }

  const handleRenombrar = () => {
    if (semestreActivoId && nombreTemp.trim()) {
      renombrarSemestre(semestreActivoId, nombreTemp)
    }
    setEditandoNombre(false)
    setNombreTemp('')
  }

  const agregar = () => {
    if (!semestreActivoId) return
    actualizarEvaluaciones(semestreActivoId, [...evaluaciones, crearEvaluacionVacia()])
  }

  const eliminar = (id: string) => {
    if (!semestreActivoId) return
    actualizarEvaluaciones(
      semestreActivoId,
      evaluaciones.filter((e) => e.id !== id)
    )
  }

  const limpiar = () => {
    if (semestreActivoId && confirm('¿Borrar todas las evaluaciones de este semestre?')) {
      actualizarEvaluaciones(semestreActivoId, [crearEvaluacionVacia()])
    }
  }

  const actualizar = (id: string, campo: keyof Evaluacion, valor: string) => {
    if (!semestreActivoId) return
    actualizarEvaluaciones(
      semestreActivoId,
      evaluaciones.map((e) => {
        if (e.id !== id) return e
        if (campo === 'nota') {
          if (valor === '') return { ...e, nota: null }
          const n = Number(valor.replace(',', '.'))
          if (Number.isNaN(n)) return e
          return { ...e, nota: n }
        }
        if (campo === 'ponderacion') {
          const n = Number(valor.replace(',', '.'))
          if (Number.isNaN(n)) return { ...e, ponderacion: 0 }
          return { ...e, ponderacion: n }
        }
        return { ...e, [campo]: valor }
      })
    )
  }

  const validarEvaluacion = (e: Evaluacion): string | null => {
    if (!e.nombre.trim()) return 'Nombre requerido'
    if (e.nota === null) return 'Nota requerida'
    if (!validarNota(e.nota)) return 'La nota debe estar entre 1.0 y 7.0'
    if (!validarPonderacion(e.ponderacion)) return 'Ponderación entre 0 y 100'
    if (e.ponderacion === 0) return 'La ponderación no puede ser 0'
    return null
  }

  const distribuibleRestante = 100 - resultado.sumaPonderaciones

  return (
    <>
      <SEO
        title="Calculadora de Notas y Promedio Ponderado"
        description="Calcula tu promedio ponderado al instante. Soporta múltiples semestres, guardado automático y validación de ponderaciones."
        canonical="/calculadora-de-notas"
        keywords="calculadora de notas, promedio ponderado, calcular notas chile, simulador notas, promedio semestral"
      />

      <div className="container-app py-8 sm:py-12">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold">Calculadora de Notas</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gestiona varios semestres localmente y obtén tu promedio ponderado al instante.
          </p>
        </div>

        <AdBannerTop />

        {/* Selector de semestres */}
        <Card className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                Semestre activo
              </label>
              {editandoNombre && semestreActivo ? (
                <div className="flex gap-2">
                  <Input
                    value={nombreTemp}
                    onChange={(e) => setNombreTemp(e.target.value)}
                    placeholder="Nombre del semestre"
                    autoFocus
                  />
                  <Button onClick={handleRenombrar} size="sm">Guardar</Button>
                  <Button onClick={() => setEditandoNombre(false)} variant="ghost" size="sm">
                    Cancelar
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="inline-block h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: semestreActivo?.color ?? '#3b82f6' }}
                    aria-hidden="true"
                  />
                  <h2 className="text-xl font-bold truncate">{semestreActivo?.nombre ?? '—'}</h2>
                  {semestreActivo && (
                    <button
                      type="button"
                      onClick={() => {
                        setNombreTemp(semestreActivo.nombre)
                        setEditandoNombre(true)
                      }}
                      className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
                    >
                      Renombrar
                    </button>
                  )}
                </div>
              )}
            </div>

            {semestreActivo && semestres.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEliminar(semestreActivo.id, semestreActivo.nombre)}
              >
                Eliminar semestre
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {semestres.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSemestreActivo(s.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all',
                  s.id === semestreActivoId
                    ? 'bg-brand-600 text-white shadow-soft'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                )}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: s.color }}
                  aria-hidden="true"
                />
                {s.nombre}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Nuevo semestre (ej: 2026-1, Cálculo I)"
              value={nuevoSemestre}
              onChange={(e) => setNuevoSemestre(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCrear()}
              className="flex-1"
            />
            <Button onClick={handleCrear} variant="outline" leftIcon={<PlusIcon />}>
              Crear
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader
                title="Mis evaluaciones"
                subtitle="Ingresa el nombre, nota (1.0–7.0) y ponderación (%) de cada evaluación."
                action={
                  <Button onClick={agregar} size="sm" leftIcon={<PlusIcon />}>
                    Agregar
                  </Button>
                }
              />

              <div className="space-y-3">
                {evaluaciones.length === 0 && (
                  <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      Aún no hay evaluaciones en este semestre.
                    </p>
                    <Button onClick={agregar} size="sm" leftIcon={<PlusIcon />}>
                      Agregar primera evaluación
                    </Button>
                  </div>
                )}

                {evaluaciones.map((evaluacion, idx) => {
                  const err = validarEvaluacion(evaluacion)
                  return (
                    <div
                      key={evaluacion.id}
                      className={cn(
                        'rounded-xl border bg-white dark:bg-gray-800/50 p-4 transition-colors',
                        err ? 'border-red-300 dark:border-red-700' : 'border-gray-200 dark:border-gray-700'
                      )}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          Evaluación {idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => eliminar(evaluacion.id)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
                          aria-label={`Eliminar evaluación ${idx + 1}`}
                        >
                          <TrashIcon />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                        <div className="sm:col-span-6">
                          <Input
                            label="Nombre"
                            placeholder="Ej: Prueba 1"
                            value={evaluacion.nombre}
                            onChange={(e) => actualizar(evaluacion.id, 'nombre', e.target.value)}
                            error={!evaluacion.nombre.trim() && err ? 'Requerido' : undefined}
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <Input
                            label="Nota"
                            type="number"
                            inputMode="decimal"
                            step="0.1"
                            min="1.0"
                            max="7.0"
                            placeholder="—"
                            value={evaluacion.nota ?? ''}
                            onChange={(e) => actualizar(evaluacion.id, 'nota', e.target.value)}
                            error={evaluacion.nota !== null && !validarNota(evaluacion.nota) ? '1.0 a 7.0' : undefined}
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <Input
                            label="Ponderación"
                            type="number"
                            inputMode="decimal"
                            step="1"
                            min="0"
                            max="100"
                            placeholder="0"
                            value={evaluacion.ponderacion || ''}
                            onChange={(e) => actualizar(evaluacion.id, 'ponderacion', e.target.value)}
                            suffix="%"
                            error={!validarPonderacion(evaluacion.ponderacion) ? '0 a 100' : undefined}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {evaluaciones.length > 0 && (
                <div className="mt-5 flex flex-col sm:flex-row gap-2">
                  <Button onClick={agregar} variant="outline" leftIcon={<PlusIcon />} fullWidth>
                    Agregar otra evaluación
                  </Button>
                  <Button onClick={limpiar} variant="ghost" fullWidth>
                    Limpiar evaluaciones
                  </Button>
                </div>
              )}
            </Card>

            <AdBannerMiddle />

            <Card>
              <CardHeader title="Distribución de ponderaciones" />
              <ProgressBar
                value={resultado.sumaPonderaciones}
                max={100}
                color={
                  resultado.sumaPonderaciones === 100
                    ? 'success'
                    : resultado.sumaPonderaciones > 100
                      ? 'danger'
                      : 'warning'
                }
                showLabel
                label={`Total: ${resultado.sumaPonderaciones.toFixed(1)}% / 100%`}
              />
              {resultado.sumaPonderaciones !== 100 && (
                <p
                  className={cn(
                    'mt-3 text-sm',
                    resultado.sumaPonderaciones > 100
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-amber-600 dark:text-amber-400'
                  )}
                >
                  {resultado.sumaPonderaciones > 100
                    ? `Te pasaste por ${(resultado.sumaPonderaciones - 100).toFixed(1)}%. Ajusta las ponderaciones.`
                    : `Faltan ${(100 - resultado.sumaPonderaciones).toFixed(1)}% por asignar.`}
                </p>
              )}
            </Card>
          </div>

          {/* Sidebar: resultado */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <Card hover className={cn('border-2', resultado.valido ? colores.border : 'border-gray-200 dark:border-gray-700')}>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Tu promedio
                  </p>
                  <p
                    className={cn(
                      'text-6xl sm:text-7xl font-black tabular-nums',
                      resultado.valido ? colores.text : 'text-gray-400'
                    )}
                  >
                    {resultado.valido ? resultado.promedio.toFixed(2) : '—'}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Escala 1.0 – 7.0
                  </p>

                  {resultado.valido ? (
                    <>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        {resultado.promedio >= 4.0 ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                            <CheckIcon /> Aprobando
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                            <XIcon /> En riesgo
                          </span>
                        )}
                      </div>
                      <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 italic">
                        "{mensajeMotivacional(resultado.promedio)}"
                      </p>
                    </>
                  ) : (
                    <p className="mt-4 text-sm text-red-600 dark:text-red-400">
                      {resultado.mensaje}
                    </p>
                  )}

                  <Button
                    id="btn-guardar"
                    onClick={handleGuardar}
                    disabled={!resultado.valido}
                    fullWidth
                    className="mt-6"
                  >
                    Guardar en historial
                  </Button>

                  <Link
                    to="/dashboard"
                    className="mt-3 text-xs text-brand-600 dark:text-brand-400 hover:underline inline-block"
                  >
                    Ver dashboard con gráficos →
                  </Link>
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-bold mb-3">Resumen rápido</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Evaluaciones</dt>
                    <dd className="font-semibold">{evaluaciones.length}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Con nota</dt>
                    <dd className="font-semibold">
                      {evaluaciones.filter((e) => e.nota !== null).length}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Ponderado</dt>
                    <dd className="font-semibold">{resultado.sumaPonderaciones.toFixed(0)}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-400">Restante</dt>
                    <dd
                      className={cn(
                        'font-semibold',
                        distribuibleRestante === 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      )}
                    >
                      {distribuibleRestante > 0 ? '+' : ''}
                      {distribuibleRestante.toFixed(0)}%
                    </dd>
                  </div>
                </dl>
              </Card>
            </div>
          </div>
        </div>

        <AdBannerBottom />
      </div>
    </>
  )
}

const ICON_BASE = {
  width: 18,
  height: 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

function PlusIcon() {
  return (
    <svg {...ICON_BASE}>
      <path d="M5 12h14M12 5v14" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg {...ICON_BASE}>
      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
function XIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}
