import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Backlog tasks',
  description: 'Created with NextJs & Shadcn',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={cn('min-h-screen bg-background font-sans antialiased flex justify-center ', fontSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
