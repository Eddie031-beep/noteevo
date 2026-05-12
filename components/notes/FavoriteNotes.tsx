'use client'

import { useEffect, useState } from 'react'
import { useNoteStore } from '@/store/noteStore'
import { getFavoriteNotes } from '@/lib/supabase/notes'
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
      } catch (err) {
        console.error('Error cargando favoritos:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="w-72 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <Star size={18} className="text-yellow-500" />
        <h2 className="font-semibold text-gray-800">Favoritos</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-gray-400 text-center mt-8">Cargando...</p>
        ) : favoriteNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Star size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">Sin notas favoritas</p>
          </div>
        ) : (
          favoriteNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-4 border-b border-gray-200 cursor-pointer transition ${
                selectedNote?.id === note.id
                  ? 'bg-green-50 border-l-2 border-l-green-500'
                  : 'hover:bg-white'
              }`}
            >
              <p className="text-sm font-medium text-gray-800 truncate">
                {note.title || 'Sin título'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {format(new Date(note.updated_at), "d MMM yyyy", { locale: es })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}