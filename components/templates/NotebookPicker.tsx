'use client'

import { useState } from 'react'
import { BookOpen, ChevronDown, Check } from 'lucide-react'
import type { Notebook } from '@/types'

interface NotebookPickerProps {
  notebooks: Notebook[]
  selected: Notebook | null
  onSelect: (nb: Notebook) => void
  /** Abre el menú hacia arriba cuando el picker está al fondo de un panel. */
  dropUp?: boolean
}

export default function NotebookPicker({
  notebooks, selected, onSelect, dropUp = false,
}: NotebookPickerProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 bg-surface border border-border rounded-lg text-sm transition hover:border-accent/40 cursor-pointer"
      >
        <span className="flex items-center gap-2 min-w-0">
          <BookOpen size={14} className="text-muted shrink-0" />
          <span className={`truncate ${selected ? 'text-foreground' : 'text-subtle'}`}>
            {selected ? selected.name : 'Selecciona una libreta…'}
          </span>
        </span>
        <ChevronDown size={14} className={`text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className={`absolute left-0 right-0 bg-panel border border-border rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto ${
          dropUp ? 'bottom-full mb-1' : 'top-full mt-1'
        }`}>
          {notebooks.length === 0 ? (
            <p className="px-3 py-3 text-xs text-muted text-center">Sin libretas disponibles</p>
          ) : (
            notebooks.map((nb) => (
              <button
                key={nb.id}
                type="button"
                onClick={() => { onSelect(nb); setOpen(false) }}
                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-sm text-left hover:bg-surface transition cursor-pointer"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <BookOpen size={13} className="text-muted shrink-0" />
                  <span className="text-foreground truncate">{nb.name}</span>
                </span>
                {selected?.id === nb.id && <Check size={13} className="text-accent shrink-0" />}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
