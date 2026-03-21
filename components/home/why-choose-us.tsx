import Image from "next/image"
import { Shield, Clock, Globe, Users, CheckCircle2, Headphones } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Verified Suppliers",
    description: "All goods are sourced from verified suppliers. Items are quality-checked before shipping.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Fast delivery options available based on your route. We prioritize speed without compromising safety.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Operating from UAE & China to Zimbabwe with an extensive network of trusted partners.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Our team is available to assist you at every step. Personalized service for every client.",
  },
  {
    icon: CheckCircle2,
    title: "Transparent Pricing",
    description: "No hidden fees. Clear pricing with complete cost breakdown before you commit.",
  },
  {
    icon: Headphones,
    title: "24/7 Availability",
    description: "Reach us anytime through WhatsApp or phone. We're always here to help.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-slate-50 border-t border-slate-100 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Image side ── */}
          <div className="relative">
            {/* Shadow block */}
            <div className="absolute -bottom-3 -right-3 w-full h-full rounded-3xl bg-[#0a1628]/08 -z-10" />

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-slate-300/60">
              <Image
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070"
                alt="Freight containers at port"
                fill
                className="object-cover"
              />
              {/* Inner ring */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
            </div>

            {/* Floating years-of-excellence card */}
            <div className="absolute -bottom-5 -right-5 md:-bottom-7 md:-right-7 hidden md:flex flex-col items-center justify-center w-28 h-28 rounded-2xl bg-[#0a1628] text-white shadow-2xl shadow-[#0a1628]/40">
              <span className="text-3xl font-black text-sky-300 leading-none">10+</span>
              <span className="text-[11px] text-white/60 mt-1 text-center leading-tight">Years of<br />Excellence</span>
            </div>

            {/* Small decorative dot grid */}
            <div
              className="absolute -top-6 -left-6 w-24 h-24 opacity-20 -z-10"
              style={{
                backgroundImage: "radial-gradient(circle, #0a1628 1.5px, transparent 1.5px)",
                backgroundSize: "10px 10px",
              }}
            />
          </div>

          {/* ── Content side ── */}
          <div>
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">
              Why Choose Us
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight leading-tight mb-5">
              Driven by Expertise<br />Built for Logistics
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-md">
              As a trusted logistics partner, we play a key role in streamlining global supply chains.
              From first mile to final destination, we deliver reliable, flexible, and efficient transport
              solutions that keep your business moving.
            </p>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex gap-3.5 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-[#0a1628]/12 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0a1628]/08 border border-[#0a1628]/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-[#0a1628]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0a1628] mb-1 leading-snug">{feature.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}