import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
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

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="/about-header.jpeg"
            alt="Global shipping"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        </div>

        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            About Us
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Your Trusted Freight & Cargo Partner
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
            We are a reliable freight & cargo service provider operating from UAE & China to destinations 
            across Zimbabwe, backed by good sourcing, secure handling, and fast delivery.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/tavlinx-warehouse.png"
                  alt="Tavlinx Warehouse Operations"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-2xl bg-accent/20" />
            </div>

            {/* Content */}
            <div>
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
                Our Story
              </span>
              <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Building Bridges Between Continents
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
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
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Our Values
            </span>
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              What Drives Us Every Day
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Our core values guide everything we do, from how we work with suppliers to how we 
              serve our customers.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Our Journey
            </span>
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Milestones That Define Us
            </h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 h-full w-0.5 bg-border md:left-1/2" />

              {/* Timeline items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex flex-col md:flex-row ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-8 top-0 -translate-x-1/2 md:left-1/2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
                        <Award className="h-4 w-4 text-accent-foreground" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                      <div className="rounded-xl border border-border bg-card p-6">
                        <span className="text-2xl font-bold text-accent">{milestone.year}</span>
                        <h3 className="mt-2 text-xl font-semibold text-card-foreground">{milestone.title}</h3>
                        <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="bg-primary py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Global Presence
            </span>
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              Connecting UAE, China & Zimbabwe
            </h2>
            <p className="mb-12 text-pretty text-lg leading-relaxed text-primary-foreground/80">
              With offices in Dubai and Zimbabwe, and sourcing networks across China, we provide 
              seamless freight solutions across continents.
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: Globe,
                  location: "Dubai, UAE",
                  description: "Our main hub for sourcing and consolidation. Goods are delivered to our warehouse in Sharjah.",
                },
                {
                  icon: Globe,
                  location: "China",
                  description: "Extensive supplier network for sourcing goods directly from manufacturers.",
                },
                {
                  icon: Globe,
                  location: "Zimbabwe",
                  description: "Local office in Harare for customer support and delivery coordination.",
                },
              ].map((office) => (
                <div key={office.location} className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 backdrop-blur-sm">
                  <office.icon className="mx-auto mb-4 h-10 w-10 text-accent" />
                  <h3 className="mb-2 text-xl font-semibold text-primary-foreground">{office.location}</h3>
                  <p className="text-sm text-primary-foreground/70">{office.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mx-auto mb-6 max-w-3xl text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ready to Work With Us?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Let's discuss how we can help with your freight and cargo needs. 
            Contact us today for a free consultation.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="gap-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/contact">
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
