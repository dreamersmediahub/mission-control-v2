// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Task } from '@/types/database'

const COLUMNS = [
  { id: 'inbox', label: 'Inbox', color: '#555' },
  { id: 'assigned', label: 'Assigned', color: '#60a5fa' },
  { id: 'in_progress', label: 'In Progress', color: '#ffd700' },
  { id: 'review', label: 'Review', color: '#c084fc' },
  { id: 'done', label: 'Done', color: '#4ade80' },
]

const PRIORITY_COLORS = { urgent: '#f87171', high: '#fb923c', medium: '#ffd700', low: '#555' }
const PRIORITY_ORDER = { urgent: 0, high: 1, medium: 2, low: 3 }

const PROJECTS = [
  { value: '', label: 'All Projects' },
  { value: 'client-work', label: 'Client Work' },
  { value: 'dreamers-internal', label: 'Dreamers Internal' },
  { value: 'personal', label: 'Personal' },
  { value: 'agent-owned', label: 'Agent Owned' },
]

function AgentChip({ assignee }: { assignee: string }) {
  const isKyle = assignee === 'kyle'
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 100,
      background: isKyle ? '#ffd70022' : '#60a5fa22',
      color: isKyle ? '#ffd700' : '#60a5fa',
      border: `1px solid ${isKyle ? '#ffd70044' : '#60a5fa44'}`,
      textTransform: 'uppercase', letterSpacing: 0.5,
    }}>{isKyle ? '👤 Kyle' : `🤖 ${assignee}`}</span>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
      background: `${PRIORITY_COLORS[priority] ?? '#555'}22`,
      color: PRIORITY_COLORS[priority] ?? '#555',
      border: `1px solid ${PRIORITY_COLORS[priority] ?? '#555'}44`,
      textTransform: 'uppercase', letterSpacing: 0.5,
    }}>{priority}</span>
  )
}

function TaskCard({ task, onMoveLeft, onMoveRight, onClick, isDone }: {
  task: Task
  onMoveLeft: () => void
  onMoveRight: () => void
  onClick: () => void
  isDone: boolean
}) {
  return (
    <div
      style={{
        background: isDone ? '#0d0d0d' : '#111',
        border: `1px solid ${isDone ? '#1a1a1a' : task.priority === 'urgent' ? '#f8717133' : '#1e1e1e'}`,
        borderRadius: 8, padding: '12px 12px', cursor: 'pointer',
        transition: 'all 0.15s', opacity: isDone ? 0.5 : 1,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffd70044'; e.currentTarget.style.background = '#141414' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = isDone ? '#1a1a1a' : task.priority === 'urgent' ? '#f8717133' : '#1e1e1e'; e.currentTarget.style.background = isDone ? '#0d0d0d' : '#111' }}
    >
      {/* Title */}
      <div
        onClick={onClick}
        style={{ fontSize: 12, fontWeight: 600, color: isDone ? '#444' : '#e2e2e2', lineHeight: 1.4, marginBottom: 8, textDecoration: isDone ? 'line-through' : 'none' }}
      >{task.title}</div>

      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 5, marginBottom: 8 }}>
        <AgentChip assignee={task.assignee} />
        <PriorityBadge priority={task.priority} />
        {task.project && (
          <span style={{ fontSize: 9, color: '#444', padding: '2px 6px', borderRadius: 4, background: '#0d0d0d', border: '1px solid #1a1a1a' }}>{task.project}</span>
        )}
      </div>

      {task.due_date && (
        <div style={{ fontSize: 10, color: new Date(task.due_date) < new Date() ? '#f87171' : '#555', marginBottom: 6 }}>
          📅 {new Date(task.due_date).toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })}
        </div>
      )}

      {/* Move arrows */}
      {!isDone && (
        <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
          <button
            onClick={e => { e.stopPropagation(); onMoveLeft() }}
            style={{ fontSize: 10, color: '#333', background: 'transparent', border: '1px solid #1a1a1a', borderRadius: 4, padding: '2px 6px', cursor: 'pointer' }}
            title="Move left"
          >←</button>
          <button
            onClick={e => { e.stopPropagation(); onMoveRight() }}
            style={{ fontSize: 10, color: '#333', background: 'transparent', border: '1px solid #1a1a1a', borderRadius: 4, padding: '2px 6px', cursor: 'pointer' }}
            title="Move right"
          >→</button>
        </div>
      )}
    </div>
  )
}

