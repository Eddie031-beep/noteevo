'use client'

import { useRef, useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'
import type { Theme } from '@/store/uiStore'

const STORAGE_KEY = 'noteevo-theme'

function resolveTheme(theme: Theme): 'dark' | 'light' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

export function ThemeApplier() {
  const { theme, setTheme } = useUIStore()
  const initialized = useRef(false)

  useEffect(() => {
    let activeTheme = theme

    // On first mount, read localStorage before applying anything — avoids
    // overriding the inline-script's correct value with the store's 'dark' default.
    if (!initialized.current) {
      initialized.current = true
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored && ['dark', 'light', 'system'].includes(stored)) {
        activeTheme = stored
        if (stored !== theme) setTheme(stored)
      }
    }

    const resolved = resolveTheme(activeTheme)
    document.documentElement.setAttribute('data-theme', resolved)
    localStorage.setItem(STORAGE_KEY, activeTheme)

    if (activeTheme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e: MediaQueryListEvent) => {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      }
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    }
  }, [theme, setTheme])

  return null
}
