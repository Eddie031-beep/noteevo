import { describe, it, expect } from 'vitest'
import { extractTextPreview } from '@/lib/utils/tiptap'

describe('extractTextPreview', () => {
  it('returns empty string for empty content object', () => {
    expect(extractTextPreview({})).toBe('')
  })

  it('extracts text from a simple paragraph node', () => {
    const doc = {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Hola mundo' }] },
      ],
    }
    expect(extractTextPreview(doc)).toBe('Hola mundo')
  })

  it('joins text from nested and sibling nodes', () => {
    const doc = {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'Primero' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Segundo' }] },
      ],
    }
    expect(extractTextPreview(doc)).toBe('Primero Segundo')
  })

  it('collapses redundant whitespace and trims', () => {
    const doc = {
      type: 'doc',
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: '   espacios   ' }] },
      ],
    }
    expect(extractTextPreview(doc)).toBe('espacios')
  })

  it('truncates with ellipsis when longer than maxLength', () => {
    const longText = 'a'.repeat(200)
    const doc = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: longText }] }],
    }
    const result = extractTextPreview(doc, 50)
    expect(result).toHaveLength(53) // 50 chars + '...'
    expect(result.endsWith('...')).toBe(true)
  })

  it('does not truncate when within maxLength', () => {
    const doc = {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: 'corto' }] }],
    }
    expect(extractTextPreview(doc, 50)).toBe('corto')
  })

  it('returns empty string when nodes have no text', () => {
    const doc = {
      type: 'doc',
      content: [{ type: 'horizontalRule' }, { type: 'image' }],
    }
    expect(extractTextPreview(doc)).toBe('')
  })
})
