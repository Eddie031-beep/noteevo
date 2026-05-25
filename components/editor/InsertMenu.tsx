'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Plus, Search, Table, Minus, Quote,
  Heading1, Heading2, Heading3, List, ListOrdered,
  CheckSquare, ImageIcon, Paperclip, Code, GitBranch,
  Calendar, Clock, Type, AlertCircle, ChevronRight, BookOpen,
} from 'lucide-react'
import type { Editor } from '@tiptap/react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface InsertItem {
  icon: React.ReactNode
  label: string
  description?: string
  category: string
  keywords: string[]
  action: () => void
}

interface InsertMenuProps {
  editor: Editor
  imageInputRef: React.RefObject<HTMLInputElement | null>
  noteId: string
}

export default function InsertMenu({ editor, imageInputRef, noteId }: InsertMenuProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  const items: InsertItem[] = [
    // Esenciales
    {
      icon: <Table size={14} />, label: 'Tabla', description: 'Insertar tabla 3×3',
      category: 'Esenciales', keywords: ['tabla', 'table', 'grid'],
      action: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      icon: <Minus size={14} />, label: 'Divisor', description: 'Línea separadora',
      category: 'Esenciales', keywords: ['divisor', 'linea', 'hr', 'separador'],
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      icon: <Quote size={14} />, label: 'Cita',
      category: 'Esenciales', keywords: ['cita', 'quote', 'blockquote'],
      action: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      icon: <AlertCircle size={14} />,
      label: 'Callout',
      description: 'Destacar tips, advertencias o notas',
      category: 'Esenciales',
      keywords: ['callout', 'alerta', 'advertencia', 'tip', 'info', 'nota'],
      action: () =>
        editor.chain().focus().insertContent({
          type: 'callout',
          attrs: { type: 'info' },
          content: [{ type: 'paragraph' }],
        }).run(),
    },
    {
      icon: <ChevronRight size={14} />,
      label: 'Toggle',
      description: 'Bloque colapsable',
      category: 'Esenciales',
      keywords: ['toggle', 'colapsar', 'expandir', 'ocultar', 'colapsable'],
      action: () =>
        editor.chain().focus().insertContent({
          type: 'toggle',
          attrs: { title: 'Toggle', open: true },
          content: [{ type: 'paragraph' }],
        }).run(),
    },
    {
      icon: <BookOpen size={14} />,
      label: 'Tabla de contenidos',
      description: 'Índice auto-generado desde los títulos',
      category: 'Esenciales',
      keywords: ['toc', 'indice', 'tabla', 'contenidos', 'headings', 'titulos'],
      action: () =>
        editor.chain().focus().insertContent({ type: 'tableOfContents' }).run(),
    },
    // Texto
    {
      icon: <Type size={14} />, label: 'Texto normal',
      category: 'Texto', keywords: ['normal', 'párrafo', 'texto', 'p'],
      action: () => editor.chain().focus().setParagraph().run(),
    },
    {
      icon: <Heading1 size={14} />, label: 'Título H1',
      category: 'Texto', keywords: ['h1', 'titulo', 'heading', 'grande'],
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      icon: <Heading2 size={14} />, label: 'Título H2',
      category: 'Texto', keywords: ['h2', 'titulo', 'heading', 'mediano'],
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      icon: <Heading3 size={14} />, label: 'Título H3',
      category: 'Texto', keywords: ['h3', 'titulo', 'heading', 'pequeño'],
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    // Listas
    {
      icon: <List size={14} />, label: 'Lista con viñetas',
      category: 'Listas', keywords: ['lista', 'viñetas', 'bullet'],
      action: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      icon: <ListOrdered size={14} />, label: 'Lista numerada',
      category: 'Listas', keywords: ['lista', 'numerada', 'ordered'],
      action: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      icon: <CheckSquare size={14} />, label: 'Lista de tareas',
      category: 'Listas', keywords: ['checklist', 'tareas', 'checkbox', 'task'],
      action: () => editor.chain().focus().toggleTaskList().run(),
    },
    // Media
    {
      icon: <ImageIcon size={14} />, label: 'Imagen',
      category: 'Media', keywords: ['imagen', 'foto', 'image', 'img'],
      action: () => imageInputRef.current?.click(),
    },
    {
      icon: <Paperclip size={14} />, label: 'Archivo adjunto',
      category: 'Media', keywords: ['archivo', 'adjunto', 'file', 'attachment'],
      action: () => document.getElementById(`attach-input-${noteId}`)?.click(),
    },
    // Avanzado
    {
      icon: <Code size={14} />, label: 'Bloque de código',
      category: 'Avanzado', keywords: ['código', 'code', 'programación', 'codeblock'],
      action: () => editor.chain().focus().toggleCodeBlock().run(),
    },
    {
      icon: <GitBranch size={14} />, label: 'Diagrama Mermaid', description: 'Flowcharts y diagramas',
      category: 'Avanzado', keywords: ['mermaid', 'diagrama', 'flowchart', 'grafico'],
      action: () => editor.chain().focus().insertContent({
        type: 'mermaid',
        attrs: { code: 'flowchart TD\n  A[Inicio] --> B{¿Decisión?}\n  B -->|Sí| C[Acción]\n  B -->|No| D[Fin]' },
      }).run(),
    },
    // Utilidades
    {
      icon: <Calendar size={14} />, label: 'Fecha actual',
      category: 'Utilidades', keywords: ['fecha', 'date', 'hoy', 'dia'],
      action: () => editor.chain().focus().insertContent(
        format(new Date(), "d 'de' MMMM yyyy", { locale: es })
      ).run(),
    },
    {
      icon: <Clock size={14} />, label: 'Hora actual',
      category: 'Utilidades', keywords: ['hora', 'time', 'reloj'],
      action: () => editor.chain().focus().insertContent(
        format(new Date(), 'HH:mm')
      ).run(),
    },
  ]

  const q = query.toLowerCase().trim()
  const filtered = q
    ? items.filter((i) =>
        i.label.toLowerCase().includes(q) ||
        i.keywords.some((k) => k.includes(q))
      )
    : items

  const categories = [...new Set(filtered.map((i) => i.category))]

  const run = (action: () => void) => {
    action()
    setOpen(false)
    setQuery('')
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title="Insertar elemento"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-2 py-1.5 rounded text-xs font-medium transition cursor-pointer ${
          open
            ? 'bg-accent/20 text-accent'
            : 'text-muted hover:bg-surface hover:text-foreground'
        }`}
      >
        <Plus size={13} />
        Insertar
      </button>

      {open && (
        <div className="absolute left-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-2xl w-60 overflow-hidden">
          {/* Search */}
          <div className="px-3 py-2 border-b border-border">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-surface rounded-lg">
              <Search size={11} className="text-muted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder-subtle min-w-0"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="max-h-72 overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <p className="text-xs text-muted text-center py-4">Sin resultados</p>
            ) : (
              categories.map((cat) => (
                <div key={cat}>
                  <p className="px-3 pt-2 pb-1 text-[10px] font-semibold text-subtle uppercase tracking-wider">
                    {cat}
                  </p>
                  {filtered
                    .filter((i) => i.category === cat)
                    .map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => run(item.action)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-surface transition cursor-pointer"
                      >
                        <span className="text-muted shrink-0">{item.icon}</span>
                        <div className="min-w-0">
                          <p className="text-xs text-foreground">{item.label}</p>
                          {item.description && (
                            <p className="text-[10px] text-subtle">{item.description}</p>
                          )}
                        </div>
                      </button>
                    ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
