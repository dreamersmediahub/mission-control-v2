'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function InboxClient(props: any) {
  const [tab, setTab] = useState('messages')
  const [messages, setMessages] = useState(props.messages || [])
  const [dumps, setDumps] = useState(props.brainDumps || [])
  const [events, setEvents] = useState(props.events || [])
  const [tasks, setTasks] = useState(props.newTasks || [])

  useEffect(() => {
    const sub = supabase.channel('inbox')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'agent_messages' }, (p: any) => {
        setMessages((prev: any[]) => [p.new, ...prev].slice(0, 50))
      })
      .subscribe()
    return () => {
      supabase.removeChannel(sub)
    }
  }, [])

  const markDone = async (id: string, type: string) => {
    if (type === 'dump') {
      await (supabase.from('brain_dumps') as any).update({ processed: true }).eq('id', id)
      setDumps((p: any[]) => p.filter((d: any) => d.id !== id))
    }
  }

  function timeAgo(ts: string) {
    const diff = Date.now() - new Date(ts).getTime()
    const m = Math.floor(diff / 60000)
    const h = Math.floor(diff / 3600000)
    const d = Math.floor(diff / 86400000)
    return diff < 60000 ? 'just now' : m < 60 ? `${m}m ago` : h < 24 ? `${h}h ago` : `${d}d ago`
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ffd700', textTransform: 'uppercase', marginBottom: 6 }}>Inbox Hub</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Process Items</h1>
        <div style={{ color: '#555', fontSize: 13, marginTop: 4 }}>Messages, brain dumps, and new tasks</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 24, borderBottom: '1px solid #252525', paddingBottom: 12 }}>
        {[
          { id: 'messages', label: 'Messages', icon: '💬', count: messages.length },
          { id: 'dumps', label: 'Brain Dumps', icon: '💡', count: dumps.length },
          { id: 'events', label: 'Activity', icon: '⚡', count: events.length },
          { id: 'tasks', label: 'Tasks', icon: '✅', count: tasks.length },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: '8px 16px',
              border: `1px solid ${tab === t.id ? '#ffd700' : '#252525'}`,
              background: tab === t.id ? '#ffd70015' : 'transparent',
              color: tab === t.id ? '#ffd700' : '#555',
              borderRadius: 8,
              fontSize: 13,
              cursor: 'pointer',
              fontWeight: tab === t.id ? 700 : 400,
              transition: 'all 0.2s',
            }}
          >
            {t.icon} {t.label}
            {t.count > 0 && <span style={{ marginLeft: 6, fontWeight: 700 }}>({t.count})</span>}
          </button>
        ))}
      </div>

      {tab === 'messages' && (
        <div>
          {messages.length === 0 ? (
            <div style={{ color: '#333', textAlign: 'center', padding: '40px', fontSize: 13 }}>No messages yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {messages.map((m: any) => (
                <div key={m.id} style={{ background: '#111', border: '1px solid #252525', borderRadius: 8, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#e2e2e2' }}>{m.from_agent_name || m.from_agent_id}</div>
                    <div style={{ fontSize: 10, color: '#333' }}>{timeAgo(m.created_at)}</div>
                  </div>
                  {m.message && <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.5 }}>{m.message}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'dumps' && (
        <div>
          {dumps.length === 0 ? (
            <div style={{ color: '#333', textAlign: 'center', padding: '40px', fontSize: 13 }}>All brain dumps processed! 🎉</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {dumps.map((d: any) => (
                <div key={d.id} style={{ background: '#111', border: '1px solid #252525', borderRadius: 8, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 9, background: '#ffd70022', color: '#ffd700', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>{d.tag}</span>
                    <div style={{ fontSize: 10, color: '#333' }}>{timeAgo(d.created_at)}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.5, marginBottom: 12 }}>{d.content}</div>
                  <button onClick={() => markDone(d.id, 'dump')} style={{ fontSize: 11, padding: '6px 12px', borderRadius: 6, border: '1px solid #4ade80', background: '#4ade8022', color: '#4ade80', cursor: 'pointer', fontWeight: 700 }}>Mark Processed</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'events' && (
        <div>
          {events.length === 0 ? (
            <div style={{ color: '#333', textAlign: 'center', padding: '40px', fontSize: 13 }}>No activity yet</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {events.map((e: any) => (
                <div key={e.id} style={{ background: '#111', border: '1px solid #252525', borderRadius: 8, padding: 12, display: 'flex', gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#e2e2e2', marginBottom: 2 }}>{e.agent_name || e.agent_id} · {e.type}</div>
                    <div style={{ fontSize: 12, color: '#666' }}>{e.detail}</div>
                  </div>
                  <div style={{ fontSize: 10, color: '#333', flexShrink: 0 }}>{timeAgo(e.created_at)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'tasks' && (
        <div>
          {tasks.length === 0 ? (
            <div style={{ color: '#333', textAlign: 'center', padding: '40px', fontSize: 13 }}>No inbox tasks</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tasks.map((t: any) => (
                <div key={t.id} style={{ background: '#111', border: '1px solid #252525', borderRadius: 8, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#e2e2e2' }}>{t.title}</div>
                      {t.description && <div style={{ fontSize: 11, color: '#666', marginTop: 4 }}>{t.description}</div>}
                    </div>
                    <span style={{ fontSize: 9, background: '#ffd70022', color: '#ffd700', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>{t.priority}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}