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
