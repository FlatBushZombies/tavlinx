import type { Metadata } from "next"
import Image from "next/image"
import { ArrowRight, Globe, Shield, Clock, Users, Target, Heart, Award, TrendingUp } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Tavlinx Freight Solutions",
  description: "Learn about Tavlinx Freight Solutions - your trusted freight and cargo partner operating from UAE & China to Zimbabwe. Reliable, secure, and professional logistics services.",
}

const WHATSAPP_LINK = "https://wa.me/971525210658"

const values = [
  {
    icon: Target,
    title: "Reliability",
    description: "We deliver on our promises. Your cargo is our commitment, and we take that responsibility seriously.",
  },
  {
    icon: Shield,
    title: "Security",
    description: "From verified suppliers to secure handling, we ensure your goods are protected every step of the way.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Your success is our success. We build lasting relationships through exceptional service.",
  },
  {
    icon: TrendingUp,
    title: "Excellence",
    description: "We continuously improve our processes to deliver better results for our clients.",
  },
]

const milestones = [
  {
    year: "2014",
    title: "Founded in Dubai",
    description: "Tavlinx Freight Solutions was established to bridge the gap between UAE suppliers and African markets.",
  },
  {
    year: "2016",
    title: "China Operations",
    description: "Expanded our sourcing network to include verified suppliers across China.",
  },
  {
    year: "2019",
    title: "Zimbabwe Office",
    description: "Opened our local office in Harare to better serve our customers in Zimbabwe.",
  },
  {
    year: "2024",
    title: "Growing Strong",
    description: "Serving hundreds of businesses with reliable freight solutions across multiple routes.",
  },
]

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <Image
          src="/about-header.jpeg"
          alt="Global shipping"
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
            About Us
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5">
            Your Trusted Freight &amp;<br className="hidden sm:block" /> Cargo Partner
          </h1>
          <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            We are a reliable freight &amp; cargo service provider operating from UAE &amp; China to destinations
            across Zimbabwe, backed by good sourcing, secure handling, and fast delivery.
          </p>
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative">
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-[#0a1628]/08 -z-10" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-slate-200/70">
                <Image
                  src="/tavlinx-warehouse.jpg"
                  alt="Tavlinx Warehouse Operations"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 left-6 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0a1628] text-white shadow-xl shadow-[#0a1628]/30">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-wide">Our Story</span>
              </div>
            </div>

            {/* Content */}
            <div className="pt-6 lg:pt-0">
              <div className="w-12 h-12 rounded-2xl bg-[#0a1628]/08 border border-[#0a1628]/10 flex items-center justify-center mb-5">
                <Globe className="w-6 h-6 text-[#0a1628]" />
              </div>
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#1a3a6b] uppercase mb-2">
                Building Bridges Between Continents
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#0a1628] tracking-tight mb-4 leading-tight">
                Who We Are
              </h2>
              <div className="space-y-4 text-slate-500 text-base leading-relaxed">
                <p>
                  At Tavlinx Freight Solutions, we understand the challenges businesses face when sourcing
                  goods internationally. That's why we've built a comprehensive logistics network that
                  connects UAE and China to Zimbabwe seamlessly.
                </p>
                <p>
                  Our team has years of experience in international trade, customs procedures, and
                  supply chain management. We leverage this expertise to provide our clients with
                  reliable, cost-effective shipping solutions.
                </p>
                <p>
                  From small parcels to bulk commercial freight, we handle every shipment with the same
                  level of care and professionalism. Our commitment to transparency means you always
                  know where your cargo is and when it will arrive.
                </p>
              </div>
              <div className="mt-8">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#0a1628] text-white text-sm font-bold tracking-wide hover:bg-[#1a3a6b] active:scale-95 transition-all duration-200 shadow-lg shadow-[#0a1628]/20"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR VALUES ────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Our Values</p>
            <h2 className="text-2xl md:text-3xl font-black text-[#0a1628] tracking-tight">
              What Drives Us Every Day
            </h2>
            <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
              Our core values guide everything we do, from how we work with suppliers to how we serve our customers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#0a1628]/15 hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0a1628]/07 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-[#0a1628]" />
                </div>
                <h3 className="text-sm font-bold text-[#0a1628] leading-snug">{value.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR JOURNEY ───────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Our Journey</p>
            <h2 className="text-2xl md:text-3xl font-black text-[#0a1628] tracking-tight">
              Milestones That Define Us
            </h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 h-full w-0.5 bg-slate-100 md:left-1/2" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  >
                    {/* Dot */}
                    <div className="absolute left-8 top-0 -translate-x-1/2 md:left-1/2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0a1628] shadow-lg shadow-[#0a1628]/30">
                        <Award className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-[#0a1628]/15 hover:-translate-y-0.5 transition-all duration-200 p-6">
                        <span className="text-2xl font-black text-[#1a3a6b]">{milestone.year}</span>
                        <h3 className="mt-2 text-base font-bold text-[#0a1628]">{milestone.title}</h3>
                        <p className="mt-1 text-sm text-slate-500 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ───────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-100 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Global Presence</p>
            <h2 className="text-2xl md:text-3xl font-black text-[#0a1628] tracking-tight">
              Connecting UAE, China &amp; Zimbabwe
            </h2>
            <p className="mt-3 text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
              With offices in Dubai and Zimbabwe, and sourcing networks across China, we provide
              seamless freight solutions across continents.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                location: "Dubai, UAE",
                description: "Our main hub for sourcing and consolidation. Goods are delivered to our warehouse in Sharjah.",
              },
              {
                location: "China",
                description: "Extensive supplier network for sourcing goods directly from manufacturers.",
              },
              {
                location: "Zimbabwe",
                description: "Local office in Harare for customer support and delivery coordination.",
              },
            ].map((office) => (
              <div
                key={office.location}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#0a1628]/15 hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0a1628]/07 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#0a1628]" />
                </div>
                <h3 className="text-sm font-bold text-[#0a1628] leading-snug">{office.location}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{office.description}</p>
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
            Ready to Work With Us?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Let's Discuss Your<br className="hidden sm:block" /> Freight Needs!
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-xl mx-auto">
            Contact us today for a free consultation. Let's discuss how we can help with your freight and cargo needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-green-600 text-white font-black text-sm tracking-wide hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-2xl shadow-green-900/40"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Chat on WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/20 text-white font-black text-sm tracking-wide hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}