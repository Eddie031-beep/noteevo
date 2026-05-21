import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 10

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const { data: { user }, error: authError } = await client.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'No autenticado' },
        { status: 401 }
      )
    }

    const today = new Date().toISOString().split('T')[0]
    const { count } = await client
      .from('ai_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('action', 'suggest_tags')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return NextResponse.json(
        { success: false, error: 'Límite diario alcanzado (10 sugerencias/día)' },
        { status: 429 }
      )
    }

    const { content } = await req.json()
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'La nota no tiene contenido para analizar' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    const groq = new Groq({ apiKey })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: `Analiza el siguiente texto y sugiere entre 3 y 5 etiquetas (tags) muy cortas y relevantes en español. Devuelve SOLO un array JSON con las etiquetas, sin explicaciones ni texto adicional. Ejemplo: ["trabajo","reunión","pendiente"]\n\nTexto:\n${content.slice(0, 2000)}`,
        },
      ],
    })

    const raw = completion.choices[0]?.message?.content?.trim() ?? '[]'

    let tags: string[] = []
    try {
      const cleaned = raw.replace(/```json|```/g, '').trim()
      const parsed: unknown = JSON.parse(cleaned)
      if (Array.isArray(parsed)) {
        tags = parsed
          .filter((t): t is string => typeof t === 'string')
          .map((t) => t.toLowerCase().trim())
          .filter((t) => t.length > 0)
          .slice(0, 5)
      }
    } catch {
      return NextResponse.json(
        { success: false, error: 'No se pudieron interpretar los tags sugeridos' },
        { status: 500 }
      )
    }

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'suggest_tags',
      tokens_used: completion.usage?.total_tokens ?? 0,
    })

    return NextResponse.json({ success: true, data: { tags } })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error al sugerir etiquetas' },
      { status: 500 }
    )
  }
}
