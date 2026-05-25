'use client'

import { useEffect, useState } from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { BookOpen, Trash2 } from 'lucide-react'

interface TocItem {
  level: number
  text: string
}

export default function TocComponent({ editor, deleteNode, selected }: NodeViewProps) {
  const [items, setItems] = useState<TocItem[]>([])

  useEffect(() => {
    if (!editor) return

    const build = () => {
      const headings: TocItem[] = []
      editor.state.doc.descendants((node) => {
        if (node.type.name === 'heading') {
          headings.push({
            level: node.attrs.level as number,
            text: node.textContent,
          })
        }
      })
      setItems(headings)
    }

    build()
    editor.on('update', build)
    return () => {
      editor.off('update', build)
    }
  }, [editor])

  return (
    <NodeViewWrapper>
      <div
        className={`my-4 rounded-xl border border-border bg-panel overflow-hidden ${
          selected ? 'ring-1 ring-accent/30' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface/40">
          <div className="flex items-center gap-2">
            <BookOpen size={13} className="text-muted" />
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Tabla de contenidos
            </span>
          </div>
          <button
            type="button"
            title="Eliminar tabla de contenidos"
            onMouseDown={(e) => e.preventDefault()}
            onClick={deleteNode}
            className="p-1 text-subtle hover:text-danger transition cursor-pointer rounded"
          >
            <Trash2 size={13} />
          </button>
        </div>

        {/* Items */}
        <div className="px-4 py-3">
          {items.length === 0 ? (
            <p className="text-xs text-subtle italic">
              Sin títulos aún. Añade encabezados (H1, H2, H3) para generar el índice.
            </p>
          ) : (
            <ul className="space-y-1">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted hover:text-foreground transition"
                  style={{ paddingLeft: `${(item.level - 1) * 14}px` }}
                >
                  <span className="text-subtle text-xs mt-0.5 shrink-0 leading-none">
                    {item.level === 1 ? '—' : item.level === 2 ? '·' : '›'}
                  </span>
                  <span className={item.level === 1 ? 'text-foreground font-medium' : ''}>
                    {item.text || '(sin texto)'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  )
}
