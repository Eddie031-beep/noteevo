'use client'

import type { ReactNode } from 'react'

export type EmptyStateVariant =
  | 'notes'
  | 'tasks'
  | 'files'
  | 'calendar'
  | 'templates'
  | 'trash'
  | 'search'

interface EmptyStateAction {
  label: string
  onClick: () => void
}

interface EmptyStateProps {
  variant: EmptyStateVariant
  title: string
  description?: string
  action?: EmptyStateAction
}

// Cada ilustración: viewBox 0 0 80 80, trazo currentColor (color muted del
// contenedor) + UN detalle envuelto en text-accent. Sin librerías de iconos.
const ILLUSTRATIONS: Record<EmptyStateVariant, ReactNode> = {
  notes: (
    <>
      {/* 3 hojas apiladas con offset */}
      <rect x="28" y="14" width="34" height="44" rx="4" opacity="0.45" />
      <rect x="22" y="18" width="34" height="44" rx="4" opacity="0.7" />
      <rect x="16" y="22" width="34" height="44" rx="4" />
      {/* líneas de "texto" en la hoja frontal */}
      <line x1="23" y1="36" x2="43" y2="36" />
      <line x1="23" y1="44" x2="43" y2="44" />
      <line x1="23" y1="52" x2="36" y2="52" />
      {/* detalle accent */}
      <circle className="text-accent" cx="24" cy="29" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  tasks: (
    <>
      {/* checkbox superior con check accent */}
      <rect x="16" y="22" width="15" height="15" rx="3.5" />
      <path className="text-accent" d="M20 29.5 L23 32.5 L28 25.5" strokeWidth="2" />
      <line x1="38" y1="29.5" x2="62" y2="29.5" />
      {/* checkbox inferior vacío */}
      <rect x="16" y="44" width="15" height="15" rx="3.5" />
      <line x1="38" y1="51.5" x2="56" y2="51.5" />
    </>
  ),
  files: (
    <>
      {/* documento asomando por detrás */}
      <rect x="42" y="16" width="22" height="22" rx="2.5" opacity="0.55" />
      <path className="text-accent" d="M58 16 L64 16 L64 22" strokeWidth="1.5" />
      {/* carpeta abierta */}
      <path d="M14 30 H30 L35 36 H64 V60 a2 2 0 0 1 -2 2 H16 a2 2 0 0 1 -2 -2 Z" />
    </>
  ),
  calendar: (
    <>
      {/* cuerpo del calendario */}
      <rect x="16" y="18" width="48" height="46" rx="4" />
      {/* anillas */}
      <line x1="28" y1="13" x2="28" y2="23" />
      <line x1="52" y1="13" x2="52" y2="23" />
      {/* cabecera */}
      <line x1="16" y1="30" x2="64" y2="30" />
      {/* cuadrícula 3x3 */}
      <rect x="24" y="38" width="6" height="5" rx="1" />
      <rect x="37" y="38" width="6" height="5" rx="1" />
      <rect x="50" y="38" width="6" height="5" rx="1" />
      <rect x="24" y="50" width="6" height="5" rx="1" />
      <rect className="text-accent" x="37" y="50" width="6" height="5" rx="1" fill="currentColor" stroke="none" />
      <rect x="50" y="50" width="6" height="5" rx="1" />
    </>
  ),
  templates: (
    <>
      {/* lienzo con líneas internas */}
      <rect x="18" y="14" width="44" height="52" rx="4" />
      <line x1="26" y1="26" x2="46" y2="26" />
      <line x1="26" y1="35" x2="54" y2="35" />
      <line x1="26" y1="43" x2="54" y2="43" />
      <line x1="26" y1="51" x2="40" y2="51" />
      {/* "+" accent en la esquina */}
      <g className="text-accent" strokeWidth="2">
        <line x1="57" y1="56" x2="57" y2="64" />
        <line x1="53" y1="60" x2="61" y2="60" />
      </g>
    </>
  ),
  trash: (
    <>
      {/* tapa levantada */}
      <line x1="20" y1="26" x2="60" y2="26" />
      <path className="text-accent" d="M34 26 V22 a2 2 0 0 1 2 -2 h8 a2 2 0 0 1 2 2 v4" />
      {/* cubo */}
      <path d="M26 30 L29 62 a2 2 0 0 0 2 2 h18 a2 2 0 0 0 2 -2 L54 30" />
      {/* líneas verticales */}
      <line x1="36" y1="37" x2="37" y2="57" />
      <line x1="44" y1="37" x2="43" y2="57" />
    </>
  ),
  search: (
    <>
      {/* lupa */}
      <circle cx="35" cy="33" r="16" />
      <line x1="47" y1="45" x2="60" y2="58" />
      {/* línea ondulada accent debajo */}
      <path className="text-accent" d="M18 66 q4 -5 8 0 t8 0 t8 0 t8 0" />
    </>
  ),
}

export default function EmptyState({ variant, title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state-enter flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
      <svg
        viewBox="0 0 80 80"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-20 h-20 text-subtle"
        aria-hidden="true"
      >
        {ILLUSTRATIONS[variant]}
      </svg>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-base font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-sm text-muted max-w-sm leading-relaxed">{description}</p>
        )}
      </div>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="mt-2 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition cursor-pointer active:scale-95"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
