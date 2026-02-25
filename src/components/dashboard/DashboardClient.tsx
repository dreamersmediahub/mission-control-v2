// @ts-nocheck
'use client'
import { AgentStatus, Task, Memory, ContentItem } from '@/types'
import { Bot, CheckSquare, Zap, FileText } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

interface Props {
  agents: AgentStatus[]
  tasks: Task[]
  memories: Memory[]
  content: ContentItem[]
  stats: { activeAgents: number; totalAgents: number; todayTasks: number; doneTasks: number }
}

const statusColors: Record<string, string> = {
  active:  '#4ade80',
  idle:    '#fbbf24',
  offline: '#444',
  error:   '#f87171',
}

export function DashboardClient({ agents: initialAgents, tasks: initialTasks, memories, content, stats: initialStats }: Props) {
  const [agents, setAgents] = useState(initialAgents)
  const [stats, setStats] = useState(initialStats)

  useEffect(() => {
    const channel = supabase
      .channel('dashboard-agents')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agent_status' }, payload => {
        setAgents(prev => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            const updated = payload.new as AgentStatus
            const exists = prev.some(a => a.agent_id === updated.agent_id)
            const next = exists
              ? prev.map(a => a.agent_id === updated.agent_id ? updated : a)
              : [...prev, updated]
            setStats(s => ({ ...s, activeAgents: next.filter(a => a.status === 'active').length, totalAgents: next.length }))
            return next
          }
          return prev
        })
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const inProgress = initialTasks.filter(t => t.status === 'in_progress').slice(0, 4)
  const todo = initialTasks.filter(t => t.status === 'todo').slice(0, 4)

  return (
    <div className="p-6 max-w-[1400px]">
      {/* Header */}
      <div className="mb-6">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#ffd700] mb-1">DREAMERS MEDIA</p>
        <h1 className="text-2xl font-bold text-white">Mission Control</h1>
        <p className="text-[#555] text-sm mt-0.5">
          {new Date().toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Active Agents',  value: `${stats.activeAgents}/${stats.totalAgents}`, icon: Bot,         color: '#4ade80', sub: 'running now' },
          { label: 'Open Tasks',     value: stats.todayTasks,                              icon: CheckSquare, color: '#ffd700', sub: `${stats.doneTasks} done` },
          { label: 'Memory Entries', value: memories.length,                              icon: Zap,         color: '#c084fc', sub: 'recent' },
          { label: 'Content Items',  value: content.length,                               icon: FileText,    color: '#60a5fa', sub: 'in pipeline' },
        ].map(({ label, value, icon: Icon, color, sub }) => (
          <div key={label} className="bg-[#111] border border-[#252525] rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[11px] text-[#555] uppercase tracking-wider font-medium mb-1">{label}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-[11px] text-[#555] mt-0.5">{sub}</p>
              </div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '15', border: `1px solid ${color}30` }}>
                <Icon size={16} style={{ color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Agents + Tasks */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Agent Status */}
        <div className="col-span-2 bg-[#111] border border-[#252525] rounded-xl p-4">
          <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Bot size={14} className="text-[#ffd700]" /> Agent Status
            <span className="ml-auto text-[10px] text-[#444] font-normal">live</span>
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {agents.length === 0 ? (
              <div className="col-span-2 text-center py-8">
                <p className="text-[#333] text-sm">No agents reporting yet.</p>
                <p className="text-[#2a2a2a] text-xs mt-1">Run schema.sql in Supabase SQL Editor to get started.</p>
              </div>
            ) : agents.map(agent => (
              <div key={agent.agent_id} className="flex items-center gap-3 p-2.5 bg-[#0d0d0d] rounded-lg border border-[#1a1a1a]">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-[#181818] flex items-center justify-center text-[11px] font-bold text-[#ffd700]">
                    {agent.name[0]}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#111]" style={{ backgroundColor: statusColors[agent.status] ?? '#444' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{agent.name}</p>
                  <p className="text-[10px] text-[#555] truncate">{agent.current_task ?? agent.status}</p>
                </div>
                {agent.sessions_today > 0 && <p className="text-[9px] text-[#333] shrink-0">{agent.sessions_today}s</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Tasks snapshot */}
        <div className="bg-[#111] border border-[#252525] rounded-xl p-4">
          <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <CheckSquare size={14} className="text-[#ffd700]" /> Active Tasks
          </h2>
          {inProgress.length === 0 && todo.length === 0 ? (
            <p className="text-[#333] text-sm text-center py-6">No tasks yet.</p>
          ) : (
            <div className="space-y-2">
              {inProgress.map(task => (
                <div key={task.id} className="p-2.5 bg-[#0d0d0d] rounded-lg border border-[#ffd700]/10">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ffd700]" />
                    <span className="text-[9px] text-[#ffd700] font-medium uppercase tracking-wider">In Progress</span>
                  </div>
                  <p className="text-xs text-white leading-relaxed">{task.title}</p>
                </div>
              ))}
              {todo.map(task => (
                <div key={task.id} className="p-2.5 bg-[#0d0d0d] rounded-lg border border-[#1a1a1a]">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#333]" />
                    <span className="text-[9px] text-[#444] font-medium uppercase tracking-wider">Todo</span>
                  </div>
                  <p className="text-xs text-white leading-relaxed">{task.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Memory */}
      <div className="bg-[#111] border border-[#252525] rounded-xl p-4">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Zap size={14} className="text-[#c084fc]" /> Recent Memory
        </h2>
        {memories.length === 0 ? (
          <p className="text-[#333] text-sm text-center py-4">No memories yet. Agents write here automatically.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {memories.map(m => (
              <div key={m.id} className="p-3 bg-[#0d0d0d] rounded-lg border border-[#1a1a1a]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="px-1.5 py-0.5 bg-[#c084fc]/10 border border-[#c084fc]/20 rounded text-[9px] text-[#c084fc] font-medium">{m.tag}</span>
                  <span className="text-[9px] text-[#333]">{m.source}</span>
                </div>
                <p className="text-xs text-[#aaa] line-clamp-2">{m.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}