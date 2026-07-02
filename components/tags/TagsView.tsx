'use client'

import { useEffect, useMemo, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  Tag as TagIcon,
  Search,
  Pencil,
  Trash2,
  Check,
  X,
  ArrowLeft,
  FileText,
  BookOpen,
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  getTagsWithCount,
  renameTag,
  deleteTagWithRelations,
  getNotesByTag,
} from '@/lib/supabase/tags'
import { useTagStore } from '@/store/tagStore'
import { useNoteStore } from '@/store/noteStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useUIStore } from '@/store/uiStore'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { TagWithCount, Note } from '@/types'

interface TagCardProps {
  tag: TagWithCount
  onOpen: (tag: TagWithCount) => void
  onRenamed: (id: string, name: string) => void
  onDeleted: (id: string) => void
}

function TagCard({ tag, onOpen, onRenamed, onDeleted }: TagCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftName, setDraftName] = useState(tag.name)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startEditing = () => {
    setDraftName(tag.name)
    setError(null)
    setIsEditing(true)
  }

  const handleRename = async () => {
    const trimmed = draftName.trim()
    if (!trimmed || trimmed === tag.name) {
      setIsEditing(false)
      return
    }
    setBusy(true)
    setError(null)
    try {
      await renameTag(tag.id, trimmed)
      onRenamed(tag.id, trimmed)
      setIsEditing(false)
    } catch {
      setError('No se pudo renombrar la etiqueta')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    setBusy(true)
    setError(null)
    try {
      await deleteTagWithRelations(tag.id)
      onDeleted(tag.id)
    } catch {
      setError('No se pudo eliminar la etiqueta')
      setBusy(false)
      setConfirmingDelete(false)
    }
  }

  return (
    <div className="group relative flex flex-col gap-3 p-4 bg-panel border border-border rounded-xl transition-all duration-200 hover:border-accent/40 hover:shadow-sm">
      {/* Top row: icon + name + count */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <TagIcon size={16} className="text-accent" />
          </div>

          {isEditing ? (
            <input
              autoFocus
              value={draftName}
              disabled={busy}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename()
                if (e.key === 'Escape') setIsEditing(false)
              }}
              className="flex-1 min-w-0 bg-surface border border-accent/40 rounded-md px-2 py-1 text-sm text-foreground outline-none focus:border-accent"
            />
          ) : (
            <button
              type="button"
              onClick={() => onOpen(tag)}
              onDoubleClick={startEditing}
              className="min-w-0 flex-1 text-left cursor-pointer"
              title="Ver notas con esta etiqueta"
            >
              <span className="block text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                {tag.name}
              </span>
            </button>
          )}
        </div>

        {!isEditing && (
          <span className="shrink-0 inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full bg-surface text-xs font-semibold text-muted tabular-nums">
            {tag.note_count}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-subtle">
          {tag.note_count} {tag.note_count === 1 ? 'nota' : 'notas'} · creada el{' '}
          {format(new Date(tag.created_at), 'd MMM yyyy', { locale: es })}
        </span>
      </div>

      {error && <p className="text-[11px] text-red-400">{error}</p>}

      {/* Actions */}
      {isEditing ? (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRename}
            disabled={busy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-white text-xs font-medium hover:bg-accent/90 transition disabled:opacity-50 cursor-pointer"
          >
            <Check size={13} /> Guardar
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={busy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface text-muted text-xs hover:text-foreground transition cursor-pointer"
          >
            <X size={13} /> Cancelar
          </button>
        </div>
      ) : confirmingDelete ? (
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted flex-1">¿Eliminar etiqueta?</span>
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition disabled:opacity-50 cursor-pointer"
          >
            <Trash2 size={13} /> Eliminar
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(false)}
            disabled={busy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface text-muted text-xs hover:text-foreground transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={startEditing}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted hover:text-foreground hover:bg-surface transition cursor-pointer"
          >
            <Pencil size={12} /> Renombrar
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          >
            <Trash2 size={12} /> Eliminar
          </button>
        </div>
      )}
    </div>
  )
}

interface TagNotesPanelProps {
  tag: TagWithCount
  onBack: () => void
}

function TagNotesPanel({ tag, onBack }: TagNotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const { setSelectedNote } = useNoteStore()
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { setCurrentView } = useUIStore()

  useEffect(() => {
    let active = true
    getNotesByTag(tag.id)
      .then((data) => {
        if (active) setNotes(data)
      })
      .catch(() => {
        if (active) setNotes([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [tag.id])

  const handleOpenNote = (note: Note) => {
    setSelectedNote(note)
    const notebook = notebooks.find((nb) => nb.id === note.notebook_id)
    if (notebook) setSelectedNotebook(notebook)
    setCurrentView('notebooks')
  }

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-background">
      <div className="max-w-4xl mx-auto px-10 py-10 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface transition cursor-pointer"
            title="Volver a etiquetas"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
              <TagIcon size={16} className="text-accent" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-foreground truncate">{tag.name}</h1>
              <p className="text-xs text-muted">
                {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-muted text-center py-12">Cargando notas...</p>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <FileText size={32} className="text-subtle" />
            <p className="text-sm text-muted">Ninguna nota usa esta etiqueta</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notes.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => handleOpenNote(note)}
                className="text-left p-4 bg-panel border border-border rounded-xl hover:border-accent/40 hover:bg-surface transition cursor-pointer"
              >
                <p className="text-sm font-medium text-foreground truncate">
                  {note.title || 'Sin título'}
                </p>
                <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                  {extractTextPreview(note.content) || 'Sin contenido'}
                </p>
                <p className="text-[11px] text-subtle mt-1.5">
                  {format(new Date(note.updated_at), 'd MMM yyyy', { locale: es })}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TagsView() {
  const [tags, setTags] = useState<TagWithCount[]>([])
  const [tagsGridRef] = useAutoAnimate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [openTag, setOpenTag] = useState<TagWithCount | null>(null)
  const { removeTag, updateTag } = useTagStore()

  useEffect(() => {
    let active = true
    getTagsWithCount()
      .then((data) => {
        if (active) setTags(data)
      })
      .catch(() => {
        if (active) setError('No se pudieron cargar las etiquetas')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q ? tags.filter((t) => t.name.toLowerCase().includes(q)) : tags
    return [...list].sort((a, b) => a.name.localeCompare(b.name))
  }, [tags, query])

  const handleRenamed = (id: string, name: string) => {
    setTags((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)))
    updateTag(id, name)
    setOpenTag((prev) => (prev && prev.id === id ? { ...prev, name } : prev))
  }

  const handleDeleted = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id))
    removeTag(id)
  }

  if (openTag) {
    return <TagNotesPanel key={openTag.id} tag={openTag} onBack={() => setOpenTag(null)} />
  }

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-background">
      <div className="max-w-5xl mx-auto px-10 py-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Etiquetas</h1>
            <p className="text-sm text-muted mt-1">
              {tags.length} etiqueta{tags.length !== 1 ? 's' : ''} en total
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar etiquetas..."
              className="w-full pl-9 pr-3 py-2 bg-panel border border-border rounded-lg text-sm text-foreground placeholder:text-subtle outline-none focus:border-accent/50 transition"
            />
          </div>
        </div>

        {/* Body */}
        {loading ? (
          <p className="text-sm text-muted text-center py-16">Cargando etiquetas...</p>
        ) : error ? (
          <p className="text-sm text-red-400 text-center py-16">{error}</p>
        ) : tags.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-panel border border-border flex items-center justify-center">
              <TagIcon size={26} className="text-subtle" />
            </div>
            <div>
              <p className="text-foreground font-medium">Sin etiquetas aún</p>
              <p className="text-muted text-sm mt-1">
                Añade etiquetas a tus notas desde el editor
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <Search size={26} className="text-subtle" />
            <p className="text-sm text-muted">
              No hay etiquetas que coincidan con &ldquo;{query}&rdquo;
            </p>
          </div>
        ) : (
          <div ref={tagsGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((tag) => (
              <TagCard
                key={tag.id}
                tag={tag}
                onOpen={setOpenTag}
                onRenamed={handleRenamed}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        )}

        {/* Hint */}
        {!loading && !error && filtered.length > 0 && (
          <p className="text-[11px] text-subtle text-center flex items-center justify-center gap-1.5">
            <BookOpen size={12} />
            Haz clic en una etiqueta para ver sus notas, o doble clic para renombrarla
          </p>
        )}
      </div>
    </div>
  )
}
