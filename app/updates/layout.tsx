import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const BASE_URL = 'https://www.tavlinxfreightsolutions.com'

export const metadata: Metadata = {
  title: 'Freight Updates & Notices | Tavlinx Freight Solutions',
  description:
    'Read the latest freight notices and operational updates from Tavlinx Freight Solutions for shipments from UAE & China to Zimbabwe.',
  alternates: {
    canonical: `${BASE_URL}/updates`,
  },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/updates`,
    title: 'Freight Updates & Notices | Tavlinx Freight Solutions',
    description:
      'Read the latest freight notices and operational updates from Tavlinx Freight Solutions for shipments from UAE & China to Zimbabwe.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Freight Updates & Notices | Tavlinx Freight Solutions',
    description:
      'Read the latest freight notices and operational updates from Tavlinx Freight Solutions for shipments from UAE & China to Zimbabwe.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function UpdatesLayout({ children }: { children: ReactNode }) {
  return children
}

