// ─── Markdown → TipTap JSON ─────────────────────────────────────────────────

type TNode = Record<string, unknown>
type TMark = { type: string; attrs?: Record<string, unknown> }

// marked Token shape (minimal duck-type)
interface MToken {
  type: string
  text?: string
  depth?: number
  ordered?: boolean
  lang?: string
  href?: string
  tokens?: MToken[]
  items?: MToken[]
  task?: boolean
  checked?: boolean
}

function inlineToTipTap(tokens: MToken[], marks: TMark[] = []): TNode[] {
  const out: TNode[] = []
  for (const t of tokens) {
    switch (t.type) {
      case 'text':
      case 'escape': {
        if (t.tokens?.length) { out.push(...inlineToTipTap(t.tokens, marks)); break }
        if (!t.text) break
        const n: TNode = { type: 'text', text: t.text }
        if (marks.length) n.marks = marks
        out.push(n)
        break
      }
      case 'strong':
        out.push(...inlineToTipTap(t.tokens ?? [], [...marks, { type: 'bold' }]))
        break
      case 'em':
        out.push(...inlineToTipTap(t.tokens ?? [], [...marks, { type: 'italic' }]))
        break
      case 'del':
        out.push(...inlineToTipTap(t.tokens ?? [], [...marks, { type: 'strike' }]))
        break
      case 'codespan':
        out.push({ type: 'text', text: t.text ?? '', marks: [...marks, { type: 'code' }] })
        break
      case 'link':
        out.push(...inlineToTipTap(t.tokens ?? [], [...marks, { type: 'link', attrs: { href: t.href ?? '', target: '_blank' } }]))
        break
      case 'br':
        out.push({ type: 'hardBreak' })
        break
      default:
        if (t.text) out.push({ type: 'text', text: t.text, marks: marks.length ? marks : undefined })
    }
  }
  return out
}

function listItemContent(item: MToken): TNode[] {
  const first = item.tokens?.[0]
  if (!first) return []
  const inlineSrc =
    first.type === 'text' ? (first.tokens ?? []) :
    first.type === 'paragraph' ? (first.tokens ?? []) : []
  return inlineToTipTap(inlineSrc)
}

function blockToTipTap(t: MToken): TNode[] {
  switch (t.type) {
    case 'heading':
      return [{ type: 'heading', attrs: { level: t.depth ?? 1 }, content: inlineToTipTap(t.tokens ?? []) }]
    case 'paragraph':
      return [{ type: 'paragraph', content: inlineToTipTap(t.tokens ?? []) }]
    case 'list': {
      const listType = t.ordered ? 'orderedList' : 'bulletList'
      return [{
        type: listType,
        content: (t.items ?? []).map((item) =>
          item.task
            ? { type: 'taskItem', attrs: { checked: item.checked ?? false }, content: [{ type: 'paragraph', content: listItemContent(item) }] }
            : { type: 'listItem', content: [{ type: 'paragraph', content: listItemContent(item) }] }
        )
      }]
    }
    case 'code':
      return [{ type: 'codeBlock', attrs: { language: t.lang ?? null }, content: [{ type: 'text', text: t.text ?? '' }] }]
    case 'blockquote':
      return [{ type: 'blockquote', content: (t.tokens ?? []).flatMap(blockToTipTap) }]
    case 'hr':
      return [{ type: 'horizontalRule' }]
    case 'space':
      return []
    default:
      return t.text ? [{ type: 'paragraph', content: [{ type: 'text', text: t.text }] }] : []
  }
}

export function markdownToTipTap(markdown: string): Record<string, unknown> {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { Lexer } = require('marked') as { Lexer: { lex: (src: string) => MToken[] } }
  const tokens = Lexer.lex(markdown)
  const content = tokens.flatMap(blockToTipTap)
  return { type: 'doc', content: content.length ? content : [{ type: 'paragraph', content: [] }] }
}

// ─── HTML → TipTap JSON (ENML server-side, no DOMParser) ─────────────────────

interface HtmlNode {
  tag: string
  attrs: Record<string, string>
  children: (HtmlNode | string)[]
}

function parseAttrs(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const re = /([a-zA-Z][a-zA-Z0-9_:-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|(\S+)))?/g
  let m: RegExpExecArray | null
  while ((m = re.exec(raw)) !== null) {
    if (m[1]) attrs[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? ''
  }
  return attrs
}

function parseHtmlToTree(html: string): HtmlNode {
  const VOID = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'area', 'base', 'col'])
  const root: HtmlNode = { tag: '#root', attrs: {}, children: [] }
  const stack: HtmlNode[] = [root]
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?(\/?)>|([^<]+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(html)) !== null) {
    const cur = stack[stack.length - 1]
    if (m[5] !== undefined) {
      const text = m[5].replace(/\s+/g, ' ')
      if (text) cur.children.push(text)
    } else if (m[1] === '/') {
      if (stack.length > 1) stack.pop()
    } else {
      const tag = m[2].toLowerCase()
      const node: HtmlNode = { tag, attrs: parseAttrs(m[3] ?? ''), children: [] }
      cur.children.push(node)
      if (!VOID.has(tag) && m[4] !== '/') stack.push(node)
    }
  }
  return root
}

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
}

