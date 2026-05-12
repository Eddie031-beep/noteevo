'use client'

import { useEffect } from 'react'
import { useNoteStore } from '@/store/noteStore'
import { useNotebookStore } from '@/store/notebookStore'
import { getNotesByNotebook, createNote, trashNote } from '@/lib/supabase/notes'
import { Plus, Trash2, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function NoteList() {
  const { notes, setNotes, addNote, deleteNote, setSelectedNote, selectedNote } = useNoteStore()
  const { selectedNotebook } = useNotebookStore()

  useEffect(() => {
    if (!selectedNotebook) return
    const load = async () => {
      try {
        const data = await getNotesByNotebook(selectedNotebook.id)
        setNotes(data)
      } catch (err) {
        console.error('Error cargando notas:', err)
      }
    }
    load()
  }, [selectedNotebook, setNotes])

  const handleCreate = async () => {
    if (!selectedNotebook) return
    try {
      const note = await createNote(selectedNotebook.id)
      addNote(note)
      setSelectedNote(note)
    } catch (err) {
      console.error('Error creando nota:', err)
    }
  }

  const handleTrash = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      await trashNote(id)
      deleteNote(id)
    } catch (err) {
      console.error('Error eliminando nota:', err)
    }
  }

  if (!selectedNotebook) {
    return (
      <div className="w-72 h-screen bg-gray-50 border-r border-gray-200 flex items-center justify-center">
        <p className="text-sm text-gray-400">Selecciona una libreta</p>
      </div>
    )
  }

  return (
    <div className="w-72 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800 truncate">{selectedNotebook.name}</h2>
        <button
          type="button"
          title="Nueva nota"
          onClick={handleCreate}
          className="text-gray-400 hover:text-green-600 transition"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <FileText size={32} className="text-gray-300" />
            <p className="text-sm text-gray-400">Sin notas aún</p>
            <button
              type="button"
              onClick={handleCreate}
              className="text-sm text-green-600 hover:underline"
            >
              Crear primera nota
            </button>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`group p-4 border-b border-gray-200 cursor-pointer transition ${
                selectedNote?.id === note.id
                  ? 'bg-green-50 border-l-2 border-l-green-500'
                  : 'hover:bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {note.title || 'Sin título'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {format(new Date(note.updated_at), "d MMM yyyy", { locale: es })}
                  </p>
                </div>
                <button
                  type="button"
                  title="Mover a papelera"
                  onClick={(e) => handleTrash(note.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition mt-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
