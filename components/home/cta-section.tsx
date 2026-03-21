import { ArrowRight, Phone } from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/971559933478"

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export function CTASection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl bg-[#0a1628]">

          {/* Dot-grid texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Decorative blobs */}
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-white/04 blur-3xl pointer-events-none" />

          {/* Top edge line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* Content */}
          <div className="relative z-10 px-8 py-16 text-center md:px-14 lg:px-20 lg:py-20">

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/07 text-white/60 text-[10px] font-black tracking-[0.18em] uppercase mb-6">
              Ready to Ship?
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto mb-5">
              Let's Move Your Cargo Today
            </h2>

            <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto mb-10">
              Get a free quote for your shipment. Our team is ready to provide you with the best rates
              and fastest delivery options from UAE &amp; China to Zimbabwe.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-green-600 text-white font-black text-sm tracking-wide hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-2xl shadow-green-900/40"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Chat on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+971559933478"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/70 font-semibold text-sm hover:border-white/40 hover:text-white transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                +971 55 993 3478
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}