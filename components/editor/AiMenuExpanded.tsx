'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Sparkles,
  ChevronDown,
  ChevronRight,
  Loader2,
  Check,
  X,
  MessageSquare,
  Tag as TagIcon,
  FileText,
  SpellCheck,
  Globe,
  User,
  Pencil,
  List,
  Send,
  Sliders,
  Minimize2,
  Maximize2,
} from 'lucide-react'
import type { Editor } from '@tiptap/react'

// ── Types ─────────────────────────────────────────────────────────────────
interface SubItem {
  label: string
  action: string
}

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  needsSelection?: boolean
  action?: string
  submenu?: SubItem[]
}

// ── Menu definition ────────────────────────────────────────────────────────
const ANALYSIS_ITEMS: MenuItem[] = [
  {
    id: 'summarize',
    label: 'Resumir nota',
    icon: <FileText size={13} />,
    action: 'summarize',
  },
  {
    id: 'chat',
    label: 'Chat con la nota',
    icon: <MessageSquare size={13} />,
    action: 'chat',
  },
  {
    id: 'smart_tags',
    label: 'Sugerir etiquetas',
    icon: <TagIcon size={13} />,
    action: 'smart_tags',
  },
]

const TEXT_ITEMS: MenuItem[] = [
  {
    id: 'improve',
    label: 'Mejorar texto',
    icon: <Sparkles size={13} />,
    action: 'improve',
    needsSelection: true,
  },
  {
    id: 'fix_typos',
    label: 'Corregir errores',
    icon: <SpellCheck size={13} />,
    action: 'fix_typos',
    needsSelection: true,
  },
  {
    id: 'humanize',
    label: 'Humanizar',
    icon: <User size={13} />,
    action: 'humanize',
    needsSelection: true,
  },
  {
    id: 'make_shorter',
    label: 'Acortar',
    icon: <Minimize2 size={13} />,
    action: 'make_shorter',
    needsSelection: true,
  },
  {
    id: 'make_longer',
    label: 'Expandir',
    icon: <Maximize2 size={13} />,
    action: 'make_longer',
    needsSelection: true,
  },
  {
    id: 'summarize_sel',
    label: 'Resumir',
    icon: <List size={13} />,
    needsSelection: true,
    submenu: [
      { label: 'Como párrafo', action: 'summarize_paragraph' },
      { label: 'Estructurado', action: 'summarize_structured' },
      { label: 'Como lista', action: 'summarize_bullet' },
    ],
  },
  {
    id: 'tone',
    label: 'Cambiar tono',
    icon: <Sliders size={13} />,
    needsSelection: true,
    submenu: [
      { label: 'Formal', action: 'tone_formal' },
      { label: 'Amigable', action: 'tone_casual' },
      { label: 'Divertido', action: 'tone_funny' },
      { label: 'Engaging', action: 'tone_engaging' },
      { label: 'Conciso', action: 'tone_concise' },
      { label: 'Empático', action: 'tone_empathetic' },
    ],
  },
  {
    id: 'help_write',
    label: 'Ayúdame a escribir',
    icon: <Pencil size={13} />,
    needsSelection: true,
    submenu: [
      { label: 'Introducción', action: 'help_introduction' },
      { label: 'Conclusión', action: 'help_conclusion' },
      { label: 'Título', action: 'help_title' },
    ],
  },
  {
    id: 'translate',
    label: 'Traducir',
    icon: <Globe size={13} />,
    needsSelection: true,
    submenu: [
      { label: 'Inglés', action: 'translate_en' },
      { label: 'Español', action: 'translate_es' },
      { label: 'Francés', action: 'translate_fr' },
      { label: 'Alemán', action: 'translate_de' },
      { label: 'Chino', action: 'translate_zh' },
      { label: 'Japonés', action: 'translate_ja' },
      { label: 'Ruso', action: 'translate_ru' },
      { label: 'Italiano', action: 'translate_it' },
      { label: 'Portugués', action: 'translate_pt' },
      { label: 'Árabe', action: 'translate_ar' },
      { label: 'Hindi', action: 'translate_hi' },
      { label: 'Turco', action: 'translate_tr' },
      { label: 'Indonesio', action: 'translate_id' },
      { label: 'Vietnamita', action: 'translate_vi' },
      { label: 'Coreano', action: 'translate_ko' },
    ],
  },
  {
    id: 'draft',
    label: 'Convertir en',
    icon: <Send size={13} />,
    needsSelection: true,
    submenu: [
      { label: 'Email', action: 'draft_email' },
      { label: 'Post en redes', action: 'draft_social' },
    ],
  },
]

// ── Props ──────────────────────────────────────────────────────────────────
interface Props {
  editor: Editor | null
  noteContent: string
  onSummarize: () => void
  onChat: () => void
  onSmartTags: () => void
}

