// File: src/app/layout.tsx
import { Providers } from '@/components/providers'
import { ClientNavigation } from '@/components/ClientNavigation'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Grammy Predictions',
  description: 'Prediction markets for Grammy Awards',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-gray-900 text-white">
            <ClientNavigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}


