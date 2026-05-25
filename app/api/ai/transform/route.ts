import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 30

type TransformAction =
  // Texto
  | 'tone_formal'
  | 'tone_casual'
  | 'tone_funny'
  | 'tone_engaging'
  | 'tone_concise'
  | 'tone_empathetic'
  | 'fix_typos'
  | 'make_shorter'
  | 'make_longer'
  | 'humanize'
  // Resumir selección
  | 'summarize_paragraph'
  | 'summarize_structured'
  | 'summarize_bullet'
  // Ayúdame a escribir
  | 'help_introduction'
  | 'help_conclusion'
  | 'help_title'
  // Traducir
  | 'translate_en'
  | 'translate_es'
  | 'translate_fr'
  | 'translate_de'
  | 'translate_zh'
  | 'translate_ja'
  | 'translate_ru'
  | 'translate_it'
  | 'translate_pt'
  | 'translate_ar'
  | 'translate_hi'
  | 'translate_tr'
  | 'translate_id'
  | 'translate_vi'
  | 'translate_ko'
  // Convertir en
  | 'draft_email'
  | 'draft_social'

const PROMPTS: Record<TransformAction, string> = {
  // Tono
  tone_formal:
    'Reescribe el siguiente texto con un tono formal y profesional. Devuelve SOLO el texto, sin explicaciones:',
  tone_casual:
    'Reescribe el siguiente texto con un tono casual y amigable. Devuelve SOLO el texto, sin explicaciones:',
  tone_funny:
    'Reescribe el siguiente texto con un tono divertido y humorístico. Devuelve SOLO el texto, sin explicaciones:',
  tone_engaging:
    'Reescribe el siguiente texto de forma más atractiva y que enganche al lector. Devuelve SOLO el texto, sin explicaciones:',
  tone_concise:
    'Reescribe el siguiente texto de forma más concisa y directa, eliminando redundancias. Devuelve SOLO el texto, sin explicaciones:',
  tone_empathetic:
    'Reescribe el siguiente texto con un tono empático, comprensivo y cercano. Devuelve SOLO el texto, sin explicaciones:',

  // Texto
  fix_typos:
    'Corrige todos los errores ortográficos y gramaticales del siguiente texto. Devuelve SOLO el texto corregido, sin explicaciones:',
  make_shorter:
    'Acorta el siguiente texto manteniendo las ideas principales. Devuelve SOLO el texto acortado, sin explicaciones:',
  make_longer:
    'Expande el siguiente texto con más detalles y contexto. Devuelve SOLO el texto expandido, sin explicaciones:',
  humanize:
    'Reescribe el siguiente texto para que suene más humano, natural y conversacional, eliminando cualquier tono robótico. Devuelve SOLO el texto, sin explicaciones:',

  // Resumir selección
  summarize_paragraph:
    'Resume el siguiente texto en un solo párrafo cohesivo. Devuelve SOLO el párrafo, sin introducción ni explicaciones:',
  summarize_structured:
    'Convierte el siguiente texto en un resumen estructurado con puntos clave. Devuelve SOLO el resumen estructurado, sin explicaciones:',
  summarize_bullet:
    'Resume el siguiente texto como una lista de puntos clave. Devuelve SOLO la lista de puntos con guiones, sin introducción:',

  // Ayúdame a escribir
  help_introduction:
    'Escribe una introducción atractiva para el siguiente contenido. Devuelve SOLO la introducción, sin explicaciones:',
  help_conclusion:
    'Escribe una conclusión efectiva para el siguiente contenido. Devuelve SOLO la conclusión, sin explicaciones:',
  help_title:
    'Genera un título atractivo y descriptivo para el siguiente contenido. Devuelve SOLO el título, sin explicaciones:',

  // Traducir
  translate_en: 'Traduce el siguiente texto al inglés. Devuelve SOLO la traducción:',
  translate_es: 'Traduce el siguiente texto al español. Devuelve SOLO la traducción:',
  translate_fr: 'Traduce el siguiente texto al francés. Devuelve SOLO la traducción:',
  translate_de: 'Traduce el siguiente texto al alemán. Devuelve SOLO la traducción:',
  translate_zh: 'Traduce el siguiente texto al chino mandarín (simplificado). Devuelve SOLO la traducción:',
  translate_ja: 'Traduce el siguiente texto al japonés. Devuelve SOLO la traducción:',
  translate_ru: 'Traduce el siguiente texto al ruso. Devuelve SOLO la traducción:',
  translate_it: 'Traduce el siguiente texto al italiano. Devuelve SOLO la traducción:',
  translate_pt: 'Traduce el siguiente texto al portugués. Devuelve SOLO la traducción:',
  translate_ar: 'Traduce el siguiente texto al árabe. Devuelve SOLO la traducción:',
  translate_hi: 'Traduce el siguiente texto al hindi. Devuelve SOLO la traducción:',
  translate_tr: 'Traduce el siguiente texto al turco. Devuelve SOLO la traducción:',
  translate_id: 'Traduce el siguiente texto al indonesio. Devuelve SOLO la traducción:',
  translate_vi: 'Traduce el siguiente texto al vietnamita. Devuelve SOLO la traducción:',
  translate_ko: 'Traduce el siguiente texto al coreano. Devuelve SOLO la traducción:',

  // Convertir en
  draft_email:
    'Convierte el siguiente contenido en un email profesional bien redactado con asunto, saludo, cuerpo y despedida. Devuelve SOLO el email:',
  draft_social:
    'Convierte el siguiente contenido en un post atractivo para redes sociales, conciso y con buen gancho. Devuelve SOLO el post:',
}

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const {
      data: { user },
      error: authError,
    } = await client.auth.getUser()
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
        { error: `Límite diario alcanzado (${MAX_DAILY_REQUESTS} transformaciones/día)` },
        { status: 429 }
      )
    }

    const { text, action } = (await req.json()) as {
      text: unknown
      action: unknown
    }

    if (
      !text ||
      typeof text !== 'string' ||
      text.trim().length === 0 ||
      !action ||
      typeof action !== 'string' ||
      !(action in PROMPTS)
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
      messages: [{ role: 'user', content: `${prompt}\n\n${text}` }],
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
