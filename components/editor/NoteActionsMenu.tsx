'use client'

import { useRef, useState, useEffect } from 'react'
import {
  MoreHorizontal, FolderInput, Copy, LayoutTemplate,
  Download, History, Maximize2, Minimize2, Trash2, Star, Loader2,
} from 'lucide-react'
import { trashNote, toggleFavorite, createNote, updateNote } from '@/lib/supabase/notes'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import type { Note } from '@/types'

interface NoteActionsMenuProps {
  note: Note
  onExport: () => void
  onVersions: () => void
  onSaveTemplate: () => void
  onMove: () => void
}

export default function NoteActionsMenu({
  note,
  onExport,
  onVersions,
  onSaveTemplate,
  onMove,
}: NoteActionsMenuProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { updateNote: updateNoteStore, deleteNote, setSelectedNote, addNote } = useNoteStore()
  const { isFocusMode, setFocusMode } = useUIStore()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const run = async (key: string, fn: () => Promise<void>) => {
    setLoading(key)
    setOpen(false)
    try {
      await fn()
    } catch {
      // error silencioso
    } finally {
      setLoading(null)
    }
  }

  const handleFavorite = () =>
    run('fav', async () => {
      const newVal = !note.is_favorite
      await toggleFavorite(note.id, newVal)
      updateNoteStore(note.id, { is_favorite: newVal })
    })

  const handleDuplicate = () =>
    run('dup', async () => {
      if (!note.notebook_id) return
      const newNote = await createNote(note.notebook_id)
      await updateNote(newNote.id, { title: `${note.title} (copia)`, content: note.content })
      const populated = { ...newNote, title: `${note.title} (copia)`, content: note.content }
      addNote(populated)
      setSelectedNote(populated)
    })

  const handleTrash = () =>
    run('trash', async () => {
      await trashNote(note.id)
      deleteNote(note.id)
    })

  const wrap = (fn: () => void) => {
    fn()
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title="Más opciones"
        onClick={() => setOpen(!open)}
        disabled={loading !== null}
        className={`p-1.5 rounded transition cursor-pointer ${
          open
            ? 'bg-elevated text-foreground'
            : 'text-muted hover:bg-surface hover:text-foreground'
        } disabled:opacity-40`}
      >
        {loading ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <MoreHorizontal size={15} />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-50 bg-panel border border-border rounded-xl shadow-2xl w-52 py-1 overflow-hidden">

          {/* Favorito */}
          <button
            type="button"
            onClick={handleFavorite}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <Star
              size={13}
              className={note.is_favorite ? 'text-yellow-400 fill-yellow-400' : ''}
            />
            {note.is_favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          </button>

          <div className="my-1 h-px bg-border mx-2" />

          {/* Mover */}
          <button
            type="button"
            onClick={() => wrap(onMove)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <FolderInput size={13} />
            Mover a...
          </button>

          {/* Duplicar */}
          <button
            type="button"
            onClick={handleDuplicate}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <Copy size={13} />
            Duplicar nota
          </button>

          {/* Guardar como plantilla */}
          <button
            type="button"
            onClick={() => wrap(onSaveTemplate)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <LayoutTemplate size={13} />
            Guardar como plantilla
          </button>

          <div className="my-1 h-px bg-border mx-2" />

          {/* Exportar */}
          <button
            type="button"
            onClick={() => wrap(onExport)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <Download size={13} />
            Exportar nota
          </button>

          {/* Historial */}
          <button
            type="button"
            onClick={() => wrap(onVersions)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <History size={13} />
            Historial de versiones
          </button>

          {/* Focus mode */}
          <button
            type="button"
            onClick={() => { setFocusMode(!isFocusMode); setOpen(false) }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            {isFocusMode ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            {isFocusMode ? 'Salir del modo enfoque' : 'Modo enfoque'}
          </button>

          <div className="my-1 h-px bg-border mx-2" />

          {/* Papelera */}
          <button
            type="button"
            onClick={handleTrash}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-danger hover:bg-danger/10 transition cursor-pointer"
          >
            <Trash2 size={13} />
            Mover a papelera
          </button>
        </div>
      )}
    </div>
  )
}
