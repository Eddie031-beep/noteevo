import { create } from 'zustand'

type View =
  | 'home' | 'notebooks' | 'all-notes' | 'favorites' | 'trash'
  | 'search' | 'advanced-search' | 'tags-view' | 'notebooks-view' | 'tasks' | 'files'
  | 'calendar' | 'spaces' | 'shared' | 'settings' | 'templates' | 'ai-assistant'

export type Theme = 'dark' | 'light' | 'system'

interface UIStore {
  currentView: View
  setCurrentView: (view: View) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  isFocusMode: boolean
  setFocusMode: (v: boolean) => void
  isTypewriterMode: boolean
  toggleTypewriterMode: () => void
  isNoteListCollapsed: boolean
  setNoteListCollapsed: (v: boolean) => void
  isSidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
  toggleSidebarCollapsed: () => void
  isCheatsheetOpen: boolean
  setCheatsheetOpen: (v: boolean) => void
  isCommandPaletteOpen: boolean
  setCommandPaletteOpen: (v: boolean) => void
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
  isTypewriterMode: false,
  toggleTypewriterMode: () => set((s) => ({ isTypewriterMode: !s.isTypewriterMode })),
  isNoteListCollapsed: false,
  setNoteListCollapsed: (v) => set({ isNoteListCollapsed: v }),
  isSidebarCollapsed: false,
  setSidebarCollapsed: (v) => set({ isSidebarCollapsed: v }),
  toggleSidebarCollapsed: () => set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
  isCheatsheetOpen: false,
  setCheatsheetOpen: (v) => set({ isCheatsheetOpen: v }),
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (v) => set({ isCommandPaletteOpen: v }),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}))
