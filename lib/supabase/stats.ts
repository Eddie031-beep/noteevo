import { createClient } from './client'

export interface UserStats {
  total_notes: number
  total_notebooks: number
  total_tags: number
  total_tasks: number
  pending_tasks: number
  total_attachments: number
  notes_this_week: number
  spaces_count: number
}

export interface ActivityPoint {
  day: string
  count: number
}

export interface TopTag {
  name: string
  count: number
}

export interface TopNotebook {
  name: string
  count: number
}

export interface DashboardExtras {
  activity_7d: ActivityPoint[]
  top_tags: TopTag[]
  top_notebooks: TopNotebook[]
}

export async function getUserStats(): Promise<UserStats> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_user_stats')
  if (error) throw new Error(error.message)
  return data as UserStats
}

export async function getDashboardExtras(): Promise<DashboardExtras> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_dashboard_extras')
  if (error) throw new Error(error.message)
  return data as DashboardExtras
}
