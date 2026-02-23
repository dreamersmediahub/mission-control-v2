'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Send, Brain, Zap, TrendingUp, AlertTriangle, Sparkles } from 'lucide-react'
import { NeonButton } from '@/components/ui/NeonButton'

interface AIInsight {
  id: string
  type: 'prediction' | 'anomaly' | 'recommendation' | 'automation'
  title: string
  message: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  actionable: boolean
  icon: any
}

interface VoiceCommand {
  id: string
  command: string
  response: string
  timestamp: Date
}

export function AIAssistant() {
  const [isListening, setIsListening] = useState(false)
  const [voiceInput, setVoiceInput] = useState('')
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [recentCommands, setRecentCommands] = useState<VoiceCommand[]>([])
  const [isThinking, setIsThinking] = useState(false)

  const aiPredictions: AIInsight[] = [
    {
      id: '1',
      type: 'prediction',
      title: 'Revenue Forecast Alert',
      message: 'Based on current client patterns, you\'re likely to hit $12K this month - 18% above target. Krissy Marsh shows 95% probability of contract renewal.',
      confidence: 87,
      impact: 'high',
      actionable: true,
      icon: TrendingUp
    },
    {
      id: '2',
      type: 'anomaly',
      title: 'Client Health Warning',
      message: 'Chicken and Chips project shows concerning patterns: 15 days overdue, 3 missed check-ins. AI suggests immediate intervention to prevent churn.',
      confidence: 92,
      impact: 'high',
      actionable: true,
      icon: AlertTriangle
    },
    {
      id: '3',
      type: 'recommendation',
      title: 'ADHD Productivity Optimization',
      message: 'Your focus patterns show peak performance at 10:30 AM and 2:15 PM. Schedule complex tasks during these windows for 34% efficiency boost.',
      confidence: 78,
      impact: 'medium',
      actionable: true,
      icon: Brain
    },
    {
      id: '4',
      type: 'automation',
      title: 'Smart Invoice Opportunity',
      message: 'Detected 3 completed milestones ready for invoicing. AI can auto-generate invoices with 95% accuracy based on your historical patterns.',
      confidence: 95,
      impact: 'high',
      actionable: true,
      icon: Zap
    },
    {
      id: '5',
      type: 'prediction',
      title: 'Market Trend Analysis',
      message: 'Podcast production demand forecasted to increase 23% in Q2. Consider expanding service offerings to capture market opportunity.',
      confidence: 81,
      impact: 'medium',
      actionable: true,
      icon: TrendingUp
    }
  ]

  const voiceCommands = [
    { trigger: 'invoice', response: 'Creating invoice for your latest completed work. Would you like me to include the standard terms?' },
    { trigger: 'krissy', response: 'Krissy Marsh: Episode 47 is 85% complete, payment current, next session scheduled for Thursday.' },
    { trigger: 'agents', response: '5 agents currently online. Ops is processing payments, Dev is updating Mission Control, Health is tracking your peptides.' },
    { trigger: 'focus', response: 'Based on your patterns, you have 2 hours of peak focus time remaining today. Perfect for tackling the CCC project.' },
    { trigger: 'money', response: '$3,500 in pending invoices detected. Would you like me to send polite follow-up emails?' },
    { trigger: 'nana', response: 'Last called Nana Rose 3 days ago. Perfect time for your morning call - it\'s 7:30 AM in Dublin.' },
    { trigger: 'tasks', response: '7 tasks pending: 3 urgent, 2 for today, 2 can wait. Shall I prioritize by your energy level?' }
  ]

  const simulateVoiceRecognition = (input: string): string => {
    const lowerInput = input.toLowerCase()
    
    for (const cmd of voiceCommands) {
      if (lowerInput.includes(cmd.trigger)) {
        return cmd.response
      }
    }
    
    return `I understand you said "${input}". Let me process that and provide insights based on your business data.`
  }

  const handleVoiceCommand = (command: string) => {
    setIsThinking(true)
    
    setTimeout(() => {
      const response = simulateVoiceRecognition(command)
      const newCommand: VoiceCommand = {
        id: Date.now().toString(),
        command,
        response,
        timestamp: new Date()
      }
      
      setRecentCommands(prev => [newCommand, ...prev.slice(0, 4)])
      setIsThinking(false)
      setVoiceInput('')
    }, 1500)
  }

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false)
      if (voiceInput.trim()) {
        handleVoiceCommand(voiceInput)
      }
    } else {
      setIsListening(true)
      // Simulate voice input after a delay
      setTimeout(() => {
        const sampleCommands = ['Show me Krissy\'s status', 'How much money is pending?', 'What are my focus hours?', 'Invoice for Stella Private']
        const randomCommand = sampleCommands[Math.floor(Math.random() * sampleCommands.length)]
        setVoiceInput(randomCommand)
      }, 2000)
    }
  }

  useEffect(() => {
    setAiInsights(aiPredictions)
    
    // Simulate new AI insights every 2 minutes
    const interval = setInterval(() => {
      const randomInsight = aiPredictions[Math.floor(Math.random() * aiPredictions.length)]
      setAiInsights(prev => [
        { ...randomInsight, id: Date.now().toString() },
        ...prev.slice(0, 4)
      ])
    }, 120000)

    return () => clearInterval(interval)
  }, [])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'border-red-500 bg-red-500/10 text-red-300'
      case 'medium': return 'border-gold bg-gold/10 text-gold'
      default: return 'border-blue-500 bg-blue-500/10 text-blue-300'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction': return TrendingUp
      case 'anomaly': return AlertTriangle
      case 'recommendation': return Brain
      case 'automation': return Zap
      default: return Sparkles
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">AI Assistant</h3>
        <div className="flex items-center space-x-1">
          <Brain className="text-purple-500 animate-pulse" size={16} />
          <span className="text-sm text-purple-500">Neural Network</span>
        </div>
      </div>

      {/* Voice Interface */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="text-lg">🎤</div>
            <span className="font-medium text-text-primary">Voice Command</span>
          </div>
          
          <NeonButton
            variant="blue"
            size="sm"
            onClick={toggleListening}
            glowing={isListening}
            className="flex items-center space-x-2"
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            <span>{isListening ? 'Stop' : 'Listen'}</span>
          </NeonButton>
        </div>

        {/* Voice Input Display */}
        {(isListening || voiceInput || isThinking) && (
          <div className="mb-3 p-3 bg-surface/50 rounded-lg">
            {isThinking ? (
              <div className="flex items-center space-x-2 text-text-secondary">
                <Brain className="animate-spin" size={16} />
                <span className="italic">AI is thinking...</span>
              </div>
            ) : (
              <div className="text-text-primary">
                {isListening ? (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-red-400">Listening...</span>
                  </div>
                ) : (
                  <span>"{voiceInput}"</span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Recent Commands */}
        {recentCommands.length > 0 && (
          <div className="space-y-2">
            {recentCommands.slice(0, 2).map((cmd) => (
              <div key={cmd.id} className="text-xs">
                <div className="text-blue-400 mb-1">You: {cmd.command}</div>
                <div className="text-text-secondary bg-surface/30 p-2 rounded">
                  AI: {cmd.response}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Insights */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-medium text-text-primary text-sm">Live AI Insights</span>
          <div className="text-xs text-success animate-pulse">● Neural Processing</div>
        </div>

        {aiInsights.slice(0, 3).map((insight) => {
          const IconComponent = getTypeIcon(insight.type)
          
          return (
            <div
              key={insight.id}
              className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${getImpactColor(insight.impact)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <IconComponent size={16} className="flex-shrink-0" />
                  <div className="font-medium text-text-primary text-sm">
                    {insight.title}
                  </div>
                </div>
                
                <div className="text-xs text-text-muted">
                  {insight.confidence}% confidence
                </div>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-3">
                {insight.message}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded text-xs capitalize ${
                    insight.type === 'prediction' ? 'bg-purple-500/20 text-purple-300' :
                    insight.type === 'anomaly' ? 'bg-red-500/20 text-red-300' :
                    insight.type === 'recommendation' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-gold/20 text-gold'
                  }`}>
                    {insight.type}
                  </span>
                  
                  {insight.actionable && (
                    <span className="px-2 py-1 bg-success/20 text-success rounded text-xs">
                      Actionable
                    </span>
                  )}
                </div>

                {insight.actionable && (
                  <NeonButton
                    variant="gold"
                    size="sm"
                    className="text-xs"
                  >
                    Take Action
                  </NeonButton>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* AI Capabilities Summary */}
      <div className="mt-4 pt-4 border-t border-surface-hover/50">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <TrendingUp size={12} className="text-purple-500" />
            <span className="text-text-secondary">Predictive Analytics</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle size={12} className="text-red-500" />
            <span className="text-text-secondary">Anomaly Detection</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain size={12} className="text-blue-500" />
            <span className="text-text-secondary">Natural Language</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap size={12} className="text-gold" />
            <span className="text-text-secondary">Auto Workflows</span>
          </div>
        </div>
      </div>
    </div>
  )
}