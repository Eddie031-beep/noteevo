'use client'

import { useEffect, useRef, useState } from 'react'
import { Share2, Users, LogOut, Eye, Edit3, Shield, Crown, MoreHorizontal, BookOpen, Calendar } from 'lucide-react'
import { removeMember, getSpacesOverview } from '@/lib/supabase/spaces'
import type { SpaceOverview } from '@/lib/supabase/spaces'
import { useSpaceStore } from '@/store/spaceStore'
import { useUIStore } from '@/store/uiStore'
import { createClient } from '@/lib/supabase/client'
import { getSpaceColor, withAlpha } from '@/lib/utils/space-color'
import SpaceDetailView from './SpaceDetailView'
import type { Space, SpaceRole } from '@/types'

const ROLE_LABELS: Record<SpaceRole | 'owner', { label: string; icon: React.ReactNode }> = {
  owner:  { label: 'Dueño',   icon: <Crown size={11} /> },
  admin:  { label: 'Admin',   icon: <Shield size={11} /> },
  editor: { label: 'Editor',  icon: <Edit3 size={11} /> },
  viewer: { label: 'Viewer',  icon: <Eye size={11} /> },
}

function formatJoinDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function SharedWithMeView() {
  const { spaces, selectedSpace, removeSpace, addSpace, setSelectedSpace } = useSpaceStore()
  const { setCurrentView } = useUIStore()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [overview, setOverview] = useState<Map<string, SpaceOverview>>(new Map())
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const sharedSpaces = spaces.filter((s) => s.user_role !== 'owner')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id ?? null)
    })
    getSpacesOverview()
      .then(setOverview)
      .catch(() => { /* counts opcionales: si fallan, las cards siguen funcionando */ })
  }, [])

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }
    if (openMenuId) document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [openMenuId])

  const handleOpenSpace = (space: Space) => {
    setSelectedSpace(space)
    setCurrentView('spaces')
  }

  const handleLeave = async (space: Space) => {
    if (!currentUserId) return
    setOpenMenuId(null)
    removeSpace(space.id)
    try {
      await removeMember(space.id, currentUserId)
    } catch {
      addSpace(space)
      setError('No se pudo salir del space')
    }
  }

  if (selectedSpace) {
    return (
      <SpaceDetailView
        space={selectedSpace}
        onBack={() => setSelectedSpace(null)}
      />
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-3xl mx-auto px-8 py-10 flex flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Compartido conmigo</h1>
          <p className="text-sm text-muted mt-0.5">
            {sharedSpaces.length} space{sharedSpaces.length !== 1 ? 's' : ''}
          </p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Empty state */}
        {sharedSpaces.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="w-16 h-16 bg-panel border border-border rounded-2xl flex items-center justify-center">
              <Share2 size={28} className="text-subtle" />
            </div>
            <div>
              <p className="text-foreground font-medium">No tienes spaces compartidos contigo aún</p>
              <p className="text-muted text-sm mt-1">
                Cuando alguien te invite a un space aparecerá aquí.
              </p>
            </div>
          </div>
        )}

        {/* Spaces grid */}
        {sharedSpaces.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" ref={menuRef}>
            {sharedSpaces.map((space) => {
              const roleInfo = ROLE_LABELS[space.user_role ?? 'viewer']
              const menuOpen = openMenuId === space.id
              const color = getSpaceColor(space.id)
              const ov = overview.get(space.id)
              const memberTotal = (ov?.member_count ?? 0) + 1
              const notebookTotal = ov?.notebook_count ?? 0

              return (
                <div
                  key={space.id}
                  className="bg-panel border border-border rounded-xl overflow-hidden flex flex-col hover:border-accent/30 hover:shadow-lg transition"
                >
                  {/* Banner de color identificador */}
                  <div
                    className="h-14 relative"
                    style={{ background: `linear-gradient(120deg, ${color}, ${withAlpha(color, 0.55)})` }}
                  >
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        type="button"
                        title="Opciones"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenMenuId(menuOpen ? null : space.id)
                        }}
                        className="p-1 rounded-md bg-black/15 text-white/90 hover:bg-black/30 transition"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {menuOpen && (
                        <div className="absolute right-0 top-9 z-20 bg-elevated border border-border rounded-xl shadow-xl min-w-[160px] py-1 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleLeave(space)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-surface transition text-left"
                          >
                            <LogOut size={13} className="text-muted" />
                            Salir del space
                          </button>
                        </div>
                      )}
                    </div>

                    <div
                      className="absolute -bottom-5 left-4 w-11 h-11 rounded-xl border-2 border-panel flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      <Users size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Cuerpo clickable */}
                  <button
                    type="button"
                    title={`Abrir ${space.name}`}
                    onClick={() => handleOpenSpace(space)}
                    className="flex flex-col gap-2 px-4 pt-7 pb-4 text-left flex-1"
                  >
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-[15px] truncate">{space.name}</p>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-accent/10 text-accent text-[10px] rounded-full border border-accent/20 shrink-0">
                        {roleInfo.icon}
                        {roleInfo.label}
                      </span>
                    </div>

                    {space.description && (
                      <p className="text-xs text-muted line-clamp-2">{space.description}</p>
                    )}

                    {/* Dueño */}
                    {ov?.owner_email && (
                      <p className="text-xs text-muted flex items-center gap-1 truncate">
                        <Crown size={11} className="text-accent shrink-0" />
                        <span className="truncate">Dueño: {ov.owner_email}</span>
                      </p>
                    )}

                    {/* Footer: conteos + fecha de unión */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-subtle">
                      <span className="inline-flex items-center gap-1">
                        <Users size={13} />
                        {memberTotal} {memberTotal === 1 ? 'miembro' : 'miembros'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <BookOpen size={13} />
                        {notebookTotal} {notebookTotal === 1 ? 'libreta' : 'libretas'}
                      </span>
                      {ov?.my_joined_at && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={13} />
                          {formatJoinDate(ov.my_joined_at)}
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
