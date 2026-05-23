import { Node, mergeAttributes } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'
import type { NodeViewProps } from '@tiptap/react'

function MermaidView({ node, updateAttributes, selected }: NodeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [editing, setEditing] = useState(false)
  const [code, setCode] = useState(node.attrs.code as string)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (editing) return

    let cancelled = false
    async function render() {
      if (!containerRef.current) return
      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
        })
        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
        const { svg } = await mermaid.render(id, node.attrs.code as string)
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
          setError(null)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Error al renderizar el diagrama')
          if (containerRef.current) containerRef.current.innerHTML = ''
        }
      }
    }

    render()
    return () => { cancelled = true }
  }, [node.attrs.code, editing])

  const handleSave = () => {
    updateAttributes({ code })
    setEditing(false)
  }

  const handleCancel = () => {
    setCode(node.attrs.code as string)
    setEditing(false)
  }

  return (
    <NodeViewWrapper>
      <div
        className={`mermaid-container my-4 rounded-lg border overflow-hidden ${
          selected ? 'border-accent' : 'border-border'
        }`}
        data-type="mermaid"
      >
        {editing ? (
          <div className="p-3 bg-surface">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-40 bg-elevated text-foreground font-mono text-sm p-3 rounded border border-border resize-y outline-none focus:border-accent"
              spellCheck={false}
            />
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleSave}
                className="px-3 py-1 text-xs bg-accent text-white rounded hover:bg-accent-light transition cursor-pointer"
              >
                Aplicar
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1 text-xs bg-elevated text-muted rounded hover:text-foreground transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div
            className="p-4 bg-surface cursor-pointer group relative"
            onClick={() => setEditing(true)}
          >
            <div ref={containerRef} className="flex justify-center" />
            {error && (
              <p className="text-danger text-xs p-2 bg-elevated rounded">{error}</p>
            )}
            <span className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition text-xs text-muted bg-elevated px-2 py-1 rounded">
              Editar
            </span>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}

export const MermaidExtension = Node.create({
  name: 'mermaid',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      code: {
        default: 'flowchart TD\n  A[Inicio] --> B[Fin]',
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="mermaid"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'mermaid' })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MermaidView)
  },
})
