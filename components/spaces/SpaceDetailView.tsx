'use client'

import { useEffect, useState } from 'react'
import {
  ChevronLeft, Share2, BookOpen, FileText, Plus, MoveRight,
  Loader2, Users, Crown, Shield, Edit3, Eye, Trash2, ChevronDown,
} from 'lucide-react'
import {
  getSpaceNotebooks, getSpaceNotes, createNotebookInSpace,
  getSpaceMembersWithEmail, updateMemberRole, removeMember,
} from '@/lib/supabase/spaces'
import { moveNotebookToSpace } from '@/lib/supabase/notebooks'
import { extractTextPreview } from '@/lib/utils/tiptap'
import { createClient } from '@/lib/supabase/client'
import InviteModal from './InviteModal'
import CreateNotebookInSpaceModal from './CreateNotebookInSpaceModal'
import type { Space, Notebook, Note, SpaceRole } from '@/types'
import type { SpaceMemberWithEmail } from '@/lib/supabase/spaces'

type Tab = 'notebooks' | 'notes' | 'members'

interface SpaceDetailViewProps {
  space: Space
  onBack: () => void
}

const ROLE_OPTIONS: { value: SpaceRole; label: string; icon: React.ReactNode }[] = [
  { value: 'viewer', label: 'Viewer', icon: <Eye size={13} /> },
  { value: 'editor', label: 'Editor', icon: <Edit3 size={13} /> },
  { value: 'admin', label: 'Admin', icon: <Shield size={13} /> },
]

const ROLE_ICONS: Record<SpaceRole | 'owner', React.ReactNode> = {
  owner: <Crown size={13} />,
  admin: <Shield size={13} />,
  editor: <Edit3 size={13} />,
  viewer: <Eye size={13} />,
}

