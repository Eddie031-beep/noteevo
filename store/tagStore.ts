import { create } from 'zustand'
import type { Tag } from '@/types'

interface TagStore {
  tags: Tag[]
  setTags: (tags: Tag[]) => void
  addTag: (tag: Tag) => void
  removeTag: (id: string) => void
  updateTag: (id: string, name: string) => void
}

export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
  addTag: (tag) =>
    set((state) => ({
      tags: [...state.tags, tag].sort((a, b) => a.name.localeCompare(b.name)),
    })),
  removeTag: (id) =>
    set((state) => ({ tags: state.tags.filter((t) => t.id !== id) })),
  updateTag: (id, name) =>
    set((state) => ({
      tags: state.tags
        .map((t) => (t.id === id ? { ...t, name } : t))
        .sort((a, b) => a.name.localeCompare(b.name)),
    })),
}))
