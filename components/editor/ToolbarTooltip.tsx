'use client'

import { useEffect, useRef, useState } from 'react'

interface ToolbarTooltipProps {
  label: string
  shortcut?: string
  children: React.ReactNode
}

/**
 * Tooltip ligero CSS-puro para botones de toolbar. No depende de Radix.
 * Muestra el label tras un delay de 400ms; opcionalmente un atajo en <kbd>.
 */
export default function ToolbarTooltip({ label, shortcut, children }: ToolbarTooltipProps) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const handleEnter = () => {
    clear()
    timerRef.current = setTimeout(() => setVisible(true), 400)
  }

  const handleLeave = () => {
    clear()
    setVisible(false)
  }

  useEffect(() => clear, [])

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onMouseDown={handleLeave}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+6px)] z-50 flex items-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-elevated px-2 py-1 text-xs text-foreground shadow-xl"
        >
          {label}
          {shortcut && (
            <kbd className="rounded border border-border bg-surface px-1 py-0.5 text-[10px] font-mono text-muted">
              {shortcut}
            </kbd>
          )}
        </span>
      )}
    </span>
  )
}
