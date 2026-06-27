// ============================================
// Tipos globales de Notazo
// ============================================

/** Una evaluación individual con su ponderación */
export interface Evaluacion {
  id: string
  nombre: string
  nota: number | null
  ponderacion: number
}

/** Semestre / ramo con sus evaluaciones */
export interface Semestre {
  id: string
  nombre: string
  evaluaciones: Evaluacion[]
  color: string
  createdAt: string
}

/** Entrada del historial local */
export interface HistoryEntry {
  id: string
  tipo: 'promedio' | 'que-necesito' | 'examen' | 'eximicion' | 'puntaje' | 'nem'
  titulo: string
  resumen: string
  datos: Record<string, unknown>
  promedio?: number
  fecha: string // ISO
}

/** Preferencias del usuario */
export interface Preferences {
  theme: 'light' | 'dark'
  defaultMinimaAprobacion: number
}
