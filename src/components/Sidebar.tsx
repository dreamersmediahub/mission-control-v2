'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: 'Dashboard', icon: '🏠' },
  { href: '/inbox', label: 'Inbox', icon: '📬' },
  { href: '/agents', label: 'The Office', icon: '🏢' },
  { href: '/tasks', label: 'Tasks', icon: '✅' },
  { href: '/memory', label: 'Memory', icon: '🧠' },
  { href: '/content', label: 'Content', icon: '🎬' },
  { href: '/calendar', label: 'Calendar', icon: '📅' },
  { href: '/finances', label: 'Finances', icon: '💰' },
  { href: '/health', label: 'Health', icon: '💊' },
  { href: '/personal', label: 'Personal', icon: '✨' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, width: 220,
      background: '#080808', borderRight: '1px solid #181818',
      display: 'flex', flexDirection: 'column', zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #141414' }}>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, color: '#ffd70066', textTransform: 'uppercase', marginBottom: 4 }}>Dreamers Media</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>Mission Control</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {NAV.map(item => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 8,
                marginBottom: 2,
                background: active ? '#ffd70015' : 'transparent',
                border: `1px solid ${active ? '#ffd70033' : 'transparent'}`,
                color: active ? '#ffd700' : '#555',
                fontWeight: active ? 700 : 400,
                fontSize: 13, textDecoration: 'none',
                transition: 'all 0.12s',
              }}
            >
              <span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>{item.icon}</span>
              <span>{item.label}</span>
              {active && <span style={{ marginLeft: 'auto', width: 4, height: 4, borderRadius: '50%', background: '#ffd700' }} />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid #141414' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #ffd700, #ff8c00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 800, color: '#000', flexShrink: 0,
          }}>K</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#e2e2e2' }}>Kyle</div>
            <div style={{ fontSize: 10, color: '#555' }}>support@dreamersmedia.co</div>
          </div>
        </div>
      </div>
    </aside>
  )
}