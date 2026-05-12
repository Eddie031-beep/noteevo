'use client'

import { useEffect, useState } from 'react'
import { getTrashedNotes, restoreNote, permanentlyDeleteNote } from '@/lib/supabase/notes'
import type { Note } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Trash2, RotateCcw, X } from 'lucide-react'

export default function TrashNotes() {
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTrashedNotes()
        setTrashedNotes(data)
      } catch (err) {
        console.error('Error cargando papelera:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleRestore = async (id: string) => {
    try {
      await restoreNote(id)
      setTrashedNotes(prev => prev.filter(n => n.id !== id))
    } catch (err) {
      console.error('Error restaurando nota:', err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await permanentlyDeleteNote(id)
      setTrashedNotes(prev => prev.filter(n => n.id !== id))
    } catch (err) {
      console.error('Error eliminando nota:', err)
    }
  }

  return (
    <div className="w-72 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center gap-2">
        <Trash2 size={18} className="text-gray-500" />
        <h2 className="font-semibold text-gray-800">Papelera</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-gray-400 text-center mt-8">Cargando...</p>
        ) : trashedNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <Trash2 size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">Papelera vacía</p>
          </div>
        ) : (
          trashedNotes.map((note) => (
            <div
              key={note.id}
              className="group p-4 border-b border-gray-200 hover:bg-white transition"
            >
              <p className="text-sm font-medium text-gray-800 truncate">
                {note.title || 'Sin título'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {format(new Date(note.updated_at), "d MMM yyyy", { locale: es })}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleRestore(note.id)}
                  className="flex items-center gap-1 text-xs text-green-600 hover:underline"
                >
                  <RotateCcw size={12} /> Restaurar
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="flex items-center gap-1 text-xs text-red-500 hover:underline"
                >
                  <X size={12} /> Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}