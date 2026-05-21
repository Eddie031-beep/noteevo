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
| TipTap | ^3.23.1 | Editor rich-text, contenido en JSON |
| Groq SDK | ^1.2.0 | LLM — llama-3.3-70b-versatile, server-side only |
| Zustand | ^5.0.13 | Estado global del cliente |
| Tailwind CSS | v4 | Config via `@import "tailwindcss"` en globals.css — NO existe tailwind.config.ts |
| Lucide React | ^1.14.0 | Iconos |
| date-fns | ^4.1.0 | Fechas |

---

## Estado actual del proyecto

### ✅ Completado (phases 1–7 parcial)

**Auth** — Login, registro, middleware, clientes browser/server.

**Notebooks** — CRUD completo. Integrado en sidebar. Soporte de `space_id` para spaces.

**Notes** — CRUD completo, favoritos, papelera, restaurar, eliminar permanentemente.

**Editor TipTap** — Toolbar completa (bold, italic, underline, strike, highlight, align, H1/H2/H3, listas, task list, código, imagen). Autosave 800ms. Upload imágenes a `note-images`. Read-only para viewers de spaces.

**Tags** — CRUD completo. `TagInput` con create/add/remove. Store global cargado en Sidebar.

**Búsqueda** — RPC `search_notes()` con debounce 400ms.

**Rediseño visual** — Dark mode. Design tokens CSS. Sidebar colapsable 56px/240px.

**Tasks** — CRUD completo. Filtros por estado/prioridad/fecha. Badge pendientes en sidebar. Vista por libreta.

**Files** — Upload drag & drop con progreso. Vista `FilesView` con tabs Todos/Media/Docs.

**Calendar** — Vistas Mes/Semana/Día. Timezone fix (local, no UTC).

**Spaces** — `spaces` + `space_members` con RLS completo. Roles owner/admin/editor/viewer. Invite via service role. Gestión de miembros (ver email, cambiar rol, expulsar). Realtime para expulsión automática.

**IA — Resumir nota (id:18)** — `/api/ai/summarize` con Groq. Panel lateral `AiSummaryPanel`. Rate limit 10/día.

**IA — Mejorar escritura (id:19)** — `/api/ai/improve` con streaming. `AiImproveToolbar` flotante al seleccionar texto. Rate limit 10/día.

**IA — Chat con nota (id:20)** — `/api/ai/chat` con streaming. `AiChatPanel` panel derecho 320px. Historial en sesión. Rate limit 20/día.

---

## TODOs pendientes

### TODO #1 — IA Smart Tags (id:21) — NEXT
- Ruta: `/api/ai/suggest-tags` — Groq analiza contenido → devuelve hasta 5 tags
- UI en `NoteEditor`: botón "Sugerir tags" en toolbar o junto a `TagInput`
- Componente `AiSuggestTagsPanel` o inline: chips aceptar/rechazar individualmente
- Crear tags nuevos si no existen (reusar `createTag` + `addTagToNote`)
- Rate limit via `ai_usage` (action: `suggest_tags`, max 10/día)

---

## Arquitectura de carpetas

```
app/
├── (auth)/login/page.tsx
├── (auth)/register/page.tsx
├── (dashboard)/dashboard/page.tsx   ← view switcher via uiStore
├── (dashboard)/layout.tsx           ← Sidebar + main
├── api/
│   ├── ai/summarize/route.ts        ← Groq, no streaming
│   ├── ai/improve/route.ts          ← Groq, streaming
│   ├── ai/chat/route.ts             ← Groq, streaming
│   └── spaces/invite/route.ts       ← service role
├── globals.css
└── middleware.ts

components/
├── editor/
│   ├── NoteEditor.tsx               ← toolbar + AI botones + panels
│   ├── TagInput.tsx
│   ├── AttachmentPanel.tsx
│   ├── AiSummaryPanel.tsx
│   ├── AiImproveToolbar.tsx         ← flotante al seleccionar texto
│   └── AiChatPanel.tsx              ← panel derecho 320px
├── notes/NoteList.tsx, FavoriteNotes.tsx, TrashNotes.tsx, SearchResults.tsx
├── tasks/TaskList.tsx, TaskModal.tsx
├── files/FilesView.tsx
├── calendar/CalendarView.tsx
├── spaces/
│   ├── SpacesView.tsx
│   ├── SpaceDetailView.tsx          ← tabs: Notebooks / Notas / Miembros
│   ├── SharedWithMeView.tsx
│   ├── CreateSpaceModal.tsx
│   ├── CreateNotebookInSpaceModal.tsx
│   └── InviteModal.tsx
└── sidebar/Sidebar.tsx              ← Realtime expulsión + selectedSpace check

lib/supabase/
├── client.ts                        ← browser
├── server.ts                        ← server components / route handlers
├── admin.ts                         ← service role (solo server)
├── notes.ts, notebooks.ts, tags.ts, search.ts, storage.ts
├── tasks.ts                         ← TaskWithContext type
├── attachments.ts                   ← AttachmentWithNote type
└── spaces.ts                        ← SpaceMemberWithEmail type, RPC

store/
├── notebookStore.ts, noteStore.ts, tagStore.ts
├── uiStore.ts                       ← currentView type incluye todos los views
├── taskStore.ts
└── spaceStore.ts

types/index.ts                       ← todos los tipos compartidos
hooks/useSpaceRole.ts
```

