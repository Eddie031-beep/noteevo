'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { X, Pin, FolderInput, Trash2 } from 'lucide-react'
import { NOTE_COLORS, type NoteColor } from '@/lib/constants/colors'
import type { Note } from '@/types'

const POPOVER_WIDTH = 232
const GAP = 8
const VIEWPORT_MARGIN = 8
const ARROW_SIZE = 10

interface NotePopoverMenuProps {
  note: Note
  anchorRect: DOMRect
  onClose: () => void
  onColorChange: (color: NoteColor | null) => void
  onPinToggle: () => void
  onMove: () => void
  onDelete: () => void
}

interface Position {
  top: number
  left: number
  side: 'right' | 'left'
}

export default function NotePopoverMenu({
  note,
  anchorRect,
  onClose,
  onColorChange,
  onPinToggle,
  onMove,
  onDelete,
}: NotePopoverMenuProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const firstColorRef = useRef<HTMLButtonElement>(null)

  const [pos, setPos] = useState<Position>(() => {
    const placeLeft = anchorRect.right + GAP + POPOVER_WIDTH > window.innerWidth
    return {
      top: anchorRect.top,
      left: placeLeft ? anchorRect.left - POPOVER_WIDTH - GAP : anchorRect.right + GAP,
      side: placeLeft ? 'left' : 'right',
    }
  })
  const [height, setHeight] = useState(0)

  // Medir el popover y mantenerlo dentro del viewport verticalmente
  useLayoutEffect(() => {
    const el = popoverRef.current
    if (!el) return
    const measured = el.offsetHeight
    setHeight(measured)
    const maxTop = window.innerHeight - measured - VIEWPORT_MARGIN
    const clampedTop = Math.max(VIEWPORT_MARGIN, Math.min(anchorRect.top, maxTop))
    setPos((prev) => (prev.top === clampedTop ? prev : { ...prev, top: clampedTop }))
  }, [anchorRect])

  // Foco en el primer color al abrir (accesibilidad por teclado)
  useEffect(() => {
    firstColorRef.current?.focus()
  }, [])

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Posición vertical de la flecha, alineada al centro del botón origen
  const anchorCenterY = anchorRect.top + anchorRect.height / 2
  const rawArrowTop = anchorCenterY - pos.top - ARROW_SIZE / 2
  const maxArrowTop = height > 0 ? height - ARROW_SIZE - 12 : rawArrowTop
  const arrowTop = Math.max(12, Math.min(rawArrowTop, maxArrowTop))

  const arrowOnLeftEdge = pos.side === 'right'

  return (
    <div
      ref={popoverRef}
      role="menu"
      className="fixed bg-panel border border-border rounded-[10px] p-3.5"
      style={{
        top: pos.top,
        left: pos.left,
        width: POPOVER_WIDTH,
        zIndex: 60,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Flecha lateral apuntando al botón origen */}
      <span
        aria-hidden
        className="absolute w-2.5 h-2.5 bg-panel rotate-45"
        style={{
          top: arrowTop,
          [arrowOnLeftEdge ? 'left' : 'right']: -ARROW_SIZE / 2,
          borderLeft: arrowOnLeftEdge ? '1px solid var(--color-border)' : undefined,
          borderBottom: arrowOnLeftEdge ? '1px solid var(--color-border)' : undefined,
          borderTop: arrowOnLeftEdge ? undefined : '1px solid var(--color-border)',
          borderRight: arrowOnLeftEdge ? undefined : '1px solid var(--color-border)',
        }}
      />

      {/* Header */}
      <div className="text-[11px] uppercase tracking-wider text-muted mb-2.5 px-0.5">
        Color de la nota
      </div>

      {/* Grid de colores 4x2 */}
      <div className="grid grid-cols-4 gap-2 mb-2.5">
        {Object.entries(NOTE_COLORS).map(([name, hex], i) => (
          <button
            key={name}
            ref={i === 0 ? firstColorRef : undefined}
            type="button"
            onClick={() => onColorChange(name as NoteColor)}
            aria-label={`Color ${name}`}
            className={`w-9 h-9 rounded-full border-2 transition cursor-pointer hover:border-white/30 ${
              note.color === name ? 'border-white' : 'border-transparent'
            }`}
            style={{ backgroundColor: hex }}
          />
        ))}
      </div>

      {/* Sin color */}
      <div className="flex flex-col items-center mb-1">
        <button
          type="button"
          onClick={() => onColorChange(null)}
          aria-label="Sin color"
          className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center hover:border-white/30 transition cursor-pointer"
        >
          <X size={14} className="text-muted" />
        </button>
        <span className="text-[11px] text-muted mt-1.5">Sin color</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-2.5" />

      {/* Acciones */}
      <button
        type="button"
        onClick={onPinToggle}
        className="flex items-center gap-2 w-full px-1 py-1.5 rounded text-sm text-foreground hover:bg-surface transition cursor-pointer"
      >
        <Pin size={16} className="text-muted" />
        <span>{note.is_pinned ? 'Desanclar' : 'Anclar'}</span>
      </button>

      <button
        type="button"
        onClick={onMove}
        className="flex items-center gap-2 w-full px-1 py-1.5 rounded text-sm text-foreground hover:bg-surface transition cursor-pointer"
      >
        <FolderInput size={16} className="text-muted" />
        <span>Mover</span>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="flex items-center gap-2 w-full px-1 py-1.5 rounded text-sm text-danger hover:bg-danger/10 transition cursor-pointer"
      >
        <Trash2 size={16} className="text-danger" />
        <span>Eliminar</span>
      </button>
    </div>
  )
}
