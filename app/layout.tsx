import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ThemeProvider } from './components/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'

export const metadata: Metadata = {
  title: 'When We Were Thin',
  description: 'Video archive of When We Were Thin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
          <ThemeProvider>
            <header className="bg-white dark:bg-gray-800 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link href="/" className="text-xl font-semibold hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  When We Were Thin
                </Link>
                <div className="flex items-center gap-4">
                  <ThemeToggle />
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </header>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
} 