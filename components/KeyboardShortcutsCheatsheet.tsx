'use client'

import { useUIStore } from '@/store/uiStore'
import { X } from 'lucide-react'

interface Shortcut {
  keys: string[]
  description: string
}

const SHORTCUTS: { category: string; items: Shortcut[] }[] = [
  {
    category: 'Navegación',
    items: [
      { keys: ['Ctrl', 'Shift', 'E'], description: 'Nueva nota' },
      { keys: ['Ctrl', 'K'], description: 'Buscar notas' },
      { keys: ['Ctrl', 'Shift', 'F'], description: 'Modo enfoque' },
      { keys: ['?'], description: 'Mostrar atajos' },
      { keys: ['Esc'], description: 'Cerrar panel / modal' },
    ],
  },
  {
    category: 'Editor',
    items: [
      { keys: ['Ctrl', 'B'], description: 'Negrita' },
      { keys: ['Ctrl', 'I'], description: 'Cursiva' },
      { keys: ['Ctrl', 'U'], description: 'Subrayado' },
      { keys: ['Ctrl', 'Z'], description: 'Deshacer' },
      { keys: ['Ctrl', 'Shift', 'Z'], description: 'Rehacer' },
    ],
  },
]

function Key({ label }: { label: string }) {
  return (
    <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-muted bg-elevated border border-border rounded-md">
      {label}
    </kbd>
  )
}

export default function KeyboardShortcutsCheatsheet() {
  const { isCheatsheetOpen, setCheatsheetOpen } = useUIStore()

  if (!isCheatsheetOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={() => setCheatsheetOpen(false)}
    >
      <div
        className="bg-panel border border-border rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="font-semibold text-foreground">Atajos de teclado</h2>
            <p className="text-xs text-muted mt-0.5">Pulsa <Key label="?" /> en cualquier momento para ver esto</p>
          </div>
          <button
            type="button"
            title="Cerrar"
            onClick={() => setCheatsheetOpen(false)}
            className="p-1.5 text-muted hover:text-foreground transition rounded-lg hover:bg-surface cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Grid de atajos */}
        <div className="grid grid-cols-2 divide-x divide-border">
          {SHORTCUTS.map((section) => (
            <div key={section.category} className="px-6 py-5">
              <p className="text-[10px] font-semibold text-subtle uppercase tracking-wider mb-3">
                {section.category}
              </p>
              <div className="space-y-2.5">
                {section.items.map((shortcut) => (
                  <div
                    key={shortcut.description}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-xs text-muted">{shortcut.description}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      {shortcut.keys.map((key, i) => (
                        <Key key={i} label={key} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
