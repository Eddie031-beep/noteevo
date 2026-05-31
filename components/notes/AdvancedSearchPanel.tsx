'use client'

import { useState, useEffect, useRef, type ReactNode, type ChangeEvent } from 'react'
import {
  Search, X, SlidersHorizontal, BookOpen, Star, Loader2, FileSearch, Tag as TagIcon,
} from 'lucide-react'
import { useNotebookStore } from '@/store/notebookStore'
import { useTagStore } from '@/store/tagStore'
import { useNoteStore } from '@/store/noteStore'
import { useUIStore } from '@/store/uiStore'
import { searchNotesAdvanced } from '@/lib/supabase/search'
import { getAllNotesWithNotebook } from '@/lib/supabase/notes'
import { extractTextPreview } from '@/lib/utils/tiptap'
import type { Note } from '@/types'

const DEBOUNCE_MS = 400
const SNIPPET_LENGTH = 400

function formatRelativeDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Builds a snippet centered on the first match and wraps matches in <mark>.
 *  Uses React nodes (not dangerouslySetInnerHTML) to stay XSS-safe. */
function renderSnippet(text: string, query: string): ReactNode {
  const trimmed = query.trim()
  if (!text) return 'Sin contenido'
  if (!trimmed) return text

  const lower = text.toLowerCase()
  const needle = trimmed.toLowerCase()
  const first = lower.indexOf(needle)

  let snippet = text
  let prefix = ''
  if (first > 70) {
    snippet = text.slice(first - 60)
    prefix = '…'
  }

  const snippetLower = snippet.toLowerCase()
  const nodes: ReactNode[] = []
  let cursor = 0
  let key = 0
  while (cursor < snippet.length) {
    const found = snippetLower.indexOf(needle, cursor)
    if (found === -1) {
      nodes.push(snippet.slice(cursor))
      break
    }
    if (found > cursor) nodes.push(snippet.slice(cursor, found))
    nodes.push(
      <mark key={key++} className="bg-accent/25 text-foreground rounded-sm px-0.5">
        {snippet.slice(found, found + trimmed.length)}
      </mark>,
    )
    cursor = found + trimmed.length
  }

  return (
    <>
      {prefix}
      {nodes}
    </>
  )
}

