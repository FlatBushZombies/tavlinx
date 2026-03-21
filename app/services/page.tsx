import type { Metadata } from "next"
import Image from "next/image"
import { ArrowRight, Package, Truck, Ship, Plane, Search, Home, CheckCircle2, Warehouse } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Services | Tavlinx Freight Solutions",
  description: "Comprehensive freight and cargo services including goods sourcing, sea freight, air freight, road freight, and door-to-door delivery from UAE & China to Zimbabwe.",
}

const WHATSAPP_LINK = "https://wa.me/971559933478"

const services = [
  {
    icon: Search,
    title: "Goods Sourcing",
    description: "We source goods on your behalf from trusted suppliers. All items are quality-checked before shipping, and supplier contact details are shared once you become a consistent client.",
    features: [
      "Verified supplier network",
      "Quality checks before shipping",
      "Transparent pricing",
      "Supplier contacts for regular clients",
    ],
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070",
  },
  {
    icon: Ship,
    title: "Sea Freight",
    description: "Cost-effective ocean freight solutions for bulk shipments and commercial cargo. We handle all documentation, customs clearance, and ensure safe packaging for your goods.",
    features: [
      "Full Container Load (FCL)",
      "Less than Container Load (LCL)",
      "Safe cargo consolidation",
      "Customs clearance support",
    ],
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070",
  },
  {
    icon: Plane,
    title: "Air Freight",
    description: "Fast air cargo services for time-sensitive shipments. When speed matters most, our air freight solutions ensure your cargo arrives quickly and safely.",
    features: [
      "Express delivery options",
      "Time-critical shipments",
      "Real-time tracking",
      "Secure handling",
    ],
    image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?q=80&w=2070",
  },
  {
    icon: Truck,
    title: "Road Freight",
    description: "Reliable land transportation across borders with flexible routing options. Perfect for regional deliveries and cross-border logistics.",
    features: [
      "Full Truckload (FTL)",
      "Less than Truckload (LTL)",
      "Flexible routing",
      "Cross-border logistics",
    ],
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070",
  },
  {
    icon: Package,
    title: "Spare Parts Sourcing",
    description: "Specialized sourcing for automotive and industrial spare parts from UAE and China. We find the parts you need at competitive prices.",
    features: [
      "Automotive spare parts",
      "Industrial equipment parts",
      "Machinery components",
      "Competitive pricing",
    ],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2070",
  },
  {
    icon: Home,
    title: "Door-to-Door Delivery",
    description: "Complete end-to-end delivery service. We handle everything from pickup at origin to final delivery at your doorstep.",
    features: [
      "Pickup from origin",
      "Customs handling",
      "Last-mile delivery",
      "Delivery confirmation",
    ],
    // Delivery person handing parcel at front door — clearly door-to-door
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Consolidation",
    description: "Goods are delivered to our warehouse in Sharjah, UAE. We provide secure cargo consolidation to reduce delays and losses.",
    features: [
      "Secure storage",
      "Cargo consolidation",
      "Pick-up arrangements",
      "Inventory management",
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
  },
]

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070"
          alt="Freight containers"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Navy overlay — 65% keeps photo clearly readable */}
        <div className="absolute inset-0 bg-[#0a1628]/65" />
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 py-32 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white text-[10px] font-black tracking-[0.18em] uppercase mb-6">
            What We Offer
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5">
            Comprehensive Freight &amp;<br className="hidden sm:block" /> Cargo Services
          </h1>
          <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            From sourcing to delivery, we provide end-to-end logistics solutions tailored to your business needs.
            Operating from UAE &amp; China to Zimbabwe.
          </p>
        </div>
      </section>

      {/* ── SERVICES LIST ─────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="space-y-20 lg:space-y-28">
            {services.map((service, index) => {
              const even = index % 2 === 0
              return (
                <div
                  key={service.title}
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${!even ? "lg:[grid-template-areas:'content_image']" : ""}`}
                >
                  {/* ── Image ── */}
                  <div
                    className={`relative ${!even ? "lg:[grid-area:image]" : ""}`}
                  >
                    {/* Shadow block — decorative offset */}
                    <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-[#0a1628]/08 -z-10" />
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-slate-200/70">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                      {/* Subtle inner vignette */}
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                    </div>

                    {/* Floating service badge */}
                    <div className="absolute -bottom-5 left-6 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0a1628] text-white shadow-xl shadow-[#0a1628]/30">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                        <service.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold tracking-wide">{service.title}</span>
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div className={`pt-6 lg:pt-0 ${!even ? "lg:[grid-area:content]" : ""}`}>
                    {/* Icon chip */}
                    <div className="w-12 h-12 rounded-2xl bg-[#0a1628]/08 border border-[#0a1628]/10 flex items-center justify-center mb-5">
                      <service.icon className="w-6 h-6 text-[#0a1628]" />
                    </div>

                    {/* Index number */}
                    <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#1a3a6b] uppercase mb-2">
                      {String(index + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </p>

                    <h2 className="text-2xl md:text-3xl font-black text-[#0a1628] tracking-tight mb-4 leading-tight">
                      {service.title}
                    </h2>
                    <p className="text-slate-500 text-base leading-relaxed mb-7">
                      {service.description}
                    </p>

                    {/* Features grid */}
                    <ul className="grid sm:grid-cols-2 gap-2.5 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#0a1628]/08 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-[#0a1628]" />
                          </div>
                          <span className="text-sm text-slate-600 font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#0a1628] text-white text-sm font-bold tracking-wide hover:bg-[#1a3a6b] active:scale-95 transition-all duration-200 shadow-lg shadow-[#0a1628]/20"
                    >
                      Request a Quote
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID SUMMARY ─────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">All Services</p>
            <h2 className="text-2xl md:text-3xl font-black text-[#0a1628] tracking-tight">
              Everything You Need, In One Place
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#0a1628]/15 hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0a1628]/07 flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-[#0a1628]" />
                </div>
                <span className="text-[11px] font-bold text-[#0a1628] leading-snug">{service.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative bg-[#0a1628] py-20 lg:py-28 overflow-hidden">
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-sky-500/08 blur-3xl" />
        </div>
        {/* Top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 bg-white/08 text-white/70 text-[10px] font-black tracking-[0.18em] uppercase mb-6">
            Need Custom Solutions?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Have Specific Requirements?<br className="hidden sm:block" /> Let's Talk!
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Every shipment is unique. Contact us to discuss your specific needs and we'll create a
            customized logistics solution just for you.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-green-600 text-white font-black text-sm tracking-wide hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-2xl shadow-green-900/40"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Chat With Us on WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  )
}