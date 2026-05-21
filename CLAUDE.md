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
| Tailwind CSS | v4 | Config via `@import "tailwindcss"` en globals.css |
| Lucide React | ^1.14.0 | Iconos |
| date-fns | ^4.1.0 | Fechas |
| recharts | instalado | Gráficos (para dashboard stats) |

---

## Estado actual del proyecto — Phases 1–7 COMPLETAS ✅

Todas las features de las fases 1 a 7 están implementadas y con build verde.
Ver `feature_list.json` para el detalle de cada una (id 1–21, todas `status: "done"`).

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

---

## Phases 8–14 — PENDIENTES (roadmap nuevo)

### Phase 8 — Pulido del editor (id: 22–25)
- **22** — Keyboard shortcuts globales (`Ctrl+N`, `Ctrl+K`, `?` para cheatsheet)
- **23** — Modo presentación / Focus mode (ocultar sidebar+panel, solo editor)
- **24** — Exportar nota (PDF y Markdown, descarga directa)
- **25** — Historial de versiones (tabla `note_versions` ya en DB)

### Phase 9 — Productividad (id: 26–27)
- **26** — Templates de notas (tabla `templates` ya en DB con 3 builtin)
- **27** — Drag & drop de notas entre notebooks (`@dnd-kit/core`)

### Phase 10 — Compartir (id: 28–29)
- **28** — Nota pública con link (tabla `shared_notes` ya en DB, página pública sin auth)
- **29** — Notificaciones in-app (tabla `notifications` ya en DB, Realtime)

### Phase 11 — Perfil y tema (id: 30–31)
- **30** — Perfil de usuario (tabla `user_profiles` ya en DB con trigger auto-create)
- **31** — Light mode (tokens ya preparados, toggle en settings)

### Phase 12 — Búsqueda y stats (id: 32–33)
- **32** — Búsqueda avanzada con filtros (RPC `search_notes_advanced` ya en DB)
- **33** — Dashboard con estadísticas (RPC `get_user_stats` ya en DB, recharts)

### Phase 13 — Onboarding y recordatorios (id: 34–35)
- **34** — Onboarding multi-paso para nuevos usuarios
- **35** — Recordatorios de tasks via email (Supabase Edge Function + Resend)

### Phase 14 — Tests (id: 36–37)
- **36** — Tests unitarios (Vitest + Testing Library)
- **37** — Tests E2E (Playwright)

---

## Schema de DB completo (Supabase: blhbvurcconebtelbnlw)

### Tablas existentes (phases 1–7)

```sql
notebooks (id, user_id, name, description, space_id, created_at, updated_at)
notes     (id, user_id, notebook_id, title, content jsonb, is_favorite, is_trashed,
           search_vector tsvector, created_at, updated_at)
tags      (id, user_id, name, created_at)
note_tags (note_id, tag_id)
tasks     (id, user_id, note_id, title, description, due_date, reminder_at,
           priority, is_flagged, is_completed, completed_at, created_at)
attachments (id, user_id, note_id, file_name, file_type, file_size,
             storage_path, created_at)
spaces       (id, name, description, owner_id, created_at, updated_at)
space_members (space_id, user_id, role, invited_by, joined_at)  -- REPLICA IDENTITY FULL
ai_usage     (id, user_id, action, tokens_used, created_at)
```

### Tablas nuevas (phases 8–14) — YA CREADAS EN SUPABASE

```sql
-- Phase 8
note_versions (id, note_id, user_id, title, content jsonb,
               version_number int, created_at)
-- RLS: solo el dueño puede ver/insertar/eliminar sus versiones

-- Phase 8/9
templates (id, user_id nullable, name, description, content jsonb,
           category, is_builtin boolean, created_at, updated_at)
-- RLS: todos ven builtin + las propias; solo puede modificar las propias
-- Datos: 3 templates builtin insertados (Reunión, Diario, Plan de proyecto)

-- Phase 10
shared_notes (id, note_id, user_id, public_slug unique, is_active,
              view_count, expires_at, created_at)
-- RLS: dueño gestiona las suyas; cualquiera puede leer si is_active=true

notifications (id, user_id, type, title, body, data jsonb,
               is_read boolean, created_at)
-- REPLICA IDENTITY FULL para Realtime
-- tipos: 'space_invite' | 'task_reminder' | 'note_shared' | 'space_removed'
-- RLS: service role puede insertar; usuario gestiona las suyas

-- Phase 11
user_profiles (id references auth.users, display_name, avatar_url, bio,
               theme, language, timezone, email_notifications, created_at, updated_at)
-- Trigger on_auth_user_created crea perfil automáticamente al registrarse
-- RLS: solo el propio usuario
```

### RPCs existentes

```sql
search_notes(search_query text)                           -- búsqueda básica
search_notes_advanced(search_query, filter_notebook_id,   -- búsqueda con filtros
  filter_tag_ids, filter_date_from, filter_date_to, filter_is_favorite)
get_user_stats()                                          -- estadísticas del dashboard
get_space_members_with_email(p_space_id)                  -- miembros con email
get_user_id_by_email(email)                               -- lookup por email
```

