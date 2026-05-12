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
