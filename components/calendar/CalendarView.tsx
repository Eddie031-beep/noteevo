'use client'

import { useEffect, useRef, useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import { getTasks, createTask } from '@/lib/supabase/tasks'
import TaskModal from '@/components/tasks/TaskModal'
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock } from 'lucide-react'
import {
  format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays,
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  isSameMonth, isToday,
} from 'date-fns'
import { es } from 'date-fns/locale'
import type { Task } from '@/types'

type CalView = 'month' | 'week' | 'day'

const PRIORITY_PILL: Record<Task['priority'], string> = {
  high: 'bg-red-500/15 text-red-400',
  medium: 'bg-yellow-500/15 text-yellow-400',
  low: 'bg-blue-500/15 text-blue-400',
}

const PRIORITY_DOT: Record<Task['priority'], string> = {
  high: 'bg-red-400',
  medium: 'bg-yellow-400',
  low: 'bg-blue-400',
}

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const MS_PER_DAY = 24 * 60 * 60 * 1000
const HOUR_HEIGHT = 48 // px por hora en la rejilla de semana
const HOURS = Array.from({ length: 24 }, (_, i) => i)

// ── Helpers de fecha/hora ────────────────────────────────────────────────────
// Las horas se guardan como "reloj literal" en la columna timestamptz (sin
// conversión de zona), por lo que basta con leer la porción HH:mm del ISO.

/** Porción de fecha (YYYY-MM-DD) por la que la tarea pertenece a un día. */
function dateKey(task: Task): string | null {
  const src = task.start_time ?? task.due_date
  return src ? src.slice(0, 10) : null
}

/** Minutos desde medianoche a partir de un ISO con hora literal. */
function minutesOf(iso: string): number {
  return Number(iso.slice(11, 13)) * 60 + Number(iso.slice(14, 16))
}

/** Etiqueta "HH:mm" o "HH:mm–HH:mm" para un evento con hora. */
function timeLabel(task: Task): string | null {
  if (!task.start_time) return null
  const start = task.start_time.slice(11, 16)
  return task.end_time ? `${start}–${task.end_time.slice(11, 16)}` : start
}

// Urgencia de una tarea según su fecha respecto a hoy.
type DueUrgency = 'overdue' | 'soon' | 'none'

function dueUrgency(task: Task, today: Date): DueUrgency {
  const src = task.start_time ?? task.due_date
  if (!src || task.is_completed) return 'none'
  const [year, month, dayNum] = src.split('T')[0].split('-').map(Number)
  const due = new Date(year, month - 1, dayNum)
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const diffDays = Math.round((due.getTime() - startToday.getTime()) / MS_PER_DAY)
  if (diffDays <= 0) return 'overdue'
  if (diffDays <= 7) return 'soon'
  return 'none'
}

const URGENCY_PILL: Record<Exclude<DueUrgency, 'none'>, string> = {
  overdue: 'bg-red-500/20 text-red-300 ring-1 ring-red-500/60',
  soon: 'bg-yellow-500/15 text-yellow-300 ring-1 ring-yellow-500/50',
}

const URGENCY_DOT: Record<Exclude<DueUrgency, 'none'>, string> = {
  overdue: 'bg-red-400',
  soon: 'bg-yellow-400',
}

// Fondo sutil de celda de día según la urgencia máxima de sus tareas.
const URGENCY_CELL_BG: Record<Exclude<DueUrgency, 'none'>, string> = {
  overdue: 'bg-red-500/[0.04]',
  soon: 'bg-yellow-500/[0.04]',
}

// La urgencia por vencimiento tiene prioridad visual sobre el color por prioridad.
function pillClass(task: Task, today: Date): string {
  const urgency = dueUrgency(task, today)
  return urgency !== 'none' ? URGENCY_PILL[urgency] : PRIORITY_PILL[task.priority]
}

function dayUrgency(tasks: Task[], today: Date): DueUrgency {
  let result: DueUrgency = 'none'
  for (const t of tasks) {
    const u = dueUrgency(t, today)
    if (u === 'overdue') return 'overdue'
    if (u === 'soon') result = 'soon'
  }
  return result
}

