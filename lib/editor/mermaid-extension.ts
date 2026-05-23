import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import MermaidComponent from '@/components/editor/MermaidComponent'

export const MermaidExtension = Node.create({
  name: 'mermaid',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      code: {
        default: 'flowchart TD\n  A[Inicio] --> B{¿Decisión?}\n  B -->|Sí| C[Acción A]\n  B -->|No| D[Acción B]\n  C --> E[Fin]\n  D --> E',
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="mermaid"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'mermaid' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MermaidComponent)
  },
})
