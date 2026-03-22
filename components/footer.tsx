import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, ArrowUpRight } from "lucide-react"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/tracking", label: "Flight Schedules & Tracking" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer style={{ background: "#070D1A", color: "#fff" }}>

      {/* ── Main columns ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-16 pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Image
              src="/logo.png"
              alt="Tavlinx Freight Solutions"
              width={160}
              height={45}
              className="max-h-24 w-auto object-contain brightness-0 invert justify-center"
            />
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", lineHeight: "1.7" }}>
              Your trusted freight and cargo partner. We deliver excellence from UAE &amp; China to Zimbabwe with reliable sourcing, secure handling, and fast delivery.
            </p>

            <div style={{ width: "32px", height: "2px", background: "rgba(255,255,255,0.15)", borderRadius: "2px" }} />

            <div className="flex flex-wrap gap-2">
              {["UAE", "China", "Zimbabwe"].map((r) => (
                <span
                  key={r}
                  style={{
                    padding: "4px 12px",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.75)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 style={{
              color: "#fff",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>
              Quick Links
            </h3>
            <nav className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between py-2 text-white/60 hover:text-white transition-colors duration-200"
                >
                  <span style={{ fontSize: "0.875rem" }}>{link.label}</span>
                  <ArrowUpRight
                    className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Dubai Office */}
          <div className="flex flex-col gap-5">
            <h3 style={{
              color: "#fff",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>
              Dubai Office
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { href: "tel:+971525210658", label: "+971 52 521 0658" },
                { href: "tel:+971559933478", label: "+971 55 993 3478" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="group flex items-center gap-3"
                >
                  <div
                    className="group-hover:border-white/30 transition-colors duration-200"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      border: "1px solid rgba(255,255,255,0.15)",
                      background: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Phone style={{ width: 14, height: 14, color: "rgba(255,255,255,0.70)" }} />
                  </div>
                  <span
                    className="group-hover:text-white transition-colors duration-200"
                    style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }}
                  >
                    {label}
                  </span>
                </a>
              ))}
              <div className="flex items-start gap-3">
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <MapPin style={{ width: 14, height: 14, color: "rgba(255,255,255,0.70)" }} />
                </div>
                <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                  Sharjah, UAE
                </span>
              </div>
            </div>
          </div>

          {/* Zimbabwe Office */}
          <div className="flex flex-col gap-5">
            <h3 style={{
              color: "#fff",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>
              Zimbabwe Office
            </h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+263713507957" className="group flex items-center gap-3">
                <div
                  className="group-hover:border-white/30 transition-colors duration-200"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Phone style={{ width: 14, height: 14, color: "rgba(255,255,255,0.70)" }} />
                </div>
                <span
                  className="group-hover:text-white transition-colors duration-200"
                  style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }}
                >
                  +263 71 350 7957
                </span>
              </a>
              <div className="flex items-start gap-3">
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <MapPin style={{ width: 14, height: 14, color: "rgba(255,255,255,0.70)" }} />
                </div>
                <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                  Corner Innez Terrace &amp; George Silundika<br />
                  Zimex Mall, Shop C15, 1st Floor<br />
                  (Opposite Zimpost Main Entrance)
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "12px" }}>
            © {new Date().getFullYear()} Tavlinx Freight Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.22)", display: "block" }}
              />
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}