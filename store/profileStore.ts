import { create } from 'zustand'
import type { UserProfile } from '@/types'
import { updateProfile } from '@/lib/supabase/profile'
import {
  DEFAULT_EDITOR_FONT,
  DEFAULT_EDITOR_FONT_SIZE,
  DEFAULT_EDITOR_LINE_HEIGHT,
} from '@/lib/constants/editor-fonts'

interface ProfileStore {
  profile: UserProfile | null
  // Tipografía del editor (Phase 17 id:61). Estado vivo: el editor lo lee de aquí
  // y se actualiza al instante cuando ajustes llama a un setter.
  editorFontFamily: string
  editorFontSize: number
  editorLineHeight: number
  setProfile: (profile: UserProfile | null) => void
  setEditorFontFamily: (value: string) => Promise<void>
  setEditorFontSize: (value: number) => Promise<void>
  setEditorLineHeight: (value: number) => Promise<void>
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  editorFontFamily: DEFAULT_EDITOR_FONT,
  editorFontSize: DEFAULT_EDITOR_FONT_SIZE,
  editorLineHeight: DEFAULT_EDITOR_LINE_HEIGHT,

  setProfile: (profile) =>
    set({
      profile,
      editorFontFamily: profile?.editor_font_family ?? DEFAULT_EDITOR_FONT,
      editorFontSize: profile?.editor_font_size ?? DEFAULT_EDITOR_FONT_SIZE,
      editorLineHeight: profile?.editor_line_height ?? DEFAULT_EDITOR_LINE_HEIGHT,
    }),

  setEditorFontFamily: async (value) => {
    const prev = get().editorFontFamily
    set({ editorFontFamily: value }) // optimista: refleja en vivo
    try {
      const updated = await updateProfile({ editor_font_family: value })
      set({ profile: updated })
    } catch (err) {
      set({ editorFontFamily: prev }) // revertir
      throw new Error(err instanceof Error ? err.message : 'Error al guardar la fuente del editor')
    }
  },

  setEditorFontSize: async (value) => {
    const prev = get().editorFontSize
    set({ editorFontSize: value })
    try {
      const updated = await updateProfile({ editor_font_size: value })
      set({ profile: updated })
    } catch (err) {
      set({ editorFontSize: prev })
      throw new Error(err instanceof Error ? err.message : 'Error al guardar el tamaño de texto')
    }
  },

  setEditorLineHeight: async (value) => {
    const prev = get().editorLineHeight
    set({ editorLineHeight: value })
    try {
      const updated = await updateProfile({ editor_line_height: value })
      set({ profile: updated })
    } catch (err) {
      set({ editorLineHeight: prev })
      throw new Error(err instanceof Error ? err.message : 'Error al guardar el interlineado')
    }
  },
}))
