import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/971559933478"

const highlights = [
  "Trusted Suppliers",
  "Safe Handling",
  "Fast Delivery",
]

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-[#0a1628]">
      {/* Background image — clearly visible at 40% opacity */}
      <Image
        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
        alt="Cargo ship and freight containers"
        fill
        className="object-cover object-center opacity-40"
        priority
      />

      {/* Left-to-right navy gradient so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/85 to-[#0a1628]/40" />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Radial glow — top-left quadrant */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-28">
        <div className="max-w-3xl">

          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/08 backdrop-blur-sm text-white/80 text-xs font-bold tracking-[0.14em] uppercase mb-7">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            Reliable Freight Solutions
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.06] tracking-tight mb-6">
            Your Cargo, Our Commitment.{" "}
            <span className="text-sky-300">Delivered.</span>
          </h1>

          {/* Subheading */}
          <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-8">
            From UAE &amp; China to Zimbabwe — we provide fast, secure, and cost-effective freight solutions.
            Trusted sourcing, professional handling, and door-to-door delivery you can count on.
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-5 mb-10">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-sky-300" />
                </div>
                <span className="text-white/80 text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-green-600 text-white font-black text-sm tracking-wide hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-xl shadow-green-900/30"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/08 hover:border-white/35 hover:text-white transition-all duration-200"
            >
              Explore Our Services
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Shipments Monthly" },
            { value: "99%", label: "On-Time Delivery" },
            { value: "24/7", label: "Customer Support" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/05 backdrop-blur-sm px-5 py-4 lg:px-6 lg:py-5"
            >
              <div className="text-2xl lg:text-3xl font-black text-sky-300 mb-0.5">{stat.value}</div>
              <div className="text-xs text-white/50 font-medium tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom edge fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}