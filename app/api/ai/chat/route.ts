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
      .eq('action', 'chat')
      .gte('created_at', `${today}T00:00:00`)

    if ((count ?? 0) >= MAX_DAILY_REQUESTS) {
      return new Response(
        JSON.stringify({ error: 'Límite diario alcanzado (20 mensajes/día)' }),
        { status: 429 }
      )
    }

    const { noteContent, messages } = await req.json() as {
      noteContent?: unknown
      messages?: unknown
    }

    if (
      !noteContent ||
      typeof noteContent !== 'string' ||
      !Array.isArray(messages)
    ) {
      return new Response(
        JSON.stringify({ error: 'Datos inválidos' }),
        { status: 400 }
      )
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) throw new Error('GROQ_API_KEY no configurada')

    await client.from('ai_usage').insert({
      user_id: user.id,
      action: 'chat',
      tokens_used: null,
    })

    const groq = new Groq({ apiKey })

    const chatHistory: Groq.Chat.Completions.ChatCompletionMessageParam[] = (
      messages as Array<{ role: string; content: string }>
    )
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .map((m) =>
        m.role === 'user'
          ? { role: 'user' as const, content: m.content }
          : { role: 'assistant' as const, content: m.content }
      )

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      stream: true,
      messages: [
        {
          role: 'system',
          content: `Eres un asistente que responde preguntas sobre el contenido de una nota. Responde siempre en español, de forma concisa y útil. Solo usa la información de la nota para responder — si algo no está en la nota, dilo claramente.\n\nContenido de la nota:\n\n${noteContent}`,
        },
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
