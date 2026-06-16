'use client'

import { useEffect, useState } from 'react'
import { X, Link, FileText, Loader2 } from 'lucide-react'
import { getBacklinks } from '@/lib/supabase/note-links'
import type { BacklinkNote } from '@/lib/supabase/note-links'
import { useNoteStore } from '@/store/noteStore'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

interface BacklinksPanelProps {
  noteId: string
  onClose: () => void
}

export default function BacklinksPanel({ noteId, onClose }: BacklinksPanelProps) {
  const [backlinks, setBacklinks] = useState<BacklinkNote[]>([])
  const [loading, setLoading] = useState(true)
  const { notes, setSelectedNote } = useNoteStore()

  useEffect(() => {
    setLoading(true)
    setBacklinks([])
    getBacklinks(noteId)
      .then(setBacklinks)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [noteId])

  const handleOpen = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (note) {
      setSelectedNote(note)
      onClose()
    }
  }

  return (
    <div className="w-72 flex flex-col border-l border-border bg-panel overflow-hidden shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Link size={14} className="text-accent" />
          Backlinks
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded hover:bg-surface transition-colors text-muted hover:text-foreground"
          aria-label="Cerrar panel de backlinks"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted">
            <Loader2 size={16} className="animate-spin" />
          </div>
        ) : backlinks.length === 0 ? (
          <div className="text-center py-8 text-muted text-sm px-4">
            <FileText size={24} className="mx-auto mb-2 opacity-40" />
            <p>Ninguna nota enlaza aquí todavía</p>
            <p className="text-xs mt-1 text-subtle">
              Usa <code className="bg-surface px-1 rounded">[[</code> en otra nota para crear un enlace
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {backlinks.map((bl) => (
              <button
                key={bl.id}
                type="button"
                onClick={() => handleOpen(bl.id)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface transition-colors group"
              >
                <div className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                  {bl.title}
                </div>
                <div className="text-xs text-muted mt-0.5">
                  {formatDistanceToNow(parseISO(bl.updated_at), { addSuffix: true, locale: es })}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-2 border-t border-border text-xs text-muted">
        {!loading && (
          <span>
            {backlinks.length} {backlinks.length === 1 ? 'nota enlaza' : 'notas enlazan'} aquí
          </span>
        )}
      </div>
    </div>
  )
}
