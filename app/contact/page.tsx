"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ArrowRight, Phone, MapPin, Clock, MessageCircle,
  Package, Ship, Plane, ChevronDown, ChevronUp, CheckCircle2,
} from "lucide-react"

const WHATSAPP_LINK = "https://wa.me/971525210658"

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us instantly",
    value: "+971 52 521 0658",
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

const serviceOptions = [
  { id: "goods-sourcing", label: "Goods Sourcing", icon: Package },
  { id: "air-freight", label: "Air Freight", icon: Plane },
  { id: "sea-freight", label: "Sea Freight", icon: Ship },
  { id: "spare-parts", label: "Spare Parts", icon: Package },
  { id: "door-to-door", label: "Door-to-Door Delivery", icon: Package },
]

const faqs = [
  { question: "What areas do you serve?", answer: "We operate from UAE and China to Zimbabwe. Our main routes connect Dubai and Chinese suppliers to destinations across Zimbabwe." },
  { question: "How long does shipping take?", answer: "Delivery times depend on the shipping method and route. Air freight typically takes 5-7 days, while sea freight takes 4-6 weeks. Contact us for specific estimates." },
  { question: "Do you handle customs clearance?", answer: "Yes, we provide full customs clearance support for all shipments. Our team handles all documentation and compliance requirements." },
  { question: "Can you source products for me?", answer: "Absolutely! We source goods from verified suppliers in UAE and China. All items are quality-checked before shipping." },
  { question: "What are your payment terms?", answer: "We offer flexible payment options. Contact us to discuss terms that work best for your business." },
  { question: "Do you offer tracking?", answer: "Yes, we provide shipment tracking. You can contact us anytime via WhatsApp for updates on your cargo." },
]

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-[#0a1628] text-sm placeholder:text-slate-400 outline-none transition-all focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 shadow-sm min-h-[48px]"

const StepBadge = ({ n }: { n: number }) => (
  <span className="w-8 h-8 rounded-full bg-[#0a1628] flex items-center justify-center text-white text-xs font-black shadow-md shadow-[#0a1628]/25 shrink-0">
    {n}
  </span>
)

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    origin: "", destination: "Zimbabwe",
    cargoType: "", weight: "", message: "",
  })
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId) ? prev.filter(s => s !== serviceId) : [...prev, serviceId]
    )
  }

  const handleSubmit = () => {
    const serviceLabels = selectedServices
      .map(s => serviceOptions.find(opt => opt.id === s)?.label)
      .filter(Boolean)

    // Build a richly formatted WhatsApp message
    const divider = "━━━━━━━━━━━━━━━━━━━━━━━"
    const dot = "▸"

    const lines = [
      `📦 *NEW QUOTE REQUEST*`,
      divider,
      ``,
      `👤 *CONTACT DETAILS*`,
      `${dot} Name: ${formData.name || "—"}`,
      `${dot} Phone: ${formData.phone || "—"}`,
      formData.email ? `${dot} Email: ${formData.email}` : null,
      ``,
      `🚚 *SERVICES REQUESTED*`,
      serviceLabels.length > 0
        ? serviceLabels.map(l => `${dot} ${l}`).join("%0A")
        : `${dot} Not specified`,
      ``,
      `📍 *SHIPMENT DETAILS*`,
      `${dot} From: ${formData.origin || "—"}`,
      `${dot} To: ${formData.destination || "—"}`,
      formData.cargoType ? `${dot} Cargo: ${formData.cargoType}` : null,
      formData.weight ? `${dot} Weight: ${formData.weight}` : null,
      ``,
      formData.message
        ? [`💬 *ADDITIONAL NOTES*`, formData.message]
        : null,
      divider,
      `_Sent via QuoteForm on website_`,
    ]

    const flat = lines
      .flat()
      .filter((l): l is string => l !== null)
      .join("%0A")

    window.open(`${WHATSAPP_LINK}?text=${flat}`, "_blank")
    setIsSubmitted(true)

    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", phone: "", origin: "", destination: "Zimbabwe", cargoType: "", weight: "", message: "" })
      setSelectedServices([])
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[480px] sm:min-h-[560px] flex items-center overflow-hidden">
        <Image
          src="/contact.jpg"
          alt="Contact us"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0a1628]/65" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-24 sm:py-32 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white text-[10px] font-black tracking-[0.18em] uppercase mb-6">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5">
            Contact Our Team
          </h1>
          <p className="text-white/65 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Ready to ship? Have questions? Our team is here to help.
            Reach out via WhatsApp for the fastest response.
          </p>
        </div>
      </section>

      {/* ── QUOTE BUILDER ────────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-28 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Quick Quote</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight mb-3">
              Get a Free Quote in Minutes
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
              Select your services, fill in the details, and we'll get back to you instantly via WhatsApp.
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden">

            {/* Step 1 — Services */}
            <div className="px-5 sm:px-8 pt-7 sm:pt-8 pb-6 sm:pb-7 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <StepBadge n={1} />
                <h3 className="text-sm sm:text-base font-bold text-[#0a1628]">Select Services You Need</h3>
              </div>
              {/* 2 cols on mobile, 3 on md+ */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
                {serviceOptions.map((service) => {
                  const active = selectedServices.includes(service.id)
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`group flex items-center gap-2.5 sm:gap-3 rounded-xl border-2 p-3 sm:p-4 text-left transition-all duration-200 ${
                        active
                          ? "border-[#0a1628] bg-[#0a1628]/[0.04] shadow-sm"
                          : "border-slate-150 bg-slate-50 hover:border-[#0a1628]/40 hover:bg-white"
                      }`}
                    >
                      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        active ? "bg-[#0a1628] text-white" : "bg-slate-200 text-slate-500 group-hover:bg-[#0a1628]/10 group-hover:text-[#0a1628]"
                      }`}>
                        <service.icon className="w-4 h-4" />
                      </div>
                      <span className={`text-xs sm:text-sm font-semibold leading-snug flex-1 ${active ? "text-[#0a1628]" : "text-slate-600"}`}>
                        {service.label}
                      </span>
                      {active && <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0a1628] shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2 — Your Details */}
            <div className="px-5 sm:px-8 pt-6 sm:pt-7 pb-6 sm:pb-7 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <StepBadge n={2} />
                <h3 className="text-sm sm:text-base font-bold text-[#0a1628]">Your Details</h3>
              </div>
              <div className="flex flex-col gap-4">
                {/* Name — full width on mobile, half on md */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className={inputCls}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-1.5">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className={inputCls}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-1.5">WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className={inputCls}
                    placeholder="+263 71 234 5678"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 — Shipment */}
            <div className="px-5 sm:px-8 pt-6 sm:pt-7 pb-6 sm:pb-7 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <StepBadge n={3} />
                <h3 className="text-sm sm:text-base font-bold text-[#0a1628]">Shipment Details</h3>
              </div>
              <div className="flex flex-col gap-4">
                {/* Origin + Destination — stacked on mobile, side by side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-1.5">Origin (From)</label>
                    <select
                      value={formData.origin}
                      onChange={e => setFormData({ ...formData, origin: e.target.value })}
                      className={inputCls}
                    >
                      <option value="">Select origin</option>
                      <option value="Dubai, UAE">Dubai, UAE</option>
                      <option value="China">China</option>
                      <option value="Other">Other (specify in message)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-1.5">Destination (To)</label>
                    <select
                      value={formData.destination}
                      onChange={e => setFormData({ ...formData, destination: e.target.value })}
                      className={inputCls}
                    >
                      <option value="Zimbabwe">Zimbabwe</option>
                      <option value="Harare">Harare, Zimbabwe</option>
                      <option value="Bulawayo">Bulawayo, Zimbabwe</option>
                      <option value="Other">Other (specify in message)</option>
                    </select>
                  </div>
                </div>
                {/* Cargo type + Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-1.5">Type of Cargo</label>
                    <input
                      type="text"
                      value={formData.cargoType}
                      onChange={e => setFormData({ ...formData, cargoType: e.target.value })}
                      className={inputCls}
                      placeholder="e.g., Electronics, Clothing"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] sm:text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-1.5">Estimated Weight</label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={e => setFormData({ ...formData, weight: e.target.value })}
                      className={inputCls}
                      placeholder="e.g., 50 kg, 1 ton"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-1.5">Additional Details</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={3}
                    className={`${inputCls} resize-none`}
                    placeholder="Special requirements, questions, or anything else we should know..."
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="bg-slate-50 px-5 sm:px-8 py-5 sm:py-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="font-bold text-[#0a1628] text-sm">Ready to get your quote?</p>
                  <p className="text-slate-400 text-xs mt-0.5">We'll respond instantly on WhatsApp</p>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 sm:py-3.5 rounded-full bg-green-600 text-white font-bold text-sm tracking-wide hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-lg shadow-green-600/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100 whitespace-nowrap w-full sm:w-auto"
                >
                  {isSubmitted ? (
                    <><CheckCircle2 className="w-4 h-4" /> Opening WhatsApp...</>
                  ) : (
                    <><WhatsAppIcon className="w-4 h-4" /> Get Quote via WhatsApp <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT METHODS ──────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Contact Methods</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight">
              Reach Us Directly
            </h2>
          </div>
          {/* 2-col on mobile, 4-col on lg */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className={`rounded-2xl border p-4 sm:p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  method.highlight
                    ? "border-green-200 bg-green-50 hover:shadow-green-100"
                    : "border-slate-100 bg-white shadow-md shadow-slate-100 hover:shadow-slate-200/80"
                }`}
              >
                <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 ${
                  method.highlight
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                    : "bg-[#0a1628]/[0.08] text-[#0a1628]"
                }`}>
                  <method.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-xs sm:text-sm font-black text-[#0a1628] mb-1">{method.title}</h3>
                <p className="text-slate-400 text-[11px] sm:text-xs mb-1">{method.description}</p>
                <p className="text-[#0a1628] font-bold text-xs sm:text-sm mb-4 flex-1 leading-snug">{method.value}</p>
                <a
                  href={method.action}
                  target={method.action.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                    method.highlight
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-600/20"
                      : "bg-[#0a1628] text-white hover:bg-[#1a3a6b] shadow-md shadow-[#0a1628]/20"
                  }`}
                >
                  {method.actionLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICE LOCATIONS ─────────────────────────────── */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-28 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Our Offices</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight">Visit Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
            {/* Dubai */}
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/70 transition-all duration-300">
              <div className="relative h-44 sm:h-52">
                <Image
                  src="/dubai.jpg"
                  alt="Dubai skyline" fill className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <span className="absolute bottom-4 left-5 px-3 py-1 rounded-full bg-[#0a1628] text-white text-[11px] font-bold tracking-wide shadow-lg">
                  Head Office
                </span>
              </div>
              <div className="px-5 sm:px-7 pt-5 pb-6 sm:pb-7">
                <h3 className="text-lg sm:text-xl font-black text-[#0a1628] mb-4 sm:mb-5 tracking-tight">Dubai Office (UAE)</h3>
                <div className="space-y-3 mb-5 sm:mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#1a3a6b] mt-0.5 shrink-0" />
                    <span className="text-slate-500 text-sm">Sharjah, United Arab Emirates</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#1a3a6b] mt-0.5 shrink-0" />
                    <span className="text-slate-500 text-sm leading-snug">+971 52 521 0658 / +971 55 993 3478</span>
                  </div>
                </div>
                <a
                  href="tel:+971559933478"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0a1628] text-white text-sm font-bold hover:bg-[#1a3a6b] transition-colors duration-200 shadow-md shadow-[#0a1628]/20"
                >
                  Call Dubai Office
                </a>
              </div>
            </div>

            {/* Zimbabwe */}
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/70 transition-all duration-300">
              <div className="relative h-44 sm:h-52">
                <Image
                  src="/zimbabwe.jpg"
                  alt="Zimbabwe" fill className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <span className="absolute bottom-4 left-5 px-3 py-1 rounded-full bg-sky-500 text-white text-[11px] font-bold tracking-wide shadow-lg">
                  Collection Point
                </span>
              </div>
              <div className="px-5 sm:px-7 pt-5 pb-6 sm:pb-7">
                <h3 className="text-lg sm:text-xl font-black text-[#0a1628] mb-4 sm:mb-5 tracking-tight">Zimbabwe Office</h3>
                <div className="space-y-3 mb-5 sm:mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                    <span className="text-slate-500 text-sm leading-snug">
                      Corner Innez Terrace &amp; George Silundika, Zimex Mall, Shop C15, 1st Floor
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                    <span className="text-slate-500 text-sm">+263 71 350 7957</span>
                  </div>
                </div>
                <a
                  href="tel:+263713507957"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#0a1628] text-white text-sm font-bold hover:bg-[#1a3a6b] transition-colors duration-200 shadow-md shadow-[#0a1628]/20"
                >
                  Call Zimbabwe Office
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20 lg:py-28 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Find answers to common questions about our services.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const open = expandedFaq === i
              return (
                <div
                  key={i}
                  className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
                    open ? "border-[#0a1628]/20 shadow-md shadow-[#0a1628]/[0.08]" : "border-slate-100 bg-white"
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(open ? null : i)}
                    className="flex w-full items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left gap-4 min-h-[56px]"
                  >
                    <h3 className={`text-sm font-bold leading-snug transition-colors ${open ? "text-[#0a1628]" : "text-slate-700"}`}>
                      {faq.question}
                    </h3>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      open ? "bg-[#0a1628] text-white" : "bg-slate-100 text-slate-400"
                    }`}>
                      {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                  {open && (
                    <div className="px-5 sm:px-6 pb-5 border-t border-slate-100 pt-4 bg-slate-50/60">
                      <p className="text-slate-500 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative bg-[#0a1628] py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-sky-500/[0.08] blur-3xl" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Still Have Questions?
          </h2>
          <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-md mx-auto">
            Don't hesitate to reach out. Our team is available 24/7 on WhatsApp to help with any questions
            or to provide a free quote for your shipment.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-7 sm:px-8 py-4 rounded-full bg-green-600 text-white font-black text-sm tracking-wide hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-2xl shadow-green-900/40"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Chat With Us on WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  )
}