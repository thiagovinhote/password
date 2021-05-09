export const range = (start: number, end: number, step: number = 1) => {
  return Array.from(
    Array(Math.round((end - start) / step)).keys(),
    x => start + x * step
  )
}
