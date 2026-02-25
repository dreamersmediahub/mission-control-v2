import { createServerClient } from '@/lib/supabase'
import { DollarSign } from 'lucide-react'

export const revalidate = 60

export default async function FinancesPage() {
  const supabase = createServerClient()
  const { data: entries } = await supabase
    .from('financial_entries')
    .select('*')
    .order('date', { ascending: false })
    .limit(50)
  const all = entries ?? []

  const income   = all.filter(e => e.type === 'income').reduce((s, e) => s + Number(e.amount), 0)
  const expenses = all.filter(e => e.type === 'expense').reduce((s, e) => s + Number(e.amount), 0)
  const net = income - expenses

  const invoiceStatusColors: Record<string, string> = {
    draft:   '#555',
    sent:    '#60a5fa',
    paid:    '#4ade80',
    overdue: '#f87171',
  }

  return (
    <div className="p-6 max-w-[1000px]">
      <div className="mb-6">
        <p className="text-[10px] font-bold tracking-[4px] uppercase text-[#fb923c] mb-1">FINANCIAL</p>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <DollarSign size={22} className="text-[#fb923c]" /> Finances
        </h1>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Income',   value: income,   color: '#4ade80' },
          { label: 'Expenses', value: expenses,  color: '#f87171' },
          { label: 'Net',      value: net,       color: net >= 0 ? '#4ade80' : '#f87171' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[#111] border border-[#252525] rounded-xl p-4">
            <p className="text-[11px] text-[#555] uppercase tracking-wider font-medium mb-1">{label}</p>
            <p className="text-2xl font-bold font-mono" style={{ color }}>
              {net < 0 && label === 'Net' ? '-' : ''}${Math.abs(value).toLocaleString('en-AU', { minimumFractionDigits: 2 })}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-[#111] border border-[#252525] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[#252525]">
          <p className="text-sm font-semibold text-white">Recent Entries</p>
        </div>
        {all.length === 0 ? (
          <div className="p-8 text-center text-[#333] text-sm">No financial entries yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1a1a1a]">
                  {['Date', 'Description', 'Category', 'Client', 'Amount', 'Status'].map(h => (
                    <th key={h} className="px-4 py-2.5 text-left text-[10px] font-semibold text-[#444] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {all.map(e => (
                  <tr key={e.id} className="border-b border-[#0d0d0d] hover:bg-[#0d0d0d] transition-colors">
                    <td className="px-4 py-2.5 text-xs text-[#555] font-mono">{e.date}</td>
                    <td className="px-4 py-2.5 text-xs text-white">{e.description}</td>
                    <td className="px-4 py-2.5 text-xs text-[#555]">{e.category ?? '—'}</td>
                    <td className="px-4 py-2.5 text-xs text-[#555]">{e.client ?? '—'}</td>
                    <td className="px-4 py-2.5 text-xs font-mono font-medium" style={{ color: e.type === 'income' ? '#4ade80' : '#f87171' }}>
                      {e.type === 'income' ? '+' : '-'}${Number(e.amount).toLocaleString('en-AU', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-4 py-2.5">
                      {e.invoice_status && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded font-medium"
                          style={{
                            backgroundColor: (invoiceStatusColors[e.invoice_status] ?? '#555') + '20',
                            color: invoiceStatusColors[e.invoice_status] ?? '#555',
                          }}
                        >
                          {e.invoice_status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}