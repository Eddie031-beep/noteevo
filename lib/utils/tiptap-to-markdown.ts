type TipTapNode = {
  type: string
  text?: string
  content?: TipTapNode[]
  attrs?: Record<string, unknown>
  marks?: { type: string }[]
}

export function tiptapToMarkdown(doc: Record<string, unknown>): string {
  if (!doc || !doc.content) return ''
  return convertNodes(doc.content as TipTapNode[]).trim()
}

function convertNodes(nodes: TipTapNode[], context = ''): string {
  return nodes.map((node) => convertNode(node, context)).join('')
}

function convertNode(node: TipTapNode, context = ''): string {
  switch (node.type) {
    case 'paragraph':
      return (node.content ? convertNodes(node.content) : '') + '\n\n'

    case 'text': {
      let text = node.text ?? ''
      const marks = node.marks ?? []
      if (marks.some((m) => m.type === 'bold')) text = `**${text}**`
      if (marks.some((m) => m.type === 'italic')) text = `*${text}*`
      if (marks.some((m) => m.type === 'underline')) text = `<u>${text}</u>`
      if (marks.some((m) => m.type === 'strike')) text = `~~${text}~~`
      if (marks.some((m) => m.type === 'code')) text = `\`${text}\``
      if (marks.some((m) => m.type === 'highlight')) text = `==${text}==`
      return text
    }

    case 'heading': {
      const level = (node.attrs?.level as number) ?? 1
      const prefix = '#'.repeat(level)
      return `${prefix} ${node.content ? convertNodes(node.content) : ''}\n\n`
    }

    case 'bulletList':
      return (node.content ? convertNodes(node.content, 'bullet') : '') + '\n'

    case 'orderedList':
      return (node.content ? convertNodes(node.content, 'ordered') : '') + '\n'

    case 'listItem': {
      const prefix = context === 'ordered' ? '1. ' : '- '
      return `${prefix}${node.content ? convertNodes(node.content).trim() : ''}\n`
    }

    case 'taskList':
      return (node.content ? convertNodes(node.content, 'task') : '') + '\n'

    case 'taskItem': {
      const checked = node.attrs?.checked ? '[x]' : '[ ]'
      return `- ${checked} ${node.content ? convertNodes(node.content).trim() : ''}\n`
    }

    case 'codeBlock': {
      const lang = (node.attrs?.language as string) ?? ''
      const code = node.content ? convertNodes(node.content) : ''
      return `\`\`\`${lang}\n${code}\n\`\`\`\n\n`
    }

    case 'blockquote':
      return (node.content
        ? convertNodes(node.content)
            .split('\n')
            .map((l) => (l ? `> ${l}` : ''))
            .join('\n')
        : '') + '\n\n'

    case 'horizontalRule':
      return '---\n\n'

    case 'hardBreak':
      return '\n'

    case 'image':
      return `![${node.attrs?.alt ?? ''}](${node.attrs?.src ?? ''})\n\n`

    default:
      return node.content ? convertNodes(node.content) : ''
  }
}
