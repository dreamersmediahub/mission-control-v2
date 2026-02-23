import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'Mission Control | Kyle\'s Life Operating System',
  description: 'Comprehensive command center for Dreamers Media operations, agent management, and life optimization.',
  keywords: ['dashboard', 'productivity', 'automation', 'business management'],
  authors: [{ name: 'Theo Grant' }],
  creator: 'Theo Grant',
  publisher: 'Dreamers Media',
  robots: 'noindex, nofollow', // Private app
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-background text-text-primary">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}