import type { Template } from '@/types'

// ── Helpers para construir contenido TipTap JSON de forma concisa (DRY) ──────
type Node = { type: string; [k: string]: unknown }

const text = (t: string, marks?: Node[]): Node =>
  marks ? { type: 'text', text: t, marks } : { type: 'text', text: t }
const bold = (t: string): Node => text(t, [{ type: 'bold' }])

const p = (t = ''): Node => (t ? { type: 'paragraph', content: [text(t)] } : { type: 'paragraph' })
const rich = (...children: Node[]): Node => ({ type: 'paragraph', content: children })
const h = (level: 1 | 2 | 3, t: string): Node => ({ type: 'heading', attrs: { level }, content: [text(t)] })

const bullet = (items: string[]): Node => ({
  type: 'bulletList',
  content: items.map((i) => ({ type: 'listItem', content: [p(i)] })),
})
const bulletRich = (items: Node[]): Node => ({
  type: 'bulletList',
  content: items.map((node) => ({ type: 'listItem', content: [node] })),
})
const ordered = (items: string[]): Node => ({
  type: 'orderedList',
  content: items.map((i) => ({ type: 'listItem', content: [p(i)] })),
})
const tasks = (items: string[]): Node => ({
  type: 'taskList',
  content: items.map((i) => ({ type: 'taskItem', attrs: { checked: false }, content: [p(i)] })),
})

const callout = (type: 'info' | 'warning' | 'success' | 'error' | 'tip', textContent: string): Node => ({
  type: 'callout', attrs: { type }, content: [p(textContent)],
})

const table = (headers: string[], rows: string[][]): Node => ({
  type: 'table',
  content: [
    { type: 'tableRow', content: headers.map((hh) => ({ type: 'tableHeader', content: [p(hh)] })) },
    ...rows.map((r) => ({ type: 'tableRow', content: r.map((c) => ({ type: 'tableCell', content: [p(c)] })) })),
  ],
})

const doc = (...content: Node[]): Record<string, unknown> => ({ type: 'doc', content })

type Builtin = Omit<Template, 'created_at' | 'updated_at' | 'user_id'>

