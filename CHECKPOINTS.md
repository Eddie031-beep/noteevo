# CHECKPOINTS.md — Criterios de "está bien hecho"

> Antes de marcar cualquier feature como `done`, verifica todos los
> checkpoints de esta sección.

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

## Por feature

### Rediseño visual (id: 10) ✅
- [x] Dark mode por defecto
- [x] Sidebar colapsable 56px ↔ 240px
- [x] Color primario verde esmeralda `#1a7a4a`
- [x] Fondos `#0f0f0f` / `#1a1a1a` / `#242424`
- [x] Login y register con nuevo estilo
- [x] Layout 3 paneles

### Tasks (id: 11-12) ✅
- [x] Tabla `tasks` con RLS
- [x] CRUD completo con modal
- [x] Filtros por prioridad/estado/fecha
- [x] Badge pendientes en sidebar
- [x] Vista por libreta

### Files (id: 13-14) ✅
- [x] Tabla `attachments` con RLS (columnas: `storage_path`, `file_size`)
- [x] Bucket `attachments` con políticas
- [x] Upload drag & drop, barra de progreso
- [x] Vista Files con tabs Todos/Media/Docs

### Calendar (id: 15) ✅
- [x] Tasks con due date en calendario
- [x] Vistas Mes/Semana/Día
- [x] Crear tasks desde calendario
- [x] Timezone fix (local, no UTC offset)

### Spaces (id: 16-17) ✅
- [x] Solo el dueño/admin puede administrar
- [x] Roles viewer/editor/admin funcionan
- [x] Vista "Compartido conmigo"
- [x] Gestión de miembros (ver email, cambiar rol, expulsar)
- [x] Realtime: expulsión notificada inmediatamente
- [x] RLS en notebooks para spaces (por rol)
- [x] `REPLICA IDENTITY FULL` en space_members

### IA — Resumir nota (id: 18) ✅
- [x] `GROQ_API_KEY` solo server-side
- [x] Rate limit 10/día via `ai_usage`
- [x] Panel `AiSummaryPanel` con loading/error/resultado
- [x] Botón Sparkles en toolbar

### IA — Mejorar escritura (id: 19) ✅
- [x] Streaming funciona en `/api/ai/improve`
- [x] `AiImproveToolbar` aparece al seleccionar texto ≥10 chars
- [x] Posición calculada con `getBoundingClientRect()`
- [x] Aceptar reemplaza selección en TipTap
- [x] Cancelar descarta sin modificar
- [x] Rate limit 10/día
- [x] Errores de Groq en español

### IA — Chat con nota (id: 20) ✅
- [x] Streaming funciona en `/api/ai/chat`
- [x] `AiChatPanel` 320px panel derecho
- [x] Historial en sesión (se resetea al cerrar)
- [x] Enter = enviar, Shift+Enter = nueva línea
- [x] Rate limit 20/día
- [x] Estado vacío con instrucción clara
- [x] Errores en español

### IA — Smart Tags (id: 21) 🔲 NEXT
- [ ] `/api/ai/suggest-tags` route handler con Groq
- [ ] Prompt devuelve JSON con array de tags (máx 5)
- [ ] Componente en NoteEditor para mostrar sugerencias
- [ ] Chips individuales: aceptar (añade tag) / rechazar (descarta)
- [ ] Crea tag nuevo si no existe via `createTag` + `addTagToNote`
- [ ] Rate limit 10/día via `ai_usage` (action: `suggest_tags`)
- [ ] `GROQ_API_KEY` solo server
- [ ] Errores en español
- [ ] Build verde
