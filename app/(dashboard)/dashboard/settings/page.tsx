'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { User, Settings, Bell, ArrowLeft, Camera, Check, Loader2 } from 'lucide-react'
import { getProfile, updateProfile, uploadAvatar } from '@/lib/supabase/profile'
import { useProfileStore } from '@/store/profileStore'
import { useUIStore } from '@/store/uiStore'
import type { UserProfile } from '@/types'

type Tab = 'perfil' | 'preferencias' | 'notificaciones'

const LANGUAGES = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
]

const TIMEZONES = [
  'America/Panama',
  'America/Bogota',
  'America/Lima',
  'America/Santiago',
  'America/Argentina/Buenos_Aires',
  'America/Mexico_City',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/Madrid',
  'Europe/London',
  'Asia/Tokyo',
]

function SaveButton({
  saving,
  saved,
  onClick,
}: {
  saving: boolean
  saved: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-light disabled:opacity-60 transition cursor-pointer"
    >
      {saving && <Loader2 size={14} className="animate-spin" />}
      {!saving && saved && <Check size={14} />}
      {saved ? 'Guardado' : 'Guardar cambios'}
    </button>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const { setProfile: setStoreProfile } = useProfileStore()
  const { setTheme: setStoreTheme } = useUIStore()

  const [activeTab, setActiveTab] = useState<Tab>('perfil')
  const [profile, setLocalProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedTab, setSavedTab] = useState<Tab | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Perfil
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Preferencias
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark')
  const [language, setLanguage] = useState('es')
  const [timezone, setTimezone] = useState('America/Panama')

  // Notificaciones
  const [emailNotifications, setEmailNotifications] = useState(true)

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (!p) return
        setLocalProfile(p)
        setStoreProfile(p)
        setDisplayName(p.display_name ?? '')
        setBio(p.bio ?? '')
        setTheme(p.theme ?? 'dark')
        setStoreTheme(p.theme ?? 'dark')
        setLanguage(p.language ?? 'es')
        setTimezone(p.timezone ?? 'America/Panama')
        setEmailNotifications(p.email_notifications ?? true)
      })
      .catch(() => setError('Error al cargar el perfil'))
      .finally(() => setLoading(false))
  }, [setStoreProfile])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const showSaved = (tab: Tab) => {
    setSavedTab(tab)
    setTimeout(() => setSavedTab(null), 2000)
  }

  const savePerfil = async () => {
    setSaving(true)
    setError(null)
    try {
      let avatarUrl = profile?.avatar_url ?? null
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile)
        setAvatarFile(null)
      }
      const updated = await updateProfile({
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
        avatar_url: avatarUrl,
      })
      setLocalProfile(updated)
      setStoreProfile(updated)
      showSaved('perfil')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el perfil')
    } finally {
      setSaving(false)
    }
  }

  const savePreferencias = async () => {
    setSaving(true)
    setError(null)
    try {
      const updated = await updateProfile({ theme, language, timezone })
      setLocalProfile(updated)
      setStoreProfile(updated)
      setStoreTheme(theme)
      showSaved('preferencias')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar las preferencias')
    } finally {
      setSaving(false)
    }
  }

  const saveNotificaciones = async () => {
    setSaving(true)
    setError(null)
    try {
      const updated = await updateProfile({ email_notifications: emailNotifications })
      setLocalProfile(updated)
      setStoreProfile(updated)
      showSaved('notificaciones')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar las notificaciones')
    } finally {
      setSaving(false)
    }
  }

  const avatarSrc = avatarPreview ?? (
    profile?.avatar_url
      ? `${profile.avatar_url}?t=${new Date(profile.updated_at).getTime()}`
      : null
  )
  const initials = (displayName || 'U').slice(0, 2).toUpperCase()

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'perfil', label: 'Perfil', icon: <User size={14} /> },
    { id: 'preferencias', label: 'Preferencias', icon: <Settings size={14} /> },
    { id: 'notificaciones', label: 'Notificaciones', icon: <Bell size={14} /> },
  ]

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-1.5 text-muted hover:text-foreground hover:bg-surface rounded-lg transition cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Configuración</h1>
            <p className="text-xs text-muted mt-0.5">Personaliza tu cuenta y preferencias</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-surface rounded-xl mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-elevated text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={24} className="animate-spin text-muted" />
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-5 px-4 py-3 bg-danger/10 border border-danger/20 rounded-lg text-sm text-danger">
                {error}
              </div>
            )}

            {/* ── Perfil ── */}
            {activeTab === 'perfil' && (
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-5">
                  <div className="relative group">
                    {avatarSrc ? (
                      <img
                        src={avatarSrc}
                        alt="Avatar"
                        className="w-20 h-20 rounded-2xl object-cover border border-border"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-accent/20 border border-border flex items-center justify-center">
                        <span className="text-xl font-bold text-accent">{initials}</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer"
                    >
                      <Camera size={18} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Foto de perfil</p>
                    <p className="text-xs text-muted mt-0.5">JPG, PNG o WebP · Máx. 2 MB</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 text-xs text-accent hover:text-accent-light transition cursor-pointer"
                    >
                      Cambiar foto
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nombre visible
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Tu nombre"
                    maxLength={60}
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition"
                    style={{ color: 'var(--color-foreground)' }}
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Cuéntanos algo sobre ti..."
                    maxLength={200}
                    rows={3}
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition resize-none"
                    style={{ color: 'var(--color-foreground)' }}
                  />
                  <p className="text-xs text-subtle mt-1 text-right">{bio.length}/200</p>
                </div>

                <SaveButton saving={saving} saved={savedTab === 'perfil'} onClick={savePerfil} />
              </div>
            )}

            {/* ── Preferencias ── */}
            {activeTab === 'preferencias' && (
              <div className="space-y-6">
                {/* Tema */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Tema</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { value: 'dark', label: 'Oscuro' },
                        { value: 'light', label: 'Claro' },
                        { value: 'system', label: 'Sistema' },
                      ] as const
                    ).map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setTheme(value)}
                        className={`py-3 px-4 rounded-lg border text-sm font-medium transition cursor-pointer ${
                          theme === value
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border bg-surface text-muted hover:text-foreground'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Idioma */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Idioma</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition cursor-pointer"
                    style={{ color: 'var(--color-foreground)', backgroundColor: 'var(--color-surface)' }}
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Zona horaria */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Zona horaria
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition cursor-pointer"
                    style={{ color: 'var(--color-foreground)', backgroundColor: 'var(--color-surface)' }}
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>

                <SaveButton
                  saving={saving}
                  saved={savedTab === 'preferencias'}
                  onClick={savePreferencias}
                />
              </div>
            )}

            {/* ── Notificaciones ── */}
            {activeTab === 'notificaciones' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Notificaciones por email
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Recibe recordatorios de tareas y actualizaciones por correo
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={emailNotifications}
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${
                      emailNotifications ? 'bg-accent' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        emailNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <SaveButton
                  saving={saving}
                  saved={savedTab === 'notificaciones'}
                  onClick={saveNotificaciones}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
