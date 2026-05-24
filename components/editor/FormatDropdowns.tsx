'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import type { Editor } from '@tiptap/react'

// ── Font Family ────────────────────────────────────────────────────────────
const FONTS = [
  { value: '', label: 'Sans Serif' },
  { value: 'Georgia, serif', label: 'Serif' },
  { value: 'var(--font-geist-mono), monospace', label: 'Monospace' },
]

export function FontFamilySelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const current = FONTS.find((f) =>
    f.value ? editor.isActive('textStyle', { fontFamily: f.value }) : false
  ) ?? FONTS[0]

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-1.5 rounded text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
        style={{ minWidth: 80 }}
      >
        <span className="truncate">{current.label}</span>
        <ChevronDown size={10} className="shrink-0" />
      </button>

      {open && (
        <div className="absolute left-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-2xl w-40 py-1">
          {FONTS.map((font) => {
            const isActive = current.value === font.value
            return (
              <button
                key={font.label}
                type="button"
                onClick={() => {
                  if (font.value) {
                    editor.chain().focus().setFontFamily(font.value).run()
                  } else {
                    editor.chain().focus().unsetFontFamily().run()
                  }
                  setOpen(false)
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs hover:bg-surface transition cursor-pointer"
                style={font.value ? { fontFamily: font.value } : {}}
              >
                <span className={isActive ? 'text-accent' : 'text-foreground'}>{font.label}</span>
                {isActive && <Check size={11} className="text-accent" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Font Size ──────────────────────────────────────────────────────────────
const SIZES = ['12', '14', '16', '18', '20', '24', '28', '32']

export function FontSizeSelector({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-0.5 px-1.5 py-1.5 rounded text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
      >
        <span>16</span>
        <ChevronDown size={10} className="shrink-0" />
      </button>

      {open && (
        <div className="absolute left-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-2xl w-20 py-1">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => {
                editor.chain().focus().setMark('textStyle', { fontSize: `${size}px` }).run()
                setOpen(false)
              }}
              className="w-full px-3 py-1.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer text-left"
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Text Color ─────────────────────────────────────────────────────────────
const COLORS: { value: string | null; label: string }[] = [
  { value: null, label: 'Auto' },
  { value: '#e8e8e8', label: '' },
  { value: '#a0a0a0', label: '' },
  { value: '#ef4444', label: '' },
  { value: '#f97316', label: '' },
  { value: '#eab308', label: '' },
  { value: '#22c55e', label: '' },
  { value: '#06b6d4', label: '' },
  { value: '#3b82f6', label: '' },
  { value: '#8b5cf6', label: '' },
  { value: '#ec4899', label: '' },
  { value: '#1a7a4a', label: '' },
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

  // Get current color from editor
  const currentColor = editor.getAttributes('textStyle').color as string | undefined

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title="Color de texto"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-0.5 p-1.5 rounded hover:bg-surface transition cursor-pointer"
      >
        {/* A with color underline */}
        <span className="text-xs font-bold text-foreground leading-none relative">
          A
          <span
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded"
            style={{ backgroundColor: currentColor ?? 'var(--color-foreground)' }}
          />
        </span>
        <ChevronDown size={10} className="text-muted" />
      </button>

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
                {!value && (
                  <span className="text-[9px] text-muted font-medium">A</span>
                )}
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
