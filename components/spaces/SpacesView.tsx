'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, Plus, MoreHorizontal, Pencil, Trash2, LogOut, Crown, Shield, Eye, Edit3 } from 'lucide-react'
import { getMySpaces, deleteSpace, removeMember } from '@/lib/supabase/spaces'
import { useSpaceStore } from '@/store/spaceStore'
import { createClient } from '@/lib/supabase/client'
import CreateSpaceModal from './CreateSpaceModal'
import SpaceDetailView from './SpaceDetailView'
import type { Space, SpaceRole } from '@/types'

const ROLE_LABELS: Record<SpaceRole | 'owner', { label: string; icon: React.ReactNode }> = {
  owner:  { label: 'Dueño',   icon: <Crown size={11} /> },
  admin:  { label: 'Admin',   icon: <Shield size={11} /> },
  editor: { label: 'Editor',  icon: <Edit3 size={11} /> },
  viewer: { label: 'Viewer',  icon: <Eye size={11} /> },
}

export default function SpacesView() {
  const { spaces, selectedSpace, isLoading, setSpaces, addSpace, updateSpace, removeSpace, setSelectedSpace, setLoading } = useSpaceStore()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [editingSpace, setEditingSpace] = useState<Space | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUserId(user?.id ?? null)
      try {
        const data = await getMySpaces()
        setSpaces(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar spaces')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [setSpaces, setLoading])

  // Cerrar menú al click fuera
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }
    if (openMenuId) document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [openMenuId])

  const handleDelete = async (space: Space) => {
    setOpenMenuId(null)
    removeSpace(space.id)
    try {
      await deleteSpace(space.id)
    } catch {
      addSpace(space)
    }
  }

  const handleLeave = async (space: Space) => {
    if (!currentUserId) return
    setOpenMenuId(null)
    removeSpace(space.id)
    try {
      await removeMember(space.id, currentUserId)
    } catch {
      addSpace(space)
    }
  }

  const handleRename = (space: Space) => {
    setOpenMenuId(null)
    setEditingSpace(space)
  }

  const handleUpdated = (updated: Space) => {
    updateSpace(updated)
    setEditingSpace(null)
  }

  // Si hay un space seleccionado → mostrar detalle
  if (selectedSpace) {
    return (
      <SpaceDetailView
        space={selectedSpace}
        onBack={() => setSelectedSpace(null)}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <p className="text-muted text-sm">Cargando spaces…</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-3xl mx-auto px-8 py-10 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Spaces</h1>
            <p className="text-sm text-muted mt-0.5">
              {spaces.length} space{spaces.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            type="button"
            title="Nuevo space"
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 transition"
          >
            <Plus size={15} />
            Nuevo space
          </button>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Empty state */}
        {spaces.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="w-16 h-16 bg-panel border border-border rounded-2xl flex items-center justify-center">
              <Users size={28} className="text-subtle" />
            </div>
            <div>
              <p className="text-foreground font-medium">Aún no tienes spaces</p>
              <p className="text-muted text-sm mt-1">
                Crea uno para colaborar con tu equipo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 transition"
            >
              Crear primer space
            </button>
          </div>
        )}

        {/* Spaces grid */}
        {spaces.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" ref={menuRef}>
            {spaces.map((space) => {
              const roleInfo = ROLE_LABELS[space.user_role ?? 'viewer']
              const isOwner = space.user_role === 'owner'
              const canManage = isOwner || space.user_role === 'admin'
              const menuOpen = openMenuId === space.id

              return (
                <div
                  key={space.id}
                  className="bg-panel border border-border rounded-xl p-4 flex flex-col gap-3 hover:border-accent/30 transition"
                >
                  {/* Card header: clickable area + 3-dot menu */}
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      title={`Abrir ${space.name}`}
                      onClick={() => setSelectedSpace(space)}
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

                    {/* 3-dot menu */}
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
                          {canManage && (
                            <button
                              type="button"
                              onClick={() => handleRename(space)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-surface transition text-left"
                            >
                              <Pencil size={13} className="text-muted" />
                              Renombrar
                            </button>
                          )}
                          {!isOwner && (
                            <button
                              type="button"
                              onClick={() => handleLeave(space)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-surface transition text-left"
                            >
                              <LogOut size={13} className="text-muted" />
                              Salir del space
                            </button>
                          )}
                          {isOwner && (
                            <>
                              <div className="my-1 border-t border-border" />
                              <button
                                type="button"
                                onClick={() => handleDelete(space)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-surface transition text-left"
                              >
                                <Trash2 size={13} />
                                Eliminar
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Role badge */}
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

      {showCreate && (
        <CreateSpaceModal
          onClose={() => setShowCreate(false)}
          onCreated={(space) => { addSpace(space); setShowCreate(false) }}
        />
      )}

      {editingSpace && (
        <CreateSpaceModal
          editSpace={editingSpace}
          onClose={() => setEditingSpace(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  )
}
