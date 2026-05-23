'use client'

import { useEffect, useState, useRef } from 'react'
import { useNoteStore } from '@/store/noteStore'
import { useNotebookStore } from '@/store/notebookStore'
import { getNotesByNotebook, createNote, trashNote, updateNote } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'
import { Plus, Trash2, FileText, FolderInput, Loader2, Copy, MoreHorizontal, LayoutTemplate } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import type { Note } from '@/types'
import SaveAsTemplateModal from '@/components/templates/SaveAsTemplateModal'
import MoveNoteModal from '@/components/notes/MoveNoteModal'

function NoteContextMenu({
  note,
  onClose,
  onTrashed,
  onDuplicated,
}: {
  note: Note
  onClose: () => void
  onTrashed: () => void
  onDuplicated: (newNote: Note) => void
}) {
  const [showMoveModal, setShowMoveModal] = useState(false)
  const [showSaveTemplate, setShowSaveTemplate] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const handleDuplicate = async () => {
    if (!note.notebook_id) return
    setLoading('duplicate')
    try {
      const newNote = await createNote(note.notebook_id)
      await updateNote(newNote.id, {
        title: `${note.title} (copia)`,
        content: note.content,
      })
      onDuplicated({ ...newNote, title: `${note.title} (copia)`, content: note.content })
    } catch {
      // silencioso
    } finally {
      setLoading(null)
      onClose()
    }
  }

  const handleTrash = async () => {
    setLoading('trash')
    try {
      await trashNote(note.id)
      onTrashed()
    } catch {
      // silencioso
    } finally {
      setLoading(null)
      onClose()
    }
  }

  return (
    <>
      <div
        ref={ref}
        className="absolute right-2 top-8 z-30 bg-panel border border-border rounded-xl shadow-2xl w-52 py-1 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mover a */}
        <button
          type="button"
          onClick={() => setShowMoveModal(true)}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
        >
          <FolderInput size={13} />
          Mover a...
        </button>

        {/* Duplicar */}
        <button
          type="button"
          onClick={handleDuplicate}
          disabled={loading === 'duplicate'}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer disabled:opacity-50"
        >
          {loading === 'duplicate' ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Copy size={13} />
          )}
          Duplicar
        </button>

        {/* Guardar como plantilla */}
        <button
          type="button"
          onClick={() => setShowSaveTemplate(true)}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
        >
          <LayoutTemplate size={13} />
          Guardar como plantilla
        </button>

        <div className="my-1 border-t border-border" />

        {/* Papelera */}
        <button
          type="button"
          onClick={handleTrash}
          disabled={loading === 'trash'}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-danger hover:bg-danger/10 transition cursor-pointer disabled:opacity-50"
        >
          {loading === 'trash' ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Trash2 size={13} />
          )}
          Mover a papelera
        </button>
      </div>

      {showMoveModal && (
        <MoveNoteModal
          note={note}
          onMoved={() => { onTrashed(); onClose() }}
          onClose={() => setShowMoveModal(false)}
        />
      )}

      {showSaveTemplate && (
        <SaveAsTemplateModal
          content={note.content}
          defaultName={note.title !== 'Sin título' ? note.title : ''}
          onSaved={() => {}}
          onClose={() => { setShowSaveTemplate(false); onClose() }}
        />
      )}
    </>
  )
}

function DraggableNote({
  note,
  isSelected,
  onSelect,
  onRemove,
  onDuplicated,
}: {
  note: Note
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
  onDuplicated: (newNote: Note) => void
}) {
  const [showMenu, setShowMenu] = useState(false)
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `note-${note.id}`,
      data: { type: 'note', noteId: note.id, currentNotebookId: note.notebook_id },
    })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    transition: isDragging ? undefined : 'opacity 150ms',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onSelect}
      className={`relative group px-4 py-3.5 border-b border-border cursor-grab active:cursor-grabbing transition ${
        isSelected
          ? 'bg-elevated border-l-2 border-l-accent'
          : 'hover:bg-surface'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {note.title || 'Sin título'}
          </p>
          <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
            {extractTextPreview(note.content) || 'Sin contenido'}
          </p>
          <p className="text-xs text-subtle mt-1.5">
            {format(new Date(note.updated_at), 'd MMM yyyy', { locale: es })}
          </p>
        </div>

        <button
          type="button"
          title="Opciones"
          onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu) }}
          className="opacity-0 group-hover:opacity-100 p-1.5 text-muted hover:text-foreground hover:bg-elevated rounded-lg transition cursor-pointer shrink-0 mt-0.5"
        >
          <MoreHorizontal size={14} />
        </button>
      </div>

      {showMenu && (
        <NoteContextMenu
          note={note}
          onClose={() => setShowMenu(false)}
          onTrashed={() => { setShowMenu(false); onRemove() }}
          onDuplicated={(newNote) => { setShowMenu(false); onDuplicated(newNote) }}
        />
      )}
    </div>
  )
}

export default function NoteList() {
  const { notes, setNotes, addNote, deleteNote, setSelectedNote, selectedNote } =
    useNoteStore()
  const { selectedNotebook } = useNotebookStore()

  useEffect(() => {
    if (!selectedNotebook) return
    const load = async () => {
      try {
        const data = await getNotesByNotebook(selectedNotebook.id)
        setNotes(data)
      } catch {
        // error cargando notas
      }
    }
    load()
  }, [selectedNotebook, setNotes])

  const handleCreate = async () => {
    if (!selectedNotebook) return
    try {
      const note = await createNote(selectedNotebook.id)
      addNote(note)
      setSelectedNote(note)
    } catch {
      // error creando nota
    }
  }

  if (!selectedNotebook) {
    return (
      <div className="w-72 h-screen bg-panel border-r border-border flex flex-col items-center justify-center gap-3 shrink-0">
        <FileText size={32} className="text-subtle" />
        <p className="text-sm text-muted">Selecciona una libreta</p>
      </div>
    )
  }

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      {/* Header */}
      <div className="h-14 px-4 border-b border-border flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h2 className="font-semibold text-foreground text-sm truncate">
            {selectedNotebook.name}
          </h2>
          <p className="text-xs text-muted">
            {notes.length} nota{notes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          type="button"
          title="Nueva nota"
          onClick={handleCreate}
          className="p-1.5 text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition cursor-pointer shrink-0"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <FileText size={32} className="text-subtle" />
            <p className="text-sm text-muted">Sin notas aún</p>
            <button
              type="button"
              onClick={handleCreate}
              className="text-sm text-accent hover:text-accent-light transition cursor-pointer"
            >
              Crear primera nota
            </button>
          </div>
        ) : (
          notes.map((note) => (
            <DraggableNote
              key={note.id}
              note={note}
              isSelected={selectedNote?.id === note.id}
              onSelect={() => setSelectedNote(note)}
              onRemove={() => deleteNote(note.id)}
              onDuplicated={(newNote) => {
                addNote(newNote)
                setSelectedNote(newNote)
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}
