import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { loadTestEnv } from './env'
import { PREFIX } from './constants'

loadTestEnv()

/**
 * Cliente Supabase con service-role: omite RLS para poder limpiar datos de prueba
 * sin importar a qué usuario pertenezcan. Solo se usa en el teardown de E2E, nunca en la app.
 */
function adminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('Faltan NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY para limpiar E2E')
  }
  return createClient(url, key, { auth: { persistSession: false } })
}

/**
 * Borra todos los datos creados por los tests (prefijo PREFIX), incluyendo objetos de storage.
 * El orden respeta las dependencias: adjuntos → notas → tareas/etiquetas/libretas.
 */
export async function cleanupTestData(): Promise<void> {
  const supabase = adminClient()
  const like = `${PREFIX}%`

  // 1. Adjuntos: eliminar objetos del bucket y luego las filas.
  const { data: atts } = await supabase
    .from('attachments')
    .select('storage_path')
    .like('file_name', like)

  const paths = (atts ?? [])
    .map((a) => (a as { storage_path: string | null }).storage_path)
    .filter((p): p is string => Boolean(p))
  if (paths.length > 0) {
    await supabase.storage.from('attachments').remove(paths)
  }
  await supabase.from('attachments').delete().like('file_name', like)

  // 2. Notas dentro de libretas de prueba (las nuevas notas no llevan título prefijado)
  //    + notas que sí tengan título de prueba.
  const { data: nbs } = await supabase.from('notebooks').select('id').like('name', like)
  const notebookIds = (nbs ?? []).map((n) => (n as { id: string }).id)
  if (notebookIds.length > 0) {
    await supabase.from('notes').delete().in('notebook_id', notebookIds)
  }
  await supabase.from('notes').delete().like('title', like)

  // 3. Tareas, etiquetas y libretas de prueba.
  await supabase.from('tasks').delete().like('title', like)
  await supabase.from('tags').delete().like('name', like)
  await supabase.from('notebooks').delete().like('name', like)
}
