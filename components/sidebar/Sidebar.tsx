'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useNotebookStore } from '@/store/notebookStore'
import { useUIStore } from '@/store/uiStore'
import { useTagStore } from '@/store/tagStore'
import { useProfileStore } from '@/store/profileStore'
import { getNotebooks, createNotebook, deleteNotebook, updateNotebook } from '@/lib/supabase/notebooks'
import { getTags } from '@/lib/supabase/tags'
import { getPendingTaskCount } from '@/lib/supabase/tasks'
import { getMySpaces } from '@/lib/supabase/spaces'
import { getProfile, updateProfile } from '@/lib/supabase/profile'
import { useSpaceStore } from '@/store/spaceStore'
import {
  Home, FileText, BookOpen, Star, Trash2, LogOut,
  Plus, X, Search, Tag, CheckSquare, Paperclip,
  Calendar, Users, Sparkles, ChevronDown, ChevronRight, ChevronLeft, Share2, LayoutTemplate, Pencil, Settings,
  Sun, Moon, Monitor, SlidersHorizontal, Upload,
} from 'lucide-react'
import NotificationBell from './NotificationBell'
import ImportModal from '@/components/notes/ImportModal'
import { useDroppable } from '@dnd-kit/core'
import type { Notebook, Space } from '@/types'

type View = 'home' | 'notebooks' | 'all-notes' | 'favorites' | 'trash' | 'search' | 'advanced-search' | 'tags-view' | 'notebooks-view' | 'tasks' | 'files' | 'calendar' | 'spaces' | 'shared' | 'settings' | 'templates' | 'ai-assistant'

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

