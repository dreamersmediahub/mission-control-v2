'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, Repeat2, Heart, Share, Verified } from 'lucide-react'

interface Tweet {
  id: string
  username: string
  handle: string
  verified: boolean
  avatar: string
  content: string
  timestamp: string
  likes: number
  retweets: number
  replies: number
  show: 'RHOSLC' | 'RHOBH' | 'Traitors'
}

export function TwitterFeed() {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [selectedShow, setSelectedShow] = useState<string>('all')

  const mockTweets: Tweet[] = [
    // RHOSLC
    {
      id: '1',
      username: 'Reality Tea Spiller',
      handle: '@realitytea',
      verified: true,
      avatar: '☕',
      content: "Whitney Rose really said 'let me ruin everyone's dinner party' and honestly? We stan the chaos queen ⛷️ #RHOSLC",
      timestamp: '2m',
      likes: 847,
      retweets: 234,
      replies: 89,
      show: 'RHOSLC'
    },
    {
      id: '2',
      username: 'Bravo Obsessed',
      handle: '@bravoobsessed',
      verified: false,
      avatar: '👑',
      content: "Mary M. Cosby's confessional looks are serving CULT LEADER CHIC and I'm here for every unhinged moment #RHOSLC",
      timestamp: '15m',
      likes: 1203,
      retweets: 445,
      replies: 156,
      show: 'RHOSLC'
    },
    {
      id: '3',
      username: 'Heather Gay Stan',
      handle: '@heathergaystan',
      verified: false,
      avatar: '🦄',
      content: "Heather defending everyone while getting stabbed in the back is peak Mormon housewife energy 😭 #RHOSLC",
      timestamp: '32m',
      likes: 623,
      retweets: 178,
      replies: 67,
      show: 'RHOSLC'
    },

    // Traitors US
    {
      id: '4',
      username: 'Castle Chronicles',
      handle: '@castlechronicles',
      verified: true,
      avatar: '🏰',
      content: "THE ROUND TABLE CHAOS TONIGHT! Someone played a 4D chess move and I'm LIVING for these mind games 🧠 #TraitorsUS",
      timestamp: '8m',
      likes: 956,
      retweets: 312,
      replies: 134,
      show: 'Traitors'
    },
    {
      id: '5',
      username: 'Traitor Hunter',
      handle: '@traitorhunter',
      verified: false,
      avatar: '🕵️',
      content: "Alan Cumming's dramatic cape entrances are giving me LIFE. This man knows how to make an entrance! #TraitorsUS",
      timestamp: '18m',
      likes: 1445,
      retweets: 523,
      replies: 198,
      show: 'Traitors'
    },
    {
      id: '6',
      username: 'Reality Strategy',
      handle: '@realitystrat',
      verified: false,
      avatar: '🎭',
      content: "Plot twist: everyone's suspicious of everyone and NO ONE can be trusted. Peak Traitors energy! 🗡️ #TraitorsUS",
      timestamp: '45m',
      likes: 734,
      retweets: 267,
      replies: 91,
      show: 'Traitors'
    },

    // RHOBH
    {
      id: '7',
      username: 'Beverly Hills Tea',
      handle: '@bevhillstea',
      verified: true,
      avatar: '💎',
      content: "Kyle Richards really thought she could gaslight her way out of THAT conversation... ma'am this is RHOBH not amateur hour 💅 #RHOBH",
      timestamp: '5m',
      likes: 1123,
      retweets: 389,
      replies: 234,
      show: 'RHOBH'
    },
    {
      id: '8',
      username: 'Dorit Defender',
      handle: '@doritdefender',
      verified: false,
      avatar: '👗',
      content: "Dorit's accent changing mid-sentence depending on who she's talking to is SENDING me 😂 #RHOBH",
      timestamp: '22m',
      likes: 867,
      retweets: 298,
      replies: 145,
      show: 'RHOBH'
    },
    {
      id: '9',
      username: 'Crystal Clear Truth',
      handle: '@crystalclear',
      verified: false,
      avatar: '🔮',
      content: "Crystal stirring the pot while looking absolutely gorgeous? That's the energy we need more of in BH! #RHOBH",
      timestamp: '1h',
      likes: 645,
      retweets: 189,
      replies: 78,
      show: 'RHOBH'
    },

    // More chaotic tweets
    {
      id: '10',
      username: 'Chaos Coordinator',
      handle: '@chaoscoord',
      verified: false,
      avatar: '🌪️',
      content: "Whitney from Salt Lake could teach a masterclass on how to blow up every friendship in 3 easy steps ⛷️💥 #RHOSLC",
      timestamp: '1h',
      likes: 423,
      retweets: 156,
      replies: 89,
      show: 'RHOSLC'
    },
    {
      id: '11',
      username: 'Scottish Drama King',
      handle: '@scottishdrama',
      verified: true,
      avatar: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
      content: "Alan Cumming dramatically revealing the traitors while wearing that cape is peak television darling! 🎭 #TraitorsUS",
      timestamp: '2h',
      likes: 1567,
      retweets: 678,
      replies: 234,
      show: 'Traitors'
    },
    {
      id: '12',
      username: 'Reunion Ready',
      handle: '@reunionready',
      verified: false,
      avatar: '🎬',
      content: "Andy Cohen about to have MATERIAL for days with all this Kyle vs Dorit drama brewing 👀 #RHOBH",
      timestamp: '3h',
      likes: 789,
      retweets: 234,
      replies: 123,
      show: 'RHOBH'
    }
  ]

  useEffect(() => {
    setTweets(mockTweets)
    
    // Simulate new tweets appearing
    const interval = setInterval(() => {
      const newTweet = mockTweets[Math.floor(Math.random() * mockTweets.length)]
      setTweets(prev => [
        { ...newTweet, id: Date.now().toString(), timestamp: 'now' },
        ...prev.slice(0, 11)
      ])
    }, 30000) // New tweet every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const filteredTweets = selectedShow === 'all' ? tweets : tweets.filter(tweet => tweet.show === selectedShow)

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Reality TV Twitter</h3>
        <div className="text-blue-400">🐦</div>
      </div>

      {/* Show Filter */}
      <div className="flex space-x-2 mb-4 text-xs">
        <button
          onClick={() => setSelectedShow('all')}
          className={`px-3 py-1 rounded-full transition-all ${
            selectedShow === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-surface hover:bg-surface-hover text-text-secondary'
          }`}
        >
          All Shows
        </button>
        <button
          onClick={() => setSelectedShow('RHOSLC')}
          className={`px-3 py-1 rounded-full transition-all ${
            selectedShow === 'RHOSLC'
              ? 'bg-blue-500 text-white'
              : 'bg-surface hover:bg-surface-hover text-text-secondary'
          }`}
        >
          ⛷️ RHOSLC
        </button>
        <button
          onClick={() => setSelectedShow('Traitors')}
          className={`px-3 py-1 rounded-full transition-all ${
            selectedShow === 'Traitors'
              ? 'bg-blue-500 text-white'
              : 'bg-surface hover:bg-surface-hover text-text-secondary'
          }`}
        >
          🏰 Traitors
        </button>
        <button
          onClick={() => setSelectedShow('RHOBH')}
          className={`px-3 py-1 rounded-full transition-all ${
            selectedShow === 'RHOBH'
              ? 'bg-blue-500 text-white'
              : 'bg-surface hover:bg-surface-hover text-text-secondary'
          }`}
        >
          💎 RHOBH
        </button>
      </div>

      {/* Tweet Feed */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredTweets.slice(0, 8).map((tweet) => (
          <div key={tweet.id} className="border-b border-surface-hover/50 pb-4 last:border-b-0">
            <div className="flex space-x-3">
              {/* Avatar */}
              <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-lg flex-shrink-0">
                {tweet.avatar}
              </div>

              {/* Tweet Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold text-text-primary text-sm truncate">
                    {tweet.username}
                  </span>
                  {tweet.verified && (
                    <Verified className="text-blue-500 w-4 h-4 flex-shrink-0" fill="currentColor" />
                  )}
                  <span className="text-text-muted text-sm truncate">
                    {tweet.handle}
                  </span>
                  <span className="text-text-muted text-sm flex-shrink-0">
                    · {tweet.timestamp}
                  </span>
                </div>

                <p className="text-text-secondary text-sm leading-relaxed mb-3">
                  {tweet.content}
                </p>

                {/* Tweet Actions */}
                <div className="flex items-center space-x-6 text-text-muted">
                  <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors group">
                    <MessageCircle size={16} className="group-hover:bg-blue-400/10 rounded-full p-1 w-6 h-6" />
                    <span className="text-xs">{formatNumber(tweet.replies)}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 hover:text-green-400 transition-colors group">
                    <Repeat2 size={16} className="group-hover:bg-green-400/10 rounded-full p-1 w-6 h-6" />
                    <span className="text-xs">{formatNumber(tweet.retweets)}</span>
                  </button>
                  
                  <button className="flex items-center space-x-1 hover:text-red-400 transition-colors group">
                    <Heart size={16} className="group-hover:bg-red-400/10 rounded-full p-1 w-6 h-6" />
                    <span className="text-xs">{formatNumber(tweet.likes)}</span>
                  </button>
                  
                  <button className="hover:text-blue-400 transition-colors group">
                    <Share size={16} className="group-hover:bg-blue-400/10 rounded-full p-1 w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live indicator */}
      <div className="flex items-center justify-center mt-4 text-xs text-text-muted">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse mr-2"></div>
        <span>Live tweets · Updates every 30s</span>
      </div>
    </div>
  )
}