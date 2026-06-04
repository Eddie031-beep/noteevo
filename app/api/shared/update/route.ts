import { NextRequest, NextResponse } from 'next/server'
import { updateSharedNoteContent } from '@/lib/supabase/shared-notes-server'

/**
 * Endpoint público (sin auth) para guardar ediciones de una nota compartida con
 * access_level='edit'. Toda la autorización se delega en
 * updateSharedNoteContent, que valida activo + edit + no expirado y usa el
 * cliente admin server-side.
 */
export async function POST(req: NextRequest) {
  let body: { slug?: unknown; content?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'JSON inválido' }, { status: 400 })
  }

  const { slug, content } = body
  if (typeof slug !== 'string' || !slug) {
    return NextResponse.json({ success: false, error: 'Slug inválido' }, { status: 400 })
  }

  const result = await updateSharedNoteContent(slug, content)

  if (result.ok) {
    return NextResponse.json({ success: true })
  }

  const status =
    result.reason === 'forbidden' ? 403 :
    result.reason === 'not_found' ? 404 :
    result.reason === 'expired' ? 410 :
    result.reason === 'invalid' ? 400 :
    500

  const message =
    result.reason === 'forbidden' ? 'Este enlace no permite edición' :
    result.reason === 'not_found' ? 'El enlace no existe o fue desactivado' :
    result.reason === 'expired' ? 'El enlace ha expirado' :
    result.reason === 'invalid' ? 'Contenido inválido' :
    'Error al guardar'

  return NextResponse.json({ success: false, error: message }, { status })
}
