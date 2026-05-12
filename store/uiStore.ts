import { create } from 'zustand'

type View = 'notebooks' | 'favorites' | 'trash'

interface UIStore {
  currentView: View
  setCurrentView: (view: View) => void
}

export const useUIStore = create<UIStore>((set) => ({
  currentView: 'notebooks',
  setCurrentView: (view) => set({ currentView: view }),
}))
