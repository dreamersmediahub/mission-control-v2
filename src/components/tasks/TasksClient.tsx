// @ts-nocheck
'use client'
import { Task } from '@/types'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { CheckSquare, Plus } from 'lucide-react'

const columns: { id: Task['status']; label: string; color: string }[] = [
  { id: 'todo',        label: 'To Do',      color: '#555' },
  { id: 'in_progress', label: 'In Progress', color: '#ffd700' },
  { id: 'blocked',     label: 'Blocked',     color: '#f87171' },
  { id: 'done',        label: 'Done',        color: '#4ade80' },
]

const priorityColors: Record<string, string> = {
  urgent: '#f87171',
  high:   '#fb923c',
  medium: '#ffd700',
  low:    '#555',
}

export function TasksClient({ tasks: initial }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState<Task[]>(initial)
  const [adding, setAdding] = useState(false)
  const [newTitle, setNewTitle] = useState('')

  async function addTask() {
    if (!newTitle.trim()) return
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title: newTitle.trim(), status: 'todo' as const, priority: 'medium' as const, assignee: 'kyle', position: 0 }])
      .select()
      .single()
    if (data) {
      setTasks(prev => [data as Task, ...prev])
      setNewTitle('')
      setAdding(false)
    }
  }

  async function moveTask(taskId: string, newStatus: Task['status']) {
    await supabase
      .from('tasks')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', taskId)
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#ffd700] mb-1">KANBAN</p>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CheckSquare size={22} className="text-[#ffd700]" /> Tasks Board
          </h1>
          <p className="text-[#555] text-sm mt-0.5">{tasks.filter(t => t.status !== 'done').length} open · {tasks.filter(t => t.status === 'done').length} done</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-3 py-2 bg-[#ffd700] text-[#0a0a0a] rounded-lg text-sm font-semibold hover:bg-[#f0c800] transition-colors"
        >
          <Plus size={14} /> Add Task
        </button>
      </div>

      {adding && (
        <div className="mb-4 flex gap-2">
          <input
            autoFocus
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addTask(); if (e.key === 'Escape') setAdding(false) }}
            placeholder="Task title... (Enter to add)"
            className="flex-1 bg-[#111] border border-[#ffd700]/30 rounded-lg px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-[#ffd700]/60"
          />
          <button onClick={addTask} className="px-3 py-2 bg-[#ffd700] text-[#0a0a0a] rounded-lg text-sm font-medium">Add</button>
          <button onClick={() => setAdding(false)} className="px-3 py-2 bg-[#111] border border-[#252525] text-[#555] rounded-lg text-sm">Cancel</button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id)
          return (
            <div key={col.id} className="bg-[#111] border border-[#252525] rounded-xl overflow-hidden">
              <div className="px-3 py-2.5 border-b border-[#252525] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: col.color }} />
                  <span className="text-xs font-semibold text-white">{col.label}</span>
                </div>
                <span className="text-[10px] text-[#444] bg-[#1a1a1a] px-1.5 py-0.5 rounded">{colTasks.length}</span>
              </div>
              <div className="p-2 space-y-2 min-h-[300px]">
                {colTasks.map(task => (
                  <div key={task.id} className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-lg p-2.5 hover:border-[#2e2e2e] transition-colors group">
                    <div className="flex items-start justify-between gap-1">
                      <p className="text-xs text-white leading-relaxed flex-1">{task.title}</p>
                      <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ backgroundColor: priorityColors[task.priority] }} />
                    </div>
                    {task.source_agent && (
                      <p className="text-[9px] text-[#444] mt-1">via {task.source_agent}</p>
                    )}
                    <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex-wrap">
                      {columns.filter(c => c.id !== col.id).map(c => (
                        <button
                          key={c.id}
                          onClick={() => moveTask(task.id, c.id)}
                          className="text-[9px] px-1.5 py-0.5 rounded text-[#555] hover:text-white bg-[#1a1a1a] hover:bg-[#252525] transition-colors"
                        >
                          → {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}