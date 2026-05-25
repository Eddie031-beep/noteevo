'use client'

import { useEffect, useRef, useState } from 'react'
import type { Editor } from '@tiptap/react'
import { Trash2, Plus, Minus } from 'lucide-react'

interface Props {
  editor: Editor
}

export default function TableToolbar({ editor }: Props) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const update = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const inTable = editor.isActive('table')
        if (!inTable) {
          setVisible(false)
          return
        }
        try {
          const { from } = editor.state.selection
          const domPos = editor.view.domAtPos(from)
          let node: HTMLElement | null = domPos.node as HTMLElement
          while (node && node.nodeName !== 'TABLE') {
            node = node.parentElement
          }
          if (!node) { setVisible(false); return }
          const rect = node.getBoundingClientRect()
          setPosition({ top: rect.top - 44, left: rect.left })
          setVisible(true)
        } catch {
          setVisible(false)
        }
      })
    }

    editor.on('selectionUpdate', update)
    editor.on('transaction', update)
    return () => {
      editor.off('selectionUpdate', update)
      editor.off('transaction', update)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [editor])

  if (!visible) return null

  return (
    <div
      style={{ position: 'fixed', top: position.top, left: position.left, zIndex: 50 }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="flex items-center gap-0.5 bg-panel border border-border rounded-xl px-2 py-1.5 shadow-2xl">
        {/* Rows */}
        <span className="text-[10px] text-subtle uppercase tracking-wider px-1">Fila</span>
        <button
          type="button"
          title="Insertar fila encima"
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Plus size={12} />
        </button>
        <button
          type="button"
          title="Insertar fila debajo"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Plus size={12} className="rotate-180" />
        </button>
        <button
          type="button"
          title="Eliminar fila"
          onClick={() => editor.chain().focus().deleteRow().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Minus size={12} />
        </button>

        <div className="w-px h-4 bg-border/60 mx-1" />

        {/* Columns */}
        <span className="text-[10px] text-subtle uppercase tracking-wider px-1">Col</span>
        <button
          type="button"
          title="Insertar columna a la izquierda"
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Plus size={12} />
        </button>
        <button
          type="button"
          title="Insertar columna a la derecha"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Plus size={12} />
        </button>
        <button
          type="button"
          title="Eliminar columna"
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Minus size={12} />
        </button>

        <div className="w-px h-4 bg-border/60 mx-1" />

        {/* Delete whole table */}
        <button
          type="button"
          title="Eliminar tabla"
          onClick={() => editor.chain().focus().deleteTable().run()}
          className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition text-xs cursor-pointer"
        >
          <Trash2 size={12} />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  )
}
