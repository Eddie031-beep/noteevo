// Edge Function: send-reminders
// Envía recordatorios de tareas por email vía Resend. Pensada para correr
// con un cron horario (ver supabase/functions/send-reminders/README.md).
//
// Flujo (basado en due_date, dos recordatorios independientes):
//   1. Llama al RPC get_due_date_reminders() (service_role) que devuelve las
//      tareas con due_date, no completadas, cuyo usuario tiene
//      email_notifications = true y a las que les falta enviar al menos uno de
//      los dos recordatorios.
//   2. Por cada tarea evalúa de forma independiente:
//        - due_date - 7 días <= ahora  y  reminder_7days_sent = false  → email "7 días"
//        - due_date - 1 día  <= ahora  y  reminder_1day_sent  = false  → email "1 día"
//   3. Marca cada flag (reminder_7days_sent / reminder_1day_sent) por separado
//      solo para las tareas cuyo email correspondiente se envió con éxito.
//
// Nota: la columna reminder_sent se mantiene en la tabla por compatibilidad
// pero ya no forma parte de este flujo.

import { createClient } from 'jsr:@supabase/supabase-js@2'

type ReminderKind = '7days' | '1day'

interface DueReminder {
  task_id: string
  title: string
  description: string | null
  due_date: string | null
  email: string
  display_name: string | null
  reminder_7days_sent: boolean
  reminder_1day_sent: boolean
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM = Deno.env.get('REMINDER_FROM') ?? 'NoteEvo <onboarding@resend.dev>'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function formatDate(iso: string | null): string {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('es', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'UTC',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Devuelve true si due_date - (offsetDays días) ya pasó respecto a ahora.
function isWithin(dueDate: string | null, offsetDays: number): boolean {
  if (!dueDate) return false
  const threshold = new Date(dueDate).getTime() - offsetDays * MS_PER_DAY
  return threshold <= Date.now()
}

function subjectFor(kind: ReminderKind, title: string): string {
  return kind === '7days'
    ? `⏰ Tu tarea vence en 7 días: ${title}`
    : `⏰ Tu tarea vence mañana: ${title}`
}

function buildHtml(r: DueReminder, kind: ReminderKind): string {
  const hello = r.display_name ? `Hola ${escapeHtml(r.display_name)},` : 'Hola,'
  const heading = kind === '7days'
    ? '⏰ Tu tarea vence en 7 días'
    : '⏰ Tu tarea vence mañana'
  const due = r.due_date
    ? `<p style="margin:0 0 8px;color:#6b6b6b;font-size:14px;">Vence: <strong>${formatDate(r.due_date)}</strong></p>`
    : ''
  const desc = r.description
    ? `<p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.5;">${escapeHtml(r.description)}</p>`
    : ''
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
    <div style="display:inline-block;width:40px;height:40px;background:#2e9e68;border-radius:10px;text-align:center;line-height:40px;color:#fff;font-weight:700;font-size:18px;">N</div>
    <h1 style="font-size:20px;color:#1a1a1a;margin:16px 0 4px;">${heading}</h1>
    <p style="margin:0 0 16px;color:#6b6b6b;font-size:14px;">${hello}</p>
    <div style="background:#f6f6f6;border:1px solid #e4e4e4;border-radius:12px;padding:16px;">
      <h2 style="font-size:17px;color:#1a1a1a;margin:0 0 8px;">${escapeHtml(r.title)}</h2>
      ${due}
      ${desc}
    </div>
    <p style="margin:20px 0 0;color:#9a9a9a;font-size:12px;">Recibes este correo porque tienes activadas las notificaciones por email en NoteEvo.</p>
  </div>`
}

async function sendEmail(r: DueReminder, kind: ReminderKind): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [r.email],
      subject: subjectFor(kind, r.title),
      html: buildHtml(r, kind),
    }),
  })
  return res.ok
}

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

  const { data, error } = await supabase.rpc('get_due_date_reminders')
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const reminders = (data ?? []) as DueReminder[]
  const sent7Ids: string[] = []
  const sent1Ids: string[] = []
  let failed = 0

  for (const r of reminders) {
    // Recordatorio de 7 días: independiente del de 1 día.
    if (!r.reminder_7days_sent && isWithin(r.due_date, 7)) {
      try {
        if (await sendEmail(r, '7days')) sent7Ids.push(r.task_id)
        else failed++
      } catch {
        failed++
      }
    }

    // Recordatorio de 1 día: independiente del de 7 días.
    if (!r.reminder_1day_sent && isWithin(r.due_date, 1)) {
      try {
        if (await sendEmail(r, '1day')) sent1Ids.push(r.task_id)
        else failed++
      } catch {
        failed++
      }
    }
  }

  if (sent7Ids.length > 0) {
    await supabase.from('tasks').update({ reminder_7days_sent: true }).in('id', sent7Ids)
  }
  if (sent1Ids.length > 0) {
    await supabase.from('tasks').update({ reminder_1day_sent: true }).in('id', sent1Ids)
  }

  return new Response(
    JSON.stringify({
      found: reminders.length,
      sent7days: sent7Ids.length,
      sent1day: sent1Ids.length,
      failed,
    }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