function buildMonthGrid(date: Date): Date[][] {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
  const weeks: Date[][] = []
  let cur = start
  while (cur <= end) {
    const week: Date[] = []
    for (let i = 0; i < 7; i++) { week.push(cur); cur = addDays(cur, 1) }
    weeks.push(week)
  }
  return weeks
}

function buildWeekDays(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

function tasksForDay(tasks: Task[], day: Date): Task[] {
  const key = format(day, 'yyyy-MM-dd')
  return tasks.filter((t) => dateKey(t) === key)
}

// ── Vista principal ──────────────────────────────────────────────────────────

type QuickState = { x: number; y: number; date: string; time?: string }
type ModalInit = { date: string; startTime?: string; endTime?: string }

export default function CalendarView() {
  const { tasks, setTasks, addTask } = useTaskStore()
  const [view, setView] = useState<CalView>('month')
  const [current, setCurrent] = useState(new Date())
  const [quick, setQuick] = useState<QuickState | null>(null)
  const [modalInit, setModalInit] = useState<ModalInit | null>(null)

  useEffect(() => {
    const load = async () => {
      try { const data = await getTasks(); setTasks(data) } catch { /* sin tareas */ }
    }
    load()
  }, [setTasks])

  const openQuick = (e: React.MouseEvent, day: Date, time?: string) => {
    setQuick({ x: e.clientX, y: e.clientY, date: format(day, 'yyyy-MM-dd'), time })
  }
  const openFull = (day: Date, startTime?: string) => {
    setModalInit({ date: format(day, 'yyyy-MM-dd'), startTime })
  }

  // Creación rápida desde el popover (la hora puede venir editada).
  const handleQuickCreate = async (title: string, time?: string) => {
    if (!quick) return
    const t = time ?? quick.time
    const startIso = t ? `${quick.date}T${t}:00` : null
    const task = await createTask(title, {
      due_date: quick.date,
      start_time: startIso ?? undefined,
      priority: 'medium',
    })
    addTask(task)
    setQuick(null)
  }

  // Creación completa desde el modal (start_time/end_time ya vienen como ISO).
  const handleCreate = async (data: {
    title: string; description: string; due_date: string
    start_time: string | null; end_time: string | null
    priority: Task['priority']; is_flagged: boolean; note_id: string | null
  }) => {
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
  }

  const prev = () => {
    if (view === 'month') setCurrent(subMonths(current, 1))
    else if (view === 'week') setCurrent(subWeeks(current, 1))
    else setCurrent(subDays(current, 1))
  }
  const next = () => {
    if (view === 'month') setCurrent(addMonths(current, 1))
    else if (view === 'week') setCurrent(addWeeks(current, 1))
    else setCurrent(addDays(current, 1))
  }

  const title = (() => {
    if (view === 'month') return format(current, 'MMMM yyyy', { locale: es })
    if (view === 'week') {
      const s = startOfWeek(current, { weekStartsOn: 1 })
      const e = endOfWeek(current, { weekStartsOn: 1 })
      return isSameMonth(s, e)
        ? `${format(s, 'd')} – ${format(e, 'd MMM yyyy', { locale: es })}`
        : `${format(s, 'd MMM', { locale: es })} – ${format(e, 'd MMM yyyy', { locale: es })}`
    }
    return format(current, "EEEE d 'de' MMMM yyyy", { locale: es })
  })()

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="h-14 px-6 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button type="button" title="Anterior" onClick={prev}
            className="p-1.5 text-muted hover:text-foreground hover:bg-surface rounded-lg transition cursor-pointer">
            <ChevronLeft size={16} />
          </button>
          <h2 className="font-semibold text-foreground text-sm capitalize min-w-[220px] text-center">
            {title}
          </h2>
          <button type="button" title="Siguiente" onClick={next}
            className="p-1.5 text-muted hover:text-foreground hover:bg-surface rounded-lg transition cursor-pointer">
            <ChevronRight size={16} />
          </button>
          <button type="button" onClick={() => setCurrent(new Date())}
            className="px-2.5 py-1 text-xs font-medium text-foreground bg-surface hover:bg-elevated border border-border rounded-lg transition cursor-pointer ml-1">
            Hoy
          </button>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-0.5 bg-surface rounded-lg p-0.5">
          {(['month', 'week', 'day'] as CalView[]).map((v) => (
            <button key={v} type="button" onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs rounded-md transition cursor-pointer font-medium ${
                view === v ? 'bg-panel text-foreground shadow-sm' : 'text-muted hover:text-foreground'
              }`}>
              {v === 'month' ? 'Mes' : v === 'week' ? 'Semana' : 'Día'}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar body */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {view === 'month' && <MonthView current={current} tasks={tasks} onQuick={openQuick} onAddFull={openFull} />}
        {view === 'week' && <WeekView current={current} tasks={tasks} onQuick={openQuick} onAddFull={openFull} />}
        {view === 'day' && <DayView current={current} tasks={tasks} onAdd={() => openFull(current)} />}
      </div>

      {quick && (
        <QuickCreatePopover
          state={quick}
          onCreate={handleQuickCreate}
          onMore={(time) => { setModalInit({ date: quick.date, startTime: time ?? quick.time }); setQuick(null) }}
          onClose={() => setQuick(null)}
        />
      )}

      {modalInit && (
        <TaskModal
          onClose={() => setModalInit(null)}
          onSave={handleCreate}
          initialDate={modalInit.date}
          initialStartTime={modalInit.startTime}
          initialEndTime={modalInit.endTime}
        />
      )}
    </div>
  )
}

/* ── Popover de creación rápida ── */
function QuickCreatePopover({
  state, onCreate, onMore, onClose,
}: {
  state: QuickState
  onCreate: (title: string, time?: string) => void | Promise<void>
  onMore: (time?: string) => void
  onClose: () => void
}) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState(state.time ?? '')
  const [saving, setSaving] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasTimeSlot = state.time !== undefined

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', esc)
    }
  }, [onClose])

  const submit = async () => {
    if (!title.trim() || saving) return
    setSaving(true)
    try { await onCreate(title.trim(), hasTimeSlot ? (time || undefined) : undefined) } finally { setSaving(false) }
  }

  // Posición anclada al clic, acotada a la ventana.
  const W = 268
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1000
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const left = Math.max(12, Math.min(state.x, vw - W - 12))
  const top = Math.max(12, Math.min(state.y, vh - 190))

  const dateLabel = (() => {
    const [y, m, d] = state.date.split('-').map(Number)
    return format(new Date(y, m - 1, d), "EEE d 'de' MMM", { locale: es })
  })()

  return (
    <div
      ref={ref}
      className="fixed z-50 w-[268px] bg-panel border border-border rounded-xl shadow-2xl p-3"
      style={{ left, top }}
    >
      <div className="flex items-center gap-1.5 text-xs text-muted mb-2 capitalize">
        <Calendar size={12} className="text-accent" />
        {dateLabel}
      </div>
      {hasTimeSlot && (
        <div className="flex items-center gap-1.5 mb-2">
          <Clock size={13} className="text-accent shrink-0" />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            aria-label="Hora"
            title="Hora (puedes ajustar al minuto, ej. 23:59)"
            className="bg-surface border border-border rounded-lg px-2 py-1 text-xs text-foreground outline-none focus:border-accent/50 transition tabular-nums"
            style={{ color: 'var(--color-foreground)' }}
          />
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        value={title}
        placeholder="Título de la tarea"
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
        className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none placeholder-subtle focus:border-accent/50 transition"
        style={{ color: 'var(--color-foreground)' }}
      />
      <div className="flex items-center justify-between gap-2 mt-2.5">
        <button
          type="button"
          onClick={() => onMore(hasTimeSlot ? (time || undefined) : undefined)}
          className="text-xs text-muted hover:text-foreground transition cursor-pointer"
        >
          Más detalles →
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={!title.trim() || saving}
          className="px-3.5 py-1.5 text-xs font-semibold bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer"
        >
          {saving ? 'Creando…' : 'Crear'}
        </button>
      </div>
    </div>
  )
}

/* ── Month view ── */
function MonthView({ current, tasks, onQuick, onAddFull }: {
  current: Date; tasks: Task[]
  onQuick: (e: React.MouseEvent, day: Date) => void
  onAddFull: (day: Date) => void
}) {
  const weeks = buildMonthGrid(current)
  const today = new Date()
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-border shrink-0 bg-surface/40">
        {DAY_LABELS.map((d) => (
          <div key={d} className="py-2 text-center text-[11px] font-semibold text-muted uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>
      {/* Weeks */}
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 divide-x divide-border" style={{ minHeight: 120 }}>
            {week.map((day, di) => {
              const dayTasks = tasksForDay(tasks, day)
              const inMonth = isSameMonth(day, current)
              const isCurrentDay = isToday(day)
              const urgency = dayUrgency(dayTasks, today)
              const cellBg = urgency !== 'none' ? URGENCY_CELL_BG[urgency] : ''
              return (
                <div key={di} onClick={(e) => onQuick(e, day)}
                  className={`p-2 cursor-pointer hover:bg-surface transition group ${!inMonth ? 'opacity-40' : ''} ${cellBg} ${
                    urgency === 'overdue' ? 'border-l-2 border-l-red-500'
                      : urgency === 'soon' ? 'border-l-2 border-l-yellow-500'
                      : ''
                  }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1">
                      <span className={`text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full ${
                        isCurrentDay ? 'bg-accent text-white' : 'text-foreground'
                      }`}>
                        {format(day, 'd')}
                      </span>
                      {urgency !== 'none' && (
                        <span title={urgency === 'overdue' ? 'Tareas vencidas o que vencen hoy' : 'Tareas que vencen pronto'}
                          className={`w-1.5 h-1.5 rounded-full ${URGENCY_DOT[urgency]}`} />
                      )}
                    </span>
                    <button type="button" title="Crear tarea con detalles"
                      onClick={(e) => { e.stopPropagation(); onAddFull(day) }}
                      className="opacity-0 group-hover:opacity-100 text-muted hover:text-accent transition cursor-pointer rounded">
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="space-y-0.5">
                    {dayTasks.slice(0, 3).map((t) => (
                      <div key={t.id} title={t.title}
                        className={`text-[10px] px-1.5 py-0.5 rounded truncate ${pillClass(t, today)} ${t.is_completed ? 'opacity-40 line-through' : ''}`}>
                        {t.start_time && <span className="font-semibold mr-1 tabular-nums">{t.start_time.slice(11, 16)}</span>}
                        {t.title}
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <p className="text-[10px] text-subtle px-1">+{dayTasks.length - 3} más</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Week view — rejilla horaria con línea de "ahora" ── */
function WeekView({ current, tasks, onQuick, onAddFull }: {
  current: Date; tasks: Task[]
  onQuick: (e: React.MouseEvent, day: Date, time?: string) => void
  onAddFull: (day: Date) => void
}) {
  const days = buildWeekDays(current)
  const today = new Date()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [now, setNow] = useState(new Date())

  // Refresca la línea de "ahora" cada minuto.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  // Desplaza al inicio de la mañana (o a la hora actual si la semana es la de hoy).
  useEffect(() => {
    if (!scrollRef.current) return
    const todayInWeek = days.some((d) => isToday(d))
    const hour = todayInWeek ? Math.max(0, new Date().getHours() - 1) : 7
    scrollRef.current.scrollTop = hour * HOUR_HEIGHT
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const weekHasToday = days.some((d) => isToday(d))
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const nowTop = (nowMin / 60) * HOUR_HEIGHT
  const todayIdx = days.findIndex((d) => isToday(d))

  const handleColClick = (e: React.MouseEvent, day: Date) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    // Minutos desde medianoche, ajustados a tramos de 15 min y acotados a 23:45
    // (en el popover el usuario puede afinar al minuto, p.ej. 23:59).
    let mins = Math.round((y / HOUR_HEIGHT) * 60 / 15) * 15
    mins = Math.max(0, Math.min(mins, 23 * 60 + 45))
    const hh = String(Math.floor(mins / 60)).padStart(2, '0')
    const mm = String(mins % 60).padStart(2, '0')
    onQuick(e, day, `${hh}:${mm}`)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day headers */}
      <div className="flex border-b border-border shrink-0 bg-surface/40">
        <div className="w-14 shrink-0 border-r border-border" />
        <div className="flex-1 grid grid-cols-7 divide-x divide-border">
          {days.map((day, i) => {
            const isCurrentDay = isToday(day)
            const urgency = dayUrgency(tasksForDay(tasks, day), today)
            return (
              <div key={i} className="py-2 text-center">
                <p className="text-[11px] text-muted uppercase tracking-wider">{DAY_LABELS[i]}</p>
                <span className="mt-0.5 inline-flex items-center gap-1">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold ${
                    isCurrentDay ? 'bg-accent text-white' : 'text-foreground'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  {urgency !== 'none' && (
                    <span title={urgency === 'overdue' ? 'Tareas vencidas o que vencen hoy' : 'Tareas que vencen pronto'}
                      className={`w-1.5 h-1.5 rounded-full ${URGENCY_DOT[urgency]}`} />
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* All-day row */}
      <div className="flex border-b border-border shrink-0 bg-background">
        <div className="w-14 shrink-0 border-r border-border flex items-start justify-end pr-2 pt-1.5">
          <span className="text-[9px] text-subtle uppercase tracking-wider">Todo el día</span>
        </div>
        <div className="flex-1 grid grid-cols-7 divide-x divide-border">
          {days.map((day, i) => {
            const allDay = tasksForDay(tasks, day).filter((t) => !t.start_time)
            return (
              <div key={i} onClick={(e) => onQuick(e, day)}
                className="min-h-[34px] p-1 space-y-0.5 cursor-pointer hover:bg-surface/50 transition">
                {allDay.map((t) => (
                  <div key={t.id} title={t.title}
                    className={`text-[10px] px-1.5 py-0.5 rounded truncate ${pillClass(t, today)} ${t.is_completed ? 'opacity-40 line-through' : ''}`}>
                    {t.title}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Hourly grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex" style={{ height: 24 * HOUR_HEIGHT }}>
          {/* Hour gutter */}
          <div className="w-14 shrink-0 border-r border-border relative">
            {HOURS.map((h) => (
              <div key={h} className="absolute right-2 -translate-y-1/2 text-[10px] text-subtle tabular-nums"
                style={{ top: h * HOUR_HEIGHT }}>
                {h > 0 ? `${String(h).padStart(2, '0')}:00` : ''}
              </div>
            ))}
          </div>

          {/* Columns + overlays */}
          <div className="flex-1 grid grid-cols-7 relative">
            {/* Hour gridlines */}
            {HOURS.map((h) => (
              <div key={h} className="absolute left-0 right-0 border-t border-border/50 pointer-events-none"
                style={{ top: h * HOUR_HEIGHT }} />
            ))}

            {/* Day columns */}
            {days.map((day, i) => {
              const timed = tasksForDay(tasks, day)
                .filter((t) => t.start_time)
                .sort((a, b) => minutesOf(a.start_time!) - minutesOf(b.start_time!))
              return (
                <div key={i} onClick={(e) => handleColClick(e, day)}
                  className={`relative border-r border-border/40 cursor-pointer hover:bg-surface/30 transition ${
                    isToday(day) ? 'bg-accent/[0.03]' : ''
                  }`}>
                  {timed.map((t) => {
                    const startMin = minutesOf(t.start_time!)
                    const endMin = t.end_time ? minutesOf(t.end_time) : startMin + 60
                    const top = (startMin / 60) * HOUR_HEIGHT
                    const height = Math.max(((endMin - startMin) / 60) * HOUR_HEIGHT - 2, 20)
                    return (
                      <div
                        key={t.id}
                        title={`${t.title}${timeLabel(t) ? ` · ${timeLabel(t)}` : ''}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute left-0.5 right-0.5 rounded-md px-1.5 py-0.5 text-left overflow-hidden ${pillClass(t, today)} ${
                          t.is_completed ? 'opacity-40 line-through' : ''
                        }`}
                        style={{ top, height }}
                      >
                        <span className="block text-[10px] font-semibold leading-tight truncate">{t.title}</span>
                        {height > 26 && (
                          <span className="block text-[9px] opacity-80 tabular-nums">{timeLabel(t)}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}

            {/* Current-time line */}
            {weekHasToday && todayIdx >= 0 && (
              <div className="absolute left-0 right-0 z-20 pointer-events-none" style={{ top: nowTop }}>
                <span className="absolute w-2 h-2 rounded-full bg-red-500 -translate-y-1/2"
                  style={{ left: `calc(${(todayIdx / 7) * 100}% - 3px)` }} />
                <div className="h-px w-full bg-red-500/70" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Acción para crear con detalles */}
      <div className="shrink-0 border-t border-border px-6 py-2 flex justify-end">
        <button type="button" onClick={() => onAddFull(weekHasToday ? today : days[0])}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-light transition cursor-pointer">
          <Plus size={13} /> Nueva tarea
        </button>
      </div>
    </div>
  )
}

/* ── Day view ── */
function DayView({ current, tasks, onAdd }: {
  current: Date; tasks: Task[]; onAdd: () => void
}) {
  const dayTasks = tasksForDay(tasks, current).sort((a, b) => {
    const am = a.start_time ? minutesOf(a.start_time) : -1
    const bm = b.start_time ? minutesOf(b.start_time) : -1
    return am - bm
  })
  const today = new Date()
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs text-muted">{dayTasks.length} tarea{dayTasks.length !== 1 ? 's' : ''}</p>
          <button type="button" onClick={onAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-light transition cursor-pointer">
            <Plus size={13} /> Nueva tarea
          </button>
        </div>

        {dayTasks.length === 0 ? (
          <div className="flex flex-col items-center gap-3 mt-20 text-center">
            <Calendar size={32} className="text-subtle" />
            <p className="text-foreground font-medium text-sm">Sin tareas para este día</p>
            <p className="text-muted text-xs">Haz clic en &quot;Nueva tarea&quot; para añadir una</p>
          </div>
        ) : (
          <div className="space-y-2">
            {dayTasks.map((t) => {
              const urgency = dueUrgency(t, today)
              const urgencyBorder = urgency === 'overdue'
                ? 'border-red-500/60'
                : urgency === 'soon' ? 'border-yellow-500/50' : 'border-border'
              const time = timeLabel(t)
              return (
                <div key={t.id}
                  className={`flex items-center gap-3 p-3.5 bg-panel border rounded-xl ${urgencyBorder} ${t.is_completed ? 'opacity-55' : ''}`}>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    urgency !== 'none' ? URGENCY_DOT[urgency] : PRIORITY_DOT[t.priority]
                  }`} />
                  {time && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted tabular-nums shrink-0 w-[96px]">
                      <Clock size={11} /> {time}
                    </span>
                  )}
                  <span className={`text-sm text-foreground flex-1 ${t.is_completed ? 'line-through text-muted' : ''}`}>
                    {t.title}
                  </span>
                  {urgency === 'overdue' && !t.is_completed && (
                    <span className="text-xs text-red-400 font-medium">Vence hoy/vencida</span>
                  )}
                  {urgency === 'soon' && !t.is_completed && (
                    <span className="text-xs text-yellow-400 font-medium">Vence pronto</span>
                  )}
                  {t.is_completed && <span className="text-xs text-subtle">Completada</span>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
