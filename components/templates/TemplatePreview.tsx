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
    content: '',
    editorProps: {
      attributes: { class: 'focus:outline-none' },
    },
  })

  // setContent en setTimeout (evita flushSync con React 19 + TipTap v3), con
  // cleanup + guarda isDestroyed para el doble montaje de React 19 en dev.
  useEffect(() => {
    if (!editor) return
    const hasContent = Object.keys(content).length > 0
    const t = setTimeout(() => {
      if (editor.isDestroyed) return
      editor.commands.setContent(hasContent ? content : '')
    }, 0)
    return () => clearTimeout(t)
  }, [editor, content])

  // No montar EditorContent con editor=null: en TipTap v3 deja la vista sin
  // montar y el preview sale en blanco.
  return editor ? <EditorContent editor={editor} /> : null
}
