// @ts-nocheck
'use client'

import { useState, useEffect } from 'react'
import { Music, Guitar, Mic, Play, Pause, Volume2, Target, Zap, Youtube, Clock } from 'lucide-react'
import { NeonButton } from '@/components/ui/NeonButton'
import { ProgressRing } from '@/components/ui/ProgressRing'

interface Song {
  id: string
  title: string
  artist: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  progress: number
  lastPracticed: Date
  skillFocus: 'chords' | 'strumming' | 'fingerpicking' | 'vocals'
  youtubeUrl: string
}

interface YouTubeChannel {
  id: string
  name: string
  category: 'guitar' | 'singing' | 'music' | 'entertainment' | 'business'
  subscribers: string
  lastWatched: Date
  watchTime: number
  icon: string
}

export function MusicStudio() {
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [practiceTimer, setPracticeTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [weeklyGoal, setWeeklyGoal] = useState(300) // 5 hours in minutes

  const songsLearning: Song[] = [
    {
      id: '1',
      title: 'Wonderwall',
      artist: 'Oasis',
      difficulty: 'beginner',
      progress: 75,
      lastPracticed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      skillFocus: 'chords',
      youtubeUrl: 'https://youtube.com/watch?v=example1'
    },
    {
      id: '2',
      title: 'Hallelujah',
      artist: 'Leonard Cohen',
      difficulty: 'intermediate',
      progress: 45,
      lastPracticed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      skillFocus: 'fingerpicking',
      youtubeUrl: 'https://youtube.com/watch?v=example2'
    },
    {
      id: '3',
      title: 'The Man Who Can\'t Be Moved',
      artist: 'The Script',
      difficulty: 'intermediate',
      progress: 60,
      lastPracticed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      skillFocus: 'vocals',
      youtubeUrl: 'https://youtube.com/watch?v=example3'
    },
    {
      id: '4',
      title: 'Someone Like You',
      artist: 'Adele',
      difficulty: 'beginner',
      progress: 85,
      lastPracticed: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000),
      skillFocus: 'vocals',
      youtubeUrl: 'https://youtube.com/watch?v=example4'
    }
  ]

  const youtubeChannels: YouTubeChannel[] = [
    {
      id: '1',
      name: 'JustinGuitar',
      category: 'guitar',
      subscribers: '4.2M',
      lastWatched: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      watchTime: 45,
      icon: '🎸'
    },
    {
      id: '2',
      name: 'Marty Music',
      category: 'guitar',
      subscribers: '2.8M',
      lastWatched: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      watchTime: 32,
      icon: '🎵'
    },
    {
      id: '3',
      name: 'Ramsey Voice Studio',
      category: 'singing',
      subscribers: '890K',
      lastWatched: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      watchTime: 28,
      icon: '🎤'
    },
    {
      id: '4',
      name: 'Real Housewives Compilations',
      category: 'entertainment',
      subscribers: '125K',
      lastWatched: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000),
      watchTime: 120,
      icon: '💎'
    },
    {
      id: '5',
      name: 'Traitors Moments',
      category: 'entertainment',
      subscribers: '67K',
      lastWatched: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      watchTime: 85,
      icon: '🏰'
    },
    {
      id: '6',
      name: 'Gary Vaynerchuk',
      category: 'business',
      subscribers: '3.1M',
      lastWatched: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      watchTime: 18,
      icon: '💼'
    },
    {
      id: '7',
      name: 'Ed Sheeran',
      category: 'music',
      subscribers: '52M',
      lastWatched: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      watchTime: 25,
      icon: '🎭'
    }
  ]

  useEffect(() => {
    setCurrentSong(songsLearning[0])
    
    // Timer logic
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setPracticeTimer(prev => prev + 1)
      }, 1000)
    }
    
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-success border-success bg-success/10'
      case 'intermediate': return 'text-warning border-warning bg-warning/10'
      case 'advanced': return 'text-error border-error bg-error/10'
      default: return 'text-text-secondary'
    }
  }

  const getSkillIcon = (skill: string) => {
    switch (skill) {
      case 'chords': return '🎸'
      case 'strumming': return '🤘'
      case 'fingerpicking': return '👆'
      case 'vocals': return '🎤'
      default: return '🎵'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'guitar': return 'bg-orange-500/20 text-orange-300'
      case 'singing': return 'bg-pink-500/20 text-pink-300'
      case 'music': return 'bg-purple-500/20 text-purple-300'
      case 'entertainment': return 'bg-gold/20 text-gold'
      case 'business': return 'bg-blue-500/20 text-blue-300'
      default: return 'bg-surface/20 text-text-secondary'
    }
  }

  const totalWeeklyMinutes = 156 // Mock data - would calculate from actual practice
  const weeklyProgress = (totalWeeklyMinutes / weeklyGoal) * 100

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Music Studio</h3>
        <div className="flex items-center space-x-1">
          <Guitar className="text-orange-500 animate-pulse" size={16} />
          <span className="text-sm text-orange-500">Learning Mode</span>
        </div>
      </div>

      {/* Practice Timer & Weekly Goal */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-medium text-text-primary">Practice Session</div>
            <div className="text-lg font-bold text-orange-400">{formatTime(practiceTimer)}</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ProgressRing 
              progress={weeklyProgress} 
              size={60} 
              strokeWidth={6} 
              color="#f97316" 
            />
            <div className="text-right">
              <div className="text-sm font-medium text-text-primary">Weekly Goal</div>
              <div className="text-xs text-text-secondary">{totalWeeklyMinutes}/{weeklyGoal} mins</div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <NeonButton
            variant="gold"
            size="sm"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            glowing={isTimerRunning}
            className="flex items-center space-x-2"
          >
            {isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
            <span>{isTimerRunning ? 'Pause' : 'Start'} Practice</span>
          </NeonButton>
          
          <NeonButton
            variant="blue"
            size="sm"
            onClick={() => setPracticeTimer(0)}
            className="flex items-center space-x-2"
          >
            <Target size={16} />
            <span>Reset</span>
          </NeonButton>
        </div>
      </div>

      {/* Currently Learning */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-text-primary text-sm">Songs in Progress</span>
          <div className="text-xs text-text-muted">{songsLearning.length} active</div>
        </div>

        <div className="space-y-2">
          {songsLearning.slice(0, 3).map((song) => (
            <div
              key={song.id}
              className={`p-3 rounded-lg border transition-all hover:scale-105 cursor-pointer ${
                currentSong?.id === song.id ? 'border-orange-500 bg-orange-500/10' : 'border-surface-hover bg-surface/30'
              }`}
              onClick={() => setCurrentSong(song)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="text-lg">{getSkillIcon(song.skillFocus)}</div>
                  <div>
                    <div className="font-medium text-text-primary text-sm">{song.title}</div>
                    <div className="text-xs text-text-secondary">{song.artist}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-bold text-orange-400">{song.progress}%</div>
                  <div className={`text-xs px-2 py-1 rounded ${getDifficultyColor(song.difficulty)}`}>
                    {song.difficulty}
                  </div>
                </div>
              </div>

              <div className="w-full bg-surface rounded-full h-1">
                <div 
                  className="h-1 bg-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: `${song.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-text-muted">
                <span>Focus: {song.skillFocus}</span>
                <span>Last: {Math.floor((Date.now() - song.lastPracticed.getTime()) / (1000 * 60 * 60 * 24))}d ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* YouTube Channels */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-text-primary text-sm">YouTube Learning</span>
          <Youtube className="text-red-500" size={16} />
        </div>

        <div className="grid grid-cols-1 gap-2">
          {youtubeChannels.slice(0, 4).map((channel) => (
            <div key={channel.id} className="flex items-center justify-between p-2 rounded bg-surface/30 hover:bg-surface/50 transition-colors">
              <div className="flex items-center space-x-2">
                <div className="text-sm">{channel.icon}</div>
                <div>
                  <div className="font-medium text-text-primary text-xs">{channel.name}</div>
                  <div className="text-xs text-text-muted">{channel.subscribers} subs</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`px-2 py-1 rounded text-xs ${getCategoryColor(channel.category)}`}>
                  {channel.category}
                </div>
                <div className="text-xs text-text-muted mt-1">
                  {channel.watchTime}m watched
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="pt-3 border-t border-surface-hover/50">
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="font-medium text-orange-500">Practice Streak</div>
            <div className="text-text-muted">5 days</div>
          </div>
          <div>
            <div className="font-medium text-pink-500">Vocal Range</div>
            <div className="text-text-muted">C3-G5</div>
          </div>
          <div>
            <div className="font-medium text-purple-500">Chords Known</div>
            <div className="text-text-muted">12/20</div>
          </div>
        </div>
      </div>

      {/* Today's Recommendations */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
        <div className="flex items-center space-x-2 mb-2">
          <Zap size={12} className="text-purple-500" />
          <span className="text-sm font-medium text-purple-400">Today's Focus</span>
        </div>
        <div className="text-sm text-text-secondary">
          Practice "Wonderwall" chord transitions for 15 minutes, then work on vocal breathing exercises with Ramsey Voice Studio video.
        </div>
      </div>
    </div>
  )
}
