'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Flag, Calendar, AlignLeft, FileText, Search, Check, Clock } from 'lucide-react'
import type { Task } from '@/types'
import { getAllNotesWithNotebook, type NoteWithNotebook } from '@/lib/supabase/notes'

type Priority = Task['priority']

interface SaveData {
  title: string
  description: string
  due_date: string
  start_time: string | null
  end_time: string | null
  priority: Priority
  is_flagged: boolean
  note_id: string | null
}

interface Props {
  onClose: () => void
  onSave: (data: SaveData) => Promise<void>
  initialDate?: string
  initialStartTime?: string
  initialEndTime?: string
}

const PRIORITIES: { value: Priority; label: string; dot: string; activeBg: string; activeText: string }[] = [
  { value: 'low', label: 'Baja', dot: 'bg-blue-400', activeBg: 'bg-blue-500/15 border-blue-500/45', activeText: 'text-blue-400' },
  { value: 'medium', label: 'Media', dot: 'bg-yellow-400', activeBg: 'bg-yellow-500/15 border-yellow-500/45', activeText: 'text-yellow-500' },
  { value: 'high', label: 'Alta', dot: 'bg-red-400', activeBg: 'bg-red-500/15 border-red-500/45', activeText: 'text-red-400' },
]

const TODAY = new Date().toISOString().split('T')[0]

