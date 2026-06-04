import { NextRequest } from 'next/server'
import Groq from 'groq-sdk'
import { createClient as createServerClient } from '@/lib/supabase/server'

const MAX_DAILY_REQUESTS = 20

export async function POST(req: NextRequest) {
  try {
    const client = await createServerClient()
    const { data: { user }, error: authError } = await client.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'No autenticado' }), { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]
    const { count } = await client
      .from('ai_usage')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('action', 'ai_assistant')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return new Response(
        JSON.stringify({ error: 'Límite diario alcanzado (20 mensajes/día)' }),
        { status: 429 }
      )
    }

    const { context, messages } = await req.json() as {
      context?: unknown
      messages?: unknown
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Datos inválidos' }), { status: 400 })
    }

    const contextText =
      typeof context === 'string' && context.trim().length > 0
        ? context.trim().slice(0, 8000)
        : null

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'ai_assistant',
      tokens_used: null,
    })

    const groq = new Groq({ apiKey })

    const chatHistory: Groq.Chat.Completions.ChatCompletionMessageParam[] = (
      messages as Array<{ role: string; content: string }>
    )
      .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map((m) =>
        m.role === 'user'
          ? { role: 'user' as const, content: m.content }
          : { role: 'assistant' as const, content: m.content }
      )

    const systemPrompt = contextText
      ? `Eres el asistente IA de NoteEvo, una app de notas. Ayudas al usuario a pensar, resumir, organizar y planificar a partir de sus notas. Responde siempre en español, de forma clara y útil. A continuación tienes el contexto de las notas del usuario; úsalo cuando sea relevante y, si la respuesta no está en el contexto, dilo con honestidad.\n\n--- CONTEXTO DE NOTAS ---\n${contextText}\n--- FIN DEL CONTEXTO ---`
      : `Eres el asistente IA de NoteEvo, una app de notas. Ayudas al usuario a pensar, redactar, resumir y organizar ideas. Responde siempre en español, de forma clara y útil.`

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        ...chatHistory,
      ],
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content ?? ''
            if (delta) controller.enqueue(encoder.encode(delta))
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  } catch {
    return new Response(
      JSON.stringify({ error: 'Error al procesar el mensaje' }),
      { status: 500 }
    )
  }
}
