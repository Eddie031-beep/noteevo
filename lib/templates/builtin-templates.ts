import type { Template } from '@/types'

// ── Helpers para construir contenido TipTap JSON de forma concisa (DRY) ──────
type Node = { type: string; [k: string]: unknown }

const text = (t: string, marks?: Node[]): Node =>
  marks ? { type: 'text', text: t, marks } : { type: 'text', text: t }
const bold = (t: string): Node => text(t, [{ type: 'bold' }])
const inlineCode = (t: string): Node => text(t, [{ type: 'code' }])

const p = (t = ''): Node => (t ? { type: 'paragraph', content: [text(t)] } : { type: 'paragraph' })
const rich = (...children: Node[]): Node => ({ type: 'paragraph', content: children })
const h = (level: 1 | 2 | 3, t: string): Node => ({ type: 'heading', attrs: { level }, content: [text(t)] })

const bullet = (items: string[]): Node => ({
  type: 'bulletList',
  content: items.map((i) => ({ type: 'listItem', content: [p(i)] })),
})
const ordered = (items: string[]): Node => ({
  type: 'orderedList',
  content: items.map((i) => ({ type: 'listItem', content: [p(i)] })),
})
const tasks = (items: string[]): Node => ({
  type: 'taskList',
  content: items.map((i) => ({ type: 'taskItem', attrs: { checked: false }, content: [p(i)] })),
})

const callout = (type: 'info' | 'warning' | 'success' | 'error' | 'tip', ...children: Node[]): Node => ({
  type: 'callout', attrs: { type }, content: children,
})
const toggle = (title: string, open: boolean, ...children: Node[]): Node => ({
  type: 'toggle', attrs: { title, open }, content: children,
})
const toc = (): Node => ({ type: 'tableOfContents' })
const code = (t: string): Node => ({ type: 'codeBlock', content: [text(t)] })

const table = (headers: string[], rows: string[][]): Node => ({
  type: 'table',
  content: [
    { type: 'tableRow', content: headers.map((hh) => ({ type: 'tableHeader', content: [p(hh)] })) },
    ...rows.map((r) => ({ type: 'tableRow', content: r.map((c) => ({ type: 'tableCell', content: [p(c)] })) })),
  ],
})

const doc = (...content: Node[]): Record<string, unknown> => ({ type: 'doc', content })

type Builtin = Omit<Template, 'created_at' | 'updated_at' | 'user_id'>

