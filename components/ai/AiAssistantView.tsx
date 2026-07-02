'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, Send, Loader2, FileText, Layers, Ban, User, Bot } from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'
import { getAllNotesWithNotebook } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'

type ContextMode = 'none' | 'active' | 'all'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const CONTEXT_OPTIONS: { value: ContextMode; label: string; icon: React.ReactNode }[] = [
  { value: 'none', label: 'Sin nota', icon: <Ban size={13} /> },
  { value: 'active', label: 'Nota activa', icon: <FileText size={13} /> },
  { value: 'all', label: 'Todas mis notas', icon: <Layers size={13} /> },
]

const QUICK_ACTIONS = [
  'Resumir mis notas de hoy',
  '¿Qué tengo pendiente?',
  'Sugiéreme tareas a partir de mis notas',
]

export default function AiAssistantView() {
  const { selectedNote } = useNoteStore()
  const [contextMode, setContextMode] = useState<ContextMode>('none')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [allNotesContext, setAllNotesContext] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // Carga perezosa del resumen de todas las notas cuando se elige ese contexto.
  useEffect(() => {
    if (contextMode !== 'all' || allNotesContext !== null) return
    getAllNotesWithNotebook()
      .then((notes) => {
        const lines = notes.slice(0, 60).map((n) => {
          const preview = extractTextPreview(n.content, 160)
          return `- ${n.title || 'Sin título'}${preview ? `: ${preview}` : ''}`
        })
        setAllNotesContext(lines.join('\n') || 'El usuario no tiene notas.')
      })
      .catch(() => setAllNotesContext(''))
  }, [contextMode, allNotesContext])

  const buildContext = (): string => {
    if (contextMode === 'active') {
      if (!selectedNote) return ''
      const body = extractTextPreview(selectedNote.content, 6000)
      return `Nota activa — "${selectedNote.title || 'Sin título'}":\n${body || '(vacía)'}`
    }
    if (contextMode === 'all') {
      return allNotesContext ? `Resumen de las notas del usuario:\n${allNotesContext}` : ''
    }
    return ''
  }

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return

    setError(null)
    const userMsg: ChatMessage = { role: 'user', content: trimmed }
    const history = [...messages, userMsg]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setIsStreaming(true)

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: buildContext(), messages: history }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setError(json.error ?? 'Error al procesar el mensaje')
        setMessages((prev) => prev.slice(0, -1))
        return
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error('Sin respuesta')
      const decoder = new TextDecoder()
      let acc = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: acc }
          return next
        })
      }
    } catch {
      setError('Error de conexión')
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setIsStreaming(false)
    }
  }

  const activeDisabled = contextMode === 'active' && !selectedNote

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="px-8 pt-8 pb-4 border-b border-border shrink-0">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
              <Sparkles size={18} className="text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Asistente IA</h1>
              <p className="text-xs text-muted">Hasta 20 mensajes al día · el historial se borra al recargar</p>
            </div>
          </div>

          {/* Selector de contexto */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-subtle">Contexto:</span>
            {CONTEXT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setContextMode(opt.value)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs transition ${
                  contextMode === opt.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface text-muted hover:border-accent/40'
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
          {activeDisabled && (
            <p className="text-xs text-amber-500">No hay ninguna nota abierta; el contexto irá vacío.</p>
          )}
        </div>
      </div>

      {/* Mensajes */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center gap-5 py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-panel border border-border flex items-center justify-center">
                <Sparkles size={26} className="text-subtle" />
              </div>
              <div>
                <p className="text-foreground font-medium">¿En qué puedo ayudarte?</p>
                <p className="text-muted text-sm mt-1">Pregúntame o usa una acción rápida.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => send(action)}
                    className="px-3 py-1.5 text-xs rounded-full border border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground transition"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-accent/15 text-accent' : 'bg-surface border border-border text-muted'
                }`}
              >
                {msg.role === 'user' ? <User size={15} /> : <Bot size={15} />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent text-white rounded-tr-sm'
                    : 'bg-panel border border-border text-foreground rounded-tl-sm'
                }`}
              >
                {msg.content || (
                  <span className="inline-flex items-center gap-1.5 text-muted">
                    <Loader2 size={13} className="animate-spin" />
                    <span className="ai-shimmer">Pensando…</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-8 pb-6 pt-2 shrink-0">
        <div className="max-w-3xl mx-auto w-full">
          {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input) }}
            className="flex items-end gap-2 bg-panel border border-border rounded-2xl p-2 focus-within:border-accent transition"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
              rows={1}
              placeholder="Escribe tu mensaje…"
              className="flex-1 bg-transparent resize-none px-2 py-1.5 text-sm text-foreground placeholder:text-subtle focus:outline-none max-h-32"
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              title="Enviar"
              className="w-9 h-9 flex items-center justify-center bg-accent text-white rounded-xl hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0"
            >
              {isStreaming ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
