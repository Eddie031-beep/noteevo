'use client'

import { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  FileText, BookOpen, Tag, CheckSquare, Paperclip, CalendarClock, Users,
} from 'lucide-react'
import {
  getUserStats, getDashboardExtras,
  type UserStats, type DashboardExtras,
} from '@/lib/supabase/stats'

const ACCENT = '#1a7a4a'

interface StatCard {
  label: string
  value: number
  icon: React.ReactNode
}

function StatsGrid({ stats }: { stats: UserStats }) {
  const cards: StatCard[] = [
    { label: 'Notas', value: stats.total_notes, icon: <FileText size={16} /> },
    { label: 'Libretas', value: stats.total_notebooks, icon: <BookOpen size={16} /> },
    { label: 'Etiquetas', value: stats.total_tags, icon: <Tag size={16} /> },
    { label: 'Tareas pendientes', value: stats.pending_tasks, icon: <CheckSquare size={16} /> },
    { label: 'Archivos', value: stats.total_attachments, icon: <Paperclip size={16} /> },
    { label: 'Esta semana', value: stats.notes_this_week, icon: <CalendarClock size={16} /> },
    { label: 'Spaces', value: stats.spaces_count, icon: <Users size={16} /> },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {cards.map(({ label, value, icon }) => (
        <div
          key={label}
          className="bg-panel border border-border rounded-xl p-4 flex flex-col gap-2"
        >
          <span className="text-accent">{icon}</span>
          <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
          <p className="text-xs text-muted">{label}</p>
        </div>
      ))}
    </div>
  )
}

function ActivityChart({ data }: { data: DashboardExtras['activity_7d'] }) {
  const chartData = data.map((p) => ({
    label: format(parseISO(p.day), 'EEE', { locale: es }),
    count: p.count,
  }))
  const hasActivity = data.some((p) => p.count > 0)

  return (
    <div className="bg-panel border border-border rounded-xl p-5">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Actividad — últimos 7 días</h2>
        <span className="text-xs text-muted">Notas creadas</span>
      </div>
      <div className="h-44 w-full">
        {hasActivity ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={ACCENT} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={ACCENT} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: 'var(--color-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: 'var(--color-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <Tooltip
                cursor={{ stroke: ACCENT, strokeWidth: 1 }}
                contentStyle={{
                  background: 'var(--color-panel)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  fontSize: 12,
                  color: 'var(--color-foreground)',
                }}
                labelStyle={{ color: 'var(--color-muted)' }}
                formatter={(value) => [`${value} nota${Number(value) !== 1 ? 's' : ''}`, '']}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke={ACCENT}
                strokeWidth={2}
                fill="url(#activityFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-center">
            <CalendarClock size={26} className="text-subtle" />
            <p className="text-sm text-muted">Sin notas creadas esta semana</p>
          </div>
        )}
      </div>
    </div>
  )
}

function RankedList({
  title, items, emptyLabel, icon,
}: {
  title: string
  items: { name: string; count: number }[]
  emptyLabel: string
  icon: React.ReactNode
}) {
  const max = Math.max(1, ...items.map((i) => i.count))

  return (
    <div className="bg-panel border border-border rounded-xl p-5">
      <h2 className="text-sm font-semibold text-foreground mb-4">{title}</h2>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-8 text-center">
          <span className="text-subtle">{icon}</span>
          <p className="text-sm text-muted">{emptyLabel}</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-foreground truncate">{item.name}</span>
                <span className="text-muted tabular-nums shrink-0">{item.count}</span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full transition-all"
                  style={{ width: `${(item.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function DashboardStats() {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [extras, setExtras] = useState<DashboardExtras | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getUserStats(), getDashboardExtras()])
      .then(([s, e]) => {
        setStats(s)
        setExtras(e)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-panel border border-border rounded-xl h-24 animate-pulse" />
          ))}
        </div>
        <div className="bg-panel border border-border rounded-xl h-56 animate-pulse" />
      </div>
    )
  }

  if (!stats || !extras) {
    return (
      <div className="bg-panel border border-border rounded-xl p-5 text-sm text-muted">
        No se pudieron cargar las estadísticas.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      <StatsGrid stats={stats} />
      <ActivityChart data={extras.activity_7d} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <RankedList
          title="Etiquetas más usadas"
          items={extras.top_tags}
          emptyLabel="Sin etiquetas aún"
          icon={<Tag size={26} />}
        />
        <RankedList
          title="Libretas más grandes"
          items={extras.top_notebooks}
          emptyLabel="Sin libretas aún"
          icon={<BookOpen size={26} />}
        />
      </div>
    </div>
  )
}
