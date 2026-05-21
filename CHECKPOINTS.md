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

### Rediseño visual (id: 10)
- [ ] Dark mode por defecto en toda la app
- [ ] Sidebar colapsable 56px ↔ 240px con animación suave
- [ ] Color primario verde esmeralda `#1a7a4a` consistente
- [ ] Fondos `#0f0f0f` / `#1a1a1a` / `#242424` aplicados correctamente
- [ ] Login y register con nuevo estilo
- [ ] Sidebar con todos los items de navegación futuros (aunque las vistas no existan aún)
- [ ] Layout 3 paneles refinado y responsivo en desktop

### Tasks CRUD (id: 11)
- [ ] Tabla `tasks` creada en Supabase con RLS
- [ ] CRUD completo: crear, listar, completar, eliminar
- [ ] Modal de creación con todos los campos
- [ ] Tasks vinculables a notas (note_id nullable)

### Tasks Views (id: 12)
- [ ] Vista "My tasks" con filtros por prioridad/estado/fecha
- [ ] Contador de tasks pendientes en sidebar
- [ ] Tabs: My tasks / Notebooks

### Files Upload (id: 13)
- [ ] Tabla `attachments` en Supabase con RLS
- [ ] Bucket `attachments` en Storage con políticas correctas
- [ ] Upload funciona, barra de progreso visible

### Files View (id: 14)
- [ ] Tabs: Files / Media / Docs
- [ ] Preview de imágenes funciona
- [ ] Descarga de archivos funciona

### Calendar (id: 15)
- [ ] Tasks con due date aparecen en el calendario
- [ ] Vistas Day / Week / Month funcionan
- [ ] Se pueden crear tasks desde el calendario

### Spaces (id: 16-17)
- [ ] Solo el dueño puede administrar el Space
- [ ] Miembros ven solo lo que su rol permite
- [ ] Vista "Shared with me" muestra correctamente

### IA (id: 18-21)
- [ ] API key NUNCA expuesta al cliente (solo server-side)
- [ ] Rate limit funciona (tabla ai_usage)
- [ ] Streaming funciona en mejorar escritura
- [ ] Errores de la API de Groq manejados y mostrados en español
