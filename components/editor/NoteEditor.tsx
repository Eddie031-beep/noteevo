'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import { sharedEditorExtensions } from '@/lib/editor/extensions'
import { ActiveNodeHighlight } from '@/lib/editor/active-node-extension'
import { useNoteStore } from '@/store/noteStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useSpaceStore } from '@/store/spaceStore'
import { useUIStore } from '@/store/uiStore'
import { updateNote } from '@/lib/supabase/notes'
import { uploadNoteImage } from '@/lib/supabase/storage'
import {
  Bold, Italic, Underline as UnderlineIcon,
  Strikethrough, Highlighter,
  AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Heading3,
  List, ListOrdered, CheckSquare,
  Code, FileCode,
  Superscript as SuperscriptIcon, Subscript as SubscriptIcon, Eraser,
  PanelLeftOpen, PanelLeftClose,
} from 'lucide-react'
import TagInput from './TagInput'
import ToolbarTooltip from './ToolbarTooltip'
import AttachmentPanel from './AttachmentPanel'
import AiSummaryPanel from './AiSummaryPanel'
import AiChatPanel from './AiChatPanel'
import AiSmartTags from './AiSmartTags'
import AiImproveToolbar from './AiImproveToolbar'
import ExportModal from './ExportModal'
import ShareControls from './ShareControls'
import VersionHistoryPanel from './VersionHistoryPanel'
import SaveAsTemplateModal from '@/components/templates/SaveAsTemplateModal'
import MoveNoteModal from '@/components/notes/MoveNoteModal'
import InsertMenu from './InsertMenu'
import { FontFamilySelector, FontSizeSelector, TextColorPicker } from './FormatDropdowns'
import AiMenuExpanded from './AiMenuExpanded'
import NoteActionsMenu from './NoteActionsMenu'
import TableToolbar from './TableToolbar'
import { saveVersion, getVersionCount } from '@/lib/supabase/versions'
import type { NoteVersion } from '@/types'

