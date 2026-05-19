import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CircleDollarSign, Plane, MessageCircle } from 'lucide-react'
import { PRICING_ROWS } from '@/lib/pricing'

const WHATSAPP_LINK = 'https://wa.me/971525210658'

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative min-h-[480px] sm:min-h-[520px] flex items-center overflow-hidden">
        <Image
          src="/cargo-plane.jpg"
          alt="Express air freight pricing"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0a1628]/65" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-24 sm:py-28 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white text-[10px] font-black tracking-[0.18em] uppercase mb-6">
            <CircleDollarSign className="w-3.5 h-3.5" />
            Product Pricing
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5">
            Express Air Freight<br />
            <span className="text-sky-300">Rates (USD / AED)</span>
          </h1>
          <p className="text-white/65 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
            Transparent product pricing for shipments from Dubai to Zimbabwe. All rates shown in US dollars and UAE dirhams.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold">
              <Plane className="w-3.5 h-3.5 text-sky-300" />
              24-hour express delivery
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold">
              Dubai → Zimbabwe
            </span>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-t border-slate-100 py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Rate Sheet</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight mb-3">
              Product Price List
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
              General charges for express air freight. Contact us for items not listed or bulk quotations.
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white shadow-xl shadow-slate-200/60 overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[720px]">
                <thead>
                  <tr className="bg-[#0a1628] text-white">
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Price (USD)</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Price (AED)</th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_ROWS.map((row) => (
                    <tr
                      key={row.product}
                      className={`border-b border-slate-100 transition-colors hover:bg-slate-50/80 ${
                        row.highlight ? 'bg-sky-50/40' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-[#0a1628]">{row.product}</p>
                        {row.note && <p className="text-xs text-slate-500 mt-0.5">{row.note}</p>}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#0a1628]">{row.priceUsd}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-slate-600">{row.priceAed}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 capitalize">{row.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-slate-100">
              {PRICING_ROWS.map((row) => (
                <div key={row.product} className={`p-5 ${row.highlight ? 'bg-sky-50/50' : ''}`}>
                  <p className="text-sm font-bold text-[#0a1628] mb-1">{row.product}</p>
                  {row.note && <p className="text-xs text-slate-500 mb-3">{row.note}</p>}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <MobilePriceCell label="USD" value={row.priceUsd} bold />
                    <MobilePriceCell label="AED" value={row.priceAed} />
                    <MobilePriceCell label="Unit" value={row.unit} small />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-lg flex flex-col sm:flex-row">
            <div className="flex-1 bg-[#0a1628] p-8 sm:p-10">
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">Need a custom quote?</h3>
              <p className="text-white/60 text-sm leading-relaxed max-w-md">
                For jewellery, bulk orders, or products not listed above, message us on WhatsApp for a tailored rate.
              </p>
            </div>
            <div className="flex items-center justify-center p-8 bg-slate-50 sm:min-w-[280px]">
              <a
                href={`${WHATSAPP_LINK}?text=${encodeURIComponent('Hi Tavlinx, I would like a freight quote for my shipment.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
              >
                <MessageCircle className="w-4 h-4" />
                Get Quote on WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400 leading-relaxed">
            Rates are subject to change. Final pricing may vary based on weight, dimensions, and customs requirements.{' '}
            <Link href="/contact" className="text-[#1a3a6b] font-semibold hover:underline">
              Contact us
            </Link>{' '}
            for confirmation before shipping.
          </p>
        </div>
      </section>
    </main>
  )
}

function MobilePriceCell({
  label,
  value,
  bold,
  small,
}: {
  label: string
  value: string
  bold?: boolean
  small?: boolean
}) {
  return (
    <div className="rounded-xl bg-slate-50 border border-slate-100 p-2.5">
      <p className="text-[10px] uppercase tracking-wide text-slate-400 mb-0.5">{label}</p>
      <p
        className={
          small
            ? 'text-xs font-medium text-slate-600 leading-snug capitalize'
            : bold
              ? 'text-sm font-bold text-[#0a1628]'
              : 'text-sm font-semibold text-slate-700'
        }
      >
        {value}
      </p>
    </div>
  )
}
