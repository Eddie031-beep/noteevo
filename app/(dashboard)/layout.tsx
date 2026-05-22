'use client'

import Sidebar from '@/components/sidebar/Sidebar'
import KeyboardShortcutsCheatsheet from '@/components/KeyboardShortcutsCheatsheet'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useUIStore } from '@/store/uiStore'

function DashboardInner({ children }: { children: React.ReactNode }) {
  useKeyboardShortcuts()
  const { isFocusMode } = useUIStore()

  return (
    <div className="flex h-screen bg-background">
      {!isFocusMode && <Sidebar />}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
      <KeyboardShortcutsCheatsheet />
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardInner>{children}</DashboardInner>
}
