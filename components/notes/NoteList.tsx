'use client'

import { useEffect } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { Plus, Star } from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'
import { useNotebookStore } from '@/store/notebookStore'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { Note } from '@/types'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface NoteCardProps {
  note: Note
  isSelected: boolean
  onSelect: () => void
  index: number
}

function NoteCard({ note, isSelected, onSelect, index }: NoteCardProps) {
  const preview = extractTextPreview(note.content, 80)
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: note.id,
    data: { type: 'note', noteId: note.id, currentNotebookId: note.notebook_id },
  })

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      type="button"
      onClick={onSelect}
      style={{
        animationDelay: `${index * 35}ms`,
        animationFillMode: 'both',
        opacity: isDragging ? 0.4 : 1,
      }}
      className={[
        'note-card-enter',
        'w-full text-left px-4 py-3 relative',
        'border-b border-border/30',
        'transition-all duration-200 ease-out cursor-pointer group',
        'border-l-2',
        isSelected
          ? 'bg-white/5 border-l-accent'
          : 'border-l-transparent hover:bg-white/[0.03] hover:border-l-accent/30',
      ].join(' ')}
    >
      {/* Title */}
      <p
        className={[
          'text-sm font-medium leading-snug truncate transition-colors duration-150',
          isSelected ? 'text-foreground' : 'text-foreground/85 group-hover:text-foreground',
        ].join(' ')}
      >
        {note.title || 'Sin título'}
      </p>

      {/* Preview */}
      {preview && (
        <p className="text-xs text-muted mt-0.5 line-clamp-2 leading-relaxed">
          {preview}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[10px] text-subtle tabular-nums">
          {formatDate(note.updated_at)}
        </span>
        {note.is_favorite && (
          <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />
        )}
      </div>
    </button>
  )
}

export default function NoteList() {
  const { notes, selectedNote, setSelectedNote, createNote, fetchNotes } = useNoteStore()
  const { selectedNotebook } = useNotebookStore()

  useEffect(() => {
    if (selectedNotebook?.id) {
      fetchNotes(selectedNotebook.id)
    }
  }, [selectedNotebook?.id, fetchNotes])

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground truncate">
            {selectedNotebook?.name ?? 'Notas'}
          </h2>
          <p className="text-[11px] text-subtle">
            {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
          </p>
        </div>

        {selectedNotebook && (
          <button
            type="button"
            title="Nueva nota"
            onClick={() => createNote(selectedNotebook.id)}
            className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-foreground transition-all duration-150 active:scale-90 shrink-0 cursor-pointer"
          >
            <Plus size={14} />
          </button>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center">
            <p className="text-sm text-subtle">Sin notas aquí</p>
            {selectedNotebook && (
              <button
                type="button"
                onClick={() => createNote(selectedNotebook.id)}
                className="text-xs text-accent hover:text-accent/80 transition cursor-pointer underline-offset-2 hover:underline"
              >
                Crear nota
              </button>
            )}
          </div>
        ) : (
          notes.map((note, index) => (
            <NoteCard
              key={note.id}
              note={note}
              isSelected={selectedNote?.id === note.id}
              onSelect={() => setSelectedNote(note)}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  )
}
