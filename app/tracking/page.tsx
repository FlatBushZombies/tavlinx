"use client"

import { useEffect, useRef } from "react"
import {
  Plane, Calendar, MapPin, CheckCircle2,
  Truck, ArrowRight, Package, Search, Bell,
} from "lucide-react"
import gsap from "gsap"

const WHATSAPP_LINK = "https://wa.me/971559933478"

const flightSchedules = [
  {
    day: "Wednesday", dayShort: "WED", route: "Dubai to Harare",
    from: "DXB", to: "HRE", departureTime: "10:00 AM",
    arrivalTime: "6:00 PM", timezone: "GST → CAT",
  },
  {
    day: "Friday", dayShort: "FRI", route: "Dubai to Harare",
    from: "DXB", to: "HRE", departureTime: "10:00 AM",
    arrivalTime: "6:00 PM", timezone: "GST → CAT",
  },
]

const trackingStatuses = [
  { status: "Departed from DXB", description: "Your goods have departed from Dubai International Airport", icon: Plane, active: true },
  { status: "In Transit", description: "Shipment is currently in transit to Zimbabwe", icon: Truck, active: true },
  { status: "Arrived in Zimbabwe", description: "Your goods have arrived at Harare International Airport", icon: MapPin, active: false },
  { status: "Ready for Collection", description: "Your shipment is ready for pickup at our Harare warehouse", icon: CheckCircle2, active: false },
]

const trackingSteps = [
  { icon: Package, title: "Get Your Tracking ID", description: "Receive your unique tracking number when you book your shipment with us.", num: "01" },
  { icon: Search, title: "Send Us Your ID", description: "Message us on WhatsApp with your tracking ID for instant status updates.", num: "02" },
  { icon: Bell, title: "Receive Updates", description: "Get real-time notifications at every step of your shipment journey.", num: "03" },
  { icon: CheckCircle2, title: "Collect Your Goods", description: "Pick up your items from our Harare warehouse when ready.", num: "04" },
]

