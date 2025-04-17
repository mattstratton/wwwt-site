import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'

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
      <html lang="en">
        <body>
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-xl font-semibold">When We Were Thin</h1>
              <div>
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
} 