function TaskModal({ task, onClose, onSave }: { task: Task | null; onClose: () => void; onSave: (t: Partial<Task>) => void }) {
  const [editing, setEditing] = useState(task ?? {})

  if (!task) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }} onClick={onClose}>
      <div
        style={{
          background: '#111', border: '1px solid #252525', borderRadius: 14, padding: 28,
          width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', flex: 1, paddingRight: 12 }}>{task.title}</div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#555', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: '#555', textTransform: 'uppercase', marginBottom: 5 }}>Assignee</div>
            <AgentChip assignee={task.assignee} />
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: '#555', textTransform: 'uppercase', marginBottom: 5 }}>Priority</div>
            <PriorityBadge priority={task.priority} />
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: '#555', textTransform: 'uppercase', marginBottom: 5 }}>Project</div>
            <div style={{ fontSize: 12, color: '#888' }}>{task.project ?? 'None'}</div>
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: '#555', textTransform: 'uppercase', marginBottom: 5 }}>Status</div>
            <div style={{ fontSize: 12, color: '#888', textTransform: 'capitalize' }}>{task.status.replace('_', ' ')}</div>
          </div>
        </div>

        {task.description && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: '#555', textTransform: 'uppercase', marginBottom: 6 }}>Description</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.7, background: '#0d0d0d', borderRadius: 8, padding: '10px 12px' }}>{task.description}</div>
          </div>
        )}

        {task.original_request && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: '#555', textTransform: 'uppercase', marginBottom: 6 }}>Original Request</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.7, background: '#0d0d0d', borderRadius: 8, padding: '10px 12px' }}>{task.original_request}</div>
          </div>
        )}

        {task.skill_prompt && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, color: '#ffd70088', textTransform: 'uppercase', marginBottom: 6 }}>Skill Prompt</div>
            <div style={{ fontSize: 11, color: '#888', lineHeight: 1.7, background: '#0d0d0d', borderRadius: 8, padding: '10px 12px', fontFamily: 'monospace', border: '1px solid #ffd70022' }}>{task.skill_prompt}</div>
          </div>
        )}

        {task.source_agent && (
          <div style={{ fontSize: 11, color: '#444', marginTop: 8 }}>Created by: {task.source_agent}</div>
        )}
        <div style={{ fontSize: 11, color: '#333', marginTop: 4 }}>Created: {new Date(task.created_at).toLocaleString('en-IE')}</div>
      </div>
    </div>
  )
}

