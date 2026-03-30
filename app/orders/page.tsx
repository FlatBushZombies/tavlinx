'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  Package as PackageIcon, Plus, Search, Filter, LogOut, Plane,
  ChevronDown, Eye, Edit2, Trash2, Copy, Check, X, RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { type Package, type PackageEvent, TRACKING_STATUSES, TRANSPORT_TYPES } from '@/lib/types'
import { AddPackageModal } from '@/components/orders/add-package-modal'
import { PackageDetailsModal } from '@/components/orders/package-details-modal'
import { UpdateStatusModal } from '@/components/orders/update-status-modal'

export default function OrdersPage() {
  const [packages, setPackages] = useState<(Package & { package_events: PackageEvent[] })[]>([])
  const [filteredPackages, setFilteredPackages] = useState<(Package & { package_events: PackageEvent[] })[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterTransport, setFilterTransport] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<(Package & { package_events: PackageEvent[] }) | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const fetchPackages = useCallback(async () => {
    setIsLoading(true)
    const { data, error } = await supabase
      .from('packages')
      .select('*, package_events(*)')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching packages:', error)
    } else {
      setPackages(data || [])
      setFilteredPackages(data || [])
    }
    setIsLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchPackages()
  }, [fetchPackages])

  useEffect(() => {
    let filtered = [...packages]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(pkg =>
        pkg.tracking_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.customer_phone.includes(searchTerm) ||
        pkg.batch_number?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(pkg => {
        const latestEvent = pkg.package_events?.sort((a, b) =>
          new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
        )[0]
        return latestEvent?.status === filterStatus
      })
    }

    // Transport filter
    if (filterTransport !== 'all') {
      filtered = filtered.filter(pkg => pkg.transport_type === filterTransport)
    }

    setFilteredPackages(filtered)
  }, [searchTerm, filterStatus, filterTransport, packages])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const handleCopyTrackingId = async (trackingId: string) => {
    await navigator.clipboard.writeText(trackingId)
    setCopiedId(trackingId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDeletePackage = async (packageId: string) => {
    if (!confirm('Are you sure you want to delete this package?')) return

    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', packageId)

    if (!error) {
      fetchPackages()
    }
  }

  const getLatestStatus = (pkg: Package & { package_events: PackageEvent[] }) => {
    if (!pkg.package_events || pkg.package_events.length === 0) return null
    return pkg.package_events.sort((a, b) =>
      new Date(b.event_time).getTime() - new Date(a.event_time).getTime()
    )[0]
  }

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      received: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      weighed: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      priced: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
      departed: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
      in_transit: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      left_country: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
      customs: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      arrived: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      ready_pickup: 'bg-green-500/10 text-green-500 border-green-500/20',
      delivered: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
      complication: 'bg-red-500/10 text-red-500 border-red-500/20',
    }
    return statusColors[status] || 'bg-slate-500/10 text-slate-500 border-slate-500/20'
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a1628] border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Plane className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Tavlinx Admin</h1>
                <p className="text-white/50 text-xs">Order Management</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl h-10 px-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Package
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-xl h-10"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0a1628]/5 flex items-center justify-center">
                <PackageIcon className="w-5 h-5 text-[#0a1628]" />
              </div>
              <div>
                <p className="text-2xl font-black text-[#0a1628]">{packages.length}</p>
                <p className="text-slate-400 text-xs font-medium">Total Packages</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-black text-[#0a1628]">
                  {packages.filter(p => getLatestStatus(p)?.status === 'in_transit').length}
                </p>
                <p className="text-slate-400 text-xs font-medium">In Transit</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-black text-[#0a1628]">
                  {packages.filter(p => getLatestStatus(p)?.status === 'ready_pickup').length}
                </p>
                <p className="text-slate-400 text-xs font-medium">Ready for Pickup</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-black text-[#0a1628]">
                  {packages.filter(p => getLatestStatus(p)?.status === 'complication').length}
                </p>
                <p className="text-slate-400 text-xs font-medium">Issues</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by tracking ID, name, phone, or batch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 rounded-xl border-slate-200"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 h-11 rounded-xl border border-slate-200 bg-white text-sm appearance-none cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  {TRACKING_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={filterTransport}
                  onChange={(e) => setFilterTransport(e.target.value)}
                  className="pl-10 pr-8 h-11 rounded-xl border border-slate-200 bg-white text-sm appearance-none cursor-pointer"
                >
                  <option value="all">All Transport</option>
                  {TRANSPORT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Packages List */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-3 border-slate-200 border-t-sky-500 rounded-full animate-spin" />
            </div>
          ) : filteredPackages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <PackageIcon className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">No packages found</p>
              <p className="text-slate-400 text-sm mt-1">Add a new package to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredPackages.map((pkg) => {
                const latestStatus = getLatestStatus(pkg)
                const statusInfo = TRACKING_STATUSES.find(s => s.value === latestStatus?.status)

                return (
                  <div
                    key={pkg.id}
                    className="p-5 hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Tracking ID & Customer */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <p className="font-mono font-bold text-[#0a1628]">{pkg.tracking_id}</p>
                          <button
                            onClick={() => handleCopyTrackingId(pkg.tracking_id)}
                            className="p-1 rounded hover:bg-slate-100 transition-colors"
                            title="Copy tracking ID"
                          >
                            {copiedId === pkg.tracking_id ? (
                              <Check className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                            )}
                          </button>
                        </div>
                        <p className="text-slate-600 text-sm font-medium">{pkg.customer_name}</p>
                        <p className="text-slate-400 text-xs">{pkg.customer_phone}</p>
                      </div>

                      {/* Batch & Transport */}
                      <div className="flex items-center gap-3">
                        {pkg.batch_number && (
                          <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                            Batch: {pkg.batch_number}
                          </div>
                        )}
                        <div className="px-3 py-1.5 rounded-lg bg-sky-500/10 text-sky-600 text-xs font-medium border border-sky-500/20">
                          {pkg.transport_type}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-3">
                        {latestStatus ? (
                          <div className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${getStatusColor(latestStatus.status)}`}>
                            {statusInfo?.label || latestStatus.status}
                          </div>
                        ) : (
                          <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-400 text-xs font-medium">
                            No Status
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => {
                            setSelectedPackage(pkg)
                            setShowStatusModal(true)
                          }}
                          variant="outline"
                          size="sm"
                          className="rounded-lg h-9"
                        >
                          <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                          Update
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedPackage(pkg)
                            setShowDetailsModal(true)
                          }}
                          variant="outline"
                          size="sm"
                          className="rounded-lg h-9"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1.5" />
                          View
                        </Button>
                        <Button
                          onClick={() => handleDeletePackage(pkg.id)}
                          variant="outline"
                          size="sm"
                          className="rounded-lg h-9 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddPackageModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false)
            fetchPackages()
          }}
        />
      )}

      {showDetailsModal && selectedPackage && (
        <PackageDetailsModal
          pkg={selectedPackage}
          onClose={() => {
            setShowDetailsModal(false)
            setSelectedPackage(null)
          }}
        />
      )}

      {showStatusModal && selectedPackage && (
        <UpdateStatusModal
          pkg={selectedPackage}
          onClose={() => {
            setShowStatusModal(false)
            setSelectedPackage(null)
          }}
          onSuccess={() => {
            setShowStatusModal(false)
            setSelectedPackage(null)
            fetchPackages()
          }}
        />
      )}
    </main>
  )
}
