'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const PROMOS = [
  { src: '/promo-june-24.jpeg', alt: 'Tavlinx 24 June Promo' },
  { src: '/promo-1.jpeg', alt: 'Tavlinx promotion one' },
] as const

const STORAGE_KEY = 'tavlinx-promo-dismissed'

export function PromoPopup() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return
    } catch {
      return
    }
    const timer = window.setTimeout(() => setOpen(true), 1500)
    return () => window.clearTimeout(timer)
  }, [])

  const dismiss = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore storage errors
    }
    setOpen(false)
  }

  if (!open) return null

  const promo = PROMOS[index]
  const isLast = index === PROMOS.length - 1
  const canGoBack = index > 0

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Promotion"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#0a1628]/75 backdrop-blur-md"
        aria-label="Close promotion"
        onClick={dismiss}
      />

      <div className="relative z-10 w-full max-w-[min(100%,420px)] sm:max-w-md">
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-2xl shadow-black/40 ring-1 ring-white/10">
          <div className="relative border-b border-slate-100 bg-gradient-to-r from-[#0a1628] to-[#15345f] px-4 py-3 text-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-white/80">Featured Promotion</p>
            <p className="mt-0.5 text-sm font-semibold">Latest Tavlinx Offers</p>
          </div>

          <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-[#0a1628]">
            <Image
              src={promo.src}
              alt={promo.alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 640px) 90vw, 420px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/55 via-transparent to-[#0a1628]/10" />
            <button
              type="button"
              onClick={dismiss}
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#0a1628]/80 text-white backdrop-blur-sm hover:bg-[#0a1628] transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white px-4 py-3">
            <div className="flex items-center gap-1.5">
              {PROMOS.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'w-5 bg-[#0a1628]' : 'w-1.5 bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {canGoBack && (
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-[#0a1628] hover:bg-slate-50 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  if (isLast) dismiss()
                  else setIndex((i) => i + 1)
                }}
                className="flex items-center gap-1.5 rounded-full bg-[#0a1628] px-4 py-2 text-xs font-bold text-white hover:bg-[#1a3a6b] transition-colors"
              >
                {isLast ? 'Close' : 'Next'}
                {!isLast && <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
