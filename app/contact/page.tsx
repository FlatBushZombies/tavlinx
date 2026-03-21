"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight, Phone, MapPin, Clock, MessageCircle,
  Package, Truck, Ship, Plane, ChevronDown, ChevronUp, CheckCircle2,
} from "lucide-react"

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

const serviceOptions = [
  { id: "goods-sourcing", label: "Goods Sourcing", icon: Package },
  { id: "air-freight", label: "Air Freight", icon: Plane },
  { id: "sea-freight", label: "Sea Freight", icon: Ship },
  { id: "road-freight", label: "Road Freight", icon: Truck },
  { id: "spare-parts", label: "Spare Parts", icon: Package },
  { id: "door-to-door", label: "Door-to-Door Delivery", icon: Truck },
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

// Reusable input classes
const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[#0a1628] text-sm placeholder:text-slate-400 outline-none transition-all focus:border-[#0a1628] focus:ring-2 focus:ring-[#0a1628]/08 shadow-sm"

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
    const servicesText = selectedServices
      .map(s => serviceOptions.find(opt => opt.id === s)?.label)
      .join(", ")

    const message = `*New Quote Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A%0A*Services Needed:* ${servicesText || "Not specified"}%0A*Origin:* ${formData.origin}%0A*Destination:* ${formData.destination}%0A*Cargo Type:* ${formData.cargoType}%0A*Estimated Weight:* ${formData.weight}%0A%0A*Additional Details:*%0A${formData.message}`

    window.open(`${WHATSAPP_LINK}?text=${message}`, "_blank")
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
      <section className="relative min-h-[560px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069"
          alt="Contact us"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Navy overlay — 65% so photo reads clearly */}
        <div className="absolute inset-0 bg-[#0a1628]/65" />
        {/* Dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 py-32 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-white text-[10px] font-black tracking-[0.18em] uppercase mb-6">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-5">
            Contact Our Team
          </h1>
          <p className="text-white/65 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Ready to ship? Have questions? Our team is here to help.
            Reach out via WhatsApp for the fastest response.
          </p>
        </div>
      </section>

      {/* ── QUOTE BUILDER ────────────────────────────────── */}
      <section className="bg-slate-50 py-20 lg:py-28 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          {/* Section header */}
          <div className="text-center mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Quick Quote</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight mb-3">
              Get a Free Quote in Minutes
            </h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
              Select your services, fill in the details, and we'll get back to you instantly via WhatsApp.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-3xl bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden">

            {/* Step 1 — Services */}
            <div className="px-8 pt-8 pb-7 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-[#0a1628] flex items-center justify-center text-white text-xs font-black shadow-md shadow-[#0a1628]/25">1</span>
                <h3 className="text-base font-bold text-[#0a1628]">Select Services You Need</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {serviceOptions.map((service) => {
                  const active = selectedServices.includes(service.id)
                  return (
                    <button
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`group flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                        active
                          ? "border-[#0a1628] bg-[#0a1628]/04 shadow-sm"
                          : "border-slate-150 bg-slate-50 hover:border-[#0a1628]/40 hover:bg-white"
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        active ? "bg-[#0a1628] text-white" : "bg-slate-200 text-slate-500 group-hover:bg-[#0a1628]/10 group-hover:text-[#0a1628]"
                      }`}>
                        <service.icon className="w-4 h-4" />
                      </div>
                      <span className={`text-sm font-semibold leading-snug ${active ? "text-[#0a1628]" : "text-slate-600"}`}>
                        {service.label}
                      </span>
                      {active && <CheckCircle2 className="w-4 h-4 text-[#0a1628] ml-auto shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2 — Details */}
            <div className="px-8 pt-7 pb-7 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-[#0a1628] flex items-center justify-center text-white text-xs font-black shadow-md shadow-[#0a1628]/25">2</span>
                <h3 className="text-base font-bold text-[#0a1628]">Your Details</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-2">Full Name *</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className={inputCls} placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-2">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={inputCls} placeholder="john@example.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-2">WhatsApp / Phone Number *</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className={inputCls} placeholder="+263 71 234 5678" />
                </div>
              </div>
            </div>

            {/* Step 3 — Shipment */}
            <div className="px-8 pt-7 pb-7 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-8 rounded-full bg-[#0a1628] flex items-center justify-center text-white text-xs font-black shadow-md shadow-[#0a1628]/25">3</span>
                <h3 className="text-base font-bold text-[#0a1628]">Shipment Details</h3>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-2">Origin (From)</label>
                  <select value={formData.origin} onChange={e => setFormData({ ...formData, origin: e.target.value })} className={inputCls}>
                    <option value="">Select origin</option>
                    <option value="Dubai, UAE">Dubai, UAE</option>
                    <option value="China">China</option>
                    <option value="Other">Other (specify in message)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-2">Destination (To)</label>
                  <select value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })} className={inputCls}>
                    <option value="Zimbabwe">Zimbabwe</option>
                    <option value="Harare">Harare, Zimbabwe</option>
                    <option value="Bulawayo">Bulawayo, Zimbabwe</option>
                    <option value="Other">Other (specify in message)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-2">Type of Cargo</label>
                  <input type="text" value={formData.cargoType} onChange={e => setFormData({ ...formData, cargoType: e.target.value })}
                    className={inputCls} placeholder="e.g., Electronics, Clothing, Machinery" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-2">Estimated Weight</label>
                  <input type="text" value={formData.weight} onChange={e => setFormData({ ...formData, weight: e.target.value })}
                    className={inputCls} placeholder="e.g., 50 kg, 1 ton" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#0a1628]/70 tracking-wide uppercase mb-2">Additional Details</label>
                  <textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                    rows={3} className={`${inputCls} resize-none`}
                    placeholder="Tell us more about your shipment, special requirements, or any questions..." />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="bg-slate-50 px-8 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                <div className="text-center md:text-left">
                  <p className="font-bold text-[#0a1628] text-sm">Ready to get your quote?</p>
                  <p className="text-slate-400 text-xs mt-0.5">Click the button to send your request via WhatsApp</p>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-green-600 text-white font-bold text-sm tracking-wide hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-lg shadow-green-600/25 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:active:scale-100 whitespace-nowrap"
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
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Contact Methods</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight">
              Reach Us Directly
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactMethods.map((method) => (
              <div
                key={method.title}
                className={`rounded-2xl border p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  method.highlight
                    ? "border-green-200 bg-green-50 hover:shadow-green-100"
                    : "border-slate-100 bg-white shadow-md shadow-slate-100 hover:shadow-slate-200/80"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                  method.highlight
                    ? "bg-green-600 text-white shadow-lg shadow-green-600/30"
                    : "bg-[#0a1628]/08 text-[#0a1628]"
                }`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-[#0a1628] mb-1">{method.title}</h3>
                <p className="text-slate-400 text-xs mb-1.5">{method.description}</p>
                <p className="text-[#0a1628] font-bold text-sm mb-5 flex-1">{method.value}</p>
                <a
                  href={method.action}
                  target={method.action.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 ${
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
      <section className="bg-slate-50 py-20 lg:py-28 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Our Offices</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight">Visit Us</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            {/* Dubai */}
            <div className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/70 transition-all duration-300">
              <div className="relative h-52">
                <Image
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070"
                  alt="Dubai skyline" fill className="object-cover"
                />
                {/* Gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <span className="absolute bottom-4 left-5 px-3 py-1 rounded-full bg-[#0a1628] text-white text-[11px] font-bold tracking-wide shadow-lg">
                  Head Office
                </span>
              </div>
              <div className="px-7 pt-5 pb-7">
                <h3 className="text-xl font-black text-[#0a1628] mb-5 tracking-tight">Dubai Office (UAE)</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#1a3a6b] mt-0.5 shrink-0" />
                    <span className="text-slate-500 text-sm">Sharjah, United Arab Emirates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#1a3a6b] shrink-0" />
                    <span className="text-slate-500 text-sm">+971 52 521 0658 / +971 55 993 3478</span>
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
              <div className="relative h-52">
                <Image
                  src="https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?q=80&w=2067"
                  alt="Zimbabwe" fill className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                <span className="absolute bottom-4 left-5 px-3 py-1 rounded-full bg-sky-500 text-white text-[11px] font-bold tracking-wide shadow-lg">
                  Collection Point
                </span>
              </div>
              <div className="px-7 pt-5 pb-7">
                <h3 className="text-xl font-black text-[#0a1628] mb-5 tracking-tight">Zimbabwe Office</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                    <span className="text-slate-500 text-sm">
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
      <section className="bg-white py-20 lg:py-28 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight mb-3">
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
                    open ? "border-[#0a1628]/20 shadow-md shadow-[#0a1628]/08" : "border-slate-100 bg-white"
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaq(open ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left gap-4"
                  >
                    <h3 className={`text-sm font-bold leading-snug transition-colors ${open ? "text-[#0a1628]" : "text-slate-700"}`}>
                      {faq.question}
                    </h3>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      open ? "bg-[#0a1628] text-white rotate-0" : "bg-slate-100 text-slate-400"
                    }`}>
                      {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                  {open && (
                    <div className="px-6 pb-5 border-t border-slate-100 pt-4 bg-slate-50/60">
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
      <section className="relative bg-[#0a1628] py-20 lg:py-28 overflow-hidden">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
        />
        {/* Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-sky-500/08 blur-3xl" />
        </div>
        {/* Top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Still Have Questions?
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md mx-auto">
            Don't hesitate to reach out. Our team is available 24/7 on WhatsApp to help with any questions
            or to provide a free quote for your shipment.
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-green-600 text-white font-black text-sm tracking-wide hover:bg-green-700 active:scale-95 transition-all duration-200 shadow-2xl shadow-green-900/40"
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