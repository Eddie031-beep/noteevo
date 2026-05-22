'use client'

import { useEffect, useState } from 'react'
import { X, FileText, LayoutTemplate, Loader2 } from 'lucide-react'
import { getTemplates } from '@/lib/supabase/templates'
import type { Template } from '@/types'

interface TemplateSelectorProps {
  onSelectBlank: () => void
  onSelectTemplate: (template: Template) => void
  onClose: () => void
}

export default function TemplateSelector({
  onSelectBlank,
  onSelectTemplate,
  onClose,
}: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const builtin = templates.filter((t) => t.is_builtin)
  const personal = templates.filter((t) => !t.is_builtin)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground">Nueva nota</h2>
            <p className="text-xs text-muted mt-0.5">Elige un punto de partida</p>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

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
                      <TemplateCard
                        key={t.id}
                        template={t}
                        onClick={() => onSelectTemplate(t)}
                      />
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
                      <TemplateCard
                        key={t.id}
                        template={t}
                        onClick={() => onSelectTemplate(t)}
                      />
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
      </div>
    </div>
  )
}

function TemplateCard({
  template,
  onClick,
}: {
  template: Template
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3.5 bg-surface border border-border rounded-xl hover:border-accent/40 hover:bg-elevated transition cursor-pointer text-left"
    >
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
          template.is_builtin
            ? 'bg-accent/10'
            : 'bg-elevated border border-border'
        }`}
      >
        <LayoutTemplate
          size={16}
          className={template.is_builtin ? 'text-accent' : 'text-muted'}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground truncate">{template.name}</p>
        {template.description && (
          <p className="text-xs text-muted truncate mt-0.5">{template.description}</p>
        )}
      </div>
      {!template.is_builtin && template.category && (
        <span className="shrink-0 text-[10px] px-2 py-0.5 bg-elevated border border-border rounded-full text-subtle">
          {template.category}
        </span>
      )}
    </button>
  )
}
