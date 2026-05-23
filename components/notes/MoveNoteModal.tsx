'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Search, BookOpen, Check, Loader2 } from 'lucide-react'
import { useNotebookStore } from '@/store/notebookStore'
import { updateNote } from '@/lib/supabase/notes'
import type { Note } from '@/types'

interface MoveNoteModalProps {
  note: Note
  onMoved: () => void
  onClose: () => void
}

export default function MoveNoteModal({ note, onMoved, onClose }: MoveNoteModalProps) {
  const { notebooks } = useNotebookStore()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(note.notebook_id)
  const [moving, setMoving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const filtered = notebooks.filter((nb) =>
    nb.name.toLowerCase().includes(query.toLowerCase())
  )

  const currentNotebook = notebooks.find((nb) => nb.id === note.notebook_id)
  const targetNotebook = notebooks.find((nb) => nb.id === selected)

  const hasChanged = selected !== note.notebook_id

  const handleMove = async () => {
    if (!selected || !hasChanged) return
    setMoving(true)
    try {
      await updateNote(note.id, { notebook_id: selected })
      onMoved()
      onClose()
    } catch {
      // silencioso
    } finally {
      setMoving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-semibold text-foreground">Mover</span>
            <span className="px-2 py-0.5 bg-surface border border-border rounded-md text-xs text-muted truncate max-w-[160px]">
              {note.title || 'Sin título'}
            </span>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border focus-within:border-accent/50 transition">
            <Search size={13} className="text-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar libreta..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder-subtle"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>
        </div>

        {/* Notebook list */}
        <div className="overflow-y-auto max-h-64 py-1">
          {filtered.length === 0 ? (
            <p className="text-xs text-muted text-center py-6">Sin resultados</p>
          ) : (
            filtered.map((nb) => {
              const isCurrent = nb.id === note.notebook_id
              const isSelected = nb.id === selected

              return (
                <button
                  key={nb.id}
                  type="button"
                  onClick={() => setSelected(nb.id)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition cursor-pointer ${
                    isSelected ? 'bg-accent/10' : 'hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-accent/20' : 'bg-elevated'
                    }`}>
                      <BookOpen size={13} className={isSelected ? 'text-accent' : 'text-muted'} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm truncate ${isSelected ? 'text-accent font-medium' : 'text-foreground'}`}>
                        {nb.name}
                      </p>
                      {isCurrent && (
                        <p className="text-[10px] text-subtle">Ubicación actual</p>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <Check size={15} className="text-accent shrink-0" />
                  )}
                </button>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-border">
          <p className="text-xs text-subtle truncate flex-1">
            {hasChanged && targetNotebook
              ? `→ ${targetNotebook.name}`
              : currentNotebook
                ? `En: ${currentNotebook.name}`
                : ''}
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition cursor-pointer rounded-lg hover:bg-surface"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleMove}
              disabled={!hasChanged || moving}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-medium"
            >
              {moving && <Loader2 size={13} className="animate-spin" />}
              {moving ? 'Moviendo...' : 'Mover aquí'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
