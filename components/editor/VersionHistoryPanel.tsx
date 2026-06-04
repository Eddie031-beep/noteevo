'use client'

import { useEffect, useState } from 'react'
import { X, History, RotateCcw, Clock, Loader2, Trash2, Save } from 'lucide-react'
import { getVersions, deleteVersion } from '@/lib/supabase/versions'
import type { NoteVersion } from '@/types'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { extractTextPreview } from '@/lib/utils/tiptap'

interface VersionHistoryPanelProps {
  noteId: string
  onSave: () => Promise<void>
  onRestore: (version: NoteVersion) => void
  onClose: () => void
}

export default function VersionHistoryPanel({
  noteId,
  onSave,
  onRestore,
  onClose,
}: VersionHistoryPanelProps) {
  const [versions, setVersions] = useState<NoteVersion[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState<NoteVersion | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getVersions(noteId)
      setVersions(data)
      if (data.length > 0 && !selected) setSelected(data[0])
    } catch {
      // silencioso
    } finally {
      setLoading(false)
    }
  }

  // Recarga el historial cuando cambia la nota; load() es estable para este efecto.
  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { load() }, [noteId])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave()
      await load()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (version: NoteVersion) => {
    setDeletingId(version.id)
    try {
      await deleteVersion(version.id)
      const updated = versions.filter((v) => v.id !== version.id)
      setVersions(updated)
      if (selected?.id === version.id) {
        setSelected(updated.length > 0 ? updated[0] : null)
      }
    } catch {
      // silencioso
    } finally {
      setDeletingId(null)
    }
  }

  const handleRestore = () => {
    if (!selected) return
    onRestore(selected)
    onClose()
  }

  return (
    <div className="w-72 shrink-0 border-l border-border bg-panel flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <History size={14} className="text-accent" />
          <span className="text-sm font-medium text-foreground">Historial</span>
        </div>
        <button
          type="button"
          title="Cerrar historial"
          onClick={onClose}
          className="text-muted hover:text-foreground transition p-0.5 rounded cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Botón guardar versión */}
      <div className="px-4 py-3 border-b border-border shrink-0">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-2 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-light disabled:opacity-50 transition cursor-pointer"
        >
          {saving ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Save size={12} />
          )}
          {saving ? 'Guardando...' : 'Guardar versión ahora'}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <Loader2 size={18} className="text-muted animate-spin" />
        </div>
      ) : versions.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 px-4 text-center">
          <Clock size={28} className="text-subtle" />
          <div>
            <p className="text-sm font-medium text-foreground">Sin versiones guardadas</p>
            <p className="text-xs text-muted mt-1">
              Haz click en &quot;Guardar versión ahora&quot; para crear un punto de restauración
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Lista de versiones */}
          <div className="flex-1 overflow-y-auto divide-y divide-border min-h-0">
            {versions.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelected(v)}
                className={`group flex items-center justify-between gap-2 px-4 py-3 cursor-pointer transition ${
                  selected?.id === v.id
                    ? 'bg-accent/10 border-l-2 border-l-accent'
                    : 'hover:bg-surface'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      v{v.version_number}
                    </span>
                    <span className="text-[10px] text-subtle">
                      {format(parseISO(v.created_at), 'd MMM, HH:mm', { locale: es })}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-0.5 truncate">{v.title}</p>
                </div>
                <button
                  type="button"
                  title="Eliminar versión"
                  onClick={(e) => { e.stopPropagation(); handleDelete(v) }}
                  disabled={deletingId === v.id}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-muted hover:text-danger rounded-lg hover:bg-surface transition cursor-pointer shrink-0"
                >
                  {deletingId === v.id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Trash2 size={12} />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Preview + restaurar */}
          {selected && (
            <div className="border-t border-border p-4 shrink-0">
              <p className="text-[10px] text-subtle uppercase tracking-wider mb-2">
                Vista previa — v{selected.version_number}
              </p>
              <p className="text-xs font-semibold text-foreground truncate mb-1">
                {selected.title}
              </p>
              <p className="text-xs text-muted line-clamp-3 leading-relaxed">
                {extractTextPreview(selected.content, 150) || 'Sin contenido'}
              </p>
              <button
                type="button"
                onClick={handleRestore}
                className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-surface border border-border text-foreground text-xs font-medium rounded-lg hover:border-accent/40 hover:bg-elevated transition cursor-pointer"
              >
                <RotateCcw size={12} />
                Restaurar esta versión
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
