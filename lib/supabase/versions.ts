import { createClient } from './client'

export interface NoteVersion {
  id: string
  note_id: string
  user_id: string
  title: string
  content: Record<string, unknown>
  version_number: number
  created_at: string
}

export async function getVersions(noteId: string): Promise<NoteVersion[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('note_versions')
    .select('*')
    .eq('note_id', noteId)
    .order('version_number', { ascending: false })
    .limit(20)

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function saveVersion(
  noteId: string,
  title: string,
  content: Record<string, unknown>,
  versionNumber: number
): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('note_versions')
    .insert({ note_id: noteId, user_id: user.id, title, content, version_number: versionNumber })

  if (error) throw new Error(error.message)

  // Mantener máximo 20 versiones — eliminar las más antiguas
  const { data: versions } = await supabase
    .from('note_versions')
    .select('id')
    .eq('note_id', noteId)
    .order('version_number', { ascending: false })

  if (versions && versions.length > 20) {
    const toDelete = versions.slice(20).map((v) => v.id)
    await supabase.from('note_versions').delete().in('id', toDelete)
  }
}

export async function deleteVersion(versionId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('note_versions')
    .delete()
    .eq('id', versionId)
  if (error) throw new Error(error.message)
}

export async function getVersionCount(noteId: string): Promise<number> {
  const supabase = createClient()
  const { count } = await supabase
    .from('note_versions')
    .select('*', { count: 'exact', head: true })
    .eq('note_id', noteId)

  return count ?? 0
}
