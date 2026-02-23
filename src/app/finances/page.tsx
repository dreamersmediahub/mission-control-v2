'use client'

import { Layout } from '@/components/Layout'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, DollarSign, CreditCard, AlertCircle, Calendar } from 'lucide-react'

export default function FinancesPage() {
  // Mock financial data based on Kyle's actual clients
  const outstandingInvoices = [
    {
      id: '1',
      client: 'Krissy Marsh',
      amount: 3500,
      dueDate: new Date('2026-02-20'),
      overdue: true,
      invoiceNumber: 'DMINV-0047'
    },
    {
      id: '2',
      client: 'Chicken and Chips',
      amount: 1200,
      dueDate: new Date('2026-02-28'),
      overdue: false,
      invoiceNumber: 'DMINV-0048'
    }
  ]

  const monthlyStats = {
    revenue: 8200,
    expenses: 3400,
    profit: 4800,
    outstandingTotal: 4700
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Financial Command Center</h1>
          <p className="text-text-secondary">Making money management mechanical, not emotional</p>
        </div>

        {/* Financial Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Monthly Revenue</p>
                <p className="text-2xl font-bold text-success mt-1">
                  {formatCurrency(monthlyStats.revenue)}
                </p>
                <p className="text-xs text-success mt-1">↗ +12% from last month</p>
              </div>
              <TrendingUp className="text-success" size={32} />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Outstanding</p>
                <p className="text-2xl font-bold text-warning mt-1">
                  {formatCurrency(monthlyStats.outstandingTotal)}
                </p>
                <p className="text-xs text-warning mt-1">2 invoices pending</p>
              </div>
              <DollarSign className="text-warning" size={32} />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Monthly Profit</p>
                <p className="text-2xl font-bold text-text-primary mt-1">
                  {formatCurrency(monthlyStats.profit)}
                </p>
                <p className="text-xs text-info mt-1">58% profit margin</p>
              </div>
              <CreditCard className="text-info" size={32} />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Expenses</p>
                <p className="text-2xl font-bold text-text-primary mt-1">
                  {formatCurrency(monthlyStats.expenses)}
                </p>
                <p className="text-xs text-text-muted mt-1">Subscriptions & tools</p>
              </div>
              <AlertCircle className="text-text-muted" size={32} />
            </div>
          </div>
        </div>

        {/* Outstanding Invoices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Outstanding Invoices</h3>
            <div className="space-y-3">
              {outstandingInvoices.map((invoice) => (
                <div key={invoice.id} className="p-4 rounded-lg bg-surface/30 border border-surface-hover">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-text-primary">{invoice.client}</h4>
                      <p className="text-sm text-text-muted">{invoice.invoiceNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-text-primary">
                        {formatCurrency(invoice.amount)}
                      </p>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        invoice.overdue 
                          ? 'bg-error/20 text-error' 
                          : 'bg-warning/20 text-warning'
                      }`}>
                        {invoice.overdue ? 'OVERDUE' : 'PENDING'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-text-muted">
                      <Calendar size={12} />
                      <span>Due {invoice.dueDate.toLocaleDateString('en-AU')}</span>
                    </div>
                    <button className="btn-primary text-xs px-3 py-1">
                      Send Reminder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full btn-primary flex items-center justify-center space-x-2">
                <DollarSign size={16} />
                <span>Create New Invoice</span>
              </button>
              <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <AlertCircle size={16} />
                <span>Chase All Overdue</span>
              </button>
              <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <TrendingUp size={16} />
                <span>Monthly Report</span>
              </button>
            </div>

            {/* Subscription Audit Preview */}
            <div className="mt-6 pt-4 border-t border-surface-hover">
              <h4 className="font-medium text-text-primary mb-2">Subscription Audit</h4>
              <div className="text-sm text-text-secondary space-y-1">
                <div className="flex justify-between">
                  <span>Adobe CC</span>
                  <span className="text-text-primary">$59.99/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>LucidLink</span>
                  <span className="text-text-primary">$115/mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Notion Pro</span>
                  <span className="text-text-primary">$12/mo</span>
                </div>
              </div>
              <button className="w-full mt-3 btn-secondary text-sm">
                Full Audit Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
