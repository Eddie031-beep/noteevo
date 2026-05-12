import { create } from 'zustand'
import { Note } from '@/types'

interface NoteStore {
  notes: Note[]
  selectedNote: Note | null
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  setSelectedNote: (note: Note | null) => void
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  selectedNote: null,
  setNotes: (notes) => set({ notes }),
  addNote: (note) =>
    set((state) => ({ notes: [note, ...state.notes] })),
  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
      selectedNote:
        state.selectedNote?.id === id
          ? { ...state.selectedNote, ...updates }
          : state.selectedNote,
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      selectedNote: state.selectedNote?.id === id ? null : state.selectedNote,
    })),
  setSelectedNote: (note) => set({ selectedNote: note }),
}))
