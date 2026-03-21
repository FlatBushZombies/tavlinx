import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone, MapPin, Clock, MessageCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Tavlinx Freight Solutions",
  description: "Get in touch with Tavlinx Freight Solutions. Contact our Dubai or Zimbabwe offices for freight and cargo services. We're available 24/7 on WhatsApp.",
}

const WHATSAPP_LINK = "https://wa.me/971559933478"

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us instantly",
    value: "+971 55 993 3478",
    action: WHATSAPP_LINK,
    actionLabel: "Send Message",
    highlight: true,
  },
  {
    icon: Phone,
    title: "Dubai Office",
    description: "Call our UAE team",
    value: "+971 52 521 0658",
    action: "tel:+971525210658",
    actionLabel: "Call Now",
  },
  {
    icon: Phone,
    title: "Zimbabwe Office",
    description: "Call our local team",
    value: "+263 71 350 7957",
    action: "tel:+263713507957",
    actionLabel: "Call Now",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "We're available",
    value: "24/7 on WhatsApp",
    action: WHATSAPP_LINK,
    actionLabel: "Contact Us",
  },
]

const faqs = [
  {
    question: "What areas do you serve?",
    answer: "We operate from UAE and China to Zimbabwe. Our main routes connect Dubai and Chinese suppliers to destinations across Zimbabwe.",
  },
  {
    question: "How long does shipping take?",
    answer: "Delivery times depend on the shipping method and route. Air freight typically takes 5-7 days, while sea freight takes 4-6 weeks. Contact us for specific estimates.",
  },
  {
    question: "Do you handle customs clearance?",
    answer: "Yes, we provide full customs clearance support for all shipments. Our team handles all documentation and compliance requirements.",
  },
  {
    question: "Can you source products for me?",
    answer: "Absolutely! We source goods from verified suppliers in UAE and China. All items are quality-checked before shipping.",
  },
  {
    question: "What are your payment terms?",
    answer: "We offer flexible payment options. Contact us to discuss terms that work best for your business.",
  },
  {
    question: "Do you offer tracking?",
    answer: "Yes, we provide shipment tracking. You can contact us anytime via WhatsApp for updates on your cargo.",
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary py-20 lg:py-28">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069"
            alt="Contact us"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        </div>

        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            Get in Touch
          </span>
          <h1 className="mx-auto mb-6 max-w-4xl text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            Contact Our Team
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
            Ready to ship? Have questions? Our team is here to help. 
            Reach out via WhatsApp for the fastest response.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className={`rounded-xl border p-6 transition-all ${
                  method.highlight
                    ? "border-accent bg-accent/5"
                    : "border-border bg-card"
                }`}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                  method.highlight ? "bg-accent/20" : "bg-accent/10"
                }`}>
                  <method.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">{method.title}</h3>
                <p className="mb-2 text-sm text-muted-foreground">{method.description}</p>
                <p className="mb-4 font-medium text-foreground">{method.value}</p>
                <Button asChild variant={method.highlight ? "default" : "outline"} className={method.highlight ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}>
                  <a href={method.action} target={method.action.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {method.actionLabel}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-secondary py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Our Offices
            </span>
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Visit Us
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Dubai Office */}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070"
                  alt="Dubai skyline"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">Dubai Office (UAE)</h3>
                <div className="mb-4 space-y-2">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>Sharjah, United Arab Emirates</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-5 w-5 shrink-0 text-accent" />
                    <span>+971 52 521 0658</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-5 w-5 shrink-0 text-accent" />
                    <span>+971 55 993 3478</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href="tel:+971559933478">
                    Call Dubai Office
                  </a>
                </Button>
              </div>
            </div>

            {/* Zimbabwe Office */}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?q=80&w=2067"
                  alt="Zimbabwe"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">Zimbabwe Office</h3>
                <div className="mb-4 space-y-2">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>Corner Innez Terrace & George Silundika, Zimex Mall, Shop C15, 1st Floor (Opposite Zimpost Main Entrance)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-5 w-5 shrink-0 text-accent" />
                    <span>+263 71 350 7957</span>
                  </div>
                </div>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href="tel:+263713507957">
                    Call Zimbabwe Office
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              FAQ
            </span>
            <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              Find answers to common questions about our services.
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="grid gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 lg:py-28">
        <div className="container mx-auto px-4 text-center lg:px-8">
          <h2 className="mx-auto mb-6 max-w-3xl text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Still Have Questions?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
            Don't hesitate to reach out. Our team is available 24/7 on WhatsApp to help with any questions 
            or to provide a free quote for your shipment.
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
