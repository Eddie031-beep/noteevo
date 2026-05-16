import { createClient } from './client'
import { Notebook } from '@/types'

export async function getNotebooks(): Promise<Notebook[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notebooks')
    .select('*')
    .is('space_id', null)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function moveNotebookToSpace(
  notebookId: string,
  spaceId: string | null
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notebooks')
    .update({ space_id: spaceId })
    .eq('id', notebookId)

  if (error) throw new Error(error.message)
}

export async function createNotebook(name: string, description?: string): Promise<Notebook> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('notebooks')
    .insert({ name, description, user_id: user.id })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteNotebook(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notebooks')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}
