import { createClient } from './client'
import { Note } from '@/types'

export async function getNotesByNotebook(notebookId: string): Promise<Note[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('notebook_id', notebookId)
    .eq('is_trashed', false)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createNote(notebookId: string): Promise<Note> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('notes')
    .insert({
      notebook_id: notebookId,
      user_id: user.id,
      title: 'Sin título',
      content: {},
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateNote(id: string, updates: Partial<Note>): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function trashNote(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ is_trashed: true })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function toggleFavorite(id: string, value: boolean): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ is_favorite: value })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function togglePin(id: string, value: boolean): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ is_pinned: value })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function updateNoteEmoji(noteId: string, emoji: string | null): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ emoji })
    .eq('id', noteId)

  if (error) throw new Error(error.message)
}

export async function updateCover(
  noteId: string,
  data: { cover_url?: string | null; cover_gradient?: string | null }
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update(data)
    .eq('id', noteId)

  if (error) throw new Error(error.message)
}

/**
 * Tipografía POR NOTA (Phase 17 id:61). Escribe note_font_family/_size/_line_height.
 * Pasa null en un campo para que la nota vuelva a heredar el default global.
 * Solo se actualizan los campos presentes en `typography` (null sí cuenta como valor).
 */
export async function updateNoteTypography(
  noteId: string,
  typography: {
    fontFamily?: string | null
    fontSize?: number | null
    lineHeight?: number | null
  }
): Promise<void> {
  const update: Record<string, string | number | null> = {}
  if ('fontFamily' in typography) update.note_font_family = typography.fontFamily ?? null
  if ('fontSize' in typography) update.note_font_size = typography.fontSize ?? null
  if ('lineHeight' in typography) update.note_line_height = typography.lineHeight ?? null

  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update(update)
    .eq('id', noteId)

  if (error) throw new Error(error.message)
}

export async function updateNoteColor(noteId: string, color: string | null): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ color })
    .eq('id', noteId)

  if (error) throw new Error(error.message)
}

export async function getFavoriteNotes(): Promise<Note[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('is_favorite', true)
    .eq('is_trashed', false)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getTrashedNotes(): Promise<Note[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('is_trashed', true)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function restoreNote(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ is_trashed: false })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function permanentlyDeleteNote(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export type NoteWithNotebook = Note & {
  notebooks: { name: string } | null
}

export async function getAllNotesWithNotebook(): Promise<NoteWithNotebook[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*, notebooks(name)')
    .eq('is_trashed', false)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as NoteWithNotebook[]
}

export async function createQuickNote(notebookId: string): Promise<Note> {
  return createNote(notebookId)
}

export async function getNoteById(id: string): Promise<Note | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data ?? null
}
