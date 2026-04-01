'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Plane, Calendar, MapPin, CheckCircle2, Truck, ArrowRight,
  Package, Search, Bell, Ship, AlertTriangle, Scale, DollarSign,
  Clock, ChevronDown, X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type Package as PackageType, type PackageEvent, TRACKING_STATUSES } from '@/lib/types'
import gsap from 'gsap'

const WHATSAPP_LINK = "https://wa.me/971525210658"

const flightSchedules = [
  {
    day: "Wednesday", dayShort: "WED", route: "Dubai to Harare",
    from: "DXB", to: "HRE", departureTime: "10:00 AM",
    arrivalTime: "6:00 PM", timezone: "GST → CAT",
  },
  {
    day: "Friday", dayShort: "FRI", route: "Dubai to Harare",
    from: "DXB", to: "HRE", departureTime: "10:00 AM",
    arrivalTime: "6:00 PM", timezone: "GST → CAT",
  },
]

const trackingSteps = [
  { icon: Package, title: "Get Your Tracking ID", description: "Receive your unique tracking number when you book your shipment with us.", num: "01" },
  { icon: Search, title: "Enter Your ID", description: "Enter your tracking ID above to get instant status updates.", num: "02" },
  { icon: Bell, title: "View Updates", description: "See real-time updates at every step of your shipment journey.", num: "03" },
  { icon: CheckCircle2, title: "Collect Your Goods", description: "Pick up your items from our Harare warehouse when ready.", num: "04" },
]

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('')
  const [searchedPackage, setSearchedPackage] = useState<(PackageType & { package_events: PackageEvent[] }) | null>(null)
  const [packages, setPackages] = useState<(PackageType & { package_events: Pick<PackageEvent, 'status' | 'event_time'>[] })[]>([])
  const [isLoadingPackages, setIsLoadingPackages] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterTransport, setFilterTransport] = useState<string>('all')

  const planeRef = useRef<SVGGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  const supabase = createClient()

  useEffect(() => {
    if (!planeRef.current || !pathRef.current) return
    const path = pathRef.current
    const plane = planeRef.current
    const pathLength = path.getTotalLength()

    const initialPoint = path.getPointAtLength(0)
    gsap.set(plane, { x: initialPoint.x, y: initialPoint.y, transformOrigin: "0px 0px" })

    const tl = gsap.timeline({ repeat: -1 })
    tl.to({ progress: 0 }, {
      progress: 1,
      duration: 5,
      ease: "power1.inOut",
      onUpdate: function () {
        const p = this.targets()[0].progress
        const point = path.getPointAtLength(p * pathLength)
        const nextPoint = path.getPointAtLength(Math.min(p + 0.01, 1) * pathLength)
        const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI)
        gsap.set(plane, { x: point.x, y: point.y, rotation: angle, transformOrigin: "0px 0px" })
      },
    })
    tl.to({}, { duration: 1.2 })
    return () => { tl.kill() }
  }, [])

  useEffect(() => {
    const loadPackages = async () => {
      setIsLoadingPackages(true)
      try {
        const { data, error: fetchError } = await supabase
          .from('packages')
          .select('id, tracking_id, customer_name, customer_email, customer_phone, origin, destination, transport_type, batch_number, ctn_quantity, weight, price, currency, description, created_at, updated_at, package_events(status, event_time)')
          .order('created_at', { ascending: false })
          .limit(20)

        if (fetchError || !data) {
          setPackages([])
          return
        }

        setPackages(data)
      } finally {
        setIsLoadingPackages(false)
      }
    }

    loadPackages()
  }, [supabase])

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!trackingId.trim()) return

    setIsSearching(true)
    setError(null)
    setSearchedPackage(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('packages')
        .select('*, package_events(*)')
        .eq('tracking_id', trackingId.trim().toUpperCase())
        .single()

      if (fetchError || !data) {
        setError('Package not found. Please check your tracking ID.')
      } else {
        setSearchedPackage(data)
        setShowResults(true)
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSearching(false)
    }
  }

  const getStatusIcon = (status: string) => {
    const icons: Record<string, typeof Package> = {
      received: Package,
      weighed: Scale,
      priced: DollarSign,
      departed: Plane,
      in_transit: Truck,
      left_country: Plane,
      customs: AlertTriangle,
      arrived: MapPin,
      ready_pickup: CheckCircle2,
      delivered: CheckCircle2,
      complication: AlertTriangle,
    }
    return icons[status] || Package
  }

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      received: 'bg-blue-500',
      weighed: 'bg-purple-500',
      priced: 'bg-indigo-500',
      departed: 'bg-cyan-500',
      in_transit: 'bg-amber-500',
      left_country: 'bg-orange-500',
      customs: 'bg-yellow-500',
      arrived: 'bg-emerald-500',
      ready_pickup: 'bg-green-500',
      delivered: 'bg-teal-500',
      complication: 'bg-red-500',
    }
    return statusColors[status] || 'bg-slate-500'
  }

  const sortedEvents = searchedPackage?.package_events?.sort(
    (a, b) => new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
  ) || []

  const latestStatus = sortedEvents[0]

  const packageRows = packages.map((pkg) => {
    const latestEvent = [...(pkg.package_events || [])].sort(
      (a, b) => new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
    )[0]
    const status = latestEvent?.status || 'received'
    return { pkg, status }
  })

  const filteredPackageRows = packageRows.filter(({ pkg, status }) => {
    const statusMatches = filterStatus === 'all' || status === filterStatus
    const transportMatches = filterTransport === 'all' || pkg.transport_type === filterTransport
    return statusMatches && transportMatches
  })

  return (
    <main className="min-h-screen bg-white">
      {/* HERO with Search */}
      <section className="relative min-h-[580px] flex items-center overflow-hidden">
        <img
          src="/cargo-plane.jpg"
          alt="Aerial cargo plane over clouds"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#0a1628] opacity-65" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 py-32 text-center">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white text-xs font-semibold tracking-[0.12em] uppercase mb-7">
            <Plane className="w-3.5 h-3.5" />
            Real-Time Tracking
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6">
            Track Your<br />
            <span className="text-sky-300">Shipment</span>
          </h1>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10">
            Enter your tracking ID to get real-time updates on your package status.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <Input
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                  placeholder="Enter Tracking ID (e.g., TVX-20260330-A7B2)"
                  className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-2xl text-base font-mono focus:border-sky-400/50 focus:ring-sky-400/20"
                />
              </div>
              <Button
                type="submit"
                disabled={isSearching}
                className="h-14 px-8 bg-white text-[#0a1628] font-bold rounded-2xl hover:bg-slate-100 transition-all duration-200 shadow-lg shadow-black/20"
              >
                {isSearching ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-[#0a1628]/30 border-t-[#0a1628] rounded-full animate-spin" />
                    Searching...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Track
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>
            {error && (
              <p className="mt-3 text-red-400 text-sm">{error}</p>
            )}
          </form>

          <div className="mt-8 max-w-5xl mx-auto rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md shadow-2xl shadow-black/20 overflow-hidden text-left">
            <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-white/10">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-white text-lg font-bold tracking-tight">Recent Shipments</h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="appearance-none h-10 pl-3 pr-9 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-300/40"
                    >
                      <option value="all" className="text-[#0a1628]">All Statuses</option>
                      {TRACKING_STATUSES.map((status) => (
                        <option key={status.value} value={status.value} className="text-[#0a1628]">
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative">
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <select
                      value={filterTransport}
                      onChange={(e) => setFilterTransport(e.target.value)}
                      className="appearance-none h-10 pl-3 pr-9 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-300/40"
                    >
                      <option value="all" className="text-[#0a1628]">All Transport</option>
                      <option value="Air" className="text-[#0a1628]">Air</option>
                      <option value="Sea" className="text-[#0a1628]">Sea</option>
                      <option value="Air Dangerous Goods" className="text-[#0a1628]">Air Dangerous Goods</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-white/10 text-white/70">
                    <th className="px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-left">Batch Number</th>
                    <th className="px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-left">Origin</th>
                    <th className="px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-left">Destination</th>
                    <th className="px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-left">Transport Type</th>
                    <th className="px-5 sm:px-6 py-3 text-xs font-semibold uppercase tracking-wider text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingPackages ? (
                    <tr>
                      <td colSpan={5} className="px-5 sm:px-6 py-8 text-sm text-white/65">Loading shipments...</td>
                    </tr>
                  ) : filteredPackageRows.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-5 sm:px-6 py-8 text-sm text-white/65">No shipments found for the selected filters.</td>
                    </tr>
                  ) : (
                    filteredPackageRows.map(({ pkg, status }) => (
                      <tr key={pkg.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors">
                        <td className="px-5 sm:px-6 py-4 text-sm font-semibold text-white">
                          {pkg.batch_number || 'N/A'}
                        </td>
                        <td className="px-5 sm:px-6 py-4 text-sm text-white/80">{pkg.origin}</td>
                        <td className="px-5 sm:px-6 py-4 text-sm text-white/80">{pkg.destination}</td>
                        <td className="px-5 sm:px-6 py-4 text-sm text-white/80">{pkg.transport_type}</td>
                        <td className="px-5 sm:px-6 py-4 text-sm">
                          <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white ${getStatusColor(status)}`}>
                            {TRACKING_STATUSES.find((item) => item.value === status)?.label || status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <div className="w-5 h-9 rounded-full border-2 border-white/25 flex items-start justify-center pt-1.5">
              <span className="w-0.5 h-2 bg-white/50 rounded-full animate-bounce block" />
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Modal */}
      {showResults && searchedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-gradient-to-r from-[#0a1628] to-[#1a3a6b]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{searchedPackage.tracking_id}</h2>
                  <p className="text-white/60 text-sm">{searchedPackage.customer_name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowResults(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Current Status */}
              {latestStatus && (
                <div className={`rounded-2xl p-5 ${getStatusColor(latestStatus.status).replace('bg-', 'bg-')}/10 border border-${getStatusColor(latestStatus.status).replace('bg-', '')}/20`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${getStatusColor(latestStatus.status)} flex items-center justify-center`}>
                      {(() => {
                        const Icon = getStatusIcon(latestStatus.status)
                        return <Icon className="w-5 h-5 text-white" />
                      })()}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider">Current Status</p>
                      <p className="text-lg font-bold text-[#0a1628]">
                        {TRACKING_STATUSES.find(s => s.value === latestStatus.status)?.label || latestStatus.status}
                      </p>
                    </div>
                  </div>
                  {latestStatus.description && (
                    <p className="text-slate-600 text-sm">{latestStatus.description}</p>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(latestStatus.event_time).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(latestStatus.event_time).toLocaleTimeString()}
                    </span>
                    {latestStatus.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {latestStatus.location}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Package Details */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Shipment Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <p className="text-xs text-slate-400">Route</p>
                    </div>
                    <p className="text-sm font-semibold text-[#0a1628]">
                      {searchedPackage.origin} → {searchedPackage.destination}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      {searchedPackage.transport_type === 'Sea' ? (
                        <Ship className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <Plane className="w-3.5 h-3.5 text-slate-400" />
                      )}
                      <p className="text-xs text-slate-400">Transport</p>
                    </div>
                    <p className="text-sm font-semibold text-[#0a1628]">{searchedPackage.transport_type}</p>
                  </div>
                  {searchedPackage.batch_number && (
                    <div className="bg-slate-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Package className="w-3.5 h-3.5 text-slate-400" />
                        <p className="text-xs text-slate-400">Batch</p>
                      </div>
                      <p className="text-sm font-semibold text-[#0a1628]">{searchedPackage.batch_number}</p>
                    </div>
                  )}
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Package className="w-3.5 h-3.5 text-slate-400" />
                      <p className="text-xs text-slate-400">CTN Qty</p>
                    </div>
                    <p className="text-sm font-semibold text-[#0a1628]">{searchedPackage.ctn_quantity}</p>
                  </div>
                  {searchedPackage.weight && (
                    <div className="bg-slate-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Scale className="w-3.5 h-3.5 text-slate-400" />
                        <p className="text-xs text-slate-400">Weight</p>
                      </div>
                      <p className="text-sm font-semibold text-[#0a1628]">{searchedPackage.weight} kg</p>
                    </div>
                  )}
                  {searchedPackage.price && (
                    <div className="bg-slate-50 rounded-xl p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                        <p className="text-xs text-slate-400">Price</p>
                      </div>
                      <p className="text-sm font-semibold text-[#0a1628]">
                        {searchedPackage.currency} {searchedPackage.price}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Tracking History</h3>
                {sortedEvents.length === 0 ? (
                  <div className="bg-slate-50 rounded-xl p-6 text-center">
                    <p className="text-slate-400 text-sm">No tracking events yet</p>
                  </div>
                ) : (
                  <div className="space-y-0">
                    {sortedEvents.map((event, index) => {
                      const statusInfo = TRACKING_STATUSES.find(s => s.value === event.status)
                      const Icon = getStatusIcon(event.status)
                      return (
                        <div key={event.id} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full ${getStatusColor(event.status)} flex items-center justify-center ${index === 0 ? 'ring-4 ring-opacity-20' : 'opacity-70'}`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            {index < sortedEvents.length - 1 && (
                              <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                            )}
                          </div>
                          <div className={`flex-1 pb-4 ${index === 0 ? '' : 'opacity-70'}`}>
                            <div className="bg-slate-50 rounded-xl p-3">
                              <p className="text-sm font-semibold text-[#0a1628]">
                                {statusInfo?.label || event.status}
                              </p>
                              {event.description && (
                                <p className="text-xs text-slate-500 mt-1">{event.description}</p>
                              )}
                              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(event.event_time).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(event.event_time).toLocaleTimeString()}
                                </span>
                                {event.location && (
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {event.location}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 flex gap-3">
              <Button
                onClick={() => setShowResults(false)}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                Close
              </Button>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full h-12 rounded-xl bg-[#0a1628] hover:bg-[#1a2a3b]">
                  Contact Support
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ROUTE ANIMATION */}
      <section className="bg-[#0d1f3c] py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-sky-400 text-[10px] font-black tracking-[0.22em] uppercase mb-2">Our Route</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-12">
            Dubai to Zimbabwe
          </h2>

          <div className="max-w-lg mx-auto">
            <div className="flex items-end justify-between px-2 mb-3">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <span className="text-white font-mono font-bold text-lg tracking-widest">DXB</span>
                </div>
                <p className="text-white/70 text-sm font-semibold">Dubai</p>
                <p className="text-white/35 text-xs">UAE</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-sky-500/20 border border-sky-400/35 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  <span className="text-sky-300 font-mono font-bold text-lg tracking-widest">HRE</span>
                </div>
                <p className="text-white/70 text-sm font-semibold">Harare</p>
                <p className="text-white/35 text-xs">Zimbabwe</p>
              </div>
            </div>

            <div className="relative h-36">
              <svg
                viewBox="0 0 800 120"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path d="M 80 90 Q 400 8 720 90" fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth="12" />
                <path
                  ref={pathRef}
                  d="M 80 90 Q 400 8 720 90"
                  fill="none"
                  stroke="rgba(56,189,248,0.4)"
                  strokeWidth="1.5"
                  strokeDasharray="8 5"
                />

                <circle cx="80" cy="90" r="5" fill="#ffffff" />
                <circle cx="80" cy="90" r="10" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />

                <circle cx="720" cy="90" r="5" fill="#38bdf8" />
                <circle cx="720" cy="90" r="10" fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="1.5" />

                <g ref={planeRef}>
                  <g transform="translate(-14, -14) rotate(90, 14, 14)">
                    <circle cx="14" cy="14" r="14" fill="rgba(56,189,248,0.18)" />
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#38bdf8">
                      <path d="M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z" />
                    </svg>
                  </g>
                </g>
              </svg>
            </div>

            <div className="flex justify-center mt-1">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-400/25 text-green-400 text-xs font-bold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Active Route · Weekly: Wed & Fri
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FLIGHT SCHEDULES */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Weekly Flights</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight mb-3">
              Flight Schedules
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
              Our cargo flights operate twice weekly from Dubai to Zimbabwe, ensuring your goods arrive on time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {flightSchedules.map((flight, i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/60 overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#0a1628]/12 transition-all duration-300"
              >
                <div className="h-1 bg-gradient-to-r from-[#0a1628] via-[#1a3a6b] to-sky-400" />

                <div className="bg-white px-7 pt-7 pb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center flex-wrap gap-2 mb-2.5">
                      <Calendar className="w-4 h-4 text-[#1a3a6b]" />
                      <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-gray-400">Every week</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-50 border border-green-200 text-green-600 text-[10px] font-bold">Active</span>
                    </div>
                    <h3 className="text-2xl font-black text-[#0a1628] tracking-tight leading-none">{flight.day}</h3>
                    <p className="text-gray-400 text-sm mt-1.5 font-light">{flight.route}</p>
                  </div>
                  <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-[#0a1628] flex flex-col items-center justify-center shadow-lg shadow-[#0a1628]/30">
                    <span className="text-white/45 text-[9px] font-bold tracking-widest uppercase">Every</span>
                    <span className="text-white font-mono font-black text-2xl leading-none mt-0.5">{flight.dayShort}</span>
                  </div>
                </div>

                <div className="mx-6 mb-6 rounded-2xl bg-slate-50 border border-slate-100 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="text-center shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-[#0a1628] flex items-center justify-center mx-auto mb-2 shadow-md shadow-[#0a1628]/25">
                        <span className="text-white font-mono font-bold text-sm tracking-wide">{flight.from}</span>
                      </div>
                      <p className="text-[#0a1628] font-bold text-sm leading-none">{flight.departureTime}</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">Departure</p>
                    </div>

                    <div className="flex-1 flex flex-col items-center gap-1.5">
                      <div className="relative w-full h-px bg-[#0a1628]/12">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border border-[#0a1628]/15 flex items-center justify-center shadow-sm">
                          <Plane className="w-3 h-3 text-[#1a3a6b]" />
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-gray-400 tracking-wider">{flight.timezone}</span>
                    </div>

                    <div className="text-center shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-sky-500 flex items-center justify-center mx-auto mb-2 shadow-md shadow-sky-500/30">
                        <span className="text-white font-mono font-bold text-sm tracking-wide">{flight.to}</span>
                      </div>
                      <p className="text-[#0a1628] font-bold text-sm leading-none">{flight.arrivalTime}</p>
                      <p className="text-gray-400 text-[11px] mt-0.5">Arrival</p>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-7">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#0a1628] text-white text-sm font-bold tracking-wide hover:bg-[#1a3a6b] active:scale-95 transition-all duration-200 shadow-lg shadow-[#0a1628]/20"
                  >
                    Book This Flight
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO TRACK */}
      <section className="bg-slate-50 border-t border-slate-100 py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-[#1a3a6b] text-[10px] font-black tracking-[0.22em] uppercase mb-2">Easy Tracking</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#0a1628] tracking-tight mb-3">
              How to Track Your Goods
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto leading-relaxed">
              Follow these simple steps to stay updated on your shipment status.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trackingSteps.map((step, i) => (
              <div
                key={i}
                className="relative bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:shadow-[#0a1628]/08 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="absolute top-5 right-5 w-7 h-7 rounded-full bg-[#0a1628] flex items-center justify-center text-white text-[11px] font-black shadow-sm">
                  {i + 1}
                </span>
                <p className="font-mono text-6xl font-black text-[#0a1628]/[0.05] leading-none mb-3 select-none -ml-1">
                  {step.num}
                </p>
                <div className="w-11 h-11 rounded-xl bg-[#0a1628]/08 border border-[#0a1628]/10 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-[#0a1628]" />
                </div>
                <h3 className="text-[#0a1628] font-bold text-sm mb-1.5 leading-snug">{step.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[#0a1628] py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-3xl" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-5">
            Need Help Tracking<br />Your Package?
          </h2>
          <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md mx-auto">
            Contact us on WhatsApp for instant support with your shipment tracking.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#0a1628] font-black text-sm tracking-wide hover:bg-slate-100 active:scale-95 transition-all duration-200 shadow-2xl shadow-black/30"
            >
              Contact via WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+971559933478"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/70 font-semibold text-sm hover:border-white/40 hover:text-white transition-all duration-200"
            >
              Call: +971 55 993 3478
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
