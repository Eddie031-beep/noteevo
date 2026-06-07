'use client'

import { useEffect } from 'react'
import { useUIStore } from '@/store/uiStore'
import { useNotebookStore } from '@/store/notebookStore'
import { useNoteStore } from '@/store/noteStore'
import { createNote } from '@/lib/supabase/notes'

export function useKeyboardShortcuts() {
  const { setCurrentView, setCheatsheetOpen, setFocusMode, isFocusMode, toggleSidebarCollapsed, toggleTypewriterMode } = useUIStore()
  const { selectedNotebook } = useNotebookStore()
  const { addNote, setSelectedNote } = useNoteStore()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isEditable =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'

      // Escape — siempre
      if (e.key === 'Escape') {
        setCheatsheetOpen(false)
        return
      }

      // Ctrl+K — buscar (Chrome no lo reserva)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        if (!isEditable) {
          setCurrentView('search')
          setTimeout(() => {
            const input = document.querySelector<HTMLInputElement>(
              'input[placeholder="Buscar notas..."]'
            )
            input?.focus()
          }, 50)
        }
        return
      }

      // Ctrl+Shift+E — nueva nota
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'E') {
        e.preventDefault()
        if (!isEditable) {
          if (!selectedNotebook) {
            setCurrentView('notebooks')
            return
          }
          createNote(selectedNotebook.id)
            .then((note) => {
              addNote(note)
              setSelectedNote(note)
              setCurrentView('notebooks')
            })
            .catch(() => {})
        }
        return
      }

      // Ctrl+Shift+, — settings
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === '<') {
        e.preventDefault()
        if (!isEditable) setCurrentView('settings')
        return
      }

      // Ctrl+Shift+F — focus mode
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault()
        if (!isEditable) setFocusMode(!isFocusMode)
        return
      }

      // Ctrl+\ — colapsar/expandir sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === '\\') {
        e.preventDefault()
        toggleSidebarCollapsed()
        return
      }

      // Ctrl+Shift+T — modo máquina de escribir (funciona también dentro del editor)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault()
        toggleTypewriterMode()
        return
      }

      // ? — cheatsheet
      if (e.key === '?' && !isEditable) {
        e.preventDefault()
        setCheatsheetOpen(true)
        return
      }
    }

    window.addEventListener('keydown', handler, true)
    return () => window.removeEventListener('keydown', handler, true)
  }, [selectedNotebook, setCurrentView, setCheatsheetOpen, setFocusMode, isFocusMode, addNote, setSelectedNote, toggleSidebarCollapsed, toggleTypewriterMode])
}
