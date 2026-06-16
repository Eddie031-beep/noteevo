'use client'

import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { Link } from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'

export default function NoteLinkComponent({ node }: NodeViewProps) {
  const { notes, setSelectedNote } = useNoteStore()
  const { noteId, title } = node.attrs as { noteId: string; title: string }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const note = notes.find((n) => n.id === noteId)
    if (note) setSelectedNote(note)
  }

  return (
    <NodeViewWrapper as="span" className="inline-block">
      <span
        contentEditable={false}
        onClick={handleClick}
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-accent/15 text-accent border border-accent/30 cursor-pointer hover:bg-accent/25 transition-colors mx-0.5 select-none"
      >
        <Link size={10} />
        {title || 'Nota eliminada'}
      </span>
    </NodeViewWrapper>
  )
}
