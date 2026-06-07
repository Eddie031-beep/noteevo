'use client'

import { useEffect, useRef, useState } from 'react'
import { Smile } from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'
import { updateNoteEmoji } from '@/lib/supabase/notes'

const FREQUENT_EMOJIS = [
  '📝', '✏️', '📌', '📎', '🔖', '💡', '🎯', '🔍',
  '📊', '📈', '🗒️', '📅', '✅', '🚀', '💬', '🎨',
  '🧠', '💼', '🏠', '🌟', '⭐', '🎉', '🔥', '💎',
  '🌈', '🌸', '🍀', '☕', '🎁', '❤️', '🌙', '☀️',
  '⚡', '🎵', '📚', '🏆', '🔔', '💭', '🌺', '🦋',
]

interface NoteEmojiButtonProps {
  noteId: string
  emoji: string | null | undefined
  editable: boolean
}

export default function NoteEmojiButton({ noteId, emoji, editable }: NoteEmojiButtonProps) {
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

  const apply = async (value: string | null) => {
    setOpen(false)
    const prev = emoji ?? null
    updateNote(noteId, { emoji: value }) // optimista
    try {
      await updateNoteEmoji(noteId, value)
    } catch {
      updateNote(noteId, { emoji: prev }) // rollback
    }
  }

  // Lectores (rol viewer): mostrar el emoji si existe, sin interacción
  if (!editable) {
    return emoji ? <div className="text-[32px] leading-none mb-2">{emoji}</div> : null
  }

  return (
    <div className="relative mb-2" ref={ref}>
      {emoji ? (
        <button
          type="button"
          title="Cambiar emoji"
          onClick={() => setOpen((v) => !v)}
          className="text-[32px] leading-none rounded-lg px-1 -mx-1 hover:bg-surface transition cursor-pointer"
        >
          {emoji}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground opacity-0 group-hover/head:opacity-100 transition px-2 py-1 -mx-2 rounded-md hover:bg-surface cursor-pointer"
        >
          <Smile size={14} /> Añadir emoji
        </button>
      )}

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-panel border border-border rounded-xl shadow-2xl p-2 w-[296px]">
          <div className="grid grid-cols-8 gap-0.5">
            {FREQUENT_EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => apply(e)}
                className="text-xl h-8 w-8 flex items-center justify-center rounded-md hover:bg-surface transition cursor-pointer"
              >
                {e}
              </button>
            ))}
          </div>
          {emoji && (
            <>
              <div className="my-1 h-px bg-border" />
              <button
                type="button"
                onClick={() => apply(null)}
                className="w-full text-left text-xs text-muted hover:text-danger px-2 py-1.5 rounded-md hover:bg-surface transition cursor-pointer"
              >
                Quitar emoji
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
