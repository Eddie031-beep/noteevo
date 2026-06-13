'use client'

import { useEffect, useMemo, useState } from 'react'
import { Loader2, Search, Sparkles, Trash2, LayoutTemplate } from 'lucide-react'
import { getTemplates, deleteTemplate } from '@/lib/supabase/templates'
import { createNote, updateNote } from '@/lib/supabase/notes'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import TemplatePreview from './TemplatePreview'
import NotebookPicker from './NotebookPicker'
import EmptyState from '@/components/ui/EmptyState'
import type { Template, Notebook } from '@/types'

const LAST_NOTEBOOK_KEY = 'noteevo-last-template-notebook'

interface CategoryInfo { key: string; label: string; color: string; bg: string }

const CATEGORIES: CategoryInfo[] = [
  { key: 'meeting',   label: 'Reuniones', color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
  { key: 'work',      label: 'Trabajo',   color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  { key: 'journal',   label: 'Diario',    color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { key: 'personal',  label: 'Personal',  color: 'text-accent',     bg: 'bg-accent/10 border-accent/20' },
  { key: 'viaje',     label: 'Viaje',     color: 'text-teal-400',   bg: 'bg-teal-500/10 border-teal-500/20' },
  { key: 'educacion', label: 'Educación', color: 'text-cyan-400',   bg: 'bg-cyan-500/10 border-cyan-500/20' },
  { key: 'proyecto',  label: 'Proyecto',  color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20' },
  { key: 'diario',    label: 'Diario',    color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
]

function getCategoryInfo(key: string | null): CategoryInfo {
  return CATEGORIES.find((c) => c.key === key)
    ?? { key: key ?? 'otros', label: key ?? 'Otros', color: 'text-muted', bg: 'bg-surface border-border' }
}

// ── Thumbnail: preview real del contenido escalado ───────────────────────────
function TemplateThumb({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="h-24 overflow-hidden bg-surface border-b border-border">
      <div
        className="w-[286%] tiptap-preview px-3 py-2"
        style={{ transform: 'scale(0.35)', transformOrigin: 'top left', pointerEvents: 'none' }}
      >
        <TemplatePreview content={content} />
      </div>
    </div>
  )
}

// ── Card del grid ────────────────────────────────────────────────────────────
function TemplateCard({
  template, active, onClick,
}: {
  template: Template; active: boolean; onClick: () => void
}) {
  const cat = getCategoryInfo(template.category)
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group text-left bg-panel border rounded-xl overflow-hidden transition cursor-pointer flex flex-col ${
        active ? 'border-accent ring-1 ring-accent/30' : 'border-border hover:border-accent/40'
      }`}
    >
      <div className="relative">
        <TemplateThumb content={template.content} />
        <span className={`absolute top-1.5 right-1.5 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border backdrop-blur-sm ${
          template.is_builtin ? 'bg-accent/15 border-accent/30 text-accent' : 'bg-surface/80 border-border text-muted'
        }`}>
          {template.is_builtin ? <Sparkles size={9} /> : null}
          {template.is_builtin ? 'Oficial' : 'Mía'}
        </span>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-1">
        <p className="text-sm font-semibold text-foreground group-hover:text-accent transition truncate">
          {template.name}
        </p>
        {template.description && (
          <p className="text-xs text-muted truncate">{template.description}</p>
        )}
        <span className={`mt-1 inline-flex items-center w-fit text-[10px] px-2 py-0.5 rounded-full border ${cat.bg} ${cat.color}`}>
          {cat.label}
        </span>
      </div>
    </button>
  )
}

// ── Panel derecho: detalle de la plantilla seleccionada ──────────────────────
function TemplateDetail({
  template, onDeleted,
}: {
  template: Template; onDeleted: (id: string) => void
}) {
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  const [chosen, setChosen] = useState<Notebook | null>(null)
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
  const notebook = chosen ?? defaultNotebook

  const handleUse = async () => {
    if (!notebook) { setError('Elige una libreta para continuar'); return }
    setImporting(true)
    setError(null)
    try {
      const note = await createNote(notebook.id)
      await updateNote(note.id, { title: template.name, content: template.content })
      const populated = { ...note, title: template.name, content: template.content }
      addNote(populated)
      setSelectedNote(populated)
      setSelectedNotebook(notebook)
      if (typeof window !== 'undefined') localStorage.setItem(LAST_NOTEBOOK_KEY, notebook.id)
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
    <div className="h-full flex flex-col">
      <div className="px-5 pt-5 pb-4 border-b border-border shrink-0">
        <h2 className="text-lg font-bold text-foreground">{template.name}</h2>
        {template.description && (
          <p className="text-xs text-muted mt-1 leading-relaxed">{template.description}</p>
        )}
        <span className={`mt-2 inline-flex items-center text-[10px] px-2 py-0.5 rounded-full border ${cat.bg} ${cat.color}`}>
          {cat.label}
        </span>
      </div>

      {/* Vista previa con scroll */}
      <div className="flex-1 overflow-y-auto px-5 py-4 bg-surface/30">
        <div className="bg-panel border border-border rounded-xl p-4 tiptap-preview text-sm">
          <TemplatePreview content={template.content} />
        </div>
      </div>

      {/* Acciones (sin overflow-hidden: NotebookPicker abre dropdown) */}
      <div className="px-5 py-4 border-t border-border shrink-0 space-y-3">
        <NotebookPicker notebooks={notebooks} selected={notebook} onSelect={setChosen} dropUp />
        {error && <p className="text-xs text-danger">{error}</p>}
        {success && <p className="text-xs text-accent font-medium">✓ Abriendo en el editor…</p>}
        <button
          type="button"
          onClick={handleUse}
          disabled={importing || success || !notebook}
          className="w-full py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer flex items-center justify-center gap-2"
        >
          {importing && <Loader2 size={14} className="animate-spin" />}
          {importing ? 'Creando…' : 'Usar esta plantilla'}
        </button>

        {!template.is_builtin && (
          confirmDelete ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2 bg-danger text-white text-xs font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                {deleting && <Loader2 size={13} className="animate-spin" />}
                {deleting ? 'Eliminando…' : 'Confirmar'}
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
  )
}

// ── Vista principal (3 paneles) ──────────────────────────────────────────────
export default function TemplatesView() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selected, setSelected] = useState<Template | null>(null)

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Debounce 200ms del buscador
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 200)
    return () => clearTimeout(t)
  }, [query])

  // Categorías presentes deduplicadas por etiqueta (work/trabajo y journal/diario
  // comparten label, así evitamos pills repetidas).
  const presentCategories = useMemo(() => {
    const seen = new Set<string>()
    const out: CategoryInfo[] = []
    for (const t of templates) {
      if (!t.category) continue
      const info = getCategoryInfo(t.category)
      if (seen.has(info.label)) continue
      seen.add(info.label)
      out.push(info)
    }
    return out
  }, [templates])

  const filtered = templates.filter((t) => {
    if (filter === 'mine' && t.is_builtin) return false
    if (filter !== 'all' && filter !== 'mine' && getCategoryInfo(t.category).label !== filter) return false
    if (debouncedQuery && !t.name.toLowerCase().includes(debouncedQuery) && !(t.description ?? '').toLowerCase().includes(debouncedQuery)) return false
    return true
  })

  const mineCount = templates.filter((t) => !t.is_builtin).length

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-background">
      {/* Panel izquierdo: buscador + filtros */}
      <aside className="w-60 shrink-0 border-r border-border flex flex-col">
        <div className="px-4 pt-5 pb-3 shrink-0">
          <h1 className="text-base font-semibold text-foreground mb-3">Plantillas</h1>
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar…"
              className="w-full pl-8 pr-3 py-1.5 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:border-accent/50 transition placeholder-subtle"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
          {[
            { key: 'all', label: `Todas (${templates.length})` },
            ...presentCategories.map((c) => ({ key: c.label, label: c.label })),
            ...(mineCount > 0 ? [{ key: 'mine', label: `Mías (${mineCount})` }] : []),
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`w-full text-left px-3 py-1.5 text-xs rounded-lg border transition cursor-pointer font-medium ${
                filter === f.key
                  ? 'bg-accent/15 text-accent border-accent/30'
                  : 'bg-transparent border-transparent text-muted hover:bg-surface hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Panel central: grid de cards */}
      <main className="flex-1 overflow-y-auto p-5">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={20} className="text-muted animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          debouncedQuery ? (
            <EmptyState
              variant="search"
              title="Sin resultados"
              description="Prueba con otro término de búsqueda"
            />
          ) : filter === 'mine' ? (
            <EmptyState
              variant="templates"
              title="Aún no tienes plantillas propias"
              description="Guarda cualquier nota como plantilla desde el editor"
            />
          ) : (
            <EmptyState
              variant="templates"
              title="Sin plantillas que coincidan"
            />
          )
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                active={selected?.id === t.id}
                onClick={() => setSelected(t)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Panel derecho: detalle */}
      <aside className="w-72 shrink-0 border-l border-border">
        {selected ? (
          <TemplateDetail
            key={selected.id}
            template={selected}
            onDeleted={(id) => {
              setTemplates((prev) => prev.filter((t) => t.id !== id))
              setSelected(null)
            }}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-3 px-6 text-center">
            <LayoutTemplate size={28} className="text-subtle" />
            <p className="text-sm text-muted">Selecciona una plantilla para empezar</p>
          </div>
        )}
      </aside>
    </div>
  )
}
