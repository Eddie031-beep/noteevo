# AGENTS.md — Guía de trabajo para Claude en NoteEvo

> Este archivo es el mapa de navegación del proyecto.
> Lee CLAUDE.md primero, luego este archivo.

---

## Cómo empezar cada sesión

1. Lee `CLAUDE.md` — contexto completo del proyecto
2. Lee `feature_list.json` — elige la primera tarea con `status: "pending"` o `"partial"`
3. Verifica el entorno: `npm run build` debe terminar sin errores TypeScript
4. Si hay errores TypeScript en build → resuélvelos antes de continuar

---

## Mapa del repositorio

| Archivo / carpeta | Qué contiene | Cuándo leerlo |
|---|---|---|
| `CLAUDE.md` | Todo el contexto del proyecto | Siempre, al empezar |
| `feature_list.json` | Estado de cada feature | Siempre, al empezar |
| `app/` | Rutas Next.js App Router | Para implementar páginas |
| `components/` | Componentes React | Para implementar UI |
| `lib/supabase/` | Queries y clientes de Supabase | Antes de tocar DB |
| `store/` | Stores de Zustand | Para estado global |
| `types/index.ts` | Tipos TypeScript compartidos | Antes de crear tipos nuevos |

---

## Reglas duras

- **Sin `any` en TypeScript** — sin excepción
- **Sin `console.log()` de debug** en código entregado
- **Queries siempre en `lib/supabase/`** — nunca inline en componentes
- **Cliente correcto**: `lib/supabase/client.ts` en componentes cliente, `lib/supabase/server.ts` en Server Components
- **RLS activo** — nunca bypassear seguridad de Supabase
- **Build limpio** — `npm run build` verde antes de declarar cualquier feature como done
- **GROQ_API_KEY solo servidor** — nunca en componentes cliente ni con prefijo `NEXT_PUBLIC_`
- **Mensajes de error al usuario en español**
- **Columna es `is_trashed`**, no `is_deleted` — así está en la DB real

---

## Convenciones de código

### Componentes
- PascalCase para el nombre, kebab-case para el archivo: `NoteCard` → `note-card.tsx`
- Un componente por archivo
- `'use client'` solo cuando es necesario (eventos, hooks de estado, etc.)

### TypeScript
- Props de componentes siempre con `interface`, no `type` inline
- Tipos nuevos van en `types/index.ts`

### Tailwind v4
- Config via `@import "tailwindcss"` en `globals.css` — NO modificar `tailwind.config.ts` (no existe)
- Para temas/variables, usar `@theme` inline en globals.css

### Git commits (Conventional Commits)
```
feat: agregar vista de tasks
fix: corregir autosave al cambiar nota rápido
refactor: extraer queries de notes a lib/supabase
```

---

## Si te bloqueas

- Si un comportamiento de TipTap, Supabase o Next.js no funciona como esperas, **no inventes un workaround** — documenta el bloqueo y para la sesión
- Si hay errores de TypeScript en build que no puedes resolver sin romper la arquitectura, documenta y consulta antes de continuar
