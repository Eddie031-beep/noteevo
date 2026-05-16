'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError('No se pudo crear la cuenta. Intenta de nuevo.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Crear cuenta</h1>
          <p className="text-muted text-sm mt-1">Únete a NoteEvo</p>
        </div>

        {/* Form card */}
        <div className="bg-panel border border-border rounded-2xl p-6 space-y-4">
          {error && (
            <div className="p-3 bg-danger/10 border border-danger/25 rounded-lg">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-muted mb-1.5"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                className="w-full px-3 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-muted mb-1.5"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                className="w-full px-3 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light disabled:opacity-50 transition cursor-pointer"
          >
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </div>

        <p className="mt-5 text-sm text-muted text-center">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-accent hover:text-accent-light transition">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
