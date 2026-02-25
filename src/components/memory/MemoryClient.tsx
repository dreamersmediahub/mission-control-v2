// @ts-nocheck
'use client'
import { Memory } from '@/types'
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import { Zap, Search } from 'lucide-react'

const tagColors: Record<string, string> = {
  note:       '#c084fc',
  task:       '#ffd700',
  research:   '#60a5fa',
  health:     '#4ade80',
  finance:    '#fb923c',
  content:    '#2dd4bf',
  brain_dump: '#f87171',
  idea:       '#fbbf24',
}

export function MemoryClient({ memories: initial }: { memories: Memory[] }) {
  const [memories, setMemories] = useState(initial)
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [filtered, setFiltered] = useState(initial)

  useEffect(() => {
    const channel = supabase
      .channel('memories-live')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'memories' }, payload => {
        setMemories(prev => [payload.new as Memory, ...prev])
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  useEffect(() => {
    let result = memories
    if (activeTag) result = result.filter(m => m.tag === activeTag)
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter(m =>
        m.content.toLowerCase().includes(q) ||
        m.source.toLowerCase().includes(q) ||
        (m.agent_name ?? '').toLowerCase().includes(q)
      )
    }
    setFiltered(result)
  }, [query, activeTag, memories])

  const tags = [...new Set(memories.map(m => m.tag))].sort()

  return (
    <div className="p-6 max-w-[1200px]">
      <div className="mb-6">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#c084fc] mb-1">SECOND BRAIN</p>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Zap size={22} className="text-[#c084fc]" /> Memory
        </h1>
        <p className="text-[#555] text-sm mt-0.5">{memories.length} entries · real-time · agents write here automatically</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search memories..."
          className="w-full bg-[#111] border border-[#252525] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-[#333] focus:outline-none focus:border-[#c084fc]/40"
        />
        {query && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#444]">{filtered.length} results</span>}
      </div>

      {/* Tag filters */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all border ${
              activeTag === null ? 'bg-[#c084fc]/20 text-[#c084fc] border-[#c084fc]/30' : 'text-[#444] border-[#252525] hover:border-[#353535]'
            }`}
          >
            All ({memories.length})
          </button>
          {tags.map(tag => {
            const color = tagColors[tag] ?? '#777'
            const count = memories.filter(m => m.tag === tag).length
            return (
              <button
                key={tag}
                onClick={() => setActiveTag(t => t === tag ? null : tag)}
                className="px-2 py-0.5 rounded-full text-[10px] font-medium transition-all"
                style={{
                  backgroundColor: activeTag === tag ? color + '20' : 'transparent',
                  color: activeTag === tag ? color : '#555',
                  border: `1px solid ${activeTag === tag ? color + '40' : '#252525'}`,
                }}
              >
                {tag} ({count})
              </button>
            )
          })}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <Zap size={32} className="mx-auto mb-3 text-[#252525]" />
          <p className="text-[#333] text-sm">{query ? 'No matches found.' : 'No memories yet.'}</p>
          <p className="text-[#222] text-xs mt-1">Agents write here via curl — or you can insert directly into the memories table.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
          {filtered.map(m => {
            const color = tagColors[m.tag] ?? '#777'
            return (
              <div key={m.id} className="bg-[#111] border border-[#252525] rounded-xl p-3.5 hover:border-[#303030] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="px-1.5 py-0.5 rounded text-[9px] font-semibold"
                    style={{ backgroundColor: color + '15', color, border: `1px solid ${color}25` }}
                  >
                    {m.tag}
                  </span>
                  <div className="flex items-center gap-2">
                    {m.agent_name && <span className="text-[9px] text-[#333]">{m.agent_name}</span>}
                    <span className="text-[9px] text-[#2a2a2a]">
                      {new Date(m.created_at).toLocaleDateString('en-AU', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#bbb] leading-relaxed">{m.content}</p>
                <p className="text-[9px] text-[#2a2a2a] mt-2">{m.source}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}