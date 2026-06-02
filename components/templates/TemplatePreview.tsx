'use client'

import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import { sharedEditorExtensions } from '@/lib/editor/extensions'

interface TemplatePreviewProps {
  content: Record<string, unknown>
}

/**
 * Render de solo lectura del contenido de una plantilla. Usa las mismas
 * extensiones que el editor principal, de modo que los bloques custom
 * (Callout / Toggle / TOC) se vean tal cual aparecerán al usar la plantilla,
 * en vez de un volcado de texto plano.
 */
export default function TemplatePreview({ content }: TemplatePreviewProps) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: sharedEditorExtensions,
    editorProps: {
      attributes: { class: 'focus:outline-none' },
    },
  })

  // Mismo patrón que NoteEditor: setContent en setTimeout evita el error de
  // flushSync con React 19 + TipTap v3.
  useEffect(() => {
    if (!editor) return
    const hasContent = Object.keys(content).length > 0
    setTimeout(() => {
      editor.commands.setContent(hasContent ? content : '')
    }, 0)
  }, [editor, content])

  return <EditorContent editor={editor} />
}
