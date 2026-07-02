'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { motion } from 'motion/react'
import { toast } from 'sonner'
import { format, isBefore, isToday, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { BarChart3, BookOpen, CheckSquare, ChevronDown, FileText, Pin, Plus } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useTaskStore } from '@/store/taskStore'
import { useProfileStore } from '@/store/profileStore'
import { createQuickNote, getAllNotesWithNotebook, type NoteWithNotebook } from '@/lib/supabase/notes'
import { getTasks, createTask, toggleTaskComplete } from '@/lib/supabase/tasks'
import { extractTextPreview } from '@/lib/utils/tiptap'
import { slideUp } from '@/lib/motion/tokens'
import TaskModal from '@/components/tasks/TaskModal'
import DashboardStats from '@/components/dashboard/DashboardStats'
import EmptyState from '@/components/ui/EmptyState'
import type { Task } from '@/types'

const LAST_NOTEBOOK_KEY = 'noteevo-last-notebook'
const RECENT_NOTES_LIMIT = 6

function greetingByHour(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Buenos días'
  if (hour < 19) return 'Buenas tardes'
  return 'Buenas noches'
}

function relativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">{children}</h2>
  )
}

export default function HomeView() {
  const { setCurrentView } = useUIStore()
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()
  const { tasks, setTasks, addTask, updateTask } = useTaskStore()
  const { profile } = useProfileStore()

  const [captureText, setCaptureText] = useState('')
  const [creating, setCreating] = useState(false)
  const [allNotes, setAllNotes] = useState<NoteWithNotebook[]>([])
  const [loading, setLoading] = useState(true)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const captureRef = useRef<HTMLInputElement>(null)
  const [todayListRef] = useAutoAnimate()

  useEffect(() => {
    Promise.all([
      getAllNotesWithNotebook().then(setAllNotes).catch(() => {}),
      getTasks().then(setTasks).catch(() => {}),
    ]).finally(() => setLoading(false))
  }, [setTasks])

  const activeNotes = useMemo(() => allNotes.filter((n) => !n.is_trashed), [allNotes])
  const pinnedNotes = useMemo(() => activeNotes.filter((n) => n.is_pinned), [activeNotes])
  const recentNotes = useMemo(
    () => activeNotes.filter((n) => !n.is_pinned).slice(0, RECENT_NOTES_LIMIT),
    [activeNotes]
  )

  const todayTasks = useMemo(() => {
    const today = startOfDay(new Date())
    return tasks
      .filter((t) => !t.is_completed && t.due_date)
      .filter((t) => {
        const due = startOfDay(new Date(t.due_date as string))
        return isBefore(due, today) || isToday(due)
      })
      .sort((a, b) => new Date(a.due_date as string).getTime() - new Date(b.due_date as string).getTime())
  }, [tasks])

  const captureNotebook = () => {
    const lastId = typeof window !== 'undefined' ? localStorage.getItem(LAST_NOTEBOOK_KEY) : null
    return notebooks.find((nb) => nb.id === lastId) ?? notebooks[0] ?? null
  }

  const handleCapture = async (title?: string) => {
    if (creating) return
    const notebook = captureNotebook()
    if (!notebook) {
      toast.error('Crea una libreta desde el sidebar para empezar')
      return
    }
    setCreating(true)
    try {
      const note = await createQuickNote(notebook.id, title)
      localStorage.setItem(LAST_NOTEBOOK_KEY, notebook.id)
      addNote(note)
      setSelectedNote(note)
      setSelectedNotebook(notebook)
      setCurrentView('notebooks')
      setCaptureText('')
    } catch {
      toast.error('No se pudo crear la nota')
    } finally {
      setCreating(false)
    }
  }

  const handleCreateTask = async (data: {
    title: string
    description: string
    due_date: string
    start_time: string | null
    end_time: string | null
    priority: Task['priority']
    is_flagged: boolean
    note_id: string | null
  }) => {
    try {
      const task = await createTask(data.title, {
        description: data.description || undefined,
        due_date: data.due_date || undefined,
        start_time: data.start_time ?? undefined,
        end_time: data.end_time ?? undefined,
        priority: data.priority,
        is_flagged: data.is_flagged,
        note_id: data.note_id ?? undefined,
      })
      addTask(task)
      toast.success('Tarea creada')
    } catch {
      toast.error('No se pudo crear la tarea')
    }
  }

  const handleCompleteTask = async (task: Task) => {
    updateTask(task.id, { is_completed: true })
    try {
      await toggleTaskComplete(task.id, true)
    } catch {
      updateTask(task.id, { is_completed: false })
      toast.error('No se pudo completar la tarea')
    }
  }

  const openNote = (note: NoteWithNotebook) => {
    setSelectedNote(note)
    const notebook = notebooks.find((nb) => nb.id === note.notebook_id)
    if (notebook) setSelectedNotebook(notebook)
    setCurrentView('notebooks')
  }

  const displayName = profile?.display_name?.trim()
  const isBrandNew = !loading && activeNotes.length === 0 && todayTasks.length === 0

  const noteCard = (note: NoteWithNotebook) => (
    <button
      key={note.id}
      type="button"
      onClick={() => openNote(note)}
      className="flex flex-col gap-1.5 p-4 bg-panel border border-border rounded-xl text-left hover:border-accent/40 hover:bg-surface transition cursor-pointer group"
    >
      <div className="flex items-center gap-2 min-w-0">
        {note.is_pinned && <Pin size={12} className="text-accent shrink-0" />}
        <FileText size={14} className="text-muted shrink-0 group-hover:text-accent transition-colors" />
        <span className="text-sm font-medium text-foreground truncate flex-1">
          {note.title || 'Sin título'}
        </span>
        <span className="text-[11px] text-subtle shrink-0">{relativeDate(note.updated_at)}</span>
      </div>
      <p className="text-xs text-muted line-clamp-2 leading-relaxed">
        {extractTextPreview(note.content) || 'Sin contenido'}
      </p>
      {note.notebooks?.name && (
        <span className="text-[10px] text-accent flex items-center gap-1">
          <BookOpen size={9} />
          {note.notebooks.name}
        </span>
      )}
    </button>
  )

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <motion.div
        {...slideUp}
        className="max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-12 flex flex-col gap-10"
      >
        {/* Saludo contextual */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {greetingByHour()}
            {displayName ? `, ${displayName}` : ''}
          </h1>
          <p className="text-muted text-sm mt-1 capitalize">
            {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
          </p>
        </div>

        {/* Captura rápida — lo más prominente */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            ref={captureRef}
            type="text"
            value={captureText}
            onChange={(e) => setCaptureText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCapture(captureText)}
            placeholder="Captura rápida… (Enter para crear una nota)"
            disabled={creating}
            className="flex-1 px-4 py-3 bg-panel border border-border rounded-xl text-[15px] text-foreground placeholder:text-subtle outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition disabled:opacity-60"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleCapture(captureText)}
              disabled={creating}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-3 bg-accent text-white text-sm font-medium rounded-xl hover:bg-accent-light active:scale-[0.98] transition cursor-pointer disabled:opacity-50"
            >
              <Plus size={16} />
              Nueva nota
            </button>
            <button
              type="button"
              onClick={() => setShowTaskModal(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-3 bg-panel border border-border text-foreground text-sm font-medium rounded-xl hover:bg-surface hover:border-accent/40 active:scale-[0.98] transition cursor-pointer"
            >
              <CheckSquare size={16} />
              Nueva tarea
            </button>
          </div>
        </div>

        {isBrandNew ? (
          <EmptyState
            variant="notes"
            title="Tu segundo cerebro empieza aquí"
            description="Escribe tu primera idea en la captura rápida o crea una nota vacía. Todo lo demás llega solo."
            action={{ label: 'Crear primera nota', onClick: () => captureRef.current?.focus() }}
          />
        ) : (
          <>
            {/* Ancladas — solo si hay */}
            {pinnedNotes.length > 0 && (
              <section>
                <SectionTitle>Ancladas</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-2.5">{pinnedNotes.map(noteCard)}</div>
              </section>
            )}

            {/* Continuar donde lo dejaste */}
            {recentNotes.length > 0 && (
              <section>
                <SectionTitle>Continuar donde lo dejaste</SectionTitle>
                <div className="grid sm:grid-cols-2 gap-2.5">{recentNotes.map(noteCard)}</div>
              </section>
            )}

            {/* Para hoy */}
            <section>
              <SectionTitle>Para hoy</SectionTitle>
              {todayTasks.length === 0 ? (
                <p className="text-sm text-muted px-1">
                  Nada pendiente para hoy. Respira — o crea una tarea si tu cabeza dice lo contrario.
                </p>
              ) : (
                <div ref={todayListRef} className="flex flex-col gap-1.5">
                  {todayTasks.map((task) => {
                    const overdue = isBefore(startOfDay(new Date(task.due_date as string)), startOfDay(new Date()))
                    return (
                      <div
                        key={task.id}
                        className="flex items-center gap-3 px-4 py-3 bg-panel border border-border rounded-xl"
                      >
                        <button
                          type="button"
                          title="Completar tarea"
                          onClick={() => handleCompleteTask(task)}
                          className="w-6 h-6 shrink-0 rounded-md border-2 border-muted hover:border-accent hover:bg-accent/10 transition cursor-pointer active:scale-90"
                        />
                        <span className="text-sm text-foreground flex-1 truncate">{task.title}</span>
                        <span
                          className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                            overdue ? 'bg-danger/15 text-danger' : 'bg-amber-500/15 text-amber-500'
                          }`}
                        >
                          {overdue ? 'Vencida' : 'Hoy'}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>

            {/* Estadísticas plegadas: el Home no compite con el dashboard */}
            <section>
              <button
                type="button"
                onClick={() => setShowStats((v) => !v)}
                className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition cursor-pointer"
              >
                <BarChart3 size={15} />
                Ver estadísticas
                <ChevronDown
                  size={14}
                  className={`transition-transform ${showStats ? 'rotate-180' : ''}`}
                />
              </button>
              {showStats && (
                <div className="mt-4">
                  <DashboardStats />
                </div>
              )}
            </section>
          </>
        )}
      </motion.div>

      {showTaskModal && (
        <TaskModal onClose={() => setShowTaskModal(false)} onSave={handleCreateTask} />
      )}
    </div>
  )
}
