'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Package, User, Phone, Mail, MapPin, Plane, Scale, DollarSign, FileText, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TRANSPORT_TYPES, TRACKING_STATUSES } from '@/lib/types'

interface AddPackageModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function AddPackageModal({ onClose, onSuccess }: AddPackageModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createdTrackingId, setCreatedTrackingId] = useState<string | null>(null)
  const [createdCustomerName, setCreatedCustomerName] = useState<string | null>(null)
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    origin: 'Dubai, UAE',
    destination: 'Harare, Zimbabwe',
    transport_type: 'Air' as 'Air' | 'Sea' | 'Air Dangerous Goods',
    batch_number: '',
    ctn_quantity: 1,
    weight: '',
    price: '',
    currency: 'USD',
    description: '',
    initial_status: 'received',
    initial_description: '',
  })

  const supabase = createClient()

  const formatWhatsappPhone = (phone: string) => {
    // WhatsApp wa.me expects digits only (country code included).
    return phone.replace(/\D/g, '')
  }

  const buildWhatsappMessage = (customerName: string, trackingId: string) => {
    return `Hello ${customerName}, your Tavlinx package has been created.\n\nYour Tracking ID is: ${trackingId}\n\nHow to track your shipment:\n1) Open https://tavlinx.com/tracking\n2) Enter your Tracking ID exactly as shown above\n3) Tap "Track" to view your latest status updates.`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Create the package
      const { data: packageData, error: packageError } = await supabase
        .from('packages')
        .insert({
          customer_name: formData.customer_name,
          customer_email: formData.customer_email || null,
          customer_phone: formData.customer_phone,
          origin: formData.origin,
          destination: formData.destination,
          transport_type: formData.transport_type,
          batch_number: formData.batch_number || null,
          ctn_quantity: formData.ctn_quantity,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          price: formData.price ? parseFloat(formData.price) : null,
          currency: formData.currency,
          description: formData.description || null,
        })
        .select()
        .single()

      if (packageError) throw packageError

      // Create initial status event
      const statusInfo = TRACKING_STATUSES.find(s => s.value === formData.initial_status)
      const { error: eventError } = await supabase
        .from('package_events')
        .insert({
          package_id: packageData.id,
          status: formData.initial_status,
          description: formData.initial_description || statusInfo?.description || '',
          location: formData.origin,
        })

      if (eventError) throw eventError

      const formattedPhone = formatWhatsappPhone(formData.customer_phone)
      const message = buildWhatsappMessage(formData.customer_name, packageData.tracking_id)
      const link = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`

      setCreatedTrackingId(packageData.tracking_id)
      setCreatedCustomerName(formData.customer_name)
      setWhatsappLink(link)

      // Open WhatsApp chat automatically after successful package creation.
      window.open(link, '_blank', 'noopener,noreferrer')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create package')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = async () => {
    if (createdTrackingId) {
      await navigator.clipboard.writeText(createdTrackingId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (createdTrackingId) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-[#0a1628] mb-2">Package Created!</h2>
            <p className="text-slate-500 mb-2">Tracking ID has been generated successfully.</p>
            {createdCustomerName && (
              <p className="text-slate-500 mb-6 text-sm">
                WhatsApp message prepared for {createdCustomerName}.
              </p>
            )}

            <div className="bg-slate-50 rounded-2xl p-4 mb-6">
              <p className="text-xs text-slate-400 mb-1">Tracking ID</p>
              <div className="flex items-center justify-center gap-3">
                <p className="font-mono text-xl font-black text-[#0a1628]">{createdTrackingId}</p>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              {whatsappLink && (
                <Button
                  onClick={() => window.open(whatsappLink, '_blank', 'noopener,noreferrer')}
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                >
                  Open WhatsApp
                </Button>
              )}
              <Button
                onClick={() => {
                  setCreatedTrackingId(null)
                  setCreatedCustomerName(null)
                  setWhatsappLink(null)
                  setFormData({
                    customer_name: '',
                    customer_email: '',
                    customer_phone: '',
                    origin: 'Dubai, UAE',
                    destination: 'Harare, Zimbabwe',
                    transport_type: 'Air',
                    batch_number: '',
                    ctn_quantity: 1,
                    weight: '',
                    price: '',
                    currency: 'USD',
                    description: '',
                    initial_status: 'received',
                    initial_description: '',
                  })
                }}
                variant="outline"
                className="flex-1 h-12 rounded-xl"
              >
                Add Another
              </Button>
              <Button
                onClick={onSuccess}
                className="flex-1 h-12 rounded-xl bg-[#0a1628] hover:bg-[#1a2a3b]"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a1628]">Add New Package</h2>
              <p className="text-slate-400 text-sm">Create a new shipment entry</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Customer Info */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Customer Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      className="pl-10 h-11 rounded-xl"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      required
                      value={formData.customer_phone}
                      onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                      className="pl-10 h-11 rounded-xl"
                      placeholder="+263 77 123 4567"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Email (Optional)</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="email"
                      value={formData.customer_email}
                      onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                      className="pl-10 h-11 rounded-xl"
                      placeholder="customer@example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Info */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Shipment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Origin</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      className="pl-10 h-11 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Destination</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="pl-10 h-11 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Transport Type</label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={formData.transport_type}
                      onChange={(e) => setFormData({ ...formData, transport_type: e.target.value as 'Air' | 'Sea' | 'Air Dangerous Goods' })}
                      className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 bg-white text-sm"
                    >
                      {TRANSPORT_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Batch Number</label>
                  <Input
                    value={formData.batch_number}
                    onChange={(e) => setFormData({ ...formData, batch_number: e.target.value })}
                    className="h-11 rounded-xl"
                    placeholder="e.g., 18-Air"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">CTN Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.ctn_quantity}
                    onChange={(e) => setFormData({ ...formData, ctn_quantity: parseInt(e.target.value) || 1 })}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Weight (kg)</label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="pl-10 h-11 rounded-xl"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Price</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-24 h-11 rounded-xl border border-slate-200 bg-white text-sm px-3"
                    >
                      <option value="USD">USD</option>
                      <option value="AED">AED</option>
                      <option value="ZWL">ZWL</option>
                    </select>
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="pl-10 h-11 rounded-xl"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Initial Status</label>
                  <select
                    value={formData.initial_status}
                    onChange={(e) => setFormData({ ...formData, initial_status: e.target.value })}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white text-sm px-3"
                  >
                    {TRACKING_STATUSES.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm resize-none"
                      rows={3}
                      placeholder="Package contents, special instructions, etc."
                    />
                  </div>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Initial Status Note (Optional)</label>
                  <Input
                    value={formData.initial_description}
                    onChange={(e) => setFormData({ ...formData, initial_description: e.target.value })}
                    className="h-11 rounded-xl"
                    placeholder="Additional notes for the initial status"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex gap-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            className="flex-1 h-12 rounded-xl"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 h-12 rounded-xl bg-[#0a1628] hover:bg-[#1a2a3b]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </span>
            ) : (
              'Create Package'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
