export interface Package {
  id: string
  tracking_id: string
  customer_name: string
  customer_email: string | null
  customer_phone: string
  origin: string
  destination: string
  transport_type: 'Air' | 'Sea' | 'Air Dangerous Goods'
  batch_number: string | null
  ctn_quantity: number
  weight: number | null
  price: number | null
  currency: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface PackageEvent {
  id: string
  package_id: string
  status: string
  description: string | null
  location: string | null
  event_time: string
  created_at: string
}

export type PackageWithEvents = Package & {
  package_events: PackageEvent[]
}

export const TRACKING_STATUSES = [
  { value: 'received', label: 'Received at Facility', description: 'Package received at our facility' },
  { value: 'weighed', label: 'Weighed & Measured', description: 'Package has been weighed and dimensions recorded' },
  { value: 'priced', label: 'Price Confirmed', description: 'Shipping price has been calculated' },
  { value: 'departed', label: 'Left Facility', description: 'Package has left our facility' },
  { value: 'in_transit', label: 'In Transit', description: 'Package is on the way' },
  { value: 'left_country', label: 'Left Origin Country', description: 'Package has departed from origin country' },
  { value: 'customs', label: 'Customs Checking', description: 'Package is going through customs' },
  { value: 'arrived', label: 'Arrived at Warehouse', description: 'Package has arrived at destination warehouse' },
  { value: 'ready_pickup', label: 'Ready for Pickup', description: 'Package is ready for collection' },
  { value: 'delivered', label: 'Delivered', description: 'Package has been delivered' },
  { value: 'complication', label: 'Complication', description: 'There is an issue with the package' },
] as const

export const TRANSPORT_TYPES = [
  { value: 'Air', label: 'Air Transport' },
  { value: 'Sea', label: 'Sea Transport' },
  { value: 'Air Dangerous Goods', label: 'Air Transport (Dangerous Goods)' },
] as const
