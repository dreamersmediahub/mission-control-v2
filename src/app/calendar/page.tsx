import { createServerClient } from '@/lib/supabase'
import { Calendar } from 'lucide-react'

export const revalidate = 60

const typeColors: Record<string, string> = {
  meeting:  '#60a5fa',
  deadline: '#f87171',
  health:   '#4ade80',
  personal: '#c084fc',
  content:  '#2dd4bf',
}

export default async function CalendarPage() {
  const supabase = createServerClient()
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .gte('start_time', startOfMonth)
    .lte('start_time', endOfMonth)
    .order('start_time')
  const all = events ?? []

  // Group by date
  const byDate: Record<string, typeof all> = {}
  all.forEach(e => {
    const d = e.start_time.split('T')[0]
    if (!byDate[d]) byDate[d] = []
    byDate[d].push(e)
  })

  const today = now.toISOString().split('T')[0]

  return (
    <div className="p-6 max-w-[900px]">
      <div className="mb-6">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#60a5fa] mb-1">SCHEDULE</p>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Calendar size={22} className="text-[#60a5fa]" /> Calendar
        </h1>
        <p className="text-[#555] text-sm mt-0.5">
          {now.toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })} · {all.length} events
        </p>
      </div>

      {Object.keys(byDate).length === 0 ? (
        <div className="bg-[#111] border border-[#252525] rounded-xl p-8 text-center">
          <p className="text-[#333] text-sm">No events this month.</p>
          <p className="text-[#222] text-xs mt-1">Add events to the events table, or wire up your calendar agent.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(byDate).map(([date, dayEvents]) => {
            const isToday = date === today
            return (
              <div key={date} className={`bg-[#111] border rounded-xl overflow-hidden ${isToday ? 'border-[#ffd700]/30' : 'border-[#252525]'}`}>
                <div className={`px-4 py-2.5 border-b flex items-center justify-between ${isToday ? 'border-[#ffd700]/20 bg-[#ffd700]/5' : 'border-[#1a1a1a]'}`}>
                  <p className={`text-xs font-semibold ${isToday ? 'text-[#ffd700]' : 'text-white'}`}>
                    {new Date(date + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })}
                    {isToday && <span className="ml-2 text-[9px] font-bold text-[#ffd700] uppercase tracking-wider">Today</span>}
                  </p>
                  <span className="text-[10px] text-[#444]">{dayEvents.length}</span>
                </div>
                <div className="p-3 space-y-2">
                  {dayEvents.map(event => (
                    <div key={event.id} className="flex items-center gap-3 p-3 bg-[#0d0d0d] rounded-lg border border-[#1a1a1a]">
                      <div className="w-1 self-stretch rounded-full" style={{ backgroundColor: typeColors[event.type] ?? '#555' }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">{event.title}</p>
                        {event.description && <p className="text-xs text-[#555] mt-0.5">{event.description}</p>}
                      </div>
                      <div className="text-right shrink-0">
                        {event.all_day ? (
                          <span className="text-[10px] text-[#444]">All day</span>
                        ) : (
                          <p className="text-xs text-[#aaa]">{new Date(event.start_time).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</p>
                        )}
                        <p className="text-[9px] font-medium capitalize mt-0.5" style={{ color: typeColors[event.type] ?? '#555' }}>{event.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}