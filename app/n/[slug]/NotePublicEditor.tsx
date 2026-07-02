'use client'

import { useEffect, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { Check, Loader2, CircleAlert, PenLine } from 'lucide-react'
import { sharedEditorExtensions } from '@/lib/editor/extensions'

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
    extensions: sharedEditorExtensions,
    content: '',
    editorProps: {
      attributes: { class: 'focus:outline-none min-h-[300px]' },
    },
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
    const t = setTimeout(() => {
      // El editor puede destruirse entre el mount y este timeout (doble montaje
      // de React 19 en dev). Sin esta guarda, setContent corre sobre una view ya
      // destruida → "Cannot read properties of undefined (reading 'dispatchTransaction')".
      if (editor.isDestroyed) return
      editor.commands.setContent(hasContent ? content : '')
      // Marca la inicialización tras cargar el contenido para no disparar
      // autosave con el setContent inicial.
      initializedRef.current = true
    }, 0)
    return () => clearTimeout(t)
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
      {editor && <EditorContent editor={editor} />}
    </div>
  )
}
