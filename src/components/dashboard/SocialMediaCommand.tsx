'use client'

import { useState } from 'react'
import { Instagram, Camera, TrendingUp, Heart, MessageCircle, Share, BarChart3, Eye } from 'lucide-react'

export function SocialMediaCommand() {
  const [selectedPlatform, setSelectedPlatform] = useState('instagram')
  
  const platforms = {
    instagram: {
      icon: <Instagram className="text-pink-500" size={20} />,
      handle: '@itskylekenneth',
      followers: 2847,
      engagement: 4.2,
      todaysGrowth: 23,
      color: 'from-pink-500 to-purple-600'
    },
    tiktok: {
      icon: <div className="text-black bg-white rounded p-1 text-sm">TT</div>,
      handle: '@kylekenneth',
      followers: 1234,
      engagement: 8.7,
      todaysGrowth: 156,
      color: 'from-black to-gray-800'
    },
    linkedin: {
      icon: <div className="text-blue-600 font-bold text-sm">in</div>,
      handle: 'Kyle Kenneth',
      followers: 892,
      engagement: 3.1,
      todaysGrowth: 8,
      color: 'from-blue-600 to-blue-800'
    }
  }

  const contentIdeas = [
    {
      type: 'vulnerability',
      title: 'Coming Out Story Series',
      description: 'Raw, honest posts about your journey',
      platforms: ['instagram', 'tiktok'],
      engagement_potential: 'high',
      content_pillars: ['authenticity', 'mental health']
    },
    {
      type: 'behind-scenes',
      title: 'Podcast Production BTS',
      description: 'Show the magic behind Krissy episodes',
      platforms: ['instagram', 'tiktok'],
      engagement_potential: 'medium',
      content_pillars: ['business', 'creativity']
    },
    {
      type: 'educational',
      title: 'ADHD Business Tips',
      description: 'How you run Dreamers Media with ADHD',
      platforms: ['linkedin', 'instagram'],
      engagement_potential: 'high',
      content_pillars: ['business', 'mental health']
    },
    {
      type: 'lifestyle',
      title: 'Sydney Gay Scene Reviews',
      description: 'Honest reviews of venues, events, culture',
      platforms: ['instagram', 'tiktok'],
      engagement_potential: 'medium',
      content_pillars: ['community', 'lifestyle']
    },
    {
      type: 'business',
      title: 'Client Testimonials',
      description: 'Stellar results for Stella, Krissy success',
      platforms: ['linkedin', 'instagram'],
      engagement_potential: 'medium',
      content_pillars: ['business', 'social proof']
    }
  ]

  const recentPosts = [
    {
      platform: 'instagram',
      type: 'story',
      content: 'Coffee shop work session',
      engagement: { likes: 67, comments: 8, shares: 3 },
      posted: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    {
      platform: 'instagram',
      type: 'reel',
      content: 'ADHD entrepreneur morning routine',
      engagement: { likes: 234, comments: 19, shares: 12 },
      posted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      platform: 'linkedin',
      type: 'post',
      content: 'Vulnerability in business leadership',
      engagement: { likes: 89, comments: 24, shares: 7 },
      posted: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ]

  const postingSchedule = {
    monday: 'Motivation Monday - inspirational quote + personal story',
    tuesday: 'Behind the scenes - client work or podcast production',
    wednesday: 'ADHD/Mental Health - tips, struggles, wins',
    thursday: 'Business insights - lessons learned, client successes',
    friday: 'Fun Friday - lifestyle, Sydney adventures, Josh content',
    saturday: 'Creative Saturday - design work, aesthetic posts',
    sunday: 'Reflection Sunday - weekly wins, gratitude, family'
  }

  const getEngagementColor = (rate: number) => {
    if (rate >= 7) return 'text-success'
    if (rate >= 4) return 'text-warning'
    return 'text-error'
  }

  const currentPlatform = platforms[selectedPlatform as keyof typeof platforms]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Social Media Command</h3>
        <div className="flex items-center space-x-1">
          <TrendingUp className="text-success animate-pulse" size={16} />
          <span className="text-sm text-success">Growing</span>
        </div>
      </div>

      {/* Platform Selector */}
      <div className="flex space-x-2 mb-4">
        {Object.entries(platforms).map(([key, platform]) => (
          <button
            key={key}
            onClick={() => setSelectedPlatform(key)}
            className={`flex-1 p-3 rounded-lg border transition-all ${
              selectedPlatform === key
                ? 'border-gold bg-gradient-to-r ' + platform.color + ' bg-opacity-20 text-gold'
                : 'border-surface-hover bg-surface/30 hover:border-gold/50'
            }`}
          >
            <div className="text-center">
              <div className="flex justify-center mb-1">
                {platform.icon}
              </div>
              <div className="text-sm font-medium">{platform.handle}</div>
              <div className="text-xs text-text-muted">{platform.followers} followers</div>
            </div>
          </button>
        ))}
      </div>

      {/* Current Platform Stats */}
      <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/30">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-text-primary">{currentPlatform.followers.toLocaleString()}</div>
            <div className="text-xs text-text-secondary">Followers</div>
            <div className="text-xs text-success">+{currentPlatform.todaysGrowth} today</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${getEngagementColor(currentPlatform.engagement)}`}>
              {currentPlatform.engagement}%
            </div>
            <div className="text-xs text-text-secondary">Engagement</div>
            <div className="text-xs text-info">Above average</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning">7.2K</div>
            <div className="text-xs text-text-secondary">Reach</div>
            <div className="text-xs text-warning">This week</div>
          </div>
        </div>
      </div>

      {/* Content Ideas Generator */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2 flex items-center space-x-1">
          <Camera size={14} className="text-gold" />
          <span>Today's Content Ideas</span>
        </h4>
        <div className="space-y-2">
          {contentIdeas.slice(0, 2).map((idea, i) => (
            <div key={i} className="p-3 rounded-lg bg-surface/20 border border-surface-hover hover:border-gold/50 transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-medium text-text-primary text-sm">{idea.title}</h5>
                  <p className="text-xs text-text-secondary mt-1">{idea.description}</p>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  idea.engagement_potential === 'high' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-warning/20 text-warning'
                }`}>
                  {idea.engagement_potential}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex space-x-1">
                  {idea.platforms.map((p, j) => (
                    <span key={j} className="text-xs bg-info/20 text-info px-1 py-0.5 rounded">
                      {p}
                    </span>
                  ))}
                </div>
                <button className="btn-primary text-xs px-2 py-1">
                  Create
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Performance */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">Recent Performance</h4>
        <div className="space-y-2">
          {recentPosts.slice(0, 2).map((post, i) => (
            <div key={i} className="flex items-center justify-between p-2 rounded bg-surface/20">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-gold/20 text-gold px-1 py-0.5 rounded">
                    {post.platform}
                  </span>
                  <span className="text-sm font-medium text-text-primary">
                    {post.content}
                  </span>
                </div>
                <div className="text-xs text-text-muted mt-1">
                  {post.posted.toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1">
                  <Heart size={10} className="text-error" />
                  <span>{post.engagement.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle size={10} className="text-info" />
                  <span>{post.engagement.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share size={10} className="text-success" />
                  <span>{post.engagement.shares}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button className="btn-primary text-sm flex items-center justify-center space-x-1">
          <Camera size={12} />
          <span>Quick Post</span>
        </button>
        <button className="btn-secondary text-sm flex items-center justify-center space-x-1">
          <BarChart3 size={12} />
          <span>Analytics</span>
        </button>
      </div>

      {/* Posting Schedule Reminder */}
      <div className="mt-4 p-2 rounded bg-info/10 border border-info/30">
        <div className="text-sm font-medium text-info mb-1">
          Today's Theme: {postingSchedule[new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as keyof typeof postingSchedule]}
        </div>
        <div className="text-xs text-text-secondary">
          Consistency builds empires 👑
        </div>
      </div>
    </div>
  )
}