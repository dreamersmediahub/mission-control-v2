'use client'

import { useState } from 'react'
import { Mail, AlertCircle, Star, Archive, Trash2, Reply, Forward, Eye, DollarSign } from 'lucide-react'

export function EmailIntelligence() {
  const [emailStats] = useState({
    unread: 47,
    priority: 8,
    invoiceRequests: 3,
    clientReplies: 5,
    newsletters: 12,
    spam: 19
  })

  // AI-powered email categorization and prioritization
  const priorityEmails = [
    {
      id: '1',
      from: 'Krissy Marsh',
      subject: 'Episode 48 Changes - URGENT',
      preview: 'Kyle, need to discuss some last-minute changes for tomorrow\'s episode...',
      aiPriority: 10,
      category: 'client-urgent',
      sentiment: 'stressed',
      timeReceived: new Date(Date.now() - 20 * 60 * 1000),
      containsInvoiceRequest: false,
      suggestedAction: 'Call immediately',
      clientValue: 'high'
    },
    {
      id: '2',
      from: 'Stella Private - Ben',
      subject: 'Re: Podcast Studio Setup',
      preview: 'Perfect! Let\'s schedule the call for next week. Also wanted to discuss...',
      aiPriority: 8,
      category: 'client-response',
      sentiment: 'positive',
      timeReceived: new Date(Date.now() - 2 * 60 * 60 * 1000),
      containsInvoiceRequest: false,
      suggestedAction: 'Schedule follow-up',
      clientValue: 'high'
    },
    {
      id: '3',
      from: 'Chicken and Chips',
      subject: 'Payment Query - Invoice #047',
      preview: 'Hi Kyle, just checking on the payment terms for the recent invoice...',
      aiPriority: 7,
      category: 'invoice-related',
      sentiment: 'neutral',
      timeReceived: new Date(Date.now() - 4 * 60 * 60 * 1000),
      containsInvoiceRequest: false,
      suggestedAction: 'Send payment link',
      clientValue: 'medium'
    },
    {
      id: '4',
      from: 'Josh Inbari',
      subject: 'Dinner tonight?',
      preview: 'Hey babe, wondering if you want to try that new place in Surry Hills...',
      aiPriority: 6,
      category: 'personal',
      sentiment: 'loving',
      timeReceived: new Date(Date.now() - 6 * 60 * 60 * 1000),
      containsInvoiceRequest: false,
      suggestedAction: 'Sweet reply',
      clientValue: 'personal'
    },
    {
      id: '5',
      from: 'Adobe Creative Suite',
      subject: 'Your subscription expires in 5 days',
      preview: 'Don\'t lose access to your creative tools. Renew now to continue...',
      aiPriority: 5,
      category: 'subscription',
      sentiment: 'neutral',
      timeReceived: new Date(Date.now() - 8 * 60 * 60 * 1000),
      containsInvoiceRequest: false,
      suggestedAction: 'Auto-renew or delegate to ops agent',
      clientValue: 'business'
    }
  ]

  const aiInsights = [
    '💰 3 clients mentioned budget approvals this week - good time to follow up',
    '📈 Response rate 23% higher when you email before 10 AM',
    '⏰ Krissy emails marked "urgent" 67% of the time - check stress patterns',
    '🎯 Ben from Stella responds fastest to voice messages over email',
    '📊 Invoice follow-ups get 3x response rate with personal touch'
  ]

  const getPriorityColor = (priority: number) => {
    if (priority >= 9) return 'border-l-4 border-error bg-error/10'
    if (priority >= 7) return 'border-l-4 border-warning bg-warning/10'
    if (priority >= 5) return 'border-l-4 border-info bg-info/10'
    return 'border-l-4 border-text-muted bg-surface/20'
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'stressed': return '😰'
      case 'positive': return '😊'
      case 'loving': return '🥰'
      case 'excited': return '🤩'
      case 'neutral': return '😐'
      default: return '📧'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'client-urgent': return <AlertCircle className="text-error" size={16} />
      case 'client-response': return <Reply className="text-success" size={16} />
      case 'invoice-related': return <DollarSign className="text-warning" size={16} />
      case 'personal': return <Star className="text-pink-400" size={16} />
      case 'subscription': return <Archive className="text-info" size={16} />
      default: return <Mail className="text-text-muted" size={16} />
    }
  }

  const handleQuickAction = (emailId: string, action: string) => {
    console.log(`Quick action: ${action} for email ${emailId}`)
    // TODO: Integrate with Gmail API
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Email Intelligence</h3>
        <div className="flex items-center space-x-2">
          <div className="bg-error text-white text-xs font-bold px-2 py-1 rounded-full">
            {emailStats.unread}
          </div>
          <Mail className="text-info animate-pulse" size={16} />
        </div>
      </div>

      {/* Email Stats Overview */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 rounded bg-error/10 border border-error/30">
          <div className="text-lg font-bold text-error">{emailStats.priority}</div>
          <div className="text-xs text-text-secondary">Priority</div>
        </div>
        <div className="text-center p-2 rounded bg-warning/10 border border-warning/30">
          <div className="text-lg font-bold text-warning">{emailStats.invoiceRequests}</div>
          <div className="text-xs text-text-secondary">Invoice Related</div>
        </div>
        <div className="text-center p-2 rounded bg-success/10 border border-success/30">
          <div className="text-lg font-bold text-success">{emailStats.clientReplies}</div>
          <div className="text-xs text-text-secondary">Client Replies</div>
        </div>
      </div>

      {/* Priority Email Queue */}
      <div className="space-y-3 mb-4">
        {priorityEmails.slice(0, 3).map((email) => (
          <div key={email.id} className={`p-3 rounded-lg ${getPriorityColor(email.aiPriority)} hover:scale-[1.01] transition-all cursor-pointer`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(email.category)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-text-primary text-sm">{email.from}</h4>
                    <span className="text-lg">{getSentimentIcon(email.sentiment)}</span>
                    {email.clientValue === 'high' && (
                      <Star className="text-gold" size={12} />
                    )}
                  </div>
                  <p className="text-sm font-medium text-text-primary mt-1">{email.subject}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-error">
                  P{email.aiPriority}/10
                </div>
                <div className="text-xs text-text-muted">
                  {email.timeReceived.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-text-secondary mb-2 line-clamp-2">
              {email.preview}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-gold font-medium">
                💡 {email.suggestedAction}
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => handleQuickAction(email.id, 'reply')}
                  className="p-1 rounded hover:bg-surface/50 transition-colors"
                >
                  <Reply size={12} className="text-text-muted hover:text-success" />
                </button>
                <button 
                  onClick={() => handleQuickAction(email.id, 'archive')}
                  className="p-1 rounded hover:bg-surface/50 transition-colors"
                >
                  <Archive size={12} className="text-text-muted hover:text-info" />
                </button>
                <button 
                  onClick={() => handleQuickAction(email.id, 'mark-read')}
                  className="p-1 rounded hover:bg-surface/50 transition-colors"
                >
                  <Eye size={12} className="text-text-muted hover:text-warning" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="border-t border-surface-hover pt-4 mb-4">
        <h4 className="font-medium text-text-primary mb-2 flex items-center space-x-1">
          <span>🧠</span>
          <span>AI Insights</span>
        </h4>
        <div className="space-y-1">
          {aiInsights.slice(0, 3).map((insight, i) => (
            <div key={i} className="text-sm text-text-secondary">
              {insight}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button className="btn-primary text-sm flex items-center justify-center space-x-1">
          <Mail size={12} />
          <span>Open Gmail</span>
        </button>
        <button className="btn-secondary text-sm flex items-center justify-center space-x-1">
          <Archive size={12} />
          <span>Bulk Archive</span>
        </button>
      </div>

      {/* Smart Quote */}
      <div className="mt-4 text-center border-t border-surface-hover pt-3">
        <p className="text-xs text-info italic">
          "Email is just another creative medium when you approach it strategically" 📧
        </p>
      </div>
    </div>
  )
}