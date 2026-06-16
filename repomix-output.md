This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitattributes
.gitignore
AGENTS.md
app/(auth)/login/page.tsx
app/(auth)/register/page.tsx
app/(dashboard)/dashboard/page.tsx
app/(dashboard)/dashboard/settings/page.tsx
app/(dashboard)/layout.tsx
app/api/ai/assistant/route.ts
app/api/ai/chat/route.ts
app/api/ai/improve/route.ts
app/api/ai/suggest-tags/route.ts
app/api/ai/summarize/route.ts
app/api/ai/transform/route.ts
app/api/import/route.ts
app/api/shared/update/route.ts
app/api/spaces/invite/route.ts
app/api/spaces/lookup-user/route.ts
app/favicon.ico
app/globals.css
app/layout.tsx
app/n/[slug]/NotePublicEditor.tsx
app/n/[slug]/page.tsx
app/page.tsx
CHECKPOINTS.md
CLAUDE.md
components/ai/AiAssistantView.tsx
components/calendar/CalendarView.tsx
components/command/CommandPalette.tsx
components/dashboard/DashboardStats.tsx
components/editor/AiChatPanel.tsx
components/editor/AiImproveToolbar.tsx
components/editor/AiMenuExpanded.tsx
components/editor/AiSmartTags.tsx
components/editor/AiSummaryPanel.tsx
components/editor/AttachmentPanel.tsx
components/editor/BacklinksPanel.tsx
components/editor/CalloutComponent.tsx
components/editor/ExportModal.tsx
components/editor/FormatDropdowns.tsx
components/editor/InsertMenu.tsx
components/editor/MermaidComponent.tsx
components/editor/NoteActionsMenu.tsx
components/editor/NoteCover.tsx
components/editor/NoteEditor.tsx
components/editor/NoteEmojiButton.tsx
components/editor/NoteLinkComponent.tsx
components/editor/NoteLinkMenu.tsx
components/editor/NoteTypographyPopover.tsx
components/editor/ShareControls.tsx
components/editor/TableToolbar.tsx
components/editor/TagInput.tsx
components/editor/TocComponent.tsx
components/editor/ToggleComponent.tsx
components/editor/ToolbarTooltip.tsx
components/editor/VersionHistoryPanel.tsx
components/files/FilesView.tsx
components/KeyboardShortcutsCheatsheet.tsx
components/notes/AdvancedSearchPanel.tsx
components/notes/FavoriteNotes.tsx
components/notes/ImportModal.tsx
components/notes/MoveNoteModal.tsx
components/notes/NoteList.tsx
components/notes/NotePopoverMenu.tsx
components/notes/PublicNoteContent.tsx
components/notes/SearchResults.tsx
components/notes/TrashNotes.tsx
components/onboarding/OnboardingModal.tsx
components/sidebar/NotificationBell.tsx
components/sidebar/Sidebar.tsx
components/spaces/CreateNotebookInSpaceModal.tsx
components/spaces/CreateSpaceModal.tsx
components/spaces/InviteModal.tsx
components/spaces/SharedWithMeView.tsx
components/spaces/SpaceDetailView.tsx
components/spaces/SpacesView.tsx
components/tags/TagsView.tsx
components/tasks/TaskList.tsx
components/tasks/TaskModal.tsx
components/templates/NotebookPicker.tsx
components/templates/SaveAsTemplateModal.tsx
components/templates/TemplatePreview.tsx
components/templates/TemplateSelector.tsx
components/templates/TemplatesView.tsx
components/ThemeApplier.tsx
components/ui/EmptyState.tsx
e2e-walkthrough.mjs
e2e/auth.spec.ts
e2e/files.spec.ts
e2e/fixtures/E2E-sample.txt
e2e/global.setup.ts
e2e/global.teardown.ts
e2e/helpers/actions.ts
e2e/helpers/constants.ts
e2e/helpers/env.ts
e2e/helpers/supabase-admin.ts
e2e/notebooks-notes.spec.ts
e2e/search.spec.ts
e2e/tags.spec.ts
e2e/tasks.spec.ts
e2e/zz-logout.spec.ts
eslint.config.mjs
feature_list.json
hooks/useKeyboardShortcuts.ts
hooks/useNotifications.ts
hooks/useSpaceRole.ts
lib/constants/colors.ts
lib/constants/editor-fonts.ts
lib/editor/active-node-extension.ts
lib/editor/callout-extension.ts
lib/editor/extensions.ts
lib/editor/mermaid-extension.ts
lib/editor/notelink-extension.ts
lib/editor/toc-extension.ts
lib/editor/toggle-extension.ts
lib/supabase/admin.ts
lib/supabase/attachments.ts
lib/supabase/client.ts
lib/supabase/note-links.ts
lib/supabase/notebooks.ts
lib/supabase/notes.ts
lib/supabase/notifications-server.ts
lib/supabase/notifications.ts
lib/supabase/profile.ts
lib/supabase/search.ts
lib/supabase/server.ts
lib/supabase/shared-notes-server.ts
lib/supabase/shared-notes.ts
lib/supabase/spaces.ts
lib/supabase/stats.ts
lib/supabase/storage.ts
lib/supabase/tags.ts
lib/supabase/tasks.ts
lib/supabase/templates.ts
lib/supabase/versions.ts
lib/templates/builtin-templates.ts
lib/utils/space-color.ts
lib/utils/tiptap-to-markdown.ts
lib/utils/tiptap.ts
middleware.ts
next.config.ts
package.json
playwright.config.ts
postcss.config.mjs
public/file.svg
public/globe.svg
public/next.svg
public/vercel.svg
public/window.svg
README.md
store/notebookStore.ts
store/noteStore.ts
store/profileStore.ts
store/spaceStore.ts
store/tagStore.ts
store/taskStore.ts
store/uiStore.ts
supabase/functions/send-reminders/index.ts
supabase/functions/send-reminders/README.md
tests/store/noteStore.test.ts
tests/store/taskStore.test.ts
tests/utils/tiptap.test.ts
TOKEN.md
tsconfig.json
types/index.ts
vitest.config.ts
vitest.setup.ts
```

# Files

## File: .gitattributes
````
# Normalize line endings for cross-platform consistency
* text=auto eol=lf

# Windows scripts keep CRLF
*.bat text eol=crlf
*.cmd text eol=crlf
*.ps1 text eol=crlf

# Binary files — no conversion
*.png binary
*.jpg binary
*.jpeg binary
*.gif binary
*.ico binary
*.svg binary
*.woff binary
*.woff2 binary
*.ttf binary
*.otf binary
*.eot binary
````

## File: app/api/ai/assistant/route.ts
````typescript
import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 20

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const { data: { user }, error: authError } = await client.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]
    const { count } = await client
      .from('ai_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('action', 'ai_assistant')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return new Response(
        JSON.stringify({ error: 'Límite diario alcanzado (20 mensajes/día)' }),
        { status: 429 }
      )
    }

    const { context, messages } = await req.json() as {
      context?: unknown
      messages?: unknown
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Datos inválidos' }), { status: 400 })
    }

    const contextText =
      typeof context === 'string' && context.trim().length > 0
        ? context.trim().slice(0, 8000)
        : null

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'ai_assistant',
      tokens_used: null,
    })

    const groq = new Groq({ apiKey })

    const chatHistory: Groq.Chat.Completions.ChatCompletionMessageParam[] = (
      messages as Array<{ role: string; content: string }>
    )
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map((m) =>
        m.role === 'user'
          ? { role: 'user' as const, content: m.content }
          : { role: 'assistant' as const, content: m.content }
      )

    const systemPrompt = contextText
      ? `Eres el asistente IA de NoteEvo, una app de notas. Ayudas al usuario a pensar, resumir, organizar y planificar a partir de sus notas. Responde siempre en español, de forma clara y útil. A continuación tienes el contexto de las notas del usuario; úsalo cuando sea relevante y, si la respuesta no está en el contexto, dilo con honestidad.\n\n--- CONTEXTO DE NOTAS ---\n${contextText}\n--- FIN DEL CONTEXTO ---`
      : `Eres el asistente IA de NoteEvo, una app de notas. Ayudas al usuario a pensar, redactar, resumir y organizar ideas. Responde siempre en español, de forma clara y útil.`

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        ...chatHistory,
      ],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content ?? ''
            if (delta) controller.enqueue(encoder.encode(delta))
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch {
    return new Response(
      JSON.stringify({ error: 'Error al procesar el mensaje' }),
      { status: 500 }
    )
  }
}
````

## File: app/api/ai/chat/route.ts
````typescript
import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 20

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const { data: { user }, error: authError } = await client.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]
    const { count } = await client
      .from('ai_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('action', 'chat')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return new Response(
        JSON.stringify({ error: 'Límite diario alcanzado (20 mensajes/día)' }),
        { status: 429 }
      )
    }

    const { noteContent, messages } = await req.json() as {
      noteContent?: unknown
      messages?: unknown
    }

    if (
      !noteContent ||
      typeof noteContent !== 'string' ||
      !Array.isArray(messages)
    ) {
      return new Response(
        JSON.stringify({ error: 'Datos inválidos' }),
        { status: 400 }
      )
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'chat',
      tokens_used: null,
    })

    const groq = new Groq({ apiKey })

    const chatHistory: Groq.Chat.Completions.ChatCompletionMessageParam[] = (
      messages as Array<{ role: string; content: string }>
    )
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) =>
        m.role === 'user'
          ? { role: 'user' as const, content: m.content }
          : { role: 'assistant' as const, content: m.content }
      )

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [
        {
          role: 'system',
          content: `Eres un asistente que responde preguntas sobre el contenido de una nota. Responde siempre en español, de forma concisa y útil. Solo usa la información de la nota para responder — si algo no está en la nota, dilo claramente.\n\nContenido de la nota:\n\n${noteContent}`,
        },
        ...chatHistory,
      ],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content ?? ''
            if (delta) controller.enqueue(encoder.encode(delta))
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch {
    return new Response(
      JSON.stringify({ error: 'Error al procesar el mensaje' }),
      { status: 500 }
    )
  }
}
````

## File: app/api/ai/improve/route.ts
````typescript
import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 10

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const { data: { user }, error: authError } = await client.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]
    const { count } = await client
      .from('ai_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('action', 'improve')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return NextResponse.json(
        { error: 'Límite diario alcanzado (10 mejoras/día)' },
        { status: 429 }
      )
    }

    const { text } = await req.json()
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'No hay texto para mejorar' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    // Register usage before streaming (can't get token count mid-stream)
    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'improve',
      tokens_used: 0,
    })

    const groq = new Groq({ apiKey })
    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [
        {
          role: 'user',
          content: `Mejora el siguiente texto: claridad, fluidez y estilo. Devuelve SOLO el texto mejorado, sin explicaciones ni comillas:\n\n${text}`,
        },
      ],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content ?? ''
          if (delta) controller.enqueue(encoder.encode(delta))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch {
    return NextResponse.json(
      { error: 'Error al mejorar el texto' },
      { status: 500 }
    )
  }
}
````

## File: app/api/ai/suggest-tags/route.ts
````typescript
import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 10

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const { data: { user }, error: authError } = await client.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      )
    }

    const today = new Date().toISOString().split('T')[0]
    const { count } = await client
      .from('ai_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('action', 'suggest_tags')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return NextResponse.json(
        { success: false, error: 'Límite diario alcanzado (10 sugerencias/día)' },
        { status: 429 }
      )
    }

    const { content } = await req.json()
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'La nota no tiene contenido para analizar' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    const groq = new Groq({ apiKey })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: `Analiza el siguiente texto y sugiere entre 3 y 5 etiquetas (tags) muy cortas y relevantes en español. Devuelve SOLO un array JSON con las etiquetas, sin explicaciones ni texto adicional. Ejemplo: ["trabajo","reunión","pendiente"]\n\nTexto:\n${content.slice(0, 2000)}`,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content?.trim() ?? '[]'

    let tags: string[] = []
    try {
      const cleaned = raw.replace(/```json|```/g, '').trim()
      const parsed: unknown = JSON.parse(cleaned)
      if (Array.isArray(parsed)) {
        tags = parsed
          .filter((t): t is string => typeof t === 'string')
          .map((t) => t.toLowerCase().trim())
          .filter((t) => t.length > 0)
          .slice(0, 5)
      }
    } catch {
      return NextResponse.json(
        { success: false, error: 'No se pudieron interpretar los tags sugeridos' },
        { status: 500 }
      )
    }

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'suggest_tags',
      tokens_used: completion.usage?.total_tokens ?? 0,
    })

    return NextResponse.json({ success: true, data: { tags } })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error al sugerir etiquetas' },
      { status: 500 }
    )
  }
}
````

## File: app/api/import/route.ts
````typescript
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
````

## File: app/api/shared/update/route.ts
````typescript
import { NextRequest, NextResponse } from 'next/server'
import { updateSharedNoteContent } from '@/lib/supabase/shared-notes-server'

/**
 * Endpoint público (sin auth) para guardar ediciones de una nota compartida con
 * access_level='edit'. Toda la autorización se delega en
 * updateSharedNoteContent, que valida activo + edit + no expirado y usa el
 * cliente admin server-side.
 */
export async function POST(req: NextRequest) {
  let body: { slug?: unknown; content?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'JSON inválido' }, { status: 400 })
  }

  const { slug, content } = body
  if (typeof slug !== 'string' || !slug) {
    return NextResponse.json({ success: false, error: 'Slug inválido' }, { status: 400 })
  }

  const result = await updateSharedNoteContent(slug, content)

  if (result.ok) {
    return NextResponse.json({ success: true })
  }

  const status =
    result.reason === 'forbidden' ? 403 :
    result.reason === 'not_found' ? 404 :
    result.reason === 'expired' ? 410 :
    result.reason === 'invalid' ? 400 :
    500

  const message =
    result.reason === 'forbidden' ? 'Este enlace no permite edición' :
    result.reason === 'not_found' ? 'El enlace no existe o fue desactivado' :
    result.reason === 'expired' ? 'El enlace ha expirado' :
    result.reason === 'invalid' ? 'Contenido inválido' :
    'Error al guardar'

  return NextResponse.json({ success: false, error: message }, { status })
}
````

## File: app/api/spaces/lookup-user/route.ts
````typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY no configurada')
  return createClient(url, key)
}

interface LookupBody {
  spaceId: string
  email: string
}

/**
 * Busca un usuario por email para previsualizarlo antes de invitarlo.
 * Solo accesible por el dueño o un admin del space indicado (evita usar el
 * endpoint como oráculo de enumeración de emails).
 */
export async function POST(req: NextRequest) {
  try {
    const serverClient = await createServerClient()
    const { data: { user }, error: authError } = await serverClient.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const body: LookupBody = await req.json()
    const { spaceId, email } = body

    if (!spaceId || !email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Datos inválidos' }, { status: 400 })
    }

    const { data: space, error: spaceError } = await serverClient
      .from('spaces')
      .select('id, owner_id')
      .eq('id', spaceId)
      .single()

    if (spaceError || !space) {
      return NextResponse.json({ success: false, error: 'Space no encontrado' }, { status: 404 })
    }

    const isOwner = space.owner_id === user.id
    if (!isOwner) {
      const { data: membership } = await serverClient
        .from('space_members')
        .select('role')
        .eq('space_id', spaceId)
        .eq('user_id', user.id)
        .single()

      if (!membership || membership.role !== 'admin') {
        return NextResponse.json({ success: false, error: 'Sin permisos para invitar' }, { status: 403 })
      }
    }

    const admin = getAdminClient()
    const normalizedEmail = email.trim().toLowerCase()

    const { data: inviteeId, error: rpcError } = await admin
      .rpc('get_user_id_by_email', { email: normalizedEmail })

    if (rpcError) {
      return NextResponse.json({ success: false, error: 'Error interno al buscar usuario' }, { status: 500 })
    }
    if (!inviteeId) {
      return NextResponse.json(
        { success: false, error: 'No existe ningún usuario registrado con ese email' },
        { status: 404 }
      )
    }

    if (inviteeId === user.id) {
      return NextResponse.json(
        { success: false, error: 'No puedes invitarte a ti mismo' },
        { status: 400 }
      )
    }

    const { data: existing } = await admin
      .from('space_members')
      .select('user_id')
      .eq('space_id', spaceId)
      .eq('user_id', inviteeId)
      .single()

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Este usuario ya es miembro del space' },
        { status: 409 }
      )
    }

    // Nombre para mostrar (opcional) desde user_profiles.
    const { data: profile } = await admin
      .from('user_profiles')
      .select('display_name')
      .eq('id', inviteeId)
      .single()

    return NextResponse.json({
      success: true,
      user: {
        email: normalizedEmail,
        displayName: profile?.display_name ?? null,
      },
    })
  } catch {
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 })
  }
}
````

## File: app/n/[slug]/NotePublicEditor.tsx
````typescript
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
````

## File: components/ai/AiAssistantView.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, Send, Loader2, FileText, Layers, Ban, User, Bot } from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'
import { getAllNotesWithNotebook } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'

type ContextMode = 'none' | 'active' | 'all'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

const CONTEXT_OPTIONS: { value: ContextMode; label: string; icon: React.ReactNode }[] = [
  { value: 'none', label: 'Sin nota', icon: <Ban size={13} /> },
  { value: 'active', label: 'Nota activa', icon: <FileText size={13} /> },
  { value: 'all', label: 'Todas mis notas', icon: <Layers size={13} /> },
]

const QUICK_ACTIONS = [
  'Resumir mis notas de hoy',
  '¿Qué tengo pendiente?',
  'Sugiéreme tareas a partir de mis notas',
]

export default function AiAssistantView() {
  const { selectedNote } = useNoteStore()
  const [contextMode, setContextMode] = useState<ContextMode>('none')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [allNotesContext, setAllNotesContext] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  // Carga perezosa del resumen de todas las notas cuando se elige ese contexto.
  useEffect(() => {
    if (contextMode !== 'all' || allNotesContext !== null) return
    getAllNotesWithNotebook()
      .then((notes) => {
        const lines = notes.slice(0, 60).map((n) => {
          const preview = extractTextPreview(n.content, 160)
          return `- ${n.title || 'Sin título'}${preview ? `: ${preview}` : ''}`
        })
        setAllNotesContext(lines.join('\n') || 'El usuario no tiene notas.')
      })
      .catch(() => setAllNotesContext(''))
  }, [contextMode, allNotesContext])

  const buildContext = (): string => {
    if (contextMode === 'active') {
      if (!selectedNote) return ''
      const body = extractTextPreview(selectedNote.content, 6000)
      return `Nota activa — "${selectedNote.title || 'Sin título'}":\n${body || '(vacía)'}`
    }
    if (contextMode === 'all') {
      return allNotesContext ? `Resumen de las notas del usuario:\n${allNotesContext}` : ''
    }
    return ''
  }

  const send = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return

    setError(null)
    const userMsg: ChatMessage = { role: 'user', content: trimmed }
    const history = [...messages, userMsg]
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setIsStreaming(true)

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context: buildContext(), messages: history }),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setError(json.error ?? 'Error al procesar el mensaje')
        setMessages((prev) => prev.slice(0, -1))
        return
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error('Sin respuesta')
      const decoder = new TextDecoder()
      let acc = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const next = [...prev]
          next[next.length - 1] = { role: 'assistant', content: acc }
          return next
        })
      }
    } catch {
      setError('Error de conexión')
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setIsStreaming(false)
    }
  }

  const activeDisabled = contextMode === 'active' && !selectedNote

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="px-8 pt-8 pb-4 border-b border-border shrink-0">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
              <Sparkles size={18} className="text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Asistente IA</h1>
              <p className="text-xs text-muted">Hasta 20 mensajes al día · el historial se borra al recargar</p>
            </div>
          </div>

          {/* Selector de contexto */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-subtle">Contexto:</span>
            {CONTEXT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setContextMode(opt.value)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs transition ${
                  contextMode === opt.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface text-muted hover:border-accent/40'
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
          {activeDisabled && (
            <p className="text-xs text-amber-500">No hay ninguna nota abierta; el contexto irá vacío.</p>
          )}
        </div>
      </div>

      {/* Mensajes */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center gap-5 py-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-panel border border-border flex items-center justify-center">
                <Sparkles size={26} className="text-subtle" />
              </div>
              <div>
                <p className="text-foreground font-medium">¿En qué puedo ayudarte?</p>
                <p className="text-muted text-sm mt-1">Pregúntame o usa una acción rápida.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => send(action)}
                    className="px-3 py-1.5 text-xs rounded-full border border-border bg-surface text-muted hover:border-accent/40 hover:text-foreground transition"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-accent/15 text-accent' : 'bg-surface border border-border text-muted'
                }`}
              >
                {msg.role === 'user' ? <User size={15} /> : <Bot size={15} />}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-accent text-white rounded-tr-sm'
                    : 'bg-panel border border-border text-foreground rounded-tl-sm'
                }`}
              >
                {msg.content || (
                  <span className="inline-flex items-center gap-1.5 text-muted">
                    <Loader2 size={13} className="animate-spin" />
                    Pensando…
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-8 pb-6 pt-2 shrink-0">
        <div className="max-w-3xl mx-auto w-full">
          {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input) }}
            className="flex items-end gap-2 bg-panel border border-border rounded-2xl p-2 focus-within:border-accent transition"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send(input)
                }
              }}
              rows={1}
              placeholder="Escribe tu mensaje…"
              className="flex-1 bg-transparent resize-none px-2 py-1.5 text-sm text-foreground placeholder:text-subtle focus:outline-none max-h-32"
            />
            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              title="Enviar"
              className="w-9 h-9 flex items-center justify-center bg-accent text-white rounded-xl hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition shrink-0"
            >
              {isStreaming ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
````

## File: components/command/CommandPalette.tsx
````typescript
'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useUIStore } from '@/store/uiStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useSpaceStore } from '@/store/spaceStore'
import { createNote } from '@/lib/supabase/notes'
import { searchNotes } from '@/lib/supabase/search'
import { updateProfile } from '@/lib/supabase/profile'
import SaveAsTemplateModal from '@/components/templates/SaveAsTemplateModal'
import {
  Home, FileText, Star, CheckSquare, Calendar, LayoutTemplate,
  Trash2, Tag, Sparkles, Share2, Settings, Sun, Moon, Monitor,
  BookOpen, Users, Plus, Search, X,
} from 'lucide-react'
import type { Note } from '@/types'

type View =
  | 'home' | 'notebooks' | 'all-notes' | 'favorites' | 'trash'
  | 'search' | 'advanced-search' | 'tags-view' | 'notebooks-view' | 'tasks' | 'files'
  | 'calendar' | 'spaces' | 'shared' | 'settings' | 'templates' | 'ai-assistant'

type SectionKey = 'acciones' | 'ir-a' | 'libretas' | 'spaces' | 'notas'

interface CommandItem {
  id: string
  icon: React.ReactNode
  label: string
  section: SectionKey
  shortcut?: string
  onExecute: () => void
}

const SECTION_LABELS: Record<SectionKey, string> = {
  acciones: 'Acciones',
  'ir-a': 'Ir a',
  libretas: 'Libretas',
  spaces: 'Spaces',
  notas: 'Notas',
}

const SECTION_ORDER: SectionKey[] = ['acciones', 'ir-a', 'libretas', 'spaces', 'notas']

export default function CommandPalette() {
  const router = useRouter()
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    setCurrentView,
    setTheme,
  } = useUIStore()
  const { notebooks, selectedNotebook, setSelectedNotebook } = useNotebookStore()
  const { selectedNote, addNote, setSelectedNote } = useNoteStore()
  const { spaces, setSelectedSpace } = useSpaceStore()

  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Note[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [showSaveTemplate, setShowSaveTemplate] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const close = useCallback(() => {
    setCommandPaletteOpen(false)
    setQuery('')
    setSearchResults([])
    setActiveIndex(0)
  }, [setCommandPaletteOpen])

  // Auto-focus and reset state when palette opens
  useEffect(() => {
    if (!isCommandPaletteOpen) return
    setQuery('')
    setSearchResults([])
    setActiveIndex(0)
    const t = setTimeout(() => inputRef.current?.focus(), 20)
    return () => clearTimeout(t)
  }, [isCommandPaletteOpen])

  // Debounced note search
  useEffect(() => {
    clearTimeout(searchTimer.current)
    if (!query.trim()) {
      setSearchResults([])
      return
    }
    searchTimer.current = setTimeout(async () => {
      try {
        const results = await searchNotes(query)
        setSearchResults(results.slice(0, 8))
      } catch {
        setSearchResults([])
      }
    }, 200)
    return () => clearTimeout(searchTimer.current)
  }, [query])

  const applyTheme = useCallback(
    (next: 'light' | 'dark' | 'system') => {
      setTheme(next)
      updateProfile({ theme: next }).catch(() => {})
    },
    [setTheme]
  )

  const items = useMemo((): CommandItem[] => {
    const q = query.toLowerCase().trim()
    const matches = (label: string) => !q || label.toLowerCase().includes(q)

    const withClose = (fn: () => void) => () => {
      close()
      fn()
    }

    const goTo = (view: View) =>
      withClose(() => {
        setCurrentView(view)
        setSelectedNotebook(null)
        router.push('/dashboard')
      })

    // ── ACCIONES ──────────────────────────────────────────────
    const acciones: CommandItem[] = []

    if (matches('nueva nota')) {
      acciones.push({
        id: 'new-note',
        icon: <Plus size={15} />,
        label: 'Nueva nota',
        section: 'acciones',
        shortcut: 'Ctrl+Shift+E',
        onExecute: withClose(() => {
          if (!selectedNotebook) {
            setCurrentView('notebooks')
            router.push('/dashboard')
            return
          }
          createNote(selectedNotebook.id)
            .then((note) => {
              addNote(note)
              setSelectedNote(note)
              setCurrentView('notebooks')
            })
            .catch(() => {})
        }),
      })
    }

    if (selectedNote && matches('guardar nota como plantilla')) {
      acciones.push({
        id: 'save-template',
        icon: <LayoutTemplate size={15} />,
        label: 'Guardar nota como plantilla',
        section: 'acciones',
        onExecute: () => {
          close()
          setShowSaveTemplate(true)
        },
      })
    }

    if (matches('tema claro')) {
      acciones.push({
        id: 'theme-light',
        icon: <Sun size={15} />,
        label: 'Tema: Claro',
        section: 'acciones',
        onExecute: withClose(() => applyTheme('light')),
      })
    }

    if (matches('tema oscuro')) {
      acciones.push({
        id: 'theme-dark',
        icon: <Moon size={15} />,
        label: 'Tema: Oscuro',
        section: 'acciones',
        onExecute: withClose(() => applyTheme('dark')),
      })
    }

    if (matches('tema sistema')) {
      acciones.push({
        id: 'theme-system',
        icon: <Monitor size={15} />,
        label: 'Tema: Sistema',
        section: 'acciones',
        onExecute: withClose(() => applyTheme('system')),
      })
    }

    // ── IR A ───────────────────────────────────────────────────
    const navDefs: { id: string; icon: React.ReactNode; label: string; fn: () => void }[] = [
      { id: 'nav-home', icon: <Home size={15} />, label: 'Inicio', fn: goTo('home') },
      { id: 'nav-notes', icon: <FileText size={15} />, label: 'Notas', fn: goTo('all-notes') },
      { id: 'nav-favorites', icon: <Star size={15} />, label: 'Favoritos', fn: goTo('favorites') },
      { id: 'nav-tasks', icon: <CheckSquare size={15} />, label: 'Tareas', fn: goTo('tasks') },
      { id: 'nav-calendar', icon: <Calendar size={15} />, label: 'Calendario', fn: goTo('calendar') },
      { id: 'nav-templates', icon: <LayoutTemplate size={15} />, label: 'Plantillas', fn: goTo('templates') },
      { id: 'nav-trash', icon: <Trash2 size={15} />, label: 'Papelera', fn: goTo('trash') },
      { id: 'nav-tags', icon: <Tag size={15} />, label: 'Etiquetas', fn: goTo('tags-view') },
      { id: 'nav-ai', icon: <Sparkles size={15} />, label: 'Asistente IA', fn: goTo('ai-assistant') },
      { id: 'nav-shared', icon: <Share2 size={15} />, label: 'Compartido conmigo', fn: goTo('shared') },
      {
        id: 'nav-settings',
        icon: <Settings size={15} />,
        label: 'Configuración',
        fn: withClose(() => router.push('/dashboard/settings')),
      },
    ]

    const irA: CommandItem[] = navDefs
      .filter(({ label }) => matches(label))
      .map(({ id, icon, label, fn }) => ({
        id,
        icon,
        label,
        section: 'ir-a' as SectionKey,
        onExecute: fn,
      }))

    // ── LIBRETAS ───────────────────────────────────────────────
    const libretas: CommandItem[] = notebooks
      .filter(({ name }) => matches(name))
      .map((nb) => ({
        id: `notebook-${nb.id}`,
        icon: <BookOpen size={15} />,
        label: nb.name,
        section: 'libretas' as SectionKey,
        onExecute: withClose(() => {
          setSelectedNotebook(nb)
          setCurrentView('notebooks')
          router.push('/dashboard')
        }),
      }))

    // ── SPACES ─────────────────────────────────────────────────
    const spacesItems: CommandItem[] = spaces
      .filter(({ name }) => matches(name))
      .map((sp) => ({
        id: `space-${sp.id}`,
        icon: <Users size={15} />,
        label: sp.name,
        section: 'spaces' as SectionKey,
        onExecute: withClose(() => {
          setSelectedSpace(sp)
          setCurrentView('spaces')
          setSelectedNotebook(null)
          router.push('/dashboard')
        }),
      }))

    // ── NOTAS (search results) ─────────────────────────────────
    const notasItems: CommandItem[] = searchResults.map((note) => ({
      id: `note-${note.id}`,
      icon: <FileText size={15} />,
      label: note.title || 'Sin título',
      section: 'notas' as SectionKey,
      onExecute: withClose(() => {
        setSelectedNote(note)
        const nb = notebooks.find((n) => n.id === note.notebook_id)
        if (nb) setSelectedNotebook(nb)
        setCurrentView('notebooks')
        router.push('/dashboard')
      }),
    }))

    return [...acciones, ...irA, ...libretas, ...spacesItems, ...notasItems]
  }, [
    query,
    selectedNote,
    selectedNotebook,
    notebooks,
    spaces,
    searchResults,
    close,
    applyTheme,
    setCurrentView,
    setSelectedNotebook,
    setSelectedNote,
    setSelectedSpace,
    addNote,
    router,
  ])

  // Group by section in canonical order, drop empty sections
  const sections = useMemo(
    () =>
      SECTION_ORDER.map((key) => ({
        key,
        label: SECTION_LABELS[key],
        items: items.filter((i) => i.section === key),
      })).filter((s) => s.items.length > 0),
    [items]
  )

  // Reset active index when item count changes
  useEffect(() => {
    setActiveIndex(0)
  }, [items.length])

  // Scroll active item into view
  useEffect(() => {
    const active = listRef.current?.querySelector<HTMLElement>('[data-active="true"]')
    active?.scrollIntoView({ block: 'nearest', behavior: 'auto' })
  }, [activeIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, items.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      items[activeIndex]?.onExecute()
    }
  }

  if (!isCommandPaletteOpen && !showSaveTemplate) return null

  return (
    <>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50" role="presentation">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Centered panel — pointer-events-none on wrapper prevents backdrop click bubbling */}
          <div className="relative flex items-start justify-center pt-[15vh] px-4 h-full pointer-events-none">
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Paleta de comandos"
              className="w-full max-w-xl bg-panel border border-border rounded-2xl shadow-2xl overflow-hidden pointer-events-auto animate-palette-in"
              onKeyDown={handleKeyDown}
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
                <Search size={16} className="text-muted shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    setActiveIndex(0)
                  }}
                  placeholder="Buscar o ejecutar un comando..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted outline-none"
                  style={{ color: 'var(--color-foreground)' }}
                  aria-label="Buscar o ejecutar un comando"
                />
                {query && (
                  <button
                    type="button"
                    title="Limpiar búsqueda"
                    onClick={() => {
                      setQuery('')
                      setActiveIndex(0)
                      inputRef.current?.focus()
                    }}
                    className="text-muted hover:text-foreground transition cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Items list */}
              <div ref={listRef} className="max-h-[400px] overflow-y-auto py-1">
                {sections.length === 0 && (
                  <p className="px-4 py-8 text-center text-sm text-muted">
                    Sin resultados para &ldquo;{query}&rdquo;
                  </p>
                )}

                {sections.map(({ key, label, items: sectionItems }) => (
                  <div key={key}>
                    <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted/60 select-none">
                      {label}
                    </p>

                    {sectionItems.map((item) => {
                      const globalIdx = items.indexOf(item)
                      const isActive = globalIdx === activeIndex
                      return (
                        <button
                          key={item.id}
                          type="button"
                          data-active={isActive ? 'true' : undefined}
                          onClick={item.onExecute}
                          onMouseEnter={() => setActiveIndex(globalIdx)}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-accent/10 text-accent'
                              : 'text-foreground hover:bg-surface'
                          }`}
                        >
                          <span
                            className={`shrink-0 ${isActive ? 'text-accent' : 'text-muted'}`}
                          >
                            {item.icon}
                          </span>
                          <span className="flex-1 text-left truncate">{item.label}</span>
                          {item.shortcut && (
                            <kbd className="hidden sm:inline-flex text-[10px] font-mono text-muted/70 shrink-0 px-1.5 py-0.5 bg-surface border border-border rounded">
                              {item.shortcut}
                            </kbd>
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-border flex items-center gap-4 text-[10px] text-muted/60 select-none">
                <span>↑↓ navegar</span>
                <span>↵ ejecutar</span>
                <span>Esc cerrar</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSaveTemplate && selectedNote && (
        <SaveAsTemplateModal
          content={selectedNote.content}
          defaultName={selectedNote.title !== 'Sin título' ? selectedNote.title : ''}
          onSaved={() => setShowSaveTemplate(false)}
          onClose={() => setShowSaveTemplate(false)}
        />
      )}
    </>
  )
}
````

## File: components/dashboard/DashboardStats.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  FileText, BookOpen, Tag, CheckSquare, Paperclip, CalendarClock, Users,
} from 'lucide-react'
import {
  getUserStats, getDashboardExtras,
  type UserStats, type DashboardExtras,
} from '@/lib/supabase/stats'

const ACCENT = '#1a7a4a'

interface StatCard {
  label: string
  value: number
  icon: React.ReactNode
}

function StatsGrid({ stats }: { stats: UserStats }) {
  const cards: StatCard[] = [
    { label: 'Notas', value: stats.total_notes, icon: <FileText size={16} /> },
    { label: 'Libretas', value: stats.total_notebooks, icon: <BookOpen size={16} /> },
    { label: 'Etiquetas', value: stats.total_tags, icon: <Tag size={16} /> },
    { label: 'Tareas pendientes', value: stats.pending_tasks, icon: <CheckSquare size={16} /> },
    { label: 'Archivos', value: stats.total_attachments, icon: <Paperclip size={16} /> },
    { label: 'Esta semana', value: stats.notes_this_week, icon: <CalendarClock size={16} /> },
    { label: 'Spaces', value: stats.spaces_count, icon: <Users size={16} /> },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {cards.map(({ label, value, icon }) => (
        <div
          key={label}
          className="bg-panel border border-border rounded-xl p-4 flex flex-col gap-2"
        >
          <span className="text-accent">{icon}</span>
          <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
          <p className="text-xs text-muted">{label}</p>
        </div>
      ))}
    </div>
  )
}

function ActivityChart({ data }: { data: DashboardExtras['activity_7d'] }) {
  const chartData = data.map((p) => ({
    label: format(parseISO(p.day), 'EEE', { locale: es }),
    count: p.count,
  }))
  const hasActivity = data.some((p) => p.count > 0)

  return (
    <div className="bg-panel border border-border rounded-xl p-5">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Actividad — últimos 7 días</h2>
        <span className="text-xs text-muted">Notas creadas</span>
      </div>
      <div className="h-44 w-full">
        {hasActivity ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: 'var(--color-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: 'var(--color-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                cursor={{ stroke: ACCENT, strokeWidth: 1 }}
                contentStyle={{
                  background: 'var(--color-panel)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  fontSize: 12,
                  color: 'var(--color-foreground)',
                }}
                labelStyle={{ color: 'var(--color-muted)' }}
                formatter={(value) => [`${value} nota${Number(value) !== 1 ? 's' : ''}`, '']}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke={ACCENT}
                strokeWidth={2}
                fill="url(#activityFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-center">
            <CalendarClock size={26} className="text-subtle" />
            <p className="text-sm text-muted">Sin notas creadas esta semana</p>
          </div>
        )}
      </div>
    </div>
  )
}

function RankedList({
  title, items, emptyLabel, icon,
}: {
  title: string
  items: { name: string; count: number }[]
  emptyLabel: string
  icon: React.ReactNode
}) {
  const max = Math.max(1, ...items.map((i) => i.count))

  return (
    <div className="bg-panel border border-border rounded-xl p-5">
      <h2 className="text-sm font-semibold text-foreground mb-4">{title}</h2>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <span className="text-subtle">{icon}</span>
          <p className="text-sm text-muted">{emptyLabel}</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-foreground truncate">{item.name}</span>
                <span className="text-muted tabular-nums shrink-0">{item.count}</span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function DashboardStats() {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [extras, setExtras] = useState<DashboardExtras | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getUserStats(), getDashboardExtras()])
      .then(([s, e]) => {
        setStats(s)
        setExtras(e)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-panel border border-border rounded-xl h-24 animate-pulse" />
          ))}
        </div>
        <div className="bg-panel border border-border rounded-xl h-56 animate-pulse" />
      </div>
    )
  }

  if (!stats || !extras) {
    return (
      <div className="bg-panel border border-border rounded-xl p-5 text-sm text-muted">
        No se pudieron cargar las estadísticas.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <StatsGrid stats={stats} />
      <ActivityChart data={extras.activity_7d} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RankedList
          title="Etiquetas más usadas"
          items={extras.top_tags}
          emptyLabel="Sin etiquetas aún"
          icon={<Tag size={26} />}
        />
        <RankedList
          title="Libretas más grandes"
          items={extras.top_notebooks}
          emptyLabel="Sin libretas aún"
          icon={<BookOpen size={26} />}
        />
      </div>
    </div>
  )
}
````

## File: components/editor/AiChatPanel.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Sparkles, Send, Loader2, MessageSquare } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface AiChatPanelProps {
  noteContent: string
  onClose: () => void
}

export default function AiChatPanel({ noteContent, onClose }: AiChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          noteContent,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error ?? 'Error desconocido')
        setIsLoading(false)
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error('Sin respuesta')

      let result = ''
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: result }
          return updated
        })
      }
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-80 shrink-0 border-l border-border bg-panel flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-accent" />
          <span className="text-sm font-medium text-foreground">Chat con la nota</span>
        </div>
        <button
          type="button"
          title="Cerrar chat"
          onClick={onClose}
          className="text-muted hover:text-foreground transition p-0.5 rounded cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-3 mt-8 text-center">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
              <MessageSquare size={18} className="text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Pregunta sobre tu nota</p>
              <p className="text-xs text-muted mt-1">
                Puedo responder preguntas basadas en el contenido de esta nota
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[10px] text-subtle px-1">
              {msg.role === 'user' ? 'Tú' : 'IA'}
            </span>
            <div
              className={`px-3 py-2 rounded-xl text-xs leading-relaxed max-w-[90%] whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-accent text-white rounded-tr-sm'
                  : 'bg-surface text-foreground rounded-tl-sm'
              }`}
            >
              {msg.content || (
                <Loader2 size={12} className="animate-spin text-muted" />
              )}
            </div>
          </div>
        ))}

        {error && (
          <p className="text-xs text-danger text-center">{error}</p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Pregunta algo sobre la nota..."
            rows={2}
            className="flex-1 bg-surface border border-border rounded-xl px-3 py-2 text-xs text-foreground outline-none resize-none focus:border-accent/50 transition placeholder-subtle"
            style={{ color: 'var(--color-foreground)' }}
          />
          <button
            type="button"
            title="Enviar"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2 bg-accent text-white rounded-xl hover:bg-accent-light disabled:opacity-40 transition cursor-pointer shrink-0"
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
          </button>
        </div>
        <p className="text-[10px] text-subtle mt-1.5">Enter para enviar · Shift+Enter nueva línea</p>
      </div>
    </div>
  )
}
````

## File: components/editor/AiImproveToolbar.tsx
````typescript
'use client'

import { useRef, useState } from 'react'
import { Sparkles, Check, X, Loader2 } from 'lucide-react'

interface AiImproveToolbarProps {
  position: { top: number; left: number }
  selectedText: string
  onAccept: (improvedText: string) => void
  onReject: () => void
}

export default function AiImproveToolbar({
  position,
  selectedText,
  onAccept,
  onReject,
}: AiImproveToolbarProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [improvedText, setImprovedText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleImprove = async () => {
    setState('loading')
    setImprovedText('')
    setError(null)

    try {
      const res = await fetch('/api/ai/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedText }),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error ?? 'Error desconocido')
        setState('error')
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) throw new Error('Sin respuesta')

      let result = ''
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        result += chunk
        setImprovedText(result)
      }

      setState('done')
    } catch {
      setError('Error al conectar con el servidor')
      setState('error')
    }
  }


  const style: React.CSSProperties = {
    position: 'fixed',
    top: position.top,
    left: position.left,
    zIndex: 50,
    maxWidth: '360px',
    minWidth: '240px',
  }

  return (
    <div ref={containerRef} style={style} onMouseDown={(e) => e.preventDefault()}>
      <div className="bg-panel border border-border rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
          <Sparkles size={13} className="text-accent shrink-0" />
          <span className="text-xs font-medium text-foreground">Mejorar escritura</span>
          {state === 'loading' && (
            <Loader2 size={12} className="text-muted animate-spin ml-auto" />
          )}
        </div>

        {/* Content */}
        <div className="px-3 py-2.5 max-h-40 overflow-y-auto">
          {state === 'idle' && (
            <button
              type="button"
              onClick={handleImprove}
              className="text-xs text-accent hover:opacity-80 transition cursor-pointer"
            >
              Mejorar con IA →
            </button>
          )}
          {state === 'loading' && !improvedText && (
            <p className="text-xs text-muted">Mejorando...</p>
          )}
          {(state === 'loading' || state === 'done') && improvedText && (
            <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">
              {improvedText}
            </p>
          )}
          {state === 'error' && (
            <p className="text-xs text-danger">{error}</p>
          )}
        </div>

        {/* Actions */}
        {(state === 'done' || state === 'error') && (
          <div className="flex items-center gap-1 px-3 py-2 border-t border-border">
            {state === 'done' && (
              <button
                type="button"
                onClick={() => onAccept(improvedText)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-accent text-white text-xs rounded-lg hover:bg-accent-light transition cursor-pointer"
              >
                <Check size={12} />
                Aceptar
              </button>
            )}
            <button
              type="button"
              onClick={onReject}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-surface text-muted text-xs rounded-lg hover:bg-elevated hover:text-foreground transition cursor-pointer"
            >
              <X size={12} />
              Cancelar
            </button>
            {state === 'done' && (
              <button
                type="button"
                onClick={handleImprove}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-muted hover:text-accent transition cursor-pointer ml-auto"
              >
                <Sparkles size={11} />
                Reintentar
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
````

## File: components/editor/AiSmartTags.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import { Sparkles, Check, X, Loader2, Tag } from 'lucide-react'
import { createTag, addTagToNote, getTagsByNote } from '@/lib/supabase/tags'
import { useTagStore } from '@/store/tagStore'

interface AiSmartTagsProps {
  noteId: string
  noteContent: string
  onTagsAdded: () => void
  onClose: () => void
}

type TagState = 'pending' | 'accepted' | 'rejected'

interface SuggestedTag {
  name: string
  state: TagState
}

export default function AiSmartTags({
  noteId,
  noteContent,
  onTagsAdded,
  onClose,
}: AiSmartTagsProps) {
  const { tags: allTags, addTag } = useTagStore()
  const [existingTagNames, setExistingTagNames] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<SuggestedTag[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const tags = await getTagsByNote(noteId)
        setExistingTagNames(tags.map((t) => t.name.toLowerCase()))
      } catch {
        setExistingTagNames([])
      }
    }
    load()
  }, [noteId])

  const handleSuggest = async () => {
    setStatus('loading')
    setError(null)
    setSuggestions([])

    try {
      const res = await fetch('/api/ai/suggest-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: noteContent }),
      })
      const json = await res.json()
      if (!json.success) {
        setError(json.error ?? 'Error desconocido')
        setStatus('error')
        return
      }

      const filtered = (json.data.tags as string[]).filter(
        (t) => !existingTagNames.includes(t.toLowerCase())
      )

      setSuggestions(filtered.map((name) => ({ name, state: 'pending' })))
      setStatus('done')
    } catch {
      setError('Error al conectar con el servidor')
      setStatus('error')
    }
  }

  const toggle = (index: number) => {
    setSuggestions((prev) =>
      prev.map((s, i) =>
        i === index
          ? { ...s, state: s.state === 'accepted' ? 'pending' : 'accepted' }
          : s
      )
    )
  }

  const reject = (index: number) => {
    setSuggestions((prev) =>
      prev.map((s, i) => (i === index ? { ...s, state: 'rejected' } : s))
    )
  }

  const handleApply = async () => {
    const toApply = suggestions.filter((s) => s.state === 'accepted')
    if (toApply.length === 0) return

    setSaving(true)
    try {
      for (const suggestion of toApply) {
        const existing = allTags.find(
          (t) => t.name.toLowerCase() === suggestion.name.toLowerCase()
        )
        let tagId: string
        if (existing) {
          tagId = existing.id
        } else {
          const newTag = await createTag(suggestion.name)
          addTag(newTag)
          tagId = newTag.id
        }
        await addTagToNote(noteId, tagId)
      }
      onTagsAdded()
      onClose()
    } catch {
      setError('Error al aplicar las etiquetas')
    } finally {
      setSaving(false)
    }
  }

  const acceptedCount = suggestions.filter((s) => s.state === 'accepted').length
  const pendingOrAccepted = suggestions.filter((s) => s.state !== 'rejected')

  return (
    <div className="border border-border rounded-xl bg-panel shadow-xl overflow-hidden w-72">
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles size={13} className="text-accent" />
          <span className="text-xs font-medium text-foreground">Smart Tags</span>
        </div>
        <button
          type="button"
          title="Cerrar"
          onClick={onClose}
          className="text-muted hover:text-foreground transition cursor-pointer rounded p-0.5"
        >
          <X size={13} />
        </button>
      </div>

      <div className="px-3 py-2.5">
        {status === 'idle' && (
          <button
            type="button"
            onClick={handleSuggest}
            className="text-xs text-accent hover:opacity-80 transition cursor-pointer"
          >
            Analizar nota y sugerir etiquetas →
          </button>
        )}

        {status === 'loading' && (
          <div className="flex items-center gap-2 text-xs text-muted">
            <Loader2 size={12} className="animate-spin" />
            Analizando contenido...
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-2">
            <p className="text-xs text-danger">{error}</p>
            <button
              type="button"
              onClick={handleSuggest}
              className="text-xs text-accent hover:opacity-80 transition cursor-pointer"
            >
              Reintentar →
            </button>
          </div>
        )}

        {status === 'done' && pendingOrAccepted.length === 0 && (
          <p className="text-xs text-muted">
            No se encontraron etiquetas nuevas para esta nota.
          </p>
        )}

        {status === 'done' && pendingOrAccepted.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] text-subtle mb-1.5">
              Selecciona las etiquetas a añadir:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((s, i) => {
                if (s.state === 'rejected') return null
                return (
                  <div
                    key={i}
                    className={`group flex items-center gap-1 pl-2 pr-1 py-0.5 rounded-full border text-xs transition ${
                      s.state === 'accepted'
                        ? 'bg-accent/15 border-accent/40 text-accent'
                        : 'bg-surface border-border text-muted'
                    }`}
                  >
                    <Tag size={10} />
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      className="cursor-pointer"
                    >
                      {s.name}
                    </button>
                    {s.state === 'accepted' ? (
                      <Check size={10} className="text-accent shrink-0" />
                    ) : (
                      <button
                        type="button"
                        title="Rechazar"
                        onClick={() => reject(i)}
                        className="opacity-0 group-hover:opacity-100 text-muted hover:text-danger transition cursor-pointer"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {status === 'done' && pendingOrAccepted.length > 0 && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-border">
          <p className="text-[10px] text-subtle">
            {acceptedCount} seleccionada{acceptedCount !== 1 ? 's' : ''}
          </p>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={handleSuggest}
              className="px-2 py-1 text-[10px] text-muted hover:text-accent transition cursor-pointer"
            >
              Regenerar
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={acceptedCount === 0 || saving}
              className="flex items-center gap-1 px-2.5 py-1 bg-accent text-white text-[10px] rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-medium"
            >
              {saving ? (
                <Loader2 size={10} className="animate-spin" />
              ) : (
                <Check size={10} />
              )}
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
````

## File: components/editor/AiSummaryPanel.tsx
````typescript
'use client'

import { X, Sparkles, Loader2 } from 'lucide-react'

interface AiSummaryPanelProps {
  summary: string | null
  isLoading: boolean
  error: string | null
  onClose: () => void
}

export default function AiSummaryPanel({ summary, isLoading, error, onClose }: AiSummaryPanelProps) {
  return (
    <div className="w-72 shrink-0 border-l border-border bg-panel flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-accent" />
          <span className="text-sm font-medium text-foreground">Resumen IA</span>
        </div>
        <button
          type="button"
          title="Cerrar panel"
          onClick={onClose}
          className="text-muted hover:text-foreground transition p-0.5 rounded cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {isLoading && (
          <div className="flex items-center gap-2 text-muted text-sm">
            <Loader2 size={14} className="animate-spin" />
            <span>Generando resumen...</span>
          </div>
        )}

        {error && !isLoading && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        {summary && !isLoading && (
          <p className="text-sm text-foreground leading-relaxed">{summary}</p>
        )}
      </div>
    </div>
  )
}
````

## File: components/editor/BacklinksPanel.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import { X, Link, FileText, Loader2 } from 'lucide-react'
import { getBacklinks } from '@/lib/supabase/note-links'
import type { BacklinkNote } from '@/lib/supabase/note-links'
import { useNoteStore } from '@/store/noteStore'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

interface BacklinksPanelProps {
  noteId: string
  onClose: () => void
}

export default function BacklinksPanel({ noteId, onClose }: BacklinksPanelProps) {
  const [backlinks, setBacklinks] = useState<BacklinkNote[]>([])
  const [loading, setLoading] = useState(true)
  const { notes, setSelectedNote } = useNoteStore()

  useEffect(() => {
    setLoading(true)
    setBacklinks([])
    getBacklinks(noteId)
      .then(setBacklinks)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [noteId])

  const handleOpen = (id: string) => {
    const note = notes.find((n) => n.id === id)
    if (note) {
      setSelectedNote(note)
      onClose()
    }
  }

  return (
    <div className="w-72 flex flex-col border-l border-border bg-panel overflow-hidden shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Link size={14} className="text-accent" />
          Backlinks
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded hover:bg-surface transition-colors text-muted hover:text-foreground"
          aria-label="Cerrar panel de backlinks"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted">
            <Loader2 size={16} className="animate-spin" />
          </div>
        ) : backlinks.length === 0 ? (
          <div className="text-center py-8 text-muted text-sm px-4">
            <FileText size={24} className="mx-auto mb-2 opacity-40" />
            <p>Ninguna nota enlaza aquí todavía</p>
            <p className="text-xs mt-1 text-subtle">
              Usa <code className="bg-surface px-1 rounded">[[</code> en otra nota para crear un enlace
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {backlinks.map((bl) => (
              <button
                key={bl.id}
                type="button"
                onClick={() => handleOpen(bl.id)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-surface transition-colors group"
              >
                <div className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                  {bl.title}
                </div>
                <div className="text-xs text-muted mt-0.5">
                  {formatDistanceToNow(parseISO(bl.updated_at), { addSuffix: true, locale: es })}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 py-2 border-t border-border text-xs text-muted">
        {!loading && (
          <span>
            {backlinks.length} {backlinks.length === 1 ? 'nota enlaza' : 'notas enlazan'} aquí
          </span>
        )}
      </div>
    </div>
  )
}
````

## File: components/editor/CalloutComponent.tsx
````typescript
'use client'

import { useRef, useState, useEffect } from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import type { LucideIcon } from 'lucide-react'
import {
  Info, AlertTriangle, CheckCircle, XCircle, Lightbulb, ChevronDown,
} from 'lucide-react'

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip'

interface CalloutConfig {
  icon: LucideIcon
  label: string
  outer: string
  sep: string
  color: string
}

const CONFIGS: Record<CalloutType, CalloutConfig> = {
  info: {
    icon: Info,
    label: 'Info',
    outer: 'bg-blue-500/10 border-blue-500/30',
    sep: 'border-blue-500/20',
    color: 'text-blue-400',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Advertencia',
    outer: 'bg-yellow-500/10 border-yellow-500/30',
    sep: 'border-yellow-500/20',
    color: 'text-yellow-400',
  },
  success: {
    icon: CheckCircle,
    label: 'Éxito',
    outer: 'bg-green-500/10 border-green-500/30',
    sep: 'border-green-500/20',
    color: 'text-green-400',
  },
  error: {
    icon: XCircle,
    label: 'Error',
    outer: 'bg-red-500/10 border-red-500/30',
    sep: 'border-red-500/20',
    color: 'text-red-400',
  },
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    outer: 'bg-accent/10 border-accent/30',
    sep: 'border-accent/20',
    color: 'text-accent',
  },
}

export default function CalloutComponent({
  node,
  updateAttributes,
  selected,
}: NodeViewProps) {
  const rawType = node.attrs.type as string
  const type: CalloutType = rawType in CONFIGS ? (rawType as CalloutType) : 'info'
  const cfg = CONFIGS[type]
  const Icon = cfg.icon

  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false)
      }
    }
    if (pickerOpen) document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [pickerOpen])

  return (
    <NodeViewWrapper>
      <div
        className={`my-3 rounded-xl border overflow-hidden ${cfg.outer} ${
          selected ? 'ring-1 ring-accent/30' : ''
        }`}
      >
        {/* Header */}
        <div className={`flex items-center gap-2 px-3 py-2 border-b ${cfg.sep}`}>
          <div className="relative" ref={pickerRef}>
            <button
              type="button"
              title="Cambiar tipo de callout"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setPickerOpen(!pickerOpen)}
              className={`flex items-center gap-1 ${cfg.color} hover:opacity-70 transition cursor-pointer`}
            >
              <Icon size={14} />
              <ChevronDown size={10} />
            </button>

            {pickerOpen && (
              <div className="absolute left-0 top-7 z-40 bg-panel border border-border rounded-xl shadow-2xl py-1 w-36 overflow-hidden">
                {(Object.keys(CONFIGS) as CalloutType[]).map((k) => {
                  const c = CONFIGS[k]
                  const ItemIcon = c.icon
                  return (
                    <button
                      key={k}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        updateAttributes({ type: k })
                        setPickerOpen(false)
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-surface transition cursor-pointer ${
                        k === type ? 'bg-surface' : ''
                      }`}
                    >
                      <span className={c.color}>
                        <ItemIcon size={13} />
                      </span>
                      <span className="text-foreground">{c.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <span className={`text-xs font-semibold ${cfg.color} uppercase tracking-wider`}>
            {cfg.label}
          </span>
        </div>

        {/* Editable content */}
        <NodeViewContent className="px-4 py-3 min-h-[2rem]" />
      </div>
    </NodeViewWrapper>
  )
}
````

## File: components/editor/ExportModal.tsx
````typescript
'use client'

import { useState } from 'react'
import { X, FileText, FileDown, Loader2 } from 'lucide-react'
import { tiptapToMarkdown } from '@/lib/utils/tiptap-to-markdown'

interface ExportModalProps {
  title: string
  content: Record<string, unknown>
  onClose: () => void
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50) || 'nota'
}

export default function ExportModal({ title, content, onClose }: ExportModalProps) {
  const [exporting, setExporting] = useState<'pdf' | 'md' | null>(null)

  const handleMarkdown = () => {
    setExporting('md')
    try {
      const markdown = `# ${title}\n\n${tiptapToMarkdown(content)}`
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${slugify(title)}.md`
      a.click()
      URL.revokeObjectURL(url)
      onClose()
    } finally {
      setExporting(null)
    }
  }

  const handlePdf = () => {
    setExporting('pdf')

    const markdown = tiptapToMarkdown(content)
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            line-height: 1.75;
            color: #1a1a1a;
            max-width: 720px;
            margin: 0 auto;
            padding: 48px 32px;
          }
          h1 { font-size: 2rem; font-weight: 700; margin-bottom: 24px; color: #0f0f0f; }
          h2 { font-size: 1.4rem; font-weight: 600; margin: 24px 0 12px; }
          h3 { font-size: 1.15rem; font-weight: 600; margin: 20px 0 8px; }
          p { margin: 0 0 12px; }
          ul, ol { padding-left: 24px; margin: 0 0 12px; }
          li { margin: 4px 0; }
          code {
            background: #f0f0f0;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.85em;
            font-family: 'Courier New', monospace;
          }
          pre {
            background: #f5f5f5;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 16px;
            overflow-x: auto;
            margin: 16px 0;
          }
          pre code { background: none; padding: 0; }
          blockquote {
            border-left: 3px solid #ccc;
            padding-left: 16px;
            color: #666;
            margin: 16px 0;
          }
          hr { border: none; border-top: 1px solid #e0e0e0; margin: 24px 0; }
          img { max-width: 100%; border-radius: 8px; margin: 12px 0; }
          @media print {
            body { padding: 0; }
            @page { margin: 2cm; }
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div id="content"></div>
        <script>
          const md = ${JSON.stringify(markdown)};
          const lines = md.split('\\n');
          let html = '';
          for (const line of lines) {
            if (line.startsWith('## ')) html += '<h2>' + line.slice(3) + '</h2>';
            else if (line.startsWith('### ')) html += '<h3>' + line.slice(4) + '</h3>';
            else if (line.startsWith('# ')) html += '<h2>' + line.slice(2) + '</h2>';
            else if (line.startsWith('- [ ] ')) html += '<p>☐ ' + line.slice(6) + '</p>';
            else if (line.startsWith('- [x] ')) html += '<p>☑ ' + line.slice(6) + '</p>';
            else if (line.startsWith('- ')) html += '<li>' + line.slice(2) + '</li>';
            else if (line.startsWith('> ')) html += '<blockquote>' + line.slice(2) + '</blockquote>';
            else if (line === '---') html += '<hr>';
            else if (line.trim()) html += '<p>' + line + '</p>';
          }
          document.getElementById('content').innerHTML = html;
          window.onload = () => { window.print(); window.close(); }
        </script>
      </body>
      </html>
    `

    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (printWindow) {
      printWindow.document.write(html)
      printWindow.document.close()
    }

    setExporting(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground text-sm">Exportar nota</h2>
            <p className="text-xs text-muted mt-0.5 truncate max-w-[220px]">{title}</p>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Opciones */}
        <div className="p-4 flex flex-col gap-3">
          {/* Markdown */}
          <button
            type="button"
            onClick={handleMarkdown}
            disabled={exporting !== null}
            className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-accent/40 hover:bg-elevated transition cursor-pointer text-left disabled:opacity-50"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
              <FileText size={20} className="text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">Markdown</p>
              <p className="text-xs text-muted mt-0.5">Archivo .md compatible con cualquier editor</p>
            </div>
            {exporting === 'md' && <Loader2 size={16} className="text-muted animate-spin ml-auto shrink-0" />}
          </button>

          {/* PDF */}
          <button
            type="button"
            onClick={handlePdf}
            disabled={exporting !== null}
            className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-accent/40 hover:bg-elevated transition cursor-pointer text-left disabled:opacity-50"
          >
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center shrink-0">
              <FileDown size={20} className="text-red-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">PDF</p>
              <p className="text-xs text-muted mt-0.5">Abre el diálogo de impresión del navegador</p>
            </div>
            {exporting === 'pdf' && <Loader2 size={16} className="text-muted animate-spin ml-auto shrink-0" />}
          </button>
        </div>
      </div>
    </div>
  )
}
````

## File: components/editor/NoteActionsMenu.tsx
````typescript
'use client'

import { useRef, useState, useEffect } from 'react'
import {
  MoreHorizontal, FolderInput, Copy, LayoutTemplate,
  Download, History, Maximize2, Minimize2, Trash2, Star, Loader2,
} from 'lucide-react'
import { trashNote, toggleFavorite, createNote, updateNote } from '@/lib/supabase/notes'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import type { Note } from '@/types'

interface NoteActionsMenuProps {
  note: Note
  onExport: () => void
  onVersions: () => void
  onSaveTemplate: () => void
  onMove: () => void
}

export default function NoteActionsMenu({
  note,
  onExport,
  onVersions,
  onSaveTemplate,
  onMove,
}: NoteActionsMenuProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const { updateNote: updateNoteStore, deleteNote, setSelectedNote, addNote } = useNoteStore()
  const { isFocusMode, setFocusMode } = useUIStore()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const run = async (key: string, fn: () => Promise<void>) => {
    setLoading(key)
    setOpen(false)
    try {
      await fn()
    } catch {
      // error silencioso
    } finally {
      setLoading(null)
    }
  }

  const handleFavorite = () =>
    run('fav', async () => {
      const newVal = !note.is_favorite
      await toggleFavorite(note.id, newVal)
      updateNoteStore(note.id, { is_favorite: newVal })
    })

  const handleDuplicate = () =>
    run('dup', async () => {
      if (!note.notebook_id) return
      const newNote = await createNote(note.notebook_id)
      await updateNote(newNote.id, { title: `${note.title} (copia)`, content: note.content })
      const populated = { ...newNote, title: `${note.title} (copia)`, content: note.content }
      addNote(populated)
      setSelectedNote(populated)
    })

  const handleTrash = () =>
    run('trash', async () => {
      await trashNote(note.id)
      deleteNote(note.id)
    })

  const wrap = (fn: () => void) => {
    fn()
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title="Más opciones"
        onClick={() => setOpen(!open)}
        disabled={loading !== null}
        className={`p-1.5 rounded transition cursor-pointer ${
          open
            ? 'bg-elevated text-foreground'
            : 'text-muted hover:bg-surface hover:text-foreground'
        } disabled:opacity-40`}
      >
        {loading ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <MoreHorizontal size={15} />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-50 bg-panel border border-border rounded-xl shadow-2xl w-52 py-1 overflow-hidden">

          {/* Favorito */}
          <button
            type="button"
            onClick={handleFavorite}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <Star
              size={13}
              className={note.is_favorite ? 'text-yellow-400 fill-yellow-400' : ''}
            />
            {note.is_favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
          </button>

          <div className="my-1 h-px bg-border mx-2" />

          {/* Mover */}
          <button
            type="button"
            onClick={() => wrap(onMove)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <FolderInput size={13} />
            Mover a...
          </button>

          {/* Duplicar */}
          <button
            type="button"
            onClick={handleDuplicate}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <Copy size={13} />
            Duplicar nota
          </button>

          {/* Guardar como plantilla */}
          <button
            type="button"
            onClick={() => wrap(onSaveTemplate)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <LayoutTemplate size={13} />
            Guardar como plantilla
          </button>

          <div className="my-1 h-px bg-border mx-2" />

          {/* Exportar */}
          <button
            type="button"
            onClick={() => wrap(onExport)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <Download size={13} />
            Exportar nota
          </button>

          {/* Historial */}
          <button
            type="button"
            onClick={() => wrap(onVersions)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            <History size={13} />
            Historial de versiones
          </button>

          {/* Focus mode */}
          <button
            type="button"
            onClick={() => { setFocusMode(!isFocusMode); setOpen(false) }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
          >
            {isFocusMode ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            {isFocusMode ? 'Salir del modo enfoque' : 'Modo enfoque'}
          </button>

          <div className="my-1 h-px bg-border mx-2" />

          {/* Papelera */}
          <button
            type="button"
            onClick={handleTrash}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-danger hover:bg-danger/10 transition cursor-pointer"
          >
            <Trash2 size={13} />
            Mover a papelera
          </button>
        </div>
      )}
    </div>
  )
}
````

## File: components/editor/NoteCover.tsx
````typescript
'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Trash2, RefreshCw, Loader2, X } from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'
import { updateCover } from '@/lib/supabase/notes'
import { uploadNoteCover } from '@/lib/supabase/storage'

const GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
]

type Tab = 'gradients' | 'upload'

interface NoteCoverProps {
  noteId: string
  coverUrl: string | null | undefined
  coverGradient: string | null | undefined
  editable: boolean
}

export default function NoteCover({ noteId, coverUrl, coverGradient, editable }: NoteCoverProps) {
  const { updateNote } = useNoteStore()
  const [pickerOpen, setPickerOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('gradients')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const hasCover = Boolean(coverUrl || coverGradient)

  const apply = async (data: { cover_url: string | null; cover_gradient: string | null }) => {
    const prev = { cover_url: coverUrl ?? null, cover_gradient: coverGradient ?? null }
    updateNote(noteId, data) // optimista
    try {
      await updateCover(noteId, data)
    } catch {
      updateNote(noteId, prev) // rollback
    }
  }

  const handleGradient = (g: string) => {
    setPickerOpen(false)
    apply({ cover_gradient: g, cover_url: null })
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setError(null)
    setUploading(true)
    try {
      const url = await uploadNoteCover(file, noteId)
      await apply({ cover_url: url, cover_gradient: null })
      setPickerOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo subir la imagen')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const handleRemove = () => {
    apply({ cover_url: null, cover_gradient: null })
  }

  const openPicker = () => {
    setError(null)
    setTab('gradients')
    setPickerOpen(true)
  }

  return (
    <>
      {hasCover ? (
        <div
          className="relative w-full h-[180px] rounded-t-lg bg-cover bg-center mb-3 group/cover"
          style={
            coverUrl
              ? { backgroundImage: `url(${coverUrl})` }
              : { background: coverGradient ?? undefined }
          }
        >
          {editable && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 opacity-0 group-hover/cover:opacity-100 transition">
              <button
                type="button"
                onClick={openPicker}
                className="flex items-center gap-1 text-xs bg-panel/90 backdrop-blur border border-border text-foreground px-2.5 py-1.5 rounded-md hover:bg-panel transition cursor-pointer shadow-md"
              >
                <RefreshCw size={12} /> Cambiar portada
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="flex items-center gap-1 text-xs bg-panel/90 backdrop-blur border border-border text-danger px-2.5 py-1.5 rounded-md hover:bg-danger/10 transition cursor-pointer shadow-md"
              >
                <Trash2 size={12} /> Quitar portada
              </button>
            </div>
          )}
        </div>
      ) : (
        editable && (
          <div className="h-12 flex items-center mb-1">
            <button
              type="button"
              onClick={openPicker}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground opacity-0 group-hover/head:opacity-100 transition px-2 py-1 -mx-2 rounded-md hover:bg-surface cursor-pointer"
            >
              <ImagePlus size={14} /> Añadir portada
            </button>
          </div>
        )
      )}

      {pickerOpen && editable && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setPickerOpen(false)}
        >
          <div
            className="w-full max-w-md bg-panel border border-border rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con tabs */}
            <div className="flex items-center justify-between px-4 pt-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setTab('gradients')}
                  className={`text-xs px-3 py-1.5 rounded-md transition cursor-pointer ${
                    tab === 'gradients'
                      ? 'bg-surface text-foreground'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  Gradientes
                </button>
                <button
                  type="button"
                  onClick={() => setTab('upload')}
                  className={`text-xs px-3 py-1.5 rounded-md transition cursor-pointer ${
                    tab === 'upload'
                      ? 'bg-surface text-foreground'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  Subir imagen
                </button>
              </div>
              <button
                type="button"
                title="Cerrar"
                onClick={() => setPickerOpen(false)}
                className="p-1 rounded-md text-muted hover:text-foreground hover:bg-surface transition cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            <div className="p-4">
              {tab === 'gradients' ? (
                <div className="grid grid-cols-2 gap-2.5">
                  {GRADIENTS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleGradient(g)}
                      style={{ background: g }}
                      className="h-[60px] w-full rounded-lg cursor-pointer ring-1 ring-border hover:ring-2 hover:ring-accent transition"
                      aria-label="Aplicar gradiente"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 py-4">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    title="Seleccionar imagen de portada"
                    className="hidden"
                    onChange={handleFile}
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex items-center gap-2 text-sm bg-surface hover:bg-elevated text-foreground px-4 py-2.5 rounded-lg transition cursor-pointer disabled:opacity-50"
                  >
                    {uploading ? <Loader2 size={15} className="animate-spin" /> : <ImagePlus size={15} />}
                    {uploading ? 'Subiendo...' : 'Seleccionar imagen'}
                  </button>
                  <p className="text-[11px] text-subtle">PNG, JPG o GIF · máximo 5MB</p>
                  {error && <p className="text-xs text-danger text-center">{error}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
````

## File: components/editor/NoteEmojiButton.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { Smile } from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'
import { updateNoteEmoji } from '@/lib/supabase/notes'

const FREQUENT_EMOJIS = [
  '📝', '✏️', '📌', '📎', '🔖', '💡', '🎯', '🔍',
  '📊', '📈', '🗒️', '📅', '✅', '🚀', '💬', '🎨',
  '🧠', '💼', '🏠', '🌟', '⭐', '🎉', '🔥', '💎',
  '🌈', '🌸', '🍀', '☕', '🎁', '❤️', '🌙', '☀️',
  '⚡', '🎵', '📚', '🏆', '🔔', '💭', '🌺', '🦋',
]

interface NoteEmojiButtonProps {
  noteId: string
  emoji: string | null | undefined
  editable: boolean
}

export default function NoteEmojiButton({ noteId, emoji, editable }: NoteEmojiButtonProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { updateNote } = useNoteStore()

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const apply = async (value: string | null) => {
    setOpen(false)
    const prev = emoji ?? null
    updateNote(noteId, { emoji: value }) // optimista
    try {
      await updateNoteEmoji(noteId, value)
    } catch {
      updateNote(noteId, { emoji: prev }) // rollback
    }
  }

  // Lectores (rol viewer): mostrar el emoji si existe, sin interacción
  if (!editable) {
    return emoji ? <div className="text-[32px] leading-none mb-2">{emoji}</div> : null
  }

  return (
    <div className="relative mb-2" ref={ref}>
      {emoji ? (
        <button
          type="button"
          title="Cambiar emoji"
          onClick={() => setOpen((v) => !v)}
          className="text-[32px] leading-none rounded-lg px-1 -mx-1 hover:bg-surface transition cursor-pointer"
        >
          {emoji}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground opacity-0 group-hover/head:opacity-100 transition px-2 py-1 -mx-2 rounded-md hover:bg-surface cursor-pointer"
        >
          <Smile size={14} /> Añadir emoji
        </button>
      )}

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-panel border border-border rounded-xl shadow-2xl p-2 w-[296px]">
          <div className="grid grid-cols-8 gap-0.5">
            {FREQUENT_EMOJIS.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => apply(e)}
                className="text-xl h-8 w-8 flex items-center justify-center rounded-md hover:bg-surface transition cursor-pointer"
              >
                {e}
              </button>
            ))}
          </div>
          {emoji && (
            <>
              <div className="my-1 h-px bg-border" />
              <button
                type="button"
                onClick={() => apply(null)}
                className="w-full text-left text-xs text-muted hover:text-danger px-2 py-1.5 rounded-md hover:bg-surface transition cursor-pointer"
              >
                Quitar emoji
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
````

## File: components/editor/NoteLinkComponent.tsx
````typescript
'use client'

import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { Link } from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'

export default function NoteLinkComponent({ node }: NodeViewProps) {
  const { notes, setSelectedNote } = useNoteStore()
  const { noteId, title } = node.attrs as { noteId: string; title: string }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const note = notes.find((n) => n.id === noteId)
    if (note) setSelectedNote(note)
  }

  return (
    <NodeViewWrapper as="span" className="inline-block">
      <span
        contentEditable={false}
        onClick={handleClick}
        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-accent/15 text-accent border border-accent/30 cursor-pointer hover:bg-accent/25 transition-colors mx-0.5 select-none"
      >
        <Link size={10} />
        {title || 'Nota eliminada'}
      </span>
    </NodeViewWrapper>
  )
}
````

## File: components/editor/NoteLinkMenu.tsx
````typescript
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Editor } from '@tiptap/react'
import { useNoteStore } from '@/store/noteStore'
import type { Note } from '@/types'

interface NoteLinkMenuProps {
  editor: Editor
  query: string
  anchor: { top: number; left: number }
  onClose: () => void
}

export default function NoteLinkMenu({ editor, query, anchor, onClose }: NoteLinkMenuProps) {
  const { notes } = useNoteStore()
  const [activeIdx, setActiveIdx] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return notes
      .filter((n) => !n.is_trashed && n.title.toLowerCase().includes(q))
      .slice(0, 8)
  }, [notes, query])

  useEffect(() => { setActiveIdx(0) }, [filtered.length])

  const insertLink = (note: Note) => {
    const { from } = editor.state.selection
    const textBefore = editor.state.doc.textBetween(Math.max(0, from - 200), from)
    const match = /\[\[([^\]]*)$/.exec(textBefore)
    if (match) {
      const deleteFrom = from - match[0].length
      editor
        .chain()
        .focus()
        .deleteRange({ from: deleteFrom, to: from })
        .insertContent({
          type: 'noteLink',
          attrs: { noteId: note.id, title: note.title },
        })
        .run()
    }
    onClose()
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx((i) => Math.min(i + 1, filtered.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filtered[activeIdx]) insertLink(filtered[activeIdx])
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handler, true)
    return () => window.removeEventListener('keydown', handler, true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered, activeIdx, onClose])

  if (filtered.length === 0) {
    return (
      <div
        ref={containerRef}
        style={{ top: anchor.top, left: anchor.left }}
        className="fixed z-50 bg-panel border border-border rounded-lg shadow-xl p-3 text-sm text-muted min-w-[200px]"
      >
        Sin notas encontradas
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{ top: anchor.top, left: anchor.left }}
      className="fixed z-50 bg-panel border border-border rounded-lg shadow-xl overflow-hidden min-w-[220px] max-w-[300px]"
    >
      <div className="p-1">
        {filtered.map((note, i) => (
          <button
            key={note.id}
            type="button"
            onMouseDown={(e) => { e.preventDefault(); insertLink(note) }}
            className={`w-full text-left px-3 py-1.5 rounded text-sm truncate transition-colors ${
              i === activeIdx
                ? 'bg-accent text-white'
                : 'text-foreground hover:bg-surface'
            }`}
          >
            {note.emoji && <span className="mr-1.5">{note.emoji}</span>}
            {note.title}
          </button>
        ))}
      </div>
    </div>
  )
}
````

## File: components/editor/NoteTypographyPopover.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { Type, Minus, Plus, RotateCcw } from 'lucide-react'
import {
  EDITOR_FONTS,
  LINE_HEIGHT_OPTIONS,
  MIN_EDITOR_FONT_SIZE,
  MAX_EDITOR_FONT_SIZE,
} from '@/lib/constants/editor-fonts'
import { useNoteStore } from '@/store/noteStore'
import { useProfileStore } from '@/store/profileStore'
import { updateNoteTypography } from '@/lib/supabase/notes'
import ToolbarTooltip from './ToolbarTooltip'

interface NoteTypographyPopoverProps {
  noteId: string
  // Valores guardados en la nota (null = hereda el default global).
  noteFontFamily: string | null
  noteFontSize: number | null
  noteLineHeight: number | null
  // Valores EFECTIVOS que se muestran y editan (valor de la nota ?? global).
  effectiveFontFamily: string
  effectiveFontSize: number
  effectiveLineHeight: number
}

/**
 * Popover "Aa" del editor (Phase 17 id:61). Configura la tipografía de ESTA NOTA
 * (familia + tamaño + interlineado), persistida en las columnas note_font_* de la
 * tabla notes. Si la nota no tiene override, hereda el default global de
 * Configuración. Cambios optimistas vía el store → el editor se actualiza en vivo.
 */
export default function NoteTypographyPopover({
  noteId,
  noteFontFamily,
  noteFontSize,
  noteLineHeight,
  effectiveFontFamily,
  effectiveFontSize,
  effectiveLineHeight,
}: NoteTypographyPopoverProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const updateNoteStore = useNoteStore((s) => s.updateNote)
  const setEditorFontFamily = useProfileStore((s) => s.setEditorFontFamily)
  const setEditorFontSize = useProfileStore((s) => s.setEditorFontSize)
  const setEditorLineHeight = useProfileStore((s) => s.setEditorLineHeight)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  // ¿Usa override propio o hereda el global?
  const isInheriting =
    noteFontFamily === null && noteFontSize === null && noteLineHeight === null

  // Persiste cambios de la nota y los refleja en vivo vía el store (optimista).
  const applyToNote = async (patch: {
    fontFamily?: string | null
    fontSize?: number | null
    lineHeight?: number | null
  }) => {
    setError(null)
    const storePatch: Record<string, string | number | null> = {}
    if ('fontFamily' in patch) storePatch.note_font_family = patch.fontFamily ?? null
    if ('fontSize' in patch) storePatch.note_font_size = patch.fontSize ?? null
    if ('lineHeight' in patch) storePatch.note_line_height = patch.lineHeight ?? null
    updateNoteStore(noteId, storePatch)
    try {
      await updateNoteTypography(noteId, patch)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar la tipografía')
    }
  }

  const handleSize = (next: number) => {
    const clamped = Math.min(MAX_EDITOR_FONT_SIZE, Math.max(MIN_EDITOR_FONT_SIZE, next))
    if (clamped === effectiveFontSize) return
    void applyToNote({ fontSize: clamped })
  }

  const handleReset = () =>
    void applyToNote({ fontFamily: null, fontSize: null, lineHeight: null })

  const handleUseForAll = async () => {
    setError(null)
    try {
      // Captura los efectivos actuales como nuevo default global (user_profiles).
      await setEditorFontFamily(effectiveFontFamily)
      await setEditorFontSize(effectiveFontSize)
      await setEditorLineHeight(effectiveLineHeight)
      // La nota vuelve a heredar el global → mismo resultado visual.
      await applyToNote({ fontFamily: null, fontSize: null, lineHeight: null })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al aplicar a todas las notas')
    }
  }

  return (
    <div className="relative" ref={ref}>
      <ToolbarTooltip label="Tipografía de la nota">
        <button
          type="button"
          aria-label="Tipografía de la nota"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1 px-2 py-1.5 rounded text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
        >
          <Type size={14} />
          <span className="font-semibold">Aa</span>
        </button>
      </ToolbarTooltip>

      {open && (
        <div className="absolute left-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-2xl w-72 p-4">
          <p className="text-xs font-semibold text-foreground mb-0.5">Tipografía de la nota</p>
          <p className="text-[11px] text-subtle mb-3">
            {isInheriting ? 'Heredando el predeterminado' : 'Personalizada para esta nota'}
          </p>

          {error && (
            <div className="mb-3 px-2.5 py-2 bg-danger/10 border border-danger/20 rounded-lg text-[11px] text-danger">
              {error}
            </div>
          )}

          {/* Familia */}
          <p className="text-[11px] font-medium text-muted mb-1.5">Fuente</p>
          <div className="grid grid-cols-3 gap-1.5 mb-4">
            {EDITOR_FONTS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => void applyToNote({ fontFamily: f.key })}
                style={{ fontFamily: f.stack }}
                className={`py-2 px-2 rounded-lg border text-xs transition cursor-pointer truncate ${
                  effectiveFontFamily === f.key
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface text-muted hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Tamaño */}
          <p className="text-[11px] font-medium text-muted mb-1.5">Tamaño</p>
          <div className="flex items-center gap-2 mb-4">
            <button
              type="button"
              aria-label="Reducir tamaño"
              onClick={() => handleSize(effectiveFontSize - 1)}
              disabled={effectiveFontSize <= MIN_EDITOR_FONT_SIZE}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <Minus size={14} />
            </button>
            <span className="w-14 text-center text-sm font-medium text-foreground tabular-nums">
              {effectiveFontSize}px
            </span>
            <button
              type="button"
              aria-label="Aumentar tamaño"
              onClick={() => handleSize(effectiveFontSize + 1)}
              disabled={effectiveFontSize >= MAX_EDITOR_FONT_SIZE}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <Plus size={14} />
            </button>
            <span
              className="ml-1 text-foreground leading-none"
              style={{ fontSize: `${effectiveFontSize}px` }}
            >
              Aa
            </span>
          </div>

          {/* Interlineado */}
          <p className="text-[11px] font-medium text-muted mb-1.5">Interlineado</p>
          <div className="grid grid-cols-3 gap-1.5 mb-4">
            {LINE_HEIGHT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => void applyToNote({ lineHeight: opt.value })}
                className={`py-2 px-2 rounded-lg border text-xs font-medium transition cursor-pointer ${
                  effectiveLineHeight === opt.value
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border bg-surface text-muted hover:text-foreground'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Acciones */}
          <div className="pt-3 border-t border-border">
            <button
              type="button"
              onClick={handleReset}
              disabled={isInheriting}
              className="flex items-center gap-1 text-[11px] text-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <RotateCcw size={11} />
              Restablecer a predeterminado
            </button>
            <button
              type="button"
              onClick={handleUseForAll}
              className="mt-3 w-full py-2 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent-light transition cursor-pointer"
            >
              Usar para todas mis notas
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
````

## File: components/editor/TableToolbar.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import type { Editor } from '@tiptap/react'
import { Trash2, Plus, Minus } from 'lucide-react'

interface Props {
  editor: Editor
}

export default function TableToolbar({ editor }: Props) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const update = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const inTable = editor.isActive('table')
        if (!inTable) {
          setVisible(false)
          return
        }
        try {
          const { from } = editor.state.selection
          const domPos = editor.view.domAtPos(from)
          let node: HTMLElement | null = domPos.node as HTMLElement
          while (node && node.nodeName !== 'TABLE') {
            node = node.parentElement
          }
          if (!node) { setVisible(false); return }
          const rect = node.getBoundingClientRect()
          setPosition({ top: rect.top - 44, left: rect.left })
          setVisible(true)
        } catch {
          setVisible(false)
        }
      })
    }

    editor.on('selectionUpdate', update)
    editor.on('transaction', update)
    return () => {
      editor.off('selectionUpdate', update)
      editor.off('transaction', update)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [editor])

  if (!visible) return null

  return (
    <div
      style={{ position: 'fixed', top: position.top, left: position.left, zIndex: 50 }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="flex items-center gap-0.5 bg-panel border border-border rounded-xl px-2 py-1.5 shadow-2xl">
        {/* Rows */}
        <span className="text-[10px] text-subtle uppercase tracking-wider px-1">Fila</span>
        <button
          type="button"
          title="Insertar fila encima"
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Plus size={12} />
        </button>
        <button
          type="button"
          title="Insertar fila debajo"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Plus size={12} className="rotate-180" />
        </button>
        <button
          type="button"
          title="Eliminar fila"
          onClick={() => editor.chain().focus().deleteRow().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Minus size={12} />
        </button>

        <div className="w-px h-4 bg-border/60 mx-1" />

        {/* Columns */}
        <span className="text-[10px] text-subtle uppercase tracking-wider px-1">Col</span>
        <button
          type="button"
          title="Insertar columna a la izquierda"
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Plus size={12} />
        </button>
        <button
          type="button"
          title="Insertar columna a la derecha"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Plus size={12} />
        </button>
        <button
          type="button"
          title="Eliminar columna"
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className="p-1 rounded hover:bg-surface text-muted hover:text-foreground transition cursor-pointer"
        >
          <Minus size={12} />
        </button>

        <div className="w-px h-4 bg-border/60 mx-1" />

        {/* Delete whole table */}
        <button
          type="button"
          title="Eliminar tabla"
          onClick={() => editor.chain().focus().deleteTable().run()}
          className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition text-xs cursor-pointer"
        >
          <Trash2 size={12} />
          <span>Eliminar</span>
        </button>
      </div>
    </div>
  )
}
````

## File: components/editor/TocComponent.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { BookOpen, Trash2 } from 'lucide-react'

interface TocItem {
  level: number
  text: string
}

export default function TocComponent({ editor, deleteNode, selected }: NodeViewProps) {
  const [items, setItems] = useState<TocItem[]>([])

  useEffect(() => {
    if (!editor) return

    const build = () => {
      const headings: TocItem[] = []
      editor.state.doc.descendants((node) => {
        if (node.type.name === 'heading') {
          headings.push({
            level: node.attrs.level as number,
            text: node.textContent,
          })
        }
      })
      setItems(headings)
    }

    build()
    editor.on('update', build)
    return () => {
      editor.off('update', build)
    }
  }, [editor])

  return (
    <NodeViewWrapper>
      <div
        className={`my-4 rounded-xl border border-border bg-panel overflow-hidden ${
          selected ? 'ring-1 ring-accent/30' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface/40">
          <div className="flex items-center gap-2">
            <BookOpen size={13} className="text-muted" />
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Tabla de contenidos
            </span>
          </div>
          <button
            type="button"
            title="Eliminar tabla de contenidos"
            onMouseDown={(e) => e.preventDefault()}
            onClick={deleteNode}
            className="p-1 text-subtle hover:text-danger transition cursor-pointer rounded"
          >
            <Trash2 size={13} />
          </button>
        </div>

        {/* Items */}
        <div className="px-4 py-3">
          {items.length === 0 ? (
            <p className="text-xs text-subtle italic">
              Sin títulos aún. Añade encabezados (H1, H2, H3) para generar el índice.
            </p>
          ) : (
            <ul className="space-y-1">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted hover:text-foreground transition"
                  style={{ paddingLeft: `${(item.level - 1) * 14}px` }}
                >
                  <span className="text-subtle text-xs mt-0.5 shrink-0 leading-none">
                    {item.level === 1 ? '—' : item.level === 2 ? '·' : '›'}
                  </span>
                  <span className={item.level === 1 ? 'text-foreground font-medium' : ''}>
                    {item.text || '(sin texto)'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </NodeViewWrapper>
  )
}
````

## File: components/editor/ToggleComponent.tsx
````typescript
'use client'

import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { ChevronRight, ChevronDown } from 'lucide-react'

export default function ToggleComponent({
  node,
  updateAttributes,
  selected,
}: NodeViewProps) {
  const title = (node.attrs.title as string) || 'Toggle'
  const isOpen = node.attrs.open !== false

  return (
    <NodeViewWrapper>
      <div className={`my-2 rounded-lg transition ${selected ? 'ring-1 ring-accent/30' : ''}`}>
        {/* Header row */}
        <div className="flex items-center gap-2 py-1 group">
          <button
            type="button"
            title={isOpen ? 'Colapsar' : 'Expandir'}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => updateAttributes({ open: !isOpen })}
            className="p-0.5 text-muted hover:text-foreground transition cursor-pointer shrink-0 rounded"
          >
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          <input
            type="text"
            value={title}
            onChange={(e) => updateAttributes({ title: e.target.value })}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Escribe un título..."
            className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none min-w-0"
            style={{ color: 'var(--color-foreground)' }}
          />
        </div>

        {/* Collapsible body — always in DOM so TipTap can manage content */}
        <div
          className={`ml-6 pl-4 border-l-2 border-border overflow-hidden transition-all duration-150 ${
            isOpen ? 'min-h-[1.5rem] opacity-100' : 'h-0 opacity-0 pointer-events-none'
          }`}
        >
          <NodeViewContent className="py-1" />
        </div>
      </div>
    </NodeViewWrapper>
  )
}
````

## File: components/editor/ToolbarTooltip.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'

interface ToolbarTooltipProps {
  label: string
  shortcut?: string
  children: React.ReactNode
}

/**
 * Tooltip ligero CSS-puro para botones de toolbar. No depende de Radix.
 * Muestra el label tras un delay de 400ms; opcionalmente un atajo en <kbd>.
 */
export default function ToolbarTooltip({ label, shortcut, children }: ToolbarTooltipProps) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const handleEnter = () => {
    clear()
    timerRef.current = setTimeout(() => setVisible(true), 400)
  }

  const handleLeave = () => {
    clear()
    setVisible(false)
  }

  useEffect(() => clear, [])

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseDown={handleLeave}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+6px)] z-50 flex items-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-elevated px-2 py-1 text-xs text-foreground shadow-xl"
        >
          {label}
          {shortcut && (
            <kbd className="rounded border border-border bg-surface px-1 py-0.5 text-[10px] font-mono text-muted">
              {shortcut}
            </kbd>
          )}
        </span>
      )}
    </span>
  )
}
````

## File: components/KeyboardShortcutsCheatsheet.tsx
````typescript
'use client'

import { useUIStore } from '@/store/uiStore'
import { X } from 'lucide-react'

interface Shortcut {
  keys: string[]
  description: string
}

const SHORTCUTS: { category: string; items: Shortcut[] }[] = [
  {
    category: 'Navegación',
    items: [
      { keys: ['Ctrl', 'Shift', 'E'], description: 'Nueva nota' },
      { keys: ['Ctrl', 'K'], description: 'Buscar notas' },
      { keys: ['Ctrl', 'Shift', 'F'], description: 'Modo enfoque' },
      { keys: ['?'], description: 'Mostrar atajos' },
      { keys: ['Esc'], description: 'Cerrar panel / modal' },
    ],
  },
  {
    category: 'Editor',
    items: [
      { keys: ['Ctrl', 'B'], description: 'Negrita' },
      { keys: ['Ctrl', 'I'], description: 'Cursiva' },
      { keys: ['Ctrl', 'U'], description: 'Subrayado' },
      { keys: ['Ctrl', 'Z'], description: 'Deshacer' },
      { keys: ['Ctrl', 'Shift', 'Z'], description: 'Rehacer' },
    ],
  },
]

function Key({ label }: { label: string }) {
  return (
    <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-muted bg-elevated border border-border rounded-md">
      {label}
    </kbd>
  )
}

export default function KeyboardShortcutsCheatsheet() {
  const { isCheatsheetOpen, setCheatsheetOpen } = useUIStore()

  if (!isCheatsheetOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setCheatsheetOpen(false)}
    >
      <div
        className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground">Atajos de teclado</h2>
            <p className="text-xs text-muted mt-0.5">Pulsa <Key label="?" /> en cualquier momento para ver esto</p>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={() => setCheatsheetOpen(false)}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Grid de atajos */}
        <div className="grid grid-cols-2 divide-x divide-border">
          {SHORTCUTS.map((section) => (
            <div key={section.category} className="px-6 py-5">
              <p className="text-[10px] font-semibold text-subtle uppercase tracking-wider mb-3">
                {section.category}
              </p>
              <div className="space-y-2.5">
                {section.items.map((shortcut) => (
                  <div
                    key={shortcut.description}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-xs text-muted">{shortcut.description}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      {shortcut.keys.map((key, i) => (
                        <Key key={i} label={key} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
````

## File: components/notes/AdvancedSearchPanel.tsx
````typescript
'use client'

import { useState, useEffect, useRef, type ReactNode, type ChangeEvent } from 'react'
import {
  Search, X, SlidersHorizontal, BookOpen, Star, Loader2, FileSearch, Tag as TagIcon,
} from 'lucide-react'
import { useNotebookStore } from '@/store/notebookStore'
import { useTagStore } from '@/store/tagStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import { searchNotesAdvanced } from '@/lib/supabase/search'
import { getAllNotesWithNotebook } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { Note } from '@/types'

const DEBOUNCE_MS = 400
const SNIPPET_LENGTH = 400

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Builds a snippet centered on the first match and wraps matches in <mark>.
 *  Uses React nodes (not dangerouslySetInnerHTML) to stay XSS-safe. */
function renderSnippet(text: string, query: string): ReactNode {
  const trimmed = query.trim()
  if (!text) return 'Sin contenido'
  if (!trimmed) return text

  const lower = text.toLowerCase()
  const needle = trimmed.toLowerCase()
  const first = lower.indexOf(needle)

  let snippet = text
  let prefix = ''
  if (first > 70) {
    snippet = text.slice(first - 60)
    prefix = '…'
  }

  const snippetLower = snippet.toLowerCase()
  const nodes: ReactNode[] = []
  let cursor = 0
  let key = 0
  while (cursor < snippet.length) {
    const found = snippetLower.indexOf(needle, cursor)
    if (found === -1) {
      nodes.push(snippet.slice(cursor))
      break
    }
    if (found > cursor) nodes.push(snippet.slice(cursor, found))
    nodes.push(
      <mark key={key++} className="bg-accent/25 text-foreground rounded-sm px-0.5">
        {snippet.slice(found, found + trimmed.length)}
      </mark>,
    )
    cursor = found + trimmed.length
  }

  return (
    <>
      {prefix}
      {nodes}
    </>
  )
}

export default function AdvancedSearchPanel() {
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { tags } = useTagStore()
  const { setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  const [query, setQuery] = useState('')
  const [notebookId, setNotebookId] = useState('')
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  const [results, setResults] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const requestId = useRef(0)

  const hasActiveFilters =
    query.trim() !== '' ||
    notebookId !== '' ||
    selectedTagIds.length > 0 ||
    dateFrom !== '' ||
    dateTo !== '' ||
    favoritesOnly

  useEffect(() => {
    const handle = setTimeout(async () => {
      const reqId = ++requestId.current
      setLoading(true)
      setError(null)
      try {
        // Any active filter goes through the RPC so filters combine (AND),
        // including filters without a text query. The plain listing is only
        // used for the empty initial state.
        const data: Note[] = hasActiveFilters
          ? await searchNotesAdvanced({
              query,
              notebookId: notebookId || null,
              tagIds: selectedTagIds,
              dateFrom: dateFrom || null,
              dateTo: dateTo || null,
              isFavorite: favoritesOnly ? true : undefined,
            })
          : await getAllNotesWithNotebook()

        if (reqId === requestId.current) setResults(data)
      } catch {
        if (reqId === requestId.current) {
          setError('No se pudieron cargar los resultados. Inténtalo de nuevo.')
          setResults([])
        }
      } finally {
        if (reqId === requestId.current) setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => clearTimeout(handle)
  }, [query, notebookId, selectedTagIds, dateFrom, dateTo, favoritesOnly, hasActiveFilters])

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
    )
  }

  const clearFilters = () => {
    setQuery('')
    setNotebookId('')
    setSelectedTagIds([])
    setDateFrom('')
    setDateTo('')
    setFavoritesOnly(false)
  }

  const handleResultClick = (note: Note) => {
    setSelectedNote(note)
    const notebook = notebooks.find((nb) => nb.id === note.notebook_id)
    if (notebook) setSelectedNotebook(notebook)
    setCurrentView('notebooks')
  }

  const inputBase =
    'w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/40 transition'
  const labelBase = 'block text-[11px] font-medium text-muted mb-1.5 uppercase tracking-wide'

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-3xl mx-auto px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
              <SlidersHorizontal size={18} className="text-accent" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Búsqueda avanzada</h1>
              <p className="text-xs text-muted">Combina filtros para encontrar notas</p>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-foreground hover:bg-surface transition cursor-pointer shrink-0"
            >
              <X size={13} />
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-panel border border-border rounded-2xl p-5 flex flex-col gap-4">
          {/* Text search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border focus-within:ring-1 focus-within:ring-accent/40 transition">
            <Search size={15} className="text-muted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Buscar por texto..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none min-w-0"
              style={{ color: 'var(--color-foreground)' }}
            />
            {query && (
              <button
                type="button"
                title="Limpiar texto"
                onClick={() => setQuery('')}
                className="text-muted hover:text-foreground transition cursor-pointer shrink-0"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Notebook + favorites */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[180px]">
              <label className={labelBase}>Libreta</label>
              <select
                value={notebookId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setNotebookId(e.target.value)}
                className={`${inputBase} cursor-pointer`}
              >
                <option value="">Todas las libretas</option>
                {notebooks.map((nb) => (
                  <option key={nb.id} value={nb.id}>
                    {nb.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <span className={labelBase}>Favoritos</span>
              <button
                type="button"
                onClick={() => setFavoritesOnly((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition cursor-pointer ${
                  favoritesOnly
                    ? 'bg-accent text-white border-accent'
                    : 'bg-surface text-muted border-border hover:text-foreground'
                }`}
              >
                <Star size={14} className={favoritesOnly ? 'fill-white' : ''} />
                Solo favoritos
              </button>
            </div>
          </div>

          {/* Date range */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[150px]">
              <label className={labelBase}>Desde</label>
              <input
                type="date"
                value={dateFrom}
                max={dateTo || undefined}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)}
                className={`${inputBase} cursor-pointer`}
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className={labelBase}>Hasta</label>
              <input
                type="date"
                value={dateTo}
                min={dateFrom || undefined}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value)}
                className={`${inputBase} cursor-pointer`}
              />
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <span className={labelBase}>Etiquetas</span>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => {
                  const active = selectedTagIds.includes(tag.id)
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition cursor-pointer ${
                        active
                          ? 'bg-accent text-white border-accent'
                          : 'bg-surface text-muted border-border hover:text-foreground'
                      }`}
                    >
                      <TagIcon size={10} />
                      {tag.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted px-1">
            {loading
              ? 'Buscando…'
              : `${results.length} resultado${results.length !== 1 ? 's' : ''}`}
          </p>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={22} className="animate-spin text-muted" />
            </div>
          ) : !error && results.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-panel border border-border flex items-center justify-center">
                <FileSearch size={26} className="text-subtle" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">Sin resultados</p>
                <p className="text-muted text-xs mt-1">
                  Ajusta los filtros o prueba con otro término
                </p>
              </div>
            </div>
          ) : (
            results.map((note) => {
              const notebookName = notebooks.find((nb) => nb.id === note.notebook_id)?.name
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => handleResultClick(note)}
                  className="w-full text-left bg-panel border border-border rounded-xl p-4 hover:border-accent/40 hover:bg-surface transition cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {note.title || 'Sin título'}
                    </p>
                    {note.is_favorite && (
                      <Star size={12} className="text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                    )}
                  </div>
                  <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                    {renderSnippet(extractTextPreview(note.content, SNIPPET_LENGTH), query)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    {notebookName && (
                      <span className="text-[10px] text-accent flex items-center gap-1">
                        <BookOpen size={9} />
                        {notebookName}
                      </span>
                    )}
                    <span className="text-[10px] text-subtle">
                      {formatRelativeDate(note.updated_at)}
                    </span>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
````

## File: components/notes/ImportModal.tsx
````typescript
'use client'

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from 'react'
import { X, Upload, BookOpen, Search, Check, Loader2, FileText, AlertCircle, CheckCircle2 } from 'lucide-react'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import type { Note } from '@/types'

interface ImportModalProps {
  onClose: () => void
}

type ImportState = 'idle' | 'importing' | 'done' | 'error'

export default function ImportModal({ onClose }: ImportModalProps) {
  const { notebooks } = useNotebookStore()
  const { addNote } = useNoteStore()

  const [files, setFiles] = useState<File[]>([])
  const [notebookId, setNotebookId] = useState<string>(notebooks[0]?.id ?? '')
  const [notebookQuery, setNotebookQuery] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [state, setState] = useState<ImportState>('idle')
  const [importedCount, setImportedCount] = useState(0)
  const [failed, setFailed] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filteredNotebooks = notebooks.filter((nb) =>
    nb.name.toLowerCase().includes(notebookQuery.toLowerCase())
  )
  const selectedNotebook = notebooks.find((nb) => nb.id === notebookId)

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return
    const valid = Array.from(incoming).filter((f) => {
      const n = f.name.toLowerCase()
      return n.endsWith('.md') || n.endsWith('.enex')
    })
    setFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name))
      return [...prev, ...valid.filter((f) => !existingNames.has(f.name))]
    })
  }, [])

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }
  const onDragOver = (e: DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragging(true) }
  const onDragLeave = () => setIsDragging(false)
  const removeFile = (name: string) => setFiles((prev) => prev.filter((f) => f.name !== name))

  const handleImport = async () => {
    if (!files.length || !notebookId) return
    setState('importing')
    setFailed([])

    const fd = new FormData()
    fd.append('notebookId', notebookId)
    files.forEach((f) => fd.append('files', f))

    try {
      const res = await fetch('/api/import', { method: 'POST', body: fd })
      if (!res.ok) { setState('error'); return }
      const json = await res.json() as { imported: number; notes: Note[]; failed: string[] }
      json.notes.forEach((n) => addNote(n))
      setImportedCount(json.imported)
      setFailed(json.failed ?? [])
      setState('done')
    } catch {
      setState('error')
    }
  }

  const isImporting = state === 'importing'
  const canImport = files.length > 0 && !!notebookId && !isImporting

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 flex flex-col overflow-hidden"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <Upload size={16} className="text-accent" />
            <span className="font-semibold text-foreground text-sm">Importar notas</span>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 py-4 space-y-4">
          {/* Done state */}
          {state === 'done' && (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center">
                <CheckCircle2 size={24} className="text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {importedCount} nota{importedCount !== 1 ? 's' : ''} importada{importedCount !== 1 ? 's' : ''}
                </p>
                {failed.length > 0 && (
                  <p className="text-xs text-muted mt-1">
                    {failed.length} elemento{failed.length !== 1 ? 's' : ''} no pudo importarse
                  </p>
                )}
              </div>
              {failed.length > 0 && (
                <div className="w-full text-left bg-danger/5 border border-danger/20 rounded-xl p-3">
                  <p className="text-xs font-medium text-danger mb-1.5">Con errores:</p>
                  <ul className="space-y-0.5">
                    {failed.map((f) => (
                      <li key={f} className="text-xs text-muted flex items-center gap-1.5">
                        <AlertCircle size={11} className="text-danger shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent-light transition cursor-pointer font-medium"
              >
                Listo
              </button>
            </div>
          )}

          {state === 'error' && (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="w-12 h-12 rounded-full bg-danger/10 flex items-center justify-center">
                <AlertCircle size={24} className="text-danger" />
              </div>
              <p className="text-sm text-foreground font-medium">Error al importar</p>
              <p className="text-xs text-muted">Intenta de nuevo</p>
              <button
                type="button"
                onClick={() => setState('idle')}
                className="px-5 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent-light transition cursor-pointer font-medium"
              >
                Reintentar
              </button>
            </div>
          )}

          {(state === 'idle' || state === 'importing') && (
            <>
              {/* Drop zone */}
              <div>
                <p className="text-xs font-medium text-muted mb-2">
                  Archivos <span className="text-subtle">.md · .enex</span>
                </p>
                <div
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition ${
                    isDragging
                      ? 'border-accent bg-accent/5'
                      : 'border-border hover:border-accent/50 hover:bg-surface'
                  }`}
                >
                  <Upload size={20} className={isDragging ? 'text-accent' : 'text-muted'} />
                  <p className="text-sm text-foreground font-medium">
                    {isDragging ? 'Suelta aquí' : 'Arrastra archivos o haz click'}
                  </p>
                  <p className="text-xs text-muted">Markdown (.md) o exportación de Evernote (.enex)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".md,.enex"
                    multiple
                    className="sr-only"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => addFiles(e.target.files)}
                  />
                </div>
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-muted">
                    {files.length} archivo{files.length !== 1 ? 's' : ''} seleccionado{files.length !== 1 ? 's' : ''}
                  </p>
                  {files.map((f) => (
                    <div key={f.name} className="flex items-center gap-2.5 px-3 py-2 bg-surface border border-border rounded-lg">
                      <FileText size={13} className="text-accent shrink-0" />
                      <span className="text-sm text-foreground flex-1 truncate">{f.name}</span>
                      <span className="text-xs text-muted shrink-0">{(f.size / 1024).toFixed(0)} KB</span>
                      <button
                        type="button"
                        onClick={() => removeFile(f.name)}
                        className="text-muted hover:text-danger transition cursor-pointer shrink-0"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Notebook picker */}
              <div>
                <p className="text-xs font-medium text-muted mb-2">Libreta destino</p>
                <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border focus-within:border-accent/50 transition mb-2">
                  <Search size={12} className="text-muted shrink-0" />
                  <input
                    type="text"
                    placeholder="Buscar libreta..."
                    value={notebookQuery}
                    onChange={(e) => setNotebookQuery(e.target.value)}
                    className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder-subtle"
                    style={{ color: 'var(--color-foreground)' }}
                  />
                </div>
                <div className="max-h-44 overflow-y-auto rounded-xl border border-border">
                  {filteredNotebooks.length === 0 ? (
                    <p className="text-xs text-muted text-center py-4">Sin resultados</p>
                  ) : (
                    filteredNotebooks.map((nb) => {
                      const isSelected = nb.id === notebookId
                      return (
                        <button
                          key={nb.id}
                          type="button"
                          onClick={() => setNotebookId(nb.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition cursor-pointer border-b border-border last:border-b-0 ${
                            isSelected ? 'bg-accent/10' : 'hover:bg-surface'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${isSelected ? 'bg-accent/20' : 'bg-elevated'}`}>
                            <BookOpen size={12} className={isSelected ? 'text-accent' : 'text-muted'} />
                          </div>
                          <span className={`text-sm flex-1 truncate ${isSelected ? 'text-accent font-medium' : 'text-foreground'}`}>
                            {nb.name}
                          </span>
                          {isSelected && <Check size={13} className="text-accent shrink-0" />}
                        </button>
                      )
                    })
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {(state === 'idle' || state === 'importing') && (
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-border shrink-0">
            <p className="text-xs text-subtle truncate">
              {selectedNotebook ? `→ ${selectedNotebook.name}` : 'Selecciona una libreta'}
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-muted hover:text-foreground transition cursor-pointer rounded-lg hover:bg-surface"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleImport}
                disabled={!canImport}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-medium"
              >
                {isImporting && <Loader2 size={13} className="animate-spin" />}
                {isImporting ? 'Importando...' : 'Importar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
````

## File: components/notes/MoveNoteModal.tsx
````typescript
'use client'

import { useState, useEffect, useRef } from 'react'
import { X, Search, BookOpen, Check, Loader2 } from 'lucide-react'
import { useNotebookStore } from '@/store/notebookStore'
import { updateNote } from '@/lib/supabase/notes'
import type { Note } from '@/types'

interface MoveNoteModalProps {
  note: Note
  onMoved: () => void
  onClose: () => void
}

export default function MoveNoteModal({ note, onMoved, onClose }: MoveNoteModalProps) {
  const { notebooks } = useNotebookStore()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(note.notebook_id)
  const [moving, setMoving] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  const filtered = notebooks.filter((nb) =>
    nb.name.toLowerCase().includes(query.toLowerCase())
  )

  const currentNotebook = notebooks.find((nb) => nb.id === note.notebook_id)
  const targetNotebook = notebooks.find((nb) => nb.id === selected)

  const hasChanged = selected !== note.notebook_id

  const handleMove = async () => {
    if (!selected || !hasChanged) return
    setMoving(true)
    try {
      await updateNote(note.id, { notebook_id: selected })
      onMoved()
      onClose()
    } catch {
      // silencioso
    } finally {
      setMoving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-semibold text-foreground">Mover</span>
            <span className="px-2 py-0.5 bg-surface border border-border rounded-md text-xs text-muted truncate max-w-[160px]">
              {note.title || 'Sin título'}
            </span>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer shrink-0"
          >
            <X size={15} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border">
          <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg border border-border focus-within:border-accent/50 transition">
            <Search size={13} className="text-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar libreta..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder-subtle"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>
        </div>

        {/* Notebook list */}
        <div className="overflow-y-auto max-h-64 py-1">
          {filtered.length === 0 ? (
            <p className="text-xs text-muted text-center py-6">Sin resultados</p>
          ) : (
            filtered.map((nb) => {
              const isCurrent = nb.id === note.notebook_id
              const isSelected = nb.id === selected

              return (
                <button
                  key={nb.id}
                  type="button"
                  onClick={() => setSelected(nb.id)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left transition cursor-pointer ${
                    isSelected ? 'bg-accent/10' : 'hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-accent/20' : 'bg-elevated'
                    }`}>
                      <BookOpen size={13} className={isSelected ? 'text-accent' : 'text-muted'} />
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm truncate ${isSelected ? 'text-accent font-medium' : 'text-foreground'}`}>
                        {nb.name}
                      </p>
                      {isCurrent && (
                        <p className="text-[10px] text-subtle">Ubicación actual</p>
                      )}
                    </div>
                  </div>
                  {isSelected && (
                    <Check size={15} className="text-accent shrink-0" />
                  )}
                </button>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-border">
          <p className="text-xs text-subtle truncate flex-1">
            {hasChanged && targetNotebook
              ? `→ ${targetNotebook.name}`
              : currentNotebook
                ? `En: ${currentNotebook.name}`
                : ''}
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition cursor-pointer rounded-lg hover:bg-surface"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleMove}
              disabled={!hasChanged || moving}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-medium"
            >
              {moving && <Loader2 size={13} className="animate-spin" />}
              {moving ? 'Moviendo...' : 'Mover aquí'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
````

## File: components/notes/NotePopoverMenu.tsx
````typescript
'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { X, Pin, FolderInput, Trash2 } from 'lucide-react'
import { NOTE_COLORS, type NoteColor } from '@/lib/constants/colors'
import type { Note } from '@/types'

const POPOVER_WIDTH = 232
const GAP = 8
const VIEWPORT_MARGIN = 8
const ARROW_SIZE = 10

interface NotePopoverMenuProps {
  note: Note
  anchorRect: DOMRect
  onClose: () => void
  onColorChange: (color: NoteColor | null) => void
  onPinToggle: () => void
  onMove: () => void
  onDelete: () => void
}

interface Position {
  top: number
  left: number
  side: 'right' | 'left'
}

export default function NotePopoverMenu({
  note,
  anchorRect,
  onClose,
  onColorChange,
  onPinToggle,
  onMove,
  onDelete,
}: NotePopoverMenuProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const firstColorRef = useRef<HTMLButtonElement>(null)

  const [pos, setPos] = useState<Position>(() => {
    const placeLeft = anchorRect.right + GAP + POPOVER_WIDTH > window.innerWidth
    return {
      top: anchorRect.top,
      left: placeLeft ? anchorRect.left - POPOVER_WIDTH - GAP : anchorRect.right + GAP,
      side: placeLeft ? 'left' : 'right',
    }
  })
  const [height, setHeight] = useState(0)

  // Medir el popover y mantenerlo dentro del viewport verticalmente
  useLayoutEffect(() => {
    const el = popoverRef.current
    if (!el) return
    const measured = el.offsetHeight
    setHeight(measured)
    const maxTop = window.innerHeight - measured - VIEWPORT_MARGIN
    const clampedTop = Math.max(VIEWPORT_MARGIN, Math.min(anchorRect.top, maxTop))
    setPos((prev) => (prev.top === clampedTop ? prev : { ...prev, top: clampedTop }))
  }, [anchorRect])

  // Foco en el primer color al abrir (accesibilidad por teclado)
  useEffect(() => {
    firstColorRef.current?.focus()
  }, [])

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Posición vertical de la flecha, alineada al centro del botón origen
  const anchorCenterY = anchorRect.top + anchorRect.height / 2
  const rawArrowTop = anchorCenterY - pos.top - ARROW_SIZE / 2
  const maxArrowTop = height > 0 ? height - ARROW_SIZE - 12 : rawArrowTop
  const arrowTop = Math.max(12, Math.min(rawArrowTop, maxArrowTop))

  const arrowOnLeftEdge = pos.side === 'right'

  return (
    <div
      ref={popoverRef}
      role="menu"
      className="fixed bg-panel border border-border rounded-[10px] p-3.5"
      style={{
        top: pos.top,
        left: pos.left,
        width: POPOVER_WIDTH,
        zIndex: 60,
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Flecha lateral apuntando al botón origen */}
      <span
        aria-hidden
        className="absolute w-2.5 h-2.5 bg-panel rotate-45"
        style={{
          top: arrowTop,
          [arrowOnLeftEdge ? 'left' : 'right']: -ARROW_SIZE / 2,
          borderLeft: arrowOnLeftEdge ? '1px solid var(--color-border)' : undefined,
          borderBottom: arrowOnLeftEdge ? '1px solid var(--color-border)' : undefined,
          borderTop: arrowOnLeftEdge ? undefined : '1px solid var(--color-border)',
          borderRight: arrowOnLeftEdge ? undefined : '1px solid var(--color-border)',
        }}
      />

      {/* Header */}
      <div className="text-[11px] uppercase tracking-wider text-muted mb-2.5 px-0.5">
        Color de la nota
      </div>

      {/* Grid de colores 4x2 */}
      <div className="grid grid-cols-4 gap-2 mb-2.5">
        {Object.entries(NOTE_COLORS).map(([name, hex], i) => (
          <button
            key={name}
            ref={i === 0 ? firstColorRef : undefined}
            type="button"
            onClick={() => onColorChange(name as NoteColor)}
            aria-label={`Color ${name}`}
            className={`w-9 h-9 rounded-full border-2 transition cursor-pointer hover:border-white/30 ${
              note.color === name ? 'border-white' : 'border-transparent'
            }`}
            style={{ backgroundColor: hex }}
          />
        ))}
      </div>

      {/* Sin color */}
      <div className="flex flex-col items-center mb-1">
        <button
          type="button"
          onClick={() => onColorChange(null)}
          aria-label="Sin color"
          className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center hover:border-white/30 transition cursor-pointer"
        >
          <X size={14} className="text-muted" />
        </button>
        <span className="text-[11px] text-muted mt-1.5">Sin color</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-border my-2.5" />

      {/* Acciones */}
      <button
        type="button"
        onClick={onPinToggle}
        className="flex items-center gap-2 w-full px-1 py-1.5 rounded text-sm text-foreground hover:bg-surface transition cursor-pointer"
      >
        <Pin size={16} className="text-muted" />
        <span>{note.is_pinned ? 'Desanclar' : 'Anclar'}</span>
      </button>

      <button
        type="button"
        onClick={onMove}
        className="flex items-center gap-2 w-full px-1 py-1.5 rounded text-sm text-foreground hover:bg-surface transition cursor-pointer"
      >
        <FolderInput size={16} className="text-muted" />
        <span>Mover</span>
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="flex items-center gap-2 w-full px-1 py-1.5 rounded text-sm text-danger hover:bg-danger/10 transition cursor-pointer"
      >
        <Trash2 size={16} className="text-danger" />
        <span>Eliminar</span>
      </button>
    </div>
  )
}
````

## File: components/notes/PublicNoteContent.tsx
````typescript
'use client'

import { useEffect } from 'react'
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

interface PublicNoteContentProps {
  content: Record<string, unknown>
}

export default function PublicNoteContent({ content }: PublicNoteContentProps) {
  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
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
    ],
  })

  // Mismo patrón que NoteEditor: setContent en useEffect + setTimeout
  // evita el error de flushSync con React 19 + TipTap v3
  useEffect(() => {
    if (!editor) return
    const hasContent = Object.keys(content).length > 0
    setTimeout(() => {
      editor.commands.setContent(hasContent ? content : '')
    }, 0)
  }, [editor, content])

  return <EditorContent editor={editor} />
}
````

## File: components/onboarding/OnboardingModal.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import { Sparkles, BookOpen, FileText, ArrowRight, Check, Loader2 } from 'lucide-react'
import { getProfile, updateProfile } from '@/lib/supabase/profile'
import { createNotebook } from '@/lib/supabase/notebooks'
import { createNote } from '@/lib/supabase/notes'
import { useProfileStore } from '@/store/profileStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import type { Notebook } from '@/types'

const TOTAL_STEPS = 3

export default function OnboardingModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [name, setName] = useState('')
  const [notebookName, setNotebookName] = useState('Mi primera libreta')
  const [createdNotebook, setCreatedNotebook] = useState<Notebook | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { setProfile } = useProfileStore()
  const { addNotebook, setSelectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (p && !p.onboarding_completed) {
          setName(p.display_name ?? '')
          setOpen(true)
        }
      })
      .catch(() => {})
  }, [])

  const finish = async (withNote: boolean) => {
    setBusy(true)
    setError(null)
    try {
      // Asegurar libreta creada (por si llegó al paso final sin crearla)
      let notebook = createdNotebook
      if (!notebook) {
        notebook = await createNotebook(notebookName.trim() || 'Mi primera libreta')
        addNotebook(notebook)
      }

      if (withNote) {
        const note = await createNote(notebook.id)
        addNote(note)
        setSelectedNotebook(notebook)
        setSelectedNote(note)
        setCurrentView('notebooks')
      }

      const updated = await updateProfile({
        display_name: name.trim() || null,
        onboarding_completed: true,
      })
      setProfile(updated)
      setOpen(false)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ocurrió un error')
    } finally {
      setBusy(false)
    }
  }

  const skip = async () => {
    setBusy(true)
    try {
      const updated = await updateProfile({ onboarding_completed: true })
      setProfile(updated)
      setOpen(false)
    } catch {
      setOpen(false)
    } finally {
      setBusy(false)
    }
  }

  const goToNotebookStep = () => setStep(1)

  const createNotebookAndContinue = async () => {
    setBusy(true)
    setError(null)
    try {
      const notebook = await createNotebook(notebookName.trim() || 'Mi primera libreta')
      addNotebook(notebook)
      setCreatedNotebook(notebook)
      setStep(2)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo crear la libreta')
    } finally {
      setBusy(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-panel border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Progreso */}
        <div className="flex gap-1.5 p-4 pb-0">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>

        <div className="p-6 flex flex-col gap-5">
          {step === 0 && (
            <>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-accent/15 rounded-2xl flex items-center justify-center">
                  <Sparkles size={26} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">¡Bienvenido a NoteEvo!</h2>
                  <p className="text-sm text-muted mt-1">Configuremos tu espacio en 3 pasos.</p>
                </div>
              </div>
              <div>
                <label htmlFor="ob-name" className="block text-xs font-medium text-muted mb-1.5">
                  ¿Cómo te llamamos?
                </label>
                <input
                  id="ob-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  autoFocus
                  className="w-full px-3 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={skip}
                  disabled={busy}
                  className="text-sm text-muted hover:text-foreground transition cursor-pointer"
                >
                  Omitir
                </button>
                <button
                  type="button"
                  onClick={goToNotebookStep}
                  className="flex items-center gap-1.5 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition cursor-pointer"
                >
                  Siguiente <ArrowRight size={15} />
                </button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-accent/15 rounded-2xl flex items-center justify-center">
                  <BookOpen size={26} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Tu primera libreta</h2>
                  <p className="text-sm text-muted mt-1">Las libretas organizan tus notas por tema.</p>
                </div>
              </div>
              <div>
                <label htmlFor="ob-nb" className="block text-xs font-medium text-muted mb-1.5">
                  Nombre de la libreta
                </label>
                <input
                  id="ob-nb"
                  type="text"
                  value={notebookName}
                  onChange={(e) => setNotebookName(e.target.value)}
                  autoFocus
                  className="w-full px-3 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
                />
              </div>
              {error && <p className="text-sm text-danger">{error}</p>}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  disabled={busy}
                  className="text-sm text-muted hover:text-foreground transition cursor-pointer"
                >
                  Atrás
                </button>
                <button
                  type="button"
                  onClick={createNotebookAndContinue}
                  disabled={busy || !notebookName.trim()}
                  className="flex items-center gap-1.5 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition cursor-pointer disabled:opacity-50"
                >
                  {busy ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />}
                  Crear y seguir
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 bg-accent/15 rounded-2xl flex items-center justify-center">
                  <FileText size={26} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">¡Casi listo!</h2>
                  <p className="text-sm text-muted mt-1">
                    Crea tu primera nota en <span className="text-foreground font-medium">{createdNotebook?.name}</span> y empieza a escribir.
                  </p>
                </div>
              </div>
              {error && <p className="text-sm text-danger">{error}</p>}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => finish(true)}
                  disabled={busy}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition cursor-pointer disabled:opacity-50"
                >
                  {busy ? <Loader2 size={15} className="animate-spin" /> : <FileText size={15} />}
                  Crear mi primera nota
                </button>
                <button
                  type="button"
                  onClick={() => finish(false)}
                  disabled={busy}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-elevated border border-border text-foreground text-sm font-medium rounded-lg hover:bg-surface transition cursor-pointer disabled:opacity-50"
                >
                  <Check size={15} /> Terminar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
````

## File: components/spaces/CreateNotebookInSpaceModal.tsx
````typescript
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface CreateNotebookInSpaceModalProps {
  onClose: () => void
  onConfirm: (name: string) => Promise<void>
}

export default function CreateNotebookInSpaceModal({
  onClose,
  onConfirm,
}: CreateNotebookInSpaceModalProps) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    setError(null)
    try {
      await onConfirm(name.trim())
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la libreta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-panel border border-border rounded-2xl w-full max-w-sm mx-4 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-semibold text-foreground">Nueva libreta</h2>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="text-muted hover:text-foreground transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Nombre de la libreta *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(null) }}
              placeholder="Ej: Investigación"
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-accent"
              autoFocus
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-muted hover:text-foreground transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name.trim() || loading}
              className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Creando…' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
````

## File: components/spaces/CreateSpaceModal.tsx
````typescript
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { createSpace, updateSpace } from '@/lib/supabase/spaces'
import type { Space } from '@/types'

interface CreateSpaceModalProps {
  onClose: () => void
  onCreated?: (space: Space) => void
  onUpdated?: (space: Space) => void
  editSpace?: Space
}

export default function CreateSpaceModal({
  onClose,
  onCreated,
  onUpdated,
  editSpace,
}: CreateSpaceModalProps) {
  const [name, setName] = useState(editSpace?.name ?? '')
  const [description, setDescription] = useState(editSpace?.description ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isEdit = !!editSpace

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    setError(null)
    try {
      if (isEdit) {
        const updated = await updateSpace(editSpace.id, {
          name: name.trim(),
          description: description.trim() || undefined,
        })
        onUpdated?.({ ...editSpace, ...updated })
      } else {
        const space = await createSpace(name.trim(), description.trim() || undefined)
        onCreated?.(space)
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el space')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-panel border border-border rounded-2xl w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="font-semibold text-foreground">
            {isEdit ? 'Renombrar space' : 'Nuevo space'}
          </h2>
          <button type="button" title="Cerrar" onClick={onClose} className="text-muted hover:text-foreground transition">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Nombre *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Proyecto Alpha"
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-accent"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción opcional"
              rows={3}
              className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-accent resize-none"
            />
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-muted hover:text-foreground transition">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name.trim() || loading}
              className="px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Guardando…' : isEdit ? 'Guardar' : 'Crear space'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
````

## File: components/tags/TagsView.tsx
````typescript
'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Tag as TagIcon,
  Search,
  Pencil,
  Trash2,
  Check,
  X,
  ArrowLeft,
  FileText,
  BookOpen,
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  getTagsWithCount,
  renameTag,
  deleteTagWithRelations,
  getNotesByTag,
} from '@/lib/supabase/tags'
import { useTagStore } from '@/store/tagStore'
import { useNoteStore } from '@/store/noteStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useUIStore } from '@/store/uiStore'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { TagWithCount, Note } from '@/types'

interface TagCardProps {
  tag: TagWithCount
  onOpen: (tag: TagWithCount) => void
  onRenamed: (id: string, name: string) => void
  onDeleted: (id: string) => void
}

function TagCard({ tag, onOpen, onRenamed, onDeleted }: TagCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftName, setDraftName] = useState(tag.name)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startEditing = () => {
    setDraftName(tag.name)
    setError(null)
    setIsEditing(true)
  }

  const handleRename = async () => {
    const trimmed = draftName.trim()
    if (!trimmed || trimmed === tag.name) {
      setIsEditing(false)
      return
    }
    setBusy(true)
    setError(null)
    try {
      await renameTag(tag.id, trimmed)
      onRenamed(tag.id, trimmed)
      setIsEditing(false)
    } catch {
      setError('No se pudo renombrar la etiqueta')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async () => {
    setBusy(true)
    setError(null)
    try {
      await deleteTagWithRelations(tag.id)
      onDeleted(tag.id)
    } catch {
      setError('No se pudo eliminar la etiqueta')
      setBusy(false)
      setConfirmingDelete(false)
    }
  }

  return (
    <div className="group relative flex flex-col gap-3 p-4 bg-panel border border-border rounded-xl transition-all duration-200 hover:border-accent/40 hover:shadow-sm">
      {/* Top row: icon + name + count */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <TagIcon size={16} className="text-accent" />
          </div>

          {isEditing ? (
            <input
              autoFocus
              value={draftName}
              disabled={busy}
              onChange={(e) => setDraftName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRename()
                if (e.key === 'Escape') setIsEditing(false)
              }}
              className="flex-1 min-w-0 bg-surface border border-accent/40 rounded-md px-2 py-1 text-sm text-foreground outline-none focus:border-accent"
            />
          ) : (
            <button
              type="button"
              onClick={() => onOpen(tag)}
              onDoubleClick={startEditing}
              className="min-w-0 flex-1 text-left cursor-pointer"
              title="Ver notas con esta etiqueta"
            >
              <span className="block text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                {tag.name}
              </span>
            </button>
          )}
        </div>

        {!isEditing && (
          <span className="shrink-0 inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full bg-surface text-xs font-semibold text-muted tabular-nums">
            {tag.note_count}
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-subtle">
          {tag.note_count} {tag.note_count === 1 ? 'nota' : 'notas'} · creada el{' '}
          {format(new Date(tag.created_at), 'd MMM yyyy', { locale: es })}
        </span>
      </div>

      {error && <p className="text-[11px] text-red-400">{error}</p>}

      {/* Actions */}
      {isEditing ? (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRename}
            disabled={busy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-white text-xs font-medium hover:bg-accent/90 transition disabled:opacity-50 cursor-pointer"
          >
            <Check size={13} /> Guardar
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            disabled={busy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface text-muted text-xs hover:text-foreground transition cursor-pointer"
          >
            <X size={13} /> Cancelar
          </button>
        </div>
      ) : confirmingDelete ? (
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted flex-1">¿Eliminar etiqueta?</span>
          <button
            type="button"
            onClick={handleDelete}
            disabled={busy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition disabled:opacity-50 cursor-pointer"
          >
            <Trash2 size={13} /> Eliminar
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(false)}
            disabled={busy}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface text-muted text-xs hover:text-foreground transition cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={startEditing}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted hover:text-foreground hover:bg-surface transition cursor-pointer"
          >
            <Pencil size={12} /> Renombrar
          </button>
          <button
            type="button"
            onClick={() => setConfirmingDelete(true)}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs text-muted hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
          >
            <Trash2 size={12} /> Eliminar
          </button>
        </div>
      )}
    </div>
  )
}

interface TagNotesPanelProps {
  tag: TagWithCount
  onBack: () => void
}

function TagNotesPanel({ tag, onBack }: TagNotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const { setSelectedNote } = useNoteStore()
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { setCurrentView } = useUIStore()

  useEffect(() => {
    let active = true
    getNotesByTag(tag.id)
      .then((data) => {
        if (active) setNotes(data)
      })
      .catch(() => {
        if (active) setNotes([])
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [tag.id])

  const handleOpenNote = (note: Note) => {
    setSelectedNote(note)
    const notebook = notebooks.find((nb) => nb.id === note.notebook_id)
    if (notebook) setSelectedNotebook(notebook)
    setCurrentView('notebooks')
  }

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-background">
      <div className="max-w-4xl mx-auto px-10 py-10 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface transition cursor-pointer"
            title="Volver a etiquetas"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
              <TagIcon size={16} className="text-accent" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-foreground truncate">{tag.name}</h1>
              <p className="text-xs text-muted">
                {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-muted text-center py-12">Cargando notas...</p>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <FileText size={32} className="text-subtle" />
            <p className="text-sm text-muted">Ninguna nota usa esta etiqueta</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {notes.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => handleOpenNote(note)}
                className="text-left p-4 bg-panel border border-border rounded-xl hover:border-accent/40 hover:bg-surface transition cursor-pointer"
              >
                <p className="text-sm font-medium text-foreground truncate">
                  {note.title || 'Sin título'}
                </p>
                <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                  {extractTextPreview(note.content) || 'Sin contenido'}
                </p>
                <p className="text-[11px] text-subtle mt-1.5">
                  {format(new Date(note.updated_at), 'd MMM yyyy', { locale: es })}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function TagsView() {
  const [tags, setTags] = useState<TagWithCount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [openTag, setOpenTag] = useState<TagWithCount | null>(null)
  const { removeTag, updateTag } = useTagStore()

  useEffect(() => {
    let active = true
    getTagsWithCount()
      .then((data) => {
        if (active) setTags(data)
      })
      .catch(() => {
        if (active) setError('No se pudieron cargar las etiquetas')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q ? tags.filter((t) => t.name.toLowerCase().includes(q)) : tags
    return [...list].sort((a, b) => a.name.localeCompare(b.name))
  }, [tags, query])

  const handleRenamed = (id: string, name: string) => {
    setTags((prev) => prev.map((t) => (t.id === id ? { ...t, name } : t)))
    updateTag(id, name)
    setOpenTag((prev) => (prev && prev.id === id ? { ...prev, name } : prev))
  }

  const handleDeleted = (id: string) => {
    setTags((prev) => prev.filter((t) => t.id !== id))
    removeTag(id)
  }

  if (openTag) {
    return <TagNotesPanel key={openTag.id} tag={openTag} onBack={() => setOpenTag(null)} />
  }

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-background">
      <div className="max-w-5xl mx-auto px-10 py-10 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Etiquetas</h1>
            <p className="text-sm text-muted mt-1">
              {tags.length} etiqueta{tags.length !== 1 ? 's' : ''} en total
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar etiquetas..."
              className="w-full pl-9 pr-3 py-2 bg-panel border border-border rounded-lg text-sm text-foreground placeholder:text-subtle outline-none focus:border-accent/50 transition"
            />
          </div>
        </div>

        {/* Body */}
        {loading ? (
          <p className="text-sm text-muted text-center py-16">Cargando etiquetas...</p>
        ) : error ? (
          <p className="text-sm text-red-400 text-center py-16">{error}</p>
        ) : tags.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-panel border border-border flex items-center justify-center">
              <TagIcon size={26} className="text-subtle" />
            </div>
            <div>
              <p className="text-foreground font-medium">Sin etiquetas aún</p>
              <p className="text-muted text-sm mt-1">
                Añade etiquetas a tus notas desde el editor
              </p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <Search size={26} className="text-subtle" />
            <p className="text-sm text-muted">
              No hay etiquetas que coincidan con &ldquo;{query}&rdquo;
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((tag) => (
              <TagCard
                key={tag.id}
                tag={tag}
                onOpen={setOpenTag}
                onRenamed={handleRenamed}
                onDeleted={handleDeleted}
              />
            ))}
          </div>
        )}

        {/* Hint */}
        {!loading && !error && filtered.length > 0 && (
          <p className="text-[11px] text-subtle text-center flex items-center justify-center gap-1.5">
            <BookOpen size={12} />
            Haz clic en una etiqueta para ver sus notas, o doble clic para renombrarla
          </p>
        )}
      </div>
    </div>
  )
}
````

## File: components/templates/NotebookPicker.tsx
````typescript
'use client'

import { useState } from 'react'
import { BookOpen, ChevronDown, Check } from 'lucide-react'
import type { Notebook } from '@/types'

interface NotebookPickerProps {
  notebooks: Notebook[]
  selected: Notebook | null
  onSelect: (nb: Notebook) => void
  /** Abre el menú hacia arriba cuando el picker está al fondo de un panel. */
  dropUp?: boolean
}

export default function NotebookPicker({
  notebooks, selected, onSelect, dropUp = false,
}: NotebookPickerProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-surface border border-border rounded-lg text-sm transition hover:border-accent/40 cursor-pointer"
      >
        <span className="flex items-center gap-2 min-w-0">
          <BookOpen size={14} className="text-muted shrink-0" />
          <span className={`truncate ${selected ? 'text-foreground' : 'text-subtle'}`}>
            {selected ? selected.name : 'Selecciona una libreta…'}
          </span>
        </span>
        <ChevronDown size={14} className={`text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className={`absolute left-0 right-0 bg-panel border border-border rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto ${
          dropUp ? 'bottom-full mb-1' : 'top-full mt-1'
        }`}>
          {notebooks.length === 0 ? (
            <p className="px-3 py-3 text-xs text-muted text-center">Sin libretas disponibles</p>
          ) : (
            notebooks.map((nb) => (
              <button
                key={nb.id}
                type="button"
                onClick={() => { onSelect(nb); setOpen(false) }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-left hover:bg-surface transition cursor-pointer"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <BookOpen size={13} className="text-muted shrink-0" />
                  <span className="text-foreground truncate">{nb.name}</span>
                </span>
                {selected?.id === nb.id && <Check size={13} className="text-accent shrink-0" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
````

## File: components/templates/TemplatePreview.tsx
````typescript
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
````

## File: components/ThemeApplier.tsx
````typescript
'use client'

import { useRef, useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'
import type { Theme } from '@/store/uiStore'

const STORAGE_KEY = 'noteevo-theme'

function resolveTheme(theme: Theme): 'dark' | 'light' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

export function ThemeApplier() {
  const { theme, setTheme } = useUIStore()
  const initialized = useRef(false)

  useEffect(() => {
    let activeTheme = theme

    // On first mount, read localStorage before applying anything — avoids
    // overriding the inline-script's correct value with the store's 'dark' default.
    if (!initialized.current) {
      initialized.current = true
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored && ['dark', 'light', 'system'].includes(stored)) {
        activeTheme = stored
        if (stored !== theme) setTheme(stored)
      }
    }

    const resolved = resolveTheme(activeTheme)
    document.documentElement.setAttribute('data-theme', resolved)
    localStorage.setItem(STORAGE_KEY, activeTheme)

    if (activeTheme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e: MediaQueryListEvent) => {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      }
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [theme, setTheme])

  return null
}
````

## File: components/ui/EmptyState.tsx
````typescript
'use client'

import type { ReactNode } from 'react'

export type EmptyStateVariant =
  | 'notes'
  | 'tasks'
  | 'files'
  | 'calendar'
  | 'templates'
  | 'trash'
  | 'search'

interface EmptyStateAction {
  label: string
  onClick: () => void
}

interface EmptyStateProps {
  variant: EmptyStateVariant
  title: string
  description?: string
  action?: EmptyStateAction
}

// Cada ilustración: viewBox 0 0 80 80, trazo currentColor (color muted del
// contenedor) + UN detalle envuelto en text-accent. Sin librerías de iconos.
const ILLUSTRATIONS: Record<EmptyStateVariant, ReactNode> = {
  notes: (
    <>
      {/* 3 hojas apiladas con offset */}
      <rect x="28" y="14" width="34" height="44" rx="4" opacity="0.45" />
      <rect x="22" y="18" width="34" height="44" rx="4" opacity="0.7" />
      <rect x="16" y="22" width="34" height="44" rx="4" />
      {/* líneas de "texto" en la hoja frontal */}
      <line x1="23" y1="36" x2="43" y2="36" />
      <line x1="23" y1="44" x2="43" y2="44" />
      <line x1="23" y1="52" x2="36" y2="52" />
      {/* detalle accent */}
      <circle className="text-accent" cx="24" cy="29" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  tasks: (
    <>
      {/* checkbox superior con check accent */}
      <rect x="16" y="22" width="15" height="15" rx="3.5" />
      <path className="text-accent" d="M20 29.5 L23 32.5 L28 25.5" strokeWidth="2" />
      <line x1="38" y1="29.5" x2="62" y2="29.5" />
      {/* checkbox inferior vacío */}
      <rect x="16" y="44" width="15" height="15" rx="3.5" />
      <line x1="38" y1="51.5" x2="56" y2="51.5" />
    </>
  ),
  files: (
    <>
      {/* documento asomando por detrás */}
      <rect x="42" y="16" width="22" height="22" rx="2.5" opacity="0.55" />
      <path className="text-accent" d="M58 16 L64 16 L64 22" strokeWidth="1.5" />
      {/* carpeta abierta */}
      <path d="M14 30 H30 L35 36 H64 V60 a2 2 0 0 1 -2 2 H16 a2 2 0 0 1 -2 -2 Z" />
    </>
  ),
  calendar: (
    <>
      {/* cuerpo del calendario */}
      <rect x="16" y="18" width="48" height="46" rx="4" />
      {/* anillas */}
      <line x1="28" y1="13" x2="28" y2="23" />
      <line x1="52" y1="13" x2="52" y2="23" />
      {/* cabecera */}
      <line x1="16" y1="30" x2="64" y2="30" />
      {/* cuadrícula 3x3 */}
      <rect x="24" y="38" width="6" height="5" rx="1" />
      <rect x="37" y="38" width="6" height="5" rx="1" />
      <rect x="50" y="38" width="6" height="5" rx="1" />
      <rect x="24" y="50" width="6" height="5" rx="1" />
      <rect className="text-accent" x="37" y="50" width="6" height="5" rx="1" fill="currentColor" stroke="none" />
      <rect x="50" y="50" width="6" height="5" rx="1" />
    </>
  ),
  templates: (
    <>
      {/* lienzo con líneas internas */}
      <rect x="18" y="14" width="44" height="52" rx="4" />
      <line x1="26" y1="26" x2="46" y2="26" />
      <line x1="26" y1="35" x2="54" y2="35" />
      <line x1="26" y1="43" x2="54" y2="43" />
      <line x1="26" y1="51" x2="40" y2="51" />
      {/* "+" accent en la esquina */}
      <g className="text-accent" strokeWidth="2">
        <line x1="57" y1="56" x2="57" y2="64" />
        <line x1="53" y1="60" x2="61" y2="60" />
      </g>
    </>
  ),
  trash: (
    <>
      {/* tapa levantada */}
      <line x1="20" y1="26" x2="60" y2="26" />
      <path className="text-accent" d="M34 26 V22 a2 2 0 0 1 2 -2 h8 a2 2 0 0 1 2 2 v4" />
      {/* cubo */}
      <path d="M26 30 L29 62 a2 2 0 0 0 2 2 h18 a2 2 0 0 0 2 -2 L54 30" />
      {/* líneas verticales */}
      <line x1="36" y1="37" x2="37" y2="57" />
      <line x1="44" y1="37" x2="43" y2="57" />
    </>
  ),
  search: (
    <>
      {/* lupa */}
      <circle cx="35" cy="33" r="16" />
      <line x1="47" y1="45" x2="60" y2="58" />
      {/* línea ondulada accent debajo */}
      <path className="text-accent" d="M18 66 q4 -5 8 0 t8 0 t8 0 t8 0" />
    </>
  ),
}

export default function EmptyState({ variant, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state-enter flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
      <svg
        viewBox="0 0 80 80"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-20 h-20 text-subtle"
        aria-hidden="true"
      >
        {ILLUSTRATIONS[variant]}
      </svg>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-base font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted max-w-sm leading-relaxed">{description}</p>
        )}
      </div>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition cursor-pointer active:scale-95"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
````

## File: e2e/auth.spec.ts
````typescript
import { test, expect } from '@playwright/test'
import { loadTestEnv } from './helpers/env'

loadTestEnv()

// Estado de sesión vacío: estos tests parten deslogueados, ignorando el storageState global.
const LOGGED_OUT = { cookies: [], origins: [] }

test.describe('Autenticación', () => {
  test('login con credenciales válidas entra al dashboard', async ({ browser }) => {
    const context = await browser.newContext({ storageState: LOGGED_OUT })
    const page = await context.newPage()

    await page.goto('/login')
    await page.fill('#email', process.env.E2E_EMAIL!)
    await page.fill('#password', process.env.E2E_PASSWORD!)
    await page.getByTestId('login-submit').click()

    await page.waitForURL('**/dashboard**', { timeout: 30_000 })
    await expect(page.getByTestId('logout-btn')).toBeVisible()

    await context.close()
  })

  test('credenciales inválidas muestran mensaje de error', async ({ browser }) => {
    const context = await browser.newContext({ storageState: LOGGED_OUT })
    const page = await context.newPage()

    await page.goto('/login')
    await page.fill('#email', 'noexiste-e2e@example.com')
    await page.fill('#password', 'contrasena-incorrecta')
    await page.getByTestId('login-submit').click()

    await expect(page.getByText('Correo o contraseña incorrectos')).toBeVisible()

    await context.close()
  })
})
````

## File: e2e/files.spec.ts
````typescript
import path from 'node:path'
import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'
import { createNotebook, createNote } from './helpers/actions'

const SAMPLE_FILE = `${PREFIX}sample.txt`

test('subir un archivo adjunto a una nota', async ({ page }) => {
  const notebookName = `${PREFIX}NB-${Date.now()}`

  await page.goto('/dashboard')
  await createNotebook(page, notebookName)
  await createNote(page)

  const filePath = path.join(process.cwd(), 'e2e', 'fixtures', SAMPLE_FILE)
  await page.getByTestId('attachment-input').setInputFiles(filePath)

  // Tras subirse, el nombre del archivo aparece en el panel de adjuntos.
  await expect(page.getByText(SAMPLE_FILE)).toBeVisible({ timeout: 30_000 })
})
````

## File: e2e/fixtures/E2E-sample.txt
````
Archivo de prueba para el test E2E de subida de adjuntos de NoteEvo.
Si ves esto en la cuenta de prueba, el teardown no lo limpió.
````

## File: e2e/global.setup.ts
````typescript
import { test as setup, expect } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { loadTestEnv } from './helpers/env'

loadTestEnv()

const authFile = path.join(process.cwd(), 'e2e', '.auth', 'user.json')

/**
 * Inicia sesión una sola vez con la cuenta de prueba y guarda el estado de sesión
 * (cookies/localStorage). El resto de specs reutilizan ese estado vía `storageState`,
 * evitando repetir el login en cada test.
 */
setup('autenticar cuenta de prueba', async ({ page }) => {
  const email = process.env.E2E_EMAIL
  const password = process.env.E2E_PASSWORD
  if (!email || !password) {
    throw new Error('Faltan E2E_EMAIL / E2E_PASSWORD en .env.test')
  }

  await page.goto('/login')
  await page.fill('#email', email)
  await page.fill('#password', password)
  await page.getByTestId('login-submit').click()

  await page.waitForURL('**/dashboard**', { timeout: 30_000 })
  await expect(page.getByTestId('logout-btn')).toBeVisible()

  fs.mkdirSync(path.dirname(authFile), { recursive: true })
  await page.context().storageState({ path: authFile })
})
````

## File: e2e/global.teardown.ts
````typescript
import { test as teardown } from '@playwright/test'
import { cleanupTestData } from './helpers/supabase-admin'

/**
 * Se ejecuta al final de toda la corrida (proyecto `cleanup`): borra de Supabase
 * cualquier dato creado por los tests, dejando la cuenta de prueba limpia.
 */
teardown('limpiar datos de prueba E2E', async () => {
  await cleanupTestData()
})
````

## File: e2e/helpers/actions.ts
````typescript
import { expect, type Page } from '@playwright/test'

/**
 * Crea una libreta desde el sidebar y espera a que quede seleccionada
 * (su nombre aparece como encabezado del panel de notas).
 */
export async function createNotebook(page: Page, name: string): Promise<void> {
  await page.getByTestId('new-notebook-btn').click()
  await page.getByTestId('notebook-name-input').fill(name)
  await page.getByTestId('notebook-create-submit').click()
  await expect(page.getByRole('heading', { name, level: 2 })).toBeVisible()
}

/**
 * Crea una nota nueva en la libreta seleccionada y espera a que el editor abra
 * (el input de título de la nota es visible).
 */
export async function createNote(page: Page): Promise<void> {
  await page.getByTestId('new-note-btn').click()
  await expect(page.getByTestId('note-title-input')).toBeVisible()
}
````

## File: e2e/helpers/constants.ts
````typescript
/**
 * Prefijo único para todos los datos creados por los tests E2E.
 * El teardown borra cualquier libreta/nota/tarea/etiqueta/adjunto cuyo nombre empiece con esto,
 * dejando la cuenta de prueba limpia tras cada corrida.
 */
export const PREFIX = 'E2E-'
````

## File: e2e/helpers/env.ts
````typescript
import fs from 'node:fs'
import path from 'node:path'

/**
 * Parser mínimo de archivos .env (KEY=VALUE) sin dependencias externas.
 * No sobreescribe variables ya presentes en process.env (precedencia: lo cargado primero gana).
 */
function parseEnvFile(file: string): void {
  if (!fs.existsSync(file)) return

  for (const rawLine of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue

    const eq = line.indexOf('=')
    if (eq === -1) continue

    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()

    const quoted =
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    if (quoted) value = value.slice(1, -1)

    if (process.env[key] === undefined) process.env[key] = value
  }
}

/**
 * Carga las variables de entorno necesarias para E2E.
 * `.env.local` aporta las claves de Supabase del proyecto; `.env.test` las credenciales de prueba.
 */
export function loadTestEnv(): void {
  const root = process.cwd()
  parseEnvFile(path.join(root, '.env.local'))
  parseEnvFile(path.join(root, '.env.test'))
}
````

## File: e2e/helpers/supabase-admin.ts
````typescript
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { loadTestEnv } from './env'
import { PREFIX } from './constants'

loadTestEnv()

/**
 * Cliente Supabase con service-role: omite RLS para poder limpiar datos de prueba
 * sin importar a qué usuario pertenezcan. Solo se usa en el teardown de E2E, nunca en la app.
 */
function adminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY para limpiar E2E')
  }
  return createClient(url, key, { auth: { persistSession: false } })
}

/**
 * Borra todos los datos creados por los tests (prefijo PREFIX), incluyendo objetos de storage.
 * El orden respeta las dependencias: adjuntos → notas → tareas/etiquetas/libretas.
 */
export async function cleanupTestData(): Promise<void> {
  const supabase = adminClient()
  const like = `${PREFIX}%`

  // 1. Adjuntos: eliminar objetos del bucket y luego las filas.
  const { data: atts } = await supabase
    .from('attachments')
    .select('storage_path')
    .like('file_name', like)

  const paths = (atts ?? [])
    .map((a) => (a as { storage_path: string | null }).storage_path)
    .filter((p): p is string => Boolean(p))
  if (paths.length > 0) {
    await supabase.storage.from('attachments').remove(paths)
  }
  await supabase.from('attachments').delete().like('file_name', like)

  // 2. Notas dentro de libretas de prueba (las nuevas notas no llevan título prefijado)
  //    + notas que sí tengan título de prueba.
  const { data: nbs } = await supabase.from('notebooks').select('id').like('name', like)
  const notebookIds = (nbs ?? []).map((n) => (n as { id: string }).id)
  if (notebookIds.length > 0) {
    await supabase.from('notes').delete().in('notebook_id', notebookIds)
  }
  await supabase.from('notes').delete().like('title', like)

  // 3. Tareas, etiquetas y libretas de prueba.
  await supabase.from('tasks').delete().like('title', like)
  await supabase.from('tags').delete().like('name', like)
  await supabase.from('notebooks').delete().like('name', like)
}
````

## File: e2e/notebooks-notes.spec.ts
````typescript
import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'
import { createNotebook, createNote } from './helpers/actions'

test('crear una libreta y una nota dentro de ella', async ({ page }) => {
  const notebookName = `${PREFIX}NB-${Date.now()}`

  await page.goto('/dashboard')
  await createNotebook(page, notebookName)
  await createNote(page)

  await expect(page.getByTestId('note-card').first()).toBeVisible()
})
````

## File: e2e/search.spec.ts
````typescript
import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'
import { createNotebook, createNote } from './helpers/actions'

test('buscar una nota por su título', async ({ page }) => {
  const notebookName = `${PREFIX}NB-${Date.now()}`
  const noteTitle = `${PREFIX}buscar-${Date.now()}`

  await page.goto('/dashboard')
  await createNotebook(page, notebookName)
  await createNote(page)

  // Asignar un título único y dar tiempo al autosave (~800ms) + indexación tsvector.
  const titleInput = page.getByTestId('note-title-input')
  await titleInput.click()
  await titleInput.fill(noteTitle)
  await page.waitForTimeout(2_000)

  // Buscar desde la barra del sidebar; la nota debe aparecer en los resultados.
  await page.getByTestId('sidebar-search').fill(noteTitle)
  await expect(page.getByText(noteTitle).first()).toBeVisible({ timeout: 15_000 })
})
````

## File: e2e/tags.spec.ts
````typescript
import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'
import { createNotebook, createNote } from './helpers/actions'

test('añadir una etiqueta nueva a una nota', async ({ page }) => {
  const notebookName = `${PREFIX}NB-${Date.now()}`
  const tagName = `${PREFIX}tag-${Date.now()}`

  await page.goto('/dashboard')
  await createNotebook(page, notebookName)
  await createNote(page)

  await page.getByTestId('tag-open-btn').click()
  const tagInput = page.getByTestId('tag-input')
  await tagInput.fill(tagName)
  await tagInput.press('Enter')

  await expect(page.getByText(tagName)).toBeVisible()
})
````

## File: e2e/tasks.spec.ts
````typescript
import { test, expect } from '@playwright/test'
import { PREFIX } from './helpers/constants'

test('crear una tarea desde la vista de Tareas', async ({ page }) => {
  const taskTitle = `${PREFIX}task-${Date.now()}`

  await page.goto('/dashboard')
  await page.locator('nav').getByText('Tareas', { exact: true }).click()

  await page.getByTestId('new-task-btn').click()
  await page.getByTestId('task-title-input').fill(taskTitle)
  await page.getByTestId('task-submit').click()

  await expect(page.getByText(taskTitle)).toBeVisible()
})
````

## File: e2e/zz-logout.spec.ts
````typescript
import { test, expect } from '@playwright/test'

/**
 * Test de logout. Va en un archivo aparte que corre al FINAL (orden alfabético),
 * porque `signOut()` revoca la sesión globalmente en Supabase y eso invalidaría
 * el `storageState` compartido que usan los demás specs.
 */
test('logout regresa a la pantalla de login', async ({ page }) => {
  await page.goto('/dashboard')
  await page.getByTestId('logout-btn').click()

  await page.waitForURL('**/login**', { timeout: 30_000 })
  await expect(page.getByTestId('login-submit')).toBeVisible()
})
````

## File: eslint.config.mjs
````javascript
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
````

## File: hooks/useSpaceRole.ts
````typescript
import { useSpaceStore } from '@/store/spaceStore'
import type { SpaceRole } from '@/types'

export function useSpaceRole(spaceId: string): SpaceRole | 'owner' | null {
  const spaces = useSpaceStore((s) => s.spaces)
  const space = spaces.find((sp) => sp.id === spaceId)
  return space?.user_role ?? null
}
````

## File: lib/constants/editor-fonts.ts
````typescript
// Fuente BASE configurable del editor (Phase 17 id:61).
//
// Los `stack` reflejan EXACTAMENTE las 6 familias de `FONTS` en
// components/editor/FormatDropdowns.tsx (font-family por selección). Aquí se usan
// como tipografía base de todo el cuerpo del editor, persistida en el perfil.
// No se cargan fuentes nuevas: Roboto Slab / Dancing Script / Caveat ya viven en
// app/layout.tsx via next/font/google.

export type EditorFontKey = 'sans' | 'serif' | 'slab' | 'mono' | 'script' | 'hand'

export interface EditorFontOption {
  key: EditorFontKey
  label: string
  stack: string
}

export const EDITOR_FONTS: EditorFontOption[] = [
  { key: 'sans', label: 'Sans Serif', stack: 'var(--font-geist-sans), Arial, Helvetica, sans-serif' },
  { key: 'serif', label: 'Serif', stack: 'Georgia, serif' },
  { key: 'slab', label: 'Slab Serif', stack: 'var(--font-roboto-slab), "Rockwell", "Courier New", serif' },
  { key: 'mono', label: 'Monospace', stack: 'var(--font-geist-mono), monospace' },
  { key: 'script', label: 'Script', stack: 'var(--font-dancing-script), "Brush Script MT", cursive' },
  { key: 'hand', label: 'Handwritten', stack: 'var(--font-caveat), "Comic Sans MS", cursive' },
]

export const DEFAULT_EDITOR_FONT: EditorFontKey = 'sans'
export const DEFAULT_EDITOR_FONT_SIZE = 16
export const DEFAULT_EDITOR_LINE_HEIGHT = 1.7

export const MIN_EDITOR_FONT_SIZE = 12
export const MAX_EDITOR_FONT_SIZE = 22

// Opciones de interlineado expuestas en ajustes.
export const LINE_HEIGHT_OPTIONS: { value: number; label: string }[] = [
  { value: 1.4, label: 'Compacto' },
  { value: 1.7, label: 'Normal' },
  { value: 2.0, label: 'Amplio' },
]

/** Devuelve el stack CSS de una clave de familia; cae a Sans si es desconocida. */
export function fontStackForKey(key: string | null | undefined): string {
  return (EDITOR_FONTS.find((f) => f.key === key) ?? EDITOR_FONTS[0]).stack
}
````

## File: lib/editor/active-node-extension.ts
````typescript
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

const activeNodeKey = new PluginKey('activeNodeHighlight')

export const ActiveNodeHighlight = Extension.create({
  name: 'activeNodeHighlight',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: activeNodeKey,
        props: {
          decorations(state) {
            const { selection, doc } = state
            const { from } = selection
            const decorations: Decoration[] = []

            try {
              const resolved = doc.resolve(from)
              if (resolved.depth >= 1) {
                const nodePos = resolved.before(1)
                const node = doc.nodeAt(nodePos)
                if (node) {
                  decorations.push(
                    Decoration.node(nodePos, nodePos + node.nodeSize, {
                      class: 'is-active-node',
                    })
                  )
                }
              }
            } catch {
              // ignorar
            }

            return DecorationSet.create(doc, decorations)
          },
        },
      }),
    ]
  },
})
````

## File: lib/editor/callout-extension.ts
````typescript
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import CalloutComponent from '@/components/editor/CalloutComponent'

export type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip'

export const CalloutExtension = Node.create({
  name: 'callout',
  group: 'block',
  content: 'block+',
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      type: {
        default: 'info' as CalloutType,
        parseHTML: (el) =>
          (el.getAttribute('data-callout-type') as CalloutType) ?? 'info',
        renderHTML: (attrs) => ({
          'data-callout-type': attrs.type as string,
        }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-callout-type]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-callout': '' }, HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutComponent)
  },
})
````

## File: lib/editor/mermaid-extension.ts
````typescript
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import MermaidComponent from '@/components/editor/MermaidComponent'

export const MermaidExtension = Node.create({
  name: 'mermaid',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      code: {
        default: 'flowchart TD\n  A[Inicio] --> B{¿Decisión?}\n  B -->|Sí| C[Acción A]\n  B -->|No| D[Acción B]\n  C --> E[Fin]\n  D --> E',
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="mermaid"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'mermaid' }), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(MermaidComponent)
  },
})
````

## File: lib/editor/notelink-extension.ts
````typescript
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import NoteLinkComponent from '@/components/editor/NoteLinkComponent'

export const NoteLinkExtension = Node.create({
  name: 'noteLink',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      noteId: {
        default: null,
        parseHTML: (el) => el.getAttribute('data-note-id'),
        renderHTML: (attrs) => ({ 'data-note-id': attrs.noteId }),
      },
      title: {
        default: '',
        parseHTML: (el) => el.getAttribute('data-note-title') ?? '',
        renderHTML: (attrs) => ({ 'data-note-title': attrs.title }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'span[data-note-link]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes({ 'data-note-link': '' }, HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(NoteLinkComponent)
  },
})
````

## File: lib/editor/toc-extension.ts
````typescript
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import TocComponent from '@/components/editor/TocComponent'

export const TocExtension = Node.create({
  name: 'tableOfContents',
  group: 'block',
  atom: true,
  draggable: true,

  parseHTML() {
    return [{ tag: 'div[data-toc]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-toc': '' })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(TocComponent)
  },
})
````

## File: lib/editor/toggle-extension.ts
````typescript
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import ToggleComponent from '@/components/editor/ToggleComponent'

export const ToggleExtension = Node.create({
  name: 'toggle',
  group: 'block',
  content: 'block+',
  defining: true,
  draggable: true,

  addAttributes() {
    return {
      title: {
        default: 'Toggle',
        parseHTML: (el) => el.getAttribute('data-title') ?? 'Toggle',
        renderHTML: (attrs) => ({ 'data-title': attrs.title as string }),
      },
      open: {
        default: true,
        parseHTML: (el) => el.getAttribute('data-open') !== 'false',
        renderHTML: (attrs) => ({
          'data-open': (attrs.open as boolean) ? 'true' : 'false',
        }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-toggle]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-toggle': '' }, HTMLAttributes), 0]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ToggleComponent)
  },
})
````

## File: lib/supabase/admin.ts
````typescript
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Service role client — bypasses RLS.
 * Only for server-side Route Handlers. Never import in client components.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Credenciales de administrador de Supabase no configuradas')
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}
````

## File: lib/supabase/attachments.ts
````typescript
import { createClient } from './client'
import type { Attachment } from '@/types'

export type AttachmentWithNote = Attachment & {
  notes: { title: string } | null
}

export async function getAllAttachments(): Promise<AttachmentWithNote[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('attachments')
    .select('*, notes(title)')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as AttachmentWithNote[]
}

export async function getAttachments(noteId: string): Promise<Attachment[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('note_id', noteId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function uploadAttachment(
  noteId: string,
  file: File,
  onProgress: (pct: number) => void
): Promise<Attachment> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
  const storagePath = `${user.id}/${noteId}/${safeName}`

  // Simulate progress — storage-js types don't expose onUploadProgress
  let pct = 0
  const timer = setInterval(() => {
    pct = Math.min(pct + 6, 90)
    onProgress(pct)
  }, 120)

  let uploadError: { message: string } | null = null
  try {
    const result = await supabase.storage
      .from('attachments')
      .upload(storagePath, file, {
        contentType: file.type || 'application/octet-stream',
        cacheControl: '3600',
        upsert: false,
      })
    uploadError = result.error
  } finally {
    clearInterval(timer)
  }

  if (uploadError) throw new Error(uploadError.message)
  onProgress(100)

  const { data, error } = await supabase
    .from('attachments')
    .insert({
      user_id: user.id,
      note_id: noteId,
      file_name: file.name,
      file_type: file.type || null,
      file_size: file.size,
      storage_path: storagePath,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteAttachment(id: string, storagePath: string): Promise<void> {
  const supabase = createClient()
  await supabase.storage.from('attachments').remove([storagePath])
  const { error } = await supabase.from('attachments').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

export function getAttachmentUrl(storagePath: string): string {
  const supabase = createClient()
  const { data } = supabase.storage.from('attachments').getPublicUrl(storagePath)
  return data.publicUrl
}
````

## File: lib/supabase/client.ts
````typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
````

## File: lib/supabase/note-links.ts
````typescript
import { createClient } from './client'

export interface BacklinkNote {
  id: string
  title: string
  notebook_id: string | null
  updated_at: string
}

export async function syncNoteLinks(
  sourceNoteId: string,
  targetNoteIds: string[]
): Promise<void> {
  const supabase = createClient()
  const { error: delErr } = await supabase
    .from('note_links')
    .delete()
    .eq('source_note_id', sourceNoteId)
  if (delErr) throw new Error(delErr.message)
  if (targetNoteIds.length === 0) return
  const rows = targetNoteIds.map((id) => ({
    source_note_id: sourceNoteId,
    target_note_id: id,
  }))
  const { error } = await supabase.from('note_links').insert(rows)
  if (error) throw new Error(error.message)
}

export async function getBacklinks(noteId: string): Promise<BacklinkNote[]> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_backlinks', { p_note_id: noteId })
  if (error) throw new Error(error.message)
  return (data ?? []) as BacklinkNote[]
}
````

## File: lib/supabase/notifications.ts
````typescript
import { createClient } from './client'
import type { Notification } from '@/types'

export async function getNotifications(): Promise<Notification[]> {
  const supabase = createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) return []

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', authData.user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) throw new Error(error.message)
  return (data ?? []) as Notification[]
}

export async function markAsRead(id: string): Promise<void> {
  const supabase = createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
    .eq('user_id', authData.user.id)

  if (error) throw new Error(error.message)
}

export async function markAllRead(): Promise<void> {
  const supabase = createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('user_id', authData.user.id)
    .eq('is_read', false)

  if (error) throw new Error(error.message)
}

export async function deleteNotification(id: string): Promise<void> {
  const supabase = createClient()
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id)
    .eq('user_id', authData.user.id)

  if (error) throw new Error(error.message)
}
````

## File: lib/supabase/server.ts
````typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
        cookies: {
            getAll() {
            return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
            try {
                cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
                )
            } catch {}
            },
        },
        }
    )
}
````

## File: lib/supabase/stats.ts
````typescript
import { createClient } from './client'

export interface UserStats {
  total_notes: number
  total_notebooks: number
  total_tags: number
  total_tasks: number
  pending_tasks: number
  total_attachments: number
  notes_this_week: number
  spaces_count: number
}

export interface ActivityPoint {
  day: string
  count: number
}

export interface TopTag {
  name: string
  count: number
}

export interface TopNotebook {
  name: string
  count: number
}

export interface DashboardExtras {
  activity_7d: ActivityPoint[]
  top_tags: TopTag[]
  top_notebooks: TopNotebook[]
}

export async function getUserStats(): Promise<UserStats> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_user_stats')
  if (error) throw new Error(error.message)
  return data as UserStats
}

export async function getDashboardExtras(): Promise<DashboardExtras> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_dashboard_extras')
  if (error) throw new Error(error.message)
  return data as DashboardExtras
}
````

## File: lib/supabase/versions.ts
````typescript
import { createClient } from './client'

export interface NoteVersion {
  id: string
  note_id: string
  user_id: string
  title: string
  content: Record<string, unknown>
  version_number: number
  created_at: string
}

export async function getVersions(noteId: string): Promise<NoteVersion[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('note_versions')
    .select('*')
    .eq('note_id', noteId)
    .order('version_number', { ascending: false })
    .limit(20)

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function saveVersion(
  noteId: string,
  title: string,
  content: Record<string, unknown>,
  versionNumber: number
): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('note_versions')
    .insert({ note_id: noteId, user_id: user.id, title, content, version_number: versionNumber })

  if (error) throw new Error(error.message)

  // Mantener máximo 20 versiones — eliminar las más antiguas
  const { data: versions } = await supabase
    .from('note_versions')
    .select('id')
    .eq('note_id', noteId)
    .order('version_number', { ascending: false })

  if (versions && versions.length > 20) {
    const toDelete = versions.slice(20).map((v) => v.id)
    await supabase.from('note_versions').delete().in('id', toDelete)
  }
}

export async function deleteVersion(versionId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('note_versions')
    .delete()
    .eq('id', versionId)
  if (error) throw new Error(error.message)
}

export async function getVersionCount(noteId: string): Promise<number> {
  const supabase = createClient()
  const { count } = await supabase
    .from('note_versions')
    .select('*', { count: 'exact', head: true })
    .eq('note_id', noteId)

  return count ?? 0
}
````

## File: lib/utils/space-color.ts
````typescript
// Color de identificación determinista por space.
// No se almacena en DB: se deriva del id (uuid aleatorio), por lo que cada
// space obtiene un color estable y consistente — visualmente equivalente a un
// "color aleatorio al crear" pero sin migración ni columna extra.

const SPACE_COLORS = [
  '#6366f1', // indigo
  '#ec4899', // pink
  '#f59e0b', // amber
  '#10b981', // emerald
  '#3b82f6', // blue
  '#8b5cf6', // violet
  '#ef4444', // red
  '#14b8a6', // teal
  '#f97316', // orange
  '#06b6d4', // cyan
] as const

export function getSpaceColor(id: string): string {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }
  return SPACE_COLORS[hash % SPACE_COLORS.length]
}

// Devuelve el color con canal alpha (formato #rrggbbaa) para fondos suaves.
export function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.min(Math.max(alpha, 0), 1) * 255)
    .toString(16)
    .padStart(2, '0')
  return `${hex}${a}`
}
````

## File: lib/utils/tiptap-to-markdown.ts
````typescript
type TipTapNode = {
  type: string
  text?: string
  content?: TipTapNode[]
  attrs?: Record<string, unknown>
  marks?: { type: string }[]
}

export function tiptapToMarkdown(doc: Record<string, unknown>): string {
  if (!doc || !doc.content) return ''
  return convertNodes(doc.content as TipTapNode[]).trim()
}

function convertNodes(nodes: TipTapNode[], context = ''): string {
  return nodes.map((node) => convertNode(node, context)).join('')
}

function convertNode(node: TipTapNode, context = ''): string {
  switch (node.type) {
    case 'paragraph':
      return (node.content ? convertNodes(node.content) : '') + '\n\n'

    case 'text': {
      let text = node.text ?? ''
      const marks = node.marks ?? []
      if (marks.some((m) => m.type === 'bold')) text = `**${text}**`
      if (marks.some((m) => m.type === 'italic')) text = `*${text}*`
      if (marks.some((m) => m.type === 'underline')) text = `<u>${text}</u>`
      if (marks.some((m) => m.type === 'strike')) text = `~~${text}~~`
      if (marks.some((m) => m.type === 'code')) text = `\`${text}\``
      if (marks.some((m) => m.type === 'highlight')) text = `==${text}==`
      return text
    }

    case 'heading': {
      const level = (node.attrs?.level as number) ?? 1
      const prefix = '#'.repeat(level)
      return `${prefix} ${node.content ? convertNodes(node.content) : ''}\n\n`
    }

    case 'bulletList':
      return (node.content ? convertNodes(node.content, 'bullet') : '') + '\n'

    case 'orderedList':
      return (node.content ? convertNodes(node.content, 'ordered') : '') + '\n'

    case 'listItem': {
      const prefix = context === 'ordered' ? '1. ' : '- '
      return `${prefix}${node.content ? convertNodes(node.content).trim() : ''}\n`
    }

    case 'taskList':
      return (node.content ? convertNodes(node.content, 'task') : '') + '\n'

    case 'taskItem': {
      const checked = node.attrs?.checked ? '[x]' : '[ ]'
      return `- ${checked} ${node.content ? convertNodes(node.content).trim() : ''}\n`
    }

    case 'codeBlock': {
      const lang = (node.attrs?.language as string) ?? ''
      const code = node.content ? convertNodes(node.content) : ''
      return `\`\`\`${lang}\n${code}\n\`\`\`\n\n`
    }

    case 'blockquote':
      return (node.content
        ? convertNodes(node.content)
            .split('\n')
            .map((l) => (l ? `> ${l}` : ''))
            .join('\n')
        : '') + '\n\n'

    case 'horizontalRule':
      return '---\n\n'

    case 'hardBreak':
      return '\n'

    case 'image':
      return `![${node.attrs?.alt ?? ''}](${node.attrs?.src ?? ''})\n\n`

    default:
      return node.content ? convertNodes(node.content) : ''
  }
}
````

## File: next.config.ts
````typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
````

## File: playwright.config.ts
````typescript
import { defineConfig, devices } from '@playwright/test'
import { loadTestEnv } from './e2e/helpers/env'

loadTestEnv()

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:3000'

export default defineConfig({
  testDir: './e2e',
  // La cuenta de prueba es compartida: corremos en serie para que los tests no se pisen.
  fullyParallel: false,
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { outputFolder: 'e2e-out/report', open: 'never' }]],
  outputDir: 'e2e-out/results',
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    { name: 'setup', testMatch: /global\.setup\.ts/ },
    { name: 'cleanup', testMatch: /global\.teardown\.ts/ },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'e2e/.auth/user.json' },
      dependencies: ['setup'],
      teardown: 'cleanup',
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
````

## File: postcss.config.mjs
````javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
````

## File: public/file.svg
````xml
<svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z" clip-rule="evenodd" fill="#666" fill-rule="evenodd"/></svg>
````

## File: public/globe.svg
````xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g clip-path="url(#a)"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1" fill="#666"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z"/></clipPath></defs></svg>
````

## File: public/next.svg
````xml
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"/><path fill="#000" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"/></svg>
````

## File: public/vercel.svg
````xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1155 1000"><path d="m577.3 0 577.4 1000H0z" fill="#fff"/></svg>
````

## File: public/window.svg
````xml
<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" fill="#666"/></svg>
````

## File: README.md
````markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
````

## File: store/spaceStore.ts
````typescript
import { create } from 'zustand'
import type { Space } from '@/types'

interface SpaceStore {
  spaces: Space[]
  selectedSpace: Space | null
  isLoading: boolean

  setSpaces: (spaces: Space[]) => void
  addSpace: (space: Space) => void
  updateSpace: (space: Space) => void
  removeSpace: (spaceId: string) => void
  setSelectedSpace: (space: Space | null) => void
  setLoading: (loading: boolean) => void
}

export const useSpaceStore = create<SpaceStore>((set) => ({
  spaces: [],
  selectedSpace: null,
  isLoading: false,

  setSpaces: (spaces) => set({ spaces }),
  addSpace: (space) => set((s) => ({ spaces: [space, ...s.spaces] })),
  updateSpace: (space) =>
    set((s) => ({
      spaces: s.spaces.map((sp) => (sp.id === space.id ? space : sp)),
      selectedSpace: s.selectedSpace?.id === space.id ? space : s.selectedSpace,
    })),
  removeSpace: (spaceId) =>
    set((s) => ({
      spaces: s.spaces.filter((sp) => sp.id !== spaceId),
      selectedSpace: s.selectedSpace?.id === spaceId ? null : s.selectedSpace,
    })),
  setSelectedSpace: (space) => set({ selectedSpace: space }),
  setLoading: (loading) => set({ isLoading: loading }),
}))
````

## File: store/taskStore.ts
````typescript
import { create } from 'zustand'
import type { Task } from '@/types'

interface TaskStore {
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((s) => ({ tasks: [task, ...s.tasks] })),
  updateTask: (id, updates) =>
    set((s) => ({
      tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
}))
````

## File: tests/store/noteStore.test.ts
````typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import type { Note } from '@/types'

// Aislar el store de la capa Supabase
vi.mock('@/lib/supabase/notes', () => ({
  getNotesByNotebook: vi.fn(),
  createNote: vi.fn(),
}))

import { useNoteStore } from '@/store/noteStore'

function makeNote(overrides: Partial<Note> = {}): Note {
  return {
    id: 'n1',
    user_id: 'u1',
    notebook_id: 'nb1',
    title: 'Nota',
    content: {},
    is_favorite: false,
    is_trashed: false,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    ...overrides,
  } as Note
}

beforeEach(() => {
  useNoteStore.setState({ notes: [], selectedNote: null })
})

describe('noteStore', () => {
  it('setNotes replaces the list', () => {
    const notes = [makeNote({ id: 'a' }), makeNote({ id: 'b' })]
    useNoteStore.getState().setNotes(notes)
    expect(useNoteStore.getState().notes).toHaveLength(2)
  })

  it('addNote prepends the new note', () => {
    useNoteStore.getState().setNotes([makeNote({ id: 'a' })])
    useNoteStore.getState().addNote(makeNote({ id: 'b' }))
    expect(useNoteStore.getState().notes.map((n) => n.id)).toEqual(['b', 'a'])
  })

  it('updateNote patches the matching note', () => {
    useNoteStore.getState().setNotes([makeNote({ id: 'a', title: 'Viejo' })])
    useNoteStore.getState().updateNote('a', { title: 'Nuevo' })
    expect(useNoteStore.getState().notes[0].title).toBe('Nuevo')
  })

  it('updateNote also syncs selectedNote when it matches', () => {
    const note = makeNote({ id: 'a', title: 'Viejo' })
    useNoteStore.setState({ notes: [note], selectedNote: note })
    useNoteStore.getState().updateNote('a', { title: 'Nuevo' })
    expect(useNoteStore.getState().selectedNote?.title).toBe('Nuevo')
  })

  it('updateNote leaves selectedNote untouched when ids differ', () => {
    const selected = makeNote({ id: 'b', title: 'Otra' })
    useNoteStore.setState({ notes: [makeNote({ id: 'a' })], selectedNote: selected })
    useNoteStore.getState().updateNote('a', { title: 'Nuevo' })
    expect(useNoteStore.getState().selectedNote?.title).toBe('Otra')
  })

  it('deleteNote removes the note and clears selectedNote if it matches', () => {
    const note = makeNote({ id: 'a' })
    useNoteStore.setState({ notes: [note], selectedNote: note })
    useNoteStore.getState().deleteNote('a')
    expect(useNoteStore.getState().notes).toHaveLength(0)
    expect(useNoteStore.getState().selectedNote).toBeNull()
  })

  it('deleteNote keeps selectedNote if a different note is removed', () => {
    const selected = makeNote({ id: 'keep' })
    useNoteStore.setState({
      notes: [makeNote({ id: 'a' }), selected],
      selectedNote: selected,
    })
    useNoteStore.getState().deleteNote('a')
    expect(useNoteStore.getState().selectedNote?.id).toBe('keep')
  })

  it('setSelectedNote updates the selection', () => {
    const note = makeNote({ id: 'a' })
    useNoteStore.getState().setSelectedNote(note)
    expect(useNoteStore.getState().selectedNote?.id).toBe('a')
  })
})
````

## File: tests/utils/tiptap.test.ts
````typescript
import { describe, it, expect } from 'vitest'
import { extractTextPreview } from '@/lib/utils/tiptap'

describe('extractTextPreview', () => {
  it('returns empty string for empty content object', () => {
    expect(extractTextPreview({})).toBe('')
  })

  it('extracts text from a simple paragraph node', () => {
    const doc = {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Hola mundo' }] },
      ],
    }
    expect(extractTextPreview(doc)).toBe('Hola mundo')
  })

  it('joins text from nested and sibling nodes', () => {
    const doc = {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Primero' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Segundo' }] },
      ],
    }
    expect(extractTextPreview(doc)).toBe('Primero Segundo')
  })

  it('collapses redundant whitespace and trims', () => {
    const doc = {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: '   espacios   ' }] },
      ],
    }
    expect(extractTextPreview(doc)).toBe('espacios')
  })

  it('truncates with ellipsis when longer than maxLength', () => {
    const longText = 'a'.repeat(200)
    const doc = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: longText }] }],
    }
    const result = extractTextPreview(doc, 50)
    expect(result).toHaveLength(53) // 50 chars + '...'
    expect(result.endsWith('...')).toBe(true)
  })

  it('does not truncate when within maxLength', () => {
    const doc = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'corto' }] }],
    }
    expect(extractTextPreview(doc, 50)).toBe('corto')
  })

  it('returns empty string when nodes have no text', () => {
    const doc = {
      type: 'doc',
      content: [{ type: 'horizontalRule' }, { type: 'image' }],
    }
    expect(extractTextPreview(doc)).toBe('')
  })
})
````

## File: TOKEN.md
````markdown
# Guía de optimización de tokens — NoteEvo con Claude Code

## El problema de las sesiones largas

Claude Code tiene un límite de contexto por sesión. Con archivos grandes como CLAUDE.md (506 líneas)
más el código que genera, una sesión puede agotarse a mitad de una feature.

---

## Estrategia por tipo de tarea

### Features solo-frontend (ids 56, 58, 60, 62, 63, 65, 66)
Estas NO necesitan que Claude Code lea CLAUDE.md completo.
Instrucción al iniciar sesión:
> "Lee solo AGENTS.md sección id:XX y el archivo [componente.tsx] que voy a modificar.
>  No necesitas leer CLAUDE.md esta vez."

### Features con DB (ids 55, 57, 59, 61, 64, 68)
Necesitan leer el schema. Instrucción:
> "Lee la sección 'Schema de DB' de CLAUDE.md (líneas 276–330) y AGENTS.md sección id:XX."

### Features de IA (ids 69)
Necesitan ver un Route Handler existente como referencia. Instrucción:
> "Lee app/api/ai/chat/route.ts como referencia y AGENTS.md sección id:69.
>  No leas CLAUDE.md completo."

---

## Orden de implementación recomendado por agrupación de archivos

Agrupar features que tocan los mismos archivos en la misma sesión = menos re-lectura de contexto.

### Sesión 1 — Solo NoteEditor.tsx (ids 56 + 58 + 65)
Los tres modifican principalmente NoteEditor.tsx. En una sola sesión:
1. id:56 contador de palabras (20 min, ~800 tokens de código)
2. id:58 tooltips en toolbar (30 min, ~600 tokens)
3. id:65 typewriter mode (45 min, ~1200 tokens)
Ahorro: leer NoteEditor.tsx una sola vez en lugar de 3 veces separadas.

### Sesión 2 — Solo NoteList.tsx (ids 57 + 60 + 63 + 64)
Todos modifican NoteList.tsx:
1. id:57 notas ancladas
2. id:63 ordenar notas
3. id:64 color por nota
4. id:60 gallery view (depende de que el resto esté)
Leer NoteList.tsx una sola vez.

### Sesión 3 — DB + tipos (ids 55 + 59 + 61)
Todos necesitan migración SQL + types/index.ts + lib/supabase/notes.ts:
1. Aplicar TODAS las migraciones SQL juntas al inicio (sección SQL agrupado en AGENTS_p17.md)
2. Actualizar types/index.ts una sola vez para los 3
3. Implementar las funciones en notes.ts y profile.ts
4. Integrar en los componentes

### Sesión 4 — Componentes nuevos (ids 62 + 66 + 67)
Cada uno crea un componente nuevo, sin mucha dependencia entre sí:
1. id:62 EmptyState.tsx (nuevo componente, no modifica existentes)
2. id:66 CommandPalette mejorado
3. id:67 ImportModal.tsx + route.ts

### Sesión 5 — Features complejas (ids 68 + 69)
Reservar para el final. Requieren más contexto y son más largas.

---

## Cómo dar instrucciones a Claude Code para ahorrar tokens

### ✅ Eficiente
```
"Implementa id:56 del feature_list.json.
 Lee solo: AGENTS.md (sección id:56) y components/editor/NoteEditor.tsx.
 No necesitas CLAUDE.md ni otros archivos.
 Cuando termines: npm run build y marca id:56 como done."
```

### ❌ Ineficiente (desperdicia contexto)
```
"Implementa el contador de palabras en el editor"
(Sin referencia a los archivos — Claude Code leerá todo el proyecto para entender el contexto)
```

---

## Tamaño aproximado de cada feature en tokens de OUTPUT

| id | Feature | Tokens output est. | Archivos tocados |
|----|---------|-------------------|-----------------|
| 56 | Contador palabras | ~300 | 1 |
| 58 | Tooltips toolbar | ~500 | 3 |
| 63 | Ordenar notas | ~400 | 1 |
| 62 | Empty states | ~800 | 7 |
| 57 | Notas ancladas | ~600 | 3 |
| 65 | Typewriter mode | ~700 | 3 |
| 60 | Gallery view | ~900 | 1 |
| 55 | Emoji por nota | ~1000 | 4 |
| 64 | Color por nota | ~800 | 3 |
| 66 | Comando rápido | ~1200 | 3 |
| 59 | Cover image | ~1400 | 4 |
| 61 | Opciones tipográficas | ~1100 | 4 |
| 67 | Importar archivos | ~1600 | 3 |
| 68 | Backlinks | ~2500 | 5+ |
| 69 | IA inline | ~2000 | 3 |

---

## Cuando una sesión se acerca al límite

Señales de que el contexto se está agotando:
- Las respuestas se vuelven más cortas o genéricas
- Claude Code empieza a repetir código que ya generó
- Los archivos generados tienen imports que no existen en el proyecto

Qué hacer:
1. Haz commit del progreso actual (`git commit -m "wip: id:XX parcial"`)
2. Inicia sesión nueva con contexto mínimo:
   > "Continuamos implementando id:XX. Ya está hecho: [lista de lo completado].
   >  Falta: [lista de lo pendiente].
   >  Lee solo: [archivo específico]."
3. No repitas todo el contexto del proyecto — solo lo necesario para la siguiente tarea

---

## Archivos que Claude Code SIEMPRE necesita leer (invariante)

- `feature_list.json` — para saber qué implementar y marcarlo done
- `types/index.ts` — antes de crear cualquier tipo nuevo
- El archivo existente que va a modificar — nunca generar de memoria

## Archivos que Claude Code RARA VEZ necesita leer completos

- `CLAUDE.md` — solo las secciones relevantes (schema, decisiones técnicas)
- `AGENTS.md` — solo la sección del id que se está implementando
- `CHECKPOINTS.md` — solo el bloque del id que se va a verificar
````

## File: vitest.config.ts
````typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: [
        'lib/utils/tiptap.ts',
        'store/noteStore.ts',
        'store/taskStore.ts',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        statements: 70,
        branches: 70,
      },
    },
  },
})
````

## File: vitest.setup.ts
````typescript
import '@testing-library/jest-dom/vitest'
````

## File: app/(auth)/register/page.tsx
````typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError('No se pudo crear la cuenta. Intenta de nuevo.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Crear cuenta</h1>
          <p className="text-muted text-sm mt-1">Únete a NoteEvo</p>
        </div>

        {/* Form card */}
        <div className="bg-panel border border-border rounded-2xl p-6 space-y-4">
          {error && (
            <div className="p-3 bg-danger/10 border border-danger/25 rounded-lg">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-muted mb-1.5"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                className="w-full px-3 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-muted mb-1.5"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                className="w-full px-3 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light disabled:opacity-50 transition cursor-pointer"
          >
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </div>

        <p className="mt-5 text-sm text-muted text-center">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login" className="text-accent hover:text-accent-light transition">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
````

## File: app/api/ai/summarize/route.ts
````typescript
import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 10

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const { data: { user }, error: authError } = await client.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]
    const { count } = await client
      .from('ai_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('action', 'summarize')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return NextResponse.json(
        { success: false, error: 'Límite diario alcanzado (10 resúmenes/día)' },
        { status: 429 }
      )
    }

    const { content } = await req.json()
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'La nota no tiene contenido para resumir' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    const groq = new Groq({ apiKey })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Resume el siguiente contenido de nota de forma concisa en español, en 3-4 oraciones máximo. Devuelve solo el resumen, sin introducción ni formato extra:\n\n${content}`,
        },
      ],
    })

    const summary = completion.choices[0]?.message?.content ?? ''
    const tokensUsed = completion.usage?.total_tokens ?? 0

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'summarize',
      tokens_used: tokensUsed,
    })

    return NextResponse.json({ success: true, data: { summary } })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error al generar el resumen' },
      { status: 500 }
    )
  }
}
````

## File: app/api/ai/transform/route.ts
````typescript
import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 30

type TransformAction =
  // Texto
  | 'tone_formal'
  | 'tone_casual'
  | 'tone_funny'
  | 'tone_engaging'
  | 'tone_concise'
  | 'tone_empathetic'
  | 'fix_typos'
  | 'make_shorter'
  | 'make_longer'
  | 'humanize'
  // Resumir selección
  | 'summarize_paragraph'
  | 'summarize_structured'
  | 'summarize_bullet'
  // Ayúdame a escribir
  | 'help_introduction'
  | 'help_conclusion'
  | 'help_title'
  // Traducir
  | 'translate_en'
  | 'translate_es'
  | 'translate_fr'
  | 'translate_de'
  | 'translate_zh'
  | 'translate_ja'
  | 'translate_ru'
  | 'translate_it'
  | 'translate_pt'
  | 'translate_ar'
  | 'translate_hi'
  | 'translate_tr'
  | 'translate_id'
  | 'translate_vi'
  | 'translate_ko'
  // Convertir en
  | 'draft_email'
  | 'draft_social'

const PROMPTS: Record<TransformAction, string> = {
  // Tono
  tone_formal:
    'Reescribe el siguiente texto con un tono formal y profesional. Devuelve SOLO el texto, sin explicaciones:',
  tone_casual:
    'Reescribe el siguiente texto con un tono casual y amigable. Devuelve SOLO el texto, sin explicaciones:',
  tone_funny:
    'Reescribe el siguiente texto con un tono divertido y humorístico. Devuelve SOLO el texto, sin explicaciones:',
  tone_engaging:
    'Reescribe el siguiente texto de forma más atractiva y que enganche al lector. Devuelve SOLO el texto, sin explicaciones:',
  tone_concise:
    'Reescribe el siguiente texto de forma más concisa y directa, eliminando redundancias. Devuelve SOLO el texto, sin explicaciones:',
  tone_empathetic:
    'Reescribe el siguiente texto con un tono empático, comprensivo y cercano. Devuelve SOLO el texto, sin explicaciones:',

  // Texto
  fix_typos:
    'Corrige todos los errores ortográficos y gramaticales del siguiente texto. Devuelve SOLO el texto corregido, sin explicaciones:',
  make_shorter:
    'Acorta el siguiente texto manteniendo las ideas principales. Devuelve SOLO el texto acortado, sin explicaciones:',
  make_longer:
    'Expande el siguiente texto con más detalles y contexto. Devuelve SOLO el texto expandido, sin explicaciones:',
  humanize:
    'Reescribe el siguiente texto para que suene más humano, natural y conversacional, eliminando cualquier tono robótico. Devuelve SOLO el texto, sin explicaciones:',

  // Resumir selección
  summarize_paragraph:
    'Resume el siguiente texto en un solo párrafo cohesivo. Devuelve SOLO el párrafo, sin introducción ni explicaciones:',
  summarize_structured:
    'Convierte el siguiente texto en un resumen estructurado con puntos clave. Devuelve SOLO el resumen estructurado, sin explicaciones:',
  summarize_bullet:
    'Resume el siguiente texto como una lista de puntos clave. Devuelve SOLO la lista de puntos con guiones, sin introducción:',

  // Ayúdame a escribir
  help_introduction:
    'Escribe una introducción atractiva para el siguiente contenido. Devuelve SOLO la introducción, sin explicaciones:',
  help_conclusion:
    'Escribe una conclusión efectiva para el siguiente contenido. Devuelve SOLO la conclusión, sin explicaciones:',
  help_title:
    'Genera un título atractivo y descriptivo para el siguiente contenido. Devuelve SOLO el título, sin explicaciones:',

  // Traducir
  translate_en: 'Traduce el siguiente texto al inglés. Devuelve SOLO la traducción:',
  translate_es: 'Traduce el siguiente texto al español. Devuelve SOLO la traducción:',
  translate_fr: 'Traduce el siguiente texto al francés. Devuelve SOLO la traducción:',
  translate_de: 'Traduce el siguiente texto al alemán. Devuelve SOLO la traducción:',
  translate_zh: 'Traduce el siguiente texto al chino mandarín (simplificado). Devuelve SOLO la traducción:',
  translate_ja: 'Traduce el siguiente texto al japonés. Devuelve SOLO la traducción:',
  translate_ru: 'Traduce el siguiente texto al ruso. Devuelve SOLO la traducción:',
  translate_it: 'Traduce el siguiente texto al italiano. Devuelve SOLO la traducción:',
  translate_pt: 'Traduce el siguiente texto al portugués. Devuelve SOLO la traducción:',
  translate_ar: 'Traduce el siguiente texto al árabe. Devuelve SOLO la traducción:',
  translate_hi: 'Traduce el siguiente texto al hindi. Devuelve SOLO la traducción:',
  translate_tr: 'Traduce el siguiente texto al turco. Devuelve SOLO la traducción:',
  translate_id: 'Traduce el siguiente texto al indonesio. Devuelve SOLO la traducción:',
  translate_vi: 'Traduce el siguiente texto al vietnamita. Devuelve SOLO la traducción:',
  translate_ko: 'Traduce el siguiente texto al coreano. Devuelve SOLO la traducción:',

  // Convertir en
  draft_email:
    'Convierte el siguiente contenido en un email profesional bien redactado con asunto, saludo, cuerpo y despedida. Devuelve SOLO el email:',
  draft_social:
    'Convierte el siguiente contenido en un post atractivo para redes sociales, conciso y con buen gancho. Devuelve SOLO el post:',
}

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]
    const { count } = await client
      .from('ai_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('action', 'transform')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return NextResponse.json(
        { error: `Límite diario alcanzado (${MAX_DAILY_REQUESTS} transformaciones/día)` },
        { status: 429 }
      )
    }

    const { text, action } = (await req.json()) as {
      text: unknown
      action: unknown
    }

    if (
      !text ||
      typeof text !== 'string' ||
      text.trim().length === 0 ||
      !action ||
      typeof action !== 'string' ||
      !(action in PROMPTS)
    ) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }

    const typedAction = action as TransformAction
    const prompt = PROMPTS[typedAction]

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'transform',
      tokens_used: 0,
    })

    const groq = new Groq({ apiKey })
    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [{ role: 'user', content: `${prompt}\n\n${text}` }],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content ?? ''
          if (delta) controller.enqueue(encoder.encode(delta))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch {
    return NextResponse.json(
      { error: 'Error al transformar el texto' },
      { status: 500 }
    )
  }
}
````

## File: app/api/spaces/invite/route.ts
````typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'
import type { SpaceRole } from '@/types'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY no configurada')
  return createClient(url, key)
}

interface InviteBody {
  spaceId: string
  email: string
  role: SpaceRole
}

export async function POST(req: NextRequest) {
  try {
    const serverClient = await createServerClient()
    const { data: { user }, error: authError } = await serverClient.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const body: InviteBody = await req.json()
    const { spaceId, email, role } = body

    if (!spaceId || !email || !email.includes('@') || !role) {
      return NextResponse.json({ success: false, error: 'Datos inválidos' }, { status: 400 })
    }

    const { data: space, error: spaceError } = await serverClient
      .from('spaces')
      .select('id, owner_id')
      .eq('id', spaceId)
      .single()

    if (spaceError || !space) {
      return NextResponse.json({ success: false, error: 'Space no encontrado' }, { status: 404 })
    }

    const isOwner = space.owner_id === user.id
    if (!isOwner) {
      const { data: membership } = await serverClient
        .from('space_members')
        .select('role')
        .eq('space_id', spaceId)
        .eq('user_id', user.id)
        .single()

      if (!membership || membership.role !== 'admin') {
        return NextResponse.json({ success: false, error: 'Sin permisos para invitar' }, { status: 403 })
      }
    }

    const admin = getAdminClient()
    const { data: inviteeId, error: rpcError } = await admin
      .rpc('get_user_id_by_email', { email })

    if (rpcError) {
      return NextResponse.json({ success: false, error: 'Error interno al buscar usuario' }, { status: 500 })
    }
    if (!inviteeId) {
      return NextResponse.json(
        { success: false, error: 'No existe ningún usuario registrado con ese email' },
        { status: 404 }
      )
    }

    if (inviteeId === user.id) {
      return NextResponse.json(
        { success: false, error: 'No puedes invitarte a ti mismo' },
        { status: 400 }
      )
    }

    const { data: existing } = await admin
      .from('space_members')
      .select('user_id')
      .eq('space_id', spaceId)
      .eq('user_id', inviteeId)
      .single()

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Este usuario ya es miembro del space' },
        { status: 409 }
      )
    }

    const { error: insertError } = await admin
      .from('space_members')
      .insert({ space_id: spaceId, user_id: inviteeId, role, invited_by: user.id })

    if (insertError) {
      return NextResponse.json({ success: false, error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 })
  }
}
````

## File: app/page.tsx
````typescript
import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/dashboard')
}
````

## File: components/editor/AttachmentPanel.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  getAttachments, uploadAttachment, deleteAttachment, getAttachmentUrl,
} from '@/lib/supabase/attachments'
import type { Attachment } from '@/types'
import {
  Paperclip, X, Download, File, FileText, ImageIcon, Music, Video, Loader2,
} from 'lucide-react'

interface UploadItem {
  id: string
  name: string
  progress: number
  error?: string
}

function formatSize(bytes: number | null): string {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileTypeIcon({ type }: { type: string | null }) {
  const t = type ?? ''
  if (t.startsWith('image/')) return <ImageIcon size={14} className="text-blue-400 shrink-0" />
  if (t.startsWith('audio/')) return <Music size={14} className="text-purple-400 shrink-0" />
  if (t.startsWith('video/')) return <Video size={14} className="text-orange-400 shrink-0" />
  if (t === 'application/pdf') return <FileText size={14} className="text-red-400 shrink-0" />
  return <File size={14} className="text-muted shrink-0" />
}

export default function AttachmentPanel({ noteId }: { noteId: string }) {
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [uploads, setUploads] = useState<UploadItem[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAttachments(noteId)
        setAttachments(data)
      } catch {
        // sin adjuntos
      }
    }
    load()
  }, [noteId])

  const processFiles = async (files: File[]) => {
    for (const file of files) {
      const uploadId = `${Date.now()}-${Math.random().toString(36).slice(2)}`
      setUploads((prev) => [...prev, { id: uploadId, name: file.name, progress: 0 }])

      try {
        const attachment = await uploadAttachment(noteId, file, (pct) => {
          setUploads((prev) =>
            prev.map((u) => u.id === uploadId ? { ...u, progress: pct } : u)
          )
        })
        setAttachments((prev) => [attachment, ...prev])
        setUploads((prev) => prev.filter((u) => u.id !== uploadId))
      } catch {
        setUploads((prev) =>
          prev.map((u) => u.id === uploadId ? { ...u, error: 'Error al subir' } : u)
        )
        setTimeout(() => {
          setUploads((prev) => prev.filter((u) => u.id !== uploadId))
        }, 3000)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    e.target.value = ''
    processFiles(files)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    processFiles(files)
  }

  const handleDelete = async (att: Attachment) => {
    setAttachments((prev) => prev.filter((a) => a.id !== att.id))
    try {
      await deleteAttachment(att.id, att.storage_path)
    } catch {
      setAttachments((prev) => [att, ...prev])
    }
  }

  const hasContent = attachments.length > 0 || uploads.length > 0

  return (
    <div
      className={`mt-8 pt-6 border-t transition ${
        dragging ? 'border-accent' : 'border-border'
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false)
      }}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Paperclip size={13} className="text-muted" />
          <span className="text-xs font-semibold text-muted uppercase tracking-wider">
            Archivos adjuntos
          </span>
          {hasContent && (
            <span className="text-xs text-subtle">
              ({attachments.length})
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-xs text-muted hover:text-accent transition cursor-pointer flex items-center gap-1"
        >
          <span>+</span>
          <span>Adjuntar</span>
        </button>
      </div>

      {/* Drop hint */}
      {dragging && (
        <div className="mb-3 rounded-xl border-2 border-dashed border-accent bg-accent/5 py-6 text-center">
          <Paperclip size={20} className="mx-auto mb-1.5 text-accent" />
          <p className="text-xs text-accent">Suelta los archivos aquí</p>
        </div>
      )}

      {/* Uploads in progress */}
      {uploads.length > 0 && (
        <div className="mb-2 space-y-2">
          {uploads.map((upload) => (
            <div key={upload.id} className="flex items-center gap-3 bg-surface rounded-lg px-3 py-2.5">
              <Loader2 size={14} className="text-accent animate-spin shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{upload.name}</p>
                {upload.error ? (
                  <p className="text-xs text-danger mt-0.5">{upload.error}</p>
                ) : (
                  <div className="mt-1.5 h-1 bg-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-200"
                      style={{ width: `${Math.max(upload.progress, 8)}%` }}
                    />
                  </div>
                )}
              </div>
              <span className="text-xs text-subtle shrink-0">
                {upload.error ? '' : `${upload.progress}%`}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* File list */}
      {attachments.length > 0 ? (
        <div className="divide-y divide-border">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="group flex items-center gap-3 py-2.5 first:pt-0"
            >
              <FileTypeIcon type={att.file_type} />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-foreground truncate">{att.file_name}</p>
                {att.file_size !== null && (
                  <p className="text-[11px] text-subtle">{formatSize(att.file_size)}</p>
                )}
              </div>
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition">
                <a
                  href={getAttachmentUrl(att.storage_path)}
                  download={att.file_name}
                  title="Descargar"
                  className="p-1.5 text-muted hover:text-foreground transition rounded cursor-pointer"
                >
                  <Download size={13} />
                </a>
                <button
                  type="button"
                  title="Eliminar adjunto"
                  onClick={() => handleDelete(att)}
                  className="p-1.5 text-muted hover:text-danger transition rounded cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : !dragging && uploads.length === 0 ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full py-5 rounded-xl border border-dashed border-border hover:border-accent/50 hover:bg-surface text-center transition cursor-pointer group"
        >
          <Paperclip size={16} className="mx-auto mb-1.5 text-subtle group-hover:text-accent transition" />
          <p className="text-xs text-subtle group-hover:text-muted transition">
            Arrastra archivos o haz clic para adjuntar
          </p>
        </button>
      ) : null}

      <input
        ref={inputRef}
        id={`attach-input-${noteId}`}
        data-testid="attachment-input"
        type="file"
        title="Seleccionar archivos"
        multiple
        className="hidden"
        onChange={handleInputChange}
      />
    </div>
  )
}
````

## File: components/editor/VersionHistoryPanel.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import { X, History, RotateCcw, Clock, Loader2, Trash2, Save } from 'lucide-react'
import { getVersions, deleteVersion } from '@/lib/supabase/versions'
import type { NoteVersion } from '@/types'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { extractTextPreview } from '@/lib/utils/tiptap'

interface VersionHistoryPanelProps {
  noteId: string
  onSave: () => Promise<void>
  onRestore: (version: NoteVersion) => void
  onClose: () => void
}

export default function VersionHistoryPanel({
  noteId,
  onSave,
  onRestore,
  onClose,
}: VersionHistoryPanelProps) {
  const [versions, setVersions] = useState<NoteVersion[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState<NoteVersion | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getVersions(noteId)
      setVersions(data)
      if (data.length > 0 && !selected) setSelected(data[0])
    } catch {
      // silencioso
    } finally {
      setLoading(false)
    }
  }

  // Recarga el historial cuando cambia la nota; load() es estable para este efecto.
  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks/exhaustive-deps
  useEffect(() => { load() }, [noteId])

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave()
      await load()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (version: NoteVersion) => {
    setDeletingId(version.id)
    try {
      await deleteVersion(version.id)
      const updated = versions.filter((v) => v.id !== version.id)
      setVersions(updated)
      if (selected?.id === version.id) {
        setSelected(updated.length > 0 ? updated[0] : null)
      }
    } catch {
      // silencioso
    } finally {
      setDeletingId(null)
    }
  }

  const handleRestore = () => {
    if (!selected) return
    onRestore(selected)
    onClose()
  }

  return (
    <div className="w-72 shrink-0 border-l border-border bg-panel flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <History size={14} className="text-accent" />
          <span className="text-sm font-medium text-foreground">Historial</span>
        </div>
        <button
          type="button"
          title="Cerrar historial"
          onClick={onClose}
          className="text-muted hover:text-foreground transition p-0.5 rounded cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Botón guardar versión */}
      <div className="px-4 py-3 border-b border-border shrink-0">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 py-2 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-light disabled:opacity-50 transition cursor-pointer"
        >
          {saving ? (
            <Loader2 size={12} className="animate-spin" />
          ) : (
            <Save size={12} />
          )}
          {saving ? 'Guardando...' : 'Guardar versión ahora'}
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center flex-1">
          <Loader2 size={18} className="text-muted animate-spin" />
        </div>
      ) : versions.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 px-4 text-center">
          <Clock size={28} className="text-subtle" />
          <div>
            <p className="text-sm font-medium text-foreground">Sin versiones guardadas</p>
            <p className="text-xs text-muted mt-1">
              Haz click en &quot;Guardar versión ahora&quot; para crear un punto de restauración
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Lista de versiones */}
          <div className="flex-1 overflow-y-auto divide-y divide-border min-h-0">
            {versions.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelected(v)}
                className={`group flex items-center justify-between gap-2 px-4 py-3 cursor-pointer transition ${
                  selected?.id === v.id
                    ? 'bg-accent/10 border-l-2 border-l-accent'
                    : 'hover:bg-surface'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-foreground">
                      v{v.version_number}
                    </span>
                    <span className="text-[10px] text-subtle">
                      {format(parseISO(v.created_at), 'd MMM, HH:mm', { locale: es })}
                    </span>
                  </div>
                  <p className="text-xs text-muted mt-0.5 truncate">{v.title}</p>
                </div>
                <button
                  type="button"
                  title="Eliminar versión"
                  onClick={(e) => { e.stopPropagation(); handleDelete(v) }}
                  disabled={deletingId === v.id}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-muted hover:text-danger rounded-lg hover:bg-surface transition cursor-pointer shrink-0"
                >
                  {deletingId === v.id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <Trash2 size={12} />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Preview + restaurar */}
          {selected && (
            <div className="border-t border-border p-4 shrink-0">
              <p className="text-[10px] text-subtle uppercase tracking-wider mb-2">
                Vista previa — v{selected.version_number}
              </p>
              <p className="text-xs font-semibold text-foreground truncate mb-1">
                {selected.title}
              </p>
              <p className="text-xs text-muted line-clamp-3 leading-relaxed">
                {extractTextPreview(selected.content, 150) || 'Sin contenido'}
              </p>
              <button
                type="button"
                onClick={handleRestore}
                className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-surface border border-border text-foreground text-xs font-medium rounded-lg hover:border-accent/40 hover:bg-elevated transition cursor-pointer"
              >
                <RotateCcw size={12} />
                Restaurar esta versión
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
````

## File: components/sidebar/NotificationBell.tsx
````typescript
'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, Users, Clock, Share2, UserMinus, X, CheckCheck, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { useNotifications } from '@/hooks/useNotifications'
import type { Notification, NotificationType } from '@/types'

const typeIcon: Record<NotificationType, React.ReactNode> = {
  space_invite: <Users size={14} />,
  task_reminder: <Clock size={14} />,
  note_shared: <Share2 size={14} />,
  space_removed: <UserMinus size={14} />,
}

interface NotificationBellProps {
  collapsed: boolean
}

export default function NotificationBell({ collapsed }: NotificationBellProps) {
  const { notifications, unreadCount, markAsRead, markAllRead, deleteNotification } = useNotifications()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const handleNotificationClick = async (n: Notification) => {
    if (!n.is_read) await markAsRead(n.id)
  }

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    await deleteNotification(id)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        title="Notificaciones"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2.5 rounded-lg py-2 text-sm text-muted hover:bg-surface hover:text-foreground transition cursor-pointer ${
          collapsed ? 'justify-center px-2' : 'px-3'
        }`}
      >
        <span className="relative shrink-0">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </span>
        {!collapsed && <span className="font-medium">Notificaciones</span>}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-1 w-80 bg-elevated border border-border rounded-xl shadow-2xl z-50 flex flex-col" style={{ maxHeight: '420px' }}>
          {/* Header — fixed */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
            <span className="text-sm font-semibold text-foreground">
              Notificaciones
              {unreadCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-danger/20 text-danger text-[10px] font-semibold rounded-full">
                  {unreadCount}
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  title="Marcar todas como leídas"
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs text-muted hover:text-accent transition cursor-pointer"
                >
                  <CheckCheck size={13} />
                  <span>Marcar todas</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 text-muted hover:text-foreground transition cursor-pointer rounded"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Scrollable list */}
          <div className="overflow-y-auto flex-1 min-h-0">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell size={22} className="mx-auto mb-2 text-subtle" />
                <p className="text-xs text-muted">Sin notificaciones</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`group flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 cursor-pointer transition-colors ${
                    n.is_read
                      ? 'hover:bg-surface'
                      : 'bg-accent/5 hover:bg-accent/10'
                  }`}
                >
                  <span className={`mt-0.5 shrink-0 ${n.is_read ? 'text-muted' : 'text-accent'}`}>
                    {typeIcon[n.type] ?? <Bell size={14} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${n.is_read ? 'text-muted' : 'text-foreground'}`}>
                      {n.title}
                    </p>
                    {n.body && (
                      <p className="text-xs text-muted mt-0.5 line-clamp-2">{n.body}</p>
                    )}
                    <p className="text-[10px] text-subtle mt-1">
                      {formatDistanceToNow(new Date(n.created_at), { locale: es, addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-1">
                    {!n.is_read && (
                      <span className="w-2 h-2 rounded-full bg-accent mt-1" />
                    )}
                    <button
                      type="button"
                      title="Eliminar notificación"
                      onClick={(e) => handleDelete(e, n.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-subtle hover:text-danger transition rounded cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
````

## File: components/spaces/InviteModal.tsx
````typescript
'use client'

import { useState } from 'react'
import { X, UserPlus, Search, Check, ChevronLeft, Loader2 } from 'lucide-react'
import type { SpaceRole } from '@/types'

interface InviteModalProps {
  spaceId: string
  onClose: () => void
}

interface FoundUser {
  email: string
  displayName: string | null
}

const ROLE_OPTIONS: { value: SpaceRole; label: string; description: string }[] = [
  { value: 'viewer', label: 'Viewer',  description: 'Solo puede leer' },
  { value: 'editor', label: 'Editor',  description: 'Puede crear y editar' },
  { value: 'admin',  label: 'Admin',   description: 'Puede invitar y administrar' },
]

function initials(user: FoundUser): string {
  const source = user.displayName?.trim() || user.email
  const parts = source.split(/[\s@._-]+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export default function InviteModal({ spaceId, onClose }: InviteModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<SpaceRole>('viewer')
  const [step, setStep] = useState<'search' | 'confirm'>('search')
  const [foundUser, setFoundUser] = useState<FoundUser | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Introduce un email válido')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/spaces/lookup-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId, email: email.trim() }),
      })
      const json = await res.json()
      if (!json.success) {
        setError(json.error ?? 'No se pudo buscar el usuario')
        return
      }
      setFoundUser(json.user as FoundUser)
      setStep('confirm')
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async () => {
    if (!foundUser) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/spaces/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId, email: foundUser.email, role }),
      })
      const json = await res.json()
      if (!json.success) {
        setError(json.error ?? 'Error al invitar')
        return
      }
      setSuccess(`${foundUser.displayName || foundUser.email} fue invitado como ${role}.`)
      // Reset para invitar a otro
      setStep('search')
      setFoundUser(null)
      setEmail('')
    } catch {
      setError('Error de conexión')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    setStep('search')
    setError(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-panel border border-border rounded-2xl w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <UserPlus size={16} className="text-accent" />
            <h2 className="font-semibold text-foreground">Compartir space</h2>
          </div>
          <button type="button" title="Cerrar" onClick={onClose} className="text-muted hover:text-foreground transition">
            <X size={18} />
          </button>
        </div>

        {step === 'search' && (
          <form onSubmit={handleSearch} className="p-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider">
                Email del usuario
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null) }}
                placeholder="usuario@email.com"
                className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-subtle focus:outline-none focus:border-accent"
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted uppercase tracking-wider">
                Rol
              </label>
              <div className="flex gap-2">
                {ROLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRole(opt.value)}
                    className={`flex-1 flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-lg border text-xs transition ${
                      role === opt.value
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border bg-surface text-muted hover:border-accent/40'
                    }`}
                  >
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-[10px] opacity-70">{opt.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}
            {success && <p className="text-green-400 text-xs">{success}</p>}

            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-muted hover:text-foreground transition">
                Cerrar
              </button>
              <button
                type="submit"
                disabled={!email.trim() || loading}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                {loading ? 'Buscando…' : 'Buscar usuario'}
              </button>
            </div>
          </form>
        )}

        {step === 'confirm' && foundUser && (
          <div className="p-5 flex flex-col gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition w-fit"
            >
              <ChevronLeft size={15} />
              Cambiar
            </button>

            {/* Preview del usuario encontrado */}
            <div className="flex items-center gap-3 p-4 bg-surface border border-border rounded-xl">
              <div className="w-11 h-11 rounded-full bg-accent/15 text-accent flex items-center justify-center text-sm font-semibold shrink-0">
                {initials(foundUser)}
              </div>
              <div className="min-w-0">
                {foundUser.displayName && (
                  <p className="text-sm font-medium text-foreground truncate">{foundUser.displayName}</p>
                )}
                <p className={`truncate ${foundUser.displayName ? 'text-xs text-muted' : 'text-sm font-medium text-foreground'}`}>
                  {foundUser.email}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-muted uppercase tracking-wider">
                Será invitado como
              </span>
              <div className="flex gap-2">
                {ROLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRole(opt.value)}
                    className={`flex-1 flex flex-col items-center gap-0.5 px-3 py-2.5 rounded-lg border text-xs transition ${
                      role === opt.value
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border bg-surface text-muted hover:border-accent/40'
                    }`}
                  >
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-[10px] opacity-70">{opt.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-red-400 text-xs">{error}</p>}

            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-muted hover:text-foreground transition">
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                {loading ? 'Invitando…' : 'Confirmar invitación'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
````

## File: components/spaces/SharedWithMeView.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { Share2, Users, LogOut, Eye, Edit3, Shield, Crown, MoreHorizontal, BookOpen, Calendar } from 'lucide-react'
import { removeMember, getSpacesOverview } from '@/lib/supabase/spaces'
import type { SpaceOverview } from '@/lib/supabase/spaces'
import { useSpaceStore } from '@/store/spaceStore'
import { useUIStore } from '@/store/uiStore'
import { createClient } from '@/lib/supabase/client'
import { getSpaceColor, withAlpha } from '@/lib/utils/space-color'
import SpaceDetailView from './SpaceDetailView'
import type { Space, SpaceRole } from '@/types'

const ROLE_LABELS: Record<SpaceRole | 'owner', { label: string; icon: React.ReactNode }> = {
  owner:  { label: 'Dueño',   icon: <Crown size={11} /> },
  admin:  { label: 'Admin',   icon: <Shield size={11} /> },
  editor: { label: 'Editor',  icon: <Edit3 size={11} /> },
  viewer: { label: 'Viewer',  icon: <Eye size={11} /> },
}

function formatJoinDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function SharedWithMeView() {
  const { spaces, selectedSpace, removeSpace, addSpace, setSelectedSpace } = useSpaceStore()
  const { setCurrentView } = useUIStore()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [overview, setOverview] = useState<Map<string, SpaceOverview>>(new Map())
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const sharedSpaces = spaces.filter((s) => s.user_role !== 'owner')

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id ?? null)
    })
    getSpacesOverview()
      .then(setOverview)
      .catch(() => { /* counts opcionales: si fallan, las cards siguen funcionando */ })
  }, [])

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }
    if (openMenuId) document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [openMenuId])

  const handleOpenSpace = (space: Space) => {
    setSelectedSpace(space)
    setCurrentView('spaces')
  }

  const handleLeave = async (space: Space) => {
    if (!currentUserId) return
    setOpenMenuId(null)
    removeSpace(space.id)
    try {
      await removeMember(space.id, currentUserId)
    } catch {
      addSpace(space)
      setError('No se pudo salir del space')
    }
  }

  if (selectedSpace) {
    return (
      <SpaceDetailView
        space={selectedSpace}
        onBack={() => setSelectedSpace(null)}
      />
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-3xl mx-auto px-8 py-10 flex flex-col gap-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Compartido conmigo</h1>
          <p className="text-sm text-muted mt-0.5">
            {sharedSpaces.length} space{sharedSpaces.length !== 1 ? 's' : ''}
          </p>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Empty state */}
        {sharedSpaces.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="w-16 h-16 bg-panel border border-border rounded-2xl flex items-center justify-center">
              <Share2 size={28} className="text-subtle" />
            </div>
            <div>
              <p className="text-foreground font-medium">No tienes spaces compartidos contigo aún</p>
              <p className="text-muted text-sm mt-1">
                Cuando alguien te invite a un space aparecerá aquí.
              </p>
            </div>
          </div>
        )}

        {/* Spaces grid */}
        {sharedSpaces.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" ref={menuRef}>
            {sharedSpaces.map((space) => {
              const roleInfo = ROLE_LABELS[space.user_role ?? 'viewer']
              const menuOpen = openMenuId === space.id
              const color = getSpaceColor(space.id)
              const ov = overview.get(space.id)
              const memberTotal = (ov?.member_count ?? 0) + 1
              const notebookTotal = ov?.notebook_count ?? 0

              return (
                <div
                  key={space.id}
                  className="bg-panel border border-border rounded-xl overflow-hidden flex flex-col hover:border-accent/30 hover:shadow-lg transition"
                >
                  {/* Banner de color identificador */}
                  <div
                    className="h-14 relative"
                    style={{ background: `linear-gradient(120deg, ${color}, ${withAlpha(color, 0.55)})` }}
                  >
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        type="button"
                        title="Opciones"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenMenuId(menuOpen ? null : space.id)
                        }}
                        className="p-1 rounded-md bg-black/15 text-white/90 hover:bg-black/30 transition"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {menuOpen && (
                        <div className="absolute right-0 top-9 z-20 bg-elevated border border-border rounded-xl shadow-xl min-w-[160px] py-1 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => handleLeave(space)}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-surface transition text-left"
                          >
                            <LogOut size={13} className="text-muted" />
                            Salir del space
                          </button>
                        </div>
                      )}
                    </div>

                    <div
                      className="absolute -bottom-5 left-4 w-11 h-11 rounded-xl border-2 border-panel flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      <Users size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Cuerpo clickable */}
                  <button
                    type="button"
                    title={`Abrir ${space.name}`}
                    onClick={() => handleOpenSpace(space)}
                    className="flex flex-col gap-2 px-4 pt-7 pb-4 text-left flex-1"
                  >
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-[15px] truncate">{space.name}</p>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-accent/10 text-accent text-[10px] rounded-full border border-accent/20 shrink-0">
                        {roleInfo.icon}
                        {roleInfo.label}
                      </span>
                    </div>

                    {space.description && (
                      <p className="text-xs text-muted line-clamp-2">{space.description}</p>
                    )}

                    {/* Dueño */}
                    {ov?.owner_email && (
                      <p className="text-xs text-muted flex items-center gap-1 truncate">
                        <Crown size={11} className="text-accent shrink-0" />
                        <span className="truncate">Dueño: {ov.owner_email}</span>
                      </p>
                    )}

                    {/* Footer: conteos + fecha de unión */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-subtle">
                      <span className="inline-flex items-center gap-1">
                        <Users size={13} />
                        {memberTotal} {memberTotal === 1 ? 'miembro' : 'miembros'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <BookOpen size={13} />
                        {notebookTotal} {notebookTotal === 1 ? 'libreta' : 'libretas'}
                      </span>
                      {ov?.my_joined_at && (
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={13} />
                          {formatJoinDate(ov.my_joined_at)}
                        </span>
                      )}
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
````

## File: components/spaces/SpacesView.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, Plus, MoreHorizontal, Pencil, Trash2, LogOut, Crown, Shield, Eye, Edit3, BookOpen } from 'lucide-react'
import { getMySpaces, deleteSpace, removeMember, getSpacesOverview } from '@/lib/supabase/spaces'
import type { SpaceOverview } from '@/lib/supabase/spaces'
import { useSpaceStore } from '@/store/spaceStore'
import { createClient } from '@/lib/supabase/client'
import { getSpaceColor, withAlpha } from '@/lib/utils/space-color'
import CreateSpaceModal from './CreateSpaceModal'
import SpaceDetailView from './SpaceDetailView'
import type { Space, SpaceRole } from '@/types'

const ROLE_LABELS: Record<SpaceRole | 'owner', { label: string; icon: React.ReactNode }> = {
  owner:  { label: 'Dueño',   icon: <Crown size={11} /> },
  admin:  { label: 'Admin',   icon: <Shield size={11} /> },
  editor: { label: 'Editor',  icon: <Edit3 size={11} /> },
  viewer: { label: 'Viewer',  icon: <Eye size={11} /> },
}

export default function SpacesView() {
  const { spaces, selectedSpace, isLoading, setSpaces, addSpace, updateSpace, removeSpace, setSelectedSpace, setLoading } = useSpaceStore()
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [overview, setOverview] = useState<Map<string, SpaceOverview>>(new Map())
  const [showCreate, setShowCreate] = useState(false)
  const [editingSpace, setEditingSpace] = useState<Space | null>(null)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUserId(user?.id ?? null)
      try {
        const [data, ov] = await Promise.all([getMySpaces(), getSpacesOverview()])
        setSpaces(data)
        setOverview(ov)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar spaces')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [setSpaces, setLoading])

  // Cerrar menú al click fuera
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }
    if (openMenuId) document.addEventListener('mousedown', handleMouseDown)
    return () => document.removeEventListener('mousedown', handleMouseDown)
  }, [openMenuId])

  const handleDelete = async (space: Space) => {
    setOpenMenuId(null)
    removeSpace(space.id)
    try {
      await deleteSpace(space.id)
    } catch {
      addSpace(space)
    }
  }

  const handleLeave = async (space: Space) => {
    if (!currentUserId) return
    setOpenMenuId(null)
    removeSpace(space.id)
    try {
      await removeMember(space.id, currentUserId)
    } catch {
      addSpace(space)
    }
  }

  const handleRename = (space: Space) => {
    setOpenMenuId(null)
    setEditingSpace(space)
  }

  const handleUpdated = (updated: Space) => {
    updateSpace(updated)
    setEditingSpace(null)
  }

  // Si hay un space seleccionado → mostrar detalle
  if (selectedSpace) {
    return (
      <SpaceDetailView
        space={selectedSpace}
        onBack={() => setSelectedSpace(null)}
      />
    )
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <p className="text-muted text-sm">Cargando spaces…</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-3xl mx-auto px-8 py-10 flex flex-col gap-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Spaces</h1>
            <p className="text-sm text-muted mt-0.5">
              {spaces.length} space{spaces.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            type="button"
            title="Nuevo space"
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 transition"
          >
            <Plus size={15} />
            Nuevo space
          </button>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {/* Empty state */}
        {spaces.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <div className="w-16 h-16 bg-panel border border-border rounded-2xl flex items-center justify-center">
              <Users size={28} className="text-subtle" />
            </div>
            <div>
              <p className="text-foreground font-medium">Aún no tienes spaces</p>
              <p className="text-muted text-sm mt-1">
                Crea uno para colaborar con tu equipo.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 transition"
            >
              Crear primer space
            </button>
          </div>
        )}

        {/* Spaces grid */}
        {spaces.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" ref={menuRef}>
            {spaces.map((space) => {
              const roleInfo = ROLE_LABELS[space.user_role ?? 'viewer']
              const isOwner = space.user_role === 'owner'
              const canManage = isOwner || space.user_role === 'admin'
              const menuOpen = openMenuId === space.id
              const color = getSpaceColor(space.id)
              const ov = overview.get(space.id)
              // Total de personas = miembros (space_members) + 1 (dueño, que no
              // está en space_members).
              const memberTotal = (ov?.member_count ?? 0) + 1
              const notebookTotal = ov?.notebook_count ?? 0

              return (
                <div
                  key={space.id}
                  className="bg-panel border border-border rounded-xl overflow-hidden flex flex-col hover:border-accent/30 hover:shadow-lg transition"
                >
                  {/* Banner de color identificador */}
                  <div
                    className="h-14 relative"
                    style={{ background: `linear-gradient(120deg, ${color}, ${withAlpha(color, 0.55)})` }}
                  >
                    {/* 3-dot menu sobre el banner */}
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        type="button"
                        title="Opciones"
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenMenuId(menuOpen ? null : space.id)
                        }}
                        className="p-1 rounded-md bg-black/15 text-white/90 hover:bg-black/30 transition"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {menuOpen && (
                        <div className="absolute right-0 top-9 z-20 bg-elevated border border-border rounded-xl shadow-xl min-w-[160px] py-1 overflow-hidden">
                          {canManage && (
                            <button
                              type="button"
                              onClick={() => handleRename(space)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-surface transition text-left"
                            >
                              <Pencil size={13} className="text-muted" />
                              Renombrar
                            </button>
                          )}
                          {!isOwner && (
                            <button
                              type="button"
                              onClick={() => handleLeave(space)}
                              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-surface transition text-left"
                            >
                              <LogOut size={13} className="text-muted" />
                              Salir del space
                            </button>
                          )}
                          {isOwner && (
                            <>
                              <div className="my-1 border-t border-border" />
                              <button
                                type="button"
                                onClick={() => handleDelete(space)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-surface transition text-left"
                              >
                                <Trash2 size={13} />
                                Eliminar
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Icono solapado */}
                    <div
                      className="absolute -bottom-5 left-4 w-11 h-11 rounded-xl border-2 border-panel flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      <Users size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Cuerpo clickable */}
                  <button
                    type="button"
                    title={`Abrir ${space.name}`}
                    onClick={() => setSelectedSpace(space)}
                    className="flex flex-col gap-2 px-4 pt-7 pb-4 text-left flex-1"
                  >
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground text-[15px] truncate">{space.name}</p>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-accent/10 text-accent text-[10px] rounded-full border border-accent/20 shrink-0">
                        {roleInfo.icon}
                        {roleInfo.label}
                      </span>
                    </div>
                    <p className="text-xs text-muted line-clamp-2 min-h-[2rem]">
                      {space.description || 'Sin descripción'}
                    </p>

                    {/* Footer: conteos */}
                    <div className="flex items-center gap-4 pt-1 text-xs text-subtle">
                      <span className="inline-flex items-center gap-1">
                        <Users size={13} />
                        {memberTotal} {memberTotal === 1 ? 'miembro' : 'miembros'}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <BookOpen size={13} />
                        {notebookTotal} {notebookTotal === 1 ? 'libreta' : 'libretas'}
                      </span>
                    </div>
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showCreate && (
        <CreateSpaceModal
          onClose={() => setShowCreate(false)}
          onCreated={(space) => { addSpace(space); setShowCreate(false) }}
        />
      )}

      {editingSpace && (
        <CreateSpaceModal
          editSpace={editingSpace}
          onClose={() => setEditingSpace(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  )
}
````

## File: components/templates/TemplateSelector.tsx
````typescript
'use client'

import { useEffect, useMemo, useState } from 'react'
import { X, FileText, LayoutTemplate, Loader2, ArrowLeft } from 'lucide-react'
import { getTemplates } from '@/lib/supabase/templates'
import { createNote, updateNote } from '@/lib/supabase/notes'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import TemplatePreview from './TemplatePreview'
import NotebookPicker from './NotebookPicker'
import type { Template, Notebook } from '@/types'

const LAST_NOTEBOOK_KEY = 'noteevo-last-template-notebook'

interface TemplateSelectorProps {
  onSelectBlank: () => void
  onClose: () => void
}

export default function TemplateSelector({ onSelectBlank, onClose }: TemplateSelectorProps) {
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState<'list' | 'preview'>('list')
  const [selected, setSelected] = useState<Template | null>(null)
  const [chosen, setChosen] = useState<Notebook | null>(null)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const defaultNotebook = useMemo(() => {
    if (notebooks.length === 0) return null
    const lastId = typeof window !== 'undefined' ? localStorage.getItem(LAST_NOTEBOOK_KEY) : null
    return (lastId ? notebooks.find((n) => n.id === lastId) : null) ?? notebooks[0]
  }, [notebooks])
  const notebook = chosen ?? defaultNotebook

  const builtin = templates.filter((t) => t.is_builtin)
  const personal = templates.filter((t) => !t.is_builtin)

  const openPreview = (t: Template) => {
    setSelected(t)
    setError(null)
    setStep('preview')
  }

  const handleUse = async () => {
    if (!selected || !notebook) { setError('Elige una libreta para continuar'); return }
    setImporting(true)
    setError(null)
    try {
      const note = await createNote(notebook.id)
      await updateNote(note.id, { title: selected.name, content: selected.content })
      const populated = { ...note, title: selected.name, content: selected.content }
      addNote(populated)
      setSelectedNote(populated)
      setSelectedNotebook(notebook)
      if (typeof window !== 'undefined') localStorage.setItem(LAST_NOTEBOOK_KEY, notebook.id)
      setCurrentView('notebooks')
      onClose()
    } catch {
      setError('Error al usar la plantilla. Intenta de nuevo.')
      setImporting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className={`bg-panel border border-border rounded-2xl shadow-2xl w-full mx-4 overflow-hidden ${
        step === 'preview' ? 'max-w-3xl' : 'max-w-lg'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          {step === 'preview' ? (
            <button
              type="button"
              onClick={() => setStep('list')}
              className="flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition cursor-pointer"
            >
              <ArrowLeft size={15} />
              Volver
            </button>
          ) : (
            <div>
              <h2 className="font-semibold text-foreground">Nueva nota</h2>
              <p className="text-xs text-muted mt-0.5">Elige un punto de partida</p>
            </div>
          )}
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {step === 'list' ? (
          <div className="p-4 max-h-[70vh] overflow-y-auto space-y-4">
            {/* En blanco */}
            <button
              type="button"
              onClick={onSelectBlank}
              className="w-full flex items-center gap-4 p-4 bg-surface border-2 border-accent/30 rounded-xl hover:border-accent hover:bg-elevated transition cursor-pointer text-left"
            >
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                <FileText size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">En blanco</p>
                <p className="text-xs text-muted mt-0.5">Comienza con una nota vacía</p>
              </div>
            </button>

            {loading ? (
              <div className="flex items-center justify-center py-6">
                <Loader2 size={18} className="text-muted animate-spin" />
              </div>
            ) : (
              <>
                {builtin.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-subtle uppercase tracking-wider mb-2 px-1">
                      Plantillas incluidas
                    </p>
                    <div className="space-y-1.5">
                      {builtin.map((t) => (
                        <TemplateRow key={t.id} template={t} onClick={() => openPreview(t)} />
                      ))}
                    </div>
                  </div>
                )}
                {personal.length > 0 && (
                  <div>
                    <p className="text-[10px] font-semibold text-subtle uppercase tracking-wider mb-2 px-1">
                      Mis plantillas
                    </p>
                    <div className="space-y-1.5">
                      {personal.map((t) => (
                        <TemplateRow key={t.id} template={t} onClick={() => openPreview(t)} />
                      ))}
                    </div>
                  </div>
                )}
                {templates.length === 0 && (
                  <div className="flex flex-col items-center gap-2 py-6 text-center">
                    <LayoutTemplate size={24} className="text-subtle" />
                    <p className="text-sm text-muted">Sin plantillas disponibles</p>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          selected && (
            <div className="flex flex-col sm:flex-row max-h-[70vh]">
              {/* Preview */}
              <div className="flex-1 overflow-y-auto p-5 bg-surface/30 tiptap-preview text-sm border-b sm:border-b-0 sm:border-r border-border">
                <TemplatePreview content={selected.content} />
              </div>
              {/* Acciones */}
              <div className="w-full sm:w-64 shrink-0 p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-foreground">{selected.name}</h3>
                  {selected.description && (
                    <p className="text-xs text-muted mt-1 leading-relaxed">{selected.description}</p>
                  )}
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-foreground">¿Dónde guardarla?</p>
                  <NotebookPicker notebooks={notebooks} selected={notebook} onSelect={setChosen} />
                  {error && <p className="text-xs text-danger">{error}</p>}
                  <button
                    type="button"
                    onClick={handleUse}
                    disabled={importing || !notebook}
                    className="w-full py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    {importing && <Loader2 size={14} className="animate-spin" />}
                    {importing ? 'Creando…' : 'Usar plantilla'}
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

function TemplateRow({ template, onClick }: { template: Template; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3.5 bg-surface border border-border rounded-xl hover:border-accent/40 hover:bg-elevated transition cursor-pointer text-left"
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
        template.is_builtin ? 'bg-accent/10' : 'bg-elevated border border-border'
      }`}>
        <LayoutTemplate size={16} className={template.is_builtin ? 'text-accent' : 'text-muted'} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground truncate">{template.name}</p>
        {template.description && (
          <p className="text-xs text-muted truncate mt-0.5">{template.description}</p>
        )}
      </div>
      {template.category && (
        <span className="shrink-0 text-[10px] px-2 py-0.5 bg-elevated border border-border rounded-full text-subtle">
          {template.category}
        </span>
      )}
    </button>
  )
}
````

## File: e2e-walkthrough.mjs
````javascript
import { chromium } from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

const BASE = 'http://localhost:3000'
const EMAIL = 'mikecastillo855@gmail.com'
const PASSWORD = 'mike123'
const OUT = path.join(process.cwd(), 'e2e-out')
fs.mkdirSync(OUT, { recursive: true })

const consoleErrors = []
const networkErrors = []

const browser = await chromium.launch({ headless: true })
const page = await browser.newContext({ viewport: { width: 1440, height: 900 } }).then((c) => c.newPage())
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()) })
page.on('response', (r) => { if (r.status() >= 400) networkErrors.push(`${r.status()} ${r.request().method()} ${r.url()}`) })

try {
  await page.goto(`${BASE}/login`, { waitUntil: 'networkidle' })
  await page.fill('#email', EMAIL)
  await page.fill('#password', PASSWORD)
  await page.click('button:has-text("Entrar")')
  await page.waitForURL('**/dashboard**', { timeout: 15000 })
  await page.waitForTimeout(3500) // esperar carga de stats + render de recharts
  await page.screenshot({ path: path.join(OUT, 'dashboard-stats.png') })
  console.log('Screenshot guardado: dashboard-stats.png')
  console.log('consoleErrors:', JSON.stringify([...new Set(consoleErrors)]))
  console.log('networkErrors:', JSON.stringify([...new Set(networkErrors)]))
} catch (err) {
  console.log('FAIL:', err.message)
  await page.screenshot({ path: path.join(OUT, 'dashboard-stats-fail.png') }).catch(() => {})
} finally {
  await browser.close()
}
````

## File: lib/constants/colors.ts
````typescript
export const NOTE_COLORS = {
  red: '#fca5a5',
  orange: '#fdba74',
  yellow: '#fde047',
  green: '#86efac',
  teal: '#5eead4',
  blue: '#93c5fd',
  purple: '#d8b4fe',
  pink: '#f9a8d4',
} as const

export type NoteColor = keyof typeof NOTE_COLORS

export function isNoteColor(value: string | null | undefined): value is NoteColor {
  return value != null && value in NOTE_COLORS
}
````

## File: lib/supabase/notifications-server.ts
````typescript
import { createAdminClient } from './admin'

export async function notifyNoteOwner(
  userId: string,
  noteId: string,
  noteTitle: string
): Promise<void> {
  const supabase = createAdminClient()

  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()

  const { data: existing } = await supabase
    .from('notifications')
    .select('id')
    .eq('user_id', userId)
    .eq('type', 'note_shared')
    .contains('data', { note_id: noteId })
    .gte('created_at', oneHourAgo)
    .limit(1)
    .maybeSingle()

  if (existing) return

  await supabase.from('notifications').insert({
    user_id: userId,
    type: 'note_shared',
    title: 'Alguien vio tu nota',
    body: `Tu nota "${noteTitle}" fue visitada`,
    is_read: false,
    data: { note_id: noteId },
  })
}
````

## File: lib/supabase/profile.ts
````typescript
import { createClient } from './client'
import type { UserProfile } from '@/types'

export async function getProfile(): Promise<UserProfile | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data as UserProfile | null
}

export async function updateProfile(
  updates: Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>
): Promise<UserProfile> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  // Usar upsert en lugar de update: si la fila de perfil no existe (p. ej.
  // usuarios creados antes del trigger on_auth_user_created), la crea en vez
  // de fallar con 406. Las políticas RLS de INSERT y UPDATE ya lo permiten.
  const { data, error } = await supabase
    .from('user_profiles')
    .upsert(
      { id: user.id, ...updates, updated_at: new Date().toISOString() },
      { onConflict: 'id' }
    )
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as UserProfile
}

export async function uploadAvatar(file: File): Promise<string> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${user.id}/avatar.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true, contentType: file.type })

  if (uploadError) throw new Error(uploadError.message)

  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(path)

  return publicUrl
}
````

## File: lib/supabase/search.ts
````typescript
import { createClient } from './client'
import type { Note } from '@/types'

export async function searchNotes(query: string): Promise<Note[]> {
  if (!query.trim()) return []

  const supabase = createClient()
  const { data, error } = await supabase
    .rpc('search_notes', { search_query: query.trim() })

  if (error) throw new Error(error.message)
  return (data ?? []) as Note[]
}

export async function searchNotesAdvanced(params: {
  query: string
  notebookId?: string | null
  tagIds?: string[]
  dateFrom?: string | null
  dateTo?: string | null
  isFavorite?: boolean
}): Promise<Note[]> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('search_notes_advanced', {
    search_query: params.query.trim() || null,
    filter_notebook_id: params.notebookId ?? null,
    filter_tag_ids: params.tagIds && params.tagIds.length > 0 ? params.tagIds : null,
    filter_date_from: params.dateFrom ?? null,
    filter_date_to: params.dateTo ?? null,
    filter_is_favorite: params.isFavorite ?? null,
  })
  if (error) throw new Error(error.message)
  return (data ?? []) as Note[]
}
````

## File: lib/supabase/shared-notes-server.ts
````typescript
import { createAdminClient } from './admin'

type SharedNoteWithNote = {
  id: string
  note_id: string
  user_id: string
  public_slug: string
  is_active: boolean
  access_level: 'none' | 'view' | 'edit'
  view_count: number
  expires_at: string | null
  created_at: string
  notes: {
    id: string
    title: string
    content: Record<string, unknown>
    is_trashed: boolean
  }
}

export type UpdateSharedNoteResult =
  | { ok: true }
  | { ok: false; reason: 'not_found' | 'forbidden' | 'expired' | 'invalid' | 'error' }

export async function getSharedNote(slug: string): Promise<SharedNoteWithNote | null> {
  const supabase = createAdminClient()

  const { data: sharedNote, error } = await supabase
    .from('shared_notes')
    .select('*, notes(*)')
    .eq('public_slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !sharedNote) return null
  return sharedNote as SharedNoteWithNote
}

export async function getSharedNoteMeta(
  slug: string
): Promise<{ title: string } | null> {
  const result = await getSharedNote(slug)
  if (!result) return null
  return { title: result.notes.title }
}

/**
 * Guarda el contenido de una nota desde su link público de edición.
 * Solo permite escribir si el enlace está activo, su access_level es 'edit' y no
 * ha expirado. Usa el cliente admin (service role) para bypasear RLS — por eso
 * es server-only y valida cada condición de forma explícita.
 */
export async function updateSharedNoteContent(
  slug: string,
  content: unknown
): Promise<UpdateSharedNoteResult> {
  // Validación del payload en el límite del sistema.
  if (
    content === null ||
    typeof content !== 'object' ||
    Array.isArray(content)
  ) {
    return { ok: false, reason: 'invalid' }
  }
  // Cota de tamaño para evitar payloads abusivos en un endpoint público.
  if (JSON.stringify(content).length > 500_000) {
    return { ok: false, reason: 'invalid' }
  }

  const supabase = createAdminClient()

  const { data: shared, error } = await supabase
    .from('shared_notes')
    .select('note_id, is_active, access_level, expires_at')
    .eq('public_slug', slug)
    .maybeSingle()

  if (error) return { ok: false, reason: 'error' }
  if (!shared || !shared.is_active) return { ok: false, reason: 'not_found' }
  if (shared.access_level !== 'edit') return { ok: false, reason: 'forbidden' }
  if (shared.expires_at && new Date(shared.expires_at).getTime() < Date.now()) {
    return { ok: false, reason: 'expired' }
  }

  const { error: updateError } = await supabase
    .from('notes')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', shared.note_id)

  if (updateError) return { ok: false, reason: 'error' }
  return { ok: true }
}
````

## File: lib/supabase/storage.ts
````typescript
import { createClient } from './client'

export async function uploadNoteImage(file: File): Promise<string> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const ext = file.name.split('.').pop()
  const fileName = `${user.id}/${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from('note-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage
    .from('note-images')
    .getPublicUrl(fileName)

  return data.publicUrl
}

const MAX_COVER_BYTES = 5 * 1024 * 1024 // 5MB

export async function uploadNoteCover(file: File, noteId: string): Promise<string> {
  if (file.size > MAX_COVER_BYTES) {
    throw new Error('La imagen supera el tamaño máximo de 5MB')
  }

  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const path = `covers/${user.id}/${noteId}`

  const { error } = await supabase.storage
    .from('note-images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type,
    })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage
    .from('note-images')
    .getPublicUrl(path)

  // Cache-buster: la ruta es estable (upsert), forzamos recarga tras reemplazar
  return `${data.publicUrl}?t=${Date.now()}`
}
````

## File: lib/supabase/tasks.ts
````typescript
import { createClient } from './client'
import type { Task } from '@/types'

export type TaskWithContext = Task & {
  notes: {
    title: string
    notebook_id: string | null
    notebooks: { id: string; name: string } | null
  } | null
}

export async function getTasks(): Promise<Task[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getPendingTaskCount(): Promise<number> {
  const supabase = createClient()
  const { count, error } = await supabase
    .from('tasks')
    .select('id', { count: 'exact', head: true })
    .eq('is_completed', false)

  if (error) throw new Error(error.message)
  return count ?? 0
}

export async function getTasksWithNotebook(): Promise<TaskWithContext[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tasks')
    .select('*, notes(title, notebook_id, notebooks(id, name))')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as TaskWithContext[]
}

export async function createTask(
  title: string,
  opts: Partial<Pick<Task, 'description' | 'due_date' | 'start_time' | 'end_time' | 'priority' | 'note_id' | 'is_flagged'>> = {}
): Promise<Task> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('tasks')
    .insert({ title, user_id: user.id, ...opts })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateTask(
  id: string,
  updates: Partial<Pick<Task, 'title' | 'description' | 'due_date' | 'start_time' | 'end_time' | 'priority' | 'is_flagged' | 'reminder_at'>>
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('tasks').update(updates).eq('id', id)
  if (error) throw new Error(error.message)
}

export async function toggleTaskComplete(id: string, is_completed: boolean): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('tasks')
    .update({
      is_completed,
      completed_at: is_completed ? new Date().toISOString() : null,
    })
    .eq('id', id)
  if (error) throw new Error(error.message)
}

export async function deleteTask(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('tasks').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
````

## File: lib/supabase/templates.ts
````typescript
import { createClient } from './client'
import type { Template } from '@/types'
import { BUILTIN_TEMPLATES } from '@/lib/templates/builtin-templates'

export async function getTemplates(): Promise<Template[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('is_builtin', false)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  const personal = (data ?? []) as Template[]

  const builtin = BUILTIN_TEMPLATES.map((t) => ({
    ...t,
    user_id: null,
    created_at: '',
    updated_at: '',
  })) as Template[]

  return [...builtin, ...personal]
}

export async function createTemplate(
  name: string,
  content: Record<string, unknown>,
  opts: { description?: string; category?: string } = {}
): Promise<Template> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('templates')
    .insert({
      name: name.trim(),
      content,
      description: opts.description ?? null,
      category: opts.category ?? 'personal',
      is_builtin: false,
      user_id: user.id,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateTemplate(
  id: string,
  updates: Partial<Pick<Template, 'name' | 'description' | 'category' | 'content'>>
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('templates')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('is_builtin', false)
  if (error) throw new Error(error.message)
}

export async function deleteTemplate(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id)
    .eq('is_builtin', false)
  if (error) throw new Error(error.message)
}
````

## File: lib/utils/tiptap.ts
````typescript
// ─── Markdown → TipTap JSON ─────────────────────────────────────────────────

type TNode = Record<string, unknown>
type TMark = { type: string; attrs?: Record<string, unknown> }

// marked Token shape (minimal duck-type)
interface MToken {
  type: string
  text?: string
  depth?: number
  ordered?: boolean
  lang?: string
  href?: string
  tokens?: MToken[]
  items?: MToken[]
  task?: boolean
  checked?: boolean
}

function inlineToTipTap(tokens: MToken[], marks: TMark[] = []): TNode[] {
  const out: TNode[] = []
  for (const t of tokens) {
    switch (t.type) {
      case 'text':
      case 'escape': {
        if (t.tokens?.length) { out.push(...inlineToTipTap(t.tokens, marks)); break }
        if (!t.text) break
        const n: TNode = { type: 'text', text: t.text }
        if (marks.length) n.marks = marks
        out.push(n)
        break
      }
      case 'strong':
        out.push(...inlineToTipTap(t.tokens ?? [], [...marks, { type: 'bold' }]))
        break
      case 'em':
        out.push(...inlineToTipTap(t.tokens ?? [], [...marks, { type: 'italic' }]))
        break
      case 'del':
        out.push(...inlineToTipTap(t.tokens ?? [], [...marks, { type: 'strike' }]))
        break
      case 'codespan':
        out.push({ type: 'text', text: t.text ?? '', marks: [...marks, { type: 'code' }] })
        break
      case 'link':
        out.push(...inlineToTipTap(t.tokens ?? [], [...marks, { type: 'link', attrs: { href: t.href ?? '', target: '_blank' } }]))
        break
      case 'br':
        out.push({ type: 'hardBreak' })
        break
      default:
        if (t.text) out.push({ type: 'text', text: t.text, marks: marks.length ? marks : undefined })
    }
  }
  return out
}

function listItemContent(item: MToken): TNode[] {
  const first = item.tokens?.[0]
  if (!first) return []
  const inlineSrc =
    first.type === 'text' ? (first.tokens ?? []) :
    first.type === 'paragraph' ? (first.tokens ?? []) : []
  return inlineToTipTap(inlineSrc)
}

function blockToTipTap(t: MToken): TNode[] {
  switch (t.type) {
    case 'heading':
      return [{ type: 'heading', attrs: { level: t.depth ?? 1 }, content: inlineToTipTap(t.tokens ?? []) }]
    case 'paragraph':
      return [{ type: 'paragraph', content: inlineToTipTap(t.tokens ?? []) }]
    case 'list': {
      const listType = t.ordered ? 'orderedList' : 'bulletList'
      return [{
        type: listType,
        content: (t.items ?? []).map((item) =>
          item.task
            ? { type: 'taskItem', attrs: { checked: item.checked ?? false }, content: [{ type: 'paragraph', content: listItemContent(item) }] }
            : { type: 'listItem', content: [{ type: 'paragraph', content: listItemContent(item) }] }
        )
      }]
    }
    case 'code':
      return [{ type: 'codeBlock', attrs: { language: t.lang ?? null }, content: [{ type: 'text', text: t.text ?? '' }] }]
    case 'blockquote':
      return [{ type: 'blockquote', content: (t.tokens ?? []).flatMap(blockToTipTap) }]
    case 'hr':
      return [{ type: 'horizontalRule' }]
    case 'space':
      return []
    default:
      return t.text ? [{ type: 'paragraph', content: [{ type: 'text', text: t.text }] }] : []
  }
}

export function markdownToTipTap(markdown: string): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Lexer } = require('marked') as { Lexer: { lex: (src: string) => MToken[] } }
  const tokens = Lexer.lex(markdown)
  const content = tokens.flatMap(blockToTipTap)
  return { type: 'doc', content: content.length ? content : [{ type: 'paragraph', content: [] }] }
}

// ─── HTML → TipTap JSON (ENML server-side, no DOMParser) ─────────────────────

interface HtmlNode {
  tag: string
  attrs: Record<string, string>
  children: (HtmlNode | string)[]
}

function parseAttrs(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const re = /([a-zA-Z][a-zA-Z0-9_:-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/g
  let m: RegExpExecArray | null
  while ((m = re.exec(raw)) !== null) {
    if (m[1]) attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? ''
  }
  return attrs
}

function parseHtmlToTree(html: string): HtmlNode {
  const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col'])
  const root: HtmlNode = { tag: '#root', attrs: {}, children: [] }
  const stack: HtmlNode[] = [root]
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?(\/?)>|([^<]+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const cur = stack[stack.length - 1]
    if (m[5] !== undefined) {
      const text = m[5].replace(/\s+/g, ' ')
      if (text) cur.children.push(text)
    } else if (m[1] === '/') {
      if (stack.length > 1) stack.pop()
    } else {
      const tag = m[2].toLowerCase()
      const node: HtmlNode = { tag, attrs: parseAttrs(m[3] ?? ''), children: [] }
      cur.children.push(node)
      if (!VOID.has(tag) && m[4] !== '/') stack.push(node)
    }
  }
  return root
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

const INLINE_MARK_TAGS: Record<string, string> = {
  b: 'bold', strong: 'bold', i: 'italic', em: 'italic',
  u: 'underline', s: 'strike', strike: 'strike', del: 'strike', code: 'code',
}
const HTML_BLOCK_TAGS = new Set([
  'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'pre', 'blockquote', 'en-note', '#root',
])

function nodeToInline(node: HtmlNode | string, marks: TMark[] = []): TNode[] {
  if (typeof node === 'string') {
    const text = decodeHtmlEntities(node)
    if (!text) return []
    const n: TNode = { type: 'text', text }
    if (marks.length) n.marks = marks
    return [n]
  }
  const tag = node.tag
  if (INLINE_MARK_TAGS[tag]) return node.children.flatMap((c) => nodeToInline(c, [...marks, { type: INLINE_MARK_TAGS[tag] }]))
  if (tag === 'a') return node.children.flatMap((c) => nodeToInline(c, [...marks, { type: 'link', attrs: { href: node.attrs['href'] ?? '', target: '_blank' } }]))
  if (tag === 'br') return [{ type: 'hardBreak' }]
  return node.children.flatMap((c) => nodeToInline(c, marks))
}

function processBlockChildren(children: (HtmlNode | string)[]): TNode[] {
  const result: TNode[] = []
  let buf: TNode[] = []
  const flush = () => { if (buf.length) { result.push({ type: 'paragraph', content: buf }); buf = [] } }
  for (const child of children) {
    if (typeof child === 'string') {
      const text = decodeHtmlEntities(child.replace(/\s+/g, ' '))
      if (text.trim()) buf.push({ type: 'text', text })
    } else if (HTML_BLOCK_TAGS.has(child.tag)) {
      flush(); result.push(...htmlNodeToNodes(child))
    } else {
      buf.push(...nodeToInline(child))
    }
  }
  flush()
  return result
}

function extractLiInline(li: HtmlNode): TNode[] {
  const divChild = li.children.find((c): c is HtmlNode => typeof c !== 'string' && c.tag === 'div')
  const src = divChild ? divChild.children : li.children
  return src.flatMap((c) => nodeToInline(c))
}

function htmlNodeToNodes(node: HtmlNode): TNode[] {
  const tag = node.tag
  if (/^h[1-6]$/.test(tag)) {
    return [{ type: 'heading', attrs: { level: parseInt(tag[1]) }, content: node.children.flatMap((c) => nodeToInline(c)) }]
  }
  if (tag === 'pre') {
    const codeChild = node.children.find((c): c is HtmlNode => typeof c !== 'string' && c.tag === 'code')
    const src = codeChild ? codeChild.children : node.children
    const raw = src.map((c) => typeof c === 'string' ? c : '').join('')
    return [{ type: 'codeBlock', attrs: { language: null }, content: [{ type: 'text', text: decodeHtmlEntities(raw) }] }]
  }
  if (tag === 'blockquote') {
    const inner = processBlockChildren(node.children)
    return [{ type: 'blockquote', content: inner.length ? inner : [{ type: 'paragraph', content: [] }] }]
  }
  if (tag === 'ul') {
    const items = node.children.filter((c): c is HtmlNode => typeof c !== 'string' && c.tag === 'li')
    return items.length ? [{ type: 'bulletList', content: items.map((li) => ({ type: 'listItem', content: [{ type: 'paragraph', content: extractLiInline(li) }] })) }] : []
  }
  if (tag === 'ol') {
    const items = node.children.filter((c): c is HtmlNode => typeof c !== 'string' && c.tag === 'li')
    return items.length ? [{ type: 'orderedList', content: items.map((li) => ({ type: 'listItem', content: [{ type: 'paragraph', content: extractLiInline(li) }] })) }] : []
  }
  if (['div', 'p', 'en-note', '#root', 'span'].includes(tag)) {
    const hasBlock = node.children.some((c) => typeof c !== 'string' && HTML_BLOCK_TAGS.has(c.tag))
    if (hasBlock) return processBlockChildren(node.children)
    const inline = node.children.flatMap((c) => nodeToInline(c))
    return [{ type: 'paragraph', content: inline }]
  }
  return node.children.flatMap((c) => nodeToInline(c))
}

export function htmlToTipTap(html: string): Record<string, unknown> {
  const clean = html.replace(/<!DOCTYPE[^>]*>/gi, '').replace(/<\?xml[^>]*\?>/g, '').trim()
  const tree = parseHtmlToTree(clean)
  const content = htmlNodeToNodes(tree)
  return { type: 'doc', content: content.length ? content : [{ type: 'paragraph', content: [] }] }
}

// ─── Text preview (existing) ─────────────────────────────────────────────────

export function extractTextPreview(
  content: Record<string, unknown>,
  maxLength = 120
): string {
  if (!content || Object.keys(content).length === 0) return ''

  const extractText = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const n = node as Record<string, unknown>
    if (n.type === 'text') return String(n.text || '')
    if (Array.isArray(n.content)) {
      return n.content.map(extractText).join(' ')
    }
    return ''
  }

  const text = extractText(content).replace(/\s+/g, ' ').trim()
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}
````

## File: middleware.ts
````typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Si no está autenticado y trata de acceder al dashboard → redirigir al login
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Si está autenticado y trata de acceder al login/register → redirigir al dashboard
  if (user && (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  // /n/:path* is intentionally excluded — public shared-note pages require no auth
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
````

## File: store/notebookStore.ts
````typescript
import { create } from 'zustand'
import { Notebook } from '@/types'

interface NotebookStore {
  notebooks: Notebook[]
  selectedNotebook: Notebook | null
  setNotebooks: (notebooks: Notebook[]) => void
  addNotebook: (notebook: Notebook) => void
  deleteNotebook: (id: string) => void
  renameNotebook: (id: string, name: string) => void
  setSelectedNotebook: (notebook: Notebook | null) => void
}

export const useNotebookStore = create<NotebookStore>((set) => ({
  notebooks: [],
  selectedNotebook: null,
  setNotebooks: (notebooks) => set({ notebooks }),
  addNotebook: (notebook) =>
    set((state) => ({ notebooks: [...state.notebooks, notebook] })),
  deleteNotebook: (id) =>
    set((state) => ({
      notebooks: state.notebooks.filter((n) => n.id !== id),
    })),
  renameNotebook: (id, name) =>
    set((state) => ({
      notebooks: state.notebooks.map((n) => n.id === id ? { ...n, name } : n),
      selectedNotebook:
        state.selectedNotebook?.id === id
          ? { ...state.selectedNotebook, name }
          : state.selectedNotebook,
    })),
  setSelectedNotebook: (notebook) => set({ selectedNotebook: notebook }),
}))
````

## File: store/noteStore.ts
````typescript
import { create } from 'zustand'
import { Note } from '@/types'
import { getNotesByNotebook, createNote as createNoteApi } from '@/lib/supabase/notes'

interface NoteStore {
  notes: Note[]
  selectedNote: Note | null
  setNotes: (notes: Note[]) => void
  addNote: (note: Note) => void
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  setSelectedNote: (note: Note | null) => void
  fetchNotes: (notebookId: string) => Promise<void>
  createNote: (notebookId: string) => Promise<void>
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  selectedNote: null,
  setNotes: (notes) => set({ notes }),
  addNote: (note) =>
    set((state) => ({ notes: [note, ...state.notes] })),
  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
      selectedNote:
        state.selectedNote?.id === id
          ? { ...state.selectedNote, ...updates }
          : state.selectedNote,
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      selectedNote: state.selectedNote?.id === id ? null : state.selectedNote,
    })),
  setSelectedNote: (note) => set({ selectedNote: note }),
  fetchNotes: async (notebookId) => {
    try {
      const data = await getNotesByNotebook(notebookId)
      set({ notes: data })
    } catch {
      // error cargando notas
    }
  },
  createNote: async (notebookId) => {
    try {
      const note = await createNoteApi(notebookId)
      set((state) => ({ notes: [note, ...state.notes], selectedNote: note }))
    } catch {
      // error creando nota
    }
  },
}))
````

## File: store/profileStore.ts
````typescript
import { create } from 'zustand'
import type { UserProfile } from '@/types'
import { updateProfile } from '@/lib/supabase/profile'
import {
  DEFAULT_EDITOR_FONT,
  DEFAULT_EDITOR_FONT_SIZE,
  DEFAULT_EDITOR_LINE_HEIGHT,
} from '@/lib/constants/editor-fonts'

interface ProfileStore {
  profile: UserProfile | null
  // Tipografía del editor (Phase 17 id:61). Estado vivo: el editor lo lee de aquí
  // y se actualiza al instante cuando ajustes llama a un setter.
  editorFontFamily: string
  editorFontSize: number
  editorLineHeight: number
  setProfile: (profile: UserProfile | null) => void
  setEditorFontFamily: (value: string) => Promise<void>
  setEditorFontSize: (value: number) => Promise<void>
  setEditorLineHeight: (value: number) => Promise<void>
}

export const useProfileStore = create<ProfileStore>((set, get) => ({
  profile: null,
  editorFontFamily: DEFAULT_EDITOR_FONT,
  editorFontSize: DEFAULT_EDITOR_FONT_SIZE,
  editorLineHeight: DEFAULT_EDITOR_LINE_HEIGHT,

  setProfile: (profile) =>
    set({
      profile,
      editorFontFamily: profile?.editor_font_family ?? DEFAULT_EDITOR_FONT,
      editorFontSize: profile?.editor_font_size ?? DEFAULT_EDITOR_FONT_SIZE,
      editorLineHeight: profile?.editor_line_height ?? DEFAULT_EDITOR_LINE_HEIGHT,
    }),

  setEditorFontFamily: async (value) => {
    const prev = get().editorFontFamily
    set({ editorFontFamily: value }) // optimista: refleja en vivo
    try {
      const updated = await updateProfile({ editor_font_family: value })
      set({ profile: updated })
    } catch (err) {
      set({ editorFontFamily: prev }) // revertir
      throw new Error(err instanceof Error ? err.message : 'Error al guardar la fuente del editor')
    }
  },

  setEditorFontSize: async (value) => {
    const prev = get().editorFontSize
    set({ editorFontSize: value })
    try {
      const updated = await updateProfile({ editor_font_size: value })
      set({ profile: updated })
    } catch (err) {
      set({ editorFontSize: prev })
      throw new Error(err instanceof Error ? err.message : 'Error al guardar el tamaño de texto')
    }
  },

  setEditorLineHeight: async (value) => {
    const prev = get().editorLineHeight
    set({ editorLineHeight: value })
    try {
      const updated = await updateProfile({ editor_line_height: value })
      set({ profile: updated })
    } catch (err) {
      set({ editorLineHeight: prev })
      throw new Error(err instanceof Error ? err.message : 'Error al guardar el interlineado')
    }
  },
}))
````

## File: store/tagStore.ts
````typescript
import { create } from 'zustand'
import type { Tag } from '@/types'

interface TagStore {
  tags: Tag[]
  setTags: (tags: Tag[]) => void
  addTag: (tag: Tag) => void
  removeTag: (id: string) => void
  updateTag: (id: string, name: string) => void
}

export const useTagStore = create<TagStore>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
  addTag: (tag) =>
    set((state) => ({
      tags: [...state.tags, tag].sort((a, b) => a.name.localeCompare(b.name)),
    })),
  removeTag: (id) =>
    set((state) => ({ tags: state.tags.filter((t) => t.id !== id) })),
  updateTag: (id, name) =>
    set((state) => ({
      tags: state.tags
        .map((t) => (t.id === id ? { ...t, name } : t))
        .sort((a, b) => a.name.localeCompare(b.name)),
    })),
}))
````

## File: supabase/functions/send-reminders/index.ts
````typescript
// Edge Function: send-reminders
// Envía recordatorios de tareas por email vía Resend. Pensada para correr
// con un cron horario (ver supabase/functions/send-reminders/README.md).
//
// Flujo (basado en due_date, dos recordatorios independientes):
//   1. Llama al RPC get_due_date_reminders() (service_role) que devuelve las
//      tareas con due_date, no completadas, cuyo usuario tiene
//      email_notifications = true y a las que les falta enviar al menos uno de
//      los dos recordatorios.
//   2. Por cada tarea evalúa de forma independiente:
//        - due_date - 7 días <= ahora  y  reminder_7days_sent = false  → email "7 días"
//        - due_date - 1 día  <= ahora  y  reminder_1day_sent  = false  → email "1 día"
//   3. Marca cada flag (reminder_7days_sent / reminder_1day_sent) por separado
//      solo para las tareas cuyo email correspondiente se envió con éxito.
//
// Nota: la columna reminder_sent se mantiene en la tabla por compatibilidad
// pero ya no forma parte de este flujo.

import { createClient } from 'jsr:@supabase/supabase-js@2'

type ReminderKind = '7days' | '1day'

interface DueReminder {
  task_id: string
  title: string
  description: string | null
  due_date: string | null
  email: string
  display_name: string | null
  reminder_7days_sent: boolean
  reminder_1day_sent: boolean
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM = Deno.env.get('REMINDER_FROM') ?? 'NoteEvo <onboarding@resend.dev>'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function formatDate(iso: string | null): string {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('es', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'UTC',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Devuelve true si due_date - (offsetDays días) ya pasó respecto a ahora.
function isWithin(dueDate: string | null, offsetDays: number): boolean {
  if (!dueDate) return false
  const threshold = new Date(dueDate).getTime() - offsetDays * MS_PER_DAY
  return threshold <= Date.now()
}

function subjectFor(kind: ReminderKind, title: string): string {
  return kind === '7days'
    ? `⏰ Tu tarea vence en 7 días: ${title}`
    : `⏰ Tu tarea vence mañana: ${title}`
}

function buildHtml(r: DueReminder, kind: ReminderKind): string {
  const hello = r.display_name ? `Hola ${escapeHtml(r.display_name)},` : 'Hola,'
  const heading = kind === '7days'
    ? '⏰ Tu tarea vence en 7 días'
    : '⏰ Tu tarea vence mañana'
  const due = r.due_date
    ? `<p style="margin:0 0 8px;color:#6b6b6b;font-size:14px;">Vence: <strong>${formatDate(r.due_date)}</strong></p>`
    : ''
  const desc = r.description
    ? `<p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.5;">${escapeHtml(r.description)}</p>`
    : ''
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
    <div style="display:inline-block;width:40px;height:40px;background:#1a7a4a;border-radius:10px;text-align:center;line-height:40px;color:#fff;font-weight:700;font-size:18px;">N</div>
    <h1 style="font-size:20px;color:#1a1a1a;margin:16px 0 4px;">${heading}</h1>
    <p style="margin:0 0 16px;color:#6b6b6b;font-size:14px;">${hello}</p>
    <div style="background:#f6f6f6;border:1px solid #e4e4e4;border-radius:12px;padding:16px;">
      <h2 style="font-size:17px;color:#1a1a1a;margin:0 0 8px;">${escapeHtml(r.title)}</h2>
      ${due}
      ${desc}
    </div>
    <p style="margin:20px 0 0;color:#9a9a9a;font-size:12px;">Recibes este correo porque tienes activadas las notificaciones por email en NoteEvo.</p>
  </div>`
}

async function sendEmail(r: DueReminder, kind: ReminderKind): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [r.email],
      subject: subjectFor(kind, r.title),
      html: buildHtml(r, kind),
    }),
  })
  return res.ok
}

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

  const { data, error } = await supabase.rpc('get_due_date_reminders')
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const reminders = (data ?? []) as DueReminder[]
  const sent7Ids: string[] = []
  const sent1Ids: string[] = []
  let failed = 0

  for (const r of reminders) {
    // Recordatorio de 7 días: independiente del de 1 día.
    if (!r.reminder_7days_sent && isWithin(r.due_date, 7)) {
      try {
        if (await sendEmail(r, '7days')) sent7Ids.push(r.task_id)
        else failed++
      } catch {
        failed++
      }
    }

    // Recordatorio de 1 día: independiente del de 7 días.
    if (!r.reminder_1day_sent && isWithin(r.due_date, 1)) {
      try {
        if (await sendEmail(r, '1day')) sent1Ids.push(r.task_id)
        else failed++
      } catch {
        failed++
      }
    }
  }

  if (sent7Ids.length > 0) {
    await supabase.from('tasks').update({ reminder_7days_sent: true }).in('id', sent7Ids)
  }
  if (sent1Ids.length > 0) {
    await supabase.from('tasks').update({ reminder_1day_sent: true }).in('id', sent1Ids)
  }

  return new Response(
    JSON.stringify({
      found: reminders.length,
      sent7days: sent7Ids.length,
      sent1day: sent1Ids.length,
      failed,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
````

## File: supabase/functions/send-reminders/README.md
````markdown
# send-reminders

Edge Function que envía recordatorios de tareas por email vía [Resend](https://resend.com).

## Qué hace

1. Llama al RPC `get_due_date_reminders()` (solo `service_role`), que devuelve las
   tareas con `due_date` definido, `is_completed = false`, cuyo dueño tiene
   `email_notifications = true` y a las que les falta enviar al menos uno de los
   dos recordatorios.
2. Por cada tarea evalúa de forma **independiente** dos umbrales y envía hasta
   dos emails (asunto/encabezado distintos):
   - **7 días antes**: `due_date - 7 días <= now()` y `reminder_7days_sent = false`.
   - **1 día antes**: `due_date - 1 día <= now()` y `reminder_1day_sent = false`.
3. Marca `reminder_7days_sent` / `reminder_1day_sent` por separado, solo en las
   tareas cuyo email correspondiente se envió con éxito (evita reenvíos).

> La columna `reminder_sent` se conserva en la tabla por compatibilidad, pero ya
> no forma parte de este flujo.

## Secrets necesarios

`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` los inyecta Supabase automáticamente.
Falta configurar la clave de Resend (y opcionalmente el remitente):

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
# Opcional — usa un dominio verificado en Resend. Por defecto: onboarding@resend.dev
supabase secrets set REMINDER_FROM="NoteEvo <recordatorios@tudominio.com>"
```

## Desplegar

```bash
supabase functions deploy send-reminders
```

## Programar el cron (cada hora)

Requiere las extensiones `pg_cron` y `pg_net` (ya habilitadas en este proyecto).
Ejecuta este SQL **reemplazando** `<PROJECT_REF>` y `<SERVICE_ROLE_KEY>`:

```sql
select cron.schedule(
  'send-task-reminders-hourly',
  '0 * * * *',
  $$
  select net.http_post(
    url := 'https://<PROJECT_REF>.supabase.co/functions/v1/send-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer <SERVICE_ROLE_KEY>'
    ),
    body := '{}'::jsonb
  );
  $$
);
```

Para quitarlo: `select cron.unschedule('send-task-reminders-hourly');`

## Probar manualmente

```bash
curl -X POST 'https://<PROJECT_REF>.supabase.co/functions/v1/send-reminders' \
  -H 'Authorization: Bearer <SERVICE_ROLE_KEY>'
# => {"found":N,"sent7days":N,"sent1day":N,"failed":0}
```
````

## File: tests/store/taskStore.test.ts
````typescript
import { describe, it, expect, beforeEach } from 'vitest'
import type { Task } from '@/types'
import { useTaskStore } from '@/store/taskStore'

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 't1',
    user_id: 'u1',
    note_id: null,
    title: 'Tarea',
    description: null,
    due_date: null,
    reminder_at: null,
    priority: 'medium',
    is_flagged: false,
    is_completed: false,
    completed_at: null,
    created_at: '2026-01-01T00:00:00Z',
    reminder_7days_sent: false,
    reminder_1day_sent: false,
    ...overrides,
  } as Task
}

beforeEach(() => {
  useTaskStore.setState({ tasks: [] })
})

describe('taskStore', () => {
  it('setTasks replaces the list', () => {
    useTaskStore.getState().setTasks([makeTask({ id: 'a' }), makeTask({ id: 'b' })])
    expect(useTaskStore.getState().tasks).toHaveLength(2)
  })

  it('addTask prepends the new task', () => {
    useTaskStore.getState().setTasks([makeTask({ id: 'a' })])
    useTaskStore.getState().addTask(makeTask({ id: 'b' }))
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['b', 'a'])
  })

  it('updateTask patches the matching task', () => {
    useTaskStore.getState().setTasks([makeTask({ id: 'a', is_completed: false })])
    useTaskStore.getState().updateTask('a', { is_completed: true })
    expect(useTaskStore.getState().tasks[0].is_completed).toBe(true)
  })

  it('updateTask leaves other tasks unchanged', () => {
    useTaskStore.getState().setTasks([
      makeTask({ id: 'a', title: 'A' }),
      makeTask({ id: 'b', title: 'B' }),
    ])
    useTaskStore.getState().updateTask('a', { title: 'Cambiada' })
    const titles = useTaskStore.getState().tasks.map((t) => t.title)
    expect(titles).toEqual(['Cambiada', 'B'])
  })

  it('deleteTask removes the matching task', () => {
    useTaskStore.getState().setTasks([makeTask({ id: 'a' }), makeTask({ id: 'b' })])
    useTaskStore.getState().deleteTask('a')
    expect(useTaskStore.getState().tasks.map((t) => t.id)).toEqual(['b'])
  })
})
````

## File: app/(auth)/login/page.tsx
````typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Correo o contraseña incorrectos')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Bienvenido</h1>
          <p className="text-muted text-sm mt-1">Inicia sesión en NoteEvo</p>
        </div>

        {/* Form card */}
        <div className="bg-panel border border-border rounded-2xl p-6 space-y-4">
          {error && (
            <div className="p-3 bg-danger/10 border border-danger/25 rounded-lg">
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-muted mb-1.5"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-3 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-muted mb-1.5"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-3 py-2.5 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>
          </div>

          <button
            type="button"
            data-testid="login-submit"
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light disabled:opacity-50 transition cursor-pointer"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>

        <p className="mt-5 text-sm text-muted text-center">
          ¿No tienes cuenta?{' '}
          <Link href="/register" className="text-accent hover:text-accent-light transition">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  )
}
````

## File: app/(dashboard)/dashboard/settings/page.tsx
````typescript
'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { User, Settings, Bell, ArrowLeft, Camera, Check, Loader2, Minus, Plus } from 'lucide-react'
import { getProfile, updateProfile, uploadAvatar } from '@/lib/supabase/profile'
import { useProfileStore } from '@/store/profileStore'
import { useUIStore } from '@/store/uiStore'
import {
  EDITOR_FONTS,
  LINE_HEIGHT_OPTIONS,
  MIN_EDITOR_FONT_SIZE,
  MAX_EDITOR_FONT_SIZE,
  fontStackForKey,
} from '@/lib/constants/editor-fonts'
import type { UserProfile } from '@/types'

type Tab = 'perfil' | 'preferencias' | 'notificaciones'

const LANGUAGES = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
  { value: 'pt', label: 'Português' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
]

const TIMEZONES = [
  'America/Panama',
  'America/Bogota',
  'America/Lima',
  'America/Santiago',
  'America/Argentina/Buenos_Aires',
  'America/Mexico_City',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/Madrid',
  'Europe/London',
  'Asia/Tokyo',
]

function SaveButton({
  saving,
  saved,
  onClick,
}: {
  saving: boolean
  saved: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-accent-light disabled:opacity-60 transition cursor-pointer"
    >
      {saving && <Loader2 size={14} className="animate-spin" />}
      {!saving && saved && <Check size={14} />}
      {saved ? 'Guardado' : 'Guardar cambios'}
    </button>
  )
}

export default function SettingsPage() {
  const router = useRouter()
  const {
    setProfile: setStoreProfile,
    editorFontFamily,
    editorFontSize,
    editorLineHeight,
    setEditorFontFamily,
    setEditorFontSize,
    setEditorLineHeight,
  } = useProfileStore()
  const { setTheme: setStoreTheme } = useUIStore()

  const [activeTab, setActiveTab] = useState<Tab>('perfil')
  const [profile, setLocalProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedTab, setSavedTab] = useState<Tab | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Perfil
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Preferencias
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark')
  const [language, setLanguage] = useState('es')
  const [timezone, setTimezone] = useState('America/Panama')

  // Notificaciones
  const [emailNotifications, setEmailNotifications] = useState(true)

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (!p) return
        setLocalProfile(p)
        setStoreProfile(p)
        setDisplayName(p.display_name ?? '')
        setBio(p.bio ?? '')
        setTheme(p.theme ?? 'dark')
        setStoreTheme(p.theme ?? 'dark')
        setLanguage(p.language ?? 'es')
        setTimezone(p.timezone ?? 'America/Panama')
        setEmailNotifications(p.email_notifications ?? true)
      })
      .catch(() => setError('Error al cargar el perfil'))
      .finally(() => setLoading(false))
  }, [setStoreProfile])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const showSaved = (tab: Tab) => {
    setSavedTab(tab)
    setTimeout(() => setSavedTab(null), 2000)
  }

  const savePerfil = async () => {
    setSaving(true)
    setError(null)
    try {
      let avatarUrl = profile?.avatar_url ?? null
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile)
        setAvatarFile(null)
      }
      const updated = await updateProfile({
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
        avatar_url: avatarUrl,
      })
      setLocalProfile(updated)
      setStoreProfile(updated)
      showSaved('perfil')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el perfil')
    } finally {
      setSaving(false)
    }
  }

  const savePreferencias = async () => {
    setSaving(true)
    setError(null)
    try {
      const updated = await updateProfile({ theme, language, timezone })
      setLocalProfile(updated)
      setStoreProfile(updated)
      setStoreTheme(theme)
      showSaved('preferencias')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar las preferencias')
    } finally {
      setSaving(false)
    }
  }

  const saveNotificaciones = async () => {
    setSaving(true)
    setError(null)
    try {
      const updated = await updateProfile({ email_notifications: emailNotifications })
      setLocalProfile(updated)
      setStoreProfile(updated)
      showSaved('notificaciones')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar las notificaciones')
    } finally {
      setSaving(false)
    }
  }

  // Editor: cambios en vivo (el setter persiste en user_profiles y revierte si falla).
  const handleEditorFont = async (key: string) => {
    setError(null)
    try {
      await setEditorFontFamily(key)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar la fuente del editor')
    }
  }

  const handleEditorSize = async (next: number) => {
    const clamped = Math.min(MAX_EDITOR_FONT_SIZE, Math.max(MIN_EDITOR_FONT_SIZE, next))
    if (clamped === editorFontSize) return
    setError(null)
    try {
      await setEditorFontSize(clamped)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el tamaño de texto')
    }
  }

  const handleEditorLineHeight = async (value: number) => {
    setError(null)
    try {
      await setEditorLineHeight(value)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el interlineado')
    }
  }

  const fontPreviewStack = fontStackForKey(editorFontFamily)

  const avatarSrc = avatarPreview ?? (
    profile?.avatar_url
      ? `${profile.avatar_url}?t=${new Date(profile.updated_at).getTime()}`
      : null
  )
  const initials = (displayName || 'U').slice(0, 2).toUpperCase()

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'perfil', label: 'Perfil', icon: <User size={14} /> },
    { id: 'preferencias', label: 'Preferencias', icon: <Settings size={14} /> },
    { id: 'notificaciones', label: 'Notificaciones', icon: <Bell size={14} /> },
  ]

  return (
    <div className="min-h-full bg-background">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-1.5 text-muted hover:text-foreground hover:bg-surface rounded-lg transition cursor-pointer"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">Configuración</h1>
            <p className="text-xs text-muted mt-0.5">Personaliza tu cuenta y preferencias</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-surface rounded-xl mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-elevated text-foreground shadow-sm'
                  : 'text-muted hover:text-foreground'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={24} className="animate-spin text-muted" />
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-5 px-4 py-3 bg-danger/10 border border-danger/20 rounded-lg text-sm text-danger">
                {error}
              </div>
            )}

            {/* ── Perfil ── */}
            {activeTab === 'perfil' && (
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-5">
                  <div className="relative group">
                    {avatarSrc ? (
                      <img
                        src={avatarSrc}
                        alt="Avatar"
                        className="w-20 h-20 rounded-2xl object-cover border border-border"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-accent/20 border border-border flex items-center justify-center">
                        <span className="text-xl font-bold text-accent">{initials}</span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition cursor-pointer"
                    >
                      <Camera size={18} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Foto de perfil</p>
                    <p className="text-xs text-muted mt-0.5">JPG, PNG o WebP · Máx. 2 MB</p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 text-xs text-accent hover:text-accent-light transition cursor-pointer"
                    >
                      Cambiar foto
                    </button>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>

                {/* Nombre */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Nombre visible
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Tu nombre"
                    maxLength={60}
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition"
                    style={{ color: 'var(--color-foreground)' }}
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Cuéntanos algo sobre ti..."
                    maxLength={200}
                    rows={3}
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition resize-none"
                    style={{ color: 'var(--color-foreground)' }}
                  />
                  <p className="text-xs text-subtle mt-1 text-right">{bio.length}/200</p>
                </div>

                <SaveButton saving={saving} saved={savedTab === 'perfil'} onClick={savePerfil} />
              </div>
            )}

            {/* ── Preferencias ── */}
            {activeTab === 'preferencias' && (
              <div className="space-y-6">
                {/* Tema */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Tema</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { value: 'dark', label: 'Oscuro' },
                        { value: 'light', label: 'Claro' },
                        { value: 'system', label: 'Sistema' },
                      ] as const
                    ).map(({ value, label }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setTheme(value)}
                        className={`py-3 px-4 rounded-lg border text-sm font-medium transition cursor-pointer ${
                          theme === value
                            ? 'border-accent bg-accent/10 text-accent'
                            : 'border-border bg-surface text-muted hover:text-foreground'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Idioma */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Idioma</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition cursor-pointer"
                    style={{ color: 'var(--color-foreground)', backgroundColor: 'var(--color-surface)' }}
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.value} value={l.value}>
                        {l.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Zona horaria */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Zona horaria
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition cursor-pointer"
                    style={{ color: 'var(--color-foreground)', backgroundColor: 'var(--color-surface)' }}
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ── Editor: tipografía ── */}
                <div className="pt-2 border-t border-border">
                  <label className="block text-sm font-medium text-foreground mb-1">Editor</label>
                  <p className="text-xs text-muted mb-4">
                    Tipografía del cuerpo de tus notas. Los cambios se aplican al instante.
                  </p>

                  {/* Familia */}
                  <div className="mb-5">
                    <p className="text-xs font-medium text-muted mb-2">Fuente</p>
                    <div className="grid grid-cols-3 gap-2">
                      {EDITOR_FONTS.map((f) => (
                        <button
                          key={f.key}
                          type="button"
                          onClick={() => handleEditorFont(f.key)}
                          style={{ fontFamily: f.stack }}
                          className={`py-2.5 px-3 rounded-lg border text-sm transition cursor-pointer truncate ${
                            editorFontFamily === f.key
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border bg-surface text-muted hover:text-foreground'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tamaño */}
                  <div className="mb-5">
                    <p className="text-xs font-medium text-muted mb-2">Tamaño de texto</p>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label="Reducir tamaño"
                        onClick={() => handleEditorSize(editorFontSize - 1)}
                        disabled={editorFontSize <= MIN_EDITOR_FONT_SIZE}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                      >
                        <Minus size={15} />
                      </button>
                      <span className="w-16 text-center text-sm font-medium text-foreground tabular-nums">
                        {editorFontSize}px
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar tamaño"
                        onClick={() => handleEditorSize(editorFontSize + 1)}
                        disabled={editorFontSize >= MAX_EDITOR_FONT_SIZE}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
                      >
                        <Plus size={15} />
                      </button>
                      <span
                        className="ml-2 text-foreground leading-none"
                        style={{ fontSize: `${editorFontSize}px`, fontFamily: fontPreviewStack }}
                      >
                        Aa
                      </span>
                    </div>
                  </div>

                  {/* Interlineado */}
                  <div>
                    <p className="text-xs font-medium text-muted mb-2">Interlineado</p>
                    <div className="grid grid-cols-3 gap-2">
                      {LINE_HEIGHT_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleEditorLineHeight(opt.value)}
                          className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition cursor-pointer ${
                            editorLineHeight === opt.value
                              ? 'border-accent bg-accent/10 text-accent'
                              : 'border-border bg-surface text-muted hover:text-foreground'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <SaveButton
                  saving={saving}
                  saved={savedTab === 'preferencias'}
                  onClick={savePreferencias}
                />
              </div>
            )}

            {/* ── Notificaciones ── */}
            {activeTab === 'notificaciones' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Notificaciones por email
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      Recibe recordatorios de tareas y actualizaciones por correo
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={emailNotifications}
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${
                      emailNotifications ? 'bg-accent' : 'bg-border'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        emailNotifications ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <SaveButton
                  saving={saving}
                  saved={savedTab === 'notificaciones'}
                  onClick={saveNotificaciones}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
````

## File: components/editor/AiMenuExpanded.tsx
````typescript
'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Sparkles,
  ChevronDown,
  ChevronRight,
  Loader2,
  Check,
  X,
  MessageSquare,
  Tag as TagIcon,
  FileText,
  SpellCheck,
  Globe,
  User,
  Pencil,
  List,
  Send,
  Sliders,
  Minimize2,
  Maximize2,
} from 'lucide-react'
import type { Editor } from '@tiptap/react'

// ── Types ─────────────────────────────────────────────────────────────────
interface SubItem {
  label: string
  action: string
}

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  needsSelection?: boolean
  action?: string
  submenu?: SubItem[]
}

// ── Menu definition ────────────────────────────────────────────────────────
const ANALYSIS_ITEMS: MenuItem[] = [
  {
    id: 'summarize',
    label: 'Resumir nota',
    icon: <FileText size={13} />,
    action: 'summarize',
  },
  {
    id: 'chat',
    label: 'Chat con la nota',
    icon: <MessageSquare size={13} />,
    action: 'chat',
  },
  {
    id: 'smart_tags',
    label: 'Sugerir etiquetas',
    icon: <TagIcon size={13} />,
    action: 'smart_tags',
  },
]

const TEXT_ITEMS: MenuItem[] = [
  {
    id: 'improve',
    label: 'Mejorar texto',
    icon: <Sparkles size={13} />,
    action: 'improve',
    needsSelection: true,
  },
  {
    id: 'fix_typos',
    label: 'Corregir errores',
    icon: <SpellCheck size={13} />,
    action: 'fix_typos',
    needsSelection: true,
  },
  {
    id: 'humanize',
    label: 'Humanizar',
    icon: <User size={13} />,
    action: 'humanize',
    needsSelection: true,
  },
  {
    id: 'make_shorter',
    label: 'Acortar',
    icon: <Minimize2 size={13} />,
    action: 'make_shorter',
    needsSelection: true,
  },
  {
    id: 'make_longer',
    label: 'Expandir',
    icon: <Maximize2 size={13} />,
    action: 'make_longer',
    needsSelection: true,
  },
  {
    id: 'summarize_sel',
    label: 'Resumir',
    icon: <List size={13} />,
    needsSelection: true,
    submenu: [
      { label: 'Como párrafo', action: 'summarize_paragraph' },
      { label: 'Estructurado', action: 'summarize_structured' },
      { label: 'Como lista', action: 'summarize_bullet' },
    ],
  },
  {
    id: 'tone',
    label: 'Cambiar tono',
    icon: <Sliders size={13} />,
    needsSelection: true,
    submenu: [
      { label: 'Formal', action: 'tone_formal' },
      { label: 'Amigable', action: 'tone_casual' },
      { label: 'Divertido', action: 'tone_funny' },
      { label: 'Engaging', action: 'tone_engaging' },
      { label: 'Conciso', action: 'tone_concise' },
      { label: 'Empático', action: 'tone_empathetic' },
    ],
  },
  {
    id: 'help_write',
    label: 'Ayúdame a escribir',
    icon: <Pencil size={13} />,
    needsSelection: true,
    submenu: [
      { label: 'Introducción', action: 'help_introduction' },
      { label: 'Conclusión', action: 'help_conclusion' },
      { label: 'Título', action: 'help_title' },
    ],
  },
  {
    id: 'translate',
    label: 'Traducir',
    icon: <Globe size={13} />,
    needsSelection: true,
    submenu: [
      { label: 'Inglés', action: 'translate_en' },
      { label: 'Español', action: 'translate_es' },
      { label: 'Francés', action: 'translate_fr' },
      { label: 'Alemán', action: 'translate_de' },
      { label: 'Chino', action: 'translate_zh' },
      { label: 'Japonés', action: 'translate_ja' },
      { label: 'Ruso', action: 'translate_ru' },
      { label: 'Italiano', action: 'translate_it' },
      { label: 'Portugués', action: 'translate_pt' },
      { label: 'Árabe', action: 'translate_ar' },
      { label: 'Hindi', action: 'translate_hi' },
      { label: 'Turco', action: 'translate_tr' },
      { label: 'Indonesio', action: 'translate_id' },
      { label: 'Vietnamita', action: 'translate_vi' },
      { label: 'Coreano', action: 'translate_ko' },
    ],
  },
  {
    id: 'draft',
    label: 'Convertir en',
    icon: <Send size={13} />,
    needsSelection: true,
    submenu: [
      { label: 'Email', action: 'draft_email' },
      { label: 'Post en redes', action: 'draft_social' },
    ],
  },
]

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
  editor: Editor | null
  noteContent: string
  onSummarize: () => void
  onChat: () => void
  onSmartTags: () => void
}

// ── Component ──────────────────────────────────────────────────────────────
export default function AiMenuExpanded({
  editor,
  onSummarize,
  onChat,
  onSmartTags,
}: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [noSelectionWarning, setNoSelectionWarning] = useState(false)

  // Saved selection range to restore on accept
  const savedFromRef = useRef<number>(0)
  const savedToRef = useRef<number>(0)

  // Dropdown + submenu refs
  const containerRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setActiveSubmenu(null)
        setResult(null)
        setError(null)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Submenu hover helpers
  const openSubmenu = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveSubmenu(id)
  }, [])

  const scheduleCloseSubmenu = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveSubmenu(null), 150)
  }, [])

  const keepSubmenu = useCallback(
    (id: string) => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
      setActiveSubmenu(id)
    },
    []
  )

  // ── Core action handler ────────────────────────────────────────────────
  const handleAction = useCallback(
    async (action: string) => {
      // Close dropdown for whole-note analysis actions
      if (action === 'summarize') { setOpen(false); onSummarize(); return }
      if (action === 'chat') { setOpen(false); onChat(); return }
      if (action === 'smart_tags') { setOpen(false); onSmartTags(); return }

      // Text actions require a selection
      const sel = editor?.state.selection
      const from = sel?.from ?? 0
      const to = sel?.to ?? 0
      if (!editor || from === to) {
        setNoSelectionWarning(true)
        setTimeout(() => setNoSelectionWarning(false), 2000)
        setActiveSubmenu(null)
        return
      }

      const selectedText = editor.state.doc.textBetween(from, to, '\n')
      savedFromRef.current = from
      savedToRef.current = to

      setResult(null)
      setError(null)
      setLoading(true)
      setActiveSubmenu(null)

      try {
        const endpoint = action === 'improve' ? '/api/ai/improve' : '/api/ai/transform'
        const body =
          action === 'improve'
            ? JSON.stringify({ text: selectedText })
            : JSON.stringify({ text: selectedText, action })

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        })

        if (!res.ok) {
          const data = (await res.json()) as { error?: string }
          throw new Error(data.error ?? 'Error desconocido')
        }

        // Stream the result
        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        if (!reader) throw new Error('No se pudo leer la respuesta')

        let accumulated = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          accumulated += decoder.decode(value, { stream: true })
          setResult(accumulated)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al procesar con IA')
      } finally {
        setLoading(false)
      }
    },
    [editor, onSummarize, onChat, onSmartTags]
  )

  // ── Accept / reject ───────────────────────────────────────────────────
  const acceptResult = useCallback(() => {
    if (!editor || result === null) return
    const from = savedFromRef.current
    const to = savedToRef.current
    editor.chain().focus().deleteRange({ from, to }).insertContentAt(from, result.trim()).run()
    setResult(null)
    setOpen(false)
  }, [editor, result])

  const rejectResult = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  // ── Render helpers ─────────────────────────────────────────────────────
  const renderItem = (item: MenuItem) => {
    const hasSubmenu = !!item.submenu

    return (
      <div
        key={item.id}
        className="relative"
        onMouseEnter={() => {
          if (hasSubmenu) openSubmenu(item.id)
          else scheduleCloseSubmenu()
        }}
        onMouseLeave={() => {
          if (hasSubmenu) scheduleCloseSubmenu()
        }}
      >
        <button
          type="button"
          disabled={loading}
          onClick={() => {
            if (!hasSubmenu && item.action) handleAction(item.action)
          }}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground transition rounded-lg disabled:opacity-40 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span className="text-subtle shrink-0">{item.icon}</span>
            {item.label}
          </span>
          {hasSubmenu && <ChevronRight size={11} className="text-subtle shrink-0" />}
        </button>

        {/* Submenu panel */}
        {hasSubmenu && activeSubmenu === item.id && item.submenu && (
          <div
            className="absolute left-full top-0 ml-0.5 z-50 bg-panel border border-border rounded-xl shadow-2xl py-1 w-40"
            onMouseEnter={() => keepSubmenu(item.id)}
            onMouseLeave={scheduleCloseSubmenu}
          >
            {item.submenu.map((sub) => (
              <button
                key={sub.action}
                type="button"
                disabled={loading}
                onClick={() => handleAction(sub.action)}
                className="w-full px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground transition text-left rounded-lg disabled:opacity-40 cursor-pointer"
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Main render ────────────────────────────────────────────────────────
  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger button */}
      <button
        type="button"
        title="IA"
        onClick={() => {
          setOpen(!open)
          if (open) {
            setResult(null)
            setError(null)
            setActiveSubmenu(null)
          }
        }}
        className="flex items-center gap-1 px-2 py-1.5 rounded text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
      >
        <Sparkles size={13} className="text-accent" />
        <span>IA</span>
        <ChevronDown size={10} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-2xl w-52 py-1">
          {/* No selection warning */}
          {noSelectionWarning && (
            <div className="px-3 py-2 text-xs text-amber-400 bg-amber-400/10 mx-1 mb-1 rounded-lg">
              Selecciona texto primero
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted">
              <Loader2 size={12} className="animate-spin text-accent" />
              Procesando…
            </div>
          )}

          {/* Result panel */}
          {result !== null && !loading && (
            <div className="px-3 py-2 space-y-2">
              <p className="text-[10px] text-subtle uppercase tracking-wider">Resultado</p>
              <p className="text-xs text-foreground leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                {result}
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={acceptResult}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent/90 transition cursor-pointer"
                >
                  <Check size={11} />
                  Aceptar
                </button>
                <button
                  type="button"
                  onClick={rejectResult}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface text-muted text-xs hover:text-foreground transition cursor-pointer"
                >
                  <X size={11} />
                  Descartar
                </button>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="px-3 py-2 space-y-1.5">
              <p className="text-xs text-red-400">{error}</p>
              <button
                type="button"
                onClick={rejectResult}
                className="text-xs text-muted hover:text-foreground transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Menu items — only show when not displaying a result */}
          {result === null && !loading && !error && (
            <>
              {/* Analysis group */}
              <div className="px-2 pt-1">
                {ANALYSIS_ITEMS.map(renderItem)}
              </div>

              {/* Divider */}
              <div className="my-1 border-t border-border/50" />

              {/* Text group */}
              <div className="px-2 pb-1">
                {TEXT_ITEMS.map(renderItem)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
````

## File: components/editor/InsertMenu.tsx
````typescript
'use client'

/*
 * react-hooks/refs: falso positivo. El array `items` contiene closures `action`
 * que referencian `imageInputRef.current`, pero esos closures solo se ejecutan en
 * los handlers onClick, no durante el render. Filter/map solo leen label/keywords/category.
 */
/* eslint-disable react-hooks/refs */

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
````

## File: components/editor/MermaidComponent.tsx
````typescript
'use client'

import { NodeViewWrapper } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import { useEffect, useState, useCallback, useRef } from 'react'
import {
  GitBranch, GripVertical, MoreHorizontal,
  Trash2, Check, X, ClipboardCopy,
} from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

type ViewMode = 'code' | 'split' | 'preview'

let mermaidModule: typeof import('mermaid').default | null = null
let renderCount = 0

async function getMermaid() {
  if (mermaidModule) return mermaidModule
  const mod = await import('mermaid')
  mermaidModule = mod.default
  mermaidModule.initialize({ startOnLoad: false })
  return mermaidModule
}

function getMermaidTheme(isDark: boolean) {
  return isDark
    ? {
        theme: 'dark' as const,
        themeVariables: {
          background: '#1a1a1a',
          mainBkg: '#242424',
          nodeBorder: '#2d2d2d',
          primaryColor: '#1a7a4a',
          primaryTextColor: '#e8e8e8',
          primaryBorderColor: '#1a7a4a',
          lineColor: '#8a8a8a',
          secondaryColor: '#242424',
          tertiaryColor: '#2a2a2a',
          fontFamily: 'var(--font-geist-sans), sans-serif',
        },
      }
    : {
        theme: 'default' as const,
        themeVariables: {
          primaryColor: '#1a7a4a',
          primaryTextColor: '#1a1a1a',
          primaryBorderColor: '#1a7a4a',
          lineColor: '#6b6b6b',
          fontFamily: 'var(--font-geist-sans), sans-serif',
        },
      }
}

export default function MermaidComponent({
  node, updateAttributes, deleteNode, selected,
}: NodeViewProps) {
  const code = (node.attrs.code as string) ?? ''
  const { theme } = useUIStore()

  const [mode, setMode] = useState<ViewMode>('preview')
  const [draftCode, setDraftCode] = useState(code)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [rendering, setRendering] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const isDirty = draftCode !== code

  const renderDiagram = useCallback(async (source: string) => {
    setRendering(true)
    setError(null)
    try {
      const m = await getMermaid()
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
      m.initialize({ startOnLoad: false, ...getMermaidTheme(isDark) })
      const id = `mermaid-${++renderCount}`
      const result = await m.render(id, source)
      const svgContent = typeof result === 'object' ? result.svg : result
      setSvg(svgContent)
    } catch {
      setError('Sintaxis inválida. Revisa el código Mermaid.')
    } finally {
      setRendering(false)
    }
  }, [])

  useEffect(() => {
    // Renderizado intencional del diagrama al montar o cambiar el código/tema.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    renderDiagram(code)
  }, [code, theme, renderDiagram])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }
    if (showMenu) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showMenu])

  const handleSave = () => {
    updateAttributes({ code: draftCode })
    renderDiagram(draftCode)
    setMode('preview')
  }

  const handleDiscard = () => {
    setDraftCode(code)
    setMode('preview')
  }

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setShowMenu(false)
    setTimeout(() => setCopied(false), 2000)
  }

  const diagramView = (
    <div className="flex items-center justify-center p-6 min-h-[140px] bg-panel">
      {rendering ? (
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className="w-4 h-4 border-2 border-muted border-t-accent rounded-full animate-spin" />
          Renderizando...
        </div>
      ) : error ? (
        <div className="text-center space-y-2">
          <p className="text-xs text-danger">{error}</p>
          <button
            type="button"
            onClick={() => setMode('code')}
            className="text-xs text-accent hover:text-accent-light cursor-pointer"
          >
            Abrir editor →
          </button>
        </div>
      ) : (
        <div
          className="max-w-full overflow-auto"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  )

  const codeEditor = (
    <textarea
      value={draftCode}
      onChange={(e) => setDraftCode(e.target.value)}
      rows={10}
      className="w-full p-4 bg-elevated text-xs text-foreground font-mono outline-none resize-none leading-relaxed"
      style={{ color: 'var(--color-foreground)' }}
      placeholder="flowchart TD&#10;  A[Inicio] --> B[Fin]"
      spellCheck={false}
    />
  )

  return (
    <NodeViewWrapper>
      <div
        className={`my-4 rounded-xl border overflow-hidden transition ${
          selected ? 'border-accent/50 ring-1 ring-accent/20' : 'border-border'
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-2 px-3 py-2 bg-surface border-b border-border">
          {/* Drag handle */}
          <div
            data-drag-handle
            className="cursor-grab active:cursor-grabbing text-subtle hover:text-muted transition shrink-0"
            title="Arrastrar bloque"
          >
            <GripVertical size={15} />
          </div>

          {/* Title */}
          <div className="flex items-center gap-1.5 shrink-0">
            <GitBranch size={13} className="text-accent" />
            <span className="text-xs font-semibold text-muted">Mermaid Diagram</span>
          </div>

          <div className="flex-1" />

          {/* Tabs */}
          <div className="flex items-center gap-0.5 bg-elevated rounded-lg p-0.5">
            {([
              { key: 'code' as ViewMode, label: 'Código' },
              { key: 'split' as ViewMode, label: 'Split' },
              { key: 'preview' as ViewMode, label: 'Vista previa' },
            ] as const).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition cursor-pointer ${
                  mode === key
                    ? 'bg-panel text-foreground shadow-sm'
                    : 'text-muted hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Save / discard when dirty */}
          {isDirty && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handleDiscard}
                title="Descartar cambios"
                className="p-1.5 text-muted hover:text-foreground rounded hover:bg-elevated transition cursor-pointer"
              >
                <X size={13} />
              </button>
              <button
                type="button"
                onClick={handleSave}
                title="Guardar"
                className="p-1.5 text-accent hover:text-accent-light rounded hover:bg-accent/10 transition cursor-pointer"
              >
                <Check size={13} />
              </button>
            </div>
          )}

          {/* Copied feedback */}
          {copied && (
            <span className="text-[11px] text-accent shrink-0">¡Copiado!</span>
          )}

          {/* "..." menu */}
          <div className="relative shrink-0" ref={menuRef}>
            <button
              type="button"
              onClick={() => setShowMenu(!showMenu)}
              title="Más opciones"
              className={`p-1.5 rounded transition cursor-pointer ${
                showMenu
                  ? 'bg-elevated text-foreground'
                  : 'text-muted hover:text-foreground hover:bg-elevated'
              }`}
            >
              <MoreHorizontal size={14} />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-8 z-30 bg-panel border border-border rounded-xl shadow-2xl w-44 py-1 overflow-hidden">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
                >
                  <ClipboardCopy size={13} />
                  Copiar código
                </button>
                <div className="my-1 border-t border-border" />
                <button
                  type="button"
                  onClick={() => { deleteNode(); setShowMenu(false) }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-danger hover:bg-danger/10 transition cursor-pointer"
                >
                  <Trash2 size={13} />
                  Eliminar diagrama
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Contenido según modo ── */}
        {mode === 'code' && codeEditor}
        {mode === 'preview' && diagramView}
        {mode === 'split' && (
          <div className="flex divide-x divide-border">
            <div className="w-1/2">
              {codeEditor}
            </div>
            <div className="w-1/2">
              {diagramView}
            </div>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  )
}
````

## File: components/editor/ShareControls.tsx
````typescript
'use client'

import { useState, useEffect, useRef } from 'react'
import { Globe, Link, Lock, Eye, PenLine, Check } from 'lucide-react'
import { getShareLink, createShareLink, updateShareLink } from '@/lib/supabase/shared-notes'
import type { SharedNote } from '@/types'

interface ShareControlsProps {
  noteId: string
  noteTitle: string
}

type AccessLevel = 'none' | 'view' | 'edit'

export default function ShareControls({ noteId, noteTitle }: ShareControlsProps) {
  const [sharedNote, setSharedNote] = useState<SharedNote | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null)

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const shareUrl = sharedNote?.public_slug ? `${origin}/n/${sharedNote.public_slug}` : ''
  const accessLevel: AccessLevel = sharedNote?.access_level ?? 'none'
  const isRestricted = !sharedNote || accessLevel === 'none'

  useEffect(() => {
    let cancelled = false
    // Reset + carga del estado de compartir al cambiar de nota (patrón intencional).
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setSharedNote(null)
    setLoading(true)
    getShareLink(noteId)
      .then((data) => { if (!cancelled) { setSharedNote(data); setLoading(false) } })
      .catch(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [noteId])

  useEffect(() => {
    if (!dropdownOpen) return
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dropdownOpen])

  const showToast = (msg: string) => {
    setToast(msg)
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current)
    toastTimerRef.current = setTimeout(() => setToast(null), 3000)
  }

  const handleAccessChange = async (level: AccessLevel) => {
    setDropdownOpen(false)
    if (updating) return
    setUpdating(true)
    try {
      const isActive = level !== 'none'
      if (!sharedNote) {
        if (level === 'none') return
        // createShareLink crea con access_level 'view'; si se pidió 'edit',
        // se promociona inmediatamente.
        const created = await createShareLink(noteId)
        if (level === 'edit') {
          await updateShareLink(created.id, { access_level: 'edit', is_active: true })
          setSharedNote({ ...created, access_level: 'edit', is_active: true })
        } else {
          setSharedNote(created)
        }
      } else {
        await updateShareLink(sharedNote.id, { access_level: level, is_active: isActive })
        setSharedNote({ ...sharedNote, access_level: level, is_active: isActive })
      }
    } catch {
      // error silencioso
    } finally {
      setUpdating(false)
    }
  }

  const handleCopyLink = async () => {
    if (isRestricted || !shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      const title = noteTitle.trim() || 'Sin título'
      showToast(`Link to '${title}' copied to clipboard`)
    } catch {
      // clipboard bloqueado
    }
  }

  const globeActive = !isRestricted

  return (
    <>
      <div className="flex items-center gap-0.5">
        {/* Globe dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            title="Acceso al enlace"
            disabled={loading || updating}
            onClick={() => setDropdownOpen((v) => !v)}
            className={`p-1.5 rounded transition cursor-pointer disabled:opacity-40 ${
              dropdownOpen || globeActive
                ? 'text-accent'
                : 'text-muted hover:bg-surface hover:text-foreground'
            } ${dropdownOpen ? 'bg-surface' : ''}`}
          >
            <Globe size={14} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-9 z-50 bg-panel border border-border rounded-xl shadow-2xl w-64 py-1.5 overflow-hidden">
              <p className="px-3 pb-1 pt-1.5 text-[10px] font-semibold text-muted uppercase tracking-wider">
                Acceso al enlace
              </p>

              {/* Restricted */}
              <button
                type="button"
                onClick={() => handleAccessChange('none')}
                className="w-full flex items-start gap-3 px-3 py-2.5 text-xs transition cursor-pointer hover:bg-surface"
              >
                <Lock size={13} className="mt-0.5 shrink-0 text-muted" />
                <span className="flex-1 text-left">
                  <span className={`font-medium block ${accessLevel === 'none' ? 'text-foreground' : 'text-muted'}`}>
                    Restricted access
                  </span>
                  <span className="text-muted text-[11px]">Solo el propietario puede acceder</span>
                </span>
                {accessLevel === 'none' && <Check size={12} className="mt-1 text-accent shrink-0" />}
              </button>

              {/* View */}
              <button
                type="button"
                onClick={() => handleAccessChange('view')}
                className="w-full flex items-start gap-3 px-3 py-2.5 text-xs transition cursor-pointer hover:bg-surface"
              >
                <Eye size={13} className="mt-0.5 shrink-0 text-muted" />
                <span className="flex-1 text-left">
                  <span className={`font-medium block ${accessLevel === 'view' ? 'text-foreground' : 'text-muted'}`}>
                    Anyone with the link can view
                  </span>
                  <span className="text-muted text-[11px]">Acceso de solo lectura</span>
                </span>
                {accessLevel === 'view' && <Check size={12} className="mt-1 text-accent shrink-0" />}
              </button>

              {/* Edit */}
              <button
                type="button"
                onClick={() => handleAccessChange('edit')}
                className="w-full flex items-start gap-3 px-3 py-2.5 text-xs transition cursor-pointer hover:bg-surface"
              >
                <PenLine size={13} className="mt-0.5 shrink-0 text-muted" />
                <span className="flex-1 text-left">
                  <span className={`font-medium block ${accessLevel === 'edit' ? 'text-foreground' : 'text-muted'}`}>
                    Anyone with the link can edit
                  </span>
                  <span className="text-muted text-[11px]">Cualquiera con el link puede editar la nota</span>
                </span>
                {accessLevel === 'edit' && <Check size={12} className="mt-1 text-accent shrink-0" />}
              </button>
            </div>
          )}
        </div>

        {/* Share button */}
        <button
          type="button"
          title={isRestricted ? 'Cambia el acceso para compartir' : 'Copiar enlace'}
          disabled={isRestricted || loading || updating}
          onClick={handleCopyLink}
          className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition cursor-pointer text-muted hover:bg-surface hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Link size={13} />
          Share
        </button>
      </div>

      {/* Toast — fixed bottom-left */}
      {toast && (
        <div
          key={toast}
          className="toast-enter fixed bottom-6 left-6 z-[200] flex items-center gap-2 bg-foreground text-background px-4 py-2.5 rounded-xl shadow-xl text-xs font-medium pointer-events-none"
        >
          <Check size={13} />
          {toast}
        </div>
      )}
    </>
  )
}
````

## File: components/editor/TagInput.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { Tag as TagIcon, X, Plus } from 'lucide-react'
import { useTagStore } from '@/store/tagStore'
import {
  getTagsByNote,
  addTagToNote,
  removeTagFromNote,
  createTag,
} from '@/lib/supabase/tags'
import type { Tag } from '@/types'

interface Props {
  noteId: string
}

export default function TagInput({ noteId }: Props) {
  const { tags: allTags, addTag } = useTagStore()
  const [noteTags, setNoteTags] = useState<Tag[]>([])
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTagsByNote(noteId)
        setNoteTags(data)
      } catch {
        // error cargando tags
      }
    }
    load()
  }, [noteId])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const noteTagIds = new Set(noteTags.map((t) => t.id))

  const filtered = allTags.filter(
    (t) =>
      !noteTagIds.has(t.id) &&
      t.name.toLowerCase().includes(query.toLowerCase())
  )

  const exactMatch = allTags.some(
    (t) => t.name.toLowerCase() === query.trim().toLowerCase()
  )

  const handleAdd = async (tag: Tag) => {
    try {
      await addTagToNote(noteId, tag.id)
      setNoteTags((prev) => [...prev, tag])
      setQuery('')
      inputRef.current?.focus()
    } catch {
      // error agregando tag
    }
  }

  const handleCreate = async () => {
    if (!query.trim()) return
    try {
      const newTag = await createTag(query.trim())
      addTag(newTag)
      await addTagToNote(noteId, newTag.id)
      setNoteTags((prev) => [...prev, newTag])
      setQuery('')
      inputRef.current?.focus()
    } catch {
      // error creando tag
    }
  }

  const handleRemove = async (tagId: string) => {
    try {
      await removeTagFromNote(noteId, tagId)
      setNoteTags((prev) => prev.filter((t) => t.id !== tagId))
    } catch {
      // error quitando tag
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered.length > 0) {
        handleAdd(filtered[0])
      } else if (query.trim() && !exactMatch) {
        handleCreate()
      }
    }
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-wrap items-center gap-1.5 mb-6"
    >
      <TagIcon size={13} className="text-subtle shrink-0" />

      {noteTags.map((tag) => (
        <span
          key={tag.id}
          className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full border border-accent/25"
        >
          {tag.name}
          <button
            type="button"
            title="Quitar etiqueta"
            onClick={() => handleRemove(tag.id)}
            className="hover:text-accent-light transition cursor-pointer"
          >
            <X size={10} />
          </button>
        </span>
      ))}

      {!open ? (
        <button
          type="button"
          data-testid="tag-open-btn"
          onClick={() => {
            setOpen(true)
            setTimeout(() => inputRef.current?.focus(), 0)
          }}
          className="inline-flex items-center gap-1 px-2 py-0.5 text-xs text-muted hover:text-accent border border-dashed border-border hover:border-accent/40 rounded-full transition cursor-pointer"
        >
          <Plus size={10} />
          Etiqueta
        </button>
      ) : (
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            data-testid="tag-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar o crear..."
            className="px-2 py-0.5 text-xs border border-accent/50 bg-elevated rounded-full outline-none w-36 text-foreground"
            style={{ color: 'var(--color-foreground)' }}
          />

          {(filtered.length > 0 || (query.trim() && !exactMatch)) && (
            <div className="absolute top-full left-0 mt-1 w-44 bg-panel border border-border rounded-lg shadow-xl z-10 overflow-hidden">
              {filtered.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleAdd(tag)}
                  className="w-full text-left px-3 py-1.5 text-xs text-muted hover:bg-surface hover:text-accent transition cursor-pointer"
                >
                  {tag.name}
                </button>
              ))}
              {query.trim() && !exactMatch && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="w-full text-left px-3 py-1.5 text-xs text-accent hover:bg-surface transition border-t border-border cursor-pointer"
                >
                  + Crear &quot;{query.trim()}&quot;
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
````

## File: components/files/FilesView.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  getAllAttachments,
  deleteAttachment,
  getAttachmentUrl,
  uploadAttachment,
} from '@/lib/supabase/attachments'
import type { AttachmentWithNote } from '@/lib/supabase/attachments'
import { getNoteById, getAllNotesWithNotebook } from '@/lib/supabase/notes'
import type { NoteWithNotebook } from '@/lib/supabase/notes'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import {
  File, FileText, ImageIcon, Music, Video, Download, Trash2, Search, X,
  LayoutGrid, List, ArrowUpDown, Upload, BookOpen, Loader2, ChevronRight,
} from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

// ── Tipos y helpers ─────────────────────────────────────────────────────────

type FileCategory = 'image' | 'pdf' | 'audio' | 'video' | 'other'
type TypeFilter = 'all' | FileCategory
type ViewMode = 'grid' | 'list'
type SortBy = 'date' | 'name' | 'size'

const TYPE_FILTERS: { key: TypeFilter; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'image', label: 'Imágenes' },
  { key: 'pdf', label: 'PDFs' },
  { key: 'audio', label: 'Audio' },
  { key: 'video', label: 'Video' },
  { key: 'other', label: 'Otros' },
]

const SORT_OPTIONS: { key: SortBy; label: string }[] = [
  { key: 'date', label: 'Fecha' },
  { key: 'name', label: 'Nombre' },
  { key: 'size', label: 'Tamaño' },
]

function categoryOf(type: string | null): FileCategory {
  const t = type ?? ''
  if (t.startsWith('image/')) return 'image'
  if (t === 'application/pdf') return 'pdf'
  if (t.startsWith('audio/')) return 'audio'
  if (t.startsWith('video/')) return 'video'
  return 'other'
}

function formatSize(bytes: number | null): string {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function FileTypeIcon({ type, size = 16 }: { type: string | null; size?: number }) {
  const cat = categoryOf(type)
  if (cat === 'image') return <ImageIcon size={size} className="text-blue-400 shrink-0" />
  if (cat === 'video') return <Video size={size} className="text-orange-400 shrink-0" />
  if (cat === 'audio') return <Music size={size} className="text-purple-400 shrink-0" />
  if (cat === 'pdf') return <FileText size={size} className="text-red-400 shrink-0" />
  return <File size={size} className="text-muted shrink-0" />
}

// ── Vista principal ──────────────────────────────────────────────────────────

export default function FilesView() {
  const [attachments, setAttachments] = useState<AttachmentWithNote[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [view, setView] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortBy>('date')
  const [query, setQuery] = useState('')
  const [lightbox, setLightbox] = useState<AttachmentWithNote | null>(null)
  const [pendingFiles, setPendingFiles] = useState<File[] | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const dragDepth = useRef(0)

  const { setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  const refresh = async () => {
    try {
      const data = await getAllAttachments()
      setAttachments(data)
    } catch {
      // error cargando
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Carga inicial de adjuntos al montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh()
  }, [])

  const handleDelete = async (att: AttachmentWithNote) => {
    setAttachments((prev) => prev.filter((a) => a.id !== att.id))
    try {
      await deleteAttachment(att.id, att.storage_path)
    } catch {
      setAttachments((prev) => [att, ...prev])
    }
  }

  const openNote = async (noteId: string | null) => {
    if (!noteId) return
    try {
      const note = await getNoteById(noteId)
      if (note) {
        setSelectedNote(note)
        setCurrentView('all-notes')
      }
    } catch {
      // no se pudo abrir la nota
    }
  }

  // Drag & drop sobre toda la vista
  const handleDragEnter = (e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes('Files')) return
    e.preventDefault()
    dragDepth.current += 1
    setDragOver(true)
  }
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    dragDepth.current -= 1
    if (dragDepth.current <= 0) setDragOver(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    dragDepth.current = 0
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) setPendingFiles(files)
  }

  const counts = attachments.reduce(
    (acc, a) => {
      acc.all += 1
      acc[categoryOf(a.file_type)] += 1
      return acc
    },
    { all: 0, image: 0, pdf: 0, audio: 0, video: 0, other: 0 } as Record<TypeFilter, number>
  )

  const filtered = attachments.filter((att) => {
    if (typeFilter !== 'all' && categoryOf(att.file_type) !== typeFilter) return false
    if (query.trim()) return att.file_name.toLowerCase().includes(query.toLowerCase())
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.file_name.localeCompare(b.file_name)
    if (sortBy === 'size') return (b.file_size ?? 0) - (a.file_size ?? 0)
    return +new Date(b.created_at) - +new Date(a.created_at)
  })

  return (
    <div
      className="relative flex-1 flex flex-col h-screen overflow-hidden bg-background"
      onDragEnter={handleDragEnter}
      onDragOver={(e) => { if (e.dataTransfer.types.includes('Files')) e.preventDefault() }}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div className="h-14 px-6 border-b border-border flex items-center justify-between gap-3 shrink-0">
        <div className="min-w-0">
          <h2 className="font-semibold text-foreground text-sm">Archivos</h2>
          <p className="text-xs text-muted">
            {attachments.length} archivo{attachments.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Buscador */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-lg w-44">
            <Search size={13} className="text-muted shrink-0" />
            <input
              type="text"
              placeholder="Buscar..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs text-foreground outline-none min-w-0"
              style={{ color: 'var(--color-foreground)' }}
            />
            {query && (
              <button
                type="button"
                title="Limpiar búsqueda"
                onClick={() => setQuery('')}
                className="text-muted hover:text-foreground transition cursor-pointer"
              >
                <X size={11} />
              </button>
            )}
          </div>

          {/* Orden */}
          <SortDropdown value={sortBy} onChange={setSortBy} />

          {/* Toggle vista */}
          <div className="flex items-center bg-surface rounded-lg p-0.5">
            <button
              type="button"
              title="Vista de cuadrícula"
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                view === 'grid' ? 'bg-panel text-accent shadow-sm' : 'text-muted hover:text-foreground'
              }`}
            >
              <LayoutGrid size={14} />
            </button>
            <button
              type="button"
              title="Vista de lista"
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md transition cursor-pointer ${
                view === 'list' ? 'bg-panel text-accent shadow-sm' : 'text-muted hover:text-foreground'
              }`}
            >
              <List size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Filtros por tipo */}
      <div className="flex items-center gap-1.5 px-6 py-2.5 border-b border-border shrink-0 overflow-x-auto">
        {TYPE_FILTERS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTypeFilter(key)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              typeFilter === key
                ? 'bg-accent text-white'
                : 'bg-surface text-muted hover:text-foreground'
            }`}
          >
            {label}
            <span className={`text-[10px] ${typeFilter === key ? 'text-white/80' : 'text-subtle'}`}>
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {loading ? (
          <p className="text-sm text-muted text-center mt-12">Cargando…</p>
        ) : sorted.length === 0 ? (
          query ? (
            <EmptyState
              variant="search"
              title="Sin resultados"
              description="Prueba con otro término de búsqueda"
            />
          ) : (
            <EmptyState
              variant="files"
              title="Sin archivos todavía"
              description="Los adjuntos de tus notas aparecerán aquí — también puedes arrastrar archivos a esta vista"
            />
          )
        ) : view === 'grid' ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
            {sorted.map((att) => (
              <GridCard
                key={att.id}
                att={att}
                onDelete={() => handleDelete(att)}
                onPreview={() => setLightbox(att)}
                onOpenNote={() => openNote(att.note_id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {sorted.map((att) => (
              <FileRow
                key={att.id}
                att={att}
                onDelete={() => handleDelete(att)}
                onPreview={() => setLightbox(att)}
                onOpenNote={() => openNote(att.note_id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Overlay de drag & drop */}
      {dragOver && (
        <div className="absolute inset-0 z-30 bg-accent/10 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-3 px-8 py-6 bg-panel border-2 border-dashed border-accent rounded-2xl">
            <Upload size={32} className="text-accent" />
            <p className="text-sm font-medium text-foreground">Suelta para subir archivos</p>
            <p className="text-xs text-muted">Elegirás a qué nota adjuntarlos</p>
          </div>
        </div>
      )}

      {/* Lightbox de imagen */}
      {lightbox && (
        <ImageLightbox
          url={getAttachmentUrl(lightbox.storage_path)}
          name={lightbox.file_name}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* Selector de nota destino para subir */}
      {pendingFiles && (
        <NotePickerModal
          files={pendingFiles}
          onUploaded={async () => {
            setPendingFiles(null)
            await refresh()
          }}
          onClose={() => setPendingFiles(null)}
        />
      )}
    </div>
  )
}

// ── Tarjeta de cuadrícula ────────────────────────────────────────────────────

function GridCard({
  att, onDelete, onPreview, onOpenNote,
}: {
  att: AttachmentWithNote
  onDelete: () => void
  onPreview: () => void
  onOpenNote: () => void
}) {
  const isImage = categoryOf(att.file_type) === 'image'

  return (
    <div className="group relative flex flex-col bg-panel border border-border rounded-xl overflow-hidden hover:border-accent/40 transition">
      {/* Preview cuadrado */}
      <button
        type="button"
        onClick={isImage ? onPreview : undefined}
        className={`aspect-square w-full bg-surface flex items-center justify-center overflow-hidden ${
          isImage ? 'cursor-zoom-in' : 'cursor-default'
        }`}
      >
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getAttachmentUrl(att.storage_path)}
            alt={att.file_name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <FileTypeIcon type={att.file_type} size={40} />
        )}
      </button>

      {/* Meta */}
      <div className="p-2.5 min-w-0">
        <p className="text-xs text-foreground font-medium truncate" title={att.file_name}>
          {att.file_name}
        </p>
        <p className="text-[10px] text-subtle mt-0.5">{formatSize(att.file_size)}</p>
        {att.notes && (
          <button
            type="button"
            onClick={onOpenNote}
            className="mt-1 flex items-center gap-1 text-[10px] text-accent hover:underline truncate max-w-full cursor-pointer"
            title={att.notes.title}
          >
            <BookOpen size={9} className="shrink-0" />
            <span className="truncate">{att.notes.title}</span>
          </button>
        )}
      </div>

      {/* Acciones hover */}
      <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
        <a
          href={getAttachmentUrl(att.storage_path)}
          download={att.file_name}
          title="Descargar"
          className="p-1.5 bg-panel/90 backdrop-blur text-muted hover:text-foreground rounded-lg border border-border transition cursor-pointer"
        >
          <Download size={12} />
        </a>
        <button
          type="button"
          title="Eliminar archivo"
          onClick={onDelete}
          className="p-1.5 bg-panel/90 backdrop-blur text-muted hover:text-danger rounded-lg border border-border transition cursor-pointer"
        >
          <Trash2 size={12} />
        </button>
      </div>
    </div>
  )
}

// ── Fila de lista ────────────────────────────────────────────────────────────

function FileRow({
  att, onDelete, onPreview, onOpenNote,
}: {
  att: AttachmentWithNote
  onDelete: () => void
  onPreview: () => void
  onOpenNote: () => void
}) {
  const isImage = categoryOf(att.file_type) === 'image'

  return (
    <div className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-panel transition">
      {/* Thumbnail */}
      <button
        type="button"
        onClick={isImage ? onPreview : undefined}
        className={`w-10 h-10 rounded-lg overflow-hidden bg-surface border border-border flex items-center justify-center shrink-0 ${
          isImage ? 'cursor-zoom-in' : 'cursor-default'
        }`}
      >
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={getAttachmentUrl(att.storage_path)}
            alt={att.file_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <FileTypeIcon type={att.file_type} size={18} />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground font-medium truncate">{att.file_name}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          {att.notes && (
            <>
              <button
                type="button"
                onClick={onOpenNote}
                className="flex items-center gap-1 text-xs text-accent hover:underline truncate max-w-[180px] cursor-pointer"
              >
                <BookOpen size={10} className="shrink-0" />
                <span className="truncate">{att.notes.title}</span>
                <ChevronRight size={10} className="shrink-0" />
              </button>
              <span className="text-subtle text-xs">·</span>
            </>
          )}
          <span className="text-xs text-subtle">{formatSize(att.file_size)}</span>
          <span className="text-subtle text-xs">·</span>
          <span className="text-xs text-subtle">
            {format(parseISO(att.created_at), 'd MMM yyyy', { locale: es })}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shrink-0">
        <a
          href={getAttachmentUrl(att.storage_path)}
          download={att.file_name}
          title="Descargar"
          className="p-2 text-muted hover:text-foreground rounded-lg hover:bg-surface transition cursor-pointer"
        >
          <Download size={14} />
        </a>
        <button
          type="button"
          title="Eliminar archivo"
          onClick={onDelete}
          className="p-2 text-muted hover:text-danger rounded-lg hover:bg-surface transition cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

// ── Dropdown de orden ────────────────────────────────────────────────────────

function SortDropdown({ value, onChange }: { value: SortBy; onChange: (v: SortBy) => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const current = SORT_OPTIONS.find((o) => o.key === value)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title="Ordenar"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface rounded-lg text-xs text-muted hover:text-foreground transition cursor-pointer"
      >
        <ArrowUpDown size={13} />
        <span className="hidden sm:inline">{current?.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-xl w-36 py-1 overflow-hidden">
          {SORT_OPTIONS.map((o) => (
            <button
              key={o.key}
              type="button"
              onClick={() => { onChange(o.key); setOpen(false) }}
              className={`w-full text-left px-3 py-1.5 text-xs transition cursor-pointer ${
                o.key === value ? 'text-accent bg-accent/10' : 'text-muted hover:bg-surface hover:text-foreground'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Lightbox de imagen (dialog nativo) ───────────────────────────────────────

function ImageLightbox({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    ref.current?.showModal()
  }, [])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose() }}
      className="m-auto bg-transparent p-0 max-w-none max-h-none backdrop:bg-black/75 backdrop:backdrop-blur-sm"
    >
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt={name}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        <button
          type="button"
          title="Cerrar"
          onClick={onClose}
          className="absolute -top-3 -right-3 p-1.5 bg-panel text-foreground rounded-full border border-border shadow-lg hover:bg-surface transition cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>
    </dialog>
  )
}

// ── Modal selector de nota destino ───────────────────────────────────────────

function NotePickerModal({
  files, onUploaded, onClose,
}: {
  files: File[]
  onUploaded: () => void | Promise<void>
  onClose: () => void
}) {
  const [notes, setNotes] = useState<NoteWithNotebook[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [uploadingTo, setUploadingTo] = useState<string | null>(null)

  useEffect(() => {
    getAllNotesWithNotebook()
      .then(setNotes)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handlePick = async (noteId: string) => {
    if (uploadingTo) return
    setUploadingTo(noteId)
    for (const file of files) {
      try {
        await uploadAttachment(noteId, file, () => {})
      } catch {
        // un archivo falló; continúa con el resto
      }
    }
    await onUploaded()
  }

  const filtered = query.trim()
    ? notes.filter((n) => (n.title || 'Sin título').toLowerCase().includes(query.toLowerCase()))
    : notes

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget && !uploadingTo) onClose() }}
    >
      <div className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-foreground">Adjuntar a una nota</h3>
            <p className="text-xs text-muted mt-0.5">
              {files.length} archivo{files.length !== 1 ? 's' : ''} · elige el destino
            </p>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            disabled={!!uploadingTo}
            className="p-1.5 text-muted hover:text-foreground rounded-lg hover:bg-surface transition cursor-pointer disabled:opacity-40"
          >
            <X size={16} />
          </button>
        </div>

        {/* Buscador */}
        <div className="px-5 py-3 border-b border-border">
          <div className="flex items-center gap-2 px-3 py-2 bg-surface rounded-lg">
            <Search size={13} className="text-muted shrink-0" />
            <input
              type="text"
              placeholder="Buscar nota..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-xs text-foreground outline-none min-w-0"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>
        </div>

        {/* Lista de notas */}
        <div className="flex-1 overflow-y-auto py-1">
          {loading ? (
            <p className="text-xs text-muted text-center py-8">Cargando notas…</p>
          ) : filtered.length === 0 ? (
            <p className="text-xs text-muted text-center py-8">
              {notes.length === 0 ? 'No tienes notas aún' : 'Sin resultados'}
            </p>
          ) : (
            filtered.map((note) => (
              <button
                key={note.id}
                type="button"
                onClick={() => handlePick(note.id)}
                disabled={!!uploadingTo}
                className="w-full flex items-center gap-3 px-5 py-2.5 text-left hover:bg-surface transition cursor-pointer disabled:opacity-50"
              >
                <div className="w-8 h-8 bg-accent/15 rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={14} className="text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground truncate">{note.title || 'Sin título'}</p>
                  {note.notebooks?.name && (
                    <p className="text-[10px] text-subtle truncate flex items-center gap-1">
                      <BookOpen size={9} />
                      {note.notebooks.name}
                    </p>
                  )}
                </div>
                {uploadingTo === note.id && (
                  <Loader2 size={15} className="text-accent animate-spin shrink-0" />
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
````

## File: components/notes/FavoriteNotes.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import { useNoteStore } from '@/store/noteStore'
import { getFavoriteNotes } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { Note } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Star } from 'lucide-react'

export default function FavoriteNotes() {
  const [favoriteNotes, setFavoriteNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const { setSelectedNote, selectedNote } = useNoteStore()

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getFavoriteNotes()
        setFavoriteNotes(data)
      } catch {
        // error cargando favoritos
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      <div className="h-14 px-4 border-b border-border flex items-center gap-2.5">
        <Star size={18} className="text-yellow-400 fill-yellow-400 shrink-0" />
        <div>
          <h2 className="font-semibold text-foreground text-sm">Favoritos</h2>
          {!loading && (
            <p className="text-xs text-muted">
              {favoriteNotes.length} nota{favoriteNotes.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-muted text-center mt-8">Cargando...</p>
        ) : favoriteNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Star size={32} className="text-subtle" />
            <p className="text-sm text-muted">Sin notas favoritas</p>
          </div>
        ) : (
          favoriteNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`px-4 py-3.5 border-b border-border cursor-pointer transition ${
                selectedNote?.id === note.id
                  ? 'bg-elevated border-l-2 border-l-accent'
                  : 'hover:bg-surface'
              }`}
            >
              <p className="text-sm font-medium text-foreground truncate">
                {note.title || 'Sin título'}
              </p>
              <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                {extractTextPreview(note.content) || 'Sin contenido'}
              </p>
              <p className="text-xs text-subtle mt-1.5">
                {format(new Date(note.updated_at), 'd MMM yyyy', { locale: es })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
````

## File: components/notes/SearchResults.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import { searchNotes } from '@/lib/supabase/search'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { Note } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Search } from 'lucide-react'

export default function SearchResults() {
  const [results, setResults] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const { setSelectedNote, selectedNote } = useNoteStore()
  const { searchQuery } = useUIStore()

  useEffect(() => {
    if (!searchQuery.trim()) {
      // Reset intencional de resultados cuando la búsqueda queda vacía.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResults([])
      return
    }
    const timeout = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await searchNotes(searchQuery)
        setResults(data)
      } catch {
        // error buscando notas
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => clearTimeout(timeout)
  }, [searchQuery])

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      <div className="h-14 px-4 border-b border-border flex items-center gap-2.5">
        <Search size={18} className="text-muted shrink-0" />
        <div>
          <h2 className="font-semibold text-foreground text-sm">Resultados</h2>
          {!loading && results.length > 0 && (
            <p className="text-xs text-muted">
              {results.length} nota{results.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-muted text-center mt-8">Buscando...</p>
        ) : !searchQuery.trim() ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Search size={32} className="text-subtle" />
            <p className="text-sm text-muted">Escribe para buscar</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <Search size={32} className="text-subtle" />
            <p className="text-sm text-muted">Sin resultados</p>
          </div>
        ) : (
          results.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`px-4 py-3.5 border-b border-border cursor-pointer transition ${
                selectedNote?.id === note.id
                  ? 'bg-elevated border-l-2 border-l-accent'
                  : 'hover:bg-surface'
              }`}
            >
              <p className="text-sm font-medium text-foreground truncate">
                {note.title || 'Sin título'}
              </p>
              <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                {extractTextPreview(note.content) || 'Sin contenido'}
              </p>
              <p className="text-xs text-subtle mt-1.5">
                {format(new Date(note.updated_at), 'd MMM yyyy', { locale: es })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
````

## File: components/notes/TrashNotes.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import { getTrashedNotes, restoreNote, permanentlyDeleteNote } from '@/lib/supabase/notes'
import type { Note } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Trash2, RotateCcw, X } from 'lucide-react'
import EmptyState from '@/components/ui/EmptyState'

export default function TrashNotes() {
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTrashedNotes()
        setTrashedNotes(data)
      } catch {
        // error cargando papelera
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleRestore = async (id: string) => {
    try {
      await restoreNote(id)
      setTrashedNotes((prev) => prev.filter((n) => n.id !== id))
    } catch {
      // error restaurando nota
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await permanentlyDeleteNote(id)
      setTrashedNotes((prev) => prev.filter((n) => n.id !== id))
    } catch {
      // error eliminando nota
    }
  }

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      <div className="h-14 px-4 border-b border-border flex items-center gap-2.5">
        <Trash2 size={18} className="text-muted shrink-0" />
        <div>
          <h2 className="font-semibold text-foreground text-sm">Papelera</h2>
          {!loading && (
            <p className="text-xs text-muted">
              {trashedNotes.length} nota{trashedNotes.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-muted text-center mt-8">Cargando...</p>
        ) : trashedNotes.length === 0 ? (
          <EmptyState
            variant="trash"
            title="La papelera está vacía"
            description="Las notas que elimines aparecerán aquí"
          />
        ) : (
          trashedNotes.map((note) => (
            <div
              key={note.id}
              className="group px-4 py-3.5 border-b border-border hover:bg-surface transition"
            >
              <p className="text-sm font-medium text-foreground truncate">
                {note.title || 'Sin título'}
              </p>
              <p className="text-xs text-muted mt-1">
                {format(new Date(note.updated_at), 'd MMM yyyy', { locale: es })}
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => handleRestore(note.id)}
                  className="flex items-center gap-1 text-xs text-accent hover:text-accent-light transition cursor-pointer"
                >
                  <RotateCcw size={12} />
                  Restaurar
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(note.id)}
                  className="flex items-center gap-1 text-xs text-danger hover:text-danger/80 transition cursor-pointer"
                >
                  <X size={12} />
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
````

## File: hooks/useNotifications.ts
````typescript
'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  getNotifications,
  markAsRead as markAsReadLib,
  markAllRead as markAllReadLib,
  deleteNotification as deleteNotificationLib,
} from '@/lib/supabase/notifications'
import type { Notification } from '@/types'

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const data = await getNotifications()
      setNotifications(data)
    } catch {
      // silencioso
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Carga inicial de notificaciones al montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [load])

  useEffect(() => {
    const supabase = createClient()
    let channel: ReturnType<typeof supabase.channel> | null = null
    let cancelled = false

    // getSession() reads from local storage — no network round-trip
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled || !session?.user) return

      channel = supabase
        .channel(`notifications-${session.user.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${session.user.id}`,
          },
          (payload) => {
            setNotifications((prev) => [payload.new as Notification, ...prev])
          }
        )
        .subscribe()
    })

    return () => {
      cancelled = true
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  const markAsRead = useCallback(async (id: string) => {
    await markAsReadLib(id)
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    )
  }, [])

  const markAllRead = useCallback(async () => {
    await markAllReadLib()
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
  }, [])

  const deleteNotification = useCallback(async (id: string) => {
    await deleteNotificationLib(id)
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const unreadCount = notifications.filter((n) => !n.is_read).length

  return { notifications, loading, unreadCount, markAsRead, markAllRead, deleteNotification }
}
````

## File: lib/editor/extensions.ts
````typescript
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
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
````

## File: lib/supabase/notebooks.ts
````typescript
import { createClient } from './client'
import { Notebook } from '@/types'

export async function getNotebooks(): Promise<Notebook[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notebooks')
    .select('*')
    .is('space_id', null)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function moveNotebookToSpace(
  notebookId: string,
  spaceId: string | null
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notebooks')
    .update({ space_id: spaceId })
    .eq('id', notebookId)

  if (error) throw new Error(error.message)
}

export async function createNotebook(name: string, description?: string): Promise<Notebook> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('notebooks')
    .insert({ name, description, user_id: user.id })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteNotebook(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notebooks')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function updateNotebook(id: string, name: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notebooks')
    .update({ name, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)
}
````

## File: lib/supabase/shared-notes.ts
````typescript
import { createClient } from './client'
import type { SharedNote } from '@/types'

function generateSlug(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12)
}

export async function getShareLink(noteId: string): Promise<SharedNote | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('shared_notes')
    .select('*')
    .eq('note_id', noteId)
    .maybeSingle()
  if (error) console.error('[shared-notes] getShareLink error:', error)
  return data ?? null
}

export async function createShareLink(noteId: string): Promise<SharedNote> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const existing = await getShareLink(noteId)
  if (existing) return existing

  const { data, error } = await supabase
    .from('shared_notes')
    .insert({
      note_id: noteId,
      user_id: user.id,
      public_slug: generateSlug(),
      is_active: true,
      access_level: 'view',
      view_count: 0,
    })
    .select()
    .single()

  if (error) console.error('[shared-notes] createShareLink insert error:', error)
  if (error) throw new Error(error.message)
  return data
}

export async function updateShareLink(
  id: string,
  updates: { is_active?: boolean; access_level?: 'none' | 'view' | 'edit' }
): Promise<void> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { error } = await supabase
    .from('shared_notes')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id)
  if (error) throw new Error(error.message)
}

export async function deactivateShareLink(id: string, isActive: boolean): Promise<void> {
  return updateShareLink(id, { is_active: isActive })
}
````

## File: lib/supabase/spaces.ts
````typescript
import { createClient } from './client'
import type { Space, SpaceMember, SpaceRole } from '@/types'

export async function getMySpaces(): Promise<Space[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  // Spaces owned by the user
  const { data: owned, error: ownedError } = await supabase
    .from('spaces')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  if (ownedError) throw new Error(ownedError.message)

  // Memberships where the user is NOT the owner
  const { data: memberships, error: membershipsError } = await supabase
    .from('space_members')
    .select('space_id, role')
    .eq('user_id', user.id)

  if (membershipsError) throw new Error(membershipsError.message)

  const memberSpaceIds = (memberships ?? []).map((m) => m.space_id)

  let memberSpaces: Space[] = []
  if (memberSpaceIds.length > 0) {
    const { data: joined, error: joinedError } = await supabase
      .from('spaces')
      .select('*')
      .in('id', memberSpaceIds)
      .neq('owner_id', user.id)
      .order('created_at', { ascending: false })

    if (joinedError) throw new Error(joinedError.message)

    const roleMap = new Map(
      (memberships ?? []).map((m) => [m.space_id, m.role as SpaceRole])
    )

    memberSpaces = (joined ?? []).map((s) => ({
      ...s,
      user_role: roleMap.get(s.id) ?? 'viewer',
    }))
  }

  const ownedWithRole: Space[] = (owned ?? []).map((s) => ({
    ...s,
    user_role: 'owner' as const,
  }))

  return [...ownedWithRole, ...memberSpaces]
}

export async function createSpace(name: string, description?: string): Promise<Space> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('spaces')
    .insert({ name, description: description ?? null, owner_id: user.id })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return { ...data, user_role: 'owner' }
}

export async function updateSpace(
  spaceId: string,
  fields: { name?: string; description?: string }
): Promise<Space> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('spaces')
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq('id', spaceId)
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteSpace(spaceId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('spaces').delete().eq('id', spaceId)
  if (error) throw new Error(error.message)
}

export async function getSpaceMembers(spaceId: string): Promise<SpaceMember[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('space_members')
    .select('*')
    .eq('space_id', spaceId)
    .order('joined_at', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function updateMemberRole(
  spaceId: string,
  userId: string,
  role: SpaceRole
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('space_members')
    .update({ role })
    .eq('space_id', spaceId)
    .eq('user_id', userId)

  if (error) throw new Error(error.message)
}

export async function removeMember(spaceId: string, userId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('space_members')
    .delete()
    .eq('space_id', spaceId)
    .eq('user_id', userId)

  if (error) throw new Error(error.message)
}

export async function getSpaceNotebooks(spaceId: string): Promise<import('@/types').Notebook[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notebooks')
    .select('*')
    .eq('space_id', spaceId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createNotebookInSpace(
  spaceId: string,
  name: string
): Promise<import('@/types').Notebook> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('notebooks')
    .insert({ name, user_id: user.id, space_id: spaceId })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export interface SpaceMemberWithEmail {
  user_id: string
  role: SpaceRole
  invited_by: string | null
  joined_at: string
  email: string
}

export async function getSpaceMembersWithEmail(
  spaceId: string
): Promise<SpaceMemberWithEmail[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .rpc('get_space_members_with_email', { p_space_id: spaceId })

  if (error) throw new Error(error.message)
  return (data ?? []) as SpaceMemberWithEmail[]
}

export interface SpaceOverview {
  space_id: string
  member_count: number
  notebook_count: number
  owner_email: string | null
  my_joined_at: string | null
}

/**
 * Conteos de miembros/libretas + email del dueño + fecha de unión del usuario
 * actual, para todos los spaces accesibles. Una sola llamada (RPC SECURITY
 * DEFINER) que alimenta SpacesView y SharedWithMeView.
 */
export async function getSpacesOverview(): Promise<Map<string, SpaceOverview>> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_spaces_overview')
  if (error) throw new Error(error.message)

  const map = new Map<string, SpaceOverview>()
  for (const row of (data ?? []) as SpaceOverview[]) {
    map.set(row.space_id, row)
  }
  return map
}

export async function getSpaceNotes(spaceId: string): Promise<import('@/types').Note[]> {
  const supabase = createClient()

  const { data: notebooks, error: nbError } = await supabase
    .from('notebooks')
    .select('id')
    .eq('space_id', spaceId)

  if (nbError) throw new Error(nbError.message)

  const notebookIds = (notebooks ?? []).map((n) => n.id)
  if (notebookIds.length === 0) return []

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .in('notebook_id', notebookIds)
    .eq('is_trashed', false)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}
````

## File: lib/supabase/tags.ts
````typescript
import { createClient } from './client'
import type { Tag, TagWithCount, Note } from '@/types'

export async function getTags(): Promise<Tag[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createTag(name: string): Promise<Tag> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('tags')
    .insert({ name: name.trim(), user_id: user.id })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function deleteTag(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase.from('tags').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

type NoteTagRow = { tags: Tag | null }

export async function getTagsByNote(noteId: string): Promise<Tag[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('note_tags')
    .select('tags(*)')
    .eq('note_id', noteId)

  if (error) throw new Error(error.message)
  return ((data ?? []) as unknown as NoteTagRow[])
    .map(row => row.tags)
    .filter((tag): tag is Tag => tag !== null)
}

export async function addTagToNote(noteId: string, tagId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('note_tags')
    .insert({ note_id: noteId, tag_id: tagId })

  if (error) throw new Error(error.message)
}

export async function removeTagFromNote(noteId: string, tagId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('note_tags')
    .delete()
    .eq('note_id', noteId)
    .eq('tag_id', tagId)

  if (error) throw new Error(error.message)
}

export async function getTagsWithCount(): Promise<TagWithCount[]> {
  const supabase = createClient()
  const { data, error } = await supabase.rpc('get_tags_with_count')

  if (error) throw new Error(error.message)
  return ((data ?? []) as TagWithCount[]).map((tag) => ({
    ...tag,
    note_count: Number(tag.note_count),
  }))
}

export async function renameTag(id: string, newName: string): Promise<void> {
  const trimmed = newName.trim()
  if (!trimmed) throw new Error('El nombre de la etiqueta no puede estar vacío')

  const supabase = createClient()
  const { error } = await supabase
    .from('tags')
    .update({ name: trimmed })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function deleteTagWithRelations(id: string): Promise<void> {
  const supabase = createClient()

  const { error: relError } = await supabase
    .from('note_tags')
    .delete()
    .eq('tag_id', id)

  if (relError) throw new Error(relError.message)

  const { error } = await supabase.from('tags').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

type NoteRow = { notes: Note | null }

export async function getNotesByTag(tagId: string): Promise<Note[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('note_tags')
    .select('notes(*)')
    .eq('tag_id', tagId)

  if (error) throw new Error(error.message)
  return ((data ?? []) as unknown as NoteRow[])
    .map((row) => row.notes)
    .filter((note): note is Note => note !== null && !note.is_trashed)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}
````

## File: tsconfig.json
````json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules", "supabase/functions", "tests", "vitest.config.ts", "vitest.setup.ts"]
}
````

## File: .gitignore
````
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# claude code local settings
.claude/

# e2e test artifacts (screenshots, reports)
/e2e-out/
# e2e stored auth session (cookies/localStorage de la cuenta de prueba)
/e2e/.auth/
````

## File: app/layout.tsx
````typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Slab, Dancing_Script, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeApplier } from "@/components/ThemeApplier";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteEvo",
  description: "Tu segundo cerebro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${robotoSlab.variable} ${dancingScript.variable} ${caveat.variable} h-full antialiased`}
    >
      <head>
        {/* Prevent flash of wrong theme before JS hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('noteevo-theme')||'dark';if(t==='system')t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeApplier />
        {children}
      </body>
    </html>
  );
}
````

## File: components/spaces/SpaceDetailView.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import {
  ChevronLeft, Share2, BookOpen, FileText, Plus, MoveRight,
  Loader2, Users, Crown, Shield, Edit3, Eye, Trash2, ChevronDown,
} from 'lucide-react'
import {
  getSpaceNotebooks, getSpaceNotes, createNotebookInSpace,
  getSpaceMembersWithEmail, updateMemberRole, removeMember,
} from '@/lib/supabase/spaces'
import { moveNotebookToSpace } from '@/lib/supabase/notebooks'
import { extractTextPreview } from '@/lib/utils/tiptap'
import { createClient } from '@/lib/supabase/client'
import InviteModal from './InviteModal'
import CreateNotebookInSpaceModal from './CreateNotebookInSpaceModal'
import type { Space, Notebook, Note, SpaceRole } from '@/types'
import type { SpaceMemberWithEmail } from '@/lib/supabase/spaces'

type Tab = 'notebooks' | 'notes' | 'members'

interface SpaceDetailViewProps {
  space: Space
  onBack: () => void
}

const ROLE_OPTIONS: { value: SpaceRole; label: string; icon: React.ReactNode }[] = [
  { value: 'viewer', label: 'Viewer', icon: <Eye size={13} /> },
  { value: 'editor', label: 'Editor', icon: <Edit3 size={13} /> },
  { value: 'admin', label: 'Admin', icon: <Shield size={13} /> },
]

const ROLE_ICONS: Record<SpaceRole | 'owner', React.ReactNode> = {
  owner: <Crown size={13} />,
  admin: <Shield size={13} />,
  editor: <Edit3 size={13} />,
  viewer: <Eye size={13} />,
}

const ROLE_LABEL: Record<SpaceRole | 'owner', string> = {
  owner: 'Dueño',
  admin: 'Admin',
  editor: 'Editor',
  viewer: 'Viewer',
}

function memberInitials(email: string): string {
  const parts = email.split(/[\s@._-]+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

function RoleSelector({
  currentRole,
  onChange,
  disabled,
}: {
  currentRole: SpaceRole
  onChange: (role: SpaceRole) => void
  disabled: boolean
}) {
  const [open, setOpen] = useState(false)

  if (disabled) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
        {ROLE_ICONS[currentRole]}
        {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
      </span>
    )
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20 hover:bg-accent/20 transition cursor-pointer"
      >
        {ROLE_ICONS[currentRole]}
        {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
        <ChevronDown size={11} />
      </button>
      {open && (
        <div className="absolute right-0 top-7 z-20 bg-elevated border border-border rounded-xl shadow-xl min-w-[130px] py-1 overflow-hidden">
          {ROLE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-xs transition text-left cursor-pointer ${
                currentRole === opt.value
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:bg-surface hover:text-foreground'
              }`}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SpaceDetailView({ space, onBack }: SpaceDetailViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('notebooks')
  const [notebooks, setNotebooks] = useState<Notebook[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [members, setMembers] = useState<SpaceMemberWithEmail[]>([])
  const [loading, setLoading] = useState(true)
  const [showInvite, setShowInvite] = useState(false)
  const [showCreateNotebook, setShowCreateNotebook] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  const isViewer = space.user_role === 'viewer'
  const canInvite = space.user_role === 'owner' || space.user_role === 'admin'
  const isOwner = space.user_role === 'owner'

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setCurrentUserId(user?.id ?? null)
    })
  }, [])

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const [nbs, nts, mbs] = await Promise.all([
          getSpaceNotebooks(space.id),
          getSpaceNotes(space.id),
          getSpaceMembersWithEmail(space.id),
        ])
        setNotebooks(nbs)
        setNotes(nts)
        setMembers(mbs)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar el space')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [space.id])

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel(`space-membership-${space.id}`)
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'space_members',
          filter: `space_id=eq.${space.id}`,
        },
        (payload) => {
          if (payload.old && (payload.old as { user_id: string }).user_id === currentUserId) {
            onBack()
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [space.id, currentUserId, onBack])

  const notebookMap = new Map(notebooks.map((nb) => [nb.id, nb.name]))

  const handleConfirmCreateNotebook = async (name: string) => {
    const nb = await createNotebookInSpace(space.id, name)
    setNotebooks((prev) => [nb, ...prev])
  }

  const handleMoveOut = async (notebook: Notebook) => {
    setNotebooks((prev) => prev.filter((nb) => nb.id !== notebook.id))
    try {
      await moveNotebookToSpace(notebook.id, null)
    } catch {
      setNotebooks((prev) => [notebook, ...prev])
    }
  }

  const handleRoleChange = async (userId: string, newRole: SpaceRole) => {
    const prev = members.find((m) => m.user_id === userId)
    setMembers((ms) => ms.map((m) => m.user_id === userId ? { ...m, role: newRole } : m))
    try {
      await updateMemberRole(space.id, userId, newRole)
    } catch {
      if (prev) {
        setMembers((ms) => ms.map((m) => m.user_id === userId ? { ...m, role: prev.role } : m))
      }
      setError('No se pudo cambiar el rol')
    }
  }

  const handleRemoveMember = async (userId: string) => {
    const prev = members.find((m) => m.user_id === userId)
    setMembers((ms) => ms.filter((m) => m.user_id !== userId))
    try {
      await removeMember(space.id, userId)
    } catch {
      if (prev) setMembers((ms) => [prev, ...ms])
      setError('No se pudo expulsar al miembro')
    }
  }

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'notebooks', label: 'Notebooks', count: notebooks.length },
    { key: 'notes', label: 'Notas', count: notes.length },
    { key: 'members', label: 'Miembros', count: members.length + (isOwner ? 1 : 0) },
  ]

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-3xl mx-auto px-8 py-8 flex flex-col gap-6">

        {/* Breadcrumb + header */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onBack}
            title="Volver a Spaces"
            className="flex items-center gap-1.5 text-muted hover:text-foreground text-sm transition w-fit"
          >
            <ChevronLeft size={15} />
            Spaces
          </button>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-semibold text-foreground">{space.name}</h1>
                {space.user_role && (
                  <span
                    title="Tu rol en este space"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20"
                  >
                    {ROLE_ICONS[space.user_role]}
                    {ROLE_LABEL[space.user_role]}
                  </span>
                )}
              </div>
              {space.description && (
                <p className="text-sm text-muted mt-1">{space.description}</p>
              )}
            </div>
            {canInvite && (
              <button
                type="button"
                title="Compartir space"
                onClick={() => setShowInvite(true)}
                className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm text-muted hover:text-foreground hover:border-accent/40 transition shrink-0"
              >
                <Share2 size={14} />
                Compartir
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium transition border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-foreground'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs opacity-60">{tab.count}</span>
            </button>
          ))}
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={20} className="text-muted animate-spin" />
          </div>
        ) : (
          <>
            {/* Tab: Notebooks */}
            {activeTab === 'notebooks' && (
              <div className="flex flex-col gap-3">
                {!isViewer && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowCreateNotebook(true)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 transition"
                    >
                      <Plus size={14} />
                      Nueva libreta
                    </button>
                  </div>
                )}
                {notebooks.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-16 text-center">
                    <BookOpen size={28} className="text-subtle" />
                    <p className="text-sm text-muted">Sin libretas en este space</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    {notebooks.map((nb) => (
                      <div
                        key={nb.id}
                        className="flex items-center justify-between gap-3 p-3.5 bg-panel border border-border rounded-xl hover:border-accent/30 transition group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 bg-accent/15 rounded-lg flex items-center justify-center shrink-0">
                            <BookOpen size={14} className="text-accent" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{nb.name}</p>
                            {nb.description && (
                              <p className="text-xs text-muted truncate">{nb.description}</p>
                            )}
                          </div>
                        </div>
                        {!isViewer && (
                          <button
                            type="button"
                            title="Mover fuera del space"
                            onClick={() => handleMoveOut(nb)}
                            className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-muted hover:text-foreground transition shrink-0"
                          >
                            <MoveRight size={13} />
                            Mover fuera
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Notas */}
            {activeTab === 'notes' && (
              <div className="flex flex-col gap-2">
                {notes.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-16 text-center">
                    <FileText size={28} className="text-subtle" />
                    <p className="text-sm text-muted">Sin notas en este space</p>
                  </div>
                ) : (
                  notes.map((note) => (
                    <div
                      key={note.id}
                      className="flex flex-col gap-1 p-3.5 bg-panel border border-border rounded-xl hover:border-accent/30 transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-foreground truncate">{note.title}</p>
                        <span className="text-xs text-subtle shrink-0">
                          {new Date(note.updated_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                        </span>
                      </div>
                      {note.notebook_id && notebookMap.has(note.notebook_id) && (
                        <p className="text-xs text-muted flex items-center gap-1">
                          <BookOpen size={10} />
                          {notebookMap.get(note.notebook_id)}
                        </p>
                      )}
                      <p className="text-xs text-subtle line-clamp-2 mt-0.5">
                        {extractTextPreview(note.content, 100)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab: Miembros */}
            {activeTab === 'members' && (
              <div className="flex flex-col gap-3">
                {canInvite && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowInvite(true)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-accent text-white text-sm rounded-lg hover:bg-accent/90 transition"
                    >
                      <Users size={14} />
                      Invitar miembro
                    </button>
                  </div>
                )}

                <div className="border border-border rounded-xl overflow-hidden">
                  {/* Column headers */}
                  <div className="hidden sm:flex items-center gap-3 px-4 py-2.5 bg-surface/40 border-b border-border text-[11px] font-medium uppercase tracking-wider text-subtle">
                    <span className="flex-1 min-w-0">Miembro</span>
                    <span className="w-32 shrink-0">Rol</span>
                    <span className="w-28 shrink-0">Unión</span>
                    <span className="w-8 shrink-0" />
                  </div>

                  {/* Owner row */}
                  <div className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-9 h-9 bg-accent/15 rounded-full flex items-center justify-center shrink-0 text-accent text-xs font-semibold">
                        <Crown size={15} />
                      </div>
                      <p className="text-sm font-medium text-foreground truncate">
                        {isOwner ? 'Tú (dueño)' : 'Dueño del space'}
                      </p>
                    </div>
                    <div className="w-32 shrink-0">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                        <Crown size={11} />
                        Dueño
                      </span>
                    </div>
                    <div className="w-28 shrink-0 text-xs text-subtle">—</div>
                    <div className="w-8 shrink-0" />
                  </div>

                  {/* Member rows */}
                  {members.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-12 text-center">
                      <Users size={28} className="text-subtle" />
                      <p className="text-sm text-muted">Sin miembros invitados aún</p>
                      {canInvite && (
                        <button
                          type="button"
                          onClick={() => setShowInvite(true)}
                          className="text-sm text-accent hover:text-accent-light transition"
                        >
                          Invitar miembro
                        </button>
                      )}
                    </div>
                  ) : (
                    members.map((member) => {
                      const isCurrentUser = member.user_id === currentUserId
                      const canManage = canInvite && !isCurrentUser
                      return (
                        <div
                          key={member.user_id}
                          className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-surface/30 transition group"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="w-9 h-9 bg-surface rounded-full flex items-center justify-center shrink-0 border border-border text-xs font-semibold text-muted">
                              {memberInitials(member.email)}
                            </div>
                            <p className="text-sm font-medium text-foreground truncate">
                              {member.email}
                              {isCurrentUser && (
                                <span className="ml-1.5 text-xs text-muted">(tú)</span>
                              )}
                            </p>
                          </div>
                          <div className="w-32 shrink-0">
                            <RoleSelector
                              currentRole={member.role}
                              onChange={(role) => handleRoleChange(member.user_id, role)}
                              disabled={!canManage}
                            />
                          </div>
                          <div className="w-28 shrink-0 text-xs text-subtle">
                            {new Date(member.joined_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                          <div className="w-8 shrink-0 flex justify-end">
                            {canManage && (
                              <button
                                type="button"
                                title="Expulsar miembro"
                                onClick={() => handleRemoveMember(member.user_id)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-muted hover:text-danger rounded-lg hover:bg-surface transition cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {showInvite && (
        <InviteModal spaceId={space.id} onClose={() => setShowInvite(false)} />
      )}

      {showCreateNotebook && (
        <CreateNotebookInSpaceModal
          onClose={() => setShowCreateNotebook(false)}
          onConfirm={handleConfirmCreateNotebook}
        />
      )}
    </div>
  )
}
````

## File: components/tasks/TaskModal.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { X, Flag, Calendar, AlignLeft, FileText, Search, Check, Clock } from 'lucide-react'
import type { Task } from '@/types'
import { getAllNotesWithNotebook, type NoteWithNotebook } from '@/lib/supabase/notes'

type Priority = Task['priority']

interface SaveData {
  title: string
  description: string
  due_date: string
  start_time: string | null
  end_time: string | null
  priority: Priority
  is_flagged: boolean
  note_id: string | null
}

interface Props {
  onClose: () => void
  onSave: (data: SaveData) => Promise<void>
  initialDate?: string
  initialStartTime?: string
  initialEndTime?: string
}

const PRIORITIES: { value: Priority; label: string; dot: string; activeBg: string; activeText: string }[] = [
  { value: 'low', label: 'Baja', dot: 'bg-blue-400', activeBg: 'bg-blue-500/15 border-blue-500/45', activeText: 'text-blue-400' },
  { value: 'medium', label: 'Media', dot: 'bg-yellow-400', activeBg: 'bg-yellow-500/15 border-yellow-500/45', activeText: 'text-yellow-500' },
  { value: 'high', label: 'Alta', dot: 'bg-red-400', activeBg: 'bg-red-500/15 border-red-500/45', activeText: 'text-red-400' },
]

const TODAY = new Date().toISOString().split('T')[0]

export default function TaskModal({
  onClose, onSave, initialDate, initialStartTime, initialEndTime,
}: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(initialDate ?? '')
  const [startTime, setStartTime] = useState(initialStartTime ?? '')
  const [endTime, setEndTime] = useState(initialEndTime ?? '')
  const [priority, setPriority] = useState<Priority>('medium')
  const [isFlagged, setIsFlagged] = useState(false)
  const [noteId, setNoteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const [notes, setNotes] = useState<NoteWithNotebook[]>([])
  const [showNotePicker, setShowNotePicker] = useState(false)
  const [noteSearch, setNoteSearch] = useState('')

  const titleRef = useRef<HTMLInputElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    titleRef.current?.focus()
  }, [])

  useEffect(() => {
    let active = true
    getAllNotesWithNotebook()
      .then((data) => { if (active) setNotes(data) })
      .catch(() => { /* error cargando notas */ })
    return () => { active = false }
  }, [])

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose()
  }

  // Una hora solo es válida si hay fecha asociada.
  const timeNeedsDate = (!!startTime || !!endTime) && !dueDate
  const timeRangeInvalid = !!startTime && !!endTime && endTime <= startTime
  const canSave = !!title.trim() && !saving && !timeNeedsDate && !timeRangeInvalid

  const handleSave = async () => {
    if (!canSave) return
    setSaving(true)
    try {
      // Strings ISO literales (sin conversión de zona horaria): el reloj que
      // el usuario escribe se guarda tal cual en la columna timestamptz.
      const startIso = dueDate && startTime ? `${dueDate}T${startTime}:00` : null
      const endIso = dueDate && endTime ? `${dueDate}T${endTime}:00` : null
      await onSave({
        title: title.trim(),
        description,
        due_date: dueDate,
        start_time: startIso,
        end_time: endIso,
        priority,
        is_flagged: isFlagged,
        note_id: noteId,
      })
      onClose()
    } catch {
      // error silencioso
    } finally {
      setSaving(false)
    }
  }

  const selectedNote = notes.find((n) => n.id === noteId) ?? null
  const filteredNotes = noteSearch.trim()
    ? notes.filter((n) => n.title.toLowerCase().includes(noteSearch.toLowerCase()))
    : notes

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div className="w-full max-w-md bg-panel border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground text-sm">Nueva tarea</h2>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1 text-muted hover:text-foreground transition cursor-pointer rounded"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Title */}
          <input
            ref={titleRef}
            type="text"
            data-testid="task-title-input"
            placeholder="Título de la tarea"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            className="w-full bg-transparent text-foreground text-lg font-semibold outline-none placeholder-subtle"
            style={{ color: 'var(--color-foreground)' }}
          />

          {/* Description */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-subtle mb-1.5">
              <AlignLeft size={13} /> Descripción
            </label>
            <textarea
              placeholder="Añade más detalles (opcional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-foreground outline-none resize-none placeholder-subtle focus:border-accent/50 transition"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>

          {/* Priority — segmented visual selector */}
          <div>
            <label className="block text-xs font-medium text-subtle mb-1.5">Prioridad</label>
            <div className="grid grid-cols-3 gap-2">
              {PRIORITIES.map((p) => {
                const active = priority === p.value
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition cursor-pointer ${
                      active
                        ? `${p.activeBg} ${p.activeText}`
                        : 'bg-surface border-border text-muted hover:text-foreground'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${p.dot}`} />
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Due date + Flag */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-subtle mb-1.5">
                <Calendar size={13} /> Fecha límite
              </label>
              <input
                type="date"
                value={dueDate}
                min={TODAY}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none cursor-pointer focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
                title="Fecha límite"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-subtle mb-1.5">Importante</label>
              <button
                type="button"
                onClick={() => setIsFlagged(!isFlagged)}
                className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition cursor-pointer ${
                  isFlagged
                    ? 'bg-orange-500/15 border-orange-500/45 text-orange-400'
                    : 'bg-surface border-border text-muted hover:text-foreground'
                }`}
              >
                <Flag size={13} className={isFlagged ? 'fill-orange-400' : ''} />
                {isFlagged ? 'Marcada' : 'Marcar'}
              </button>
            </div>
          </div>

          {/* Hora inicio / fin (opcional) */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-subtle mb-1.5">
              <Clock size={13} /> Hora <span className="text-subtle/70">(opcional)</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                aria-label="Hora de inicio"
                title="Hora de inicio"
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none cursor-pointer focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                aria-label="Hora de fin"
                title="Hora de fin"
                className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none cursor-pointer focus:border-accent/50 transition"
                style={{ color: 'var(--color-foreground)' }}
              />
            </div>
            {timeNeedsDate && (
              <p className="text-xs text-yellow-500 mt-1.5">Elige una fecha límite para asignar una hora</p>
            )}
            {timeRangeInvalid && (
              <p className="text-xs text-danger mt-1.5">La hora de fin debe ser posterior a la de inicio</p>
            )}
          </div>

          {/* Link to note */}
          <div className="relative">
            <label className="flex items-center gap-1.5 text-xs font-medium text-subtle mb-1.5">
              <FileText size={13} /> Vincular a una nota
            </label>
            <button
              type="button"
              onClick={() => setShowNotePicker(!showNotePicker)}
              className="w-full flex items-center justify-between gap-2 bg-surface border border-border rounded-lg px-3 py-2 text-xs cursor-pointer hover:border-accent/50 transition"
            >
              <span className={`truncate ${selectedNote ? 'text-foreground' : 'text-subtle'}`}>
                {selectedNote ? (selectedNote.title || 'Sin título') : 'Ninguna (opcional)'}
              </span>
              {selectedNote && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => { e.stopPropagation(); setNoteId(null) }}
                  className="text-muted hover:text-danger transition shrink-0"
                  title="Quitar vínculo"
                >
                  <X size={13} />
                </span>
              )}
            </button>

            {showNotePicker && (
              <div className="absolute bottom-full left-0 right-0 mb-1 bg-panel border border-border rounded-lg shadow-xl z-20 overflow-hidden">
                <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
                  <Search size={13} className="text-muted shrink-0" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Buscar nota…"
                    value={noteSearch}
                    onChange={(e) => setNoteSearch(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-foreground outline-none placeholder-subtle"
                    style={{ color: 'var(--color-foreground)' }}
                  />
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredNotes.length === 0 ? (
                    <p className="px-3 py-3 text-xs text-subtle text-center">Sin notas</p>
                  ) : (
                    filteredNotes.slice(0, 50).map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={() => { setNoteId(n.id); setShowNotePicker(false); setNoteSearch('') }}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground cursor-pointer transition text-left"
                      >
                        <span className="truncate">{n.title || 'Sin título'}</span>
                        {n.id === noteId && <Check size={13} className="text-accent shrink-0" />}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm text-muted hover:text-foreground transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            data-testid="task-submit"
            onClick={handleSave}
            disabled={!canSave}
            className="px-6 py-2.5 text-sm bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-semibold shadow-sm shadow-accent/20"
          >
            {saving ? 'Guardando…' : 'Crear tarea'}
          </button>
        </div>
      </div>
    </div>
  )
}
````

## File: components/templates/SaveAsTemplateModal.tsx
````typescript
'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { createTemplate } from '@/lib/supabase/templates'
import type { Template } from '@/types'

interface SaveAsTemplateModalProps {
  content: Record<string, unknown>
  defaultName?: string
  onSaved: (template: Template) => void
  onClose: () => void
}

const CATEGORIES = [
  { value: 'personal', label: 'Personal' },
  { value: 'work', label: 'Trabajo' },
  { value: 'meeting', label: 'Reuniones' },
  { value: 'journal', label: 'Diario' },
  { value: 'viaje', label: 'Viaje' },
  { value: 'educacion', label: 'Educación' },
  { value: 'proyecto', label: 'Proyecto' },
  { value: 'diario', label: 'Diario del día' },
]

export default function SaveAsTemplateModal({
  content,
  defaultName = '',
  onSaved,
  onClose,
}: SaveAsTemplateModalProps) {
  const [name, setName] = useState(defaultName)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('personal')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async () => {
    if (!name.trim()) return
    setSaving(true)
    setError(null)
    try {
      const template = await createTemplate(name.trim(), content, {
        description: description.trim() || undefined,
        category,
      })
      onSaved(template)
      onClose()
    } catch {
      setError('Error al guardar la plantilla')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-foreground text-sm">Guardar como plantilla</h2>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1.5">
              Nombre *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              placeholder="Ej: Mi plantilla"
              autoFocus
              className="w-full px-3 py-2 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1.5">
              Descripción
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descripción opcional"
              className="w-full px-3 py-2 bg-elevated border border-border rounded-lg text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/50 focus:border-accent/50 transition"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-2">
              Categoría
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition cursor-pointer ${
                    category === cat.value
                      ? 'bg-accent/10 border-accent/40 text-accent'
                      : 'bg-surface border-border text-muted hover:border-accent/30 hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-danger">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 px-5 py-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-muted hover:text-foreground transition cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim() || saving}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer font-medium"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}
````

## File: hooks/useKeyboardShortcuts.ts
````typescript
'use client'

import { useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { createNote } from '@/lib/supabase/notes'

export function useKeyboardShortcuts() {
  const { setCurrentView, setCheatsheetOpen, setFocusMode, isFocusMode, toggleSidebarCollapsed, toggleTypewriterMode, setCommandPaletteOpen } = useUIStore()
  const { selectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isEditable =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'

      // Escape — siempre
      if (e.key === 'Escape') {
        setCheatsheetOpen(false)
        setCommandPaletteOpen(false)
        return
      }

      // Ctrl+K — command palette (solo fuera de campos editables para no romper el Ctrl+K de TipTap)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        if (!isEditable) {
          e.preventDefault()
          setCommandPaletteOpen(true)
        }
        return
      }

      // Ctrl+Shift+E — nueva nota
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
        e.preventDefault()
        if (!isEditable) {
          if (!selectedNotebook) {
            setCurrentView('notebooks')
            return
          }
          createNote(selectedNotebook.id)
            .then((note) => {
              addNote(note)
              setSelectedNote(note)
              setCurrentView('notebooks')
            })
            .catch(() => {})
        }
        return
      }

      // Ctrl+Shift+, — settings
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '<') {
        e.preventDefault()
        if (!isEditable) setCurrentView('settings')
        return
      }

      // Ctrl+Shift+F — focus mode
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault()
        if (!isEditable) setFocusMode(!isFocusMode)
        return
      }

      // Ctrl+\ — colapsar/expandir sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
        e.preventDefault()
        toggleSidebarCollapsed()
        return
      }

      // Ctrl+Shift+T — modo máquina de escribir (funciona también dentro del editor)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault()
        toggleTypewriterMode()
        return
      }

      // ? — cheatsheet
      if (e.key === '?' && !isEditable) {
        e.preventDefault()
        setCheatsheetOpen(true)
        return
      }
    }

    window.addEventListener('keydown', handler, true)
    return () => window.removeEventListener('keydown', handler, true)
  }, [selectedNotebook, setCurrentView, setCheatsheetOpen, setFocusMode, isFocusMode, addNote, setSelectedNote, toggleSidebarCollapsed, toggleTypewriterMode, setCommandPaletteOpen])
}
````

## File: lib/templates/builtin-templates.ts
````typescript
import type { Template } from '@/types'

// ── Helpers para construir contenido TipTap JSON de forma concisa (DRY) ──────
type Node = { type: string; [k: string]: unknown }

const text = (t: string, marks?: Node[]): Node =>
  marks ? { type: 'text', text: t, marks } : { type: 'text', text: t }
const bold = (t: string): Node => text(t, [{ type: 'bold' }])

const p = (t = ''): Node => (t ? { type: 'paragraph', content: [text(t)] } : { type: 'paragraph' })
const rich = (...children: Node[]): Node => ({ type: 'paragraph', content: children })
const h = (level: 1 | 2 | 3, t: string): Node => ({ type: 'heading', attrs: { level }, content: [text(t)] })

const bullet = (items: string[]): Node => ({
  type: 'bulletList',
  content: items.map((i) => ({ type: 'listItem', content: [p(i)] })),
})
const bulletRich = (items: Node[]): Node => ({
  type: 'bulletList',
  content: items.map((node) => ({ type: 'listItem', content: [node] })),
})
const ordered = (items: string[]): Node => ({
  type: 'orderedList',
  content: items.map((i) => ({ type: 'listItem', content: [p(i)] })),
})
const tasks = (items: string[]): Node => ({
  type: 'taskList',
  content: items.map((i) => ({ type: 'taskItem', attrs: { checked: false }, content: [p(i)] })),
})

const callout = (type: 'info' | 'warning' | 'success' | 'error' | 'tip', textContent: string): Node => ({
  type: 'callout', attrs: { type }, content: [p(textContent)],
})

const table = (headers: string[], rows: string[][]): Node => ({
  type: 'table',
  content: [
    { type: 'tableRow', content: headers.map((hh) => ({ type: 'tableHeader', content: [p(hh)] })) },
    ...rows.map((r) => ({ type: 'tableRow', content: r.map((c) => ({ type: 'tableCell', content: [p(c)] })) })),
  ],
})

const doc = (...content: Node[]): Record<string, unknown> => ({ type: 'doc', content })

type Builtin = Omit<Template, 'created_at' | 'updated_at' | 'user_id'>

// Plantillas originales de NoteEvo — contenido propio, sin copyright
export const BUILTIN_TEMPLATES: Builtin[] = [
  // ── 4 plantillas originales ────────────────────────────────────────────────
  {
    id: 'builtin-meeting',
    name: 'Reunión de trabajo',
    description: 'Actas, asistentes y puntos de acción',
    category: 'meeting',
    is_builtin: true,
    content: doc(
      h(2, '📋 Reunión de trabajo'),
      rich(bold('Fecha: '), text('')),
      rich(bold('Asistentes: '), text('')),
      h(3, 'Agenda'),
      bullet(['']),
      h(3, 'Puntos discutidos'),
      bullet(['']),
      h(3, 'Tareas y responsables'),
      tasks(['']),
      h(3, 'Próxima reunión'),
      p(''),
    ),
  },
  {
    id: 'builtin-journal',
    name: 'Diario personal',
    description: 'Reflexiones, gratitud y metas del día',
    category: 'journal',
    is_builtin: true,
    content: doc(
      h(2, '📓 Diario personal'),
      rich(bold('Fecha: '), text('')),
      h(3, '¿Cómo me siento hoy?'),
      p(''),
      h(3, 'Lo más destacado del día'),
      p(''),
      h(3, 'Agradecimiento'),
      bullet(['', '', '']),
      h(3, 'Metas para mañana'),
      tasks(['']),
    ),
  },
  {
    id: 'builtin-project',
    name: 'Plan de proyecto',
    description: 'Objetivo, fases, recursos y seguimiento',
    category: 'work',
    is_builtin: true,
    content: doc(
      h(2, '🚀 Plan de proyecto'),
      rich(bold('Proyecto: '), text('')),
      rich(bold('Fecha de inicio: '), text(''), bold('   Entrega: '), text('')),
      h(3, 'Objetivo'),
      p(''),
      h(3, 'Fases'),
      ordered(['', '', '']),
      h(3, 'Tareas pendientes'),
      tasks(['']),
      h(3, 'Recursos y links'),
      bullet(['']),
    ),
  },
  {
    id: 'builtin-weekly',
    name: 'Revisión semanal',
    description: 'Balance, aprendizajes y prioridades de la semana',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '📅 Revisión semanal'),
      rich(bold('Semana del: '), text('')),
      h(3, '✅ Logros de la semana'),
      bullet(['']),
      h(3, '⚡ Desafíos encontrados'),
      bullet(['']),
      h(3, '💡 Aprendizajes'),
      p(''),
      h(3, '🎯 Prioridades próxima semana'),
      tasks(['']),
    ),
  },

  // ── 8 plantillas nuevas ──────────────────────────────────────────────────
  {
    id: 'builtin-travel',
    name: 'Plan de viaje',
    description: 'Vuelos, alojamiento, actividades y presupuesto',
    category: 'viaje',
    is_builtin: true,
    content: doc(
      h(2, '✈️ Plan de viaje'),
      rich(bold('Destino: '), text('')),
      rich(bold('Fechas: '), text('')),
      rich(bold('Presupuesto: '), text('')),
      h(3, 'Vuelos'),
      bullet(['Ida: ', 'Vuelta: ']),
      h(3, 'Alojamiento'),
      bullet(['Hotel / Check-in: ']),
      h(3, 'Actividades por día'),
      tasks(['Día 1: ', 'Día 2: ', 'Día 3: ']),
      h(3, 'Presupuesto'),
      table(['Concepto', 'Estimado', 'Real'], [['Transporte', '', ''], ['Alojamiento', '', ''], ['Actividades', '', '']]),
      h(3, 'Notas importantes'),
      callout('tip', 'Lleva copias digitales de tus documentos y revisa requisitos de entrada del destino.'),
    ),
  },
  {
    id: 'builtin-notes-class',
    name: 'Notas de clase',
    description: 'Resumen, conceptos clave y tareas de la sesión',
    category: 'educacion',
    is_builtin: true,
    content: doc(
      h(2, '📚 Notas de clase'),
      rich(bold('Fecha: '), text('')),
      rich(bold('Materia: '), text('')),
      rich(bold('Profesor: '), text('')),
      h(3, 'Resumen de la sesión'),
      p(''),
      h(3, 'Conceptos clave'),
      bullet(['', '']),
      h(3, 'Preguntas pendientes'),
      bullet(['']),
      h(3, 'Tareas para la próxima clase'),
      tasks(['']),
    ),
  },
  {
    id: 'builtin-brainstorm',
    name: 'Lluvia de ideas',
    description: 'Contexto, ideas generadas y próximos pasos',
    category: 'proyecto',
    is_builtin: true,
    content: doc(
      h(2, '💡 Lluvia de ideas'),
      rich(bold('Tema: '), text('')),
      rich(bold('Fecha: '), text('')),
      rich(bold('Participantes: '), text('')),
      h(3, 'Contexto del problema'),
      p(''),
      h(3, 'Ideas generadas'),
      bullet(['', '', '', '', '']),
      h(3, 'Ideas descartadas'),
      bullet(['']),
      h(3, 'Próximos pasos'),
      tasks(['']),
      callout('info', 'Regla: ninguna idea es mala en la fase de brainstorming'),
    ),
  },
  {
    id: 'builtin-weekly-agenda',
    name: 'Agenda semanal',
    description: 'Planificación por día, metas y reflexión',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '📅 Agenda semanal'),
      rich(bold('Semana del / al: '), text('')),
      table(
        ['Día', 'Tareas principales', 'Notas'],
        [['Lunes', '', ''], ['Martes', '', ''], ['Miércoles', '', ''], ['Jueves', '', ''], ['Viernes', '', '']],
      ),
      h(3, 'Metas de la semana'),
      tasks(['', '', '']),
      h(3, 'Reflexión del viernes'),
      p(''),
    ),
  },
  {
    id: 'builtin-reading-list',
    name: 'Lista de lectura',
    description: 'Por leer, leyendo, leídos y recomendaciones',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '📚 Lista de lectura'),
      h(3, 'Por leer'),
      bullet(['', '', '']),
      h(3, 'Leyendo ahora'),
      bulletRich([rich(bold('Título — Autor: '), text(''))]),
      h(3, 'Leídos este año'),
      bullet(['', '', '']),
      h(3, 'Recomendaciones recibidas'),
      bullet(['', '']),
    ),
  },
  {
    id: 'builtin-crm',
    name: 'CRM / Clientes',
    description: 'Contactos, estado y seguimiento de clientes',
    category: 'trabajo',
    is_builtin: true,
    content: doc(
      h(2, '👥 Gestión de clientes'),
      rich(bold('Empresa: '), text('')),
      rich(bold('Contacto: '), text('')),
      rich(bold('Email: '), text(''), bold('   Tel: '), text('')),
      table(
        ['Nombre', 'Empresa', 'Estado', 'Última acción'],
        [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      ),
      h(3, 'Notas de seguimiento'),
      p(''),
      h(3, 'Próximos pasos'),
      tasks(['']),
    ),
  },
  {
    id: 'builtin-shopping',
    name: 'Lista de compras',
    description: 'Compras organizadas por categoría',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '🛒 Lista de compras'),
      rich(bold('Fecha: '), text('')),
      rich(bold('Tienda: '), text('')),
      h(3, 'Frutas y verduras'),
      tasks(['']),
      h(3, 'Lácteos y proteínas'),
      tasks(['']),
      h(3, 'Limpieza y hogar'),
      tasks(['']),
      h(3, 'Otros'),
      tasks(['']),
    ),
  },
  {
    id: 'builtin-daily-journal',
    name: 'Diario del día',
    description: 'Mañana, tarde, noche y gratitud',
    category: 'diario',
    is_builtin: true,
    content: doc(
      h(2, '🌅 Diario del día'),
      rich(bold('Fecha: '), text('')),
      rich(bold('Clima: '), text(''), bold('   Estado de ánimo: '), text('')),
      h(3, 'Mañana'),
      rich(bold('¿Cómo empezó el día?')),
      p(''),
      h(3, 'Tarde'),
      p(''),
      h(3, 'Noche'),
      p(''),
      h(3, '3 cosas por las que estoy agradecido/a'),
      bullet(['', '', '']),
      callout('success', 'Hoy fue un buen día porque...'),
    ),
  },
]
````

## File: app/n/[slug]/page.tsx
````typescript
import Link from 'next/link'
import { getSharedNote } from '@/lib/supabase/shared-notes-server'
import { notifyNoteOwner } from '@/lib/supabase/notifications-server'
import NotePublicEditor from './NotePublicEditor'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export default async function PublicNotePage({ params }: PageProps) {
  const { slug } = await params
  const result = await getSharedNote(slug)

  if (!result) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-foreground font-medium">Link no disponible</p>
          <p className="text-muted text-sm mt-1">Esta nota no existe o el enlace fue desactivado.</p>
          <Link href="/" className="text-accent text-sm mt-4 inline-block hover:underline">
            Ir a NoteEvo
          </Link>
        </div>
      </div>
    )
  }

  try {
    await notifyNoteOwner(result.user_id, result.note_id, result.notes.title)
  } catch {
    // notification failure is non-critical
  }

  const note = result.notes
  const canEdit = result.access_level === 'edit'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-accent">NoteEvo</span>
        <Link href="/register" className="text-xs text-muted hover:text-foreground transition">
          Crear cuenta gratis
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          {note.title || 'Sin título'}
        </h1>
        <NotePublicEditor
          content={note.content ?? {}}
          editable={canEdit}
          slug={slug}
        />
      </main>

      <footer className="border-t border-border px-6 py-6 text-center">
        <p className="text-xs text-muted">
          Nota compartida con{' '}
          <Link href="/" className="text-accent hover:underline">NoteEvo</Link>
          {' '}— tu segundo cerebro
        </p>
      </footer>
    </div>
  )
}
````

## File: components/tasks/TaskList.tsx
````typescript
'use client'

import { useEffect, useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import {
  getTasks, createTask, toggleTaskComplete, deleteTask,
  getTasksWithNotebook,
} from '@/lib/supabase/tasks'
import type { TaskWithContext } from '@/lib/supabase/tasks'
import TaskModal from './TaskModal'
import EmptyState from '@/components/ui/EmptyState'
import {
  Plus, Flag, Calendar, Clock, Trash2,
  ChevronDown, BookOpen, SlidersHorizontal, X,
} from 'lucide-react'
import { format, parseISO, isToday, isPast, isWithinInterval, addDays, startOfDay } from 'date-fns'
import { es } from 'date-fns/locale'
import type { Task } from '@/types'

type MainTab = 'mytasks' | 'bynotebook'
type StatusFilter = 'all' | 'pending' | 'completed'
type PriorityFilter = 'all' | 'high' | 'medium' | 'low'
type DateFilter = 'all' | 'today' | 'week' | 'overdue'

const PRIORITY_DOT: Record<Task['priority'], string> = {
  low: 'bg-blue-400',
  medium: 'bg-yellow-400',
  high: 'bg-red-400',
}

const PRIORITY_LABEL: Record<Task['priority'], string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

function matchesDateFilter(task: Task, filter: DateFilter): boolean {
  if (filter === 'all') return true
  if (!task.due_date) return false
  const due = parseISO(task.due_date)
  const today = startOfDay(new Date())
  if (filter === 'today') return isToday(due)
  if (filter === 'week') return isWithinInterval(due, { start: today, end: addDays(today, 7) })
  if (filter === 'overdue') return isPast(due) && !isToday(due)
  return true
}

/** Etiqueta de hora "HH:mm" o "HH:mm – HH:mm" a partir de start/end (literal, sin TZ). */
function taskTimeLabel(task: Task): string | null {
  if (!task.start_time) return null
  const start = task.start_time.slice(11, 16)
  if (!task.end_time) return start
  return `${start} – ${task.end_time.slice(11, 16)}`
}

/** Estilo del pill de fecha según urgencia. */
function dueDatePill(task: Task): string {
  if (!task.due_date) return ''
  const due = parseISO(task.due_date)
  const today = startOfDay(new Date())
  if (isPast(due) && !isToday(due) && !task.is_completed) return 'bg-danger/15 text-danger'
  if (isToday(due) || isWithinInterval(due, { start: today, end: addDays(today, 2) }))
    return 'bg-yellow-500/15 text-yellow-500'
  return 'bg-surface text-muted'
}

export default function TaskList() {
  const { tasks, setTasks, addTask, updateTask, deleteTask: removeTask } = useTaskStore()
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [mainTab, setMainTab] = useState<MainTab>('mytasks')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all')
  const [dateFilter, setDateFilter] = useState<DateFilter>('all')
  const [tasksWithContext, setTasksWithContext] = useState<TaskWithContext[]>([])
  const [loadingContext, setLoadingContext] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTasks()
        setTasks(data)
      } catch {
        // error cargando tareas
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [setTasks])

  useEffect(() => {
    if (mainTab !== 'bynotebook') return
    const load = async () => {
      setLoadingContext(true)
      try {
        const data = await getTasksWithNotebook()
        setTasksWithContext(data)
      } catch {
        // error cargando
      } finally {
        setLoadingContext(false)
      }
    }
    load()
  }, [mainTab])

  const handleCreate = async (data: {
    title: string
    description: string
    due_date: string
    start_time: string | null
    end_time: string | null
    priority: Task['priority']
    is_flagged: boolean
    note_id: string | null
  }) => {
    const task = await createTask(data.title, {
      description: data.description || undefined,
      due_date: data.due_date || undefined,
      start_time: data.start_time ?? undefined,
      end_time: data.end_time ?? undefined,
      priority: data.priority,
      is_flagged: data.is_flagged,
      note_id: data.note_id ?? undefined,
    })
    addTask(task)
  }

  const handleToggle = async (task: Task) => {
    const newValue = !task.is_completed
    const newCompleted = newValue ? new Date().toISOString() : null
    updateTask(task.id, { is_completed: newValue, completed_at: newCompleted })
    setTasksWithContext((prev) =>
      prev.map((t) => t.id === task.id ? { ...t, is_completed: newValue, completed_at: newCompleted } : t)
    )
    try {
      await toggleTaskComplete(task.id, newValue)
    } catch {
      updateTask(task.id, { is_completed: task.is_completed, completed_at: task.completed_at })
      setTasksWithContext((prev) => prev.map((t) => t.id === task.id ? { ...t, ...task } : t))
    }
  }

  const handleDelete = async (id: string) => {
    removeTask(id)
    setTasksWithContext((prev) => prev.filter((t) => t.id !== id))
    try {
      await deleteTask(id)
    } catch {
      // error silencioso
    }
  }

  const applyFilters = (list: Task[]): Task[] =>
    list.filter((t) => {
      if (statusFilter === 'pending' && t.is_completed) return false
      if (statusFilter === 'completed' && !t.is_completed) return false
      if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false
      if (!matchesDateFilter(t, dateFilter)) return false
      return true
    })

  const filtered = applyFilters(tasks)
  const pending = tasks.filter((t) => !t.is_completed).length
  const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all' || dateFilter !== 'all'

  const clearAllFilters = () => { setStatusFilter('all'); setPriorityFilter('all'); setDateFilter('all') }

  const statusChipLabel: Record<StatusFilter, string> = { all: '', pending: 'Pendientes', completed: 'Completadas' }
  const priorityChipLabel: Record<PriorityFilter, string> = { all: '', high: 'Alta', medium: 'Media', low: 'Baja' }
  const dateChipLabel: Record<DateFilter, string> = { all: '', today: 'Hoy', week: 'Esta semana', overdue: 'Vencidas' }

  const byNotebook = (() => {
    const groups = new Map<string, { name: string; tasks: TaskWithContext[] }>()
    const noBook: TaskWithContext[] = []
    for (const task of tasksWithContext) {
      const nb = task.notes?.notebooks
      if (!nb) {
        noBook.push(task)
      } else {
        if (!groups.has(nb.id)) groups.set(nb.id, { name: nb.name, tasks: [] })
        groups.get(nb.id)!.tasks.push(task)
      }
    }
    const result: { id: string; name: string; tasks: TaskWithContext[] }[] = []
    groups.forEach((val, id) => result.push({ id, ...val }))
    if (noBook.length > 0) result.push({ id: '__none__', name: 'Sin libreta', tasks: noBook })
    return result
  })()

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="h-14 px-6 border-b border-border flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-semibold text-foreground text-sm">Tareas</h2>
          <p className="text-xs text-muted">
            {pending} pendiente{pending !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Filtros"
            onClick={() => setShowFilters(!showFilters)}
            className={`p-1.5 rounded-lg transition cursor-pointer ${
              showFilters || hasActiveFilters
                ? 'bg-accent/15 text-accent'
                : 'text-muted hover:bg-surface hover:text-foreground'
            }`}
          >
            <SlidersHorizontal size={15} />
          </button>
          <button
            type="button"
            data-testid="new-task-btn"
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-light transition cursor-pointer"
          >
            <Plus size={14} />
            Nueva tarea
          </button>
        </div>
      </div>

      {/* Main tabs */}
      <div className="flex items-center px-6 border-b border-border shrink-0">
        {(['mytasks', 'bynotebook'] as MainTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setMainTab(tab)}
            className={`px-4 py-2.5 text-xs font-medium transition cursor-pointer border-b-2 -mb-px ${
              mainTab === tab
                ? 'border-accent text-accent'
                : 'border-transparent text-muted hover:text-foreground'
            }`}
          >
            {tab === 'mytasks' ? 'Mis tareas' : 'Por libreta'}
          </button>
        ))}
      </div>

      {/* Filters panel */}
      {showFilters && mainTab === 'mytasks' && (
        <div className="px-6 py-3 border-b border-border bg-panel shrink-0">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {/* Status */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-subtle w-14">Estado</span>
              {(['all', 'pending', 'completed'] as StatusFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setStatusFilter(f)}
                  className={`px-2.5 py-1 text-xs rounded-md transition cursor-pointer ${
                    statusFilter === f
                      ? 'bg-accent/15 text-accent font-medium'
                      : 'text-muted hover:bg-surface hover:text-foreground'
                  }`}
                >
                  {f === 'all' ? 'Todas' : f === 'pending' ? 'Pendientes' : 'Completadas'}
                </button>
              ))}
            </div>

            {/* Priority */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-subtle w-14">Prioridad</span>
              {(['all', 'high', 'medium', 'low'] as PriorityFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setPriorityFilter(f)}
                  className={`px-2.5 py-1 text-xs rounded-md transition cursor-pointer ${
                    priorityFilter === f
                      ? 'bg-accent/15 text-accent font-medium'
                      : 'text-muted hover:bg-surface hover:text-foreground'
                  }`}
                >
                  {f === 'all' ? 'Todas' : f === 'high' ? 'Alta' : f === 'medium' ? 'Media' : 'Baja'}
                </button>
              ))}
            </div>

            {/* Date */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-subtle w-14">Fecha</span>
              {(['all', 'today', 'week', 'overdue'] as DateFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setDateFilter(f)}
                  className={`px-2.5 py-1 text-xs rounded-md transition cursor-pointer ${
                    dateFilter === f
                      ? 'bg-accent/15 text-accent font-medium'
                      : 'text-muted hover:bg-surface hover:text-foreground'
                  }`}
                >
                  {f === 'all' ? 'Todas' : f === 'today' ? 'Hoy' : f === 'week' ? 'Esta semana' : 'Vencidas'}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs text-muted hover:text-danger transition cursor-pointer self-center ml-auto"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>
      )}

      {/* Active filter chips */}
      {hasActiveFilters && mainTab === 'mytasks' && (
        <div className="px-6 py-2 border-b border-border flex items-center gap-2 flex-wrap shrink-0">
          {statusFilter !== 'all' && (
            <FilterChip label={statusChipLabel[statusFilter]} onClear={() => setStatusFilter('all')} />
          )}
          {priorityFilter !== 'all' && (
            <FilterChip label={`Prioridad: ${priorityChipLabel[priorityFilter]}`} onClear={() => setPriorityFilter('all')} />
          )}
          {dateFilter !== 'all' && (
            <FilterChip label={dateChipLabel[dateFilter]} onClear={() => setDateFilter('all')} />
          )}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs text-muted hover:text-danger transition cursor-pointer ml-1"
          >
            Limpiar todo
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {mainTab === 'mytasks' ? (
          loading ? (
            <p className="text-sm text-muted text-center mt-12">Cargando…</p>
          ) : filtered.length === 0 ? (
            hasActiveFilters ? (
              <EmptyState
                variant="search"
                title="Sin resultados"
                description="No hay tareas que coincidan con los filtros activos"
              />
            ) : (
              <EmptyState
                variant="tasks"
                title="Sin tareas pendientes"
                description="Crea una tarea o vincúlala a una nota"
                action={{ label: 'Nueva tarea', onClick: () => setShowModal(true) }}
              />
            )
          ) : (
            <div className="space-y-2">
              {filtered.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={() => handleToggle(task)}
                  onDelete={() => handleDelete(task.id)}
                />
              ))}
            </div>
          )
        ) : (
          loadingContext ? (
            <p className="text-sm text-muted text-center mt-12">Cargando…</p>
          ) : byNotebook.length === 0 ? (
            <div className="flex flex-col items-center gap-4 mt-16 text-center">
              <BookOpen size={36} className="text-subtle" />
              <div>
                <p className="text-foreground font-medium text-sm">Sin tareas vinculadas a notas</p>
                <p className="text-muted text-xs mt-1">
                  Las tareas creadas desde una nota aparecerán aquí agrupadas por libreta
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {byNotebook.map((group) => (
                <div key={group.id}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <BookOpen size={13} className="text-muted" />
                    <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                      {group.name}
                    </span>
                    <span className="text-xs text-subtle">({group.tasks.length})</span>
                  </div>
                  <div className="space-y-2">
                    {group.tasks.map((task) => (
                      <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={() => handleToggle(task)}
                        onDelete={() => handleDelete(task.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {showModal && (
        <TaskModal onClose={() => setShowModal(false)} onSave={handleCreate} />
      )}
    </div>
  )
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-1 bg-accent/10 text-accent text-xs rounded-full">
      {label}
      <button
        type="button"
        onClick={onClear}
        title="Quitar filtro"
        className="hover:bg-accent/20 rounded-full p-0.5 cursor-pointer transition"
      >
        <X size={11} />
      </button>
    </span>
  )
}

function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task
  onToggle: () => void
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`group bg-panel border rounded-xl px-4 py-3 transition hover:border-accent/30 ${
        task.is_completed ? 'border-border opacity-60' : 'border-border'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Priority dot */}
        <span
          title={`Prioridad ${PRIORITY_LABEL[task.priority]}`}
          className={`mt-2.5 w-2 h-2 rounded-full shrink-0 ${PRIORITY_DOT[task.priority]}`}
        />

        {/* Checkbox 24px */}
        <button
          type="button"
          title={task.is_completed ? 'Marcar pendiente' : 'Completar'}
          onClick={onToggle}
          className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all cursor-pointer active:scale-90 ${
            task.is_completed
              ? 'border-accent bg-accent'
              : 'border-border hover:border-accent'
          }`}
        >
          {task.is_completed && (
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
              <path d="M1.5 5L4.8 8.3L11.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`text-[15px] font-medium leading-snug ${
                task.is_completed ? 'line-through text-muted' : 'text-foreground'
              }`}
            >
              {task.title}
            </span>
            {task.is_flagged && <Flag size={13} className="text-orange-400 fill-orange-400 shrink-0" />}
          </div>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {task.due_date && (
              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${dueDatePill(task)}`}>
                <Calendar size={11} />
                {format(parseISO(task.due_date), 'd MMM', { locale: es })}
              </span>
            )}
            {taskTimeLabel(task) && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-surface text-muted">
                <Clock size={11} />
                {taskTimeLabel(task)}
              </span>
            )}
            {task.description && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-0.5 text-xs text-muted hover:text-foreground transition cursor-pointer"
              >
                <ChevronDown
                  size={11}
                  className={`transition-transform ${expanded ? 'rotate-180' : ''}`}
                />
                Detalle
              </button>
            )}
          </div>

          {expanded && task.description && (
            <p className="text-xs text-muted mt-2 leading-relaxed">{task.description}</p>
          )}
        </div>

        {/* Delete */}
        <button
          type="button"
          title="Eliminar tarea"
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 p-1 text-muted hover:text-danger transition cursor-pointer rounded shrink-0"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
````

## File: components/editor/FormatDropdowns.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import type { Editor } from '@tiptap/react'
import ToolbarTooltip from './ToolbarTooltip'

// ── Text Color ─────────────────────────────────────────────────────────────
// Único control por SELECCIÓN que queda en la toolbar. La fuente/tamaño/interlineado
// se configuran POR NOTA en NoteTypographyPopover (no por selección).
const COLORS: { value: string | null; label: string }[] = [
  { value: null, label: 'Auto' },
  { value: '#e8e8e8', label: '' },
  { value: '#a0a0a0', label: '' },
  { value: '#ef4444', label: '' },
  { value: '#f97316', label: '' },
  { value: '#eab308', label: '' },
  { value: '#22c55e', label: '' },
  { value: '#06b6d4', label: '' },
  { value: '#3b82f6', label: '' },
  { value: '#8b5cf6', label: '' },
  { value: '#ec4899', label: '' },
  { value: '#1a7a4a', label: '' },
]

export function TextColorPicker({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const currentColor = editor.getAttributes('textStyle').color as string | undefined

  return (
    <div className="relative" ref={ref}>
      <ToolbarTooltip label="Color de texto">
        <button
          type="button"
          aria-label="Color de texto"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-0.5 p-1.5 rounded hover:bg-surface transition cursor-pointer"
        >
          <span className="text-xs font-bold text-foreground leading-none relative">
            A
            <span
              className="absolute bottom-0 left-0 right-0 h-0.5 rounded"
              style={{ backgroundColor: currentColor ?? 'var(--color-foreground)' }}
            />
          </span>
          <ChevronDown size={10} className="text-muted" />
        </button>
      </ToolbarTooltip>

      {open && (
        <div className="absolute left-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-2xl p-3 w-44">
          <p className="text-[10px] text-subtle uppercase tracking-wider mb-2">Color de texto</p>
          <div className="grid grid-cols-6 gap-1.5">
            {COLORS.map(({ value, label }) => (
              <button
                key={value ?? 'auto'}
                type="button"
                title={label || value || 'Auto'}
                onClick={() => {
                  if (value) {
                    editor.chain().focus().setColor(value).run()
                  } else {
                    editor.chain().focus().unsetColor().run()
                  }
                  setOpen(false)
                }}
                className="w-6 h-6 rounded-md border border-border/50 flex items-center justify-center transition hover:scale-110 cursor-pointer"
                style={{ backgroundColor: value ?? 'transparent' }}
              >
                {!value && <span className="text-[9px] text-muted font-medium">A</span>}
                {value === currentColor && (
                  <Check size={10} className="text-white drop-shadow" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
````

## File: components/templates/TemplatesView.tsx
````typescript
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Loader2, Search, Sparkles, Trash2, LayoutTemplate } from 'lucide-react'
import { getTemplates, deleteTemplate } from '@/lib/supabase/templates'
import { createNote, updateNote } from '@/lib/supabase/notes'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import TemplatePreview from './TemplatePreview'
import NotebookPicker from './NotebookPicker'
import EmptyState from '@/components/ui/EmptyState'
import type { Template, Notebook } from '@/types'

const LAST_NOTEBOOK_KEY = 'noteevo-last-template-notebook'

interface CategoryInfo { key: string; label: string; color: string; bg: string }

const CATEGORIES: CategoryInfo[] = [
  { key: 'meeting',   label: 'Reuniones', color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
  { key: 'work',      label: 'Trabajo',   color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
  { key: 'journal',   label: 'Diario',    color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  { key: 'personal',  label: 'Personal',  color: 'text-accent',     bg: 'bg-accent/10 border-accent/20' },
  { key: 'viaje',     label: 'Viaje',     color: 'text-teal-400',   bg: 'bg-teal-500/10 border-teal-500/20' },
  { key: 'educacion', label: 'Educación', color: 'text-cyan-400',   bg: 'bg-cyan-500/10 border-cyan-500/20' },
  { key: 'proyecto',  label: 'Proyecto',  color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20' },
  { key: 'diario',    label: 'Diario',    color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
]

function getCategoryInfo(key: string | null): CategoryInfo {
  return CATEGORIES.find((c) => c.key === key)
    ?? { key: key ?? 'otros', label: key ?? 'Otros', color: 'text-muted', bg: 'bg-surface border-border' }
}

// ── Thumbnail: preview real del contenido escalado ───────────────────────────
function TemplateThumb({ content }: { content: Record<string, unknown> }) {
  return (
    <div className="h-24 overflow-hidden bg-surface border-b border-border">
      <div
        className="w-[286%] tiptap-preview px-3 py-2"
        style={{ transform: 'scale(0.35)', transformOrigin: 'top left', pointerEvents: 'none' }}
      >
        <TemplatePreview content={content} />
      </div>
    </div>
  )
}

// ── Card del grid ────────────────────────────────────────────────────────────
function TemplateCard({
  template, active, onClick,
}: {
  template: Template; active: boolean; onClick: () => void
}) {
  const cat = getCategoryInfo(template.category)
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group text-left bg-panel border rounded-xl overflow-hidden transition cursor-pointer flex flex-col ${
        active ? 'border-accent ring-1 ring-accent/30' : 'border-border hover:border-accent/40'
      }`}
    >
      <div className="relative">
        <TemplateThumb content={template.content} />
        <span className={`absolute top-1.5 right-1.5 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border backdrop-blur-sm ${
          template.is_builtin ? 'bg-accent/15 border-accent/30 text-accent' : 'bg-surface/80 border-border text-muted'
        }`}>
          {template.is_builtin ? <Sparkles size={9} /> : null}
          {template.is_builtin ? 'Oficial' : 'Mía'}
        </span>
      </div>
      <div className="p-3 flex-1 flex flex-col gap-1">
        <p className="text-sm font-semibold text-foreground group-hover:text-accent transition truncate">
          {template.name}
        </p>
        {template.description && (
          <p className="text-xs text-muted truncate">{template.description}</p>
        )}
        <span className={`mt-1 inline-flex items-center w-fit text-[10px] px-2 py-0.5 rounded-full border ${cat.bg} ${cat.color}`}>
          {cat.label}
        </span>
      </div>
    </button>
  )
}

// ── Panel derecho: detalle de la plantilla seleccionada ──────────────────────
function TemplateDetail({
  template, onDeleted,
}: {
  template: Template; onDeleted: (id: string) => void
}) {
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  const [chosen, setChosen] = useState<Notebook | null>(null)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const cat = getCategoryInfo(template.category)

  const defaultNotebook = useMemo(() => {
    if (notebooks.length === 0) return null
    const lastId = typeof window !== 'undefined' ? localStorage.getItem(LAST_NOTEBOOK_KEY) : null
    return (lastId ? notebooks.find((n) => n.id === lastId) : null) ?? notebooks[0]
  }, [notebooks])
  const notebook = chosen ?? defaultNotebook

  const handleUse = async () => {
    if (!notebook) { setError('Elige una libreta para continuar'); return }
    setImporting(true)
    setError(null)
    try {
      const note = await createNote(notebook.id)
      await updateNote(note.id, { title: template.name, content: template.content })
      const populated = { ...note, title: template.name, content: template.content }
      addNote(populated)
      setSelectedNote(populated)
      setSelectedNotebook(notebook)
      if (typeof window !== 'undefined') localStorage.setItem(LAST_NOTEBOOK_KEY, notebook.id)
      setSuccess(true)
      setTimeout(() => setCurrentView('notebooks'), 600)
    } catch {
      setError('Error al usar la plantilla. Intenta de nuevo.')
      setImporting(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setError(null)
    try {
      await deleteTemplate(template.id)
      onDeleted(template.id)
    } catch {
      setError('Error al eliminar la plantilla.')
      setDeleting(false)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-5 pt-5 pb-4 border-b border-border shrink-0">
        <h2 className="text-lg font-bold text-foreground">{template.name}</h2>
        {template.description && (
          <p className="text-xs text-muted mt-1 leading-relaxed">{template.description}</p>
        )}
        <span className={`mt-2 inline-flex items-center text-[10px] px-2 py-0.5 rounded-full border ${cat.bg} ${cat.color}`}>
          {cat.label}
        </span>
      </div>

      {/* Vista previa con scroll */}
      <div className="flex-1 overflow-y-auto px-5 py-4 bg-surface/30">
        <div className="bg-panel border border-border rounded-xl p-4 tiptap-preview text-sm">
          <TemplatePreview content={template.content} />
        </div>
      </div>

      {/* Acciones (sin overflow-hidden: NotebookPicker abre dropdown) */}
      <div className="px-5 py-4 border-t border-border shrink-0 space-y-3">
        <NotebookPicker notebooks={notebooks} selected={notebook} onSelect={setChosen} dropUp />
        {error && <p className="text-xs text-danger">{error}</p>}
        {success && <p className="text-xs text-accent font-medium">✓ Abriendo en el editor…</p>}
        <button
          type="button"
          onClick={handleUse}
          disabled={importing || success || !notebook}
          className="w-full py-2.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer flex items-center justify-center gap-2"
        >
          {importing && <Loader2 size={14} className="animate-spin" />}
          {importing ? 'Creando…' : 'Usar esta plantilla'}
        </button>

        {!template.is_builtin && (
          confirmDelete ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2 bg-danger text-white text-xs font-semibold rounded-lg hover:opacity-90 disabled:opacity-40 transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                {deleting && <Loader2 size={13} className="animate-spin" />}
                {deleting ? 'Eliminando…' : 'Confirmar'}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                disabled={deleting}
                className="flex-1 py-2 bg-surface border border-border text-muted text-xs rounded-lg hover:text-foreground transition cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="w-full py-2 text-xs text-muted hover:text-danger border border-border hover:border-danger/30 rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Trash2 size={13} />
              Eliminar plantilla
            </button>
          )
        )}
      </div>
    </div>
  )
}

// ── Vista principal (3 paneles) ──────────────────────────────────────────────
export default function TemplatesView() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [selected, setSelected] = useState<Template | null>(null)

  useEffect(() => {
    getTemplates()
      .then(setTemplates)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Debounce 200ms del buscador
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 200)
    return () => clearTimeout(t)
  }, [query])

  // Categorías presentes deduplicadas por etiqueta (work/trabajo y journal/diario
  // comparten label, así evitamos pills repetidas).
  const presentCategories = useMemo(() => {
    const seen = new Set<string>()
    const out: CategoryInfo[] = []
    for (const t of templates) {
      if (!t.category) continue
      const info = getCategoryInfo(t.category)
      if (seen.has(info.label)) continue
      seen.add(info.label)
      out.push(info)
    }
    return out
  }, [templates])

  const filtered = templates.filter((t) => {
    if (filter === 'mine' && t.is_builtin) return false
    if (filter !== 'all' && filter !== 'mine' && getCategoryInfo(t.category).label !== filter) return false
    if (debouncedQuery && !t.name.toLowerCase().includes(debouncedQuery) && !(t.description ?? '').toLowerCase().includes(debouncedQuery)) return false
    return true
  })

  const mineCount = templates.filter((t) => !t.is_builtin).length

  return (
    <div className="flex-1 flex h-screen overflow-hidden bg-background">
      {/* Panel izquierdo: buscador + filtros */}
      <aside className="w-60 shrink-0 border-r border-border flex flex-col">
        <div className="px-4 pt-5 pb-3 shrink-0">
          <h1 className="text-base font-semibold text-foreground mb-3">Plantillas</h1>
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar…"
              className="w-full pl-8 pr-3 py-1.5 bg-surface border border-border rounded-lg text-sm text-foreground outline-none focus:border-accent/50 transition placeholder-subtle"
              style={{ color: 'var(--color-foreground)' }}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
          {[
            { key: 'all', label: `Todas (${templates.length})` },
            ...presentCategories.map((c) => ({ key: c.label, label: c.label })),
            ...(mineCount > 0 ? [{ key: 'mine', label: `Mías (${mineCount})` }] : []),
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`w-full text-left px-3 py-1.5 text-xs rounded-lg border transition cursor-pointer font-medium ${
                filter === f.key
                  ? 'bg-accent/15 text-accent border-accent/30'
                  : 'bg-transparent border-transparent text-muted hover:bg-surface hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Panel central: grid de cards */}
      <main className="flex-1 overflow-y-auto p-5">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={20} className="text-muted animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          debouncedQuery ? (
            <EmptyState
              variant="search"
              title="Sin resultados"
              description="Prueba con otro término de búsqueda"
            />
          ) : filter === 'mine' ? (
            <EmptyState
              variant="templates"
              title="Aún no tienes plantillas propias"
              description="Guarda cualquier nota como plantilla desde el editor"
            />
          ) : (
            <EmptyState
              variant="templates"
              title="Sin plantillas que coincidan"
            />
          )
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                active={selected?.id === t.id}
                onClick={() => setSelected(t)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Panel derecho: detalle */}
      <aside className="w-72 shrink-0 border-l border-border">
        {selected ? (
          <TemplateDetail
            key={selected.id}
            template={selected}
            onDeleted={(id) => {
              setTemplates((prev) => prev.filter((t) => t.id !== id))
              setSelected(null)
            }}
          />
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-3 px-6 text-center">
            <LayoutTemplate size={28} className="text-subtle" />
            <p className="text-sm text-muted">Selecciona una plantilla para empezar</p>
          </div>
        )}
      </aside>
    </div>
  )
}
````

## File: app/(dashboard)/layout.tsx
````typescript
'use client'

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { useState } from 'react'
import Sidebar from '@/components/sidebar/Sidebar'
import KeyboardShortcutsCheatsheet from '@/components/KeyboardShortcutsCheatsheet'
import OnboardingModal from '@/components/onboarding/OnboardingModal'
import CommandPalette from '@/components/command/CommandPalette'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useUIStore } from '@/store/uiStore'
import { useNoteStore } from '@/store/noteStore'
import { updateNote } from '@/lib/supabase/notes'

function DashboardInner({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts()
  const { isFocusMode } = useUIStore()
  const { notes, deleteNote } = useNoteStore()
  const [activeDragTitle, setActiveDragTitle] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current
    if (data?.type === 'note') {
      const note = notes.find((n) => n.id === data.noteId)
      setActiveDragTitle(note?.title ?? 'Nota')
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveDragTitle(null)
    const { active, over } = event
    if (!over) return

    const activeData = active.data.current
    const overData = over.data.current

    if (activeData?.type !== 'note' || overData?.type !== 'notebook') return
    if (activeData.currentNotebookId === overData.notebookId) return

    try {
      await updateNote(activeData.noteId, { notebook_id: overData.notebookId })
      deleteNote(activeData.noteId)
    } catch {
      // error silencioso
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen bg-background">
        {!isFocusMode && <Sidebar />}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
        <KeyboardShortcutsCheatsheet />
        <OnboardingModal />
        <CommandPalette />
      </div>

      <DragOverlay>
        {activeDragTitle ? (
          <div className="px-3 py-2 bg-panel border border-accent/40 rounded-lg shadow-xl text-sm text-foreground font-medium max-w-[240px] truncate opacity-90">
            {activeDragTitle}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardInner>{children}</DashboardInner>
}
````

## File: components/calendar/CalendarView.tsx
````typescript
'use client'

import { useEffect, useRef, useState } from 'react'
import { useTaskStore } from '@/store/taskStore'
import { getTasks, createTask } from '@/lib/supabase/tasks'
import TaskModal from '@/components/tasks/TaskModal'
import EmptyState from '@/components/ui/EmptyState'
import { ChevronLeft, ChevronRight, Plus, Calendar, Clock } from 'lucide-react'
import {
  format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays,
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  isSameMonth, isToday,
} from 'date-fns'
import { es } from 'date-fns/locale'
import type { Task } from '@/types'

type CalView = 'month' | 'week' | 'day'

const PRIORITY_PILL: Record<Task['priority'], string> = {
  high: 'bg-red-500/15 text-red-400',
  medium: 'bg-yellow-500/15 text-yellow-400',
  low: 'bg-blue-500/15 text-blue-400',
}

const PRIORITY_DOT: Record<Task['priority'], string> = {
  high: 'bg-red-400',
  medium: 'bg-yellow-400',
  low: 'bg-blue-400',
}

const DAY_LABELS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const MS_PER_DAY = 24 * 60 * 60 * 1000
const HOUR_HEIGHT = 48 // px por hora en la rejilla de semana
const HOURS = Array.from({ length: 24 }, (_, i) => i)

// ── Helpers de fecha/hora ────────────────────────────────────────────────────
// Las horas se guardan como "reloj literal" en la columna timestamptz (sin
// conversión de zona), por lo que basta con leer la porción HH:mm del ISO.

/** Porción de fecha (YYYY-MM-DD) por la que la tarea pertenece a un día. */
function dateKey(task: Task): string | null {
  const src = task.start_time ?? task.due_date
  return src ? src.slice(0, 10) : null
}

/** Minutos desde medianoche a partir de un ISO con hora literal. */
function minutesOf(iso: string): number {
  return Number(iso.slice(11, 13)) * 60 + Number(iso.slice(14, 16))
}

/** Etiqueta "HH:mm" o "HH:mm–HH:mm" para un evento con hora. */
function timeLabel(task: Task): string | null {
  if (!task.start_time) return null
  const start = task.start_time.slice(11, 16)
  return task.end_time ? `${start}–${task.end_time.slice(11, 16)}` : start
}

// Urgencia de una tarea según su fecha respecto a hoy.
type DueUrgency = 'overdue' | 'soon' | 'none'

function dueUrgency(task: Task, today: Date): DueUrgency {
  const src = task.start_time ?? task.due_date
  if (!src || task.is_completed) return 'none'
  const [year, month, dayNum] = src.split('T')[0].split('-').map(Number)
  const due = new Date(year, month - 1, dayNum)
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const diffDays = Math.round((due.getTime() - startToday.getTime()) / MS_PER_DAY)
  if (diffDays <= 0) return 'overdue'
  if (diffDays <= 7) return 'soon'
  return 'none'
}

const URGENCY_PILL: Record<Exclude<DueUrgency, 'none'>, string> = {
  overdue: 'bg-red-500/20 text-red-300 ring-1 ring-red-500/60',
  soon: 'bg-yellow-500/15 text-yellow-300 ring-1 ring-yellow-500/50',
}

const URGENCY_DOT: Record<Exclude<DueUrgency, 'none'>, string> = {
  overdue: 'bg-red-400',
  soon: 'bg-yellow-400',
}

// Fondo sutil de celda de día según la urgencia máxima de sus tareas.
const URGENCY_CELL_BG: Record<Exclude<DueUrgency, 'none'>, string> = {
  overdue: 'bg-red-500/[0.04]',
  soon: 'bg-yellow-500/[0.04]',
}

// La urgencia por vencimiento tiene prioridad visual sobre el color por prioridad.
function pillClass(task: Task, today: Date): string {
  const urgency = dueUrgency(task, today)
  return urgency !== 'none' ? URGENCY_PILL[urgency] : PRIORITY_PILL[task.priority]
}

function dayUrgency(tasks: Task[], today: Date): DueUrgency {
  let result: DueUrgency = 'none'
  for (const t of tasks) {
    const u = dueUrgency(t, today)
    if (u === 'overdue') return 'overdue'
    if (u === 'soon') result = 'soon'
  }
  return result
}

function buildMonthGrid(date: Date): Date[][] {
  const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 })
  const weeks: Date[][] = []
  let cur = start
  while (cur <= end) {
    const week: Date[] = []
    for (let i = 0; i < 7; i++) { week.push(cur); cur = addDays(cur, 1) }
    weeks.push(week)
  }
  return weeks
}

function buildWeekDays(date: Date): Date[] {
  const start = startOfWeek(date, { weekStartsOn: 1 })
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

function tasksForDay(tasks: Task[], day: Date): Task[] {
  const key = format(day, 'yyyy-MM-dd')
  return tasks.filter((t) => dateKey(t) === key)
}

// ── Vista principal ──────────────────────────────────────────────────────────

type QuickState = { x: number; y: number; date: string; time?: string }
type ModalInit = { date: string; startTime?: string; endTime?: string }

export default function CalendarView() {
  const { tasks, setTasks, addTask } = useTaskStore()
  const [view, setView] = useState<CalView>('month')
  const [current, setCurrent] = useState(new Date())
  const [quick, setQuick] = useState<QuickState | null>(null)
  const [modalInit, setModalInit] = useState<ModalInit | null>(null)

  useEffect(() => {
    const load = async () => {
      try { const data = await getTasks(); setTasks(data) } catch { /* sin tareas */ }
    }
    load()
  }, [setTasks])

  const openQuick = (e: React.MouseEvent, day: Date, time?: string) => {
    setQuick({ x: e.clientX, y: e.clientY, date: format(day, 'yyyy-MM-dd'), time })
  }
  const openFull = (day: Date, startTime?: string) => {
    setModalInit({ date: format(day, 'yyyy-MM-dd'), startTime })
  }

  // Creación rápida desde el popover (la hora puede venir editada).
  const handleQuickCreate = async (title: string, time?: string) => {
    if (!quick) return
    const t = time ?? quick.time
    const startIso = t ? `${quick.date}T${t}:00` : null
    const task = await createTask(title, {
      due_date: quick.date,
      start_time: startIso ?? undefined,
      priority: 'medium',
    })
    addTask(task)
    setQuick(null)
  }

  // Creación completa desde el modal (start_time/end_time ya vienen como ISO).
  const handleCreate = async (data: {
    title: string; description: string; due_date: string
    start_time: string | null; end_time: string | null
    priority: Task['priority']; is_flagged: boolean; note_id: string | null
  }) => {
    const task = await createTask(data.title, {
      description: data.description || undefined,
      due_date: data.due_date || undefined,
      start_time: data.start_time ?? undefined,
      end_time: data.end_time ?? undefined,
      priority: data.priority,
      is_flagged: data.is_flagged,
      note_id: data.note_id ?? undefined,
    })
    addTask(task)
  }

  const prev = () => {
    if (view === 'month') setCurrent(subMonths(current, 1))
    else if (view === 'week') setCurrent(subWeeks(current, 1))
    else setCurrent(subDays(current, 1))
  }
  const next = () => {
    if (view === 'month') setCurrent(addMonths(current, 1))
    else if (view === 'week') setCurrent(addWeeks(current, 1))
    else setCurrent(addDays(current, 1))
  }

  const title = (() => {
    if (view === 'month') return format(current, 'MMMM yyyy', { locale: es })
    if (view === 'week') {
      const s = startOfWeek(current, { weekStartsOn: 1 })
      const e = endOfWeek(current, { weekStartsOn: 1 })
      return isSameMonth(s, e)
        ? `${format(s, 'd')} – ${format(e, 'd MMM yyyy', { locale: es })}`
        : `${format(s, 'd MMM', { locale: es })} – ${format(e, 'd MMM yyyy', { locale: es })}`
    }
    return format(current, "EEEE d 'de' MMMM yyyy", { locale: es })
  })()

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="h-14 px-6 border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button type="button" title="Anterior" onClick={prev}
            className="p-1.5 text-muted hover:text-foreground hover:bg-surface rounded-lg transition cursor-pointer">
            <ChevronLeft size={16} />
          </button>
          <h2 className="font-semibold text-foreground text-sm capitalize min-w-[220px] text-center">
            {title}
          </h2>
          <button type="button" title="Siguiente" onClick={next}
            className="p-1.5 text-muted hover:text-foreground hover:bg-surface rounded-lg transition cursor-pointer">
            <ChevronRight size={16} />
          </button>
          <button type="button" onClick={() => setCurrent(new Date())}
            className="px-2.5 py-1 text-xs font-medium text-foreground bg-surface hover:bg-elevated border border-border rounded-lg transition cursor-pointer ml-1">
            Hoy
          </button>
        </div>

        {/* View switcher */}
        <div className="flex items-center gap-0.5 bg-surface rounded-lg p-0.5">
          {(['month', 'week', 'day'] as CalView[]).map((v) => (
            <button key={v} type="button" onClick={() => setView(v)}
              className={`px-3 py-1.5 text-xs rounded-md transition cursor-pointer font-medium ${
                view === v ? 'bg-panel text-foreground shadow-sm' : 'text-muted hover:text-foreground'
              }`}>
              {v === 'month' ? 'Mes' : v === 'week' ? 'Semana' : 'Día'}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar body */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {view === 'month' && <MonthView current={current} tasks={tasks} onQuick={openQuick} onAddFull={openFull} />}
        {view === 'week' && <WeekView current={current} tasks={tasks} onQuick={openQuick} onAddFull={openFull} />}
        {view === 'day' && <DayView current={current} tasks={tasks} onAdd={() => openFull(current)} />}
      </div>

      {quick && (
        <QuickCreatePopover
          state={quick}
          onCreate={handleQuickCreate}
          onMore={(time) => { setModalInit({ date: quick.date, startTime: time ?? quick.time }); setQuick(null) }}
          onClose={() => setQuick(null)}
        />
      )}

      {modalInit && (
        <TaskModal
          onClose={() => setModalInit(null)}
          onSave={handleCreate}
          initialDate={modalInit.date}
          initialStartTime={modalInit.startTime}
          initialEndTime={modalInit.endTime}
        />
      )}
    </div>
  )
}

/* ── Popover de creación rápida ── */
function QuickCreatePopover({
  state, onCreate, onMore, onClose,
}: {
  state: QuickState
  onCreate: (title: string, time?: string) => void | Promise<void>
  onMore: (time?: string) => void
  onClose: () => void
}) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState(state.time ?? '')
  const [saving, setSaving] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasTimeSlot = state.time !== undefined

  useEffect(() => { inputRef.current?.focus() }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', esc)
    }
  }, [onClose])

  const submit = async () => {
    if (!title.trim() || saving) return
    setSaving(true)
    try { await onCreate(title.trim(), hasTimeSlot ? (time || undefined) : undefined) } finally { setSaving(false) }
  }

  // Posición anclada al clic, acotada a la ventana.
  const W = 268
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1000
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const left = Math.max(12, Math.min(state.x, vw - W - 12))
  const top = Math.max(12, Math.min(state.y, vh - 190))

  const dateLabel = (() => {
    const [y, m, d] = state.date.split('-').map(Number)
    return format(new Date(y, m - 1, d), "EEE d 'de' MMM", { locale: es })
  })()

  return (
    <div
      ref={ref}
      className="fixed z-50 w-[268px] bg-panel border border-border rounded-xl shadow-2xl p-3"
      style={{ left, top }}
    >
      <div className="flex items-center gap-1.5 text-xs text-muted mb-2 capitalize">
        <Calendar size={12} className="text-accent" />
        {dateLabel}
      </div>
      {hasTimeSlot && (
        <div className="flex items-center gap-1.5 mb-2">
          <Clock size={13} className="text-accent shrink-0" />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            aria-label="Hora"
            title="Hora (puedes ajustar al minuto, ej. 23:59)"
            className="bg-surface border border-border rounded-lg px-2 py-1 text-xs text-foreground outline-none focus:border-accent/50 transition tabular-nums"
            style={{ color: 'var(--color-foreground)' }}
          />
        </div>
      )}
      <input
        ref={inputRef}
        type="text"
        value={title}
        placeholder="Título de la tarea"
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') submit() }}
        className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none placeholder-subtle focus:border-accent/50 transition"
        style={{ color: 'var(--color-foreground)' }}
      />
      <div className="flex items-center justify-between gap-2 mt-2.5">
        <button
          type="button"
          onClick={() => onMore(hasTimeSlot ? (time || undefined) : undefined)}
          className="text-xs text-muted hover:text-foreground transition cursor-pointer"
        >
          Más detalles →
        </button>
        <button
          type="button"
          onClick={submit}
          disabled={!title.trim() || saving}
          className="px-3.5 py-1.5 text-xs font-semibold bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-40 transition cursor-pointer"
        >
          {saving ? 'Creando…' : 'Crear'}
        </button>
      </div>
    </div>
  )
}

/* ── Month view ── */
function MonthView({ current, tasks, onQuick, onAddFull }: {
  current: Date; tasks: Task[]
  onQuick: (e: React.MouseEvent, day: Date) => void
  onAddFull: (day: Date) => void
}) {
  const weeks = buildMonthGrid(current)
  const today = new Date()
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day labels */}
      <div className="grid grid-cols-7 border-b border-border shrink-0 bg-surface/40">
        {DAY_LABELS.map((d) => (
          <div key={d} className="py-2 text-center text-[11px] font-semibold text-muted uppercase tracking-wider">
            {d}
          </div>
        ))}
      </div>
      {/* Weeks */}
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 divide-x divide-border" style={{ minHeight: 120 }}>
            {week.map((day, di) => {
              const dayTasks = tasksForDay(tasks, day)
              const inMonth = isSameMonth(day, current)
              const isCurrentDay = isToday(day)
              const urgency = dayUrgency(dayTasks, today)
              const cellBg = urgency !== 'none' ? URGENCY_CELL_BG[urgency] : ''
              return (
                <div key={di} onClick={(e) => onQuick(e, day)}
                  className={`p-2 cursor-pointer hover:bg-surface transition group ${!inMonth ? 'opacity-40' : ''} ${cellBg} ${
                    urgency === 'overdue' ? 'border-l-2 border-l-red-500'
                      : urgency === 'soon' ? 'border-l-2 border-l-yellow-500'
                      : ''
                  }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1">
                      <span className={`text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full ${
                        isCurrentDay ? 'bg-accent text-white' : 'text-foreground'
                      }`}>
                        {format(day, 'd')}
                      </span>
                      {urgency !== 'none' && (
                        <span title={urgency === 'overdue' ? 'Tareas vencidas o que vencen hoy' : 'Tareas que vencen pronto'}
                          className={`w-1.5 h-1.5 rounded-full ${URGENCY_DOT[urgency]}`} />
                      )}
                    </span>
                    <button type="button" title="Crear tarea con detalles"
                      onClick={(e) => { e.stopPropagation(); onAddFull(day) }}
                      className="opacity-0 group-hover:opacity-100 text-muted hover:text-accent transition cursor-pointer rounded">
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="space-y-0.5">
                    {dayTasks.slice(0, 3).map((t) => (
                      <div key={t.id} title={t.title}
                        className={`text-[10px] px-1.5 py-0.5 rounded truncate ${pillClass(t, today)} ${t.is_completed ? 'opacity-40 line-through' : ''}`}>
                        {t.start_time && <span className="font-semibold mr-1 tabular-nums">{t.start_time.slice(11, 16)}</span>}
                        {t.title}
                      </div>
                    ))}
                    {dayTasks.length > 3 && (
                      <p className="text-[10px] text-subtle px-1">+{dayTasks.length - 3} más</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Week view — rejilla horaria con línea de "ahora" ── */
function WeekView({ current, tasks, onQuick, onAddFull }: {
  current: Date; tasks: Task[]
  onQuick: (e: React.MouseEvent, day: Date, time?: string) => void
  onAddFull: (day: Date) => void
}) {
  const days = buildWeekDays(current)
  const today = new Date()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [now, setNow] = useState(new Date())

  // Refresca la línea de "ahora" cada minuto.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  // Desplaza al inicio de la mañana (o a la hora actual si la semana es la de hoy).
  useEffect(() => {
    if (!scrollRef.current) return
    const todayInWeek = days.some((d) => isToday(d))
    const hour = todayInWeek ? Math.max(0, new Date().getHours() - 1) : 7
    scrollRef.current.scrollTop = hour * HOUR_HEIGHT
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const weekHasToday = days.some((d) => isToday(d))
  const nowMin = now.getHours() * 60 + now.getMinutes()
  const nowTop = (nowMin / 60) * HOUR_HEIGHT
  const todayIdx = days.findIndex((d) => isToday(d))

  const handleColClick = (e: React.MouseEvent, day: Date) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const y = e.clientY - rect.top
    // Minutos desde medianoche, ajustados a tramos de 15 min y acotados a 23:45
    // (en el popover el usuario puede afinar al minuto, p.ej. 23:59).
    let mins = Math.round((y / HOUR_HEIGHT) * 60 / 15) * 15
    mins = Math.max(0, Math.min(mins, 23 * 60 + 45))
    const hh = String(Math.floor(mins / 60)).padStart(2, '0')
    const mm = String(mins % 60).padStart(2, '0')
    onQuick(e, day, `${hh}:${mm}`)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day headers */}
      <div className="flex border-b border-border shrink-0 bg-surface/40">
        <div className="w-14 shrink-0 border-r border-border" />
        <div className="flex-1 grid grid-cols-7 divide-x divide-border">
          {days.map((day, i) => {
            const isCurrentDay = isToday(day)
            const urgency = dayUrgency(tasksForDay(tasks, day), today)
            return (
              <div key={i} className="py-2 text-center">
                <p className="text-[11px] text-muted uppercase tracking-wider">{DAY_LABELS[i]}</p>
                <span className="mt-0.5 inline-flex items-center gap-1">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-semibold ${
                    isCurrentDay ? 'bg-accent text-white' : 'text-foreground'
                  }`}>
                    {format(day, 'd')}
                  </span>
                  {urgency !== 'none' && (
                    <span title={urgency === 'overdue' ? 'Tareas vencidas o que vencen hoy' : 'Tareas que vencen pronto'}
                      className={`w-1.5 h-1.5 rounded-full ${URGENCY_DOT[urgency]}`} />
                  )}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* All-day row */}
      <div className="flex border-b border-border shrink-0 bg-background">
        <div className="w-14 shrink-0 border-r border-border flex items-start justify-end pr-2 pt-1.5">
          <span className="text-[9px] text-subtle uppercase tracking-wider">Todo el día</span>
        </div>
        <div className="flex-1 grid grid-cols-7 divide-x divide-border">
          {days.map((day, i) => {
            const allDay = tasksForDay(tasks, day).filter((t) => !t.start_time)
            return (
              <div key={i} onClick={(e) => onQuick(e, day)}
                className="min-h-[34px] p-1 space-y-0.5 cursor-pointer hover:bg-surface/50 transition">
                {allDay.map((t) => (
                  <div key={t.id} title={t.title}
                    className={`text-[10px] px-1.5 py-0.5 rounded truncate ${pillClass(t, today)} ${t.is_completed ? 'opacity-40 line-through' : ''}`}>
                    {t.title}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Hourly grid */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="flex" style={{ height: 24 * HOUR_HEIGHT }}>
          {/* Hour gutter */}
          <div className="w-14 shrink-0 border-r border-border relative">
            {HOURS.map((h) => (
              <div key={h} className="absolute right-2 -translate-y-1/2 text-[10px] text-subtle tabular-nums"
                style={{ top: h * HOUR_HEIGHT }}>
                {h > 0 ? `${String(h).padStart(2, '0')}:00` : ''}
              </div>
            ))}
          </div>

          {/* Columns + overlays */}
          <div className="flex-1 grid grid-cols-7 relative">
            {/* Hour gridlines */}
            {HOURS.map((h) => (
              <div key={h} className="absolute left-0 right-0 border-t border-border/50 pointer-events-none"
                style={{ top: h * HOUR_HEIGHT }} />
            ))}

            {/* Day columns */}
            {days.map((day, i) => {
              const timed = tasksForDay(tasks, day)
                .filter((t) => t.start_time)
                .sort((a, b) => minutesOf(a.start_time!) - minutesOf(b.start_time!))
              return (
                <div key={i} onClick={(e) => handleColClick(e, day)}
                  className={`relative border-r border-border/40 cursor-pointer hover:bg-surface/30 transition ${
                    isToday(day) ? 'bg-accent/[0.03]' : ''
                  }`}>
                  {timed.map((t) => {
                    const startMin = minutesOf(t.start_time!)
                    const endMin = t.end_time ? minutesOf(t.end_time) : startMin + 60
                    const top = (startMin / 60) * HOUR_HEIGHT
                    const height = Math.max(((endMin - startMin) / 60) * HOUR_HEIGHT - 2, 20)
                    return (
                      <div
                        key={t.id}
                        title={`${t.title}${timeLabel(t) ? ` · ${timeLabel(t)}` : ''}`}
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute left-0.5 right-0.5 rounded-md px-1.5 py-0.5 text-left overflow-hidden ${pillClass(t, today)} ${
                          t.is_completed ? 'opacity-40 line-through' : ''
                        }`}
                        style={{ top, height }}
                      >
                        <span className="block text-[10px] font-semibold leading-tight truncate">{t.title}</span>
                        {height > 26 && (
                          <span className="block text-[9px] opacity-80 tabular-nums">{timeLabel(t)}</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}

            {/* Current-time line */}
            {weekHasToday && todayIdx >= 0 && (
              <div className="absolute left-0 right-0 z-20 pointer-events-none" style={{ top: nowTop }}>
                <span className="absolute w-2 h-2 rounded-full bg-red-500 -translate-y-1/2"
                  style={{ left: `calc(${(todayIdx / 7) * 100}% - 3px)` }} />
                <div className="h-px w-full bg-red-500/70" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Acción para crear con detalles */}
      <div className="shrink-0 border-t border-border px-6 py-2 flex justify-end">
        <button type="button" onClick={() => onAddFull(weekHasToday ? today : days[0])}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-light transition cursor-pointer">
          <Plus size={13} /> Nueva tarea
        </button>
      </div>
    </div>
  )
}

/* ── Day view ── */
function DayView({ current, tasks, onAdd }: {
  current: Date; tasks: Task[]; onAdd: () => void
}) {
  const dayTasks = tasksForDay(tasks, current).sort((a, b) => {
    const am = a.start_time ? minutesOf(a.start_time) : -1
    const bm = b.start_time ? minutesOf(b.start_time) : -1
    return am - bm
  })
  const today = new Date()
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs text-muted">{dayTasks.length} tarea{dayTasks.length !== 1 ? 's' : ''}</p>
          <button type="button" onClick={onAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-accent text-white text-xs font-medium rounded-lg hover:bg-accent-light transition cursor-pointer">
            <Plus size={13} /> Nueva tarea
          </button>
        </div>

        {dayTasks.length === 0 ? (
          <EmptyState
            variant="calendar"
            title="Sin eventos en este período"
            description="Crea una tarea con fecha para verla aquí"
            action={{ label: 'Crear tarea', onClick: onAdd }}
          />
        ) : (
          <div className="space-y-2">
            {dayTasks.map((t) => {
              const urgency = dueUrgency(t, today)
              const urgencyBorder = urgency === 'overdue'
                ? 'border-red-500/60'
                : urgency === 'soon' ? 'border-yellow-500/50' : 'border-border'
              const time = timeLabel(t)
              return (
                <div key={t.id}
                  className={`flex items-center gap-3 p-3.5 bg-panel border rounded-xl ${urgencyBorder} ${t.is_completed ? 'opacity-55' : ''}`}>
                  <div className={`w-2 h-2 rounded-full shrink-0 ${
                    urgency !== 'none' ? URGENCY_DOT[urgency] : PRIORITY_DOT[t.priority]
                  }`} />
                  {time && (
                    <span className="inline-flex items-center gap-1 text-xs text-muted tabular-nums shrink-0 w-[96px]">
                      <Clock size={11} /> {time}
                    </span>
                  )}
                  <span className={`text-sm text-foreground flex-1 ${t.is_completed ? 'line-through text-muted' : ''}`}>
                    {t.title}
                  </span>
                  {urgency === 'overdue' && !t.is_completed && (
                    <span className="text-xs text-red-400 font-medium">Vence hoy/vencida</span>
                  )}
                  {urgency === 'soon' && !t.is_completed && (
                    <span className="text-xs text-yellow-400 font-medium">Vence pronto</span>
                  )}
                  {t.is_completed && <span className="text-xs text-subtle">Completada</span>}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
````

## File: lib/supabase/notes.ts
````typescript
import { createClient } from './client'
import { Note } from '@/types'

export async function getNotesByNotebook(notebookId: string): Promise<Note[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('notebook_id', notebookId)
    .eq('is_trashed', false)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function createNote(notebookId: string): Promise<Note> {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('No autenticado')

  const { data, error } = await supabase
    .from('notes')
    .insert({
      notebook_id: notebookId,
      user_id: user.id,
      title: 'Sin título',
      content: {},
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data
}

export async function updateNote(id: string, updates: Partial<Note>): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function trashNote(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ is_trashed: true })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function toggleFavorite(id: string, value: boolean): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ is_favorite: value })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function togglePin(id: string, value: boolean): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ is_pinned: value })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function updateNoteEmoji(noteId: string, emoji: string | null): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ emoji })
    .eq('id', noteId)

  if (error) throw new Error(error.message)
}

export async function updateCover(
  noteId: string,
  data: { cover_url?: string | null; cover_gradient?: string | null }
): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update(data)
    .eq('id', noteId)

  if (error) throw new Error(error.message)
}

/**
 * Tipografía POR NOTA (Phase 17 id:61). Escribe note_font_family/_size/_line_height.
 * Pasa null en un campo para que la nota vuelva a heredar el default global.
 * Solo se actualizan los campos presentes en `typography` (null sí cuenta como valor).
 */
export async function updateNoteTypography(
  noteId: string,
  typography: {
    fontFamily?: string | null
    fontSize?: number | null
    lineHeight?: number | null
  }
): Promise<void> {
  const update: Record<string, string | number | null> = {}
  if ('fontFamily' in typography) update.note_font_family = typography.fontFamily ?? null
  if ('fontSize' in typography) update.note_font_size = typography.fontSize ?? null
  if ('lineHeight' in typography) update.note_line_height = typography.lineHeight ?? null

  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update(update)
    .eq('id', noteId)

  if (error) throw new Error(error.message)
}

export async function updateNoteColor(noteId: string, color: string | null): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ color })
    .eq('id', noteId)

  if (error) throw new Error(error.message)
}

export async function getFavoriteNotes(): Promise<Note[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('is_favorite', true)
    .eq('is_trashed', false)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getTrashedNotes(): Promise<Note[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('is_trashed', true)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function restoreNote(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .update({ is_trashed: false })
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export async function permanentlyDeleteNote(id: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)
}

export type NoteWithNotebook = Note & {
  notebooks: { name: string } | null
}

export async function getAllNotesWithNotebook(): Promise<NoteWithNotebook[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*, notebooks(name)')
    .eq('is_trashed', false)
    .order('updated_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as unknown as NoteWithNotebook[]
}

export async function createQuickNote(notebookId: string): Promise<Note> {
  return createNote(notebookId)
}

export async function getNoteById(id: string): Promise<Note | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data ?? null
}
````

## File: CHECKPOINTS.md
````markdown
# CHECKPOINTS.md — Criterios de "está bien hecho"

> Antes de marcar cualquier feature como `done`, verifica todos los checkpoints.

---

## Checkpoints globales (toda feature)

- [ ] `npm run build` termina sin errores TypeScript
- [ ] Sin `any` sin justificación documentada
- [ ] Sin `console.log()` de debug
- [ ] Sin `TODO` sin contexto
- [ ] Queries a Supabase en `lib/supabase/`, no en componentes
- [ ] Mensajes de error al usuario en español
- [ ] RLS funciona (probado con usuario autenticado real)

---

## Phases 1–15 ✅ (completadas — id 1–39)

Todas las features id:1–39 están done. No re-verificar.

### Resumen de mejoras fuera del roadmap aplicadas en phases 1–15
- Bloques TipTap: **Callout**, **Toggle**, **TOC** (`lib/editor/`)
- Extensiones TipTap: **Superscript**, **Subscript**, **Eraser** en toolbar
- 6 fuentes en `FormatDropdowns.tsx` (Slab Serif, Script, Handwritten vía Google Fonts)
- **TableToolbar** — BubbleMenu para gestión de tablas
- **NoteList** — animación de entrada, fechas relativas, borde accent
- **AiMenuExpanded v2** — 30+ acciones con submenús hover
- Recordatorios duales por `due_date` (flags `reminder_7days_sent` / `reminder_1day_sent`)
- Indicadores de urgencia en CalendarView (rojo/amarillo)

---

## Phase 16 — Mejoras UI/UX + Features pendientes

### Tags: vista y gestión completa (id:40)
- [ ] Vista `tags-view` rediseñada: grid de cards con nombre + conteo de notas
- [ ] Click en etiqueta → filtra notas que la tienen
- [ ] Renombrar etiqueta inline
- [ ] Eliminar etiqueta con confirmación (+ elimina relaciones `note_tags`)
- [ ] Búsqueda/filtro de etiquetas en la vista
- [ ] RPC `get_tags_with_count()` creada en Supabase
- [ ] `lib/supabase/tags.ts`: `renameTag()`, `deleteTagWithRelations()`, `getTagsWithCount()`

### Templates: galería completa estilo Notion (id:41)

**Plantillas builtin a añadir en `lib/templates/builtin-templates.ts`:**
- [ ] Agenda semanal (personal) — plan semanal con tabla días + tareas + notas
- [ ] Plan de proyecto (proyecto) — fases, stakeholders, tabla de estado, fechas
- [ ] Asignación / Tarea escolar (educacion) — instrucciones, recursos, milestones
- [ ] Programación 101 (educacion) — TOC, objetivos, bloques de código
- [ ] Notas de clase (educacion) — fecha, clase, grabación, resumen
- [ ] Ecuaciones clave Matemáticas (educacion) — TOC con fórmulas en code inline
- [ ] Lista de compras (personal) — categorías con checkboxes
- [ ] Diario diario (diario) — AM/PM, metas, sentimientos, reflexión
- [ ] Lista de lectura (personal) — por leer / leyendo / leídos / recomendaciones
- [ ] Plan de viaje (viaje) — overview, vuelos, alojamiento, actividades, presupuesto
- [ ] Gestión de proyectos (proyecto) — tabla de estado, fases, equipo
- [ ] CRM / Gestión de clientes (trabajo) — tabla clientes, contacto, responsable
- [ ] Nota de candidato (trabajo) — info aplicante, revisión, milestones entrevista
- [ ] Información de contacto (trabajo) — datos básicos, comunicación, facturación
- [ ] Lluvia de ideas (proyecto) — meeting notes, brainstorming, recomendaciones
- [ ] Notas de reunión (reuniones) — detalles, objetivos, tabla equipo, checklist

**Categorías nuevas en `builtin-templates.ts`:**
- [ ] Añadir: `educacion`, `viaje`, `finanzas`, `salud`, `proyecto` (además de las existentes)

**Galería (`TemplatesView.tsx`) — rediseño completo:**
- [ ] Grid 3 columnas desktop / 2 tablet / 1 móvil
- [ ] Card con thumbnail real (TipTap read-only miniaturizado: `scale(0.45)` + `pointer-events-none` + `overflow-hidden`)
- [ ] Card muestra: thumbnail + título + pill de categoría + descripción corta
- [ ] Badge "Oficial NoteEvo" en builtin, badge "Mía" en personales
- [ ] Fila "Destacadas" al tope (4 plantillas más relevantes)
- [ ] Filtros por categoría en header (pills: Todas + una por categoría)
- [ ] Buscador por nombre en el header

**Flujo de importar — modal de detalle:**
- [ ] Click en card → modal/drawer a pantalla completa
- [ ] Modal: preview grande del contenido (TipTap read-only con todas las extensiones, incluidos bloques custom)
- [ ] Selector de libreta destino (dropdown) — recuerda última usada via `localStorage('noteevo-last-template-notebook')`
- [ ] Botón "Usar esta plantilla" → crea nota en libreta seleccionada → redirige al editor

**Fixes técnicos:**
- [ ] Extensiones Callout/Toggle/TOC registradas en el editor read-only del preview (no solo en NoteEditor)
- [ ] Al importar: usar `content` JSON de la plantilla directamente en `updateNote()` (no convertir a texto)
- [ ] Botón "Eliminar" para plantillas personales con confirmación (`deleteTemplate(id)` ya existe)
- [ ] `TemplateSelector.tsx` (modal al crear nota): también usa el nuevo flujo con preview

### Tasks: rediseño UI + modal mejorado (id:42)
- [ ] `TaskList.tsx`: cards rediseñadas — dot de color para prioridad, pill fecha urgente
- [ ] Checkbox más grande (24px) con animación al completar
- [ ] Panel de filtros colapsable (drawer), chips de filtros activos en header
- [ ] `TaskModal.tsx`: selector de prioridad visual con colores
- [ ] Date picker con `min` relativo a hoy
- [ ] Selector de nota a vincular en el modal
- [ ] Botón "Guardar" prominente y claro

### Files: rediseño UI al estilo Evernote (id:43)
- [ ] Vista grid para imágenes: cards cuadradas 200×200 con thumbnail + nombre
- [ ] Vista lista para docs: fila compacta con icono tipado, metadata
- [ ] Toggle vista grid/lista en header
- [ ] Drag & drop para subir desde `FilesView` (no solo desde nota)
- [ ] Breadcrumb "nota origen" clickeable que navega a la nota
- [ ] Ordenar por: Nombre / Fecha / Tamaño
- [ ] Previsualización de imagen al click (lightbox con `<dialog>`)

### Calendar: mejoras visuales y creación de eventos (id:44)
- [ ] Cabecera más clara, mejor contraste y jerarquía visual
- [ ] Vista mes: celdas más altas para más tareas visibles
- [ ] Vista semana: línea de "hora actual"
- [ ] Mini-popover de creación rápida al click en día/hora
- [ ] Soporte hora inicio/fin en tareas del calendario
- [ ] Días con tareas coloreados según urgencia

### Spaces: rediseño UI + mejoras de permisos (id:45)
- [ ] `SpacesView.tsx`: cards más grandes con descripción, contador miembros/libretas
- [ ] Color/banner de identificación por space
- [ ] `SpaceDetailView.tsx`: tabla de miembros más clara (columnas Nombre, Rol, Fecha, Acciones)
- [ ] Al invitar, mostrar avatar/iniciales del usuario antes de confirmar
- [ ] Indicador del rol propio en el header del space
- [ ] `SharedWithMeView.tsx`: mostrar dueño del space, nº miembros, fecha de unión

### NoteEditor: rediseño layout y breathing room (id:46)
- [ ] Área de escritura con `max-w-3xl` centrada (no full-width)
- [ ] `py-12` de padding vertical
- [ ] Título `text-4xl` con más espacio inferior
- [ ] Separador visual sutil título/tags → cuerpo editor
- [ ] Toolbar: grupos visuales más claros con divisores visibles
- [ ] Focus mode: `max-w-2xl` + toolbar oculta (solo aparece en hover)
- [ ] Toolbar scrollable horizontalmente en móvil

### IA en Sidebar: panel lateral de IA (id:47)
- [ ] Entrada "Asistente IA" en `Sidebar.tsx` (icono Sparkles, siempre activo)
- [ ] `currentView === 'ai-assistant'` en `uiStore.ts`
- [ ] `components/ai/AiAssistantView.tsx`: chat general con Groq streaming
- [ ] Selector de contexto: Sin nota / Nota activa / Resumen general
- [ ] Acciones rápidas: "Resumir mis notas de hoy", "¿Qué tengo pendiente?", "Sugerir tareas"
- [ ] Rate limit 20 mensajes/día (acción `'ai_assistant'` en tabla `ai_usage`)
- [ ] Route Handler `app/api/ai/assistant/route.ts` (streaming, Groq)

### Compartir nota: modo edición colaborativa (id:48)
- [ ] Columna `access_level` en `shared_notes` ya tiene `'none' | 'view'`, añadir `'edit'`
  (migración SQL: `ALTER TABLE shared_notes ALTER COLUMN access_level TYPE text;`)
- [ ] `ShareControls.tsx`: habilitar opción "Anyone with the link can edit" (actualmente disabled)
- [ ] `app/n/[slug]/page.tsx`: si `access_level === 'edit'` → renderizar editor en modo editable
- [ ] Guardar cambios via `updateSharedNoteContent(slug, content)` con service role, debounce 1500ms
- [ ] Indicador "Guardado" / "Guardando..." en la página pública
- [ ] `lib/supabase/shared-notes-server.ts`: añadir `updateSharedNoteContent()`
- [ ] Renombrar `NoteViewer.tsx` → `NotePublicEditor.tsx` con prop `editable: boolean`
- [ ] Solo permitir edición si `is_active = true` y `expires_at` no vencido

### Sidebar: workspace header + avatar (id:49)
- [ ] Avatar visible en el tope del sidebar: foto si existe `avatar_url`, sino iniciales del `display_name`
- [ ] Nombre del workspace/usuario visible junto al avatar
- [ ] Dropdown funcional: opciones "Configuración" y "Cerrar sesión"
- [ ] `signOut()` de Supabase redirige a `/login`
- [ ] Sin errores TypeScript en `Sidebar.tsx`

### Sidebar: separadores + grupos (id:50)
- [ ] 3 secciones claramente diferenciadas: Principal / Organización / Herramientas
- [ ] Separador 0.5px visible entre secciones (no entre items individuales)
- [ ] Gap de ~6px entre cada grupo de sección
- [ ] Ningún item cambia de vista destino (solo agrupación visual)
- [ ] Build verde

### Sidebar: full-row click zones (id:51)
- [ ] Zona de click de cada NavItem ocupa el 100% del ancho disponible
- [ ] Highlight de hover con `border-radius: 8px` (rounded-lg en Tailwind)
- [ ] Padding uniforme: 8px vertical, 12px horizontal en todos los items
- [ ] Ningún item con `disabled` que tenga vista implementada
- [ ] Item "Asistente IA" activo (no disabled) si id:47 está done, o marcado pending claramente
- [ ] Build verde

### Sidebar: sección 'Más' colapsable (id:52)
- [ ] Items secundarios (Archivos, Plantillas, Configuración) dentro del grupo "Más"
- [ ] Botón "Más" con chevron que rota al expandir/colapsar
- [ ] Estado inicial correcto al cargar (lee localStorage)
- [ ] Animación de apertura/cierre suave (transition-all + max-height)
- [ ] Build verde

### Sidebar: modo colapsado solo íconos (id:53)
- [ ] `isSidebarCollapsed` en `uiStore.ts` con getter y setter
- [ ] Ancho colapsado: ~48px; ancho expandido: ~240px
- [ ] Transición CSS suave entre ambos estados (transition-all duration-200)
- [ ] Tooltips visibles en modo colapsado al hacer hover
- [ ] Layout del dashboard ajusta el espacio del editor al colapsar/expandir
- [ ] `Ctrl+\` toggle funciona (registrado en `useKeyboardShortcuts.ts`)
- [ ] Estado persiste en `localStorage('noteevo-sidebar-collapsed')`
- [ ] Build verde

### Sidebar: notebooks expandibles inline (id:54)
- [ ] Click en "Libretas" expande acordeón inline con lista de notebooks
- [ ] Cada fila: ícono + nombre truncado + conteo de notas
- [ ] Click en una libreta → filtra notas de esa libreta y cambia vista
- [ ] Si hay más de 7 libretas: muestra "Ver todas →" al final
- [ ] Estado expandido persiste en localStorage
- [ ] Build verde

---

## Phase 17 — Features de producto (ids 55–69)

### Emoji por nota (id:55)
- [ ] Columna `emoji text` en tabla `notes` creada
- [ ] Picker inline funcional en NoteEditor (sobre el título)
- [ ] Emoji visible en NoteList junto al título
- [ ] Fallback a icono FileText cuando no hay emoji
- [ ] `updateNoteEmoji(noteId, emoji)` en `lib/supabase/notes.ts`
- [ ] Build verde

### Contador de palabras + tiempo de lectura (id:56)
- [ ] Contador visible en barra inferior del editor
- [ ] Actualiza en tiempo real al escribir (`onUpdate`)
- [ ] Formato correcto: "680 palabras · 3 min lectura"
- [ ] No visible cuando la nota está vacía
- [ ] Build verde

### Notas ancladas (id:57)
- [ ] Columna `is_pinned boolean default false` en tabla `notes` creada
- [ ] Sección "Ancladas" visible encima del resto en NoteList cuando hay notas ancladas
- [ ] Botón pin/unpin en menú contextual de la card
- [ ] `togglePin(noteId, value)` en `lib/supabase/notes.ts`
- [ ] Build verde

### Tooltips con shortcut en toolbar (id:58)
- [ ] Componente `ToolbarTooltip.tsx` creado (sin dependencias externas)
- [ ] Delay de 400ms antes de mostrar
- [ ] Shortcut visible en formato `kbd` dentro del tooltip
- [ ] Aplicado en todos los botones de NoteEditor y FormatDropdowns
- [ ] Build verde

### Cover image por nota (id:59)
- [ ] Columnas `cover_url text` y `cover_gradient text` en tabla `notes` creadas
- [ ] Zona de cover visible en NoteEditor encima del título
- [ ] Upload a Supabase Storage funcional (ruta `covers/{user_id}/{note_id}`)
- [ ] Al menos 8 gradientes predefinidos como alternativa
- [ ] Thumbnail en NoteList cards (40px de alto) cuando existe cover
- [ ] `updateCover(noteId, data)` en `lib/supabase/notes.ts`
- [ ] Build verde

### Gallery view (id:60)
- [ ] Toggle lista/grid en header de NoteList (iconos correctos)
- [ ] Preferencia persiste en `localStorage('noteevo-notes-view')`
- [ ] Vista grid en 2 columnas
- [ ] Cards muestran: cover/gradiente, emoji, título, fecha relativa, preview de texto
- [ ] Sin llamadas extra a DB
- [ ] Build verde

### Opciones tipográficas (id:61)
- [ ] Columna `editor_prefs jsonb` en tabla `user_profiles` creada
- [ ] Panel de opciones accesible desde barra inferior del editor
- [ ] 4 opciones: line height, paragraph spacing, line width, font size
- [ ] Cambios aplican en tiempo real al contenedor del editor
- [ ] Guardado con debounce en user_profiles
- [ ] Build verde

### Empty states (id:62)
- [ ] Componente `EmptyState.tsx` creado con props: icon, title, description, action?
- [ ] Aplicado en: NoteList, TaskList, FilesView, CalendarView, TemplatesView, TrashNotes
- [ ] Cada instancia tiene texto y CTA específico en español
- [ ] SVG de ilustración visible (no solo texto)
- [ ] Build verde

### Ordenar notas (id:63)
- [ ] Dropdown de ordenación en header de NoteList (4 opciones)
- [ ] Preferencia guardada por notebook en localStorage
- [ ] Ordenación client-side (sin fetch extra)
- [ ] Opción activa visualmente marcada
- [ ] Build verde

### Color por nota (id:64)
- [ ] Columna `color text` en tabla `notes` creada
- [ ] Picker de 8 colores + "sin color" en menú contextual de la card
- [ ] Borde izquierdo de color visible en NoteList
- [ ] Filtro de color en header de NoteList
- [ ] `updateNoteColor(noteId, color|null)` en `lib/supabase/notes.ts`
- [ ] Build verde

### Typewriter mode (id:65)
- [ ] `isTypewriterMode: boolean` en `uiStore.ts`
- [ ] Toggle accesible desde barra inferior del editor
- [ ] Párrafos inactivos con opacidad reducida (0.35)
- [ ] Párrafo activo con opacidad 1.0
- [ ] Scroll que mantiene el cursor centrado verticalmente
- [ ] CSS aplicado solo cuando `isTypewriterMode = true`
- [ ] Build verde

### Comando rápido mejorado (id:66)
- [ ] Input unificado: '>' para comandos, texto libre para búsqueda
- [ ] Mínimo 6 comandos funcionales con íconos
- [ ] Navegación con teclado (↑↓ + Enter)
- [ ] Shortcut visible en cada opción
- [ ] Ctrl+K abre el panel (comportamiento existente preservado)
- [ ] Build verde

### Importar Markdown / .enex (id:67)
- [ ] Modal de importación con drag & drop
- [ ] Importar .md funcional: resultado es nota con contenido TipTap correcto
- [ ] Importar .enex funcional: título y contenido extraídos correctamente
- [ ] Selector de libreta destino en el modal
- [ ] Mensajes de error en español si el archivo es inválido
- [ ] Build verde

### Backlinks entre notas (id:68)
- [ ] Tabla `note_links` creada con RLS activado
- [ ] Extensión TipTap: `[[` trigger abre autocomplete de notas
- [ ] Nodo `noteLink` insertado correctamente con noteId y title
- [ ] Sincronización de `note_links` en cada autosave
- [ ] Panel de backlinks visible en NoteEditor (puede estar colapsado por defecto)
- [ ] RPC `get_backlinks(p_note_id)` retorna notas correctamente
- [ ] Build verde

### IA inline en editor (id:69)
- [ ] `/ai ` al inicio de párrafo vacío activa el modo inline
- [ ] Placeholder visual "Escribe un prompt..." visible
- [ ] Streaming de respuesta inserta texto en el documento
- [ ] Route Handler `app/api/ai/inline/route.ts` funcional
- [ ] Rate limit con acción `'ai_inline'` en `ai_usage`
- [ ] Errores muestran mensaje en español en el editor
- [ ] Build verde
````

## File: AGENTS.md
````markdown
# AGENTS.md — Guía de trabajo para Claude en NoteEvo

> Lee CLAUDE.md primero, luego este archivo.

---

## Cómo empezar cada sesión

1. Lee `CLAUDE.md` — contexto completo, schema de DB, arquitectura
2. Lee `feature_list.json` — elige la primera tarea con `status: "pending"`
3. Corre `npm run build` — debe terminar verde. Si no, arregla primero
4. Revisa los `depends_on` de la feature — asegúrate de que sus dependencias están `done`

---

## Mapa del repositorio

| Archivo / carpeta | Qué contiene | Cuándo leerlo |
|---|---|---|
| `CLAUDE.md` | Contexto completo, schema, arquitectura | Siempre al empezar |
| `feature_list.json` | Estado de cada feature | Siempre al empezar |
| `app/api/ai/` | Route Handlers de IA (Groq, streaming) | Para features de IA |
| `app/api/ai/transform/route.ts` | 30+ acciones de transformación de texto | Para AI features |
| `app/api/ai/assistant/route.ts` | Chat general IA (Phase 16, id:47) | Para IA Assistant |
| `app/(public)/` | Rutas sin autenticación | Para Phase 10 (share note) |
| `components/ai/` | AiAssistantView (Phase 16, id:47) | Para IA en sidebar |
| `components/editor/` | NoteEditor + paneles AI + TableToolbar | Para features del editor |
| `components/editor/AiMenuExpanded.tsx` | Menú IA v2 con submenús hover | Para AI menu |
| `lib/editor/` | Extensiones TipTap custom (Callout, Toggle, TOC, Mermaid) | Para nuevos bloques |
| `components/spaces/` | Spaces, modales, detalle | Para features de spaces |
| `components/sidebar/Sidebar.tsx` | Navegación global | Para añadir nav items |
| `lib/supabase/` | Todas las queries a DB | Antes de cualquier query |
| `store/` | Zustand stores | Para estado global |
| `types/index.ts` | Tipos TypeScript compartidos | Antes de crear tipos nuevos |
| `middleware.ts` | Auth guard de rutas | Si añades rutas públicas |
| `supabase/functions/` | Edge Functions | Para recordatorios email |
| `app/globals.css` | Tailwind v4 config + keyframes | Para estilos globales |
| `app/layout.tsx` | Root layout + Google Fonts | Para tipografías |

---

## Flujo de trabajo por feature

### Features con tabla nueva en DB
1. Verificar que la tabla ya existe o crear la migración SQL necesaria
2. Crear `lib/supabase/[feature].ts` con las queries
3. Añadir tipos a `types/index.ts`
4. Crear componentes
5. Integrar en `dashboard/page.tsx` y/o `Sidebar.tsx` si aplica
6. `npm run build` verde
7. Marcar `status: "done"` en `feature_list.json`

### Features sin tabla nueva
1. Crear hook/componente/store
2. Integrar
3. Build verde
4. Marcar done

---

## Reglas duras

- **Sin `any`** sin justificación documentada
- **Sin `console.log()` de debug**
- **Queries en `lib/supabase/`** — nunca inline en componentes
- **Cliente correcto**: `client.ts` en componentes, `server.ts` en Route Handlers
- **RLS activo** siempre
- **Build verde** antes de marcar done
- **`GROQ_API_KEY`** y **`SUPABASE_SERVICE_ROLE_KEY`** solo en server
- **Mensajes de error en español**
- **Columna `is_trashed`** (no `is_deleted`)
- **`storage_path`** y **`file_size`** en attachments (no file_url/size)
- **Rutas públicas** (ej. `/n/[slug]`): excluir en `middleware.ts`
- **Templates builtin**: `is_builtin = true`, `user_id = null` — nunca modificar
- **Sin `overflow-hidden`** en contenedores con submenús/dropdowns anidados
- **Editor siempre con `max-w-3xl` centrado** — no volver a full-width

---

## Convenciones de código

### Componentes
- PascalCase para nombre, kebab-case para archivo
- Un componente por archivo
- `'use client'` solo cuando es necesario

### TypeScript
- Props siempre con `interface`, no `type` inline
- Tipos nuevos en `types/index.ts`

### Tailwind v4
- Config via `@import "tailwindcss"` en `globals.css`
- Variables de tema en bloque `@theme`
- Para light mode: usar `[data-theme='light']` selector
- Keyframes globales (ej. `noteCardEnter`) definidos directamente en globals.css

### Streaming (IA)
- `ReadableStream` nativo de Web API
- `Content-Type: text/plain; charset=utf-8`
- Leer en cliente con `res.body?.getReader()` + `TextDecoder`

### Rate limiting (IA)
- Tabla `ai_usage`, acción como string
- Registrar ANTES del streaming
- Verificar con `.select('*', { count: 'exact', head: true })`

### Submenús hover (AI Menu)
- Usar delay 150ms con `setTimeout` antes de cerrar
- Cada item con submenu tiene `relative` + panel `absolute left-full top-0 z-50`
- NO usar `overflow-hidden` en el dropdown padre

### Notificaciones
- Insertar via service role (Route Handler o Edge Function)
- Realtime: suscripción a INSERT en `notifications` filtrado por `user_id`

### Edge Functions
- Directorio: `supabase/functions/[nombre]/index.ts`
- Usar Deno, no Node
- Variables de entorno: `Deno.env.get('NOMBRE')`

---

## Notas específicas por phase

### Phase 16 — Mejoras UI/UX

#### id:40 — Tags
- RPC `get_tags_with_count()`: `SELECT t.id, t.name, COUNT(nt.note_id) AS note_count, t.created_at FROM tags t LEFT JOIN note_tags nt ON t.id = nt.tag_id WHERE t.user_id = auth.uid() GROUP BY t.id`
- Al renombrar: `UPDATE tags SET name = $1 WHERE id = $2 AND user_id = auth.uid()`
- Al eliminar: borrar primero `note_tags` donde `tag_id = id`, luego borrar `tags`

#### id:41 — Templates galería estilo Notion
- **Thumbnail técnico**: envolver `<EditorContent editor={previewEditor} />` en un `div` con
  `style={{ transform: 'scale(0.45)', transformOrigin: 'top left', pointerEvents: 'none', width: '222%' }}`
  dentro de un contenedor `overflow-hidden` de tamaño fijo (ej. `w-full h-48`).
  El editor de preview se crea con `useEditor({ editable: false, ... })` con **todas** las extensiones
  (StarterKit + Callout + Toggle + TOC + Mermaid + Table + etc.) para que los bloques custom rendericen.
- **16 plantillas builtin**: cada una es un objeto TipTap JSON completo con headings, listas,
  taskLists, callouts y toggles según corresponda. Seguir el patrón de las 4 existentes en
  `lib/templates/builtin-templates.ts`.
- **Categorías**: el campo `category` en el tipo `Template` ya es `string | null`, no hay
  cambio de schema. Solo añadir las nuevas cadenas: `'educacion'`, `'viaje'`, `'finanzas'`,
  `'salud'`, `'proyecto'`.
- **localStorage para libreta**: al importar, leer/escribir `'noteevo-last-template-notebook'`
  con el id de la última libreta usada para pre-seleccionar el dropdown.
- **Flujo importar**: `createNote(notebookId)` → `updateNote(note.id, { title, content })` →
  `addNote()` → `setSelectedNote()` → `setCurrentView('notebooks')`. Mismo patrón que
  `TemplateDetail` existente, solo moverlo al nuevo modal.
- `deleteTemplate(id)` ya existe en `lib/supabase/templates.ts` — solo añadir botón
  con `window.confirm()` o modal de confirmación en las cards de plantillas personales.

#### id:42 — Tasks
- El panel de filtros colapsable: usar estado local `showFilters` + `AnimatePresence` o
  simplemente `transition-all` de Tailwind con max-height
- Vincular tarea a nota: campo `note_id` ya existe en `tasks`, añadir selector en `TaskModal`

#### id:43 — Files
- Lightbox: usar `<dialog>` nativo de HTML5 con `dialog.showModal()` / `dialog.close()`
- Grid/lista toggle: guardar preferencia en `localStorage` como `noteevo-files-view`

#### id:44 — Calendar
- Mini-popover de creación rápida: posicionarlo con `position: fixed` relativo al click,
  no usar modal. Incluir solo campo título + fecha + botón guardar.
- Hora inicio/fin: añadir campos `time_start` y `time_end` opcionales en `TaskModal`
  (solo visibles en contexto de calendario). Almacenar como parte de `due_date` con hora.

#### id:45 — Spaces
- Color de space: generar color aleatorio de una paleta predefinida al crear.
  Guardar en columna nueva `color text` en tabla `spaces`. Migración simple.
- Avatar al invitar: tras encontrar usuario por email (antes de confirmar), mostrar
  sus iniciales con el mismo estilo del avatar del sidebar.

#### id:46 — NoteEditor layout
- Cambio principal: en `NoteEditor.tsx`, el contenedor del área de escritura pasa de
  `px-10` a `max-w-3xl mx-auto px-8 py-12`
- El toolbar se mantiene full-width (pegado arriba), solo el contenido se centra

#### id:47 — IA en Sidebar
- `uiStore.ts`: añadir `'ai-assistant'` al type `View`
- `Sidebar.tsx`: añadir `NavItem` con `<Sparkles>` para IA (eliminar el que está `disabled`)
- `AiAssistantView.tsx`: chat streaming con contexto opcional de nota activa
- Route Handler `assistant/route.ts`: similar a `chat/route.ts` pero sin `noteContent` obligatorio

#### id:48 — Compartir con edición
- Migración SQL antes de implementar:
  ```sql
  -- shared_notes.access_level ya es text, solo verificar que acepta 'edit'
  ALTER TABLE shared_notes ADD CONSTRAINT shared_notes_access_level_check
    CHECK (access_level IN ('none', 'view', 'edit'));
  ```
- La página `/n/[slug]` debe ser Server Component — pasar `editable` como prop al
  cliente `NotePublicEditor.tsx` (`'use client'`)
- El guardado en la página pública usa `createAdminClient()` (service role) para
  bypasear RLS ya que el visitante no está autenticado

---

## Si te bloqueas

- Comportamiento inesperado de TipTap, Supabase o Next.js → documenta y para
- Error de TypeScript que rompe arquitectura → documenta y consulta
- RLS que no funciona → verificar con usuario real en Supabase Studio
- Edge Function que falla → revisar logs en Supabase Dashboard > Edge Functions
- Migración SQL necesaria → documentar el SQL exacto en el checkpoint antes de aplicar

---

## Guías de implementación — Phase 16 Sidebar (ids 49–54)

#### id:49 — Sidebar workspace header
- Leer `profileStore.useProfileStore()` para obtener `profile.display_name` y `profile.avatar_url`
- Fallback de iniciales: `display_name?.slice(0,2).toUpperCase()` o primeras 2 letras del email
- El dropdown usa estado local `isProfileMenuOpen` + click-outside con `useEffect`
- Estructura sugerida para el header:
  ```tsx
  <div className="flex items-center gap-3 px-3 py-3 border-b border-border">
    <Avatar size={32} url={profile?.avatar_url} initials={initials} />
    <span className="text-sm font-medium truncate flex-1">{profile?.display_name ?? 'NoteEvo'}</span>
    <button onClick={() => setIsProfileMenuOpen(v => !v)}><ChevronDown size={14} /></button>
  </div>
  ```

#### id:50 — Sidebar separadores
- Envolver grupos de NavItems en un componente `<SidebarGroup label="Principal">` o simplemente
  con un `<div className="mb-1">` + separador `<hr className="border-border/30 my-1" />`
- El label de sección es opcional y puede ser muy pequeño (text-[10px] text-muted uppercase tracking-wider)

#### id:51 — Full-row click zones
- Cada NavItem debe ser un `<button>` o `<div>` con `w-full` y `className` que incluya
  `rounded-lg px-3 py-2 flex items-center gap-3 hover:bg-secondary transition-colors`
- NO usar padding solo en el ícono o texto — el área completa debe ser clickeable
- El item activo: `bg-secondary border-l-2 border-accent` o similar al borde accent ya usado en NoteList

#### id:52 — Sección "Más"
- Usar `useState` + `useEffect` para leer `localStorage('noteevo-sidebar-more-open')`
- Animación: `style={{ maxHeight: isMoreOpen ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.2s ease' }}`
- NO usar `display: none` — provoca salto sin animación

#### id:53 — Sidebar colapsado
- En `uiStore.ts`, añadir junto a `isFocusMode`:
  ```ts
  isSidebarCollapsed: false,
  toggleSidebarCollapsed: () => set(s => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
  ```
- En `layout.tsx`: el contenedor principal cambia de `ml-60` a `ml-12` cuando está colapsado
  (usar clase dinámica o CSS transition en el mismo elemento)
- Tooltip en modo colapsado: atributo `title` nativo es suficiente, o `<span className="sr-only">`
  + tooltip custom si se quiere más control visual
- Shortcut `Ctrl+\`: añadir en `useKeyboardShortcuts.ts` con `{ key: '\\', ctrl: true }`

#### id:54 — Notebooks expandibles
- NO crear una nueva vista — el acordeón vive dentro del `Sidebar.tsx`
- Al hacer click en una libreta del acordeón:
  ```ts
  setSelectedNotebook(notebook)
  setCurrentView('notebooks')
  ```
- Conteo de notas: puede calcularse del store `noteStore.notes.filter(n => n.notebook_id === nb.id && !n.is_trashed).length`
  (sin llamada extra a DB si las notas ya están cargadas)
- Si las notas no están cargadas aún, mostrar el conteo como `—` y no hacer fetch extra

---

### Phase 17 — Features de producto

#### id:55 — Emoji por nota
- Migración antes de implementar: `ALTER TABLE notes ADD COLUMN emoji text;`
- Picker: array de ~40 emojis frecuentes en grid 8x5 + campo de búsqueda nativa
- Clic en zona encima del título (área vacía, 48px de alto) → abre picker, no clic en el título mismo
- Al seleccionar emoji: `UPDATE notes SET emoji = $1 WHERE id = $2 AND user_id = auth.uid()`
- En NoteList: renderizar `<span>{note.emoji}</span>` antes del título; si null, icono `<FileText size={16}/>`
- En noteStore: actualizar optimistamente antes del await

#### id:56 — Contador de palabras
- Calcular en el callback `onUpdate: ({ editor }) => { ... }` de useEditor
- `const text = editor.getText(); const words = text.trim() ? text.trim().split(/\s+/).length : 0`
- Tiempo: `const mins = Math.max(1, Math.ceil(words / 238))`
- Mostrar solo cuando `words > 0`; ocultar con `words === 0`
- Ubicación: `<div className="flex items-center gap-4 text-xs text-muted">` en la barra inferior del editor, junto al indicador "Guardado / Guardando..."

#### id:57 — Notas ancladas
- Migración: `ALTER TABLE notes ADD COLUMN is_pinned boolean default false;`
- En `lib/supabase/notes.ts`: `togglePin(noteId: string, value: boolean)` → UPDATE + retorno del note actualizado
- En noteStore: `updateNote` local optimista (ya existe el patrón)
- En NoteList: `const pinned = notes.filter(n => n.is_pinned); const rest = notes.filter(n => !n.is_pinned)`
- Sección "Ancladas" solo renderiza si `pinned.length > 0`; separador sutil entre secciones

#### id:58 — Tooltips en toolbar
- ToolbarTooltip.tsx: `'use client'`, `position: absolute; z-index: 50; bottom: calc(100% + 6px); left: 50%; transform: translateX(-50%)`
- El contenedor padre del botón necesita `position: relative` y `group` class
- Uso: `<ToolbarTooltip label="Negrita" shortcut="Ctrl+B"><button>...</button></ToolbarTooltip>`
- Delay 400ms con useRef para el setTimeout, limpiar en cleanup
- NO usar Radix Tooltip — demasiado pesado para este uso

#### id:59 — Cover image
- Migraciones: `ALTER TABLE notes ADD COLUMN cover_url text; ALTER TABLE notes ADD COLUMN cover_gradient text;`
- Storage path: `covers/${userId}/${noteId}` en el bucket existente (mismo que imágenes de notas)
- Zona de cover: div de 180px de alto encima del título. Visible siempre en modo edición.
  Si no hay cover: fondo neutro con botón "Añadir portada" centrado.
- Gradientes predefinidos: array de strings CSS `['linear-gradient(135deg, #667eea 0%, #764ba2 100%)', ...]`
- En NoteList card: `<div style={{backgroundImage: `url(${note.cover_url})` || note.cover_gradient}} className="h-10 rounded-t-md bg-cover bg-center" />`
- `updateCover(noteId, {cover_url?: string, cover_gradient?: string})` → UPDATE solo las columnas que cambien

#### id:60 — Gallery view
- State local en NoteList: `const [view, setView] = useState<'list'|'grid'>(() => localStorage.getItem('noteevo-notes-view') as 'list'|'grid' ?? 'list')`
- Grid CSS: `grid-template-columns: repeat(2, 1fr); gap: 12px`
- Preview de texto desde JSON TipTap: función `extractText(content: JSONContent): string` — recorrer recursivamente buscando nodos `text`, unir con espacios, truncar a 120 chars
- Si `extractText` ya existe en `lib/utils/tiptap.ts`, reutilizarlo

#### id:61 — Opciones tipográficas
- Migración: `ALTER TABLE user_profiles ADD COLUMN editor_prefs jsonb default '{}'::jsonb;`
- Interface `EditorPrefs { lineHeight: '1.4'|'1.7'|'2.0'; paragraphSpacing: 'compact'|'normal'|'relaxed'; lineWidth: 'narrow'|'normal'|'wide'; fontSize: '14'|'16'|'18' }`
- CSS variables en globals.css: `.editor-content { --editor-line-height: 1.7; --editor-font-size: 16px; }`
  `.editor-content p { line-height: var(--editor-line-height); font-size: var(--editor-font-size); }`
- Aplicar variables inline en el contenedor del editor según los prefs del usuario
- Guardar en profileStore con debounce 1000ms → `updateEditorPrefs(prefs)` en profile.ts
- Panel: drawer/popover pequeño con 4 secciones de radio buttons, NO un modal grande

#### id:62 — Empty states
- EmptyState.tsx interface: `{ icon: ReactNode; title: string; description: string; action?: { label: string; onClick: () => void } }`
- SVGs inline simples: `<svg viewBox="0 0 64 64" className="w-16 h-16 text-muted">` con formas básicas
- Contenedor: `<div className="flex flex-col items-center justify-center py-20 gap-4 text-center">`
- Textos por vista:
  - NoteList vacío: "Sin notas aquí" / "Crea tu primera nota" / botón "Nueva nota"
  - Favoritos vacío: "Sin notas favoritas" / "Marca notas con ★ para acceder rápido"
  - Papelera vacía: "Papelera vacía" / "Las notas eliminadas aparecerán aquí"
  - Tasks vacío: "Sin tareas" / "Organiza lo que tienes pendiente" / botón "Nueva tarea"
  - Files vacío: "Sin archivos" / "Adjunta archivos a tus notas para verlos aquí"
  - Templates vacío: solo aplica si no hay personales (las builtin siempre existen)

#### id:63 — Ordenar notas
- Dropdown con `<select>` nativo o custom. Opciones: `updated_at_desc`(default), `created_at_desc`, `title_asc`, `size_desc`
- Función de ordenación client-side (NO tocar las queries de Supabase):
  ```ts
  const sorted = [...notes].sort((a, b) => {
    if (sort === 'title_asc') return a.title.localeCompare(b.title)
    if (sort === 'size_desc') return JSON.stringify(b.content).length - JSON.stringify(a.content).length
    if (sort === 'created_at_desc') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  })
  ```
- localStorage key: `noteevo-sort-${selectedNotebook?.id ?? 'all'}`

#### id:64 — Color por nota
- Migración: `ALTER TABLE notes ADD COLUMN color text;`
- Paleta: `['red','orange','yellow','green','teal','blue','purple','pink']` → mapear a clases Tailwind
- En NoteList card: `border-l-[3px] border-l-{color}-400` (reemplaza el borde accent actual)
  Si `note.color` es null: mantener el borde accent verde del hover actual
- Picker en menú contextual: 8 círculos de color + X para "sin color"; CSS puro, sin librerías
- Filtro en header: pills de colores horizontales, `null` = "Todos"
- `updateNoteColor(noteId, color: string | null)` en notes.ts

#### id:65 — Typewriter mode
- `uiStore.ts`: añadir `isTypewriterMode: false, toggleTypewriterMode: () => set(s => ({isTypewriterMode: !s.isTypewriterMode}))`
- En NoteEditor: listener `editor.on('selectionUpdate', handleTypewriter)` solo si `isTypewriterMode`
- handleTypewriter: `const { from } = editor.state.selection; const domNode = editor.view.domAtPos(from).node; domNode?.parentElement?.scrollIntoView({block:'center',behavior:'smooth'})`
- CSS en globals.css: `.typewriter-mode .ProseMirror > * { opacity: 0.35; transition: opacity 0.15s; } .typewriter-mode .ProseMirror > *.is-active { opacity: 1; }`
- Añadir/remover clase `is-active` via `editor.view.dispatch` con decoración de TipTap en `onSelectionUpdate`
- Toggle en barra inferior: icono `AlignCenter` de Lucide

#### id:66 — Comando rápido mejorado
- Detectar si el input empieza con `>` para modo comando vs. búsqueda normal
- Comandos definidos como array de objetos `{ id, icon, label, shortcut?, action: () => void }`
- Filtrar por el texto después del `>`: `commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))`
- Acciones de comandos: usar `useNotebookStore`, `useUiStore`, `useTaskStore` para disparar acciones
- Navegación: `useState<number>(selectedIndex)` + keydown handlers en el input
- Preservar la búsqueda de notas existente cuando el input NO empieza con `>`

#### id:67 — Importar archivos
- Instalar `marked` (npm install marked --save) para parsing de Markdown
- Route Handler: `POST /api/import` con `multipart/form-data`, campo `file` + `notebookId`
- Para .md: `const html = marked(text); const json = htmlToTiptap(html)` — implementar `htmlToTiptap` en `lib/utils/tiptap.ts`
- Para .enex: parsear XML con `new DOMParser().parseFromString(enex, 'text/xml')` → extraer `<title>` y `<content>` → `<content>` contiene ENML (HTML-like) → parsear como HTML → convertir a TipTap JSON
- Crear nota tras importar: `createNote(notebookId)` + `updateNote(id, {title, content})`
- Modal: drag & drop nativo (sin librería), aceptar `.md,.enex`, barra de progreso con estado local

#### id:68 — Backlinks
- SQL completo antes de implementar (ver campo `sql` en feature_list.json)
- Extensión TipTap `NoteLink`: `addInputRules` con `textblockTypeInputRule` o `inputRuleMatcherHandler` para `[[` → dropdown de notas
- Nodo custom `noteLink`: `attrs: { noteId: string, title: string }`, renderiza como `<a>` con estilo especial
- Sincronización en autosave (el debounce de 1500ms ya existe en NoteEditor):
  ```ts
  const links = findNoteLinks(editor.getJSON()) // recorrer JSON buscando nodos noteLink
  await syncNoteLinks(noteId, links.map(l => l.attrs.noteId))
  ```
  `syncNoteLinks`: DELETE FROM note_links WHERE source_note_id = $1 + INSERT de los nuevos (upsert)
- BacklinksPanel: mismo patrón que VersionHistoryPanel — panel colapsable en el sidebar derecho del editor

#### id:69 — IA inline
- InputRule TipTap: detecta `/ai ` al inicio de un párrafo (`^\/ai\s`) → reemplaza el nodo por nodo especial `aiPrompt`
- Nodo `aiPrompt`: no editable directamente, muestra placeholder decorativo, captura Enter para ejecutar
- Al ejecutar: `fetch('/api/ai/inline', {method:'POST', body: JSON.stringify({prompt: text, context: noteContent})})` → streaming igual que chat/route.ts
- Respuesta se inserta como nodos párrafo/heading/etc según el JSON que devuelva el modelo (pedir respuesta en formato TipTap JSON o texto plano y parsearlo)
- Si el usuario presiona Escape: eliminar el nodo `aiPrompt` y restaurar párrafo vacío
- Rate limit: acción `'ai_inline'` en ai_usage, límite 20/día

---

## Migraciones SQL agrupadas — Phase 17

Ejecutar en Supabase SQL Editor antes de implementar las features que las necesiten:

```sql
-- id:55 — emoji por nota
ALTER TABLE notes ADD COLUMN IF NOT EXISTS emoji text;

-- id:57 — notas ancladas
ALTER TABLE notes ADD COLUMN IF NOT EXISTS is_pinned boolean default false;

-- id:59 — cover image
ALTER TABLE notes ADD COLUMN IF NOT EXISTS cover_url text;
ALTER TABLE notes ADD COLUMN IF NOT EXISTS cover_gradient text;

-- id:61 — opciones tipográficas
ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS editor_prefs jsonb default '{}'::jsonb;

-- id:64 — color por nota
ALTER TABLE notes ADD COLUMN IF NOT EXISTS color text;

-- id:68 — backlinks (ejecutar completo)
CREATE TABLE IF NOT EXISTS note_links (
  source_note_id uuid references notes(id) ON DELETE CASCADE,
  target_note_id uuid references notes(id) ON DELETE CASCADE,
  created_at timestamptz default now(),
  PRIMARY KEY (source_note_id, target_note_id)
);
ALTER TABLE note_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS note_links_select ON note_links
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM notes WHERE id = source_note_id AND user_id = auth.uid())
  );
CREATE POLICY IF NOT EXISTS note_links_insert ON note_links
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM notes WHERE id = source_note_id AND user_id = auth.uid())
  );
CREATE POLICY IF NOT EXISTS note_links_delete ON note_links
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM notes WHERE id = source_note_id AND user_id = auth.uid())
  );
GRANT SELECT, INSERT, DELETE ON note_links TO authenticated;
```
````

## File: store/uiStore.ts
````typescript
import { create } from 'zustand'

type View =
  | 'home' | 'notebooks' | 'all-notes' | 'favorites' | 'trash'
  | 'search' | 'advanced-search' | 'tags-view' | 'notebooks-view' | 'tasks' | 'files'
  | 'calendar' | 'spaces' | 'shared' | 'settings' | 'templates' | 'ai-assistant'

export type Theme = 'dark' | 'light' | 'system'

interface UIStore {
  currentView: View
  setCurrentView: (view: View) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  isFocusMode: boolean
  setFocusMode: (v: boolean) => void
  isTypewriterMode: boolean
  toggleTypewriterMode: () => void
  isNoteListCollapsed: boolean
  setNoteListCollapsed: (v: boolean) => void
  isSidebarCollapsed: boolean
  setSidebarCollapsed: (v: boolean) => void
  toggleSidebarCollapsed: () => void
  isCheatsheetOpen: boolean
  setCheatsheetOpen: (v: boolean) => void
  isCommandPaletteOpen: boolean
  setCommandPaletteOpen: (v: boolean) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useUIStore = create<UIStore>((set) => ({
  currentView: 'home',
  setCurrentView: (view) => set({ currentView: view }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isFocusMode: false,
  setFocusMode: (v) => set({ isFocusMode: v }),
  isTypewriterMode: false,
  toggleTypewriterMode: () => set((s) => ({ isTypewriterMode: !s.isTypewriterMode })),
  isNoteListCollapsed: false,
  setNoteListCollapsed: (v) => set({ isNoteListCollapsed: v }),
  isSidebarCollapsed: false,
  setSidebarCollapsed: (v) => set({ isSidebarCollapsed: v }),
  toggleSidebarCollapsed: () => set((s) => ({ isSidebarCollapsed: !s.isSidebarCollapsed })),
  isCheatsheetOpen: false,
  setCheatsheetOpen: (v) => set({ isCheatsheetOpen: v }),
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (v) => set({ isCommandPaletteOpen: v }),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}))
````

## File: package.json
````json
{
  "name": "noteevo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:headed": "playwright test --headed",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:report": "playwright show-report e2e-out/report"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.3.1",
    "@dnd-kit/utilities": "^3.2.2",
    "@supabase/ssr": "^0.10.3",
    "@supabase/supabase-js": "^2.105.4",
    "@tailwindcss/typography": "^0.5.19",
    "@tiptap/core": "^3.23.6",
    "@tiptap/extension-color": "^3.23.6",
    "@tiptap/extension-font-family": "^3.23.6",
    "@tiptap/extension-highlight": "^3.23.6",
    "@tiptap/extension-image": "^3.23.6",
    "@tiptap/extension-placeholder": "^3.23.6",
    "@tiptap/extension-subscript": "^3.23.6",
    "@tiptap/extension-superscript": "^3.23.6",
    "@tiptap/extension-table": "^3.23.6",
    "@tiptap/extension-table-cell": "^3.23.6",
    "@tiptap/extension-table-header": "^3.23.6",
    "@tiptap/extension-table-row": "^3.23.6",
    "@tiptap/extension-task-item": "^3.23.6",
    "@tiptap/extension-task-list": "^3.23.6",
    "@tiptap/extension-text-align": "^3.23.6",
    "@tiptap/extension-text-style": "^3.23.6",
    "@tiptap/extension-underline": "^3.23.6",
    "@tiptap/pm": "^3.23.6",
    "@tiptap/react": "^3.23.6",
    "@tiptap/starter-kit": "^3.23.6",
    "date-fns": "^4.1.0",
    "groq-sdk": "^1.2.0",
    "lucide-react": "^1.14.0",
    "marked": "^18.0.5",
    "mermaid": "^11.15.0",
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "recharts": "^3.8.1",
    "zustand": "^5.0.13"
  },
  "devDependencies": {
    "@playwright/test": "^1.60.0",
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.2",
    "@vitest/coverage-v8": "^3.2.4",
    "eslint": "^9",
    "eslint-config-next": "16.2.6",
    "jsdom": "^29.1.1",
    "playwright": "^1.60.0",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^3.2.4"
  },
  "overrides": {
    "postcss": "^8.5.10"
  }
}
````

## File: app/(dashboard)/dashboard/page.tsx
````typescript
'use client'

import { useState, useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import NoteList from '@/components/notes/NoteList'
import NoteEditor from '@/components/editor/NoteEditor'
import FavoriteNotes from '@/components/notes/FavoriteNotes'
import TrashNotes from '@/components/notes/TrashNotes'
import SearchResults from '@/components/notes/SearchResults'
import AdvancedSearchPanel from '@/components/notes/AdvancedSearchPanel'
import DashboardStats from '@/components/dashboard/DashboardStats'
import TaskList from '@/components/tasks/TaskList'
import FilesView from '@/components/files/FilesView'
import CalendarView from '@/components/calendar/CalendarView'
import SpacesView from '@/components/spaces/SpacesView'
import SharedWithMeView from '@/components/spaces/SharedWithMeView'
import TemplatesView from '@/components/templates/TemplatesView'
import TagsView from '@/components/tags/TagsView'
import AiAssistantView from '@/components/ai/AiAssistantView'
import { getAllNotesWithNotebook, createQuickNote, type NoteWithNotebook } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { BookOpen, FileText, Plus } from 'lucide-react'

function HomePanel() {
  const { notebooks } = useNotebookStore()
  const { setCurrentView } = useUIStore()
  const { setSelectedNotebook } = useNotebookStore()

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches'

  const handleNotebookClick = (notebook: (typeof notebooks)[number]) => {
    setSelectedNotebook(notebook)
    setCurrentView('notebooks')
  }

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-5xl mx-auto px-10 py-12 flex flex-col gap-8">
        {/* Greeting */}
        <div>
          <h1 className="text-3xl font-semibold text-foreground">{greeting}</h1>
          <p className="text-muted text-sm mt-1">Tu espacio para pensar y crear</p>
        </div>

        {/* Stats + charts */}
        <DashboardStats />

        {/* Notebooks grid */}
        {notebooks.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
              Libretas recientes
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {notebooks.slice(0, 6).map((nb) => (
                <button
                  key={nb.id}
                  type="button"
                  onClick={() => handleNotebookClick(nb)}
                  className="flex items-center gap-3 p-4 bg-panel border border-border rounded-xl hover:border-accent/40 hover:bg-surface transition cursor-pointer text-left"
                >
                  <div className="w-8 h-8 bg-accent/15 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen size={15} className="text-accent" />
                  </div>
                  <span className="text-sm text-foreground font-medium truncate">
                    {nb.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {notebooks.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="w-16 h-16 bg-panel border border-border rounded-2xl flex items-center justify-center">
              <FileText size={28} className="text-subtle" />
            </div>
            <div>
              <p className="text-foreground font-medium">Aún no tienes libretas</p>
              <p className="text-muted text-sm mt-1">
                Crea una libreta desde el sidebar para empezar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AllNotesView() {
  const [notes, setNotes] = useState<NoteWithNotebook[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const { setSelectedNote, selectedNote, addNote } = useNoteStore()
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { setCurrentView } = useUIStore()

  useEffect(() => {
    getAllNotesWithNotebook()
      .then(setNotes)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = async () => {
    if (notebooks.length === 0) return
    setCreating(true)
    try {
      const note = await createQuickNote(notebooks[0].id)
      addNote(note)
      setSelectedNote(note)
      setSelectedNotebook(notebooks[0])
      setCurrentView('notebooks')
    } catch {
      // error
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      {/* Header */}
      <div className="h-14 px-4 border-b border-border flex items-center justify-between gap-2">
        <div>
          <h2 className="font-semibold text-foreground text-sm">Notas</h2>
          {!loading && (
            <p className="text-xs text-muted">
              {notes.length} nota{notes.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <button
          type="button"
          title="Nueva nota"
          onClick={handleCreate}
          disabled={creating || notebooks.length === 0}
          className="p-1.5 text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition cursor-pointer shrink-0 disabled:opacity-40"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <p className="text-xs text-muted text-center mt-8">Cargando...</p>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 px-4 text-center">
            <FileText size={32} className="text-subtle" />
            <p className="text-sm text-muted">Sin notas aún</p>
            {notebooks.length > 0 && (
              <button
                type="button"
                onClick={handleCreate}
                className="text-sm text-accent hover:text-accent-light transition cursor-pointer"
              >
                Crear primera nota
              </button>
            )}
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              onClick={() => setSelectedNote(note)}
              className={`px-4 py-3.5 border-b border-border cursor-pointer transition ${
                selectedNote?.id === note.id
                  ? 'bg-elevated border-l-2 border-l-accent'
                  : 'hover:bg-surface'
              }`}
            >
              <p className="text-sm font-medium text-foreground truncate">
                {note.title || 'Sin título'}
              </p>
              {note.notebooks?.name && (
                <p className="text-[10px] text-accent mt-0.5 flex items-center gap-1">
                  <BookOpen size={9} />
                  {note.notebooks.name}
                </p>
              )}
              <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                {extractTextPreview(note.content) || 'Sin contenido'}
              </p>
              <p className="text-xs text-subtle mt-1.5">
                {format(new Date(note.updated_at), 'd MMM yyyy', { locale: es })}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { currentView, isFocusMode, isNoteListCollapsed } = useUIStore()

  const showHome = currentView === 'home'
  const showAllNotes = currentView === 'all-notes'
  const showNoteList =
    currentView === 'notebooks' || currentView === 'notebooks-view'
  const showFavorites = currentView === 'favorites'
  const showTrash = currentView === 'trash'
  const showSearch = currentView === 'search'
  const showAdvancedSearch = currentView === 'advanced-search'
  const showTags = currentView === 'tags-view'
  const showTasks = currentView === 'tasks'
  const showFiles = currentView === 'files'
  const showCalendar = currentView === 'calendar'
  const showSpaces = currentView === 'spaces'
  const showShared = currentView === 'shared'
  const showTemplates = currentView === 'templates'
  const showAiAssistant = currentView === 'ai-assistant'

  const showEditor = !showHome && !showAdvancedSearch && !showTags && !showTasks && !showFiles && !showCalendar && !showSpaces && !showShared && !showTemplates && !showAiAssistant

  return (
    <div className="flex h-full bg-background">
      {!isFocusMode && (
        <>
          {showHome && <HomePanel />}

          {/* Paneles de lista de notas — colapsables con animación */}
          {(showAllNotes || showNoteList || showFavorites || showTrash || showSearch) && (
            <div
              className="shrink-0 overflow-hidden transition-all duration-300 ease-in-out"
              style={{ width: isNoteListCollapsed ? 0 : 288 }}
            >
              {showAllNotes && <AllNotesView />}
              {showNoteList && <NoteList />}
              {showFavorites && <FavoriteNotes />}
              {showTrash && <TrashNotes />}
              {showSearch && <SearchResults />}
            </div>
          )}

          {showAdvancedSearch && <AdvancedSearchPanel />}
          {showTags && <TagsView />}
          {showTasks && <TaskList />}
          {showFiles && <FilesView />}
          {showCalendar && <CalendarView />}
          {showSpaces && <SpacesView />}
          {showShared && <SharedWithMeView />}
          {showTemplates && <TemplatesView />}
          {showAiAssistant && <AiAssistantView />}
        </>
      )}
      {showEditor && <NoteEditor />}
    </div>
  )
}
````

## File: components/notes/NoteList.tsx
````typescript
'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import {
  Plus, Star, PanelLeftClose, Pin,
  ArrowUpDown, LayoutList, LayoutGrid, Check, MoreHorizontal,
} from 'lucide-react'
import { useNoteStore } from '@/store/noteStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useUIStore } from '@/store/uiStore'
import { extractTextPreview } from '@/lib/utils/tiptap'
import { togglePin, updateNoteColor, trashNote } from '@/lib/supabase/notes'
import { NOTE_COLORS, isNoteColor, type NoteColor } from '@/lib/constants/colors'
import NotePopoverMenu from './NotePopoverMenu'
import MoveNoteModal from './MoveNoteModal'
import EmptyState from '@/components/ui/EmptyState'
import type { Note } from '@/types'

type SortOption = 'updated_at_desc' | 'created_at_desc' | 'title_asc' | 'size_desc'
type ViewMode = 'list' | 'grid'

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'updated_at_desc', label: 'Última edición' },
  { value: 'created_at_desc', label: 'Fecha de creación' },
  { value: 'title_asc', label: 'Título A-Z' },
  { value: 'size_desc', label: 'Más largas' },
]

function isSortOption(value: string | null): value is SortOption {
  return SORT_OPTIONS.some((o) => o.value === value)
}

function sortNotes(notes: Note[], sort: SortOption): Note[] {
  const arr = [...notes]
  arr.sort((a, b) => {
    if (sort === 'title_asc') return (a.title || '').localeCompare(b.title || '', 'es')
    if (sort === 'size_desc') {
      return JSON.stringify(b.content).length - JSON.stringify(a.content).length
    }
    if (sort === 'created_at_desc') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }
    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  })
  return arr
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

interface SortDropdownProps {
  sort: SortOption
  onChange: (sort: SortOption) => void
}

function SortDropdown({ sort, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        title="Ordenar notas"
        onClick={() => setOpen((v) => !v)}
        className={[
          'flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] transition-all duration-150 cursor-pointer',
          open
            ? 'bg-surface text-foreground'
            : 'text-muted hover:bg-surface hover:text-foreground',
        ].join(' ')}
      >
        <ArrowUpDown size={12} />
        <span className="truncate max-w-[110px]">
          {SORT_OPTIONS.find((o) => o.value === sort)?.label}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-8 z-50 bg-panel border border-border rounded-xl shadow-2xl w-48 py-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
              className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
            >
              {opt.label}
              {sort === opt.value && <Check size={13} className="text-accent shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface NoteCardProps {
  note: Note
  isSelected: boolean
  onSelect: () => void
  onTogglePin: () => void
  onMenuClick: (e: React.MouseEvent) => void
  index: number
  view: ViewMode
}

function NoteCard({ note, isSelected, onSelect, onTogglePin, onMenuClick, index, view }: NoteCardProps) {
  const preview = extractTextPreview(note.content, view === 'grid' ? 140 : 80)
  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: note.id,
    data: { type: 'note', noteId: note.id, currentNotebookId: note.notebook_id },
  })

  const colorHex = isNoteColor(note.color) ? NOTE_COLORS[note.color] : null

  const pinButton = (
    <button
      type="button"
      title={note.is_pinned ? 'Desanclar nota' : 'Anclar nota'}
      onClick={(e) => {
        e.stopPropagation()
        onTogglePin()
      }}
      className={[
        'absolute top-2 right-2 z-10 p-1 rounded-md transition-all duration-150 cursor-pointer',
        note.is_pinned
          ? 'text-accent opacity-100'
          : 'text-muted opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-surface',
      ].join(' ')}
    >
      <Pin size={12} className={note.is_pinned ? 'fill-accent' : ''} />
    </button>
  )

  const menuButton = (
    <button
      type="button"
      title="Más opciones"
      onClick={onMenuClick}
      className="absolute top-2 right-9 z-10 p-1 rounded-md text-muted opacity-0 group-hover:opacity-100 hover:text-foreground hover:bg-surface transition-all duration-150 cursor-pointer"
    >
      <MoreHorizontal size={14} />
    </button>
  )

  if (view === 'grid') {
    return (
      <div
        className="note-card-enter relative group"
        style={{
          animationDelay: `${index * 35}ms`,
          animationFillMode: 'both',
          opacity: isDragging ? 0.4 : 1,
        }}
      >
        <button
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          type="button"
          data-testid="note-card"
          onClick={onSelect}
          className={[
            'w-full h-full text-left p-3 rounded-lg flex flex-col gap-1.5 cursor-pointer',
            'border transition-all duration-200 ease-out',
            isSelected
              ? 'bg-foreground/5 border-accent/60'
              : 'border-border/40 hover:bg-foreground/[0.03] hover:border-accent/30',
          ].join(' ')}
        >
          {(note.cover_url || note.cover_gradient) && (
            <div
              className="-mx-3 -mt-3 mb-1 h-[60px] rounded-t-lg bg-cover bg-center"
              style={
                note.cover_url
                  ? { backgroundImage: `url(${note.cover_url})` }
                  : { background: note.cover_gradient ?? undefined }
              }
            />
          )}
          {note.emoji && (
            <span className="block text-2xl leading-none mb-0.5">{note.emoji}</span>
          )}
          <p
            className={[
              'text-sm font-medium leading-snug truncate pr-14 transition-colors duration-150',
              isSelected ? 'text-foreground' : 'text-foreground/85 group-hover:text-foreground',
            ].join(' ')}
          >
            {note.title || 'Sin título'}
          </p>
          {preview && (
            <p className="text-xs text-muted line-clamp-3 leading-relaxed flex-1">
              {preview}
            </p>
          )}
          <div className="flex items-center justify-between mt-auto pt-1">
            <span className="text-[10px] text-subtle tabular-nums">
              {formatDate(note.updated_at)}
            </span>
            {note.is_favorite && (
              <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />
            )}
          </div>
        </button>
        {pinButton}
        {menuButton}
      </div>
    )
  }

  return (
    <div
      className="note-card-enter relative group"
      style={{
        animationDelay: `${index * 35}ms`,
        animationFillMode: 'both',
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <button
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        type="button"
        data-testid="note-card"
        onClick={onSelect}
        style={
          colorHex
            ? { borderLeftColor: colorHex, borderLeftWidth: '3px', borderLeftStyle: 'solid' }
            : undefined
        }
        className={[
          'w-full text-left px-4 py-3 relative',
          'border-b border-border/30',
          'transition-all duration-200 ease-out cursor-pointer',
          'border-l-2',
          colorHex
            ? isSelected
              ? 'bg-foreground/5'
              : 'hover:bg-foreground/[0.03]'
            : isSelected
              ? 'bg-foreground/5 border-l-accent'
              : 'border-l-transparent hover:bg-foreground/[0.03] hover:border-l-accent/30',
        ].join(' ')}
      >
        {/* Title */}
        <p
          className={[
            'text-sm font-medium leading-snug truncate pr-14 transition-colors duration-150',
            isSelected ? 'text-foreground' : 'text-foreground/85 group-hover:text-foreground',
          ].join(' ')}
        >
          {note.emoji && <span className="text-base mr-1.5 align-middle">{note.emoji}</span>}
          {note.title || 'Sin título'}
        </p>

        {/* Preview */}
        {preview && (
          <p className="text-xs text-muted mt-0.5 line-clamp-2 leading-relaxed">
            {preview}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[10px] text-subtle tabular-nums">
            {formatDate(note.updated_at)}
          </span>
          {note.is_favorite && (
            <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />
          )}
        </div>
      </button>
      {pinButton}
      {menuButton}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-subtle">
      {children}
    </p>
  )
}

export default function NoteList() {
  const { notes, selectedNote, setSelectedNote, createNote, fetchNotes, updateNote, deleteNote } =
    useNoteStore()
  const { selectedNotebook } = useNotebookStore()
  const { setNoteListCollapsed } = useUIStore()

  const notebookKey = selectedNotebook?.id ?? 'all'
  const [view, setView] = useState<ViewMode>('list')
  const [sort, setSort] = useState<SortOption>('updated_at_desc')
  const [colorFilter, setColorFilter] = useState<NoteColor | null>(null)
  const [popoverState, setPopoverState] = useState<{ noteId: string; anchorRect: DOMRect } | null>(
    null
  )
  const [moveNote, setMoveNote] = useState<Note | null>(null)

  useEffect(() => {
    if (selectedNotebook?.id) {
      fetchNotes(selectedNotebook.id)
    }
  }, [selectedNotebook?.id, fetchNotes])

  // Cargar preferencia de vista (una vez, tras montar — evita mismatch de hidratación)
  useEffect(() => {
    const stored = localStorage.getItem('noteevo-notes-view')
    if (stored === 'grid' || stored === 'list') setView(stored)
  }, [])

  // Cargar preferencia de orden por libreta
  useEffect(() => {
    const stored = localStorage.getItem(`noteevo-sort-${notebookKey}`)
    setSort(isSortOption(stored) ? stored : 'updated_at_desc')
    setColorFilter(null) // limpiar filtro de color al cambiar de libreta
  }, [notebookKey])

  const changeView = (next: ViewMode) => {
    setView(next)
    localStorage.setItem('noteevo-notes-view', next)
  }

  const changeSort = (next: SortOption) => {
    setSort(next)
    localStorage.setItem(`noteevo-sort-${notebookKey}`, next)
  }

  const handleTogglePin = async (note: Note) => {
    const newVal = !note.is_pinned
    updateNote(note.id, { is_pinned: newVal })
    try {
      await togglePin(note.id, newVal)
    } catch {
      updateNote(note.id, { is_pinned: !newVal })
    }
  }

  const handleMenuClick = (e: React.MouseEvent, note: Note) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    setPopoverState({ noteId: note.id, anchorRect: rect })
  }

  const handleColorChange = async (note: Note, color: NoteColor | null) => {
    const prev = note.color ?? null
    updateNote(note.id, { color }) // optimista
    try {
      await updateNoteColor(note.id, color)
    } catch {
      updateNote(note.id, { color: prev }) // rollback
    }
  }

  const handleDelete = async (note: Note) => {
    deleteNote(note.id) // optimista: lo quita de la lista
    try {
      await trashNote(note.id)
    } catch {
      // rollback: recargar la libreta para restaurar el estado real
      if (selectedNotebook?.id) fetchNotes(selectedNotebook.id)
    }
  }

  const popoverNote = popoverState
    ? notes.find((n) => n.id === popoverState.noteId) ?? null
    : null

  const sorted = useMemo(() => sortNotes(notes, sort), [notes, sort])
  const visible = useMemo(
    () => (colorFilter ? sorted.filter((n) => n.color === colorFilter) : sorted),
    [sorted, colorFilter]
  )
  const pinned = useMemo(() => visible.filter((n) => n.is_pinned), [visible])
  const rest = useMemo(() => visible.filter((n) => !n.is_pinned), [visible])

  // Colores realmente en uso entre las notas actuales (para el filtro del header)
  const usedColors = useMemo(() => {
    const present = new Set(notes.map((n) => n.color).filter(isNoteColor))
    return (Object.keys(NOTE_COLORS) as NoteColor[]).filter((c) => present.has(c))
  }, [notes])

  const renderCards = (arr: Note[], startIndex: number) =>
    arr.map((note, i) => (
      <NoteCard
        key={note.id}
        note={note}
        view={view}
        isSelected={selectedNote?.id === note.id}
        onSelect={() => setSelectedNote(note)}
        onTogglePin={() => handleTogglePin(note)}
        onMenuClick={(e) => handleMenuClick(e, note)}
        index={startIndex + i}
      />
    ))

  const gridWrap = (children: React.ReactNode) => (
    <div className="grid grid-cols-2 gap-2 p-2">{children}</div>
  )

  return (
    <div className="w-72 h-screen bg-panel border-r border-border flex flex-col shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-foreground truncate">
            {selectedNotebook?.name ?? 'Notas'}
          </h2>
          <p className="text-[11px] text-subtle">
            {notes.length} {notes.length === 1 ? 'nota' : 'notas'}
          </p>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          {selectedNotebook && (
            <button
              type="button"
              title="Nueva nota"
              data-testid="new-note-btn"
              onClick={() => createNote(selectedNotebook.id)}
              className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-foreground transition-all duration-150 active:scale-90 cursor-pointer"
            >
              <Plus size={14} />
            </button>
          )}
          <button
            type="button"
            title="Ocultar panel"
            onClick={() => setNoteListCollapsed(true)}
            className="p-1.5 rounded-lg hover:bg-surface text-muted hover:text-foreground transition-all duration-150 active:scale-90 cursor-pointer"
          >
            <PanelLeftClose size={14} />
          </button>
        </div>
      </div>

      {/* Controls: sort + view toggle */}
      {notes.length > 0 && (
        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-border/60 shrink-0">
          <SortDropdown sort={sort} onChange={changeSort} />

          <div className="flex items-center gap-0.5">
            <button
              type="button"
              title="Vista de lista"
              onClick={() => changeView('list')}
              className={[
                'p-1.5 rounded-md transition-all duration-150 cursor-pointer',
                view === 'list'
                  ? 'bg-surface text-foreground'
                  : 'text-muted hover:bg-surface hover:text-foreground',
              ].join(' ')}
            >
              <LayoutList size={14} />
            </button>
            <button
              type="button"
              title="Vista de galería"
              onClick={() => changeView('grid')}
              className={[
                'p-1.5 rounded-md transition-all duration-150 cursor-pointer',
                view === 'grid'
                  ? 'bg-surface text-foreground'
                  : 'text-muted hover:bg-surface hover:text-foreground',
              ].join(' ')}
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Filtro por color */}
      {usedColors.length > 0 && (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-border/60 shrink-0 overflow-x-auto scrollbar-thin">
          <button
            type="button"
            onClick={() => setColorFilter(null)}
            className={[
              'text-[11px] px-2 py-0.5 rounded-md transition cursor-pointer whitespace-nowrap shrink-0',
              colorFilter === null
                ? 'bg-surface text-foreground'
                : 'text-muted hover:text-foreground',
            ].join(' ')}
          >
            Todos
          </button>
          {usedColors.map((c) => (
            <button
              key={c}
              type="button"
              title={c}
              onClick={() => setColorFilter(c)}
              className={[
                'shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition cursor-pointer',
                colorFilter === c ? 'bg-surface ring-1 ring-border' : 'hover:bg-surface',
              ].join(' ')}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: NOTE_COLORS[c] }} />
            </button>
          ))}
          {colorFilter && (
            <button
              type="button"
              onClick={() => setColorFilter(null)}
              className="text-[11px] text-muted hover:text-foreground ml-auto whitespace-nowrap shrink-0 cursor-pointer"
            >
              Limpiar filtro
            </button>
          )}
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {notes.length === 0 ? (
          <EmptyState
            variant="notes"
            title="Sin notas aquí"
            description="Crea tu primera nota y empieza a escribir"
            action={
              selectedNotebook
                ? { label: 'Crear primera nota', onClick: () => createNote(selectedNotebook.id) }
                : undefined
            }
          />
        ) : visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 px-6 text-center">
            <p className="text-sm text-subtle">Sin notas de este color</p>
            <button
              type="button"
              onClick={() => setColorFilter(null)}
              className="text-xs text-accent hover:text-accent/80 transition cursor-pointer"
            >
              Limpiar filtro
            </button>
          </div>
        ) : (
          <>
            {pinned.length > 0 && (
              <>
                <SectionLabel>Ancladas</SectionLabel>
                {view === 'grid' ? gridWrap(renderCards(pinned, 0)) : renderCards(pinned, 0)}
                {rest.length > 0 && <SectionLabel>Otras</SectionLabel>}
              </>
            )}
            {view === 'grid'
              ? gridWrap(renderCards(rest, pinned.length))
              : renderCards(rest, pinned.length)}
          </>
        )}
      </div>

      {popoverState && popoverNote && (
        <NotePopoverMenu
          note={popoverNote}
          anchorRect={popoverState.anchorRect}
          onClose={() => setPopoverState(null)}
          onColorChange={(color) => {
            handleColorChange(popoverNote, color)
            setPopoverState(null)
          }}
          onPinToggle={() => {
            handleTogglePin(popoverNote)
            setPopoverState(null)
          }}
          onMove={() => {
            setMoveNote(popoverNote)
            setPopoverState(null)
          }}
          onDelete={() => {
            handleDelete(popoverNote)
            setPopoverState(null)
          }}
        />
      )}

      {moveNote && (
        <MoveNoteModal
          note={moveNote}
          onMoved={() => {
            if (selectedNotebook?.id) fetchNotes(selectedNotebook.id)
          }}
          onClose={() => setMoveNote(null)}
        />
      )}
    </div>
  )
}
````

## File: types/index.ts
````typescript
export interface Notebook {
  id: string
  user_id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
  space_id?: string | null
}

export interface Note {
  id: string
  user_id: string
  notebook_id: string | null
  title: string
  content: Record<string, unknown>
  is_favorite: boolean
  is_trashed: boolean
  is_pinned?: boolean
  emoji?: string | null
  cover_url?: string | null
  cover_gradient?: string | null
  color?: string | null
  // Tipografía POR NOTA (Phase 17 id:61). null = hereda el default global de
  // user_profiles. note_font_family es una clave de EditorFontKey (sans/serif/...).
  note_font_family?: string | null
  note_font_size?: number | null
  note_line_height?: number | null
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  user_id: string
  name: string
  created_at: string
}

export interface NoteTag {
  note_id: string
  tag_id: string
}

export interface TagWithCount {
  id: string
  name: string
  note_count: number
  created_at: string
}

export interface Task {
  id: string
  user_id: string
  note_id: string | null
  title: string
  description: string | null
  due_date: string | null
  start_time: string | null
  end_time: string | null
  reminder_at: string | null
  priority: 'low' | 'medium' | 'high'
  is_flagged: boolean
  is_completed: boolean
  completed_at: string | null
  created_at: string
  reminder_7days_sent: boolean
  reminder_1day_sent: boolean
}

export interface Attachment {
  id: string
  user_id: string
  note_id: string | null
  file_name: string
  file_type: string | null
  file_size: number | null
  storage_path: string
  created_at: string
}

export type SpaceRole = 'viewer' | 'editor' | 'admin'

export interface Space {
  id: string
  name: string
  description: string | null
  owner_id: string
  created_at: string
  updated_at: string
  user_role?: SpaceRole | 'owner'
}

export interface SpaceMember {
  space_id: string
  user_id: string
  role: SpaceRole
  invited_by: string | null
  joined_at: string
  email?: string
}

export interface NoteVersion {
  id: string
  note_id: string
  user_id: string
  title: string
  content: Record<string, unknown>
  version_number: number
  created_at: string
}

export interface Template {
  id: string
  user_id: string | null
  name: string
  description: string | null
  content: Record<string, unknown>
  category: string | null
  is_builtin: boolean
  created_at: string
  updated_at: string
}

export interface SharedNote {
  id: string
  note_id: string
  user_id: string
  public_slug: string
  is_active: boolean
  access_level: 'none' | 'view' | 'edit'
  view_count: number
  expires_at: string | null
  created_at: string
}

export interface UserProfile {
  id: string
  display_name: string | null
  avatar_url: string | null
  bio: string | null
  theme: 'dark' | 'light' | 'system'
  language: string
  timezone: string
  email_notifications: boolean
  onboarding_completed: boolean
  // Tipografía configurable del editor (Phase 17 id:61). Migración aplicada:
  // editor_font_family text DEFAULT 'sans', editor_font_size int DEFAULT 16,
  // editor_line_height numeric DEFAULT 1.7.
  editor_font_family: string | null
  editor_font_size: number | null
  editor_line_height: number | null
  created_at: string
  updated_at: string
}

export type NotificationType = 'space_invite' | 'task_reminder' | 'note_shared' | 'space_removed'

export interface Notification {
  id: string
  user_id: string
  type: NotificationType
  title: string
  body: string | null
  data: Record<string, unknown> | null
  is_read: boolean
  created_at: string
}
````

## File: app/globals.css
````css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Colors are NON-inline so utilities compile to var(--color-*) and respond
   to the [data-theme='light'] overrides below. Using `@theme inline` here
   bakes the dark literal into every bg / text / border utility, which is
   exactly why light mode failed to flip anything but explicit rules. */
@theme {
  --color-background: #0f0f0f;
  --color-panel:      #1a1a1a;
  --color-surface:    #242424;
  --color-elevated:   #2a2a2a;
  --color-border:     #2d2d2d;
  --color-accent:     #1a7a4a;
  --color-accent-light: #1e8f57;
  --color-danger:     #ef4444;
  --color-foreground: #e8e8e8;
  --color-muted:      #8a8a8a;
  --color-subtle:     #4a4a4a;
  --color-code:       #86efac;
}

/* Fonts stay inline — they intentionally resolve to the next/font variables. */
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* Default (dark) color-scheme so browser form elements render correctly */
:root {
  color-scheme: dark;
}

[data-theme='light'] {
  color-scheme: light;
  --color-background: #f5f5f5;
  --color-panel:      #ffffff;
  --color-surface:    #f0f0f0;
  --color-elevated:   #e8e8e8;
  --color-border:     #d4d4d4;
  --color-foreground: #1a1a1a;
  --color-muted:      #6b6b6b;
  --color-subtle:     #8a8a8a;
  --color-accent:     #1a7a4a;
  --color-accent-light: #1e8f57;
  --color-danger:     #ef4444;
  --color-code:       #059669;
}

/* Explicit light-mode background/color for structural containers.
   Guards against any CSS-variable cascade edge-cases in Tailwind v4. */
[data-theme='light'] body {
  background-color: #f5f5f5;
  color: #1a1a1a;
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
}

/* ── Light-mode input/select text colour (browser defaults can conflict) ── */
[data-theme='light'] input,
[data-theme='light'] textarea,
[data-theme='light'] select {
  color: #1a1a1a;
  background-color: transparent;
}

/* ── Task List ── */
ul[data-type="taskList"] {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

ul[data-type="taskList"] li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 4px;
  padding: 0;
}

ul[data-type="taskList"] li > label {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: 3px;
  -webkit-user-select: none;
  user-select: none;
}

ul[data-type="taskList"] li > label input[type="checkbox"] {
  width: 14px;
  height: 14px;
  accent-color: #1a7a4a;
  cursor: pointer;
  border-radius: 3px;
  margin: 0;
  padding: 0;
  display: block;
}

ul[data-type="taskList"] li > div {
  flex: 1;
  min-width: 0;
}

/* ── TipTap / ProseMirror dark theme ── */
.ProseMirror {
  color: var(--color-foreground);
  /* Tipografía configurable (Phase 17 id:61): las variables las inyecta
     NoteEditor desde el perfil; los valores tras la coma son los buenos
     defaults base (fallback cuando la preferencia es null). */
  font-family: var(--editor-font-family, var(--font-geist-sans), Arial, Helvetica, sans-serif);
  font-size: var(--editor-font-size, 16px);
  line-height: var(--editor-line-height, 1.7);
  outline: none;
}

/* Sin hueco extra al inicio del documento. */
.ProseMirror > :first-child {
  margin-top: 0;
}

.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  color: var(--color-subtle);
  float: left;
  pointer-events: none;
  height: 0;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4 {
  color: var(--color-foreground);
  font-weight: 600;
  line-height: 1.25;
}

/* Ritmo vertical coherente: headings respiran arriba, se pegan a su contenido. */
.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3 {
  text-wrap: balance;
}

.ProseMirror h1 { font-size: 1.75rem; margin: 1.4em 0 0.5em; }
.ProseMirror h2 { font-size: 1.375rem; margin: 1.4em 0 0.5em; }
.ProseMirror h3 { font-size: 1.125rem; margin: 1.4em 0 0.5em; }

.ProseMirror strong { color: var(--color-foreground); }

.ProseMirror em { color: var(--color-muted); }

.ProseMirror p { margin: 0.75em 0 0; }

.ProseMirror ul,
.ProseMirror ol {
  padding-left: 1.5rem;
  margin: 0.75em 0 0;
}

.ProseMirror li { margin: 0.2rem 0; }

.ProseMirror code {
  background: var(--color-surface);
  color: var(--color-code);
  padding: 0.1em 0.4em;
  border-radius: 4px;
  font-size: 0.85em;
  font-family: var(--font-geist-mono), monospace;
}

.ProseMirror pre {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin: 0.75rem 0;
}

.ProseMirror pre code {
  background: none;
  color: var(--color-code);
  padding: 0;
  font-size: 0.875em;
}

.ProseMirror blockquote {
  border-left: 3px solid var(--color-accent);
  padding: 0.1em 0 0.1em 1rem;
  color: var(--color-muted);
  font-style: italic;
  margin: 1em 0 0;
}

.ProseMirror hr {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 1.5rem 0;
}

.ProseMirror mark {
  background-color: color-mix(in srgb, #1a7a4a 25%, transparent);
  color: var(--color-foreground);
  border-radius: 2px;
  padding: 0.05em 0.2em;
}

.ProseMirror img {
  max-width: 100%;
  border-radius: 8px;
  margin: 0.75rem 0;
  border: 1px solid var(--color-border);
}

.ProseMirror a {
  color: var(--color-accent-light);
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* ── Mermaid diagrams ── */
.mermaid-container svg {
  max-width: 100%;
  height: auto;
}
.mermaid-container .label {
  color: var(--color-foreground) !important;
}

/* ── TipTap Table ── */
.ProseMirror table {
  border-collapse: collapse;
  width: 100%;
  margin: 1rem 0;
  font-size: 0.875rem;
}
.ProseMirror th,
.ProseMirror td {
  border: 1px solid var(--color-border);
  padding: 8px 12px;
  text-align: left;
  vertical-align: top;
}
.ProseMirror th {
  background: var(--color-surface);
  font-weight: 600;
  color: var(--color-foreground);
}
.ProseMirror tr:hover td {
  background: var(--color-surface);
}

/* ── ProseMirror: light mode overrides ── */
[data-theme='light'] .ProseMirror {
  color: #1a1a1a;
}
[data-theme='light'] .ProseMirror h1,
[data-theme='light'] .ProseMirror h2,
[data-theme='light'] .ProseMirror h3,
[data-theme='light'] .ProseMirror h4 {
  color: #0f0f0f;
}
[data-theme='light'] .ProseMirror strong { color: #0f0f0f; }
[data-theme='light'] .ProseMirror em { color: #1a1a1a; }
[data-theme='light'] .ProseMirror code {
  background: #e8e8e8;
  color: #166534;
}
[data-theme='light'] .ProseMirror pre {
  background: #e8e8e8;
  border-color: #d4d4d4;
}
[data-theme='light'] .ProseMirror blockquote {
  color: #6b6b6b;
  border-left-color: #d4d4d4;
}
[data-theme='light'] .ProseMirror th {
  background: #f0f0f0;
  color: #0f0f0f;
}

/* ── Animaciones ── */
@keyframes noteCardEnter {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.note-card-enter {
  animation: noteCardEnter 0.22s ease-out;
}

@keyframes emptyStateEnter {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.empty-state-enter {
  animation: emptyStateEnter 0.35s ease-out both;
}

@keyframes toastEnter {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.toast-enter {
  animation: toastEnter 0.18s ease-out forwards;
}

/* ── Typewriter mode (id:65) ── */
.typewriter-mode .ProseMirror > * {
  opacity: 0.35;
  transition: opacity 0.15s;
}
.typewriter-mode .ProseMirror > *.is-active-node {
  opacity: 1;
}

/* ── Toolbar button click feedback (id:65) ── */
@keyframes toolbarPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(26, 122, 74, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(26, 122, 74, 0);
    transform: scale(0.96);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(26, 122, 74, 0);
    transform: scale(1);
  }
}

.toolbar-pulse {
  animation: toolbarPulse 0.28s ease-out;
}

/* ── Command palette entrance (id:66) ── */
@keyframes paletteIn {
  from {
    opacity: 0;
    transform: scale(0.97) translateY(-6px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-palette-in {
  animation: paletteIn 130ms ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  .animate-palette-in {
    animation: none;
  }
}
````

## File: components/sidebar/Sidebar.tsx
````typescript
'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useNotebookStore } from '@/store/notebookStore'
import { useUIStore } from '@/store/uiStore'
import { useTagStore } from '@/store/tagStore'
import { useProfileStore } from '@/store/profileStore'
import { getNotebooks, createNotebook, deleteNotebook, updateNotebook } from '@/lib/supabase/notebooks'
import { getTags } from '@/lib/supabase/tags'
import { getPendingTaskCount } from '@/lib/supabase/tasks'
import { getMySpaces } from '@/lib/supabase/spaces'
import { getProfile, updateProfile } from '@/lib/supabase/profile'
import { useSpaceStore } from '@/store/spaceStore'
import {
  Home, FileText, BookOpen, Star, Trash2, LogOut,
  Plus, X, Search, Tag, CheckSquare, Paperclip,
  Calendar, Users, Sparkles, ChevronDown, ChevronRight, ChevronLeft, Share2, LayoutTemplate, Pencil, Settings,
  Sun, Moon, Monitor, SlidersHorizontal, Upload,
} from 'lucide-react'
import NotificationBell from './NotificationBell'
import ImportModal from '@/components/notes/ImportModal'
import { useDroppable } from '@dnd-kit/core'
import type { Notebook, Space } from '@/types'

type View = 'home' | 'notebooks' | 'all-notes' | 'favorites' | 'trash' | 'search' | 'advanced-search' | 'tags-view' | 'notebooks-view' | 'tasks' | 'files' | 'calendar' | 'spaces' | 'shared' | 'settings' | 'templates' | 'ai-assistant'

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick: () => void
  collapsed: boolean
  disabled?: boolean
  badge?: number
}

function NavItem({ icon, label, active, onClick, collapsed, disabled, badge }: NavItemProps) {
  const base = 'w-full flex items-center rounded-lg transition-colors duration-150'
  const layout = collapsed ? 'justify-center p-2' : 'gap-2.5 px-3 py-2'
  const state = disabled
    ? 'opacity-30 pointer-events-none text-muted'
    : active
      ? 'bg-accent/15 text-accent'
      : 'text-muted hover:bg-surface hover:text-foreground cursor-pointer'

  const showBadge = badge !== undefined && badge > 0

  return (
    <button
      type="button"
      title={collapsed ? label : undefined}
      onClick={disabled ? undefined : onClick}
      className={`${base} ${layout} ${state}`}
    >
      <span className="relative shrink-0">
        {icon}
        {collapsed && showBadge && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full" />
        )}
      </span>
      {!collapsed && (
        <>
          <span className="text-sm font-medium flex-1 text-left truncate">{label}</span>
          {showBadge && (
            <span className="ml-auto shrink-0 min-w-[18px] h-[18px] px-1 bg-accent/20 text-accent text-[10px] font-semibold rounded-full flex items-center justify-center">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </>
      )}
    </button>
  )
}

function Separator() {
  return <div className="my-1 mx-2 h-px bg-border" />
}

function DroppableNotebook({
  notebook,
  isActive,
  onClick,
  onDelete,
  onRename,
}: {
  notebook: Notebook
  isActive: boolean
  onClick: () => void
  onDelete: (e: React.MouseEvent) => void
  onRename: (id: string, newName: string) => void
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `notebook-${notebook.id}`,
    data: { type: 'notebook', notebookId: notebook.id },
  })
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(notebook.name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) setTimeout(() => inputRef.current?.focus(), 0)
  }, [editing])

  const handleRename = () => {
    if (!name.trim() || name.trim() === notebook.name) {
      setName(notebook.name)
      setEditing(false)
      return
    }
    onRename(notebook.id, name.trim())
    setEditing(false)
  }

  if (editing) {
    return (
      <div
        ref={setNodeRef}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        <BookOpen size={14} className="text-muted shrink-0" />
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleRename()
            if (e.key === 'Escape') { setName(notebook.name); setEditing(false) }
          }}
          onBlur={handleRename}
          className="flex-1 bg-transparent text-xs text-foreground outline-none min-w-0"
          style={{ color: 'var(--color-foreground)' }}
        />
      </div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className={`group flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer transition ${
        isOver
          ? 'bg-accent/20 ring-1 ring-accent/40'
          : isActive
            ? 'bg-accent/15 text-accent'
            : 'text-muted hover:bg-surface hover:text-foreground'
      }`}
    >
      <div className="flex items-center gap-2 truncate min-w-0">
        <BookOpen size={14} className="shrink-0" />
        <span className="text-xs truncate">{notebook.name}</span>
      </div>
      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 shrink-0 ml-1">
        <button
          type="button"
          title="Renombrar libreta"
          onClick={(e) => { e.stopPropagation(); setEditing(true) }}
          className="p-0.5 text-muted hover:text-foreground transition cursor-pointer rounded"
        >
          <Pencil size={10} />
        </button>
        <button
          type="button"
          title="Eliminar libreta"
          onClick={onDelete}
          className="p-0.5 text-muted hover:text-danger transition cursor-pointer rounded"
        >
          <X size={11} />
        </button>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const {
    notebooks, setNotebooks, addNotebook,
    deleteNotebook: removeNotebook,
    renameNotebook,
    setSelectedNotebook, selectedNotebook,
  } = useNotebookStore()
  const { currentView, setCurrentView, searchQuery, setSearchQuery, theme, setTheme, isSidebarCollapsed: collapsed, setSidebarCollapsed: setCollapsed } = useUIStore()
  const { setTags } = useTagStore()
  const { spaces, setSpaces, selectedSpace, setSelectedSpace, removeSpace } = useSpaceStore()
  const { profile, setProfile } = useProfileStore()

  const [moreOpen, setMoreOpen] = useState(true)
  const [newName, setNewName] = useState('')
  const [creating, setCreating] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [notebooksOpen, setNotebooksOpen] = useState(true)
  const [spacesOpen, setSpacesOpen] = useState(true)
  const [pendingCount, setPendingCount] = useState(0)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [showImportModal, setShowImportModal] = useState(false)
  const accountMenuRef = useRef<HTMLDivElement>(null)

  const accountName = profile?.display_name || userEmail || 'NoteEvo'
  const accountInitials = (profile?.display_name || userEmail || 'N').slice(0, 2).toUpperCase()

  // Cerrar el menú de cuenta al hacer click fuera o pulsar Escape
  useEffect(() => {
    if (!accountMenuOpen) return
    const handlePointer = (e: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAccountMenuOpen(false)
    }
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [accountMenuOpen])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getNotebooks()
        setNotebooks(data)
      } catch {
        // sin notebooks
      }
    }
    load()
  }, [setNotebooks])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTags()
        setTags(data)
      } catch {
        // sin tags
      }
    }
    load()
  }, [setTags])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMySpaces()
        setSpaces(data)
        if (selectedSpace && !data.find((s) => s.id === selectedSpace.id)) {
          setSelectedSpace(null)
          setCurrentView('home')
        }
      } catch {
        // sin spaces
      }
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSpaces])

  useEffect(() => {
    const supabase = createClient()
    let userId: string | null = null

    supabase.auth.getUser().then(({ data: { user } }) => {
      userId = user?.id ?? null
      setUserEmail(user?.email ?? null)
    })

    const channel = supabase
      .channel('my-space-memberships')
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'space_members',
        },
        (payload) => {
          if (payload.old && (payload.old as { user_id: string }).user_id === userId) {
            const spaceId = (payload.old as { space_id: string }).space_id
            removeSpace(spaceId)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [removeSpace])

  useEffect(() => {
    const load = async () => {
      try {
        const count = await getPendingTaskCount()
        setPendingCount(count)
      } catch {
        // silencioso
      }
    }
    load()
  }, [])

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (p) {
          setProfile(p)
          if (p.theme) setTheme(p.theme)
        }
      })
      .catch(() => {})
  }, [setProfile, setTheme])

  // Hidratar preferencias de sidebar desde localStorage (solo cliente)
  useEffect(() => {
    const saved = localStorage.getItem('noteevo-sidebar-collapsed')
    if (saved !== null) setCollapsed(saved === 'true')
    const savedMore = localStorage.getItem('noteevo-sidebar-more-open')
    if (savedMore !== null) setMoreOpen(savedMore === 'true')
  }, [setCollapsed])

  useEffect(() => {
    localStorage.setItem('noteevo-sidebar-collapsed', String(collapsed))
  }, [collapsed])

  useEffect(() => {
    localStorage.setItem('noteevo-sidebar-more-open', String(moreOpen))
  }, [moreOpen])

  const handleCreate = async () => {
    if (!newName.trim()) return
    setCreating(true)
    try {
      const notebook = await createNotebook(newName.trim())
      addNotebook(notebook)
      setNewName('')
      setShowInput(false)
      setSelectedNotebook(notebook)
      setCurrentView('notebooks')
    } catch {
      // error silencioso
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    await deleteNotebook(id)
    removeNotebook(id)
  }

  const themeIcon = theme === 'light' ? <Sun size={18} /> : theme === 'system' ? <Monitor size={18} /> : <Moon size={18} />
  const themeLabel = theme === 'light' ? 'Modo claro' : theme === 'system' ? 'Sistema' : 'Modo oscuro'

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
    setTheme(next)
    updateProfile({ theme: next }).catch(() => {})
  }

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const goToDashboard = () => {
    if (pathname !== '/dashboard') router.push('/dashboard')
  }

  const handleNav = (view: View) => {
    setCurrentView(view)
    setSelectedNotebook(null)
    setSearchQuery('')
    goToDashboard()
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    setCurrentView(value.trim() ? 'search' : 'home')
    goToDashboard()
  }

  const handleNotebookClick = (notebook: Notebook) => {
    setSelectedNotebook(notebook)
    setCurrentView('notebooks')
    setSearchQuery('')
    goToDashboard()
  }

  const handleSpaceClick = (space: Space) => {
    setSelectedSpace(space)
    setCurrentView('spaces')
    setSearchQuery('')
    setSelectedNotebook(null)
    goToDashboard()
  }

  const isNotebooksActive =
    currentView === 'notebooks' || currentView === 'notebooks-view'

  return (
    <>
    <aside
      className={`h-screen bg-panel border-r border-border flex flex-col shrink-0 transition-[width] duration-200 ${
        collapsed ? 'w-14' : 'w-60'
      }`}
    >
      {/* ── Workspace header ── */}
      <div
        ref={accountMenuRef}
        className={`relative h-14 flex items-center border-b border-border shrink-0 ${
          collapsed ? 'justify-center px-2' : 'px-3 justify-between gap-1'
        }`}
      >
        <button
          type="button"
          onClick={() => setAccountMenuOpen((o) => !o)}
          title={collapsed ? accountName : undefined}
          aria-haspopup="menu"
          aria-expanded={accountMenuOpen}
          className={`flex items-center rounded-lg transition cursor-pointer min-w-0 ${
            collapsed ? 'justify-center p-1' : 'flex-1 gap-2.5 px-1.5 py-1.5 hover:bg-surface'
          }`}
        >
          {profile?.avatar_url ? (
            <img
              src={`${profile.avatar_url}?t=${new Date(profile.updated_at).getTime()}`}
              alt="Avatar"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
              <span className="text-[11px] font-bold text-white">
                {accountInitials}
              </span>
            </div>
          )}
          {!collapsed && (
            <>
              <span className="text-sm font-medium text-foreground flex-1 text-left truncate">
                {accountName}
              </span>
              <ChevronDown
                size={14}
                className={`shrink-0 text-muted transition-transform duration-150 ${
                  accountMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </>
          )}
        </button>

        {!collapsed && (
          <button
            type="button"
            title="Colapsar sidebar"
            onClick={() => setCollapsed(true)}
            className="p-1.5 rounded-md text-muted hover:bg-surface hover:text-foreground transition cursor-pointer shrink-0"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {accountMenuOpen && (
          <div
            role="menu"
            className={`absolute z-50 rounded-xl border border-border bg-elevated shadow-lg py-1 ${
              collapsed ? 'top-1 left-full ml-2 w-48' : 'top-full left-3 right-3 mt-1'
            }`}
          >
            {collapsed && (
              <button
                type="button"
                role="menuitem"
                onClick={() => { setCollapsed(false); setAccountMenuOpen(false) }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
              >
                <ChevronRight size={15} className="shrink-0" />
                Expandir panel
              </button>
            )}
            <button
              type="button"
              role="menuitem"
              onClick={() => { router.push('/dashboard/settings'); setAccountMenuOpen(false) }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
            >
              <Settings size={15} className="shrink-0" />
              Configuración
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => { setShowImportModal(true); setAccountMenuOpen(false) }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
            >
              <Upload size={15} className="shrink-0" />
              Importar notas
            </button>
            <div className="my-1 mx-2 h-px bg-border" />
            <button
              type="button"
              role="menuitem"
              onClick={() => { setAccountMenuOpen(false); handleLogout() }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted hover:bg-danger/10 hover:text-danger transition cursor-pointer"
            >
              <LogOut size={15} className="shrink-0" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>

      {/* ── Search ── */}
      {!collapsed ? (
        <div className="px-3 py-2.5 border-b border-border shrink-0">
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition ${
              currentView === 'search'
                ? 'bg-accent/10 ring-1 ring-accent/30'
                : 'bg-surface border border-border'
            }`}
          >
            <Search size={13} className="text-muted shrink-0" />
            <input
              type="text"
              data-testid="sidebar-search"
              placeholder="Buscar notas..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="flex-1 bg-transparent text-sm text-foreground outline-none min-w-0"
              style={{ color: 'var(--color-foreground)' }}
            />
            {searchQuery && (
              <button
                type="button"
                title="Limpiar búsqueda"
                onClick={() => {
                  setSearchQuery('')
                  setCurrentView('home')
                }}
                className="text-muted hover:text-foreground transition cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="px-2 pt-2 pb-1 shrink-0">
          <button
            type="button"
            title="Buscar"
            onClick={() => setCollapsed(false)}
            className={`w-full flex justify-center p-2 rounded-lg transition cursor-pointer ${
              currentView === 'search'
                ? 'bg-accent/15 text-accent'
                : 'text-muted hover:bg-surface hover:text-foreground'
            }`}
          >
            <Search size={18} />
          </button>
        </div>
      )}

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 min-h-0">
        <NavItem
          icon={<Home size={18} />}
          label="Inicio"
          active={currentView === 'home'}
          onClick={() => handleNav('home')}
          collapsed={collapsed}
        />
        <NavItem
          icon={<FileText size={18} />}
          label="Notas"
          active={currentView === 'all-notes'}
          onClick={() => handleNav('all-notes')}
          collapsed={collapsed}
        />
        <NavItem
          icon={<Star size={18} />}
          label="Favoritos"
          active={currentView === 'favorites'}
          onClick={() => handleNav('favorites')}
          collapsed={collapsed}
        />
        <NavItem
          icon={<SlidersHorizontal size={18} />}
          label="Búsqueda avanzada"
          active={currentView === 'advanced-search'}
          onClick={() => handleNav('advanced-search')}
          collapsed={collapsed}
        />

        <Separator />

        {/* Libretas section */}
        {!collapsed ? (
          <div>
            <div className="flex items-center justify-between px-3 py-1">
              <button
                type="button"
                onClick={() => setNotebooksOpen(!notebooksOpen)}
                className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                  isNotebooksActive ? 'text-accent' : 'text-muted hover:text-foreground'
                }`}
              >
                {notebooksOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                Libretas
              </button>
              <button
                type="button"
                title="Nueva libreta"
                data-testid="new-notebook-btn"
                onClick={() => setShowInput(!showInput)}
                className="p-0.5 text-muted hover:text-accent transition cursor-pointer rounded"
              >
                <Plus size={13} />
              </button>
            </div>

            {showInput && (
              <div className="flex gap-1 px-2 pb-1">
                <input
                  type="text"
                  data-testid="notebook-name-input"
                  placeholder="Nombre..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  autoFocus
                  className="flex-1 px-2 py-1 text-xs bg-elevated border border-border rounded-md outline-none text-foreground"
                  style={{ color: 'var(--color-foreground)' }}
                />
                <button
                  type="button"
                  data-testid="notebook-create-submit"
                  onClick={handleCreate}
                  disabled={creating}
                  className="px-2 py-1 bg-accent text-white text-xs rounded-md hover:bg-accent-light disabled:opacity-50 cursor-pointer transition"
                >
                  {creating ? '…' : 'OK'}
                </button>
              </div>
            )}

            {notebooksOpen && (
              <div className="space-y-0.5">
                {notebooks.map((notebook) => (
                  <DroppableNotebook
                    key={notebook.id}
                    notebook={notebook}
                    isActive={
                      currentView === 'notebooks' &&
                      selectedNotebook?.id === notebook.id
                    }
                    onClick={() => handleNotebookClick(notebook)}
                    onDelete={(e) => handleDelete(notebook.id, e)}
                    onRename={async (id, newName) => {
                      await updateNotebook(id, newName)
                      renameNotebook(id, newName)
                    }}
                  />
                ))}
                {notebooks.length === 0 && (
                  <p className="text-xs text-subtle px-3 py-1.5">Sin libretas aún</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <NavItem
            icon={<BookOpen size={18} />}
            label="Libretas"
            active={isNotebooksActive}
            onClick={() => {
              setCollapsed(false)
              setNotebooksOpen(true)
            }}
            collapsed={collapsed}
          />
        )}

        <Separator />

        <NavItem
          icon={<Tag size={18} />}
          label="Etiquetas"
          active={currentView === 'tags-view'}
          onClick={() => handleNav('tags-view')}
          collapsed={collapsed}
        />
        <NavItem
          icon={<Trash2 size={18} />}
          label="Papelera"
          active={currentView === 'trash'}
          onClick={() => handleNav('trash')}
          collapsed={collapsed}
        />

        <Separator />

        <NavItem
          icon={<CheckSquare size={18} />}
          label="Tareas"
          active={currentView === 'tasks'}
          onClick={() => handleNav('tasks')}
          collapsed={collapsed}
          badge={pendingCount}
        />

        <NavItem
          icon={<Calendar size={18} />}
          label="Calendario"
          active={currentView === 'calendar'}
          onClick={() => handleNav('calendar')}
          collapsed={collapsed}
        />
        <NavItem
          icon={<Sparkles size={18} />}
          label="Asistente IA"
          active={currentView === 'ai-assistant'}
          onClick={() => handleNav('ai-assistant')}
          collapsed={collapsed}
        />
        {/* Spaces section */}
        {!collapsed ? (
          <div>
            <div className="flex items-center justify-between px-3 py-1">
              <button
                type="button"
                onClick={() => setSpacesOpen(!spacesOpen)}
                className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                  currentView === 'spaces' ? 'text-accent' : 'text-muted hover:text-foreground'
                }`}
              >
                {spacesOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                Spaces
              </button>
              <button
                type="button"
                title="Ver todos los spaces"
                onClick={() => handleNav('spaces')}
                className="p-0.5 text-muted hover:text-accent transition cursor-pointer rounded"
              >
                <Users size={13} />
              </button>
            </div>

            {spacesOpen && (
              <div className="space-y-0.5">
                {spaces.map((space) => (
                  <div
                    key={space.id}
                    onClick={() => handleSpaceClick(space)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition ${
                      currentView === 'spaces' && selectedSpace?.id === space.id
                        ? 'bg-accent/15 text-accent'
                        : 'text-muted hover:bg-surface hover:text-foreground'
                    }`}
                  >
                    <Users size={13} className="shrink-0" />
                    <span className="text-xs truncate flex-1">{space.name}</span>
                  </div>
                ))}
                {spaces.length === 0 && (
                  <p className="text-xs text-subtle px-3 py-1.5">Sin spaces aún</p>
                )}
              </div>
            )}
          </div>
        ) : (
          <NavItem
            icon={<Users size={18} />}
            label="Spaces"
            active={currentView === 'spaces'}
            onClick={() => {
              setCollapsed(false)
              setSpacesOpen(true)
            }}
            collapsed={collapsed}
          />
        )}
        <NavItem
          icon={<Share2 size={18} />}
          label="Compartido conmigo"
          active={currentView === 'shared'}
          onClick={() => handleNav('shared')}
          collapsed={collapsed}
        />
        <Separator />

        {/* Sección "Más" colapsable (id:52) */}
        {!collapsed ? (
          <div>
            <button
              type="button"
              onClick={() => setMoreOpen(!moreOpen)}
              className="w-full flex items-center gap-1 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted hover:text-foreground transition cursor-pointer"
            >
              {moreOpen ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
              Más
            </button>
            <div
              className="space-y-0.5"
              style={{ maxHeight: moreOpen ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.2s ease' }}
            >
              <NavItem
                icon={<Paperclip size={18} />}
                label="Archivos"
                active={currentView === 'files'}
                onClick={() => handleNav('files')}
                collapsed={collapsed}
              />
              <NavItem
                icon={<LayoutTemplate size={18} />}
                label="Plantillas"
                active={currentView === 'templates'}
                onClick={() => handleNav('templates')}
                collapsed={collapsed}
              />
              <NavItem
                icon={<Settings size={18} />}
                label="Configuración"
                active={pathname === '/dashboard/settings'}
                onClick={() => router.push('/dashboard/settings')}
                collapsed={collapsed}
              />
            </div>
          </div>
        ) : (
          <>
            <NavItem
              icon={<Paperclip size={18} />}
              label="Archivos"
              active={currentView === 'files'}
              onClick={() => handleNav('files')}
              collapsed={collapsed}
            />
            <NavItem
              icon={<LayoutTemplate size={18} />}
              label="Plantillas"
              active={currentView === 'templates'}
              onClick={() => handleNav('templates')}
              collapsed={collapsed}
            />
          </>
        )}
      </nav>

      {/* ── Bottom actions ── */}
      <div className="border-t border-border p-2 shrink-0 space-y-0.5">
        <NotificationBell collapsed={collapsed} />

        {/* Theme toggle */}
        <button
          type="button"
          title={collapsed ? themeLabel : undefined}
          onClick={toggleTheme}
          className={`w-full flex items-center rounded-lg py-2 transition cursor-pointer text-muted hover:bg-surface hover:text-foreground ${
            collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'
          }`}
        >
          {themeIcon}
          {!collapsed && (
            <span className="text-sm font-medium flex-1 text-left truncate">{themeLabel}</span>
          )}
        </button>

        {/* User / Settings */}
        <button
          type="button"
          title={collapsed ? 'Configuración' : undefined}
          onClick={() => router.push('/dashboard/settings')}
          className={`w-full flex items-center rounded-lg py-2 transition cursor-pointer ${
            pathname === '/dashboard/settings'
              ? 'bg-accent/15 text-accent'
              : 'text-muted hover:bg-surface hover:text-foreground'
          } ${collapsed ? 'justify-center px-2' : 'gap-2.5 px-3'}`}
        >
          {profile?.avatar_url ? (
            <img
              src={`${profile.avatar_url}?t=${new Date(profile.updated_at).getTime()}`}
              alt="Avatar"
              className="w-6 h-6 rounded-md object-cover shrink-0"
            />
          ) : (
            <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-accent">
                {(profile?.display_name || 'U').slice(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          {!collapsed && (
            <>
              <span className="text-sm font-medium flex-1 text-left truncate">
                {profile?.display_name || 'Mi perfil'}
              </span>
              <Settings size={14} className="shrink-0 opacity-50" />
            </>
          )}
        </button>

        <button
          type="button"
          title={collapsed ? 'Cerrar sesión' : undefined}
          data-testid="logout-btn"
          onClick={handleLogout}
          className={`w-full flex items-center gap-2.5 rounded-lg py-2 text-sm text-muted hover:bg-danger/10 hover:text-danger transition cursor-pointer ${
            collapsed ? 'justify-center px-2' : 'px-3'
          }`}
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && <span className="font-medium">Cerrar sesión</span>}
        </button>
      </div>
    </aside>

    {showImportModal && <ImportModal onClose={() => setShowImportModal(false)} />}
  </>
  )
}
````

## File: CLAUDE.md
````markdown
# NoteEvo — Instrucciones para Claude

> Este archivo define el contexto completo del proyecto. Léelo siempre al
> inicio de cada sesión antes de tocar cualquier cosa.

---

## Identidad del proyecto

NoteEvo es un clon de Evernote construido con Next.js 16 App Router.
Repo: `Eddie031-beep/noteevo`

---

## Stack

| Tecnología | Versión | Notas |
|---|---|---|
| Next.js | 16.2.6 | App Router, Turbopack en dev |
| React | 19.2.4 | |
| TypeScript | ^5 | Strict mode activo |
| Supabase | ^2.105.4 | Auth + DB + Storage + RPC |
| TipTap | ^3.23.6 | Editor rich-text, contenido en JSON |
| Groq SDK | ^1.2.0 | LLM — llama-3.3-70b-versatile, server-side only |
| Zustand | ^5.0.13 | Estado global del cliente |
| Tailwind CSS | v4 | Config via `@import "tailwindcss"` en globals.css |
| Lucide React | ^1.14.0 | Iconos |
| date-fns | ^4.1.0 | Fechas |
| recharts | instalado | Gráficos (para dashboard stats) |
| @dnd-kit/core | ^6.3.1 | Drag & drop de notas |

---

## Estado actual del proyecto — Phases 1–15 COMPLETAS ✅ (roadmap 100%)

Las 39 features del roadmap (id 1–39, fases 1 a 15) están implementadas con
build verde. Cualquier trabajo nuevo se registra como Phase 16+ en `feature_list.json`.

**Resumen de lo que existe:**
- Auth completo (login, registro, middleware)
- Notebooks + Notes CRUD con favoritos y papelera
- Editor TipTap con toolbar completa, autosave, imágenes, attachments
- Tags con TagInput y store global
- Búsqueda full-text via RPC
- Dark mode con design system propio
- Tasks con filtros, modal, badge, calendario
- Files con upload drag&drop y vista categorizada
- Spaces con roles, invite, gestión de miembros, Realtime
- IA: resumir, mejorar escritura (streaming), chat (streaming), smart tags
- Keyboard shortcuts (`Ctrl+Shift+E`, `Ctrl+K`, `Ctrl+Shift+F`, `?`)
- Focus mode (sidebar + panel ocultos, solo editor)
- Exportar nota: Markdown y PDF (window.print)
- Historial de versiones (tabla `note_versions`, panel lateral)
- Templates: selector al crear nota, vista gallery, guardar como plantilla
- Drag & drop de notas entre notebooks (`@dnd-kit/core`)
- Compartir nota con link público (`/n/[slug]`, tabla `shared_notes`)
- Notificaciones in-app (tabla `notifications`, Realtime)
- Perfil de usuario (tabla `user_profiles`, `/settings`)
- Tema claro / light mode
- Búsqueda avanzada con filtros (RPC `search_notes_advanced`)
- Dashboard con estadísticas (RPC `get_user_stats`, recharts)
- Onboarding multi-paso para nuevos usuarios
- Recordatorios de tareas por email (Supabase Edge Function + Resend)
- Tests unitarios (Vitest) y E2E (Playwright)
- Recordatorios duales por due_date (7 días + 1 día antes)
- Indicadores de urgencia en el calendario (rojo/amarillo)

### Mejoras de editor aplicadas (fuera del roadmap formal)

**Nuevos bloques TipTap** (`lib/editor/` + `components/editor/`):
- **Callout** — box colorido con tipos: info/warning/success/error/tip, draggable
- **Toggle** — título editable inline + chevron colapsar/expandir contenido
- **TOC** (Table of Contents) — auto-actualizado con H1/H2/H3

**Toolbar enhancements** (`NoteEditor.tsx` + `FormatDropdowns.tsx`):
- Botones Superscript (`x²`) y Subscript (`x₂`)
- Botón Eraser (eliminar todo el formato del texto seleccionado)
- 6 familias de fuente: Sans Serif, Serif, **Slab Serif** (Roboto Slab), Monospace, **Script** (Dancing Script), **Handwritten** (Caveat)
- Fuentes Script y Handwritten cargadas via `next/font/google` en `app/layout.tsx`

**TableToolbar** (`components/editor/TableToolbar.tsx`):
- BubbleMenu de TipTap que aparece al hacer clic dentro de cualquier tabla
- Controles: insertar/eliminar fila, insertar/eliminar columna, **Eliminar tabla** (rojo)

**NoteList mejorado** (`components/notes/NoteList.tsx`):
- Animación de entrada escalonada por tarjeta (CSS keyframes `noteCardEnter`)
- Borde izquierdo verde en hover y nota activa
- Fechas relativas: "Hace 3 días", "Ayer", hora si es hoy
- `active:scale-90` en botón +

**AiMenuExpanded v2** (`components/editor/AiMenuExpanded.tsx`):
- Submenús hover a la derecha (delay 150ms para evitar parpadeo)
- **Resumir** ▶ → Como párrafo / Estructurado / Como lista
- **Cambiar tono** ▶ → Formal / Amigable / Divertido / Engaging / Conciso / Empático
- **Ayúdame a escribir** ▶ → Introducción / Conclusión / Título
- **Traducir** ▶ → 15 idiomas (EN/ES/FR/DE/ZH/JA/RU/IT/PT/AR/HI/TR/ID/VI/KO)
- **Convertir en** ▶ → Email / Post en redes
- Nuevos ítems directos: **Humanizar**, Acortar, Expandir

**transform_route.ts actualizado** (`app/api/ai/transform/route.ts`):
- 30+ acciones con prompts en español
- Límite diario: 30 transformaciones/día

---

## Roadmap — COMPLETO ✅ (39/39 features)

| Phase | Features | Estado |
|---|---|---|
| 1–3 | Setup, Auth, Layout, Notebooks, Notes, Tags, Búsqueda, Dark mode | ✅ |
| 4–5 | Tasks, Files, Calendar | ✅ |
| 6 | Spaces | ✅ |
| 7 | IA (Resumir, Mejorar, Chat, Smart Tags) | ✅ |
| 8 | Shortcuts, Focus mode, Export, Versiones | ✅ |
| 9 | Templates, Drag & drop | ✅ |
| 10 | Link público, Notificaciones in-app | ✅ |
| 11 | Perfil, Light mode | ✅ |
| 12 | Búsqueda avanzada, Dashboard stats | ✅ |
| 13 | Onboarding, Recordatorios email | ✅ |
| 14 | Tests unitarios (Vitest), Tests E2E (Playwright) | ✅ |
| 15 | Recordatorios duales, Urgencia en calendario | ✅ |

> Cualquier trabajo nuevo a partir de aquí se registra como **Phase 16+** en
> `feature_list.json` (entrada `pending` → `done` al cerrar con build verde).

---

## Phase 16 — Mejoras UI/UX + Features (COMPLETA ✅ — 9/9)

> **TODAS las features de Phase 16 (id:40–48) están implementadas, con build verde
> y mergeadas en `RepoEddie`.** No hay trabajo pendiente en esta fase. Las descripciones
> abajo documentan lo que YA se construyó (estado final), no un backlog.
> El registro canónico de estado es `feature_list.json` (todas en `"status": "done"`).

| id | Feature | Estado |
|---|---|---|
| 40 | Tags: vista y gestión completa | ✅ done |
| 41 | Templates: galería completa estilo Notion | ✅ done |
| 42 | Tasks: rediseño UI + modal mejorado | ✅ done |
| 43 | Files: rediseño UI al estilo Evernote | ✅ done |
| 44 | Calendar: mejoras visuales y creación de eventos | ✅ done |
| 45 | Spaces: rediseño UI + mejoras de permisos | ✅ done |
| 46 | NoteEditor: rediseño layout y breathing room | ✅ done |
| 47 | IA en Sidebar: panel lateral de IA | ✅ done |
| 48 | Compartir nota: modo edición colaborativa | ✅ done |

### id:40 — Tags: vista y gestión completa ✅ done (commit b2ff6a0)
Vista `tags-view` rediseñada: grid de tarjetas por etiqueta con nombre + conteo de notas +
fecha. Click en etiqueta filtra sus notas; renombrar inline; eliminar con confirmación
(borra relaciones `note_tags`); buscador. RPC `get_tags_with_count()`. `lib/supabase/tags.ts`
con `renameTag()`, `deleteTagWithRelations()`, `getTagsWithCount()`, `getNotesByTag()`.

### id:41 — Templates: galería completa estilo Notion ✅ done
Galería rediseñada (layout 3 paneles: buscador+filtros / grid con thumbnail real TipTap
read-only `scale(0.35)` / panel de detalle). 12 plantillas builtin en 9 categorías
(`personal`, `trabajo`, `reuniones`, `diario`, `educacion`, `viaje`, `finanzas`, `salud`,
`proyecto`). Badges Oficial/Mía, borde acento en activa. Detalle con preview read-only +
`NotebookPicker` (recuerda última via `localStorage`) + "Usar esta plantilla"
(crea nota con el content JSON tal cual). `TemplateSelector.tsx` con flujo 2 pasos.
Reutiliza `sharedEditorExtensions` (Callout/Toggle/TOC) en preview.

### id:42 — Tasks: rediseño UI + modal mejorado ✅ done
`TaskList`: cards compactas con dot de color por prioridad, pill de fecha coloreado
(rojo vencida / amarillo próxima / gris futura), flag naranja, checkbox 24px con animación.
Panel de filtros como drawer colapsable + chips activos. `TaskModal`: selector de prioridad
visual, date picker con `min` hoy, descripción visible, selector de nota a vincular.

### id:43 — Files: rediseño UI al estilo Evernote ✅ done (commit d98feee)
Vista grid (cards cuadradas con thumbnail) + lista, toggle en header. Filtros por tipo
(Imágenes/PDFs/Audio/Video/Otros) con conteo. Orden por Fecha/Nombre/Tamaño. Lightbox con
`<dialog>` nativo. Drag & drop sobre `FilesView` con modal selector de nota destino.
Breadcrumb "nota origen" clickeable (`getNoteById` → navega al editor).

### id:44 — Calendar: mejoras visuales y creación de eventos ✅ done
Mejor contraste/jerarquía. Vista mes con celdas más altas (`minHeight: 120`) + fondo sutil
por urgencia (`URGENCY_CELL_BG`), hasta 3 tareas con prefijo de hora. Vista semana reescrita
como rejilla horaria 24h (`HOUR_HEIGHT = 48`) con eventos absolutos por `start_time`/`end_time`,
**línea de "hora actual"** en vivo (refresco 60s) y fila "Todo el día". `QuickCreatePopover`
anclado al click ("Más detalles →" abre `TaskModal`). Migración DB: `tasks.start_time` /
`tasks.end_time` (`timestamptz`); inputs de hora en `TaskModal` con validación (fin > inicio).
Días coloreados por urgencia.

### id:45 — Spaces: rediseño UI + mejoras de permisos ✅ done
`SpacesView` / `SharedWithMeView`: cards con banner de color determinista por `space.id`
(`lib/utils/space-color.ts`, sin migración), icono solapado, descripción y conteos de
miembros + libretas. `SharedWithMeView` muestra dueño (email), nº de miembros y fecha de
unión. `SpaceDetailView`: badge del rol propio + tabla de miembros (Miembro/Rol/Unión/Acciones)
con iniciales. `InviteModal` en 2 pasos (buscar → confirmar) vía endpoint
`/api/spaces/lookup-user` (solo owner/admin; evita enumeración de emails). RPC
`get_spaces_overview()` (SECURITY DEFINER): `member_count`, `notebook_count`, `owner_email`,
`my_joined_at` en una sola llamada.

### id:46 — NoteEditor: rediseño layout y breathing room ✅ done
Cuerpo envuelto en `max-w-3xl mx-auto` centrado (`max-w-2xl` en focus mode, con transición
de ancho); `py-12`; `px-6 sm:px-10`. Título `text-4xl font-bold leading-tight`; separador
`border-b border-border/60` bajo título+tags. Dividers de toolbar más visibles (`h-5`, `mx-1`).
Focus mode: toolbar `absolute` oculta, se revela on hover de la franja superior
(`group/tb` + `opacity`/`translate`). Móvil: `flex-nowrap overflow-x-auto`, `sm:flex-wrap`.

### id:47 — IA en Sidebar: panel lateral de IA ✅ done
View `'ai-assistant'` en `uiStore` + entrada "Asistente IA" (Sparkles) en `Sidebar` tras
Calendario; render full-width en `dashboard/page.tsx`. `components/ai/AiAssistantView.tsx`:
chat general con streaming (`ReadableStream`), selector de contexto
(Sin nota / Nota activa / Todas mis notas), acciones rápidas e historial en memoria.
Contexto "Todas mis notas": carga perezosa de `getAllNotesWithNotebook` + `extractTextPreview`.
`app/api/ai/assistant/route.ts`: rate limit 20/día con `action='ai_assistant'` en `ai_usage`.

### id:48 — Compartir nota: modo edición colaborativa ✅ done
`access_level` ahora `'none' | 'view' | 'edit'` (text, sin CHECK constraint). `ShareControls`
habilita "Anyone with the link can edit" (al activar desde cero crea link `view` y lo
promociona a `edit`). `NoteViewer` → renombrado a **`NotePublicEditor`** (props `editable`
+ `slug`); cuando `editable`, TipTap editable con autosave debounce 1500ms e indicador
Guardando/Guardado/Error (`initializedRef` evita autosave en el `setContent` inicial).
Endpoint público `app/api/shared/update/route.ts` → `updateSharedNoteContent` (service role)
que valida `is_active` + `access_level='edit'` + no expirado + cota 500KB antes de escribir.

---

## Schema de DB completo (Supabase: blhbvurcconebtelbnlw)

### Tablas existentes (phases 1–15)

```sql
notebooks    (id, user_id, name, description, space_id, created_at, updated_at)
notes        (id, user_id, notebook_id, title, content jsonb, is_favorite, is_trashed,
              search_vector tsvector, created_at, updated_at)
tags         (id, user_id, name, created_at)
note_tags    (note_id, tag_id)
tasks        (id, user_id, note_id, title, description, due_date,
              start_time, end_time, reminder_at,
              reminder_7days_sent, reminder_1day_sent,
              priority, is_flagged, is_completed, completed_at, created_at)
              -- start_time/end_time timestamptz (Phase 16 id:44): hora del evento;
              -- null = tarea de todo el día. Guardadas como reloj literal (sin TZ).
attachments  (id, user_id, note_id, file_name, file_type, file_size,
              storage_path, created_at)
spaces       (id, name, description, owner_id, created_at, updated_at)
space_members (space_id, user_id, role, invited_by, joined_at) -- REPLICA IDENTITY FULL
ai_usage     (id, user_id, action, tokens_used, created_at)
note_versions (id, note_id, user_id, title, content jsonb, version_number, created_at)
templates    (id, user_id nullable, name, description, content jsonb,
              category, is_builtin boolean, created_at, updated_at)
```

### Tablas phases 10–14 — YA CREADAS EN SUPABASE

```sql
shared_notes  (id, note_id, user_id, public_slug unique, is_active, access_level,
               view_count, expires_at, created_at)
notifications (id, user_id, type, title, body, data jsonb,
               is_read boolean, created_at)  -- REPLICA IDENTITY FULL
user_profiles (id references auth.users, display_name, avatar_url, bio,
               theme, language, timezone, email_notifications, onboarding_completed,
               created_at, updated_at)
```

### RPCs existentes

```sql
search_notes(search_query text)
search_notes_advanced(search_query, filter_notebook_id, filter_tag_ids,
                      filter_date_from, filter_date_to, filter_is_favorite)
get_user_stats()
get_dashboard_extras()
get_space_members_with_email(p_space_id)
get_user_id_by_email(email)
get_due_date_reminders()
```

### RPCs nuevas a crear (Phase 16)

```sql
-- id:40 Tags con conteo
get_tags_with_count() → tabla: {id, name, note_count, created_at}

-- id:45 Overview de spaces (SECURITY DEFINER)
get_spaces_overview() → tabla: {space_id, member_count, notebook_count, owner_email, my_joined_at}
```

---

## Arquitectura de carpetas actual

```
app/
├── (auth)/login/page.tsx
├── (auth)/register/page.tsx
├── (dashboard)/
│   ├── dashboard/page.tsx
│   ├── layout.tsx
│   └── settings/page.tsx
├── (public)/
│   └── n/[slug]/page.tsx
├── api/
│   ├── ai/summarize/route.ts
│   ├── ai/improve/route.ts
│   ├── ai/chat/route.ts
│   ├── ai/suggest-tags/route.ts
│   ├── ai/transform/route.ts
│   ├── ai/assistant/route.ts      ← Phase 16 (id:47)
│   ├── spaces/invite/route.ts
│   ├── spaces/lookup-user/route.ts ← Phase 16 (id:45)
│   └── shared/update/route.ts      ← Phase 16 (id:48, público sin auth)
├── globals.css
└── middleware.ts

components/
├── ai/
│   └── AiAssistantView.tsx        ← Phase 16 (id:47)
├── editor/
│   ├── NoteEditor.tsx
│   ├── FormatDropdowns.tsx
│   ├── AiMenuExpanded.tsx
│   ├── TableToolbar.tsx
│   ├── TagInput.tsx, AttachmentPanel.tsx
│   ├── AiSummaryPanel.tsx, AiImproveToolbar.tsx
│   ├── AiChatPanel.tsx, AiSmartTags.tsx
│   ├── VersionHistoryPanel.tsx
│   ├── ExportModal.tsx
│   ├── InsertMenu.tsx
│   ├── ShareControls.tsx
│   ├── MermaidComponent.tsx
│   ├── CalloutComponent.tsx
│   ├── ToggleComponent.tsx
│   └── TocComponent.tsx
├── notes/
│   ├── NoteList.tsx
│   ├── FavoriteNotes.tsx
│   ├── TrashNotes.tsx
│   ├── SearchResults.tsx
│   ├── AdvancedSearchPanel.tsx
│   └── MoveNoteModal.tsx
├── tasks/TaskList.tsx, TaskModal.tsx
├── files/FilesView.tsx
├── calendar/CalendarView.tsx
├── spaces/
│   ├── SpacesView.tsx
│   ├── SpaceDetailView.tsx
│   ├── SharedWithMeView.tsx
│   ├── CreateSpaceModal.tsx
│   ├── CreateNotebookInSpaceModal.tsx
│   └── InviteModal.tsx
├── templates/
│   ├── TemplateSelector.tsx
│   ├── TemplatesView.tsx
│   └── SaveAsTemplateModal.tsx
├── dashboard/
│   └── DashboardStats.tsx
├── onboarding/
│   └── OnboardingModal.tsx
├── sidebar/
│   ├── Sidebar.tsx
│   └── NotificationBell.tsx
└── KeyboardShortcutsCheatsheet.tsx

lib/
├── editor/
│   ├── callout-extension.ts
│   ├── toggle-extension.ts
│   ├── toc-extension.ts
│   └── mermaid-extension.ts
├── supabase/
│   ├── client.ts, server.ts, admin.ts
│   ├── notes.ts, notebooks.ts, tags.ts, search.ts, storage.ts
│   ├── tasks.ts, attachments.ts, spaces.ts
│   ├── versions.ts, templates.ts
│   ├── shared-notes.ts, shared-notes-server.ts
│   ├── notifications.ts, notifications-server.ts
│   ├── profile.ts
│   └── stats.ts
├── templates/builtin-templates.ts
└── utils/tiptap.ts, tiptap-to-markdown.ts, space-color.ts

store/
├── notebookStore.ts, noteStore.ts, tagStore.ts
├── uiStore.ts
├── taskStore.ts, spaceStore.ts
└── profileStore.ts

hooks/
├── useKeyboardShortcuts.ts
├── useSpaceRole.ts
└── useNotifications.ts

supabase/functions/
└── send-reminders/index.ts

types/index.ts
```

---

## Variables de entorno requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=       # solo server
GROQ_API_KEY=                    # solo server (llama-3.3-70b-versatile)
RESEND_API_KEY=                  # Phase 13
```

---

## Decisiones técnicas importantes (NO cambiar sin justificación)

| Decisión | Razón |
|---|---|
| Groq `llama-3.3-70b-versatile` | Gratis, rápido; migrado desde Anthropic |
| `GROQ_API_KEY` solo server | Seguridad |
| Streaming via `ReadableStream` nativo | Compatible con Next.js App Router |
| Rate limit via tabla `ai_usage` | Sin deps externas |
| Tailwind v4 config en globals.css | No existe tailwind.config.ts |
| TipTap `immediatelyRender: false` | Evita hydration error |
| `key={selectedNote.id}` en TagInput | Reset limpio al cambiar nota |
| Columna `is_trashed` (no `is_deleted`) | Así está en DB real |
| `storage_path` y `file_size` en attachments | Renombradas (no file_url/size) |
| `REPLICA IDENTITY FULL` en space_members/notifications | Para Realtime DELETE |
| `on_auth_user_created` trigger | Auto-crea user_profile al registrarse |
| Templates builtin con `user_id = null` | Distingue builtin de personales |
| `public_slug` único en shared_notes | URL legible y única |
| Google Fonts (Roboto Slab, Dancing Script, Caveat) en layout.tsx | Fuentes de editor |
| TableToolbar via BubbleMenu de TipTap | Aparece al clic en tabla, sin overflow-hidden |
| Submenús AI via hover + delay 150ms | UX fluido como Evernote |
| `noteCardEnter` keyframe en globals.css | Animación de entrada escalonada en NoteList |
| Editor max-w-3xl centrado (Phase 16) | Breathing room, menos abrumador |
| Vista tags con conteo de notas (Phase 16) | Utilidad real para gestión de etiquetas |
| Horas de tarea como reloj literal en timestamptz (Phase 16 id:44) | Round-trip consistente con `slice(0,10)`/`slice(11,16)`; evita desfases de zona horaria. NUNCA usar `toISOString()` al construir start_time/end_time |
| Rejilla semanal con `HOUR_HEIGHT=48` y línea de hora viva (Phase 16 id:44) | Posicionamiento absoluto de eventos por minutos; línea de "ahora" refrescada cada 60s |
| Color de space determinista por `id` (Phase 16 id:45) | Evita migración/columna; visualmente equivalente a "color aleatorio al crear" y estable entre sesiones. `lib/utils/space-color.ts` |
| `/api/spaces/lookup-user` solo owner/admin (Phase 16 id:45) | Preview de usuario antes de invitar sin convertir el endpoint en oráculo de enumeración de emails |
| Edición pública colaborativa con service role (Phase 16 id:48) | `/api/shared/update` no requiere auth; `updateSharedNoteContent` valida is_active + access_level='edit' + no expirado + cota 500KB antes de escribir. NoteViewer→NotePublicEditor con prop `editable`; autosave debounce 1500ms |
| Sidebar width colapsado: 48px (Phase 16 ids 49–54) | Mínimo para mostrar íconos 20px con padding 14px a cada lado |
| Sidebar width expandido: ~240px (Phase 16 ids 49–54) | Consistente con Notion (224px) y Evernote; cabe display_name sin truncar en mayoría de casos |
| `isSidebarCollapsed` en uiStore (Phase 16 id:53) | Estado global necesario para que el layout del dashboard ajuste el margen del área de contenido |
| localStorage para estados del sidebar (Phase 16 ids 52–54) | Persisten entre sesiones sin roundtrip a DB; son preferencias de UI, no datos de usuario |
| Notebooks expandibles sin fetch extra (Phase 16 id:54) | Usar notas ya en noteStore para calcular conteo; evita N+1 queries al renderizar el sidebar |
| Tooltip nativo `title` en sidebar colapsado (Phase 16 id:53) | Suficiente para desktop; evita dependencia de librería de tooltips |
| Sin `overflow: hidden` en sidebar groups (Phase 16 ids 52–54) | Necesario para que el acordeón de "Más" y el de notebooks aniden dropdowns correctamente |

---

## Arquitectura de carpetas — adiciones Phase 16 Sidebar (ids 49–54)

```
store/
└── uiStore.ts   ← añadir isSidebarCollapsed + toggleSidebarCollapsed

components/sidebar/
└── Sidebar.tsx  ← workspace header, grupos, full-row items, "Más", notebooks acordeón

app/(dashboard)/
└── layout.tsx   ← ajuste de margen/grid cuando sidebar está colapsado
```

---

## Comandos

```bash
npm run dev          # desarrollo con Turbopack
npm run build        # build de producción (TypeScript check)
npm run lint         # ESLint
npm run test         # Vitest
npm run test:e2e     # Playwright
```

---

## Reglas de desarrollo

1. Sin `any` sin justificación documentada
2. Sin `console.log()` de debug
3. RLS activo en todas las tablas
4. `lib/supabase/client.ts` en componentes cliente, `server.ts` en Route Handlers
5. Mensajes de error siempre en español
6. `npm run build` verde antes de marcar cualquier feature como done
7. Queries a Supabase siempre en `lib/supabase/`
8. `GROQ_API_KEY` y `SUPABASE_SERVICE_ROLE_KEY` solo en server
9. Columna `is_trashed`, no `is_deleted`
10. Para la página pública `/n/[slug]`: excluir del middleware de auth
11. Sin `overflow-hidden` en contenedores de dropdowns que tienen submenús
12. Editor siempre con `max-w-3xl` centrado — no volver a full-width
````

## File: components/editor/NoteEditor.tsx
````typescript
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
import { useProfileStore } from '@/store/profileStore'
import { fontStackForKey } from '@/lib/constants/editor-fonts'
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
  Link as LinkIcon,
} from 'lucide-react'
import TagInput from './TagInput'
import NoteEmojiButton from './NoteEmojiButton'
import NoteCover from './NoteCover'
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
import { TextColorPicker } from './FormatDropdowns'
import NoteTypographyPopover from './NoteTypographyPopover'
import AiMenuExpanded from './AiMenuExpanded'
import NoteActionsMenu from './NoteActionsMenu'
import TableToolbar from './TableToolbar'
import { saveVersion, getVersionCount } from '@/lib/supabase/versions'
import { syncNoteLinks } from '@/lib/supabase/note-links'
import { NoteLinkExtension } from '@/lib/editor/notelink-extension'
import BacklinksPanel from './BacklinksPanel'
import NoteLinkMenu from './NoteLinkMenu'
import type { NoteVersion } from '@/types'

function collectNoteLinkIds(json: Record<string, unknown>): string[] {
  const ids: string[] = []
  function walk(node: unknown) {
    if (!node || typeof node !== 'object') return
    const n = node as Record<string, unknown>
    if (n.type === 'noteLink' && n.attrs) {
      const attrs = n.attrs as Record<string, unknown>
      if (typeof attrs.noteId === 'string') ids.push(attrs.noteId)
    }
    if (Array.isArray(n.content)) n.content.forEach(walk)
  }
  walk(json)
  return [...new Set(ids)]
}

function ToolbarButton({
  onClick, active, title, shortcut, children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  shortcut?: string
  children: React.ReactNode
}) {
  const [isPulsing, setIsPulsing] = useState(false)

  const handleClick = () => {
    onClick()
    setIsPulsing(true)
    setTimeout(() => setIsPulsing(false), 280)
  }

  return (
    <ToolbarTooltip label={title} shortcut={shortcut}>
      <button
        type="button"
        aria-label={title}
        onClick={handleClick}
        className={`p-1.5 rounded transition cursor-pointer ${
          active
            ? 'bg-elevated text-foreground'
            : 'text-muted hover:bg-surface hover:text-foreground'
        } ${isPulsing ? 'toolbar-pulse' : ''}`}
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
  // Tipografía del editor (Phase 17 id:61). Dos capas por UBICACIÓN: el default
  // GLOBAL vive en el perfil (estado vivo abajo); el override POR NOTA en las
  // columnas note_font_* de selectedNote. Prioridad: nota ?? global.
  const editorFontFamily = useProfileStore((s) => s.editorFontFamily)
  const editorFontSize = useProfileStore((s) => s.editorFontSize)
  const editorLineHeight = useProfileStore((s) => s.editorLineHeight)
  // Valores EFECTIVOS, recomputados en cada render → reactivos a cambios de la
  // nota (popover) y del default global (Configuración).
  const effectiveFontFamily = selectedNote?.note_font_family ?? editorFontFamily
  const effectiveFontSize = selectedNote?.note_font_size ?? editorFontSize
  const effectiveLineHeight = selectedNote?.note_line_height ?? editorLineHeight
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
  const [showBacklinks, setShowBacklinks] = useState(false)
  const [noteLinkQuery, setNoteLinkQuery] = useState<string | null>(null)
  const [noteLinkAnchor, setNoteLinkAnchor] = useState<{ top: number; left: number } | null>(null)
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
      NoteLinkExtension,
      Placeholder.configure({ placeholder: 'Escribe algo...' }),
    ],
    content: '',
    onSelectionUpdate: ({ editor }) => {
      if (editor.state.selection.empty) setImproveToolbar(null)
      // Cerrar menú de noteLink si el cursor ya no está en posición [[
      const { from } = editor.state.selection
      const textBefore = editor.state.doc.textBetween(Math.max(0, from - 200), from)
      if (!/\[\[([^\]]*)$/.test(textBefore)) {
        setNoteLinkQuery(null)
        setNoteLinkAnchor(null)
      }
    },
    onUpdate: ({ editor }) => {
      setWordCount(countWords(editor.getText()))

      // Detectar patrón [[ para mostrar menú de backlinks
      const { from } = editor.state.selection
      const textBefore = editor.state.doc.textBetween(Math.max(0, from - 200), from)
      const linkMatch = /\[\[([^\]]*)$/.exec(textBefore)
      if (linkMatch) {
        const coords = editor.view.coordsAtPos(from)
        setNoteLinkQuery(linkMatch[1])
        setNoteLinkAnchor({ top: coords.bottom + 8, left: coords.left })
      } else {
        setNoteLinkQuery(null)
        setNoteLinkAnchor(null)
      }

      if (!syncedNoteIdRef.current) return
      const noteId = syncedNoteIdRef.current
      const content = editor.getJSON()
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        updateNote(noteId, { content })
          .then(() => {
            updateNoteStore(noteId, { content })
            const targetIds = collectNoteLinkIds(content)
            return syncNoteLinks(noteId, targetIds)
          })
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
      el?.scrollIntoView({ block: 'center', behavior: 'auto' })
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

          {/* Tipografía de la nota (familia/tamaño/interlineado) + color por selección */}
          <NoteTypographyPopover
            noteId={selectedNote.id}
            noteFontFamily={selectedNote.note_font_family ?? null}
            noteFontSize={selectedNote.note_font_size ?? null}
            noteLineHeight={selectedNote.note_line_height ?? null}
            effectiveFontFamily={effectiveFontFamily}
            effectiveFontSize={effectiveFontSize}
            effectiveLineHeight={effectiveLineHeight}
          />
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

          <ToolbarButton
            title="Máquina de escribir"
            shortcut="Ctrl+Shift+T"
            onClick={() => toggleTypewriterMode()}
            active={isTypewriterMode}
          >
            <AlignCenter size={14} />
          </ToolbarButton>

          <ToolbarButton
            title="Backlinks"
            onClick={() => setShowBacklinks((v) => !v)}
            active={showBacklinks}
          >
            <LinkIcon size={14} />
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
          <div className={`group/head mx-auto w-full transition-[max-width] duration-300 ${isFocusMode ? 'max-w-2xl' : 'max-w-3xl'}`}>
            <NoteCover
              noteId={selectedNote.id}
              coverUrl={selectedNote.cover_url}
              coverGradient={selectedNote.cover_gradient}
              editable={!isReadOnly}
            />
            <NoteEmojiButton
              noteId={selectedNote.id}
              emoji={selectedNote.emoji}
              editable={!isReadOnly}
            />
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
            {/* Vars de tipografía aplicadas SOLO al cuerpo (no al título). Usan los
                valores EFECTIVOS (override de la nota si existe, si no el global).
                Los defaults de globals.css quedan como fallback. */}
            <div
              style={{
                '--editor-font-family': fontStackForKey(effectiveFontFamily),
                '--editor-font-size': `${effectiveFontSize}px`,
                '--editor-line-height': String(effectiveLineHeight),
              } as React.CSSProperties}
            >
              <EditorContent editor={editor} />
            </div>
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
        {showBacklinks && selectedNote && (
          <BacklinksPanel
            noteId={selectedNote.id}
            onClose={() => setShowBacklinks(false)}
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
      <div className="shrink-0 flex items-center gap-4 px-4 py-1.5 border-t border-border bg-panel text-xs text-muted">
        {wordCount > 0 && (
          <span>
            {wordCount} {wordCount === 1 ? 'palabra' : 'palabras'} · {readingMinutes} min lectura
          </span>
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

      {/* ── Floating note link menu (triggered by [[) ── */}
      {noteLinkQuery !== null && noteLinkAnchor && editor && (
        <NoteLinkMenu
          editor={editor}
          query={noteLinkQuery}
          anchor={noteLinkAnchor}
          onClose={() => { setNoteLinkQuery(null); setNoteLinkAnchor(null) }}
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
````

## File: feature_list.json
````json
[
  {
    "id": 1,
    "phase": 1,
    "name": "project-setup",
    "title": "Setup inicial del proyecto",
    "status": "done",
    "notes": "Next.js 16.2.6, TypeScript, Tailwind v4, todas las dependencias instaladas."
  },
  {
    "id": 2,
    "phase": 1,
    "name": "auth-supabase",
    "title": "Autenticación con Supabase",
    "status": "done",
    "notes": "Login, registro, middleware, clientes browser/server. Todo funcional."
  },
  {
    "id": 3,
    "phase": 1,
    "name": "layout-base",
    "title": "Layout base 3 paneles",
    "status": "done",
    "notes": "Sidebar + NoteList + NoteEditor funcionando. Sidebar colapsable (56px ↔ 240px)."
  },
  {
    "id": 4,
    "phase": 2,
    "name": "notebooks-crud",
    "title": "Notebooks CRUD",
    "status": "done",
    "notes": "Crear, listar, eliminar, renombrar. RLS activo."
  },
  {
    "id": 5,
    "phase": 2,
    "name": "notes-crud",
    "title": "Notes CRUD",
    "status": "done",
    "notes": "Crear, listar, editar, eliminar. is_trashed para soft delete."
  },
  {
    "id": 6,
    "phase": 2,
    "name": "tiptap-editor",
    "title": "Editor TipTap v3 con autosave",
    "status": "done",
    "notes": "Toolbar completa, autosave 800ms, upload de imágenes, task list, highlight, align, superscript, subscript, eraser. 6 fuentes. Bloques custom: Callout, Toggle, TOC. Mermaid diagrams."
  },
  {
    "id": 7,
    "phase": 2,
    "name": "favorites-trash",
    "title": "Favoritos y Papelera",
    "status": "done",
    "notes": "toggleFavorite, getFavoriteNotes, getTrashedNotes, restoreNote, permanentlyDeleteNote."
  },
  {
    "id": 8,
    "phase": 3,
    "name": "tags-system",
    "title": "Sistema de Tags",
    "status": "done",
    "notes": "TagInput con create/add/remove. tagStore global. RLS."
  },
  {
    "id": 9,
    "phase": 3,
    "name": "search-fulltext",
    "title": "Búsqueda full-text",
    "status": "done",
    "notes": "RPC search_notes() activa. Debounce 400ms."
  },
  {
    "id": 10,
    "phase": 3,
    "name": "visual-redesign",
    "title": "Rediseño visual — dark mode + identidad propia",
    "status": "done",
    "notes": "Dark mode. Design system CSS tokens. Sidebar colapsable. HomePanel. Build verde."
  },
  {
    "id": 11,
    "phase": 4,
    "name": "tasks-crud",
    "title": "Tasks CRUD",
    "status": "done",
    "notes": "Tabla tasks + RLS. CRUD. TaskModal. taskStore. Build verde."
  },
  {
    "id": 12,
    "phase": 4,
    "name": "tasks-views",
    "title": "Vistas de Tasks",
    "status": "done",
    "notes": "Tabs Mis tareas / Por libreta. Filtros. Badge pendientes. Build verde."
  },
  {
    "id": 13,
    "phase": 5,
    "name": "files-upload",
    "title": "Upload de archivos adjuntos",
    "status": "done",
    "notes": "Tabla attachments + RLS. Bucket attachments. Drag & drop, barra de progreso."
  },
  {
    "id": 14,
    "phase": 5,
    "name": "files-view",
    "title": "Vista Files",
    "status": "done",
    "notes": "FilesView con tabs Todos/Media/Docs. Thumbnails. Descarga."
  },
  {
    "id": 15,
    "phase": 5,
    "name": "calendar-view",
    "title": "Vista Calendar",
    "status": "done",
    "notes": "Vistas Mes/Semana/Día. Crear tasks desde calendario."
  },
  {
    "id": 16,
    "phase": 6,
    "name": "spaces-setup",
    "title": "Spaces — estructura base",
    "status": "done",
    "notes": "spaces + space_members + RLS. Roles. Invite via service role."
  },
  {
    "id": 17,
    "phase": 6,
    "name": "spaces-shared-content",
    "title": "Spaces — contenido compartido",
    "status": "done",
    "notes": "Read-only para viewers. SharedWithMeView. Realtime expulsión."
  },
  {
    "id": 18,
    "phase": 7,
    "name": "ai-summarize",
    "title": "IA — Resumir nota",
    "status": "done",
    "notes": "Groq llama-3.3-70b. AiSummaryPanel. Rate limit 10/día."
  },
  {
    "id": 19,
    "phase": 7,
    "name": "ai-improve-writing",
    "title": "IA — Mejorar escritura",
    "status": "done",
    "notes": "Streaming. AiImproveToolbar flotante. Aceptar/rechazar. Rate limit 10/día."
  },
  {
    "id": 20,
    "phase": 7,
    "name": "ai-chat-note",
    "title": "IA — Chat con tu nota",
    "status": "done",
    "notes": "Streaming. AiChatPanel. Historial en sesión. Rate limit 20/día."
  },
  {
    "id": 21,
    "phase": 7,
    "name": "ai-smart-tags",
    "title": "IA — Smart Tags",
    "status": "done",
    "notes": "Groq sugiere hasta 5 tags. Chips aceptar/rechazar. Rate limit 10/día."
  },
  {
    "id": 22,
    "phase": 8,
    "name": "keyboard-shortcuts",
    "title": "Atajos de teclado globales",
    "status": "done",
    "notes": "Hook useKeyboardShortcuts + KeyboardShortcutsCheatsheet. Ctrl+Shift+E, Ctrl+K, Ctrl+Shift+F, ?. Build verde."
  },
  {
    "id": 23,
    "phase": 8,
    "name": "presentation-mode",
    "title": "Modo presentación / Focus mode",
    "status": "done",
    "notes": "isFocusMode en uiStore. Botón en toolbar. Sidebar + panel ocultos. Build verde."
  },
  {
    "id": 24,
    "phase": 8,
    "name": "export-note",
    "title": "Exportar nota (PDF + Markdown)",
    "status": "done",
    "notes": "ExportModal con Markdown (tiptap-to-markdown.ts) y PDF (window.print). Build verde."
  },
  {
    "id": 25,
    "phase": 8,
    "name": "note-versions",
    "title": "Historial de versiones de notas",
    "status": "done",
    "notes": "Tabla note_versions. saveVersion/getVersions/deleteVersion. VersionHistoryPanel."
  },
  {
    "id": 26,
    "phase": 9,
    "name": "note-templates",
    "title": "Templates de notas",
    "status": "done",
    "notes": "Tabla templates (4 builtin). TemplateSelector al crear nota. TemplatesView. SaveAsTemplateModal."
  },
  {
    "id": 27,
    "phase": 9,
    "name": "drag-drop-notes",
    "title": "Arrastrar notas entre notebooks",
    "status": "done",
    "notes": "@dnd-kit/core integrado. NoteList con DraggableNote. Notebooks como drop targets en sidebar. DragOverlay con label."
  },
  {
    "id": 28,
    "phase": 10,
    "name": "share-note-public",
    "title": "Compartir nota con link público",
    "status": "done",
    "notes": "Tabla shared_notes. ShareControls en toolbar. Página /n/[slug] pública, TipTap read-only. view_count. access_level 'none'|'view'."
  },
  {
    "id": 29,
    "phase": 10,
    "name": "notifications",
    "title": "Notificaciones in-app",
    "status": "done",
    "notes": "Tabla notifications (REPLICA IDENTITY FULL). Campana en sidebar. Realtime INSERT. markAsRead/markAllRead."
  },
  {
    "id": 30,
    "phase": 11,
    "name": "user-profile",
    "title": "Perfil de usuario",
    "status": "done",
    "notes": "Tabla user_profiles con trigger auto-create. /dashboard/settings con tabs Perfil/Preferencias/Notificaciones. Avatar en sidebar."
  },
  {
    "id": 31,
    "phase": 11,
    "name": "light-mode",
    "title": "Tema claro (light mode)",
    "status": "done",
    "notes": "Tokens CSS bajo [data-theme='light']. Toggle en Sidebar y Settings. Guardado en user_profiles.theme."
  },
  {
    "id": 32,
    "phase": 12,
    "name": "advanced-search",
    "title": "Búsqueda avanzada con filtros",
    "status": "done",
    "notes": "RPC search_notes_advanced(). Panel de filtros: notebook, tags, fechas, favoritos. Snippet resaltado."
  },
  {
    "id": 33,
    "phase": 12,
    "name": "dashboard-stats",
    "title": "Dashboard con estadísticas",
    "status": "done",
    "notes": "RPCs get_user_stats() + get_dashboard_extras(). Grid de stats, gráfico área actividad (recharts), top tags/notebooks."
  },
  {
    "id": 34,
    "phase": 13,
    "name": "onboarding",
    "title": "Onboarding para nuevos usuarios",
    "status": "done",
    "notes": "Modal multi-paso en layout. Flag onboarding_completed en user_profiles. Botón Omitir."
  },
  {
    "id": 35,
    "phase": 13,
    "name": "task-reminders",
    "title": "Recordatorios de tareas via email",
    "status": "done",
    "notes": "Edge Function send-reminders (ACTIVE). RPC get_due_task_reminders(). Resend API. Columna reminder_sent."
  },
  {
    "id": 36,
    "phase": 14,
    "name": "tests-unit",
    "title": "Tests unitarios — utils y stores",
    "status": "done",
    "notes": "Vitest + jsdom. 20 tests. Cobertura 81.5%. Scripts: test, test:watch, test:coverage."
  },
  {
    "id": 37,
    "phase": 14,
    "name": "tests-e2e",
    "title": "Tests E2E — flujos críticos",
    "status": "done",
    "notes": "Playwright 1.60. 7 specs, 10/10 verde. storageState, teardown por prefijo E2E-."
  },
  {
    "id": 38,
    "phase": 15,
    "name": "recordatorios-duales",
    "title": "Recordatorios duales de tareas por due_date",
    "status": "done",
    "notes": "Dos avisos independientes: 7 días y 1 día antes. Flags reminder_7days_sent / reminder_1day_sent. RPC get_due_date_reminders."
  },
  {
    "id": 39,
    "phase": 15,
    "name": "urgencia-calendario",
    "title": "Indicadores de urgencia en el calendario",
    "status": "done",
    "notes": "CalendarView: rojo (vence hoy/vencida), amarillo (próximos 7 días). Pills, dots, borde lateral."
  },
  {
    "id": 40,
    "phase": 16,
    "name": "tags-view-completa",
    "title": "Tags: vista y gestión completa",
    "status": "done",
    "notes": "TagsView.tsx (full-width): grid de cards con nombre + conteo de notas + fecha. Búsqueda/filtro. Renombrar inline (doble click o botón). Eliminar con confirmación inline (borra relaciones note_tags). Click en etiqueta → panel de notas asociadas; click en nota navega al editor. RPC get_tags_with_count() (security invoker, cuenta notas no-trashed). lib/supabase/tags.ts: getTagsWithCount(), renameTag(), deleteTagWithRelations(), getNotesByTag(). tagStore.updateTag(). Build verde. Commit b2ff6a0.",
    "description": "Vista tags-view rediseñada con grid de cards (nombre + conteo de notas). Click en etiqueta filtra notas. Renombrar y eliminar etiquetas con confirmación. RPC get_tags_with_count(). lib/supabase/tags.ts: renameTag(), deleteTagWithRelations(), getTagsWithCount().",
    "depends_on": []
  },
  {
    "id": 41,
    "phase": 16,
    "name": "templates-galeria-completa",
    "title": "Templates: galería completa estilo Notion",
    "status": "done",
    "notes": "Galería estilo Notion (versión final 3 paneles, según spec del usuario). builtin-templates.ts: helpers JSON (DRY); 4 plantillas originales conservadas (meeting/journal/work/personal) + 8 nuevas: Plan de viaje (viaje), Notas de clase (educacion), Lluvia de ideas (proyecto), Agenda semanal (personal), Lista de lectura (personal), CRM/Clientes (trabajo), Lista de compras (personal), Diario del día (diario). lib/editor/extensions.ts (sharedEditorExtensions) + TemplatePreview.tsx (read-only) reutilizados para thumbnail y preview. TemplatesView.tsx: layout 3 paneles (izq w-60 buscador+filtros por categoría, centro grid-cols-2 con thumbnail real scale(0.35)/w-[286%]/h-24, der w-72 detalle). Click selecciona (no modal). Badges Oficial/Mía, borde acento en activa. Detalle: preview read-only + NotebookPicker (extraído a NotebookPicker.tsx, recuerda última via localStorage) + 'Usar esta plantilla' (createNote+updateNote content JSON tal cual → setCurrentView notebooks) + eliminar personales. Buscador debounce 200ms. Filtros deduplicados por etiqueta. TemplateSelector.tsx: flujo 2 pasos (list→preview) con TipTap read-only + NotebookPicker + Usar. SaveAsTemplateModal con 8 categorías. Build verde, lint limpio.",
    "description": "Rediseño completo de la galería de plantillas inspirado en Notion. Ver CHECKPOINTS.md id:41 para lista completa de checkpoints.",
    "depends_on": [],
    "detail": {
      "categorias": [
        "personal",
        "trabajo",
        "reuniones",
        "diario",
        "educacion",
        "viaje",
        "finanzas",
        "salud",
        "proyecto"
      ],
      "plantillas_builtin_nuevas": [
        {
          "nombre": "Agenda semanal",
          "categoria": "personal",
          "descripcion": "Plan semanal con tareas, horarios y notas por día"
        },
        {
          "nombre": "Plan de proyecto",
          "categoria": "proyecto",
          "descripcion": "Fases, stakeholders, tareas y fechas de entrega"
        },
        {
          "nombre": "Asignación / Tarea escolar",
          "categoria": "educacion",
          "descripcion": "Instrucciones, recursos, materiales y milestones"
        },
        {
          "nombre": "Programación 101",
          "categoria": "educacion",
          "descripcion": "Estructura de curso con TOC, objetivos y bloques de código"
        },
        {
          "nombre": "Notas de clase",
          "categoria": "educacion",
          "descripcion": "Fecha, clase, grabación, notas y resumen automático"
        },
        {
          "nombre": "Ecuaciones clave (Matemáticas)",
          "categoria": "educacion",
          "descripcion": "TOC con secciones por tema, fórmulas en código inline"
        },
        {
          "nombre": "Lista de compras",
          "categoria": "personal",
          "descripcion": "Categorías de productos con checkboxes por sección"
        },
        {
          "nombre": "Diario diario",
          "categoria": "diario",
          "descripcion": "AM/PM, metas del día, sentimientos, reflexión y expectativas"
        },
        {
          "nombre": "Lista de lectura",
          "categoria": "personal",
          "descripcion": "Por leer, leyendo actualmente, leídos y recomendaciones"
        },
        {
          "nombre": "Plan de viaje",
          "categoria": "viaje",
          "descripcion": "Overview, vuelos, alojamiento, actividades y presupuesto"
        },
        {
          "nombre": "Gestión de proyectos",
          "categoria": "proyecto",
          "descripcion": "Project overview con tabla de estado, fases y equipo"
        },
        {
          "nombre": "CRM / Gestión de clientes",
          "categoria": "trabajo",
          "descripcion": "Tabla de clientes, último contacto, crédito y responsable"
        },
        {
          "nombre": "Nota de candidato",
          "categoria": "trabajo",
          "descripcion": "Info del aplicante, revisión, recursos y milestones de entrevista"
        },
        {
          "nombre": "Información de contacto",
          "categoria": "trabajo",
          "descripcion": "Datos básicos, comunicación, dirección y facturación"
        },
        {
          "nombre": "Lluvia de ideas",
          "categoria": "proyecto",
          "descripcion": "Notas de reunión, brainstorming kick-off y recomendaciones"
        },
        {
          "nombre": "Notas de reunión",
          "categoria": "reuniones",
          "descripcion": "Detalles, objetivos, tabla de equipo, checklist y acuerdos"
        }
      ],
      "ui_galeria": {
        "layout": "Grid 3 columnas en desktop, 2 en tablet, 1 en móvil",
        "card": "Thumbnail del contenido real (TipTap read-only miniaturizado) + título + categoría pill + descripción corta",
        "filtros": "Pills de categoría en header (todas + por categoría). Búsqueda por nombre.",
        "featured": "Fila de destacadas al tope antes del grid (las 4 más usadas o las builtin más recientes)",
        "badge": "Badge 'Oficial NoteEvo' en plantillas builtin. Badge 'Mía' en plantillas personales."
      },
      "flujo_importar": {
        "paso1": "Click en card → abre modal de detalle/preview a pantalla completa",
        "paso2": "Modal muestra: preview grande del contenido (TipTap read-only), título, descripción, categoría",
        "paso3": "Selector de libreta destino (dropdown con todas las libretas del usuario)",
        "paso4": "Botón 'Usar esta plantilla' → crea nota nueva en libreta seleccionada con el contenido",
        "paso5": "Redirige automáticamente al editor con la nota nueva abierta",
        "nota": "El selector de libreta recuerda la última usada (localStorage key 'noteevo-last-template-notebook')"
      },
      "fixes_tecnicos": [
        "Bloques custom (Callout/Toggle/TOC) deben registrarse en el editor read-only del preview",
        "El preview miniaturizado usa scale(0.45) + pointer-events-none en un contenedor overflow-hidden",
        "Al importar, usar updateNote() con el content JSON de la plantilla tal cual (no convertir a texto)",
        "deleteTemplate(id) ya existe en lib/supabase/templates.ts — solo conectar con botón en UI"
      ]
    }
  },
  {
    "id": 42,
    "phase": 16,
    "name": "tasks-ui-rediseno",
    "title": "Tasks: rediseño UI + modal mejorado",
    "status": "done",
    "description": "Cards rediseñadas: dot color prioridad, pill fecha urgente, checkbox 24px con animación. Panel filtros colapsable (drawer). TaskModal mejorado: selector prioridad visual, date picker con min hoy, selector nota a vincular.",
    "depends_on": []
  },
  {
    "id": 43,
    "phase": 16,
    "name": "files-ui-evernote",
    "title": "Files: rediseño UI al estilo Evernote",
    "status": "done",
    "description": "Vista grid (cards cuadradas con thumbnail) + lista, toggle en header. Filtros por tipo (Imágenes/PDFs/Audio/Video/Otros) con conteo. Orden por Fecha/Nombre/Tamaño. Lightbox con <dialog> nativo para imágenes. Drag & drop sobre FilesView con modal selector de nota destino. Breadcrumb nota origen clickeable (getNoteById + navega al editor).",
    "depends_on": []
  },
  {
    "id": 44,
    "phase": 16,
    "name": "calendar-mejoras",
    "title": "Calendar: mejoras visuales y creación de eventos",
    "status": "done",
    "description": "Mejor contraste y jerarquía visual. Celdas mes más altas (120px) + fondo sutil por urgencia. Vista semana reescrita como rejilla horaria (24h) con línea de hora actual en vivo y fila 'Todo el día'. Mini-popover de creación rápida al click (con 'Más detalles' al modal completo). Migración DB: columnas start_time/end_time (timestamptz); campo de hora inicio/fin en TaskModal con validación. Días coloreados por urgencia.",
    "depends_on": []
  },
  {
    "id": 45,
    "phase": 16,
    "name": "spaces-ui-mejoras",
    "title": "Spaces: rediseño UI + mejoras de permisos",
    "status": "done",
    "description": "SpacesView: cards más grandes con descripción, contador miembros/libretas, color/banner por space. SpaceDetailView: tabla miembros clara, avatar al invitar. SharedWithMeView: mostrar dueño, nº miembros, fecha de unión.",
    "notes": "RPC get_spaces_overview() (SECURITY DEFINER): member_count, notebook_count, owner_email, my_joined_at por space accesible. Color determinista por id en lib/utils/space-color.ts (sin migración). Cards con banner de color + icono solapado + conteos. SpaceDetailView: badge de rol propio en header + tabla de miembros con columnas (Miembro/Rol/Unión/Acciones) e iniciales. InviteModal en 2 pasos (buscar→confirmar) con preview de iniciales/email vía nuevo endpoint /api/spaces/lookup-user.",
    "depends_on": []
  },
  {
    "id": 46,
    "phase": 16,
    "name": "note-editor-layout",
    "title": "NoteEditor: rediseño layout y breathing room",
    "status": "done",
    "description": "Área de escritura max-w-3xl centrada. py-12 padding vertical. Título text-4xl. Separador sutil título/cuerpo. Toolbar con grupos visuales claros. Focus mode: max-w-2xl + toolbar oculta on hover. Toolbar scrollable en móvil.",
    "notes": "Cuerpo envuelto en max-w-3xl mx-auto (max-w-2xl en focus mode, transición de ancho). py-12, título text-4xl con leading-tight, separador border-b border-border/60 bajo título+tags. Dividers de toolbar más visibles (h-5, mx-1). Focus mode: toolbar absolute con reveal on hover de franja superior (group/tb, opacity+translate). Móvil: flex-nowrap overflow-x-auto, sm:flex-wrap. isFocusMode ahora consumido (resuelve warning de lint).",
    "depends_on": []
  },
  {
    "id": 47,
    "phase": 16,
    "name": "ai-sidebar-assistant",
    "title": "IA en Sidebar: panel lateral de IA",
    "status": "done",
    "description": "Entrada 'Asistente IA' en Sidebar (Sparkles, siempre activo). currentView 'ai-assistant' en uiStore. AiAssistantView.tsx: chat general con Groq streaming. Selector contexto. Acciones rápidas. Rate limit 20/día. Route Handler app/api/ai/assistant/route.ts.",
    "notes": "View 'ai-assistant' en uiStore + entrada Sparkles en Sidebar tras Calendario. AiAssistantView.tsx: chat streaming (ReadableStream), selector de contexto (Sin nota / Nota activa / Todas mis notas), acciones rápidas, historial en memoria. Contexto 'all' carga perezosa de getAllNotesWithNotebook + extractTextPreview. Route /api/ai/assistant: rate limit 20/día con action 'ai_assistant' (sin CHECK constraint en ai_usage), system prompt con/ sin contexto.",
    "depends_on": []
  },
  {
    "id": 48,
    "phase": 16,
    "name": "share-note-edit",
    "title": "Compartir nota: modo edición colaborativa",
    "status": "done",
    "description": "access_level añade valor 'edit'. ShareControls habilita opción editar. Página /n/[slug] renderiza editor editable si access_level='edit'. Guardar con service role + debounce 1500ms. Indicador Guardado/Guardando. NoteViewer → NotePublicEditor con prop editable.",
    "notes": "access_level ahora 'none'|'view'|'edit' (text, sin CHECK constraint en DB). ShareControls: opción 'edit' habilitada; al crear desde cero promociona view→edit. NoteViewer renombrado a NotePublicEditor (prop editable+slug). Autosave debounce 1500ms vía nuevo endpoint público /api/shared/update → updateSharedNoteContent (admin/service role) que valida is_active + access_level='edit' + no expirado + cota de tamaño 500KB. Indicador Guardando/Guardado/Error. initializedRef evita autosave en el setContent inicial.",
    "depends_on": [
      28
    ]
  },
  {
    "id": 49,
    "phase": 16,
    "title": "Sidebar: workspace header + avatar",
    "description": "Añadir al tope del sidebar: avatar del usuario (iniciales o foto de user_profiles), nombre del workspace, dropdown con opciones de cuenta (Configuración, Cerrar sesión). Ancla visualmente toda la navegación igual que Notion.",
    "status": "done",
    "depends_on": [],
    "files": [
      "components/sidebar/Sidebar.tsx",
      "store/profileStore.ts"
    ],
    "notes": "Header al tope del Sidebar antes de la navegación: avatar 32px (avatar_url de user_profiles con cache-bust por updated_at; fallback círculo bg-accent con iniciales de display_name o email vía supabase.auth.getUser()), nombre display_name ?? email (text-sm font-medium truncate), ChevronDown que rota 180° al abrir. Dropdown con estado local accountMenuOpen + click-outside (mousedown) + Escape: Configuración → router.push('/dashboard/settings') (el dashboard no renderiza vista 'settings' por currentView, es ruta propia), Cerrar sesión → supabase.auth.signOut() + redirect /login. En modo colapsado (48px) solo avatar centrado y el dropdown se posiciona a la derecha del sidebar (left-full ml-2, sin recorte, sin overflow-hidden) con opción extra 'Expandir panel'. Separador border-b bajo el header; estética consistente con NavItems (rounded-lg, px-3 py-2)."
  },
  {
    "id": 50,
    "phase": 16,
    "title": "Sidebar: separadores visuales + grupos de sección",
    "description": "Agrupar nav items en 3 secciones con separadores sutiles: Principal (notas, favoritos, tareas, calendario) / Organización (libretas, etiquetas, espacios) / Herramientas (archivos, plantillas, IA assistant). Gap de 6px entre grupos, divider 0.5px.",
    "status": "done",
    "depends_on": [
      49
    ],
    "files": [
      "components/sidebar/Sidebar.tsx",
      "app/globals.css"
    ],
    "notes": "Solo cambios visuales en Sidebar.tsx. Agrupar los NavItems existentes en secciones con un componente SidebarSection o divider simple. Sin cambios en uiStore ni en las vistas."
  },
  {
    "id": 51,
    "phase": 16,
    "title": "Sidebar: full-row click zones + hover mejorado",
    "description": "Expandir zona clickeable al 100% del ancho del sidebar (no solo ícono+texto). Hover con border-radius 8px en highlight. Padding interno consistente 8px vertical / 12px horizontal en todos los nav items. Eliminar cualquier item con prop disabled que ya esté implementado.",
    "status": "done",
    "depends_on": [
      49,
      50
    ],
    "files": [
      "components/sidebar/Sidebar.tsx",
      "app/globals.css"
    ],
    "notes": "Patrón de Notion: click zone ocupa todo el row, rx=8 en highlight. En Tailwind v4: w-full rounded-lg px-3 py-2 en cada NavItem. El item de IA Assistant (id:47) debe estar activo aquí, no disabled."
  },
  {
    "id": 52,
    "phase": 16,
    "title": "Sidebar: sección 'Más' colapsable",
    "description": "Mover items secundarios (Archivos, Plantillas, Configuración) a una sección 'Más' expandible/colapsable al fondo del sidebar. Estado persistido en localStorage('noteevo-sidebar-more-open'). Inspirado en Evernote v10.107 customizable sidebar.",
    "status": "done",
    "depends_on": [
      50,
      51
    ],
    "files": [
      "components/sidebar/Sidebar.tsx"
    ],
    "notes": "Usar estado local + localStorage para persistir. Chevron rotado 180° cuando está abierto. Animación con transition-all + max-h en Tailwind. Items dentro del 'Más': FilesView, TemplatesView, settings."
  },
  {
    "id": 53,
    "phase": 16,
    "title": "Sidebar: modo colapsado (solo íconos, 48px)",
    "description": "Toggle para colapsar sidebar a solo íconos (48px de ancho) en vez del ancho completo (~240px). Tooltip con nombre al hover sobre ícono en modo colapsado. Botón de toggle en borde del sidebar. Shortcut Ctrl+\\.",
    "status": "done",
    "depends_on": [
      49,
      50,
      51
    ],
    "files": [
      "components/sidebar/Sidebar.tsx",
      "store/uiStore.ts",
      "app/(dashboard)/layout.tsx",
      "app/globals.css"
    ],
    "notes": "Añadir isSidebarCollapsed: boolean a uiStore.ts. El layout del dashboard debe ajustar grid-cols o flex cuando el sidebar está colapsado. Persistir en localStorage('noteevo-sidebar-collapsed'). Tooltip: title attribute o custom tooltip component. El shortcut usa el mismo sistema de useKeyboardShortcuts.ts."
  },
  {
    "id": 54,
    "phase": 16,
    "title": "Sidebar: notebooks expandibles inline",
    "description": "Al hacer clic en 'Libretas' en el sidebar, mostrar acordeón inline con las libretas del usuario (nombre + conteo de notas). Clic en una libreta → setSelectedNotebook + setCurrentView('notebooks'). Patrón de Notion de páginas anidadas.",
    "status": "done",
    "depends_on": [
      49,
      50,
      51
    ],
    "files": [
      "components/sidebar/Sidebar.tsx",
      "store/notebookStore.ts"
    ],
    "notes": "Usar notebookStore.notebooks (ya existe). Mostrar máximo 7 libretas; si hay más, mostrar 'Ver todas →'. Cada fila: ícono BookOpen + nombre truncado + conteo de notas en badge gris. Estado isNotebooksExpanded local + localStorage('noteevo-sidebar-notebooks-open')."
  },
  {
    "id": 55,
    "phase": 17,
    "title": "Emoji / icono por nota",
    "status": "done",
    "depends_on": [],
    "effort": "medium",
    "impact": "high",
    "needs_db": true,
    "sql": "ALTER TABLE notes ADD COLUMN emoji text;",
    "files": [
      "lib/supabase/notes.ts",
      "components/editor/NoteEditor.tsx",
      "components/notes/NoteList.tsx",
      "types/index.ts"
    ],
    "notes": "Picker inline en NoteEditor al clic en zona del título (encima del input). Fallback: icono FileText de Lucide. Mostrar en NoteList junto al título. Función addEmoji(noteId, emoji) en notes.ts. Opcional: acción 'suggest_emoji' via Groq (mismo patrón que suggest-tags)."
  },
  {
    "id": 56,
    "phase": 17,
    "title": "Contador de palabras + tiempo de lectura",
    "status": "done",
    "depends_on": [],
    "effort": "easy",
    "impact": "medium",
    "needs_db": false,
    "files": [
      "components/editor/NoteEditor.tsx"
    ],
    "notes": "Solo NoteEditor.tsx. Calcular desde editor.getText().trim().split(/\\s+/).filter(Boolean).length. Tiempo = Math.ceil(words / 238). Mostrar en barra inferior del editor junto al estado de guardado (Guardado / Guardando...). Formato: '680 palabras · 3 min lectura'. Actualizar en onUpdate del editor."
  },
  {
    "id": 57,
    "phase": 17,
    "title": "Notas ancladas (pinned)",
    "status": "done",
    "depends_on": [],
    "effort": "easy",
    "impact": "medium",
    "needs_db": true,
    "sql": "ALTER TABLE notes ADD COLUMN is_pinned boolean default false;",
    "files": [
      "lib/supabase/notes.ts",
      "components/notes/NoteList.tsx",
      "types/index.ts"
    ],
    "notes": "Migración aplicada vía MCP (ADD COLUMN IF NOT EXISTS is_pinned boolean default false). is_pinned?: boolean en tipo Note. togglePin(id, value) en notes.ts (molde de toggleFavorite). NoteList: separa notes en pinned/rest tras ordenar; sección 'Ancladas' (con label) encima de 'Otras'. Botón Pin (icono Pin Lucide) absoluto top-right de cada card, visible on hover o siempre si anclada; fill-accent cuando activo. Toggle optimista con updateNote del store + rollback si falla. Build verde."
  },
  {
    "id": 58,
    "phase": 17,
    "title": "Tooltips con shortcut en toolbar",
    "status": "done",
    "depends_on": [],
    "effort": "easy",
    "impact": "low",
    "needs_db": false,
    "files": [
      "components/editor/NoteEditor.tsx",
      "components/editor/FormatDropdowns.tsx",
      "components/editor/ToolbarTooltip.tsx"
    ],
    "notes": "Crear ToolbarTooltip.tsx: wrapper CSS puro (no Radix), posición absolute, delay 400ms con setTimeout. Props: label string, shortcut? string. Formato en tooltip: 'Negrita' + elemento kbd con 'Ctrl+B'. Aplicar en todos los botones de NoteEditor.tsx y FormatDropdowns.tsx."
  },
  {
    "id": 59,
    "phase": 17,
    "title": "Cover image por nota",
    "status": "done",
    "depends_on": [
      55
    ],
    "effort": "medium",
    "impact": "high",
    "needs_db": true,
    "sql": "ALTER TABLE notes ADD COLUMN cover_url text; ALTER TABLE notes ADD COLUMN cover_gradient text;",
    "files": [
      "lib/supabase/notes.ts",
      "components/editor/NoteEditor.tsx",
      "components/notes/NoteList.tsx",
      "types/index.ts"
    ],
    "notes": "Zona de cover encima del título en NoteEditor (visible solo si hay cover o si el usuario hace hover en esa área). Upload via Supabase Storage: mismo bucket que imágenes de notas, ruta covers/{user_id}/{note_id}. Gradientes alternativos: array de 8 opciones predefinidas como strings CSS. En NoteList card: franja de 40px de alto con la imagen/gradiente cuando existe. Función updateCover(noteId, {cover_url?, cover_gradient?}) en notes.ts."
  },
  {
    "id": 60,
    "phase": 17,
    "title": "Gallery view en lista de notas",
    "status": "done",
    "depends_on": [],
    "effort": "medium",
    "impact": "high",
    "needs_db": false,
    "files": [
      "components/notes/NoteList.tsx"
    ],
    "notes": "Solo NoteList.tsx. Toggle lista/galería en barra de controles (iconos LayoutList/LayoutGrid de Lucide), activo resaltado. Preferencia en localStorage('noteevo-notes-view'), cargada en useEffect tras montar (evita mismatch de hidratación). Vista grid: grid-cols-2 gap-2, cards con borde redondeado, título, preview 3 líneas (extractTextPreview a 140 chars) y footer fecha+favorito. Reusa extractTextPreview existente; sin llamadas extra a DB (usa noteStore.notes). Botón pin también disponible en cards de galería."
  },
  {
    "id": 61,
    "phase": 17,
    "title": "Opciones tipográficas del editor",
    "status": "done",
    "depends_on": [],
    "effort": "medium",
    "impact": "medium",
    "needs_db": true,
    "sql": "ALTER TABLE user_profiles ADD COLUMN editor_prefs jsonb default '{}'::jsonb;",
    "files": [
      "lib/supabase/profile.ts",
      "components/editor/NoteEditor.tsx",
      "store/profileStore.ts",
      "app/globals.css"
    ],
    "notes": "Migración aplicada: user_profiles + editor_font_family text DEFAULT sans, editor_font_size int DEFAULT 16, editor_line_height numeric DEFAULT 1.7 (3 columnas, no jsonb). PARTE1 defaults en globals.css .ProseMirror: line-height 1.7 base, ritmo vertical (p 0.75em top, h1-3 1.4em/0.5em), text-wrap balance en h1-3, blockquote/code/hr con tokens; bloques custom (Callout/Toggle/TOC/tabla) intactos. PARTE2: lib/constants/editor-fonts.ts (6 familias EXACTAS de FormatDropdowns: sans/serif/slab/mono/script/hand, sin recargar fuentes). profileStore con editorFontFamily/Size/LineHeight + setters async que persisten via updateProfile y revierten on error. NoteEditor inyecta --editor-font-family/-size/-line-height inline SOLO sobre el cuerpo (no el título); defaults PARTE1 como fallback. profile.ts sin cambios: select(*) ya trae las columnas y updateProfile es Partial<UserProfile> tipado. PARTE3: settings/page.tsx sección Editor bajo tema/idioma: selector de familia (preview en su fuente), stepper 12-22px con muestra Aa, interlineado 1.4/1.7/2.0; cambios en vivo via store. Build verde. MODELO FINAL — tipografía POR NOTA + default global (dos capas por UBICACIÓN, no por selección): (1) DEFAULT GLOBAL — Configuración → Editor (user_profiles.editor_font_*), SE QUEDA igual. (2) POR NOTA — popover \"Aa\" en la toolbar (components/editor/NoteTypographyPopover.tsx, icono Type) configura familia + tamaño (stepper 12-22px) + interlineado (Compacto/Normal/Amplio) de ESTA nota, guardado en columnas nuevas nullable note_font_family/note_font_size/note_line_height (migración ya aplicada). Prioridad: valor de la nota ?? global. NoteEditor recomputa valores EFECTIVOS en cada render (selectedNote ?? profileStore) e inyecta --editor-font-family/-size/-line-height inline solo en el cuerpo → reactivo en vivo a popover Y a Configuración (arregla el bug previo de no-reactividad del global). Popover: muestra efectivos, click-outside + Escape, sin overflow-hidden; \"Restablecer a predeterminado\" pone las 3 columnas en null; \"Usar para todas mis notas\" escribe los efectivos en user_profiles (setters de profileStore) y pone la nota en null. Capa de datos: lib/supabase/notes.ts updateNoteTypography(noteId,{fontFamily,fontSize,lineHeight}) (solo escribe campos presentes; null = heredar); select('*') ya trae las columnas. RETIRADOS los controles POR SELECCIÓN de fuente y tamaño: eliminados FontFamilySelector y FontSizeSelector de FormatDropdowns.tsx (queda solo TextColorPicker), desregistradas las extensiones FontFamily y FontSize de sharedEditorExtensions y borrado lib/editor/font-size.ts. TextStyle + Color se mantienen (los necesita el color de texto por selección \"A\"). B/I/U/S, super/subíndice, eraser, color, alineación, H1-H3, listas, código y bloques custom intactos. Nota: notas viejas con marcas de font-family por selección pierden ese estilo (datos de prueba, aceptable). Build verde."
  },
  {
    "id": 62,
    "phase": 17,
    "title": "Empty states con ilustración",
    "status": "done",
    "depends_on": [],
    "effort": "easy",
    "impact": "medium",
    "needs_db": false,
    "files": [
      "components/ui/EmptyState.tsx",
      "components/notes/NoteList.tsx",
      "components/tasks/TaskList.tsx",
      "components/files/FilesView.tsx",
      "components/calendar/CalendarView.tsx",
      "components/templates/TemplatesView.tsx",
      "components/notes/TrashNotes.tsx"
    ],
    "notes": "Crear EmptyState.tsx: props icon (SVG inline simple, no librería), title, description, action? {label, onClick}. SVGs: formas geométricas simples que sugieran el concepto (ej. para notas: rectángulos apilados; para tareas: checkboxes). Cada uso tiene título y CTA específico en español. Ej notas vacías: 'Sin notas aquí' + 'Crear primera nota'. | DONE: EmptyState.tsx (variant notes/tasks/files/calendar/templates/trash/search, SVG inline 80x80 stroke+detalle accent, fade emptyStateEnter). Aplicado en NoteList(notes+action), TaskList(tasks/search segun filtros), FilesView(files/search), CalendarView DayView(calendar+onAdd), TemplatesView(search/templates-mias), TrashNotes(trash). Build verde."
  },
  {
    "id": 63,
    "phase": 17,
    "title": "Ordenar notas por más criterios",
    "status": "done",
    "depends_on": [],
    "effort": "easy",
    "impact": "low",
    "needs_db": false,
    "files": [
      "components/notes/NoteList.tsx"
    ],
    "notes": "Solo NoteList.tsx. SortDropdown custom (icono ArrowUpDown + label, click-outside, check en activa) con 4 opciones: 'Última edición' (updated_at DESC, default), 'Fecha de creación' (created_at DESC), 'Título A-Z' (localeCompare es), 'Más largas' (JSON.stringify(content).length DESC). Preferencia en localStorage por libreta: noteevo-sort-{notebookId|'all'}, recargada al cambiar de libreta. Ordenación client-side en useMemo sobre noteStore.notes (sin fetch extra); se aplica antes de separar pinned/rest."
  },
  {
    "id": 64,
    "phase": 17,
    "title": "Color por nota",
    "status": "done",
    "depends_on": [],
    "effort": "medium",
    "impact": "medium",
    "needs_db": true,
    "sql": "ALTER TABLE notes ADD COLUMN color text;",
    "files": [
      "lib/supabase/notes.ts",
      "components/notes/NoteList.tsx",
      "types/index.ts"
    ],
    "notes": "8 colores predefinidos + null (sin color). Paleta: red, orange, yellow, green, teal, blue, purple, pink. En NoteList card: borde izquierdo de 3px con el color elegido (reemplaza el borde accent verde del hover). Picker en menú contextual de la card. Filtro de color en header de NoteList (pills de colores). Función updateNoteColor(noteId, color|null) en notes.ts."
  },
  {
    "id": 65,
    "phase": 17,
    "title": "Typewriter mode + párrafo activo destacado",
    "status": "done",
    "depends_on": [],
    "effort": "medium",
    "impact": "medium",
    "needs_db": false,
    "files": [
      "components/editor/NoteEditor.tsx",
      "store/uiStore.ts",
      "app/globals.css"
    ],
    "notes": "Toggle isTypewriterMode en uiStore.ts. Typewriter: en onSelectionUpdate del editor, llamar editor.view.dom.querySelector('.ProseMirror-focused')?.scrollIntoView({block:'center',behavior:'smooth'}). Párrafo activo: CSS en globals.css — .typewriter-mode .ProseMirror p { opacity: 0.35; transition: opacity 0.2s } + .typewriter-mode .ProseMirror .is-active-paragraph { opacity: 1 }. Añadir clase is-active-paragraph al nodo activo via plugin TipTap o en onSelectionUpdate. Botón en barra inferior del editor."
  },
  {
    "id": 66,
    "phase": 17,
    "title": "Comando rápido mejorado (Ctrl+K)",
    "status": "done",
    "notes": "CommandPalette en components/command/CommandPalette.tsx. Ctrl+K abre palette (solo fuera de editables). Secciones: Acciones (nueva nota, guardar plantilla, tema claro/oscuro/sistema), Ir a (11 vistas), Libretas, Spaces, Notas (búsqueda debounce 200ms). Navegación ↑↓/Enter. Animación fade+scale con prefers-reduced-motion. Montado en dashboard/layout.tsx.",
    "depends_on": [],
    "effort": "medium",
    "impact": "medium",
    "needs_db": false,
    "files": [
      "components/search/CommandPalette.tsx",
      "store/uiStore.ts",
      "hooks/useKeyboardShortcuts.ts"
    ],
    "notes": "Rediseñar el modal de Ctrl+K existente. Input unificado: si el valor empieza con '>' es comando, sino es búsqueda (mantener búsqueda actual). Comandos: >nueva nota, >nueva tarea, >ir tareas, >ir calendario, >ir archivos, >cambiar tema, >configuración. Cada comando tiene ícono Lucide + shortcut visible. Navegación con teclado (↑↓ + Enter). Si ya existe el componente de búsqueda, extenderlo; si no, crear CommandPalette.tsx nuevo."
  },
  {
    "id": 67,
    "phase": 17,
    "title": "Importar desde Markdown / .enex",
    "status": "done",
    "depends_on": [],
    "effort": "medium",
    "impact": "medium",
    "needs_db": false,
    "files": [
      "app/api/import/route.ts",
      "components/notes/ImportModal.tsx",
      "lib/utils/tiptap.ts"
    ],
    "notes": "Route Handler server-side para manejar archivos grandes. Para .md: usar marked (npm install marked) para parsear → convertir HTML a TipTap JSON (invertir lógica de lib/utils/tiptap.ts). Para .enex: XML con estructura <en-export><note><title>...<content>ENML... Parsear con DOMParser en server. ENML es HTML-like: convertir tags EN a equivalentes HTML → a TipTap JSON. Modal con drag&drop de archivos, selector de libreta destino, barra de progreso. Crear nota(s) via createNote + updateNote existentes."
  },
  {
    "id": 68,
    "phase": 17,
    "title": "Backlinks entre notas",
    "status": "done",
    "depends_on": [],
    "effort": "hard",
    "impact": "high",
    "needs_db": true,
    "sql": "CREATE TABLE note_links (source_note_id uuid references notes(id) ON DELETE CASCADE, target_note_id uuid references notes(id) ON DELETE CASCADE, created_at timestamptz default now(), PRIMARY KEY (source_note_id, target_note_id)); ALTER TABLE note_links ENABLE ROW LEVEL SECURITY; CREATE POLICY note_links_policy ON note_links USING (EXISTS (SELECT 1 FROM notes WHERE id = source_note_id AND user_id = auth.uid()));",
    "files": [
      "lib/editor/notelink-extension.ts",
      "lib/supabase/note-links.ts",
      "components/editor/NoteLinkComponent.tsx",
      "components/editor/NoteLinkMenu.tsx",
      "components/editor/BacklinksPanel.tsx",
      "components/editor/NoteEditor.tsx"
    ],
    "notes": "DB: tabla note_links (source_note_id/target_note_id uuid PK, CASCADE, RLS) + RPC get_backlinks(p_note_id). NoteLinkExtension (lib/editor/notelink-extension.ts): nodo inline atom 'noteLink' con attrs {noteId, title}, ReactNodeViewRenderer → NoteLinkComponent.tsx (chip azul con icono Link, click→setSelectedNote). NoteLinkMenu.tsx: dropdown flotante al tipear [[, filtro de notas del store, ↑↓Enter, onMouseDown→insertContent noteLink + delete [[query. BacklinksPanel.tsx: panel lateral 288px con lista de notas que enlazan a la actual. NoteEditor.tsx: agrega NoteLinkExtension a extensions, collectNoteLinkIds() escanea JSON del doc, onUpdate detecta [[ via regex y posiciona el menú, autosave llama syncNoteLinks, botón Backlinks en toolbar. Build verde."
  },
  {
    "id": 69,
    "phase": 17,
    "title": "IA inline en editor (/ai)",
    "status": "pending",
    "depends_on": [],
    "effort": "hard",
    "impact": "high",
    "needs_db": false,
    "files": [
      "lib/editor/ai-inline-extension.ts",
      "app/api/ai/inline/route.ts",
      "components/editor/NoteEditor.tsx"
    ],
    "notes": "Extensión TipTap: InputRule que detecta '/ai ' al inicio de un párrafo vacío → reemplaza el nodo por un placeholder decorativo 'Escribe un prompt...' → al presionar Enter toma el texto del párrafo como prompt → llama app/api/ai/inline/route.ts con {prompt, context: nota actual} → streaming → inserta la respuesta en el documento reemplazando el nodo de prompt. Route Handler: mismo patrón que chat/route.ts pero sin historial. Rate limit: acción 'ai_inline' en ai_usage. Solo implementar después de todos los demás."
  }
]
````
