'use client'

import { useState } from 'react'
import { X, UserPlus } from 'lucide-react'
import type { SpaceRole } from '@/types'

interface InviteModalProps {
  spaceId: string
  onClose: () => void
}

const ROLE_OPTIONS: { value: SpaceRole; label: string; description: string }[] = [
  { value: 'viewer', label: 'Viewer',  description: 'Solo puede leer' },
  { value: 'editor', label: 'Editor',  description: 'Puede crear y editar' },
  { value: 'admin',  label: 'Admin',   description: 'Puede invitar y administrar' },
]

export default function InviteModal({ spaceId, onClose }: InviteModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<SpaceRole>('viewer')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Introduce un email válido')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/spaces/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId, email: email.trim(), role }),
      })

      const json = await res.json()
      if (!json.success) {
        setError(json.error ?? 'Error al invitar')
        return
      }

      setSuccess(true)
      setEmail('')
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-panel border border-border rounded-2xl w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <UserPlus size={16} className="text-accent" />
            <h2 className="font-semibold text-foreground">Compartir space</h2>
          </div>
          <button type="button" title="Cerrar" onClick={onClose} className="text-muted hover:text-foreground transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Email del usuario
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); setSuccess(false) }}
              placeholder="usuario@email.com"
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-accent"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Rol
            </label>
            <div className="flex gap-2">
              {ROLE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRole(opt.value)}
                  className={`flex-1 flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-lg border text-xs transition ${
                    role === opt.value
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-border bg-surface text-muted hover:border-accent/40'
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                  <span className="text-[10px] opacity-70">{opt.description}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}
          {success && (
            <p className="text-green-400 text-xs">¡Invitación enviada correctamente!</p>
          )}

          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-muted hover:text-foreground transition">
              Cerrar
            </button>
            <button
              type="submit"
              disabled={!email.trim() || loading}
              className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Invitando…' : 'Invitar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