function RoleSelector({
  currentRole,
  onChange,
  disabled,
}: {
  currentRole: SpaceRole
  onChange: (role: SpaceRole) => void
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)

  if (disabled) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
        {ROLE_ICONS[currentRole]}
        {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
      </span>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20 hover:bg-accent/20 transition cursor-pointer"
      >
        {ROLE_ICONS[currentRole]}
        {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="absolute right-0 top-7 z-20 bg-elevated border border-border rounded-xl shadow-xl min-w-[130px] py-1 overflow-hidden">
          {ROLE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition text-left cursor-pointer ${
                currentRole === opt.value
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:bg-surface hover:text-foreground'
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SpaceDetailView({ space, onBack }: SpaceDetailViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('notebooks')
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [members, setMembers] = useState<SpaceMemberWithEmail[]>([])
  const [loading, setLoading] = useState(true)
  const [showInvite, setShowInvite] = useState(false)
  const [showCreateNotebook, setShowCreateNotebook] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const isViewer = space.user_role === 'viewer'
  const canInvite = space.user_role === 'owner' || space.user_role === 'admin'
  const isOwner = space.user_role === 'owner'

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id ?? null)
    })
  }, [])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [nbs, nts, mbs] = await Promise.all([
          getSpaceNotebooks(space.id),
          getSpaceNotes(space.id),
          getSpaceMembersWithEmail(space.id),
        ])
        setNotebooks(nbs)
        setNotes(nts)
        setMembers(mbs)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el space')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [space.id])

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`space-membership-${space.id}`)
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'space_members',
          filter: `space_id=eq.${space.id}`,
        },
        (payload) => {
          if (payload.old && (payload.old as { user_id: string }).user_id === currentUserId) {
            onBack()
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [space.id, currentUserId, onBack])

  const notebookMap = new Map(notebooks.map((nb) => [nb.id, nb.name]))

  const handleConfirmCreateNotebook = async (name: string) => {
    const nb = await createNotebookInSpace(space.id, name)
    setNotebooks((prev) => [nb, ...prev])
  }

  const handleMoveOut = async (notebook: Notebook) => {
    setNotebooks((prev) => prev.filter((nb) => nb.id !== notebook.id))
    try {
      await moveNotebookToSpace(notebook.id, null)
    } catch {
      setNotebooks((prev) => [notebook, ...prev])
    }
  }

  const handleRoleChange = async (userId: string, newRole: SpaceRole) => {
    const prev = members.find((m) => m.user_id === userId)
    setMembers((ms) => ms.map((m) => m.user_id === userId ? { ...m, role: newRole } : m))
    try {
      await updateMemberRole(space.id, userId, newRole)
    } catch {
      if (prev) {
        setMembers((ms) => ms.map((m) => m.user_id === userId ? { ...m, role: prev.role } : m))
      }
      setError('No se pudo cambiar el rol')
    }
  }

  const handleRemoveMember = async (userId: string) => {
    const prev = members.find((m) => m.user_id === userId)
    setMembers((ms) => ms.filter((m) => m.user_id !== userId))
    try {
      await removeMember(space.id, userId)
    } catch {
      if (prev) setMembers((ms) => [prev, ...ms])
      setError('No se pudo expulsar al miembro')
    }
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'notebooks', label: 'Notebooks', count: notebooks.length },
    { key: 'notes', label: 'Notas', count: notes.length },
    { key: 'members', label: 'Miembros', count: members.length + (isOwner ? 1 : 0) },
  ]

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
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-60">{tab.count}</span>
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
                      onClick={() => setShowCreateNotebook(true)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 transition"
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

            {/* Tab: Miembros */}
            {activeTab === 'members' && (
              <div className="flex flex-col gap-2">
                {/* Owner row */}
                <div className="flex items-center justify-between gap-3 p-3.5 bg-panel border border-border rounded-xl">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 bg-accent/15 rounded-full flex items-center justify-center shrink-0">
                      <Users size={14} className="text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {isOwner ? 'Tú' : 'Dueño del space'}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20 shrink-0">
                    <Crown size={11} />
                    Dueño
                  </span>
                </div>

                {/* Members rows */}
                {members.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-12 text-center">
                    <Users size={28} className="text-subtle" />
                    <p className="text-sm text-muted">Sin miembros invitados aún</p>
                    {canInvite && (
                      <button
                        type="button"
                        onClick={() => setShowInvite(true)}
                        className="text-sm text-accent hover:text-accent-light transition"
                      >
                        Invitar miembro
                      </button>
                    )}
                  </div>
                ) : (
                  members.map((member) => {
                    const isCurrentUser = member.user_id === currentUserId
                    const canManage = canInvite && !isCurrentUser
                    return (
                      <div
                        key={member.user_id}
                        className="flex items-center justify-between gap-3 p-3.5 bg-panel border border-border rounded-xl group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 bg-surface rounded-full flex items-center justify-center shrink-0 border border-border">
                            <Users size={14} className="text-muted" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {member.email}
                              {isCurrentUser && (
                                <span className="ml-1.5 text-xs text-muted">(tú)</span>
                              )}
                            </p>
                            <p className="text-xs text-subtle">
                              {new Date(member.joined_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <RoleSelector
                            currentRole={member.role}
                            onChange={(role) => handleRoleChange(member.user_id, role)}
                            disabled={!canManage}
                          />
                          {canManage && (
                            <button
                              type="button"
                              title="Expulsar miembro"
                              onClick={() => handleRemoveMember(member.user_id)}
                              className="opacity-0 group-hover:opacity-100 p-1.5 text-muted hover:text-danger rounded-lg hover:bg-surface transition cursor-pointer"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </>
        )}
      </div>

      {showInvite && (
        <InviteModal spaceId={space.id} onClose={() => setShowInvite(false)} />
      )}

      {showCreateNotebook && (
        <CreateNotebookInSpaceModal
          onClose={() => setShowCreateNotebook(false)}
          onConfirm={handleConfirmCreateNotebook}
        />
      )}
    </div>
  )
}
