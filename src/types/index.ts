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

/** Entrada del historial local */
export interface HistoryEntry {
  id: string
  tipo: 'promedio' | 'que-necesito' | 'examen' | 'eximicion'
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
