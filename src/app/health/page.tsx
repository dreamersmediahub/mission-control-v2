import { createServerClient } from '@/lib/supabase'
import type { HealthLog } from '@/types'
import { Heart } from 'lucide-react'

export const revalidate = 60

const typeColors: Record<string, string> = {
  injection:  '#f87171',
  medication: '#60a5fa',
  supplement: '#4ade80',
  mood:       '#c084fc',
  energy:     '#ffd700',
  sleep:      '#2dd4bf',
  exercise:   '#fb923c',
}

export default async function HealthPage() {
  const supabase = createServerClient()
  const { data } = await supabase
    .from('health_logs')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(100)
  const all: HealthLog[] = data ?? []

  const byDate: Record<string, HealthLog[]> = {}
  all.forEach(log => {
    if (!byDate[log.date]) byDate[log.date] = []
    byDate[log.date].push(log)
  })

  return (
    <div className="p-6 max-w-[900px]">
      <div className="mb-6">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#4ade80] mb-1">BIOMETRICS</p>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Heart size={22} className="text-[#4ade80]" /> Health Log
        </h1>
        <p className="text-[#555] text-sm mt-0.5">GHK-Cu · KPV · Reta · Dexamphetamine</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5 px-2 py-1 bg-[#111] border border-[#1a1a1a] rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] text-[#555] capitalize">{type}</span>
          </div>
        ))}
      </div>

      {Object.keys(byDate).length === 0 ? (
        <div className="bg-[#111] border border-[#252525] rounded-xl p-8 text-center">
          <p className="text-[#333] text-sm">No health logs yet.</p>
          <p className="text-[#222] text-xs mt-1">Add entries to the health_logs table, or wire up your health agent.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(byDate).map(([date, dayLogs]) => (
            <div key={date} className="bg-[#111] border border-[#252525] rounded-xl overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[#1a1a1a] flex items-center justify-between">
                <p className="text-xs font-semibold text-white">
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <span className="text-[10px] text-[#444]">{dayLogs.length} entries</span>
              </div>
              <div className="p-3 space-y-1.5">
                {dayLogs.map(log => (
                  <div key={log.id} className="flex items-center gap-3 p-2.5 bg-[#0d0d0d] rounded-lg border border-[#1a1a1a]">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: typeColors[log.type] ?? '#555' }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium text-white">{log.name}</p>
                        {log.dose && <span className="text-[10px] text-[#555]">{log.dose}</span>}
                        {log.value != null && <span className="text-[10px] text-[#555] font-mono">{log.value}{log.unit ?? ''}</span>}
                      </div>
                      {log.notes && <p className="text-[10px] text-[#444] mt-0.5 truncate">{log.notes}</p>}
                    </div>
                    <span className="text-[9px] font-medium capitalize shrink-0" style={{ color: typeColors[log.type] ?? '#555' }}>{log.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}