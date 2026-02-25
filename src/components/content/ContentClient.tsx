// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { ContentItem } from '@/types/database'

const STAGES = [
  { id: 'idea', label: 'Idea', color: '#ffd700', emoji: '💡' },
  { id: 'research', label: 'Research', color: '#60a5fa', emoji: '🔍' },
  { id: 'script', label: 'Script', color: '#c084fc', emoji: '✍️' },
  { id: 'thumbnail', label: 'Thumbnail', color: '#fb923c', emoji: '🖼️' },
  { id: 'filming', label: 'Filming', color: '#f87171', emoji: '🎥' },
  { id: 'editing', label: 'Editing', color: '#2dd4bf', emoji: '✂️' },
  { id: 'published', label: 'Published', color: '#4ade80', emoji: '🚀' },
]

const PLATFORMS = [
  { value: 'podcast', label: 'Podcast', emoji: '🎙️' },
  { value: 'youtube', label: 'YouTube', emoji: '▶️' },
  { value: 'instagram', label: 'Instagram', emoji: '📸' },
  { value: 'tiktok', label: 'TikTok', emoji: '🎵' },
  { value: 'twitter', label: 'Twitter/X', emoji: '𝕏' },
]

function ContentCard({ item, onClick, onMoveLeft, onMoveRight }: {
  item: ContentItem
  onClick: () => void
  onMoveLeft: () => void
  onMoveRight: () => void
}) {
  const platform = PLATFORMS.find(p => p.value === item.platform)
  const stageColor = STAGES.find(s => s.id === item.stage)?.color ?? '#555'

  return (
    <div
      style={{
        background: '#111', border: '1px solid #1e1e1e', borderRadius: 8,
        padding: '12px 12px', cursor: 'pointer', transition: 'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffd70044'; e.currentTarget.style.background = '#141414' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.background = '#111' }}
      onClick={onClick}
    >
      <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e2e2', lineHeight: 1.4, marginBottom: 8 }}>{item.title}</div>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
        {platform && (
          <span style={{
            fontSize: 9, padding: '2px 7px', borderRadius: 100, fontWeight: 700,
            background: '#1a1a1a', border: '1px solid #252525', color: '#888',
          }}>{platform.emoji} {platform.label}</span>
        )}
        {item.assigned_agent && (
          <span style={{
            fontSize: 9, padding: '2px 7px', borderRadius: 100, fontWeight: 700,
            background: '#60a5fa22', border: '1px solid #60a5fa44', color: '#60a5fa',
          }}>🤖 {item.assigned_agent}</span>
        )}
      </div>
      {item.publish_date && (
        <div style={{ fontSize: 10, color: '#555', marginBottom: 6 }}>📅 {new Date(item.publish_date + 'T12:00:00').toLocaleDateString('en-IE', { day: 'numeric', month: 'short' })}</div>
      )}
      <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
        <button onClick={e => { e.stopPropagation(); onMoveLeft() }} style={{ fontSize: 10, color: '#333', background: 'transparent', border: '1px solid #1a1a1a', borderRadius: 4, padding: '2px 6px', cursor: 'pointer' }}>←</button>
        <button onClick={e => { e.stopPropagation(); onMoveRight() }} style={{ fontSize: 10, color: '#333', background: 'transparent', border: '1px solid #1a1a1a', borderRadius: 4, padding: '2px 6px', cursor: 'pointer' }}>→</button>
      </div>
    </div>
  )
}

function ContentModal({ item, onClose }: { item: ContentItem | null; onClose: () => void }) {
  if (!item) return null
  const platform = PLATFORMS.find(p => p.value === item.platform)
  const stage = STAGES.find(s => s.id === item.stage)

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }} onClick={onClose}>
      <div style={{
        background: '#111', border: '1px solid #252525', borderRadius: 14, padding: 28,
        width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto',
      }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              {platform && <span style={{ fontSize: 16 }}>{platform.emoji}</span>}
              {stage && <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: `${stage.color}22`, color: stage.color, border: `1px solid ${stage.color}44` }}>{stage.emoji} {stage.label}</span>}
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>{item.title}</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#555', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>

        {item.notes && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#555', marginBottom: 6 }}>Notes</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.6, background: '#0d0d0d', borderRadius: 8, padding: '10px 12px' }}>{item.notes}</div>
          </div>
        )}

        {item.script && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#c084fc88', marginBottom: 6 }}>Script</div>
            <div style={{ fontSize: 12, color: '#888', lineHeight: 1.8, background: '#0d0d0d', borderRadius: 8, padding: '14px 16px', whiteSpace: 'pre-wrap', border: '1px solid #c084fc22', maxHeight: 400, overflowY: 'auto' }}>{item.script}</div>
          </div>
        )}

        {item.assigned_agent && (
          <div style={{ fontSize: 11, color: '#555' }}>Assigned to: {item.assigned_agent}</div>
        )}
      </div>
    </div>
  )
}

