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
    <section className="bg-white border-t border-slate-100 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">
            How It Works
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0a1628] tracking-tight leading-tight mb-4">
            Simple Steps to Ship Your Cargo
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            We make freight shipping simple with a clear, step-by-step process.
            From initial contact to final delivery, we handle everything.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">

          {/* Connecting track — desktop only */}
          <div className="hidden lg:block absolute top-[2.75rem] left-[12.5%] right-[12.5%] h-px z-0">
            {/* Background line */}
            <div className="absolute inset-0 bg-slate-200" />
            {/* Animated fill — fades from navy to transparent right */}
            <div
              className="absolute inset-y-0 left-0 w-3/4 bg-[#0a1628]"
              style={{ clipPath: "inset(0)" }}
            />
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, i) => (
              <div key={item.step} className="relative flex flex-col">

                {/* Step bubble */}
                <div className="relative z-10 mb-6 lg:mx-auto">
                  <div className={`w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center font-mono font-black text-lg border-2 shadow-md ${
                    i < 3
                      ? "bg-[#0a1628] border-[#0a1628] text-white shadow-[#0a1628]/25"
                      : "bg-white border-slate-200 text-slate-400"
                  }`}>
                    {item.step}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 rounded-2xl bg-white border border-slate-100 shadow-md shadow-slate-100 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 p-6 lg:text-center">
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 lg:mx-auto ${
                    i < 3
                      ? "bg-[#0a1628]/08 border border-[#0a1628]/10"
                      : "bg-slate-100 border border-slate-200"
                  }`}>
                    <item.icon className={`w-5 h-5 ${i < 3 ? "text-[#0a1628]" : "text-slate-400"}`} />
                  </div>
                  <h3 className={`text-sm font-black mb-2 leading-snug ${i < 3 ? "text-[#0a1628]" : "text-slate-400"}`}>
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}