const INLINE_MARK_TAGS: Record<string, string> = {
  b: 'bold', strong: 'bold', i: 'italic', em: 'italic',
  u: 'underline', s: 'strike', strike: 'strike', del: 'strike', code: 'code',
}
const HTML_BLOCK_TAGS = new Set([
  'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'pre', 'blockquote', 'en-note', '#root',
])

function nodeToInline(node: HtmlNode | string, marks: TMark[] = []): TNode[] {
  if (typeof node === 'string') {
    const text = decodeHtmlEntities(node)
    if (!text) return []
    const n: TNode = { type: 'text', text }
    if (marks.length) n.marks = marks
    return [n]
  }
  const tag = node.tag
  if (INLINE_MARK_TAGS[tag]) return node.children.flatMap((c) => nodeToInline(c, [...marks, { type: INLINE_MARK_TAGS[tag] }]))
  if (tag === 'a') return node.children.flatMap((c) => nodeToInline(c, [...marks, { type: 'link', attrs: { href: node.attrs['href'] ?? '', target: '_blank' } }]))
  if (tag === 'br') return [{ type: 'hardBreak' }]
  return node.children.flatMap((c) => nodeToInline(c, marks))
}

function processBlockChildren(children: (HtmlNode | string)[]): TNode[] {
  const result: TNode[] = []
  let buf: TNode[] = []
  const flush = () => { if (buf.length) { result.push({ type: 'paragraph', content: buf }); buf = [] } }
  for (const child of children) {
    if (typeof child === 'string') {
      const text = decodeHtmlEntities(child.replace(/\s+/g, ' '))
      if (text.trim()) buf.push({ type: 'text', text })
    } else if (HTML_BLOCK_TAGS.has(child.tag)) {
      flush(); result.push(...htmlNodeToNodes(child))
    } else {
      buf.push(...nodeToInline(child))
    }
  }
  flush()
  return result
}

function extractLiInline(li: HtmlNode): TNode[] {
  const divChild = li.children.find((c): c is HtmlNode => typeof c !== 'string' && c.tag === 'div')
  const src = divChild ? divChild.children : li.children
  return src.flatMap((c) => nodeToInline(c))
}

function htmlNodeToNodes(node: HtmlNode): TNode[] {
  const tag = node.tag
  if (/^h[1-6]$/.test(tag)) {
    return [{ type: 'heading', attrs: { level: parseInt(tag[1]) }, content: node.children.flatMap((c) => nodeToInline(c)) }]
  }
  if (tag === 'pre') {
    const codeChild = node.children.find((c): c is HtmlNode => typeof c !== 'string' && c.tag === 'code')
    const src = codeChild ? codeChild.children : node.children
    const raw = src.map((c) => typeof c === 'string' ? c : '').join('')
    return [{ type: 'codeBlock', attrs: { language: null }, content: [{ type: 'text', text: decodeHtmlEntities(raw) }] }]
  }
  if (tag === 'blockquote') {
    const inner = processBlockChildren(node.children)
    return [{ type: 'blockquote', content: inner.length ? inner : [{ type: 'paragraph', content: [] }] }]
  }
  if (tag === 'ul') {
    const items = node.children.filter((c): c is HtmlNode => typeof c !== 'string' && c.tag === 'li')
    return items.length ? [{ type: 'bulletList', content: items.map((li) => ({ type: 'listItem', content: [{ type: 'paragraph', content: extractLiInline(li) }] })) }] : []
  }
  if (tag === 'ol') {
    const items = node.children.filter((c): c is HtmlNode => typeof c !== 'string' && c.tag === 'li')
    return items.length ? [{ type: 'orderedList', content: items.map((li) => ({ type: 'listItem', content: [{ type: 'paragraph', content: extractLiInline(li) }] })) }] : []
  }
  if (['div', 'p', 'en-note', '#root', 'span'].includes(tag)) {
    const hasBlock = node.children.some((c) => typeof c !== 'string' && HTML_BLOCK_TAGS.has(c.tag))
    if (hasBlock) return processBlockChildren(node.children)
    const inline = node.children.flatMap((c) => nodeToInline(c))
    return [{ type: 'paragraph', content: inline }]
  }
  return node.children.flatMap((c) => nodeToInline(c))
}

export function htmlToTipTap(html: string): Record<string, unknown> {
  const clean = html.replace(/<!DOCTYPE[^>]*>/gi, '').replace(/<\?xml[^>]*\?>/g, '').trim()
  const tree = parseHtmlToTree(clean)
  const content = htmlNodeToNodes(tree)
  return { type: 'doc', content: content.length ? content : [{ type: 'paragraph', content: [] }] }
}

// ─── Text preview (existing) ─────────────────────────────────────────────────

export function extractTextPreview(
  content: Record<string, unknown>,
  maxLength = 120
): string {
  if (!content || Object.keys(content).length === 0) return ''

  const extractText = (node: unknown): string => {
    if (!node || typeof node !== 'object') return ''
    const n = node as Record<string, unknown>
    if (n.type === 'text') return String(n.text || '')
    if (Array.isArray(n.content)) {
      return n.content.map(extractText).join(' ')
    }
    return ''
  }

  const text = extractText(content).replace(/\s+/g, ' ').trim()
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}
