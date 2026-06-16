'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Editor } from '@tiptap/react'
import { useNoteStore } from '@/store/noteStore'
import type { Note } from '@/types'

interface NoteLinkMenuProps {
  editor: Editor
  query: string
  anchor: { top: number; left: number }
  onClose: () => void
}

export default function NoteLinkMenu({ editor, query, anchor, onClose }: NoteLinkMenuProps) {
  const { notes } = useNoteStore()
  const [activeIdx, setActiveIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return notes
      .filter((n) => !n.is_trashed && n.title.toLowerCase().includes(q))
      .slice(0, 8)
  }, [notes, query])

  useEffect(() => { setActiveIdx(0) }, [filtered.length])

  const insertLink = (note: Note) => {
    const { from } = editor.state.selection
    const textBefore = editor.state.doc.textBetween(Math.max(0, from - 200), from)
    const match = /\[\[([^\]]*)$/.exec(textBefore)
    if (match) {
      const deleteFrom = from - match[0].length
      editor
        .chain()
        .focus()
        .deleteRange({ from: deleteFrom, to: from })
        .insertContent({
          type: 'noteLink',
          attrs: { noteId: note.id, title: note.title },
        })
        .run()
    }
    onClose()
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[activeIdx]) insertLink(filtered[activeIdx])
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handler, true)
    return () => window.removeEventListener('keydown', handler, true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, activeIdx, onClose])

  if (filtered.length === 0) {
    return (
      <div
        ref={containerRef}
        style={{ top: anchor.top, left: anchor.left }}
        className="fixed z-50 bg-panel border border-border rounded-lg shadow-xl p-3 text-sm text-muted min-w-[200px]"
      >
        Sin notas encontradas
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{ top: anchor.top, left: anchor.left }}
      className="fixed z-50 bg-panel border border-border rounded-lg shadow-xl overflow-hidden min-w-[220px] max-w-[300px]"
    >
      <div className="p-1">
        {filtered.map((note, i) => (
          <button
            key={note.id}
            type="button"
            onMouseDown={(e) => { e.preventDefault(); insertLink(note) }}
            className={`w-full text-left px-3 py-1.5 rounded text-sm truncate transition-colors ${
              i === activeIdx
                ? 'bg-accent text-white'
                : 'text-foreground hover:bg-surface'
            }`}
          >
            {note.emoji && <span className="mr-1.5">{note.emoji}</span>}
            {note.title}
          </button>
        ))}
      </div>
    </div>
  )
}