export default function AdvancedSearchPanel() {
  const { notebooks, setSelectedNotebook } = useNotebookStore()
  const { tags } = useTagStore()
  const { setSelectedNote } = useNoteStore()
  const { setCurrentView } = useUIStore()

  const [query, setQuery] = useState('')
  const [notebookId, setNotebookId] = useState('')
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [favoritesOnly, setFavoritesOnly] = useState(false)

  const [results, setResults] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const requestId = useRef(0)

  const hasActiveFilters =
    query.trim() !== '' ||
    notebookId !== '' ||
    selectedTagIds.length > 0 ||
    dateFrom !== '' ||
    dateTo !== '' ||
    favoritesOnly

  useEffect(() => {
    const handle = setTimeout(async () => {
      const reqId = ++requestId.current
      setLoading(true)
      setError(null)
      try {
        // Any active filter goes through the RPC so filters combine (AND),
        // including filters without a text query. The plain listing is only
        // used for the empty initial state.
        const data: Note[] = hasActiveFilters
          ? await searchNotesAdvanced({
              query,
              notebookId: notebookId || null,
              tagIds: selectedTagIds,
              dateFrom: dateFrom || null,
              dateTo: dateTo || null,
              isFavorite: favoritesOnly ? true : undefined,
            })
          : await getAllNotesWithNotebook()

        if (reqId === requestId.current) setResults(data)
      } catch {
        if (reqId === requestId.current) {
          setError('No se pudieron cargar los resultados. Inténtalo de nuevo.')
          setResults([])
        }
      } finally {
        if (reqId === requestId.current) setLoading(false)
      }
    }, DEBOUNCE_MS)

    return () => clearTimeout(handle)
  }, [query, notebookId, selectedTagIds, dateFrom, dateTo, favoritesOnly, hasActiveFilters])

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
    )
  }

  const clearFilters = () => {
    setQuery('')
    setNotebookId('')
    setSelectedTagIds([])
    setDateFrom('')
    setDateTo('')
    setFavoritesOnly(false)
  }

  const handleResultClick = (note: Note) => {
    setSelectedNote(note)
    const notebook = notebooks.find((nb) => nb.id === note.notebook_id)
    if (notebook) setSelectedNotebook(notebook)
    setCurrentView('notebooks')
  }

  const inputBase =
    'w-full px-3 py-2 rounded-lg bg-surface border border-border text-sm text-foreground outline-none focus:ring-1 focus:ring-accent/40 transition'
  const labelBase = 'block text-[11px] font-medium text-muted mb-1.5 uppercase tracking-wide'

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="max-w-3xl mx-auto px-8 py-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center shrink-0">
              <SlidersHorizontal size={18} className="text-accent" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Búsqueda avanzada</h1>
              <p className="text-xs text-muted">Combina filtros para encontrar notas</p>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-foreground hover:bg-surface transition cursor-pointer shrink-0"
            >
              <X size={13} />
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-panel border border-border rounded-2xl p-5 flex flex-col gap-4">
          {/* Text search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface border border-border focus-within:ring-1 focus-within:ring-accent/40 transition">
            <Search size={15} className="text-muted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
              placeholder="Buscar por texto..."
              className="flex-1 bg-transparent text-sm text-foreground outline-none min-w-0"
              style={{ color: 'var(--color-foreground)' }}
            />
            {query && (
              <button
                type="button"
                title="Limpiar texto"
                onClick={() => setQuery('')}
                className="text-muted hover:text-foreground transition cursor-pointer shrink-0"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Notebook + favorites */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[180px]">
              <label className={labelBase}>Libreta</label>
              <select
                value={notebookId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setNotebookId(e.target.value)}
                className={`${inputBase} cursor-pointer`}
              >
                <option value="">Todas las libretas</option>
                {notebooks.map((nb) => (
                  <option key={nb.id} value={nb.id}>
                    {nb.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <span className={labelBase}>Favoritos</span>
              <button
                type="button"
                onClick={() => setFavoritesOnly((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition cursor-pointer ${
                  favoritesOnly
                    ? 'bg-accent text-white border-accent'
                    : 'bg-surface text-muted border-border hover:text-foreground'
                }`}
              >
                <Star size={14} className={favoritesOnly ? 'fill-white' : ''} />
                Solo favoritos
              </button>
            </div>
          </div>

          {/* Date range */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[150px]">
              <label className={labelBase}>Desde</label>
              <input
                type="date"
                value={dateFrom}
                max={dateTo || undefined}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)}
                className={`${inputBase} cursor-pointer`}
              />
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className={labelBase}>Hasta</label>
              <input
                type="date"
                value={dateTo}
                min={dateFrom || undefined}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value)}
                className={`${inputBase} cursor-pointer`}
              />
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <span className={labelBase}>Etiquetas</span>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => {
                  const active = selectedTagIds.includes(tag.id)
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border transition cursor-pointer ${
                        active
                          ? 'bg-accent text-white border-accent'
                          : 'bg-surface text-muted border-border hover:text-foreground'
                      }`}
                    >
                      <TagIcon size={10} />
                      {tag.name}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted px-1">
            {loading
              ? 'Buscando…'
              : `${results.length} resultado${results.length !== 1 ? 's' : ''}`}
          </p>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={22} className="animate-spin text-muted" />
            </div>
          ) : !error && results.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-panel border border-border flex items-center justify-center">
                <FileSearch size={26} className="text-subtle" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">Sin resultados</p>
                <p className="text-muted text-xs mt-1">
                  Ajusta los filtros o prueba con otro término
                </p>
              </div>
            </div>
          ) : (
            results.map((note) => {
              const notebookName = notebooks.find((nb) => nb.id === note.notebook_id)?.name
              return (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => handleResultClick(note)}
                  className="w-full text-left bg-panel border border-border rounded-xl p-4 hover:border-accent/40 hover:bg-surface transition cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {note.title || 'Sin título'}
                    </p>
                    {note.is_favorite && (
                      <Star size={12} className="text-amber-400 fill-amber-400 shrink-0 mt-0.5" />
                    )}
                  </div>
                  <p className="text-xs text-muted mt-1 line-clamp-2 leading-relaxed">
                    {renderSnippet(extractTextPreview(note.content, SNIPPET_LENGTH), query)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    {notebookName && (
                      <span className="text-[10px] text-accent flex items-center gap-1">
                        <BookOpen size={9} />
                        {notebookName}
                      </span>
                    )}
                    <span className="text-[10px] text-subtle">
                      {formatRelativeDate(note.updated_at)}
                    </span>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
