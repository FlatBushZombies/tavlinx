"use client"

import { useState } from "react"
import {
  AlertTriangle, Info, CheckCircle2, Zap,
  ChevronDown, ArrowRight, Clock, MapPin,
  MessageCircle, CheckCheck,
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// DATA — add / edit notices here
// ─────────────────────────────────────────────────────────────────────────────
export type NoticeType = "critical" | "warning" | "info" | "update"

export interface Notice {
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

const WHATSAPP_LINK = "https://wa.me/971525210658"

const TYPE_META: Record<NoticeType, {
  label: string
  color: string          // text / icon color
  bg: string             // badge background
  border: string         // badge + card border
  leftBar: string        // left accent bar
  iconBg: string         // icon circle bg
  icon: React.ReactNode
}> = {
  critical: {
    label:   "Critical",
    color:   "#DC2626",
    bg:      "#FEF2F2",
    border:  "#FECACA",
    leftBar: "#DC2626",
    iconBg:  "#FEF2F2",
    icon:    <AlertTriangle style={{ width: 16, height: 16 }} />,
  },
  warning: {
    label:   "Notice",
    color:   "#D97706",
    bg:      "#FFFBEB",
    border:  "#FDE68A",
    leftBar: "#F59E0B",
    iconBg:  "#FFFBEB",
    icon:    <AlertTriangle style={{ width: 16, height: 16 }} />,
  },
  info: {
    label:   "Info",
    color:   "#1B4FD8",
    bg:      "#EFF6FF",
    border:  "#BFDBFE",
    leftBar: "#1B4FD8",
    iconBg:  "#EFF6FF",
    icon:    <Info style={{ width: 16, height: 16 }} />,
  },
  update: {
    label:   "Update",
    color:   "#16A34A",
    bg:      "#F0FDF4",
    border:  "#BBF7D0",
    leftBar: "#16A34A",
    iconBg:  "#F0FDF4",
    icon:    <CheckCircle2 style={{ width: 16, height: 16 }} />,
  },
}

const FILTER_OPTIONS = ["All", "Critical", "Warning", "Info", "Update", "Resolved"] as const
type FilterOption = typeof FILTER_OPTIONS[number]

// ─── Notice Card ──────────────────────────────────────────────────────────────

function NoticeCard({ notice, index }: { notice: Notice; index: number }) {
  const [open, setOpen] = useState(false)
  const meta = TYPE_META[notice.type]
  const isResolved = !!notice.resolved

  return (
    <div
      className="nc-card"
      style={{
        background:    "#ffffff",
        border:        `1px solid ${isResolved ? "#E5E7EB" : meta.border}`,
        borderRadius:  "16px",
        overflow:      "hidden",
        opacity:       isResolved ? 0.72 : 1,
        animation:     "nc-enter 0.45s cubic-bezier(0.16,1,0.3,1) both",
        animationDelay:`${index * 0.055}s`,
        boxShadow:     isResolved
          ? "0 1px 3px rgba(0,0,0,0.04)"
          : `0 1px 3px rgba(0,0,0,0.06), 0 4px 16px ${meta.border}80`,
        transition:    "box-shadow 0.2s, transform 0.2s",
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position:  "absolute",
        left:      0,
        top:       0,
        bottom:    0,
        width:     "4px",
        background: isResolved ? "#D1D5DB" : meta.leftBar,
        borderRadius: "16px 0 0 16px",
      }} />

      <div style={{ marginLeft: "4px" }}>
        {/* Clickable header */}
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            width:      "100%",
            background: "none",
            border:     "none",
            cursor:     "pointer",
            padding:    "20px 20px 20px 20px",
            display:    "flex",
            alignItems: "flex-start",
            gap:        "14px",
            textAlign:  "left",
          }}
        >
          {/* Icon circle */}
          <div style={{
            width:          "38px",
            height:         "38px",
            borderRadius:   "10px",
            background:     isResolved ? "#F3F4F6" : meta.iconBg,
            border:         `1px solid ${isResolved ? "#E5E7EB" : meta.border}`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            flexShrink:     0,
            color:          isResolved ? "#9CA3AF" : meta.color,
            marginTop:      "1px",
          }}>
            {isResolved
              ? <CheckCheck style={{ width: 16, height: 16 }} />
              : meta.icon}
          </div>

          {/* Body */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Top row: badge + date */}
            <div style={{
              display:     "flex",
              alignItems:  "center",
              gap:         "8px",
              marginBottom:"7px",
              flexWrap:    "wrap",
            }}>
              {/* Type badge */}
              <span style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "5px",
                fontSize:      "10px",
                fontWeight:    700,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color:         isResolved ? "#9CA3AF" : meta.color,
                background:    isResolved ? "#F3F4F6" : meta.bg,
                border:        `1px solid ${isResolved ? "#E5E7EB" : meta.border}`,
                borderRadius:  "6px",
                padding:       "3px 9px",
                fontFamily:    "'DM Sans', sans-serif",
              }}>
                {!isResolved && (
                  <span style={{
                    width:        "5px",
                    height:       "5px",
                    borderRadius: "50%",
                    background:   meta.color,
                    display:      "inline-block",
                    animation:    notice.type === "critical" ? "nc-pulse 1.6s ease-in-out infinite" : "none",
                  }} />
                )}
                {isResolved ? "Resolved" : meta.label}
              </span>

              {/* Divider dot */}
              <span style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#D1D5DB", display: "inline-block" }} />

              {/* Date */}
              <span style={{
                display:    "inline-flex",
                alignItems: "center",
                gap:        "4px",
                fontSize:   "12px",
                color:      "#9CA3AF",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <Clock style={{ width: 11, height: 11 }} />
                {notice.date}
              </span>

              {/* Region */}
              <span style={{
                display:    "inline-flex",
                alignItems: "center",
                gap:        "4px",
                fontSize:   "12px",
                color:      "#9CA3AF",
                fontFamily: "'DM Sans', sans-serif",
              }}>
                <MapPin style={{ width: 11, height: 11 }} />
                {notice.region}
              </span>
            </div>

            {/* Title */}
            <p style={{
              margin:       0,
              fontSize:     "15px",
              fontWeight:   600,
              color:        isResolved ? "#9CA3AF" : "#111827",
              fontFamily:   "'DM Sans', sans-serif",
              lineHeight:   1.35,
              marginBottom: "6px",
              letterSpacing:"-0.01em",
            }}>
              {notice.title}
            </p>

            {/* Summary */}
            <p style={{
              margin:     0,
              fontSize:   "13.5px",
              fontWeight: 400,
              color:      isResolved ? "#9CA3AF" : "#6B7280",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
            }}>
              {notice.summary}
            </p>
          </div>

          {/* Chevron */}
          <div style={{
            flexShrink:     0,
            width:          "28px",
            height:         "28px",
            borderRadius:   "8px",
            background:     open ? "#F3F4F6" : "transparent",
            border:         open ? "1px solid #E5E7EB" : "1px solid transparent",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            transition:     "all 0.15s",
            marginTop:      "4px",
          }}>
            <ChevronDown style={{
              width:      "15px",
              height:     "15px",
              color:      "#9CA3AF",
              transform:  open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
            }} />
          </div>
        </button>

        {/* Expanded detail */}
        {open && (
          <div style={{
            padding:   "0 20px 22px 72px",
            animation: "nc-expand 0.22s ease forwards",
          }}>
            <div style={{
              borderLeft:  "2px solid #E5E7EB",
              paddingLeft: "16px",
            }}>
              <p style={{
                margin:     0,
                fontSize:   "13.5px",
                fontWeight: 400,
                color:      "#374151",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.75,
              }}>
                {notice.body}
              </p>

              {!isResolved && (
                <div style={{ marginTop: "18px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <a
                    href={`https://wa.me/971559933478?text=Re: ${encodeURIComponent(notice.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nc-cta-primary"
                  >
                    <MessageCircle style={{ width: 13, height: 13 }} />
                    Enquire via WhatsApp
                    <ArrowRight style={{ width: 12, height: 12 }} />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NoticesPage() {
  const [filter, setFilter] = useState<FilterOption>("All")

  const active   = NOTICES.filter(n => !n.resolved)
  const resolved = NOTICES.filter(n =>  n.resolved)

  const filtered = NOTICES
    .filter(n => {
      if (filter === "All")      return true
      if (filter === "Resolved") return n.resolved
      return n.type === filter.toLowerCase() && !n.resolved
    })
    .sort((a, b) => (a.resolved === b.resolved ? 0 : a.resolved ? 1 : -1))

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        @keyframes nc-enter {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes nc-expand {
          from { opacity:0; transform:translateY(-4px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes nc-pulse {
          0%,100% { opacity:1; }
          50%      { opacity:0.25; }
        }
        @keyframes nc-hero-fade {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .nc-card {
          position: relative;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .nc-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.09) !important;
        }

        .nc-filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid #E5E7EB;
          background: #ffffff;
          font-size: 12.5px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          color: #6B7280;
          cursor: pointer;
          transition: all 0.15s;
          white-space: nowrap;
        }
        .nc-filter-pill:hover {
          border-color: #1B4FD8;
          color: #1B4FD8;
          background: #EFF6FF;
        }
        .nc-filter-pill.active {
          background: #1B4FD8;
          border-color: #1B4FD8;
          color: #ffffff;
          box-shadow: 0 2px 10px rgba(27,79,216,0.3);
        }

        .nc-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          border-radius: 999px;
          background: #1B4FD8;
          color: #ffffff;
          font-size: 12.5px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          letter-spacing: 0.01em;
          transition: background 0.15s, transform 0.15s;
        }
        .nc-cta-primary:hover {
          background: #1a46c4;
          transform: translateY(-1px);
        }
      `}</style>

      <div style={{
        minHeight:  "100vh",
        background: "#F9FAFB",
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* ── Hero header ── */}
        <div style={{
          background:   "#ffffff",
          borderBottom: "1px solid #E5E7EB",
          padding:      "56px 24px 48px",
        }}>
          <div style={{ maxWidth: "860px", margin: "0 auto" }}>

            {/* Eyebrow */}
            <div style={{
              display:      "inline-flex",
              alignItems:   "center",
              gap:          "8px",
              background:   "#EFF6FF",
              border:       "1px solid #BFDBFE",
              borderRadius: "999px",
              padding:      "5px 14px",
              marginBottom: "20px",
              animation:    "nc-hero-fade 0.5s ease both",
            }}>
              <span style={{
                width:        "6px",
                height:       "6px",
                borderRadius: "50%",
                background:   "#1B4FD8",
                display:      "inline-block",
                animation:    "nc-pulse 2s ease-in-out infinite",
              }} />
              <span style={{
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color:         "#1B4FD8",
                fontFamily:    "'DM Sans', sans-serif",
              }}>
                Live Operational Updates
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontFamily:    "'Bebas Neue', sans-serif",
              fontSize:      "clamp(2.8rem,6vw,4.8rem)",
              letterSpacing: "0.02em",
              lineHeight:    1,
              color:         "#060C1A",
              margin:        "0 0 16px",
              animation:     "nc-hero-fade 0.55s ease 0.05s both",
            }}>
              Service{" "}
              <span style={{
                color:                "#1B4FD8",
                WebkitTextStroke:     "0px",
              }}>
                Notices
              </span>
            </h1>

            <p style={{
              margin:     "0 0 36px",
              fontSize:   "16px",
              fontWeight: 400,
              color:      "#6B7280",
              lineHeight: 1.65,
              maxWidth:   "520px",
              animation:  "nc-hero-fade 0.55s ease 0.1s both",
            }}>
              Stay informed on route disruptions, regulatory changes, and service updates that may affect your shipments.
            </p>

            {/* Stat chips */}
            <div style={{
              display:  "flex",
              gap:      "12px",
              flexWrap: "wrap",
              animation:"nc-hero-fade 0.55s ease 0.15s both",
            }}>
              {[
                { value: active.length,   label: "Active",   bg: "#FEF2F2", text: "#DC2626",  border: "#FECACA" },
                { value: resolved.length, label: "Resolved", bg: "#F0FDF4", text: "#16A34A",  border: "#BBF7D0" },
                { value: NOTICES.length,  label: "Total",    bg: "#EFF6FF", text: "#1B4FD8",  border: "#BFDBFE" },
              ].map(s => (
                <div key={s.label} style={{
                  display:      "flex",
                  alignItems:   "center",
                  gap:          "8px",
                  background:   s.bg,
                  border:       `1px solid ${s.border}`,
                  borderRadius: "10px",
                  padding:      "8px 16px",
                }}>
                  <span style={{
                    fontFamily:  "'Bebas Neue', sans-serif",
                    fontSize:    "1.6rem",
                    letterSpacing:"0.02em",
                    lineHeight:  1,
                    color:       s.text,
                  }}>
                    {s.value}
                  </span>
                  <span style={{
                    fontSize:   "12px",
                    fontWeight: 500,
                    color:      s.text,
                    fontFamily: "'DM Sans', sans-serif",
                    opacity:    0.75,
                  }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "36px 24px 80px" }}>

          {/* Filter bar */}
          <div style={{
            display:       "flex",
            alignItems:    "center",
            gap:           "8px",
            marginBottom:  "28px",
            overflowX:     "auto",
            paddingBottom: "2px",
          }}>
            {FILTER_OPTIONS.map(opt => (
              <button
                key={opt}
                className={`nc-filter-pill${filter === opt ? " active" : ""}`}
                onClick={() => setFilter(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Section label */}
          {filter === "All" && active.length > 0 && (
            <p style={{
              fontSize:      "11px",
              fontWeight:    600,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color:         "#9CA3AF",
              fontFamily:    "'DM Sans', sans-serif",
              marginBottom:  "12px",
            }}>
              Active · {active.length}
            </p>
          )}

          {/* Notice list */}
          {filtered.length === 0 ? (
            <div style={{
              textAlign:    "center",
              padding:      "72px 24px",
              background:   "#ffffff",
              border:       "1px solid #E5E7EB",
              borderRadius: "16px",
            }}>
              <CheckCircle2 style={{ width: 32, height: 32, color: "#D1D5DB", margin: "0 auto 12px" }} />
              <p style={{
                fontSize:   "14px",
                color:      "#9CA3AF",
                fontFamily: "'DM Sans', sans-serif",
                margin:     0,
              }}>
                No notices match this filter.
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filtered.filter(n => !n.resolved).map((n, i) => (
                  <NoticeCard key={n.id} notice={n} index={i} />
                ))}
              </div>

              {/* Resolved section divider */}
              {filtered.some(n => n.resolved) && (
                <>
                  <div style={{
                    display:    "flex",
                    alignItems: "center",
                    gap:        "12px",
                    margin:     "36px 0 16px",
                  }}>
                    <div style={{ height: "1px", background: "#E5E7EB", flex: 1 }} />
                    <span style={{
                      fontSize:      "11px",
                      fontWeight:    600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      color:         "#9CA3AF",
                      fontFamily:    "'DM Sans', sans-serif",
                      whiteSpace:    "nowrap",
                    }}>
                      Resolved · {filtered.filter(n => n.resolved).length}
                    </span>
                    <div style={{ height: "1px", background: "#E5E7EB", flex: 1 }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {filtered.filter(n => n.resolved).map((n, i) => (
                      <NoticeCard key={n.id} notice={n} index={i} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Footer */}
          <div style={{
            marginTop:    "48px",
            padding:      "20px 24px",
            background:   "#ffffff",
            border:       "1px solid #E5E7EB",
            borderRadius: "14px",
            display:      "flex",
            alignItems:   "center",
            gap:          "14px",
          }}>
            <div style={{
              width:          "36px",
              height:         "36px",
              borderRadius:   "10px",
              background:     "#EFF6FF",
              border:         "1px solid #BFDBFE",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              flexShrink:     0,
            }}>
              <Zap style={{ width: 15, height: 15, color: "#1B4FD8" }} />
            </div>
            <p style={{
              margin:     0,
              fontSize:   "13px",
              color:      "#6B7280",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.6,
            }}>
              Notices are updated by the Tavlinx operations team. For urgent enquiries contact us on WhatsApp:{" "}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1B4FD8", fontWeight: 600, textDecoration: "none" }}
              >
                +971 55 993 3478
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}