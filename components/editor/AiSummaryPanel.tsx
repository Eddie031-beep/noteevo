'use client'

import { X, Sparkles, Loader2 } from 'lucide-react'

interface AiSummaryPanelProps {
  summary: string | null
  isLoading: boolean
  error: string | null
  onClose: () => void
}

export default function AiSummaryPanel({ summary, isLoading, error, onClose }: AiSummaryPanelProps) {
  return (
    <div className="w-72 shrink-0 border-l border-border bg-panel flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-accent" />
          <span className="text-sm font-medium text-foreground">Resumen IA</span>
        </div>
        <button
          type="button"
          title="Cerrar panel"
          onClick={onClose}
          className="text-muted hover:text-foreground transition p-0.5 rounded cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isLoading && (
          <div className="flex items-center gap-2 text-muted text-sm">
            <Loader2 size={14} className="animate-spin" />
            <span>Generando resumen...</span>
          </div>
        )}

        {error && !isLoading && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        {summary && !isLoading && (
          <p className="text-sm text-foreground leading-relaxed">{summary}</p>
        )}
      </div>
    </div>
  )
}
