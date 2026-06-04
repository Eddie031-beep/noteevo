// Color de identificación determinista por space.
// No se almacena en DB: se deriva del id (uuid aleatorio), por lo que cada
// space obtiene un color estable y consistente — visualmente equivalente a un
// "color aleatorio al crear" pero sin migración ni columna extra.

const SPACE_COLORS = [
  '#6366f1', // indigo
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ef4444', // red
  '#14b8a6', // teal
  '#f97316', // orange
  '#06b6d4', // cyan
] as const

export function getSpaceColor(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }
  return SPACE_COLORS[hash % SPACE_COLORS.length]
}

// Devuelve el color con canal alpha (formato #rrggbbaa) para fondos suaves.
export function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.min(Math.max(alpha, 0), 1) * 255)
    .toString(16)
    .padStart(2, '0')
  return `${hex}${a}`
}
