'use client'

import { useEffect, useRef, useState } from 'react'
import { Share2, Users, LogOut, Eye, Edit3, Shield, Crown, MoreHorizontal } from 'lucide-react'
import { removeMember } from '@/lib/supabase/spaces'
import { useSpaceStore } from '@/store/spaceStore'
import { useUIStore } from '@/store/uiStore'
import { createClient } from '@/lib/supabase/client'
import SpaceDetailView from './SpaceDetailView'
import type { Space, SpaceRole } from '@/types'

const ROLE_LABELS: Record<SpaceRole | 'owner', { label: string; icon: React.ReactNode }> = {
  owner:  { label: 'Dueño',   icon: <Crown size={11} /> },
  admin:  { label: 'Admin',   icon: <Shield size={11} /> },
  editor: { label: 'Editor',  icon: <Edit3 size={11} /> },
  viewer: { label: 'Viewer',  icon: <Eye size={11} /> },
}

export default function SharedWithMeView() {
  const { spaces, selectedSpace, removeSpace, addSpace, setSelectedSpace } = useSpaceStore()
  const { setCurrentView } = useUIStore()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const sharedSpaces = spaces.filter((s) => s.user_role !== 'owner')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id ?? null)
    })
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" ref={menuRef}>
            {sharedSpaces.map((space) => {
              const roleInfo = ROLE_LABELS[space.user_role ?? 'viewer']
              const menuOpen = openMenuId === space.id

              return (
                <div
                  key={space.id}
                  className="bg-panel border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-accent/30 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      title={`Abrir ${space.name}`}
                      onClick={() => handleOpenSpace(space)}
                      className="flex items-center gap-2.5 min-w-0 flex-1 text-left"
                    >
                      <div className="w-9 h-9 bg-accent/15 rounded-lg flex items-center justify-center shrink-0">
                        <Users size={16} className="text-accent" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{space.name}</p>
                        {space.description && (
                          <p className="text-xs text-muted truncate mt-0.5">{space.description}</p>
                        )}
                      </div>
                    </button>

                    <div className="relative shrink-0">
                      <button
                        type="button"
                        title="Opciones"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenMenuId(menuOpen ? null : space.id)
                        }}
                        className="p-1 text-muted hover:text-foreground transition rounded"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {menuOpen && (
                        <div className="absolute right-0 top-7 z-20 bg-elevated border border-border rounded-xl shadow-xl min-w-[160px] py-1 overflow-hidden">
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
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                      {roleInfo.icon}
                      {roleInfo.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
