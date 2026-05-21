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
| Groq SDK | ^0.x | LLM API — llama-3.3-70b-versatile, server-side only |
| Zustand | ^5.0.13 | Estado global del cliente |
| Tailwind CSS | v4 | Config via `@import "tailwindcss"` en globals.css — NO existe tailwind.config.ts |
| Lucide React | ^1.14.0 | Iconos |
| date-fns | ^4.1.0 | Fechas |

---

## Estado actual del proyecto

### ✅ Completado

**Auth**
- Login y registro (`app/(auth)/login/page.tsx`, `app/(auth)/register/page.tsx`)
- Middleware de protección de rutas (`middleware.ts`)
- Cliente browser (`lib/supabase/client.ts`) y server (`lib/supabase/server.ts`)

**Notebooks**
- CRUD completo (`lib/supabase/notebooks.ts`)
- Integrado en sidebar con creación inline y eliminación

**Notes**
- CRUD completo (`lib/supabase/notes.ts`)
- `getNotesByNotebook`, `createNote`, `updateNote`, `trashNote`
- `toggleFavorite`, `getFavoriteNotes`, `getTrashedNotes`, `restoreNote`, `permanentlyDeleteNote`

**Editor TipTap**
- `components/editor/NoteEditor.tsx` — toolbar completa con bold, italic, underline, strikethrough, highlight, align, H1/H2/H3, listas, task list, código, imagen
- Autosave con debounce 800ms
- Upload de imágenes a Supabase Storage (`lib/supabase/storage.ts` → bucket `note-images`)
- `immediatelyRender: false` para SSR

**Tags**
- CRUD completo (`lib/supabase/tags.ts`)
- `TagInput` component con create/add/remove (`components/editor/TagInput.tsx`)
- Store global (`store/tagStore.ts`), cargado una vez en Sidebar

