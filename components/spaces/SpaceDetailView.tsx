'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, Share2, BookOpen, FileText, Plus, MoveRight, Loader2 } from 'lucide-react'
import {
  getSpaceNotebooks,
  getSpaceNotes,
  createNotebookInSpace,
} from '@/lib/supabase/spaces'
import { moveNotebookToSpace } from '@/lib/supabase/notebooks'
import { extractTextPreview } from '@/lib/utils/tiptap'
import InviteModal from './InviteModal'
import type { Space, Notebook, Note } from '@/types'

type Tab = 'notebooks' | 'notes'

interface SpaceDetailViewProps {
  space: Space
  onBack: () => void
}

export default function SpaceDetailView({ space, onBack }: SpaceDetailViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('notebooks')
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [showInvite, setShowInvite] = useState(false)
  const [creatingNotebook, setCreatingNotebook] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isViewer = space.user_role === 'viewer'
  const canInvite = space.user_role === 'owner' || space.user_role === 'admin'

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [nbs, nts] = await Promise.all([
          getSpaceNotebooks(space.id),
          getSpaceNotes(space.id),
        ])
        setNotebooks(nbs)
        setNotes(nts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el space')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [space.id])

  const notebookMap = new Map(notebooks.map((nb) => [nb.id, nb.name]))

  const handleCreateNotebook = async () => {
    const name = prompt('Nombre de la libreta:')
    if (!name?.trim()) return

    setCreatingNotebook(true)
    try {
      const nb = await createNotebookInSpace(space.id, name.trim())
      setNotebooks((prev) => [nb, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear libreta')
    } finally {
      setCreatingNotebook(false)
    }
  }

  const handleMoveOut = async (notebook: Notebook) => {
    setNotebooks((prev) => prev.filter((nb) => nb.id !== notebook.id))
    try {
      await moveNotebookToSpace(notebook.id, null)
    } catch {
      setNotebooks((prev) => [notebook, ...prev])
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-3xl mx-auto px-8 py-8 flex flex-col gap-6">

        {/* Breadcrumb + header */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onBack}
            title="Volver a Spaces"
            className="flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition w-fit"
          >
            <ChevronLeft size={15} />
            Spaces
          </button>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">{space.name}</h1>
              {space.description && (
                <p className="text-sm text-muted mt-1">{space.description}</p>
              )}
            </div>
            {canInvite && (
              <button
                type="button"
                title="Compartir space"
                onClick={() => setShowInvite(true)}
                className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm text-muted hover:text-foreground hover:border-accent/40 transition shrink-0"
              >
                <Share2 size={14} />
                Compartir
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {(['notebooks', 'notes'] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === tab
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              {tab === 'notebooks' ? 'Notebooks' : 'Notas'}
              <span className="ml-1.5 text-xs opacity-60">
                {tab === 'notebooks' ? notebooks.length : notes.length}
              </span>
            </button>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={20} className="text-muted animate-spin" />
          </div>
        ) : (
          <>
            {/* Tab: Notebooks */}
            {activeTab === 'notebooks' && (
              <div className="flex flex-col gap-3">
                {!isViewer && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      title="Nueva libreta"
                      onClick={handleCreateNotebook}
                      disabled={creatingNotebook}
                      className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 disabled:opacity-50 transition"
                    >
                      <Plus size={14} />
                      Nueva libreta
                    </button>
                  </div>
                )}

                {notebooks.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-16 text-center">
                    <BookOpen size={28} className="text-subtle" />
                    <p className="text-sm text-muted">Sin libretas en este space</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {notebooks.map((nb) => (
                      <div
                        key={nb.id}
                        className="flex items-center justify-between gap-3 p-3.5 bg-panel border border-border rounded-xl hover:border-accent/30 transition group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 bg-accent/15 rounded-lg flex items-center justify-center shrink-0">
                            <BookOpen size={14} className="text-accent" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{nb.name}</p>
                            {nb.description && (
                              <p className="text-xs text-muted truncate">{nb.description}</p>
                            )}
                          </div>
                        </div>
                        {!isViewer && (
                          <button
                            type="button"
                            title="Mover fuera del space"
                            onClick={() => handleMoveOut(nb)}
                            className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-muted hover:text-foreground transition shrink-0"
                          >
                            <MoveRight size={13} />
                            Mover fuera
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Notas */}
            {activeTab === 'notes' && (
              <div className="flex flex-col gap-2">
                {notes.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-16 text-center">
                    <FileText size={28} className="text-subtle" />
                    <p className="text-sm text-muted">Sin notas en este space</p>
                  </div>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="flex flex-col gap-1 p-3.5 bg-panel border border-border rounded-xl hover:border-accent/30 transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-foreground truncate">{note.title}</p>
                        <span className="text-xs text-subtle shrink-0">
                          {new Date(note.updated_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                      {note.notebook_id && notebookMap.has(note.notebook_id) && (
                        <p className="text-xs text-muted flex items-center gap-1">
                          <BookOpen size={10} />
                          {notebookMap.get(note.notebook_id)}
                        </p>
                      )}
                      <p className="text-xs text-subtle line-clamp-2 mt-0.5">
                        {extractTextPreview(note.content, 100)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {showInvite && (
        <InviteModal spaceId={space.id} onClose={() => setShowInvite(false)} />
      )}
    </div>
  )
}
