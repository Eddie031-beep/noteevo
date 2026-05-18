'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { useNoteStore } from '@/store/noteStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useSpaceStore } from '@/store/spaceStore'
import { updateNote, toggleFavorite } from '@/lib/supabase/notes'
import { uploadNoteImage } from '@/lib/supabase/storage'
import {
  Star, Bold, Italic,
  Underline as UnderlineIcon,
  Strikethrough, Highlighter,
  AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Heading3,
  List, ListOrdered, CheckSquare,
  Code, FileCode, Minus, ImageIcon, Paperclip, Sparkles,
} from 'lucide-react'
import TagInput from './TagInput'
import AttachmentPanel from './AttachmentPanel'
import AiSummaryPanel from './AiSummaryPanel'

function ToolbarButton({
  onClick, active, title, children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-1.5 rounded transition cursor-pointer ${
        active
          ? 'bg-elevated text-foreground'
          : 'text-muted hover:bg-surface hover:text-foreground'
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-4 bg-border mx-1 shrink-0" />
}

export default function NoteEditor() {
  const { selectedNote, updateNote: updateNoteStore } = useNoteStore()
  const { notebooks } = useNotebookStore()
  const { spaces } = useSpaceStore()
  const titleRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const syncedNoteIdRef = useRef<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [summaryError, setSummaryError] = useState<string | null>(null)

  const isReadOnly = useMemo(() => {
    if (!selectedNote?.notebook_id) return false
    const notebook = notebooks.find((nb) => nb.id === selectedNote.notebook_id)
    if (!notebook?.space_id) return false
    const space = spaces.find((sp) => sp.id === notebook.space_id)
    return space?.user_role === 'viewer'
  }, [selectedNote, notebooks, spaces])

  const editor = useEditor({
    immediatelyRender: false,
    editable: !isReadOnly,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Escribe algo...' }),
      Underline,
      Highlight.configure({ multicolor: false }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Image.configure({ inline: false, allowBase64: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      if (!selectedNote) return
      const content = editor.getJSON()
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(async () => {
        await updateNote(selectedNote.id, { content })
        updateNoteStore(selectedNote.id, { content })
      }, 800)
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[300px]',
      },
    },
  })

  useEffect(() => {
    if (!selectedNote || !editor) return
    if (syncedNoteIdRef.current === selectedNote.id) return
    syncedNoteIdRef.current = selectedNote.id
    if (titleRef.current) titleRef.current.value = selectedNote.title
    editor.commands.setContent(
      Object.keys(selectedNote.content).length > 0 ? selectedNote.content : ''
    )
  }, [selectedNote, editor])

  useEffect(() => {
    editor?.setEditable(!isReadOnly)
  }, [editor, isReadOnly])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedNote) return
    const newTitle = e.target.value
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      await updateNote(selectedNote.id, { title: newTitle })
      updateNoteStore(selectedNote.id, { title: newTitle })
    }, 800)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !editor) return
    try {
      const url = await uploadNoteImage(file)
      editor.chain().focus().setImage({ src: url }).run()
    } catch {
      // error subiendo imagen
    } finally {
      e.target.value = ''
    }
  }

  const handleSummarize = async () => {
    if (!editor) return
    const text = editor.getText().trim()
    if (!text) return
    setShowSummary(true)
    setIsSummarizing(true)
    setSummary(null)
    setSummaryError(null)
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: text }),
      })
      const json = await res.json()
      if (!json.success) {
        setSummaryError(json.error ?? 'Error desconocido')
      } else {
        setSummary(json.data.summary)
      }
    } catch {
      setSummaryError('Error al conectar con el servidor')
    } finally {
      setIsSummarizing(false)
    }
  }

  if (!selectedNote) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-background">
        <div className="w-16 h-16 bg-panel border border-border rounded-2xl flex items-center justify-center">
          <FileCode size={28} className="text-subtle" />
        </div>
        <div className="text-center">
          <p className="text-foreground font-medium">Sin nota seleccionada</p>
          <p className="text-muted text-sm mt-1">
            Elige una nota del panel o crea una nueva
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Toolbar — hidden for viewers */}
      {!isReadOnly && <div className="flex flex-wrap items-center gap-0.5 px-4 py-2 border-b border-border bg-panel shrink-0">
        <ToolbarButton
          title="Negrita"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          active={editor?.isActive('bold')}
        >
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Cursiva"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          active={editor?.isActive('italic')}
        >
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Subrayado"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          active={editor?.isActive('underline')}
        >
          <UnderlineIcon size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Tachado"
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          active={editor?.isActive('strike')}
        >
          <Strikethrough size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Resaltar"
          onClick={() => editor?.chain().focus().toggleHighlight().run()}
          active={editor?.isActive('highlight')}
        >
          <Highlighter size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          title="Alinear izquierda"
          onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          active={editor?.isActive({ textAlign: 'left' })}
        >
          <AlignLeft size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Centrar"
          onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          active={editor?.isActive({ textAlign: 'center' })}
        >
          <AlignCenter size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Alinear derecha"
          onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          active={editor?.isActive({ textAlign: 'right' })}
        >
          <AlignRight size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          title="Título 1"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
          active={editor?.isActive('heading', { level: 1 })}
        >
          <Heading1 size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Título 2"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor?.isActive('heading', { level: 2 })}
        >
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Título 3"
          onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor?.isActive('heading', { level: 3 })}
        >
          <Heading3 size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          title="Lista con viñetas"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          active={editor?.isActive('bulletList')}
        >
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Lista numerada"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          active={editor?.isActive('orderedList')}
        >
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Lista de tareas"
          onClick={() => editor?.chain().focus().toggleTaskList().run()}
          active={editor?.isActive('taskList')}
        >
          <CheckSquare size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          title="Código inline"
          onClick={() => editor?.chain().focus().toggleCode().run()}
          active={editor?.isActive('code')}
        >
          <Code size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Bloque de código"
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          active={editor?.isActive('codeBlock')}
        >
          <FileCode size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          title="Línea horizontal"
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Insertar imagen"
          onClick={() => imageInputRef.current?.click()}
        >
          <ImageIcon size={15} />
        </ToolbarButton>
        <ToolbarButton
          title="Adjuntar archivo"
          onClick={() => {
            document.getElementById(`attach-input-${selectedNote?.id}`)?.click()
          }}
        >
          <Paperclip size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          title="Resumir con IA"
          onClick={handleSummarize}
          active={showSummary}
        >
          <Sparkles size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          title={
            selectedNote.is_favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'
          }
          onClick={async () => {
            const newValue = !selectedNote.is_favorite
            await toggleFavorite(selectedNote.id, newValue)
            updateNoteStore(selectedNote.id, { is_favorite: newValue })
          }}
          active={selectedNote.is_favorite}
        >
          <Star
            size={15}
            className={
              selectedNote.is_favorite ? 'text-yellow-400 fill-yellow-400' : ''
            }
          />
        </ToolbarButton>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          title="Seleccionar imagen"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>}

      {/* Content + optional AI panel */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto px-10 py-8 bg-background">
          <input
            ref={titleRef}
            type="text"
            defaultValue={selectedNote.title}
            onChange={isReadOnly ? undefined : handleTitleChange}
            readOnly={isReadOnly}
            placeholder="Sin título"
            className={`w-full text-3xl font-bold text-foreground border-none outline-none mb-4 bg-transparent placeholder-subtle ${isReadOnly ? 'cursor-default' : ''}`}
            style={{ color: 'var(--color-foreground)' }}
          />
          <TagInput key={selectedNote.id} noteId={selectedNote.id} />
          <EditorContent editor={editor} />
          <AttachmentPanel noteId={selectedNote.id} />
        </div>

        {showSummary && (
          <AiSummaryPanel
            summary={summary}
            isLoading={isSummarizing}
            error={summaryError}
            onClose={() => setShowSummary(false)}
          />
        )}
      </div>
    </div>
  )
}
