// ============================================
// Lógica de cálculos académicos (escala chilena 1.0 - 7.0)
// ============================================

import type { Evaluacion } from '@/types'
import { clamp, roundTo } from './utils'

export const ESCALA_MIN = 1.0
export const ESCALA_MAX = 7.0
export const APROBACION_DEFAULT = 4.0

export interface PromedioResult {
  promedio: number
  sumaPonderaciones: number
  valido: boolean
  mensaje?: string
}

/**
 * Calcula el promedio ponderado de una lista de evaluaciones.
 * - nota: número entre 1.0 y 7.0
 * - ponderacion: porcentaje (0-100)
 * Devuelve promedio y validación: la suma de ponderaciones debe ser 100%.
 */
export function calcularPromedioPonderado(evaluaciones: Evaluacion[]): PromedioResult {
  if (evaluaciones.length === 0) {
    return { promedio: 0, sumaPonderaciones: 0, valido: false, mensaje: 'Agrega al menos una evaluación' }
  }

  const sumaPonderaciones = evaluaciones.reduce((acc, e) => acc + (Number(e.ponderacion) || 0), 0)

  // Validar ponderación completa
  if (Math.abs(sumaPonderaciones - 100) > 0.01) {
    return {
      promedio: 0,
      sumaPonderaciones,
      valido: false,
      mensaje: `La suma de las ponderaciones debe ser 100% (actual: ${sumaPonderaciones.toFixed(1)}%)`,
    }
  }

  // Calcular promedio solo con evaluaciones con nota válida
  const completas = evaluaciones.filter((e) => e.nota !== null && !Number.isNaN(e.nota))
  if (completas.length === 0) {
    return {
      promedio: 0,
      sumaPonderaciones,
      valido: false,
      mensaje: 'Ingresa al menos una nota',
    }
  }

  const sumaNotas = completas.reduce((acc, e) => acc + (e.nota as number) * e.ponderacion, 0)
  const promedio = sumaNotas / 100

  return {
    promedio: roundTo(promedio, 2),
    sumaPonderaciones,
    valido: true,
  }
}

export interface NotaNecesariaParams {
  promedioActual: number
  ponderacionPendiente: number
  notaObjetivo: number
}

export interface NotaNecesariaResult {
  notaNecesaria: number
  posible: boolean
  mensaje: string
}

/**
 * Calcula qué nota se necesita en la evaluación pendiente
 * para alcanzar una nota objetivo.
 * Fórmula: notaNecesaria = (notaObjetivo - promedioActual * (100 - p) / 100) / (p / 100)
 */
export function calcularNotaNecesaria(params: NotaNecesariaParams): NotaNecesariaResult {
  const { promedioActual, ponderacionPendiente, notaObjetivo } = params

  if (ponderacionPendiente <= 0 || ponderacionPendiente > 100) {
    return {
      notaNecesaria: 0,
      posible: false,
      mensaje: 'La ponderación pendiente debe estar entre 0% y 100%',
    }
  }

  if (promedioActual < ESCALA_MIN || promedioActual > ESCALA_MAX) {
    return {
      notaNecesaria: 0,
      posible: false,
      mensaje: `El promedio actual debe estar entre ${ESCALA_MIN} y ${ESCALA_MAX}`,
    }
  }

  if (notaObjetivo < ESCALA_MIN || notaObjetivo > ESCALA_MAX) {
    return {
      notaNecesaria: 0,
      posible: false,
      mensaje: `La nota objetivo debe estar entre ${ESCALA_MIN} y ${ESCALA_MAX}`,
    }
  }

  // Si ponderación pendiente = 100, el promedio final es la nota de esa evaluación
  if (ponderacionPendiente === 100) {
    if (notaObjetivo > ESCALA_MAX) {
      return {
        notaNecesaria: 0,
        posible: false,
        mensaje: 'Objetivo imposible: supera la nota máxima (7.0)',
      }
    }
    return {
      notaNecesaria: roundTo(notaObjetivo, 2),
      posible: true,
      mensaje: notaObjetivo <= ESCALA_MAX ? 'Necesitas esa nota en la evaluación final.' : '',
    }
  }

  const notaNecesaria =
    (notaObjetivo - (promedioActual * (100 - ponderacionPendiente)) / 100) /
    (ponderacionPendiente / 100)

  const notaRedondeada = roundTo(notaNecesaria, 2)

  if (notaNecesaria > ESCALA_MAX) {
    return {
      notaNecesaria: notaRedondeada,
      posible: false,
      mensaje: `Necesitarías un ${notaRedondeada}, lo cual es imposible (máx 7.0). Ajusta tu objetivo.`,
    }
  }

  if (notaNecesaria < ESCALA_MIN) {
    return {
      notaNecesaria: notaRedondeada,
      posible: true,
      mensaje: `¡Ya estás listo! Cualquier nota te sirve (incluso un ${ESCALA_MIN.toFixed(1)}).`,
    }
  }

  return {
    notaNecesaria: notaRedondeada,
    posible: true,
    mensaje: 'Necesitas esa nota en la evaluación pendiente para alcanzar tu objetivo.',
  }
}

export interface ExamenParams {
  notaPresentacion: number
  ponderacionExamen: number
  notaAprobacion: number
}

export interface ExamenResult {
  notaExamen: number
  posible: boolean
  mensaje: string
}

/**
 * Calcula la nota necesaria en el examen final.
 * Fórmula: notaExamen = (notaAprobacion - notaPresentacion * (100 - p) / 100) / (p / 100)
 */
