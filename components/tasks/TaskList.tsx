'use client'

import { useEffect, useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import {
  getTasks, createTask, toggleTaskComplete, deleteTask,
  getTasksWithNotebook,
} from '@/lib/supabase/tasks'
import type { TaskWithContext } from '@/lib/supabase/tasks'
import TaskModal from './TaskModal'
import {
  Plus, Flag, Calendar, CheckSquare, Trash2,
  ChevronDown, BookOpen, SlidersHorizontal, X,
} from 'lucide-react'
import { format, parseISO, isToday, isPast, isWithinInterval, addDays, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import type { Task } from '@/types'

type MainTab = 'mytasks' | 'bynotebook'
type StatusFilter = 'all' | 'pending' | 'completed'
type PriorityFilter = 'all' | 'high' | 'medium' | 'low'
type DateFilter = 'all' | 'today' | 'week' | 'overdue'

const PRIORITY_DOT: Record<Task['priority'], string> = {
  low: 'bg-blue-400',
  medium: 'bg-yellow-400',
  high: 'bg-red-400',
}

const PRIORITY_LABEL: Record<Task['priority'], string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

function matchesDateFilter(task: Task, filter: DateFilter): boolean {
  if (filter === 'all') return true
  if (!task.due_date) return false
  const due = parseISO(task.due_date)
  const today = startOfDay(new Date())
  if (filter === 'today') return isToday(due)
  if (filter === 'week') return isWithinInterval(due, { start: today, end: addDays(today, 7) })
  if (filter === 'overdue') return isPast(due) && !isToday(due)
  return true
}

/** Estilo del pill de fecha según urgencia. */
function dueDatePill(task: Task): string {
  if (!task.due_date) return ''
  const due = parseISO(task.due_date)
  const today = startOfDay(new Date())
  if (isPast(due) && !isToday(due) && !task.is_completed) return 'bg-danger/15 text-danger'
  if (isToday(due) || isWithinInterval(due, { start: today, end: addDays(today, 2) }))
    return 'bg-yellow-500/15 text-yellow-500'
  return 'bg-surface text-muted'
}

export default function TaskList() {
  const { tasks, setTasks, addTask, updateTask, deleteTask: removeTask } = useTaskStore()
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [mainTab, setMainTab] = useState<MainTab>('mytasks')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')
  const [tasksWithContext, setTasksWithContext] = useState<TaskWithContext[]>([])
  const [loadingContext, setLoadingContext] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch {
        // error cargando tareas
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [setTasks])

  useEffect(() => {
    if (mainTab !== 'bynotebook') return
    const load = async () => {
      setLoadingContext(true)
      try {
        const data = await getTasksWithNotebook()
        setTasksWithContext(data)
      } catch {
        // error cargando
      } finally {
        setLoadingContext(false)
      }
    }
    load()
  }, [mainTab])

  const handleCreate = async (data: {
    title: string
    description: string
    due_date: string
    priority: Task['priority']
    is_flagged: boolean
    note_id: string | null
  }) => {
    const task = await createTask(data.title, {
      description: data.description || undefined,
      due_date: data.due_date || undefined,
      priority: data.priority,
      is_flagged: data.is_flagged,
      note_id: data.note_id ?? undefined,
    })
    addTask(task)
  }

  const handleToggle = async (task: Task) => {
    const newValue = !task.is_completed
    const newCompleted = newValue ? new Date().toISOString() : null
    updateTask(task.id, { is_completed: newValue, completed_at: newCompleted })
    setTasksWithContext((prev) =>
      prev.map((t) => t.id === task.id ? { ...t, is_completed: newValue, completed_at: newCompleted } : t)
    )
    try {
      await toggleTaskComplete(task.id, newValue)
    } catch {
      updateTask(task.id, { is_completed: task.is_completed, completed_at: task.completed_at })
      setTasksWithContext((prev) => prev.map((t) => t.id === task.id ? { ...t, ...task } : t))
    }
  }

  const handleDelete = async (id: string) => {
    removeTask(id)
    setTasksWithContext((prev) => prev.filter((t) => t.id !== id))
    try {
      await deleteTask(id)
    } catch {
      // error silencioso
    }
  }

  const applyFilters = (list: Task[]): Task[] =>
    list.filter((t) => {
      if (statusFilter === 'pending' && t.is_completed) return false
      if (statusFilter === 'completed' && !t.is_completed) return false
      if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false
      if (!matchesDateFilter(t, dateFilter)) return false
      return true
    })

  const filtered = applyFilters(tasks)
  const pending = tasks.filter((t) => !t.is_completed).length
  const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all' || dateFilter !== 'all'

  const clearAllFilters = () => { setStatusFilter('all'); setPriorityFilter('all'); setDateFilter('all') }

  const statusChipLabel: Record<StatusFilter, string> = { all: '', pending: 'Pendientes', completed: 'Completadas' }
  const priorityChipLabel: Record<PriorityFilter, string> = { all: '', high: 'Alta', medium: 'Media', low: 'Baja' }
  const dateChipLabel: Record<DateFilter, string> = { all: '', today: 'Hoy', week: 'Esta semana', overdue: 'Vencidas' }

  const byNotebook = (() => {
    const groups = new Map<string, { name: string; tasks: TaskWithContext[] }>()
    const noBook: TaskWithContext[] = []
    for (const task of tasksWithContext) {
      const nb = task.notes?.notebooks
      if (!nb) {
        noBook.push(task)
      } else {
        if (!groups.has(nb.id)) groups.set(nb.id, { name: nb.name, tasks: [] })
        groups.get(nb.id)!.tasks.push(task)
      }
    }
    const result: { id: string; name: string; tasks: TaskWithContext[] }[] = []
    groups.forEach((val, id) => result.push({ id, ...val }))
    if (noBook.length > 0) result.push({ id: '__none__', name: 'Sin libreta', tasks: noBook })
    return result
  })()

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="h-14 px-6 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-semibold text-foreground text-sm">Tareas</h2>
          <p className="text-xs text-muted">
            {pending} pendiente{pending !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Filtros"
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              showFilters || hasActiveFilters
                ? 'bg-accent/15 text-accent'
                : 'text-muted hover:bg-surface hover:text-foreground'
            }`}
          >
            <SlidersHorizontal size={15} />
          </button>
          <button
            type="button"
            data-testid="new-task-btn"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-light transition cursor-pointer"
          >
            <Plus size={14} />
            Nueva tarea
          </button>
        </div>
      </div>

      {/* Main tabs */}
      <div className="flex items-center px-6 border-b border-border shrink-0">
        {(['mytasks', 'bynotebook'] as MainTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMainTab(tab)}
            className={`px-4 py-2.5 text-xs font-medium transition cursor-pointer border-b-2 -mb-px ${
              mainTab === tab
                ? 'border-accent text-accent'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            {tab === 'mytasks' ? 'Mis tareas' : 'Por libreta'}
          </button>
        ))}
      </div>

      {/* Filters panel */}
      {showFilters && mainTab === 'mytasks' && (
        <div className="px-6 py-3 border-b border-border bg-panel shrink-0">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {/* Status */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-subtle w-14">Estado</span>
              {(['all', 'pending', 'completed'] as StatusFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setStatusFilter(f)}
                  className={`px-2.5 py-1 text-xs rounded-md transition cursor-pointer ${
                    statusFilter === f
                      ? 'bg-accent/15 text-accent font-medium'
                      : 'text-muted hover:bg-surface hover:text-foreground'
                  }`}
                >
                  {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Completadas'}
                </button>
              ))}
            </div>

            {/* Priority */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-subtle w-14">Prioridad</span>
              {(['all', 'high', 'medium', 'low'] as PriorityFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setPriorityFilter(f)}
                  className={`px-2.5 py-1 text-xs rounded-md transition cursor-pointer ${
                    priorityFilter === f
                      ? 'bg-accent/15 text-accent font-medium'
                      : 'text-muted hover:bg-surface hover:text-foreground'
                  }`}
                >
                  {f === 'all' ? 'Todas' : f === 'high' ? 'Alta' : f === 'medium' ? 'Media' : 'Baja'}
                </button>
              ))}
            </div>

            {/* Date */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-subtle w-14">Fecha</span>
              {(['all', 'today', 'week', 'overdue'] as DateFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setDateFilter(f)}
                  className={`px-2.5 py-1 text-xs rounded-md transition cursor-pointer ${
                    dateFilter === f
                      ? 'bg-accent/15 text-accent font-medium'
                      : 'text-muted hover:bg-surface hover:text-foreground'
                  }`}
                >
                  {f === 'all' ? 'Todas' : f === 'today' ? 'Hoy' : f === 'week' ? 'Esta semana' : 'Vencidas'}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-muted hover:text-danger transition cursor-pointer self-center ml-auto"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Active filter chips */}
      {hasActiveFilters && mainTab === 'mytasks' && (
        <div className="px-6 py-2 border-b border-border flex items-center gap-2 flex-wrap shrink-0">
          {statusFilter !== 'all' && (
            <FilterChip label={statusChipLabel[statusFilter]} onClear={() => setStatusFilter('all')} />
          )}
          {priorityFilter !== 'all' && (
            <FilterChip label={`Prioridad: ${priorityChipLabel[priorityFilter]}`} onClear={() => setPriorityFilter('all')} />
          )}
          {dateFilter !== 'all' && (
            <FilterChip label={dateChipLabel[dateFilter]} onClear={() => setDateFilter('all')} />
          )}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs text-muted hover:text-danger transition cursor-pointer ml-1"
          >
            Limpiar todo
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {mainTab === 'mytasks' ? (
          loading ? (
            <p className="text-sm text-muted text-center mt-12">Cargando…</p>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 mt-16 text-center">
              <CheckSquare size={36} className="text-subtle" />
              <div>
                <p className="text-foreground font-medium text-sm">Sin tareas</p>
                <p className="text-muted text-xs mt-1">
                  {hasActiveFilters
                    ? 'No hay tareas que coincidan con los filtros activos'
                    : 'Crea tu primera tarea con el botón de arriba'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => handleToggle(task)}
                  onDelete={() => handleDelete(task.id)}
                />
              ))}
            </div>
          )
        ) : (
          loadingContext ? (
            <p className="text-sm text-muted text-center mt-12">Cargando…</p>
          ) : byNotebook.length === 0 ? (
            <div className="flex flex-col items-center gap-4 mt-16 text-center">
              <BookOpen size={36} className="text-subtle" />
              <div>
                <p className="text-foreground font-medium text-sm">Sin tareas vinculadas a notas</p>
                <p className="text-muted text-xs mt-1">
                  Las tareas creadas desde una nota aparecerán aquí agrupadas por libreta
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {byNotebook.map((group) => (
                <div key={group.id}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <BookOpen size={13} className="text-muted" />
                    <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                      {group.name}
                    </span>
                    <span className="text-xs text-subtle">({group.tasks.length})</span>
                  </div>
                  <div className="space-y-2">
                    {group.tasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={() => handleToggle(task)}
                        onDelete={() => handleDelete(task.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {showModal && (
        <TaskModal onClose={() => setShowModal(false)} onSave={handleCreate} />
      )}
    </div>
  )
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 bg-accent/10 text-accent text-xs rounded-full">
      {label}
      <button
        type="button"
        onClick={onClear}
        title="Quitar filtro"
        className="hover:bg-accent/20 rounded-full p-0.5 cursor-pointer transition"
      >
        <X size={11} />
      </button>
    </span>
  )
}

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task
  onToggle: () => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`group bg-panel border rounded-xl px-4 py-3 transition hover:border-accent/30 ${
        task.is_completed ? 'border-border opacity-60' : 'border-border'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Priority dot */}
        <span
          title={`Prioridad ${PRIORITY_LABEL[task.priority]}`}
          className={`mt-2.5 w-2 h-2 rounded-full shrink-0 ${PRIORITY_DOT[task.priority]}`}
        />

        {/* Checkbox 24px */}
        <button
          type="button"
          title={task.is_completed ? 'Marcar pendiente' : 'Completar'}
          onClick={onToggle}
          className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer active:scale-90 ${
            task.is_completed
              ? 'border-accent bg-accent'
              : 'border-border hover:border-accent'
          }`}
        >
          {task.is_completed && (
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
              <path d="M1.5 5L4.8 8.3L11.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-[15px] font-medium leading-snug ${
                task.is_completed ? 'line-through text-muted' : 'text-foreground'
              }`}
            >
              {task.title}
            </span>
            {task.is_flagged && <Flag size={13} className="text-orange-400 fill-orange-400 shrink-0" />}
          </div>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {task.due_date && (
              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${dueDatePill(task)}`}>
                <Calendar size={11} />
                {format(parseISO(task.due_date), 'd MMM', { locale: es })}
              </span>
            )}
            {task.description && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-0.5 text-xs text-muted hover:text-foreground transition cursor-pointer"
              >
                <ChevronDown
                  size={11}
                  className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                />
                Detalle
              </button>
            )}
          </div>

          {expanded && task.description && (
            <p className="text-xs text-muted mt-2 leading-relaxed">{task.description}</p>
          )}
        </div>

        {/* Delete */}
        <button
          type="button"
          title="Eliminar tarea"
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1 text-muted hover:text-danger transition cursor-pointer rounded shrink-0"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
