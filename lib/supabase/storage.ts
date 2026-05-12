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