### Índices creados

```sql
note_versions_note_id_idx
note_versions_created_at_idx
shared_notes_slug_idx
shared_notes_note_id_idx
notifications_user_id_idx
notifications_unread_idx (parcial: where is_read = false)
notes_search_vector_idx  (GIN)
```

### Trigger automático

```sql
-- Crea user_profile al registrarse un nuevo usuario
on_auth_user_created → handle_new_user()
-- Actualiza search_vector en notes al insertar/actualizar
notes_search_vector_update → update_note_search_vector()
```

---

## Arquitectura de carpetas actual

```
app/
├── (auth)/login/page.tsx
├── (auth)/register/page.tsx
├── (dashboard)/
│   ├── dashboard/page.tsx        ← view switcher via uiStore
│   ├── layout.tsx                ← Sidebar + main
│   └── settings/page.tsx         ← NUEVO Phase 11 (perfil + tema)
├── (public)/
│   └── n/[slug]/page.tsx         ← NUEVO Phase 10 (nota pública, sin auth)
├── api/
│   ├── ai/summarize/route.ts
│   ├── ai/improve/route.ts
│   ├── ai/chat/route.ts
│   ├── ai/suggest-tags/route.ts
│   └── spaces/invite/route.ts
├── globals.css
└── middleware.ts                  ← Actualizar para excluir /n/[slug] del auth guard

components/
├── editor/
│   ├── NoteEditor.tsx             ← añadir botones: Presentación, Exportar, Historial, Template
│   ├── TagInput.tsx, AttachmentPanel.tsx
│   ├── AiSummaryPanel.tsx, AiImproveToolbar.tsx
│   ├── AiChatPanel.tsx, AiSmartTags.tsx
│   ├── VersionHistoryPanel.tsx    ← NUEVO Phase 8
│   └── ExportModal.tsx            ← NUEVO Phase 8
├── notes/NoteList.tsx, FavoriteNotes.tsx, TrashNotes.tsx, SearchResults.tsx
├── tasks/TaskList.tsx, TaskModal.tsx
├── files/FilesView.tsx
├── calendar/CalendarView.tsx
├── spaces/...
├── templates/
│   ├── TemplateSelector.tsx       ← NUEVO Phase 9 (modal al crear nota)
│   └── TemplatesView.tsx          ← NUEVO Phase 9 (vista en sidebar/settings)
├── notifications/
│   └── NotificationBell.tsx       ← NUEVO Phase 10 (campana en sidebar)
├── settings/
│   ├── ProfileSettings.tsx        ← NUEVO Phase 11
│   └── PreferencesSettings.tsx    ← NUEVO Phase 11
├── onboarding/
│   └── OnboardingModal.tsx        ← NUEVO Phase 13
└── sidebar/Sidebar.tsx            ← añadir: campana, avatar, botón settings

lib/supabase/
├── client.ts, server.ts, admin.ts
├── notes.ts, notebooks.ts, tags.ts, search.ts, storage.ts
├── tasks.ts, attachments.ts, spaces.ts
├── versions.ts                    ← NUEVO Phase 8
├── templates.ts                   ← NUEVO Phase 9
├── shared-notes.ts                ← NUEVO Phase 10
├── notifications.ts               ← NUEVO Phase 10
└── profile.ts                     ← NUEVO Phase 11

store/
├── notebookStore.ts, noteStore.ts, tagStore.ts
├── uiStore.ts                     ← añadir: isFocusMode, notificationCount
├── taskStore.ts, spaceStore.ts
└── profileStore.ts                ← NUEVO Phase 11

hooks/
├── useSpaceRole.ts
├── useKeyboardShortcuts.ts        ← NUEVO Phase 8
└── useNotifications.ts            ← NUEVO Phase 10

supabase/
└── functions/
    └── send-reminders/index.ts    ← NUEVO Phase 13 (Edge Function)

types/index.ts                     ← añadir: NoteVersion, Template, SharedNote,
                                      Notification, UserProfile
```

---

## Variables de entorno requeridas

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=       # solo server
GROQ_API_KEY=                    # solo server
RESEND_API_KEY=                  # Phase 13 — para emails de recordatorios
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
| `REPLICA IDENTITY FULL` en space_members y notifications | Para Realtime DELETE |
| `on_auth_user_created` trigger | Auto-crea user_profile al registrarse |
| Templates builtin con `user_id = null` | Distingue builtin de personales |
| `public_slug` único en shared_notes | URL legible y única para links públicos |
| `search_vector` con GIN index | Full-text search eficiente en PostgreSQL |

---

## Comandos

```bash
npm run dev          # desarrollo con Turbopack
npm run build        # build de producción (TypeScript check)
npm run lint         # ESLint
npm run test         # Phase 14 — Vitest (pendiente instalar)
npm run test:e2e     # Phase 14 — Playwright (pendiente instalar)
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
