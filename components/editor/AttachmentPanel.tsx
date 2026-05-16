'use client'

import { useEffect, useRef, useState } from 'react'
import {
  getAttachments, uploadAttachment, deleteAttachment, getAttachmentUrl,
} from '@/lib/supabase/attachments'
import type { Attachment } from '@/types'
import {
  Paperclip, X, Download, File, FileText, ImageIcon, Music, Video, Loader2,
} from 'lucide-react'

interface UploadItem {
  id: string
  name: string
  progress: number
  error?: string
}

function formatSize(bytes: number | null): string {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileTypeIcon({ type }: { type: string | null }) {
  const t = type ?? ''
  if (t.startsWith('image/')) return <ImageIcon size={14} className="text-blue-400 shrink-0" />
  if (t.startsWith('audio/')) return <Music size={14} className="text-purple-400 shrink-0" />
  if (t.startsWith('video/')) return <Video size={14} className="text-orange-400 shrink-0" />
  if (t === 'application/pdf') return <FileText size={14} className="text-red-400 shrink-0" />
  return <File size={14} className="text-muted shrink-0" />
}

export default function AttachmentPanel({ noteId }: { noteId: string }) {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAttachments(noteId)
        setAttachments(data)
      } catch {
        // sin adjuntos
      }
    }
    load()
  }, [noteId])

  const processFiles = async (files: File[]) => {
    for (const file of files) {
      const uploadId = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      setUploads((prev) => [...prev, { id: uploadId, name: file.name, progress: 0 }])

      try {
        const attachment = await uploadAttachment(noteId, file, (pct) => {
          setUploads((prev) =>
            prev.map((u) => u.id === uploadId ? { ...u, progress: pct } : u)
          )
        })
        setAttachments((prev) => [attachment, ...prev])
        setUploads((prev) => prev.filter((u) => u.id !== uploadId))
      } catch {
        setUploads((prev) =>
          prev.map((u) => u.id === uploadId ? { ...u, error: 'Error al subir' } : u)
        )
        setTimeout(() => {
          setUploads((prev) => prev.filter((u) => u.id !== uploadId))
        }, 3000)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    processFiles(files)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const handleDelete = async (att: Attachment) => {
    setAttachments((prev) => prev.filter((a) => a.id !== att.id))
    try {
      await deleteAttachment(att.id, att.storage_path)
    } catch {
      setAttachments((prev) => [att, ...prev])
    }
  }

  const hasContent = attachments.length > 0 || uploads.length > 0

  return (
    <div
      className={`mt-8 pt-6 border-t transition ${
        dragging ? 'border-accent' : 'border-border'
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false)
      }}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Paperclip size={13} className="text-muted" />
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">
            Archivos adjuntos
          </span>
          {hasContent && (
            <span className="text-xs text-subtle">
              ({attachments.length})
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs text-muted hover:text-accent transition cursor-pointer flex items-center gap-1"
        >
          <span>+</span>
          <span>Adjuntar</span>
        </button>
      </div>

      {/* Drop hint */}
      {dragging && (
        <div className="mb-3 rounded-xl border-2 border-dashed border-accent bg-accent/5 py-6 text-center">
          <Paperclip size={20} className="mx-auto mb-1.5 text-accent" />
          <p className="text-xs text-accent">Suelta los archivos aquí</p>
        </div>
      )}

      {/* Uploads in progress */}
      {uploads.length > 0 && (
        <div className="mb-2 space-y-2">
          {uploads.map((upload) => (
            <div key={upload.id} className="flex items-center gap-3 bg-surface rounded-lg px-3 py-2.5">
              <Loader2 size={14} className="text-accent animate-spin shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{upload.name}</p>
                {upload.error ? (
                  <p className="text-xs text-danger mt-0.5">{upload.error}</p>
                ) : (
                  <div className="mt-1.5 h-1 bg-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-200"
                      style={{ width: `${Math.max(upload.progress, 8)}%` }}
                    />
                  </div>
                )}
              </div>
              <span className="text-xs text-subtle shrink-0">
                {upload.error ? '' : `${upload.progress}%`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* File list */}
      {attachments.length > 0 ? (
        <div className="divide-y divide-border">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="group flex items-center gap-3 py-2.5 first:pt-0"
            >
              <FileTypeIcon type={att.file_type} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{att.file_name}</p>
                {att.file_size !== null && (
                  <p className="text-[11px] text-subtle">{formatSize(att.file_size)}</p>
                )}
              </div>
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                <a
                  href={getAttachmentUrl(att.storage_path)}
                  download={att.file_name}
                  title="Descargar"
                  className="p-1.5 text-muted hover:text-foreground transition rounded cursor-pointer"
                >
                  <Download size={13} />
                </a>
                <button
                  type="button"
                  title="Eliminar adjunto"
                  onClick={() => handleDelete(att)}
                  className="p-1.5 text-muted hover:text-danger transition rounded cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : !dragging && uploads.length === 0 ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full py-5 rounded-xl border border-dashed border-border hover:border-accent/50 hover:bg-surface text-center transition cursor-pointer group"
        >
          <Paperclip size={16} className="mx-auto mb-1.5 text-subtle group-hover:text-accent transition" />
          <p className="text-xs text-subtle group-hover:text-muted transition">
            Arrastra archivos o haz clic para adjuntar
          </p>
        </button>
      ) : null}

      <input
        ref={inputRef}
        id={`attach-input-${noteId}`}
        type="file"
        title="Seleccionar archivos"
        multiple
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  )
}
