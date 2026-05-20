import { updateSession } from '@/lib/supabase/proxy'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  // Disabled because /orders auth is handled in the page server component instead.
  matcher: [],
}
