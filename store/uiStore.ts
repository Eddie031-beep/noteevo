import { create } from 'zustand'

type View = 'notebooks' | 'favorites' | 'trash' | 'search'

interface UIStore {
  currentView: View
  setCurrentView: (view: View) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useUIStore = create<UIStore>((set) => ({
  currentView: 'notebooks',
  setCurrentView: (view) => set({ currentView: view }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
