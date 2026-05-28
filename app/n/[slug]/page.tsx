import { getSharedNote } from '@/lib/supabase/shared-notes-server'
import { notifyNoteOwner } from '@/lib/supabase/notifications-server'
import NoteViewer from './NoteViewer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export default async function PublicNotePage({ params }: PageProps) {
  const { slug } = await params
  const result = await getSharedNote(slug)

  if (!result) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground font-medium">Link no disponible</p>
          <p className="text-muted text-sm mt-1">Esta nota no existe o el enlace fue desactivado.</p>
          <a href="/" className="text-accent text-sm mt-4 inline-block hover:underline">
            Ir a NoteEvo
          </a>
        </div>
      </div>
    )
  }

  console.log('notifying owner...')
  try {
    await notifyNoteOwner(result.user_id, result.note_id, result.notes.title)
  } catch (err) {
    console.log('notifyNoteOwner threw:', err)
  }

  const note = result.notes

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-accent">NoteEvo</span>
        <a href="/register" className="text-xs text-muted hover:text-foreground transition">
          Crear cuenta gratis
        </a>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {note.title || 'Sin título'}
        </h1>
        <NoteViewer content={note.content ?? {}} />
      </main>

      <footer className="border-t border-border px-6 py-6 text-center">
        <p className="text-xs text-muted">
          Nota compartida con{' '}
          <a href="/" className="text-accent hover:underline">NoteEvo</a>
          {' '}— tu segundo cerebro
        </p>
      </footer>
    </div>
  )
}
