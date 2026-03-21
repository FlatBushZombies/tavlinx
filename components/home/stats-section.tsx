import Image from "next/image"

const stats = [
  { value: "250+", label: "Satisfied Clients" },
  { value: "5K+", label: "Shipments Delivered" },
  { value: "99%", label: "On-Time Delivery" },
  { value: "3", label: "Global Offices" },
]

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0a1628] py-20 lg:py-28">
      {/* Background image — clearly visible */}
      <Image
        src="https://images.unsplash.com/photo-1605732562742-3023a888e56e?q=80&w=2070"
        alt="Global shipping"
        fill
        className="object-cover object-center opacity-30"
      />
      {/* Navy overlay */}
      <div className="absolute inset-0 bg-[#0a1628]/70" />
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-sky-500/10 blur-3xl" />
      </div>
      {/* Top & bottom edge lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sky-400 text-[10px] font-black tracking-[0.22em] uppercase mb-2">
            Our Impact
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Trusted by Businesses Across Africa
          </h2>
          <p className="text-white/50 text-sm leading-relaxed max-w-xl mx-auto">
            With years of experience in international freight, we've built a reputation for reliability,
            transparency, and exceptional service.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/05 backdrop-blur-sm px-6 py-8 text-center hover:bg-white/08 hover:border-white/20 transition-all duration-200"
            >
              <div className="text-4xl lg:text-5xl font-black text-sky-300 leading-none mb-2">{stat.value}</div>
              <div className="text-xs text-white/50 font-medium tracking-wide leading-relaxed">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}