import { create } from 'zustand'
import type { Space } from '@/types'

interface SpaceStore {
  spaces: Space[]
  selectedSpace: Space | null
  isLoading: boolean

  setSpaces: (spaces: Space[]) => void
  addSpace: (space: Space) => void
  updateSpace: (space: Space) => void
  removeSpace: (spaceId: string) => void
  setSelectedSpace: (space: Space | null) => void
  setLoading: (loading: boolean) => void
}

export const useSpaceStore = create<SpaceStore>((set) => ({
  spaces: [],
  selectedSpace: null,
  isLoading: false,

  setSpaces: (spaces) => set({ spaces }),
  addSpace: (space) => set((s) => ({ spaces: [space, ...s.spaces] })),
  updateSpace: (space) =>
    set((s) => ({
      spaces: s.spaces.map((sp) => (sp.id === space.id ? space : sp)),
      selectedSpace: s.selectedSpace?.id === space.id ? space : s.selectedSpace,
    })),
  removeSpace: (spaceId) =>
    set((s) => ({
      spaces: s.spaces.filter((sp) => sp.id !== spaceId),
      selectedSpace: s.selectedSpace?.id === spaceId ? null : s.selectedSpace,
    })),
  setSelectedSpace: (space) => set({ selectedSpace: space }),
  setLoading: (loading) => set({ isLoading: loading }),
}))
