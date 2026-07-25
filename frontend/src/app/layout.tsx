import './globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/providers'

export const metadata: Metadata = {
  title: 'ChaLo AI - One Intelligence. Infinite Possibilities.',
  description: 'Next-generation AI platform for intelligent assistance, automation, creativity, and business solutions',
  keywords: 'AI, Chat, Code Generation, Automation, Business Intelligence',
  authors: [{ name: 'Jhon Lord Visto', url: 'https://chaloai.com' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'ChaLo AI',
    description: 'One Intelligence. Infinite Possibilities.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-900 text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
