'use client'

import { useState, useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import NoteList from '@/components/notes/NoteList'
import NoteEditor from '@/components/editor/NoteEditor'
import FavoriteNotes from '@/components/notes/FavoriteNotes'
import TrashNotes from '@/components/notes/TrashNotes'
import SearchResults from '@/components/notes/SearchResults'
import AdvancedSearchPanel from '@/components/notes/AdvancedSearchPanel'
import TaskList from '@/components/tasks/TaskList'
import FilesView from '@/components/files/FilesView'
import CalendarView from '@/components/calendar/CalendarView'
import SpacesView from '@/components/spaces/SpacesView'
import SharedWithMeView from '@/components/spaces/SharedWithMeView'
import TemplatesView from '@/components/templates/TemplatesView'
import TagsView from '@/components/tags/TagsView'
import AiAssistantView from '@/components/ai/AiAssistantView'
import HomeView from '@/components/home/HomeView'
import { AnimatePresence, motion } from 'motion/react'
import { durations, easeOut } from '@/lib/motion/tokens'
import { getAllNotesWithNotebook, createQuickNote, type NoteWithNotebook } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { BookOpen, FileText, Plus } from 'lucide-react'

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
  const { currentView, isFocusMode, isNoteListCollapsed } = useUIStore()

  const showHome = currentView === 'home'
  const showAllNotes = currentView === 'all-notes'
  const showNoteList =
    currentView === 'notebooks' || currentView === 'notebooks-view'
  const showFavorites = currentView === 'favorites'
  const showTrash = currentView === 'trash'
  const showSearch = currentView === 'search'
  const showAdvancedSearch = currentView === 'advanced-search'
  const showTags = currentView === 'tags-view'
  const showTasks = currentView === 'tasks'
  const showFiles = currentView === 'files'
  const showCalendar = currentView === 'calendar'
  const showSpaces = currentView === 'spaces'
  const showShared = currentView === 'shared'
  const showTemplates = currentView === 'templates'
  const showAiAssistant = currentView === 'ai-assistant'

  const showEditor = !showHome && !showAdvancedSearch && !showTags && !showTasks && !showFiles && !showCalendar && !showSpaces && !showShared && !showTemplates && !showAiAssistant

  return (
    <div className="flex h-full bg-background">
      {/* Transición de vista (DESIGN.md Fase C): fundido corto al cambiar currentView */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: durations.base, ease: easeOut }}
          className="flex h-full flex-1 min-w-0"
        >
      {!isFocusMode && (
        <>
          {showHome && <HomeView />}

          {/* Paneles de lista de notas — colapsables con animación */}
          {(showAllNotes || showNoteList || showFavorites || showTrash || showSearch) && (
            <div
              className="shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
              style={{ width: isNoteListCollapsed ? 0 : 288 }}
            >
              {showAllNotes && <AllNotesView />}
              {showNoteList && <NoteList />}
              {showFavorites && <FavoriteNotes />}
              {showTrash && <TrashNotes />}
              {showSearch && <SearchResults />}
            </div>
          )}

          {showAdvancedSearch && <AdvancedSearchPanel />}
          {showTags && <TagsView />}
          {showTasks && <TaskList />}
          {showFiles && <FilesView />}
          {showCalendar && <CalendarView />}
          {showSpaces && <SpacesView />}
          {showShared && <SharedWithMeView />}
          {showTemplates && <TemplatesView />}
          {showAiAssistant && <AiAssistantView />}
        </>
      )}
      {showEditor && <NoteEditor />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
