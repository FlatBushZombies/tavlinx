import { MessageSquare, Package, Truck, CheckCircle } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: MessageSquare,
    title: "Get in Touch",
    description: "Contact us via WhatsApp or phone to discuss your shipping requirements. We'll provide a tailored quote.",
  },
  {
    step: "02",
    icon: Package,
    title: "Source & Prepare",
    description: "We source goods from verified suppliers, conduct quality checks, and prepare your cargo for shipping.",
  },
  {
    step: "03",
    icon: Truck,
    title: "Ship & Track",
    description: "Your cargo is shipped securely via the optimal route. Track your shipment status with us anytime.",
  },
  {
    step: "04",
    icon: CheckCircle,
    title: "Receive & Confirm",
    description: "Door-to-door delivery to your destination. We ensure safe arrival and customer satisfaction.",
  },
]

export function ProcessSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
            How It Works
          </span>
          <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Simple Steps to Ship Your Cargo
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            We make freight shipping simple with a clear, step-by-step process. 
            From initial contact to final delivery, we handle everything.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="absolute left-0 right-0 top-16 hidden h-0.5 bg-border lg:block" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Step Number */}
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground lg:mx-auto">
                  {item.step}
                </div>

                {/* Content */}
                <div className="lg:text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 lg:mx-auto">
                    <item.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
