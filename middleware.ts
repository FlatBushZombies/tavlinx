import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // Only run Supabase auth on admin routes — avoids 504 timeouts on public pages
  matcher: ['/orders', '/orders/:path*'],
}
