'use client'

import { useEffect, useRef, useState } from 'react'
import {
  getAllAttachments,
  deleteAttachment,
  getAttachmentUrl,
  uploadAttachment,
} from '@/lib/supabase/attachments'
import type { AttachmentWithNote } from '@/lib/supabase/attachments'
import { getNoteById, getAllNotesWithNotebook } from '@/lib/supabase/notes'
import type { NoteWithNotebook } from '@/lib/supabase/notes'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import {
  File, FileText, ImageIcon, Music, Video, Download, Trash2, Search, X,
  LayoutGrid, List, ArrowUpDown, Upload, BookOpen, Loader2, ChevronRight,
} from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

// ── Tipos y helpers ─────────────────────────────────────────────────────────

type FileCategory = 'image' | 'pdf' | 'audio' | 'video' | 'other'
type TypeFilter = 'all' | FileCategory
type ViewMode = 'grid' | 'list'
type SortBy = 'date' | 'name' | 'size'

const TYPE_FILTERS: { key: TypeFilter; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'image', label: 'Imágenes' },
  { key: 'pdf', label: 'PDFs' },
  { key: 'audio', label: 'Audio' },
  { key: 'video', label: 'Video' },
  { key: 'other', label: 'Otros' },
]

const SORT_OPTIONS: { key: SortBy; label: string }[] = [
  { key: 'date', label: 'Fecha' },
  { key: 'name', label: 'Nombre' },
  { key: 'size', label: 'Tamaño' },
]

function categoryOf(type: string | null): FileCategory {
  const t = type ?? ''
  if (t.startsWith('image/')) return 'image'
  if (t === 'application/pdf') return 'pdf'
  if (t.startsWith('audio/')) return 'audio'
  if (t.startsWith('video/')) return 'video'
  return 'other'
}

