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

## Phase 16 — Mejoras UI/UX + Features pendientes (PENDIENTES)

Las siguientes mejoras y features nuevas están planificadas. Se implementan en orden,
una por una, siempre con build verde antes de marcar done.

### id:40 — Tags: vista y gestión completa
**Estado: done ✅ (commit b2ff6a0)**
La vista de etiquetas actual solo muestra un listado plano de chips. Necesita:
- Vista `/dashboard` con `currentView === 'tags-view'` rediseñada: grid de tarjetas por etiqueta
  mostrando nombre + conteo de notas asociadas + fecha de creación
- Click en una etiqueta → filtra y muestra las notas que la tienen (similar a NoteList)
- Renombrar etiqueta inline (doble click o botón de edición)
- Eliminar etiqueta con confirmación (también elimina las relaciones `note_tags`)
- Búsqueda/filtro de etiquetas en la vista
- `lib/supabase/tags.ts`: añadir `renameTag(id, newName)`, `deleteTagWithRelations(id)`, `getTagsWithCount()`
- RPC `get_tags_with_count()` en Supabase que retorna `{id, name, note_count, created_at}`

### id:41 — Templates: galería completa estilo Notion
**Estado: done ✅**
Rediseño total de la galería de plantillas inspirado en Notion/Evernote. El objetivo es que
las plantillas se sientan como un producto propio con valor real, no solo un selector básico.

**16 plantillas builtin nuevas** distribuidas en 9 categorías:
`personal`, `trabajo`, `reuniones`, `diario`, `educacion`, `viaje`, `finanzas`, `salud`, `proyecto`

Plantillas: Agenda semanal, Plan de proyecto, Asignación escolar, Programación 101,
Notas de clase, Ecuaciones clave (Matemáticas), Lista de compras, Diario diario,
Lista de lectura, Plan de viaje, Gestión de proyectos, CRM/Clientes, Nota de candidato,
Información de contacto, Lluvia de ideas, Notas de reunión.

**Galería (`TemplatesView.tsx`) — rediseño completo:**
- Grid 3 col desktop / 2 tablet / 1 móvil
- Cards con **thumbnail real** del contenido: editor TipTap read-only escalado a `scale(0.45)`,
  `pointer-events-none`, `overflow-hidden` dentro del card
- Badge "Oficial NoteEvo" en builtin / "Mía" en personales
- Fila "Destacadas" al tope (4 plantillas)
- Filtros por categoría (pills) + buscador por nombre

**Flujo de importar — modal de detalle:**
1. Click en card → modal a pantalla completa
2. Preview grande (TipTap read-only con **todas** las extensiones incluyendo Callout/Toggle/TOC)
3. Selector de libreta destino (recuerda última via `localStorage`)
4. "Usar esta plantilla" → crea nota → redirige al editor con nota abierta

**Archivos a crear/modificar:**
- `lib/templates/builtin-templates.ts` — añadir 16 plantillas nuevas con contenido TipTap JSON rico
- `components/templates/TemplatesView.tsx` — rediseño completo
- `components/templates/TemplateSelector.tsx` — actualizar con nuevo flujo de preview
- No hay cambios en DB (las plantillas builtin viven en código)

### id:42 — Tasks: rediseño UI + modal mejorado
**Estado: done ✅**
Inspirado en Linear/Evernote Tasks:
- `TaskList.tsx`: rediseño completo de la lista de tareas
  - Cards más compactas con mejor jerarquía visual: título grande, metadata pequeña debajo
  - Prioridad como dot de color a la izquierda (no texto)
  - Fecha de vencimiento con pill coloreado (rojo si vencida, amarillo si próxima, gris si futura)
  - Flag como icono naranja solo cuando está activo
  - Checkbox más grande y visible (24px), animación al completar
- Panel de filtros colapsable (actualmente siempre visible y ocupa espacio):
  - Convertir en un drawer/panel que se abre con el botón de filtros
  - Chips activos mostrados debajo del header cuando hay filtros aplicados
- `TaskModal.tsx`: mejorar el modal de creación/edición:
  - Selector de prioridad visual con colores (no solo texto)
  - Date picker nativo mejorado con `min` relativo a hoy
  - Campo de descripción más visible
  - Opción de vincular la tarea a una nota existente (selector de nota)
  - Botón "Guardar" más prominente

