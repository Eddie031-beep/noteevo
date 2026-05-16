'use client'

import { useEffect, useState } from 'react'
import { getTrashedNotes, restoreNote, permanentlyDeleteNote } from '@/lib/supabase/notes'
import type { Note } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Trash2, RotateCcw, X } from 'lucide-react'

export default function TrashNotes() {
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTrashedNotes()
        setTrashedNotes(data)
      } catch {
        // error cargando papelera
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleRestore = async (id: string) => {
    try {
      await restoreNote(id)
      setTrashedNotes((prev) => prev.filter((n) => n.id !== id))
    } catch {
      // error restaurando nota
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await permanentlyDeleteNote(id)
      setTrashedNotes((prev) => prev.filter((n) => n.id !== id))
    } catch {
      // error eliminando nota
    }
  }

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      <div className="h-14 px-4 border-b border-border flex items-center gap-2.5">
        <Trash2 size={18} className="text-muted shrink-0" />
        <div>
          <h2 className="font-semibold text-foreground text-sm">Papelera</h2>
          {!loading && (
            <p className="text-xs text-muted">
              {trashedNotes.length} nota{trashedNotes.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-muted text-center mt-8">Cargando...</p>
        ) : trashedNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Trash2 size={32} className="text-subtle" />
            <p className="text-sm text-muted">Papelera vacía</p>
          </div>
        ) : (
          trashedNotes.map((note) => (
            <div
              key={note.id}
              className="group px-4 py-3.5 border-b border-border hover:bg-surface transition"
            >
              <p className="text-sm font-medium text-foreground truncate">
                {note.title || 'Sin título'}
              </p>
              <p className="text-xs text-muted mt-1">
                {format(new Date(note.updated_at), 'd MMM yyyy', { locale: es })}
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => handleRestore(note.id)}
                  className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition cursor-pointer"
                >
                  <RotateCcw size={12} />
                  Restaurar
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(note.id)}
                  className="flex items-center gap-1 text-xs text-danger hover:text-danger/80 transition cursor-pointer"
                >
                  <X size={12} />
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
