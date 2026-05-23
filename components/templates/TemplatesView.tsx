'use client'

import { useEffect, useState } from 'react'
import {
  LayoutTemplate, Loader2, ArrowLeft, Tag,
  BookOpen, ChevronDown, Check, Sparkles,
} from 'lucide-react'
import { getTemplates } from '@/lib/supabase/templates'
import { createNote, updateNote } from '@/lib/supabase/notes'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { Template, Notebook } from '@/types'

const CATEGORIES: { key: string; label: string; color: string; bg: string }[] = [
  { key: 'meeting', label: 'Reuniones',  color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
  { key: 'journal', label: 'Diario',     color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { key: 'work',    label: 'Trabajo',    color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  { key: 'personal',label: 'Personal',  color: 'text-accent',     bg: 'bg-accent/10 border-accent/20' },
]

function getCategoryInfo(key: string | null) {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[3]
}

type FilterKey = 'all' | 'meeting' | 'journal' | 'work' | 'personal' | 'mine'

// ── Notebook picker ────────────────────────────────────────────────────────
function NotebookPicker({
  notebooks,
  selected,
  onSelect,
}: {
  notebooks: Notebook[]
  selected: Notebook | null
  onSelect: (nb: Notebook) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-surface border border-border rounded-lg text-sm transition hover:border-accent/40 cursor-pointer"
      >
        <div className="flex items-center gap-2 min-w-0">
          <BookOpen size={14} className="text-muted shrink-0" />
          <span className={`truncate ${selected ? 'text-foreground' : 'text-subtle'}`}>
            {selected ? selected.name : 'Selecciona una libreta...'}
          </span>
        </div>
        <ChevronDown size={14} className={`text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-panel border border-border rounded-xl shadow-xl z-20 overflow-hidden max-h-48 overflow-y-auto">
          {notebooks.length === 0 ? (
            <p className="px-3 py-3 text-xs text-muted text-center">Sin libretas disponibles</p>
          ) : (
            notebooks.map((nb) => (
              <button
                key={nb.id}
                type="button"
                onClick={() => { onSelect(nb); setOpen(false) }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-left hover:bg-surface transition cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen size={13} className="text-muted shrink-0" />
                  <span className="text-foreground truncate">{nb.name}</span>
                </div>
                {selected?.id === nb.id && (
                  <Check size={13} className="text-accent shrink-0" />
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// ── Template detail view ───────────────────────────────────────────────────
function TemplateDetail({
  template,
  onBack,
}: {
  template: Template
  onBack: () => void
}) {
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  const [selectedNotebook, setSelected] = useState<Notebook | null>(
    notebooks.length > 0 ? notebooks[0] : null
  )
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const catInfo = getCategoryInfo(template.category)
  const preview = extractTextPreview(template.content, 800)

  const handleImport = async () => {
    if (!selectedNotebook) {
      setError('Elige una libreta para continuar')
      return
    }
    setImporting(true)
    setError(null)
    try {
      const note = await createNote(selectedNotebook.id)
      await updateNote(note.id, {
        title: template.name,
        content: template.content,
      })
      const populated = { ...note, title: template.name, content: template.content }
      addNote(populated)
      setSelectedNote(populated)
      setSelectedNotebook(selectedNotebook)
      setSuccess(true)
      setTimeout(() => setCurrentView('notebooks'), 700)
    } catch {
      setError('Error al importar la plantilla. Intenta de nuevo.')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Top bar */}
      <div className="px-8 py-4 border-b border-border flex items-center gap-4 shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition cursor-pointer"
        >
          <ArrowLeft size={15} />
          Todas las plantillas
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-10 flex gap-10">
          {/* Preview izquierdo */}
          <div className="flex-1 min-w-0">
            <div className="bg-panel border border-border rounded-2xl overflow-hidden shadow-sm">
              <div className="px-8 py-6 border-b border-border">
                <h2 className="text-2xl font-bold text-foreground">{template.name}</h2>
              </div>
              <div className="px-8 py-6">
                {preview ? (
                  <div className="space-y-2">
                    {preview.split('\n').filter(Boolean).map((line, i) => (
                      <p key={i} className="text-sm text-muted leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-subtle italic">Sin contenido de vista previa</p>
                )}
              </div>
            </div>
          </div>

          {/* Panel derecho — info + acción */}
          <div className="w-72 shrink-0 space-y-6">
            <div>
              <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${catInfo.bg} ${catInfo.color} mb-3`}>
                <Tag size={11} />
                {catInfo.label}
              </span>
              <h1 className="text-xl font-bold text-foreground mb-2">{template.name}</h1>
              {template.description && (
                <p className="text-sm text-muted leading-relaxed">{template.description}</p>
              )}
              {template.is_builtin && (
                <div className="flex items-center gap-1.5 mt-3 text-xs text-subtle">
                  <Sparkles size={11} className="text-accent" />
                  Plantilla oficial de NoteEvo
                </div>
              )}
            </div>

            <div className="space-y-3 p-4 bg-panel border border-border rounded-xl">
              <p className="text-xs font-semibold text-foreground">
                ¿Dónde quieres guardarla?
              </p>
              <NotebookPicker
                notebooks={notebooks}
                selected={selectedNotebook}
                onSelect={setSelected}
              />

              {error && (
                <p className="text-xs text-danger">{error}</p>
              )}
              {success && (
                <p className="text-xs text-accent font-medium">
                  ✓ Abriendo en el editor...
                </p>
              )}

              <button
                type="button"
                onClick={handleImport}
                disabled={importing || success || !selectedNotebook}
                className="w-full py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer flex items-center justify-center gap-2"
              >
                {importing && <Loader2 size={14} className="animate-spin" />}
                {importing ? 'Importando...' : 'Usar esta plantilla'}
              </button>

              <p className="text-[11px] text-subtle text-center leading-relaxed">
                Se creará una nota nueva en la libreta seleccionada
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Template gallery card ──────────────────────────────────────────────────
function TemplateCard({
  template,
  onClick,
}: {
  template: Template
  onClick: () => void
}) {
  const catInfo = getCategoryInfo(template.category)
  const preview = extractTextPreview(template.content, 100)

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-left p-5 bg-panel border border-border rounded-xl hover:border-accent/40 hover:shadow-md transition cursor-pointer group"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          template.is_builtin ? 'bg-accent/10' : 'bg-surface border border-border'
        }`}>
          <LayoutTemplate size={18} className={template.is_builtin ? 'text-accent' : 'text-muted'} />
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold text-foreground truncate group-hover:text-accent transition">
            {template.name}
          </p>
          {template.description && (
            <p className="text-xs text-muted mt-0.5 line-clamp-1">{template.description}</p>
          )}
        </div>
      </div>

      <p className="text-xs text-subtle leading-relaxed line-clamp-2 mb-3 min-h-[2rem]">
        {preview || 'Sin contenido de vista previa'}
      </p>

      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${catInfo.bg} ${catInfo.color}`}>
          <Tag size={9} />
          {catInfo.label}
        </span>
        <span className="text-[11px] text-subtle group-hover:text-accent transition">
          Ver plantilla →
        </span>
      </div>
    </button>
  )
}

// ── Main component ─────────────────────────────────────────────────────────
export default function TemplatesView() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterKey>('all')
  const [selected, setSelected] = useState<Template | null>(null)

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = (() => {
    if (filter === 'all') return templates
    if (filter === 'mine') return templates.filter((t) => !t.is_builtin)
    return templates.filter((t) => t.category === filter)
  })()

  const mineCount = templates.filter((t) => !t.is_builtin).length

  if (selected) {
    return (
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
        <TemplateDetail
          template={selected}
          onBack={() => setSelected(null)}
        />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="px-8 pt-8 pb-5 border-b border-border shrink-0">
        <h1 className="text-2xl font-semibold text-foreground">Plantillas</h1>
        <p className="text-sm text-muted mt-1">
          Empieza tu próxima nota con estructura lista. Elige una plantilla y personalízala.
        </p>

        <div className="flex items-center gap-2 flex-wrap mt-4">
          {[
            { key: 'all' as FilterKey,      label: `Todas (${templates.length})` },
            { key: 'meeting' as FilterKey,  label: 'Reuniones' },
            { key: 'work' as FilterKey,     label: 'Trabajo' },
            { key: 'journal' as FilterKey,  label: 'Diario' },
            { key: 'personal' as FilterKey, label: 'Personal' },
            ...(mineCount > 0 ? [{ key: 'mine' as FilterKey, label: `Mis plantillas (${mineCount})` }] : []),
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-xs rounded-lg border transition cursor-pointer font-medium ${
                filter === f.key
                  ? 'bg-accent text-white border-accent'
                  : 'bg-surface border-border text-muted hover:text-foreground hover:border-accent/40'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={20} className="text-muted animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <LayoutTemplate size={32} className="text-subtle" />
            <p className="text-sm text-muted">Sin plantillas en esta categoría</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filtered.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onClick={() => setSelected(t)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
