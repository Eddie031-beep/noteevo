'use client'

import { useUIStore } from '@/store/uiStore'
import NoteList from '@/components/notes/NoteList'
import NoteEditor from '@/components/editor/NoteEditor'
import FavoriteNotes from '@/components/notes/FavoriteNotes'
import TrashNotes from '@/components/notes/TrashNotes'

export default function DashboardContent() {
  const { currentView } = useUIStore()

  if (currentView === 'favorites') {
    return (
      <div className="flex h-full">
        <FavoriteNotes />
        <NoteEditor />
      </div>
    )
  }

  if (currentView === 'trash') {
    return (
      <div className="flex h-full">
        <TrashNotes />
        <NoteEditor />
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <NoteList />
      <NoteEditor />
    </div>
  )
}