function formatSize(bytes: number | null): string {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileTypeIcon({ type, size = 16 }: { type: string | null; size?: number }) {
  const cat = categoryOf(type)
  if (cat === 'image') return <ImageIcon size={size} className="text-blue-400 shrink-0" />
  if (cat === 'video') return <Video size={size} className="text-orange-400 shrink-0" />
  if (cat === 'audio') return <Music size={size} className="text-purple-400 shrink-0" />
  if (cat === 'pdf') return <FileText size={size} className="text-red-400 shrink-0" />
  return <File size={size} className="text-muted shrink-0" />
}

// ── Vista principal ──────────────────────────────────────────────────────────

export default function FilesView() {
  const [attachments, setAttachments] = useState<AttachmentWithNote[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [view, setView] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortBy>('date')
  const [query, setQuery] = useState('')
  const [lightbox, setLightbox] = useState<AttachmentWithNote | null>(null)
  const [pendingFiles, setPendingFiles] = useState<File[] | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const dragDepth = useRef(0)

  const { setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  const refresh = async () => {
    try {
      const data = await getAllAttachments()
      setAttachments(data)
    } catch {
      // error cargando
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Carga inicial de adjuntos al montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [])

  const handleDelete = async (att: AttachmentWithNote) => {
    setAttachments((prev) => prev.filter((a) => a.id !== att.id))
    try {
      await deleteAttachment(att.id, att.storage_path)
    } catch {
      setAttachments((prev) => [att, ...prev])
    }
  }

  const openNote = async (noteId: string | null) => {
    if (!noteId) return
    try {
      const note = await getNoteById(noteId)
      if (note) {
        setSelectedNote(note)
        setCurrentView('all-notes')
      }
    } catch {
      // no se pudo abrir la nota
    }
  }

  // Drag & drop sobre toda la vista
  const handleDragEnter = (e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes('Files')) return
    e.preventDefault()
    dragDepth.current += 1
    setDragOver(true)
  }
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    dragDepth.current -= 1
    if (dragDepth.current <= 0) setDragOver(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    dragDepth.current = 0
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) setPendingFiles(files)
  }

  const counts = attachments.reduce(
    (acc, a) => {
      acc.all += 1
      acc[categoryOf(a.file_type)] += 1
      return acc
    },
    { all: 0, image: 0, pdf: 0, audio: 0, video: 0, other: 0 } as Record<TypeFilter, number>
  )

  const filtered = attachments.filter((att) => {
    if (typeFilter !== 'all' && categoryOf(att.file_type) !== typeFilter) return false
    if (query.trim()) return att.file_name.toLowerCase().includes(query.toLowerCase())
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.file_name.localeCompare(b.file_name)
    if (sortBy === 'size') return (b.file_size ?? 0) - (a.file_size ?? 0)
    return +new Date(b.created_at) - +new Date(a.created_at)
  })

  return (
    <div
      className="relative flex-1 flex flex-col h-screen overflow-hidden bg-background"
      onDragEnter={handleDragEnter}
      onDragOver={(e) => { if (e.dataTransfer.types.includes('Files')) e.preventDefault() }}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="h-14 px-6 border-b border-border flex items-center justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <h2 className="font-semibold text-foreground text-sm">Archivos</h2>
          <p className="text-xs text-muted">
            {attachments.length} archivo{attachments.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Buscador */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg w-44">
            <Search size={13} className="text-muted shrink-0" />
            <input
              type="text"
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs text-foreground outline-none min-w-0"
              style={{ color: 'var(--color-foreground)' }}
            />
            {query && (
              <button
                type="button"
                title="Limpiar búsqueda"
                onClick={() => setQuery('')}
                className="text-muted hover:text-foreground transition cursor-pointer"
              >
                <X size={11} />
              </button>
            )}
          </div>

          {/* Orden */}
          <SortDropdown value={sortBy} onChange={setSortBy} />

          {/* Toggle vista */}
          <div className="flex items-center bg-surface rounded-lg p-0.5">
            <button
              type="button"
              title="Vista de cuadrícula"
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                view === 'grid' ? 'bg-panel text-accent shadow-sm' : 'text-muted hover:text-foreground'
              }`}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              type="button"
              title="Vista de lista"
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                view === 'list' ? 'bg-panel text-accent shadow-sm' : 'text-muted hover:text-foreground'
              }`}
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Filtros por tipo */}
      <div className="flex items-center gap-1.5 px-6 py-2.5 border-b border-border shrink-0 overflow-x-auto">
        {TYPE_FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTypeFilter(key)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              typeFilter === key
                ? 'bg-accent text-white'
                : 'bg-surface text-muted hover:text-foreground'
            }`}
          >
            {label}
            <span className={`text-[10px] ${typeFilter === key ? 'text-white/80' : 'text-subtle'}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {loading ? (
          <p className="text-sm text-muted text-center mt-12">Cargando…</p>
        ) : sorted.length === 0 ? (
          query ? (
            <EmptyState
              variant="search"
              title="Sin resultados"
              description="Prueba con otro término de búsqueda"
            />
          ) : (
            <EmptyState
              variant="files"
              title="Sin archivos todavía"
              description="Los adjuntos de tus notas aparecerán aquí — también puedes arrastrar archivos a esta vista"
            />
          )
        ) : view === 'grid' ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
            {sorted.map((att) => (
              <GridCard
                key={att.id}
                att={att}
                onDelete={() => handleDelete(att)}
                onPreview={() => setLightbox(att)}
                onOpenNote={() => openNote(att.note_id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {sorted.map((att) => (
              <FileRow
                key={att.id}
                att={att}
                onDelete={() => handleDelete(att)}
                onPreview={() => setLightbox(att)}
                onOpenNote={() => openNote(att.note_id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Overlay de drag & drop */}
      {dragOver && (
        <div className="absolute inset-0 z-30 bg-accent/10 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-3 px-8 py-6 bg-panel border-2 border-dashed border-accent rounded-2xl">
            <Upload size={32} className="text-accent" />
            <p className="text-sm font-medium text-foreground">Suelta para subir archivos</p>
            <p className="text-xs text-muted">Elegirás a qué nota adjuntarlos</p>
          </div>
        </div>
      )}

      {/* Lightbox de imagen */}
      {lightbox && (
        <ImageLightbox
          url={getAttachmentUrl(lightbox.storage_path)}
          name={lightbox.file_name}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Selector de nota destino para subir */}
      {pendingFiles && (
        <NotePickerModal
          files={pendingFiles}
          onUploaded={async () => {
            setPendingFiles(null)
            await refresh()
          }}
          onClose={() => setPendingFiles(null)}
        />
      )}
    </div>
  )
}

// ── Tarjeta de cuadrícula ────────────────────────────────────────────────────

function GridCard({
  att, onDelete, onPreview, onOpenNote,
}: {
  att: AttachmentWithNote
  onDelete: () => void
  onPreview: () => void
  onOpenNote: () => void
}) {
  const isImage = categoryOf(att.file_type) === 'image'

  return (
    <div className="group relative flex flex-col bg-panel border border-border rounded-xl overflow-hidden hover:border-accent/40 transition">
      {/* Preview cuadrado */}
      <button
        type="button"
        onClick={isImage ? onPreview : undefined}
        className={`aspect-square w-full bg-surface flex items-center justify-center overflow-hidden ${
          isImage ? 'cursor-zoom-in' : 'cursor-default'
        }`}
      >
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getAttachmentUrl(att.storage_path)}
            alt={att.file_name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <FileTypeIcon type={att.file_type} size={40} />
        )}
      </button>

      {/* Meta */}
      <div className="p-2.5 min-w-0">
        <p className="text-xs text-foreground font-medium truncate" title={att.file_name}>
          {att.file_name}
        </p>
        <p className="text-[10px] text-subtle mt-0.5">{formatSize(att.file_size)}</p>
        {att.notes && (
          <button
            type="button"
            onClick={onOpenNote}
            className="mt-1 flex items-center gap-1 text-[10px] text-accent hover:underline truncate max-w-full cursor-pointer"
            title={att.notes.title}
          >
            <BookOpen size={9} className="shrink-0" />
            <span className="truncate">{att.notes.title}</span>
          </button>
        )}
      </div>

      {/* Acciones hover */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        <a
          href={getAttachmentUrl(att.storage_path)}
          download={att.file_name}
          title="Descargar"
          className="p-1.5 bg-panel/90 backdrop-blur text-muted hover:text-foreground rounded-lg border border-border transition cursor-pointer"
        >
          <Download size={12} />
        </a>
        <button
          type="button"
          title="Eliminar archivo"
          onClick={onDelete}
          className="p-1.5 bg-panel/90 backdrop-blur text-muted hover:text-danger rounded-lg border border-border transition cursor-pointer"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  )
}

// ── Fila de lista ────────────────────────────────────────────────────────────

function FileRow({
  att, onDelete, onPreview, onOpenNote,
}: {
  att: AttachmentWithNote
  onDelete: () => void
  onPreview: () => void
  onOpenNote: () => void
}) {
  const isImage = categoryOf(att.file_type) === 'image'

  return (
    <div className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-panel transition">
      {/* Thumbnail */}
      <button
        type="button"
        onClick={isImage ? onPreview : undefined}
        className={`w-10 h-10 rounded-lg overflow-hidden bg-surface border border-border flex items-center justify-center shrink-0 ${
          isImage ? 'cursor-zoom-in' : 'cursor-default'
        }`}
      >
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getAttachmentUrl(att.storage_path)}
            alt={att.file_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileTypeIcon type={att.file_type} size={18} />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground font-medium truncate">{att.file_name}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          {att.notes && (
            <>
              <button
                type="button"
                onClick={onOpenNote}
                className="flex items-center gap-1 text-xs text-accent hover:underline truncate max-w-[180px] cursor-pointer"
              >
                <BookOpen size={10} className="shrink-0" />
                <span className="truncate">{att.notes.title}</span>
                <ChevronRight size={10} className="shrink-0" />
              </button>
              <span className="text-subtle text-xs">·</span>
            </>
          )}
          <span className="text-xs text-subtle">{formatSize(att.file_size)}</span>
          <span className="text-subtle text-xs">·</span>
          <span className="text-xs text-subtle">
            {format(parseISO(att.created_at), 'd MMM yyyy', { locale: es })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
        <a
          href={getAttachmentUrl(att.storage_path)}
          download={att.file_name}
          title="Descargar"
          className="p-2 text-muted hover:text-foreground rounded-lg hover:bg-surface transition cursor-pointer"
        >
          <Download size={14} />
        </a>
        <button
          type="button"
          title="Eliminar archivo"
          onClick={onDelete}
          className="p-2 text-muted hover:text-danger rounded-lg hover:bg-surface transition cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

// ── Dropdown de orden ────────────────────────────────────────────────────────

function SortDropdown({ value, onChange }: { value: SortBy; onChange: (v: SortBy) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const current = SORT_OPTIONS.find((o) => o.key === value)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title="Ordenar"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface rounded-lg text-xs text-muted hover:text-foreground transition cursor-pointer"
      >
        <ArrowUpDown size={13} />
        <span className="hidden sm:inline">{current?.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-xl w-36 py-1 overflow-hidden">
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.key}
              type="button"
              onClick={() => { onChange(o.key); setOpen(false) }}
              className={`w-full text-left px-3 py-1.5 text-xs transition cursor-pointer ${
                o.key === value ? 'text-accent bg-accent/10' : 'text-muted hover:bg-surface hover:text-foreground'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Lightbox de imagen (dialog nativo) ───────────────────────────────────────

function ImageLightbox({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    ref.current?.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose() }}
      className="m-auto bg-transparent p-0 max-w-none max-h-none backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={name}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        <button
          type="button"
          title="Cerrar"
          onClick={onClose}
          className="absolute -top-3 -right-3 p-1.5 bg-panel text-foreground rounded-full border border-border shadow-lg hover:bg-surface transition cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </dialog>
  )
}

// ── Modal selector de nota destino ───────────────────────────────────────────

function NotePickerModal({
  files, onUploaded, onClose,
}: {
  files: File[]
  onUploaded: () => void | Promise<void>
  onClose: () => void
}) {
  const [notes, setNotes] = useState<NoteWithNotebook[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [uploadingTo, setUploadingTo] = useState<string | null>(null)

  useEffect(() => {
    getAllNotesWithNotebook()
      .then(setNotes)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handlePick = async (noteId: string) => {
    if (uploadingTo) return
    setUploadingTo(noteId)
    for (const file of files) {
      try {
        await uploadAttachment(noteId, file, () => {})
      } catch {
        // un archivo falló; continúa con el resto
      }
    }
    await onUploaded()
  }

  const filtered = query.trim()
    ? notes.filter((n) => (n.title || 'Sin título').toLowerCase().includes(query.toLowerCase()))
    : notes

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget && !uploadingTo) onClose() }}
    >
      <div className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground">Adjuntar a una nota</h3>
            <p className="text-xs text-muted mt-0.5">
              {files.length} archivo{files.length !== 1 ? 's' : ''} · elige el destino
            </p>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            disabled={!!uploadingTo}
            className="p-1.5 text-muted hover:text-foreground rounded-lg hover:bg-surface transition cursor-pointer disabled:opacity-40"
          >
            <X size={16} />
          </button>
        </div>

        {/* Buscador */}
        <div className="px-5 py-3 border-b border-border">
          <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg">
            <Search size={13} className="text-muted shrink-0" />
            <input
              type="text"
              placeholder="Buscar nota..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs text-foreground outline-none min-w-0"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>
        </div>

        {/* Lista de notas */}
        <div className="flex-1 overflow-y-auto py-1">
          {loading ? (
            <p className="text-xs text-muted text-center py-8">Cargando notas…</p>
          ) : filtered.length === 0 ? (
            <p className="text-xs text-muted text-center py-8">
              {notes.length === 0 ? 'No tienes notas aún' : 'Sin resultados'}
            </p>
          ) : (
            filtered.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => handlePick(note.id)}
                disabled={!!uploadingTo}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-surface transition cursor-pointer disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-accent/15 rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={14} className="text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground truncate">{note.title || 'Sin título'}</p>
                  {note.notebooks?.name && (
                    <p className="text-[10px] text-subtle truncate flex items-center gap-1">
                      <BookOpen size={9} />
                      {note.notebooks.name}
                    </p>
                  )}
                </div>
                {uploadingTo === note.id && (
                  <Loader2 size={15} className="text-accent animate-spin shrink-0" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
