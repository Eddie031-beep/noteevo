'use client'

import { useEffect, useRef, useState } from 'react'
import { MoreHorizontal, X } from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'
import { updateNoteColor } from '@/lib/supabase/notes'
import { NOTE_COLORS, isNoteColor, type NoteColor } from '@/lib/constants/colors'

interface NoteColorMenuProps {
  noteId: string
  color: string | null | undefined
}

export default function NoteColorMenu({ noteId, color }: NoteColorMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { updateNote } = useNoteStore()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const apply = async (value: NoteColor | null) => {
    setOpen(false)
    const prev = color ?? null
    updateNote(noteId, { color: value }) // optimista
    try {
      await updateNoteColor(noteId, value)
    } catch {
      updateNote(noteId, { color: prev }) // rollback
    }
  }

  const currentHex = isNoteColor(color) ? NOTE_COLORS[color] : null

  return (
    <div className="absolute top-2 right-9 z-10" ref={ref}>
      <button
        type="button"
        title="Color de nota"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        className={[
          'p-1 rounded-md transition-all duration-150 cursor-pointer flex items-center justify-center',
          currentHex
            ? 'opacity-100'
            : 'text-muted opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-surface',
        ].join(' ')}
      >
        {currentHex ? (
          <span
            className="block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: currentHex }}
          />
        ) : (
          <MoreHorizontal size={12} />
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-7 z-50 bg-panel border border-border rounded-xl shadow-2xl p-2"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-1.5">
            {(Object.keys(NOTE_COLORS) as NoteColor[]).map((key) => (
              <button
                key={key}
                type="button"
                title={key}
                onClick={(e) => {
                  e.stopPropagation()
                  apply(key)
                }}
                className={[
                  'w-5 h-5 rounded-full cursor-pointer transition hover:scale-110',
                  color === key ? 'ring-2 ring-offset-1 ring-offset-panel ring-foreground/60' : '',
                ].join(' ')}
                style={{ backgroundColor: NOTE_COLORS[key] }}
              />
            ))}
            <button
              type="button"
              title="Sin color"
              onClick={(e) => {
                e.stopPropagation()
                apply(null)
              }}
              className="w-5 h-5 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-surface cursor-pointer transition"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
