'use client'

import { useEffect, useState } from 'react'
import { useNoteStore } from '@/store/noteStore'
import { getFavoriteNotes } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { Note } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Star } from 'lucide-react'

export default function FavoriteNotes() {
  const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const { setSelectedNote, selectedNote } = useNoteStore()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getFavoriteNotes()
        setFavoriteNotes(data)
      } catch {
        // error cargando favoritos
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      <div className="h-14 px-4 border-b border-border flex items-center gap-2.5">
        <Star size={18} className="text-yellow-400 fill-yellow-400 shrink-0" />
        <div>
          <h2 className="font-semibold text-foreground text-sm">Favoritos</h2>
          {!loading && (
            <p className="text-xs text-muted">
              {favoriteNotes.length} nota{favoriteNotes.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-muted text-center mt-8">Cargando...</p>
        ) : favoriteNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Star size={32} className="text-subtle" />
            <p className="text-sm text-muted">Sin notas favoritas</p>
          </div>
        ) : (
          favoriteNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`px-4 py-3.5 border-b border-border cursor-pointer transition ${
                selectedNote?.id === note.id
                  ? 'bg-elevated border-l-2 border-l-accent'
                  : 'hover:bg-surface'
              }`}
            >
              <p className="text-sm font-medium text-foreground truncate">
                {note.title || 'Sin título'}
              </p>
              <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                {extractTextPreview(note.content) || 'Sin contenido'}
              </p>
              <p className="text-xs text-subtle mt-1.5">
                {format(new Date(note.updated_at), 'd MMM yyyy', { locale: es })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
