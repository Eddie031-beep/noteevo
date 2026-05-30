'use client'

import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { useEffect, useState, useCallback, useRef } from 'react'
import {
  GitBranch, GripVertical, MoreHorizontal,
  Trash2, Check, X, ClipboardCopy,
} from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

type ViewMode = 'code' | 'split' | 'preview'

let mermaidModule: typeof import('mermaid').default | null = null
let renderCount = 0

async function getMermaid() {
  if (mermaidModule) return mermaidModule
  const mod = await import('mermaid')
  mermaidModule = mod.default
  mermaidModule.initialize({ startOnLoad: false })
  return mermaidModule
}

function getMermaidTheme(isDark: boolean) {
  return isDark
    ? {
        theme: 'dark' as const,
        themeVariables: {
          background: '#1a1a1a',
          mainBkg: '#242424',
          nodeBorder: '#2d2d2d',
          primaryColor: '#1a7a4a',
          primaryTextColor: '#e8e8e8',
          primaryBorderColor: '#1a7a4a',
          lineColor: '#8a8a8a',
          secondaryColor: '#242424',
          tertiaryColor: '#2a2a2a',
          fontFamily: 'var(--font-geist-sans), sans-serif',
        },
      }
    : {
        theme: 'default' as const,
        themeVariables: {
          primaryColor: '#1a7a4a',
          primaryTextColor: '#1a1a1a',
          primaryBorderColor: '#1a7a4a',
          lineColor: '#6b6b6b',
          fontFamily: 'var(--font-geist-sans), sans-serif',
        },
      }
}

export default function MermaidComponent({
  node, updateAttributes, deleteNode, selected,
}: NodeViewProps) {
  const code = (node.attrs.code as string) ?? ''
  const { theme } = useUIStore()

  const [mode, setMode] = useState<ViewMode>('preview')
  const [draftCode, setDraftCode] = useState(code)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [rendering, setRendering] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const isDirty = draftCode !== code

  const renderDiagram = useCallback(async (source: string) => {
    setRendering(true)
    setError(null)
    try {
      const m = await getMermaid()
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      m.initialize({ startOnLoad: false, ...getMermaidTheme(isDark) })
      const id = `mermaid-${++renderCount}`
      const result = await m.render(id, source)
      const svgContent = typeof result === 'object' ? result.svg : result
      setSvg(svgContent)
    } catch {
      setError('Sintaxis inválida. Revisa el código Mermaid.')
    } finally {
      setRendering(false)
    }
  }, [])

  useEffect(() => {
    renderDiagram(code)
  }, [code, theme, renderDiagram])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }
    if (showMenu) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showMenu])

  const handleSave = () => {
    updateAttributes({ code: draftCode })
    renderDiagram(draftCode)
    setMode('preview')
  }

  const handleDiscard = () => {
    setDraftCode(code)
    setMode('preview')
  }

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setShowMenu(false)
    setTimeout(() => setCopied(false), 2000)
  }

  const DiagramView = () => (
    <div className="flex items-center justify-center p-6 min-h-[140px] bg-panel">
      {rendering ? (
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className="w-4 h-4 border-2 border-muted border-t-accent rounded-full animate-spin" />
          Renderizando...
        </div>
      ) : error ? (
        <div className="text-center space-y-2">
          <p className="text-xs text-danger">{error}</p>
          <button
            type="button"
            onClick={() => setMode('code')}
            className="text-xs text-accent hover:text-accent-light cursor-pointer"
          >
            Abrir editor →
          </button>
        </div>
      ) : (
        <div
          className="max-w-full overflow-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  )

  const CodeEditor = () => (
    <textarea
      value={draftCode}
      onChange={(e) => setDraftCode(e.target.value)}
      rows={10}
      className="w-full p-4 bg-elevated text-xs text-foreground font-mono outline-none resize-none leading-relaxed"
      style={{ color: 'var(--color-foreground)' }}
      placeholder="flowchart TD&#10;  A[Inicio] --> B[Fin]"
      spellCheck={false}
    />
  )

  return (
    <NodeViewWrapper>
      <div
        className={`my-4 rounded-xl border overflow-hidden transition ${
          selected ? 'border-accent/50 ring-1 ring-accent/20' : 'border-border'
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-2 px-3 py-2 bg-surface border-b border-border">
          {/* Drag handle */}
          <div
            data-drag-handle
            className="cursor-grab active:cursor-grabbing text-subtle hover:text-muted transition shrink-0"
            title="Arrastrar bloque"
          >
            <GripVertical size={15} />
          </div>

          {/* Title */}
          <div className="flex items-center gap-1.5 shrink-0">
            <GitBranch size={13} className="text-accent" />
            <span className="text-xs font-semibold text-muted">Mermaid Diagram</span>
          </div>

          <div className="flex-1" />

          {/* Tabs */}
          <div className="flex items-center gap-0.5 bg-elevated rounded-lg p-0.5">
            {([
              { key: 'code' as ViewMode, label: 'Código' },
              { key: 'split' as ViewMode, label: 'Split' },
              { key: 'preview' as ViewMode, label: 'Vista previa' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition cursor-pointer ${
                  mode === key
                    ? 'bg-panel text-foreground shadow-sm'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Save / discard when dirty */}
          {isDirty && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleDiscard}
                title="Descartar cambios"
                className="p-1.5 text-muted hover:text-foreground rounded hover:bg-elevated transition cursor-pointer"
              >
                <X size={13} />
              </button>
              <button
                type="button"
                onClick={handleSave}
                title="Guardar"
                className="p-1.5 text-accent hover:text-accent-light rounded hover:bg-accent/10 transition cursor-pointer"
              >
                <Check size={13} />
              </button>
            </div>
          )}

          {/* Copied feedback */}
          {copied && (
            <span className="text-[11px] text-accent shrink-0">¡Copiado!</span>
          )}

          {/* "..." menu */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              title="Más opciones"
              className={`p-1.5 rounded transition cursor-pointer ${
                showMenu
                  ? 'bg-elevated text-foreground'
                  : 'text-muted hover:text-foreground hover:bg-elevated'
              }`}
            >
              <MoreHorizontal size={14} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-8 z-30 bg-panel border border-border rounded-xl shadow-2xl w-44 py-1 overflow-hidden">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
                >
                  <ClipboardCopy size={13} />
                  Copiar código
                </button>
                <div className="my-1 border-t border-border" />
                <button
                  type="button"
                  onClick={() => { deleteNode(); setShowMenu(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-danger hover:bg-danger/10 transition cursor-pointer"
                >
                  <Trash2 size={13} />
                  Eliminar diagrama
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Contenido según modo ── */}
        {mode === 'code' && <CodeEditor />}
        {mode === 'preview' && <DiagramView />}
        {mode === 'split' && (
          <div className="flex divide-x divide-border">
            <div className="w-1/2">
              <CodeEditor />
            </div>
            <div className="w-1/2">
              <DiagramView />
            </div>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}
