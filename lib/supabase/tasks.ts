import { createClient } from './client'
import type { Task } from '@/types'

export type TaskWithContext = Task & {
  notes: {
    title: string
    notebook_id: string | null
    notebooks: { id: string; name: string } | null
  } | null
}

export async function getTasks(): Promise<Task[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getPendingTaskCount(): Promise<number> {
  const supabase = createClient()
  const { count, error } = await supabase
    .from('tasks')
    .select('id', { count: 'exact', head: true })
    .eq('is_completed', false)

  if (error) throw new Error(error.message)
  return count ?? 0
}

export async function getTasksWithNotebook(): Promise<TaskWithContext[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tasks')
    .select('*, notes(title, notebook_id, notebooks(id, name))')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as TaskWithContext[]
}

export async function createTask(
  title: string,
  opts: Partial<Pick<Task, 'description' | 'due_date' | 'start_time' | 'end_time' | 'priority' | 'note_id' | 'is_flagged'>> = {}
): Promise<Task> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('tasks')
    .insert({ title, user_id: user.id, ...opts })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateTask(
  id: string,
  updates: Partial<Pick<Task, 'title' | 'description' | 'due_date' | 'start_time' | 'end_time' | 'priority' | 'is_flagged' | 'reminder_at'>>
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('tasks').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function toggleTaskComplete(id: string, is_completed: boolean): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('tasks')
    .update({
      is_completed,
      completed_at: is_completed ? new Date().toISOString() : null,
    })
    .eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteTask(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