**Búsqueda**
- `lib/supabase/search.ts` → `.rpc('search_notes', { search_query })`
- `components/notes/SearchResults.tsx` con debounce 400ms
- ⚠️ PENDIENTE: Crear la función Postgres `search_notes` en Supabase (ver TODO #1)

**Vistas**
- `FavoriteNotes`, `TrashNotes`, `SearchResults`, `NoteList`
- `uiStore` con `currentView: 'notebooks' | 'favorites' | 'trash' | 'search'`

**Utilidades**
- `lib/utils/tiptap.ts` → `extractTextPreview(content, maxLength)` — integrado en NoteList y FavoriteNotes

---

## TODOs pendientes (en orden de prioridad)

### TODO #1 — Función Postgres `search_notes` (BLOCKER para búsqueda)
Ejecutar en Supabase SQL Editor:
```sql
create or replace function search_notes(search_query text)
returns setof notes
language sql
security definer
as $$
  select * from notes
  where user_id = auth.uid()
    and is_trashed = false
    and (
      title ilike '%' || search_query || '%'
      or content::text ilike '%' || search_query || '%'
    )
  order by updated_at desc;
$$;
```

### TODO #2 — Eliminar `components/dashboard/DashboardContent.tsx`
Archivo redundante. El dashboard usa directamente `app/(dashboard)/dashboard/page.tsx`.

### TODO #3 — Rediseño visual completo (Phase siguiente)
El UI actual es funcional pero usa el tema default de Next.js (fondo blanco, grises).
El objetivo es un diseño dark mode inspirado en Evernote pero con identidad propia:
- Fondo `#0f0f0f`, paneles `#1a1a1a`, hover `#242424`
- Color primario: verde esmeralda `#1a7a4a`
- Sidebar colapsable (56px ↔ 240px)
- Layout de 3 paneles refinado

### TODO #4 — Tasks (Phase 4)
- Schema: tabla `tasks` en Supabase
- CRUD con campos: título, descripción, due date, reminder, prioridad, flag
- Vista "My tasks" en sidebar
- Modal de creación estilo Evernote

### TODO #5 — Files/adjuntos (Phase 5)
- Tabla `attachments` en Supabase
- Vista Files con tabs: Files / Media / Docs

### TODO #6 — Calendar (Phase 5)
- Vista calendario con tasks que tienen due date
- Vistas Day / Week / Month

### TODO #7 — Spaces/colaboración (Phase 6)
- Tablas `spaces` y `space_members`
- Compartir notebooks dentro de un Space

### TODO #8 — IA integrada con Groq API (Phase 7)
- Usar `llama-3.3-70b-versatile` via Groq API (server-side only)
- Features: resumir nota, mejorar escritura, chat con nota, smart tags
- Rate limiting: tabla `ai_usage` (máx 10 req/día/usuario)
- API key en `GROQ_API_KEY` env var — nunca expuesta al cliente

---

## Arquitectura de carpetas

```
app/
├── (auth)/
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/
│   ├── dashboard/page.tsx       ← client component, view switcher via uiStore
│   └── layout.tsx               ← Sidebar + main
├── globals.css                  ← Tailwind v4 + @plugin "@tailwindcss/typography"
├── layout.tsx                   ← Root layout (Geist font)
├── page.tsx                     ← Landing (aún es el default de Next.js)
└── middleware.ts                ← Auth guard

components/
├── dashboard/
│   └── DashboardContent.tsx     ← REDUNDANTE, eliminar (TODO #2)
├── editor/
│   ├── NoteEditor.tsx           ← TipTap + toolbar + TagInput + image upload
│   └── TagInput.tsx             ← Tag picker/creator con dropdown
├── notes/
│   ├── NoteList.tsx
│   ├── FavoriteNotes.tsx        ← local state, no depende de noteStore
│   ├── TrashNotes.tsx           ← local state con restore/delete
│   └── SearchResults.tsx        ← debounce 400ms → RPC
└── sidebar/
    └── Sidebar.tsx              ← nav + búsqueda + carga global de tags

lib/supabase/
├── client.ts                    ← createBrowserClient (browser/client components)
├── server.ts                    ← createServerClient (Server Components, Route Handlers)
├── notes.ts                     ← CRUD + favorite/trash ops
├── notebooks.ts                 ← CRUD
├── tags.ts                      ← tag CRUD + note-tag join ops
├── search.ts                    ← RPC search_notes
└── storage.ts                   ← uploadNoteImage → bucket 'note-images'

lib/utils/
└── tiptap.ts                    ← extractTextPreview(content, maxLength=120)

store/
├── notebookStore.ts             ← notebooks[], selectedNotebook
├── noteStore.ts                 ← notes[], selectedNote, CRUD actions
├── tagStore.ts                  ← tags[], setTags, addTag, removeTag
└── uiStore.ts                   ← currentView, searchQuery

types/
└── index.ts                     ← Notebook, Note, Tag, NoteTag, Attachment
```

---

## Decisiones técnicas importantes (NO cambiar sin justificación)

| Decisión | Razón |
|---|---|
| Tailwind v4: config via `@import "tailwindcss"` en globals.css | No existe `tailwind.config.ts` en v4 |
| `@plugin "@tailwindcss/typography"` en globals.css | Plugin de prosa para TipTap |
| TipTap: `immediatelyRender: false` en useEditor | Evita error de hidratación SSR |
| NoteEditor usa `titleRef` (uncontrolled input) + `syncedNoteIdRef` | Evita `set-state-in-effect` lint error |
| `key={selectedNote.id}` en TagInput | Fuerza remount al cambiar de nota (reset limpio) |
| Tags cargados una vez en Sidebar (siempre montado) | Evita re-fetches innecesarios |
| Búsqueda via `.rpc('search_notes')` | No usar `textSearch` de Supabase |
| Click-outside en TagInput: evento `mousedown` en `document` | Funciona antes que el click nativo |
| Botones de icono con `title` attribute | Regla ESLint de accesibilidad activa |
| Columna `is_trashed` (no `is_deleted`) | Así está en la DB real |
| Contenido TipTap guardado como `jsonb` en columna `content` | Formato nativo de TipTap |

---

## Variables de entorno requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GROQ_API_KEY=        # Solo para Phase 7 (IA) — solo servidor
```

---

## Comandos

```bash
npm run dev     # desarrollo con Turbopack
npm run build   # build de producción (TypeScript check incluido)
npm run lint    # ESLint
```

---

## Reglas de desarrollo

1. **TypeScript estricto** — sin `any`, sin `@ts-ignore` sin justificación documentada
2. **RLS activo en todas las tablas** — nunca bypassear seguridad de Supabase
3. **Cliente correcto según contexto** — `lib/supabase/client.ts` en components cliente, `lib/supabase/server.ts` en Server Components / Route Handlers
4. **Mensajes de error al usuario siempre en español**
5. **Build limpio** — `npm run build` debe terminar verde antes de marcar cualquier tarea como done
6. **Sin `console.log()` de debug** en código entregado
7. **Queries a Supabase siempre en `lib/supabase/`** — nunca inline en componentes

---

## Schema de DB actual (lo que existe en Supabase)

```sql
-- notebooks
create table notebooks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  description text,
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
  is_trashed boolean default false,   -- ojo: is_trashed, no is_deleted
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- tags
create table tags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  name text not null,
  created_at timestamptz default now()
);

-- note_tags
create table note_tags (
  note_id uuid references notes(id) on delete cascade,
  tag_id uuid references tags(id) on delete cascade,
  primary key (note_id, tag_id)
);
```

### Schema pendiente de crear (futuras phases)

```sql
-- tasks (Phase 4)
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

-- attachments (Phase 5)
create table attachments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  note_id uuid references notes(id) on delete cascade,
  file_name text not null,
  file_type text,
  file_size bigint,
  storage_path text not null,
  created_at timestamptz default now()
);

-- spaces (Phase 6)
create table spaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  owner_id uuid references auth.users not null,
  created_at timestamptz default now()
);

create table space_members (
  space_id uuid references spaces(id) on delete cascade,
  user_id uuid references auth.users,
  role text check (role in ('viewer', 'editor', 'admin')) default 'viewer',
  primary key (space_id, user_id)
);

-- ai_usage (Phase 7)
create table ai_usage (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  action text not null,
  tokens_used int,
  created_at timestamptz default now()
);
```
