'use client'

import { Navigation } from './Navigation'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="lg:pl-64">
        {children}
      </main>
    </div>
  )
}