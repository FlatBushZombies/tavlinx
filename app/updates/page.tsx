"use client"

import { useState } from "react"
import {
  AlertTriangle, Info, CheckCircle2,
  ChevronDown, ArrowRight,
  MessageCircle, CheckCheck,
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
                  className="tavlinx-btn-primary inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:opacity-90"
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function UpdatesPage() {
  const [filter, setFilter] = useState<FilterOption>("All")

  const active = NOTICES.filter((n) => !n.resolved)
  const resolved = NOTICES.filter((n) => n.resolved)

  const filtered = NOTICES.filter((n) => {
    if (filter === "All") return true
    if (filter === "Resolved") return n.resolved
    return n.type === filter.toLowerCase() && !n.resolved
  }).sort((a, b) => (a.resolved === b.resolved ? 0 : a.resolved ? 1 : -1))

  return (
    <main className="min-h-screen bg-[#F8F8F6]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden tavlinx-bg-primary">

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
          {active.length}
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
            Service Updates
          </h1>

          <p className="mb-10 max-w-lg text-[15px] leading-relaxed text-white/70">
            Stay informed on route changes, customs updates, and operational notices. View express pricing on our{" "}
            <a href="/pricing" className="text-sky-300 underline underline-offset-2 hover:text-white">
              pricing page
            </a>
            .
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-3 border border-red-300/20 bg-red-500/15 px-5 py-2.5">
              <span className="font-mono text-xl font-black text-white">{active.length}</span>
              <span className="text-[13px] font-medium text-white/70">Active</span>
            </div>
            <div className="flex items-center gap-3 border border-green-300/20 bg-green-500/15 px-5 py-2.5">
              <span className="font-mono text-xl font-black text-white">{resolved.length}</span>
              <span className="text-[13px] font-medium text-white/70">Resolved</span>
            </div>
          </div>
        </div>
        <div className="relative h-0">
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#F8F8F6]" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
        </div>
      </section>

      {/* ── CONTENT ──────────────────────────────────────────────── */}
      <section className="container mx-auto px-6 py-14 lg:px-12">

            {/* Filter bar */}
            <div className="mb-8 flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`rounded-none border px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition-all ${
                    filter === opt
                      ? "tavlinx-filter-active"
                      : "border-gray-300 bg-white text-gray-500 tavlinx-filter-inactive"
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
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;1,9..40,400&display=swap');

        :root {
          --tavlinx-primary: #03254b;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Primary color utility classes */
        .tavlinx-bg-primary        { background-color: #03254b !important; }
        .tavlinx-bg-primary-10     { background-color: rgba(3, 37, 75, 0.10) !important; }
        .tavlinx-text-primary      { color: #03254b !important; }
        .tavlinx-border-primary    { border-color: #03254b !important; }
        .tavlinx-border-primary-25 { border-color: rgba(3, 37, 75, 0.25) !important; }
        .tavlinx-ring-primary      { box-shadow: 0 0 0 1px rgba(3, 37, 75, 0.10) !important; }

        /* Icon box */
        .tavlinx-icon-box {
          background-color: rgba(3, 37, 75, 0.06);
          color: #03254b;
        }
        .group:hover .tavlinx-icon-box,
        .tavlinx-icon-box-hover {
          background-color: #03254b !important;
          color: #ffffff !important;
        }

        /* Filter buttons */
        .tavlinx-filter-active {
          border-color: #03254b !important;
          background-color: #03254b !important;
          color: #ffffff !important;
        }
        .tavlinx-filter-inactive:hover {
          border-color: #03254b !important;
          color: #03254b !important;
        }

        /* CTA button */
        .tavlinx-btn-primary {
          background-color: #03254b !important;
        }

        /* Pricing card popular badge */
        .tavlinx-popular-badge {
          background-color: #03254b !important;
        }

        /* Pricing price text */
        .tavlinx-price {
          color: #03254b !important;
        }

        /* hover:shadow-xl/primary ripple — keep shadow neutral */
        .hover\:shadow-xl:hover {
          --tw-shadow-color: rgba(3, 37, 75, 0.08);
        }
      `}</style>
    </main>
  )
}