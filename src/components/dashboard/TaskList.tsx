'use client'

import { Task } from '@/types'
import { formatTime, getPriorityColor, calculateProgress } from '@/lib/utils'
import { Clock, User, ChevronRight } from 'lucide-react'
import { useDashboardStore } from '@/stores/dashboard'

interface TaskListProps {
  tasks: Task[]
  title: string
}

export function TaskList({ tasks, title }: TaskListProps) {
  const { updateTaskStatus } = useDashboardStore()

  const handleTaskClick = (taskId: string, currentStatus: Task['status']) => {
    const nextStatus = currentStatus === 'pending' 
      ? 'in-progress' 
      : currentStatus === 'in-progress' 
      ? 'completed' 
      : 'pending'
    
    updateTaskStatus(taskId, nextStatus)
  }

  const getPriorityDot = (priority: Task['priority']) => {
    const colors = {
      low: 'bg-text-muted',
      medium: 'bg-info',
      high: 'bg-warning',
      urgent: 'bg-error animate-pulse'
    }
    return colors[priority]
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <span className="text-sm text-text-secondary">{tasks.length} tasks</span>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => {
          const progress = calculateProgress(
            task.steps.filter(s => s.completed).length, 
            task.steps.length
          )

          return (
            <div
              key={task.id}
              onClick={() => handleTaskClick(task.id, task.status)}
              className="group p-3 rounded-lg bg-surface/30 hover:bg-surface-hover/50 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${getPriorityDot(task.priority)}`}></div>
                    <h4 className={`font-medium truncate ${
                      task.status === 'completed' 
                        ? 'line-through text-text-muted' 
                        : 'text-text-primary'
                    }`}>
                      {task.title}
                    </h4>
                  </div>

                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                    {task.description}
                  </p>

                  {/* Progress bar */}
                  {task.steps.length > 0 && (
                    <div className="mb-2">
                      <div className="progress-bar mb-1">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-text-muted">
                        {task.steps.filter(s => s.completed).length} of {task.steps.length} steps complete
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-4 text-xs text-text-muted">
                    {task.dueDate && (
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{formatTime(task.dueDate)}</span>
                      </div>
                    )}
                    {task.assignedTo && (
                      <div className="flex items-center space-x-1">
                        <User size={12} />
                        <span>{task.assignedTo}</span>
                      </div>
                    )}
                    {task.project && (
                      <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold">
                        {task.project}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                    className="text-text-muted group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" 
                  />
                </div>
              </div>
            </div>
          )
        })}

        {tasks.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">✨</div>
            <p className="text-text-muted">No tasks for today</p>
            <p className="text-text-secondary text-sm">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  )
}