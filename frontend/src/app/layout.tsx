import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TradeMind AI — Groww-Style AI Super App',
  description: 'Enterprise AI Trading & Investment Platform for Indian & US Markets',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0b0f19] text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  )
}
