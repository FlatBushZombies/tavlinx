import { NextResponse, type NextRequest } from 'next/server'

// Short-circuit middleware to avoid remote calls that may cause invocation
// timeouts on some hosts (e.g., Namecheap). Auth for `/orders` is handled
// in the page server component, so middleware is intentionally inert here.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  // Disabled because `/orders` auth is handled in the page server component.
  matcher: [],
}
