import { create } from 'zustand'
import { Notebook } from '@/types'

interface NotebookStore {
  notebooks: Notebook[]
  selectedNotebook: Notebook | null
  setNotebooks: (notebooks: Notebook[]) => void
  addNotebook: (notebook: Notebook) => void
  deleteNotebook: (id: string) => void
  setSelectedNotebook: (notebook: Notebook | null) => void
}

export const useNotebookStore = create<NotebookStore>((set) => ({
  notebooks: [],
  selectedNotebook: null,
  setNotebooks: (notebooks) => set({ notebooks }),
  addNotebook: (notebook) =>
    set((state) => ({ notebooks: [...state.notebooks, notebook] })),
  deleteNotebook: (id) =>
    set((state) => ({
      notebooks: state.notebooks.filter((n) => n.id !== id),
    })),
  setSelectedNotebook: (notebook) => set({ selectedNotebook: notebook }),
}))
