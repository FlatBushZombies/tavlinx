"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"

const WHATSAPP_LINK = "https://wa.me/971559933478"

const highlights = [
  "Trusted Suppliers",
  "Safe Handling",
  "Fast Delivery",
]

const sliderImages = [
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070",
    alt: "Cargo ship and freight containers at port",
    label: "Sea Freight",
    tag: "01",
  },
  {
    src: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070",
    alt: "Cargo airplane loading freight",
    label: "Air Freight",
    tag: "02",
  },
  {
    src: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=2070",
    alt: "Container ship at sea during sunset",
    label: "Global Shipping",
    tag: "03",
  },
  {
    src: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=2070",
    alt: "Warehouse with stacked cargo",
    label: "Warehousing",
    tag: "04",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const progressTweenRef = useRef<gsap.core.Tween | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const highlightsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  const animateToSlide = useCallback((nextIndex: number) => {
    if (isAnimating || nextIndex === currentSlide) return
    setIsAnimating(true)

    const currentSlideEl = slidesRef.current[currentSlide]
    const nextSlideEl = slidesRef.current[nextIndex]

    if (currentSlideEl && nextSlideEl) {
      if (progressTweenRef.current) progressTweenRef.current.kill()

      const direction = nextIndex > currentSlide ? 1 : -1
      const tl = gsap.timeline({
        onComplete: () => {
          setIsAnimating(false)
          setCurrentSlide(nextIndex)
        }
      })

      if (progressRef.current) {
        tl.to(progressRef.current, { scaleX: 0, duration: 0.2, ease: "power2.in" }, 0)
      }

      tl.to(currentSlideEl, {
        opacity: 0,
        scale: 1.06,
        x: -60 * direction,
        duration: 0.9,
        ease: "power3.inOut",
      }, 0)

      tl.fromTo(
        nextSlideEl,
        { opacity: 0, scale: 1.12, x: 60 * direction },
        { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: "power3.inOut" },
        0.1
      )

      // Animate label change
      if (labelRef.current) {
        tl.to(labelRef.current, { opacity: 0, y: -8, duration: 0.25 }, 0)
        tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.6)
      }
    }
  }, [currentSlide, isAnimating])

  const nextSlide = useCallback(() => {
    animateToSlide((currentSlide + 1) % sliderImages.length)
  }, [currentSlide, animateToSlide])

  const prevSlide = useCallback(() => {
    animateToSlide((currentSlide - 1 + sliderImages.length) % sliderImages.length)
  }, [currentSlide, animateToSlide])

  // Entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .fromTo(highlightsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(statsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
    })
    return () => ctx.revert()
  }, [])

  // Initialize slides
  useEffect(() => {
    slidesRef.current.forEach((slide, index) => {
      if (slide) {
        gsap.set(slide, { opacity: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 1.12, x: 0 })
      }
    })
  }, [])

  // Auto-advance
  useEffect(() => {
    if (isAnimating) return
    if (progressRef.current) {
      progressTweenRef.current = gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 5, ease: "none" }
      )
    }
    intervalRef.current = setInterval(nextSlide, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (progressTweenRef.current) progressTweenRef.current.kill()
    }
  }, [currentSlide, isAnimating, nextSlide])

  const goToSlide = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    animateToSlide(index)
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        :root {
          --hero-accent: #1B4FD8;
          --hero-accent-light: #3B6FF0;
          --hero-primary: #060C1A;
          --hero-border: rgba(255,255,255,0.10);
          --hero-glass: rgba(255,255,255,0.04);
          --hero-text: #F0EDE8;
          --hero-muted: rgba(240,237,232,0.55);
        }

        .hero-display { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.02em; }
        .hero-body { font-family: 'DM Sans', sans-serif; }

        @keyframes ticker-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .ticker-bar { animation: ticker-progress 5s linear forwards; }

        .scan-line {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.03) 2px,
            rgba(0,0,0,0.03) 4px
          );
        }

        .diagonal-clip {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 92% 100%, 0 100%);
        }

        .stat-card {
          background: var(--hero-glass);
          border: 1px solid var(--hero-border);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .stat-card:hover {
          background: rgba(255,255,255,0.07);

          transition: all 0.3s ease;
        }

        .nav-btn {
          background: rgba(10,15,30,0.5);
          border: 1px solid var(--hero-border);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.25s ease;
        }

        .nav-btn:hover {
          background: rgba(27,79,216,0.18);
          border-color: rgba(27,79,216,0.55);
        }

        .thumb-btn {
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .route-tag {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          letter-spacing: 0.15em;
          font-size: 10px;
          text-transform: uppercase;
        }

        .vertical-label {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }

        .corner-bracket::before,
        .corner-bracket::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
        }
        .corner-bracket::before {
          top: 0; left: 0;
          border-top: 1px solid rgba(27,79,216,0.8);
          border-left: 1px solid rgba(27,79,216,0.8);
        }
        .corner-bracket::after {
          bottom: 0; right: 0;
          border-bottom: 1px solid rgba(27,79,216,0.8);
          border-right: 1px solid rgba(27,79,216,0.8);
        }

        .cta-primary {
          background: var(--hero-accent);
          color: #ffffff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
        }
        .cta-primary:hover {
          background: #1a5ed4;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(27,79,216,0.45);
        }

        .cta-secondary {
          border: 1px solid var(--hero-border);
          color: var(--hero-text);
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          background: transparent;
          transition: all 0.25s ease;
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.2);
        }

        .highlight-pill {
          border: 1px solid rgba(27,79,216,0.25);
          background: rgba(27,79,216,0.10);
          backdrop-filter: blur(8px);
        }

        .badge-pulse {
          animation: pulse 2s cubic-bezier(0.4,0,0.6,1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <section
        className="hero-body relative overflow-hidden"
        style={{ minHeight: "100svh", background: "var(--hero-primary)" }}
      >
        {/* Background Slider */}
        <div className="absolute inset-0">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => { slidesRef.current[index] = el }}
              className="absolute inset-0 will-change-transform"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Multi-layer darkening */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(10,15,30,0.97) 0%, rgba(10,15,30,0.88) 45%, rgba(10,15,30,0.55) 100%)" }} />
          {/* Scan lines for industrial feel */}
          <div className="scan-line absolute inset-0 opacity-40" />
          {/* Subtle vignette */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 50%, transparent 30%, rgba(10,15,30,0.6) 100%)" }} />
        </div>

        {/* ── Decorative: vertical accent line left ── */}
        <div className="absolute left-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(27,79,216,0.6) 30%, rgba(27,79,216,0.6) 70%, transparent)" }} />

        {/* ── Decorative: top horizontal rule ── */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(27,79,216,0.6) 0%, transparent 60%)" }} />

        {/* ── Far-right vertical label ── */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 hidden xl:flex items-center gap-3">
          <div className="h-16 w-px" style={{ background: "rgba(27,79,216,0.4)" }} />
          <span className="vertical-label route-tag" style={{ color: "rgba(240,237,232,0.35)" }}>
            UAE · CHINA · ZIMBABWE
          </span>
        </div>

        {/* ── Left Nav Arrow ── */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="nav-btn absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full disabled:opacity-40 lg:left-8"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" style={{ color: "var(--hero-text)" }} />
        </button>

        {/* ── Right Nav Arrow ── */}
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="nav-btn absolute right-16 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full disabled:opacity-40 lg:right-24"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" style={{ color: "var(--hero-text)" }} />
        </button>

        {/* ── Slide counter (top-right) ── */}
        <div className="absolute top-28 right-16 z-20 hidden lg:flex items-center gap-3 lg:right-24">
          <div className="h-px w-8" style={{ background: "rgba(27,79,216,0.6)" }} />
          <span className="route-tag" style={{ color: "var(--hero-muted)" }}>
            <span className="hero-display text-xl" style={{ color: "var(--hero-accent)" }}>
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            {" "}/ {String(sliderImages.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Desktop thumbnail strip ── */}
        <div className="absolute bottom-10 right-16 z-20 hidden items-end gap-2.5 lg:flex lg:right-24">
          {sliderImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`thumb-btn group relative overflow-hidden rounded-lg ${
                currentSlide === index
                  ? "h-[88px] w-32 ring-1 ring-offset-2"
                  : "h-16 w-24 opacity-50 hover:opacity-80"
              }`}
              style={currentSlide === index ? { outline: "1.5px solid var(--hero-accent)", outlineOffset: "2px" } : {}}
              aria-label={`Go to slide ${index + 1}: ${image.label}`}
            >
              {currentSlide === index && (
                <div
                  className="absolute inset-0 z-10 rounded-lg"
                  style={{ boxShadow: "inset 0 0 0 1.5px rgba(27,79,216,0.85)" }}
                />
              )}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,15,30,0.85) 0%, rgba(10,15,30,0.25) 100%)" }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <span className="route-tag block" style={{ color: currentSlide === index ? "var(--hero-accent)" : "var(--hero-muted)" }}>
                  {image.tag}
                </span>
                {currentSlide === index && (
                  <span className="block text-xs font-medium mt-0.5 truncate" style={{ color: "var(--hero-text)", fontFamily: "'DM Sans', sans-serif" }}>
                    {image.label}
                  </span>
                )}
              </div>
              {/* Progress bar on active thumbnail */}
              {currentSlide === index && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <div
                    ref={progressRef}
                    className="h-full origin-left"
                    style={{ background: "var(--hero-accent)", transform: "scaleX(0)" }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* ── Mobile dots ── */}
        <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 lg:hidden">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className="relative overflow-hidden rounded-full transition-all duration-300"
              style={{
                height: "3px",
                width: currentSlide === index ? "36px" : "8px",
                background: currentSlide === index ? "rgba(27,79,216,0.35)" : "rgba(255,255,255,0.25)",
              }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {currentSlide === index && (
                <div
                  className="ticker-bar absolute inset-0 origin-left"
                  style={{ background: "var(--hero-accent)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── MAIN CONTENT ── */}
        <div
          className="container relative mx-auto flex flex-col justify-center px-6 lg:px-16"
          style={{ minHeight: "100svh", paddingTop: "8rem", paddingBottom: "8rem" }}
        >
          <div className="max-w-2xl xl:max-w-3xl">

            {/* Badge */}
            <div
              ref={badgeRef}
              style={{ opacity: 0 }}
              className="mb-7 inline-flex items-center gap-2.5"
            >
              <div
                className="highlight-pill flex items-center gap-2 rounded-full px-4 py-1.5"
              >
                <span className="badge-pulse h-1.5 w-1.5 rounded-full" style={{ background: "var(--hero-accent)" }} />
                <span className="route-tag" style={{ color: "var(--hero-accent)" }}>
                  Reliable Freight Solutions
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="hero-display mb-6 leading-none"
              style={{ opacity: 0, fontSize: "clamp(3.5rem, 8vw, 7rem)", color: "var(--hero-text)" }}
            >
              Your Cargo,{" "}
              <span style={{ color: "var(--hero-accent)" }}>Our</span>
              <br />
              Commitment.{" "}
              <span
                className="relative inline-block"
                style={{
                  color: "var(--hero-text)",
                  WebkitTextStroke: "1px rgba(27,79,216,0.45)",
                }}
              >
                Delivered.
              </span>
            </h1>

            {/* Subheading */}
            <p
              ref={subRef}
              className="mb-9 leading-relaxed"
              style={{
                opacity: 0,
                maxWidth: "540px",
                fontSize: "1.05rem",
                color: "var(--hero-muted)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
              }}
            >
              From UAE & China to Zimbabwe — we provide fast, secure, and cost-effective freight solutions.
              Trusted sourcing, professional handling, and door-to-door delivery you can count on.
            </p>

            {/* Highlights */}
            <div
              ref={highlightsRef}
              className="mb-10 flex flex-wrap gap-3"
              style={{ opacity: 0 }}
            >
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full px-4 py-2"
                  style={{
                    border: "1px solid rgba(27,79,216,0.22)",
                    background: "rgba(27,79,216,0.07)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" style={{ color: "var(--hero-accent)" }} />
                  <span className="text-sm font-medium" style={{ color: "rgba(240,237,232,0.85)" }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col gap-3 sm:flex-row"
              style={{ opacity: 0 }}
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-primary inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/services"
                className="cta-secondary inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm"
              >
                Explore Our Services
              </a>
            </div>

            {/* Current slide label — mobile/mid */}
            <div className="mt-10 flex items-center gap-3 lg:hidden">
              <div className="h-px w-6" style={{ background: "rgba(27,79,216,0.5)" }} />
              <span ref={labelRef} className="route-tag" style={{ color: "var(--hero-muted)" }}>
                {sliderImages[currentSlide].label}
              </span>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div
            ref={statsRef}
            className="mt-20 grid grid-cols-2 gap-3 md:grid-cols-4"
            style={{ opacity: 0 }}
          >
            {[
              { value: "10+", label: "Years Experience" },
              { value: "500+", label: "Shipments Monthly" },
              { value: "99%", label: "On-Time Delivery" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="stat-card relative rounded-2xl p-5 lg:p-6"
              >
                {/* Corner bracket accent on first card */}
                {i === 0 && <div className="corner-bracket absolute inset-2" />}
                <div
                  className="hero-display mb-1"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "var(--hero-accent)", lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs font-medium"
                  style={{ color: "var(--hero-muted)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, var(--background, #fff) 0%, transparent 100%)" }}
        />
      </section>
    </>
  )
}