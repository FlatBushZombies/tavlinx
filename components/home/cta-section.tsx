import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/971559933478"

export function CTASection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/90">
          <div className="relative px-6 py-16 text-center md:px-12 lg:px-20 lg:py-24">
            {/* Decorative Elements */}
            <div className="absolute left-0 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20" />
            <div className="absolute bottom-0 right-0 h-48 w-48 translate-x-1/4 translate-y-1/4 rounded-full bg-accent/10" />

            {/* Content */}
            <div className="relative">
              <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
                Ready to Ship?
              </span>
              <h2 className="mx-auto mb-6 max-w-3xl text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl lg:text-5xl">
                Let's Move Your Cargo Today
              </h2>
              <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
                Get a free quote for your shipment. Our team is ready to provide you with the best rates 
                and fastest delivery options from UAE & China to Zimbabwe.
              </p>

              {/* CTA Buttons */}
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
                <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <a href="tel:+971559933478" className="gap-2">
                    <Phone className="h-5 w-5" />
                    +971 55 993 3478
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
