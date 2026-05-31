import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { Note } from '@/types'

// Aislar el store de la capa Supabase
vi.mock('@/lib/supabase/notes', () => ({
  getNotesByNotebook: vi.fn(),
  createNote: vi.fn(),
}))

import { useNoteStore } from '@/store/noteStore'

function makeNote(overrides: Partial<Note> = {}): Note {
  return {
    id: 'n1',
    user_id: 'u1',
    notebook_id: 'nb1',
    title: 'Nota',
    content: {},
    is_favorite: false,
    is_trashed: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    ...overrides,
  } as Note
}

beforeEach(() => {
  useNoteStore.setState({ notes: [], selectedNote: null })
})

describe('noteStore', () => {
  it('setNotes replaces the list', () => {
    const notes = [makeNote({ id: 'a' }), makeNote({ id: 'b' })]
    useNoteStore.getState().setNotes(notes)
    expect(useNoteStore.getState().notes).toHaveLength(2)
  })

  it('addNote prepends the new note', () => {
    useNoteStore.getState().setNotes([makeNote({ id: 'a' })])
    useNoteStore.getState().addNote(makeNote({ id: 'b' }))
    expect(useNoteStore.getState().notes.map((n) => n.id)).toEqual(['b', 'a'])
  })

  it('updateNote patches the matching note', () => {
    useNoteStore.getState().setNotes([makeNote({ id: 'a', title: 'Viejo' })])
    useNoteStore.getState().updateNote('a', { title: 'Nuevo' })
    expect(useNoteStore.getState().notes[0].title).toBe('Nuevo')
  })

  it('updateNote also syncs selectedNote when it matches', () => {
    const note = makeNote({ id: 'a', title: 'Viejo' })
    useNoteStore.setState({ notes: [note], selectedNote: note })
    useNoteStore.getState().updateNote('a', { title: 'Nuevo' })
    expect(useNoteStore.getState().selectedNote?.title).toBe('Nuevo')
  })

  it('updateNote leaves selectedNote untouched when ids differ', () => {
    const selected = makeNote({ id: 'b', title: 'Otra' })
    useNoteStore.setState({ notes: [makeNote({ id: 'a' })], selectedNote: selected })
    useNoteStore.getState().updateNote('a', { title: 'Nuevo' })
    expect(useNoteStore.getState().selectedNote?.title).toBe('Otra')
  })

  it('deleteNote removes the note and clears selectedNote if it matches', () => {
    const note = makeNote({ id: 'a' })
    useNoteStore.setState({ notes: [note], selectedNote: note })
    useNoteStore.getState().deleteNote('a')
    expect(useNoteStore.getState().notes).toHaveLength(0)
    expect(useNoteStore.getState().selectedNote).toBeNull()
  })

  it('deleteNote keeps selectedNote if a different note is removed', () => {
    const selected = makeNote({ id: 'keep' })
    useNoteStore.setState({
      notes: [makeNote({ id: 'a' }), selected],
      selectedNote: selected,
    })
    useNoteStore.getState().deleteNote('a')
    expect(useNoteStore.getState().selectedNote?.id).toBe('keep')
  })

  it('setSelectedNote updates the selection', () => {
    const note = makeNote({ id: 'a' })
    useNoteStore.getState().setSelectedNote(note)
    expect(useNoteStore.getState().selectedNote?.id).toBe('a')
  })
})
