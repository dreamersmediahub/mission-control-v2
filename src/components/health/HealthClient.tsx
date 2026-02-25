// @ts-nocheck
'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { HealthLog } from '@/types/database'

const TODAY = new Date().toISOString().split('T')[0]

const INJECTIONS = [
  { key: 'ghk_cu', label: 'GHK-Cu', color: '#c084fc', note: 'Peptide / skin & repair' },
  { key: 'kpv_am', label: 'KPV (AM)', color: '#60a5fa', note: 'Anti-inflammatory morning' },
  { key: 'kpv_pm', label: 'KPV (PM)', color: '#60a5fa', note: 'Anti-inflammatory evening' },
  { key: 'reta', label: 'Reta', color: '#ffd700', note: 'Fridays only' },
]

const SUPPLEMENTS = [
  { key: 'dex_1', label: 'Dex Dose 1', color: '#f87171' },
  { key: 'dex_2', label: 'Dex Dose 2', color: '#f87171' },
  { key: 'dex_3', label: 'Dex Dose 3', color: '#f87171' },
  { key: 'dex_4', label: 'Dex Dose 4', color: '#f87171' },
  { key: 'mag', label: 'Magnesium', color: '#4ade80' },
  { key: 'iron', label: 'Iron', color: '#fb923c' },
  { key: 'b3', label: 'B3 / Niacin', color: '#2dd4bf' },
  { key: 'protein', label: 'Protein hit', color: '#60a5fa' },
]

function CheckBox({ checked, onChange, color }: { checked: boolean; onChange: (v: boolean) => void; color: string }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: 22, height: 22, borderRadius: 5,
        border: `2px solid ${checked ? color : '#252525'}`,
        background: checked ? `${color}22` : 'transparent',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, color: checked ? color : '#333', transition: 'all 0.15s', flexShrink: 0,
      }}
    >{checked ? '✓' : ''}</button>
  )
}

