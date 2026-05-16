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
      } catch {
        // error buscando notas
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      <div className="h-14 px-4 border-b border-border flex items-center gap-2.5">
        <Search size={18} className="text-muted shrink-0" />
        <div>
          <h2 className="font-semibold text-foreground text-sm">Resultados</h2>
          {!loading && results.length > 0 && (
            <p className="text-xs text-muted">
              {results.length} nota{results.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-muted text-center mt-8">Buscando...</p>
        ) : !searchQuery.trim() ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Search size={32} className="text-subtle" />
            <p className="text-sm text-muted">Escribe para buscar</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Search size={32} className="text-subtle" />
            <p className="text-sm text-muted">Sin resultados</p>
          </div>
        ) : (
          results.map((note) => (
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
