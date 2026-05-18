import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 10

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const { data: { user }, error: authError } = await client.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'No autenticado' }, { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]
    const { count } = await client
      .from('ai_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return NextResponse.json(
        { success: false, error: 'Límite diario alcanzado (10 resúmenes/día)' },
        { status: 429 }
      )
    }

    const { content } = await req.json()
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'La nota no tiene contenido para resumir' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) throw new Error('ANTHROPIC_API_KEY no configurada')

    const anthropic = new Anthropic({ apiKey })

    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Resume el siguiente contenido de nota de forma concisa en español, en 3-4 oraciones máximo. Devuelve solo el resumen, sin introducción ni formato extra:\n\n${content}`,
        },
      ],
    })

    const summary = message.content[0].type === 'text' ? message.content[0].text : ''
    const tokensUsed = message.usage.input_tokens + message.usage.output_tokens

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'summarize',
      tokens_used: tokensUsed,
    })

    return NextResponse.json({ success: true, data: { summary } })
  } catch {
    return NextResponse.json({ success: false, error: 'Error al generar el resumen' }, { status: 500 })
  }
}
