import { create } from 'zustand'
import { Note } from '@/types'
import { getNotesByNotebook, createNote as createNoteApi } from '@/lib/supabase/notes'

interface NoteStore {
  notes: Note[]
  selectedNote: Note | null
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  setSelectedNote: (note: Note | null) => void
  fetchNotes: (notebookId: string) => Promise<void>
  createNote: (notebookId: string) => Promise<void>
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
  fetchNotes: async (notebookId) => {
    try {
      const data = await getNotesByNotebook(notebookId)
      set({ notes: data })
    } catch {
      // error cargando notas
    }
  },
  createNote: async (notebookId) => {
    try {
      const note = await createNoteApi(notebookId)
      set((state) => ({ notes: [note, ...state.notes], selectedNote: note }))
    } catch {
      // error creando nota
    }
  },
}))
