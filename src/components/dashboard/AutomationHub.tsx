'use client'

import { useState, useEffect } from 'react'
import { Play, Pause, Settings, Zap, Clock, CheckCircle2, AlertCircle, Bot } from 'lucide-react'
import { NeonButton } from '@/components/ui/NeonButton'

interface Automation {
  id: string
  name: string
  description: string
  status: 'active' | 'paused' | 'error'
  lastRun: Date
  nextRun: Date
  successRate: number
  category: 'finance' | 'client' | 'content' | 'health' | 'admin'
  icon: string
  impact: 'high' | 'medium' | 'low'
}

export function AutomationHub() {
  const [automations, setAutomations] = useState<Automation[]>([])
  const [filter, setFilter] = useState<string>('all')

  const kyleAutomations: Automation[] = [
    {
      id: '1',
      name: 'Smart Invoice Generation',
      description: 'Auto-creates invoices when project milestones are completed',
      status: 'active',
      lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000),
      nextRun: new Date(Date.now() + 6 * 60 * 60 * 1000),
      successRate: 96,
      category: 'finance',
      icon: '💰',
      impact: 'high'
    },
    {
      id: '2',
      name: 'Client Check-in Scheduler',
      description: 'Sends personalized check-ins to clients based on project status',
      status: 'active',
      lastRun: new Date(Date.now() - 45 * 60 * 1000),
      nextRun: new Date(Date.now() + 3 * 60 * 60 * 1000),
      successRate: 89,
      category: 'client',
      icon: '📞',
      impact: 'high'
    },
    {
      id: '3',
      name: 'Nana Rose Call Reminder',
      description: 'Daily reminder to call Nana Rose at optimal Irish time',
      status: 'active',
      lastRun: new Date(Date.now() - 18 * 60 * 60 * 1000),
      nextRun: new Date(Date.now() + 6 * 60 * 60 * 1000),
      successRate: 100,
      category: 'admin',
      icon: '👵🏻',
      impact: 'high'
    },
    {
      id: '4',
      name: 'ADHD Break Enforcer',
      description: 'Forces breaks every 90 minutes with screen dimming and music',
      status: 'active',
      lastRun: new Date(Date.now() - 90 * 60 * 1000),
      nextRun: new Date(Date.now() + 45 * 60 * 1000),
      successRate: 78,
      category: 'health',
      icon: '🧠',
      impact: 'medium'
    },
    {
      id: '5',
      name: 'Content Pipeline Manager',
      description: 'Tracks episode production and auto-schedules next steps',
      status: 'active',
      lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000),
      nextRun: new Date(Date.now() + 8 * 60 * 60 * 1000),
      successRate: 91,
      category: 'content',
      icon: '🎙️',
      impact: 'high'
    },
    {
      id: '6',
      name: 'Payment Chaser Bot',
      description: 'Sends increasingly assertive payment reminders automatically',
      status: 'paused',
      lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000),
      nextRun: new Date(Date.now() + 48 * 60 * 60 * 1000),
      successRate: 85,
      category: 'finance',
      icon: '💸',
      impact: 'high'
    },
    {
      id: '7',
      name: 'Peptide Schedule Tracker',
      description: 'Monitors injection schedule and sends reminders',
      status: 'active',
      lastRun: new Date(Date.now() - 12 * 60 * 60 * 1000),
      nextRun: new Date(Date.now() + 12 * 60 * 60 * 1000),
      successRate: 94,
      category: 'health',
      icon: '💊',
      impact: 'medium'
    },
    {
      id: '8',
      name: 'Theo Sass Generator',
      description: 'Creates contextual commentary based on dashboard activity',
      status: 'active',
      lastRun: new Date(Date.now() - 15 * 60 * 1000),
      nextRun: new Date(Date.now() + 30 * 60 * 1000),
      successRate: 99,
      category: 'admin',
      icon: '🦞',
      impact: 'low'
    }
  ]

  useEffect(() => {
    setAutomations(kyleAutomations)
    
    // Simulate automation activity updates
    const interval = setInterval(() => {
      setAutomations(prev => prev.map(automation => {
        // Randomly update last run times and success rates
        if (Math.random() > 0.7) {
          return {
            ...automation,
            lastRun: new Date(Date.now() - Math.random() * 3600000),
            successRate: Math.max(70, Math.min(100, automation.successRate + (Math.random() - 0.5) * 4))
          }
        }
        return automation
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const toggleAutomation = (id: string) => {
    setAutomations(prev => prev.map(automation => 
      automation.id === id 
        ? { 
            ...automation, 
            status: automation.status === 'active' ? 'paused' : 'active'
          }
        : automation
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success border-success bg-success/10'
      case 'paused': return 'text-warning border-warning bg-warning/10'
      case 'error': return 'text-error border-error bg-error/10'
      default: return 'text-text-secondary border-surface bg-surface/10'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'finance': return 'bg-gold/20 text-gold'
      case 'client': return 'bg-blue-500/20 text-blue-300'
      case 'content': return 'bg-purple-500/20 text-purple-300'
      case 'health': return 'bg-success/20 text-success'
      case 'admin': return 'bg-pink-500/20 text-pink-300'
      default: return 'bg-surface/20 text-text-secondary'
    }
  }

  const formatTime = (date: Date) => {
    const now = Date.now()
    const diff = Math.abs(date.getTime() - now)
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  const formatNextRun = (date: Date) => {
    const now = Date.now()
    const diff = date.getTime() - now
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(minutes / 60)
    
    if (diff < 0) return 'Overdue'
    if (hours > 0) return `in ${hours}h`
    return `in ${minutes}m`
  }

  const filteredAutomations = filter === 'all' 
    ? (automations || [])
    : (automations || []).filter(a => a.category === filter)

  const activeCount = (automations || []).filter(a => a.status === 'active').length
  const totalImpact = (automations || []).filter(a => a.status === 'active').length

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Automation Hub</h3>
        <div className="flex items-center space-x-1">
          <Bot className="text-blue-500 animate-pulse" size={16} />
          <span className="text-sm text-blue-500">{activeCount} Active</span>
        </div>
      </div>

      {/* Automation Overview */}
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-400">{activeCount}</div>
            <div className="text-xs text-text-muted">Active</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">
              {Math.round(automations.reduce((acc, a) => acc + a.successRate, 0) / automations.length)}%
            </div>
            <div className="text-xs text-text-muted">Success Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-gold">{totalImpact}</div>
            <div className="text-xs text-text-muted">Time Saved/Day</div>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4 text-xs">
        {['all', 'finance', 'client', 'content', 'health', 'admin'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-3 py-1 rounded-full transition-all capitalize ${
              filter === category
                ? 'bg-blue-500 text-white'
                : 'bg-surface hover:bg-surface-hover text-text-secondary'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Automations List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredAutomations.map((automation) => (
          <div
            key={automation.id}
            className={`p-3 rounded-lg border-2 transition-all ${getStatusColor(automation.status)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="text-lg">{automation.icon}</div>
                <div>
                  <div className="font-medium text-text-primary text-sm">
                    {automation.name}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {automation.description}
                  </div>
                </div>
              </div>
              
              <NeonButton
                variant={automation.status === 'active' ? 'blue' : 'gold'}
                size="sm"
                onClick={() => toggleAutomation(automation.id)}
                className="flex items-center space-x-1 text-xs"
              >
                {automation.status === 'active' ? <Pause size={12} /> : <Play size={12} />}
                <span>{automation.status === 'active' ? 'Pause' : 'Start'}</span>
              </NeonButton>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
              <div>
                <div className="text-text-muted">Last Run</div>
                <div className="text-text-primary">{formatTime(automation.lastRun)}</div>
              </div>
              <div>
                <div className="text-text-muted">Next Run</div>
                <div className="text-text-primary">{formatNextRun(automation.nextRun)}</div>
              </div>
              <div>
                <div className="text-text-muted">Success</div>
                <div className="text-text-primary">{automation.successRate}%</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs capitalize ${getCategoryColor(automation.category)}`}>
                  {automation.category}
                </span>
                
                <span className={`px-2 py-1 rounded text-xs ${
                  automation.impact === 'high' ? 'bg-red-500/20 text-red-300' :
                  automation.impact === 'medium' ? 'bg-gold/20 text-gold' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {automation.impact} impact
                </span>
              </div>

              <div className="flex items-center space-x-1">
                {automation.status === 'active' ? (
                  <CheckCircle2 size={12} className="text-success" />
                ) : automation.status === 'error' ? (
                  <AlertCircle size={12} className="text-error" />
                ) : (
                  <Clock size={12} className="text-warning" />
                )}
                <span className="text-xs text-text-muted capitalize">
                  {automation.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-3 border-t border-surface-hover/50">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-text-primary">Quick Actions</div>
          <div className="flex space-x-2">
            <NeonButton variant="green" size="sm" className="text-xs">
              <Play size={12} className="mr-1" />
              Start All
            </NeonButton>
            
            <NeonButton variant="blue" size="sm" className="text-xs">
              <Settings size={12} className="mr-1" />
              Configure
            </NeonButton>
          </div>
        </div>
      </div>
    </div>
  )
}