---

## Variables de entorno requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # solo server — /api/spaces/invite
GROQ_API_KEY=                # solo server — nunca NEXT_PUBLIC_
```

---

## Schema de DB actual (Supabase: blhbvurcconebtelbnlw)

```sql
-- notebooks (con space_id añadido)
create table notebooks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  description text,
  space_id uuid references spaces(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- notes
create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  notebook_id uuid references notebooks(id) on delete cascade,
  title text not null default 'Sin título',
  content jsonb default '{}',
  is_favorite boolean default false,
  is_trashed boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- tags / note_tags
create table tags (id uuid primary key..., user_id, name, created_at);
create table note_tags (note_id uuid, tag_id uuid, primary key (note_id, tag_id));

-- tasks
create table tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  note_id uuid references notes(id) on delete set null,
  title text not null,
  description text,
  due_date timestamptz,
  reminder_at timestamptz,
  priority text check (priority in ('low', 'medium', 'high')) default 'medium',
  is_flagged boolean default false,
  is_completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- attachments (columnas actuales)
create table attachments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  note_id uuid references notes(id) on delete cascade,  -- nullable
  file_name text not null,
  file_type text,
  file_size bigint,          -- ojo: file_size (no size)
  storage_path text not null, -- ojo: storage_path (no file_url)
  created_at timestamptz default now()
);

-- spaces
create table spaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  owner_id uuid references auth.users not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- space_members (REPLICA IDENTITY FULL para Realtime)
create table space_members (
  space_id uuid references spaces(id) on delete cascade,
  user_id uuid references auth.users,
  role text check (role in ('viewer', 'editor', 'admin')) default 'viewer',
  invited_by uuid references auth.users,
  joined_at timestamptz default now(),
  primary key (space_id, user_id)
);

-- ai_usage
create table ai_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  action text not null,   -- 'summarize' | 'improve' | 'chat' | 'suggest_tags'
  tokens_used int,
  created_at timestamptz default now()
);
```

### RPCs existentes

```sql
-- Búsqueda full-text
create function search_notes(search_query text) returns setof notes ...

-- Email de miembros de un space (SECURITY DEFINER)
create function get_space_members_with_email(p_space_id uuid)
  returns table(user_id uuid, role text, invited_by uuid, joined_at timestamptz, email text) ...

-- Lookup de user por email (SECURITY DEFINER)
create function get_user_id_by_email(email text) returns uuid ...
```

---

## Decisiones técnicas importantes (NO cambiar sin justificación)

| Decisión | Razón |
|---|---|
| Groq SDK `llama-3.3-70b-versatile` | Gratis, ~250 tok/s, migrado desde Anthropic |
| `GROQ_API_KEY` solo server, nunca `NEXT_PUBLIC_` | Seguridad — no exponer al cliente |
| Streaming via `ReadableStream` nativo | Next.js App Router compatible |
| Rate limit via tabla `ai_usage` | Sin dependencias externas |
| Tailwind v4: config en globals.css | No existe tailwind.config.ts |
| TipTap `immediatelyRender: false` | Evita hydration error SSR |
| `key={selectedNote.id}` en TagInput | Reset limpio al cambiar nota |
| Tags cargados en Sidebar (siempre montado) | Evita re-fetches |
| Búsqueda via RPC `search_notes` | No usar textSearch de Supabase |
| Calendar: `new Date(year, month-1, day)` | Evita offset UTC en timezone local |
| `REPLICA IDENTITY FULL` en space_members | Necesario para Realtime DELETE |
| Columna `is_trashed` (no `is_deleted`) | Así está en DB real |
| Columnas `storage_path` y `file_size` en attachments | Renombradas desde file_url/size |

---

## Comandos

```bash
npm run dev     # desarrollo con Turbopack
npm run build   # build de producción (TypeScript check)
npm run lint    # ESLint
```

---

## Reglas de desarrollo

1. Sin `any` sin justificación documentada
2. Sin `console.log()` de debug en código entregado
3. RLS activo en todas las tablas — nunca bypassear
4. `lib/supabase/client.ts` en componentes cliente, `server.ts` en Route Handlers
5. Mensajes de error al usuario siempre en español
6. `npm run build` verde antes de marcar cualquier feature como done
7. Queries a Supabase siempre en `lib/supabase/`, nunca inline en componentes
8. `GROQ_API_KEY` solo en server — nunca en cliente
9. Columna `is_trashed`, no `is_deleted`
