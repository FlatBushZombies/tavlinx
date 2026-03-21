import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Package, Truck, Ship, Plane, Search, Home } from "lucide-react"

const services = [
  {
    icon: Search,
    title: "Goods Sourcing",
    description: "We source goods from verified suppliers with quality checks before shipping. Get access to trusted supplier contacts.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070",
  },
  {
    icon: Ship,
    title: "Sea Freight",
    description: "Cost-effective ocean freight solutions for bulk shipments. Safe packaging with transparent pricing.",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070",
  },
  {
    icon: Plane,
    title: "Air Freight",
    description: "Fast air cargo services for time-sensitive shipments. Express delivery when you need it most.",
    image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?q=80&w=2070",
  },
  {
    icon: Truck,
    title: "Road Freight",
    description: "Reliable land transportation across borders. Flexible routing options for your cargo.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070",
  },
  {
    icon: Package,
    title: "Spare Parts Sourcing",
    description: "Specialized sourcing for automotive and industrial spare parts from UAE and China.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2070",
  },
  {
    icon: Home,
    title: "Door-to-Door Delivery",
    description: "Complete end-to-end delivery service. We handle everything from pickup to final destination.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070",
  },
]

export function ServicesOverview() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header — left-aligned editorial style */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">
              Our Services
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0a1628] tracking-tight leading-tight">
              Comprehensive Freight &amp;<br className="hidden sm:block" /> Logistics Solutions
            </h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm lg:text-right lg:pb-1">
            From sourcing to delivery, we provide end-to-end cargo solutions tailored to your business needs.
            Operating from UAE &amp; China to Zimbabwe with reliability and care.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md shadow-slate-100 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-slate-200/70 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                {/* Index number — top right */}
                <span className="absolute top-4 right-4 font-mono text-[10px] font-bold text-white/60 tracking-widest bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="relative p-6 pt-4">
                {/* Icon chip */}
                <div className="w-10 h-10 rounded-xl bg-[#0a1628]/08 border border-[#0a1628]/10 flex items-center justify-center mb-4">
                  <service.icon className="w-5 h-5 text-[#0a1628]" />
                </div>
                <h3 className="text-base font-black text-[#0a1628] mb-2 tracking-tight">{service.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{service.description}</p>
              </div>

              {/* Bottom navy accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0a1628] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border-2 border-[#0a1628] text-[#0a1628] text-sm font-black tracking-wide hover:bg-[#0a1628] hover:text-white transition-all duration-200"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}