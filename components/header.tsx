"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useCallback, useEffect } from "react"
import { Menu, X, Phone, Mail, MapPin, Clock, ArrowRight, AlertTriangle, ChevronRight, Info, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHATSAPP_LINK = "https://wa.me/971559933478"

const navLinks = [
  { href: "/",         label: "Home"     },
  { href: "/about",    label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/tracking", label: "Tracking" },
  { href: "/contact",  label: "Contact"  },
]

// ─────────────────────────────────────────────────────────────────────────────
// NOTICES — edit this array to control what appears in the header notice bar.
//
//   id       — unique string
//   type     — "critical" | "warning" | "info" | "update"
//   message  — short text shown in the bar
//   detail?  — optional longer text revealed on "Details"
//   link?    — { label, href } optional CTA button
//
// Bar auto-dismisses after 7 s and does not reappear until reload.
// Set to [] to show nothing.
// ─────────────────────────────────────────────────────────────────────────────
const NOTICES: Notice[] = [
  {
    id: "iran-conflict",
    type: "critical",
    message: "Due to the ongoing conflict in Iran, air freight routes via Tehran are currently suspended.",
    detail: "All affected shipments are being rerouted through Dubai and Sharjah airports. Expect delays of 3–7 business days. Our operations team will contact affected clients individually.",
    link: { label: "View affected routes", href: "/updates" },
  },
  // {
  //   id: "cny-delays",
  //   type: "warning",
  //   message: "Chinese New Year (Jan 29 – Feb 4): Expect 5–10 day delays from Guangzhou.",
  // },
]
// ─────────────────────────────────────────────────────────────────────────────

export type NoticeType = "warning" | "info" | "critical" | "update"

export interface Notice {
  id: string
  type: NoticeType
  message: string
  detail?: string
  link?: { label: string; href: string }
}

const NOTICE_DURATION = 7000

const TYPE_CONFIG: Record<NoticeType, {
  accent: string       // main brand color for icon + label + CTA
  accentLight: string  // very faint tint for label pill bg
  accentBorder: string // faint border for label pill
  labelText: string    // slightly darker for label text
  label: string
  progress: string
  borderLeft: string   // left edge accent line
  icon: React.ReactNode
}> = {
  critical: {
    accent:       "#DC2626",
    accentLight:  "#FEF2F2",
    accentBorder: "rgba(220,38,38,0.2)",
    labelText:    "#B91C1C",
    label:        "CRITICAL ALERT",
    progress:     "#DC2626",
    borderLeft:   "#DC2626",
    icon: <AlertTriangle style={{ width: 15, height: 15, strokeWidth: 2 }} />,
  },
  warning: {
    accent:       "#D97706",
    accentLight:  "#FFFBEB",
    accentBorder: "rgba(217,119,6,0.2)",
    labelText:    "#B45309",
    label:        "NOTICE",
    progress:     "#D97706",
    borderLeft:   "#D97706",
    icon: <AlertTriangle style={{ width: 15, height: 15, strokeWidth: 2 }} />,
  },
  info: {
    accent:       "#2563EB",
    accentLight:  "#EFF6FF",
    accentBorder: "rgba(37,99,235,0.2)",
    labelText:    "#1D4ED8",
    label:        "INFO",
    progress:     "#2563EB",
    borderLeft:   "#2563EB",
    icon: <Info style={{ width: 15, height: 15, strokeWidth: 2 }} />,
  },
  update: {
    accent:       "#16A34A",
    accentLight:  "#F0FDF4",
    accentBorder: "rgba(22,163,74,0.2)",
    labelText:    "#15803D",
    label:        "UPDATE",
    progress:     "#16A34A",
    borderLeft:   "#16A34A",
    icon: <CheckCircle style={{ width: 15, height: 15, strokeWidth: 2 }} />,
  },
}

// ─── Notice Bar ───────────────────────────────────────────────────────────────

function NoticeBar() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible,      setVisible]      = useState(true)
  const [expanded,     setExpanded]     = useState(false)
  const [exiting,      setExiting]      = useState(false)
  const [collapsing,   setCollapsing]   = useState(false)
  const [barHeight,    setBarHeight]    = useState<number | undefined>(undefined)

  const barRef   = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const progRef  = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const animRef  = useRef<Animation | null>(null)

  const notice = NOTICES[currentIndex] ?? null
  const cfg    = notice ? TYPE_CONFIG[notice.type] : null

  const collapse = useCallback(() => {
    if (barRef.current) setBarHeight(barRef.current.offsetHeight)
    setCollapsing(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setBarHeight(0))
    })
    setTimeout(() => setVisible(false), 400)
  }, [])

  const dismiss = useCallback(() => {
    if (animRef.current)  animRef.current.cancel()
    if (timerRef.current) clearTimeout(timerRef.current)
    setExiting(true)
    setTimeout(() => collapse(), 250)
  }, [collapse])

  const startTimer = useCallback(() => {
    if (!progRef.current || !notice) return
    animRef.current = progRef.current.animate(
      [{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }],
      { duration: NOTICE_DURATION, easing: "linear", fill: "forwards" }
    )
    timerRef.current = setTimeout(() => {
      if (NOTICES.length > 1 && currentIndex < NOTICES.length - 1) {
        setExiting(true)
        setTimeout(() => {
          setCurrentIndex((i) => i + 1)
          setExiting(false)
          setExpanded(false)
        }, 280)
      } else {
        dismiss()
      }
    }, NOTICE_DURATION)
  }, [notice, currentIndex, dismiss])

  useEffect(() => {
    if (!visible || !notice) return
    const id = requestAnimationFrame(() => startTimer())
    return () => {
      cancelAnimationFrame(id)
      if (timerRef.current) clearTimeout(timerRef.current)
      if (animRef.current)  animRef.current.cancel()
    }
  }, [visible, currentIndex]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible || !notice || !cfg) return null

  return (
    <div
      ref={barRef}
      style={{
        height:     collapsing ? barHeight : undefined,
        overflow:   "hidden",
        transition: collapsing ? "height 0.38s cubic-bezier(0.4,0,0.2,1)" : undefined,
      }}
    >
      <div
        ref={innerRef}
        style={{
          background:   "#ffffff",
          borderBottom: "1px solid #E5E7EB",
          borderLeft:   `3px solid ${cfg.borderLeft}`,
          position:     "relative",
          overflow:     "hidden",
          opacity:      exiting ? 0 : 1,
          transform:    exiting ? "translateY(-4px)" : "translateY(0)",
          transition:   "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        {/* Main content row */}
        <div style={{
          maxWidth:   "1400px",
          margin:     "0 auto",
          padding:    "0 1.5rem",
          display:    "flex",
          alignItems: "center",
          gap:        "10px",
          minHeight:  "46px",
        }}>

          {/* Icon */}
          <div style={{ color: cfg.accent, flexShrink: 0, display: "flex", alignItems: "center" }}>
            {cfg.icon}
          </div>

          {/* Label pill */}
          <div style={{
            display:       "inline-flex",
            alignItems:    "center",
            gap:           "5px",
            background:    cfg.accentLight,
            border:        `1px solid ${cfg.accentBorder}`,
            borderRadius:  "5px",
            padding:       "2px 8px",
            flexShrink:    0,
          }}>
            <span style={{
              display:      "inline-block",
              width:        "5px",
              height:       "5px",
              borderRadius: "50%",
              background:   cfg.accent,
              animation:    "nb-dot-pulse 1.8s ease-in-out infinite",
              flexShrink:   0,
            }} />
            <span style={{
              fontSize:      "9px",
              fontWeight:    700,
              letterSpacing: "0.14em",
              color:         cfg.labelText,
              fontFamily:    "'DM Sans', sans-serif",
              whiteSpace:    "nowrap",
            }}>
              {cfg.label}
            </span>
          </div>

          {/* Divider */}
          <div style={{ width: "1px", height: "16px", background: "#E5E7EB", flexShrink: 0 }} />

          {/* Message */}
          <p style={{
            margin:     0,
            fontSize:   "13px",
            fontWeight: 500,
            color:      "#111827",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.4,
            flex:       1,
            minWidth:   0,
          }}>
            {notice.message}
          </p>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>

            {/* Details toggle */}
            {notice.detail && (
              <button
                onClick={() => {
                  const opening = !expanded
                  setExpanded(opening)
                  if (opening) {
                    if (timerRef.current) clearTimeout(timerRef.current)
                    if (animRef.current)  animRef.current.pause()
                  } else {
                    if (animRef.current) animRef.current.play()
                    timerRef.current = setTimeout(() => dismiss(), NOTICE_DURATION)
                  }
                }}
                style={{
                  display:       "inline-flex",
                  alignItems:    "center",
                  gap:           "3px",
                  background:    "none",
                  border:        "1px solid #D1D5DB",
                  borderRadius:  "6px",
                  padding:       "3px 10px",
                  cursor:        "pointer",
                  fontSize:      "11px",
                  fontWeight:    500,
                  fontFamily:    "'DM Sans', sans-serif",
                  color:         "#374151",
                  letterSpacing: "0.02em",
                  whiteSpace:    "nowrap",
                  transition:    "border-color 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.borderColor = cfg.accent
                  el.style.color = cfg.accent
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement
                  el.style.borderColor = "#D1D5DB"
                  el.style.color = "#374151"
                }}
              >
                {expanded ? "Less" : "Details"}
                <ChevronRight style={{
                  width:      "11px",
                  height:     "11px",
                  transform:  expanded ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }} />
              </button>
            )}

            {/* CTA link */}
            {notice.link && (
              <a
                href={notice.link.href}
                style={{
                  display:        "inline-flex",
                  alignItems:     "center",
                  gap:            "4px",
                  background:     cfg.accent,
                  border:         "none",
                  borderRadius:   "6px",
                  padding:        "4px 12px",
                  fontSize:       "11px",
                  fontWeight:     600,
                  fontFamily:     "'DM Sans', sans-serif",
                  color:          "#ffffff",
                  letterSpacing:  "0.02em",
                  textDecoration: "none",
                  whiteSpace:     "nowrap",
                  transition:     "opacity 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85" }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1" }}
              >
                {notice.link.label}
                <ArrowRight style={{ width: "10px", height: "10px" }} />
              </a>
            )}

            {/* Counter */}
            {NOTICES.length > 1 && (
              <span style={{
                fontSize:   "10px",
                color:      "#9CA3AF",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                {currentIndex + 1}/{NOTICES.length}
              </span>
            )}

            {/* Dismiss */}
            <button
              onClick={() => dismiss()}
              aria-label="Dismiss notice"
              style={{
                background: "none",
                border:     "none",
                padding:    "4px",
                cursor:     "pointer",
                color:      "#9CA3AF",
                display:    "flex",
                alignItems: "center",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#374151" }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#9CA3AF" }}
            >
              <X style={{ width: "14px", height: "14px" }} />
            </button>
          </div>
        </div>

        {/* Expandable detail */}
        {expanded && notice.detail && (
          <div style={{
            maxWidth:  "1400px",
            margin:    "0 auto",
            padding:   "0 1.5rem 12px calc(1.5rem + 25px)",
            animation: "nb-expand 0.22s ease forwards",
          }}>
            <div style={{
              borderLeft: `2px solid ${cfg.accentBorder}`,
              paddingLeft: "12px",
              marginLeft:  "0",
            }}>
              <p style={{
                margin:     0,
                fontSize:   "12px",
                fontWeight: 400,
                lineHeight: 1.65,
                color:      "#6B7280",
                fontFamily: "'DM Sans', sans-serif",
                maxWidth:   "640px",
              }}>
                {notice.detail}
              </p>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div style={{
          position:   "absolute",
          bottom:     0,
          left:       0,
          right:      0,
          height:     "2px",
          background: "#F3F4F6",
        }}>
          <div
            ref={progRef}
            style={{
              height:          "100%",
              background:      cfg.progress,
              transformOrigin: "left",
              transform:       "scaleX(1)",
              opacity:         0.6,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes nb-dot-pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.35; transform:scale(0.8); }
        }
        @keyframes nb-expand {
          from { opacity:0; transform:translateY(-3px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">

      {/* ── Notice Bar — desktop only ── */}
      {NOTICES.length > 0 && (
        <div className="hidden lg:block">
          <NoticeBar />
        </div>
      )}

      {/* ── Top Utility Bar ── */}
      <div className="hidden bg-primary lg:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 lg:px-8">
          <div className="flex items-center gap-6">
            <a
              href="tel:+971559933478"
              className="flex items-center gap-2 text-xs text-primary-foreground/90 transition-colors hover:text-primary-foreground"
            >
              <Phone className="h-3.5 w-3.5" />
              +971 55 993 3478
            </a>
            <a
              href="mailto:info@tavlinx.com"
              className="flex items-center gap-2 text-xs text-primary-foreground/90 transition-colors hover:text-primary-foreground"
            >
              <Mail className="h-3.5 w-3.5" />
              info@tavlinx.com
            </a>
            <span className="flex items-center gap-2 text-xs text-primary-foreground/90">
              <MapPin className="h-3.5 w-3.5" />
              Dubai, UAE & Harare, Zimbabwe
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs text-primary-foreground/90">
              <Clock className="h-3.5 w-3.5" />
              Mon - Sat: 08:00 - 18:00
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Bar ── */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Tavlinx Freight Solutions"
              width={180}
              height={50}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 lg:flex">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-foreground/80 transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border" />
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="tel:+971559933478" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +971 55 993 3478
              </a>
              <a href="mailto:info@tavlinx.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                info@tavlinx.com
              </a>
            </div>
            <Button asChild className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}