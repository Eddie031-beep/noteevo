export const NOTE_COLORS = {
  red: '#ef4444',
  orange: '#f97316',
  yellow: '#eab308',
  green: '#22c55e',
  teal: '#14b8a6',
  blue: '#3b82f6',
  purple: '#a855f7',
  pink: '#ec4899',
} as const

export type NoteColor = keyof typeof NOTE_COLORS

export function isNoteColor(value: string | null | undefined): value is NoteColor {
  return value != null && value in NOTE_COLORS
}
