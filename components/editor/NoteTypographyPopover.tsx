'use client'

import { useEffect, useRef, useState } from 'react'
import { Type, Minus, Plus, RotateCcw } from 'lucide-react'
import {
  EDITOR_FONTS,
  LINE_HEIGHT_OPTIONS,
  MIN_EDITOR_FONT_SIZE,
  MAX_EDITOR_FONT_SIZE,
} from '@/lib/constants/editor-fonts'
import { useNoteStore } from '@/store/noteStore'
import { useProfileStore } from '@/store/profileStore'
import { updateNoteTypography } from '@/lib/supabase/notes'
import ToolbarTooltip from './ToolbarTooltip'

interface NoteTypographyPopoverProps {
  noteId: string
  // Valores guardados en la nota (null = hereda el default global).
  noteFontFamily: string | null
  noteFontSize: number | null
  noteLineHeight: number | null
  // Valores EFECTIVOS que se muestran y editan (valor de la nota ?? global).
  effectiveFontFamily: string
  effectiveFontSize: number
  effectiveLineHeight: number
}

/**
 * Popover "Aa" del editor (Phase 17 id:61). Configura la tipografía de ESTA NOTA
 * (familia + tamaño + interlineado), persistida en las columnas note_font_* de la
 * tabla notes. Si la nota no tiene override, hereda el default global de
 * Configuración. Cambios optimistas vía el store → el editor se actualiza en vivo.
 */
export default function NoteTypographyPopover({
  noteId,
  noteFontFamily,
  noteFontSize,
  noteLineHeight,
  effectiveFontFamily,
  effectiveFontSize,
  effectiveLineHeight,
}: NoteTypographyPopoverProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const updateNoteStore = useNoteStore((s) => s.updateNote)
  const setEditorFontFamily = useProfileStore((s) => s.setEditorFontFamily)
  const setEditorFontSize = useProfileStore((s) => s.setEditorFontSize)
  const setEditorLineHeight = useProfileStore((s) => s.setEditorLineHeight)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // ¿Usa override propio o hereda el global?
  const isInheriting =
    noteFontFamily === null && noteFontSize === null && noteLineHeight === null

  // Persiste cambios de la nota y los refleja en vivo vía el store (optimista).
  const applyToNote = async (patch: {
    fontFamily?: string | null
    fontSize?: number | null
    lineHeight?: number | null
  }) => {
    setError(null)
    const storePatch: Record<string, string | number | null> = {}
    if ('fontFamily' in patch) storePatch.note_font_family = patch.fontFamily ?? null
    if ('fontSize' in patch) storePatch.note_font_size = patch.fontSize ?? null
    if ('lineHeight' in patch) storePatch.note_line_height = patch.lineHeight ?? null
    updateNoteStore(noteId, storePatch)
    try {
      await updateNoteTypography(noteId, patch)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar la tipografía')
    }
  }

  const handleSize = (next: number) => {
    const clamped = Math.min(MAX_EDITOR_FONT_SIZE, Math.max(MIN_EDITOR_FONT_SIZE, next))
    if (clamped === effectiveFontSize) return
    void applyToNote({ fontSize: clamped })
  }

  const handleReset = () =>
    void applyToNote({ fontFamily: null, fontSize: null, lineHeight: null })

  const handleUseForAll = async () => {
    setError(null)
    try {
      // Captura los efectivos actuales como nuevo default global (user_profiles).
      await setEditorFontFamily(effectiveFontFamily)
      await setEditorFontSize(effectiveFontSize)
      await setEditorLineHeight(effectiveLineHeight)
      // La nota vuelve a heredar el global → mismo resultado visual.
      await applyToNote({ fontFamily: null, fontSize: null, lineHeight: null })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al aplicar a todas las notas')
    }
  }

  return (
    <div className="relative" ref={ref}>
      <ToolbarTooltip label="Tipografía de la nota">
        <button
          type="button"
          aria-label="Tipografía de la nota"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1 px-2 py-1.5 rounded text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
        >
          <Type size={14} />
          <span className="font-semibold">Aa</span>
        </button>
      </ToolbarTooltip>

      {open && (
        <div className="absolute left-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-2xl w-72 p-4">
          <p className="text-xs font-semibold text-foreground mb-0.5">Tipografía de la nota</p>
          <p className="text-[11px] text-subtle mb-3">
            {isInheriting ? 'Heredando el predeterminado' : 'Personalizada para esta nota'}
          </p>

          {error && (
            <div className="mb-3 px-2.5 py-2 bg-danger/10 border border-danger/20 rounded-lg text-[11px] text-danger">
              {error}
            </div>
          )}

          {/* Familia */}
          <p className="text-[11px] font-medium text-muted mb-1.5">Fuente</p>
          <div className="grid grid-cols-3 gap-1.5 mb-4">
            {EDITOR_FONTS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => void applyToNote({ fontFamily: f.key })}
                style={{ fontFamily: f.stack }}
                className={`py-2 px-2 rounded-lg border text-xs transition cursor-pointer truncate ${
                  effectiveFontFamily === f.key
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface text-muted hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Tamaño */}
          <p className="text-[11px] font-medium text-muted mb-1.5">Tamaño</p>
          <div className="flex items-center gap-2 mb-4">
            <button
              type="button"
              aria-label="Reducir tamaño"
              onClick={() => handleSize(effectiveFontSize - 1)}
              disabled={effectiveFontSize <= MIN_EDITOR_FONT_SIZE}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="w-14 text-center text-sm font-medium text-foreground tabular-nums">
              {effectiveFontSize}px
            </span>
            <button
              type="button"
              aria-label="Aumentar tamaño"
              onClick={() => handleSize(effectiveFontSize + 1)}
              disabled={effectiveFontSize >= MAX_EDITOR_FONT_SIZE}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <Plus size={14} />
            </button>
            <span
              className="ml-1 text-foreground leading-none"
              style={{ fontSize: `${effectiveFontSize}px` }}
            >
              Aa
            </span>
          </div>

          {/* Interlineado */}
          <p className="text-[11px] font-medium text-muted mb-1.5">Interlineado</p>
          <div className="grid grid-cols-3 gap-1.5 mb-4">
            {LINE_HEIGHT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => void applyToNote({ lineHeight: opt.value })}
                className={`py-2 px-2 rounded-lg border text-xs font-medium transition cursor-pointer ${
                  effectiveLineHeight === opt.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface text-muted hover:text-foreground'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Acciones */}
          <div className="pt-3 border-t border-border">
            <button
              type="button"
              onClick={handleReset}
              disabled={isInheriting}
              className="flex items-center gap-1 text-[11px] text-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <RotateCcw size={11} />
              Restablecer a predeterminado
            </button>
            <button
              type="button"
              onClick={handleUseForAll}
              className="mt-3 w-full py-2 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent-light transition cursor-pointer"
            >
              Usar para todas mis notas
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