// ── Component ──────────────────────────────────────────────────────────────
export default function AiMenuExpanded({
  editor,
  noteContent: _noteContent,
  onSummarize,
  onChat,
  onSmartTags,
}: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [noSelectionWarning, setNoSelectionWarning] = useState(false)

  // Saved selection range to restore on accept
  const savedFromRef = useRef<number>(0)
  const savedToRef = useRef<number>(0)

  // Dropdown + submenu refs
  const containerRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setActiveSubmenu(null)
        setResult(null)
        setError(null)
      }
    }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Submenu hover helpers
  const openSubmenu = useCallback((id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveSubmenu(id)
  }, [])

  const scheduleCloseSubmenu = useCallback(() => {
    closeTimer.current = setTimeout(() => setActiveSubmenu(null), 150)
  }, [])

  const keepSubmenu = useCallback(
    (id: string) => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
      setActiveSubmenu(id)
    },
    []
  )

  // ── Core action handler ────────────────────────────────────────────────
  const handleAction = useCallback(
    async (action: string) => {
      // Close dropdown for whole-note analysis actions
      if (action === 'summarize') { setOpen(false); onSummarize(); return }
      if (action === 'chat') { setOpen(false); onChat(); return }
      if (action === 'smart_tags') { setOpen(false); onSmartTags(); return }

      // Text actions require a selection
      const sel = editor?.state.selection
      const from = sel?.from ?? 0
      const to = sel?.to ?? 0
      if (!editor || from === to) {
        setNoSelectionWarning(true)
        setTimeout(() => setNoSelectionWarning(false), 2000)
        setActiveSubmenu(null)
        return
      }

      const selectedText = editor.state.doc.textBetween(from, to, '\n')
      savedFromRef.current = from
      savedToRef.current = to

      setResult(null)
      setError(null)
      setLoading(true)
      setActiveSubmenu(null)

      try {
        const endpoint = action === 'improve' ? '/api/ai/improve' : '/api/ai/transform'
        const body =
          action === 'improve'
            ? JSON.stringify({ text: selectedText })
            : JSON.stringify({ text: selectedText, action })

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        })

        if (!res.ok) {
          const data = (await res.json()) as { error?: string }
          throw new Error(data.error ?? 'Error desconocido')
        }

        // Stream the result
        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        if (!reader) throw new Error('No se pudo leer la respuesta')

        let accumulated = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          accumulated += decoder.decode(value, { stream: true })
          setResult(accumulated)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al procesar con IA')
      } finally {
        setLoading(false)
      }
    },
    [editor, onSummarize, onChat, onSmartTags]
  )

  // ── Accept / reject ───────────────────────────────────────────────────
  const acceptResult = useCallback(() => {
    if (!editor || result === null) return
    const from = savedFromRef.current
    const to = savedToRef.current
    editor.chain().focus().deleteRange({ from, to }).insertContentAt(from, result.trim()).run()
    setResult(null)
    setOpen(false)
  }, [editor, result])

  const rejectResult = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  // ── Render helpers ─────────────────────────────────────────────────────
  const renderItem = (item: MenuItem) => {
    const hasSubmenu = !!item.submenu

    return (
      <div
        key={item.id}
        className="relative"
        onMouseEnter={() => {
          if (hasSubmenu) openSubmenu(item.id)
          else scheduleCloseSubmenu()
        }}
        onMouseLeave={() => {
          if (hasSubmenu) scheduleCloseSubmenu()
        }}
      >
        <button
          type="button"
          disabled={loading}
          onClick={() => {
            if (!hasSubmenu && item.action) handleAction(item.action)
          }}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground transition rounded-lg disabled:opacity-40 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <span className="text-subtle shrink-0">{item.icon}</span>
            {item.label}
          </span>
          {hasSubmenu && <ChevronRight size={11} className="text-subtle shrink-0" />}
        </button>

        {/* Submenu panel */}
        {hasSubmenu && activeSubmenu === item.id && item.submenu && (
          <div
            className="absolute left-full top-0 ml-0.5 z-50 bg-panel border border-border rounded-xl shadow-2xl py-1 w-40"
            onMouseEnter={() => keepSubmenu(item.id)}
            onMouseLeave={scheduleCloseSubmenu}
          >
            {item.submenu.map((sub) => (
              <button
                key={sub.action}
                type="button"
                disabled={loading}
                onClick={() => handleAction(sub.action)}
                className="w-full px-3 py-2 text-xs text-muted hover:bg-surface hover:text-foreground transition text-left rounded-lg disabled:opacity-40 cursor-pointer"
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── Main render ────────────────────────────────────────────────────────
  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger button */}
      <button
        type="button"
        title="IA"
        onClick={() => {
          setOpen(!open)
          if (open) {
            setResult(null)
            setError(null)
            setActiveSubmenu(null)
          }
        }}
        className="flex items-center gap-1 px-2 py-1.5 rounded text-xs text-muted hover:bg-surface hover:text-foreground transition cursor-pointer"
      >
        <Sparkles size={13} className="text-accent" />
        <span>IA</span>
        <ChevronDown size={10} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-9 z-40 bg-panel border border-border rounded-xl shadow-2xl w-52 py-1">
          {/* No selection warning */}
          {noSelectionWarning && (
            <div className="px-3 py-2 text-xs text-amber-400 bg-amber-400/10 mx-1 mb-1 rounded-lg">
              Selecciona texto primero
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted">
              <Loader2 size={12} className="animate-spin text-accent" />
              Procesando…
            </div>
          )}

          {/* Result panel */}
          {result !== null && !loading && (
            <div className="px-3 py-2 space-y-2">
              <p className="text-[10px] text-subtle uppercase tracking-wider">Resultado</p>
              <p className="text-xs text-foreground leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                {result}
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={acceptResult}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent/90 transition cursor-pointer"
                >
                  <Check size={11} />
                  Aceptar
                </button>
                <button
                  type="button"
                  onClick={rejectResult}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface text-muted text-xs hover:text-foreground transition cursor-pointer"
                >
                  <X size={11} />
                  Descartar
                </button>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="px-3 py-2 space-y-1.5">
              <p className="text-xs text-red-400">{error}</p>
              <button
                type="button"
                onClick={rejectResult}
                className="text-xs text-muted hover:text-foreground transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Menu items — only show when not displaying a result */}
          {result === null && !loading && !error && (
            <>
              {/* Analysis group */}
              <div className="px-2 pt-1">
                {ANALYSIS_ITEMS.map(renderItem)}
              </div>

              {/* Divider */}
              <div className="my-1 border-t border-border/50" />

              {/* Text group */}
              <div className="px-2 pb-1">
                {TEXT_ITEMS.map(renderItem)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
