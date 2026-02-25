'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Bot, CheckSquare, FileText,
  DollarSign, Calendar, Heart, Zap
} from 'lucide-react'

const navItems = [
  { href: '/',          label: 'Dashboard', icon: LayoutDashboard },
  { href: '/agents',    label: 'Office',    icon: Bot },
  { href: '/tasks',     label: 'Tasks',     icon: CheckSquare },
  { href: '/content',   label: 'Content',   icon: FileText },
  { href: '/memory',    label: 'Memory',    icon: Zap },
  { href: '/finances',  label: 'Finances',  icon: DollarSign },
  { href: '/calendar',  label: 'Calendar',  icon: Calendar },
  { href: '/health',    label: 'Health',    icon: Heart },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] bg-[#111111] border-r border-[#252525] flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 border-b border-[#252525]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#ffd700] flex items-center justify-center">
            <span className="text-[#0a0a0a] font-black text-sm">D</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Mission Control</p>
            <p className="text-[#555] text-[10px] mt-0.5">Dreamers Media</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? 'bg-[#ffd700]/10 text-[#ffd700] border border-[#ffd700]/20'
                  : 'text-[#777] hover:text-[#e2e2e2] hover:bg-[#181818] border border-transparent'
              }`}
            >
              <Icon size={15} strokeWidth={active ? 2.5 : 1.5} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#252525]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#252525] flex items-center justify-center">
            <span className="text-[10px] text-[#ffd700] font-bold">K</span>
          </div>
          <div>
            <p className="text-[11px] text-white font-medium">Kyle</p>
            <p className="text-[10px] text-[#555]">Dreamers Media</p>
          </div>
        </div>
      </div>
    </aside>
  )
}