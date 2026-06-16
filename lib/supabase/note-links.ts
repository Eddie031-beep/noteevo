import { createClient } from './client'

export interface BacklinkNote {
  id: string
  title: string
  notebook_id: string | null
  updated_at: string
}

export async function syncNoteLinks(
  sourceNoteId: string,
  targetNoteIds: string[]
): Promise<void> {
  const supabase = createClient()
  const { error: delErr } = await supabase
    .from('note_links')
    .delete()
    .eq('source_note_id', sourceNoteId)
  if (delErr) throw new Error(delErr.message)
  if (targetNoteIds.length === 0) return
  const rows = targetNoteIds.map((id) => ({
    source_note_id: sourceNoteId,
    target_note_id: id,
  }))
  const { error } = await supabase.from('note_links').insert(rows)
  if (error) throw new Error(error.message)
}

export async function getBacklinks(noteId: string): Promise<BacklinkNote[]> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_backlinks', { p_note_id: noteId })
  if (error) throw new Error(error.message)
  return (data ?? []) as BacklinkNote[]
}
