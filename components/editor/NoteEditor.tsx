'use client'

import { useEffect, useRef } from 'react'
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
import { updateNote, toggleFavorite } from '@/lib/supabase/notes'
import { uploadNoteImage } from '@/lib/supabase/storage'
import {
  Star, Bold, Italic,
  Underline as UnderlineIcon,
  Strikethrough, Highlighter,
  AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Heading3,
  List, ListOrdered, CheckSquare,
  Code, FileCode, Minus, ImageIcon,
} from 'lucide-react'
import TagInput from './TagInput'

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
      className={`p-1.5 rounded transition ${
        active
          ? 'bg-gray-200 text-gray-900'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-gray-200 mx-1 shrink-0" />
}

export default function NoteEditor() {
  const { selectedNote, updateNote: updateNoteStore } = useNoteStore()
  const titleRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const syncedNoteIdRef = useRef<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
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
        class:
          'prose prose-sm max-w-none focus:outline-none min-h-[400px] text-gray-800',
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
    } catch (err) {
      console.error('Error subiendo imagen:', err)
    } finally {
      e.target.value = ''
    }
  }

  if (!selectedNote) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-gray-50">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <FileCode size={28} className="text-gray-400" />
        </div>
        <p className="text-gray-400 text-sm">Selecciona o crea una nota</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-4 py-2 border-b border-gray-200 bg-white">
        <ToolbarButton title="Negrita" onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')}>
          <Bold size={15} />
        </ToolbarButton>
        <ToolbarButton title="Cursiva" onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')}>
          <Italic size={15} />
        </ToolbarButton>
        <ToolbarButton title="Subrayado" onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive('underline')}>
          <UnderlineIcon size={15} />
        </ToolbarButton>
        <ToolbarButton title="Tachado" onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive('strike')}>
          <Strikethrough size={15} />
        </ToolbarButton>
        <ToolbarButton title="Resaltar" onClick={() => editor?.chain().focus().toggleHighlight().run()} active={editor?.isActive('highlight')}>
          <Highlighter size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton title="Alinear izquierda" onClick={() => editor?.chain().focus().setTextAlign('left').run()} active={editor?.isActive({ textAlign: 'left' })}>
          <AlignLeft size={15} />
        </ToolbarButton>
        <ToolbarButton title="Centrar" onClick={() => editor?.chain().focus().setTextAlign('center').run()} active={editor?.isActive({ textAlign: 'center' })}>
          <AlignCenter size={15} />
        </ToolbarButton>
        <ToolbarButton title="Alinear derecha" onClick={() => editor?.chain().focus().setTextAlign('right').run()} active={editor?.isActive({ textAlign: 'right' })}>
          <AlignRight size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton title="Título 1" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive('heading', { level: 1 })}>
          <Heading1 size={15} />
        </ToolbarButton>
        <ToolbarButton title="Título 2" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })}>
          <Heading2 size={15} />
        </ToolbarButton>
        <ToolbarButton title="Título 3" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })}>
          <Heading3 size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton title="Lista con viñetas" onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')}>
          <List size={15} />
        </ToolbarButton>
        <ToolbarButton title="Lista numerada" onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')}>
          <ListOrdered size={15} />
        </ToolbarButton>
        <ToolbarButton title="Lista de tareas" onClick={() => editor?.chain().focus().toggleTaskList().run()} active={editor?.isActive('taskList')}>
          <CheckSquare size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton title="Código inline" onClick={() => editor?.chain().focus().toggleCode().run()} active={editor?.isActive('code')}>
          <Code size={15} />
        </ToolbarButton>
        <ToolbarButton title="Bloque de código" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} active={editor?.isActive('codeBlock')}>
          <FileCode size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton title="Línea horizontal" onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
          <Minus size={15} />
        </ToolbarButton>
        <ToolbarButton title="Insertar imagen" onClick={() => imageInputRef.current?.click()}>
          <ImageIcon size={15} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          title={selectedNote.is_favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          onClick={async () => {
            const newValue = !selectedNote.is_favorite
            await toggleFavorite(selectedNote.id, newValue)
            updateNoteStore(selectedNote.id, { is_favorite: newValue })
          }}
          active={selectedNote.is_favorite}
        >
          <Star
            size={15}
            className={selectedNote.is_favorite ? 'text-yellow-500 fill-yellow-500' : ''}
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
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto px-10 py-8 bg-white">
        <input
          ref={titleRef}
          type="text"
          defaultValue={selectedNote.title}
          onChange={handleTitleChange}
          placeholder="Sin título"
          className="w-full text-3xl font-bold text-gray-900 border-none outline-none mb-4 placeholder-gray-300 bg-transparent"
        />
        <TagInput key={selectedNote.id} noteId={selectedNote.id} />
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
