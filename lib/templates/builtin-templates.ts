import type { Template } from '@/types'

// Plantillas originales de NoteEvo — contenido propio, sin copyright
export const BUILTIN_TEMPLATES: Omit<Template, 'created_at' | 'updated_at' | 'user_id'>[] = [
  {
    id: 'builtin-meeting',
    name: 'Reunión de trabajo',
    description: 'Actas, asistentes y puntos de acción',
    category: 'meeting',
    is_builtin: true,
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading', attrs: { level: 2 },
          content: [{ type: 'text', text: '📋 Reunión de trabajo' }],
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', marks: [{ type: 'bold' }], text: 'Fecha: ' },
            { type: 'text', text: '' },
          ],
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', marks: [{ type: 'bold' }], text: 'Asistentes: ' },
            { type: 'text', text: '' },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Agenda' }],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Puntos discutidos' }],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Tareas y responsables' }],
        },
        {
          type: 'taskList',
          content: [
            {
              type: 'taskItem', attrs: { checked: false },
              content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
            },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Próxima reunión' }],
        },
        { type: 'paragraph', content: [{ type: 'text', text: '' }] },
      ],
    },
  },
  {
    id: 'builtin-journal',
    name: 'Diario personal',
    description: 'Reflexiones, gratitud y metas del día',
    category: 'journal',
    is_builtin: true,
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading', attrs: { level: 2 },
          content: [{ type: 'text', text: '📓 Diario personal' }],
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', marks: [{ type: 'bold' }], text: 'Fecha: ' },
            { type: 'text', text: '' },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: '¿Cómo me siento hoy?' }],
        },
        { type: 'paragraph', content: [{ type: 'text', text: '' }] },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Lo más destacado del día' }],
        },
        { type: 'paragraph', content: [{ type: 'text', text: '' }] },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Agradecimiento' }],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Metas para mañana' }],
        },
        {
          type: 'taskList',
          content: [
            {
              type: 'taskItem', attrs: { checked: false },
              content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
            },
          ],
        },
      ],
    },
  },
  {
    id: 'builtin-project',
    name: 'Plan de proyecto',
    description: 'Objetivo, fases, recursos y seguimiento',
    category: 'work',
    is_builtin: true,
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading', attrs: { level: 2 },
          content: [{ type: 'text', text: '🚀 Plan de proyecto' }],
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', marks: [{ type: 'bold' }], text: 'Proyecto: ' },
            { type: 'text', text: '' },
          ],
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', marks: [{ type: 'bold' }], text: 'Fecha de inicio: ' },
            { type: 'text', text: '' },
            { type: 'text', marks: [{ type: 'bold' }], text: '   Entrega: ' },
            { type: 'text', text: '' },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Objetivo' }],
        },
        { type: 'paragraph', content: [{ type: 'text', text: '' }] },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Fases' }],
        },
        {
          type: 'orderedList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Tareas pendientes' }],
        },
        {
          type: 'taskList',
          content: [
            {
              type: 'taskItem', attrs: { checked: false },
              content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
            },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: 'Recursos y links' }],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
          ],
        },
      ],
    },
  },
  {
    id: 'builtin-weekly',
    name: 'Revisión semanal',
    description: 'Balance, aprendizajes y prioridades de la semana',
    category: 'personal',
    is_builtin: true,
    content: {
      type: 'doc',
      content: [
        {
          type: 'heading', attrs: { level: 2 },
          content: [{ type: 'text', text: '📅 Revisión semanal' }],
        },
        {
          type: 'paragraph',
          content: [
            { type: 'text', marks: [{ type: 'bold' }], text: 'Semana del: ' },
            { type: 'text', text: '' },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: '✅ Logros de la semana' }],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: '⚡ Desafíos encontrados' }],
        },
        {
          type: 'bulletList',
          content: [
            { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }] },
          ],
        },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: '💡 Aprendizajes' }],
        },
        { type: 'paragraph', content: [{ type: 'text', text: '' }] },
        {
          type: 'heading', attrs: { level: 3 },
          content: [{ type: 'text', text: '🎯 Prioridades próxima semana' }],
        },
        {
          type: 'taskList',
          content: [
            {
              type: 'taskItem', attrs: { checked: false },
              content: [{ type: 'paragraph', content: [{ type: 'text', text: '' }] }],
            },
          ],
        },
      ],
    },
  },
]
