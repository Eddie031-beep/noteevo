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