export default function HealthClient({ logs }: { logs: HealthLog[] }) {
  const todayLog = logs.find(l => l.date === TODAY)

  const [injections, setInjections] = useState<Record<string, boolean>>(
    todayLog?.injections ?? {}
  )
  const [supplements, setSupplements] = useState<Record<string, boolean>>(
    todayLog?.supplements ?? {}
  )
  const [energy, setEnergy] = useState<number>(todayLog?.energy_rating ?? 0)
  const [gym, setGym] = useState<boolean>(todayLog?.gym_done ?? false)
  const [weight, setWeight] = useState<string>(todayLog?.weight_kg?.toString() ?? '')
  const [sleep, setSleep] = useState<number>(todayLog?.sleep_quality ?? 0)
  const [notes, setNotes] = useState<string>(todayLog?.notes ?? '')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)

  const injDone = INJECTIONS.filter(i => injections[i.key]).length
  const supDone = SUPPLEMENTS.filter(s => supplements[s.key]).length

  async function saveToday() {
    setSaving(true)
    const row = {
      date: TODAY,
      injections,
      supplements,
      energy_rating: energy || null,
      gym_done: gym,
      weight_kg: weight ? parseFloat(weight) : null,
      sleep_quality: sleep || null,
      notes: notes || null,
    }
    await supabase.from('health_logs').upsert([row], { onConflict: 'date' })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setSaving(false)
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 900, margin: '0 auto' }}>
      <style>{`
        .energy-btn:hover { border-color: #ffd700 !important; background: #ffd70022 !important; color: #ffd700 !important; }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ffd700', textTransform: 'uppercase', marginBottom: 6 }}>Daily Check-In</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Health & Body</h1>
          <div style={{ color: '#555', fontSize: 13, marginTop: 4 }}>
            {new Date().toLocaleDateString('en-IE', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
        </div>
        <button
          onClick={saveToday}
          disabled={saving}
          style={{
            padding: '10px 24px', borderRadius: 8,
            background: saved ? '#4ade8022' : '#ffd70022',
            border: `1px solid ${saved ? '#4ade80' : '#ffd700'}`,
            color: saved ? '#4ade80' : '#ffd700',
            fontWeight: 700, fontSize: 12, cursor: 'pointer',
            letterSpacing: 1, textTransform: 'uppercase',
            transition: 'all 0.2s',
          }}
        >{saved ? '✓ Saved' : saving ? 'Saving...' : 'Save Today'}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* INJECTIONS */}
        <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555' }}>Injections</div>
            <span style={{
              fontSize: 12, fontWeight: 800,
              color: injDone === INJECTIONS.length ? '#4ade80' : '#555',
            }}>{injDone}/{INJECTIONS.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {INJECTIONS.map(inj => (
              <div key={inj.key} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <CheckBox
                  checked={!!injections[inj.key]}
                  onChange={v => setInjections(p => ({ ...p, [inj.key]: v }))}
                  color={inj.color}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: injections[inj.key] ? '#fff' : '#888' }}>{inj.label}</div>
                  <div style={{ fontSize: 10, color: '#444' }}>{inj.note}</div>
                </div>
                {injections[inj.key] && <span style={{ fontSize: 14 }}>✅</span>}
              </div>
            ))}
          </div>
        </div>

        {/* SUPPLEMENTS */}
        <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555' }}>Supplements</div>
            <span style={{
              fontSize: 12, fontWeight: 800,
              color: supDone === SUPPLEMENTS.length ? '#4ade80' : '#555',
            }}>{supDone}/{SUPPLEMENTS.length}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {SUPPLEMENTS.map(sup => (
              <div key={sup.key} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: supplements[sup.key] ? `${sup.color}11` : '#0d0d0d',
                border: `1px solid ${supplements[sup.key] ? `${sup.color}33` : '#1a1a1a'}`,
                borderRadius: 8, padding: '8px 10px', transition: 'all 0.15s',
              }}>
                <CheckBox
                  checked={!!supplements[sup.key]}
                  onChange={v => setSupplements(p => ({ ...p, [sup.key]: v }))}
                  color={sup.color}
                />
                <span style={{ fontSize: 11, fontWeight: 600, color: supplements[sup.key] ? '#fff' : '#666' }}>{sup.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ENERGY + GYM + WEIGHT */}
        <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>Daily Metrics</div>

          {/* Energy 1-10 */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Energy level</div>
            <div style={{ display: 'flex', gap: 5 }}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className="energy-btn"
                  onClick={() => setEnergy(n)}
                  style={{
                    width: 34, height: 34, borderRadius: 6, border: `1px solid ${energy === n ? '#ffd700' : '#252525'}`,
                    background: energy === n ? '#ffd70022' : 'transparent',
                    color: energy === n ? '#ffd700' : '#555',
                    fontWeight: energy === n ? 800 : 400, fontSize: 12, cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >{n}</button>
              ))}
            </div>
          </div>

          {/* Sleep quality */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Sleep quality</div>
            <div style={{ display: 'flex', gap: 5 }}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setSleep(n)}
                  style={{
                    width: 34, height: 34, borderRadius: 6, border: `1px solid ${sleep === n ? '#60a5fa' : '#252525'}`,
                    background: sleep === n ? '#60a5fa22' : 'transparent',
                    color: sleep === n ? '#60a5fa' : '#555',
                    fontWeight: sleep === n ? 800 : 400, fontSize: 12, cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >{n}</button>
              ))}
            </div>
          </div>

          {/* Weight + Gym */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>Weight (kg)</div>
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                placeholder="--"
                style={{
                  width: '100%', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 6,
                  padding: '8px 10px', color: '#e2e2e2', fontSize: 16, fontWeight: 700,
                  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
            <div
              onClick={() => setGym(!gym)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                background: gym ? '#4ade8022' : '#0d0d0d',
                border: `2px solid ${gym ? '#4ade80' : '#252525'}`,
                borderRadius: 10, padding: '12px 16px', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: 24 }}>🏋️</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: gym ? '#4ade80' : '#555', textTransform: 'uppercase', letterSpacing: 1 }}>Gym</span>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 12 }}>Notes</div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="How are you feeling? Anything unusual? What went well?"
            rows={8}
            style={{
              width: '100%', background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 8,
              padding: '10px 12px', color: '#e2e2e2', fontSize: 13, resize: 'vertical',
              fontFamily: 'inherit', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box',
            }}
          />
        </div>
      </div>

      {/* History */}
      {logs.filter(l => l.date !== TODAY).length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#333', marginBottom: 12 }}>Recent History</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {logs.filter(l => l.date !== TODAY).slice(0, 7).map(log => {
              const iDone = log.injections ? Object.values(log.injections).filter(Boolean).length : 0
              const sDone = log.supplements ? Object.values(log.supplements).filter(Boolean).length : 0
              return (
                <div key={log.id} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 14px',
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#555', minWidth: 80 }}>
                    {new Date(log.date + 'T12:00:00').toLocaleDateString('en-IE', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </span>
                  <span style={{ fontSize: 11, color: '#444' }}>💉 {iDone}/{INJECTIONS.length}</span>
                  <span style={{ fontSize: 11, color: '#444' }}>💊 {sDone}/{SUPPLEMENTS.length}</span>
                  {log.energy_rating && <span style={{ fontSize: 11, color: '#ffd700' }}>⚡ {log.energy_rating}/10</span>}
                  {log.gym_done && <span style={{ fontSize: 11, color: '#4ade80' }}>🏋️</span>}
                  {log.weight_kg && <span style={{ fontSize: 11, color: '#60a5fa' }}>{log.weight_kg}kg</span>}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}