function DroppableNotebook({
  notebook,
  isActive,
  onClick,
  onDelete,
  onRename,
}: {
  notebook: Notebook
  isActive: boolean
  onClick: () => void
  onDelete: (e: React.MouseEvent) => void
  onRename: (id: string, newName: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `notebook-${notebook.id}`,
    data: { type: 'notebook', notebookId: notebook.id },
  })
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(notebook.name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) setTimeout(() => inputRef.current?.focus(), 0)
  }, [editing])

  const handleRename = () => {
    if (!name.trim() || name.trim() === notebook.name) {
      setName(notebook.name)
      setEditing(false)
      return
    }
    onRename(notebook.id, name.trim())
    setEditing(false)
  }

  if (editing) {
    return (
      <div
        ref={setNodeRef}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <BookOpen size={14} className="text-muted shrink-0" />
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename()
            if (e.key === 'Escape') { setName(notebook.name); setEditing(false) }
          }}
          onBlur={handleRename}
          className="flex-1 bg-transparent text-xs text-foreground outline-none min-w-0"
          style={{ color: 'var(--color-foreground)' }}
        />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className={`group flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer transition ${
        isOver
          ? 'bg-accent/20 ring-1 ring-accent/40'
          : isActive
            ? 'bg-accent/15 text-accent'
            : 'text-muted hover:bg-surface hover:text-foreground'
      }`}
    >
      <div className="flex items-center gap-2 truncate min-w-0">
        <BookOpen size={14} className="shrink-0" />
        <span className="text-xs truncate">{notebook.name}</span>
      </div>
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 shrink-0 ml-1">
        <button
          type="button"
          title="Renombrar libreta"
          onClick={(e) => { e.stopPropagation(); setEditing(true) }}
          className="p-0.5 text-muted hover:text-foreground transition cursor-pointer rounded"
        >
          <Pencil size={10} />
        </button>
        <button
          type="button"
          title="Eliminar libreta"
          onClick={onDelete}
          className="p-0.5 text-muted hover:text-danger transition cursor-pointer rounded"
        >
          <X size={11} />
        </button>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const {
    notebooks, setNotebooks, addNotebook,
    deleteNotebook: removeNotebook,
    renameNotebook,
    setSelectedNotebook, selectedNotebook,
  } = useNotebookStore()
  const { currentView, setCurrentView, searchQuery, setSearchQuery, theme, setTheme, isSidebarCollapsed: collapsed, setSidebarCollapsed: setCollapsed } = useUIStore()
  const { setTags } = useTagStore()
  const { spaces, setSpaces, selectedSpace, setSelectedSpace, removeSpace } = useSpaceStore()
  const { profile, setProfile } = useProfileStore()

  const [moreOpen, setMoreOpen] = useState(true)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [notebooksOpen, setNotebooksOpen] = useState(true)
  const [spacesOpen, setSpacesOpen] = useState(true)
  const [pendingCount, setPendingCount] = useState(0)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [showImportModal, setShowImportModal] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)

  const accountName = profile?.display_name || userEmail || 'NoteEvo'
  const accountInitials = (profile?.display_name || userEmail || 'N').slice(0, 2).toUpperCase()

  // Cerrar el menú de cuenta al hacer click fuera o pulsar Escape
  useEffect(() => {
    if (!accountMenuOpen) return
    const handlePointer = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAccountMenuOpen(false)
    }
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [accountMenuOpen])

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
        if (selectedSpace && !data.find((s) => s.id === selectedSpace.id)) {
          setSelectedSpace(null)
          setCurrentView('home')
        }
      } catch {
        // sin spaces
      }
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSpaces])

  useEffect(() => {
    const supabase = createClient()
    let userId: string | null = null

    supabase.auth.getUser().then(({ data: { user } }) => {
      userId = user?.id ?? null
      setUserEmail(user?.email ?? null)
    })

    const channel = supabase
      .channel('my-space-memberships')
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'space_members',
        },
        (payload) => {
          if (payload.old && (payload.old as { user_id: string }).user_id === userId) {
            const spaceId = (payload.old as { space_id: string }).space_id
            removeSpace(spaceId)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [removeSpace])

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

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (p) {
          setProfile(p)
          if (p.theme) setTheme(p.theme)
        }
      })
      .catch(() => {})
  }, [setProfile, setTheme])

  // Hidratar preferencias de sidebar desde localStorage (solo cliente)
  useEffect(() => {
    const saved = localStorage.getItem('noteevo-sidebar-collapsed')
    if (saved !== null) setCollapsed(saved === 'true')
    const savedMore = localStorage.getItem('noteevo-sidebar-more-open')
    if (savedMore !== null) setMoreOpen(savedMore === 'true')
  }, [setCollapsed])

  useEffect(() => {
    localStorage.setItem('noteevo-sidebar-collapsed', String(collapsed))
  }, [collapsed])

  useEffect(() => {
    localStorage.setItem('noteevo-sidebar-more-open', String(moreOpen))
  }, [moreOpen])

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

  const themeIcon = theme === 'light' ? <Sun size={18} /> : theme === 'system' ? <Monitor size={18} /> : <Moon size={18} />
  const themeLabel = theme === 'light' ? 'Modo claro' : theme === 'system' ? 'Sistema' : 'Modo oscuro'

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
    setTheme(next)
    updateProfile({ theme: next }).catch(() => {})
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const goToDashboard = () => {
    if (pathname !== '/dashboard') router.push('/dashboard')
  }

  const handleNav = (view: View) => {
    setCurrentView(view)
    setSelectedNotebook(null)
    setSearchQuery('')
    goToDashboard()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setCurrentView(value.trim() ? 'search' : 'home')
    goToDashboard()
  }

  const handleNotebookClick = (notebook: Notebook) => {
    setSelectedNotebook(notebook)
    setCurrentView('notebooks')
    setSearchQuery('')
    goToDashboard()
  }

  const handleSpaceClick = (space: Space) => {
    setSelectedSpace(space)
    setCurrentView('spaces')
    setSearchQuery('')
    setSelectedNotebook(null)
    goToDashboard()
  }

  const isNotebooksActive =
    currentView === 'notebooks' || currentView === 'notebooks-view'

  return (
    <>
    <aside
      className={`h-screen bg-panel border-r border-border flex flex-col shrink-0 transition-[width] duration-200 ${
        collapsed ? 'w-14' : 'w-60'
      }`}
    >
      {/* ── Workspace header ── */}
      <div
        ref={accountMenuRef}
        className={`relative h-14 flex items-center border-b border-border shrink-0 ${
          collapsed ? 'justify-center px-2' : 'px-3 justify-between gap-1'
        }`}
      >
        <button
          type="button"
          onClick={() => setAccountMenuOpen((o) => !o)}
          title={collapsed ? accountName : undefined}
          aria-haspopup="menu"
          aria-expanded={accountMenuOpen}
          className={`flex items-center rounded-lg transition cursor-pointer min-w-0 ${
            collapsed ? 'justify-center p-1' : 'flex-1 gap-2.5 px-1.5 py-1.5 hover:bg-surface'
          }`}
        >
          {profile?.avatar_url ? (
            <img
              src={`${profile.avatar_url}?t=${new Date(profile.updated_at).getTime()}`}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-white">
                {accountInitials}
              </span>
            </div>
          )}
          {!collapsed && (
            <>
              <span className="text-sm font-medium text-foreground flex-1 text-left truncate">
                {accountName}
              </span>
              <ChevronDown
                size={14}
                className={`shrink-0 text-muted transition-transform duration-150 ${
                  accountMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </>
          )}
        </button>

        {!collapsed && (
          <button
            type="button"
            title="Colapsar sidebar"
            onClick={() => setCollapsed(true)}
            className="p-1.5 rounded-md text-muted hover:bg-surface hover:text-foreground transition cursor-pointer shrink-0"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {accountMenuOpen && (
          <div
            role="menu"
            className={`absolute z-50 rounded-xl border border-border bg-elevated shadow-lg py-1 ${
              collapsed ? 'top-1 left-full ml-2 w-48' : 'top-full left-3 right-3 mt-1'
            }`}
          >
            {collapsed && (
              <button
                type="button"
                role="menuitem"
                onClick={() => { setCollapsed(false); setAccountMenuOpen(false) }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
              >
                <ChevronRight size={15} className="shrink-0" />
                Expandir panel
              </button>
            )}
            <button
              type="button"
              role="menuitem"
              onClick={() => { router.push('/dashboard/settings'); setAccountMenuOpen(false) }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
            >
              <Settings size={15} className="shrink-0" />
              Configuración
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => { setShowImportModal(true); setAccountMenuOpen(false) }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
            >
              <Upload size={15} className="shrink-0" />
              Importar notas
            </button>
            <div className="my-1 mx-2 h-px bg-border" />
            <button
              type="button"
              role="menuitem"
              onClick={() => { setAccountMenuOpen(false); handleLogout() }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted hover:bg-danger/10 hover:text-danger transition cursor-pointer"
            >
              <LogOut size={15} className="shrink-0" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* ── Search ── */}
      {!collapsed ? (
        <div className="px-3 py-2.5 border-b border-border shrink-0">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition ${
              currentView === 'search'
                ? 'bg-accent/10 ring-1 ring-accent/30'
                : 'bg-surface border border-border'
            }`}
          >
            <Search size={13} className="text-muted shrink-0" />
            <input
              type="text"
              data-testid="sidebar-search"
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
        <NavItem
          icon={<SlidersHorizontal size={18} />}
          label="Búsqueda avanzada"
          active={currentView === 'advanced-search'}
          onClick={() => handleNav('advanced-search')}
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
                data-testid="new-notebook-btn"
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
                  data-testid="notebook-name-input"
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
                  data-testid="notebook-create-submit"
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
                  <DroppableNotebook
                    key={notebook.id}
                    notebook={notebook}
                    isActive={
                      currentView === 'notebooks' &&
                      selectedNotebook?.id === notebook.id
                    }
                    onClick={() => handleNotebookClick(notebook)}
                    onDelete={(e) => handleDelete(notebook.id, e)}
                    onRename={async (id, newName) => {
                      await updateNotebook(id, newName)
                      renameNotebook(id, newName)
                    }}
                  />
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

        <NavItem
          icon={<Calendar size={18} />}
          label="Calendario"
          active={currentView === 'calendar'}
          onClick={() => handleNav('calendar')}
          collapsed={collapsed}
        />
        <NavItem
          icon={<Sparkles size={18} />}
          label="Asistente IA"
          active={currentView === 'ai-assistant'}
          onClick={() => handleNav('ai-assistant')}
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
          icon={<Share2 size={18} />}
          label="Compartido conmigo"
          active={currentView === 'shared'}
          onClick={() => handleNav('shared')}
          collapsed={collapsed}
        />
        <Separator />

        {/* Sección "Más" colapsable (id:52) */}
        {!collapsed ? (
          <div>
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              className="w-full flex items-center gap-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted hover:text-foreground transition cursor-pointer"
            >
              {moreOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
              Más
            </button>
            <div
              className="space-y-0.5"
              style={{ maxHeight: moreOpen ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.2s ease' }}
            >
              <NavItem
                icon={<Paperclip size={18} />}
                label="Archivos"
                active={currentView === 'files'}
                onClick={() => handleNav('files')}
                collapsed={collapsed}
              />
              <NavItem
                icon={<LayoutTemplate size={18} />}
                label="Plantillas"
                active={currentView === 'templates'}
                onClick={() => handleNav('templates')}
                collapsed={collapsed}
              />
              <NavItem
                icon={<Settings size={18} />}
                label="Configuración"
                active={pathname === '/dashboard/settings'}
                onClick={() => router.push('/dashboard/settings')}
                collapsed={collapsed}
              />
            </div>
          </div>
        ) : (
          <>
            <NavItem
              icon={<Paperclip size={18} />}
              label="Archivos"
              active={currentView === 'files'}
              onClick={() => handleNav('files')}
              collapsed={collapsed}
            />
            <NavItem
              icon={<LayoutTemplate size={18} />}
              label="Plantillas"
              active={currentView === 'templates'}
              onClick={() => handleNav('templates')}
              collapsed={collapsed}
            />
          </>
        )}
      </nav>

      {/* ── Bottom actions ── */}
      <div className="border-t border-border p-2 shrink-0 space-y-0.5">
        <NotificationBell collapsed={collapsed} />

        {/* Theme toggle */}
        <button
          type="button"
          title={collapsed ? themeLabel : undefined}
          onClick={toggleTheme}
          className={`w-full flex items-center rounded-lg py-2 transition cursor-pointer text-muted hover:bg-surface hover:text-foreground ${
            collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'
          }`}
        >
          {themeIcon}
          {!collapsed && (
            <span className="text-sm font-medium flex-1 text-left truncate">{themeLabel}</span>
          )}
        </button>

        {/* User / Settings */}
        <button
          type="button"
          title={collapsed ? 'Configuración' : undefined}
          onClick={() => router.push('/dashboard/settings')}
          className={`w-full flex items-center rounded-lg py-2 transition cursor-pointer ${
            pathname === '/dashboard/settings'
              ? 'bg-accent/15 text-accent'
              : 'text-muted hover:bg-surface hover:text-foreground'
          } ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'}`}
        >
          {profile?.avatar_url ? (
            <img
              src={`${profile.avatar_url}?t=${new Date(profile.updated_at).getTime()}`}
              alt="Avatar"
              className="w-6 h-6 rounded-md object-cover shrink-0"
            />
          ) : (
            <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-accent">
                {(profile?.display_name || 'U').slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          {!collapsed && (
            <>
              <span className="text-sm font-medium flex-1 text-left truncate">
                {profile?.display_name || 'Mi perfil'}
              </span>
              <Settings size={14} className="shrink-0 opacity-50" />
            </>
          )}
        </button>

        <button
          type="button"
          title={collapsed ? 'Cerrar sesión' : undefined}
          data-testid="logout-btn"
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

    {showImportModal && <ImportModal onClose={() => setShowImportModal(false)} />}
  </>
  )
}
