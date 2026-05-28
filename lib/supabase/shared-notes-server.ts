import { createAdminClient } from './admin'

type SharedNoteWithNote = {
  id: string
  note_id: string
  user_id: string
  public_slug: string
  is_active: boolean
  access_level: 'none' | 'view'
  view_count: number
  expires_at: string | null
  created_at: string
  notes: {
    id: string
    title: string
    content: Record<string, unknown>
    is_trashed: boolean
  }
}

export async function getSharedNote(slug: string): Promise<SharedNoteWithNote | null> {
  const supabase = createAdminClient()

  const { data: sharedNote, error } = await supabase
    .from('shared_notes')
    .select('*, notes(*)')
    .eq('public_slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !sharedNote) return null
  return sharedNote as SharedNoteWithNote
}

export async function getSharedNoteMeta(
  slug: string
): Promise<{ title: string } | null> {
  const result = await getSharedNote(slug)
  if (!result) return null
  return { title: result.notes.title }
}