export default function TaskModal({
  onClose, onSave, initialDate, initialStartTime, initialEndTime,
}: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(initialDate ?? '')
  const [startTime, setStartTime] = useState(initialStartTime ?? '')
  const [endTime, setEndTime] = useState(initialEndTime ?? '')
  const [priority, setPriority] = useState<Priority>('medium')
  const [isFlagged, setIsFlagged] = useState(false)
  const [noteId, setNoteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [notes, setNotes] = useState<NoteWithNotebook[]>([])
  const [showNotePicker, setShowNotePicker] = useState(false)
  const [noteSearch, setNoteSearch] = useState('')

  const titleRef = useRef<HTMLInputElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  useEffect(() => {
    let active = true
    getAllNotesWithNotebook()
      .then((data) => { if (active) setNotes(data) })
      .catch(() => { /* error cargando notas */ })
    return () => { active = false }
  }, [])

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose()
  }

  // Una hora solo es válida si hay fecha asociada.
  const timeNeedsDate = (!!startTime || !!endTime) && !dueDate
  const timeRangeInvalid = !!startTime && !!endTime && endTime <= startTime
  const canSave = !!title.trim() && !saving && !timeNeedsDate && !timeRangeInvalid

  const handleSave = async () => {
    if (!canSave) return
    setSaving(true)
    try {
      // Strings ISO literales (sin conversión de zona horaria): el reloj que
      // el usuario escribe se guarda tal cual en la columna timestamptz.
      const startIso = dueDate && startTime ? `${dueDate}T${startTime}:00` : null
      const endIso = dueDate && endTime ? `${dueDate}T${endTime}:00` : null
      await onSave({
        title: title.trim(),
        description,
        due_date: dueDate,
        start_time: startIso,
        end_time: endIso,
        priority,
        is_flagged: isFlagged,
        note_id: noteId,
      })
      onClose()
    } catch {
      // error silencioso
    } finally {
      setSaving(false)
    }
  }

  const selectedNote = notes.find((n) => n.id === noteId) ?? null
  const filteredNotes = noteSearch.trim()
    ? notes.filter((n) => n.title.toLowerCase().includes(noteSearch.toLowerCase()))
    : notes

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
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
        <div className="p-5 space-y-5">
          {/* Title */}
          <input
            ref={titleRef}
            type="text"
            data-testid="task-title-input"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="w-full bg-transparent text-foreground text-lg font-semibold outline-none placeholder-subtle"
            style={{ color: 'var(--color-foreground)' }}
          />

          {/* Description */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-subtle mb-1.5">
              <AlignLeft size={13} /> Descripción
            </label>
            <textarea
              placeholder="Añade más detalles (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none resize-none placeholder-subtle focus:border-accent/50 transition"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>

          {/* Priority — segmented visual selector */}
          <div>
            <label className="block text-xs font-medium text-subtle mb-1.5">Prioridad</label>
            <div className="grid grid-cols-3 gap-2">
              {PRIORITIES.map((p) => {
                const active = priority === p.value
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      active
                        ? `${p.activeBg} ${p.activeText}`
                        : 'bg-surface border-border text-muted hover:text-foreground'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${p.dot}`} />
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Due date + Flag */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-subtle mb-1.5">
                <Calendar size={13} /> Fecha límite
              </label>
              <input
                type="date"
                value={dueDate}
                min={TODAY}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none cursor-pointer focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
                title="Fecha límite"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-subtle mb-1.5">Importante</label>
              <button
                type="button"
                onClick={() => setIsFlagged(!isFlagged)}
                className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition cursor-pointer ${
                  isFlagged
                    ? 'bg-orange-500/15 border-orange-500/45 text-orange-400'
                    : 'bg-surface border-border text-muted hover:text-foreground'
                }`}
              >
                <Flag size={13} className={isFlagged ? 'fill-orange-400' : ''} />
                {isFlagged ? 'Marcada' : 'Marcar'}
              </button>
            </div>
          </div>

          {/* Hora inicio / fin (opcional) */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-subtle mb-1.5">
              <Clock size={13} /> Hora <span className="text-subtle/70">(opcional)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                aria-label="Hora de inicio"
                title="Hora de inicio"
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none cursor-pointer focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                aria-label="Hora de fin"
                title="Hora de fin"
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none cursor-pointer focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>
            {timeNeedsDate && (
              <p className="text-xs text-yellow-500 mt-1.5">Elige una fecha límite para asignar una hora</p>
            )}
            {timeRangeInvalid && (
              <p className="text-xs text-danger mt-1.5">La hora de fin debe ser posterior a la de inicio</p>
            )}
          </div>

          {/* Link to note */}
          <div className="relative">
            <label className="flex items-center gap-1.5 text-xs font-medium text-subtle mb-1.5">
              <FileText size={13} /> Vincular a una nota
            </label>
            <button
              type="button"
              onClick={() => setShowNotePicker(!showNotePicker)}
              className="w-full flex items-center justify-between gap-2 bg-surface border border-border rounded-lg px-3 py-2 text-xs cursor-pointer hover:border-accent/50 transition"
            >
              <span className={`truncate ${selectedNote ? 'text-foreground' : 'text-subtle'}`}>
                {selectedNote ? (selectedNote.title || 'Sin título') : 'Ninguna (opcional)'}
              </span>
              {selectedNote && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => { e.stopPropagation(); setNoteId(null) }}
                  className="text-muted hover:text-danger transition shrink-0"
                  title="Quitar vínculo"
                >
                  <X size={13} />
                </span>
              )}
            </button>

            {showNotePicker && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-panel border border-border rounded-lg shadow-xl z-20 overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                  <Search size={13} className="text-muted shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Buscar nota…"
                    value={noteSearch}
                    onChange={(e) => setNoteSearch(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder-subtle"
                    style={{ color: 'var(--color-foreground)' }}
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredNotes.length === 0 ? (
                    <p className="px-3 py-3 text-xs text-subtle text-center">Sin notas</p>
                  ) : (
                    filteredNotes.slice(0, 50).map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => { setNoteId(n.id); setShowNotePicker(false); setNoteSearch('') }}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground cursor-pointer transition text-left"
                      >
                        <span className="truncate">{n.title || 'Sin título'}</span>
                        {n.id === noteId && <Check size={13} className="text-accent shrink-0" />}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm text-muted hover:text-foreground transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            data-testid="task-submit"
            onClick={handleSave}
            disabled={!canSave}
            className="px-6 py-2.5 text-sm bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-semibold shadow-sm shadow-accent/20"
          >
            {saving ? 'Guardando…' : 'Crear tarea'}
          </button>
        </div>
      </div>
    </div>
  )
}
