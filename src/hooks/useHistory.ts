// ============================================
// Hook: useHistory - gestiona el historial de cálculos
// ============================================

import { useCallback } from 'react'
import { useLocalStorage } from './useLocalStorage'
import type { HistoryEntry } from '@/types'
import { uid } from '@/lib/utils'

const HISTORY_KEY = 'notazo:historial'
const MAX_HISTORY = 50

export function useHistory() {
  const [history, setHistory, clearHistory] = useLocalStorage<HistoryEntry[]>(HISTORY_KEY, [])

  const addEntry = useCallback(
    (entry: Omit<HistoryEntry, 'id' | 'fecha'>) => {
      const full: HistoryEntry = {
        ...entry,
        id: uid('hist'),
        fecha: new Date().toISOString(),
      }
      setHistory((prev) => [full, ...prev].slice(0, MAX_HISTORY))
      return full
    },
    [setHistory]
  )

  const removeEntry = useCallback(
    (id: string) => {
      setHistory((prev) => prev.filter((e) => e.id !== id))
    },
    [setHistory]
  )

  return { history, addEntry, removeEntry, clearHistory }
}
