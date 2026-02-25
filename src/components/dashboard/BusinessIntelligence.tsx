// @ts-nocheck
'use client'

import { useState } from 'react'
import { TrendingUp, DollarSign, Target, AlertTriangle, Users, Calendar, Zap, Eye } from 'lucide-react'

export function BusinessIntelligence() {
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  
  const businessMetrics = {
    revenue: {
      current: 34500,
      target: 50000,
      growth: 23.4,
      trend: 'up',
      forecast: 42000,
      color: 'success'
    },
    clients: {
      current: 4,
      target: 8,
      growth: 100,
      trend: 'up',
      forecast: 6,
      color: 'info'
    },
    projects: {
      current: 7,
      target: 10,
      growth: 16.7,
      trend: 'up',
      forecast: 9,
      color: 'warning'
    },
    profit_margin: {
      current: 68,
      target: 75,
      growth: 5.2,
      trend: 'up',
      forecast: 72,
      color: 'gold'
    }
  }

  const clientPortfolio = [
    {
      name: 'Krissy Marsh',
      type: 'Recurring Premium',
      value: 28800,
      monthly: 3200,
      retention: 'excellent',
      satisfaction: 9.5,
      growth_potential: 'high',
      risk_level: 'low',
      last_payment: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      next_milestone: 'Anusa Property launch',
      notes: 'Expanding to property development content'
    },
    {
      name: 'Stella Private',
      type: 'Project-Based High-Value',
      value: 24800,
      monthly: 0,
      retention: 'new',
      satisfaction: 9.8,
      growth_potential: 'very high',
      risk_level: 'low',
      last_payment: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      next_milestone: 'Podcast studio setup',
      notes: 'Ultra-high-net-worth concierge services'
    },
    {
      name: 'Chicken and Chips',
      type: 'Project-Based',
      value: 1200,
      monthly: 0,
      retention: 'new',
      satisfaction: 7.5,
      growth_potential: 'medium',
      risk_level: 'medium',
      last_payment: null,
      next_milestone: 'Landing page delivery',
      notes: 'Payment pending, project overdue'
    },
    {
      name: 'Jacinta',
      type: 'Reciprocal',
      value: 0,
      monthly: 0,
      retention: 'stable',
      satisfaction: 8.0,
      growth_potential: 'low',
      risk_level: 'none',
      last_payment: null,
      next_milestone: 'Website completion',
      notes: 'Skincare trade for web work'
    }
  ]

  const businessInsights = [
    {
      type: 'opportunity',
      icon: '🚀',
      title: 'Stella Private Expansion',
      description: 'Ultra-high-net-worth client ready for monthly retainer',
      action: 'Propose podcast network consulting',
      impact: '$8,000 monthly potential',
      confidence: 89
    },
    {
      type: 'risk',
      icon: '⚠️',
      title: 'Single Point of Failure',
      description: '83% of revenue from one client (Krissy)',
      action: 'Diversify client base urgently',
      impact: 'Business stability',
      confidence: 95
    },
    {
      type: 'optimization',
      icon: '⚡',
      title: 'Pricing Strategy',
      description: 'Your rates are 40% below market for video production',
      action: 'Implement premium tier pricing',
      impact: '$15,000 additional monthly',
      confidence: 76
    },
    {
      type: 'growth',
      icon: '📈',
      title: 'Content Creator Economy',
      description: 'Podcast production demand up 340% in APAC',
      action: 'Scale podcast production services',
      impact: 'Market leadership position',
      confidence: 82
    }
  ]

  const cashflowForecast = [
    {
      month: 'Feb 2026',
      income: 8200,
      expenses: 3400,
      net: 4800,
      confidence: 'high'
    },
    {
      month: 'Mar 2026',
      income: 9500,
      expenses: 3600,
      net: 5900,
      confidence: 'medium'
    },
    {
      month: 'Apr 2026',
      income: 12000,
      expenses: 4200,
      net: 7800,
      confidence: 'medium'
    },
    {
      month: 'May 2026',
      income: 15000,
      expenses: 4800,
      net: 10200,
      confidence: 'low'
    }
  ]

  const competitorAnalysis = [
    {
      name: 'Premium Podcast Production',
      market_position: 'Direct Competitor',
      strengths: 'Large team, established processes',
      weaknesses: 'Expensive, less personal',
      opportunity: 'Boutique personal service'
    },
    {
      name: 'Social Media Agencies',
      market_position: 'Adjacent Services',
      strengths: 'Scale, automation',
      weaknesses: 'Generic output, no authenticity',
      opportunity: 'Personal brand specialization'
    },
    {
      name: 'Freelance Creatives',
      market_position: 'Price Competition',
      strengths: 'Low cost, flexible',
      weaknesses: 'Inconsistent quality, no systems',
      opportunity: 'Premium positioning with reliability'
    }
  ]

  const getMetricColor = (metric: string) => {
    const colors = {
      success: 'text-success',
      warning: 'text-warning',
      info: 'text-info',
      gold: 'text-gold',
      error: 'text-error'
    }
    return colors[businessMetrics[metric as keyof typeof businessMetrics].color as keyof typeof colors]
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'border-success bg-success/10'
      case 'risk': return 'border-error bg-error/10'
      case 'optimization': return 'border-warning bg-warning/10'
      case 'growth': return 'border-info bg-info/10'
      default: return 'border-text-muted bg-surface/20'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-success/20 text-success'
      case 'medium': return 'bg-warning/20 text-warning'
      case 'high': return 'bg-error/20 text-error'
      case 'none': return 'bg-text-muted/20 text-text-muted'
      default: return 'bg-info/20 text-info'
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Business Intelligence</h3>
        <TrendingUp className="text-success animate-pulse" size={16} />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="p-3 rounded-lg bg-success/10 border border-success/30">
          <div className="text-lg font-bold text-success">$34.5K</div>
          <div className="text-xs text-text-secondary">Revenue YTD</div>
          <div className="text-xs text-success">+23.4% growth</div>
        </div>
        <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
          <div className="text-lg font-bold text-warning">83%</div>
          <div className="text-xs text-text-secondary">Single Client Risk</div>
          <div className="text-xs text-error">High concentration</div>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">AI Insights</h4>
        <div className="space-y-2">
          <div className="p-2 rounded-lg bg-success/10 border-l-4 border-success">
            <div className="text-sm font-medium text-text-primary">🚀 Stella Private Opportunity</div>
            <div className="text-xs text-text-secondary">Ultra-HNW client ready for $8K monthly retainer</div>
          </div>
          <div className="p-2 rounded-lg bg-error/10 border-l-4 border-error">
            <div className="text-sm font-medium text-text-primary">⚠️ Diversification Risk</div>
            <div className="text-xs text-text-secondary">83% revenue from single client - urgent priority</div>
          </div>
        </div>
      </div>

      {/* Client Health */}
      <div className="mb-4">
        <h4 className="font-medium text-text-primary mb-2">Client Portfolio</h4>
        <div className="space-y-1">
          <div className="flex justify-between items-center p-2 rounded bg-surface/20">
            <div>
              <div className="text-sm font-medium text-text-primary">Krissy Marsh</div>
              <div className="text-xs text-success">Excellent • Low Risk</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-success">$28.8K</div>
              <div className="text-xs text-text-muted">Expanding</div>
            </div>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-surface/20">
            <div>
              <div className="text-sm font-medium text-text-primary">Stella Private</div>
              <div className="text-xs text-info">New • Very High Potential</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-info">$24.8K</div>
              <div className="text-xs text-gold">Upsell Ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button className="btn-primary text-sm">Revenue Forecast</button>
        <button className="btn-secondary text-sm">Client Analysis</button>
      </div>
    </div>
  )
}
