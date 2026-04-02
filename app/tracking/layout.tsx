import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const BASE_URL = 'https://www.tavlinxfreightsolutions.com'

export const metadata: Metadata = {
  title: 'Track Your Shipment | Tavlinx Freight Solutions',
  description:
    'Track your shipment with Tavlinx. Enter your tracking ID to view real-time status updates for packages shipped from UAE & China to Zimbabwe.',
  alternates: {
    canonical: `${BASE_URL}/tracking`,
  },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/tracking`,
    title: 'Track Your Shipment | Tavlinx Freight Solutions',
    description:
      'Track your shipment with Tavlinx. Enter your tracking ID to view real-time status updates for packages shipped from UAE & China to Zimbabwe.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track Your Shipment | Tavlinx Freight Solutions',
    description:
      'Track your shipment with Tavlinx. Enter your tracking ID to view real-time status updates for packages shipped from UAE & China to Zimbabwe.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function TrackingLayout({ children }: { children: ReactNode }) {
  return children
}

