'use client'

import { useUIStore } from '@/store/uiStore'
import { useNotebookStore } from '@/store/notebookStore'
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
import { BookOpen, FileText, Tag } from 'lucide-react'

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

function AllNotesPlaceholder() {
  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col items-center justify-center shrink-0">
      <FileText size={32} className="text-subtle mb-3" />
      <p className="text-sm text-foreground font-medium">Todas las notas</p>
      <p className="text-xs text-muted mt-1">Próximamente</p>
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

  const showEditor = !showHome && !showTags && !showTasks && !showFiles && !showCalendar && !showSpaces && !showShared

  return (
    <div className="flex h-full bg-background">
      {!isFocusMode && (
        <>
          {showHome && <HomePanel />}
          {showAllNotes && <AllNotesPlaceholder />}
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
        </>
      )}
      {showEditor && <NoteEditor />}
    </div>
  )
}
