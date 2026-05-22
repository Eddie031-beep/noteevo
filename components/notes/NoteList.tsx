'use client'

import { useEffect, useState } from 'react'
import { useNoteStore } from '@/store/noteStore'
import { useNotebookStore } from '@/store/notebookStore'
import { getNotesByNotebook, createNote, trashNote, updateNote } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'
import { Plus, Trash2, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import TemplateSelector from '@/components/templates/TemplateSelector'
import type { Template } from '@/types'

export default function NoteList() {
  const { notes, setNotes, addNote, deleteNote, setSelectedNote, selectedNote } =
    useNoteStore()
  const { selectedNotebook } = useNotebookStore()
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)

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

  const handleCreate = () => {
    if (!selectedNotebook) return
    setShowTemplateSelector(true)
  }

  const handleCreateBlank = async () => {
    if (!selectedNotebook) return
    setShowTemplateSelector(false)
    try {
      const note = await createNote(selectedNotebook.id)
      addNote(note)
      setSelectedNote(note)
    } catch {
      // error creando nota
    }
  }

  const handleCreateFromTemplate = async (template: Template) => {
    if (!selectedNotebook) return
    setShowTemplateSelector(false)
    try {
      const note = await createNote(selectedNotebook.id)
      await updateNote(note.id, {
        title: template.name,
        content: template.content,
      })
      const populated = { ...note, title: template.name, content: template.content }
      addNote(populated)
      setSelectedNote(populated)
    } catch {
      // error creando nota desde plantilla
    }
  }

  const handleTrash = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await trashNote(id)
      deleteNote(id)
    } catch {
      // error eliminando nota
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

      {showTemplateSelector && (
        <TemplateSelector
          onSelectBlank={handleCreateBlank}
          onSelectTemplate={handleCreateFromTemplate}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}

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
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`group px-4 py-3.5 border-b border-border cursor-pointer transition ${
                selectedNote?.id === note.id
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
                    {format(new Date(note.updated_at), 'd MMM yyyy', {
                      locale: es,
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  title="Mover a papelera"
                  onClick={(e) => handleTrash(note.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-muted hover:text-danger transition cursor-pointer mt-0.5 shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
