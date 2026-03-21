import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
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
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070",
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

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070"
            alt="Freight containers"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        </div>

        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            What We Offer
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Comprehensive Freight & Cargo Services
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
            From sourcing to delivery, we provide end-to-end logistics solutions tailored to your business needs. 
            Operating from UAE & China to Zimbabwe.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-accent/20" />
                </div>

                {/* Content */}
                <div>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                    <service.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">{service.title}</h2>
                  <p className="mb-6 text-lg leading-relaxed text-muted-foreground">{service.description}</p>

                  {/* Features */}
                  <ul className="mb-8 grid gap-3 sm:grid-cols-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="gap-2">
                      Request a Quote
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Need Custom Solutions?
          </span>
          <h2 className="mx-auto mb-6 max-w-3xl text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Have Specific Requirements? Let's Talk!
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Every shipment is unique. Contact us to discuss your specific needs and we'll create a 
            customized logistics solution just for you.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="gap-2">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat With Us on WhatsApp
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
