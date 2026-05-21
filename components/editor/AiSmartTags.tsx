'use client'

import { useEffect, useState } from 'react'
import { Sparkles, Check, X, Loader2, Tag } from 'lucide-react'
import { createTag, addTagToNote, getTagsByNote } from '@/lib/supabase/tags'
import { useTagStore } from '@/store/tagStore'

interface AiSmartTagsProps {
  noteId: string
  noteContent: string
  onTagsAdded: () => void
  onClose: () => void
}

type TagState = 'pending' | 'accepted' | 'rejected'

interface SuggestedTag {
  name: string
  state: TagState
}

export default function AiSmartTags({
  noteId,
  noteContent,
  onTagsAdded,
  onClose,
}: AiSmartTagsProps) {
  const { tags: allTags, addTag } = useTagStore()
  const [existingTagNames, setExistingTagNames] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<SuggestedTag[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const tags = await getTagsByNote(noteId)
        setExistingTagNames(tags.map((t) => t.name.toLowerCase()))
      } catch {
        setExistingTagNames([])
      }
    }
    load()
  }, [noteId])

  const handleSuggest = async () => {
    setStatus('loading')
    setError(null)
    setSuggestions([])

    try {
      const res = await fetch('/api/ai/suggest-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: noteContent }),
      })
      const json = await res.json()
      if (!json.success) {
        setError(json.error ?? 'Error desconocido')
        setStatus('error')
        return
      }

      const filtered = (json.data.tags as string[]).filter(
        (t) => !existingTagNames.includes(t.toLowerCase())
      )

      setSuggestions(filtered.map((name) => ({ name, state: 'pending' })))
      setStatus('done')
    } catch {
      setError('Error al conectar con el servidor')
      setStatus('error')
    }
  }

  const toggle = (index: number) => {
    setSuggestions((prev) =>
      prev.map((s, i) =>
        i === index
          ? { ...s, state: s.state === 'accepted' ? 'pending' : 'accepted' }
          : s
      )
    )
  }

  const reject = (index: number) => {
    setSuggestions((prev) =>
      prev.map((s, i) => (i === index ? { ...s, state: 'rejected' } : s))
    )
  }

  const handleApply = async () => {
    const toApply = suggestions.filter((s) => s.state === 'accepted')
    if (toApply.length === 0) return

    setSaving(true)
    try {
      for (const suggestion of toApply) {
        const existing = allTags.find(
          (t) => t.name.toLowerCase() === suggestion.name.toLowerCase()
        )
        let tagId: string
        if (existing) {
          tagId = existing.id
        } else {
          const newTag = await createTag(suggestion.name)
          addTag(newTag)
          tagId = newTag.id
        }
        await addTagToNote(noteId, tagId)
      }
      onTagsAdded()
      onClose()
    } catch {
      setError('Error al aplicar las etiquetas')
    } finally {
      setSaving(false)
    }
  }

  const acceptedCount = suggestions.filter((s) => s.state === 'accepted').length
  const pendingOrAccepted = suggestions.filter((s) => s.state !== 'rejected')

  return (
    <div className="border border-border rounded-xl bg-panel shadow-xl overflow-hidden w-72">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-accent" />
          <span className="text-xs font-medium text-foreground">Smart Tags</span>
        </div>
        <button
          type="button"
          title="Cerrar"
          onClick={onClose}
          className="text-muted hover:text-foreground transition cursor-pointer rounded p-0.5"
        >
          <X size={13} />
        </button>
      </div>

      <div className="px-3 py-2.5">
        {status === 'idle' && (
          <button
            type="button"
            onClick={handleSuggest}
            className="text-xs text-accent hover:opacity-80 transition cursor-pointer"
          >
            Analizar nota y sugerir etiquetas →
          </button>
        )}

        {status === 'loading' && (
          <div className="flex items-center gap-2 text-xs text-muted">
            <Loader2 size={12} className="animate-spin" />
            Analizando contenido...
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-2">
            <p className="text-xs text-danger">{error}</p>
            <button
              type="button"
              onClick={handleSuggest}
              className="text-xs text-accent hover:opacity-80 transition cursor-pointer"
            >
              Reintentar →
            </button>
          </div>
        )}

        {status === 'done' && pendingOrAccepted.length === 0 && (
          <p className="text-xs text-muted">
            No se encontraron etiquetas nuevas para esta nota.
          </p>
        )}

        {status === 'done' && pendingOrAccepted.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] text-subtle mb-1.5">
              Selecciona las etiquetas a añadir:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s, i) => {
                if (s.state === 'rejected') return null
                return (
                  <div
                    key={i}
                    className={`group flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-full border text-xs transition ${
                      s.state === 'accepted'
                        ? 'bg-accent/15 border-accent/40 text-accent'
                        : 'bg-surface border-border text-muted'
                    }`}
                  >
                    <Tag size={10} />
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      className="cursor-pointer"
                    >
                      {s.name}
                    </button>
                    {s.state === 'accepted' ? (
                      <Check size={10} className="text-accent shrink-0" />
                    ) : (
                      <button
                        type="button"
                        title="Rechazar"
                        onClick={() => reject(i)}
                        className="opacity-0 group-hover:opacity-100 text-muted hover:text-danger transition cursor-pointer"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {status === 'done' && pendingOrAccepted.length > 0 && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-border">
          <p className="text-[10px] text-subtle">
            {acceptedCount} seleccionada{acceptedCount !== 1 ? 's' : ''}
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={handleSuggest}
              className="px-2 py-1 text-[10px] text-muted hover:text-accent transition cursor-pointer"
            >
              Regenerar
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={acceptedCount === 0 || saving}
              className="flex items-center gap-1 px-2.5 py-1 bg-accent text-white text-[10px] rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-medium"
            >
              {saving ? (
                <Loader2 size={10} className="animate-spin" />
              ) : (
                <Check size={10} />
              )}
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
