'use client'

import { useState, useEffect, useRef } from 'react'
import { Globe, Link, Lock, Eye, PenLine, Check } from 'lucide-react'
import { getShareLink, createShareLink, updateShareLink } from '@/lib/supabase/shared-notes'
import type { SharedNote } from '@/types'

interface ShareControlsProps {
  noteId: string
  noteTitle: string
}

type AccessLevel = 'none' | 'view' | 'edit'

export default function ShareControls({ noteId, noteTitle }: ShareControlsProps) {
  const [sharedNote, setSharedNote] = useState<SharedNote | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null)

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const shareUrl = sharedNote?.public_slug ? `${origin}/n/${sharedNote.public_slug}` : ''
  const accessLevel: AccessLevel = sharedNote?.access_level ?? 'none'
  const isRestricted = !sharedNote || accessLevel === 'none'

  useEffect(() => {
    let cancelled = false
    // Reset + carga del estado de compartir al cambiar de nota (patrón intencional).
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setSharedNote(null)
    setLoading(true)
    getShareLink(noteId)
      .then((data) => { if (!cancelled) { setSharedNote(data); setLoading(false) } })
      .catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [noteId])

  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  const showToast = (msg: string) => {
    setToast(msg)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToast(null), 3000)
  }

  const handleAccessChange = async (level: AccessLevel) => {
    setDropdownOpen(false)
    if (updating) return
    setUpdating(true)
    try {
      const isActive = level !== 'none'
      if (!sharedNote) {
        if (level === 'none') return
        // createShareLink crea con access_level 'view'; si se pidió 'edit',
        // se promociona inmediatamente.
        const created = await createShareLink(noteId)
        if (level === 'edit') {
          await updateShareLink(created.id, { access_level: 'edit', is_active: true })
          setSharedNote({ ...created, access_level: 'edit', is_active: true })
        } else {
          setSharedNote(created)
        }
      } else {
        await updateShareLink(sharedNote.id, { access_level: level, is_active: isActive })
        setSharedNote({ ...sharedNote, access_level: level, is_active: isActive })
      }
    } catch {
      // error silencioso
    } finally {
      setUpdating(false)
    }
  }

  const handleCopyLink = async () => {
    if (isRestricted || !shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      const title = noteTitle.trim() || 'Sin título'
      showToast(`Link to '${title}' copied to clipboard`)
    } catch {
      // clipboard bloqueado
    }
  }

  const globeActive = !isRestricted

  return (
    <>
      <div className="flex items-center gap-0.5">
        {/* Globe dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            title="Acceso al enlace"
            disabled={loading || updating}
            onClick={() => setDropdownOpen((v) => !v)}
            className={`p-1.5 rounded transition cursor-pointer disabled:opacity-40 ${
              dropdownOpen || globeActive
                ? 'text-accent'
                : 'text-muted hover:bg-surface hover:text-foreground'
            } ${dropdownOpen ? 'bg-surface' : ''}`}
          >
            <Globe size={14} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-9 z-50 bg-panel border border-border rounded-xl shadow-2xl w-64 py-1.5 overflow-hidden">
              <p className="px-3 pb-1 pt-1.5 text-[10px] font-semibold text-muted uppercase tracking-wider">
                Acceso al enlace
              </p>

              {/* Restricted */}
              <button
                type="button"
                onClick={() => handleAccessChange('none')}
                className="w-full flex items-start gap-3 px-3 py-2.5 text-xs transition cursor-pointer hover:bg-surface"
              >
                <Lock size={13} className="mt-0.5 shrink-0 text-muted" />
                <span className="flex-1 text-left">
                  <span className={`font-medium block ${accessLevel === 'none' ? 'text-foreground' : 'text-muted'}`}>
                    Restricted access
                  </span>
                  <span className="text-muted text-[11px]">Solo el propietario puede acceder</span>
                </span>
                {accessLevel === 'none' && <Check size={12} className="mt-1 text-accent shrink-0" />}
              </button>

              {/* View */}
              <button
                type="button"
                onClick={() => handleAccessChange('view')}
                className="w-full flex items-start gap-3 px-3 py-2.5 text-xs transition cursor-pointer hover:bg-surface"
              >
                <Eye size={13} className="mt-0.5 shrink-0 text-muted" />
                <span className="flex-1 text-left">
                  <span className={`font-medium block ${accessLevel === 'view' ? 'text-foreground' : 'text-muted'}`}>
                    Anyone with the link can view
                  </span>
                  <span className="text-muted text-[11px]">Acceso de solo lectura</span>
                </span>
                {accessLevel === 'view' && <Check size={12} className="mt-1 text-accent shrink-0" />}
              </button>

              {/* Edit */}
              <button
                type="button"
                onClick={() => handleAccessChange('edit')}
                className="w-full flex items-start gap-3 px-3 py-2.5 text-xs transition cursor-pointer hover:bg-surface"
              >
                <PenLine size={13} className="mt-0.5 shrink-0 text-muted" />
                <span className="flex-1 text-left">
                  <span className={`font-medium block ${accessLevel === 'edit' ? 'text-foreground' : 'text-muted'}`}>
                    Anyone with the link can edit
                  </span>
                  <span className="text-muted text-[11px]">Cualquiera con el link puede editar la nota</span>
                </span>
                {accessLevel === 'edit' && <Check size={12} className="mt-1 text-accent shrink-0" />}
              </button>
            </div>
          )}
        </div>

        {/* Share button */}
        <button
          type="button"
          title={isRestricted ? 'Cambia el acceso para compartir' : 'Copiar enlace'}
          disabled={isRestricted || loading || updating}
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition cursor-pointer text-muted hover:bg-surface hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Link size={13} />
          Share
        </button>
      </div>

      {/* Toast — fixed bottom-left */}
      {toast && (
        <div
          key={toast}
          className="toast-enter fixed bottom-6 left-6 z-[200] flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium pointer-events-none"
        >
          <Check size={13} />
          {toast}
        </div>
      )}
    </>
  )
}
