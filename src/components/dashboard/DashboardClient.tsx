// @ts-nocheck
'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import type { AgentStatus, Task, Memory, AgentEvent, BrainDump } from '@/types/database'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const EVENT_COLORS = {
  task_complete: '#4ade80',
  task_start: '#ffd700',
  memory_write: '#c084fc',
  cron: '#60a5fa',
  error: '#f87171',
  message: '#2dd4bf',
  brain_dump: '#fb923c',
  default: '#777',
}

const EVENT_ICONS = {
  task_complete: '✓',
  task_start: '▶',
  memory_write: '🧠',
  cron: '⏰',
  error: '✕',
  message: '💬',
  brain_dump: '💡',
  default: '·',
}

const TAG_COLORS = {
  idea: '#ffd700',
  task: '#60a5fa',
  note: '#4ade80',
  feeling: '#c084fc',
}

const PRIORITY_COLORS = {
  urgent: '#f87171',
  high: '#fb923c',
  medium: '#ffd700',
  low: '#777',
}

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

function StatusDot({ status }: { status: string }) {
  const colors = { active: '#4ade80', idle: '#ffd700', offline: '#444' }
  const animated = status === 'active'
  return (
    <span style={{
      display: 'inline-block',
      width: 8, height: 8, borderRadius: '50%',
      background: colors[status] ?? '#444',
      flexShrink: 0,
      boxShadow: animated ? `0 0 0 2px ${colors.active}33` : undefined,
      animation: animated ? 'pulse 2s infinite' : undefined,
    }} />
  )
}

