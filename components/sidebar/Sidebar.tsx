'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useNotebookStore } from '@/store/notebookStore'
import { useUIStore } from '@/store/uiStore'
import { useTagStore } from '@/store/tagStore'
import { getNotebooks, createNotebook, deleteNotebook } from '@/lib/supabase/notebooks'
import { getTags } from '@/lib/supabase/tags'
import { getPendingTaskCount } from '@/lib/supabase/tasks'
import { getMySpaces } from '@/lib/supabase/spaces'
import { useSpaceStore } from '@/store/spaceStore'
import {
  Home, FileText, BookOpen, Star, Trash2, LogOut,
  Plus, X, Search, Tag, CheckSquare, Paperclip,
  Calendar, Users, Sparkles, ChevronDown, ChevronRight, ChevronLeft,
} from 'lucide-react'
import type { Notebook, Space } from '@/types'

type View = 'home' | 'notebooks' | 'all-notes' | 'favorites' | 'trash' | 'search' | 'tags-view' | 'notebooks-view' | 'tasks' | 'files' | 'calendar' | 'spaces'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick: () => void
  collapsed: boolean
  disabled?: boolean
  badge?: number
}

function NavItem({ icon, label, active, onClick, collapsed, disabled, badge }: NavItemProps) {
  const base = 'w-full flex items-center rounded-lg transition-colors duration-150'
  const layout = collapsed ? 'justify-center p-2' : 'gap-2.5 px-3 py-2'
  const state = disabled
    ? 'opacity-30 pointer-events-none text-muted'
    : active
      ? 'bg-accent/15 text-accent'
      : 'text-muted hover:bg-surface hover:text-foreground cursor-pointer'

  const showBadge = badge !== undefined && badge > 0

  return (
    <button
      type="button"
      title={collapsed ? label : undefined}
      onClick={disabled ? undefined : onClick}
      className={`${base} ${layout} ${state}`}
    >
      <span className="relative shrink-0">
        {icon}
        {collapsed && showBadge && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full" />
        )}
      </span>
      {!collapsed && (
        <>
          <span className="text-sm font-medium flex-1 text-left truncate">{label}</span>
          {showBadge && (
            <span className="ml-auto shrink-0 min-w-[18px] h-[18px] px-1 bg-accent/20 text-accent text-[10px] font-semibold rounded-full flex items-center justify-center">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </>
      )}
    </button>
  )
}

function Separator() {
  return <div className="my-1 mx-2 h-px bg-border" />
}

export default function Sidebar() {
  const router = useRouter()
  const {
    notebooks, setNotebooks, addNotebook,
    deleteNotebook: removeNotebook,
    setSelectedNotebook, selectedNotebook,
  } = useNotebookStore()
  const { currentView, setCurrentView, searchQuery, setSearchQuery } = useUIStore()
  const { setTags } = useTagStore()
  const { spaces, setSpaces, selectedSpace, setSelectedSpace } = useSpaceStore()

  const [collapsed, setCollapsed] = useState(false)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [notebooksOpen, setNotebooksOpen] = useState(true)
  const [spacesOpen, setSpacesOpen] = useState(true)
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getNotebooks()
        setNotebooks(data)
      } catch {
        // sin notebooks
      }
    }
    load()
  }, [setNotebooks])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTags()
        setTags(data)
      } catch {
        // sin tags
      }
    }
    load()
  }, [setTags])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMySpaces()
        setSpaces(data)
      } catch {
        // sin spaces
      }
    }
    load()
  }, [setSpaces])

  useEffect(() => {
    const load = async () => {
      try {
        const count = await getPendingTaskCount()
        setPendingCount(count)
      } catch {
        // silencioso
      }
    }
    load()
  }, [])

  const handleCreate = async () => {
    if (!newName.trim()) return
    setCreating(true)
    try {
      const notebook = await createNotebook(newName.trim())
      addNotebook(notebook)
      setNewName('')
      setShowInput(false)
      setSelectedNotebook(notebook)
      setCurrentView('notebooks')
    } catch {
      // error silencioso
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

  const handleNav = (view: View) => {
    setCurrentView(view)
    setSelectedNotebook(null)
    setSearchQuery('')
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setCurrentView(value.trim() ? 'search' : 'home')
  }

  const handleNotebookClick = (notebook: Notebook) => {
    setSelectedNotebook(notebook)
    setCurrentView('notebooks')
    setSearchQuery('')
  }

  const handleSpaceClick = (space: Space) => {
    setSelectedSpace(space)
    setCurrentView('spaces')
    setSearchQuery('')
    setSelectedNotebook(null)
  }

  const isNotebooksActive =
    currentView === 'notebooks' || currentView === 'notebooks-view'

  return (
    <aside
      className={`h-screen bg-panel border-r border-border flex flex-col shrink-0 transition-[width] duration-200 ${
        collapsed ? 'w-14' : 'w-60'
      }`}
    >
      {/* ── Header ── */}
      <div
        className={`h-14 flex items-center border-b border-border shrink-0 ${
          collapsed ? 'justify-center px-2' : 'px-4 justify-between'
        }`}
      >
        {!collapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-accent rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="font-semibold text-foreground text-sm tracking-tight">
              NoteEvo
            </span>
          </div>
        )}
        <button
          type="button"
          title={collapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* ── Search ── */}
      {!collapsed ? (
        <div className="px-3 py-2.5 border-b border-border shrink-0">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition ${
              currentView === 'search'
                ? 'bg-accent/10 ring-1 ring-accent/30'
                : 'bg-surface'
            }`}
          >
            <Search size={13} className="text-muted shrink-0" />
            <input
              type="text"
              placeholder="Buscar notas..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-1 bg-transparent text-sm text-foreground outline-none min-w-0"
              style={{ color: 'var(--color-foreground)' }}
            />
            {searchQuery && (
              <button
                type="button"
                title="Limpiar búsqueda"
                onClick={() => {
                  setSearchQuery('')
                  setCurrentView('home')
                }}
                className="text-muted hover:text-foreground transition cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="px-2 pt-2 pb-1 shrink-0">
          <button
            type="button"
            title="Buscar"
            onClick={() => setCollapsed(false)}
            className={`w-full flex justify-center p-2 rounded-lg transition cursor-pointer ${
              currentView === 'search'
                ? 'bg-accent/15 text-accent'
                : 'text-muted hover:bg-surface hover:text-foreground'
            }`}
          >
            <Search size={18} />
          </button>
        </div>
      )}

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 min-h-0">
        <NavItem
          icon={<Home size={18} />}
          label="Inicio"
          active={currentView === 'home'}
          onClick={() => handleNav('home')}
          collapsed={collapsed}
        />
        <NavItem
          icon={<FileText size={18} />}
          label="Notas"
          active={currentView === 'all-notes'}
          onClick={() => handleNav('all-notes')}
          collapsed={collapsed}
        />
        <NavItem
          icon={<Star size={18} />}
          label="Favoritos"
          active={currentView === 'favorites'}
          onClick={() => handleNav('favorites')}
          collapsed={collapsed}
        />

        <Separator />

        {/* Libretas section */}
        {!collapsed ? (
          <div>
            <div className="flex items-center justify-between px-3 py-1">
              <button
                type="button"
                onClick={() => setNotebooksOpen(!notebooksOpen)}
                className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                  isNotebooksActive ? 'text-accent' : 'text-muted hover:text-foreground'
                }`}
              >
                {notebooksOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                Libretas
              </button>
              <button
                type="button"
                title="Nueva libreta"
                onClick={() => setShowInput(!showInput)}
                className="p-0.5 text-muted hover:text-accent transition cursor-pointer rounded"
              >
                <Plus size={13} />
              </button>
            </div>

            {showInput && (
              <div className="flex gap-1 px-2 pb-1">
                <input
                  type="text"
                  placeholder="Nombre..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  autoFocus
                  className="flex-1 px-2 py-1 text-xs bg-elevated border border-border rounded-md outline-none text-foreground"
                  style={{ color: 'var(--color-foreground)' }}
                />
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={creating}
                  className="px-2 py-1 bg-accent text-white text-xs rounded-md hover:bg-accent-light disabled:opacity-50 cursor-pointer transition"
                >
                  {creating ? '…' : 'OK'}
                </button>
              </div>
            )}

            {notebooksOpen && (
              <div className="space-y-0.5">
                {notebooks.map((notebook) => (
                  <div
                    key={notebook.id}
                    onClick={() => handleNotebookClick(notebook)}
                    className={`group flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer transition ${
                      currentView === 'notebooks' &&
                      selectedNotebook?.id === notebook.id
                        ? 'bg-accent/15 text-accent'
                        : 'text-muted hover:bg-surface hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <BookOpen size={14} className="shrink-0" />
                      <span className="text-xs truncate">{notebook.name}</span>
                    </div>
                    <button
                      type="button"
                      title="Eliminar libreta"
                      onClick={(e) => handleDelete(notebook.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-muted hover:text-danger transition cursor-pointer shrink-0 ml-1"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
                {notebooks.length === 0 && (
                  <p className="text-xs text-subtle px-3 py-1.5">Sin libretas aún</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <NavItem
            icon={<BookOpen size={18} />}
            label="Libretas"
            active={isNotebooksActive}
            onClick={() => {
              setCollapsed(false)
              setNotebooksOpen(true)
            }}
            collapsed={collapsed}
          />
        )}

        <Separator />

        <NavItem
          icon={<Tag size={18} />}
          label="Etiquetas"
          active={currentView === 'tags-view'}
          onClick={() => handleNav('tags-view')}
          collapsed={collapsed}
        />
        <NavItem
          icon={<Trash2 size={18} />}
          label="Papelera"
          active={currentView === 'trash'}
          onClick={() => handleNav('trash')}
          collapsed={collapsed}
        />

        <Separator />

        <NavItem
          icon={<CheckSquare size={18} />}
          label="Tareas"
          active={currentView === 'tasks'}
          onClick={() => handleNav('tasks')}
          collapsed={collapsed}
          badge={pendingCount}
        />

        {/* Próximamente */}
        <NavItem
          icon={<Paperclip size={18} />}
          label="Archivos"
          active={currentView === 'files'}
          onClick={() => handleNav('files')}
          collapsed={collapsed}
        />
        <NavItem
          icon={<Calendar size={18} />}
          label="Calendario"
          active={currentView === 'calendar'}
          onClick={() => handleNav('calendar')}
          collapsed={collapsed}
        />
        {/* Spaces section */}
        {!collapsed ? (
          <div>
            <div className="flex items-center justify-between px-3 py-1">
              <button
                type="button"
                onClick={() => setSpacesOpen(!spacesOpen)}
                className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                  currentView === 'spaces' ? 'text-accent' : 'text-muted hover:text-foreground'
                }`}
              >
                {spacesOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                Spaces
              </button>
              <button
                type="button"
                title="Ver todos los spaces"
                onClick={() => handleNav('spaces')}
                className="p-0.5 text-muted hover:text-accent transition cursor-pointer rounded"
              >
                <Users size={13} />
              </button>
            </div>

            {spacesOpen && (
              <div className="space-y-0.5">
                {spaces.map((space) => (
                  <div
                    key={space.id}
                    onClick={() => handleSpaceClick(space)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition ${
                      currentView === 'spaces' && selectedSpace?.id === space.id
                        ? 'bg-accent/15 text-accent'
                        : 'text-muted hover:bg-surface hover:text-foreground'
                    }`}
                  >
                    <Users size={13} className="shrink-0" />
                    <span className="text-xs truncate flex-1">{space.name}</span>
                  </div>
                ))}
                {spaces.length === 0 && (
                  <p className="text-xs text-subtle px-3 py-1.5">Sin spaces aún</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <NavItem
            icon={<Users size={18} />}
            label="Spaces"
            active={currentView === 'spaces'}
            onClick={() => {
              setCollapsed(false)
              setSpacesOpen(true)
            }}
            collapsed={collapsed}
          />
        )}
        <NavItem
          icon={<Sparkles size={18} />}
          label="IA"
          active={false}
          onClick={() => {}}
          collapsed={collapsed}
          disabled
        />
      </nav>

      {/* ── Logout ── */}
      <div className="border-t border-border p-2 shrink-0">
        <button
          type="button"
          title={collapsed ? 'Cerrar sesión' : undefined}
          onClick={handleLogout}
          className={`w-full flex items-center gap-2.5 rounded-lg py-2 text-sm text-muted hover:bg-danger/10 hover:text-danger transition cursor-pointer ${
            collapsed ? 'justify-center px-2' : 'px-3'
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span className="font-medium">Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}
