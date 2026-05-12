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
