'use client'

import { Agent } from '@/types'
import { formatDistanceToNow } from '@/lib/utils'

interface AgentStatusProps {
  agents: Agent[]
}

export function AgentStatus({ agents }: AgentStatusProps) {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'online': return 'status-online'
      case 'busy': return 'status-busy'
      case 'offline': return 'status-offline'
      default: return 'status-offline'
    }
  }

  const getStatusText = (status: Agent['status']) => {
    switch (status) {
      case 'online': return 'Online'
      case 'busy': return 'Busy'
      case 'offline': return 'Offline'
      default: return 'Unknown'
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Agent Status</h3>
        <div className="flex items-center space-x-2">
          <div className="status-dot status-online"></div>
          <span className="text-sm text-text-secondary">{agents.filter(a => a.status === 'online').length}/{agents.length} online</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {agents.map((agent) => (
          <div key={agent.id} className="flex items-center justify-between p-3 rounded-lg bg-surface/50 hover:bg-surface-hover/50 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{agent.emoji}</div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-text-primary">{agent.name}</span>
                  <div className={`status-dot ${getStatusColor(agent.status)}`}></div>
                </div>
                <p className="text-xs text-text-secondary">{agent.role}</p>
                {agent.currentTask && (
                  <p className="text-xs text-gold mt-1 truncate max-w-48">{agent.currentTask}</p>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-xs px-2 py-1 rounded-full ${
                agent.status === 'online' 
                  ? 'bg-success/20 text-success' 
                  : agent.status === 'busy'
                  ? 'bg-warning/20 text-warning'
                  : 'bg-error/20 text-error'
              }`}>
                {getStatusText(agent.status)}
              </div>
              <p className="text-xs text-text-muted mt-1">
                {formatDistanceToNow(agent.lastActivity)} ago
              </p>
              <p className="text-xs text-text-muted">
                {agent.tasksCompleted} tasks • {agent.responseTime}s avg
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}