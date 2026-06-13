import { NextResponse } from 'next/server'
import { normalizeInstagramReels } from '@/lib/instagram-reels'

export async function GET() {
  const apiUrl = process.env.INSTAGRAM_REELS_API_URL

  if (!apiUrl) {
    return NextResponse.json(
      { reels: [], error: 'INSTAGRAM_REELS_API_URL is not configured' },
      { status: 200 },
    )
  }

  try {
    const headers: HeadersInit = {
      Accept: 'application/json',
    }

    const apiKey = process.env.INSTAGRAM_REELS_API_KEY
    const apiKeyHeader = process.env.INSTAGRAM_REELS_API_KEY_HEADER || 'Authorization'

    if (apiKey) {
      if (apiKeyHeader.toLowerCase() === 'authorization') {
        headers.Authorization = apiKey.startsWith('Bearer ') ? apiKey : `Bearer ${apiKey}`
      } else {
        headers[apiKeyHeader] = apiKey
      }
    }

    const response = await fetch(apiUrl, {
      headers,
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      return NextResponse.json(
        { reels: [], error: `Reels API returned ${response.status}` },
        { status: 200 },
      )
    }

    const payload = await response.json()
    const reels = normalizeInstagramReels(payload)

    return NextResponse.json({ reels })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch reels'
    return NextResponse.json({ reels: [], error: message }, { status: 200 })
  }
}
