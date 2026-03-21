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
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070",
  },
]

export function ServicesOverview() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Our Services
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Comprehensive Freight & Logistics Solutions
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            From sourcing to delivery, we provide end-to-end cargo solutions tailored to your business needs. 
            Operating from UAE & China to Zimbabwe with reliability and care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">{service.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-accent"
          >
            View All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
