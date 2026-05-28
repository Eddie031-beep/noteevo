'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, Users, Clock, Share2, UserMinus, X, CheckCheck, Trash2 } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import { useNotifications } from '@/hooks/useNotifications'
import type { Notification, NotificationType } from '@/types'

const typeIcon: Record<NotificationType, React.ReactNode> = {
  space_invite: <Users size={14} />,
  task_reminder: <Clock size={14} />,
  note_shared: <Share2 size={14} />,
  space_removed: <UserMinus size={14} />,
}

interface NotificationBellProps {
  collapsed: boolean
}

export default function NotificationBell({ collapsed }: NotificationBellProps) {
  const { notifications, unreadCount, markAsRead, markAllRead, deleteNotification } = useNotifications()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const handleNotificationClick = async (n: Notification) => {
    if (!n.is_read) await markAsRead(n.id)
  }

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    await deleteNotification(id)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        title="Notificaciones"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center gap-2.5 rounded-lg py-2 text-sm text-muted hover:bg-surface hover:text-foreground transition cursor-pointer ${
          collapsed ? 'justify-center px-2' : 'px-3'
        }`}
      >
        <span className="relative shrink-0">
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-0.5 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </span>
        {!collapsed && <span className="font-medium">Notificaciones</span>}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-1 w-80 bg-elevated border border-border rounded-xl shadow-2xl z-50 flex flex-col" style={{ maxHeight: '420px' }}>
          {/* Header — fixed */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
            <span className="text-sm font-semibold text-foreground">
              Notificaciones
              {unreadCount > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-danger/20 text-danger text-[10px] font-semibold rounded-full">
                  {unreadCount}
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  type="button"
                  title="Marcar todas como leídas"
                  onClick={markAllRead}
                  className="flex items-center gap-1 text-xs text-muted hover:text-accent transition cursor-pointer"
                >
                  <CheckCheck size={13} />
                  <span>Marcar todas</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 text-muted hover:text-foreground transition cursor-pointer rounded"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Scrollable list */}
          <div className="overflow-y-auto flex-1 min-h-0">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell size={22} className="mx-auto mb-2 text-subtle" />
                <p className="text-xs text-muted">Sin notificaciones</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`group flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 cursor-pointer transition-colors ${
                    n.is_read
                      ? 'hover:bg-surface'
                      : 'bg-accent/5 hover:bg-accent/10'
                  }`}
                >
                  <span className={`mt-0.5 shrink-0 ${n.is_read ? 'text-muted' : 'text-accent'}`}>
                    {typeIcon[n.type] ?? <Bell size={14} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium truncate ${n.is_read ? 'text-muted' : 'text-foreground'}`}>
                      {n.title}
                    </p>
                    {n.body && (
                      <p className="text-xs text-muted mt-0.5 line-clamp-2">{n.body}</p>
                    )}
                    <p className="text-[10px] text-subtle mt-1">
                      {formatDistanceToNow(new Date(n.created_at), { locale: es, addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-1">
                    {!n.is_read && (
                      <span className="w-2 h-2 rounded-full bg-accent mt-1" />
                    )}
                    <button
                      type="button"
                      title="Eliminar notificación"
                      onClick={(e) => handleDelete(e, n.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-subtle hover:text-danger transition rounded cursor-pointer"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
