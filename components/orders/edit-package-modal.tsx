'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  X, Package, User, Phone, Mail, MapPin, Plane, Scale, DollarSign, FileText, CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type Package as PackageType, TRANSPORT_TYPES } from '@/lib/types'

interface EditPackageModalProps {
  pkg: PackageType
  onClose: () => void
  onSuccess: () => void
}

export function EditPackageModal({ pkg, onClose, onSuccess }: EditPackageModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: pkg.customer_name,
    customer_email: pkg.customer_email || '',
    customer_phone: pkg.customer_phone,
    origin: pkg.origin,
    destination: pkg.destination,
    transport_type: pkg.transport_type,
    batch_number: pkg.batch_number || '',
    ctn_quantity: pkg.ctn_quantity,
    weight: pkg.weight != null ? String(pkg.weight) : '',
    price: pkg.price != null ? String(pkg.price) : '',
    currency: pkg.currency,
    description: pkg.description || '',
  })

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error: updateError } = await supabase
        .from('packages')
        .update({
          customer_name: formData.customer_name.trim(),
          customer_email: formData.customer_email.trim() || null,
          customer_phone: formData.customer_phone.trim(),
          origin: formData.origin.trim(),
          destination: formData.destination.trim(),
          transport_type: formData.transport_type,
          batch_number: formData.batch_number.trim() || null,
          ctn_quantity: formData.ctn_quantity,
          weight: formData.weight ? parseFloat(formData.weight) : null,
          price: formData.price ? parseFloat(formData.price) : null,
          currency: formData.currency,
          description: formData.description.trim() || null,
        })
        .eq('id', pkg.id)

      if (updateError) throw updateError
      setSaved(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update package')
    } finally {
      setIsLoading(false)
    }
  }

  if (saved) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-[#0a1628] mb-2">Package Updated</h2>
            <p className="text-slate-500 mb-6 text-sm font-mono">{pkg.tracking_id}</p>
            <p className="text-slate-600 text-sm mb-6">
              Changes are saved. Customers will see updated details when they track this ID.
            </p>
            <Button onClick={onSuccess} className="w-full h-12 rounded-xl bg-[#0a1628] hover:bg-[#1a2a3b]">
              Done
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a1628]">Edit Package</h2>
              <p className="text-slate-400 text-sm font-mono">{pkg.tracking_id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
              <p className="text-xs text-slate-400">Tracking ID (cannot be changed)</p>
              <p className="font-mono font-semibold text-[#0a1628]">{pkg.tracking_id}</p>
            </div>

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
                    />
                  </div>
                </div>
              </div>
            </div>

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
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          transport_type: e.target.value as PackageType['transport_type'],
                        })
                      }
                      className="w-full pl-10 pr-4 h-11 rounded-xl border border-slate-200 bg-white text-sm"
                    >
                      {TRANSPORT_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
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
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">CTN Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.ctn_quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, ctn_quantity: parseInt(e.target.value, 10) || 1 })
                    }
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
                      min="0"
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
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="pl-10 h-11 rounded-xl"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Package Description</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm resize-none"
                      rows={3}
                      placeholder="Visible to customer when they track this package"
                    />
                  </div>
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

        <div className="p-6 border-t border-slate-100 flex gap-3">
          <Button type="button" onClick={onClose} variant="outline" className="flex-1 h-12 rounded-xl">
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
                Saving...
              </span>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
