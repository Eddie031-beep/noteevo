'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useUIStore } from '@/store/uiStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useSpaceStore } from '@/store/spaceStore'
import { createNote } from '@/lib/supabase/notes'
import { searchNotes } from '@/lib/supabase/search'
import { updateProfile } from '@/lib/supabase/profile'
import SaveAsTemplateModal from '@/components/templates/SaveAsTemplateModal'
import {
  Home, FileText, Star, CheckSquare, Calendar, LayoutTemplate,
  Trash2, Tag, Sparkles, Share2, Settings, Sun, Moon, Monitor,
  BookOpen, Users, Plus, Search, X,
} from 'lucide-react'
import type { Note } from '@/types'

type View =
  | 'home' | 'notebooks' | 'all-notes' | 'favorites' | 'trash'
  | 'search' | 'advanced-search' | 'tags-view' | 'notebooks-view' | 'tasks' | 'files'
  | 'calendar' | 'spaces' | 'shared' | 'settings' | 'templates' | 'ai-assistant'

type SectionKey = 'acciones' | 'ir-a' | 'libretas' | 'spaces' | 'notas'

interface CommandItem {
  id: string
  icon: React.ReactNode
  label: string
  section: SectionKey
  shortcut?: string
  onExecute: () => void
}

const SECTION_LABELS: Record<SectionKey, string> = {
  acciones: 'Acciones',
  'ir-a': 'Ir a',
  libretas: 'Libretas',
  spaces: 'Spaces',
  notas: 'Notas',
}

const SECTION_ORDER: SectionKey[] = ['acciones', 'ir-a', 'libretas', 'spaces', 'notas']

