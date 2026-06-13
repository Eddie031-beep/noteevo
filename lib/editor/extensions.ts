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
import type { Extensions } from '@tiptap/react'
import { MermaidExtension } from '@/lib/editor/mermaid-extension'
import { CalloutExtension } from '@/lib/editor/callout-extension'
import { ToggleExtension } from '@/lib/editor/toggle-extension'
import { TocExtension } from '@/lib/editor/toc-extension'
import { FontSize } from '@/lib/editor/font-size'

/**
 * Extensiones TipTap compartidas entre el editor principal (NoteEditor) y los
 * renderizadores de solo lectura (p. ej. el preview de plantillas). Una única
 * fuente garantiza que los bloques custom (Callout/Toggle/TOC) se rendericen
 * igual en todas partes. El Placeholder se configura aparte porque depende del
 * contexto de cada editor.
 */
export const sharedEditorExtensions: Extensions = [
  StarterKit,
  Underline,
  Highlight.configure({ multicolor: false }),
  TaskList,
  TaskItem.configure({ nested: true }),
  Image.configure({ inline: false, allowBase64: false }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  TextStyle,
  Color,
  FontFamily,
  FontSize,
  Table.configure({ resizable: false }),
  TableRow,
  TableHeader,
  TableCell,
  MermaidExtension,
  CalloutExtension,
  ToggleExtension,
  TocExtension,
  Superscript,
  Subscript,
]