export default function DashboardClient({
  agents: initialAgents,
  tasks: initialTasks,
  events: initialEvents,
  brainDumps: initialDumps,
}: {
  agents: AgentStatus[]
  tasks: Task[]
  memories: any[]
  events: AgentEvent[]
  brainDumps: BrainDump[]
}) {
  const [agents, setAgents] = useState(initialAgents)
  const [tasks, setTasks] = useState(initialTasks)
  const [events, setEvents] = useState(initialEvents)
  const [dumps, setDumps] = useState(initialDumps)
  const [dumpContent, setDumpContent] = useState('')
  const [dumpTag, setDumpTag] = useState<'idea' | 'task' | 'note' | 'feeling'>('idea')
  const [submitting, setSubmitting] = useState(false)
  const [justSubmitted, setJustSubmitted] = useState(false)
  const eventListRef = useRef<HTMLDivElement>(null)

  // Real-time subscriptions
  useEffect(() => {
    const agentSub = supabase
      .channel('agents')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agent_status' }, (payload) => {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
          setAgents(prev => {
            const idx = prev.findIndex(a => a.agent_id === payload.new.agent_id)
            if (idx >= 0) { const n = [...prev]; n[idx] = payload.new; return n }
            return [payload.new, ...prev]
          })
        }
      })
      .subscribe()

    const taskSub = supabase
      .channel('tasks-dash')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        if (payload.eventType === 'INSERT') setTasks(prev => [payload.new, ...prev])
        if (payload.eventType === 'UPDATE') setTasks(prev => prev.map(t => t.id === payload.new.id ? payload.new : t))
        if (payload.eventType === 'DELETE') setTasks(prev => prev.filter(t => t.id !== payload.old.id))
      })
      .subscribe()

    const eventSub = supabase
      .channel('events-dash')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'events' }, (payload) => {
        setEvents(prev => [payload.new, ...prev].slice(0, 50))
        setTimeout(() => { eventListRef.current?.scrollTo({ top: 0, behavior: 'smooth' }) }, 100)
      })
      .subscribe()

    const dumpSub = supabase
      .channel('dumps-dash')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'brain_dumps' }, (payload) => {
        setDumps(prev => [payload.new, ...prev].slice(0, 5))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(agentSub)
      supabase.removeChannel(taskSub)
      supabase.removeChannel(eventSub)
      supabase.removeChannel(dumpSub)
    }
  }, [])

  async function submitDump() {
    if (!dumpContent.trim()) return
    setSubmitting(true)
    try {
      await Promise.all([
        supabase.from('brain_dumps').insert([{ content: dumpContent.trim(), tag: dumpTag }]),
        supabase.from('memories').insert([{ content: dumpContent.trim(), tag: dumpTag, source: 'kyle', agent_name: 'Kyle' }]),
        supabase.from('events').insert([{ agent_id: 'kyle', agent_name: 'Kyle', type: 'brain_dump', detail: `Brain dump (${dumpTag}): ${dumpContent.trim().slice(0, 80)}` }]),
      ])
      setDumpContent('')
      setJustSubmitted(true)
      setTimeout(() => setJustSubmitted(false), 2000)
    } finally {
      setSubmitting(false)
    }
  }

  const activeAgents = agents.filter(a => a.status === 'active')
  const myTasks = tasks.filter(t => t.assignee === 'kyle' && t.status !== 'done')
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress')
  const todaysFocus = myTasks.filter(t => t.priority === 'urgent' || t.priority === 'high').slice(0, 3)

  async function completeTask(id: string) {
    await supabase.from('tasks').update({ status: 'done', completed_at: new Date().toISOString() }).eq('id', id)
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'done' } : t))
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.3); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes goldFlash { 0%, 100% { background: #111; } 50% { background: #ffd70022; } }
        .complete-btn:hover { background: #4ade8022 !important; border-color: #4ade80 !important; color: #4ade80 !important; }
        .dump-submit:hover { background: #ffd700 !important; color: #000 !important; }
        .stat-card:hover { border-color: #ffd70066 !important; }
        .event-row:hover { background: #181818 !important; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ffd700', textTransform: 'uppercase', marginBottom: 6 }}>Dreamers Media</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Mission Control</h1>
        <div style={{ color: '#555', fontSize: 13, marginTop: 4 }}>
          {new Date().toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          &nbsp;·&nbsp;
          <span style={{ color: '#4ade80' }}>●</span> {activeAgents.length} agents active
        </div>
      </div>

      {/* Stat Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Agents Online', value: `${activeAgents.length} / ${agents.length}`, color: '#4ade80', sub: agents.filter(a => a.status === 'idle').length + ' idle' },
          { label: 'My Open Tasks', value: myTasks.length, color: '#ffd700', sub: myTasks.filter(t => t.priority === 'urgent').length + ' urgent' },
          { label: 'In Progress', value: inProgressTasks.length, color: '#60a5fa', sub: 'across all agents' },
          { label: 'Brain Dumps', value: dumps.length, color: '#c084fc', sub: dumps.filter(d => !d.processed).length + ' unprocessed' },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{
            background: '#111', border: '1px solid #252525', borderRadius: 10, padding: '16px 20px',
            cursor: 'default', transition: 'border-color 0.2s',
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#444', marginTop: 6 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main 3-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr 1fr', gap: 16 }}>

        {/* LEFT — Today's Focus + Brain Dump */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Today's Focus */}
          <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 10, padding: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>Today's Focus</div>
            {todaysFocus.length === 0 ? (
              <div style={{ color: '#333', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No urgent tasks 🎉</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {todaysFocus.map(task => (
                  <div key={task.id} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 12px',
                  }}>
                    <button
                      className="complete-btn"
                      onClick={() => completeTask(task.id)}
                      style={{
                        width: 18, height: 18, borderRadius: 4, border: '1px solid #333',
                        background: 'transparent', cursor: 'pointer', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 10, color: '#555', transition: 'all 0.15s', marginTop: 1,
                      }}
                    >✓</button>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: '#e2e2e2', fontWeight: 500 }}>{task.title}</div>
                      {task.project && <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{task.project}</div>}
                    </div>
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                      background: `${PRIORITY_COLORS[task.priority]}22`,
                      color: PRIORITY_COLORS[task.priority],
                      border: `1px solid ${PRIORITY_COLORS[task.priority]}44`,
                      textTransform: 'uppercase', letterSpacing: 0.5, flexShrink: 0,
                    }}>{task.priority}</span>
                  </div>
                ))}
              </div>
            )}
            {myTasks.length > 3 && (
              <div style={{ fontSize: 11, color: '#555', marginTop: 12, textAlign: 'center' }}>+{myTasks.length - 3} more in Tasks</div>
            )}
          </div>

          {/* Brain Dump Widget */}
          <div style={{ background: '#111', border: `1px solid ${justSubmitted ? '#ffd70066' : '#252525'}`, borderRadius: 10, padding: 20, transition: 'border-color 0.3s' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 14 }}>Brain Dump</div>
            <textarea
              value={dumpContent}
              onChange={e => setDumpContent(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) submitDump() }}
              placeholder="What's on your mind? (⌘+Enter to send)"
              rows={5}
              style={{
                width: '100%', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 8,
                padding: '10px 12px', color: '#e2e2e2', fontSize: 13, resize: 'vertical',
                fontFamily: 'inherit', outline: 'none', lineHeight: 1.6,
                boxSizing: 'border-box',
              }}
            />
            {/* Tag selector */}
            <div style={{ display: 'flex', gap: 6, marginTop: 8, marginBottom: 10 }}>
              {(['idea', 'task', 'note', 'feeling'] as const).map(tag => (
                <button
                  key={tag}
                  onClick={() => setDumpTag(tag)}
                  style={{
                    fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
                    border: `1px solid ${dumpTag === tag ? TAG_COLORS[tag] : '#252525'}`,
                    background: dumpTag === tag ? `${TAG_COLORS[tag]}22` : 'transparent',
                    color: dumpTag === tag ? TAG_COLORS[tag] : '#555',
                    cursor: 'pointer', transition: 'all 0.15s', textTransform: 'uppercase', letterSpacing: 0.5,
                  }}
                >{tag}</button>
              ))}
            </div>
            <button
              className="dump-submit"
              onClick={submitDump}
              disabled={submitting || !dumpContent.trim()}
              style={{
                width: '100%', padding: '9px', borderRadius: 8,
                background: justSubmitted ? '#4ade8022' : '#ffd70022',
                border: `1px solid ${justSubmitted ? '#4ade80' : '#ffd700'}`,
                color: justSubmitted ? '#4ade80' : '#ffd700',
                fontWeight: 700, fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
                letterSpacing: 1, textTransform: 'uppercase',
                opacity: (!dumpContent.trim() || submitting) ? 0.4 : 1,
              }}
            >{justSubmitted ? '✓ Saved to memory' : submitting ? 'Saving...' : 'Save to Memory'}</button>

            {/* Recent dumps */}
            {dumps.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#333', marginBottom: 8 }}>Recent</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {dumps.slice(0, 3).map(d => (
                    <div key={d.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 100,
                        background: `${TAG_COLORS[d.tag]}22`, color: TAG_COLORS[d.tag],
                        border: `1px solid ${TAG_COLORS[d.tag]}44`, flexShrink: 0, marginTop: 1,
                        textTransform: 'uppercase',
                      }}>{d.tag}</span>
                      <span style={{ fontSize: 12, color: '#555', lineHeight: 1.4 }}>{d.content.slice(0, 70)}{d.content.length > 70 ? '…' : ''}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CENTRE — Live Event Stream */}
        <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 10, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555' }}>Live Activity</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 10, color: '#555' }}>Real-time</span>
            </div>
          </div>
          <div ref={eventListRef} style={{ flex: 1, overflowY: 'auto', maxHeight: 520 }}>
            {events.length === 0 ? (
              <div style={{ color: '#333', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>
                Waiting for agent activity...<br />
                <span style={{ fontSize: 11, marginTop: 8, display: 'block' }}>Agents will post here when they work</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {events.map((ev, i) => (
                  <div
                    key={ev.id}
                    className="event-row"
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '9px 8px', borderBottom: '1px solid #161616',
                      transition: 'background 0.15s',
                      animation: i === 0 ? 'fadeIn 0.3s ease-out' : undefined,
                    }}
                  >
                    <span style={{
                      fontSize: 12, width: 20, height: 20, borderRadius: '50%',
                      background: `${EVENT_COLORS[ev.type] ?? EVENT_COLORS.default}22`,
                      border: `1px solid ${EVENT_COLORS[ev.type] ?? EVENT_COLORS.default}44`,
                      color: EVENT_COLORS[ev.type] ?? EVENT_COLORS.default,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, fontSize: 10, fontWeight: 700,
                    }}>{EVENT_ICONS[ev.type] ?? EVENT_ICONS.default}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#e2e2e2' }}>{ev.agent_name ?? ev.agent_id}</span>
                        <span style={{
                          fontSize: 9, padding: '1px 5px', borderRadius: 3,
                          background: `${EVENT_COLORS[ev.type] ?? EVENT_COLORS.default}22`,
                          color: EVENT_COLORS[ev.type] ?? EVENT_COLORS.default,
                          fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
                        }}>{ev.type.replace('_', ' ')}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>{ev.detail}</div>
                    </div>
                    <span style={{ fontSize: 10, color: '#333', flexShrink: 0, marginTop: 1 }}>{timeAgo(ev.created_at)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT — Agent Status + Tasks breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Active Agents */}
          <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555' }}>The Office</div>
              <a href="/agents" style={{ fontSize: 10, color: '#ffd70088', textDecoration: 'none' }}>View all →</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {agents.slice(0, 10).map(agent => (
                <div key={agent.agent_id} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '7px 10px', borderRadius: 7,
                  background: agent.status === 'active' ? '#ffd70008' : '#0d0d0d',
                  border: `1px solid ${agent.status === 'active' ? '#ffd70022' : '#1a1a1a'}`,
                }}>
                  <StatusDot status={agent.status} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: agent.status === 'active' ? '#e2e2e2' : '#555' }}>{agent.name}</div>
                    {agent.current_task && agent.status === 'active' && (
                      <div style={{ fontSize: 10, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{agent.current_task}</div>
                    )}
                  </div>
                  {agent.model && (
                    <span style={{ fontSize: 9, color: '#333', flexShrink: 0 }}>{agent.model.includes('sonnet') ? 'S' : agent.model.includes('haiku') ? 'H' : 'O'}</span>
                  )}
                </div>
              ))}
              {agents.length > 10 && (
                <div style={{ fontSize: 11, color: '#444', textAlign: 'center', paddingTop: 4 }}>+{agents.length - 10} more agents</div>
              )}
            </div>
          </div>

          {/* Tasks breakdown */}
          <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555' }}>Tasks</div>
              <a href="/tasks" style={{ fontSize: 10, color: '#ffd70088', textDecoration: 'none' }}>Open board →</a>
            </div>
            {(['inbox', 'in_progress', 'review', 'done'] as const).map(status => {
              const count = tasks.filter(t => t.status === status).length
              const labels = { inbox: 'Inbox', in_progress: 'In Progress', review: 'Review', done: 'Done' }
              const colors = { inbox: '#555', in_progress: '#ffd700', review: '#60a5fa', done: '#4ade80' }
              return (
                <div key={status} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: '#666' }}>{labels[status]}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      height: 4, borderRadius: 2, background: `${colors[status]}44`,
                      width: Math.max(4, Math.min(80, count * 8)),
                      position: 'relative',
                    }}>
                      <div style={{ position: 'absolute', inset: 0, borderRadius: 2, background: colors[status], width: '100%' }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: colors[status], minWidth: 16, textAlign: 'right' }}>{count}</span>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}