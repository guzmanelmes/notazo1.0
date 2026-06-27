// ============================================
// Hook: useSemestres - gestión multi-semestre local (sin auth)
// ============================================

import { useCallback, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { uid } from '@/lib/utils'
import type { Evaluacion, Semestre } from '@/types'

const SEMESTRES_KEY = 'notazo:semestres'
const ACTIVO_KEY = 'notazo:semestre-activo'

const COLORES = [
  '#3b82f6', // brand
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#84cc16', // lime
]

function crearSemestreDefault(): Semestre {
  return {
    id: uid('sem'),
    nombre: 'Mi Semestre 2026-1',
    evaluaciones: [
      { id: uid('eval'), nombre: 'Evaluación 1', nota: null, ponderacion: 30 },
      { id: uid('eval'), nombre: 'Evaluación 2', nota: null, ponderacion: 30 },
      { id: uid('eval'), nombre: 'Examen', nota: null, ponderacion: 40 },
    ],
    color: COLORES[0],
    createdAt: new Date().toISOString(),
  }
}

export function useSemestres() {
  const [semestres, setSemestres] = useLocalStorage<Semestre[]>(SEMESTRES_KEY, [
    crearSemestreDefault(),
  ])
  const [activoId, setActivoId] = useLocalStorage<string | null>(ACTIVO_KEY, null)

  // Si no hay activo, tomar el primero
  const semestreActivoId = activoId && semestres.find((s) => s.id === activoId)
    ? activoId
    : semestres[0]?.id ?? null

  const setSemestreActivo = useCallback(
    (id: string) => setActivoId(id),
    [setActivoId]
  )

  const semestreActivo = useMemo(
    () => semestres.find((s) => s.id === semestreActivoId) ?? null,
    [semestres, semestreActivoId]
  )

  const crearSemestre = useCallback(
    (nombre: string): Semestre => {
      const color = COLORES[semestres.length % COLORES.length]
      const nuevo: Semestre = {
        id: uid('sem'),
        nombre: nombre.trim() || `Semestre ${semestres.length + 1}`,
        evaluaciones: [],
        color,
        createdAt: new Date().toISOString(),
      }
      setSemestres((prev) => [...prev, nuevo])
      setActivoId(nuevo.id)
      return nuevo
    },
    [semestres.length, setSemestres, setActivoId]
  )

  const eliminarSemestre = useCallback(
    (id: string) => {
      setSemestres((prev) => {
        const next = prev.filter((s) => s.id !== id)
        if (next.length === 0) {
          const def = crearSemestreDefault()
          setActivoId(def.id)
          return [def]
        }
        if (id === semestreActivoId) {
          setActivoId(next[0].id)
        }
        return next
      })
    },
    [semestreActivoId, setSemestres, setActivoId]
  )

  const renombrarSemestre = useCallback(
    (id: string, nombre: string) => {
      setSemestres((prev) =>
        prev.map((s) => (s.id === id ? { ...s, nombre: nombre.trim() || s.nombre } : s))
      )
    },
    [setSemestres]
  )

  const actualizarSemestre = useCallback(
    (id: string, updater: (s: Semestre) => Semestre) => {
      setSemestres((prev) => prev.map((s) => (s.id === id ? updater(s) : s)))
    },
    [setSemestres]
  )

  const actualizarEvaluaciones = useCallback(
    (id: string, evaluaciones: Evaluacion[]) => {
      actualizarSemestre(id, (s) => ({ ...s, evaluaciones }))
    },
    [actualizarSemestre]
  )

  return {
    semestres,
    semestreActivo,
    semestreActivoId,
    setSemestreActivo,
    crearSemestre,
    eliminarSemestre,
    renombrarSemestre,
    actualizarEvaluaciones,
  }
}
