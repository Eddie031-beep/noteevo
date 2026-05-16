import { createClient } from './client'
import type { Attachment } from '@/types'

export type AttachmentWithNote = Attachment & {
  notes: { title: string } | null
}

export async function getAllAttachments(): Promise<AttachmentWithNote[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('attachments')
    .select('*, notes(title)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as AttachmentWithNote[]
}

export async function getAttachments(noteId: string): Promise<Attachment[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('note_id', noteId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function uploadAttachment(
  noteId: string,
  file: File,
  onProgress: (pct: number) => void
): Promise<Attachment> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const storagePath = `${user.id}/${noteId}/${safeName}`

  // Simulate progress — storage-js types don't expose onUploadProgress
  let pct = 0
  const timer = setInterval(() => {
    pct = Math.min(pct + 6, 90)
    onProgress(pct)
  }, 120)

  let uploadError: { message: string } | null = null
  try {
    const result = await supabase.storage
      .from('attachments')
      .upload(storagePath, file, {
        contentType: file.type || 'application/octet-stream',
        cacheControl: '3600',
        upsert: false,
      })
    uploadError = result.error
  } finally {
    clearInterval(timer)
  }

  if (uploadError) throw new Error(uploadError.message)
  onProgress(100)

  const { data, error } = await supabase
    .from('attachments')
    .insert({
      user_id: user.id,
      note_id: noteId,
      file_name: file.name,
      file_type: file.type || null,
      file_size: file.size,
      storage_path: storagePath,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteAttachment(id: string, storagePath: string): Promise<void> {
  const supabase = createClient()
  await supabase.storage.from('attachments').remove([storagePath])
  const { error } = await supabase.from('attachments').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export function getAttachmentUrl(storagePath: string): string {
  const supabase = createClient()
  const { data } = supabase.storage.from('attachments').getPublicUrl(storagePath)
  return data.publicUrl
}
