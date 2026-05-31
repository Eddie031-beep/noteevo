'use client'

import { useEffect, useState } from 'react'
import { Sparkles, BookOpen, FileText, ArrowRight, Check, Loader2 } from 'lucide-react'
import { getProfile, updateProfile } from '@/lib/supabase/profile'
import { createNotebook } from '@/lib/supabase/notebooks'
import { createNote } from '@/lib/supabase/notes'
import { useProfileStore } from '@/store/profileStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import type { Notebook } from '@/types'

const TOTAL_STEPS = 3

export default function OnboardingModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [notebookName, setNotebookName] = useState('Mi primera libreta')
  const [createdNotebook, setCreatedNotebook] = useState<Notebook | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setProfile } = useProfileStore()
  const { addNotebook, setSelectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (p && !p.onboarding_completed) {
          setName(p.display_name ?? '')
          setOpen(true)
        }
      })
      .catch(() => {})
  }, [])

  const finish = async (withNote: boolean) => {
    setBusy(true)
    setError(null)
    try {
      // Asegurar libreta creada (por si llegó al paso final sin crearla)
      let notebook = createdNotebook
      if (!notebook) {
        notebook = await createNotebook(notebookName.trim() || 'Mi primera libreta')
        addNotebook(notebook)
      }

      if (withNote) {
        const note = await createNote(notebook.id)
        addNote(note)
        setSelectedNotebook(notebook)
        setSelectedNote(note)
        setCurrentView('notebooks')
      }

      const updated = await updateProfile({
        display_name: name.trim() || null,
        onboarding_completed: true,
      })
      setProfile(updated)
      setOpen(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ocurrió un error')
    } finally {
      setBusy(false)
    }
  }

  const skip = async () => {
    setBusy(true)
    try {
      const updated = await updateProfile({ onboarding_completed: true })
      setProfile(updated)
      setOpen(false)
    } catch {
      setOpen(false)
    } finally {
      setBusy(false)
    }
  }

  const goToNotebookStep = () => setStep(1)

  const createNotebookAndContinue = async () => {
    setBusy(true)
    setError(null)
    try {
      const notebook = await createNotebook(notebookName.trim() || 'Mi primera libreta')
      addNotebook(notebook)
      setCreatedNotebook(notebook)
      setStep(2)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo crear la libreta')
    } finally {
      setBusy(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-panel border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Progreso */}
        <div className="flex gap-1.5 p-4 pb-0">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>

        <div className="p-6 flex flex-col gap-5">
          {step === 0 && (
            <>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-accent/15 rounded-2xl flex items-center justify-center">
                  <Sparkles size={26} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">¡Bienvenido a NoteEvo!</h2>
                  <p className="text-sm text-muted mt-1">Configuremos tu espacio en 3 pasos.</p>
                </div>
              </div>
              <div>
                <label htmlFor="ob-name" className="block text-xs font-medium text-muted mb-1.5">
                  ¿Cómo te llamamos?
                </label>
                <input
                  id="ob-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  autoFocus
                  className="w-full px-3 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={skip}
                  disabled={busy}
                  className="text-sm text-muted hover:text-foreground transition cursor-pointer"
                >
                  Omitir
                </button>
                <button
                  type="button"
                  onClick={goToNotebookStep}
                  className="flex items-center gap-1.5 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition cursor-pointer"
                >
                  Siguiente <ArrowRight size={15} />
                </button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-accent/15 rounded-2xl flex items-center justify-center">
                  <BookOpen size={26} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Tu primera libreta</h2>
                  <p className="text-sm text-muted mt-1">Las libretas organizan tus notas por tema.</p>
                </div>
              </div>
              <div>
                <label htmlFor="ob-nb" className="block text-xs font-medium text-muted mb-1.5">
                  Nombre de la libreta
                </label>
                <input
                  id="ob-nb"
                  type="text"
                  value={notebookName}
                  onChange={(e) => setNotebookName(e.target.value)}
                  autoFocus
                  className="w-full px-3 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
                />
              </div>
              {error && <p className="text-sm text-danger">{error}</p>}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  disabled={busy}
                  className="text-sm text-muted hover:text-foreground transition cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={createNotebookAndContinue}
                  disabled={busy || !notebookName.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition cursor-pointer disabled:opacity-50"
                >
                  {busy ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
                  Crear y seguir
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-accent/15 rounded-2xl flex items-center justify-center">
                  <FileText size={26} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">¡Casi listo!</h2>
                  <p className="text-sm text-muted mt-1">
                    Crea tu primera nota en <span className="text-foreground font-medium">{createdNotebook?.name}</span> y empieza a escribir.
                  </p>
                </div>
              </div>
              {error && <p className="text-sm text-danger">{error}</p>}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => finish(true)}
                  disabled={busy}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition cursor-pointer disabled:opacity-50"
                >
                  {busy ? <Loader2 size={15} className="animate-spin" /> : <FileText size={15} />}
                  Crear mi primera nota
                </button>
                <button
                  type="button"
                  onClick={() => finish(false)}
                  disabled={busy}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-elevated border border-border text-foreground text-sm font-medium rounded-lg hover:bg-surface transition cursor-pointer disabled:opacity-50"
                >
                  <Check size={15} /> Terminar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
