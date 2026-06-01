'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Flag, Calendar, AlignLeft, ChevronDown } from 'lucide-react'
import type { Task } from '@/types'

type Priority = Task['priority']

interface Props {
  onClose: () => void
  onSave: (data: { title: string; description: string; due_date: string; priority: Priority; is_flagged: boolean }) => Promise<void>
  initialDate?: string
}

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Baja', color: 'text-blue-400' },
  { value: 'medium', label: 'Media', color: 'text-yellow-400' },
  { value: 'high', label: 'Alta', color: 'text-red-400' },
]

export default function TaskModal({ onClose, onSave, initialDate }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(initialDate ?? '')
  const [priority, setPriority] = useState<Priority>('medium')
  const [isFlagged, setIsFlagged] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showPriority, setShowPriority] = useState(false)
  const titleRef = useRef<HTMLInputElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose()
  }

  const handleSave = async () => {
    if (!title.trim()) return
    setSaving(true)
    try {
      await onSave({ title: title.trim(), description, due_date: dueDate, priority, is_flagged: isFlagged })
      onClose()
    } catch {
      // error silencioso
    } finally {
      setSaving(false)
    }
  }

  const currentPriority = PRIORITIES.find((p) => p.value === priority)!

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <div className="w-full max-w-md bg-panel border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground text-sm">Nueva tarea</h2>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1 text-muted hover:text-foreground transition cursor-pointer rounded"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Title */}
          <input
            ref={titleRef}
            type="text"
            data-testid="task-title-input"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="w-full bg-transparent text-foreground text-base font-medium outline-none placeholder-subtle"
            style={{ color: 'var(--color-foreground)' }}
          />

          {/* Description */}
          <div className="flex items-start gap-2.5">
            <AlignLeft size={15} className="text-muted mt-0.5 shrink-0" />
            <textarea
              placeholder="Descripción (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="flex-1 bg-transparent text-sm text-foreground outline-none resize-none placeholder-subtle"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>

          <div className="h-px bg-border" />

          {/* Options row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Due date */}
            <div className="flex items-center gap-1.5 bg-surface rounded-lg px-3 py-1.5">
              <Calendar size={13} className="text-muted shrink-0" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-transparent text-xs text-muted outline-none cursor-pointer"
                title="Fecha límite"
              />
            </div>

            {/* Priority */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPriority(!showPriority)}
                className="flex items-center gap-1.5 bg-surface rounded-lg px-3 py-1.5 text-xs cursor-pointer hover:bg-elevated transition"
              >
                <span className={currentPriority.color}>●</span>
                <span className="text-muted">{currentPriority.label}</span>
                <ChevronDown size={11} className="text-muted" />
              </button>
              {showPriority && (
                <div className="absolute top-full left-0 mt-1 w-32 bg-panel border border-border rounded-lg shadow-xl z-10 overflow-hidden">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => { setPriority(p.value); setShowPriority(false) }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground cursor-pointer transition"
                    >
                      <span className={p.color}>●</span>
                      {p.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Flag */}
            <button
              type="button"
              title="Marcar como importante"
              onClick={() => setIsFlagged(!isFlagged)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition cursor-pointer ${
                isFlagged
                  ? 'bg-orange-500/15 text-orange-400'
                  : 'bg-surface text-muted hover:bg-elevated'
              }`}
            >
              <Flag size={13} />
              <span>{isFlagged ? 'Marcada' : 'Marcar'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-muted hover:text-foreground transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            data-testid="task-submit"
            onClick={handleSave}
            disabled={!title.trim() || saving}
            className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-medium"
          >
            {saving ? 'Guardando…' : 'Crear tarea'}
          </button>
        </div>
      </div>
    </div>
  )
}
