'use client'

import { X, Package, User, Phone, Mail, MapPin, Plane, Scale, DollarSign, Calendar, Clock, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { type Package as PackageType, type PackageEvent, TRACKING_STATUSES } from '@/lib/types'
import { useState } from 'react'

interface PackageDetailsModalProps {
  pkg: PackageType & { package_events: PackageEvent[] }
  onClose: () => void
}

export function PackageDetailsModal({ pkg, onClose }: PackageDetailsModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pkg.tracking_id)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const sortedEvents = [...(pkg.package_events || [])].sort(
    (a, b) => new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
  )

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-gradient-to-r from-[#0a1628] to-[#1a3a6b]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{pkg.tracking_id}</h2>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/70" />
                  )}
                </button>
              </div>
              <p className="text-white/60 text-sm">Created {new Date(pkg.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Customer Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Customer Information</h3>
            <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0a1628]/5 flex items-center justify-center">
                  <User className="w-4 h-4 text-[#0a1628]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Name</p>
                  <p className="text-sm font-semibold text-[#0a1628]">{pkg.customer_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#0a1628]/5 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#0a1628]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Phone</p>
                  <p className="text-sm font-semibold text-[#0a1628]">{pkg.customer_phone}</p>
                </div>
              </div>
              {pkg.customer_email && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0a1628]/5 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#0a1628]" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm font-semibold text-[#0a1628]">{pkg.customer_email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Shipment Info */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Shipment Details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-xs text-slate-400">Route</p>
                </div>
                <p className="text-sm font-semibold text-[#0a1628]">{pkg.origin} → {pkg.destination}</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Plane className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-xs text-slate-400">Transport</p>
                </div>
                <p className="text-sm font-semibold text-[#0a1628]">{pkg.transport_type}</p>
              </div>
              {pkg.batch_number && (
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Package className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-xs text-slate-400">Batch</p>
                  </div>
                  <p className="text-sm font-semibold text-[#0a1628]">{pkg.batch_number}</p>
                </div>
              )}
              <div className="bg-slate-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-3.5 h-3.5 text-slate-400" />
                  <p className="text-xs text-slate-400">CTN Qty</p>
                </div>
                <p className="text-sm font-semibold text-[#0a1628]">{pkg.ctn_quantity}</p>
              </div>
              {pkg.weight && (
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Scale className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-xs text-slate-400">Weight</p>
                  </div>
                  <p className="text-sm font-semibold text-[#0a1628]">{pkg.weight} kg</p>
                </div>
              )}
              {pkg.price && (
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                    <p className="text-xs text-slate-400">Price</p>
                  </div>
                  <p className="text-sm font-semibold text-[#0a1628]">{pkg.currency} {pkg.price}</p>
                </div>
              )}
            </div>
            {pkg.description && (
              <div className="bg-slate-50 rounded-xl p-3 mt-3">
                <p className="text-xs text-slate-400 mb-1">Description</p>
                <p className="text-sm text-[#0a1628]">{pkg.description}</p>
              </div>
            )}
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
                  return (
                    <div key={event.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(event.status)} ${index === 0 ? 'ring-4 ring-opacity-20' : ''}`}
                          style={{ ringColor: getStatusColor(event.status) }}
                        />
                        {index < sortedEvents.length - 1 && (
                          <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                        )}
                      </div>
                      <div className={`flex-1 pb-4 ${index === 0 ? '' : 'opacity-70'}`}>
                        <div className="bg-slate-50 rounded-xl p-3">
                          <p className="text-sm font-semibold text-[#0a1628]">{statusInfo?.label || event.status}</p>
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
        <div className="p-6 border-t border-slate-100">
          <Button
            onClick={onClose}
            className="w-full h-12 rounded-xl bg-[#0a1628] hover:bg-[#1a2a3b]"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
