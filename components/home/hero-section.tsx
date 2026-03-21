import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/971559933478"

const highlights = [
  "Trusted Suppliers",
  "Safe Handling",
  "Fast Delivery",
]

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070"
          alt="Cargo ship and freight containers"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex min-h-[90vh] flex-col justify-center px-4 py-20 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-2 text-sm font-medium text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Reliable Freight Solutions
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Your Cargo, Our Commitment.{" "}
            <span className="text-accent">Delivered.</span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80 md:text-xl">
            From UAE & China to Zimbabwe — we provide fast, secure, and cost-effective freight solutions. 
            Trusted sourcing, professional handling, and door-to-door delivery you can count on.
          </p>

          {/* Highlights */}
          <div className="mb-10 flex flex-wrap gap-4">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2 text-primary-foreground/90">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="gap-2">
                Get a Free Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <a href="/services">
                Explore Our Services
              </a>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 lg:mt-20">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Shipments Monthly" },
            { value: "99%", label: "On-Time Delivery" },
            { value: "24/7", label: "Customer Support" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-primary-foreground/10 bg-primary-foreground/5 p-4 backdrop-blur-sm lg:p-6">
              <div className="text-2xl font-bold text-accent lg:text-3xl">{stat.value}</div>
              <div className="mt-1 text-sm text-primary-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
