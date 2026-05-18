import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
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
      .eq('action', 'summarize')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return NextResponse.json(
        { success: false, error: 'Límite diario alcanzado (10 resúmenes/día)' },
        { status: 429 }
      )
    }

    const { content } = await req.json()
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'La nota no tiene contenido para resumir' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    const groq = new Groq({ apiKey })

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Resume el siguiente contenido de nota de forma concisa en español, en 3-4 oraciones máximo. Devuelve solo el resumen, sin introducción ni formato extra:\n\n${content}`,
        },
      ],
    })

    const summary = completion.choices[0]?.message?.content ?? ''
    const tokensUsed = completion.usage?.total_tokens ?? 0

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'summarize',
      tokens_used: tokensUsed,
    })

    return NextResponse.json({ success: true, data: { summary } })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Error al generar el resumen' },
      { status: 500 }
    )
  }
}
