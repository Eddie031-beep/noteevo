'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Sparkles, Send, Loader2, MessageSquare } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AiChatPanelProps {
  noteContent: string
  onClose: () => void
}

export default function AiChatPanel({ noteContent, onClose }: AiChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteContent,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error ?? 'Error desconocido')
        setIsLoading(false)
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error('Sin respuesta')

      let result = ''
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: result }
          return updated
        })
      }
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-80 shrink-0 border-l border-border bg-panel flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-accent" />
          <span className="text-sm font-medium text-foreground">Chat con la nota</span>
        </div>
        <button
          type="button"
          title="Cerrar chat"
          onClick={onClose}
          className="text-muted hover:text-foreground transition p-0.5 rounded cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-3 mt-8 text-center">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <MessageSquare size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Pregunta sobre tu nota</p>
              <p className="text-xs text-muted mt-1">
                Puedo responder preguntas basadas en el contenido de esta nota
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[10px] text-subtle px-1">
              {msg.role === 'user' ? 'Tú' : 'IA'}
            </span>
            <div
              className={`px-3 py-2 rounded-xl text-xs leading-relaxed max-w-[90%] whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-accent text-white rounded-tr-sm'
                  : 'bg-surface text-foreground rounded-tl-sm'
              }`}
            >
              {msg.content || (
                <Loader2 size={12} className="animate-spin text-muted" />
              )}
            </div>
          </div>
        ))}

        {error && (
          <p className="text-xs text-danger text-center">{error}</p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pregunta algo sobre la nota..."
            rows={2}
            className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground outline-none resize-none focus:border-accent/50 transition placeholder-subtle"
            style={{ color: 'var(--color-foreground)' }}
          />
          <button
            type="button"
            title="Enviar"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 bg-accent text-white rounded-xl hover:bg-accent-light disabled:opacity-40 transition cursor-pointer shrink-0"
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
          </button>
        </div>
        <p className="text-[10px] text-subtle mt-1.5">Enter para enviar · Shift+Enter nueva línea</p>
      </div>
    </div>
  )
}
