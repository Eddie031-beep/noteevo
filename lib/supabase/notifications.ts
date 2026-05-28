import { createClient } from './client'
import type { Notification } from '@/types'

export async function getNotifications(): Promise<Notification[]> {
  const supabase = createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) return []

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', authData.user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw new Error(error.message)
  return (data ?? []) as Notification[]
}

export async function markAsRead(id: string): Promise<void> {
  const supabase = createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
    .eq('user_id', authData.user.id)

  if (error) throw new Error(error.message)
}

export async function markAllRead(): Promise<void> {
  const supabase = createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', authData.user.id)
    .eq('is_read', false)

  if (error) throw new Error(error.message)
}

export async function deleteNotification(id: string): Promise<void> {
  const supabase = createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id)
    .eq('user_id', authData.user.id)

  if (error) throw new Error(error.message)
}
