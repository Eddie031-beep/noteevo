export const NOTE_COLORS = {
  red: '#fca5a5',
  orange: '#fdba74',
  yellow: '#fde047',
  green: '#86efac',
  teal: '#5eead4',
  blue: '#93c5fd',
  purple: '#d8b4fe',
  pink: '#f9a8d4',
} as const

export type NoteColor = keyof typeof NOTE_COLORS

export function isNoteColor(value: string | null | undefined): value is NoteColor {
  return value != null && value in NOTE_COLORS
}
