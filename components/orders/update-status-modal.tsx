'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { X, Package, MapPin, FileText, CheckCircle2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type Package as PackageType, type PackageEvent, TRACKING_STATUSES } from '@/lib/types'
import { notifyCustomerWhatsApp } from '@/lib/whatsapp/notify-client'

interface UpdateStatusModalProps {
  pkg: PackageType & { package_events: PackageEvent[] }
  onClose: () => void
  onSuccess: () => void
}

export function UpdateStatusModal({ pkg, onClose, onSuccess }: UpdateStatusModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    status: '',
    description: '',
    location: '',
  })
  const [sendWhatsapp, setSendWhatsapp] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [updatedStatusLabel, setUpdatedStatusLabel] = useState('')
  const [notificationInfo, setNotificationInfo] = useState<{
    sent: boolean
    message: string
    fallbackUrl?: string
  } | null>(null)

  const supabase = createClient()

  const currentStatus = pkg.package_events?.sort(
    (a, b) => new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
  )[0]?.status

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.status) {
      setError('Please select a status')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const statusInfo = TRACKING_STATUSES.find(s => s.value === formData.status)
      const { error: eventError } = await supabase
        .from('package_events')
        .insert({
          package_id: pkg.id,
          status: formData.status,
          description: formData.description || statusInfo?.description || '',
          location: formData.location || null,
        })

      if (eventError) throw eventError

      const selectedStatus = TRACKING_STATUSES.find((s) => s.value === formData.status)
      setUpdatedStatusLabel(selectedStatus?.label || formData.status)

      if (sendWhatsapp) {
        const notification = await notifyCustomerWhatsApp({
          customerPhone: pkg.customer_phone,
          customerName: pkg.customer_name,
          trackingId: pkg.tracking_id,
          status: formData.status,
          description: formData.description || selectedStatus?.description || '',
          location: formData.location || null,
          packageDescription: pkg.description,
        })

        if (notification.sent) {
          setNotificationInfo({
            sent: true,
            message:
              formData.status === 'ready_pickup'
                ? 'Pickup-ready WhatsApp alert sent to customer.'
                : 'Status update WhatsApp notification sent to customer.',
          })
        } else if (notification.fallbackUrl) {
          setNotificationInfo({
            sent: false,
            message:
              notification.reason ||
              'Automatic WhatsApp send is not configured. WhatsApp was opened with a prefilled message for manual send.',
            fallbackUrl: notification.fallbackUrl,
          })
          window.open(notification.fallbackUrl, '_blank', 'noopener,noreferrer')
        } else {
          setNotificationInfo({
            sent: false,
            message: notification.reason || 'Could not send WhatsApp notification.',
          })
        }
      } else {
        setNotificationInfo({
          sent: true,
          message: 'Status updated. WhatsApp notification was skipped.',
        })
      }

      setIsComplete(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      received: 'border-blue-500 bg-blue-50 text-blue-700',
      weighed: 'border-purple-500 bg-purple-50 text-purple-700',
      priced: 'border-indigo-500 bg-indigo-50 text-indigo-700',
      departed: 'border-cyan-500 bg-cyan-50 text-cyan-700',
      in_transit: 'border-amber-500 bg-amber-50 text-amber-700',
      left_country: 'border-orange-500 bg-orange-50 text-orange-700',
      customs: 'border-yellow-500 bg-yellow-50 text-yellow-700',
      arrived: 'border-emerald-500 bg-emerald-50 text-emerald-700',
      ready_pickup: 'border-green-500 bg-green-50 text-green-700',
      delivered: 'border-teal-500 bg-teal-50 text-teal-700',
      complication: 'border-red-500 bg-red-50 text-red-700',
    }
    return statusColors[status] || 'border-slate-300 bg-slate-50 text-slate-700'
  }

  if (isComplete) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-[#0a1628] mb-2">Status Updated</h2>
            <p className="text-slate-500 mb-1 font-mono text-sm">{pkg.tracking_id}</p>
            <p className="text-slate-600 mb-6 text-sm">{updatedStatusLabel}</p>

            {notificationInfo && (
              <div
                className={`rounded-2xl border p-4 mb-6 text-left ${
                  notificationInfo.sent
                    ? 'border-green-200 bg-green-50'
                    : 'border-amber-200 bg-amber-50'
                }`}
              >
                <p
                  className={`text-sm ${
                    notificationInfo.sent ? 'text-green-700' : 'text-amber-800'
                  }`}
                >
                  {notificationInfo.message}
                </p>
                {!notificationInfo.sent && notificationInfo.fallbackUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-3 h-10 rounded-xl w-full"
                    onClick={() => window.open(notificationInfo.fallbackUrl, '_blank', 'noopener,noreferrer')}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Open WhatsApp
                  </Button>
                )}
              </div>
            )}

            <Button
              onClick={onSuccess}
              className="w-full h-12 rounded-xl bg-[#0a1628] hover:bg-[#1a2a3b]"
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0a1628]">Update Status</h2>
              <p className="text-slate-400 text-sm font-mono">{pkg.tracking_id}</p>
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
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Current Status */}
          {currentStatus && (
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-400 mb-1">Current Status</p>
              <p className="font-semibold text-[#0a1628]">
                {TRACKING_STATUSES.find(s => s.value === currentStatus)?.label || currentStatus}
              </p>
            </div>
          )}

          {/* New Status Selection */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Select New Status</label>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {TRACKING_STATUSES.map(status => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, status: status.value })}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    formData.status === status.value
                      ? getStatusColor(status.value) + ' border-2'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {formData.status === status.value && (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    )}
                    <p className="text-sm font-medium leading-tight">{status.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Location (Optional)</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="pl-10 h-11 rounded-xl"
                placeholder="e.g., Dubai Airport, Harare Warehouse"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Description (Optional)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm resize-none"
                rows={3}
                placeholder="Additional notes about this status update..."
              />
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={sendWhatsapp}
              onChange={(e) => setSendWhatsapp(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300"
            />
            <div>
              <p className="text-sm font-medium text-[#0a1628]">Notify customer on WhatsApp</p>
              <p className="text-xs text-slate-500 mt-1">
                Sends an automated status update. Pickup-ready alerts use a dedicated message when status is
                {' '}<span className="font-semibold">Ready for Pickup</span>.
              </p>
            </div>
          </label>

          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="sticky bottom-0 bg-white pt-3 pb-1 border-t border-slate-100 flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 h-12 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.status}
              className="flex-1 h-12 rounded-xl bg-[#0a1628] hover:bg-[#1a2a3b]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Updating...
                </span>
              ) : (
                'Update Status'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
