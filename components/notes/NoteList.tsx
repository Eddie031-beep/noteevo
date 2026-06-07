'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import {
  Plus, Star, PanelLeftClose, Pin,
  ArrowUpDown, LayoutList, LayoutGrid, Check, MoreHorizontal,
} from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useUIStore } from '@/store/uiStore'
import { extractTextPreview } from '@/lib/utils/tiptap'
import { togglePin, updateNoteColor, trashNote } from '@/lib/supabase/notes'
import { NOTE_COLORS, isNoteColor, type NoteColor } from '@/lib/constants/colors'
import NotePopoverMenu from './NotePopoverMenu'
import MoveNoteModal from './MoveNoteModal'
import type { Note } from '@/types'

type SortOption = 'updated_at_desc' | 'created_at_desc' | 'title_asc' | 'size_desc'
type ViewMode = 'list' | 'grid'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'updated_at_desc', label: 'Última edición' },
  { value: 'created_at_desc', label: 'Fecha de creación' },
  { value: 'title_asc', label: 'Título A-Z' },
  { value: 'size_desc', label: 'Más largas' },
]

function isSortOption(value: string | null): value is SortOption {
  return SORT_OPTIONS.some((o) => o.value === value)
}

function sortNotes(notes: Note[], sort: SortOption): Note[] {
  const arr = [...notes]
  arr.sort((a, b) => {
    if (sort === 'title_asc') return (a.title || '').localeCompare(b.title || '', 'es')
    if (sort === 'size_desc') {
      return JSON.stringify(b.content).length - JSON.stringify(a.content).length
    }
    if (sort === 'created_at_desc') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  })
  return arr
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface SortDropdownProps {
  sort: SortOption
  onChange: (sort: SortOption) => void
}

function SortDropdown({ sort, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title="Ordenar notas"
        onClick={() => setOpen((v) => !v)}
        className={[
          'flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] transition-all duration-150 cursor-pointer',
          open
            ? 'bg-surface text-foreground'
            : 'text-muted hover:bg-surface hover:text-foreground',
        ].join(' ')}
      >
        <ArrowUpDown size={12} />
        <span className="truncate max-w-[110px]">
          {SORT_OPTIONS.find((o) => o.value === sort)?.label}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-8 z-50 bg-panel border border-border rounded-xl shadow-2xl w-48 py-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
            >
              {opt.label}
              {sort === opt.value && <Check size={13} className="text-accent shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface NoteCardProps {
  note: Note
  isSelected: boolean
  onSelect: () => void
  onTogglePin: () => void
  onMenuClick: (e: React.MouseEvent) => void
  index: number
  view: ViewMode
}

function NoteCard({ note, isSelected, onSelect, onTogglePin, onMenuClick, index, view }: NoteCardProps) {
  const preview = extractTextPreview(note.content, view === 'grid' ? 140 : 80)
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: note.id,
    data: { type: 'note', noteId: note.id, currentNotebookId: note.notebook_id },
  })

  const colorHex = isNoteColor(note.color) ? NOTE_COLORS[note.color] : null

  const pinButton = (
    <button
      type="button"
      title={note.is_pinned ? 'Desanclar nota' : 'Anclar nota'}
      onClick={(e) => {
        e.stopPropagation()
        onTogglePin()
      }}
      className={[
        'absolute top-2 right-2 z-10 p-1 rounded-md transition-all duration-150 cursor-pointer',
        note.is_pinned
          ? 'text-accent opacity-100'
          : 'text-muted opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-surface',
      ].join(' ')}
    >
      <Pin size={12} className={note.is_pinned ? 'fill-accent' : ''} />
    </button>
  )

  const menuButton = (
    <button
      type="button"
      title="Más opciones"
      onClick={onMenuClick}
      className="absolute top-2 right-9 z-10 p-1 rounded-md text-muted opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-surface transition-all duration-150 cursor-pointer"
    >
      <MoreHorizontal size={14} />
    </button>
  )

  if (view === 'grid') {
    return (
      <div
        className="note-card-enter relative group"
        style={{
          animationDelay: `${index * 35}ms`,
          animationFillMode: 'both',
          opacity: isDragging ? 0.4 : 1,
        }}
      >
        <button
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          type="button"
          data-testid="note-card"
          onClick={onSelect}
          className={[
            'w-full h-full text-left p-3 rounded-lg flex flex-col gap-1.5 cursor-pointer',
            'border transition-all duration-200 ease-out',
            isSelected
              ? 'bg-foreground/5 border-accent/60'
              : 'border-border/40 hover:bg-foreground/[0.03] hover:border-accent/30',
          ].join(' ')}
        >
          {(note.cover_url || note.cover_gradient) && (
            <div
              className="-mx-3 -mt-3 mb-1 h-[60px] rounded-t-lg bg-cover bg-center"
              style={
                note.cover_url
                  ? { backgroundImage: `url(${note.cover_url})` }
                  : { background: note.cover_gradient ?? undefined }
              }
            />
          )}
          {note.emoji && (
            <span className="block text-2xl leading-none mb-0.5">{note.emoji}</span>
          )}
          <p
            className={[
              'text-sm font-medium leading-snug truncate pr-14 transition-colors duration-150',
              isSelected ? 'text-foreground' : 'text-foreground/85 group-hover:text-foreground',
            ].join(' ')}
          >
            {note.title || 'Sin título'}
          </p>
          {preview && (
            <p className="text-xs text-muted line-clamp-3 leading-relaxed flex-1">
              {preview}
            </p>
          )}
          <div className="flex items-center justify-between mt-auto pt-1">
            <span className="text-[10px] text-subtle tabular-nums">
              {formatDate(note.updated_at)}
            </span>
            {note.is_favorite && (
              <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />
            )}
          </div>
        </button>
        {pinButton}
        {menuButton}
      </div>
    )
  }

  return (
    <div
      className="note-card-enter relative group"
      style={{
        animationDelay: `${index * 35}ms`,
        animationFillMode: 'both',
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <button
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        type="button"
        data-testid="note-card"
        onClick={onSelect}
        style={
          colorHex
            ? { borderLeftColor: colorHex, borderLeftWidth: '3px', borderLeftStyle: 'solid' }
            : undefined
        }
        className={[
          'w-full text-left px-4 py-3 relative',
          'border-b border-border/30',
          'transition-all duration-200 ease-out cursor-pointer',
          'border-l-2',
          colorHex
            ? isSelected
              ? 'bg-foreground/5'
              : 'hover:bg-foreground/[0.03]'
            : isSelected
              ? 'bg-foreground/5 border-l-accent'
              : 'border-l-transparent hover:bg-foreground/[0.03] hover:border-l-accent/30',
        ].join(' ')}
      >
        {/* Title */}
        <p
          className={[
            'text-sm font-medium leading-snug truncate pr-14 transition-colors duration-150',
            isSelected ? 'text-foreground' : 'text-foreground/85 group-hover:text-foreground',
          ].join(' ')}
        >
          {note.emoji && <span className="text-base mr-1.5 align-middle">{note.emoji}</span>}
          {note.title || 'Sin título'}
        </p>

        {/* Preview */}
        {preview && (
          <p className="text-xs text-muted mt-0.5 line-clamp-2 leading-relaxed">
            {preview}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-subtle tabular-nums">
            {formatDate(note.updated_at)}
          </span>
          {note.is_favorite && (
            <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />
          )}
        </div>
      </button>
      {pinButton}
      {menuButton}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-subtle">
      {children}
    </p>
  )
}

export default function NoteList() {
  const { notes, selectedNote, setSelectedNote, createNote, fetchNotes, updateNote, deleteNote } =
    useNoteStore()
  const { selectedNotebook } = useNotebookStore()
  const { setNoteListCollapsed } = useUIStore()

  const notebookKey = selectedNotebook?.id ?? 'all'
  const [view, setView] = useState<ViewMode>('list')
  const [sort, setSort] = useState<SortOption>('updated_at_desc')
  const [colorFilter, setColorFilter] = useState<NoteColor | null>(null)
  const [popoverState, setPopoverState] = useState<{ noteId: string; anchorRect: DOMRect } | null>(
    null
  )
  const [moveNote, setMoveNote] = useState<Note | null>(null)

  useEffect(() => {
    if (selectedNotebook?.id) {
      fetchNotes(selectedNotebook.id)
    }
  }, [selectedNotebook?.id, fetchNotes])

  // Cargar preferencia de vista (una vez, tras montar — evita mismatch de hidratación)
  useEffect(() => {
    const stored = localStorage.getItem('noteevo-notes-view')
    if (stored === 'grid' || stored === 'list') setView(stored)
  }, [])

  // Cargar preferencia de orden por libreta
  useEffect(() => {
    const stored = localStorage.getItem(`noteevo-sort-${notebookKey}`)
    setSort(isSortOption(stored) ? stored : 'updated_at_desc')
    setColorFilter(null) // limpiar filtro de color al cambiar de libreta
  }, [notebookKey])

  const changeView = (next: ViewMode) => {
    setView(next)
    localStorage.setItem('noteevo-notes-view', next)
  }

  const changeSort = (next: SortOption) => {
    setSort(next)
    localStorage.setItem(`noteevo-sort-${notebookKey}`, next)
  }

  const handleTogglePin = async (note: Note) => {
    const newVal = !note.is_pinned
    updateNote(note.id, { is_pinned: newVal })
    try {
      await togglePin(note.id, newVal)
    } catch {
      updateNote(note.id, { is_pinned: !newVal })
    }
  }

  const handleMenuClick = (e: React.MouseEvent, note: Note) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setPopoverState({ noteId: note.id, anchorRect: rect })
  }

  const handleColorChange = async (note: Note, color: NoteColor | null) => {
    const prev = note.color ?? null
    updateNote(note.id, { color }) // optimista
    try {
      await updateNoteColor(note.id, color)
    } catch {
      updateNote(note.id, { color: prev }) // rollback
    }
  }

  const handleDelete = async (note: Note) => {
    deleteNote(note.id) // optimista: lo quita de la lista
    try {
      await trashNote(note.id)
    } catch {
      // rollback: recargar la libreta para restaurar el estado real
      if (selectedNotebook?.id) fetchNotes(selectedNotebook.id)
    }
  }

  const popoverNote = popoverState
    ? notes.find((n) => n.id === popoverState.noteId) ?? null
    : null

  const sorted = useMemo(() => sortNotes(notes, sort), [notes, sort])
  const visible = useMemo(
    () => (colorFilter ? sorted.filter((n) => n.color === colorFilter) : sorted),
    [sorted, colorFilter]
  )
  const pinned = useMemo(() => visible.filter((n) => n.is_pinned), [visible])
  const rest = useMemo(() => visible.filter((n) => !n.is_pinned), [visible])

  // Colores realmente en uso entre las notas actuales (para el filtro del header)
  const usedColors = useMemo(() => {
    const present = new Set(notes.map((n) => n.color).filter(isNoteColor))
    return (Object.keys(NOTE_COLORS) as NoteColor[]).filter((c) => present.has(c))
  }, [notes])

  const renderCards = (arr: Note[], startIndex: number) =>
    arr.map((note, i) => (
      <NoteCard
        key={note.id}
        note={note}
        view={view}
        isSelected={selectedNote?.id === note.id}
        onSelect={() => setSelectedNote(note)}
        onTogglePin={() => handleTogglePin(note)}
        onMenuClick={(e) => handleMenuClick(e, note)}
        index={startIndex + i}
      />
    ))

  const gridWrap = (children: React.ReactNode) => (
    <div className="grid grid-cols-2 gap-2 p-2">{children}</div>
  )

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground truncate">
            {selectedNotebook?.name ?? 'Notas'}
          </h2>
          <p className="text-[11px] text-subtle">
            {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
          </p>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          {selectedNotebook && (
            <button
              type="button"
              title="Nueva nota"
              data-testid="new-note-btn"
              onClick={() => createNote(selectedNotebook.id)}
              className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-foreground transition-all duration-150 active:scale-90 cursor-pointer"
            >
              <Plus size={14} />
            </button>
          )}
          <button
            type="button"
            title="Ocultar panel"
            onClick={() => setNoteListCollapsed(true)}
            className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-foreground transition-all duration-150 active:scale-90 cursor-pointer"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>
      </div>

      {/* Controls: sort + view toggle */}
      {notes.length > 0 && (
        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-border/60 shrink-0">
          <SortDropdown sort={sort} onChange={changeSort} />

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              title="Vista de lista"
              onClick={() => changeView('list')}
              className={[
                'p-1.5 rounded-md transition-all duration-150 cursor-pointer',
                view === 'list'
                  ? 'bg-surface text-foreground'
                  : 'text-muted hover:bg-surface hover:text-foreground',
              ].join(' ')}
            >
              <LayoutList size={14} />
            </button>
            <button
              type="button"
              title="Vista de galería"
              onClick={() => changeView('grid')}
              className={[
                'p-1.5 rounded-md transition-all duration-150 cursor-pointer',
                view === 'grid'
                  ? 'bg-surface text-foreground'
                  : 'text-muted hover:bg-surface hover:text-foreground',
              ].join(' ')}
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Filtro por color */}
      {usedColors.length > 0 && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-border/60 shrink-0 overflow-x-auto scrollbar-thin">
          <button
            type="button"
            onClick={() => setColorFilter(null)}
            className={[
              'text-[11px] px-2 py-0.5 rounded-md transition cursor-pointer whitespace-nowrap shrink-0',
              colorFilter === null
                ? 'bg-surface text-foreground'
                : 'text-muted hover:text-foreground',
            ].join(' ')}
          >
            Todos
          </button>
          {usedColors.map((c) => (
            <button
              key={c}
              type="button"
              title={c}
              onClick={() => setColorFilter(c)}
              className={[
                'shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition cursor-pointer',
                colorFilter === c ? 'bg-surface ring-1 ring-border' : 'hover:bg-surface',
              ].join(' ')}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: NOTE_COLORS[c] }} />
            </button>
          ))}
          {colorFilter && (
            <button
              type="button"
              onClick={() => setColorFilter(null)}
              className="text-[11px] text-muted hover:text-foreground ml-auto whitespace-nowrap shrink-0 cursor-pointer"
            >
              Limpiar filtro
            </button>
          )}
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center">
            <p className="text-sm text-subtle">Sin notas aquí</p>
            {selectedNotebook && (
              <button
                type="button"
                onClick={() => createNote(selectedNotebook.id)}
                className="text-xs text-accent hover:text-accent/80 transition cursor-pointer underline-offset-2 hover:underline"
              >
                Crear nota
              </button>
            )}
          </div>
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 px-6 text-center">
            <p className="text-sm text-subtle">Sin notas de este color</p>
            <button
              type="button"
              onClick={() => setColorFilter(null)}
              className="text-xs text-accent hover:text-accent/80 transition cursor-pointer"
            >
              Limpiar filtro
            </button>
          </div>
        ) : (
          <>
            {pinned.length > 0 && (
              <>
                <SectionLabel>Ancladas</SectionLabel>
                {view === 'grid' ? gridWrap(renderCards(pinned, 0)) : renderCards(pinned, 0)}
                {rest.length > 0 && <SectionLabel>Otras</SectionLabel>}
              </>
            )}
            {view === 'grid'
              ? gridWrap(renderCards(rest, pinned.length))
              : renderCards(rest, pinned.length)}
          </>
        )}
      </div>

      {popoverState && popoverNote && (
        <NotePopoverMenu
          note={popoverNote}
          anchorRect={popoverState.anchorRect}
          onClose={() => setPopoverState(null)}
          onColorChange={(color) => {
            handleColorChange(popoverNote, color)
            setPopoverState(null)
          }}
          onPinToggle={() => {
            handleTogglePin(popoverNote)
            setPopoverState(null)
          }}
          onMove={() => {
            setMoveNote(popoverNote)
            setPopoverState(null)
          }}
          onDelete={() => {
            handleDelete(popoverNote)
            setPopoverState(null)
          }}
        />
      )}

      {moveNote && (
        <MoveNoteModal
          note={moveNote}
          onMoved={() => {
            if (selectedNotebook?.id) fetchNotes(selectedNotebook.id)
          }}
          onClose={() => setMoveNote(null)}
        />
      )}
    </div>
  )
}
