'use client'

import { useState } from 'react'
import { X, FileText, FileDown, Loader2 } from 'lucide-react'
import { tiptapToMarkdown } from '@/lib/utils/tiptap-to-markdown'

interface ExportModalProps {
  title: string
  content: Record<string, unknown>
  onClose: () => void
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50) || 'nota'
}

export default function ExportModal({ title, content, onClose }: ExportModalProps) {
  const [exporting, setExporting] = useState<'pdf' | 'md' | null>(null)

  const handleMarkdown = () => {
    setExporting('md')
    try {
      const markdown = `# ${title}\n\n${tiptapToMarkdown(content)}`
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${slugify(title)}.md`
      a.click()
      URL.revokeObjectURL(url)
      onClose()
    } finally {
      setExporting(null)
    }
  }

  const handlePdf = () => {
    setExporting('pdf')

    const markdown = tiptapToMarkdown(content)
    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            font-size: 14px;
            line-height: 1.75;
            color: #1a1a1a;
            max-width: 720px;
            margin: 0 auto;
            padding: 48px 32px;
          }
          h1 { font-size: 2rem; font-weight: 700; margin-bottom: 24px; color: #0f0f0f; }
          h2 { font-size: 1.4rem; font-weight: 600; margin: 24px 0 12px; }
          h3 { font-size: 1.15rem; font-weight: 600; margin: 20px 0 8px; }
          p { margin: 0 0 12px; }
          ul, ol { padding-left: 24px; margin: 0 0 12px; }
          li { margin: 4px 0; }
          code {
            background: #f0f0f0;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.85em;
            font-family: 'Courier New', monospace;
          }
          pre {
            background: #f5f5f5;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 16px;
            overflow-x: auto;
            margin: 16px 0;
          }
          pre code { background: none; padding: 0; }
          blockquote {
            border-left: 3px solid #ccc;
            padding-left: 16px;
            color: #666;
            margin: 16px 0;
          }
          hr { border: none; border-top: 1px solid #e0e0e0; margin: 24px 0; }
          img { max-width: 100%; border-radius: 8px; margin: 12px 0; }
          @media print {
            body { padding: 0; }
            @page { margin: 2cm; }
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <div id="content"></div>
        <script>
          const md = ${JSON.stringify(markdown)};
          const lines = md.split('\\n');
          let html = '';
          for (const line of lines) {
            if (line.startsWith('## ')) html += '<h2>' + line.slice(3) + '</h2>';
            else if (line.startsWith('### ')) html += '<h3>' + line.slice(4) + '</h3>';
            else if (line.startsWith('# ')) html += '<h2>' + line.slice(2) + '</h2>';
            else if (line.startsWith('- [ ] ')) html += '<p>☐ ' + line.slice(6) + '</p>';
            else if (line.startsWith('- [x] ')) html += '<p>☑ ' + line.slice(6) + '</p>';
            else if (line.startsWith('- ')) html += '<li>' + line.slice(2) + '</li>';
            else if (line.startsWith('> ')) html += '<blockquote>' + line.slice(2) + '</blockquote>';
            else if (line === '---') html += '<hr>';
            else if (line.trim()) html += '<p>' + line + '</p>';
          }
          document.getElementById('content').innerHTML = html;
          window.onload = () => { window.print(); window.close(); }
        </script>
      </body>
      </html>
    `

    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (printWindow) {
      printWindow.document.write(html)
      printWindow.document.close()
    }

    setExporting(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground text-sm">Exportar nota</h2>
            <p className="text-xs text-muted mt-0.5 truncate max-w-[220px]">{title}</p>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={onClose}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>

        {/* Opciones */}
        <div className="p-4 flex flex-col gap-3">
          {/* Markdown */}
          <button
            type="button"
            onClick={handleMarkdown}
            disabled={exporting !== null}
            className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-accent/40 hover:bg-elevated transition cursor-pointer text-left disabled:opacity-50"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
              <FileText size={20} className="text-accent" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">Markdown</p>
              <p className="text-xs text-muted mt-0.5">Archivo .md compatible con cualquier editor</p>
            </div>
            {exporting === 'md' && <Loader2 size={16} className="text-muted animate-spin ml-auto shrink-0" />}
          </button>

          {/* PDF */}
          <button
            type="button"
            onClick={handlePdf}
            disabled={exporting !== null}
            className="flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-accent/40 hover:bg-elevated transition cursor-pointer text-left disabled:opacity-50"
          >
            <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center shrink-0">
              <FileDown size={20} className="text-red-400" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">PDF</p>
              <p className="text-xs text-muted mt-0.5">Abre el diálogo de impresión del navegador</p>
            </div>
            {exporting === 'pdf' && <Loader2 size={16} className="text-muted animate-spin ml-auto shrink-0" />}
          </button>
        </div>
      </div>
    </div>
  )
}
