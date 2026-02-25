// @ts-nocheck
'use client'

import { Layout } from '@/components/Layout'
import { formatCurrency, formatDate } from '@/lib/utils'
import { User, Mail, Phone, DollarSign, Calendar, Plus } from 'lucide-react'

export default function ClientsPage() {
  // Kyle's actual clients with real data
  const clients = [
    {
      id: 'krissy',
      name: 'Krissy Marsh',
      company: 'Wildly Inappropriate Podcast',
      email: 'krissy@example.com',
      phone: '+61 400 000 001',
      status: 'active',
      totalValue: 28800,
      outstandingBalance: 3500,
      lastContact: new Date('2026-02-22'),
      avatar: '🎙️',
      notes: 'Main client. $800/episode weekly. Episodes pre-recorded through May. Also building Anusa Property website.',
      recentActivity: 'Episode 47 final edit pending'
    },
    {
      id: 'stella',
      name: 'Ben (Stella Private)',
      company: 'Stella Private Wealth Concierge',
      email: 'ben@stellaprivate.com',
      phone: '+61 400 000 002',
      status: 'active',
      totalValue: 24800,
      outstandingBalance: 0,
      lastContact: new Date('2026-02-23'),
      avatar: '💎',
      notes: 'Ultra-high-net-worth concierge. Completed $22-24K project. Recent $5.5K payment received. Podcast setup upcoming.',
      recentActivity: 'Payment received - $5,500'
    },
    {
      id: 'ccc',
      name: 'Chicken and Chips',
      company: 'The Sauce Podcast / Casting Network',
      email: 'hello@chickenandchips.com',
      phone: '+61 400 000 003',
      status: 'active',
      totalValue: 1200,
      outstandingBalance: 1200,
      lastContact: new Date('2026-02-21'),
      avatar: '🎬',
      notes: 'Squarespace landing pages + Substack integration. $1,200 quoted. 3-day audition shoot editing overdue.',
      recentActivity: 'Awaiting project delivery'
    },
    {
      id: 'jacinta',
      name: 'Jacinta',
      company: 'Skincare Services',
      email: 'jacinta@example.com',
      phone: '+61 400 000 004',
      status: 'active',
      totalValue: 0,
      outstandingBalance: 0,
      lastContact: new Date('2026-02-19'),
      avatar: '✨',
      notes: 'Reciprocal agreement - skincare treatments in exchange for website work',
      recentActivity: 'Website updates in progress'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success'
      case 'inactive': return 'bg-text-muted/20 text-text-muted'
      case 'prospect': return 'bg-info/20 text-info'
      default: return 'bg-text-muted/20 text-text-muted'
    }
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Client & Business Intelligence</h1>
            <p className="text-text-secondary">Professional relationship management for Dreamers Media</p>
          </div>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={16} />
            <span>New Client</span>
          </button>
        </div>

        {/* Client Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">{clients.length}</div>
              <div className="text-sm text-text-secondary">Total Clients</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">
                {clients.filter(c => c.status === 'active').length}
              </div>
              <div className="text-sm text-text-secondary">Active Clients</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-text-primary">
                {formatCurrency(clients.reduce((sum, c) => sum + c.totalValue, 0))}
              </div>
              <div className="text-sm text-text-secondary">Total Value</div>
            </div>
          </div>
          <div className="card">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">
                {formatCurrency(clients.reduce((sum, c) => sum + c.outstandingBalance, 0))}
              </div>
              <div className="text-sm text-text-secondary">Outstanding</div>
            </div>
          </div>
        </div>

        {/* Client Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {clients.map((client) => (
            <div key={client.id} className="card hover:scale-[1.02] transition-all duration-300">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{client.avatar}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{client.name}</h3>
                    {client.company && (
                      <p className="text-sm text-text-secondary">{client.company}</p>
                    )}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                  {client.status}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-text-muted">
                  <Mail size={14} />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-text-muted">
                  <Phone size={14} />
                  <span>{client.phone}</span>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 rounded-lg bg-surface/30">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign size={16} className="text-success mr-1" />
                    <span className="text-sm font-semibold text-text-primary">
                      {formatCurrency(client.totalValue)}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">Total Value</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-surface/30">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign size={16} className={client.outstandingBalance > 0 ? "text-warning" : "text-success"} />
                    <span className="text-sm font-semibold text-text-primary">
                      {formatCurrency(client.outstandingBalance)}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">Outstanding</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mb-4">
                <div className="p-3 rounded-lg bg-gold/10 border border-gold/20">
                  <p className="text-xs font-medium text-gold mb-1">Latest Activity</p>
                  <p className="text-sm text-text-primary">{client.recentActivity}</p>
                </div>
              </div>

              {/* Last Contact */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-sm text-text-muted">
                  <Calendar size={14} />
                  <span>Last contact: {formatDate(client.lastContact)}</span>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-4">
                <p className="text-sm text-text-secondary line-clamp-3">{client.notes}</p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                  <Mail size={16} />
                  <span>Contact</span>
                </button>
                <button className="flex-1 btn-secondary">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}