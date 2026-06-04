import { createClient } from './client'
import type { SharedNote } from '@/types'

function generateSlug(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12)
}

export async function getShareLink(noteId: string): Promise<SharedNote | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('shared_notes')
    .select('*')
    .eq('note_id', noteId)
    .maybeSingle()
  if (error) console.error('[shared-notes] getShareLink error:', error)
  return data ?? null
}

export async function createShareLink(noteId: string): Promise<SharedNote> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const existing = await getShareLink(noteId)
  if (existing) return existing

  const { data, error } = await supabase
    .from('shared_notes')
    .insert({
      note_id: noteId,
      user_id: user.id,
      public_slug: generateSlug(),
      is_active: true,
      access_level: 'view',
      view_count: 0,
    })
    .select()
    .single()

  if (error) console.error('[shared-notes] createShareLink insert error:', error)
  if (error) throw new Error(error.message)
  return data
}

export async function updateShareLink(
  id: string,
  updates: { is_active?: boolean; access_level?: 'none' | 'view' }
): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('shared_notes')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
  if (error) throw new Error(error.message)
}

export async function deactivateShareLink(id: string, isActive: boolean): Promise<void> {
  return updateShareLink(id, { is_active: isActive })
}
