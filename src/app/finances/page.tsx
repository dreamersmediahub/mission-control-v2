import { createServerClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function FinancesPage() {
  const supabase = createServerClient()
  const { data: entries } = await supabase
    .from('financial_entries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  const all = entries ?? []
  const income = all.filter((e: any) => e.type === 'income').reduce((s: number, e: any) => s + (e.amount ?? 0), 0)
  const expenses = all.filter((e: any) => e.type === 'expense').reduce((s: number, e: any) => s + (e.amount ?? 0), 0)

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: '#ffd700', textTransform: 'uppercase', marginBottom: 6 }}>Dreamers Media</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: 0 }}>Finances</h1>
        <div style={{ color: '#555', fontSize: 13, marginTop: 4 }}>Revenue, invoices, and business pulse</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Income (all time)', value: `£${income.toLocaleString()}`, color: '#4ade80' },
          { label: 'Expenses (all time)', value: `£${expenses.toLocaleString()}`, color: '#f87171' },
          { label: 'Net', value: `£${(income - expenses).toLocaleString()}`, color: income > expenses ? '#4ade80' : '#f87171' },
        ].map(s => (
          <div key={s.label} style={{ background: '#111', border: '1px solid #252525', borderRadius: 10, padding: '16px 20px' }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#555', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {all.length === 0 ? (
        <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, padding: '40px 20px', textAlign: 'center', color: '#333', fontSize: 13 }}>
          No financial entries yet. ops-arch and xero-worker will populate this when Xero credentials are fixed.
        </div>
      ) : (
        <div style={{ background: '#111', border: '1px solid #252525', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: '#0d0d0d' }}>
                {['Date', 'Description', 'Type', 'Amount'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 16px', fontSize: 9, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#555', borderBottom: '1px solid #1a1a1a' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {all.map((e: any) => (
                <tr key={e.id} style={{ borderBottom: '1px solid #141414' }}>
                  <td style={{ padding: '10px 16px', color: '#555', fontSize: 11 }}>{new Date(e.created_at).toLocaleDateString('en-IE')}</td>
                  <td style={{ padding: '10px 16px', color: '#e2e2e2' }}>{e.description}</td>
                  <td style={{ padding: '10px 16px' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, textTransform: 'uppercase', background: e.type === 'income' ? '#4ade8022' : '#f8717122', color: e.type === 'income' ? '#4ade80' : '#f87171', border: `1px solid ${e.type === 'income' ? '#4ade8044' : '#f8717144'}` }}>{e.type}</span>
                  </td>
                  <td style={{ padding: '10px 16px', fontWeight: 700, color: e.type === 'income' ? '#4ade80' : '#f87171' }}>£{(e.amount ?? 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}