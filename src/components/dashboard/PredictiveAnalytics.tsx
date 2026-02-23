'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, Target, Zap, Brain } from 'lucide-react'
import { ProgressRing } from '@/components/ui/ProgressRing'

interface Prediction {
  id: string
  metric: string
  current: number
  predicted: number
  change: number
  confidence: number
  timeframe: string
  trend: 'up' | 'down' | 'stable'
  risk: 'low' | 'medium' | 'high'
}

export function PredictiveAnalytics() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')

  const businessPredictions: Prediction[] = [
    {
      id: '1',
      metric: 'Monthly Revenue',
      current: 8200,
      predicted: 12300,
      change: 50,
      confidence: 87,
      timeframe: '30 days',
      trend: 'up',
      risk: 'low'
    },
    {
      id: '2',
      metric: 'Client Retention',
      current: 92,
      predicted: 89,
      change: -3,
      confidence: 74,
      timeframe: '60 days',
      trend: 'down',
      risk: 'medium'
    },
    {
      id: '3',
      metric: 'Task Completion',
      current: 68,
      predicted: 82,
      change: 21,
      confidence: 91,
      timeframe: '14 days',
      trend: 'up',
      risk: 'low'
    },
    {
      id: '4',
      metric: 'Cash Flow',
      current: 15600,
      predicted: 18900,
      change: 21,
      confidence: 78,
      timeframe: '30 days',
      trend: 'up',
      risk: 'medium'
    },
    {
      id: '5',
      metric: 'Productivity Score',
      current: 76,
      predicted: 84,
      change: 11,
      confidence: 85,
      timeframe: '21 days',
      trend: 'up',
      risk: 'low'
    },
    {
      id: '6',
      metric: 'Client Acquisition',
      current: 2,
      predicted: 4,
      change: 100,
      confidence: 65,
      timeframe: '45 days',
      trend: 'up',
      risk: 'high'
    }
  ]

  useEffect(() => {
    setPredictions(businessPredictions)
    
    // Simulate real-time prediction updates
    const interval = setInterval(() => {
      setPredictions(prev => prev.map(pred => ({
        ...pred,
        confidence: Math.max(60, Math.min(95, pred.confidence + (Math.random() - 0.5) * 4)),
        predicted: pred.predicted + (Math.random() - 0.5) * (pred.predicted * 0.05)
      })))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="text-success" size={16} />
      case 'down': return <TrendingDown className="text-error" size={16} />
      default: return <Target className="text-warning" size={16} />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'border-red-500 bg-red-500/10'
      case 'medium': return 'border-gold bg-gold/10'
      default: return 'border-success bg-success/10'
    }
  }

  const formatValue = (metric: string, value: number) => {
    if (metric.includes('Revenue') || metric.includes('Cash Flow')) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    if (metric.includes('%') || metric.includes('Retention') || metric.includes('Completion') || metric.includes('Score')) {
      return `${Math.round(value)}%`
    }
    return Math.round(value).toString()
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-success'
    if (change < 0) return 'text-error'
    return 'text-warning'
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Predictive Analytics</h3>
        <div className="flex items-center space-x-1">
          <Brain className="text-purple-500 animate-pulse" size={16} />
          <span className="text-sm text-purple-500">AI Forecast</span>
        </div>
      </div>

      {/* Prediction Accuracy Score */}
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-text-primary">Model Accuracy</div>
            <div className="text-sm text-text-secondary">Based on 90 days of data</div>
          </div>
          <div className="flex items-center space-x-3">
            <ProgressRing 
              progress={82} 
              size={60} 
              strokeWidth={6} 
              color="#8b5cf6" 
            />
            <div className="text-right">
              <div className="text-lg font-bold text-purple-400">82%</div>
              <div className="text-xs text-text-muted">Reliable</div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Frame Selector */}
      <div className="flex space-x-2 mb-4">
        {['7d', '30d', '90d'].map((timeframe) => (
          <button
            key={timeframe}
            onClick={() => setSelectedTimeframe(timeframe)}
            className={`px-3 py-1 rounded text-xs transition-all ${
              selectedTimeframe === timeframe
                ? 'bg-purple-500 text-white'
                : 'bg-surface hover:bg-surface-hover text-text-secondary'
            }`}
          >
            {timeframe === '7d' ? '7 Days' : timeframe === '30d' ? '30 Days' : '90 Days'}
          </button>
        ))}
      </div>

      {/* Predictions Grid */}
      <div className="space-y-3">
        {predictions.slice(0, 4).map((prediction) => (
          <div
            key={prediction.id}
            className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${getRiskColor(prediction.risk)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getTrendIcon(prediction.trend)}
                <span className="font-medium text-text-primary text-sm">
                  {prediction.metric}
                </span>
              </div>
              
              <div className="text-xs text-text-muted">
                {prediction.confidence}% confident
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-text-muted mb-1">Current</div>
                <div className="font-medium text-text-primary">
                  {formatValue(prediction.metric, prediction.current)}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-text-muted mb-1">Predicted</div>
                <div className="font-medium text-text-primary">
                  {formatValue(prediction.metric, prediction.predicted)}
                </div>
              </div>
              
              <div>
                <div className="text-xs text-text-muted mb-1">Change</div>
                <div className={`font-medium ${getChangeColor(prediction.change)}`}>
                  {prediction.change > 0 ? '+' : ''}{prediction.change}%
                </div>
              </div>
            </div>

            {/* Progress Bar for Confidence */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-text-muted">Confidence Level</span>
                <span className="text-xs text-text-secondary">{Math.round(prediction.confidence)}%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-1">
                <div 
                  className="h-1 rounded-full transition-all duration-1000"
                  style={{
                    width: `${prediction.confidence}%`,
                    backgroundColor: prediction.confidence > 80 ? '#10b981' : 
                                   prediction.confidence > 60 ? '#fbbf24' : '#ef4444'
                  }}
                />
              </div>
            </div>

            {/* Risk Indicator */}
            <div className="mt-2 flex items-center justify-between">
              <span className={`px-2 py-1 rounded text-xs ${
                prediction.risk === 'high' ? 'bg-red-500/20 text-red-300' :
                prediction.risk === 'medium' ? 'bg-gold/20 text-gold' :
                'bg-success/20 text-success'
              }`}>
                {prediction.risk.toUpperCase()} RISK
              </span>
              
              <span className="text-xs text-text-muted">
                in {prediction.timeframe}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="mt-4 pt-4 border-t border-surface-hover/50">
        <div className="text-sm font-medium text-text-primary mb-3">AI Recommendations</div>
        <div className="space-y-2">
          <div className="flex items-start space-x-2 text-xs">
            <Zap size={12} className="text-gold flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-text-primary font-medium">Focus on Client Retention</div>
              <div className="text-text-secondary">3% predicted decline needs immediate attention</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 text-xs">
            <Target size={12} className="text-success flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-text-primary font-medium">Revenue Momentum Strong</div>
              <div className="text-text-secondary">50% growth trajectory - maintain current strategy</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 text-xs">
            <AlertTriangle size={12} className="text-warning flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-text-primary font-medium">Cash Flow Timing</div>
              <div className="text-text-secondary">Prepare for 21-day collection cycle</div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance */}
      <div className="mt-4 pt-3 border-t border-surface-hover/50">
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="font-medium text-purple-400">Model Training</div>
            <div className="text-text-muted">90 Days</div>
          </div>
          <div>
            <div className="font-medium text-blue-400">Data Points</div>
            <div className="text-text-muted">2,847</div>
          </div>
          <div>
            <div className="font-medium text-success">Accuracy</div>
            <div className="text-text-muted">82.3%</div>
          </div>
        </div>
      </div>
    </div>
  )
}