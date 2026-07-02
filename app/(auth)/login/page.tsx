'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="dotted-paper min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Marca */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-accent/25">
            <span className="text-white font-bold text-2xl leading-none">N</span>
          </div>
          <p className="text-lg font-semibold tracking-tight text-foreground">
            Note<span className="text-accent">Evo</span>
          </p>
          <div className="w-8 h-px bg-accent/40 my-3" />
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Bienvenido de vuelta</h1>
          <p className="text-muted text-sm mt-1.5">Tu segundo cerebro te espera</p>
        </div>

        {/* Tarjeta de formulario */}
        <div className="bg-panel border border-border rounded-2xl p-7 space-y-5 shadow-xl shadow-black/20">
          {error && (
            <div className="p-3 bg-danger/10 border border-danger/25 rounded-lg">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium uppercase tracking-wider text-muted mb-2"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-3.5 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium uppercase tracking-wider text-muted mb-2"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-3.5 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>
          </div>

          <button
            type="button"
            data-testid="login-submit"
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light active:scale-[0.99] disabled:opacity-50 transition cursor-pointer shadow-md shadow-accent/20"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>

        <p className="mt-6 text-sm text-muted text-center">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-accent font-medium hover:text-accent-light transition">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
