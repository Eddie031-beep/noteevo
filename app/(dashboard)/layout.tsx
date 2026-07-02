'use client'

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { useState } from 'react'
import { Toaster } from 'sonner'
import { MotionConfig } from 'motion/react'
import Sidebar from '@/components/sidebar/Sidebar'
import KeyboardShortcutsCheatsheet from '@/components/KeyboardShortcutsCheatsheet'
import OnboardingModal from '@/components/onboarding/OnboardingModal'
import CommandPalette from '@/components/command/CommandPalette'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useUIStore } from '@/store/uiStore'
import { useNoteStore } from '@/store/noteStore'
import { updateNote } from '@/lib/supabase/notes'

function DashboardInner({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts()
  const { isFocusMode } = useUIStore()
  const { notes, deleteNote } = useNoteStore()
  const [activeDragTitle, setActiveDragTitle] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current
    if (data?.type === 'note') {
      const note = notes.find((n) => n.id === data.noteId)
      setActiveDragTitle(note?.title ?? 'Nota')
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveDragTitle(null)
    const { active, over } = event
    if (!over) return

    const activeData = active.data.current
    const overData = over.data.current

    if (activeData?.type !== 'note' || overData?.type !== 'notebook') return
    if (activeData.currentNotebookId === overData.notebookId) return

    try {
      await updateNote(activeData.noteId, { notebook_id: overData.notebookId })
      deleteNote(activeData.noteId)
    } catch {
      // error silencioso
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* MotionConfig: todas las animaciones de Motion respetan reduced-motion
          del SO sin código extra por componente (DESIGN.md §5.4). */}
      <MotionConfig reducedMotion="user">
        <div className="flex h-screen bg-background">
          {!isFocusMode && <Sidebar />}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
          <KeyboardShortcutsCheatsheet />
          <OnboardingModal />
          <CommandPalette />
          {/* Único Toaster de la app: todos los mensajes pasan por toast.*() */}
          <Toaster position="bottom-right" richColors closeButton toastOptions={{ duration: 4000 }} />
        </div>
      </MotionConfig>

      <DragOverlay>
        {activeDragTitle ? (
          <div className="px-3 py-2 bg-panel border border-accent/40 rounded-lg shadow-xl text-sm text-foreground font-medium max-w-[240px] truncate opacity-90">
            {activeDragTitle}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardInner>{children}</DashboardInner>
}