export function calcularNotaExamen(params: ExamenParams): ExamenResult {
  const { notaPresentacion, ponderacionExamen, notaAprobacion } = params

  if (ponderacionExamen <= 0 || ponderacionExamen > 100) {
    return {
      notaExamen: 0,
      posible: false,
      mensaje: 'La ponderación del examen debe estar entre 0% y 100%',
    }
  }

  if (ponderacionExamen >= 100) {
    return {
      notaExamen: 0,
      posible: false,
      mensaje: 'La ponderación del examen no puede ser 100%',
    }
  }

  if (notaPresentacion < ESCALA_MIN || notaPresentacion > ESCALA_MAX) {
    return {
      notaExamen: 0,
      posible: false,
      mensaje: `La nota de presentación debe estar entre ${ESCALA_MIN} y ${ESCALA_MAX}`,
    }
  }

  if (notaAprobacion < ESCALA_MIN || notaAprobacion > ESCALA_MAX) {
    return {
      notaExamen: 0,
      posible: false,
      mensaje: `La nota de aprobación debe estar entre ${ESCALA_MIN} y ${ESCALA_MAX}`,
    }
  }

  const notaExamen =
    (notaAprobacion - (notaPresentacion * (100 - ponderacionExamen)) / 100) /
    (ponderacionExamen / 100)

  const notaRedondeada = roundTo(notaExamen, 2)

  if (notaExamen > ESCALA_MAX) {
    return {
      notaExamen: notaRedondeada,
      posible: false,
      mensaje: `Con tu presentación actual, es imposible aprobar (necesitarías ${notaRedondeada} en el examen).`,
    }
  }

  if (notaExamen <= ESCALA_MIN) {
    return {
      notaExamen: notaRedondeada,
      posible: true,
      mensaje: '¡Ya tienes la materia aprobada! Cualquier nota te mantiene aprobado.',
    }
  }

  return {
    notaExamen: notaRedondeada,
    posible: true,
    mensaje: 'Necesitas esa nota en el examen para aprobar el ramo.',
  }
}

export interface EximicionParams {
  promedioActual: number
  notaMinimaEximicion: number
}

export interface EximicionResult {
  eximido: boolean
  mensaje: string
}

/**
 * Determina si el estudiante se exime según su promedio actual.
 */
export function calcularEximicion(params: EximicionParams): EximicionResult {
  const { promedioActual, notaMinimaEximicion } = params

  if (promedioActual < ESCALA_MIN || promedioActual > ESCALA_MAX) {
    return {
      eximido: false,
      mensaje: `El promedio debe estar entre ${ESCALA_MIN} y ${ESCALA_MAX}`,
    }
  }

  if (notaMinimaEximicion < ESCALA_MIN || notaMinimaEximicion > ESCALA_MAX) {
    return {
      eximido: false,
      mensaje: `La nota mínima de eximición debe estar entre ${ESCALA_MIN} y ${ESCALA_MAX}`,
    }
  }

  if (promedioActual >= notaMinimaEximicion) {
    const diferencia = roundTo(promedioActual - notaMinimaEximicion, 2)
    return {
      eximido: true,
      mensaje: `¡Felicitaciones! Estás eximido con un promedio de ${promedioActual.toFixed(2)}. Superas la nota mínima por ${diferencia.toFixed(2)} puntos.`,
    }
  }

  const diferencia = roundTo(notaMinimaEximicion - promedioActual, 2)
  return {
    eximido: false,
    mensaje: `Debes rendir el examen. Te faltan ${diferencia.toFixed(2)} puntos para eximirte.`,
  }
}

/** Mensaje motivacional según rango de nota (escala chilena) */
export function mensajeMotivacional(promedio: number): string {
  if (promedio >= 6.5) return '¡Excelente trabajo! Vas rumbo a la distinción.'
  if (promedio >= 5.5) return '¡Muy bien! Sigue así, vas muy bien encaminado.'
  if (promedio >= 4.0) return 'Vas aprobando. Esfuérzate un poco más para asegurar el ramo.'
  if (promedio >= 3.0) return 'Aún puedes mejorar. Concéntrate en las próximas evaluaciones.'
  if (promedio > 0) return 'No te desanimes. Revisa tu estrategia y pide ayuda si la necesitas.'
  return 'Agrega tus evaluaciones para ver tu motivación personalizada.'
}

/** Color Tailwind según el promedio */
export function colorPorPromedio(promedio: number): {
  text: string
  bg: string
  border: string
  ring: string
} {
  if (promedio >= 5.0) {
    return {
      text: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
      border: 'border-emerald-200 dark:border-emerald-800',
      ring: 'ring-emerald-500',
    }
  }
  if (promedio >= 4.0) {
    return {
      text: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
      border: 'border-amber-200 dark:border-amber-800',
      ring: 'ring-amber-500',
    }
  }
  return {
    text: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    ring: 'ring-red-500',
  }
}

/** Valida que un número esté en la escala 1.0 - 7.0 */
export function validarNota(n: number): boolean {
  return !Number.isNaN(n) && n >= ESCALA_MIN && n <= ESCALA_MAX
}

/** Valida que un número esté en 0 - 100 */
export function validarPonderacion(n: number): boolean {
  return !Number.isNaN(n) && n >= 0 && n <= 100
}

export const _unused = { clamp } // evita warning si se importa solo
