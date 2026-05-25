'use client'

import { useRef, useState, useEffect } from 'react'
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react'
import type { NodeViewProps } from '@tiptap/react'
import type { LucideIcon } from 'lucide-react'
import {
  Info, AlertTriangle, CheckCircle, XCircle, Lightbulb, ChevronDown,
} from 'lucide-react'

type CalloutType = 'info' | 'warning' | 'success' | 'error' | 'tip'

interface CalloutConfig {
  icon: LucideIcon
  label: string
  outer: string
  sep: string
  color: string
}

const CONFIGS: Record<CalloutType, CalloutConfig> = {
  info: {
    icon: Info,
    label: 'Info',
    outer: 'bg-blue-500/10 border-blue-500/30',
    sep: 'border-blue-500/20',
    color: 'text-blue-400',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Advertencia',
    outer: 'bg-yellow-500/10 border-yellow-500/30',
    sep: 'border-yellow-500/20',
    color: 'text-yellow-400',
  },
  success: {
    icon: CheckCircle,
    label: 'Éxito',
    outer: 'bg-green-500/10 border-green-500/30',
    sep: 'border-green-500/20',
    color: 'text-green-400',
  },
  error: {
    icon: XCircle,
    label: 'Error',
    outer: 'bg-red-500/10 border-red-500/30',
    sep: 'border-red-500/20',
    color: 'text-red-400',
  },
  tip: {
    icon: Lightbulb,
    label: 'Tip',
    outer: 'bg-accent/10 border-accent/30',
    sep: 'border-accent/20',
    color: 'text-accent',
  },
}

export default function CalloutComponent({
  node,
  updateAttributes,
  selected,
}: NodeViewProps) {
  const rawType = node.attrs.type as string
  const type: CalloutType = rawType in CONFIGS ? (rawType as CalloutType) : 'info'
  const cfg = CONFIGS[type]
  const Icon = cfg.icon

  const [pickerOpen, setPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false)
      }
    }
    if (pickerOpen) document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [pickerOpen])

  return (
    <NodeViewWrapper>
      <div
        className={`my-3 rounded-xl border overflow-hidden ${cfg.outer} ${
          selected ? 'ring-1 ring-accent/30' : ''
        }`}
      >
        {/* Header */}
        <div className={`flex items-center gap-2 px-3 py-2 border-b ${cfg.sep}`}>
          <div className="relative" ref={pickerRef}>
            <button
              type="button"
              title="Cambiar tipo de callout"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setPickerOpen(!pickerOpen)}
              className={`flex items-center gap-1 ${cfg.color} hover:opacity-70 transition cursor-pointer`}
            >
              <Icon size={14} />
              <ChevronDown size={10} />
            </button>

            {pickerOpen && (
              <div className="absolute left-0 top-7 z-40 bg-panel border border-border rounded-xl shadow-2xl py-1 w-36 overflow-hidden">
                {(Object.keys(CONFIGS) as CalloutType[]).map((k) => {
                  const c = CONFIGS[k]
                  const ItemIcon = c.icon
                  return (
                    <button
                      key={k}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        updateAttributes({ type: k })
                        setPickerOpen(false)
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-surface transition cursor-pointer ${
                        k === type ? 'bg-surface' : ''
                      }`}
                    >
                      <span className={c.color}>
                        <ItemIcon size={13} />
                      </span>
                      <span className="text-foreground">{c.label}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <span className={`text-xs font-semibold ${cfg.color} uppercase tracking-wider`}>
            {cfg.label}
          </span>
        </div>

        {/* Editable content */}
        <NodeViewContent className="px-4 py-3 min-h-[2rem]" />
      </div>
    </NodeViewWrapper>
  )
}
