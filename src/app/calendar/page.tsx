import { createServerClient } from '@/lib/supabase'
import type { CalendarEvent } from '@/types/database'

export const dynamic = 'force-dynamic'

export default async function CalendarPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('calendar_events')
    .select('*')
    .order('start_time')

  const events: CalendarEvent[] = data ?? []
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  const daysInMonth = monthEnd.getDate()
  const firstDayOfWeek = monthStart.getDay()
  const today = now.getDate()

  const TYPE_COLORS: Record<string, string> = {
    cron: '#60a5fa', content: '#c084fc', task: '#ffd700', personal: '#4ade80', meeting: '#fb923c', event: '#555'
  }

  const eventsByDay = new Map<number, CalendarEvent[]>()
  events.forEach(e => {
    const d = new Date(e.start_time)
    if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
      const day = d.getDate()
      if (!eventsByDay.has(day)) eventsByDay.set(day, [])
      eventsByDay.get(day)!.push(e)
    }
  })

  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfWeek + 1
    return day >= 1 && day <= daysInMonth ? day : null
  })

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ffd700', textTransform: 'uppercase', marginBottom: 6 }}>Dreamers Media</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Calendar</h1>
        <div style={{ color: '#555', fontSize: 13, marginTop: 4 }}>
          {now.toLocaleDateString('en-IE', { month: 'long', year: 'numeric' })} · {events.length} events this month
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        {Object.entries(TYPE_COLORS).map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: color }} />
            <span style={{ fontSize: 10, color: '#555', textTransform: 'capitalize' }}>{type}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, overflow: 'hidden' }}>
        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #1a1a1a' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} style={{ padding: '10px', textAlign: 'center', fontSize: 9, fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: 1 }}>{d}</div>
          ))}
        </div>
        {/* Weeks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
          {cells.map((day, i) => {
            const evs = day ? (eventsByDay.get(day) ?? []) : []
            const isToday = day === today
            return (
              <div
                key={i}
                style={{
                  minHeight: 80, padding: '8px 6px', borderRight: '1px solid #141414',
                  borderBottom: '1px solid #141414',
                  background: isToday ? '#ffd70008' : 'transparent',
                }}
              >
                {day && (
                  <>
                    <div style={{
                      fontSize: 12, fontWeight: isToday ? 800 : 400,
                      color: isToday ? '#ffd700' : day ? '#555' : '#222',
                      marginBottom: 4,
                      width: 22, height: 22, borderRadius: '50%',
                      background: isToday ? '#ffd70022' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: isToday ? '1px solid #ffd70066' : 'none',
                    }}>{day}</div>
                    {evs.slice(0, 3).map(ev => (
                      <div
                        key={ev.id}
                        style={{
                          fontSize: 9, fontWeight: 600, padding: '2px 5px', borderRadius: 3,
                          background: `${TYPE_COLORS[ev.type] ?? '#555'}22`,
                          color: TYPE_COLORS[ev.type] ?? '#555',
                          marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          border: `1px solid ${TYPE_COLORS[ev.type] ?? '#555'}33`,
                        }}
                      >{ev.title}</div>
                    ))}
                    {evs.length > 3 && <div style={{ fontSize: 9, color: '#444' }}>+{evs.length - 3} more</div>}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {events.length === 0 && (
        <div style={{ textAlign: 'center', color: '#333', fontSize: 13, marginTop: 20 }}>
          No calendar events yet. Agents will populate this with cron jobs and content schedules.
        </div>
      )}
    </div>
  )
}