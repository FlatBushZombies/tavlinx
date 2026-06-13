export type InstagramReel = {
  id: string
  videoUrl: string
  href?: string
}

/** Bento tile sizes — uneven grid like big3.com social wall */
export const REEL_TILE_LAYOUTS = [
  { cols: 2, rows: 2 },
  { cols: 1, rows: 1 },
  { cols: 1, rows: 2 },
  { cols: 2, rows: 1 },
  { cols: 1, rows: 1 },
  { cols: 2, rows: 2 },
  { cols: 1, rows: 2 },
  { cols: 1, rows: 1 },
  { cols: 2, rows: 1 },
  { cols: 1, rows: 1 },
] as const

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  return value as Record<string, unknown>
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const val = obj[key]
    if (typeof val === 'string' && val.trim()) return val.trim()
  }
  return undefined
}

function extractVideoUrl(obj: Record<string, unknown>): string | undefined {
  const direct = pickString(obj, [
    'videoUrl',
    'video_url',
    'mediaUrl',
    'media_url',
    'video',
    'src',
    'mp4',
  ])
  if (direct) return direct

  const versions = obj.video_versions
  if (Array.isArray(versions)) {
    for (const entry of versions) {
      const version = asRecord(entry)
      const url = version ? pickString(version, ['url']) : undefined
      if (url) return url
    }
  }

  const media = asRecord(obj.media)
  if (media) {
    return pickString(media, ['videoUrl', 'video_url', 'mediaUrl', 'media_url', 'url'])
  }

  return undefined
}

function extractPermalink(obj: Record<string, unknown>): string | undefined {
  const direct = pickString(obj, ['permalink', 'link', 'url', 'postUrl', 'post_url'])
  if (direct) return direct

  const shortcode = pickString(obj, ['shortcode', 'code'])
  if (shortcode) return `https://www.instagram.com/reel/${shortcode}/`

  return undefined
}

function isVideoItem(obj: Record<string, unknown>): boolean {
  const type = pickString(obj, ['mediaType', 'media_type', 'type', 'product_type'])
  if (!type) return true
  const normalized = type.toLowerCase()
  return normalized.includes('video') || normalized === 'reel' || normalized === 'clips'
}

function normalizeReelItem(item: unknown, index: number): InstagramReel | null {
  const obj = asRecord(item)
  if (!obj || !isVideoItem(obj)) return null

  const videoUrl = extractVideoUrl(obj)
  if (!videoUrl) return null

  const id = pickString(obj, ['id', 'pk', 'code', 'shortcode']) || `reel-${index}`
  const href = extractPermalink(obj)

  return { id, videoUrl, href }
}

function extractItems(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload

  const root = asRecord(payload)
  if (!root) return []

  const keys = ['reels', 'posts', 'data', 'items', 'media', 'feed', 'results']
  for (const key of keys) {
    const value = root[key]
    if (Array.isArray(value)) return value

    const nested = asRecord(value)
    if (!nested) continue

    for (const nestedKey of ['reels', 'posts', 'items', 'media', 'data']) {
      const nestedValue = nested[nestedKey]
      if (Array.isArray(nestedValue)) return nestedValue
    }
  }

  return []
}

/** Normalize common Instagram/reel API response shapes into playable video URLs. */
export function normalizeInstagramReels(payload: unknown): InstagramReel[] {
  return extractItems(payload)
    .map((item, index) => normalizeReelItem(item, index))
    .filter((reel): reel is InstagramReel => reel !== null)
}
