import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createClient as createServerClient } from '@/lib/supabase/server'

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY no configurada')
  return createClient(url, key)
}

interface LookupBody {
  spaceId: string
  email: string
}

/**
 * Busca un usuario por email para previsualizarlo antes de invitarlo.
 * Solo accesible por el dueño o un admin del space indicado (evita usar el
 * endpoint como oráculo de enumeración de emails).
 */
export async function POST(req: NextRequest) {
  try {
    const serverClient = await createServerClient()
    const { data: { user }, error: authError } = await serverClient.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const body: LookupBody = await req.json()
    const { spaceId, email } = body

    if (!spaceId || !email || !email.includes('@')) {
      return NextResponse.json({ success: false, error: 'Datos inválidos' }, { status: 400 })
    }

    const { data: space, error: spaceError } = await serverClient
      .from('spaces')
      .select('id, owner_id')
      .eq('id', spaceId)
      .single()

    if (spaceError || !space) {
      return NextResponse.json({ success: false, error: 'Space no encontrado' }, { status: 404 })
    }

    const isOwner = space.owner_id === user.id
    if (!isOwner) {
      const { data: membership } = await serverClient
        .from('space_members')
        .select('role')
        .eq('space_id', spaceId)
        .eq('user_id', user.id)
        .single()

      if (!membership || membership.role !== 'admin') {
        return NextResponse.json({ success: false, error: 'Sin permisos para invitar' }, { status: 403 })
      }
    }

    const admin = getAdminClient()
    const normalizedEmail = email.trim().toLowerCase()

    const { data: inviteeId, error: rpcError } = await admin
      .rpc('get_user_id_by_email', { email: normalizedEmail })

    if (rpcError) {
      return NextResponse.json({ success: false, error: 'Error interno al buscar usuario' }, { status: 500 })
    }
    if (!inviteeId) {
      return NextResponse.json(
        { success: false, error: 'No existe ningún usuario registrado con ese email' },
        { status: 404 }
      )
    }

    if (inviteeId === user.id) {
      return NextResponse.json(
        { success: false, error: 'No puedes invitarte a ti mismo' },
        { status: 400 }
      )
    }

    const { data: existing } = await admin
      .from('space_members')
      .select('user_id')
      .eq('space_id', spaceId)
      .eq('user_id', inviteeId)
      .single()

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Este usuario ya es miembro del space' },
        { status: 409 }
      )
    }

    // Nombre para mostrar (opcional) desde user_profiles.
    const { data: profile } = await admin
      .from('user_profiles')
      .select('display_name')
      .eq('id', inviteeId)
      .single()

    return NextResponse.json({
      success: true,
      user: {
        email: normalizedEmail,
        displayName: profile?.display_name ?? null,
      },
    })
  } catch {
    return NextResponse.json({ success: false, error: 'Error interno del servidor' }, { status: 500 })
  }
}
