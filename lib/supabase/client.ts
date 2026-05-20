import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function createClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    if (typeof window !== 'undefined') {
      // Make the failure explicit in the browser console instead of a vague "Failed to fetch"
      console.error('Supabase client not configured. Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
      throw new Error('Supabase client not configured. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set at build/runtime.')
    }
    throw new Error('Supabase environment variables are not set.')
  }

  return createBrowserClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  )
}
