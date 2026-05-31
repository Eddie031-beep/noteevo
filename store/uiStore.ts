import { create } from 'zustand'

type View =
  | 'home' | 'notebooks' | 'all-notes' | 'favorites' | 'trash'
  | 'search' | 'advanced-search' | 'tags-view' | 'notebooks-view' | 'tasks' | 'files'
  | 'calendar' | 'spaces' | 'shared' | 'settings' | 'templates'

export type Theme = 'dark' | 'light' | 'system'

interface UIStore {
  currentView: View
  setCurrentView: (view: View) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  isFocusMode: boolean
  setFocusMode: (v: boolean) => void
  isCheatsheetOpen: boolean
  setCheatsheetOpen: (v: boolean) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useUIStore = create<UIStore>((set) => ({
  currentView: 'home',
  setCurrentView: (view) => set({ currentView: view }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isFocusMode: false,
  setFocusMode: (v) => set({ isFocusMode: v }),
  isCheatsheetOpen: false,
  setCheatsheetOpen: (v) => set({ isCheatsheetOpen: v }),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}))
