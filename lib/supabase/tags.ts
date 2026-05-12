import { createClient } from './client'
import type { Tag } from '@/types'

export async function getTags(): Promise<Tag[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createTag(name: string): Promise<Tag> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('tags')
    .insert({ name: name.trim(), user_id: user.id })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteTag(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('tags').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

type NoteTagRow = { tags: Tag | null }

export async function getTagsByNote(noteId: string): Promise<Tag[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('note_tags')
    .select('tags(*)')
    .eq('note_id', noteId)

  if (error) throw new Error(error.message)
  return ((data ?? []) as NoteTagRow[])
    .map(row => row.tags)
    .filter((tag): tag is Tag => tag !== null)
}

export async function addTagToNote(noteId: string, tagId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('note_tags')
    .insert({ note_id: noteId, tag_id: tagId })

  if (error) throw new Error(error.message)
}

export async function removeTagFromNote(noteId: string, tagId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('note_tags')
    .delete()
    .eq('note_id', noteId)
    .eq('tag_id', tagId)

  if (error) throw new Error(error.message)
}
