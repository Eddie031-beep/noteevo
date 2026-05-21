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

## Phases 1–7 ✅ (completadas)

Todas las features id:1–21 están done. No re-verificar.

---

## Phase 8 — Pulido del editor

### Keyboard shortcuts (id: 22)
- [ ] `Ctrl+N` crea nota nueva en el notebook seleccionado (o muestra selector si no hay ninguno)
- [ ] `Ctrl+K` abre/enfoca la barra de búsqueda en el sidebar
- [ ] `Ctrl+,` abre la página de settings
- [ ] `?` muestra modal de cheatsheet con todos los atajos
- [ ] `Escape` cierra modales abiertos (modal de task, invite, etc.)
- [ ] Los shortcuts no disparan dentro de inputs/textareas del editor TipTap
- [ ] Hook `useKeyboardShortcuts` montado en `dashboard/layout.tsx`

### Focus mode (id: 23)
- [ ] Botón en toolbar del editor activa/desactiva el modo
- [ ] En focus mode: sidebar oculto, panel de notas oculto, solo el editor
- [ ] Animación suave (transition en CSS)
- [ ] `Escape` o click en botón desactiva el modo
- [ ] Estado `isFocusMode` en `uiStore`
- [ ] El toolbar del editor sigue visible en focus mode

### Exportar nota (id: 24)
- [ ] Botón en toolbar abre modal con opciones PDF / Markdown
- [ ] PDF: genera un documento con el título y contenido de la nota
- [ ] Markdown: convierte TipTap JSON a `.md` válido (headings, listas, bold, etc.)
- [ ] Descarga directa al browser (no sube a ningún servidor)
- [ ] El archivo se llama `[titulo-de-la-nota].[extension]`

### Historial de versiones (id: 25)
- [ ] Tabla `note_versions` en Supabase (ya creada, verificar RLS)
- [ ] Se guarda versión automáticamente cada 10 autosaves O manualmente
- [ ] Botón "Historial" en toolbar abre `VersionHistoryPanel`
- [ ] Panel muestra lista de versiones con fecha y número
- [ ] Click en versión: preview del contenido (read-only)
- [ ] Botón "Restaurar esta versión" reemplaza el contenido actual
- [ ] Máximo 20 versiones por nota (eliminar las más antiguas al superar)
- [ ] `lib/supabase/versions.ts` con: `saveVersion`, `getVersions`, `restoreVersion`, `pruneVersions`

---

## Phase 9 — Productividad

### Templates (id: 26)
- [ ] Tabla `templates` en Supabase (ya creada con 3 builtin)
- [ ] Al hacer click en "Nueva nota": modal/selector muestra templates disponibles + opción "En blanco"
- [ ] Templates builtin visibles para todos los usuarios
- [ ] Vista `TemplatesView` donde el usuario puede ver, crear, editar y eliminar sus templates
- [ ] Guardar nota actual como template: botón en toolbar → pide nombre y categoría
- [ ] Templates propios se distinguen visualmente de los builtin
- [ ] `lib/supabase/templates.ts`: `getTemplates`, `createTemplate`, `updateTemplate`, `deleteTemplate`

### Drag & drop de notas (id: 27)
- [ ] `@dnd-kit/core` instalado
- [ ] En `NoteList`: cada nota es draggable
- [ ] Los notebooks en el sidebar son drop targets
- [ ] Al soltar en un notebook distinto: `updateNote(id, { notebook_id })` + feedback visual
- [ ] Si se suelta en el mismo notebook: no hace nada
- [ ] Funciona en desktop (no se requiere mobile)

---

## Phase 10 — Compartir

### Nota pública (id: 28)
- [ ] Tabla `shared_notes` (ya creada, verificar RLS)
- [ ] Botón "Compartir" en toolbar del editor
- [ ] Modal muestra el link generado y botón "Copiar"
- [ ] Opción para desactivar/reactivar el link
- [ ] Opción para poner fecha de expiración (opcional)
- [ ] Página `/n/[slug]` es pública (sin auth), Server Component
- [ ] `/n/:path*` excluido del middleware de auth
- [ ] La página pública renderiza TipTap en modo read-only
- [ ] `view_count` se incrementa en cada visita (RPC o update)
- [ ] `lib/supabase/shared-notes.ts`: `createShareLink`, `getShareLink`, `getSharedNote` (sin auth), `deactivateShareLink`

### Notificaciones in-app (id: 29)
- [ ] Tabla `notifications` (ya creada con REPLICA IDENTITY FULL)
- [ ] Campana en Sidebar con badge rojo con número de no leídas
- [ ] Panel dropdown al click con lista de notificaciones
- [ ] Cada notificación muestra: icono por tipo, título, body, tiempo relativo
- [ ] Click en notificación la marca como leída y navega al recurso (si aplica)
- [ ] Botón "Marcar todas como leídas"
- [ ] Realtime: nueva notificación aparece sin recargar
- [ ] Al ser expulsado de un space: se crea notificación automáticamente
- [ ] `lib/supabase/notifications.ts`: `getNotifications`, `markAsRead`, `markAllRead`, `deleteNotification`
- [ ] Hook `useNotifications` para Realtime

---

## Phase 11 — Perfil y tema

