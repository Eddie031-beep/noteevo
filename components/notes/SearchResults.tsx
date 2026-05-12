'use client'

import { useEffect, useState } from 'react'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import { searchNotes } from '@/lib/supabase/search'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { Note } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Search } from 'lucide-react'

export default function SearchResults() {
  const [results, setResults] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const { setSelectedNote, selectedNote } = useNoteStore()
  const { searchQuery } = useUIStore()

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }
    const timeout = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await searchNotes(searchQuery)
        setResults(data)
      } catch (err) {
        console.error('Error buscando notas:', err)
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  return (
    <div className="w-72 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <Search size={18} className="text-gray-500" />
        <div>
          <h2 className="font-semibold text-gray-800">Resultados</h2>
          {!loading && results.length > 0 && (
            <p className="text-xs text-gray-400 mt-0.5">{results.length} nota{results.length !== 1 ? 's' : ''}</p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-gray-400 text-center mt-8">Buscando...</p>
        ) : !searchQuery.trim() ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Search size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">Escribe para buscar</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Search size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">Sin resultados</p>
          </div>
        ) : (
          results.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`p-4 border-b border-gray-200 cursor-pointer transition ${
                selectedNote?.id === note.id
                  ? 'bg-green-50 border-l-2 border-l-green-500'
                  : 'hover:bg-white'
              }`}
            >
              <p className="text-sm font-semibold text-gray-800 truncate">
                {note.title || 'Sin título'}
              </p>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                {extractTextPreview(note.content) || 'Sin contenido'}
              </p>
              <p className="text-xs text-gray-400 mt-1.5">
                {format(new Date(note.updated_at), "d MMM yyyy", { locale: es })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
