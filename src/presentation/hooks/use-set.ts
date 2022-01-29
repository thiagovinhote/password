import { useRef, useState } from 'react'

export const useSet = <T>(initialValue: T[] = []) => {
  const [, emitSideEffect] = useState(0)

  const state = useRef(new Set<T>(initialValue))

  const add = (value: T): Set<T> => {
    const newSet = state.current.add(value)
    emitSideEffect(old => old + 1)
    return newSet
  }

  const remove = (value: T): boolean => {
    const isRemoved = state.current.delete(value)
    emitSideEffect(old => old + 1)
    return isRemoved
  }

  const has = (value: T): boolean => {
    return state.current.has(value)
  }

  return { add, remove, has }
}
