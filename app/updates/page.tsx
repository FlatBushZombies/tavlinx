"use client"

import { useState } from "react"
import {
  AlertTriangle, Info, CheckCircle2, Zap,
  ChevronDown, ArrowRight, Clock, MapPin,
  MessageCircle, CheckCheck, Package, Plane,
  DollarSign, Weight, Phone, Smartphone, Laptop,
  Watch, ShoppingBag, Sparkles, Battery, Speaker,
  Camera, Tablet, Gem, Cpu, Gamepad2, CircleDollarSign
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// NOTICES DATA
// ─────────────────────────────────────────────────────────────────────────────
type NoticeType = "critical" | "warning" | "info" | "update"

interface Notice {
  id: string
  type: NoticeType
  title: string
  summary: string
  body: string
  date: string
  region: string
  resolved?: boolean
}

const NOTICES: Notice[] = [
  {
    id: "iran-suspension-2026",
    type: "critical",
    title: "Air freight routes via Tehran suspended",
    summary: "All air freight routing through Tehran Imam Khomeini International Airport is currently suspended due to the ongoing regional conflict.",
    body: "Due to the escalating conflict in Iran, all air freight routes transiting through Tehran have been suspended with immediate effect. Shipments previously routed through Iran are being redirected via Dubai International (DXB) and Sharjah International (SHJ) airports. Clients with active shipments on affected routes have been contacted directly by our operations team. Estimated transit delays range from 3 to 7 business days depending on origin and destination. We are monitoring the situation closely and will update this notice as conditions change. For urgent enquiries, please contact our operations desk directly via WhatsApp.",
    date: "23 Mar 2026",
    region: "Iran · UAE",
    resolved: false,
  },
  {
    id: "chinese-new-year-2026",
    type: "warning",
    title: "Chinese New Year processing delays — Guangzhou & Shenzhen",
    summary: "Factory and logistics operations across Guangdong province will be reduced from 29 Jan – 4 Feb. Expect 5–10 business day delays on orders placed during this period.",
    body: "Chinese New Year falls on 29 January 2026. The majority of our supplier network and logistics partners in Guangzhou, Shenzhen, Foshan, and surrounding areas will operate at significantly reduced capacity from 25 January through 8 February. We strongly recommend placing orders before 20 January to avoid delays. Orders placed between 25 January and 8 February will be queued and processed in order of receipt once operations resume. Air freight capacity out of Guangzhou (CAN) will be significantly reduced during this window; sea freight bookings should be made at least 3 weeks in advance.",
    date: "15 Jan 2026",
    region: "China",
    resolved: false,
  },
  {
    id: "zim-customs-update-2026",
    type: "info",
    title: "Zimbabwe customs documentation requirements updated",
    summary: "ZIMRA has revised commercial import documentation requirements effective 1 March 2026. Form 21 is now mandatory for all shipments valued above USD 500.",
    body: "The Zimbabwe Revenue Authority (ZIMRA) has issued revised documentation requirements for all commercial imports effective 1 March 2026. Key changes include: (1) Form 21 is now mandatory for all commercial shipments with a declared value exceeding USD 500, replacing the previous threshold of USD 1,000. (2) All invoices must include the consignee's Tax Clearance Certificate number. (3) Packing lists must specify dimensions and gross weight per line item. Our team has already updated all active shipment files to reflect these changes. New clients should ensure their documentation is prepared in accordance with the updated ZIMRA guidelines. Failure to comply may result in clearance delays at Beitbridge or Harare International Airport.",
    date: "01 Mar 2026",
    region: "Zimbabwe",
    resolved: false,
  },
  {
    id: "sea-freight-lane-2026",
    type: "update",
    title: "New sea freight lane: Guangzhou → Durban → Harare",
    summary: "We have added a direct consolidated sea freight lane from Guangzhou to Harare via Durban. Transit time 28–34 days. Competitive LCL and FCL rates available.",
    body: "Tavlinx is pleased to announce the launch of a new consolidated sea freight service operating from Guangzhou, China to Harare, Zimbabwe via the Port of Durban, South Africa. This service significantly reduces transit times compared to existing indirect routes and offers both Less-than-Container-Load (LCL) and Full-Container-Load (FCL) options. Key details: Transit time 28–34 days port to door. Weekly consolidation departures from Guangzhou every Friday. Minimum shipment size 0.5 CBM for LCL. FCL options: 20GP, 40GP, 40HC. Inland haulage from Durban to Harare included in door-to-door pricing. Contact our team for a competitive rate quote on this new lane.",
    date: "10 Feb 2026",
    region: "China · Zimbabwe",
    resolved: false,
  },
  {
    id: "uae-public-holiday-2025",
    type: "warning",
    title: "UAE public holiday — Eid Al Adha office closure",
    summary: "Our Dubai office will be closed 5–9 June 2025 for Eid Al Adha. Operations and customer support will resume 10 June.",
    body: "In observance of Eid Al Adha, the Tavlinx Dubai office will be closed from Thursday 5 June through Monday 9 June 2025 inclusive. During this period, our team will not be available for calls or walk-in enquiries. WhatsApp messages will be monitored for urgent matters and responded to within 24 hours. Shipments already in transit will continue to be processed by our logistics partners. We will resume full operations on Tuesday 10 June 2025. We wish all our clients, partners and friends a blessed Eid.",
    date: "28 May 2025",
    region: "UAE",
    resolved: true,
  },
  {
    id: "tracking-portal-2025",
    type: "update",
    title: "Shipment tracking portal launched",
    summary: "Clients can now track their shipments in real time via the Tavlinx tracking portal. Access your tracking number from your shipment confirmation email.",
    body: "We are pleased to announce the launch of the Tavlinx online shipment tracking portal. All clients with active shipments will receive a unique tracking reference in their shipment confirmation email. The portal provides real-time status updates including: customs clearance milestones, departure and arrival scans at each transit hub, estimated delivery window, and document upload functionality for customs submissions. The tracking portal is accessible at tavlinx.com/tracking on desktop and mobile. For any issues accessing the portal, please contact our support team.",
    date: "01 Nov 2025",
    region: "Global",
    resolved: true,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// PRICING DATA
// ─────────────────────────────────────────────────────────────────────────────
interface PriceItem {
  product: string
  priceUSD: string
  priceAED: string
  unit: string
  icon: React.ReactNode
  category: string
  highlight?: boolean
}

const PRICING_DATA: PriceItem[] = [
  { product: "General Cargo", priceUSD: "$16", priceAED: "58 AED", unit: "per kg", icon: <Package className="h-5 w-5" />, category: "General" },
  { product: "Desktops", priceUSD: "$16", priceAED: "58 AED", unit: "per kg", icon: <Cpu className="h-5 w-5" />, category: "Electronics" },
  { product: "Laptops", priceUSD: "$45", priceAED: "165 AED", unit: "per laptop (max 2.5kg)", icon: <Laptop className="h-5 w-5" />, category: "Electronics", highlight: true },
  { product: "MacBook Laptop", priceUSD: "$50", priceAED: "182 AED", unit: "per laptop", icon: <Laptop className="h-5 w-5" />, category: "Electronics", highlight: true },
  { product: "Mobile Phones", priceUSD: "$30", priceAED: "110 AED", unit: "per phone ($23 for 10+)", icon: <Smartphone className="h-5 w-5" />, category: "Electronics", highlight: true },
  { product: "Tablets", priceUSD: "$33", priceAED: "120 AED", unit: "per piece", icon: <Tablet className="h-5 w-5" />, category: "Electronics" },
  { product: "Cameras (Small)", priceUSD: "$41", priceAED: "150 AED", unit: "per piece", icon: <Camera className="h-5 w-5" />, category: "Electronics" },
  { product: "Cameras (Large)", priceUSD: "$22", priceAED: "80 AED", unit: "per kg", icon: <Camera className="h-5 w-5" />, category: "Electronics" },
  { product: "PS4/5 & Gaming", priceUSD: "$16.50", priceAED: "60 AED", unit: "per kg", icon: <Gamepad2 className="h-5 w-5" />, category: "Electronics" },
  { product: "Batteries", priceUSD: "$25", priceAED: "91 AED", unit: "per kg", icon: <Battery className="h-5 w-5" />, category: "Electronics" },
  { product: "Power Banks", priceUSD: "$22", priceAED: "80 AED", unit: "per kg", icon: <Battery className="h-5 w-5" />, category: "Electronics" },
  { product: "Speakers (Magnetic)", priceUSD: "$16.50", priceAED: "60 AED", unit: "per kg", icon: <Speaker className="h-5 w-5" />, category: "Electronics" },
  { product: "CCTVs", priceUSD: "$16", priceAED: "58 AED", unit: "per kg", icon: <Camera className="h-5 w-5" />, category: "Electronics" },
  { product: "Gold Detectors", priceUSD: "$19", priceAED: "70 AED", unit: "per kg", icon: <Cpu className="h-5 w-5" />, category: "Electronics" },
  { product: "Pouches & Phone Acc.", priceUSD: "$16", priceAED: "58 AED", unit: "per kg", icon: <Package className="h-5 w-5" />, category: "Electronics" },
  { product: "Clothing", priceUSD: "$16", priceAED: "58 AED", unit: "per kg", icon: <ShoppingBag className="h-5 w-5" />, category: "Fashion" },
  { product: "Shoes", priceUSD: "$16", priceAED: "58 AED", unit: "per kg", icon: <ShoppingBag className="h-5 w-5" />, category: "Fashion" },
  { product: "Weaves / Wigs", priceUSD: "$16", priceAED: "58 AED", unit: "per head", icon: <Sparkles className="h-5 w-5" />, category: "Fashion" },
  { product: "Watches", priceUSD: "$16.50", priceAED: "60 AED", unit: "per kg", icon: <Watch className="h-5 w-5" />, category: "Fashion" },
  { product: "Hand Bags", priceUSD: "$16.50", priceAED: "60 AED", unit: "per kg", icon: <ShoppingBag className="h-5 w-5" />, category: "Fashion" },
  { product: "Jewellery", priceUSD: "Quote", priceAED: "Quote", unit: "charged per value", icon: <Gem className="h-5 w-5" />, category: "Fashion" },
  { product: "Perfumes", priceUSD: "$18", priceAED: "66 AED", unit: "per kg", icon: <Sparkles className="h-5 w-5" />, category: "Personal" },
  { product: "Spare Parts", priceUSD: "$16", priceAED: "58 AED", unit: "per kg", icon: <Cpu className="h-5 w-5" />, category: "Auto" },
]

const TYPE_META: Record<NoticeType, {
  label: string
  color: string
  bg: string
  border: string
  leftBar: string
  iconBg: string
  icon: React.ReactNode
}> = {
  critical: {
    label: "Critical",
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    leftBar: "#DC2626",
    iconBg: "#FEF2F2",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  warning: {
    label: "Notice",
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    leftBar: "#F59E0B",
    iconBg: "#FFFBEB",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
  info: {
    label: "Info",
    color: "#1B4FD8",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    leftBar: "#1B4FD8",
    iconBg: "#EFF6FF",
    icon: <Info className="h-4 w-4" />,
  },
  update: {
    label: "Update",
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    leftBar: "#16A34A",
    iconBg: "#F0FDF4",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
}

const FILTER_OPTIONS = ["All", "Critical", "Warning", "Info", "Update", "Resolved"] as const
type FilterOption = (typeof FILTER_OPTIONS)[number]

// ─── Notice Card ──────────────────────────────────────────────────────────────
function NoticeCard({ notice, index }: { notice: Notice; index: number }) {
  const [open, setOpen] = useState(false)
  const meta = TYPE_META[notice.type]
  const isResolved = !!notice.resolved

  return (
    <div
      className="group relative overflow-hidden rounded-none border-b bg-white transition-all duration-300"
      style={{
        borderColor: "#E5E7EB",
        opacity: isResolved ? 0.6 : 1,
      }}
    >
      {/* Left accent bar — thicker, industrial */}
      <div
        className="absolute bottom-0 left-0 top-0 w-[3px]"
        style={{ background: isResolved ? "#D1D5DB" : meta.leftBar }}
      />

      <div className="ml-[3px]">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start gap-5 px-6 py-5 text-left transition-colors hover:bg-gray-50/80"
        >
          {/* Icon */}
          <div
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm"
            style={{
              background: isResolved ? "#F3F4F6" : meta.bg,
              color: isResolved ? "#9CA3AF" : meta.color,
            }}
          >
            {isResolved ? <CheckCheck className="h-4 w-4" /> : meta.icon}
          </div>

          <div className="min-w-0 flex-1">
            {/* Meta row */}
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[0.15em]"
                style={{ color: isResolved ? "#9CA3AF" : meta.color }}
              >
                {isResolved ? "Resolved" : meta.label}
              </span>
              {!isResolved && (
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{
                    background: meta.color,
                    animation: notice.type === "critical" ? "pulse 1.6s ease-in-out infinite" : "none",
                  }}
                />
              )}
              <span className="font-mono text-[10px] text-gray-400 tracking-wide">{notice.date}</span>
              <span className="font-mono text-[10px] text-gray-400 tracking-wide">{notice.region}</span>
            </div>

            <p
              className="mb-1 text-[15px] font-semibold tracking-tight leading-snug"
              style={{ color: isResolved ? "#9CA3AF" : "#0f1117" }}
            >
              {notice.title}
            </p>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: isResolved ? "#9CA3AF" : "#6B7280" }}
            >
              {notice.summary}
            </p>
          </div>

          <ChevronDown
            className={`mt-1.5 h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="animate-in fade-in slide-in-from-top-1 border-t border-gray-100 bg-gray-50/60 px-6 pb-6 pt-5 pl-[68px] duration-200">
            <p className="text-[13px] leading-7 text-gray-600 max-w-2xl">{notice.body}</p>
            {!isResolved && (
              <div className="mt-5">
                <a
                  href={`https://wa.me/971525210658?text=Re: ${encodeURIComponent(notice.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Enquire via WhatsApp
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Pricing Row ──────────────────────────────────────────────────────────────
function PricingCard({ item }: { item: PriceItem }) {
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/8 ${
        item.highlight ? "border-primary/25 ring-1 ring-primary/10" : "border-gray-100"
      }`}
    >
      {item.highlight && (
        <div className="absolute right-0 top-0">
          <div className="bg-primary px-3 py-1">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-white">Popular</span>
          </div>
        </div>
      )}

      <div>
        <div className="mb-5 flex h-11 w-11 items-center justify-center bg-primary/6 text-primary transition-all group-hover:bg-primary group-hover:text-white">
          {item.icon}
        </div>
        <h3 className="mb-1 text-sm font-semibold tracking-tight text-gray-900">{item.product}</h3>
        <p className="text-xs text-gray-400">{item.unit}</p>
      </div>

      <div className="mt-5 flex items-baseline gap-2 border-t border-gray-100 pt-4">
        <span className="text-2xl font-bold tracking-tight text-primary">{item.priceUSD}</span>
        <span className="text-sm text-gray-400">{item.priceAED}</span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function UpdatesPage() {
  const [activeTab, setActiveTab] = useState<"notices" | "pricing">("notices")
  const [filter, setFilter] = useState<FilterOption>("All")
  const [priceCategory, setPriceCategory] = useState<string>("All")

  const active = NOTICES.filter((n) => !n.resolved)
  const resolved = NOTICES.filter((n) => n.resolved)

  const filtered = NOTICES.filter((n) => {
    if (filter === "All") return true
    if (filter === "Resolved") return n.resolved
    return n.type === filter.toLowerCase() && !n.resolved
  }).sort((a, b) => (a.resolved === b.resolved ? 0 : a.resolved ? 1 : -1))

  const categories = ["All", ...Array.from(new Set(PRICING_DATA.map((p) => p.category)))]
  const filteredPricing =
    priceCategory === "All"
      ? PRICING_DATA
      : PRICING_DATA.filter((p) => p.category === priceCategory)

  return (
    <main className="min-h-screen bg-[#F8F8F6]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary">

        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Large decorative number — editorial touch */}
        <div
          className="pointer-events-none absolute right-0 top-0 select-none font-black text-white/[0.04] leading-none"
          style={{ fontSize: "clamp(120px, 22vw, 320px)", lineHeight: 0.85, transform: "translateY(-10%)" }}
          aria-hidden
        >
          {activeTab === "notices" ? active.length : PRICING_DATA.length}
        </div>

        <div className="container relative mx-auto px-6 pb-16 pt-14 lg:px-12">

          {/* Breadcrumb / section label */}
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-white/30" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
              Tavlinx Operations
            </span>
          </div>

          <h1 className="mb-3 text-4xl font-black tracking-tight text-white md:text-5xl lg:text-[3.75rem] leading-[1.05]">
            Updates{" "}
            <span className="text-accent">&</span>{" "}
            Pricing
          </h1>

          <p className="mb-10 max-w-lg text-[15px] leading-relaxed text-white/70">
            Stay informed on service updates, route changes, and our competitive Express Air Freight rates for 24-hour delivery.
          </p>

          {/* Tab Switcher — clean, architectural */}
          <div className="mb-10 inline-flex border border-white/20 bg-white/5 p-1">
            <button
              onClick={() => setActiveTab("notices")}
              className={`flex items-center gap-2.5 px-7 py-3 text-sm font-semibold tracking-tight transition-all ${
                activeTab === "notices"
                  ? "bg-white text-primary"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              Service Notices
              <span
                className={`rounded-sm px-2 py-0.5 text-xs font-bold ${
                  activeTab === "notices"
                    ? "bg-primary/10 text-primary"
                    : "bg-white/15 text-white"
                }`}
              >
                {active.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("pricing")}
              className={`flex items-center gap-2.5 px-7 py-3 text-sm font-semibold tracking-tight transition-all ${
                activeTab === "pricing"
                  ? "bg-white text-primary"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <CircleDollarSign className="h-4 w-4" />
              Express Pricing
            </button>
          </div>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-3">
            {activeTab === "notices" ? (
              <>
                <div className="flex items-center gap-3 border border-red-300/20 bg-red-500/15 px-5 py-2.5">
                  <span className="font-mono text-xl font-black text-white">{active.length}</span>
                  <span className="text-[13px] font-medium text-white/70">Active</span>
                </div>
                <div className="flex items-center gap-3 border border-green-300/20 bg-green-500/15 px-5 py-2.5">
                  <span className="font-mono text-xl font-black text-white">{resolved.length}</span>
                  <span className="text-[13px] font-medium text-white/70">Resolved</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 border border-white/15 bg-white/8 px-5 py-2.5">
                  <Plane className="h-4 w-4 text-accent" />
                  <span className="text-[13px] font-medium text-white/80">24-Hour Express Delivery</span>
                </div>
                <div className="flex items-center gap-3 border border-white/15 bg-white/8 px-5 py-2.5">
                  <DollarSign className="h-4 w-4 text-accent" />
                  <span className="text-[13px] font-medium text-white/80">Rates in USD & AED</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom edge — sharp cutout effect */}
        <div className="relative h-0">
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#F8F8F6]" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-14 lg:px-12">

        {activeTab === "notices" ? (
          <>
            {/* Filter bar */}
            <div className="mb-8 flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`rounded-none border px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${
                    filter === opt
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 bg-white text-gray-500 hover:border-primary hover:text-primary"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Section label */}
            {filter === "All" && active.length > 0 && (
              <div className="mb-4 flex items-center gap-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                  Active · {active.length}
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
            )}

            {/* Notice list — bordered container */}
            {filtered.length === 0 ? (
              <div className="border border-gray-200 bg-white py-20 text-center">
                <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-gray-300" />
                <p className="text-sm text-gray-500">No notices match this filter.</p>
              </div>
            ) : (
              <>
                <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
                  {filtered
                    .filter((n) => !n.resolved)
                    .map((n, i, arr) => (
                      <div key={n.id} className={i === arr.length - 1 ? "" : ""}>
                        <NoticeCard notice={n} index={i} />
                      </div>
                    ))}
                </div>

                {/* Resolved section */}
                {filtered.some((n) => n.resolved) && (
                  <>
                    <div className="my-10 flex items-center gap-4">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
                        Resolved · {filtered.filter((n) => n.resolved).length}
                      </span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                    <div className="overflow-hidden border border-gray-200 bg-white shadow-sm">
                      {filtered
                        .filter((n) => n.resolved)
                        .map((n, i) => (
                          <NoticeCard key={n.id} notice={n} index={i} />
                        ))}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            {/* Pricing Header */}
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="h-px w-6 bg-primary" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    Rate Sheet
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-gray-900">Express Air Freight Catalogue</h2>
                <p className="mt-1 text-[14px] text-gray-500">24-hour delivery from Dubai to Zimbabwe</p>
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPriceCategory(cat)}
                    className={`rounded-none border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${
                      priceCategory === cat
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 bg-white text-gray-500 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing Grid */}
            <div className="grid gap-px bg-gray-200 border border-gray-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredPricing.map((item, i) => (
                <PricingCard key={i} item={item} />
              ))}
            </div>

            {/* Custom Quote CTA */}
            <div className="mt-10 flex flex-col items-stretch overflow-hidden border border-primary md:flex-row">
              <div className="flex-1 bg-primary p-8 md:p-10">
                <div className="mb-2 flex items-center gap-3">
                  <div className="h-px w-5 bg-white/40" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Get a Quote
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-black tracking-tight text-white">Need a Custom Quote?</h3>
                <p className="text-[14px] leading-relaxed text-white/75">
                  For items not listed or bulk shipments, contact our team for competitive rates tailored to your needs.
                </p>
              </div>
              <div className="flex items-center justify-center bg-accent p-8 md:px-10">
                <a
                  href="https://wa.me/971525210658?text=Hi%20Tavlinx,%20I%20would%20like%20to%20get%20a%20custom%20quote%20for%20my%20shipment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-none bg-white px-8 py-4 font-bold tracking-tight text-primary transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  <Phone className="h-5 w-5" />
                  Request on WhatsApp
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-5 border border-gray-200 bg-white p-6">
              <div className="flex items-start gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/8 text-primary">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[13px] text-gray-500 mb-3">
                    These are general charges. Request a quotation for items not on this list.
                  </p>
                  <div className="flex flex-wrap gap-6">
                    {["+971 55 993 3478", "+971 52 521 0658", "+263 71 350 7957"].map((num) => (
                      <a
                        key={num}
                        href={`tel:${num.replace(/\s/g, "")}`}
                        className="font-mono text-[13px] font-semibold text-primary hover:underline tracking-wide"
                      >
                        {num}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&display=swap');

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </main>
  )
}