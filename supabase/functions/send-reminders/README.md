# send-reminders

Edge Function que envía recordatorios de tareas por email vía [Resend](https://resend.com).

## Qué hace

1. Llama al RPC `get_due_date_reminders()` (solo `service_role`), que devuelve las
   tareas con `due_date` definido, `is_completed = false`, cuyo dueño tiene
   `email_notifications = true` y a las que les falta enviar al menos uno de los
   dos recordatorios.
2. Por cada tarea evalúa de forma **independiente** dos umbrales y envía hasta
   dos emails (asunto/encabezado distintos):
   - **7 días antes**: `due_date - 7 días <= now()` y `reminder_7days_sent = false`.
   - **1 día antes**: `due_date - 1 día <= now()` y `reminder_1day_sent = false`.
3. Marca `reminder_7days_sent` / `reminder_1day_sent` por separado, solo en las
   tareas cuyo email correspondiente se envió con éxito (evita reenvíos).

> La columna `reminder_sent` se conserva en la tabla por compatibilidad, pero ya
> no forma parte de este flujo.

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
# => {"found":N,"sent7days":N,"sent1day":N,"failed":0}
```
