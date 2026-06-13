'use client'

import { useEffect, useRef, useState } from 'react'
import { Instagram } from 'lucide-react'
import { REEL_TILE_LAYOUTS, type InstagramReel } from '@/lib/instagram-reels'

const INSTAGRAM_URL =
  'https://www.instagram.com/tavlinxfreightsolutions?igsh=MXV3ODJld2VkbW91aA%3D%3D&utm_source=qr'

function getTileLayout(index: number) {
  return REEL_TILE_LAYOUTS[index % REEL_TILE_LAYOUTS.length]
}

function ReelTile({ reel, index }: { reel: InstagramReel; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const layout = getTileLayout(index)

  useEffect(() => {
    const container = containerRef.current
    const video = videoRef.current
    if (!container || !video || failed) return

    const play = () => {
      video.play().catch(() => {})
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
        else video.pause()
      },
      { threshold: 0.35 },
    )

    observer.observe(container)
    play()

    return () => observer.disconnect()
  }, [reel.videoUrl, failed])

  if (failed) return null

  const gridStyle = {
    gridColumn: `span ${layout.cols}`,
    gridRow: `span ${layout.rows}`,
  }

  const inner = (
    <div
      ref={containerRef}
      className="group relative h-full min-h-[120px] overflow-hidden rounded-2xl bg-[#0a1628] shadow-lg shadow-black/20 ring-1 ring-white/10"
    >
      <video
        ref={videoRef}
        src={reel.videoUrl}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        onError={() => setFailed(true)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/35 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  )

  if (reel.href) {
    return (
      <a
        href={reel.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block min-h-0"
        style={gridStyle}
        aria-label="View on Instagram"
      >
        {inner}
      </a>
    )
  }

  return (
    <div style={gridStyle} className="min-h-0">
      {inner}
    </div>
  )
}

function ReelSkeleton({ index }: { index: number }) {
  const layout = getTileLayout(index)
  return (
    <div
      className="animate-pulse rounded-2xl bg-slate-200"
      style={{
        gridColumn: `span ${layout.cols}`,
        gridRow: `span ${layout.rows}`,
        minHeight: 120,
      }}
    />
  )
}

export function SocialWall() {
  const [reels, setReels] = useState<InstagramReel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const loadReels = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/instagram/reels')
        const data = await response.json()
        if (!cancelled) {
          setReels(Array.isArray(data.reels) ? data.reels : [])
        }
      } catch {
        if (!cancelled) setReels([])
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    loadReels()
    return () => {
      cancelled = true
    }
  }, [])

  if (!isLoading && reels.length === 0) return null

  return (
    <section className="bg-[#F8F8F6] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1a3a6b]">
              Social Wall
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-[#0a1628] md:text-4xl">
              Follow the journey
            </h2>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#0a1628]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#0a1628] shadow-sm transition hover:border-[#0a1628]/30 hover:shadow-md"
          >
            <Instagram className="h-4 w-4" />
            @tavlinxfreightsolutions
          </a>
        </div>

        <div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[140px] md:gap-4"
          style={{ gridAutoRows: 'minmax(120px, auto)' }}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => <ReelSkeleton key={index} index={index} />)
            : reels.map((reel, index) => <ReelTile key={reel.id} reel={reel} index={index} />)}
        </div>
      </div>
    </section>
  )
}
