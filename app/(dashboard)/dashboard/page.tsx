'use client'

import { useUIStore } from '@/store/uiStore'
import NoteList from '@/components/notes/NoteList'
import NoteEditor from '@/components/editor/NoteEditor'
import FavoriteNotes from '@/components/notes/FavoriteNotes'
import TrashNotes from '@/components/notes/TrashNotes'
import SearchResults from '@/components/notes/SearchResults'

export default function DashboardPage() {
  const { currentView } = useUIStore()

  return (
    <div className="flex h-full">
      {currentView === 'notebooks' && <NoteList />}
      {currentView === 'favorites' && <FavoriteNotes />}
      {currentView === 'trash' && <TrashNotes />}
      {currentView === 'search' && <SearchResults />}
      <NoteEditor />
    </div>
  )
}
