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
| Autosave con `titleDebounceRef` + `contentDebounceRef` separados (fix) | Un solo debounce compartido hacía que editar título y luego cuerpo en <800ms cancelara el guardado del título y se perdiera el cambio. NUNCA volver a un ref único en NoteEditor |
| Link público con defensa en capas en `getSharedNote` (fix) | Excluye `access_level='none'`, expirados (`expires_at`) y notas en papelera, no solo `is_active`. El render de `/n/[slug]` no debe servir notas que dejaron de ser públicas |

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
13. Verificar propiedad de FKs que llegan del cliente (`notebook_id`, `note_id`, etc.): RLS sobre `user_id` no impide referenciar recursos ajenos. Comprobar pertenencia explícitamente antes de insertar/actualizar