// ── 16 plantillas builtin estilo Notion ──────────────────────────────────────
export const BUILTIN_TEMPLATES: Builtin[] = [
  {
    id: 'builtin-weekly-agenda',
    name: 'Agenda semanal',
    description: 'Plan semanal con tareas, horarios y notas por día',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '🗓️ Agenda semanal'),
      rich(bold('Semana del: '), text('')),
      callout('tip', p('Define tus 3 prioridades antes de planificar el resto de la semana.')),
      h(3, 'Prioridades de la semana'),
      tasks(['', '', '']),
      h(3, 'Planificación por día'),
      table(
        ['Día', 'Tareas', 'Notas'],
        [['Lunes', '', ''], ['Martes', '', ''], ['Miércoles', '', ''], ['Jueves', '', ''], ['Viernes', '', ''], ['Fin de semana', '', '']],
      ),
      h(3, 'Notas adicionales'),
      p(''),
    ),
  },
  {
    id: 'builtin-project-plan',
    name: 'Plan de proyecto',
    description: 'Fases, stakeholders, tareas y fechas de entrega',
    category: 'proyecto',
    is_builtin: true,
    content: doc(
      h(2, '🚀 Plan de proyecto'),
      toc(),
      rich(bold('Proyecto: '), text('')),
      rich(bold('Inicio: '), text(''), bold('   Entrega: '), text('')),
      callout('info', p('Resume aquí el objetivo del proyecto en una o dos frases.')),
      h(3, 'Objetivo'),
      p(''),
      h(3, 'Stakeholders'),
      table(['Nombre', 'Rol', 'Responsabilidad'], [['', '', ''], ['', '', '']]),
      h(3, 'Fases'),
      ordered(['Descubrimiento', 'Diseño', 'Implementación', 'Lanzamiento']),
      h(3, 'Tareas'),
      tasks(['', '', '']),
      toggle('Riesgos y dependencias', false, bullet([''])),
    ),
  },
  {
    id: 'builtin-school-assignment',
    name: 'Asignación escolar',
    description: 'Instrucciones, recursos, materiales y milestones',
    category: 'educacion',
    is_builtin: true,
    content: doc(
      h(2, '📝 Asignación / Tarea escolar'),
      rich(bold('Materia: '), text(''), bold('   Fecha de entrega: '), text('')),
      callout('warning', p('Anota la fecha de entrega y revisa los criterios de evaluación.')),
      h(3, 'Instrucciones'),
      p(''),
      h(3, 'Recursos y materiales'),
      bullet(['', '']),
      h(3, 'Milestones'),
      tasks(['Investigación', 'Borrador', 'Revisión', 'Entrega final']),
      h(3, 'Notas'),
      p(''),
    ),
  },
  {
    id: 'builtin-programming-101',
    name: 'Programación 101',
    description: 'Estructura de curso con TOC, objetivos y bloques de código',
    category: 'educacion',
    is_builtin: true,
    content: doc(
      h(2, '💻 Programación 101'),
      toc(),
      h(3, 'Objetivos de aprendizaje'),
      tasks(['Entender variables y tipos', 'Dominar funciones', 'Estructuras de control']),
      h(3, 'Conceptos clave'),
      rich(text('Una variable se declara con '), inlineCode('let'), text(' o '), inlineCode('const'), text('.')),
      h(3, 'Ejemplo de código'),
      code('function saludar(nombre) {\n  return `Hola, ${nombre}!`\n}\n\nconsole.log(saludar("mundo"))'),
      h(3, 'Ejercicios'),
      ordered(['', '']),
      toggle('Soluciones', false, code('// Tu solución aquí')),
    ),
  },
  {
    id: 'builtin-class-notes',
    name: 'Notas de clase',
    description: 'Fecha, clase, grabación, notas y resumen',
    category: 'educacion',
    is_builtin: true,
    content: doc(
      h(2, '🎓 Notas de clase'),
      rich(bold('Fecha: '), text(''), bold('   Clase: '), text('')),
      rich(bold('Grabación / enlace: '), text('')),
      h(3, 'Notas'),
      bullet(['']),
      h(3, 'Dudas para resolver'),
      tasks(['']),
      callout('success', rich(bold('Resumen: '), text('Sintetiza la clase en 2-3 puntos clave.'))),
    ),
  },
  {
    id: 'builtin-math-equations',
    name: 'Ecuaciones clave (Matemáticas)',
    description: 'TOC con secciones por tema y fórmulas en código inline',
    category: 'educacion',
    is_builtin: true,
    content: doc(
      h(2, '➗ Ecuaciones clave'),
      toc(),
      h(3, 'Álgebra'),
      rich(text('Ecuación cuadrática: '), inlineCode('x = (-b ± √(b² - 4ac)) / 2a')),
      h(3, 'Geometría'),
      rich(text('Área del círculo: '), inlineCode('A = π r²')),
      rich(text('Teorema de Pitágoras: '), inlineCode('a² + b² = c²')),
      h(3, 'Cálculo'),
      rich(text('Derivada de una potencia: '), inlineCode('d/dx [xⁿ] = n·xⁿ⁻¹')),
      toggle('Notas y ejemplos', false, p('')),
    ),
  },
  {
    id: 'builtin-shopping-list',
    name: 'Lista de compras',
    description: 'Categorías de productos con checkboxes por sección',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '🛒 Lista de compras'),
      callout('tip', p('Marca los productos a medida que los vas echando al carrito.')),
      h(3, 'Frutas y verduras'),
      tasks(['', '']),
      h(3, 'Lácteos'),
      tasks(['', '']),
      h(3, 'Despensa'),
      tasks(['', '']),
      h(3, 'Limpieza y hogar'),
      tasks(['', '']),
    ),
  },
  {
    id: 'builtin-daily-journal',
    name: 'Diario diario',
    description: 'AM/PM, metas del día, sentimientos, reflexión y expectativas',
    category: 'diario',
    is_builtin: true,
    content: doc(
      h(2, '📓 Diario diario'),
      rich(bold('Fecha: '), text('')),
      h(3, '🌅 Por la mañana (AM)'),
      rich(bold('¿Cómo me siento al despertar?')),
      p(''),
      rich(bold('Metas del día:')),
      tasks(['', '', '']),
      h(3, '🌙 Por la noche (PM)'),
      rich(bold('Reflexión del día:')),
      p(''),
      callout('info', rich(bold('Mañana espero: '), text(''))),
    ),
  },
  {
    id: 'builtin-reading-list',
    name: 'Lista de lectura',
    description: 'Por leer, leyendo actualmente, leídos y recomendaciones',
    category: 'personal',
    is_builtin: true,
    content: doc(
      h(2, '📚 Lista de lectura'),
      h(3, '📖 Leyendo actualmente'),
      table(['Título', 'Autor', 'Progreso'], [['', '', ''], ['', '', '']]),
      h(3, '🔖 Por leer'),
      tasks(['', '']),
      h(3, '✅ Leídos'),
      table(['Título', 'Autor', 'Valoración'], [['', '', ''], ['', '', '']]),
      toggle('Recomendaciones de otros', false, bullet([''])),
    ),
  },
  {
    id: 'builtin-travel-plan',
    name: 'Plan de viaje',
    description: 'Overview, vuelos, alojamiento, actividades y presupuesto',
    category: 'viaje',
    is_builtin: true,
    content: doc(
      h(2, '✈️ Plan de viaje'),
      rich(bold('Destino: '), text(''), bold('   Fechas: '), text('')),
      callout('tip', p('Reserva vuelos y alojamiento con antelación para mejores precios.')),
      h(3, 'Vuelos'),
      table(['Fecha', 'Origen → Destino', 'Aerolínea', 'Confirmación'], [['', '', '', '']]),
      h(3, 'Alojamiento'),
      table(['Hotel', 'Check-in', 'Check-out', 'Reserva'], [['', '', '', '']]),
      h(3, 'Actividades'),
      tasks(['', '']),
      h(3, 'Presupuesto'),
      table(['Concepto', 'Estimado', 'Real'], [['Vuelos', '', ''], ['Alojamiento', '', ''], ['Comida', '', ''], ['Actividades', '', '']]),
    ),
  },
  {
    id: 'builtin-project-management',
    name: 'Gestión de proyectos',
    description: 'Project overview con tabla de estado, fases y equipo',
    category: 'proyecto',
    is_builtin: true,
    content: doc(
      h(2, '📊 Gestión de proyectos'),
      toc(),
      h(3, 'Project overview'),
      table(['Atributo', 'Detalle'], [['Estado', '🟡 En progreso'], ['Prioridad', ''], ['Owner', ''], ['Deadline', '']]),
      h(3, 'Fases y entregables'),
      table(['Fase', 'Estado', 'Fecha'], [['Planificación', '', ''], ['Ejecución', '', ''], ['Cierre', '', '']]),
      h(3, 'Equipo'),
      table(['Miembro', 'Rol', 'Contacto'], [['', '', '']]),
      h(3, 'Tareas activas'),
      tasks(['', '']),
    ),
  },
  {
    id: 'builtin-crm',
    name: 'CRM / Gestión de clientes',
    description: 'Tabla de clientes, último contacto, crédito y responsable',
    category: 'trabajo',
    is_builtin: true,
    content: doc(
      h(2, '🤝 CRM / Gestión de clientes'),
      callout('info', p('Mantén actualizado el último contacto con cada cliente.')),
      h(3, 'Clientes'),
      table(
        ['Cliente', 'Estado', 'Último contacto', 'Responsable'],
        [['', '🟢 Activo', '', ''], ['', '', '', ''], ['', '', '', '']],
      ),
      h(3, 'Seguimientos pendientes'),
      tasks(['', '']),
      toggle('Notas de cuentas', false, p('')),
    ),
  },
  {
    id: 'builtin-candidate-note',
    name: 'Nota de candidato',
    description: 'Info del aplicante, revisión, recursos y milestones de entrevista',
    category: 'trabajo',
    is_builtin: true,
    content: doc(
      h(2, '👤 Nota de candidato'),
      rich(bold('Nombre: '), text(''), bold('   Puesto: '), text('')),
      rich(bold('Email: '), text(''), bold('   LinkedIn: '), text('')),
      h(3, 'Evaluación'),
      table(['Criterio', 'Valoración', 'Notas'], [['Experiencia', '', ''], ['Habilidades técnicas', '', ''], ['Cultural fit', '', '']]),
      h(3, 'Proceso de entrevista'),
      tasks(['Screening telefónico', 'Entrevista técnica', 'Entrevista con equipo', 'Decisión final']),
      callout('success', rich(bold('Recomendación: '), text(''))),
    ),
  },
  {
    id: 'builtin-contact-info',
    name: 'Información de contacto',
    description: 'Datos básicos, comunicación, dirección y facturación',
    category: 'trabajo',
    is_builtin: true,
    content: doc(
      h(2, '📇 Información de contacto'),
      h(3, 'Datos básicos'),
      table(['Campo', 'Valor'], [['Nombre', ''], ['Empresa', ''], ['Cargo', '']]),
      h(3, 'Comunicación'),
      table(['Canal', 'Detalle'], [['Email', ''], ['Teléfono', ''], ['Web', '']]),
      h(3, 'Dirección'),
      p(''),
      h(3, 'Facturación'),
      table(['Campo', 'Valor'], [['Razón social', ''], ['NIF/CIF', ''], ['Dirección fiscal', '']]),
    ),
  },
  {
    id: 'builtin-brainstorm',
    name: 'Lluvia de ideas',
    description: 'Notas de reunión, brainstorming kick-off y recomendaciones',
    category: 'proyecto',
    is_builtin: true,
    content: doc(
      h(2, '💡 Lluvia de ideas'),
      rich(bold('Tema: '), text('')),
      callout('tip', p('Genera todas las ideas posibles sin juzgar. Filtra después.')),
      h(3, 'Todas las ideas (sin filtrar)'),
      bullet(['', '', '']),
      toggle('Ideas descartadas (y por qué)', false, bullet([''])),
      h(3, 'Ideas seleccionadas'),
      tasks(['', '']),
      callout('success', rich(bold('Recomendación final: '), text(''))),
    ),
  },
  {
    id: 'builtin-meeting-notes',
    name: 'Notas de reunión',
    description: 'Detalles, objetivos, tabla de equipo, checklist y acuerdos',
    category: 'reuniones',
    is_builtin: true,
    content: doc(
      h(2, '📋 Notas de reunión'),
      rich(bold('Fecha: '), text(''), bold('   Hora: '), text('')),
      rich(bold('Lugar / enlace: '), text('')),
      h(3, 'Objetivos'),
      bullet(['']),
      h(3, 'Asistentes'),
      table(['Nombre', 'Rol', 'Presente'], [['', '', '✅'], ['', '', '']]),
      h(3, 'Puntos discutidos'),
      bullet(['']),
      h(3, 'Acuerdos y tareas'),
      tasks(['', '']),
      callout('info', rich(bold('Próxima reunión: '), text(''))),
    ),
  },
]
