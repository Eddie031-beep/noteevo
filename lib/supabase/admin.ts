import { createClient as createSupabaseClient } from '@supabase/supabase-js'

/**
 * Service role client — bypasses RLS.
 * Only for server-side Route Handlers. Never import in client components.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error('Credenciales de administrador de Supabase no configuradas')
  }

  return createSupabaseClient(url, serviceKey, {
    auth: { persistSession: false },
  })
}