function ToolbarButton({
  onClick, active, title, shortcut, children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  shortcut?: string
  children: React.ReactNode
}) {
  return (
    <ToolbarTooltip label={title} shortcut={shortcut}>
      <button
        type="button"
        aria-label={title}
        onClick={onClick}
        className={`p-1.5 rounded transition cursor-pointer ${
          active
            ? 'bg-elevated text-foreground'
            : 'text-muted hover:bg-surface hover:text-foreground'
        }`}
      >
        {children}
      </button>
    </ToolbarTooltip>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-border mx-1 shrink-0" />
}

function countWords(text: string): number {
  const trimmed = text.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

export default function NoteEditor() {
  const { selectedNote, updateNote: updateNoteStore } = useNoteStore()
  const { notebooks } = useNotebookStore()
  const { spaces } = useSpaceStore()
  const { isFocusMode, currentView, isNoteListCollapsed, setNoteListCollapsed, isTypewriterMode, toggleTypewriterMode } = useUIStore()
  const titleRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)
  const syncedNoteIdRef = useRef<string | null>(null)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [summaryError, setSummaryError] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)
  const [showSmartTags, setShowSmartTags] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [showVersions, setShowVersions] = useState(false)
  const [showSaveTemplate, setShowSaveTemplate] = useState(false)
  const [showMove, setShowMove] = useState(false)
  const [tagInputKey, setTagInputKey] = useState(0)
  const [wordCount, setWordCount] = useState(0)
  const [improveToolbar, setImproveToolbar] = useState<{
    position: { top: number; left: number }
    selectedText: string
  } | null>(null)

  const readingMinutes = Math.max(1, Math.ceil(wordCount / 238))

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
      ...sharedEditorExtensions,
      ActiveNodeHighlight,
      Placeholder.configure({ placeholder: 'Escribe algo...' }),
    ],
    content: '',
    onSelectionUpdate: ({ editor }) => {
      if (editor.state.selection.empty) setImproveToolbar(null)
    },
    onUpdate: ({ editor }) => {
      setWordCount(countWords(editor.getText()))
      if (!syncedNoteIdRef.current) return
      const noteId = syncedNoteIdRef.current
      const content = editor.getJSON()
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        updateNote(noteId, { content })
          .then(() => updateNoteStore(noteId, { content }))
          .catch(() => {})
      }, 800)
    },
    editorProps: {
      attributes: { class: 'focus:outline-none min-h-[300px]' },
    },
  })

  useEffect(() => {
    if (!selectedNote || !editor) return
    if (syncedNoteIdRef.current === selectedNote.id) return
    syncedNoteIdRef.current = selectedNote.id
    if (titleRef.current) titleRef.current.value = selectedNote.title
    setTimeout(() => {
      editor.commands.setContent(
        Object.keys(selectedNote.content).length > 0 ? selectedNote.content : ''
      )
      setWordCount(countWords(editor.getText()))
    }, 0)
  }, [selectedNote, editor])

  useEffect(() => {
    editor?.setEditable(!isReadOnly)
  }, [editor, isReadOnly])

  // Typewriter mode: el resaltado del párrafo activo lo aplica la extensión
  // ActiveNodeHighlight (Decoration de ProseMirror, sobrevive a los redibujados).
  // Este efecto solo mantiene el cursor centrado mientras el modo está activo.
  useEffect(() => {
    if (!editor || !isTypewriterMode) return
    const pm = editor.view.dom as HTMLElement
    const centerActive = () => {
      const el = pm.querySelector('.is-active-node')
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
    centerActive()
    editor.on('selectionUpdate', centerActive)
    return () => {
      editor.off('selectionUpdate', centerActive)
    }
  }, [editor, isTypewriterMode])

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
      // error silencioso
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

  const handleEditorMouseUp = () => {
    if (isReadOnly || !editor) return
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed || !selection.toString().trim()) return
    const text = selection.toString().trim()
    if (text.length < 10) return
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    setImproveToolbar({
      position: {
        top: rect.bottom + window.scrollY + 8,
        left: Math.max(8, rect.left + window.scrollX),
      },
      selectedText: text,
    })
  }

  const handleAcceptImprovement = (improvedText: string) => {
    if (!editor) return
    const { from, to } = editor.state.selection
    editor.chain().focus().deleteRange({ from, to }).insertContentAt(from, improvedText).run()
    setImproveToolbar(null)
  }

  if (!selectedNote) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-4 bg-background">
        <div className="w-16 h-16 bg-panel border border-border rounded-2xl flex items-center justify-center">
          <FileCode size={28} className="text-subtle" />
        </div>
        <div className="text-center">
          <p className="text-foreground font-medium">Sin nota seleccionada</p>
          <p className="text-muted text-sm mt-1">Elige una nota del panel o crea una nueva</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* ── Toolbar ── */}
      {/* En focus mode la toolbar se oculta y se revela al pasar el cursor por
          la franja superior. En móvil hace scroll horizontal en vez de wrap. */}
      {!isReadOnly && (
        <div className={isFocusMode ? 'group/tb absolute inset-x-0 top-0 z-30' : 'shrink-0'}>
          {isFocusMode && <div className="h-2 w-full" aria-hidden />}
          <div
            className={`flex flex-nowrap sm:flex-wrap items-center gap-0.5 px-3 py-1.5 border-b border-border bg-panel overflow-x-auto sm:overflow-x-visible ${
              isFocusMode
                ? 'shadow-xl opacity-0 -translate-y-full pointer-events-none transition-all duration-200 group-hover/tb:opacity-100 group-hover/tb:translate-y-0 group-hover/tb:pointer-events-auto'
                : ''
            }`}
          >

          {/* Toggle panel de notas */}
          {!isFocusMode && (currentView === 'notebooks' || currentView === 'notebooks-view' || currentView === 'all-notes' || currentView === 'favorites' || currentView === 'trash' || currentView === 'search') && (
            <>
              <ToolbarButton
                title={isNoteListCollapsed ? 'Mostrar panel de notas' : 'Ocultar panel de notas'}
                onClick={() => setNoteListCollapsed(!isNoteListCollapsed)}
              >
                {isNoteListCollapsed
                  ? <PanelLeftOpen size={14} />
                  : <PanelLeftClose size={14} />
                }
              </ToolbarButton>
              <Divider />
            </>
          )}

          {/* Formato básico */}
          <ToolbarButton title="Negrita" shortcut="Ctrl+B" onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')}>
            <Bold size={14} />
          </ToolbarButton>
          <ToolbarButton title="Cursiva" shortcut="Ctrl+I" onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')}>
            <Italic size={14} />
          </ToolbarButton>
          <ToolbarButton title="Subrayado" shortcut="Ctrl+U" onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive('underline')}>
            <UnderlineIcon size={14} />
          </ToolbarButton>
          <ToolbarButton title="Tachado" shortcut="Ctrl+Shift+S" onClick={() => editor?.chain().focus().toggleStrike().run()} active={editor?.isActive('strike')}>
            <Strikethrough size={14} />
          </ToolbarButton>
          <ToolbarButton title="Superíndice" onClick={() => editor?.chain().focus().toggleSuperscript().run()} active={editor?.isActive('superscript')}>
            <SuperscriptIcon size={14} />
          </ToolbarButton>
          <ToolbarButton title="Subíndice" onClick={() => editor?.chain().focus().toggleSubscript().run()} active={editor?.isActive('subscript')}>
            <SubscriptIcon size={14} />
          </ToolbarButton>
          <ToolbarButton title="Resaltar" shortcut="Ctrl+Shift+H" onClick={() => editor?.chain().focus().toggleHighlight().run()} active={editor?.isActive('highlight')}>
            <Highlighter size={14} />
          </ToolbarButton>

          <Divider />

          {/* Formato avanzado */}
          {editor && <FontFamilySelector editor={editor} />}
          {editor && <FontSizeSelector editor={editor} />}
          {editor && <TextColorPicker editor={editor} />}

          <Divider />

          {/* Alineación */}
          <ToolbarButton title="Izquierda" shortcut="Ctrl+Shift+L" onClick={() => editor?.chain().focus().setTextAlign('left').run()} active={editor?.isActive({ textAlign: 'left' })}>
            <AlignLeft size={14} />
          </ToolbarButton>
          <ToolbarButton title="Centro" shortcut="Ctrl+Shift+E" onClick={() => editor?.chain().focus().setTextAlign('center').run()} active={editor?.isActive({ textAlign: 'center' })}>
            <AlignCenter size={14} />
          </ToolbarButton>
          <ToolbarButton title="Derecha" shortcut="Ctrl+Shift+R" onClick={() => editor?.chain().focus().setTextAlign('right').run()} active={editor?.isActive({ textAlign: 'right' })}>
            <AlignRight size={14} />
          </ToolbarButton>

          <Divider />

          {/* Headings */}
          <ToolbarButton title="Título 1" shortcut="Ctrl+Alt+1" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()} active={editor?.isActive('heading', { level: 1 })}>
            <Heading1 size={14} />
          </ToolbarButton>
          <ToolbarButton title="Título 2" shortcut="Ctrl+Alt+2" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })}>
            <Heading2 size={14} />
          </ToolbarButton>
          <ToolbarButton title="Título 3" shortcut="Ctrl+Alt+3" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })}>
            <Heading3 size={14} />
          </ToolbarButton>

          <Divider />

          {/* Listas */}
          <ToolbarButton title="Lista" shortcut="Ctrl+Shift+8" onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')}>
            <List size={14} />
          </ToolbarButton>
          <ToolbarButton title="Lista numerada" shortcut="Ctrl+Shift+7" onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')}>
            <ListOrdered size={14} />
          </ToolbarButton>
          <ToolbarButton title="Checklist" shortcut="Ctrl+Shift+9" onClick={() => editor?.chain().focus().toggleTaskList().run()} active={editor?.isActive('taskList')}>
            <CheckSquare size={14} />
          </ToolbarButton>

          <Divider />

          {/* Código */}
          <ToolbarButton title="Código inline" shortcut="Ctrl+E" onClick={() => editor?.chain().focus().toggleCode().run()} active={editor?.isActive('code')}>
            <Code size={14} />
          </ToolbarButton>
          <ToolbarButton title="Bloque de código" shortcut="Ctrl+Alt+C" onClick={() => editor?.chain().focus().toggleCodeBlock().run()} active={editor?.isActive('codeBlock')}>
            <FileCode size={14} />
          </ToolbarButton>

          <Divider />

          <ToolbarButton title="Eliminar formato" onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()}>
            <Eraser size={14} />
          </ToolbarButton>

          <Divider />

          {/* Insert Menu */}
          {editor && (
            <InsertMenu
              editor={editor}
              imageInputRef={imageInputRef}
              noteId={selectedNote.id}
            />
          )}

          <Divider />

          {/* AI Menu */}
          {editor && (
            <AiMenuExpanded
              editor={editor}
              noteContent={editor.getText()}
              onSummarize={handleSummarize}
              onChat={() => setShowChat((v) => !v)}
              onSmartTags={() => setShowSmartTags((v) => !v)}
            />
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Share controls */}
          {selectedNote && (
            <ShareControls noteId={selectedNote.id} noteTitle={selectedNote.title} />
          )}

          {/* Note Actions ⋯ */}
          {selectedNote && (
            <NoteActionsMenu
              note={selectedNote}
              onExport={() => setShowExport(true)}
              onVersions={() => setShowVersions((v) => !v)}
              onSaveTemplate={() => setShowSaveTemplate(true)}
              onMove={() => setShowMove(true)}
            />
          )}

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            title="Seleccionar imagen"
            className="hidden"
            onChange={handleImageUpload}
          />
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div className="flex-1 flex overflow-hidden relative">
        <div
          className={`flex-1 overflow-y-auto px-6 sm:px-10 py-12 bg-background${isTypewriterMode ? ' typewriter-mode' : ''}`}
          onMouseUp={handleEditorMouseUp}
        >
          <div className={`mx-auto w-full transition-[max-width] duration-300 ${isFocusMode ? 'max-w-2xl' : 'max-w-3xl'}`}>
            <input
              ref={titleRef}
              type="text"
              data-testid="note-title-input"
              defaultValue={selectedNote.title}
              onChange={isReadOnly ? undefined : handleTitleChange}
              readOnly={isReadOnly}
              placeholder="Sin título"
              className={`w-full text-4xl font-bold text-foreground border-none outline-none mb-3 bg-transparent placeholder-subtle leading-tight ${isReadOnly ? 'cursor-default' : ''}`}
              style={{ color: 'var(--color-foreground)' }}
            />
            <TagInput key={`${selectedNote.id}-${tagInputKey}`} noteId={selectedNote.id} />
            {/* Separador sutil entre título/tags y el cuerpo */}
            <div className="border-b border-border/60 my-5" />
            {editor && <TableToolbar editor={editor} />}
            <EditorContent editor={editor} />
            <AttachmentPanel noteId={selectedNote.id} />
          </div>
        </div>

        {/* Side panels */}
        {showSummary && (
          <AiSummaryPanel
            summary={summary}
            isLoading={isSummarizing}
            error={summaryError}
            onClose={() => setShowSummary(false)}
          />
        )}
        {showChat && editor && (
          <AiChatPanel
            noteContent={editor.getText()}
            onClose={() => setShowChat(false)}
          />
        )}
        {showVersions && selectedNote && (
          <VersionHistoryPanel
            noteId={selectedNote.id}
            onSave={async () => {
              if (!editor || !selectedNote) return
              const count = await getVersionCount(selectedNote.id)
              await saveVersion(
                selectedNote.id,
                titleRef.current?.value ?? selectedNote.title,
                editor.getJSON(),
                count + 1
              )
            }}
            onRestore={(version: NoteVersion) => {
              editor?.commands.setContent(version.content)
              if (titleRef.current) titleRef.current.value = version.title
              updateNote(selectedNote.id, { title: version.title, content: version.content })
              updateNoteStore(selectedNote.id, { title: version.title, content: version.content })
            }}
            onClose={() => setShowVersions(false)}
          />
        )}

        {showSmartTags && editor && (
          <div className="absolute bottom-6 left-10 z-30">
            <AiSmartTags
              noteId={selectedNote.id}
              noteContent={editor.getText()}
              onTagsAdded={() => setTagInputKey((k) => k + 1)}
              onClose={() => setShowSmartTags(false)}
            />
          </div>
        )}
      </div>

      {/* ── Barra inferior (estado del editor) ── */}
      <div className="shrink-0 flex items-center justify-between gap-4 px-4 py-1.5 border-t border-border bg-panel text-xs text-muted">
        <div className="flex items-center gap-4">
          {wordCount > 0 && (
            <span>
              {wordCount} {wordCount === 1 ? 'palabra' : 'palabras'} · {readingMinutes} min lectura
            </span>
          )}
        </div>
        {!isReadOnly && (
          <button
            type="button"
            onClick={toggleTypewriterMode}
            aria-pressed={isTypewriterMode}
            title="Modo máquina de escribir"
            className={`flex items-center gap-1.5 rounded px-2 py-1 transition cursor-pointer ${
              isTypewriterMode
                ? 'bg-elevated text-accent'
                : 'text-muted hover:bg-surface hover:text-foreground'
            }`}
          >
            <AlignCenter size={13} />
            <span>Máquina de escribir</span>
          </button>
        )}
      </div>

      {/* ── Modals ── */}
      {showExport && selectedNote && (
        <ExportModal
          title={selectedNote.title}
          content={selectedNote.content}
          onClose={() => setShowExport(false)}
        />
      )}
      {showSaveTemplate && selectedNote && editor && (
        <SaveAsTemplateModal
          content={editor.getJSON()}
          defaultName={selectedNote.title !== 'Sin título' ? selectedNote.title : ''}
          onSaved={() => {}}
          onClose={() => setShowSaveTemplate(false)}
        />
      )}
      {showMove && selectedNote && (
        <MoveNoteModal
          note={selectedNote}
          onMoved={() => {}}
          onClose={() => setShowMove(false)}
        />
      )}

      {/* ── Floating AI improve toolbar ── */}
      {improveToolbar && (
        <AiImproveToolbar
          position={improveToolbar.position}
          selectedText={improveToolbar.selectedText}
          onAccept={handleAcceptImprovement}
          onReject={() => setImproveToolbar(null)}
        />
      )}
    </div>
  )
}
