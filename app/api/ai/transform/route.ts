import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 20

type TransformAction =
  | 'tone_formal'
  | 'tone_casual'
  | 'fix_typos'
  | 'translate_en'
  | 'translate_es'
  | 'make_shorter'
  | 'make_longer'

const PROMPTS: Record<TransformAction, string> = {
  tone_formal:
    'Reescribe el siguiente texto con un tono formal y profesional. Devuelve SOLO el texto, sin explicaciones:',
  tone_casual:
    'Reescribe el siguiente texto con un tono casual y amigable. Devuelve SOLO el texto, sin explicaciones:',
  fix_typos:
    'Corrige todos los errores ortográficos y gramaticales del siguiente texto. Devuelve SOLO el texto corregido, sin explicaciones:',
  translate_en:
    'Traduce el siguiente texto al inglés. Devuelve SOLO la traducción, sin explicaciones:',
  translate_es:
    'Traduce el siguiente texto al español. Devuelve SOLO la traducción, sin explicaciones:',
  make_shorter:
    'Acorta el siguiente texto manteniendo las ideas principales. Devuelve SOLO el texto acortado, sin explicaciones:',
  make_longer:
    'Expande el siguiente texto con más detalles y contexto. Devuelve SOLO el texto expandido, sin explicaciones:',
}

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const { data: { user }, error: authError } = await client.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]
    const { count } = await client
      .from('ai_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('action', 'transform')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return NextResponse.json(
        { error: 'Límite diario alcanzado (20 transformaciones/día)' },
        { status: 429 }
      )
    }

    const { text, action } = await req.json() as { text: unknown; action: unknown }

    if (
      !text || typeof text !== 'string' || text.trim().length === 0 ||
      !action || typeof action !== 'string' || !(action in PROMPTS)
    ) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
    }

    const typedAction = action as TransformAction
    const prompt = PROMPTS[typedAction]

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'transform',
      tokens_used: 0,
    })

    const groq = new Groq({ apiKey })
    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [
        { role: 'user', content: `${prompt}\n\n${text}` },
      ],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content ?? ''
          if (delta) controller.enqueue(encoder.encode(delta))
        }
        controller.close()
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch {
    return NextResponse.json(
      { error: 'Error al transformar el texto' },
      { status: 500 }
    )
  }
}