// Plantillas originales de NoteEvo — contenido propio, sin copyright
export const BUILTIN_TEMPLATES: Builtin[] = [
  // ── 4 plantillas originales ────────────────────────────────────────────────
  {
    id: 'builtin-meeting',
    name: 'Reunión de trabajo',
    description: 'Actas, asistentes y puntos de acción',
    category: 'meeting',
    is_builtin: true,
    content: doc(
      h(2, '📋 Reunión de trabajo'),
      rich(bold('Fecha: '), text('')),
      rich(bold('Asistentes: '), text('')),
      h(3, 'Agenda'),
      bullet(['']),
      h(3, 'Puntos discutidos'),
      bullet(['']),
      h(3, 'Tareas y responsables'),
      tasks(['']),
      h(3, 'Próxima reunión'),
      p(''),
    ),
  },
  {
    id: 'builtin-journal',
    name: 'Diario personal',
    description: 'Reflexiones, gratitud y metas del día',
    category: 'journal',
    is_builtin: true,
    content: doc(
      h(2, '📓 Diario personal'),
      rich(bold('Fecha: '), text('')),
      h(3, '¿Cómo me siento hoy?'),
      p(''),
      h(3, 'Lo más destacado del día'),
      p(''),
      h(3, 'Agradecimiento'),
      bullet(['', '', '']),
      h(3, 'Metas para mañana'),
      tasks(['']),
    ),
  },
  {
    id: 'builtin-project',
    name: 'Plan de proyecto',
    description: 'Objetivo, fases, recursos y seguimiento',
    category: 'work',
    is_builtin: true,
    content: doc(
      h(2, '🚀 Plan de proyecto'),
      rich(bold('Proyecto: '), text('')),
      rich(bold('Fecha de inicio: '), text(''), bold('   Entrega: '), text('')),
      h(3, 'Objetivo'),
      p(''),
      h(3, 'Fases'),
      ordered(['', '', '']),
      h(3, 'Tareas pendientes'),
      tasks(['']),
      h(3, 'Recursos y links'),
      bullet(['']),
    ),
  },
  {
    id: 'builtin-weekly',
    name: 'Revisión semanal',
    description: 'Balance, aprendizajes y prioridades de la semana',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '📅 Revisión semanal'),
      rich(bold('Semana del: '), text('')),
      h(3, '✅ Logros de la semana'),
      bullet(['']),
      h(3, '⚡ Desafíos encontrados'),
      bullet(['']),
      h(3, '💡 Aprendizajes'),
      p(''),
      h(3, '🎯 Prioridades próxima semana'),
      tasks(['']),
    ),
  },

  // ── 8 plantillas nuevas ──────────────────────────────────────────────────
  {
    id: 'builtin-travel',
    name: 'Plan de viaje',
    description: 'Vuelos, alojamiento, actividades y presupuesto',
    category: 'viaje',
    is_builtin: true,
    content: doc(
      h(2, '✈️ Plan de viaje'),
      rich(bold('Destino: '), text('')),
      rich(bold('Fechas: '), text('')),
      rich(bold('Presupuesto: '), text('')),
      h(3, 'Vuelos'),
      bullet(['Ida: ', 'Vuelta: ']),
      h(3, 'Alojamiento'),
      bullet(['Hotel / Check-in: ']),
      h(3, 'Actividades por día'),
      tasks(['Día 1: ', 'Día 2: ', 'Día 3: ']),
      h(3, 'Presupuesto'),
      table(['Concepto', 'Estimado', 'Real'], [['Transporte', '', ''], ['Alojamiento', '', ''], ['Actividades', '', '']]),
      h(3, 'Notas importantes'),
      callout('tip', 'Lleva copias digitales de tus documentos y revisa requisitos de entrada del destino.'),
    ),
  },
  {
    id: 'builtin-notes-class',
    name: 'Notas de clase',
    description: 'Resumen, conceptos clave y tareas de la sesión',
    category: 'educacion',
    is_builtin: true,
    content: doc(
      h(2, '📚 Notas de clase'),
      rich(bold('Fecha: '), text('')),
      rich(bold('Materia: '), text('')),
      rich(bold('Profesor: '), text('')),
      h(3, 'Resumen de la sesión'),
      p(''),
      h(3, 'Conceptos clave'),
      bullet(['', '']),
      h(3, 'Preguntas pendientes'),
      bullet(['']),
      h(3, 'Tareas para la próxima clase'),
      tasks(['']),
    ),
  },
  {
    id: 'builtin-brainstorm',
    name: 'Lluvia de ideas',
    description: 'Contexto, ideas generadas y próximos pasos',
    category: 'proyecto',
    is_builtin: true,
    content: doc(
      h(2, '💡 Lluvia de ideas'),
      rich(bold('Tema: '), text('')),
      rich(bold('Fecha: '), text('')),
      rich(bold('Participantes: '), text('')),
      h(3, 'Contexto del problema'),
      p(''),
      h(3, 'Ideas generadas'),
      bullet(['', '', '', '', '']),
      h(3, 'Ideas descartadas'),
      bullet(['']),
      h(3, 'Próximos pasos'),
      tasks(['']),
      callout('info', 'Regla: ninguna idea es mala en la fase de brainstorming'),
    ),
  },
  {
    id: 'builtin-weekly-agenda',
    name: 'Agenda semanal',
    description: 'Planificación por día, metas y reflexión',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '📅 Agenda semanal'),
      rich(bold('Semana del / al: '), text('')),
      table(
        ['Día', 'Tareas principales', 'Notas'],
        [['Lunes', '', ''], ['Martes', '', ''], ['Miércoles', '', ''], ['Jueves', '', ''], ['Viernes', '', '']],
      ),
      h(3, 'Metas de la semana'),
      tasks(['', '', '']),
      h(3, 'Reflexión del viernes'),
      p(''),
    ),
  },
  {
    id: 'builtin-reading-list',
    name: 'Lista de lectura',
    description: 'Por leer, leyendo, leídos y recomendaciones',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '📚 Lista de lectura'),
      h(3, 'Por leer'),
      bullet(['', '', '']),
      h(3, 'Leyendo ahora'),
      bulletRich([rich(bold('Título — Autor: '), text(''))]),
      h(3, 'Leídos este año'),
      bullet(['', '', '']),
      h(3, 'Recomendaciones recibidas'),
      bullet(['', '']),
    ),
  },
  {
    id: 'builtin-crm',
    name: 'CRM / Clientes',
    description: 'Contactos, estado y seguimiento de clientes',
    category: 'trabajo',
    is_builtin: true,
    content: doc(
      h(2, '👥 Gestión de clientes'),
      rich(bold('Empresa: '), text('')),
      rich(bold('Contacto: '), text('')),
      rich(bold('Email: '), text(''), bold('   Tel: '), text('')),
      table(
        ['Nombre', 'Empresa', 'Estado', 'Última acción'],
        [['', '', '', ''], ['', '', '', ''], ['', '', '', ''], ['', '', '', '']],
      ),
      h(3, 'Notas de seguimiento'),
      p(''),
      h(3, 'Próximos pasos'),
      tasks(['']),
    ),
  },
  {
    id: 'builtin-shopping',
    name: 'Lista de compras',
    description: 'Compras organizadas por categoría',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '🛒 Lista de compras'),
      rich(bold('Fecha: '), text('')),
      rich(bold('Tienda: '), text('')),
      h(3, 'Frutas y verduras'),
      tasks(['']),
      h(3, 'Lácteos y proteínas'),
      tasks(['']),
      h(3, 'Limpieza y hogar'),
      tasks(['']),
      h(3, 'Otros'),
      tasks(['']),
    ),
  },
  {
    id: 'builtin-daily-journal',
    name: 'Diario del día',
    description: 'Mañana, tarde, noche y gratitud',
    category: 'diario',
    is_builtin: true,
    content: doc(
      h(2, '🌅 Diario del día'),
      rich(bold('Fecha: '), text('')),
      rich(bold('Clima: '), text(''), bold('   Estado de ánimo: '), text('')),
      h(3, 'Mañana'),
      rich(bold('¿Cómo empezó el día?')),
      p(''),
      h(3, 'Tarde'),
      p(''),
      h(3, 'Noche'),
      p(''),
      h(3, '3 cosas por las que estoy agradecido/a'),
      bullet(['', '', '']),
      callout('success', 'Hoy fue un buen día porque...'),
    ),
  },
]
