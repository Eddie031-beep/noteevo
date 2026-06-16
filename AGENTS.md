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
- **Verificar propiedad de FKs del cliente** (`notebook_id`, `note_id`): RLS por `user_id` no cubre referencias cruzadas — comprobar pertenencia antes de escribir

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
