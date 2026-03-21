import Image from "next/image"

const stats = [
  { value: "250+", label: "Satisfied Clients" },
  { value: "5K+", label: "Shipments Delivered" },
  { value: "99%", label: "On-Time Delivery" },
  { value: "3", label: "Global Offices" },
]

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-primary py-20 lg:py-28">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1605732562742-3023a888e56e?q=80&w=2070"
          alt="Global shipping"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Our Impact
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
            Trusted by Businesses Across Africa
          </h2>
          <p className="mb-16 text-pretty text-lg leading-relaxed text-primary-foreground/80">
            With years of experience in international freight, we've built a reputation for reliability, 
            transparency, and exceptional service.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mb-2 text-4xl font-bold text-accent lg:text-5xl">{stat.value}</div>
              <div className="text-sm text-primary-foreground/70 lg:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
