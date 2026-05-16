'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { createSpace, updateSpace } from '@/lib/supabase/spaces'
import type { Space } from '@/types'

interface CreateSpaceModalProps {
  onClose: () => void
  onCreated?: (space: Space) => void
  onUpdated?: (space: Space) => void
  editSpace?: Space
}

export default function CreateSpaceModal({
  onClose,
  onCreated,
  onUpdated,
  editSpace,
}: CreateSpaceModalProps) {
  const [name, setName] = useState(editSpace?.name ?? '')
  const [description, setDescription] = useState(editSpace?.description ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEdit = !!editSpace

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    setError(null)
    try {
      if (isEdit) {
        const updated = await updateSpace(editSpace.id, {
          name: name.trim(),
          description: description.trim() || undefined,
        })
        onUpdated?.({ ...editSpace, ...updated })
      } else {
        const space = await createSpace(name.trim(), description.trim() || undefined)
        onCreated?.(space)
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el space')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-panel border border-border rounded-2xl w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-semibold text-foreground">
            {isEdit ? 'Renombrar space' : 'Nuevo space'}
          </h2>
          <button type="button" title="Cerrar" onClick={onClose} className="text-muted hover:text-foreground transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Nombre *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Proyecto Alpha"
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-accent"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción opcional"
              rows={3}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-accent resize-none"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-muted hover:text-foreground transition">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name.trim() || loading}
              className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Guardando…' : isEdit ? 'Guardar' : 'Crear space'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
