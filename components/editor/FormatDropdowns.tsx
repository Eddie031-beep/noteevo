'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import type { Editor } from '@tiptap/react'
import ToolbarTooltip from './ToolbarTooltip'

// ── Text Color ─────────────────────────────────────────────────────────────
// Único control por SELECCIÓN que queda en la toolbar. La fuente/tamaño/interlineado
// se configuran POR NOTA en NoteTypographyPopover (no por selección).
const COLORS: { value: string | null; label: string }[] = [
  { value: null, label: 'Auto' },
  { value: '#e7ece8', label: '' },
  { value: '#a0a0a0', label: '' },
  { value: '#ef4444', label: '' },
  { value: '#f97316', label: '' },
  { value: '#eab308', label: '' },
  { value: '#22c55e', label: '' },
  { value: '#06b6d4', label: '' },
  { value: '#3b82f6', label: '' },
  { value: '#8b5cf6', label: '' },
  { value: '#ec4899', label: '' },
  { value: '#2e9e68', label: '' },
]

export function TextColorPicker({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const currentColor = editor.getAttributes('textStyle').color as string | undefined

  return (
    <div className="relative" ref={ref}>
      <ToolbarTooltip label="Color de texto">
        <button
          type="button"
          aria-label="Color de texto"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-0.5 p-1.5 rounded hover:bg-surface transition cursor-pointer"
        >
          <span className="text-xs font-bold text-foreground leading-none relative">
            A
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded"
              style={{ backgroundColor: currentColor ?? 'var(--color-foreground)' }}
            />
          </span>
          <ChevronDown size={10} className="text-muted" />
        </button>
      </ToolbarTooltip>

      {open && (
        <div className="absolute left-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-2xl p-3 w-44">
          <p className="text-[10px] text-subtle uppercase tracking-wider mb-2">Color de texto</p>
          <div className="grid grid-cols-6 gap-1.5">
            {COLORS.map(({ value, label }) => (
              <button
                key={value ?? 'auto'}
                type="button"
                title={label || value || 'Auto'}
                onClick={() => {
                  if (value) {
                    editor.chain().focus().setColor(value).run()
                  } else {
                    editor.chain().focus().unsetColor().run()
                  }
                  setOpen(false)
                }}
                className="w-6 h-6 rounded-md border border-border/50 flex items-center justify-center transition hover:scale-110 cursor-pointer"
                style={{ backgroundColor: value ?? 'transparent' }}
              >
                {!value && <span className="text-[9px] text-muted font-medium">A</span>}
                {value === currentColor && (
                  <Check size={10} className="text-white drop-shadow" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
