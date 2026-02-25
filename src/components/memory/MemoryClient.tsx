// @ts-nocheck
'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import type { Memory, BrainDump } from '@/types/database'

const TAG_COLORS = {
  idea: '#ffd700', task: '#60a5fa', note: '#4ade80', feeling: '#c084fc',
  insight: '#2dd4bf', default: '#555',
}

const TABS = [
  { id: 'all', label: 'All Memories' },
  { id: 'brain_dumps', label: 'Brain Dumps' },
  { id: 'agent_notes', label: 'Agent Notes' },
  { id: 'kyle_brain', label: 'Kyle Brain' },
  { id: 'dm_brain', label: 'DM Brain' },
]

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime()
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (diff < 60000) return 'just now'
  if (m < 60) return `${m}m ago`
  if (h < 24) return `${h}h ago`
  return `${d}d ago`
}

function MemoryCard({ memory, onClick, expanded }: { memory: Memory; onClick: () => void; expanded: boolean }) {
  const color = TAG_COLORS[memory.tag] ?? TAG_COLORS.default
  return (
    <div
      onClick={onClick}
      style={{
        background: '#111', border: `1px solid ${expanded ? '#ffd70044' : '#1e1e1e'}`,
        borderRadius: 10, padding: '14px 16px', cursor: 'pointer', transition: 'all 0.15s',
      }}
      onMouseEnter={e => { if (!expanded) e.currentTarget.style.borderColor = '#252525' }}
      onMouseLeave={e => { if (!expanded) e.currentTarget.style.borderColor = '#1e1e1e' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{
              fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 100,
              background: `${color}22`, color, border: `1px solid ${color}44`,
              textTransform: 'uppercase', letterSpacing: 0.5, flexShrink: 0,
            }}>{memory.tag}</span>
            {memory.agent_name && (
              <span style={{ fontSize: 10, color: '#444' }}>{memory.agent_name === 'Kyle' ? '👤' : '🤖'} {memory.agent_name}</span>
            )}
            <span style={{ fontSize: 10, color: '#333', marginLeft: 'auto' }}>{timeAgo(memory.created_at)}</span>
          </div>
          <div style={{
            fontSize: 13, color: '#e2e2e2', lineHeight: 1.6,
            overflow: expanded ? 'visible' : 'hidden',
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? undefined : 3,
            WebkitBoxOrient: 'vertical',
          }}>{memory.content}</div>
          {!expanded && memory.content.length > 200 && (
            <div style={{ fontSize: 11, color: '#ffd70066', marginTop: 4 }}>Click to expand</div>
          )}
        </div>
      </div>
    </div>
  )
}

function DumpCard({ dump }: { dump: BrainDump }) {
  const color = TAG_COLORS[dump.tag] ?? TAG_COLORS.default
  return (
    <div style={{
      background: '#111', border: '1px solid #1e1e1e', borderRadius: 10, padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{
              fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 100,
              background: `${color}22`, color, border: `1px solid ${color}44`,
              textTransform: 'uppercase', letterSpacing: 0.5,
            }}>{dump.tag}</span>
            <span style={{ fontSize: 10, color: '#333' }}>{timeAgo(dump.created_at)}</span>
            {!dump.processed && <span style={{ fontSize: 9, color: '#fb923c', background: '#fb923c22', border: '1px solid #fb923c44', padding: '1px 5px', borderRadius: 3 }}>Unprocessed</span>}
          </div>
          <div style={{ fontSize: 13, color: '#e2e2e2', lineHeight: 1.6 }}>{dump.content}</div>
        </div>
      </div>
    </div>
  )
}

export default function MemoryClient({
  memories: initialMemories,
  dumps: initialDumps,
}: {
  memories: Memory[]
  dumps: BrainDump[]
}) {
  const [memories, setMemories] = useState(initialMemories)
  const [dumps, setDumps] = useState(initialDumps)
  const [tab, setTab] = useState('all')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Memory[] | null>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  // Cmd+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
        searchRef.current?.select()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    const sub = supabase
      .channel('memories-page')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'memories' }, (payload) => {
        setMemories(prev => [payload.new as Memory, ...prev])
      })
      .subscribe()
    const dumpSub = supabase
      .channel('dumps-page')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'brain_dumps' }, (payload) => {
        setDumps(prev => [payload.new as BrainDump, ...prev])
      })
      .subscribe()
    return () => { supabase.removeChannel(sub); supabase.removeChannel(dumpSub) }
  }, [])

  async function doSearch(q: string) {
    if (!q.trim()) { setSearchResults(null); return }
    setSearching(true)
    try {
      // Full-text search via Supabase
      const { data } = await supabase
        .from('memories')
        .select('*')
        .textSearch('search_vector', q, { type: 'websearch', config: 'english' })
        .order('created_at', { ascending: false })
        .limit(30)
      setSearchResults(data ?? [])
    } catch {
      // Fallback to ilike if tsvector not available yet
      const { data } = await supabase
        .from('memories')
        .select('*')
        .ilike('content', `%${q}%`)
        .order('created_at', { ascending: false })
        .limit(30)
      setSearchResults(data ?? [])
    } finally {
      setSearching(false)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => doSearch(search), 300)
    return () => clearTimeout(timeout)
  }, [search])

  const displayMemories = searchResults ?? (() => {
    switch (tab) {
      case 'brain_dumps': return memories.filter(m => m.source === 'kyle')
      case 'agent_notes': return memories.filter(m => m.source !== 'kyle' && m.source !== 'kyle-brain' && m.source !== 'dm-brain')
      case 'kyle_brain': return memories.filter(m => m.source === 'kyle-brain')
      case 'dm_brain': return memories.filter(m => m.source === 'dm-brain')
      default: return memories
    }
  })()

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1000, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ffd700', textTransform: 'uppercase', marginBottom: 6 }}>Dreamers Media</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Memory</h1>
        <div style={{ color: '#555', fontSize: 13, marginTop: 4 }}>Your second brain · {memories.length} memories · {dumps.length} brain dumps</div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#555', fontSize: 14 }}>🔍</span>
        <input
          ref={searchRef}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search all memories... (⌘K)"
          style={{
            width: '100%', background: '#111', border: '1px solid #252525', borderRadius: 10,
            padding: '12px 16px 12px 40px', color: '#e2e2e2', fontSize: 14, outline: 'none',
            boxSizing: 'border-box', fontFamily: 'inherit',
          }}
          onFocus={e => e.target.style.borderColor = '#ffd70066'}
          onBlur={e => e.target.style.borderColor = '#252525'}
        />
        {search && (
          <button
            onClick={() => { setSearch(''); setSearchResults(null) }}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#555', cursor: 'pointer', fontSize: 14 }}
          >✕</button>
        )}
        {!search && (
          <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: '#333', background: '#1a1a1a', border: '1px solid #252525', borderRadius: 4, padding: '2px 6px' }}>⌘K</span>
        )}
      </div>

      {/* Tabs (hidden during search) */}
      {!search && (
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, background: '#111', border: '1px solid #252525', borderRadius: 8, padding: 4 }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                flex: 1, padding: '7px 12px', borderRadius: 6, border: 'none',
                background: tab === t.id ? '#252525' : 'transparent',
                color: tab === t.id ? '#ffd700' : '#555',
                fontWeight: tab === t.id ? 700 : 400, fontSize: 11, cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >{t.label}</button>
          ))}
        </div>
      )}

      {/* Results */}
      {search && (
        <div style={{ fontSize: 11, color: '#555', marginBottom: 12 }}>
          {searching ? 'Searching...' : `${searchResults?.length ?? 0} results for "${search}"`}
        </div>
      )}

      {/* Brain Dumps tab special view */}
      {tab === 'brain_dumps' && !search ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {dumps.length === 0 ? (
            <div style={{ color: '#333', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>
              No brain dumps yet. Use the widget on the dashboard to add your thoughts.
            </div>
          ) : (
            dumps.map(d => <DumpCard key={d.id} dump={d} />)
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {displayMemories.length === 0 ? (
            <div style={{ color: '#333', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>
              {search ? 'No results found' : 'No memories yet'}
            </div>
          ) : (
            displayMemories.map(m => (
              <MemoryCard
                key={m.id}
                memory={m}
                expanded={expanded === m.id}
                onClick={() => setExpanded(expanded === m.id ? null : m.id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}