### id:43 — Files: rediseño UI al estilo Evernote
**Estado: done ✅ (commit d98feee)**
Evernote muestra los archivos como grid de cards cuando son imágenes, y lista cuando son docs.
- Vista grid para imágenes: cards cuadradas con thumbnail grande (200×200), nombre debajo
- Vista lista para docs: fila compacta con icono tipado, nombre, tamaño, nota origen, fecha
- Toggle vista grid/lista en el header
- Drag & drop para subir archivos directamente en `FilesView` (actualmente solo desde la nota)
- Breadcrumb "nota origen" clickeable que navega a la nota
- Filtro por tipo: Imágenes / PDFs / Audio / Video / Otros
- Ordenar por: Nombre / Fecha / Tamaño
- Previsualización de imagen al hacer click (lightbox simple con `<dialog>`)

### id:44 — Calendar: mejoras visuales y creación de eventos
**Estado: done ✅**
- Cabecera más clara (botón "Hoy" con borde, switcher con `shadow-sm`); cabeceras de días con `bg-surface/40`
- Vista mes: celdas más altas (`minHeight: 120`), fondo sutil por urgencia (`URGENCY_CELL_BG`), hasta 3 tareas con prefijo de hora
- Vista semana: **reescrita como rejilla horaria de 24h** (`HOUR_HEIGHT = 48`):
  - Gutter de horas + gridlines; columnas por día con eventos posicionados absolutamente por `start_time`/`end_time`
  - **Línea de "hora actual"** en vivo (refresco cada 60s) que cruza las columnas, con punto rojo en la columna de hoy
  - Fila "Todo el día" para tareas sin hora; auto-scroll a la mañana / hora actual al montar
- Creación rápida: `QuickCreatePopover` anclado al click (día en mes / slot horario en semana) con título + Enter; enlace "Más detalles →" abre `TaskModal` precargado con fecha/hora
- Hora inicio/fin: **migración DB** `tasks.start_time` / `tasks.end_time` (`timestamptz`); `TaskModal` con inputs de hora + validación (fin > inicio, requiere fecha)
- Días coloreados por urgencia (borde izquierdo + dot + fondo sutil)

### id:45 — Spaces: rediseño UI + mejoras de permisos
**Estado: done ✅**
- `SpacesView` / `SharedWithMeView`: cards con banner de color identificador
  (color determinista por `space.id` en `lib/utils/space-color.ts`, sin migración),
  icono solapado, descripción visible y conteos de miembros + libretas
- `SharedWithMeView`: muestra dueño (email), nº de miembros y fecha de unión
- `SpaceDetailView`: badge del rol propio en el header + tabla de miembros con
  columnas (Miembro / Rol / Unión / Acciones) e iniciales como avatar
- `InviteModal` en 2 pasos: **buscar** usuario → preview con iniciales/email →
  **confirmar invitación**. Nuevo endpoint `/api/spaces/lookup-user` (solo
  owner/admin; evita enumeración de emails)
- RPC `get_spaces_overview()` (SECURITY DEFINER): `member_count`, `notebook_count`,
  `owner_email`, `my_joined_at` por space accesible en una sola llamada
- `SpacesView.tsx`: rediseño de la vista de spaces
  - Cards más grandes con descripción visible, contador de miembros y libretas
  - Banner/color de identificación por space (color aleatorio al crear)
- `SpaceDetailView.tsx`: mejoras en la gestión de miembros
  - Al invitar, mostrar avatar/iniciales del usuario encontrado antes de confirmar
  - Tabla de miembros más clara: columnas Nombre/Email, Rol, Fecha de unión, Acciones
  - Indicador visual del rol propio en el header del space
- `SharedWithMeView.tsx`: mejorar las cards
  - Mostrar quién es el dueño del space (nombre/email)
  - Mostrar cuántos miembros tiene el space
  - Fecha de cuando el usuario se unió

### id:46 — NoteEditor: rediseño layout y breathing room
**Estado: done ✅**
- Cuerpo de escritura envuelto en `max-w-3xl mx-auto` centrado (`max-w-2xl` en
  focus mode, con transición de ancho); `py-12`; `px-6 sm:px-10`
