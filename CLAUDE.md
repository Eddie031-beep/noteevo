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

## Estado actual del proyecto — Phases 1–14 COMPLETAS ✅ (roadmap 100%)

Las 37 features del roadmap (id 1–37, fases 1 a 14) están implementadas con
build verde. No queda ninguna feature pendiente del roadmap formal — cualquier
trabajo nuevo se registra como Phase 15+ en `feature_list.json`.

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

Todas las fases del roadmap están cerradas (`status: "done"` en `feature_list.json`):

| Phase | Features | Estado |
|---|---|---|
| 9 — Productividad | 26 Templates · 27 Drag & drop | ✅ |
| 10 — Compartir | 28 Link público · 29 Notificaciones in-app | ✅ |
| 11 — Perfil y tema | 30 Perfil · 31 Tema claro | ✅ |
| 12 — Búsqueda y stats | 32 Búsqueda avanzada · 33 Dashboard | ✅ |
| 13 — Onboarding y recordatorios | 34 Onboarding · 35 Recordatorios email | ✅ |
| 14 — Tests | 36 Unitarios (Vitest) · 37 E2E (Playwright) | ✅ |
| 15 — Mejoras tareas/calendario | 38 Recordatorios duales · 39 Urgencia en calendario | ✅ |

**Phase 15 — detalle:**
- **38 Recordatorios duales por `due_date`** — avisos independientes de 7 días y 1 día
  (RPC `get_due_date_reminders`, flags `reminder_7days_sent` / `reminder_1day_sent`)
- **39 Indicadores de urgencia en el calendario** — pills/dots rojo (vencida) y amarillo (próxima)

> Cualquier trabajo nuevo a partir de aquí se registra como **Phase 16+** en
> `feature_list.json` (entrada `pending` → `done` al cerrar con build verde).

---

## Schema de DB completo (Supabase: blhbvurcconebtelbnlw)

### Tablas existentes (phases 1–9)

```sql
notebooks    (id, user_id, name, description, space_id, created_at, updated_at)
notes        (id, user_id, notebook_id, title, content jsonb, is_favorite, is_trashed,
              search_vector tsvector, created_at, updated_at)
tags         (id, user_id, name, created_at)
note_tags    (note_id, tag_id)
tasks        (id, user_id, note_id, title, description, due_date, reminder_at,
              reminder_7days_sent, reminder_1day_sent,
              priority, is_flagged, is_completed, completed_at, created_at)
attachments  (id, user_id, note_id, file_name, file_type, file_size,
              storage_path, created_at)
spaces       (id, name, description, owner_id, created_at, updated_at)
space_members (space_id, user_id, role, invited_by, joined_at) -- REPLICA IDENTITY FULL
ai_usage     (id, user_id, action, tokens_used, created_at)
note_versions (id, note_id, user_id, title, content jsonb, version_number, created_at)
templates    (id, user_id nullable, name, description, content jsonb,
              category, is_builtin boolean, created_at, updated_at)
```

### Tablas nuevas (phases 10–14) — YA CREADAS EN SUPABASE

```sql
shared_notes  (id, note_id, user_id, public_slug unique, is_active,
               view_count, expires_at, created_at)
notifications (id, user_id, type, title, body, data jsonb,
               is_read boolean, created_at)  -- REPLICA IDENTITY FULL
user_profiles (id references auth.users, display_name, avatar_url, bio,
               theme, language, timezone, email_notifications, created_at, updated_at)
```

### RPCs existentes

```sql
search_notes(search_query text)
search_notes_advanced(search_query, filter_notebook_id, filter_tag_ids,
                      filter_date_from, filter_date_to, filter_is_favorite)
get_user_stats()
get_space_members_with_email(p_space_id)
get_user_id_by_email(email)
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
│   └── settings/page.tsx         ← Phase 11
├── (public)/
│   └── n/[slug]/page.tsx          ← Phase 10
├── api/
│   ├── ai/summarize/route.ts
│   ├── ai/improve/route.ts
│   ├── ai/chat/route.ts
│   ├── ai/suggest-tags/route.ts
│   ├── ai/transform/route.ts      ← 30+ acciones con submenús
│   └── spaces/invite/route.ts
├── globals.css                    ← @keyframes noteCardEnter añadido
└── middleware.ts

components/
├── editor/
│   ├── NoteEditor.tsx             ← Superscript, Subscript, Eraser, TableToolbar
│   ├── FormatDropdowns.tsx        ← 6 fuentes (incl. Slab Serif, Script, Handwritten)
│   ├── AiMenuExpanded.tsx         ← v2 con submenús hover
│   ├── TableToolbar.tsx           ← NUEVO — BubbleMenu gestión de tablas
│   ├── TagInput.tsx, AttachmentPanel.tsx
│   ├── AiSummaryPanel.tsx, AiImproveToolbar.tsx
│   ├── AiChatPanel.tsx, AiSmartTags.tsx
│   ├── VersionHistoryPanel.tsx
│   ├── ExportModal.tsx
│   ├── InsertMenu.tsx
│   └── MermaidComponent.tsx
├── notes/
│   ├── NoteList.tsx               ← animaciones + fechas relativas + borde accent
│   ├── FavoriteNotes.tsx
│   ├── TrashNotes.tsx
│   └── SearchResults.tsx
├── tasks/TaskList.tsx, TaskModal.tsx
├── files/FilesView.tsx
├── calendar/CalendarView.tsx
├── spaces/...
├── templates/
│   ├── TemplateSelector.tsx
│   └── TemplatesView.tsx
├── sidebar/Sidebar.tsx
└── KeyboardShortcutsCheatsheet.tsx

lib/
├── editor/
│   ├── callout-extension.ts       ← NUEVO — extensión TipTap Callout
│   ├── toggle-extension.ts        ← NUEVO — extensión TipTap Toggle
│   ├── toc-extension.ts           ← NUEVO — extensión TipTap TOC
│   └── mermaid-extension.ts
├── supabase/
│   ├── client.ts, server.ts, admin.ts
│   ├── notes.ts, notebooks.ts, tags.ts, search.ts, storage.ts
│   ├── tasks.ts, attachments.ts, spaces.ts
│   ├── versions.ts
│   ├── templates.ts
│   ├── shared-notes.ts            ← Phase 10
│   ├── notifications.ts           ← Phase 10
│   └── profile.ts                 ← Phase 11
├── templates/builtin-templates.ts
└── utils/tiptap.ts, tiptap-to-markdown.ts

components/editor/ (nuevos bloques):
├── CalloutComponent.tsx           ← NUEVO
├── ToggleComponent.tsx            ← NUEVO
└── TocComponent.tsx               ← NUEVO

store/
├── notebookStore.ts, noteStore.ts, tagStore.ts
├── uiStore.ts                     ← isFocusMode, isCheatsheetOpen
├── taskStore.ts, spaceStore.ts
└── profileStore.ts                ← Phase 11

hooks/
├── useKeyboardShortcuts.ts
├── useSpaceRole.ts
└── useNotifications.ts            ← Phase 10

supabase/functions/
└── send-reminders/index.ts        ← Phase 13

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

---

## Comandos

```bash
npm run dev          # desarrollo con Turbopack
npm run build        # build de producción (TypeScript check)
npm run lint         # ESLint
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
