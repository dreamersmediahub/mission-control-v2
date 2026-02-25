import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Sidebar } from '@/components/Sidebar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'Mission Control | Dreamers Media',
  description: 'Live command center for Dreamers Media — agents, tasks, content, memory.',
  robots: 'noindex, nofollow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-[#0a0a0a] text-[#e2e2e2] flex">
        <Providers>
          <Sidebar />
          <main className="flex-1 ml-[220px] min-h-screen overflow-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}