function AddTaskModal({ onClose, onAdd }: { onClose: () => void; onAdd: (t: Partial<Task>) => Promise<void> }) {
  const [form, setForm] = useState({ title: '', description: '', assignee: 'kyle', status: 'inbox', priority: 'medium', project: '', original_request: '', skill_prompt: '' })
  const [saving, setSaving] = useState(false)

  async function save() {
    if (!form.title.trim()) return
    setSaving(true)
    await onAdd(form)
    setSaving(false)
    onClose()
  }

  const inputStyle = {
    width: '100%', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 6,
    padding: '8px 10px', color: '#e2e2e2', fontSize: 12, fontFamily: 'inherit', outline: 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: '#111', border: '1px solid #252525', borderRadius: 14, padding: 28,
        width: '100%', maxWidth: 500,
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>New Task</div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#555', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input style={inputStyle} placeholder="Task title *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} placeholder="Description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <select style={{ ...inputStyle, appearance: 'none' }} value={form.assignee} onChange={e => setForm(p => ({ ...p, assignee: e.target.value }))}>
              <option value="kyle">Kyle</option>
              <option value="main">Theo (main)</option>
              <option value="dev-arch">Dev Arch</option>
              <option value="comms-arch">Comms Arch</option>
              <option value="ops-arch">Ops Arch</option>
            </select>
            <select style={{ ...inputStyle, appearance: 'none' }} value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <select style={{ ...inputStyle, appearance: 'none' }} value={form.project} onChange={e => setForm(p => ({ ...p, project: e.target.value }))}>
              {PROJECTS.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            <select style={{ ...inputStyle, appearance: 'none' }} value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
              {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>

          <input style={inputStyle} placeholder="Original request (why this task?)" value={form.original_request} onChange={e => setForm(p => ({ ...p, original_request: e.target.value }))} />
          <textarea style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace', fontSize: 11 }} rows={3} placeholder="Skill prompt (enough context for a fresh agent to pick it up)" value={form.skill_prompt} onChange={e => setForm(p => ({ ...p, skill_prompt: e.target.value }))} />
        </div>

        <button
          onClick={save}
          disabled={saving || !form.title.trim()}
          style={{
            width: '100%', marginTop: 16, padding: 10, borderRadius: 8,
            background: '#ffd70022', border: '1px solid #ffd700', color: '#ffd700',
            fontWeight: 700, fontSize: 12, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase',
            opacity: saving || !form.title.trim() ? 0.4 : 1,
          }}
        >{saving ? 'Adding...' : 'Add Task'}</button>
      </div>
    </div>
  )
}

export default function TasksClient({ tasks: initialTasks }: { tasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState<'all' | 'mine' | 'agents'>('all')
  const [projectFilter, setProjectFilter] = useState('')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [justDone, setJustDone] = useState<string | null>(null)

  useEffect(() => {
    const sub = supabase
      .channel('tasks-board')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
        if (payload.eventType === 'INSERT') setTasks(prev => [payload.new as Task, ...prev])
        if (payload.eventType === 'UPDATE') setTasks(prev => prev.map(t => t.id === payload.new.id ? payload.new as Task : t))
        if (payload.eventType === 'DELETE') setTasks(prev => prev.filter(t => t.id !== payload.old.id))
      })
      .subscribe()
    return () => supabase.removeChannel(sub)
  }, [])

  async function moveTask(task: Task, direction: 'left' | 'right') {
    const colIdx = COLUMNS.findIndex(c => c.id === task.status)
    const nextIdx = direction === 'right' ? colIdx + 1 : colIdx - 1
    if (nextIdx < 0 || nextIdx >= COLUMNS.length) return
    const newStatus = COLUMNS[nextIdx].id
    const updates: Partial<Task> = { status: newStatus as Task['status'] }
    if (newStatus === 'done') {
      updates.completed_at = new Date().toISOString()
      setJustDone(task.id)
      setTimeout(() => setJustDone(null), 1500)
    }
    await supabase.from('tasks').update(updates).eq('id', task.id)
  }

  async function addTask(data: Partial<Task>) {
    await supabase.from('tasks').insert([{ ...data, source_agent: 'kyle' }])
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'mine' && t.assignee !== 'kyle') return false
    if (filter === 'agents' && t.assignee === 'kyle') return false
    if (projectFilter && t.project !== projectFilter) return false
    return true
  })

  return (
    <div style={{ padding: '28px 32px', maxWidth: '100%' }}>
      <style>{`
        @keyframes goldFlash { 0%, 100% { background: #111; } 50% { background: #4ade8022; border-color: #4ade80 !important; } }
        .add-btn:hover { background: #ffd700 !important; color: #000 !important; }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ffd700', textTransform: 'uppercase', marginBottom: 6 }}>Dreamers Media</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Tasks Board</h1>
          <div style={{ color: '#555', fontSize: 13, marginTop: 4 }}>
            {tasks.filter(t => t.status !== 'done').length} open · {tasks.filter(t => t.status === 'done').length} done
          </div>
        </div>
        <button
          className="add-btn"
          onClick={() => setShowAdd(true)}
          style={{
            padding: '9px 20px', borderRadius: 8, background: '#ffd70022',
            border: '1px solid #ffd700', color: '#ffd700', fontWeight: 700,
            fontSize: 12, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase',
            transition: 'all 0.15s',
          }}
        >+ New Task</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {(['all', 'mine', 'agents'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '5px 14px', borderRadius: 6, border: `1px solid ${filter === f ? '#ffd700' : '#252525'}`,
              background: filter === f ? '#ffd70022' : 'transparent',
              color: filter === f ? '#ffd700' : '#555',
              fontSize: 11, fontWeight: 700, cursor: 'pointer', textTransform: 'capitalize',
            }}
          >{f === 'mine' ? 'My Tasks' : f === 'agents' ? 'Agent Tasks' : 'All'}</button>
        ))}
        <div style={{ width: 1, background: '#252525', margin: '0 4px' }} />
        {PROJECTS.map(p => (
          <button
            key={p.value}
            onClick={() => setProjectFilter(p.value)}
            style={{
              padding: '5px 14px', borderRadius: 6, border: `1px solid ${projectFilter === p.value ? '#60a5fa' : '#252525'}`,
              background: projectFilter === p.value ? '#60a5fa22' : 'transparent',
              color: projectFilter === p.value ? '#60a5fa' : '#555',
              fontSize: 11, fontWeight: 700, cursor: 'pointer',
            }}
          >{p.label}</button>
        ))}
      </div>

      {/* Kanban */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, alignItems: 'start' }}>
        {COLUMNS.map(col => {
          const colTasks = filteredTasks
            .filter(t => t.status === col.id)
            .sort((a, b) => (PRIORITY_ORDER[a.priority] ?? 2) - (PRIORITY_ORDER[b.priority] ?? 2))
          return (
            <div key={col.id}>
              {/* Column header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 10, padding: '0 2px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 3, height: 14, borderRadius: 2, background: col.color }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: 1 }}>{col.label}</span>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: col.color,
                  background: `${col.color}22`, border: `1px solid ${col.color}44`,
                  borderRadius: 100, padding: '1px 7px',
                }}>{colTasks.length}</span>
              </div>

              {/* Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    style={{
                      animation: justDone === task.id ? 'goldFlash 0.5s ease' : undefined,
                    }}
                  >
                    <TaskCard
                      task={task}
                      isDone={task.status === 'done'}
                      onMoveLeft={() => moveTask(task, 'left')}
                      onMoveRight={() => moveTask(task, 'right')}
                      onClick={() => setSelectedTask(task)}
                    />
                  </div>
                ))}
                {colTasks.length === 0 && (
                  <div style={{
                    border: '1px dashed #1a1a1a', borderRadius: 8, padding: '16px 12px',
                    textAlign: 'center', color: '#333', fontSize: 11,
                  }}>Empty</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} onSave={() => setSelectedTask(null)} />}
      {showAdd && <AddTaskModal onClose={() => setShowAdd(false)} onAdd={addTask} />}
    </div>
  )
}