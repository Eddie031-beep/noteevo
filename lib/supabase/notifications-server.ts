import { createAdminClient } from './admin'

export async function notifyNoteOwner(
  userId: string,
  noteId: string,
  noteTitle: string
): Promise<void> {
  const supabase = createAdminClient()

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { data: existing } = await supabase
    .from('notifications')
    .select('id')
    .eq('user_id', userId)
    .eq('type', 'note_shared')
    .contains('data', { note_id: noteId })
    .gte('created_at', oneHourAgo)
    .limit(1)
    .maybeSingle()

  console.log('notify: existing in last hour?', !!existing)
  if (existing) return

  const { error } = await supabase.from('notifications').insert({
    user_id: userId,
    type: 'note_shared',
    title: 'Alguien vio tu nota',
    body: `Tu nota "${noteTitle}" fue visitada`,
    is_read: false,
    data: { note_id: noteId },
  })
  console.log('notify error:', error)
}
