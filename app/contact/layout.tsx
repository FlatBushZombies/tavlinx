import type { Metadata } from 'next'
import type { ReactNode } from 'react'

const BASE_URL = 'https://www.tavlinxfreightsolutions.com'

export const metadata: Metadata = {
  title: 'Contact Tavlinx | Get a Free Freight Quote via WhatsApp',
  description:
    'Contact Tavlinx Freight Solutions for freight & cargo quotes. Reach out via WhatsApp and get help shipping from UAE & China to Zimbabwe.',
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/contact`,
    title: 'Contact Tavlinx | Get a Free Freight Quote via WhatsApp',
    description:
      'Contact Tavlinx Freight Solutions for freight & cargo quotes. Reach out via WhatsApp and get help shipping from UAE & China to Zimbabwe.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Tavlinx | Get a Free Freight Quote via WhatsApp',
    description:
      'Contact Tavlinx Freight Solutions for freight & cargo quotes. Reach out via WhatsApp and get help shipping from UAE & China to Zimbabwe.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}

