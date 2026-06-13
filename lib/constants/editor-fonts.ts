// Fuente BASE configurable del editor (Phase 17 id:61).
//
// Los `stack` reflejan EXACTAMENTE las 6 familias de `FONTS` en
// components/editor/FormatDropdowns.tsx (font-family por selección). Aquí se usan
// como tipografía base de todo el cuerpo del editor, persistida en el perfil.
// No se cargan fuentes nuevas: Roboto Slab / Dancing Script / Caveat ya viven en
// app/layout.tsx via next/font/google.

export type EditorFontKey = 'sans' | 'serif' | 'slab' | 'mono' | 'script' | 'hand'

export interface EditorFontOption {
  key: EditorFontKey
  label: string
  stack: string
}

export const EDITOR_FONTS: EditorFontOption[] = [
  { key: 'sans', label: 'Sans Serif', stack: 'var(--font-geist-sans), Arial, Helvetica, sans-serif' },
  { key: 'serif', label: 'Serif', stack: 'Georgia, serif' },
  { key: 'slab', label: 'Slab Serif', stack: 'var(--font-roboto-slab), "Rockwell", "Courier New", serif' },
  { key: 'mono', label: 'Monospace', stack: 'var(--font-geist-mono), monospace' },
  { key: 'script', label: 'Script', stack: 'var(--font-dancing-script), "Brush Script MT", cursive' },
  { key: 'hand', label: 'Handwritten', stack: 'var(--font-caveat), "Comic Sans MS", cursive' },
]

export const DEFAULT_EDITOR_FONT: EditorFontKey = 'sans'
export const DEFAULT_EDITOR_FONT_SIZE = 16
export const DEFAULT_EDITOR_LINE_HEIGHT = 1.7

export const MIN_EDITOR_FONT_SIZE = 12
export const MAX_EDITOR_FONT_SIZE = 22

// Opciones de interlineado expuestas en ajustes.
export const LINE_HEIGHT_OPTIONS: { value: number; label: string }[] = [
  { value: 1.4, label: 'Compacto' },
  { value: 1.7, label: 'Normal' },
  { value: 2.0, label: 'Amplio' },
]

/** Devuelve el stack CSS de una clave de familia; cae a Sans si es desconocida. */
export function fontStackForKey(key: string | null | undefined): string {
  return (EDITOR_FONTS.find((f) => f.key === key) ?? EDITOR_FONTS[0]).stack
}
