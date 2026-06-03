'use client'

import { useEffect, useMemo, useState } from 'react'
import { X, FileText, LayoutTemplate, Loader2, ArrowLeft } from 'lucide-react'
import { getTemplates } from '@/lib/supabase/templates'
import { createNote, updateNote } from '@/lib/supabase/notes'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import TemplatePreview from './TemplatePreview'
import NotebookPicker from './NotebookPicker'
import type { Template, Notebook } from '@/types'

const LAST_NOTEBOOK_KEY = 'noteevo-last-template-notebook'

interface TemplateSelectorProps {
  onSelectBlank: () => void
  onClose: () => void
}

export default function TemplateSelector({ onSelectBlank, onClose }: TemplateSelectorProps) {
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<'list' | 'preview'>('list')
  const [selected, setSelected] = useState<Template | null>(null)
  const [chosen, setChosen] = useState<Notebook | null>(null)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const defaultNotebook = useMemo(() => {
    if (notebooks.length === 0) return null
    const lastId = typeof window !== 'undefined' ? localStorage.getItem(LAST_NOTEBOOK_KEY) : null
    return (lastId ? notebooks.find((n) => n.id === lastId) : null) ?? notebooks[0]
  }, [notebooks])
  const notebook = chosen ?? defaultNotebook

  const builtin = templates.filter((t) => t.is_builtin)
  const personal = templates.filter((t) => !t.is_builtin)

  const openPreview = (t: Template) => {
    setSelected(t)
    setError(null)
    setStep('preview')
  }

  const handleUse = async () => {
    if (!selected || !notebook) { setError('Elige una libreta para continuar'); return }
    setImporting(true)
    setError(null)
    try {
      const note = await createNote(notebook.id)
      await updateNote(note.id, { title: selected.name, content: selected.content })
      const populated = { ...note, title: selected.name, content: selected.content }
      addNote(populated)
      setSelectedNote(populated)
      setSelectedNotebook(notebook)
      if (typeof window !== 'undefined') localStorage.setItem(LAST_NOTEBOOK_KEY, notebook.id)
      setCurrentView('notebooks')
      onClose()
    } catch {
      setError('Error al usar la plantilla. Intenta de nuevo.')
      setImporting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className={`bg-panel border border-border rounded-2xl shadow-2xl w-full mx-4 overflow-hidden ${
        step === 'preview' ? 'max-w-3xl' : 'max-w-lg'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          {step === 'preview' ? (
            <button
              type="button"
              onClick={() => setStep('list')}
              className="flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition cursor-pointer"
            >
              <ArrowLeft size={15} />
              Volver
            </button>
          ) : (
            <div>
              <h2 className="font-semibold text-foreground">Nueva nota</h2>
              <p className="text-xs text-muted mt-0.5">Elige un punto de partida</p>
            </div>
          )}
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {step === 'list' ? (
          <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4">
            {/* En blanco */}
            <button
              type="button"
              onClick={onSelectBlank}
              className="w-full flex items-center gap-4 p-4 bg-surface border-2 border-accent/30 rounded-xl hover:border-accent hover:bg-elevated transition cursor-pointer text-left"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                <FileText size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">En blanco</p>
                <p className="text-xs text-muted mt-0.5">Comienza con una nota vacía</p>
              </div>
            </button>

            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 size={18} className="text-muted animate-spin" />
              </div>
            ) : (
              <>
                {builtin.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-subtle uppercase tracking-wider mb-2 px-1">
                      Plantillas incluidas
                    </p>
                    <div className="space-y-1.5">
                      {builtin.map((t) => (
                        <TemplateRow key={t.id} template={t} onClick={() => openPreview(t)} />
                      ))}
                    </div>
                  </div>
                )}
                {personal.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-subtle uppercase tracking-wider mb-2 px-1">
                      Mis plantillas
                    </p>
                    <div className="space-y-1.5">
                      {personal.map((t) => (
                        <TemplateRow key={t.id} template={t} onClick={() => openPreview(t)} />
                      ))}
                    </div>
                  </div>
                )}
                {templates.length === 0 && (
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <LayoutTemplate size={24} className="text-subtle" />
                    <p className="text-sm text-muted">Sin plantillas disponibles</p>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          selected && (
            <div className="flex flex-col sm:flex-row max-h-[70vh]">
              {/* Preview */}
              <div className="flex-1 overflow-y-auto p-5 bg-surface/30 tiptap-preview text-sm border-b sm:border-b-0 sm:border-r border-border">
                <TemplatePreview content={selected.content} />
              </div>
              {/* Acciones */}
              <div className="w-full sm:w-64 shrink-0 p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-foreground">{selected.name}</h3>
                  {selected.description && (
                    <p className="text-xs text-muted mt-1 leading-relaxed">{selected.description}</p>
                  )}
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-foreground">¿Dónde guardarla?</p>
                  <NotebookPicker notebooks={notebooks} selected={notebook} onSelect={setChosen} />
                  {error && <p className="text-xs text-danger">{error}</p>}
                  <button
                    type="button"
                    onClick={handleUse}
                    disabled={importing || !notebook}
                    className="w-full py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    {importing && <Loader2 size={14} className="animate-spin" />}
                    {importing ? 'Creando…' : 'Usar plantilla'}
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

function TemplateRow({ template, onClick }: { template: Template; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3.5 bg-surface border border-border rounded-xl hover:border-accent/40 hover:bg-elevated transition cursor-pointer text-left"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
        template.is_builtin ? 'bg-accent/10' : 'bg-elevated border border-border'
      }`}>
        <LayoutTemplate size={16} className={template.is_builtin ? 'text-accent' : 'text-muted'} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground truncate">{template.name}</p>
        {template.description && (
          <p className="text-xs text-muted truncate mt-0.5">{template.description}</p>
        )}
      </div>
      {template.category && (
        <span className="shrink-0 text-[10px] px-2 py-0.5 bg-elevated border border-border rounded-full text-subtle">
          {template.category}
        </span>
      )}
    </button>
  )
}
