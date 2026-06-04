'use client'

import { useEffect, useRef, useState } from 'react'
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
import { Check, Loader2, CircleAlert, PenLine } from 'lucide-react'
import { MermaidExtension } from '@/lib/editor/mermaid-extension'

interface NotePublicEditorProps {
  content: Record<string, unknown>
  editable: boolean
  slug: string
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

const SAVE_DEBOUNCE_MS = 1500

export default function NotePublicEditor({ content, editable, slug }: NotePublicEditorProps) {
  const [status, setStatus] = useState<SaveStatus>('idle')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const initializedRef = useRef(false)

  const editor = useEditor({
    immediatelyRender: false,
    editable,
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
      MermaidExtension,
    ],
    editorProps: editable
      ? { attributes: { class: 'focus:outline-none min-h-[300px]' } }
      : undefined,
    onUpdate: ({ editor }) => {
      if (!editable || !initializedRef.current) return
      const json = editor.getJSON()
      setStatus('saving')
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(async () => {
        try {
          const res = await fetch('/api/shared/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, content: json }),
          })
          setStatus(res.ok ? 'saved' : 'error')
        } catch {
          setStatus('error')
        }
      }, SAVE_DEBOUNCE_MS)
    },
  })

  useEffect(() => {
    if (!editor) return
    const hasContent = Object.keys(content).length > 0
    setTimeout(() => {
      editor.commands.setContent(hasContent ? content : '')
      // Marca la inicialización tras cargar el contenido para no disparar
      // autosave con el setContent inicial.
      initializedRef.current = true
    }, 0)
  }, [editor, content])

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <div className="relative">
      {editable && (
        <div className="sticky top-0 z-10 -mt-2 mb-4 flex items-center justify-between gap-2 bg-background/80 backdrop-blur py-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-accent">
            <PenLine size={13} />
            Edición colaborativa
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
            {status === 'saving' && (<><Loader2 size={13} className="animate-spin" /> Guardando…</>)}
            {status === 'saved' && (<><Check size={13} className="text-green-500" /> Guardado</>)}
            {status === 'error' && (<><CircleAlert size={13} className="text-red-400" /> Error al guardar</>)}
          </span>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}
