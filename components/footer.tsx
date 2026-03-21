import Link from "next/link"
import Image from "next/image"
import { Phone, MapPin, ArrowUpRight } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/971559933478"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/tracking", label: "Flight Schedules & Tracking" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export function Footer() {
  return (
    <footer className="bg-black text-white">

      {/* ── Top CTA strip ─────────────────────────────────── */}
      <div className="border-b border-white/08">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-white font-bold text-base leading-snug">Available 24 / 7 on WhatsApp</p>
            <p className="text-white/40 text-sm mt-0.5">Get a quote, track your cargo, or ask us anything.</p>
          </div>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-green-600 text-white text-sm font-bold tracking-wide hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-lg shadow-green-900/30 whitespace-nowrap shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* ── Main columns ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <Image
              src="/logo.png"
              alt="Tavlinx Freight Solutions"
              width={160}
              height={45}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-white/45 text-sm leading-relaxed">
              Your trusted freight and cargo partner. We deliver excellence from UAE &amp; China to Zimbabwe with reliable sourcing, secure handling, and fast delivery.
            </p>

            {/* Divider line */}
            <div className="w-10 h-px bg-white/20" />

            {/* Subtle region badges */}
            <div className="flex flex-wrap gap-2">
              {["UAE", "China", "Zimbabwe"].map((r) => (
                <span
                  key={r}
                  className="px-2.5 py-1 rounded-md border border-white/10 bg-white/05 text-white/50 text-[11px] font-semibold tracking-wide"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-white text-xs font-black tracking-[0.18em] uppercase">Quick Links</h3>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between py-1.5 text-sm text-white/45 hover:text-white transition-colors duration-200"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Dubai Office */}
          <div className="space-y-5">
            <h3 className="text-white text-xs font-black tracking-[0.18em] uppercase">Dubai Office</h3>
            <div className="space-y-3.5">
              <a
                href="tel:+971525210658"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/06 border border-white/08 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 transition-colors" />
                </div>
                <span className="text-sm text-white/45 group-hover:text-white transition-colors">+971 52 521 0658</span>
              </a>
              <a
                href="tel:+971559933478"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/06 border border-white/08 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 transition-colors" />
                </div>
                <span className="text-sm text-white/45 group-hover:text-white transition-colors">+971 55 993 3478</span>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/06 border border-white/08 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-white/50" />
                </div>
                <span className="text-sm text-white/45 leading-relaxed">Sharjah, UAE</span>
              </div>
            </div>
          </div>

          {/* Zimbabwe Office */}
          <div className="space-y-5">
            <h3 className="text-white text-xs font-black tracking-[0.18em] uppercase">Zimbabwe Office</h3>
            <div className="space-y-3.5">
              <a
                href="tel:+263713507957"
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/06 border border-white/08 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 transition-colors" />
                </div>
                <span className="text-sm text-white/45 group-hover:text-white transition-colors">+263 71 350 7957</span>
              </a>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/06 border border-white/08 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-white/50" />
                </div>
                <span className="text-sm text-white/45 leading-relaxed">
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
      <div className="border-t border-white/08">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Tavlinx Freight Solutions. All rights reserved.
          </p>
          {/* Subtle dot-grid texture indicator — brand consistency mark */}
          <div className="flex items-center gap-1.5">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="w-1 h-1 rounded-full bg-white/20" />
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}