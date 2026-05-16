'use client'

import { useEffect, useState } from 'react'
import { getAllAttachments, deleteAttachment, getAttachmentUrl } from '@/lib/supabase/attachments'
import type { AttachmentWithNote } from '@/lib/supabase/attachments'
import {
  File, FileText, ImageIcon, Music, Video,
  Download, Trash2, Search, X, Paperclip,
} from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

type TabFilter = 'all' | 'media' | 'docs'

function isMedia(type: string | null): boolean {
  const t = type ?? ''
  return t.startsWith('image/') || t.startsWith('video/')
}

function formatSize(bytes: number | null): string {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileTypeIcon({ type, size = 16 }: { type: string | null; size?: number }) {
  const t = type ?? ''
  if (t.startsWith('image/')) return <ImageIcon size={size} className="text-blue-400 shrink-0" />
  if (t.startsWith('video/')) return <Video size={size} className="text-orange-400 shrink-0" />
  if (t.startsWith('audio/')) return <Music size={size} className="text-purple-400 shrink-0" />
  if (t === 'application/pdf') return <FileText size={size} className="text-red-400 shrink-0" />
  return <File size={size} className="text-muted shrink-0" />
}

function Thumbnail({ att }: { att: AttachmentWithNote }) {
  const t = att.file_type ?? ''
  if (t.startsWith('image/')) {
    return (
      <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface shrink-0 border border-border">
        <img
          src={getAttachmentUrl(att.storage_path)}
          alt={att.file_name}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center shrink-0">
      <FileTypeIcon type={att.file_type} size={18} />
    </div>
  )
}

export default function FilesView() {
  const [attachments, setAttachments] = useState<AttachmentWithNote[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<TabFilter>('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllAttachments()
        setAttachments(data)
      } catch {
        // error cargando
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleDelete = async (att: AttachmentWithNote) => {
    setAttachments((prev) => prev.filter((a) => a.id !== att.id))
    try {
      await deleteAttachment(att.id, att.storage_path)
    } catch {
      setAttachments((prev) => [att, ...prev])
    }
  }

  const filtered = attachments.filter((att) => {
    if (tab === 'media' && !isMedia(att.file_type)) return false
    if (tab === 'docs' && isMedia(att.file_type)) return false
    if (query.trim()) {
      return att.file_name.toLowerCase().includes(query.toLowerCase())
    }
    return true
  })

  const mediaCount = attachments.filter((a) => isMedia(a.file_type)).length
  const docsCount = attachments.filter((a) => !isMedia(a.file_type)).length

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="h-14 px-6 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-semibold text-foreground text-sm">Archivos</h2>
          <p className="text-xs text-muted">
            {attachments.length} archivo{attachments.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg w-52">
          <Search size={13} className="text-muted shrink-0" />
          <input
            type="text"
            placeholder="Buscar archivos..."
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
      </div>

      {/* Tabs */}
      <div className="flex items-center px-6 border-b border-border shrink-0">
        {([
          { key: 'all' as TabFilter, label: 'Todos', count: attachments.length },
          { key: 'media' as TabFilter, label: 'Media', count: mediaCount },
          { key: 'docs' as TabFilter, label: 'Docs', count: docsCount },
        ]).map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`px-4 py-2.5 text-xs font-medium transition cursor-pointer border-b-2 -mb-px flex items-center gap-1.5 ${
              tab === key
                ? 'border-accent text-accent'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            {label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              tab === key ? 'bg-accent/15 text-accent' : 'bg-surface text-subtle'
            }`}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {loading ? (
          <p className="text-sm text-muted text-center mt-12">Cargando…</p>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 mt-16 text-center">
            <div className="w-14 h-14 bg-panel border border-border rounded-2xl flex items-center justify-center">
              <Paperclip size={24} className="text-subtle" />
            </div>
            <div>
              <p className="text-foreground font-medium text-sm">
                {query ? 'Sin resultados' : 'Sin archivos adjuntos'}
              </p>
              <p className="text-muted text-xs mt-1">
                {query
                  ? 'Prueba con otro término de búsqueda'
                  : 'Los archivos adjuntos a tus notas aparecerán aquí'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {filtered.map((att) => (
              <FileRow key={att.id} att={att} onDelete={() => handleDelete(att)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FileRow({ att, onDelete }: { att: AttachmentWithNote; onDelete: () => void }) {
  return (
    <div className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-panel transition">
      <Thumbnail att={att} />

      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground font-medium truncate">{att.file_name}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          {att.notes && (
            <>
              <span className="text-xs text-subtle truncate max-w-[180px]">
                {att.notes.title}
              </span>
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
