// @ts-nocheck
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  Bot,
  CheckSquare,
  DollarSign,
  Users,
  Image,
  Heart,
  Settings,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: Home,
    description: 'Mission Control center'
  },
  { 
    name: 'Agents', 
    href: '/agents', 
    icon: Bot,
    description: 'Manage AI agents'
  },
  { 
    name: 'Tasks', 
    href: '/tasks', 
    icon: CheckSquare,
    description: 'Project management'
  },
  { 
    name: 'Finances', 
    href: '/finances', 
    icon: DollarSign,
    description: 'Money & invoices'
  },
  { 
    name: 'Clients', 
    href: '/clients', 
    icon: Users,
    description: 'Relationships'
  },
  { 
    name: 'Content', 
    href: '/content', 
    icon: Image,
    description: 'Creative pipeline'
  },
  { 
    name: 'Health', 
    href: '/health', 
    icon: Heart,
    description: 'Wellness tracking'
  },
  { 
    name: 'Automations', 
    href: '/automations', 
    icon: Settings,
    description: 'System controls'
  }
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-surface-hover lg:glass">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 border-b border-surface-hover">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🎯</div>
              <div>
                <h1 className="text-lg font-bold text-text-primary">Mission Control</h1>
                <p className="text-xs text-text-secondary">Kyle's OS</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col py-6">
            <nav className="flex-1 px-4 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gold text-primary shadow-lg scale-105'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover hover:scale-105'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 transition-colors ${
                        isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-primary'
                      }`}
                    />
                    <div className="flex-1">
                      <div>{item.name}</div>
                      <div className={`text-xs ${
                        isActive ? 'text-primary/80' : 'text-text-muted group-hover:text-text-secondary'
                      }`}>
                        {item.description}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </nav>

            {/* Status Footer */}
            <div className="px-4 mt-6">
              <div className="p-3 rounded-lg bg-surface/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-text-primary">System Status</span>
                  <div className="status-dot status-online"></div>
                </div>
                <div className="text-xs text-text-secondary">
                  All systems operational
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface border border-surface-hover text-text-primary hover:bg-surface-hover transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <nav className="fixed inset-y-0 left-0 z-50 w-64 glass border-r border-surface-hover lg:hidden animate-slide-right">
            <div className="flex flex-col flex-1 min-h-0">
              {/* Header */}
              <div className="flex items-center justify-between h-16 px-6 border-b border-surface-hover">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h1 className="text-lg font-bold text-text-primary">Mission Control</h1>
                    <p className="text-xs text-text-secondary">Kyle's OS</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded text-text-muted hover:text-text-primary"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 flex flex-col py-6">
                <nav className="flex-1 px-4 space-y-2">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-gold text-primary shadow-lg'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 transition-colors ${
                            isActive ? 'text-primary' : 'text-text-muted group-hover:text-text-primary'
                          }`}
                        />
                        <div className="flex-1">
                          <div>{item.name}</div>
                          <div className={`text-xs ${
                            isActive ? 'text-primary/80' : 'text-text-muted group-hover:text-text-secondary'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  )
}