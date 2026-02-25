// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { AgentStatus, AgentEvent, AgentMessage } from '@/types/database'

const ORG = {
  root: { id: 'main', name: 'Theo', role: 'Chief of Staff', emoji: '🧠' },
  architects: [
    { id: 'dev-arch', name: 'Dev Arch', role: 'Engineering Lead', emoji: '⚙️' },
    { id: 'ops-arch', name: 'Ops Arch', role: 'Operations Lead', emoji: '📊' },
    { id: 'comms-arch', name: 'Comms Arch', role: 'Content Lead', emoji: '🎬' },
    { id: 'wellness-arch', name: 'Wellness Arch', role: 'Health Lead', emoji: '💊' },
    { id: 'memory-arch', name: 'Memory Arch', role: 'Knowledge Lead', emoji: '📚' },
  ],
  specials: [
    { id: 'kyle-brain', name: 'Kyle Brain', role: 'Personal Mirror', emoji: '🪞' },
    { id: 'dm-brain', name: 'DM Brain', role: 'Business Intelligence', emoji: '💼' },
    { id: 'alex', name: 'Alex', role: 'External Agent', emoji: '🤝' },
  ],
  workers: [
    { id: 'researcher', name: 'Researcher', role: 'Research', emoji: '🔍' },
    { id: 'writer', name: 'Writer', role: 'Copy & Scripts', emoji: '✍️' },
    { id: 'editor', name: 'Editor', role: 'Editing', emoji: '✂️' },
    { id: 'publisher', name: 'Publisher', role: 'Publishing', emoji: '📤' },
    { id: 'social', name: 'Social', role: 'Social Media', emoji: '📱' },
    { id: 'email', name: 'Email', role: 'Email Management', emoji: '📧' },
    { id: 'analytics', name: 'Analytics', role: 'Data & Reports', emoji: '📈' },
    { id: 'scheduler', name: 'Scheduler', role: 'Cron Jobs', emoji: '⏰' },
    { id: 'finance', name: 'Finance', role: 'Financial Tracking', emoji: '💰' },
    { id: 'notion-worker', name: 'Notion', role: 'Notion Sync', emoji: '📝' },
    { id: 'xero-worker', name: 'Xero', role: 'Xero Accounting', emoji: '🧾' },
    { id: 'podcast-worker', name: 'Podcast', role: 'Podcast Production', emoji: '🎙️' },
    { id: 'youtube-worker', name: 'YouTube', role: 'YouTube Management', emoji: '▶️' },
    { id: 'seo-worker', name: 'SEO', role: 'Search Optimisation', emoji: '🔎' },
    { id: 'health-worker', name: 'Health', role: 'Health Tracking', emoji: '🏃' },
    { id: 'brief-worker', name: 'Brief', role: 'Daily Brief', emoji: '☀️' },
    { id: 'data-worker', name: 'Data', role: 'Data Processing', emoji: '🗄️' },
    { id: 'invoice-worker', name: 'Invoice', role: 'Invoice Management', emoji: '📄' },
    { id: 'braindump-worker', name: 'Braindump', role: 'Memory Processing', emoji: '💡' },
  ]
}

function StatusDot({ status, size = 8 }: { status: string, size?: number }) {
  const colors = { active: '#4ade80', idle: '#ffd700', offline: '#333' }
  return (
    <span style={{
      display: 'inline-block', width: size, height: size, borderRadius: '50%',
      background: colors[status] ?? '#333', flexShrink: 0,
      boxShadow: status === 'active' ? `0 0 0 ${size/2}px ${colors.active}33` : undefined,
      animation: status === 'active' ? 'pulse 2s infinite' : undefined,
    }} />
  )
}

