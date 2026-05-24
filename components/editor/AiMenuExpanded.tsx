'use client'

import { useRef, useState, useEffect } from 'react'
import {
  Sparkles, ChevronDown, Loader2, Check, X,
  MessageSquare, Tag as TagIcon, FileText,
  Briefcase, Coffee, SpellCheck, Languages,
  Minimize2, Maximize2,
} from 'lucide-react'
import type { Editor } from '@tiptap/react'

type AiAction =
  | 'summarize'
  | 'chat'
  | 'smart_tags'
  | 'improve'
  | 'tone_formal'
  | 'tone_casual'
  | 'fix_typos'
  | 'translate_en'
  | 'translate_es'
  | 'make_shorter'
  | 'make_longer'

interface AiMenuExpandedProps {
  editor: Editor
  noteId: string
  noteContent: string
  onSummarize: () => void
  onChat: () => void
  onSmartTags: () => void
}

interface MenuItem {
  action: AiAction
  label: string
  icon: React.ReactNode
  category: string
  needsSelection?: boolean
}

const MENU_ITEMS: MenuItem[] = [
  // Análisis
  { action: 'summarize', label: 'Resumir nota', icon: <FileText size={13} />, category: 'Análisis' },
  { action: 'chat', label: 'Chat con la nota', icon: <MessageSquare size={13} />, category: 'Análisis' },
  { action: 'smart_tags', label: 'Sugerir etiquetas', icon: <TagIcon size={13} />, category: 'Análisis' },
  // Texto (necesita selección)
  { action: 'improve', label: 'Mejorar texto', icon: <Sparkles size={13} />, category: 'Texto', needsSelection: true },
  { action: 'fix_typos', label: 'Corregir errores', icon: <SpellCheck size={13} />, category: 'Texto', needsSelection: true },
  { action: 'make_shorter', label: 'Acortar', icon: <Minimize2 size={13} />, category: 'Texto', needsSelection: true },
  { action: 'make_longer', label: 'Expandir', icon: <Maximize2 size={13} />, category: 'Texto', needsSelection: true },
  // Tono (necesita selección)
  { action: 'tone_formal', label: 'Tono formal', icon: <Briefcase size={13} />, category: 'Tono', needsSelection: true },
  { action: 'tone_casual', label: 'Tono casual', icon: <Coffee size={13} />, category: 'Tono', needsSelection: true },
  // Traducir
  { action: 'translate_en', label: 'Traducir al inglés', icon: <Languages size={13} />, category: 'Traducir', needsSelection: true },
  { action: 'translate_es', label: 'Traducir al español', icon: <Languages size={13} />, category: 'Traducir', needsSelection: true },
]

export default function AiMenuExpanded({
  editor,
  noteContent,
  onSummarize,
  onChat,
  onSmartTags,
}: AiMenuExpandedProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<AiAction | null>(null)
  const [result, setResult] = useState<{ text: string; action: AiAction } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const hasSelection = !editor.state.selection.empty

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setResult(null)
        setError(null)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleAction = async (action: AiAction) => {
    // Acciones que abren paneles externos
    if (action === 'summarize') { onSummarize(); setOpen(false); return }
    if (action === 'chat') { onChat(); setOpen(false); return }
    if (action === 'smart_tags') { onSmartTags(); setOpen(false); return }

    // Acciones de transformación — necesitan texto seleccionado
    const selectedText = editor.state.doc.textBetween(
      editor.state.selection.from,
      editor.state.selection.to,
      ' '
    ).trim()

    if (!selectedText) {
      setError('Selecciona texto primero')
      return
    }

    // Mejorar escritura usa el endpoint existente
    const endpoint = action === 'improve' ? '/api/ai/improve' : '/api/ai/transform'
    const body = action === 'improve'
      ? { text: selectedText }
      : { text: selectedText, action }

    setLoading(action)
    setResult(null)
    setError(null)

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error ?? 'Error desconocido')
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error('Sin respuesta')

      let text = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
        setResult({ text, action })
      }
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setLoading(null)
    }
  }

  const handleAccept = () => {
    if (!result) return
    const { state } = editor
    const { from, to } = state.selection
    editor.chain().focus().deleteRange({ from, to }).insertContentAt(from, result.text).run()
    setResult(null)
    setOpen(false)
  }

  const handleReject = () => {
    setResult(null)
    setError(null)
  }

  const categories = [...new Set(MENU_ITEMS.map((i) => i.category))]

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title="Herramientas de IA"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-2 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
          open
            ? 'bg-accent/20 text-accent'
            : 'text-muted hover:bg-surface hover:text-foreground'
        }`}
      >
        <Sparkles size={13} />
        IA
        <ChevronDown size={10} />
      </button>

      {open && (
        <div className="absolute left-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-2xl w-56 overflow-hidden">
          {/* Resultado / Error */}
          {(result || error || loading) && (
            <div className="px-3 py-2.5 border-b border-border bg-surface/50">
              {loading && (
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Loader2 size={11} className="animate-spin" />
                  Procesando...
                </div>
              )}
              {error && !loading && (
                <p className="text-xs text-danger">{error}</p>
              )}
              {result && !loading && (
                <div className="space-y-2">
                  <p className="text-xs text-foreground leading-relaxed line-clamp-3">
                    {result.text}
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={handleAccept}
                      className="flex items-center gap-1 px-2 py-1 bg-accent text-white text-[10px] rounded-md hover:bg-accent-light transition cursor-pointer"
                    >
                      <Check size={10} /> Aplicar
                    </button>
                    <button
                      type="button"
                      onClick={handleReject}
                      className="flex items-center gap-1 px-2 py-1 bg-elevated text-muted text-[10px] rounded-md hover:text-foreground transition cursor-pointer"
                    >
                      <X size={10} /> Descartar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Menu items */}
          <div className="py-1 max-h-72 overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat}>
                <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-subtle uppercase tracking-wider">
                  {cat}
                </p>
                {MENU_ITEMS.filter((i) => i.category === cat).map((item) => {
                  const disabled = (item.needsSelection && !hasSelection) || loading !== null
                  return (
                    <button
                      key={item.action}
                      type="button"
                      onClick={() => handleAction(item.action)}
                      disabled={disabled}
                      title={item.needsSelection && !hasSelection ? 'Selecciona texto primero' : undefined}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left transition cursor-pointer ${
                        disabled
                          ? 'text-subtle cursor-not-allowed'
                          : 'text-muted hover:bg-surface hover:text-foreground'
                      }`}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      {item.label}
                      {item.needsSelection && !hasSelection && (
                        <span className="ml-auto text-[10px] text-subtle">selecciona</span>
                      )}
                      {loading === item.action && (
                        <Loader2 size={10} className="ml-auto animate-spin text-accent" />
                      )}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
