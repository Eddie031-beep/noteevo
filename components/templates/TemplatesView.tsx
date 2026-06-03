'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Loader2, ArrowLeft, Search, Sparkles, Trash2, Check,
  BookOpen, ChevronDown, LayoutTemplate,
} from 'lucide-react'
import { getTemplates, deleteTemplate } from '@/lib/supabase/templates'
import { createNote, updateNote } from '@/lib/supabase/notes'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import TemplatePreview from './TemplatePreview'
import type { Template, Notebook } from '@/types'

const LAST_NOTEBOOK_KEY = 'noteevo-last-template-notebook'

interface CategoryInfo { key: string; label: string; color: string; bg: string }

const CATEGORIES: CategoryInfo[] = [
  { key: 'personal',  label: 'Personal',  color: 'text-accent',     bg: 'bg-accent/10 border-accent/20' },
  { key: 'trabajo',   label: 'Trabajo',   color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  { key: 'reuniones', label: 'Reuniones', color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
  { key: 'diario',    label: 'Diario',    color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { key: 'educacion', label: 'Educación', color: 'text-cyan-400',   bg: 'bg-cyan-500/10 border-cyan-500/20' },
  { key: 'viaje',     label: 'Viaje',     color: 'text-teal-400',   bg: 'bg-teal-500/10 border-teal-500/20' },
  { key: 'finanzas',  label: 'Finanzas',  color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { key: 'salud',     label: 'Salud',     color: 'text-rose-400',   bg: 'bg-rose-500/10 border-rose-500/20' },
  { key: 'proyecto',  label: 'Proyecto',  color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20' },
]

function getCategoryInfo(key: string | null): CategoryInfo {
  return CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[0]
}

// ── Thumbnail miniaturizado del contenido real ───────────────────────────────
function TemplateThumb({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="relative h-40 overflow-hidden bg-surface pointer-events-none select-none">
      <div
        className="absolute top-0 left-0 origin-top-left tiptap-preview"
        style={{ transform: 'scale(0.45)', width: '222%' }}
      >
        <div className="px-6 py-4">
          <TemplatePreview content={content} />
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-panel to-transparent" />
    </div>
  )
}

// ── Card de plantilla en el grid ─────────────────────────────────────────────
function TemplateCard({ template, onClick }: { template: Template; onClick: () => void }) {
  const cat = getCategoryInfo(template.category)
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-left bg-panel border border-border rounded-xl overflow-hidden hover:border-accent/40 hover:shadow-lg transition cursor-pointer flex flex-col"
    >
      <div className="relative border-b border-border">
        <TemplateThumb content={template.content} />
        <span className={`absolute top-2 left-2 inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border backdrop-blur-sm ${
          template.is_builtin ? 'bg-accent/15 border-accent/30 text-accent' : 'bg-surface/80 border-border text-muted'
        }`}>
          {template.is_builtin ? <Sparkles size={9} /> : null}
          {template.is_builtin ? 'Oficial NoteEvo' : 'Mía'}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-1.5">
        <p className="text-sm font-semibold text-foreground group-hover:text-accent transition truncate">
          {template.name}
        </p>
        {template.description && (
          <p className="text-xs text-muted line-clamp-2 leading-relaxed">{template.description}</p>
        )}
        <span className={`mt-auto inline-flex items-center w-fit gap-1 text-[10px] px-2 py-0.5 rounded-full border ${cat.bg} ${cat.color}`}>
          {cat.label}
        </span>
      </div>
    </button>
  )
}

// ── Selector de libreta (recuerda la última) ─────────────────────────────────
function NotebookPicker({
  notebooks, selected, onSelect,
}: {
  notebooks: Notebook[]; selected: Notebook | null; onSelect: (nb: Notebook) => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-surface border border-border rounded-lg text-sm transition hover:border-accent/40 cursor-pointer"
      >
        <span className="flex items-center gap-2 min-w-0">
          <BookOpen size={14} className="text-muted shrink-0" />
          <span className={`truncate ${selected ? 'text-foreground' : 'text-subtle'}`}>
            {selected ? selected.name : 'Selecciona una libreta…'}
          </span>
        </span>
        <ChevronDown size={14} className={`text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-panel border border-border rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto">
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
                <span className="flex items-center gap-2 min-w-0">
                  <BookOpen size={13} className="text-muted shrink-0" />
                  <span className="text-foreground truncate">{nb.name}</span>
                </span>
                {selected?.id === nb.id && <Check size={13} className="text-accent shrink-0" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}

// ── Modal de detalle a pantalla completa ─────────────────────────────────────
function TemplateDetailModal({
  template, onClose, onDeleted,
}: {
  template: Template; onClose: () => void; onDeleted: (id: string) => void
}) {
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  // Estado derivado: por defecto la última libreta usada (localStorage) o la
  // primera disponible; `chosen` solo guarda la selección manual del usuario.
  const [chosen, setSelected] = useState<Notebook | null>(null)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const cat = getCategoryInfo(template.category)

  const defaultNotebook = useMemo(() => {
    if (notebooks.length === 0) return null
    const lastId = typeof window !== 'undefined' ? localStorage.getItem(LAST_NOTEBOOK_KEY) : null
    return (lastId ? notebooks.find((n) => n.id === lastId) : null) ?? notebooks[0]
  }, [notebooks])

  const selectedNotebook = chosen ?? defaultNotebook

  const handleImport = async () => {
    if (!selectedNotebook) { setError('Elige una libreta para continuar'); return }
    setImporting(true)
    setError(null)
    try {
      const note = await createNote(selectedNotebook.id)
      await updateNote(note.id, { title: template.name, content: template.content })
      const populated = { ...note, title: template.name, content: template.content }
      addNote(populated)
      setSelectedNote(populated)
      setSelectedNotebook(selectedNotebook)
      if (typeof window !== 'undefined') localStorage.setItem(LAST_NOTEBOOK_KEY, selectedNotebook.id)
      setSuccess(true)
      setTimeout(() => setCurrentView('notebooks'), 600)
    } catch {
      setError('Error al usar la plantilla. Intenta de nuevo.')
      setImporting(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setError(null)
    try {
      await deleteTemplate(template.id)
      onDeleted(template.id)
    } catch {
      setError('Error al eliminar la plantilla.')
      setDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Top bar */}
      <div className="h-14 px-6 border-b border-border flex items-center justify-between shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition cursor-pointer"
        >
          <ArrowLeft size={16} />
          Volver a la galería
        </button>
        <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${cat.bg} ${cat.color}`}>
          {cat.label}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
        {/* Preview grande */}
        <div className="flex-1 overflow-y-auto bg-surface/40 p-6 lg:p-10">
          <div className="max-w-3xl mx-auto bg-panel border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">{template.name}</h2>
            </div>
            <div className="px-8 py-6 tiptap-preview text-sm">
              <TemplatePreview content={template.content} />
            </div>
          </div>
        </div>

        {/* Panel de acción */}
        <div className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-border p-6 space-y-5 overflow-y-auto">
          <div>
            <h1 className="text-lg font-bold text-foreground mb-1">{template.name}</h1>
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
            <p className="text-xs font-semibold text-foreground">¿Dónde quieres guardarla?</p>
            <NotebookPicker notebooks={notebooks} selected={selectedNotebook} onSelect={setSelected} />
            {error && <p className="text-xs text-danger">{error}</p>}
            {success && <p className="text-xs text-accent font-medium">✓ Abriendo en el editor…</p>}
            <button
              type="button"
              onClick={handleImport}
              disabled={importing || success || !selectedNotebook}
              className="w-full py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer flex items-center justify-center gap-2"
            >
              {importing && <Loader2 size={14} className="animate-spin" />}
              {importing ? 'Creando…' : 'Usar esta plantilla'}
            </button>
            <p className="text-[11px] text-subtle text-center leading-relaxed">
              Se creará una nota nueva en la libreta seleccionada
            </p>
          </div>

          {!template.is_builtin && (
            confirmDelete ? (
              <div className="space-y-2 p-3 bg-danger/5 border border-danger/20 rounded-xl">
                <p className="text-xs text-foreground">
                  ¿Eliminar <span className="font-semibold">{template.name}</span>? No se puede deshacer.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 py-2 bg-danger text-white text-xs font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {deleting && <Loader2 size={13} className="animate-spin" />}
                    {deleting ? 'Eliminando…' : 'Sí, eliminar'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    disabled={deleting}
                    className="flex-1 py-2 bg-surface border border-border text-muted text-xs rounded-lg hover:text-foreground transition cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                className="w-full py-2 text-xs text-muted hover:text-danger border border-border hover:border-danger/30 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 size={13} />
                Eliminar plantilla
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

// ── Vista principal ──────────────────────────────────────────────────────────
export default function TemplatesView() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Template | null>(null)

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const q = query.trim().toLowerCase()
  const filtered = templates.filter((t) => {
    if (filter === 'mine' && t.is_builtin) return false
    if (filter !== 'all' && filter !== 'mine' && t.category !== filter) return false
    if (q && !t.name.toLowerCase().includes(q) && !(t.description ?? '').toLowerCase().includes(q)) return false
    return true
  })

  const mineCount = templates.filter((t) => !t.is_builtin).length
  const featured = templates.filter((t) => t.is_builtin).slice(0, 4)
  const usedCategories = CATEGORIES.filter((c) => templates.some((t) => t.category === c.key))
  const showFeatured = filter === 'all' && !q && featured.length > 0

  if (selected) {
    return (
      <TemplateDetailModal
        template={selected}
        onClose={() => setSelected(null)}
        onDeleted={(id) => {
          setTemplates((prev) => prev.filter((t) => t.id !== id))
          setSelected(null)
        }}
      />
    )
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="px-8 pt-8 pb-5 border-b border-border shrink-0">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Galería de plantillas</h1>
            <p className="text-sm text-muted mt-1">
              Empieza tu próxima nota con estructura lista. Elige una plantilla y personalízala.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar plantilla…"
              className="w-full pl-9 pr-3 py-2 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:border-accent/50 transition placeholder-subtle"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap mt-4">
          {[
            { key: 'all', label: `Todas (${templates.length})` },
            ...usedCategories.map((c) => ({ key: c.key, label: c.label })),
            ...(mineCount > 0 ? [{ key: 'mine', label: `Mías (${mineCount})` }] : []),
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

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={20} className="text-muted animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <LayoutTemplate size={32} className="text-subtle" />
            <p className="text-sm text-muted">Sin plantillas que coincidan</p>
          </div>
        ) : (
          <>
            {showFeatured && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-accent" />
                  <h2 className="text-sm font-semibold text-foreground">Destacadas</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featured.map((t) => (
                    <TemplateCard key={t.id} template={t} onClick={() => setSelected(t)} />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((t) => (
                <TemplateCard key={t.id} template={t} onClick={() => setSelected(t)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
