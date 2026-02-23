'use client'

import { useState } from 'react'
import { Play, Star, Crown, Drama, Flame } from 'lucide-react'

export function RealHousewivesTracker() {
  const [currentlyWatching] = useState({
    series: 'RHOSLC',
    season: 5,
    episode: 3,
    title: 'Whitney\'s Web of Lies',
    dramaLevel: 10,
    lastWatched: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  })

  const watchlist = [
    {
      series: 'RHOSLC',
      season: 5,
      episodesLeft: 8,
      dramaScore: 9.8,
      currentDrama: 'Whitney vs. Heather AGAIN + Mary M. Cosby chaos',
      icon: '⛷️',
      priority: 'high'
    },
    {
      series: 'Traitors US',
      season: 3,
      episodesLeft: 12,
      dramaScore: 9.5,
      currentDrama: 'Round table betrayals + castle mind games',
      icon: '🏰',
      priority: 'high'
    },
    {
      series: 'RHOBH',
      season: 14,
      episodesLeft: 15,
      dramaScore: 8.7,
      currentDrama: 'Kyle & Dorit friendship implosion + Crystal stirring',
      icon: '💎',
      priority: 'medium'
    }
  ]

  const favoriteHousewives = [
    { name: 'Whitney Rose', show: 'RHOSLC', status: 'Chaos Creator', drama: 'Always stirring' },
    { name: 'Mary M. Cosby', show: 'RHOSLC', status: 'Cult Leader Queen', drama: 'Iconic chaos' },
    { name: 'Kyle Richards', show: 'RHOBH', status: 'OG Splits', drama: 'Family drama' },
    { name: 'Traitors Cast', show: 'Traitors US', status: 'Mind Games', drama: 'Round table betrayals' }
  ]

  const getDramaColor = (score: number) => {
    if (score >= 9) return 'text-error border-error/30 bg-error/10'
    if (score >= 7) return 'text-warning border-warning/30 bg-warning/10'
    return 'text-info border-info/30 bg-info/10'
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flame className="text-error" size={14} />
      case 'medium': return <Star className="text-warning" size={14} />
      default: return <Play className="text-info" size={14} />
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Reality TV Command Center</h3>
        <div className="flex items-center space-x-1">
          <Crown className="text-gold animate-bounce" size={16} />
          <span className="text-sm text-gold">Drama Queen Mode</span>
        </div>
      </div>

      {/* Currently Watching */}
      <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h4 className="font-semibold text-text-primary">Now Watching</h4>
            <p className="text-sm text-text-secondary">
              {currentlyWatching.series} S{currentlyWatching.season}E{currentlyWatching.episode}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Drama className="text-error" size={16} />
              <span className="text-error font-bold">{currentlyWatching.dramaLevel}/10</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-text-primary mb-3">"{currentlyWatching.title}"</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-muted">
            Last watched: {currentlyWatching.lastWatched.toLocaleDateString()}
          </span>
          <button className="btn-primary text-sm px-3 py-1 flex items-center space-x-1">
            <Play size={12} />
            <span>Continue</span>
          </button>
        </div>
      </div>

      {/* Watchlist */}
      <div className="space-y-3 mb-4">
        {watchlist.map((show, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-surface/30 border border-surface-hover hover:border-gold/50 transition-all">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{show.icon}</div>
              <div>
                <div className="flex items-center space-x-2">
                  {getPriorityIcon(show.priority)}
                  <h4 className="font-medium text-text-primary">
                    {show.series} S{show.season}
                  </h4>
                </div>
                <p className="text-xs text-text-secondary mt-1 max-w-48">
                  {show.currentDrama}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getDramaColor(show.dramaScore)}`}>
                Drama {show.dramaScore}/10
              </div>
              <p className="text-xs text-text-muted mt-1">
                {show.episodesLeft} episodes left
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Favorite Housewives */}
      <div className="border-t border-surface-hover pt-4">
        <h4 className="text-sm font-semibold text-text-primary mb-3 flex items-center space-x-1">
          <Crown size={14} className="text-gold" />
          <span>Current Obsessions</span>
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {favoriteHousewives.map((hw, index) => (
            <div key={index} className="p-2 rounded bg-surface/20 border border-surface-hover">
              <div className="text-sm font-medium text-text-primary">{hw.name}</div>
              <div className="text-xs text-gold">{hw.status}</div>
              <div className="text-xs text-text-muted mt-1">{hw.drama}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="btn-secondary text-sm flex items-center justify-center space-x-1">
          <Star size={12} />
          <span>Rate Episode</span>
        </button>
        <button className="btn-primary text-sm flex items-center justify-center space-x-1">
          <Drama size={12} />
          <span>Drama Recap</span>
        </button>
      </div>

      {/* Easter Egg */}
      <div className="mt-3 text-center">
        <p className="text-xs text-pink-400 italic">
          "You're in your reality TV era and we're here for it" 👑
        </p>
      </div>
    </div>
  )
}