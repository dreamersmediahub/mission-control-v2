'use client'

import { Layout } from '@/components/Layout'
import { mockAgents } from '@/lib/mock-data'
import { formatDistanceToNow } from '@/lib/utils'
import { MessageCircle, Activity, CheckCircle, Clock } from 'lucide-react'

export default function AgentsPage() {
  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Agent Orchestration</h1>
          <p className="text-text-secondary">Direct control over your AI agent ecosystem</p>
        </div>

        {/* Agent Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockAgents.map((agent) => (
            <div key={agent.id} className="card group hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-4xl">{agent.emoji}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{agent.name}</h3>
                    <p className="text-sm text-text-secondary">{agent.role}</p>
                  </div>
                </div>
                <div className={`status-dot ${
                  agent.status === 'online' 
                    ? 'status-online' 
                    : agent.status === 'busy'
                    ? 'status-busy'
                    : 'status-offline'
                }`}></div>
              </div>

              {/* Current Task */}
              {agent.currentTask && (
                <div className="mb-4 p-3 rounded-lg bg-gold/10 border border-gold/20">
                  <p className="text-sm font-medium text-gold">Current Task</p>
                  <p className="text-sm text-text-primary mt-1">{agent.currentTask}</p>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 rounded-lg bg-surface/30">
                  <div className="flex items-center justify-center mb-1">
                    <CheckCircle size={16} className="text-success mr-1" />
                    <span className="text-sm font-semibold text-text-primary">{agent.tasksCompleted}</span>
                  </div>
                  <p className="text-xs text-text-muted">Tasks Completed</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-surface/30">
                  <div className="flex items-center justify-center mb-1">
                    <Clock size={16} className="text-info mr-1" />
                    <span className="text-sm font-semibold text-text-primary">{agent.responseTime}s</span>
                  </div>
                  <p className="text-xs text-text-muted">Avg Response</p>
                </div>
              </div>

              {/* Last Activity */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-sm text-text-muted">
                  <Activity size={14} />
                  <span>Last active {formatDistanceToNow(agent.lastActivity)} ago</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                  <MessageCircle size={16} />
                  <span>Message</span>
                </button>
                <button className="flex-1 btn-secondary">
                  View Chat
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Agent Communication Panel */}
        <div className="mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Message</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Select Agent
                </label>
                <select className="input w-full">
                  <option value="">Choose an agent...</option>
                  {mockAgents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.emoji} {agent.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Message
                </label>
                <textarea 
                  className="input w-full h-24 resize-none"
                  placeholder="Type your message or task delegation..."
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button className="btn-secondary">Save Draft</button>
                <button className="btn-primary">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}