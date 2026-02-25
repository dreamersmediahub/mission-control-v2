// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Coffee, Utensils, Timer, Zap, AlertCircle } from 'lucide-react'

export function ADHDHyperfocusTimer() {
  const [isRunning, setIsRunning] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0) // in seconds
  const [mode, setMode] = useState<'focus' | 'break'>('focus')
  const [remindersSent, setRemindersSent] = useState({
    water: 0,
    food: 0,
    posture: 0,
    bathroom: 0
  })

  // Focus session presets optimized for ADHD
  const presets = [
    { name: 'Quick Sprint', focus: 25, break: 5, icon: '⚡' },
    { name: 'Deep Dive', focus: 50, break: 10, icon: '🌊' }, 
    { name: 'Creative Flow', focus: 90, break: 15, icon: '🎨' },
    { name: 'Beast Mode', focus: 120, break: 20, icon: '🔥' }
  ]

  const [currentPreset, setCurrentPreset] = useState(presets[0])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  // ADHD-specific reminders based on elapsed time
  useEffect(() => {
    if (!isRunning || mode !== 'focus') return

    // Water reminder every 30 minutes
    if (timeElapsed > 0 && timeElapsed % 1800 === 0) {
      setRemindersSent(prev => ({ ...prev, water: prev.water + 1 }))
      // TODO: Send gentle notification
    }

    // Food reminder after 2 hours
    if (timeElapsed === 7200) {
      setRemindersSent(prev => ({ ...prev, food: prev.food + 1 }))
      // TODO: Send meal reminder
    }

    // Posture reminder every 45 minutes
    if (timeElapsed > 0 && timeElapsed % 2700 === 0) {
      setRemindersSent(prev => ({ ...prev, posture: prev.posture + 1 }))
    }

    // Bathroom reminder after 3 hours (common ADHD hyperfocus issue)
    if (timeElapsed === 10800) {
      setRemindersSent(prev => ({ ...prev, bathroom: prev.bathroom + 1 }))
    }
  }, [timeElapsed, isRunning, mode])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getSessionIntensity = () => {
    const minutes = timeElapsed / 60
    if (minutes < 30) return { level: 'Getting Started', color: 'text-info', intensity: 1 }
    if (minutes < 60) return { level: 'In the Zone', color: 'text-warning', intensity: 2 }
    if (minutes < 120) return { level: 'Deep Flow', color: 'text-success', intensity: 3 }
    if (minutes < 180) return { level: 'Hyperfocus Mode', color: 'text-gold', intensity: 4 }
    return { level: 'DANGER ZONE', color: 'text-error animate-pulse', intensity: 5 }
  }

  const getHyperfocusWarning = () => {
    const minutes = timeElapsed / 60
    if (minutes > 180) {
      return 'Kyle! You\'ve been hyperfocused for 3+ hours. Time for basic human needs check!'
    }
    if (minutes > 120) {
      return 'Approaching hyperfocus danger zone. Consider a proper break soon.'
    }
    if (minutes > 90) {
      return 'Strong focus session! Remember to hydrate and stretch.'
    }
    return null
  }

  const handleStart = () => {
    setIsRunning(true)
    setMode('focus')
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeElapsed(0)
    setMode('focus')
    setRemindersSent({ water: 0, food: 0, posture: 0, bathroom: 0 })
  }

  const handleBreak = () => {
    setMode('break')
    setTimeElapsed(0)
    // TODO: Start break timer
  }

  const intensity = getSessionIntensity()
  const warning = getHyperfocusWarning()

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">ADHD Focus Timer</h3>
        <div className="flex items-center space-x-1">
          <Timer className="text-gold" size={16} />
          <span className="text-sm text-gold">Hyperfocus Guardian</span>
        </div>
      </div>

      {/* Main Timer Display */}
      <div className="text-center mb-6">
        <div className={`text-4xl font-mono font-bold mb-2 ${intensity.color}`}>
          {formatTime(timeElapsed)}
        </div>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${intensity.color} border border-current/30`}>
            {intensity.level}
          </div>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < intensity.intensity ? 'bg-gold' : 'bg-surface-hover'
                }`}
              />
            ))}
          </div>
        </div>
        <div className="text-sm text-text-secondary">
          {mode === 'focus' ? 'Focus Session' : 'Break Time'}
        </div>
      </div>

      {/* Hyperfocus Warning */}
      {warning && (
        <div className="mb-4 p-3 rounded-lg border-l-4 border-error bg-error/10">
          <div className="flex items-start space-x-2">
            <AlertCircle size={16} className="text-error mt-0.5" />
            <div>
              <p className="text-sm font-medium text-error">Hyperfocus Alert</p>
              <p className="text-sm text-text-secondary mt-1">{warning}</p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center space-x-3 mb-4">
        {!isRunning ? (
          <button onClick={handleStart} className="btn-primary flex items-center space-x-2">
            <Play size={16} />
            <span>Start Focus</span>
          </button>
        ) : (
          <button onClick={handlePause} className="btn-secondary flex items-center space-x-2">
            <Pause size={16} />
            <span>Pause</span>
          </button>
        )}
        
        <button onClick={handleBreak} className="btn-secondary flex items-center space-x-2">
          <Coffee size={16} />
          <span>Break</span>
        </button>
        
        <button onClick={handleReset} className="btn-secondary flex items-center space-x-2">
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>

      {/* Preset Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => setCurrentPreset(preset)}
            className={`p-2 rounded-lg border text-sm transition-all ${
              currentPreset.name === preset.name
                ? 'border-gold bg-gold/20 text-gold'
                : 'border-surface-hover bg-surface/30 hover:border-gold/50'
            }`}
          >
            <div className="text-center">
              <div className="text-lg mb-1">{preset.icon}</div>
              <div className="font-medium">{preset.name}</div>
              <div className="text-xs text-text-muted">
                {preset.focus}m focus / {preset.break}m break
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ADHD Care Reminders */}
      <div className="border-t border-surface-hover pt-4">
        <h4 className="text-sm font-semibold text-text-primary mb-2">Body Check Reminders</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${remindersSent.water > 0 ? 'bg-info' : 'bg-surface-hover'}`}></div>
            <span className="text-sm text-text-secondary">Water</span>
            {remindersSent.water > 0 && (
              <span className="text-xs text-info">({remindersSent.water})</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${remindersSent.food > 0 ? 'bg-warning' : 'bg-surface-hover'}`}></div>
            <span className="text-sm text-text-secondary">Food</span>
            {remindersSent.food > 0 && (
              <span className="text-xs text-warning">({remindersSent.food})</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${remindersSent.posture > 0 ? 'bg-success' : 'bg-surface-hover'}`}></div>
            <span className="text-sm text-text-secondary">Posture</span>
            {remindersSent.posture > 0 && (
              <span className="text-xs text-success">({remindersSent.posture})</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${remindersSent.bathroom > 0 ? 'bg-error' : 'bg-surface-hover'}`}></div>
            <span className="text-sm text-text-secondary">Bathroom</span>
            {remindersSent.bathroom > 0 && (
              <span className="text-xs text-error">({remindersSent.bathroom})</span>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Break Button */}
      {timeElapsed > 10800 && ( // After 3 hours
        <div className="mt-4">
          <button 
            onClick={handleBreak}
            className="w-full btn-primary bg-error hover:bg-error/90 animate-pulse flex items-center justify-center space-x-2"
          >
            <Utensils size={16} />
            <span>EMERGENCY BREAK - EAT SOMETHING</span>
          </button>
        </div>
      )}

      {/* Motivational Footer */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gold italic">
          "ADHD hyperfocus is a superpower, but even superheroes need snacks" ⚡
        </p>
      </div>
    </div>
  )
}