// Edge Function: send-reminders
// Envía recordatorios de tareas por email vía Resend. Pensada para correr
// con un cron horario (ver supabase/functions/send-reminders/README.md).
//
// Flujo:
//   1. Llama al RPC get_due_task_reminders() (service_role) que devuelve las
//      tareas con reminder_at vencido, no enviadas, no completadas y cuyo
//      usuario tiene email_notifications = true.
//   2. Envía un email por cada una vía Resend.
//   3. Marca reminder_sent = true en las tareas enviadas con éxito.

import { createClient } from 'jsr:@supabase/supabase-js@2'

interface DueReminder {
  task_id: string
  title: string
  description: string | null
  due_date: string | null
  reminder_at: string
  email: string
  display_name: string | null
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM = Deno.env.get('REMINDER_FROM') ?? 'NoteEvo <onboarding@resend.dev>'

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

function buildHtml(r: DueReminder): string {
  const hello = r.display_name ? `Hola ${escapeHtml(r.display_name)},` : 'Hola,'
  const due = r.due_date
    ? `<p style="margin:0 0 8px;color:#6b6b6b;font-size:14px;">Vence: <strong>${formatDate(r.due_date)}</strong></p>`
    : ''
  const desc = r.description
    ? `<p style="margin:0 0 16px;color:#333;font-size:15px;line-height:1.5;">${escapeHtml(r.description)}</p>`
    : ''
  return `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;padding:24px;">
    <div style="display:inline-block;width:40px;height:40px;background:#1a7a4a;border-radius:10px;text-align:center;line-height:40px;color:#fff;font-weight:700;font-size:18px;">N</div>
    <h1 style="font-size:20px;color:#1a1a1a;margin:16px 0 4px;">⏰ Recordatorio de tarea</h1>
    <p style="margin:0 0 16px;color:#6b6b6b;font-size:14px;">${hello}</p>
    <div style="background:#f6f6f6;border:1px solid #e4e4e4;border-radius:12px;padding:16px;">
      <h2 style="font-size:17px;color:#1a1a1a;margin:0 0 8px;">${escapeHtml(r.title)}</h2>
      ${due}
      ${desc}
    </div>
    <p style="margin:20px 0 0;color:#9a9a9a;font-size:12px;">Recibes este correo porque tienes activadas las notificaciones por email en NoteEvo.</p>
  </div>`
}

async function sendEmail(r: DueReminder): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [r.email],
      subject: `⏰ Recordatorio: ${r.title}`,
      html: buildHtml(r),
    }),
  })
  return res.ok
}

Deno.serve(async () => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

  const { data, error } = await supabase.rpc('get_due_task_reminders')
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const reminders = (data ?? []) as DueReminder[]
  const sentIds: string[] = []
  let failed = 0

  for (const r of reminders) {
    try {
      const ok = await sendEmail(r)
      if (ok) sentIds.push(r.task_id)
      else failed++
    } catch {
      failed++
    }
  }

  if (sentIds.length > 0) {
    await supabase.from('tasks').update({ reminder_sent: true }).in('id', sentIds)
  }

  return new Response(
    JSON.stringify({ found: reminders.length, sent: sentIds.length, failed }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