function AddContentModal({ onClose, onAdd }: { onClose: () => void; onAdd: (d: Partial<ContentItem>) => Promise<void> }) {
  const [form, setForm] = useState({ title: '', platform: 'podcast', stage: 'idea', notes: '' })
  const [saving, setSaving] = useState(false)
  const inputStyle = { width: '100%', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 6, padding: '8px 10px', color: '#e2e2e2', fontSize: 12, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={onClose}>
      <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 14, padding: 28, width: '100%', maxWidth: 440 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>New Content Idea</div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#555', fontSize: 18, cursor: 'pointer' }}>✕</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input style={inputStyle} placeholder="Title *" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <select style={{ ...inputStyle, appearance: 'none' }} value={form.platform} onChange={e => setForm(p => ({ ...p, platform: e.target.value }))}>
              {PLATFORMS.map(p => <option key={p.value} value={p.value}>{p.emoji} {p.label}</option>)}
            </select>
            <select style={{ ...inputStyle, appearance: 'none' }} value={form.stage} onChange={e => setForm(p => ({ ...p, stage: e.target.value }))}>
              {STAGES.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>)}
            </select>
          </div>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} placeholder="Notes / idea details" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
        </div>
        <button
          onClick={async () => { setSaving(true); await onAdd(form); setSaving(false); onClose() }}
          disabled={saving || !form.title.trim()}
          style={{ width: '100%', marginTop: 16, padding: 10, borderRadius: 8, background: '#ffd70022', border: '1px solid #ffd700', color: '#ffd700', fontWeight: 700, fontSize: 12, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', opacity: saving || !form.title.trim() ? 0.4 : 1 }}
        >{saving ? 'Adding...' : 'Add to Pipeline'}</button>
      </div>
    </div>
  )
}

export default function ContentClient({ content: initialContent }: { content: ContentItem[] }) {
  const [content, setContent] = useState(initialContent)
  const [selected, setSelected] = useState<ContentItem | null>(null)
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    const sub = supabase
      .channel('content-pipe')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'content' }, (payload) => {
        if (payload.eventType === 'INSERT') setContent(p => [payload.new as ContentItem, ...p])
        if (payload.eventType === 'UPDATE') setContent(p => p.map(c => c.id === payload.new.id ? payload.new as ContentItem : c))
      })
      .subscribe()
    return () => supabase.removeChannel(sub)
  }, [])

  async function moveItem(item: ContentItem, dir: 'left' | 'right') {
    const idx = STAGES.findIndex(s => s.id === item.stage)
    const next = dir === 'right' ? idx + 1 : idx - 1
    if (next < 0 || next >= STAGES.length) return
    await supabase.from('content').update({ stage: STAGES[next].id }).eq('id', item.id)
  }

  async function addItem(data: Partial<ContentItem>) {
    await supabase.from('content').insert([data])
  }

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ffd700', textTransform: 'uppercase', marginBottom: 6 }}>Dreamers Media</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Content Pipeline</h1>
          <div style={{ color: '#555', fontSize: 13, marginTop: 4 }}>{content.length} total · {content.filter(c => c.stage === 'published').length} published</div>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          style={{ padding: '9px 20px', borderRadius: 8, background: '#ffd70022', border: '1px solid #ffd700', color: '#ffd700', fontWeight: 700, fontSize: 12, cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase', transition: 'all 0.15s' }}
        >+ Add Idea</button>
      </div>

      {/* Pipeline */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, alignItems: 'start' }}>
        {STAGES.map(stage => {
          const items = content.filter(c => c.stage === stage.id)
          return (
            <div key={stage.id}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ fontSize: 13 }}>{stage.emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: stage.color, textTransform: 'uppercase', letterSpacing: 1 }}>{stage.label}</span>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: stage.color, background: `${stage.color}22`, border: `1px solid ${stage.color}44`, borderRadius: 100, padding: '1px 7px' }}>{items.length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map(item => (
                  <ContentCard
                    key={item.id}
                    item={item}
                    onClick={() => setSelected(item)}
                    onMoveLeft={() => moveItem(item, 'left')}
                    onMoveRight={() => moveItem(item, 'right')}
                  />
                ))}
                {items.length === 0 && (
                  <div style={{ border: '1px dashed #1a1a1a', borderRadius: 8, padding: '12px 8px', textAlign: 'center', color: '#222', fontSize: 11 }}>Empty</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selected && <ContentModal item={selected} onClose={() => setSelected(null)} />}
      {showAdd && <AddContentModal onClose={() => setShowAdd(false)} onAdd={addItem} />}
    </div>
  )
}