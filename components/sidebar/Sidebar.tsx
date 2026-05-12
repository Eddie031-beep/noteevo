'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useNotebookStore } from '@/store/notebookStore'
import { useUIStore } from '@/store/uiStore'
import { useTagStore } from '@/store/tagStore'
import { getNotebooks, createNotebook, deleteNotebook } from '@/lib/supabase/notebooks'
import { getTags } from '@/lib/supabase/tags'
import { BookOpen, Star, Trash2, LogOut, Plus, X, Search } from 'lucide-react'

export default function Sidebar() {
  const router = useRouter()
  const {
    notebooks, setNotebooks, addNotebook,
    deleteNotebook: removeNotebook,
    setSelectedNotebook, selectedNotebook,
  } = useNotebookStore()
  const { currentView, setCurrentView, searchQuery, setSearchQuery } = useUIStore()
  const { setTags } = useTagStore()

  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getNotebooks()
        setNotebooks(data)
      } catch (err) {
        console.error('Error cargando libretas:', err)
      }
    }
    load()
  }, [setNotebooks])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTags()
        setTags(data)
      } catch (err) {
        console.error('Error cargando tags:', err)
      }
    }
    load()
  }, [setTags])

  const handleCreate = async () => {
    if (!newName.trim()) return
    setCreating(true)
    try {
      const notebook = await createNotebook(newName.trim())
      addNotebook(notebook)
      setNewName('')
      setShowInput(false)
    } catch (err) {
      console.error('Error creando libreta:', err)
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    await deleteNotebook(id)
    removeNotebook(id)
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.trim()) {
      setCurrentView('search')
    } else {
      setCurrentView('notebooks')
    }
  }

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-green-600">NoteEvo</h1>
      </div>

      {/* Búsqueda */}
      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar notas..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
          />
          {searchQuery && (
            <button
              type="button"
              title="Limpiar búsqueda"
              onClick={() => {
                setSearchQuery('')
                setCurrentView('notebooks')
              }}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <button
          type="button"
          onClick={() => { setCurrentView('favorites'); setSelectedNotebook(null); setSearchQuery('') }}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition ${
            currentView === 'favorites'
              ? 'bg-yellow-50 text-yellow-600 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Star size={18} />
          Favoritos
        </button>

        <button
          type="button"
          onClick={() => { setCurrentView('trash'); setSelectedNotebook(null); setSearchQuery('') }}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition ${
            currentView === 'trash'
              ? 'bg-red-50 text-red-500 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Trash2 size={18} />
          Papelera
        </button>

        <div className="pt-4">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Libretas
            </span>
            <button
              type="button"
              title="Nueva libreta"
              onClick={() => setShowInput(!showInput)}
              className="text-gray-400 hover:text-green-600 transition"
            >
              <Plus size={16} />
            </button>
          </div>

          {showInput && (
            <div className="flex gap-1 mb-2 px-1">
              <input
                type="text"
                placeholder="Nombre..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
                autoFocus
              />
              <button
                type="button"
                onClick={handleCreate}
                disabled={creating}
                className="px-2 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {creating ? '...' : 'OK'}
              </button>
            </div>
          )}

          {notebooks.map((notebook) => (
            <div
              key={notebook.id}
              onClick={() => {
                setSelectedNotebook(notebook)
                setCurrentView('notebooks')
                setSearchQuery('')
              }}
              className={`group flex items-center justify-between px-3 py-2 text-sm rounded-lg cursor-pointer transition ${
                currentView === 'notebooks' && selectedNotebook?.id === notebook.id
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <BookOpen size={16} />
                <span className="truncate">{notebook.name}</span>
              </div>
              <button
                type="button"
                title="Eliminar libreta"
                onClick={(e) => handleDelete(notebook.id, e)}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition"
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {notebooks.length === 0 && (
            <p className="text-xs text-gray-400 px-3 py-2">Sin libretas aún</p>
          )}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 rounded-lg hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}