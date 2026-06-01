import { describe, it, expect, beforeEach } from 'vitest'
import type { Task } from '@/types'
import { useTaskStore } from '@/store/taskStore'

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 't1',
    user_id: 'u1',
    note_id: null,
    title: 'Tarea',
    description: null,
    due_date: null,
    reminder_at: null,
    priority: 'medium',
    is_flagged: false,
    is_completed: false,
    completed_at: null,
    created_at: '2026-01-01T00:00:00Z',
    reminder_7days_sent: false,
    reminder_1day_sent: false,
    ...overrides,
  } as Task
}

beforeEach(() => {
  useTaskStore.setState({ tasks: [] })
})

describe('taskStore', () => {
  it('setTasks replaces the list', () => {
    useTaskStore.getState().setTasks([makeTask({ id: 'a' }), makeTask({ id: 'b' })])
    expect(useTaskStore.getState().tasks).toHaveLength(2)
  })

  it('addTask prepends the new task', () => {
    useTaskStore.getState().setTasks([makeTask({ id: 'a' })])
    useTaskStore.getState().addTask(makeTask({ id: 'b' }))
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['b', 'a'])
  })

  it('updateTask patches the matching task', () => {
    useTaskStore.getState().setTasks([makeTask({ id: 'a', is_completed: false })])
    useTaskStore.getState().updateTask('a', { is_completed: true })
    expect(useTaskStore.getState().tasks[0].is_completed).toBe(true)
  })

  it('updateTask leaves other tasks unchanged', () => {
    useTaskStore.getState().setTasks([
      makeTask({ id: 'a', title: 'A' }),
      makeTask({ id: 'b', title: 'B' }),
    ])
    useTaskStore.getState().updateTask('a', { title: 'Cambiada' })
    const titles = useTaskStore.getState().tasks.map((t) => t.title)
    expect(titles).toEqual(['Cambiada', 'B'])
  })

  it('deleteTask removes the matching task', () => {
    useTaskStore.getState().setTasks([makeTask({ id: 'a' }), makeTask({ id: 'b' })])
    useTaskStore.getState().deleteTask('a')
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['b'])
  })
})
