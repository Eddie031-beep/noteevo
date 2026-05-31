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

export async function searchNotesAdvanced(params: {
  query: string
  notebookId?: string | null
  tagIds?: string[]
  dateFrom?: string | null
  dateTo?: string | null
  isFavorite?: boolean
}): Promise<Note[]> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('search_notes_advanced', {
    search_query: params.query.trim() || null,
    filter_notebook_id: params.notebookId ?? null,
    filter_tag_ids: params.tagIds && params.tagIds.length > 0 ? params.tagIds : null,
    filter_date_from: params.dateFrom ?? null,
    filter_date_to: params.dateTo ?? null,
    filter_is_favorite: params.isFavorite ?? null,
  })
  if (error) throw new Error(error.message)
  return (data ?? []) as Note[]
}
