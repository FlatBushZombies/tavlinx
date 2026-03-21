"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Phone } from "lucide-react"
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Tavlinx Freight Solutions"
            width={180}
            height={50}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <a href="tel:+971559933478" className="flex items-center gap-2 text-sm font-medium text-foreground/80">
            <Phone className="h-4 w-4" />
            +971 55 993 3478
          </a>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
              Get a Quote
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-md md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
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
            <a href="tel:+971559933478" className="flex items-center gap-2 text-base font-medium text-foreground/80">
              <Phone className="h-5 w-5" />
              +971 55 993 3478
            </a>
            <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Get a Quote on WhatsApp
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