function AgentCard({ agent, statusMap, onClick }: {
  agent: { id: string; name: string; role: string; emoji: string },
  statusMap: Map<string, AgentStatus>,
  onClick: () => void
}) {
  const status = statusMap.get(agent.id)
  const s = status?.status ?? 'offline'
  const isActive = s === 'active'

  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? '#111' : '#0a0a0a',
        border: `1px solid ${isActive ? '#ffd70033' : '#1a1a1a'}`,
        borderRadius: 10, padding: '14px 14px', cursor: 'pointer',
        transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffd70066'; e.currentTarget.style.background = '#141414' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = isActive ? '#ffd70033' : '#1a1a1a'; e.currentTarget.style.background = isActive ? '#111' : '#0a0a0a' }}
    >
      {isActive && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #ffd700, transparent)',
          animation: 'shimmer 2s infinite',
        }} />
      )}
      <div style={{ fontSize: 22, marginBottom: 8 }}>{agent.emoji}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <StatusDot status={s} />
        <span style={{ fontSize: 12, fontWeight: 700, color: isActive ? '#fff' : '#555' }}>{agent.name}</span>
      </div>
      <div style={{ fontSize: 10, color: '#444', marginBottom: 6 }}>{agent.role}</div>
      {status?.current_task && isActive && (
        <div style={{ fontSize: 10, color: '#888', background: '#0d0d0d', borderRadius: 4, padding: '4px 6px', lineHeight: 1.4, marginTop: 4 }}>
          {status.current_task.slice(0, 50)}{status.current_task.length > 50 ? '…' : ''}
        </div>
      )}
      {status?.last_seen && s !== 'active' && (
        <div style={{ fontSize: 9, color: '#333', marginTop: 4 }}>
          {new Date(status.last_seen).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
      {status?.model && (
        <div style={{ position: 'absolute', top: 10, right: 10, fontSize: 9, color: '#333', fontWeight: 700 }}>
          {status.model.includes('sonnet') ? 'S4' : status.model.includes('haiku') ? 'H' : status.model.includes('opus') ? 'O' : '?'}
        </div>
      )}
    </div>
  )
}

export default function AgentsClient({
  agents: initialAgents,
  events: initialEvents,
  messages: initialMessages,
}: {
  agents: AgentStatus[]
  events: AgentEvent[]
  messages: AgentMessage[]
}) {
  const [agents, setAgents] = useState(initialAgents)
  const [events, setEvents] = useState(initialEvents)
  const [messages, setMessages] = useState(initialMessages)
  const [view, setView] = useState<'grid' | 'org' | 'comms'>('grid')
  const [selected, setSelected] = useState<string | null>(null)

  const statusMap = new Map(agents.map(a => [a.agent_id, a]))
  const allOrgAgents = [
    ORG.root,
    ...ORG.architects,
    ...ORG.specials,
    ...ORG.workers,
  ]

  useEffect(() => {
    const sub = supabase
      .channel('agents-office')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agent_status' }, (payload) => {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
          setAgents(prev => {
            const idx = prev.findIndex(a => a.agent_id === payload.new.agent_id)
            if (idx >= 0) { const n = [...prev]; n[idx] = payload.new; return n }
            return [...prev, payload.new]
          })
        }
      })
      .subscribe()

    const evSub = supabase
      .channel('events-office')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'events' }, (payload) => {
        setEvents(prev => [payload.new, ...prev].slice(0, 100))
      })
      .subscribe()

    const msgSub = supabase
      .channel('messages-office')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'agent_messages' }, (payload) => {
        setMessages(prev => [payload.new, ...prev].slice(0, 50))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(sub)
      supabase.removeChannel(evSub)
      supabase.removeChannel(msgSub)
    }
  }, [])

  const activeCount = agents.filter(a => a.status === 'active').length
  const selectedAgent = selected ? (statusMap.get(selected) ?? null) : null
  const selectedMeta = allOrgAgents.find(a => a.id === selected)
  const agentEvents = selected ? events.filter(e => e.agent_id === selected) : []

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.4); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        .tab-btn { cursor: pointer; transition: all 0.15s; }
        .tab-btn:hover { color: #fff !important; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ffd700', textTransform: 'uppercase', marginBottom: 6 }}>The Office</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Agents Live</h1>
          <div style={{ color: '#555', fontSize: 13, marginTop: 4 }}>
            <span style={{ color: '#4ade80' }}>●</span> {activeCount} active · {agents.filter(a => a.status === 'idle').length} idle · {agents.filter(a => a.status === 'offline').length} offline
          </div>
        </div>
        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: 4, background: '#111', border: '1px solid #252525', borderRadius: 8, padding: 4 }}>
          {(['grid', 'org', 'comms'] as const).map(v => (
            <button
              key={v}
              className="tab-btn"
              onClick={() => setView(v)}
              style={{
                padding: '6px 16px', borderRadius: 6, border: 'none',
                background: view === v ? '#252525' : 'transparent',
                color: view === v ? '#ffd700' : '#555',
                fontWeight: view === v ? 700 : 400, fontSize: 12,
                textTransform: 'capitalize',
              }}
            >{v === 'org' ? 'Org Chart' : v === 'comms' ? 'Comms Log' : 'Grid View'}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>

          {/* GRID VIEW */}
          {view === 'grid' && (
            <div>
              {/* Theo featured */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#333', marginBottom: 8 }}>Chief of Staff</div>
                {(() => {
                  const agent = ORG.root
                  const status = statusMap.get(agent.id)
                  const s = status?.status ?? 'offline'
                  return (
                    <div
                      onClick={() => setSelected(agent.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        background: '#111', border: `1px solid ${s === 'active' ? '#ffd70066' : '#252525'}`,
                        borderRadius: 12, padding: '16px 20px', cursor: 'pointer',
                        maxWidth: 420, transition: 'all 0.2s',
                      }}
                    >
                      <div style={{ fontSize: 32 }}>{agent.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <StatusDot status={s} size={10} />
                          <span style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{agent.name}</span>
                          {status?.model && <span style={{ fontSize: 10, color: '#555', background: '#1a1a1a', padding: '2px 6px', borderRadius: 4 }}>{status.model}</span>}
                        </div>
                        <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{agent.role}</div>
                        {status?.current_task && s === 'active' && (
                          <div style={{ fontSize: 12, color: '#888', marginTop: 6, background: '#0d0d0d', borderRadius: 6, padding: '6px 8px' }}>{status.current_task}</div>
                        )}
                      </div>
                      {status?.sessions_today > 0 && (
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: 22, fontWeight: 800, color: '#ffd700' }}>{status.sessions_today}</div>
                          <div style={{ fontSize: 9, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>sessions today</div>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>

              {/* Architects */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#333', marginBottom: 8 }}>Architects</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                  {ORG.architects.map(agent => (
                    <AgentCard key={agent.id} agent={agent} statusMap={statusMap} onClick={() => setSelected(agent.id)} />
                  ))}
                </div>
              </div>

              {/* Specials */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#333', marginBottom: 8 }}>Specialists</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                  {ORG.specials.map(agent => (
                    <AgentCard key={agent.id} agent={agent} statusMap={statusMap} onClick={() => setSelected(agent.id)} />
                  ))}
                </div>
              </div>

              {/* Workers */}
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#333', marginBottom: 8 }}>Workers</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
                  {ORG.workers.map(agent => (
                    <AgentCard key={agent.id} agent={agent} statusMap={statusMap} onClick={() => setSelected(agent.id)} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ORG CHART */}
          {view === 'org' && (
            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 12, padding: 32, overflowX: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, minWidth: 900 }}>
                {/* Theo */}
                <div style={{ marginBottom: 0 }}>
                  <div
                    onClick={() => setSelected(ORG.root.id)}
                    style={{
                      background: '#111', border: `2px solid ${statusMap.get(ORG.root.id)?.status === 'active' ? '#ffd700' : '#333'}`,
                      borderRadius: 12, padding: '12px 20px', cursor: 'pointer', textAlign: 'center', minWidth: 120,
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{ORG.root.emoji}</div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>{ORG.root.name}</div>
                    <div style={{ fontSize: 10, color: '#555' }}>{ORG.root.role}</div>
                    <StatusDot status={statusMap.get(ORG.root.id)?.status ?? 'offline'} />
                  </div>
                </div>

                {/* Connector line */}
                <div style={{ width: 2, height: 32, background: '#252525' }} />

                {/* Horizontal line across architects */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  {ORG.architects.map((arch, i) => {
                    const s = statusMap.get(arch.id)?.status ?? 'offline'
                    return (
                      <div key={arch.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                        <div style={{ width: 2, height: 24, background: '#252525' }} />
                        <div
                          onClick={() => setSelected(arch.id)}
                          style={{
                            background: '#111', border: `1px solid ${s === 'active' ? '#ffd70044' : '#252525'}`,
                            borderRadius: 10, padding: '10px 14px', cursor: 'pointer', textAlign: 'center', minWidth: 100,
                          }}
                        >
                          <div style={{ fontSize: 18, marginBottom: 3 }}>{arch.emoji}</div>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 2 }}>
                            <StatusDot status={s} size={6} />
                            <span style={{ fontSize: 11, fontWeight: 700, color: s === 'active' ? '#fff' : '#555' }}>{arch.name}</span>
                          </div>
                          <div style={{ fontSize: 9, color: '#333' }}>{arch.role}</div>
                        </div>

                        {/* Workers under each arch */}
                        <div style={{ width: 2, height: 20, background: '#1a1a1a' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%', maxWidth: 110 }}>
                          {ORG.workers.slice(i * 3, i * 3 + 3).map(worker => {
                            const ws = statusMap.get(worker.id)?.status ?? 'offline'
                            return (
                              <div
                                key={worker.id}
                                onClick={() => setSelected(worker.id)}
                                style={{
                                  background: '#0d0d0d', border: `1px solid #1a1a1a`,
                                  borderRadius: 6, padding: '6px 8px', cursor: 'pointer',
                                  display: 'flex', alignItems: 'center', gap: 5,
                                }}
                              >
                                <StatusDot status={ws} size={5} />
                                <span style={{ fontSize: 10, color: ws === 'active' ? '#e2e2e2' : '#444' }}>{worker.emoji} {worker.name}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* COMMS LOG */}
          {view === 'comms' && (
            <div style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>Agent Communication Log</div>
              {messages.length === 0 ? (
                <div style={{ color: '#333', fontSize: 13, textAlign: 'center', padding: '40px 0' }}>
                  No inter-agent messages yet.<br />
                  <span style={{ fontSize: 11, display: 'block', marginTop: 8 }}>When agents delegate to each other, it appears here.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {messages.map(msg => (
                    <div key={msg.id} style={{
                      background: '#111', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 14px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#ffd700' }}>{msg.from_agent_name ?? msg.from_agent_id}</span>
                        <span style={{ fontSize: 10, color: '#444' }}>→</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa' }}>{msg.to_agent_name ?? msg.to_agent_id ?? 'broadcast'}</span>
                        <span style={{ fontSize: 9, color: '#333', marginLeft: 'auto' }}>
                          {new Date(msg.created_at).toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {msg.message && <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{msg.message}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* AGENT DETAIL DRAWER */}
        {selected && (
          <div style={{
            width: 280, background: '#111', border: '1px solid #252525', borderRadius: 12, padding: 20,
            flexShrink: 0, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>{selectedMeta?.emoji ?? '🤖'}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{selectedAgent?.name ?? selectedMeta?.name}</div>
                  <div style={{ fontSize: 11, color: '#555' }}>{selectedMeta?.role}</div>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background: 'transparent', border: 'none', color: '#555', fontSize: 16, cursor: 'pointer', padding: 4 }}
              >✕</button>
            </div>

            {selectedAgent && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <div style={{
                    flex: 1, background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 11, color: '#555', marginBottom: 4 }}>Status</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                      <StatusDot status={selectedAgent.status} size={8} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#e2e2e2', textTransform: 'capitalize' }}>{selectedAgent.status}</span>
                    </div>
                  </div>
                  <div style={{
                    flex: 1, background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: 11, color: '#555', marginBottom: 4 }}>Sessions</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#ffd700' }}>{selectedAgent.sessions_today ?? 0}</div>
                  </div>
                </div>

                {selectedAgent.current_task && (
                  <div style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#555', marginBottom: 6 }}>Current Task</div>
                    <div style={{ fontSize: 12, color: '#e2e2e2', lineHeight: 1.5 }}>{selectedAgent.current_task}</div>
                  </div>
                )}

                {selectedAgent.model && (
                  <div style={{ background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#555', marginBottom: 4 }}>Model</div>
                    <div style={{ fontSize: 12, color: '#60a5fa' }}>{selectedAgent.model}</div>
                  </div>
                )}

                {selectedAgent.last_seen && (
                  <div style={{ fontSize: 11, color: '#444' }}>
                    Last seen: {new Date(selectedAgent.last_seen).toLocaleString('en-IE')}
                  </div>
                )}
              </div>
            )}

            {/* Recent events for this agent */}
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#333', marginBottom: 8 }}>Recent Activity</div>
              {agentEvents.length === 0 ? (
                <div style={{ fontSize: 11, color: '#333', textAlign: 'center', padding: '16px 0' }}>No activity yet</div>
              ) : (
                agentEvents.slice(0, 8).map(ev => (
                  <div key={ev.id} style={{ borderBottom: '1px solid #161616', paddingBottom: 8, marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: 10, color: '#ffd70088', fontWeight: 700 }}>{ev.type.replace('_', ' ')}</span>
                      <span style={{ fontSize: 9, color: '#333' }}>{new Date(ev.created_at).toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {ev.detail && <div style={{ fontSize: 11, color: '#555', lineHeight: 1.4 }}>{ev.detail}</div>}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}