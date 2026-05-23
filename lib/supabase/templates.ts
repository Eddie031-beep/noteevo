import { createClient } from './client'
import type { Template } from '@/types'
import { BUILTIN_TEMPLATES } from '@/lib/templates/builtin-templates'

export async function getTemplates(): Promise<Template[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('is_builtin', false)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  const personal = (data ?? []) as Template[]

  const builtin = BUILTIN_TEMPLATES.map((t) => ({
    ...t,
    user_id: null,
    created_at: '',
    updated_at: '',
  })) as Template[]

  return [...builtin, ...personal]
}

export async function createTemplate(
  name: string,
  content: Record<string, unknown>,
  opts: { description?: string; category?: string } = {}
): Promise<Template> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('templates')
    .insert({
      name: name.trim(),
      content,
      description: opts.description ?? null,
      category: opts.category ?? 'personal',
      is_builtin: false,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateTemplate(
  id: string,
  updates: Partial<Pick<Template, 'name' | 'description' | 'category' | 'content'>>
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('templates')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('is_builtin', false)
  if (error) throw new Error(error.message)
}

export async function deleteTemplate(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id)
    .eq('is_builtin', false)
  if (error) throw new Error(error.message)
}
