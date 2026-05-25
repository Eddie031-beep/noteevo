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

## Phases 1–9 ✅ (completadas — id 1–26 + drag-drop id 27)

Todas las features id:1–27 están done. No re-verificar.

### Nota: mejoras de editor aplicadas (fuera del roadmap)
Las siguientes mejoras se aplicaron durante sesiones de refinamiento:
- Bloques TipTap personalizados: **Callout**, **Toggle**, **TOC** (`lib/editor/`)
- Extensiones TipTap: **Superscript**, **Subscript** en toolbar
- Botón **Eraser** (eliminar formato) en toolbar
- 6 fuentes en `FormatDropdowns.tsx` (Slab Serif, Script, Handwritten vía Google Fonts)
- **TableToolbar** (`components/editor/TableToolbar.tsx`) — BubbleMenu para tablas
- **NoteList** mejorado — animación de entrada, fechas relativas, borde accent
- **AiMenuExpanded v2** — submenús hover para Resumir/Tono/Ayúdame/Traducir/Convertir
- **transform_route.ts** — 30+ acciones de transformación de texto

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
- [ ] `view_count` se incrementa en cada visita
- [ ] `lib/supabase/shared-notes.ts`: `createShareLink`, `getShareLink`, `getSharedNote`, `deactivateShareLink`

### Notificaciones in-app (id: 29)
- [ ] Tabla `notifications` (ya creada con REPLICA IDENTITY FULL)
- [ ] Campana en Sidebar con badge rojo con número de no leídas
- [ ] Panel dropdown al click con lista de notificaciones
- [ ] Cada notificación: icono por tipo, título, body, tiempo relativo
- [ ] Click en notificación la marca como leída
- [ ] Botón "Marcar todas como leídas"
- [ ] Realtime: nueva notificación aparece sin recargar
- [ ] `lib/supabase/notifications.ts`: `getNotifications`, `markAsRead`, `markAllRead`, `deleteNotification`
- [ ] Hook `useNotifications` para Realtime

---

## Phase 11 — Perfil y tema

### Perfil de usuario (id: 30)
- [ ] Tabla `user_profiles` (ya creada con trigger auto-create)
- [ ] Página `/dashboard/settings` con tabs: Perfil / Preferencias / Notificaciones
- [ ] Tab Perfil: editar nombre display, bio, subir avatar (bucket `avatars`)
- [ ] Avatar visible en sidebar
- [ ] Tab Preferencias: toggle dark/light/system, idioma, timezone
- [ ] Tab Notificaciones: toggle para notificaciones por email
- [ ] `lib/supabase/profile.ts`: `getProfile`, `updateProfile`, `uploadAvatar`
- [ ] `store/profileStore.ts` con: `profile`, `setProfile`

### Light mode (id: 31)
- [ ] Variables CSS para light mode definidas en `globals.css` bajo `[data-theme='light']`
- [ ] Toggle en Sidebar y en Settings
- [ ] Preferencia guardada en `user_profiles.theme`
- [ ] `data-theme` aplicado en `<html>` via `uiStore` o `profileStore`
- [ ] Todos los componentes se ven bien en light mode (revisar colores hardcodeados)

---

## Phase 12 — Búsqueda y stats

### Búsqueda avanzada (id: 32)
- [ ] RPC `search_notes_advanced` ya creada y funcional
- [ ] Panel de filtros: notebook, tags (multi-select), rango de fechas, solo favoritos
- [ ] Los filtros se combinan (AND)
- [ ] Resultados muestran snippet con término resaltado
- [ ] `lib/supabase/search.ts`: añadir `searchNotesAdvanced()`

### Dashboard con stats (id: 33)
- [ ] RPC `get_user_stats()` ya creada y funcional
- [ ] `HomePanel` mejorado: grid de stats, gráfico actividad (recharts), tags top, notebooks más grandes
- [ ] Datos se cargan una sola vez al montar

---

## Phase 13 — Onboarding y recordatorios

### Onboarding (id: 34)
- [ ] Detectar primer login via `user_profiles.created_at`
- [ ] Modal multi-paso: nombre → crear notebook → primera nota
- [ ] Los pasos son opcionales (botón "Saltar")
- [ ] Flag `onboarding_completed` en `user_profiles`

### Recordatorios de tasks (id: 35)
- [ ] Columna `reminder_sent boolean default false` añadida a `tasks`
- [ ] Edge Function `send-reminders` en `supabase/functions/send-reminders/index.ts`
- [ ] Cron configurado en Supabase: cada hora
- [ ] Envía email via Resend API
- [ ] Marca `reminder_sent = true` después de enviar
- [ ] `RESEND_API_KEY` en secrets de Supabase Edge Functions

---

## Phase 14 — Tests

### Tests unitarios (id: 36)
- [ ] Vitest instalado y configurado (`vitest.config.ts`, alias `@/*`)
- [ ] Script `"test": "vitest"` en `package.json`
- [ ] Tests para `lib/utils/tiptap.ts` (extractTextPreview)
- [ ] Tests para `store/noteStore.ts` y `store/taskStore.ts`
- [ ] Tests para `TaskItem`
- [ ] Mock de `lib/supabase/client.ts`
- [ ] Cobertura >70% en utils y stores

### Tests E2E (id: 37)
- [ ] Playwright instalado, `playwright.config.ts` con `baseURL: 'http://localhost:3000'`
- [ ] Script `"test:e2e": "playwright test"` en `package.json`
- [ ] `.env.test` con usuario de prueba
- [ ] Test: login → dashboard → logout
- [ ] Test: crear notebook → nota → escribir título → autosave
- [ ] Test: añadir tag, crear task, búsqueda básica
