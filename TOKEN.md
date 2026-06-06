# Guía de optimización de tokens — NoteEvo con Claude Code

## El problema de las sesiones largas

Claude Code tiene un límite de contexto por sesión. Con archivos grandes como CLAUDE.md (506 líneas)
más el código que genera, una sesión puede agotarse a mitad de una feature.

---

## Estrategia por tipo de tarea

### Features solo-frontend (ids 56, 58, 60, 62, 63, 65, 66)
Estas NO necesitan que Claude Code lea CLAUDE.md completo.
Instrucción al iniciar sesión:
> "Lee solo AGENTS.md sección id:XX y el archivo [componente.tsx] que voy a modificar.
>  No necesitas leer CLAUDE.md esta vez."

### Features con DB (ids 55, 57, 59, 61, 64, 68)
Necesitan leer el schema. Instrucción:
> "Lee la sección 'Schema de DB' de CLAUDE.md (líneas 276–330) y AGENTS.md sección id:XX."

### Features de IA (ids 69)
Necesitan ver un Route Handler existente como referencia. Instrucción:
> "Lee app/api/ai/chat/route.ts como referencia y AGENTS.md sección id:69.
>  No leas CLAUDE.md completo."

---

## Orden de implementación recomendado por agrupación de archivos

Agrupar features que tocan los mismos archivos en la misma sesión = menos re-lectura de contexto.

### Sesión 1 — Solo NoteEditor.tsx (ids 56 + 58 + 65)
Los tres modifican principalmente NoteEditor.tsx. En una sola sesión:
1. id:56 contador de palabras (20 min, ~800 tokens de código)
2. id:58 tooltips en toolbar (30 min, ~600 tokens)
3. id:65 typewriter mode (45 min, ~1200 tokens)
Ahorro: leer NoteEditor.tsx una sola vez en lugar de 3 veces separadas.

### Sesión 2 — Solo NoteList.tsx (ids 57 + 60 + 63 + 64)
Todos modifican NoteList.tsx:
1. id:57 notas ancladas
2. id:63 ordenar notas
3. id:64 color por nota
4. id:60 gallery view (depende de que el resto esté)
Leer NoteList.tsx una sola vez.

### Sesión 3 — DB + tipos (ids 55 + 59 + 61)
Todos necesitan migración SQL + types/index.ts + lib/supabase/notes.ts:
1. Aplicar TODAS las migraciones SQL juntas al inicio (sección SQL agrupado en AGENTS_p17.md)
2. Actualizar types/index.ts una sola vez para los 3
3. Implementar las funciones en notes.ts y profile.ts
4. Integrar en los componentes

### Sesión 4 — Componentes nuevos (ids 62 + 66 + 67)
Cada uno crea un componente nuevo, sin mucha dependencia entre sí:
1. id:62 EmptyState.tsx (nuevo componente, no modifica existentes)
2. id:66 CommandPalette mejorado
3. id:67 ImportModal.tsx + route.ts

### Sesión 5 — Features complejas (ids 68 + 69)
Reservar para el final. Requieren más contexto y son más largas.

---

## Cómo dar instrucciones a Claude Code para ahorrar tokens

### ✅ Eficiente
```
"Implementa id:56 del feature_list.json.
 Lee solo: AGENTS.md (sección id:56) y components/editor/NoteEditor.tsx.
 No necesitas CLAUDE.md ni otros archivos.
 Cuando termines: npm run build y marca id:56 como done."
```

### ❌ Ineficiente (desperdicia contexto)
```
"Implementa el contador de palabras en el editor"
(Sin referencia a los archivos — Claude Code leerá todo el proyecto para entender el contexto)
```

---

## Tamaño aproximado de cada feature en tokens de OUTPUT

| id | Feature | Tokens output est. | Archivos tocados |
|----|---------|-------------------|-----------------|
| 56 | Contador palabras | ~300 | 1 |
| 58 | Tooltips toolbar | ~500 | 3 |
| 63 | Ordenar notas | ~400 | 1 |
| 62 | Empty states | ~800 | 7 |
| 57 | Notas ancladas | ~600 | 3 |
| 65 | Typewriter mode | ~700 | 3 |
| 60 | Gallery view | ~900 | 1 |
| 55 | Emoji por nota | ~1000 | 4 |
| 64 | Color por nota | ~800 | 3 |
| 66 | Comando rápido | ~1200 | 3 |
| 59 | Cover image | ~1400 | 4 |
| 61 | Opciones tipográficas | ~1100 | 4 |
| 67 | Importar archivos | ~1600 | 3 |
| 68 | Backlinks | ~2500 | 5+ |
| 69 | IA inline | ~2000 | 3 |

---

## Cuando una sesión se acerca al límite

Señales de que el contexto se está agotando:
- Las respuestas se vuelven más cortas o genéricas
- Claude Code empieza a repetir código que ya generó
- Los archivos generados tienen imports que no existen en el proyecto

Qué hacer:
1. Haz commit del progreso actual (`git commit -m "wip: id:XX parcial"`)
2. Inicia sesión nueva con contexto mínimo:
   > "Continuamos implementando id:XX. Ya está hecho: [lista de lo completado].
   >  Falta: [lista de lo pendiente].
   >  Lee solo: [archivo específico]."
3. No repitas todo el contexto del proyecto — solo lo necesario para la siguiente tarea

---

## Archivos que Claude Code SIEMPRE necesita leer (invariante)

- `feature_list.json` — para saber qué implementar y marcarlo done
- `types/index.ts` — antes de crear cualquier tipo nuevo
- El archivo existente que va a modificar — nunca generar de memoria

## Archivos que Claude Code RARA VEZ necesita leer completos

- `CLAUDE.md` — solo las secciones relevantes (schema, decisiones técnicas)
- `AGENTS.md` — solo la sección del id que se está implementando
- `CHECKPOINTS.md` — solo el bloque del id que se va a verificar