export default function CommandPalette() {
  const router = useRouter()
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    setCurrentView,
    setTheme,
  } = useUIStore()
  const { notebooks, selectedNotebook, setSelectedNotebook } = useNotebookStore()
  const { selectedNote, addNote, setSelectedNote } = useNoteStore()
  const { spaces, setSelectedSpace } = useSpaceStore()

  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Note[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [showSaveTemplate, setShowSaveTemplate] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const close = useCallback(() => {
    setCommandPaletteOpen(false)
    setQuery('')
    setSearchResults([])
    setActiveIndex(0)
  }, [setCommandPaletteOpen])

  // Auto-focus and reset state when palette opens
  useEffect(() => {
    if (!isCommandPaletteOpen) return
    setQuery('')
    setSearchResults([])
    setActiveIndex(0)
    const t = setTimeout(() => inputRef.current?.focus(), 20)
    return () => clearTimeout(t)
  }, [isCommandPaletteOpen])

  // Debounced note search
  useEffect(() => {
    clearTimeout(searchTimer.current)
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    searchTimer.current = setTimeout(async () => {
      try {
        const results = await searchNotes(query)
        setSearchResults(results.slice(0, 8))
      } catch {
        setSearchResults([])
      }
    }, 200)
    return () => clearTimeout(searchTimer.current)
  }, [query])

  const applyTheme = useCallback(
    (next: 'light' | 'dark' | 'system') => {
      setTheme(next)
      updateProfile({ theme: next }).catch(() => {})
    },
    [setTheme]
  )

  const items = useMemo((): CommandItem[] => {
    const q = query.toLowerCase().trim()
    const matches = (label: string) => !q || label.toLowerCase().includes(q)

    const withClose = (fn: () => void) => () => {
      close()
      fn()
    }

    const goTo = (view: View) =>
      withClose(() => {
        setCurrentView(view)
        setSelectedNotebook(null)
        router.push('/dashboard')
      })

    // ── ACCIONES ──────────────────────────────────────────────
    const acciones: CommandItem[] = []

    if (matches('nueva nota')) {
      acciones.push({
        id: 'new-note',
        icon: <Plus size={15} />,
        label: 'Nueva nota',
        section: 'acciones',
        shortcut: 'Ctrl+Shift+E',
        onExecute: withClose(() => {
          if (!selectedNotebook) {
            setCurrentView('notebooks')
            router.push('/dashboard')
            return
          }
          createNote(selectedNotebook.id)
            .then((note) => {
              addNote(note)
              setSelectedNote(note)
              setCurrentView('notebooks')
            })
            .catch(() => {})
        }),
      })
    }

    if (selectedNote && matches('guardar nota como plantilla')) {
      acciones.push({
        id: 'save-template',
        icon: <LayoutTemplate size={15} />,
        label: 'Guardar nota como plantilla',
        section: 'acciones',
        onExecute: () => {
          close()
          setShowSaveTemplate(true)
        },
      })
    }

    if (matches('tema claro')) {
      acciones.push({
        id: 'theme-light',
        icon: <Sun size={15} />,
        label: 'Tema: Claro',
        section: 'acciones',
        onExecute: withClose(() => applyTheme('light')),
      })
    }

    if (matches('tema oscuro')) {
      acciones.push({
        id: 'theme-dark',
        icon: <Moon size={15} />,
        label: 'Tema: Oscuro',
        section: 'acciones',
        onExecute: withClose(() => applyTheme('dark')),
      })
    }

    if (matches('tema sistema')) {
      acciones.push({
        id: 'theme-system',
        icon: <Monitor size={15} />,
        label: 'Tema: Sistema',
        section: 'acciones',
        onExecute: withClose(() => applyTheme('system')),
      })
    }

    // ── IR A ───────────────────────────────────────────────────
    const navDefs: { id: string; icon: React.ReactNode; label: string; fn: () => void }[] = [
      { id: 'nav-home', icon: <Home size={15} />, label: 'Inicio', fn: goTo('home') },
      { id: 'nav-notes', icon: <FileText size={15} />, label: 'Notas', fn: goTo('all-notes') },
      { id: 'nav-favorites', icon: <Star size={15} />, label: 'Favoritos', fn: goTo('favorites') },
      { id: 'nav-tasks', icon: <CheckSquare size={15} />, label: 'Tareas', fn: goTo('tasks') },
      { id: 'nav-calendar', icon: <Calendar size={15} />, label: 'Calendario', fn: goTo('calendar') },
      { id: 'nav-templates', icon: <LayoutTemplate size={15} />, label: 'Plantillas', fn: goTo('templates') },
      { id: 'nav-trash', icon: <Trash2 size={15} />, label: 'Papelera', fn: goTo('trash') },
      { id: 'nav-tags', icon: <Tag size={15} />, label: 'Etiquetas', fn: goTo('tags-view') },
      { id: 'nav-ai', icon: <Sparkles size={15} />, label: 'Asistente IA', fn: goTo('ai-assistant') },
      { id: 'nav-shared', icon: <Share2 size={15} />, label: 'Compartido conmigo', fn: goTo('shared') },
      {
        id: 'nav-settings',
        icon: <Settings size={15} />,
        label: 'Configuración',
        fn: withClose(() => router.push('/dashboard/settings')),
      },
    ]

    const irA: CommandItem[] = navDefs
      .filter(({ label }) => matches(label))
      .map(({ id, icon, label, fn }) => ({
        id,
        icon,
        label,
        section: 'ir-a' as SectionKey,
        onExecute: fn,
      }))

    // ── LIBRETAS ───────────────────────────────────────────────
    const libretas: CommandItem[] = notebooks
      .filter(({ name }) => matches(name))
      .map((nb) => ({
        id: `notebook-${nb.id}`,
        icon: <BookOpen size={15} />,
        label: nb.name,
        section: 'libretas' as SectionKey,
        onExecute: withClose(() => {
          setSelectedNotebook(nb)
          setCurrentView('notebooks')
          router.push('/dashboard')
        }),
      }))

    // ── SPACES ─────────────────────────────────────────────────
    const spacesItems: CommandItem[] = spaces
      .filter(({ name }) => matches(name))
      .map((sp) => ({
        id: `space-${sp.id}`,
        icon: <Users size={15} />,
        label: sp.name,
        section: 'spaces' as SectionKey,
        onExecute: withClose(() => {
          setSelectedSpace(sp)
          setCurrentView('spaces')
          setSelectedNotebook(null)
          router.push('/dashboard')
        }),
      }))

    // ── NOTAS (search results) ─────────────────────────────────
    const notasItems: CommandItem[] = searchResults.map((note) => ({
      id: `note-${note.id}`,
      icon: <FileText size={15} />,
      label: note.title || 'Sin título',
      section: 'notas' as SectionKey,
      onExecute: withClose(() => {
        setSelectedNote(note)
        const nb = notebooks.find((n) => n.id === note.notebook_id)
        if (nb) setSelectedNotebook(nb)
        setCurrentView('notebooks')
        router.push('/dashboard')
      }),
    }))

    return [...acciones, ...irA, ...libretas, ...spacesItems, ...notasItems]
  }, [
    query,
    selectedNote,
    selectedNotebook,
    notebooks,
    spaces,
    searchResults,
    close,
    applyTheme,
    setCurrentView,
    setSelectedNotebook,
    setSelectedNote,
    setSelectedSpace,
    addNote,
    router,
  ])

  // Group by section in canonical order, drop empty sections
  const sections = useMemo(
    () =>
      SECTION_ORDER.map((key) => ({
        key,
        label: SECTION_LABELS[key],
        items: items.filter((i) => i.section === key),
      })).filter((s) => s.items.length > 0),
    [items]
  )

  // Reset active index when item count changes
  useEffect(() => {
    setActiveIndex(0)
  }, [items.length])

  // Scroll active item into view
  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    active?.scrollIntoView({ block: 'nearest', behavior: 'auto' })
  }, [activeIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, items.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      items[activeIndex]?.onExecute()
    }
  }

  if (!isCommandPaletteOpen && !showSaveTemplate) return null

  return (
    <>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50" role="presentation">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Centered panel — pointer-events-none on wrapper prevents backdrop click bubbling */}
          <div className="relative flex items-start justify-center pt-[15vh] px-4 h-full pointer-events-none">
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Paleta de comandos"
              className="w-full max-w-xl bg-panel border border-border rounded-2xl shadow-2xl overflow-hidden pointer-events-auto animate-palette-in"
              onKeyDown={handleKeyDown}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
                <Search size={16} className="text-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setActiveIndex(0)
                  }}
                  placeholder="Buscar o ejecutar un comando..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
                  style={{ color: 'var(--color-foreground)' }}
                  aria-label="Buscar o ejecutar un comando"
                />
                {query && (
                  <button
                    type="button"
                    title="Limpiar búsqueda"
                    onClick={() => {
                      setQuery('')
                      setActiveIndex(0)
                      inputRef.current?.focus()
                    }}
                    className="text-muted hover:text-foreground transition cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Items list */}
              <div ref={listRef} className="max-h-[400px] overflow-y-auto py-1">
                {sections.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-muted">
                    Sin resultados para &ldquo;{query}&rdquo;
                  </p>
                )}

                {sections.map(({ key, label, items: sectionItems }) => (
                  <div key={key}>
                    <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted/60 select-none">
                      {label}
                    </p>

                    {sectionItems.map((item) => {
                      const globalIdx = items.indexOf(item)
                      const isActive = globalIdx === activeIndex
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-active={isActive ? 'true' : undefined}
                          onClick={item.onExecute}
                          onMouseEnter={() => setActiveIndex(globalIdx)}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-accent/10 text-accent'
                              : 'text-foreground hover:bg-surface'
                          }`}
                        >
                          <span
                            className={`shrink-0 ${isActive ? 'text-accent' : 'text-muted'}`}
                          >
                            {item.icon}
                          </span>
                          <span className="flex-1 text-left truncate">{item.label}</span>
                          {item.shortcut && (
                            <kbd className="hidden sm:inline-flex text-[10px] font-mono text-muted/70 shrink-0 px-1.5 py-0.5 bg-surface border border-border rounded">
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-border flex items-center gap-4 text-[10px] text-muted/60 select-none">
                <span>↑↓ navegar</span>
                <span>↵ ejecutar</span>
                <span>Esc cerrar</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSaveTemplate && selectedNote && (
        <SaveAsTemplateModal
          content={selectedNote.content}
          defaultName={selectedNote.title !== 'Sin título' ? selectedNote.title : ''}
          onSaved={() => setShowSaveTemplate(false)}
          onClose={() => setShowSaveTemplate(false)}
        />
      )}
    </>
  )
}
