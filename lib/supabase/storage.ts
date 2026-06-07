import { createClient } from './client'

export async function uploadNoteImage(file: File): Promise<string> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const ext = file.name.split('.').pop()
  const fileName = `${user.id}/${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('note-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage
    .from('note-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

const MAX_COVER_BYTES = 5 * 1024 * 1024 // 5MB

export async function uploadNoteCover(file: File, noteId: string): Promise<string> {
  if (file.size > MAX_COVER_BYTES) {
    throw new Error('La imagen supera el tamaño máximo de 5MB')
  }

  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const path = `covers/${user.id}/${noteId}`

  const { error } = await supabase.storage
    .from('note-images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type,
    })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage
    .from('note-images')
    .getPublicUrl(path)

  // Cache-buster: la ruta es estable (upsert), forzamos recarga tras reemplazar
  return `${data.publicUrl}?t=${Date.now()}`
}
