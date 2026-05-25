'use client'

import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { ChevronRight, ChevronDown } from 'lucide-react'

export default function ToggleComponent({
  node,
  updateAttributes,
  selected,
}: NodeViewProps) {
  const title = (node.attrs.title as string) || 'Toggle'
  const isOpen = node.attrs.open !== false

  return (
    <NodeViewWrapper>
      <div className={`my-2 rounded-lg transition ${selected ? 'ring-1 ring-accent/30' : ''}`}>
        {/* Header row */}
        <div className="flex items-center gap-2 py-1 group">
          <button
            type="button"
            title={isOpen ? 'Colapsar' : 'Expandir'}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => updateAttributes({ open: !isOpen })}
            className="p-0.5 text-muted hover:text-foreground transition cursor-pointer shrink-0 rounded"
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          <input
            type="text"
            value={title}
            onChange={(e) => updateAttributes({ title: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Escribe un título..."
            className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none min-w-0"
            style={{ color: 'var(--color-foreground)' }}
          />
        </div>

        {/* Collapsible body — always in DOM so TipTap can manage content */}
        <div
          className={`ml-6 pl-4 border-l-2 border-border overflow-hidden transition-all duration-150 ${
            isOpen ? 'min-h-[1.5rem] opacity-100' : 'h-0 opacity-0 pointer-events-none'
          }`}
        >
          <NodeViewContent className="py-1" />
        </div>
      </div>
    </NodeViewWrapper>
  )
}