### Perfil de usuario (id: 30)
- [ ] Tabla `user_profiles` (ya creada con trigger auto-create)
- [ ] Página `/dashboard/settings` con tabs: Perfil / Preferencias / Notificaciones
- [ ] Tab Perfil: editar nombre display, bio, subir avatar (bucket `avatars`)
- [ ] Avatar visible en sidebar (reemplaza ícono de logout o aparece junto a él)
- [ ] Tab Preferencias: toggle dark/light/system, idioma (solo UI, no cambiar strings aún), timezone
- [ ] Tab Notificaciones: toggle para notificaciones por email
- [ ] Cambios se guardan en `user_profiles`
- [ ] `lib/supabase/profile.ts`: `getProfile`, `updateProfile`, `uploadAvatar`
- [ ] `store/profileStore.ts` con: `profile`, `setProfile`

### Light mode (id: 31)
- [ ] Variables CSS para light mode definidas en `globals.css` bajo `[data-theme='light']`
- [ ] Toggle en Sidebar y en Settings
- [ ] Preferencia guardada en `user_profiles.theme`
- [ ] `data-theme` aplicado en `<html>` via `profileStore`
- [ ] Todos los componentes se ven bien en light mode (revisar colores hardcodeados)
- [ ] Preferencia `system` respeta `prefers-color-scheme`

---

## Phase 12 — Búsqueda y stats

### Búsqueda avanzada (id: 32)
- [ ] RPC `search_notes_advanced` ya creada y funcional
- [ ] Botón de filtros junto a barra de búsqueda en sidebar
- [ ] Panel de filtros: notebook (select), tags (multi-select chips), rango de fechas, solo favoritos
- [ ] Los filtros se combinan (AND, no OR)
- [ ] Resultados muestran snippet con término resaltado
- [ ] Filtros activos visibles con badges + botón limpiar
- [ ] `lib/supabase/search.ts`: añadir `searchNotesAdvanced()`

### Dashboard con stats (id: 33)
- [ ] RPC `get_user_stats()` ya creada y funcional
- [ ] `HomePanel` reemplazado con layout de stats enriquecido
- [ ] Grid de stats: total notas, notebooks, tareas pendientes, archivos
- [ ] Gráfico de actividad (recharts BarChart): notas creadas los últimos 7 días
- [ ] Tags más usados: top 5 con conteo
- [ ] Libretas más grandes: top 3 con conteo de notas
- [ ] Datos se cargan una sola vez al montar el panel

---

## Phase 13 — Onboarding y recordatorios

### Onboarding (id: 34)
- [ ] Detectar primer login: `user_profiles.created_at` = hace menos de 5 minutos
- [ ] Modal multi-paso (3 pasos): bienvenida + nombre → crear notebook → crear primera nota
- [ ] Los 3 pasos son opcionales (botón "Saltar")
- [ ] Al completar: se crea el notebook y nota si el usuario los definió
- [ ] Flag para no mostrar de nuevo (guardar en `user_profiles` o localStorage)
- [ ] Tour guiado opcional: tooltip en sidebar items la primera vez

### Recordatorios de tasks (id: 35)
- [ ] Columna `reminder_sent boolean default false` añadida a `tasks`
- [ ] Edge Function `send-reminders` en `supabase/functions/send-reminders/index.ts`
- [ ] Edge Function usa service role para consultar tasks con `reminder_at <= now()`
- [ ] Envía email via Resend API con título de la tarea y link a la app
- [ ] Marca `reminder_sent = true` después de enviar
- [ ] Cron configurado en Supabase: cada hora
- [ ] `RESEND_API_KEY` en secrets de Supabase Edge Functions
- [ ] Error handling: si falla el email, NO marca `reminder_sent` (para reintentar)

---

## Phase 14 — Tests

### Tests unitarios (id: 36)
- [ ] Vitest instalado: `npm install -D vitest @testing-library/react @testing-library/user-event jsdom`
- [ ] `vitest.config.ts` configurado con alias `@/*` y environment `jsdom`
- [ ] Script `"test": "vitest"` en `package.json`
- [ ] Tests para `lib/utils/tiptap.ts` → `extractTextPreview` (casos: vacío, largo, corto)
- [ ] Tests para `store/noteStore.ts` → addNote, updateNote, deleteNote, setSelectedNote
- [ ] Tests para `store/taskStore.ts` → addTask, updateTask, deleteTask
- [ ] Tests para componente `TaskItem` (render, toggle, delete)
- [ ] Mock de `lib/supabase/client.ts` en `__mocks__/lib/supabase/client.ts`
- [ ] Cobertura >70% en utils y stores (`npm run test -- --coverage`)

### Tests E2E (id: 37)
- [ ] Playwright instalado: `npm init playwright@latest`
- [ ] `playwright.config.ts` con `baseURL: 'http://localhost:3000'`
- [ ] Script `"test:e2e": "playwright test"` en `package.json`
- [ ] `.env.test` con usuario de prueba (email + password de cuenta real en Supabase)
- [ ] Test: login → dashboard visible → logout
- [ ] Test: crear notebook → crear nota → escribir título → autosave
- [ ] Test: añadir tag a nota
- [ ] Test: crear task → marcar como completada
- [ ] Test: búsqueda básica devuelve resultados
- [ ] Los tests no modifican datos de producción (usar proyecto Supabase de staging o cleanup)
