// @ts-nocheck
'use client'

import { useState } from 'react'
import { Play, Pause, SkipForward, Volume2, Music, Heart, Shuffle, Repeat } from 'lucide-react'

export function SpotifyVibePlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack] = useState({
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    duration: 178, // seconds
    progress: 45
  })

  const [currentPlaylist] = useState('Kyle\'s Deep Work Flow')

  // Kyle's curated playlists for different moods/activities
  const kylesPlaylists = [
    {
      name: 'Deep Work Flow',
      description: 'Instrumental focus music for hyperfocus sessions',
      tracks: 67,
      duration: '4h 23m',
      mood: '🧠',
      energy: 'focus',
      color: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Creative Chaos',
      description: 'Pop anthems for content creation energy',
      tracks: 43,
      duration: '2h 45m', 
      mood: '✨',
      energy: 'high',
      color: 'from-pink-500 to-orange-500'
    },
    {
      name: 'Vulnerable Storytelling',
      description: 'Emotional ballads for personal content',
      tracks: 29,
      duration: '1h 52m',
      mood: '💔',
      energy: 'emotional',
      color: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Main Character Energy',
      description: 'Confidence boosters and power anthems',
      tracks: 38,
      duration: '2h 31m',
      mood: '👑',
      energy: 'power',
      color: 'from-gold to-yellow-400'
    },
    {
      name: 'Irish Nostalgia',
      description: 'Songs that remind you of home and Nana',
      tracks: 22,
      duration: '1h 18m',
      mood: '🇮🇪',
      energy: 'nostalgic',
      color: 'from-green-600 to-emerald-500'
    },
    {
      name: 'Reality TV Binge',
      description: 'Perfect background for RHOBH marathons',
      tracks: 56,
      duration: '3h 12m',
      mood: '👸',
      energy: 'chill',
      color: 'from-rose-500 to-pink-500'
    }
  ]

  const recentlyPlayed = [
    { title: 'Anti-Hero', artist: 'Taylor Swift', mood: '😅' },
    { title: 'As It Was', artist: 'Harry Styles', mood: '🌊' },
    { title: 'Bad Habit', artist: 'Steve Lacy', mood: '😌' },
    { title: 'About Damn Time', artist: 'Lizzo', mood: '💃' }
  ]

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    return (currentTrack.progress / currentTrack.duration) * 100
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Spotify Vibes</h3>
        <div className="flex items-center space-x-1">
          <Music className="text-success animate-pulse" size={16} />
          <span className="text-sm text-success">Now Playing</span>
        </div>
      </div>

      {/* Current Track */}
      <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-success/20 to-success/10 border border-success/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-text-primary truncate">{currentTrack.title}</h4>
            <p className="text-sm text-text-secondary">{currentTrack.artist}</p>
            <p className="text-xs text-text-muted">{currentTrack.album}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full hover:bg-success/20 transition-colors">
              <Heart size={16} className="text-error" />
            </button>
            <button className="p-1 rounded-full hover:bg-success/20 transition-colors">
              <Volume2 size={14} className="text-text-muted" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-text-muted mb-1">
            <span>{formatTime(currentTrack.progress)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill bg-success" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button className="p-1 rounded-full hover:bg-success/20 transition-colors">
            <Shuffle size={16} className="text-text-muted" />
          </button>
          <button className="p-2 rounded-full hover:bg-success/20 transition-colors">
            <SkipForward size={16} className="text-text-primary transform rotate-180" />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 rounded-full bg-success hover:bg-success/90 transition-colors"
          >
            {isPlaying ? (
              <Pause size={16} className="text-black" />
            ) : (
              <Play size={16} className="text-black" />
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-success/20 transition-colors">
            <SkipForward size={16} className="text-text-primary" />
          </button>
          <button className="p-1 rounded-full hover:bg-success/20 transition-colors">
            <Repeat size={16} className="text-text-muted" />
          </button>
        </div>
      </div>

      {/* Playlist Quick Select */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">Kyle's Playlists</h4>
        <div className="grid grid-cols-2 gap-2">
          {kylesPlaylists.slice(0, 4).map((playlist, i) => (
            <button
              key={i}
              className={`p-2 rounded-lg border text-left transition-all hover:scale-105 ${
                playlist.name === currentPlaylist
                  ? 'border-success bg-success/20'
                  : 'border-surface-hover bg-surface/30 hover:border-success/50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className="text-lg">{playlist.mood}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-text-primary text-xs truncate">
                    {playlist.name}
                  </div>
                  <div className="text-xs text-text-muted">
                    {playlist.tracks} songs • {playlist.duration}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recently Played */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">Recently Played</h4>
        <div className="space-y-2">
          {recentlyPlayed.map((track, i) => (
            <button
              key={i}
              className="w-full flex items-center space-x-3 p-2 rounded hover:bg-surface/30 transition-colors text-left"
            >
              <div className="text-lg">{track.mood}</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">
                  {track.title}
                </div>
                <div className="text-xs text-text-secondary">
                  {track.artist}
                </div>
              </div>
              <Play size={12} className="text-text-muted" />
            </button>
          ))}
        </div>
      </div>

      {/* Mood-Based Quick Plays */}
      <div className="border-t border-surface-hover pt-4">
        <h4 className="font-medium text-text-primary mb-2">Vibe Check</h4>
        <div className="grid grid-cols-3 gap-2">
          <button className="btn-secondary text-sm flex flex-col items-center space-y-1 py-3">
            <span className="text-lg">🧠</span>
            <span>Focus</span>
          </button>
          <button className="btn-secondary text-sm flex flex-col items-center space-y-1 py-3">
            <span className="text-lg">💃</span>
            <span>Energy</span>
          </button>
          <button className="btn-secondary text-sm flex flex-col items-center space-y-1 py-3">
            <span className="text-lg">😌</span>
            <span>Chill</span>
          </button>
        </div>
      </div>

      {/* Fun Footer */}
      <div className="mt-4 text-center">
        <p className="text-xs text-success italic">
          "Music is the soundtrack to your main character era" 🎵
        </p>
      </div>
    </div>
  )
}