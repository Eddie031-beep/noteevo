'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  getNotifications,
  markAsRead as markAsReadLib,
  markAllRead as markAllReadLib,
  deleteNotification as deleteNotificationLib,
} from '@/lib/supabase/notifications'
import type { Notification } from '@/types'

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const data = await getNotifications()
      setNotifications(data)
    } catch {
      // silencioso
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Carga inicial de notificaciones al montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load()
  }, [load])

  useEffect(() => {
    const supabase = createClient()
    let channel: ReturnType<typeof supabase.channel> | null = null
    let cancelled = false

    // getSession() reads from local storage — no network round-trip
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (cancelled || !session?.user) return

      channel = supabase
        .channel(`notifications-${session.user.id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${session.user.id}`,
          },
          (payload) => {
            setNotifications((prev) => [payload.new as Notification, ...prev])
          }
        )
        .subscribe()
    })

    return () => {
      cancelled = true
      if (channel) supabase.removeChannel(channel)
    }
  }, [])

  const markAsRead = useCallback(async (id: string) => {
    await markAsReadLib(id)
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    )
  }, [])

  const markAllRead = useCallback(async () => {
    await markAllReadLib()
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
  }, [])

  const deleteNotification = useCallback(async (id: string) => {
    await deleteNotificationLib(id)
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const unreadCount = notifications.filter((n) => !n.is_read).length

  return { notifications, loading, unreadCount, markAsRead, markAllRead, deleteNotification }
}
