'use client'

import { Layout } from '@/components/Layout'
import { formatDistanceToNow } from '@/lib/utils'
import { Zap, Play, Pause, Settings, TrendingUp, Mail, Calendar, CheckCircle } from 'lucide-react'

export default function AutomationsPage() {
  const automations = [
    {
      id: 'email-triage',
      name: 'Email Triage & Morning Brief',
      description: 'Scan kyle@ inbox overnight, categorize emails, generate morning briefing',
      status: 'active',
      agent: 'brief',
      lastRun: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      nextRun: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes from now
      successRate: 98,
      totalRuns: 127,
      icon: <Mail size={20} />
    },
    {
      id: 'invoice-chaser',
      name: 'Invoice Follow-up Automation',
      description: 'Auto-detect overdue invoices, draft follow-ups, send reminders',
      status: 'active',
      agent: 'ops',
      lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      nextRun: new Date(Date.now() + 22 * 60 * 60 * 1000), // tomorrow
      successRate: 94,
      totalRuns: 43,
      icon: <TrendingUp size={20} />
    },
    {
      id: 'task-delegation',
      name: 'Smart Task Routing',
      description: 'Auto-assign tasks to appropriate agents based on content and workload',
      status: 'active',
      agent: 'main',
      lastRun: new Date(Date.now() - 18 * 60 * 1000), // 18 minutes ago
      nextRun: new Date(Date.now() + 42 * 60 * 1000), // 42 minutes from now
      successRate: 91,
      totalRuns: 234,
      icon: <Zap size={20} />
    },
    {
      id: 'calendar-sync',
      name: 'Calendar & Deadline Sync',
      description: 'Sync project deadlines with calendar, create time blocks, send reminders',
      status: 'paused',
      agent: 'brief',
      lastRun: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      nextRun: null,
      successRate: 87,
      totalRuns: 89,
      icon: <Calendar size={20} />
    },
    {
      id: 'subscription-audit',
      name: 'Subscription Monitor',
      description: 'Track recurring charges, flag unusual amounts, suggest cancellations',
      status: 'error',
      agent: 'money',
      lastRun: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      nextRun: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
      successRate: 76,
      totalRuns: 28,
      icon: <Settings size={20} />
    },
    {
      id: 'health-reminders',
      name: 'Medication & Habit Reminders',
      description: 'Send medication alerts, track habit streaks, family call reminders',
      status: 'active',
      agent: 'health',
      lastRun: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
      nextRun: new Date(Date.now() + 35 * 60 * 1000), // 35 minutes from now
      successRate: 99,
      totalRuns: 512,
      icon: <CheckCircle size={20} />
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success'
      case 'paused': return 'bg-warning/20 text-warning'
      case 'error': return 'bg-error/20 text-error'
      default: return 'bg-text-muted/20 text-text-muted'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play size={14} />
      case 'paused': return <Pause size={14} />
      case 'error': return <Settings size={14} />
      default: return <Settings size={14} />
    }
  }

  const overallStats = {
    totalAutomations: automations.length,
    activeAutomations: automations.filter(a => a.status === 'active').length,
    averageSuccessRate: Math.round(automations.reduce((sum, a) => sum + a.successRate, 0) / automations.length),
    totalRuns: automations.reduce((sum, a) => sum + a.totalRuns, 0)
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Automation Control Panel</h1>
          <p className="text-text-secondary">Kyle's automation empire at a glance</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{overallStats.totalAutomations}</div>
              <div className="text-sm text-text-secondary">Total Automations</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{overallStats.activeAutomations}</div>
              <div className="text-sm text-text-secondary">Active</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-info">{overallStats.averageSuccessRate}%</div>
              <div className="text-sm text-text-secondary">Avg Success Rate</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">{overallStats.totalRuns.toLocaleString()}</div>
              <div className="text-sm text-text-secondary">Total Runs</div>
            </div>
          </div>
        </div>

        {/* Automation Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {automations.map((automation) => (
            <div key={automation.id} className="card hover:scale-[1.02] transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-gold">
                    {automation.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{automation.name}</h3>
                    <p className="text-sm text-text-secondary">Agent: {automation.agent}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(automation.status)}`}>
                  {getStatusIcon(automation.status)}
                  <span>{automation.status.toUpperCase()}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary mb-4">{automation.description}</p>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 rounded-lg bg-surface/30">
                  <div className="text-lg font-bold text-text-primary">{automation.successRate}%</div>
                  <div className="text-xs text-text-muted">Success Rate</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-surface/30">
                  <div className="text-lg font-bold text-text-primary">{automation.totalRuns}</div>
                  <div className="text-xs text-text-muted">Total Runs</div>
                </div>
              </div>

              {/* Timing Information */}
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-muted">Last run:</span>
                  <span className="text-text-primary">{formatDistanceToNow(automation.lastRun)} ago</span>
                </div>
                {automation.nextRun && (
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Next run:</span>
                    <span className="text-text-primary">in {formatDistanceToNow(automation.nextRun)}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {automation.status === 'active' ? (
                  <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                    <Pause size={16} />
                    <span>Pause</span>
                  </button>
                ) : (
                  <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                    <Play size={16} />
                    <span>Start</span>
                  </button>
                )}
                <button className="flex-1 btn-secondary flex items-center justify-center space-x-2">
                  <Settings size={16} />
                  <span>Configure</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* System Health */}
        <div className="mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">System Health</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🟢</div>
                <div className="text-sm font-medium text-text-primary">OpenClaw Gateway</div>
                <div className="text-xs text-success">Online & Responsive</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🟢</div>
                <div className="text-sm font-medium text-text-primary">Agent Network</div>
                <div className="text-xs text-success">All Agents Connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🟡</div>
                <div className="text-sm font-medium text-text-primary">Integration Health</div>
                <div className="text-xs text-warning">1 Service Needs Attention</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}