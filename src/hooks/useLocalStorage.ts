// ============================================
// Hook: useLocalStorage - persistencia tipada y segura
// ============================================

import { useCallback, useEffect, useRef, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  // Lazy init
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (err) {
      console.warn(`[useLocalStorage] error leyendo ${key}:`, err)
      return initialValue
    }
  })

  // Ref para evitar writes innecesarios si el valor no cambió
  const prevKeyRef = useRef(key)

  useEffect(() => {
    // Solo escribir si la key cambió o el valor realmente cambió
    if (prevKeyRef.current !== key) {
      prevKeyRef.current = key
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn(`[useLocalStorage] error escribiendo ${key}:`, err)
    }
  }, [key, value])

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => (typeof next === 'function' ? (next as (p: T) => T)(prev) : next))
    },
    []
  )

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch (err) {
      console.warn(`[useLocalStorage] error eliminando ${key}:`, err)
    }
    setValue(initialValue)
  }, [key, initialValue])

  return [value, update, remove]
}
