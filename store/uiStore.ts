import { create } from 'zustand'

type View = 'home' | 'notebooks' | 'all-notes' | 'favorites' | 'trash' | 'search' | 'tags-view' | 'notebooks-view' | 'tasks' | 'files' | 'calendar' | 'spaces' | 'shared'

interface UIStore {
  currentView: View
  setCurrentView: (view: View) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  currentView: 'home',
  setCurrentView: (view) => set({ currentView: view }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
