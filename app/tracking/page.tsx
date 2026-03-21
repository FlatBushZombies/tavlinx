import { Metadata } from "next"
import { Plane, Calendar, Package, Clock, MapPin, CheckCircle2, Truck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Flight Schedules & Goods Tracking | Tavlinx Freight Solutions",
  description: "Track your shipments and view our flight schedules from Dubai to Zimbabwe. Real-time updates on cargo status.",
}

const WHATSAPP_LINK = "https://wa.me/971559933478"

// Flight schedule data
const flightSchedules = [
  {
    day: "Wednesday",
    route: "Dubai (DXB) → Harare (HRE)",
    departureTime: "10:00 AM GST",
    arrivalTime: "6:00 PM CAT",
    status: "Operational",
  },
  {
    day: "Friday",
    route: "Dubai (DXB) → Harare (HRE)",
    departureTime: "10:00 AM GST",
    arrivalTime: "6:00 PM CAT",
    status: "Operational",
  },
]

// Tracking statuses
const trackingStatuses = [
  {
    status: "Departed from DXB",
    description: "Your goods have departed from Dubai International Airport",
    icon: Plane,
    color: "bg-primary",
    date: "March 21, 2026",
    time: "10:00 AM GST",
  },
  {
    status: "In Transit",
    description: "Shipment is currently in transit to Zimbabwe",
    icon: Truck,
    color: "bg-accent",
    date: "March 21, 2026",
    time: "2:00 PM",
  },
  {
    status: "Arrived in Zimbabwe",
    description: "Your goods have arrived at Harare International Airport",
    icon: MapPin,
    color: "bg-primary",
    date: "March 21, 2026",
    time: "6:00 PM CAT",
  },
  {
    status: "Ready for Collection",
    description: "Your shipment is ready for pickup at our Harare warehouse",
    icon: CheckCircle2,
    color: "bg-green-600",
    date: "March 22, 2026",
    time: "9:00 AM CAT",
  },
]

// Sample goods for the day
const goodsForTheDay = [
  {
    id: "TVX-2026-0321-001",
    description: "Electronics & Accessories",
    weight: "45 kg",
    status: "Departed from DXB",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    id: "TVX-2026-0321-002",
    description: "Auto Spare Parts",
    weight: "120 kg",
    status: "In Transit",
    statusColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "TVX-2026-0321-003",
    description: "Machinery Components",
    weight: "200 kg",
    status: "In Transit",
    statusColor: "bg-amber-100 text-amber-800",
  },
  {
    id: "TVX-2026-0319-015",
    description: "Textile Materials",
    weight: "80 kg",
    status: "Arrived",
    statusColor: "bg-primary/10 text-primary",
  },
  {
    id: "TVX-2026-0317-008",
    description: "Medical Supplies",
    weight: "35 kg",
    status: "Ready for Collection",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    id: "TVX-2026-0317-012",
    description: "Construction Materials",
    weight: "500 kg",
    status: "Ready for Collection",
    statusColor: "bg-green-100 text-green-800",
  },
]

export default function TrackingPage() {
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

      {/* Flight Schedules Section */}
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

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {flightSchedules.map((flight, index) => (
              <Card key={index} className="overflow-hidden border-2 border-primary/10 transition-shadow hover:shadow-lg">
                <CardHeader className="bg-primary pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white">{flight.day}</CardTitle>
                        <p className="text-sm text-white/80">Weekly Flight</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-semibold text-white">
                      {flight.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                    <Plane className="h-5 w-5 text-primary" />
                    {flight.route}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-secondary p-3">
                      <p className="text-xs text-muted-foreground">Departure</p>
                      <p className="font-semibold text-foreground">{flight.departureTime}</p>
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <p className="text-xs text-muted-foreground">Arrival</p>
                      <p className="font-semibold text-foreground">{flight.arrivalTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Status Section */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Shipment Journey
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              How We Track Your Goods
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              From departure to delivery, we keep you informed at every step of the journey.
            </p>
          </div>

          {/* Timeline */}
          <div className="mx-auto max-w-3xl">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 h-full w-0.5 bg-primary/20 md:left-1/2 md:-ml-px" />
              
              {trackingStatuses.map((item, index) => (
                <div key={index} className="relative mb-8 last:mb-0">
                  <div className={`flex items-start gap-4 md:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Icon */}
                    <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-ml-6">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${item.color} text-white shadow-lg`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-1 rounded-xl bg-card p-6 shadow-sm ${index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'} md:w-[calc(50%-3rem)]`}>
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {item.date} at {item.time}
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-foreground">{item.status}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Goods for the Day Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-wider text-accent">
              Today&apos;s Shipments
            </span>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Goods for the Day
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Current status of shipments - Dubai to Zimbabwe route.
            </p>
          </div>

          <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {/* Table Header */}
            <div className="hidden border-b border-border bg-primary px-6 py-4 md:block">
              <div className="grid grid-cols-5 gap-4 text-sm font-semibold text-white">
                <div>Tracking ID</div>
                <div>Description</div>
                <div>Weight</div>
                <div>Status</div>
                <div>Action</div>
              </div>
            </div>
            
            {/* Table Body */}
            <div className="divide-y divide-border">
              {goodsForTheDay.map((item, index) => (
                <div key={index} className="p-6 transition-colors hover:bg-secondary/50">
                  <div className="grid gap-4 md:grid-cols-5 md:items-center">
                    <div>
                      <span className="text-xs text-muted-foreground md:hidden">Tracking ID: </span>
                      <span className="font-mono text-sm font-semibold text-primary">{item.id}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground md:hidden">Description: </span>
                      <span className="text-foreground">{item.description}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground md:hidden">Weight: </span>
                      <span className="text-foreground">{item.weight}</span>
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${item.statusColor}`}>
                        <Package className="h-3 w-3" />
                        {item.status}
                      </span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" asChild className="w-full md:w-auto">
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                          Enquire
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="mb-4 text-muted-foreground">
              Can&apos;t find your shipment? Contact us for assistance.
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Contact Us on WhatsApp
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
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
                className="w-full bg-white text-primary hover:bg-white/90 sm:w-auto"
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
                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
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
