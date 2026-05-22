'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { createTemplate } from '@/lib/supabase/templates'
import type { Template } from '@/types'

interface SaveAsTemplateModalProps {
  content: Record<string, unknown>
  defaultName?: string
  onSaved: (template: Template) => void
  onClose: () => void
}

const CATEGORIES = [
  { value: 'personal', label: 'Personal' },
  { value: 'work', label: 'Trabajo' },
  { value: 'meeting', label: 'Reuniones' },
  { value: 'journal', label: 'Diario' },
]

export default function SaveAsTemplateModal({
  content,
  defaultName = '',
  onSaved,
  onClose,
}: SaveAsTemplateModalProps) {
  const [name, setName] = useState(defaultName)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('personal')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    setError(null)
    try {
      const template = await createTemplate(name.trim(), content, {
        description: description.trim() || undefined,
        category,
      })
      onSaved(template)
      onClose()
    } catch {
      setError('Error al guardar la plantilla')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground text-sm">Guardar como plantilla</h2>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5">
              Nombre *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="Ej: Mi plantilla"
              autoFocus
              className="w-full px-3 py-2 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1.5">
              Descripción
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descripción opcional"
              className="w-full px-3 py-2 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">
              Categoría
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition cursor-pointer ${
                    category === cat.value
                      ? 'bg-accent/10 border-accent/40 text-accent'
                      : 'bg-surface border-border text-muted hover:border-accent/30 hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-danger">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-muted hover:text-foreground transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim() || saving}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-medium"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}
