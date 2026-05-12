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
      } catch (err) {
        console.error('Error cargando tags:', err)
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
    } catch (err) {
      console.error('Error agregando tag:', err)
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
    } catch (err) {
      console.error('Error creando tag:', err)
    }
  }

  const handleRemove = async (tagId: string) => {
    try {
      await removeTagFromNote(noteId, tagId)
      setNoteTags((prev) => prev.filter((t) => t.id !== tagId))
    } catch (err) {
      console.error('Error quitando tag:', err)
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
      <TagIcon size={14} className="text-gray-400 shrink-0" />

      {noteTags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full"
        >
          {tag.name}
          <button
            type="button"
            onClick={() => handleRemove(tag.id)}
            className="hover:text-green-900 transition"
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
          className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-gray-400 hover:text-green-600 border border-dashed border-gray-300 hover:border-green-400 rounded-full transition"
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
            className="px-2 py-0.5 text-xs border border-green-400 rounded-full outline-none w-36 text-gray-700"
          />

          {(filtered.length > 0 || (query.trim() && !exactMatch)) && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
              {filtered.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleAdd(tag)}
                  className="w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                >
                  {tag.name}
                </button>
              ))}
              {query.trim() && !exactMatch && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="w-full text-left px-3 py-1.5 text-xs text-green-600 hover:bg-green-50 transition border-t border-gray-100"
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
