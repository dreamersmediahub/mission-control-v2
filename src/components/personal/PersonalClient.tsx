// @ts-nocheck
'use client'

import { useState, useEffect, useRef } from 'react'

const GEMINI_TRAITS = [
  'Quick-thinking, adaptable, and brilliantly multi-talented',
  'The ideas person — you see the vision before anyone else does',
  'You process multiple dimensions simultaneously. That\'s not scattered, that\'s integration',
  'Your hyperfocus isn\'t a bug. It\'s how you master things',
  'The execution gap is the only enemy. Everything else is working',
]

const GEMINI_AFFIRMATIONS = [
  'Today I close the gap between the idea and the work',
  'I delegate what drains me and focus on what only I can do',
  'The creative director energy is already here',
  'Every brain dump is a seed. The agents water it',
  'I am building the operating system for my life',
]

function IrishClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleString('en-IE', { timeZone: 'Europe/Dublin', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      const d = new Date().toLocaleDateString('en-IE', { timeZone: 'Europe/Dublin', weekday: 'long', day: 'numeric', month: 'long' })
      setTime(now)
      setDate(d)
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, padding: 20, textAlign: 'center' }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 10 }}>🇮🇪 Ireland Time</div>
      <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums', letterSpacing: 2 }}>{time}</div>
      <div style={{ fontSize: 12, color: '#555', marginTop: 6 }}>{date}</div>
    </div>
  )
}

function ADHDTimer() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus')
  const [running, setRunning] = useState(false)
  const [seconds, setSeconds] = useState(25 * 60)
  const [focusMins, setFocusMins] = useState(25)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            setRunning(false)
            setMode(m => m === 'focus' ? 'break' : 'focus')
            return mode === 'focus' ? 5 * 60 : focusMins * 60
          }
          return s - 1
        })
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, mode, focusMins])

  function reset() {
    setRunning(false)
    setSeconds(mode === 'focus' ? focusMins * 60 : 5 * 60)
  }

  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  const progress = mode === 'focus' ? 1 - seconds / (focusMins * 60) : 1 - seconds / (5 * 60)
  const circumference = 2 * Math.PI * 45

  return (
    <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, padding: 20, textAlign: 'center' }}>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 12 }}>
        ADHD Focus Timer
      </div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 16 }}>
        {[25, 45, 90].map(mins => (
          <button
            key={mins}
            onClick={() => { setFocusMins(mins); setSeconds(mins * 60); setRunning(false) }}
            style={{
              padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700,
              border: `1px solid ${focusMins === mins ? '#ffd700' : '#252525'}`,
              background: focusMins === mins ? '#ffd70022' : 'transparent',
              color: focusMins === mins ? '#ffd700' : '#555',
              cursor: 'pointer',
            }}
          >{mins}m</button>
        ))}
      </div>

      {/* Circle timer */}
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <svg width="110" height="110" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="55" cy="55" r="45" fill="none" stroke="#1a1a1a" strokeWidth="6" />
          <circle
            cx="55" cy="55" r="45" fill="none"
            stroke={mode === 'focus' ? '#ffd700' : '#4ade80'}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>
            {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
          </div>
          <div style={{ fontSize: 9, color: '#555', textTransform: 'uppercase', letterSpacing: 1 }}>{mode}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button
          onClick={() => setRunning(r => !r)}
          style={{
            padding: '8px 24px', borderRadius: 8, fontWeight: 700, fontSize: 12,
            background: running ? '#f8717122' : '#ffd70022',
            border: `1px solid ${running ? '#f87171' : '#ffd700'}`,
            color: running ? '#f87171' : '#ffd700',
            cursor: 'pointer', letterSpacing: 1, textTransform: 'uppercase',
          }}
        >{running ? 'Pause' : 'Start'}</button>
        <button
          onClick={reset}
          style={{ padding: '8px 16px', borderRadius: 8, fontWeight: 700, fontSize: 12, background: 'transparent', border: '1px solid #252525', color: '#555', cursor: 'pointer' }}
        >Reset</button>
      </div>
    </div>
  )
}

