// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { Youtube, Play, Clock, TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react'
import { NeonButton } from '@/components/ui/NeonButton'
import { ProgressRing } from '@/components/ui/ProgressRing'

interface YouTubeSession {
  id: string
  type: 'learning' | 'entertainment' | 'music' | 'business'
  duration: number
  timestamp: Date
  channel: string
  category: string
}

export function YouTubeIntegration() {
  const [todayWatchTime, setTodayWatchTime] = useState(0)
  const [learningTime, setLearningTime] = useState(0)
  const [entertainmentTime, setEntertainmentTime] = useState(0)
  const [isInFocusMode, setIsInFocusMode] = useState(false)

  // Simulated daily viewing data based on Kyle's patterns
  const todaysSessions: YouTubeSession[] = [
    {
      id: '1',
      type: 'entertainment',
      duration: 45, // minutes
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      channel: 'RHOBH Moments',
      category: 'Reality TV'
    },
    {
      id: '2',
      type: 'learning',
      duration: 15,
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      channel: 'JustinGuitar',
      category: 'Music Learning'
    },
    {
      id: '3',
      type: 'entertainment',
      duration: 35,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      channel: 'Traitors Compilations',
      category: 'Reality TV'
    },
    {
      id: '4',
      type: 'business',
      duration: 12,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      channel: 'Gary Vaynerchuk',
      category: 'Entrepreneurship'
    },
    {
      id: '5',
      type: 'music',
      duration: 18,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      channel: 'Ed Sheeran',
      category: 'Music'
    }
  ]

  useEffect(() => {
    const totalTime = (todaysSessions || []).reduce((acc, session) => acc + session.duration, 0)
    const learning = (todaysSessions || [])
      .filter(s => s.type === 'learning' || s.type === 'business')
      .reduce((acc, s) => acc + s.duration, 0)
    const entertainment = (todaysSessions || [])
      .filter(s => s.type === 'entertainment')
      .reduce((acc, s) => acc + s.duration, 0)

    setTodayWatchTime(totalTime)
    setLearningTime(learning)
    setEntertainmentTime(entertainment)
  }, [])

  const learningRatio = todayWatchTime > 0 ? (learningTime / todayWatchTime) * 100 : 0
  const entertainmentRatio = todayWatchTime > 0 ? (entertainmentTime / todayWatchTime) * 100 : 0

  const getBalanceStatus = () => {
    if (learningRatio >= 40) return { text: 'Excellent Balance', color: 'text-success', icon: Target }
    if (learningRatio >= 25) return { text: 'Good Balance', color: 'text-gold', icon: TrendingUp }
    if (learningRatio >= 15) return { text: 'Needs Improvement', color: 'text-warning', icon: AlertTriangle }
    return { text: 'Too Much Fun!', color: 'text-error', icon: AlertTriangle }
  }

  const upcomingLearning = [
    { channel: 'JustinGuitar', title: 'Strumming Patterns Masterclass', posted: '2 hours ago', type: 'guitar' },
    { channel: 'Ramsey Voice Studio', title: 'Breath Support Exercises', posted: '5 hours ago', type: 'vocals' },
    { channel: 'Marty Music', title: 'Ed Sheeran Style Tutorial', posted: '1 day ago', type: 'guitar' }
  ]

  const balance = getBalanceStatus()
  const BalanceIcon = balance.icon

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">YouTube Analytics</h3>
        <div className="flex items-center space-x-1">
          <Youtube className="text-red-500" size={16} />
          <span className="text-sm text-red-500">Live Tracking</span>
        </div>
      </div>

      {/* Today's Watch Time */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-red-500/20 to-purple-500/20 border border-red-500/30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-medium text-text-primary">Today's Watch Time</div>
            <div className="text-2xl font-bold text-red-400">{Math.floor(todayWatchTime / 60)}h {todayWatchTime % 60}m</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ProgressRing 
              progress={learningRatio} 
              size={60} 
              strokeWidth={6} 
              color="#10b981" 
            />
            <div className="text-right">
              <div className="text-sm font-medium text-text-primary">Learning Ratio</div>
              <div className="text-xs text-text-secondary">{Math.round(learningRatio)}% educational</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BalanceIcon size={16} className={balance.color} />
            <span className={`text-sm font-medium ${balance.color}`}>
              {balance.text}
            </span>
          </div>
          
          <NeonButton
            variant={isInFocusMode ? "red" : "blue"}
            size="sm"
            onClick={() => setIsInFocusMode(!isInFocusMode)}
            glowing={isInFocusMode}
            className="flex items-center space-x-2"
          >
            <Zap size={16} />
            <span>{isInFocusMode ? 'Exit Focus' : 'Focus Mode'}</span>
          </NeonButton>
        </div>
      </div>

      {/* Content Breakdown */}
      <div className="mb-4">
        <div className="text-sm font-medium text-text-primary mb-3">Content Breakdown</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-success/10 border border-success/30">
            <div className="flex items-center justify-between">
              <span className="text-xs text-success">Learning</span>
              <span className="text-sm font-bold text-success">{learningTime}m</span>
            </div>
            <div className="text-xs text-text-muted mt-1">Guitar + Business</div>
          </div>
          
          <div className="p-3 rounded-lg bg-pink-500/10 border border-pink-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs text-pink-400">Entertainment</span>
              <span className="text-sm font-bold text-pink-400">{entertainmentTime}m</span>
            </div>
            <div className="text-xs text-text-muted mt-1">Reality TV</div>
          </div>
        </div>
      </div>

      {/* Recent Sessions */}
      <div className="mb-4">
        <div className="text-sm font-medium text-text-primary mb-3">Recent Sessions</div>
        <div className="space-y-2">
          {todaysSessions.slice(0, 3).map((session) => (
            <div key={session.id} className="flex items-center justify-between p-2 rounded bg-surface/30 hover:bg-surface/50 transition-colors">
              <div className="flex items-center space-x-2">
                <div className="text-sm">
                  {session.type === 'learning' ? '📚' : 
                   session.type === 'entertainment' ? '🎭' :
                   session.type === 'business' ? '💼' : '🎵'}
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">{session.channel}</div>
                  <div className="text-xs text-text-muted">{session.category}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">{session.duration}m</div>
                <div className="text-xs text-text-muted">
                  {Math.floor((Date.now() - session.timestamp.getTime()) / (1000 * 60 * 60))}h ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Learning Content */}
      {!isInFocusMode && (
        <div className="mb-4">
          <div className="text-sm font-medium text-text-primary mb-3">🎯 New Learning Content</div>
          <div className="space-y-2">
            {upcomingLearning.slice(0, 2).map((content, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center space-x-2">
                  <div className="text-sm">
                    {content.type === 'guitar' ? '🎸' : '🎤'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-300">{content.channel}</div>
                    <div className="text-xs text-text-secondary">{content.title}</div>
                  </div>
                </div>
                
                <div className="text-xs text-text-muted">{content.posted}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Focus Mode Message */}
      {isInFocusMode && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="text-red-400" size={16} />
            <span className="font-medium text-red-400">Focus Mode Active</span>
          </div>
          <div className="text-sm text-text-secondary">
            Reality TV channels hidden. Learning content prioritized. You've got this! 🎯
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="pt-3 border-t border-surface-hover/50">
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="font-medium text-purple-400">This Week</div>
            <div className="text-text-muted">8h 45m</div>
          </div>
          <div>
            <div className="font-medium text-success">Learning Streak</div>
            <div className="text-text-muted">3 days</div>
          </div>
          <div>
            <div className="font-medium text-gold">Balance Score</div>
            <div className="text-text-muted">{Math.round(learningRatio)}/100</div>
          </div>
        </div>
      </div>
    </div>
  )
}