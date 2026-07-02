// Fuente única de verdad para transiciones de Motion (DESIGN.md §5.3).
// Prohibido inventar duraciones/easings sueltos en componentes: importar de aquí.

export const durations = { fast: 0.13, base: 0.19, slow: 0.28 } as const

export const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1] // entradas
export const easeInOut: [number, number, number, number] = [0.4, 0, 0.2, 1] // estándar

export const spring = { type: 'spring', stiffness: 380, damping: 30 } as const // modales, layout
export const springSoft = { type: 'spring', stiffness: 260, damping: 26 } as const // paneles, cover

// Presets reutilizables — extender con spread: <motion.div {...fade}>
export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: durations.base, ease: easeInOut },
} as const

export const fadeScale = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
  transition: spring,
} as const

export const slideUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: durations.slow, ease: easeOut },
} as const
