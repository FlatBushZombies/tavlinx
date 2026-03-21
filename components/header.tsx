"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const WHATSAPP_LINK = "https://wa.me/971559933478"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/tracking", label: "Tracking" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Utility Bar */}
      <div className="hidden bg-primary lg:block">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 lg:px-8">
          <div className="flex items-center gap-6">
            <a 
              href="tel:+971559933478" 
              className="flex items-center gap-2 text-xs text-primary-foreground/90 transition-colors hover:text-primary-foreground"
            >
              <Phone className="h-3.5 w-3.5" />
              +971 55 993 3478
            </a>
            <a 
              href="mailto:info@tavlinx.com" 
              className="flex items-center gap-2 text-xs text-primary-foreground/90 transition-colors hover:text-primary-foreground"
            >
              <Mail className="h-3.5 w-3.5" />
              info@tavlinx.com
            </a>
            <span className="flex items-center gap-2 text-xs text-primary-foreground/90">
              <MapPin className="h-3.5 w-3.5" />
              Dubai, UAE & Harare, Zimbabwe
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs text-primary-foreground/90">
              <Clock className="h-3.5 w-3.5" />
              Mon - Sat: 08:00 - 18:00
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Tavlinx Freight Solutions"
              width={180}
              height={50}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-foreground/80 transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden items-center gap-4 lg:flex">
            <Button 
              asChild 
              size="lg"
              className="rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-foreground/80 transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border" />
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <a href="tel:+971559933478" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +971 55 993 3478
              </a>
              <a href="mailto:info@tavlinx.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                info@tavlinx.com
              </a>
            </div>
            <Button asChild className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                Get a Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
