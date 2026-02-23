'use client'

import { useState } from 'react'
import { Zap, MessageCircle, Plus, Calendar, AlertTriangle } from 'lucide-react'

interface QuickAction {
  id: string
  label: string
  icon: any
  color: string
  action: () => void
}

export function QuickActions() {
  const [showPanicOptions, setShowPanicOptions] = useState(false)

  const quickActions: QuickAction[] = [
    {
      id: 'new-task',
      label: 'New Task',
      icon: Plus,
      color: 'bg-info hover:bg-info/90',
      action: () => {
        // TODO: Open task creation modal
        console.log('Creating new task...')
      }
    },
    {
      id: 'message-agent',
      label: 'Message Agent',
      icon: MessageCircle,
      color: 'bg-gold hover:bg-gold/90',
      action: () => {
        // TODO: Open agent messaging modal
        console.log('Opening agent messaging...')
      }
    },
    {
      id: 'schedule-block',
      label: 'Schedule Block',
      icon: Calendar,
      color: 'bg-success hover:bg-success/90',
      action: () => {
        // TODO: Open calendar scheduling
        console.log('Opening calendar...')
      }
    }
  ]

  const panicActions = [
    {
      id: 'delegate-all',
      label: 'Delegate All Pending Tasks',
      description: 'Assign all pending tasks to appropriate agents'
    },
    {
      id: 'reschedule-today',
      label: 'Reschedule Today\'s Meetings',
      description: 'Move non-critical meetings to later dates'
    },
    {
      id: 'focus-mode',
      label: 'Enter Focus Mode',
      description: 'Block all non-urgent notifications and distractions'
    },
    {
      id: 'emergency-contact',
      label: 'Contact Support Person',
      description: 'Send SOS message to Josh or designated support person'
    }
  ]

  const handlePanicAction = (actionId: string) => {
    console.log(`Executing panic action: ${actionId}`)
    setShowPanicOptions(false)
    // TODO: Implement panic actions
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
      </div>

      {/* Regular Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`${action.color} text-primary font-medium px-4 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2`}
          >
            <action.icon size={18} />
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Panic Button */}
      <div className="border-t border-surface-hover pt-4">
        <button
          onClick={() => setShowPanicOptions(!showPanicOptions)}
          className="w-full bg-error hover:bg-error/90 text-white font-semibold px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-98 flex items-center justify-center space-x-2 animate-pulse-gold"
        >
          <AlertTriangle size={20} />
          <span>PANIC BUTTON</span>
          <Zap size={16} className="ml-1" />
        </button>
        
        <p className="text-xs text-text-muted text-center mt-2">
          Overwhelmed? Hit this for emergency task delegation & support
        </p>

        {/* Panic Options */}
        {showPanicOptions && (
          <div className="mt-4 space-y-2 animate-fade-in">
            {panicActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handlePanicAction(action.id)}
                className="w-full text-left p-3 rounded-lg bg-error/10 border border-error/20 hover:bg-error/20 transition-all duration-200"
              >
                <div className="text-sm font-medium text-text-primary">
                  {action.label}
                </div>
                <div className="text-xs text-text-secondary mt-1">
                  {action.description}
                </div>
              </button>
            ))}
            
            <button
              onClick={() => setShowPanicOptions(false)}
              className="w-full text-center p-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}