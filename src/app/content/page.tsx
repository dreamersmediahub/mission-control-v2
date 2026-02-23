'use client'

import { Layout } from '@/components/Layout'
import { calculateProgress } from '@/lib/utils'
import { Play, Edit, Upload, Calendar, FileVideo, FileAudio, FileImage } from 'lucide-react'

export default function ContentPage() {
  // Kyle's actual content pipeline
  const contentPieces = [
    {
      id: 'content-1',
      title: 'Wildly Inappropriate Episode 47',
      type: 'episode',
      status: 'editing',
      project: 'Krissy Marsh',
      dueDate: new Date('2026-02-25T09:00:00'),
      progress: 85,
      files: [
        { name: 'WI_Ep47_Raw.mov', type: 'video', size: '2.4GB' },
        { name: 'WI_Ep47_Audio.wav', type: 'audio', size: '890MB' }
      ],
      priority: 'high'
    },
    {
      id: 'content-2',
      title: 'Stella Private Social Media Pack',
      type: 'social',
      status: 'review',
      project: 'Stella Private',
      dueDate: new Date('2026-02-27T17:00:00'),
      progress: 95,
      files: [
        { name: 'SP_Instagram_Posts_v2.zip', type: 'image', size: '45MB' },
        { name: 'SP_LinkedIn_Content.pdf', type: 'document', size: '12MB' }
      ],
      priority: 'medium'
    },
    {
      id: 'content-3',
      title: 'CCC Audition Footage Edit',
      type: 'video',
      status: 'overdue',
      project: 'Chicken and Chips',
      dueDate: new Date('2026-02-20T18:00:00'),
      progress: 30,
      files: [
        { name: 'CCC_Day1_Raw.mov', type: 'video', size: '8.7GB' },
        { name: 'CCC_Day2_Raw.mov', type: 'video', size: '7.2GB' },
        { name: 'CCC_Day3_Raw.mov', type: 'video', size: '9.1GB' }
      ],
      priority: 'urgent'
    },
    {
      id: 'content-4',
      title: 'Anusa Property Website Assets',
      type: 'web',
      status: 'planning',
      project: 'Krissy Marsh',
      dueDate: new Date('2026-03-05T17:00:00'),
      progress: 10,
      files: [],
      priority: 'low'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-success/20 text-success'
      case 'review': return 'bg-info/20 text-info'
      case 'editing': return 'bg-warning/20 text-warning'
      case 'planning': return 'bg-text-muted/20 text-text-muted'
      case 'overdue': return 'bg-error/20 text-error animate-pulse'
      default: return 'bg-text-muted/20 text-text-muted'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'episode': return <Play size={16} />
      case 'video': return <FileVideo size={16} />
      case 'audio': return <FileAudio size={16} />
      case 'social': return <FileImage size={16} />
      case 'web': return <Edit size={16} />
      default: return <FileImage size={16} />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-error bg-error/10'
      case 'high': return 'border-warning bg-warning/10'
      case 'medium': return 'border-info bg-info/10'
      case 'low': return 'border-text-muted bg-text-muted/10'
      default: return 'border-surface-hover bg-surface/30'
    }
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Content & Creative Hub</h1>
          <p className="text-text-secondary">Streamline the creative chaos across all projects</p>
        </div>

        {/* Pipeline Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{contentPieces.length}</div>
              <div className="text-sm text-text-secondary">Active Projects</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-error">
                {contentPieces.filter(c => c.status === 'overdue').length}
              </div>
              <div className="text-sm text-text-secondary">Overdue</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {contentPieces.filter(c => c.status === 'editing').length}
              </div>
              <div className="text-sm text-text-secondary">In Edit</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-info">
                {contentPieces.filter(c => c.status === 'review').length}
              </div>
              <div className="text-sm text-text-secondary">In Review</div>
            </div>
          </div>
        </div>

        {/* Content Pipeline */}
        <div className="space-y-6">
          {contentPieces.map((content) => (
            <div key={content.id} className={`card border-l-4 ${getPriorityColor(content.priority)} hover:scale-[1.01] transition-all duration-300`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-gold">
                    {getTypeIcon(content.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{content.title}</h3>
                    <p className="text-sm text-text-secondary">{content.project}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(content.status)}`}>
                  {content.status.toUpperCase()}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-text-secondary">Progress</span>
                  <span className="text-sm text-text-primary font-medium">{content.progress}%</span>
                </div>
                <div className="progress-bar mb-3">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${content.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Files */}
              {content.files.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-text-primary mb-2">Files ({content.files.length})</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {content.files.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 rounded bg-surface/30">
                        <div className="text-text-muted">
                          {file.type === 'video' && <FileVideo size={14} />}
                          {file.type === 'audio' && <FileAudio size={14} />}
                          {file.type === 'image' && <FileImage size={14} />}
                          {file.type === 'document' && <Edit size={14} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-text-primary truncate">{file.name}</p>
                          <p className="text-xs text-text-muted">{file.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Due Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-text-muted">
                  <Calendar size={14} />
                  <span>Due {content.dueDate.toLocaleDateString('en-AU')} at {content.dueDate.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm px-3 py-1">
                    Open Files
                  </button>
                  <button className="btn-primary text-sm px-3 py-1 flex items-center space-x-1">
                    <Edit size={14} />
                    <span>Continue</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Render Queue</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">WI Episode 47</span>
                <span className="text-warning">Rendering... 67%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Storage Usage</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">LucidLink</span>
                <span className="text-text-primary">142GB / 150GB</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '95%' }}></div>
              </div>
              <p className="text-xs text-warning">Nearly full - consider archiving old projects</p>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Upload</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary flex items-center justify-center space-x-2">
                <Upload size={16} />
                <span>Upload Files</span>
              </button>
              <button className="w-full btn-secondary">
                Create New Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}