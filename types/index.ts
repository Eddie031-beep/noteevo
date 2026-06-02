export interface Notebook {
  id: string
  user_id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
  space_id?: string | null
}

export interface Note {
  id: string
  user_id: string
  notebook_id: string | null
  title: string
  content: Record<string, unknown>
  is_favorite: boolean
  is_trashed: boolean
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  user_id: string
  name: string
  created_at: string
}

export interface NoteTag {
  note_id: string
  tag_id: string
}

export interface TagWithCount {
  id: string
  name: string
  note_count: number
  created_at: string
}

export interface Task {
  id: string
  user_id: string
  note_id: string | null
  title: string
  description: string | null
  due_date: string | null
  reminder_at: string | null
  priority: 'low' | 'medium' | 'high'
  is_flagged: boolean
  is_completed: boolean
  completed_at: string | null
  created_at: string
  reminder_7days_sent: boolean
  reminder_1day_sent: boolean
}

export interface Attachment {
  id: string
  user_id: string
  note_id: string | null
  file_name: string
  file_type: string | null
  file_size: number | null
  storage_path: string
  created_at: string
}

export type SpaceRole = 'viewer' | 'editor' | 'admin'

export interface Space {
  id: string
  name: string
  description: string | null
  owner_id: string
  created_at: string
  updated_at: string
  user_role?: SpaceRole | 'owner'
}

export interface SpaceMember {
  space_id: string
  user_id: string
  role: SpaceRole
  invited_by: string | null
  joined_at: string
  email?: string
}

export interface NoteVersion {
  id: string
  note_id: string
  user_id: string
  title: string
  content: Record<string, unknown>
  version_number: number
  created_at: string
}

export interface Template {
  id: string
  user_id: string | null
  name: string
  description: string | null
  content: Record<string, unknown>
  category: string | null
  is_builtin: boolean
  created_at: string
  updated_at: string
}

export interface SharedNote {
  id: string
  note_id: string
  user_id: string
  public_slug: string
  is_active: boolean
  access_level: 'none' | 'view'
  view_count: number
  expires_at: string | null
  created_at: string
}

export interface UserProfile {
  id: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  theme: 'dark' | 'light' | 'system'
  language: string
  timezone: string
  email_notifications: boolean
  onboarding_completed: boolean
  created_at: string
  updated_at: string
}

export type NotificationType = 'space_invite' | 'task_reminder' | 'note_shared' | 'space_removed'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  body: string | null
  data: Record<string, unknown> | null
  is_read: boolean
  created_at: string
}
