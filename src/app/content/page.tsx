import { createServerClient } from '@/lib/supabase'
import type { ContentItem } from '@/types'
import { FileText } from 'lucide-react'

export const revalidate = 30

const colColors: Record<string, string> = {
  idea:      '#555',
  scripted:  '#60a5fa',
  filmed:    '#c084fc',
  edited:    '#ffd700',
  published: '#4ade80',
}

export default async function ContentPage() {
  const supabase = createServerClient()
  const { data } = await supabase.from('content_items').select('*').order('position')
  const all: ContentItem[] = data ?? []
  const columns = ['idea', 'scripted', 'filmed', 'edited', 'published']

  return (
    <div className="p-6">
      <div className="mb-6">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#2dd4bf] mb-1">PIPELINE</p>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText size={22} className="text-[#2dd4bf]" /> Content Pipeline
        </h1>
        <p className="text-[#555] text-sm mt-0.5">{all.length} items · {all.filter(i => i.status === 'published').length} published</p>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {columns.map(col => {
          const colItems = all.filter(i => i.status === col)
          return (
            <div key={col} className="bg-[#111] border border-[#252525] rounded-xl overflow-hidden">
              <div className="px-3 py-2.5 border-b border-[#252525] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colColors[col] }} />
                  <span className="text-xs font-semibold text-white capitalize">{col}</span>
                </div>
                <span className="text-[10px] text-[#444] bg-[#1a1a1a] px-1.5 py-0.5 rounded">{colItems.length}</span>
              </div>
              <div className="p-2 space-y-2 min-h-[200px]">
                {colItems.map(item => (
                  <div key={item.id} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-lg p-2.5">
                    <p className="text-xs text-white leading-relaxed">{item.title}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[9px] text-[#444] uppercase tracking-wide">{item.type}</span>
                      {item.platform && <span className="text-[9px] text-[#333]">· {item.platform}</span>}
                    </div>
                    {item.views > 0 && (
                      <p className="text-[9px] text-[#3a3a3a] mt-0.5">{item.views.toLocaleString()} views</p>
                    )}
                  </div>
                ))}
                {colItems.length === 0 && (
                  <div className="text-center py-4 text-[#2a2a2a] text-xs">Empty</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}