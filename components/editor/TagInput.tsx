'use client'

import { useEffect, useRef, useState } from 'react'
import { Tag as TagIcon, X, Plus } from 'lucide-react'
import { useTagStore } from '@/store/tagStore'
import {
  getTagsByNote,
  addTagToNote,
  removeTagFromNote,
  createTag,
} from '@/lib/supabase/tags'
import type { Tag } from '@/types'

interface Props {
  noteId: string
}

export default function TagInput({ noteId }: Props) {
  const { tags: allTags, addTag } = useTagStore()
  const [noteTags, setNoteTags] = useState<Tag[]>([])
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTagsByNote(noteId)
        setNoteTags(data)
      } catch {
        // error cargando tags
      }
    }
    load()
  }, [noteId])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const noteTagIds = new Set(noteTags.map((t) => t.id))

  const filtered = allTags.filter(
    (t) =>
      !noteTagIds.has(t.id) &&
      t.name.toLowerCase().includes(query.toLowerCase())
  )

  const exactMatch = allTags.some(
    (t) => t.name.toLowerCase() === query.trim().toLowerCase()
  )

  const handleAdd = async (tag: Tag) => {
    try {
      await addTagToNote(noteId, tag.id)
      setNoteTags((prev) => [...prev, tag])
      setQuery('')
      inputRef.current?.focus()
    } catch {
      // error agregando tag
    }
  }

  const handleCreate = async () => {
    if (!query.trim()) return
    try {
      const newTag = await createTag(query.trim())
      addTag(newTag)
      await addTagToNote(noteId, newTag.id)
      setNoteTags((prev) => [...prev, newTag])
      setQuery('')
      inputRef.current?.focus()
    } catch {
      // error creando tag
    }
  }

  const handleRemove = async (tagId: string) => {
    try {
      await removeTagFromNote(noteId, tagId)
      setNoteTags((prev) => prev.filter((t) => t.id !== tagId))
    } catch {
      // error quitando tag
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered.length > 0) {
        handleAdd(filtered[0])
      } else if (query.trim() && !exactMatch) {
        handleCreate()
      }
    }
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap items-center gap-1.5 mb-6"
    >
      <TagIcon size={13} className="text-subtle shrink-0" />

      {noteTags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full border border-accent/25"
        >
          {tag.name}
          <button
            type="button"
            title="Quitar etiqueta"
            onClick={() => handleRemove(tag.id)}
            className="hover:text-accent-light transition cursor-pointer"
          >
            <X size={10} />
          </button>
        </span>
      ))}

      {!open ? (
        <button
          type="button"
          onClick={() => {
            setOpen(true)
            setTimeout(() => inputRef.current?.focus(), 0)
          }}
          className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-muted hover:text-accent border border-dashed border-border hover:border-accent/40 rounded-full transition cursor-pointer"
        >
          <Plus size={10} />
          Etiqueta
        </button>
      ) : (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar o crear..."
            className="px-2 py-0.5 text-xs border border-accent/50 bg-elevated rounded-full outline-none w-36 text-foreground"
            style={{ color: 'var(--color-foreground)' }}
          />

          {(filtered.length > 0 || (query.trim() && !exactMatch)) && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-panel border border-border rounded-lg shadow-xl z-10 overflow-hidden">
              {filtered.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleAdd(tag)}
                  className="w-full text-left px-3 py-1.5 text-xs text-muted hover:bg-surface hover:text-accent transition cursor-pointer"
                >
                  {tag.name}
                </button>
              ))}
              {query.trim() && !exactMatch && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="w-full text-left px-3 py-1.5 text-xs text-accent hover:bg-surface transition border-t border-border cursor-pointer"
                >
                  + Crear &quot;{query.trim()}&quot;
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
