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
    load()
  }, [load])

  useEffect(() => {
    const supabase = createClient()

    let channel: ReturnType<typeof supabase.channel> | null = null

    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) return

      channel = supabase
        .channel('notifications-realtime')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications',
            filter: `user_id=eq.${data.user.id}`,
          },
          (payload) => {
            setNotifications((prev) => [payload.new as Notification, ...prev])
          }
        )
        .subscribe()
    })

    return () => {
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
