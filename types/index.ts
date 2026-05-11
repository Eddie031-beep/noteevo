export interface Notebook {
  id: string
  user_id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
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

export interface Attachment {
  id: string
  note_id: string
  user_id: string
  file_url: string
  file_name: string
  file_type: string | null
  size: number | null
  created_at: string
}