- Título `text-4xl font-bold leading-tight`; separador `border-b border-border/60`
  entre el bloque título+tags y el cuerpo del editor
- Dividers de toolbar más visibles (`h-5`, `mx-1`)
- Focus mode: toolbar `absolute` oculta por defecto, se revela al pasar el cursor
  por la franja superior (`group/tb` + `opacity`/`translate`)
- Móvil: toolbar `flex-nowrap overflow-x-auto`, `sm:flex-wrap`
El editor actual ocupa todo el ancho y se siente abrumador. Cambios:
- Ancho máximo del área de escritura: `max-w-3xl` centrado (actualmente `px-10` full width)
- Padding vertical aumentado: `py-12` en vez de `py-8`
- Título de la nota más grande: `text-4xl` con `font-bold` y más espacio inferior
- Separador visual sutil entre título/tags y el cuerpo del editor
- Toolbar del editor: separar en grupos visuales más claros con divisores más visibles
- Modo "distraction-free": cuando `isFocusMode`, reducir aún más el ancho (`max-w-2xl`)
  y ocultar completamente la toolbar (solo mostrar con hover en la parte superior)
- En móvil: toolbar scrollable horizontalmente

### id:47 — IA en Sidebar: panel lateral de IA
**Estado: done ✅**
- View `'ai-assistant'` en `uiStore` + entrada "Asistente IA" (Sparkles) en
  `Sidebar` tras Calendario; render full-width en `dashboard/page.tsx`
- `components/ai/AiAssistantView.tsx`: chat general con streaming (`ReadableStream`),
  selector de contexto (Sin nota / Nota activa / Todas mis notas), acciones
  rápidas e historial en memoria (se borra al recargar)
- Contexto "Todas mis notas": carga perezosa de `getAllNotesWithNotebook` +
  `extractTextPreview` (resumen de títulos + preview)
- `app/api/ai/assistant/route.ts`: rate limit 20/día con `action='ai_assistant'`
  en `ai_usage` (sin CHECK constraint), prompt de sistema con/sin contexto
Añadir una sección de IA accesible desde el sidebar izquierdo (no solo desde el editor):
- Nueva opción en el sidebar: "Asistente IA" con icono Sparkles
- `currentView === 'ai-assistant'` en `uiStore`
- Componente `components/ai/AiAssistantView.tsx`:
  - Chat general (no anclado a una nota específica) con Groq streaming
  - Selector de contexto: "Sin nota" / "Nota activa" / "Todas mis notas (resumen)"
  - Historial de la sesión (en memoria, se pierde al recargar)
  - Acciones rápidas: "Resumir mis notas de hoy", "¿Qué tengo pendiente?", "Sugerir tareas"
  - Rate limit: 20 mensajes/día (reutilizar tabla `ai_usage` con acción `'ai_assistant'`)
- Route Handler: `app/api/ai/assistant/route.ts` (streaming, Groq)
- Añadir entrada en `Sidebar.tsx` (siempre visible, no `disabled`)

### id:48 — Compartir nota: opción "Cualquiera con el link puede editar"
**Estado: pending**
Actualmente solo existe "view" (solo lectura). Añadir modo edición colaborativa:
- Nueva columna en `shared_notes`: `access_level text default 'none'` → ya existe con valores `'none' | 'view'`, añadir `'edit'`
- `ShareControls.tsx`: habilitar la opción "Anyone with the link can edit" (actualmente disabled)
- Página `/n/[slug]`: si `access_level === 'edit'`, renderizar TipTap en modo editable
  - Guardar cambios en la nota original via `updateNote` (con service role para bypasear RLS)
  - Debounce de 1500ms para no saturar escrituras
  - Indicador visual "Guardado" / "Guardando..." en la página pública
- `lib/supabase/shared-notes-server.ts`: función `updateSharedNoteContent(slug, content)`
- Consideración de seguridad: solo permitir edición si `is_active = true` y `expires_at` no vencido
- `NoteViewer.tsx` → renombrar a `NotePublicEditor.tsx` y añadir prop `editable: boolean`

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
│   └── spaces/lookup-user/route.ts ← Phase 16 (id:45)
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
