'use client'

import { Layout } from '@/components/Layout'
import { mockTodayTasks } from '@/lib/mock-data'
import { getPriorityColor, calculateProgress, formatTime } from '@/lib/utils'
import { Plus, Filter, Search, Clock, User, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function TasksPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')
  const [search, setSearch] = useState('')

  const filteredTasks = mockTodayTasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                         task.description.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const statusCounts = {
    all: mockTodayTasks.length,
    pending: mockTodayTasks.filter(t => t.status === 'pending').length,
    'in-progress': mockTodayTasks.filter(t => t.status === 'in-progress').length,
    completed: mockTodayTasks.filter(t => t.status === 'completed').length,
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Task & Project Management</h1>
            <p className="text-text-secondary">Your external ADHD brain for staying organized</p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`card text-left transition-all duration-200 hover:scale-105 ${
                filter === status ? 'ring-2 ring-gold' : ''
              }`}
            >
              <div className="text-2xl font-bold text-text-primary">{count}</div>
              <div className="text-sm text-text-secondary capitalize">
                {status === 'in-progress' ? 'In Progress' : status}
              </div>
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-text-muted" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as any)}
              className="input"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => {
            const progress = calculateProgress(
              task.steps.filter(s => s.completed).length, 
              task.steps.length
            )

            return (
              <div key={task.id} className="card hover:scale-[1.01] transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        task.priority === 'urgent' 
                          ? 'bg-error animate-pulse' 
                          : task.priority === 'high'
                          ? 'bg-warning'
                          : task.priority === 'medium'
                          ? 'bg-info'
                          : 'bg-text-muted'
                      }`}></div>
                      <h3 className={`text-lg font-semibold ${
                        task.status === 'completed' 
                          ? 'line-through text-text-muted' 
                          : 'text-text-primary'
                      }`}>
                        {task.title}
                      </h3>
                      {task.project && (
                        <span className="px-2 py-1 text-xs rounded-full bg-gold/20 text-gold">
                          {task.project}
                        </span>
                      )}
                    </div>

                    <p className="text-text-secondary mb-4">{task.description}</p>

                    {/* Progress Steps */}
                    {task.steps.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-text-secondary">Progress</span>
                          <span className="text-sm text-text-primary font-medium">{progress}%</span>
                        </div>
                        <div className="progress-bar mb-3">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="space-y-2">
                          {task.steps.map((step) => (
                            <div key={step.id} className="flex items-center space-x-2">
                              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                step.completed 
                                  ? 'bg-success border-success' 
                                  : 'border-surface-hover'
                              }`}>
                                {step.completed && (
                                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                                )}
                              </div>
                              <span className={`text-sm ${
                                step.completed ? 'line-through text-text-muted' : 'text-text-secondary'
                              }`}>
                                {step.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Meta Information */}
                    <div className="flex items-center space-x-4 text-sm text-text-muted">
                      {task.dueDate && (
                        <div className="flex items-center space-x-1">
                          <Clock size={12} />
                          <span>Due {formatTime(task.dueDate)}</span>
                        </div>
                      )}
                      {task.assignedTo && (
                        <div className="flex items-center space-x-1">
                          <User size={12} />
                          <span>{task.assignedTo}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <span className="capitalize">{task.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 ml-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === 'completed'
                        ? 'bg-success/20 text-success'
                        : task.status === 'in-progress'
                        ? 'bg-warning/20 text-warning'
                        : task.status === 'pending'
                        ? 'bg-info/20 text-info'
                        : 'bg-error/20 text-error'
                    }`}>
                      {task.status.replace('-', ' ')}
                    </div>
                    <ChevronRight 
                      size={16} 
                      className="text-text-muted hover:text-gold transition-colors" 
                    />
                  </div>
                </div>
              </div>
            )
          })}

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No tasks found</h3>
              <p className="text-text-secondary">
                {search ? 'Try adjusting your search terms' : 'All caught up! Time to create new tasks.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}