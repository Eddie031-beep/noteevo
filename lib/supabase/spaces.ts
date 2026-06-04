import { createClient } from './client'
import type { Space, SpaceMember, SpaceRole } from '@/types'

export async function getMySpaces(): Promise<Space[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  // Spaces owned by the user
  const { data: owned, error: ownedError } = await supabase
    .from('spaces')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  if (ownedError) throw new Error(ownedError.message)

  // Memberships where the user is NOT the owner
  const { data: memberships, error: membershipsError } = await supabase
    .from('space_members')
    .select('space_id, role')
    .eq('user_id', user.id)

  if (membershipsError) throw new Error(membershipsError.message)

  const memberSpaceIds = (memberships ?? []).map((m) => m.space_id)

  let memberSpaces: Space[] = []
  if (memberSpaceIds.length > 0) {
    const { data: joined, error: joinedError } = await supabase
      .from('spaces')
      .select('*')
      .in('id', memberSpaceIds)
      .neq('owner_id', user.id)
      .order('created_at', { ascending: false })

    if (joinedError) throw new Error(joinedError.message)

    const roleMap = new Map(
      (memberships ?? []).map((m) => [m.space_id, m.role as SpaceRole])
    )

    memberSpaces = (joined ?? []).map((s) => ({
      ...s,
      user_role: roleMap.get(s.id) ?? 'viewer',
    }))
  }

  const ownedWithRole: Space[] = (owned ?? []).map((s) => ({
    ...s,
    user_role: 'owner' as const,
  }))

  return [...ownedWithRole, ...memberSpaces]
}

export async function createSpace(name: string, description?: string): Promise<Space> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('spaces')
    .insert({ name, description: description ?? null, owner_id: user.id })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return { ...data, user_role: 'owner' }
}

export async function updateSpace(
  spaceId: string,
  fields: { name?: string; description?: string }
): Promise<Space> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('spaces')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', spaceId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteSpace(spaceId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('spaces').delete().eq('id', spaceId)
  if (error) throw new Error(error.message)
}

export async function getSpaceMembers(spaceId: string): Promise<SpaceMember[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('space_members')
    .select('*')
    .eq('space_id', spaceId)
    .order('joined_at', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function updateMemberRole(
  spaceId: string,
  userId: string,
  role: SpaceRole
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('space_members')
    .update({ role })
    .eq('space_id', spaceId)
    .eq('user_id', userId)

  if (error) throw new Error(error.message)
}

export async function removeMember(spaceId: string, userId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('space_members')
    .delete()
    .eq('space_id', spaceId)
    .eq('user_id', userId)

  if (error) throw new Error(error.message)
}

export async function getSpaceNotebooks(spaceId: string): Promise<import('@/types').Notebook[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notebooks')
    .select('*')
    .eq('space_id', spaceId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createNotebookInSpace(
  spaceId: string,
  name: string
): Promise<import('@/types').Notebook> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('notebooks')
    .insert({ name, user_id: user.id, space_id: spaceId })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export interface SpaceMemberWithEmail {
  user_id: string
  role: SpaceRole
  invited_by: string | null
  joined_at: string
  email: string
}

export async function getSpaceMembersWithEmail(
  spaceId: string
): Promise<SpaceMemberWithEmail[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .rpc('get_space_members_with_email', { p_space_id: spaceId })

  if (error) throw new Error(error.message)
  return (data ?? []) as SpaceMemberWithEmail[]
}

export interface SpaceOverview {
  space_id: string
  member_count: number
  notebook_count: number
  owner_email: string | null
  my_joined_at: string | null
}

/**
 * Conteos de miembros/libretas + email del dueño + fecha de unión del usuario
 * actual, para todos los spaces accesibles. Una sola llamada (RPC SECURITY
 * DEFINER) que alimenta SpacesView y SharedWithMeView.
 */
export async function getSpacesOverview(): Promise<Map<string, SpaceOverview>> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_spaces_overview')
  if (error) throw new Error(error.message)

  const map = new Map<string, SpaceOverview>()
  for (const row of (data ?? []) as SpaceOverview[]) {
    map.set(row.space_id, row)
  }
  return map
}

export async function getSpaceNotes(spaceId: string): Promise<import('@/types').Note[]> {
  const supabase = createClient()

  const { data: notebooks, error: nbError } = await supabase
    .from('notebooks')
    .select('id')
    .eq('space_id', spaceId)

  if (nbError) throw new Error(nbError.message)

  const notebookIds = (notebooks ?? []).map((n) => n.id)
  if (notebookIds.length === 0) return []

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .in('notebook_id', notebookIds)
    .eq('is_trashed', false)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}
