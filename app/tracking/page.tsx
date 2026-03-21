"use client"

import { useEffect, useRef } from "react"
import { Plane, Calendar, MapPin, CheckCircle2, Truck, ArrowRight, Package, Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"

const WHATSAPP_LINK = "https://wa.me/971559933478"

// Flight schedule data
const flightSchedules = [
  {
    day: "Wednesday",
    dayShort: "WED",
    route: "Dubai to Harare",
    from: "DXB",
    to: "HRE",
    departureTime: "10:00 AM",
    arrivalTime: "6:00 PM",
    timezone: "GST → CAT",
  },
  {
    day: "Friday",
    dayShort: "FRI",
    route: "Dubai to Harare",
    from: "DXB",
    to: "HRE",
    departureTime: "10:00 AM",
    arrivalTime: "6:00 PM",
    timezone: "GST → CAT",
  },
]

// Tracking statuses
const trackingStatuses = [
  {
    status: "Departed from DXB",
    description: "Your goods have departed from Dubai International Airport",
    icon: Plane,
    color: "bg-primary",
    active: true,
  },
  {
    status: "In Transit",
    description: "Shipment is currently in transit to Zimbabwe",
    icon: Truck,
    color: "bg-accent",
    active: true,
  },
  {
    status: "Arrived in Zimbabwe",
    description: "Your goods have arrived at Harare International Airport",
    icon: MapPin,
    color: "bg-primary",
    active: false,
  },
  {
    status: "Ready for Collection",
    description: "Your shipment is ready for pickup at our Harare warehouse",
    icon: CheckCircle2,
    color: "bg-green-600",
    active: false,
  },
]

// How to track steps
const trackingSteps = [
  {
    icon: Package,
    title: "Get Your Tracking ID",
    description: "Receive your unique tracking number when you book your shipment with us.",
  },
  {
    icon: Search,
    title: "Send Us Your ID",
    description: "Message us on WhatsApp with your tracking ID for instant status updates.",
  },
  {
    icon: Bell,
    title: "Receive Updates",
    description: "Get real-time notifications at every step of your shipment journey.",
  },
  {
    icon: CheckCircle2,
    title: "Collect Your Goods",
    description: "Pick up your items from our Harare warehouse when ready.",
  },
]

export default function TrackingPage() {
  const planeRef = useRef<SVGGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!planeRef.current || !pathRef.current) return

    const path = pathRef.current
    const plane = planeRef.current
    const pathLength = path.getTotalLength()

    // Set initial position
    const initialPoint = path.getPointAtLength(0)
    gsap.set(plane, {
      x: initialPoint.x,
      y: initialPoint.y,
      rotation: 15,
      transformOrigin: "center center"
    })

    // Create the animation
    const tl = gsap.timeline({ repeat: -1, ease: "none" })
    
    tl.to({ progress: 0 }, {
      progress: 1,
      duration: 4,
      ease: "power1.inOut",
      onUpdate: function() {
        const progress = this.targets()[0].progress
        const point = path.getPointAtLength(progress * pathLength)
        
        // Get next point for rotation
        const nextProgress = Math.min(progress + 0.01, 1)
        const nextPoint = path.getPointAtLength(nextProgress * pathLength)
        
        // Calculate angle - plane points in direction of travel
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI)
        
        gsap.set(plane, {
          x: point.x,
          y: point.y,
          rotation: angle,
          transformOrigin: "center center"
        })
      }
    })

    // Pause at the end before repeating
    tl.to({}, { duration: 1 })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 lg:py-28">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
              <Plane className="h-4 w-4" />
              Real-Time Tracking
            </div>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Flight Schedules & Cargo Tracking
            </h1>
            <p className="text-lg text-white/80 md:text-xl">
              Track your shipments in real-time and stay updated on our weekly flight schedules from Dubai to Zimbabwe.
            </p>
          </div>
        </div>
      </section>

      {/* Animated Flight Path Section */}
      <section className="relative overflow-hidden bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Our Route
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Dubai to Zimbabwe
            </h2>
          </div>

          {/* Flight Animation Container */}
          <div className="relative mx-auto max-w-4xl">
            {/* Location Labels - Top */}
            <div className="mb-4 flex items-center justify-between px-4 md:px-12">
              <div className="text-center">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-lg md:h-20 md:w-20 md:text-xl">
                  DXB
                </div>
                <p className="text-sm font-semibold text-foreground">Dubai</p>
                <p className="text-xs text-muted-foreground">UAE</p>
              </div>
              <div className="text-center">
                <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-accent text-lg font-bold text-white shadow-lg md:h-20 md:w-20 md:text-xl">
                  HRE
                </div>
                <p className="text-sm font-semibold text-foreground">Harare</p>
                <p className="text-xs text-muted-foreground">Zimbabwe</p>
              </div>
            </div>

            {/* SVG Animation */}
            <div className="relative h-32 md:h-40">
              <svg 
                viewBox="0 0 800 120" 
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Flight Path - Curved dotted line */}
                <path
                  ref={pathRef}
                  d="M 80 80 Q 400 0 720 80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="10 6"
                  className="text-primary/40"
                />
                
                {/* Origin Point */}
                <circle cx="80" cy="80" r="8" className="fill-primary" />
                
                {/* Destination Point */}
                <circle cx="720" cy="80" r="8" className="fill-accent" />

                {/* Animated Plane Group */}
                <g ref={planeRef}>
                  {/* Plane icon - pointing right by default */}
                  <g transform="translate(-16, -16)">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-primary"
                    >
                      {/* Plane facing right */}
                      <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z" />
                    </svg>
                  </g>
                </g>
              </svg>
            </div>

            {/* Flight Info Badge */}
            <div className="mt-4 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full bg-card px-6 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-sm font-medium text-foreground">Active Route</span>
                </div>
                <span className="text-muted-foreground">|</span>
                <span className="text-sm text-muted-foreground">Weekly Flights: Wed & Fri</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Schedules Section - Modern Cards */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Weekly Flights
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Flight Schedules
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Our cargo flights operate twice weekly from Dubai to Zimbabwe, ensuring your goods arrive on time.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {flightSchedules.map((flight, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-3xl bg-card shadow-xl transition-all hover:shadow-2xl"
              >
                {/* Gradient Top Border */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />
                
                {/* Card Content */}
                <div className="p-8">
                  {/* Header with Day Badge */}
                  <div className="mb-8 flex items-start justify-between">
                    <div>
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-accent" />
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Active
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{flight.day}</h3>
                      <p className="text-muted-foreground">{flight.route}</p>
                    </div>
                    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl bg-primary text-white shadow-lg">
                      <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">Every</span>
                      <span className="text-2xl font-bold">{flight.dayShort}</span>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-secondary/50 p-6">
                    {/* Departure */}
                    <div className="text-center">
                      <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white shadow-md">
                        {flight.from}
                      </div>
                      <p className="text-2xl font-bold text-foreground">{flight.departureTime}</p>
                      <p className="text-sm text-muted-foreground">Departure</p>
                    </div>

                    {/* Flight Path Indicator */}
                    <div className="flex flex-1 flex-col items-center gap-2">
                      <div className="relative flex w-full items-center">
                        <div className="h-0.5 flex-1 bg-primary/20" />
                        <div className="absolute left-1/2 -translate-x-1/2 rounded-full bg-card p-2 shadow-md">
                          <Plane className="h-5 w-5 text-primary" />
                        </div>
                        <div className="h-0.5 flex-1 bg-primary/20" />
                      </div>
                      <span className="mt-1 text-xs font-medium text-muted-foreground">{flight.timezone}</span>
                    </div>

                    {/* Arrival */}
                    <div className="text-center">
                      <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-xl font-bold text-white shadow-md">
                        {flight.to}
                      </div>
                      <p className="text-2xl font-bold text-foreground">{flight.arrivalTime}</p>
                      <p className="text-sm text-muted-foreground">Arrival</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div className="border-t border-border bg-secondary/30 px-8 py-5">
                  <Button asChild className="w-full gap-2 rounded-full bg-primary text-white hover:bg-primary/90">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      Book This Flight
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Track Section */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Easy Tracking
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How to Track Your Goods
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Follow these simple steps to stay updated on your shipment status.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trackingSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < trackingSteps.length - 1 && (
                  <div className="absolute right-0 top-10 hidden h-0.5 w-6 bg-primary/20 lg:block" style={{ transform: 'translateX(100%)' }} />
                )}
                
                <div className="flex h-full flex-col items-center rounded-2xl bg-card p-6 text-center shadow-lg transition-all hover:shadow-xl">
                  {/* Step Number */}
                  <div className="absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className="mb-4 mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Status Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Shipment Journey
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Tracking Stages
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From departure to delivery, we keep you informed at every step of the journey.
            </p>
          </div>

          {/* Horizontal Timeline for Desktop */}
          <div className="mx-auto max-w-5xl">
            <div className="hidden md:block">
              <div className="relative flex justify-between">
                {/* Progress Line */}
                <div className="absolute left-0 top-8 h-1 w-full bg-primary/20">
                  <div className="h-full w-1/2 bg-primary transition-all duration-500" />
                </div>

                {trackingStatuses.map((item, index) => (
                  <div key={index} className="relative flex flex-col items-center" style={{ width: '25%' }}>
                    {/* Icon Circle */}
                    <div className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full ${item.active ? item.color : 'bg-muted'} text-white shadow-lg transition-transform hover:scale-110`}>
                      <item.icon className="h-7 w-7" />
                    </div>
                    
                    {/* Content */}
                    <div className="mt-6 text-center">
                      <h3 className={`mb-1 text-sm font-semibold ${item.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {item.status}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vertical Timeline for Mobile */}
            <div className="md:hidden">
              <div className="relative space-y-8 pl-12">
                {/* Vertical Line */}
                <div className="absolute left-5 top-0 h-full w-0.5 bg-primary/20">
                  <div className="h-1/2 w-full bg-primary" />
                </div>

                {trackingStatuses.map((item, index) => (
                  <div key={index} className="relative">
                    {/* Icon */}
                    <div className={`absolute -left-7 flex h-10 w-10 items-center justify-center rounded-full ${item.active ? item.color : 'bg-muted'} text-white shadow-lg`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    
                    {/* Content */}
                    <div className="rounded-xl bg-card p-4 shadow-md">
                      <h3 className={`mb-1 font-semibold ${item.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {item.status}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Your Package CTA */}
      <section className="bg-primary py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Need to Track a Specific Package?
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Send us your tracking number on WhatsApp and get instant updates on your shipment status.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button 
                asChild 
                size="lg" 
                className="w-full rounded-full bg-white px-8 text-primary hover:bg-white/90 sm:w-auto"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Track via WhatsApp
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="w-full rounded-full border-white/30 bg-transparent px-8 text-white hover:bg-white/10 sm:w-auto"
              >
                <a href="tel:+971559933478">
                  Call: +971 55 993 3478
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