export default function TrackingPage() {
  const planeRef = useRef<SVGGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!planeRef.current || !pathRef.current) return
    const path = pathRef.current
    const plane = planeRef.current
    const pathLength = path.getTotalLength()

    const initialPoint = path.getPointAtLength(0)
    gsap.set(plane, { x: initialPoint.x, y: initialPoint.y, transformOrigin: "0px 0px" })

    const tl = gsap.timeline({ repeat: -1 })
    tl.to({ progress: 0 }, {
      progress: 1,
      duration: 5,
      ease: "power1.inOut",
      onUpdate: function () {
        const p = this.targets()[0].progress
        const point = path.getPointAtLength(p * pathLength)
        const nextPoint = path.getPointAtLength(Math.min(p + 0.01, 1) * pathLength)
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI)
        gsap.set(plane, { x: point.x, y: point.y, rotation: angle, transformOrigin: "0px 0px" })
      },
    })
    tl.to({}, { duration: 1.2 })
    return () => { tl.kill() }
  }, [])

  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[580px] flex items-center overflow-hidden">
        {/* Visible stock photo */}
        <img
          src="/cargo-plane.jpg"
          alt="Aerial cargo plane over clouds"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Navy overlay — 65% opacity keeps image clearly visible */}
        <div className="absolute inset-0 bg-[#0a1628] opacity-65" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 py-32 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs font-semibold tracking-[0.12em] uppercase mb-7">
            <Plane className="w-3.5 h-3.5" />
            Real-Time Tracking
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
            Flight Schedules &amp;<br />
            <span className="text-sky-300">Cargo Tracking</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Track your shipments in real-time and stay updated on our weekly flight schedules from Dubai to Zimbabwe.
          </p>

          <div className="mt-14 flex justify-center">
            <div className="w-5 h-9 rounded-full border-2 border-white/25 flex items-start justify-center pt-1.5">
              <span className="w-0.5 h-2 bg-white/50 rounded-full animate-bounce block" />
            </div>
          </div>
        </div>
      </section>

      {/* ── ROUTE ANIMATION ──────────────────────────────── */}
      <section className="bg-[#0d1f3c] py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-sky-400 text-[10px] font-black tracking-[0.22em] uppercase mb-2">Our Route</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-12">
            Dubai to Zimbabwe
          </h2>

          <div className="max-w-lg mx-auto">
            {/* Airport row */}
            <div className="flex items-end justify-between px-2 mb-3">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <span className="text-white font-mono font-bold text-lg tracking-widest">DXB</span>
                </div>
                <p className="text-white/70 text-sm font-semibold">Dubai</p>
                <p className="text-white/35 text-xs">UAE</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-sky-500/20 border border-sky-400/35 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <span className="text-sky-300 font-mono font-bold text-lg tracking-widest">HRE</span>
                </div>
                <p className="text-white/70 text-sm font-semibold">Harare</p>
                <p className="text-white/35 text-xs">Zimbabwe</p>
              </div>
            </div>

            {/* SVG path */}
            <div className="relative h-36">
              <svg
                viewBox="0 0 800 120"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Glow halo */}
                <path d="M 80 90 Q 400 8 720 90" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="12" />
                {/* Dashed route */}
                <path
                  ref={pathRef}
                  d="M 80 90 Q 400 8 720 90"
                  fill="none"
                  stroke="rgba(56,189,248,0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="8 5"
                />

                {/* Origin dot */}
                <circle cx="80" cy="90" r="5" fill="#ffffff" />
                <circle cx="80" cy="90" r="10" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

                {/* Destination dot */}
                <circle cx="720" cy="90" r="5" fill="#38bdf8" />
                <circle cx="720" cy="90" r="10" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1.5" />

                {/* Animated plane — rotate(90) corrects icon orientation */}
                <g ref={planeRef}>
                  <g transform="translate(-14, -14) rotate(90, 14, 14)">
                    <circle cx="14" cy="14" r="14" fill="rgba(56,189,248,0.18)" />
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#38bdf8">
                      <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z" />
                    </svg>
                  </g>
                </g>
              </svg>
            </div>

            {/* Status pill */}
            <div className="flex justify-center mt-1">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/25 text-green-400 text-xs font-bold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Active Route &nbsp;·&nbsp; Weekly: Wed &amp; Fri
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLIGHT SCHEDULES ─────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Weekly Flights</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight mb-3">
              Flight Schedules
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
              Our cargo flights operate twice weekly from Dubai to Zimbabwe, ensuring your goods arrive on time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {flightSchedules.map((flight, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/60 overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#0a1628]/12 transition-all duration-300"
              >
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-[#0a1628] via-[#1a3a6b] to-sky-400" />

                {/* Header */}
                <div className="bg-white px-7 pt-7 pb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-2.5">
                      <Calendar className="w-4 h-4 text-[#1a3a6b]" />
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400">Every week</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-600 text-[10px] font-bold">Active</span>
                    </div>
                    <h3 className="text-2xl font-black text-[#0a1628] tracking-tight leading-none">{flight.day}</h3>
                    <p className="text-gray-400 text-sm mt-1.5 font-light">{flight.route}</p>
                  </div>
                  <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#0a1628] flex flex-col items-center justify-center shadow-lg shadow-[#0a1628]/30">
                    <span className="text-white/45 text-[9px] font-bold tracking-widest uppercase">Every</span>
                    <span className="text-white font-mono font-black text-2xl leading-none mt-0.5">{flight.dayShort}</span>
                  </div>
                </div>

                {/* Route detail */}
                <div className="mx-6 mb-6 rounded-2xl bg-slate-50 border border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    {/* Origin */}
                    <div className="text-center shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-[#0a1628] flex items-center justify-center mx-auto mb-2 shadow-md shadow-[#0a1628]/25">
                        <span className="text-white font-mono font-bold text-sm tracking-wide">{flight.from}</span>
                      </div>
                      <p className="text-[#0a1628] font-bold text-sm leading-none">{flight.departureTime}</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">Departure</p>
                    </div>

                    {/* Middle */}
                    <div className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="relative w-full h-px bg-[#0a1628]/12">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-[#0a1628]/15 flex items-center justify-center shadow-sm">
                          <Plane className="w-3 h-3 text-[#1a3a6b]" />
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-gray-400 tracking-wider">{flight.timezone}</span>
                    </div>

                    {/* Destination */}
                    <div className="text-center shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-sky-500 flex items-center justify-center mx-auto mb-2 shadow-md shadow-sky-500/30">
                        <span className="text-white font-mono font-bold text-sm tracking-wide">{flight.to}</span>
                      </div>
                      <p className="text-[#0a1628] font-bold text-sm leading-none">{flight.arrivalTime}</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">Arrival</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-6 pb-7">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#0a1628] text-white text-sm font-bold tracking-wide hover:bg-[#1a3a6b] active:scale-95 transition-all duration-200 shadow-lg shadow-[#0a1628]/20"
                  >
                    Book This Flight
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO TRACK ─────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-100 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Easy Tracking</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight mb-3">
              How to Track Your Goods
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
              Follow these simple steps to stay updated on your shipment status.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trackingSteps.map((step, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:shadow-[#0a1628]/08 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step bubble */}
                <span className="absolute top-5 right-5 w-7 h-7 rounded-full bg-[#0a1628] flex items-center justify-center text-white text-[11px] font-black shadow-sm">
                  {i + 1}
                </span>
                {/* Ghost number */}
                <p className="font-mono text-6xl font-black text-[#0a1628]/[0.05] leading-none mb-3 select-none -ml-1">
                  {step.num}
                </p>
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-[#0a1628]/08 border border-[#0a1628]/10 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-[#0a1628]" />
                </div>
                <h3 className="text-[#0a1628] font-bold text-sm mb-1.5 leading-snug">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACKING STAGES ──────────────────────────────── */}
      <section className="bg-white border-t border-slate-100 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Shipment Journey</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight mb-3">
              Tracking Stages
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
              From departure to delivery, we keep you informed at every step of the journey.
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden md:block max-w-4xl mx-auto">
            <div className="relative flex justify-between items-start">
              {/* Full track */}
              <div className="absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-slate-200 rounded-full z-0" />
              {/* Active portion (50% = 2 of 4) */}
              <div className="absolute top-6 left-[12.5%] w-[37.5%] h-0.5 bg-[#0a1628] rounded-full z-0" />

              {trackingStatuses.map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center" style={{ width: "25%" }}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    item.active
                      ? "bg-[#0a1628] border-[#0a1628] text-white shadow-lg shadow-[#0a1628]/20"
                      : "bg-white border-slate-200 text-slate-300"
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="mt-5 text-center px-2">
                    <p className={`text-xs font-bold leading-snug mb-1.5 ${item.active ? "text-[#0a1628]" : "text-slate-300"}`}>
                      {item.status}
                    </p>
                    <p className="text-[11px] text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-3 max-w-md mx-auto">
            {trackingStatuses.map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shrink-0 ${
                    item.active
                      ? "bg-[#0a1628] border-[#0a1628] text-white shadow-md shadow-[#0a1628]/20"
                      : "bg-white border-slate-200 text-slate-300"
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  {i < trackingStatuses.length - 1 && (
                    <div className={`w-0.5 flex-1 min-h-8 mt-1.5 rounded-full ${i < 1 ? "bg-[#0a1628]" : "bg-slate-200"}`} />
                  )}
                </div>
                <div className={`flex-1 mb-3 rounded-xl px-4 py-3 border ${
                  item.active
                    ? "bg-slate-50 border-[#0a1628]/12"
                    : "bg-slate-50/50 border-slate-100"
                }`}>
                  <p className={`text-sm font-bold mb-0.5 ${item.active ? "text-[#0a1628]" : "text-slate-300"}`}>
                    {item.status}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative bg-[#0a1628] py-20 lg:py-28 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Subtle glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl" />
        </div>
        {/* Top border line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Need to Track a<br />Specific Package?
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md mx-auto">
            Send us your tracking number on WhatsApp and get instant updates on your shipment status.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#0a1628] font-black text-sm tracking-wide hover:bg-slate-100 active:scale-95 transition-all duration-200 shadow-2xl shadow-black/30"
            >
              Track via WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+971559933478"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/70 font-semibold text-sm hover:border-white/40 hover:text-white transition-all duration-200"
            >
              Call: +971 55 993 3478
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}