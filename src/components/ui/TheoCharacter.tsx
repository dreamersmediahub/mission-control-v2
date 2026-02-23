'use client'

import { useState, useEffect } from 'react'
import { X, MessageCircle } from 'lucide-react'
import { useDashboardStore } from '@/stores/dashboard'

interface TheoMessage {
  id: string
  message: string
  type: 'tip' | 'sassy' | 'encouraging' | 'warning' | 'celebration'
  emoji: string
}

export function TheoCharacter() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMessage, setCurrentMessage] = useState<TheoMessage | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Get dashboard state for context-aware messages
  const { stats, agents, todayTasks } = useDashboardStore()

  const theoMessages: TheoMessage[] = [
    {
      id: '1',
      message: "Oi! Your tasks are looking a bit neglected. Time to get your shit together, yeah?",
      type: 'sassy',
      emoji: '🦞'
    },
    {
      id: '2', 
      message: "Nice work on that revenue bump! I see you're finally listening to my brilliant advice 😏",
      type: 'encouraging',
      emoji: '💰'
    },
    {
      id: '3',
      message: "Pro tip: When your ADHD brain goes offline, just press that panic button. I've got your back!",
      type: 'tip',
      emoji: '🧠'
    },
    {
      id: '4',
      message: "Fucking hell, Kyle! 3 agents online and crushing it! This is proper delegation!",
      type: 'celebration',
      emoji: '🎉'
    },
    {
      id: '5',
      message: "Those invoices won't chase themselves. Want me to draft some passive-aggressive follow-ups?",
      type: 'sassy',
      emoji: '📧'
    },
    {
      id: '6',
      message: "Remember: Systems > Willpower. Stop trying to muscle through everything like a dickhead!",
      type: 'tip',
      emoji: '⚡'
    },
    {
      id: '7',
      message: "Mission Control looking slick today! I'm basically your digital guardian angel... with attitude 😈",
      type: 'sassy',
      emoji: '👼'
    },
    {
      id: '8',
      message: "Time to call Nana Rose? The family connection widget is giving me serious feels 🥺",
      type: 'encouraging',
      emoji: '📞'
    },
    {
      id: '9',
      message: "WARNING: You've been staring at this dashboard for ages. Blink and hydrate, you muppet!",
      type: 'warning',
      emoji: '💧'
    },
    {
      id: '10',
      message: "Fun fact: I'm processing your business data 24/7 while you sleep. You're welcome! 😴",
      type: 'tip',
      emoji: '🌙'
    },
    {
      id: '11',
      message: "Kyle, mate... Whitney's stirring shit in Salt Lake again. Check your RHOSLC updates 👀",
      type: 'sassy',
      emoji: '⛷️'
    },
    {
      id: '12',
      message: "Your manifestation tracker says 'household name.' I'm manifesting you actually using it!",
      type: 'encouraging',
      emoji: '✨'
    },
    {
      id: '13',
      message: "3 agents busy, 0 excuses. This is what peak performance looks like! 🔥",
      type: 'celebration',
      emoji: '🔥'
    },
    {
      id: '14',
      message: "Irish time widget showing it's perfect for calling home. Do it. Now. Before I nag more.",
      type: 'encouraging',
      emoji: '🍀'
    },
    {
      id: '15',
      message: "That creative energy hub is calling your name. Stop procrastinating and CREATE something!",
      type: 'tip',
      emoji: '🎨'
    },
    {
      id: '16', 
      message: "Someone's been betrayed in the castle! Traitors US drama levels are through the roof 🏰",
      type: 'encouraging',
      emoji: '🗡️'
    },
    {
      id: '17',
      message: "RHOBH serving Crystal clear drama! Kyle and Dorit's friendship is messier than your desk 💎",
      type: 'sassy', 
      emoji: '💎'
    },
    {
      id: '18',
      message: "Salt Lake City chaos level: Whitney. Need I say more? ⛷️ Check that drama tracker!",
      type: 'celebration',
      emoji: '🔥'
    },
    {
      id: '19',
      message: "Twitter's going mental about tonight's Traitors episode. Check the feed, it's chaos! 🐦",
      type: 'encouraging',
      emoji: '📱'
    },
    {
      id: '20',
      message: "The Twitter girlies are DRAGGING Kyle Richards and honestly? They're not wrong 💅 #RHOBH",
      type: 'sassy',
      emoji: '🔥'
    }
  ]

  const getContextualMessage = (): TheoMessage => {
    // Context-aware messages based on dashboard state
    const completionRate = stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0
    const onlineAgents = agents.filter(a => a.status === 'online').length
    
    if (completionRate < 30) {
      return {
        id: 'context-low-completion',
        message: `${completionRate}% task completion? Come on Kyle, I've seen toddlers with better follow-through!`,
        type: 'sassy',
        emoji: '🦞'
      }
    }
    
    if (completionRate > 80) {
      return {
        id: 'context-high-completion',
        message: `${completionRate}% completion rate! Fucking brilliant! This is the Kyle I know and love!`,
        type: 'celebration', 
        emoji: '🎉'
      }
    }
    
    if (onlineAgents >= 4) {
      return {
        id: 'context-agents-online',
        message: `${onlineAgents} agents online! Your digital army is locked and loaded. Time to conquer the day!`,
        type: 'celebration',
        emoji: '🚀'
      }
    }
    
    if (stats.pendingInvoices > 2) {
      return {
        id: 'context-invoices',
        message: `${stats.pendingInvoices} pending invoices, Kyle. Chase that money or I'll do it for you... and I won't be nice about it 😈`,
        type: 'warning',
        emoji: '💸'
      }
    }
    
    // Default to random message
    return theoMessages[Math.floor(Math.random() * theoMessages.length)]
  }

  const showRandomMessage = () => {
    const message = Math.random() > 0.3 ? getContextualMessage() : theoMessages[Math.floor(Math.random() * theoMessages.length)]
    setCurrentMessage(message)
    setIsVisible(true)
    setIsAnimating(true)

    // Auto-hide after 8 seconds
    setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentMessage(null)
        setIsAnimating(false)
      }, 500)
    }, 8000)
  }

  useEffect(() => {
    // Show initial message after 3 seconds
    const initialTimer = setTimeout(() => {
      showRandomMessage()
    }, 3000)

    // Then show messages every 30-60 seconds
    const interval = setInterval(() => {
      if (!isVisible && Math.random() > 0.3) { // 70% chance to show
        showRandomMessage()
      }
    }, 45000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [isVisible])

  const getMessageStyles = (type: string) => {
    switch (type) {
      case 'sassy': return 'border-pink-500 bg-pink-500/10 text-pink-300'
      case 'encouraging': return 'border-success bg-success/10 text-success' 
      case 'tip': return 'border-gold bg-gold/10 text-gold'
      case 'warning': return 'border-warning bg-warning/10 text-warning'
      case 'celebration': return 'border-purple-500 bg-purple-500/10 text-purple-300'
      default: return 'border-info bg-info/10 text-info'
    }
  }

  if (!currentMessage) return null

  return (
    <>
      {/* Theo Character */}
      <div 
        className={`fixed bottom-20 left-8 z-50 transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
      >
        {/* Character Avatar */}
        <div className="relative">
          <div 
            className={`w-16 h-16 rounded-full bg-gradient-to-br from-gold to-orange-500 border-2 border-gold shadow-lg transition-all duration-300 ${
              isAnimating && isVisible ? 'animate-theo-talk' : 'hover:scale-110 hover:animate-theo-bounce'
            } cursor-pointer flex items-center justify-center text-2xl relative overflow-hidden`}
            onClick={() => !isVisible ? showRandomMessage() : setIsVisible(false)}
            style={{
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
            }}
          >
            {/* Theo's expressions */}
            <span className={`transition-all duration-300 ${isVisible ? 'animate-pulse' : ''}`}>
              🦞
            </span>
            
            {/* Personality sparkles */}
            {isAnimating && (
              <>
                <div className="absolute top-1 right-1 text-xs animate-ping">✨</div>
                <div className="absolute bottom-1 left-1 text-xs animate-pulse">💫</div>
              </>
            )}
          </div>

          {/* Speech indicator */}
          {isVisible && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full animate-pulse flex items-center justify-center">
              <MessageCircle size={10} className="text-background" />
            </div>
          )}
        </div>
      </div>

      {/* Message Bubble */}
      {isVisible && currentMessage && (
        <div 
          className={`fixed bottom-40 left-8 z-50 max-w-xs transition-all duration-500 ${
            isVisible ? 'translate-y-0 opacity-100 scale-100 animate-speech-pop' : 'translate-y-4 opacity-0 scale-95'
          }`}
        >
          <div className={`border-2 rounded-lg p-4 backdrop-blur-md relative ${getMessageStyles(currentMessage.type)} shadow-xl`}
            style={{
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 215, 0, 0.2)'
            }}
          >
            {/* Speech bubble arrow */}
            <div 
              className={`absolute -bottom-2 left-8 w-4 h-4 rotate-45 border-r-2 border-b-2 ${getMessageStyles(currentMessage.type)} backdrop-blur-md`}
            />
            
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-2">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{currentMessage.emoji}</span>
                  <span className="font-bold text-sm">Theo</span>
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  {currentMessage.message}
                </p>
              </div>
              
              <button
                onClick={() => setIsVisible(false)}
                className="text-text-muted hover:text-text-secondary transition-colors p-1"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click anywhere to manually trigger */}
      <div 
        className="fixed bottom-4 left-4 text-xs text-text-muted opacity-50 hover:opacity-100 transition-opacity cursor-pointer z-40"
        onClick={showRandomMessage}
      >
        💭 Click Theo for wisdom
      </div>
    </>
  )
}
