# send-reminders

Edge Function que envía recordatorios de tareas por email vía [Resend](https://resend.com).

## Qué hace

1. Llama al RPC `get_due_task_reminders()` (solo `service_role`), que devuelve las
   tareas con `reminder_at <= now()`, `reminder_sent = false`, `is_completed = false`
   y cuyo dueño tiene `email_notifications = true`.
2. Envía un email por cada recordatorio.
3. Marca `reminder_sent = true` en las tareas enviadas con éxito (evita reenvíos).

## Secrets necesarios

`SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` los inyecta Supabase automáticamente.
Falta configurar la clave de Resend (y opcionalmente el remitente):

```bash
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
# Opcional — usa un dominio verificado en Resend. Por defecto: onboarding@resend.dev
supabase secrets set REMINDER_FROM="NoteEvo <recordatorios@tudominio.com>"
```

## Desplegar

```bash
supabase functions deploy send-reminders
```

## Programar el cron (cada hora)

Requiere las extensiones `pg_cron` y `pg_net` (ya habilitadas en este proyecto).
Ejecuta este SQL **reemplazando** `<PROJECT_REF>` y `<SERVICE_ROLE_KEY>`:

```sql
select cron.schedule(
  'send-task-reminders-hourly',
  '0 * * * *',
  $$
  select net.http_post(
    url := 'https://<PROJECT_REF>.supabase.co/functions/v1/send-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer <SERVICE_ROLE_KEY>'
    ),
    body := '{}'::jsonb
  );
  $$
);
```

Para quitarlo: `select cron.unschedule('send-task-reminders-hourly');`

## Probar manualmente

```bash
curl -X POST 'https://<PROJECT_REF>.supabase.co/functions/v1/send-reminders' \
  -H 'Authorization: Bearer <SERVICE_ROLE_KEY>'
# => {"found":N,"sent":N,"failed":0}
```
