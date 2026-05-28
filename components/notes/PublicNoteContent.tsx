'use client'

import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { FontFamily } from '@tiptap/extension-font-family'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'

interface PublicNoteContentProps {
  content: Record<string, unknown>
}

export default function PublicNoteContent({ content }: PublicNoteContentProps) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      TaskList,
      TaskItem,
      Image.configure({ inline: false, allowBase64: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Color,
      FontFamily,
      Table,
      TableRow,
      TableCell,
      TableHeader,
      Superscript,
      Subscript,
    ],
  })

  // Mismo patrón que NoteEditor: setContent en useEffect + setTimeout
  // evita el error de flushSync con React 19 + TipTap v3
  useEffect(() => {
    if (!editor) return
    const hasContent = Object.keys(content).length > 0
    setTimeout(() => {
      editor.commands.setContent(hasContent ? content : '')
    }, 0)
  }, [editor, content])

  return <EditorContent editor={editor} />
}
