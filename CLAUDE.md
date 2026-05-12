# NoteEvo

Clon de Evernote. Repo: Eddie031-beep/noteevo

## Stack

- Next.js 16.2.6 App Router (server + client components, Turbopack)
- React 19, TypeScript
- Supabase (auth, DB, Storage, RPC calls — client-side SDK)
- TipTap v3 editor (formato de contenido: JSON)
- Zustand (stores: notebookStore, noteStore, tagStore, uiStore)
- Tailwind CSS v4

## Estado actual (sesión 2026-05-12)

- ✅ Fase 1 y 2: auth, notebooks CRUD, notes CRUD, editor TipTap, favoritos, papelera
- ✅ Sistema de tags (TagInput con create/add/remove)
- ✅ Búsqueda full-text via Supabase RPC
- ✅ Utilidad de upload de imágenes (storage.ts) — pendiente de integrar en UI
- ✅ Utilidad extractTextPreview (tiptap.ts) — pendiente de integrar en NoteList

## Pendientes (TODO)

1. Crear función Postgres `search_notes(search_query text)` en Supabase — el
   RPC ya está llamado en código pero la función de DB NO ha sido creada aún.
2. Integrar `uploadNoteImage` (lib/supabase/storage.ts) en el toolbar de NoteEditor.
3. Integrar `extractTextPreview` (lib/utils/tiptap.ts) en NoteList para previews.
4. Eliminar `components/dashboard/DashboardContent.tsx` — es redundante.

## Arquitectura (directorios relevantes)

```text
app/
├── (dashboard)/dashboard/page.tsx   ← client component, view switcher via uiStore
├── globals.css                      ← Tailwind v4 + @plugin "@tailwindcss/typography"
└── middleware.ts                    ← auth guard (dashboard/page.tsx NO tiene auth guard propio)

components/
├── editor/
│   ├── NoteEditor.tsx               ← TipTap + toolbar + TagInput
│   └── TagInput.tsx                 ← tag picker/creator
├── notes/
│   ├── NoteList.tsx
│   ├── FavoriteNotes.tsx            ← local state, no depende de noteStore
│   ├── TrashNotes.tsx               ← local state, handleRestore/handleDelete filtran local
│   └── SearchResults.tsx            ← debounce 400ms → searchNotes(query)
└── sidebar/
    └── Sidebar.tsx                  ← nav + search input + carga global de tags

lib/supabase/
├── notes.ts     ← CRUD + toggleFavorite, getFavoriteNotes, getTrashedNotes, restoreNote, permanentlyDeleteNote
├── tags.ts      ← getTags, createTag, deleteTag, getTagsByNote, addTagToNote, removeTagFromNote
├── search.ts    ← searchNotes() via .rpc('search_notes', { search_query })
└── storage.ts   ← uploadNoteImage() → bucket 'note-images'

lib/utils/
└── tiptap.ts    ← extractTextPreview(content, maxLength=120)

store/
├── uiStore.ts   ← currentView: 'notebooks'|'favorites'|'trash'|'search', searchQuery
└── tagStore.ts  ← tags[], setTags, addTag (ordena alfabéticamente), removeTag
```

## Decisiones técnicas importantes (NO cambiar)

- Tailwind v4: config via `@import "tailwindcss"` en globals.css — NO existe tailwind.config.ts
- Plugin typography: `@plugin "@tailwindcss/typography"` en globals.css
- TipTap: `immediatelyRender: false` en useEditor — requerido para evitar error de SSR
- NoteEditor usa input no controlado con `titleRef` (no estado) para evitar lint `set-state-in-effect`
- Patrón `syncedNoteIdRef`: el useEffect guarda qué note ID ya fue sincronizado para no re-sincronizar en cada keystroke
- TagInput usa `key={selectedNote.id}` para forzar remount al cambiar de nota (no useEffect de reset)
- Tags se cargan una sola vez en Sidebar (siempre montado) y se guardan en tagStore
- Búsqueda: usa `.rpc('search_notes', { search_query })` — NO usar textSearch de Supabase
- Click-outside en TagInput: evento `mousedown` en `document` (no `click`)
- Botones de icono deben tener atributo `title` para accesibilidad (regla ESLint activa)

## Comandos

- `npm run dev`   — desarrollo (Turbopack)
- `npm run build` — build de producción
- `npm run lint`  — ESLint

## Reglas generales

- Mensajes de error al usuario siempre en español
- RLS activo en todas las tablas de Supabase
- 3 paneles: Sidebar + NoteList/vista activa + NoteEditor

## Compact Instructions

Al compactar, preservar siempre: TODOs pendientes, decisiones técnicas de la
sección anterior, y cualquier migración de Supabase que esté en progreso.
