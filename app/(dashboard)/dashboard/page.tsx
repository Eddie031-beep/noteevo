'use client'

import { useState, useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useTagStore } from '@/store/tagStore'
import NoteList from '@/components/notes/NoteList'
import NoteEditor from '@/components/editor/NoteEditor'
import FavoriteNotes from '@/components/notes/FavoriteNotes'
import TrashNotes from '@/components/notes/TrashNotes'
import SearchResults from '@/components/notes/SearchResults'
import TaskList from '@/components/tasks/TaskList'
import FilesView from '@/components/files/FilesView'
import CalendarView from '@/components/calendar/CalendarView'
import SpacesView from '@/components/spaces/SpacesView'
import SharedWithMeView from '@/components/spaces/SharedWithMeView'
import TemplatesView from '@/components/templates/TemplatesView'
import { getAllNotesWithNotebook, createQuickNote, type NoteWithNotebook } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { BookOpen, FileText, Tag, Plus } from 'lucide-react'

function HomePanel() {
  const { notebooks } = useNotebookStore()
  const { setCurrentView } = useUIStore()
  const { setSelectedNotebook } = useNotebookStore()

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches'

  const handleNotebookClick = (notebook: (typeof notebooks)[number]) => {
    setSelectedNotebook(notebook)
    setCurrentView('notebooks')
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-2xl mx-auto px-10 py-12 flex flex-col gap-8">
        {/* Greeting */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground">{greeting}</h1>
          <p className="text-muted text-sm mt-1">Tu espacio para pensar y crear</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Libretas', value: notebooks.length, icon: <BookOpen size={18} /> },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="bg-panel border border-border rounded-xl p-4 flex flex-col gap-2"
            >
              <span className="text-muted">{icon}</span>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted">{label}</p>
            </div>
          ))}
        </div>

        {/* Notebooks grid */}
        {notebooks.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
              Libretas recientes
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {notebooks.slice(0, 6).map((nb) => (
                <button
                  key={nb.id}
                  type="button"
                  onClick={() => handleNotebookClick(nb)}
                  className="flex items-center gap-3 p-4 bg-panel border border-border rounded-xl hover:border-accent/40 hover:bg-surface transition cursor-pointer text-left"
                >
                  <div className="w-8 h-8 bg-accent/15 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen size={15} className="text-accent" />
                  </div>
                  <span className="text-sm text-foreground font-medium truncate">
                    {nb.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {notebooks.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="w-16 h-16 bg-panel border border-border rounded-2xl flex items-center justify-center">
              <FileText size={28} className="text-subtle" />
            </div>
            <div>
              <p className="text-foreground font-medium">Aún no tienes libretas</p>
              <p className="text-muted text-sm mt-1">
                Crea una libreta desde el sidebar para empezar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TagsPanel() {
  const { tags } = useTagStore()

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Etiquetas</h2>
        <p className="text-xs text-muted mt-0.5">
          {tags.length} etiqueta{tags.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20"
              >
                <Tag size={11} />
                {tag.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <Tag size={28} className="text-subtle" />
            <p className="text-sm text-muted">Sin etiquetas aún</p>
          </div>
        )}
      </div>
    </div>
  )
}

function AllNotesView() {
  const [notes, setNotes] = useState<NoteWithNotebook[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const { setSelectedNote, selectedNote, addNote } = useNoteStore()
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { setCurrentView } = useUIStore()

  useEffect(() => {
    getAllNotesWithNotebook()
      .then(setNotes)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (notebooks.length === 0) return
    setCreating(true)
    try {
      const note = await createQuickNote(notebooks[0].id)
      addNote(note)
      setSelectedNote(note)
      setSelectedNotebook(notebooks[0])
      setCurrentView('notebooks')
    } catch {
      // error
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      {/* Header */}
      <div className="h-14 px-4 border-b border-border flex items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold text-foreground text-sm">Notas</h2>
          {!loading && (
            <p className="text-xs text-muted">
              {notes.length} nota{notes.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <button
          type="button"
          title="Nueva nota"
          onClick={handleCreate}
          disabled={creating || notebooks.length === 0}
          className="p-1.5 text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition cursor-pointer shrink-0 disabled:opacity-40"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-muted text-center mt-8">Cargando...</p>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 px-4 text-center">
            <FileText size={32} className="text-subtle" />
            <p className="text-sm text-muted">Sin notas aún</p>
            {notebooks.length > 0 && (
              <button
                type="button"
                onClick={handleCreate}
                className="text-sm text-accent hover:text-accent-light transition cursor-pointer"
              >
                Crear primera nota
              </button>
            )}
          </div>
        ) : (
          notes.map((note) => (
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
              {note.notebooks?.name && (
                <p className="text-[10px] text-accent mt-0.5 flex items-center gap-1">
                  <BookOpen size={9} />
                  {note.notebooks.name}
                </p>
              )}
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

export default function DashboardPage() {
  const { currentView, isFocusMode } = useUIStore()

  const showHome = currentView === 'home'
  const showAllNotes = currentView === 'all-notes'
  const showNoteList =
    currentView === 'notebooks' || currentView === 'notebooks-view'
  const showFavorites = currentView === 'favorites'
  const showTrash = currentView === 'trash'
  const showSearch = currentView === 'search'
  const showTags = currentView === 'tags-view'
  const showTasks = currentView === 'tasks'
  const showFiles = currentView === 'files'
  const showCalendar = currentView === 'calendar'
  const showSpaces = currentView === 'spaces'
  const showShared = currentView === 'shared'
  const showTemplates = currentView === 'templates'

  const showEditor = !showHome && !showTags && !showTasks && !showFiles && !showCalendar && !showSpaces && !showShared && !showTemplates

  return (
    <div className="flex h-full bg-background">
      {!isFocusMode && (
        <>
          {showHome && <HomePanel />}
          {showAllNotes && <AllNotesView />}
          {showNoteList && <NoteList />}
          {showFavorites && <FavoriteNotes />}
          {showTrash && <TrashNotes />}
          {showSearch && <SearchResults />}
          {showTags && <TagsPanel />}
          {showTasks && <TaskList />}
          {showFiles && <FilesView />}
          {showCalendar && <CalendarView />}
          {showSpaces && <SpacesView />}
          {showShared && <SharedWithMeView />}
          {showTemplates && <TemplatesView />}
        </>
      )}
      {showEditor && <NoteEditor />}
    </div>
  )
}
