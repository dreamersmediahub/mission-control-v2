'use client'
import { AgentStatus } from '@/types'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Bot, Clock, Cpu, Activity } from 'lucide-react'

const statusConfig: Record<string, { color: string; label: string; bg: string }> = {
  active:  { color: '#4ade80', label: 'Active',  bg: '#4ade8015' },
  idle:    { color: '#fbbf24', label: 'Idle',    bg: '#fbbf2415' },
  offline: { color: '#444',    label: 'Offline', bg: '#44444415' },
  error:   { color: '#f87171', label: 'Error',   bg: '#f8717115' },
}

export function AgentsClient({ agents: initial }: { agents: AgentStatus[] }) {
  const [agents, setAgents] = useState(initial)

  useEffect(() => {
    const channel = supabase
      .channel('agents-page')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agent_status' }, payload => {
        if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
          const updated = payload.new as AgentStatus
          setAgents(prev => {
            const exists = prev.some(a => a.agent_id === updated.agent_id)
            return exists
              ? prev.map(a => a.agent_id === updated.agent_id ? updated : a)
              : [...prev, updated]
          })
        }
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const sorted = [...agents].sort((a, b) => {
    const order = ['active', 'idle', 'offline', 'error']
    return order.indexOf(a.status) - order.indexOf(b.status)
  })

  const active = agents.filter(a => a.status === 'active').length

  return (
    <div className="p-6 max-w-[1400px]">
      <div className="mb-6">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#ffd700] mb-1">LIVE STATUS</p>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Bot size={22} className="text-[#ffd700]" /> The Office
        </h1>
        <p className="text-[#555] text-sm mt-0.5">{active} of {agents.length} agents active · updates live</p>
      </div>

      {/* Status counts */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {Object.entries(statusConfig).map(([status, cfg]) => (
          <div key={status} className="bg-[#111] border border-[#252525] rounded-xl p-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#555] uppercase tracking-wider font-medium">{cfg.label}</span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
            </div>
            <p className="text-2xl font-bold text-white mt-1">{agents.filter(a => a.status === status).length}</p>
          </div>
        ))}
      </div>

      {/* Agent grid */}
      {sorted.length === 0 ? (
        <div className="bg-[#111] border border-[#252525] rounded-xl p-12 text-center">
          <Bot size={40} className="mx-auto mb-4 text-[#252525]" />
          <p className="text-[#444] text-sm">No agents reporting yet.</p>
          <p className="text-[#333] text-xs mt-1">Run schema.sql in Supabase SQL Editor — seed rows will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {sorted.map(agent => {
            const cfg = statusConfig[agent.status] ?? statusConfig.offline
            return (
              <div key={agent.agent_id} className="bg-[#111] border border-[#252525] rounded-xl p-4 hover:border-[#303030] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-[#ffd700]"
                      style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.color}30` }}
                    >
                      {agent.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{agent.name}</p>
                      <p className="text-[10px] text-[#444]">{agent.model ?? 'No model'}</p>
                    </div>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}25` }}
                  >
                    {cfg.label}
                  </span>
                </div>

                {agent.current_task && (
                  <div className="mb-3 p-2.5 bg-[#0d0d0d] rounded-lg border border-[#1a1a1a]">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Activity size={10} className="text-[#ffd700]" />
                      <span className="text-[9px] text-[#555] uppercase tracking-wider">Current Task</span>
                    </div>
                    <p className="text-xs text-[#aaa]">{agent.current_task}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] text-[#444]">
                  <div className="flex items-center gap-1">
                    <Clock size={10} />
                    <span>{agent.last_seen ? new Date(agent.last_seen).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' }) : 'Never'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Cpu size={10} />
                    <span>{agent.sessions_today} sessions</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Curl reference */}
      <div className="mt-8 bg-[#111] border border-[#252525] rounded-xl p-4">
        <h3 className="text-sm font-semibold text-white mb-1">Agent Heartbeat — Curl Pattern</h3>
        <p className="text-[11px] text-[#444] mb-3">Paste this in your agent's system prompt or on_session_start hook:</p>
        <pre className="text-[11px] text-[#4ade80] bg-[#080808] rounded-lg p-3 overflow-x-auto border border-[#1a1a1a] leading-relaxed">{`# Report status to Mission Control
curl -s -X PATCH "https://knqpntvcooijqaaowjua.supabase.co/rest/v1/agent_status?agent_id=eq.AGENT_ID" \\
  -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtucXBudHZjb29panFhYW93anVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzU0MjgsImV4cCI6MjA4NzYxMTQyOH0.2GDus8S3zJqG_LLkLE93AzbGq4WeFBTREt6RYHHaN_M" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtucXBudHZjb29panFhYW93anVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMzU0MjgsImV4cCI6MjA4NzYxMTQyOH0.2GDus8S3zJqG_LLkLE93AzbGq4WeFBTREt6RYHHaN_M" \\
  -H "Content-Type: application/json" \\
  -H "Prefer: return=minimal" \\
  -d '{"status":"active","current_task":"TASK DESCRIPTION","last_seen":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}'
# Replace AGENT_ID with: main | researcher | writer | editor | publisher | social | email | analytics | scheduler | finance`}</pre>
      </div>
    </div>
  )
}