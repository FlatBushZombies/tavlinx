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
    <section className="bg-secondary py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070"
                alt="Freight containers at port"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 hidden rounded-xl bg-accent p-6 text-accent-foreground shadow-lg md:block lg:-bottom-8 lg:-right-8">
              <div className="text-4xl font-bold">10+</div>
              <div className="text-sm opacity-90">Years of Excellence</div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Why Choose Us
            </span>
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Driven by Expertise Built for Logistics
            </h2>
            <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground">
              As a trusted logistics partner, we play a key role in streamlining global supply chains. 
              From first mile to final destination, we deliver reliable, flexible, and efficient transport 
              solutions that keep your business moving.
            </p>

            {/* Features Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
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
