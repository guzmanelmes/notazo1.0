// ============================================
// Utilidades generales
// ============================================

/** Genera un ID único corto (sin dependencias) */
export function uid(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

/** Formatea un número a 2 decimales, manejando null/undefined */
export function fmt(n: number | null | undefined, decimals = 2): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '—'
  return n.toFixed(decimals)
}

/** Clamp entre min y max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/** Round a N decimales */
export function roundTo(n: number, decimals = 2): number {
  const f = Math.pow(10, decimals)
  return Math.round(n * f) / f
}

/** Formatea una fecha ISO a string legible en español */
export function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return iso
  }
}

/** Une classNames condicionalmente */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
