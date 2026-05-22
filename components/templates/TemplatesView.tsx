'use client'

import { useEffect, useState } from 'react'
import { LayoutTemplate, Trash2, Loader2, Plus } from 'lucide-react'
import { getTemplates, deleteTemplate } from '@/lib/supabase/templates'
import { createNote, updateNote } from '@/lib/supabase/notes'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { Template } from '@/types'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

const CATEGORY_LABELS: Record<string, string> = {
  personal: 'Personal',
  work: 'Trabajo',
  meeting: 'Reuniones',
  journal: 'Diario',
}

export default function TemplatesView() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Template | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [creatingId, setCreatingId] = useState<string | null>(null)
  const [noNotebookError, setNoNotebookError] = useState(false)

  const { selectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  useEffect(() => {
    getTemplates()
      .then((data) => {
        setTemplates(data)
        if (data.length > 0) setSelected(data[0])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (template: Template) => {
    setDeletingId(template.id)
    try {
      await deleteTemplate(template.id)
      const updated = templates.filter((t) => t.id !== template.id)
      setTemplates(updated)
      if (selected?.id === template.id) {
        setSelected(updated.length > 0 ? updated[0] : null)
      }
    } catch {
      // silencioso
    } finally {
      setDeletingId(null)
    }
  }

  const handleUse = async (template: Template) => {
    if (!selectedNotebook) {
      setNoNotebookError(true)
      setTimeout(() => setNoNotebookError(false), 3000)
      return
    }
    setCreatingId(template.id)
    try {
      const note = await createNote(selectedNotebook.id)
      await updateNote(note.id, {
        title: template.name,
        content: template.content,
      })
      addNote({ ...note, title: template.name, content: template.content })
      setSelectedNote({ ...note, title: template.name, content: template.content })
      setCurrentView('notebooks')
    } catch {
      // silencioso
    } finally {
      setCreatingId(null)
    }
  }

  const builtin = templates.filter((t) => t.is_builtin)
  const personal = templates.filter((t) => !t.is_builtin)

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-background">
      {/* Panel izquierdo — lista */}
      <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
        <div className="h-14 px-4 border-b border-border flex items-center gap-2.5">
          <LayoutTemplate size={18} className="text-muted shrink-0" />
          <div>
            <h2 className="font-semibold text-foreground text-sm">Plantillas</h2>
            {!loading && (
              <p className="text-xs text-muted">
                {templates.length} plantilla{templates.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-1">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={18} className="text-muted animate-spin" />
            </div>
          ) : (
            <>
              {builtin.length > 0 && (
                <div className="mb-1">
                  <p className="px-4 py-2 text-[10px] font-semibold text-subtle uppercase tracking-wider">
                    Incluidas
                  </p>
                  {builtin.map((t) => (
                    <TemplateListItem
                      key={t.id}
                      template={t}
                      selected={selected?.id === t.id}
                      onSelect={() => setSelected(t)}
                    />
                  ))}
                </div>
              )}

              {personal.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-[10px] font-semibold text-subtle uppercase tracking-wider">
                    Mis plantillas
                  </p>
                  {personal.map((t) => (
                    <TemplateListItem
                      key={t.id}
                      template={t}
                      selected={selected?.id === t.id}
                      onSelect={() => setSelected(t)}
                      onDelete={() => handleDelete(t)}
                      isDeleting={deletingId === t.id}
                    />
                  ))}
                </div>
              )}

              {templates.length === 0 && (
                <div className="flex flex-col items-center gap-3 py-12 px-4 text-center">
                  <LayoutTemplate size={28} className="text-subtle" />
                  <p className="text-sm text-muted">Sin plantillas</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Panel derecho — preview */}
      <div className="flex-1 overflow-y-auto px-10 py-8 bg-background">
        {selected ? (
          <div className="max-w-2xl">
            {/* Header del template */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 className="text-2xl font-bold text-foreground">{selected.name}</h1>
                  {selected.is_builtin ? (
                    <span className="text-[10px] px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded-full">
                      Incluida
                    </span>
                  ) : selected.category ? (
                    <span className="text-[10px] px-2 py-0.5 bg-surface border border-border rounded-full text-subtle">
                      {CATEGORY_LABELS[selected.category] ?? selected.category}
                    </span>
                  ) : null}
                </div>
                {selected.description && (
                  <p className="text-sm text-muted">{selected.description}</p>
                )}
                {!selected.is_builtin && (
                  <p className="text-xs text-subtle mt-1">
                    Creada el {format(parseISO(selected.created_at), 'd MMM yyyy', { locale: es })}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleUse(selected)}
                disabled={creatingId === selected.id}
                className="shrink-0 flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light disabled:opacity-50 transition cursor-pointer"
              >
                {creatingId === selected.id ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Plus size={15} />
                )}
                Usar plantilla
              </button>
            </div>

            {noNotebookError && (
              <div className="mb-4 px-4 py-3 bg-danger/10 border border-danger/25 rounded-lg">
                <p className="text-sm text-danger">
                  Selecciona una libreta en el sidebar antes de usar esta plantilla
                </p>
              </div>
            )}

            {/* Vista previa del contenido */}
            <div className="bg-panel border border-border rounded-xl p-6">
              <p className="text-[10px] font-semibold text-subtle uppercase tracking-wider mb-4">
                Vista previa
              </p>
              <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap">
                {extractTextPreview(selected.content, 600) || (
                  <span className="italic text-subtle">Plantilla vacía</span>
                )}
              </p>
            </div>

            {/* Botón eliminar (solo personales) */}
            {!selected.is_builtin && (
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleDelete(selected)}
                  disabled={deletingId === selected.id}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs text-danger border border-danger/25 rounded-lg hover:bg-danger/10 transition cursor-pointer disabled:opacity-50"
                >
                  {deletingId === selected.id ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <Trash2 size={13} />
                  )}
                  Eliminar plantilla
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="w-16 h-16 bg-panel border border-border rounded-2xl flex items-center justify-center">
              <LayoutTemplate size={28} className="text-subtle" />
            </div>
            <div>
              <p className="text-foreground font-medium">Sin plantillas</p>
              <p className="text-muted text-sm mt-1">
                Guarda una nota como plantilla desde el botón en la toolbar del editor
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TemplateListItem({
  template,
  selected,
  onSelect,
  onDelete,
  isDeleting,
}: {
  template: Template
  selected: boolean
  onSelect: () => void
  onDelete?: () => void
  isDeleting?: boolean
}) {
  return (
    <div
      onClick={onSelect}
      className={`group flex items-center justify-between px-4 py-2.5 cursor-pointer transition ${
        selected
          ? 'bg-accent/10 border-l-2 border-l-accent'
          : 'hover:bg-surface'
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className="text-sm text-foreground truncate">{template.name}</p>
        {template.description && (
          <p className="text-xs text-subtle truncate mt-0.5">{template.description}</p>
        )}
      </div>
      {onDelete && (
        <button
          type="button"
          title="Eliminar plantilla"
          onClick={(e) => { e.stopPropagation(); onDelete() }}
          disabled={isDeleting}
          className="opacity-0 group-hover:opacity-100 p-1 text-muted hover:text-danger transition cursor-pointer rounded shrink-0"
        >
          {isDeleting ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Trash2 size={12} />
          )}
        </button>
      )}
    </div>
  )
}
