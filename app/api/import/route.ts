import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { markdownToTipTap, htmlToTipTap } from '@/lib/utils/tiptap'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB per file

interface ParsedNote {
  title: string
  content: Record<string, unknown>
}

function extractTitleFromMarkdown(md: string): string {
  const m = md.match(/^#\s+(.+)$/m)
  return m ? m[1].trim() : ''
}

function parseEnex(xml: string): ParsedNote[] {
  const notes: ParsedNote[] = []
  const noteRe = /<note>([\s\S]*?)<\/note>/g
  let match: RegExpExecArray | null

  while ((match = noteRe.exec(xml)) !== null) {
    const noteXml = match[1]
    const titleM = noteXml.match(/<title>([\s\S]*?)<\/title>/)
    const cdataM = noteXml.match(/<content><!\[CDATA\[([\s\S]*?)\]\]><\/content>/)

    const rawTitle = titleM ? titleM[1].trim() : 'Sin título'
    const title = rawTitle
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
    const enml = cdataM ? cdataM[1] : ''

    const enNoteM = enml.match(/<en-note[^>]*>([\s\S]*?)<\/en-note>/i)
    const enNoteBody = enNoteM ? enNoteM[1] : enml

    notes.push({ title, content: htmlToTipTap(enNoteBody) })
  }

  return notes
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'No autenticado' }, { status: 401 })

  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Formato de solicitud inválido' }, { status: 400 })
  }

  const notebookId = formData.get('notebookId') as string | null
  const files = formData.getAll('files') as File[]

  if (!notebookId || !files.length) {
    return NextResponse.json({ error: 'Faltan parámetros (notebookId o files)' }, { status: 400 })
  }

  // La libreta destino debe pertenecer al usuario autenticado.
  const { data: ownedNotebook } = await supabase
    .from('notebooks')
    .select('id')
    .eq('id', notebookId)
    .eq('user_id', user.id)
    .maybeSingle()
  if (!ownedNotebook) {
    return NextResponse.json({ error: 'Libreta no válida' }, { status: 403 })
  }

  const created: { id: string; title: string }[] = []
  const failed: string[] = []

  for (const file of files) {
    if (file.size > MAX_FILE_SIZE) {
      failed.push(`${file.name} (demasiado grande)`)
      continue
    }

    const name = file.name.toLowerCase()
    if (!name.endsWith('.md') && !name.endsWith('.enex')) {
      failed.push(`${file.name} (formato no soportado)`)
      continue
    }

    try {
      const text = await file.text()

      if (name.endsWith('.md')) {
        const title = extractTitleFromMarkdown(text) || file.name.replace(/\.md$/i, '')
        const content = markdownToTipTap(text)
        const { data, error } = await supabase.from('notes').insert({
          notebook_id: notebookId,
          user_id: user.id,
          title,
          content,
        }).select('id, title').single()

        if (error) { failed.push(file.name); continue }
        if (data) created.push(data as { id: string; title: string })
      } else {
        const notes = parseEnex(text)
        if (!notes.length) { failed.push(`${file.name} (sin notas)`); continue }

        for (const note of notes) {
          const { data, error } = await supabase.from('notes').insert({
            notebook_id: notebookId,
            user_id: user.id,
            title: note.title,
            content: note.content,
          }).select('id, title').single()

          if (error) { failed.push(note.title); continue }
          if (data) created.push(data as { id: string; title: string })
        }
      }
    } catch {
      failed.push(file.name)
    }
  }

  return NextResponse.json({ imported: created.length, notes: created, failed })
}
