'use client'

import { useEffect, useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import { getTasks, createTask } from '@/lib/supabase/tasks'
import TaskModal from '@/components/tasks/TaskModal'
import { ChevronLeft, ChevronRight, Plus, Calendar } from 'lucide-react'
import {
  format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays,
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  isSameDay, isSameMonth, isToday, parseISO,
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

// Urgencia de una tarea según su due_date respecto a hoy:
//   'overdue' → vence hoy o ya venció (rojo)
//   'soon'    → vence dentro de los próximos 7 días (amarillo)
//   'none'    → sin due_date, completada o lejana
type DueUrgency = 'overdue' | 'soon' | 'none'

function dueUrgency(task: Task, today: Date): DueUrgency {
  if (!task.due_date || task.is_completed) return 'none'
  const [year, month, dayNum] = task.due_date.split('T')[0].split('-').map(Number)
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

// Clase de la "pastilla" de tarea: la urgencia por vencimiento tiene
// prioridad visual sobre el color por prioridad.
function pillClass(task: Task, today: Date): string {
  const urgency = dueUrgency(task, today)
  if (urgency !== 'none') return URGENCY_PILL[urgency]
  return PRIORITY_PILL[task.priority]
}

// Urgencia máxima de un conjunto de tareas (para el indicador del día).
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
  return tasks.filter((t) => {
    if (!t.due_date) return false
    const [year, month, dayNum] = t.due_date.split('T')[0].split('-').map(Number)
    const taskDate = new Date(year, month - 1, dayNum)
    return isSameDay(taskDate, day)
  })
}

export default function CalendarView() {
  const { tasks, setTasks, addTask } = useTaskStore()
  const [view, setView] = useState<CalView>('month')
  const [current, setCurrent] = useState(new Date())
  const [modalDate, setModalDate] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const load = async () => {
      try { const data = await getTasks(); setTasks(data) } catch { /* sin tareas */ }
    }
    load()
  }, [setTasks])

  const openModal = (day: Date) => {
    setModalDate(format(day, 'yyyy-MM-dd'))
    setShowModal(true)
  }

  const handleCreate = async (data: {
    title: string; description: string; due_date: string
    priority: Task['priority']; is_flagged: boolean
  }) => {
    const task = await createTask(data.title, {
      description: data.description || undefined,
      due_date: data.due_date || undefined,
      priority: data.priority,
      is_flagged: data.is_flagged,
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
            className="px-2.5 py-1 text-xs text-muted hover:text-foreground bg-surface hover:bg-elevated rounded-lg transition cursor-pointer ml-1">
            Hoy
          </button>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-0.5 bg-surface rounded-lg p-0.5">
          {(['month', 'week', 'day'] as CalView[]).map((v) => (
            <button key={v} type="button" onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs rounded-md transition cursor-pointer font-medium ${
                view === v ? 'bg-panel text-foreground' : 'text-muted hover:text-foreground'
              }`}>
              {v === 'month' ? 'Mes' : v === 'week' ? 'Semana' : 'Día'}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar body */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {view === 'month' && <MonthView current={current} tasks={tasks} onDayClick={openModal} />}
        {view === 'week' && <WeekView current={current} tasks={tasks} onDayClick={openModal} />}
        {view === 'day' && <DayView current={current} tasks={tasks} onAdd={() => openModal(current)} />}
      </div>

      {showModal && (
        <TaskModal
          onClose={() => setShowModal(false)}
          onSave={handleCreate}
          initialDate={modalDate}
        />
      )}
    </div>
  )
}

/* ── Month view ── */
function MonthView({ current, tasks, onDayClick }: {
  current: Date; tasks: Task[]; onDayClick: (d: Date) => void
}) {
  const weeks = buildMonthGrid(current)
  const today = new Date()
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-border shrink-0">
        {DAY_LABELS.map((d) => (
          <div key={d} className="py-2 text-center text-[11px] font-semibold text-muted uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>
      {/* Weeks */}
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 divide-x divide-border" style={{ minHeight: 96 }}>
            {week.map((day, di) => {
              const dayTasks = tasksForDay(tasks, day)
              const inMonth = isSameMonth(day, current)
              const isCurrentDay = isToday(day)
              const urgency = dayUrgency(dayTasks, today)
              return (
                <div key={di} onClick={() => onDayClick(day)}
                  className={`p-2 cursor-pointer hover:bg-surface transition group ${!inMonth ? 'opacity-30' : ''} ${
                    urgency === 'overdue' ? 'border-l-2 border-red-500'
                      : urgency === 'soon' ? 'border-l-2 border-yellow-500'
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
                    <button type="button" title="Crear tarea"
                      onClick={(e) => { e.stopPropagation(); onDayClick(day) }}
                      className="opacity-0 group-hover:opacity-100 text-muted hover:text-accent transition cursor-pointer rounded">
                      <Plus size={11} />
                    </button>
                  </div>
                  <div className="space-y-0.5">
                    {dayTasks.slice(0, 2).map((t) => (
                      <div key={t.id} title={t.title}
                        className={`text-[10px] px-1.5 py-0.5 rounded truncate ${pillClass(t, today)} ${t.is_completed ? 'opacity-40 line-through' : ''}`}>
                        {t.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && (
                      <p className="text-[10px] text-subtle px-1">+{dayTasks.length - 2} más</p>
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

/* ── Week view ── */
function WeekView({ current, tasks, onDayClick }: {
  current: Date; tasks: Task[]; onDayClick: (d: Date) => void
}) {
  const days = buildWeekDays(current)
  const today = new Date()
  return (
    <div className="flex-1 overflow-y-auto flex flex-col">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-border shrink-0 divide-x divide-border">
        {days.map((day, i) => {
          const isCurrentDay = isToday(day)
          const urgency = dayUrgency(tasksForDay(tasks, day), today)
          return (
            <div key={i} className="py-3 text-center">
              <p className="text-[11px] text-muted uppercase tracking-wider">{DAY_LABELS[i]}</p>
              <span className="mt-1 inline-flex items-center gap-1">
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
      {/* Task columns */}
      <div className="flex-1 grid grid-cols-7 divide-x divide-border">
        {days.map((day, i) => {
          const dayTasks = tasksForDay(tasks, day)
          return (
            <div key={i} onClick={() => onDayClick(day)}
              className="p-2 cursor-pointer hover:bg-surface/50 transition group min-h-[300px]">
              <button type="button" onClick={(e) => { e.stopPropagation(); onDayClick(day) }}
                className="opacity-0 group-hover:opacity-100 mb-2 flex items-center gap-1 text-[11px] text-muted hover:text-accent transition cursor-pointer">
                <Plus size={11} /> Añadir
              </button>
              <div className="space-y-1">
                {dayTasks.map((t) => (
                  <div key={t.id} title={t.title}
                    className={`text-[11px] px-2 py-1 rounded-lg truncate ${pillClass(t, today)} ${t.is_completed ? 'opacity-40 line-through' : ''}`}>
                    {t.title}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Day view ── */
function DayView({ current, tasks, onAdd }: {
  current: Date; tasks: Task[]; onAdd: () => void
}) {
  const dayTasks = tasksForDay(tasks, current)
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
            <p className="text-muted text-xs">Haz clic en "Nueva tarea" para añadir una</p>
          </div>
        ) : (
          <div className="space-y-2">
            {dayTasks.map((t) => {
              const urgency = dueUrgency(t, today)
              const urgencyBorder = urgency === 'overdue'
                ? 'border-red-500/60'
                : urgency === 'soon' ? 'border-yellow-500/50' : 'border-border'
              return (
                <div key={t.id}
                  className={`flex items-center gap-3 p-3.5 bg-panel border rounded-xl ${urgencyBorder} ${t.is_completed ? 'opacity-55' : ''}`}>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    urgency !== 'none' ? URGENCY_DOT[urgency] : PRIORITY_DOT[t.priority]
                  }`} />
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