function AstrologyWidget() {
  const [affirmationIdx, setAffirmationIdx] = useState(() => new Date().getDate() % GEMINI_AFFIRMATIONS.length)
  const [traitIdx, setTraitIdx] = useState(() => new Date().getDate() % GEMINI_TRAITS.length)

  const daysUntilBirthday = () => {
    const now = new Date()
    const bday = new Date(now.getFullYear(), 5, 11) // June 11
    if (bday < now) bday.setFullYear(now.getFullYear() + 1)
    return Math.ceil((bday.getTime() - now.getTime()) / 86400000)
  }

  return (
    <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, padding: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 36 }}>♊</span>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Gemini</div>
          <div style={{ fontSize: 12, color: '#555' }}>June 11 · {daysUntilBirthday()} days until your birthday</div>
        </div>
      </div>

      <div style={{ background: '#0d0d0d', border: '1px solid #ffd70022', borderRadius: 10, padding: '14px 16px', marginBottom: 14 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: '#ffd70088', textTransform: 'uppercase', marginBottom: 8 }}>Today's Affirmation</div>
        <div style={{ fontSize: 14, color: '#e2e2e2', lineHeight: 1.6, fontStyle: 'italic' }}>"{GEMINI_AFFIRMATIONS[affirmationIdx]}"</div>
      </div>

      <div style={{ background: '#0d0d0d', border: '1px solid #252525', borderRadius: 10, padding: '14px 16px', marginBottom: 16 }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: '#c084fc88', textTransform: 'uppercase', marginBottom: 8 }}>From your mirror</div>
        <div style={{ fontSize: 13, color: '#888', lineHeight: 1.6 }}>{GEMINI_TRAITS[traitIdx]}</div>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => setAffirmationIdx(i => (i + 1) % GEMINI_AFFIRMATIONS.length)}
          style={{ flex: 1, padding: '7px', borderRadius: 7, background: 'transparent', border: '1px solid #252525', color: '#555', fontSize: 11, cursor: 'pointer' }}
        >New affirmation</button>
        <button
          onClick={() => setTraitIdx(i => (i + 1) % GEMINI_TRAITS.length)}
          style={{ flex: 1, padding: '7px', borderRadius: 7, background: 'transparent', border: '1px solid #252525', color: '#555', fontSize: 11, cursor: 'pointer' }}
        >New insight</button>
      </div>
    </div>
  )
}

function ManifestationTracker() {
  const DEFAULT_GOALS = [
    { id: 1, text: 'Build the life OS that removes the execution gap', category: 'systems' },
    { id: 2, text: 'Dreamers Media generating consistent revenue', category: 'business' },
    { id: 3, text: 'Content pipeline running autonomously', category: 'content' },
    { id: 4, text: 'Body recomp — lean and strong', category: 'health' },
    { id: 5, text: 'Creative director role, not execution bottleneck', category: 'identity' },
  ]
  const [goals, setGoals] = useState(DEFAULT_GOALS)
  const [newGoal, setNewGoal] = useState('')

  const CATEGORY_COLORS = { systems: '#ffd700', business: '#60a5fa', content: '#c084fc', health: '#4ade80', identity: '#fb923c', default: '#555' }

  return (
    <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, padding: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 16 }}>✨ Manifestation Goals</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {goals.map(g => (
          <div key={g.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 10,
            background: '#0d0d0d', border: '1px solid #1a1a1a', borderRadius: 8, padding: '10px 12px',
          }}>
            <span style={{
              fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, flexShrink: 0, marginTop: 1,
              background: `${CATEGORY_COLORS[g.category] ?? CATEGORY_COLORS.default}22`,
              color: CATEGORY_COLORS[g.category] ?? CATEGORY_COLORS.default,
              border: `1px solid ${CATEGORY_COLORS[g.category] ?? CATEGORY_COLORS.default}44`,
              textTransform: 'uppercase',
            }}>{g.category}</span>
            <span style={{ fontSize: 12, color: '#888', lineHeight: 1.5 }}>{g.text}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <input
          value={newGoal}
          onChange={e => setNewGoal(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && newGoal.trim()) { setGoals(g => [...g, { id: Date.now(), text: newGoal.trim(), category: 'default' }]); setNewGoal('') } }}
          placeholder="Add a goal... (Enter)"
          style={{ flex: 1, background: '#0d0d0d', border: '1px solid #1e1e1e', borderRadius: 6, padding: '7px 10px', color: '#e2e2e2', fontSize: 12, fontFamily: 'inherit', outline: 'none' }}
        />
      </div>
    </div>
  )
}

export default function PersonalClient() {
  return (
    <div style={{ padding: '28px 32px', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ffd700', textTransform: 'uppercase', marginBottom: 6 }}>Personal</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Your Space</h1>
        <div style={{ color: '#555', fontSize: 13, marginTop: 4 }}>The stuff that makes it feel like yours</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <AstrologyWidget />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <IrishClock />
          <ADHDTimer />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <ManifestationTracker />
        </div>
      </div>
    </div>
  )
}