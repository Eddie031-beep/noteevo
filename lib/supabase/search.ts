import { createClient } from './client'
import type { Note } from '@/types'

export async function searchNotes(query: string): Promise<Note[]> {
  if (!query.trim()) return []

  const supabase = createClient()
  const { data, error } = await supabase
    .rpc('search_notes', { search_query: query.trim() })

  if (error) throw new Error(error.message)
  return (data ?? []) as Note[]
}
