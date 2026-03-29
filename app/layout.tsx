import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tavlinxfreightsolutions.com'), // ← your actual domain
  title: {
    default: 'Tavlinx Freight Solutions | Reliable Freight & Cargo Services',
    template: '%s | Tavlinx Freight Solutions',
  },
  description: 'Professional freight and cargo services from UAE & China to Zimbabwe. Trusted sourcing, secure handling, and fast delivery. Door-to-door shipping solutions.',
  keywords: ['freight', 'cargo', 'shipping', 'logistics', 'UAE', 'China', 'Zimbabwe', 'international shipping', 'door-to-door delivery'],
  alternates: {
    canonical: 'https://www.tavlinxfreightsolutions.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Tavlinx Freight Solutions',
    title: 'Tavlinx Freight Solutions | Reliable Freight & Cargo Services',
    description: 'Professional freight and cargo services from UAE & China to Zimbabwe. Door-to-door shipping solutions.',
    url: 'https://www.tavlinx.com',
    images: [
      {
        url: '/og-image.png', // create a 1200x630px branded image
        width: 1200,
        height: 630,
        alt: 'Tavlinx Freight Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tavlinx Freight Solutions | Reliable Freight & Cargo Services',
    description: 'Professional freight and cargo services from UAE & China to Zimbabwe. Door-to-door shipping solutions.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  themeColor: '#1a365d',
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tavlinx Freight Solutions',
  url: 'https://www.tavlinxfreightsolutions.com',
  description: 'Professional freight and cargo services from UAE & China to Zimbabwe.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.tavlinxfreightsolutions.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}