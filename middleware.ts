import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/api/webhooks(.*)"]
})

// See https://clerk.com/docs/references/nextjs/auth-middleware for more info about configuring your Middleware
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
} 