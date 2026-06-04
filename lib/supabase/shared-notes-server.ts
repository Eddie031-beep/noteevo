import { createAdminClient } from './admin'

type SharedNoteWithNote = {
  id: string
  note_id: string
  user_id: string
  public_slug: string
  is_active: boolean
  access_level: 'none' | 'view' | 'edit'
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

export type UpdateSharedNoteResult =
  | { ok: true }
  | { ok: false; reason: 'not_found' | 'forbidden' | 'expired' | 'invalid' | 'error' }

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

/**
 * Guarda el contenido de una nota desde su link público de edición.
 * Solo permite escribir si el enlace está activo, su access_level es 'edit' y no
 * ha expirado. Usa el cliente admin (service role) para bypasear RLS — por eso
 * es server-only y valida cada condición de forma explícita.
 */
export async function updateSharedNoteContent(
  slug: string,
  content: unknown
): Promise<UpdateSharedNoteResult> {
  // Validación del payload en el límite del sistema.
  if (
    content === null ||
    typeof content !== 'object' ||
    Array.isArray(content)
  ) {
    return { ok: false, reason: 'invalid' }
  }
  // Cota de tamaño para evitar payloads abusivos en un endpoint público.
  if (JSON.stringify(content).length > 500_000) {
    return { ok: false, reason: 'invalid' }
  }

  const supabase = createAdminClient()

  const { data: shared, error } = await supabase
    .from('shared_notes')
    .select('note_id, is_active, access_level, expires_at')
    .eq('public_slug', slug)
    .maybeSingle()

  if (error) return { ok: false, reason: 'error' }
  if (!shared || !shared.is_active) return { ok: false, reason: 'not_found' }
  if (shared.access_level !== 'edit') return { ok: false, reason: 'forbidden' }
  if (shared.expires_at && new Date(shared.expires_at).getTime() < Date.now()) {
    return { ok: false, reason: 'expired' }
  }

  const { error: updateError } = await supabase
    .from('notes')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', shared.note_id)

  if (updateError) return { ok: false, reason: 'error' }
  return { ok: true }
}
