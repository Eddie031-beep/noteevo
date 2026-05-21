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
| `app/(public)/` | Rutas sin autenticación | Para Phase 10 (share note) |
| `components/editor/` | NoteEditor + paneles AI | Para features del editor |
| `components/spaces/` | Spaces, modales, detalle | Para features de spaces |
| `components/sidebar/Sidebar.tsx` | Navegación global | Para añadir nav items |
| `lib/supabase/` | Todas las queries a DB | Antes de cualquier query |
| `store/` | Zustand stores | Para estado global |
| `types/index.ts` | Tipos TypeScript compartidos | Antes de crear tipos nuevos |
| `middleware.ts` | Auth guard de rutas | Si añades rutas públicas |
| `supabase/functions/` | Edge Functions | Para Phase 13 (reminders) |

---

## Flujo de trabajo por feature

### Features con tabla nueva en DB
1. Verificar que la tabla ya existe (todas las de phases 8–14 están creadas)
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

---

## Convenciones de código

### Componentes
- PascalCase para nombre, kebab-case para archivo
- Un componente por archivo
- `'use client'` solo cuando es necesario

### TypeScript
- Props siempre con `interface`, no `type` inline
- Tipos nuevos en `types/index.ts`
- Para tipos de retorno de RPCs nuevas: definir interface en `lib/supabase/[file].ts`

### Tailwind v4
- Config via `@import "tailwindcss"` en `globals.css`
- Variables de tema en bloque `@theme`
- Para light mode: usar `[data-theme='light']` selector

### Streaming (IA)
- `ReadableStream` nativo de Web API
- `Content-Type: text/plain; charset=utf-8`
- Leer en cliente con `res.body?.getReader()` + `TextDecoder`

### Rate limiting (IA)
- Tabla `ai_usage`, acción como string
- Registrar ANTES del streaming
- Verificar con `.select('*', { count: 'exact', head: true })`

### Notificaciones
- Insertar via service role (Route Handler o Edge Function)
- Realtime: suscripción a INSERT en `notifications` filtrado por `user_id`

### Edge Functions (Phase 13)
- Directorio: `supabase/functions/[nombre]/index.ts`
- Usar Deno, no Node
- Variables de entorno: acceder via `Deno.env.get('NOMBRE')`

### Git commits (Conventional Commits)
```
feat: keyboard shortcuts globales (id:22)
feat: modo focus mode en editor (id:23)
feat: exportar nota a PDF y Markdown (id:24)
fix: corregir versiones al cambiar nota rápido
```

---

## Notas específicas por phase

### Phase 8 — Editor enhancements
- El hook `useKeyboardShortcuts` va en `hooks/` y se monta en `dashboard/layout.tsx`
- Focus mode: estado `isFocusMode` en `uiStore`, aplicar clases condicionales en `layout.tsx`
- Export PDF: probar primero con `window.print()` + CSS `@media print` antes de añadir librería
- Versiones: guardar cada N autosaves, no en cada keystroke. Usar `useRef` para contador

### Phase 9 — Templates
- Templates builtin ya insertados en DB. NO modificarlos desde el código
- Al crear nota con template: `createNote()` + `updateNote({content: template.content})`
- Drag & drop: usar `@dnd-kit/core` (instalar). NO usar HTML5 drag API nativo

### Phase 10 — Compartir
- Página pública `/n/[slug]`: Server Component, sin `'use client'`, sin auth
- Añadir `/n/:path*` al `matcher` de `middleware.ts` para excluir del auth guard
- `public_slug`: generar con `nanoid(10)` o `Math.random().toString(36).slice(2, 12)`
- Realtime para notificaciones: similar al patrón de `space_members` en Sidebar

### Phase 11 — Perfil
- Trigger `on_auth_user_created` ya creado. Al registrarse se crea perfil automáticamente
- Bucket `avatars`: crear en Supabase Storage con política pública de lectura
- Light mode: aplicar `data-theme` en `<html>` del layout, leer de `profileStore`

### Phase 12 — Stats
- RPC `get_user_stats()` ya creada. Retorna JSON, no array
- Para gráfico de actividad de 7 días: query SQL con `generate_series` o calcular en cliente
- recharts ya está instalado en el proyecto

### Phase 13 — Edge Functions
- Crear con Supabase CLI: `supabase functions new send-reminders`
- Cron: configurar en Supabase Dashboard > Edge Functions > Schedule
- Resend: `npm install resend` dentro de la Edge Function NO; usar fetch a la API de Resend

### Phase 14 — Tests
- Vitest config: `vitest.config.ts` en raíz, alias `@/*` igual que tsconfig
- Mocks de Supabase: crear `__mocks__/lib/supabase/client.ts`
- Playwright: usuario de prueba dedicado en Supabase, `.env.test` con sus credenciales
- No testear componentes que dependan de Realtime (muy frágil en tests)

---

## Si te bloqueas

- Comportamiento inesperado de TipTap, Supabase o Next.js → documenta y para
- Error de TypeScript que rompe arquitectura → documenta y consulta antes de continuar
- RLS que no funciona como esperado → verificar con usuario real en Supabase Studio
- Edge Function que falla → revisar logs en Supabase Dashboard > Edge Functions
