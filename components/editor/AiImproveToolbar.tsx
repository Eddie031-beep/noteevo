'use client'

import { useRef, useState } from 'react'
import { Sparkles, Check, X, Loader2 } from 'lucide-react'

interface AiImproveToolbarProps {
  position: { top: number; left: number }
  selectedText: string
  onAccept: (improvedText: string) => void
  onReject: () => void
}

export default function AiImproveToolbar({
  position,
  selectedText,
  onAccept,
  onReject,
}: AiImproveToolbarProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [improvedText, setImprovedText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleImprove = async () => {
    setState('loading')
    setImprovedText('')
    setError(null)

    try {
      const res = await fetch('/api/ai/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedText }),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error ?? 'Error desconocido')
        setState('error')
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error('Sin respuesta')

      let result = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        setImprovedText(result)
      }

      setState('done')
    } catch {
      setError('Error al conectar con el servidor')
      setState('error')
    }
  }


  const style: React.CSSProperties = {
    position: 'fixed',
    top: position.top,
    left: position.left,
    zIndex: 50,
    maxWidth: '360px',
    minWidth: '240px',
  }

  return (
    <div ref={containerRef} style={style} onMouseDown={(e) => e.preventDefault()}>
      <div className="bg-panel border border-border rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
          <Sparkles size={13} className="text-accent shrink-0" />
          <span className="text-xs font-medium text-foreground">Mejorar escritura</span>
          {state === 'loading' && (
            <Loader2 size={12} className="text-muted animate-spin ml-auto" />
          )}
        </div>

        {/* Content */}
        <div className="px-3 py-2.5 max-h-40 overflow-y-auto">
          {state === 'idle' && (
            <button
              type="button"
              onClick={handleImprove}
              className="text-xs text-accent hover:opacity-80 transition cursor-pointer"
            >
              Mejorar con IA →
            </button>
          )}
          {state === 'loading' && !improvedText && (
            <p className="text-xs text-muted">Mejorando...</p>
          )}
          {(state === 'loading' || state === 'done') && improvedText && (
            <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
              {improvedText}
            </p>
          )}
          {state === 'error' && (
            <p className="text-xs text-danger">{error}</p>
          )}
        </div>

        {/* Actions */}
        {(state === 'done' || state === 'error') && (
          <div className="flex items-center gap-1 px-3 py-2 border-t border-border">
            {state === 'done' && (
              <button
                type="button"
                onClick={() => onAccept(improvedText)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-accent text-white text-xs rounded-lg hover:bg-accent-light transition cursor-pointer"
              >
                <Check size={12} />
                Aceptar
              </button>
            )}
            <button
              type="button"
              onClick={onReject}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-surface text-muted text-xs rounded-lg hover:bg-elevated hover:text-foreground transition cursor-pointer"
            >
              <X size={12} />
              Cancelar
            </button>
            {state === 'done' && (
              <button
                type="button"
                onClick={handleImprove}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-muted hover:text-accent transition cursor-pointer ml-auto"
              >
                <Sparkles size={11} />
                Reintentar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
