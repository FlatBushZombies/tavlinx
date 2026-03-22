"use client"

import Image from "next/image"
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState, useCallback } from "react"
import { gsap } from "gsap"

const WHATSAPP_LINK = "https://wa.me/971559933478"

const highlights = ["Trusted Suppliers", "Safe Handling", "Fast Delivery"]

const sliderImages = [
  {
    src: "/tavlinx-plane.jpg",
    alt: "Cargo ship and freight containers at port",
    label: "Sea Freight",
    tag: "01",
  },
  {
    src: "/air-freight.jpg",
    alt: "Cargo airplane loading freight",
    label: "Air Freight",
    tag: "02",
  },
  {
    src: "/pick-up.jpg",
    alt: "Container ship at sea during sunset",
    label: "Global Shipping",
    tag: "03",
  },
  {
    src: "/door-to-door.jpg",
    alt: "Warehouse with stacked cargo",
    label: "Warehousing",
    tag: "04",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating]   = useState(false)

  const slidesRef        = useRef<(HTMLDivElement | null)[]>([])
  const progressRef      = useRef<HTMLDivElement>(null)
  const intervalRef      = useRef<NodeJS.Timeout | null>(null)
  const progressTweenRef = useRef<gsap.core.Tween | null>(null)
  const headingRef       = useRef<HTMLHeadingElement>(null)
  const subRef           = useRef<HTMLParagraphElement>(null)
  const badgeRef         = useRef<HTMLDivElement>(null)
  const highlightsRef    = useRef<HTMLDivElement>(null)
  const ctaRef           = useRef<HTMLDivElement>(null)
  const statsRef         = useRef<HTMLDivElement>(null)
  const labelRef         = useRef<HTMLSpanElement>(null)

  const animateToSlide = useCallback(
    (nextIndex: number) => {
      if (isAnimating || nextIndex === currentSlide) return
      setIsAnimating(true)

      const currentSlideEl = slidesRef.current[currentSlide]
      const nextSlideEl    = slidesRef.current[nextIndex]

      if (currentSlideEl && nextSlideEl) {
        if (progressTweenRef.current) progressTweenRef.current.kill()

        const direction = nextIndex > currentSlide ? 1 : -1
        const tl = gsap.timeline({
          onComplete: () => { setIsAnimating(false); setCurrentSlide(nextIndex) },
        })

        if (progressRef.current)
          tl.to(progressRef.current, { scaleX: 0, duration: 0.2, ease: "power2.in" }, 0)

        tl.to(currentSlideEl,
          { opacity: 0, scale: 1.06, x: -60 * direction, duration: 0.9, ease: "power3.inOut" }, 0)
        tl.fromTo(nextSlideEl,
          { opacity: 0, scale: 1.12, x: 60 * direction },
          { opacity: 1, scale: 1,    x: 0,              duration: 0.9, ease: "power3.inOut" }, 0.1)

        if (labelRef.current) {
          tl.to(labelRef.current, { opacity: 0, y: -8, duration: 0.25 }, 0)
          tl.to(labelRef.current, { opacity: 1, y:  0, duration: 0.25 }, 0.6)
        }
      }
    },
    [currentSlide, isAnimating],
  )

  const nextSlide = useCallback(
    () => animateToSlide((currentSlide + 1) % sliderImages.length),
    [currentSlide, animateToSlide],
  )
  const prevSlide = useCallback(
    () => animateToSlide((currentSlide - 1 + sliderImages.length) % sliderImages.length),
    [currentSlide, animateToSlide],
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })
      tl.fromTo(badgeRef.current,      { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
        .fromTo(headingRef.current,    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .fromTo(subRef.current,        { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .fromTo(highlightsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(ctaRef.current,        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(statsRef.current,      { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.3")
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    slidesRef.current.forEach((slide, i) => {
      if (slide) gsap.set(slide, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.12, x: 0 })
    })
  }, [])

  useEffect(() => {
    if (isAnimating) return
    if (progressRef.current)
      progressTweenRef.current = gsap.fromTo(
        progressRef.current, { scaleX: 0 }, { scaleX: 1, duration: 5, ease: "none" })
    intervalRef.current = setInterval(nextSlide, 5000)
    return () => {
      if (intervalRef.current)      clearInterval(intervalRef.current)
      if (progressTweenRef.current) progressTweenRef.current.kill()
    }
  }, [currentSlide, isAnimating, nextSlide])

  const goToSlide = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    animateToSlide(index)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        .h-scan-line {
          background: repeating-linear-gradient(
            0deg,
            transparent, transparent 2px,
            rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px
          );
        }

        .h-corner-bracket::before,
        .h-corner-bracket::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
        }
        .h-corner-bracket::before {
          top: 0; left: 0;
          border-top:  1px solid rgba(27,79,216,0.8);
          border-left: 1px solid rgba(27,79,216,0.8);
        }
        .h-corner-bracket::after {
          bottom: 0; right: 0;
          border-bottom: 1px solid rgba(27,79,216,0.8);
          border-right:  1px solid rgba(27,79,216,0.8);
        }

        @keyframes h-ticker {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .h-ticker-bar { animation: h-ticker 5s linear forwards; }

        .h-cta-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
        }
      `}</style>

      {/* ═══════════════════════════ SECTION ═══════════════════════════ */}
      <section className="relative overflow-hidden min-h-svh bg-[#060C1A] font-['DM_Sans',sans-serif]">

        {/* ── Background slider — fully visible across entire viewport ── */}
        <div className="absolute inset-0">
          {sliderImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => { slidesRef.current[index] = el }}
              className="absolute inset-0 will-change-transform"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <Image src={image.src} alt={image.alt} fill className="object-cover" priority={index === 0} />
            </div>
          ))}

          {/* Uniform dark tint — no directional gradient, image visible everywhere */}
          <div className="absolute inset-0" style={{ background: "rgba(6,12,26,0.48)" }} />

          {/* Scan lines */}
          <div className="h-scan-line absolute inset-0 opacity-30" />

          {/* Soft vignette on edges only — does not black out the center or left */}
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(6,12,26,0.35) 100%)"
          }} />
        </div>

        {/* ── Left vertical accent ── */}
        <div className="absolute left-0 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom,transparent,rgba(27,79,216,0.6) 30%,rgba(27,79,216,0.6) 70%,transparent)" }} />

        {/* ── Top horizontal rule ── */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right,rgba(27,79,216,0.6) 0%,transparent 60%)" }} />

        {/* ── Far-right vertical label ── */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 hidden xl:flex items-center gap-3">
          <div className="h-16 w-px bg-[rgba(27,79,216,0.4)]" />
          <span className="
            font-['DM_Sans',sans-serif] font-light tracking-[0.15em] text-[10px] uppercase
            text-[rgba(240,237,232,0.35)]
            [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180
          ">
            UAE · CHINA · ZIMBABWE
          </span>
        </div>

        {/* ── Left nav arrow ── */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          aria-label="Previous slide"
          className="
            absolute left-4 lg:left-8 top-1/2 z-20 -translate-y-1/2
            flex h-11 w-11 items-center justify-center rounded-full
            bg-[rgba(10,15,30,0.5)] border border-white/10 backdrop-blur-[8px]
            hover:bg-[rgba(27,79,216,0.18)] hover:border-[rgba(27,79,216,0.55)]
            transition-all duration-[250ms] disabled:opacity-40
          "
        >
          <ChevronLeft className="h-5 w-5 text-[#F0EDE8]" />
        </button>

        {/* ── Right nav arrow ── */}
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          aria-label="Next slide"
          className="
            absolute right-16 lg:right-24 top-1/2 z-20 -translate-y-1/2
            flex h-11 w-11 items-center justify-center rounded-full
            bg-[rgba(10,15,30,0.5)] border border-white/10 backdrop-blur-[8px]
            hover:bg-[rgba(27,79,216,0.18)] hover:border-[rgba(27,79,216,0.55)]
            transition-all duration-[250ms] disabled:opacity-40
          "
        >
          <ChevronRight className="h-5 w-5 text-[#F0EDE8]" />
        </button>

        {/* ── Slide counter (desktop) ── */}
        <div className="absolute top-28 right-16 lg:right-24 z-20 hidden lg:flex items-center gap-3">
          <div className="h-px w-8 bg-[rgba(27,79,216,0.6)]" />
          <span className="font-['DM_Sans',sans-serif] font-light tracking-[0.15em] text-[10px] uppercase text-[rgba(240,237,232,0.55)]">
            <span className="font-['Bebas_Neue',sans-serif] tracking-[0.02em] text-xl text-[#1B4FD8]">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            {" "}/ {String(sliderImages.length).padStart(2, "0")}
          </span>
        </div>

        {/* ── Desktop thumbnail strip ── */}
        <div className="absolute bottom-10 right-16 lg:right-24 z-20 hidden lg:flex items-end gap-2.5">
          {sliderImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              aria-label={`Go to slide ${index + 1}: ${image.label}`}
              className={[
                "group relative overflow-hidden rounded-lg transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                currentSlide === index
                  ? "h-[88px] w-32 outline outline-[1.5px] outline-offset-2 outline-[#1B4FD8]"
                  : "h-16 w-24 opacity-50 hover:opacity-80",
              ].join(" ")}
            >
              {currentSlide === index && (
                <div className="absolute inset-0 z-10 rounded-lg shadow-[inset_0_0_0_1.5px_rgba(27,79,216,0.85)]" />
              )}
              <Image
                src={image.src} alt={image.alt} fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top,rgba(10,15,30,0.85) 0%,rgba(10,15,30,0.25) 100%)" }} />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <span className={[
                  "font-['DM_Sans',sans-serif] font-light tracking-[0.15em] text-[10px] uppercase block",
                  currentSlide === index ? "text-[#1B4FD8]" : "text-[rgba(240,237,232,0.55)]",
                ].join(" ")}>
                  {image.tag}
                </span>
                {currentSlide === index && (
                  <span className="block text-xs font-medium mt-0.5 truncate text-[#F0EDE8] font-['DM_Sans',sans-serif]">
                    {image.label}
                  </span>
                )}
              </div>
              {currentSlide === index && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                  <div
                    ref={progressRef}
                    className="h-full origin-left bg-[#1B4FD8]"
                    style={{ transform: "scaleX(0)" }}
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
              aria-label={`Go to slide ${index + 1}`}
              className="relative overflow-hidden rounded-full transition-all duration-300"
              style={{
                height: "3px",
                width: currentSlide === index ? "36px" : "8px",
                background: currentSlide === index ? "rgba(27,79,216,0.35)" : "rgba(255,255,255,0.25)",
              }}
            >
              {currentSlide === index && (
                <div className="h-ticker-bar absolute inset-0 origin-left bg-[#1B4FD8]" />
              )}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════ MAIN CONTENT ═══════════════════════════ */}
        <div className="container relative mx-auto flex flex-col justify-center px-6 lg:px-16 min-h-svh pt-32 pb-32">
          <div className="max-w-2xl xl:max-w-3xl">

            {/* Badge */}
            <div ref={badgeRef} className="mb-7 inline-flex items-center gap-2.5" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 rounded-full px-4 py-1.5 border border-[rgba(27,79,216,0.25)] bg-[rgba(6,12,26,0.5)] backdrop-blur-[10px]">
                <span className="animate-pulse h-1.5 w-1.5 rounded-full bg-[#1B4FD8]" />
                <span className="font-['DM_Sans',sans-serif] font-light tracking-[0.15em] text-[10px] uppercase text-white">
                  Reliable Freight Solutions
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="font-['Bebas_Neue',sans-serif] tracking-[0.02em] mb-6 leading-none text-[#F0EDE8]"
              style={{
                opacity: 0,
                fontSize: "clamp(3.5rem,8vw,7rem)",
                textShadow: "0 2px 20px rgba(0,0,0,0.7), 0 4px 40px rgba(0,0,0,0.4)",
              }}
            >
              Your Cargo,{" "}
              <span className="text-[#1B4FD8]">Our</span>
              <br />
              Commitment.{" "}
              <span
                className="relative inline-block text-[#F0EDE8]"
                style={{ WebkitTextStroke: "1px rgba(27,79,216,0.45)" }}
              >
                Delivered.
              </span>
            </h1>

            {/* Subheading */}
            <p
              ref={subRef}
              className="font-['DM_Sans',sans-serif] font-light mb-9 leading-relaxed text-[rgba(240,237,232,0.9)]"
              style={{
                opacity: 0,
                maxWidth: "540px",
                fontSize: "1.05rem",
                textShadow: "0 1px 12px rgba(0,0,0,0.8)",
              }}
            >
              From UAE &amp; China to Zimbabwe — we provide fast, secure, and cost-effective freight solutions.
              Trusted sourcing, professional handling, and door-to-door delivery you can count on.
            </p>

            {/* Highlights */}
            <div ref={highlightsRef} className="mb-10 flex flex-wrap gap-3" style={{ opacity: 0 }}>
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-full px-4 py-2 border border-[rgba(27,79,216,0.3)] bg-[rgba(6,12,26,0.52)] backdrop-blur-[10px] font-['DM_Sans',sans-serif]"
                >
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#1B4FD8]" />
                  <span className="text-sm font-medium text-[rgba(240,237,232,0.95)]">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col gap-3 sm:flex-row" style={{ opacity: 0 }}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  h-cta-primary relative overflow-hidden
                  inline-flex items-center justify-center gap-2.5
                  rounded-full px-8 py-4 text-sm
                  bg-[#1B4FD8] text-white
                  font-['DM_Sans',sans-serif] font-semibold tracking-[0.02em]
                  hover:bg-[#1a5ed4] hover:-translate-y-px hover:shadow-[0_8px_30px_rgba(27,79,216,0.45)]
                  transition-all duration-[250ms]
                "
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="/services"
                className="
                  inline-flex items-center justify-center gap-2
                  rounded-full px-8 py-4 text-sm
                  border border-white/15 bg-[rgba(6,12,26,0.4)] backdrop-blur-[8px] text-[#F0EDE8]
                  font-['DM_Sans',sans-serif] font-normal
                  hover:bg-[rgba(6,12,26,0.6)] hover:border-white/25
                  transition-all duration-[250ms]
                "
              >
                Explore Our Services
              </a>
            </div>

            {/* Current slide label – mobile */}
            <div className="mt-10 flex items-center gap-3 lg:hidden">
              <div className="h-px w-6 bg-[rgba(27,79,216,0.5)]" />
              <span
                ref={labelRef}
                className="font-['DM_Sans',sans-serif] font-light tracking-[0.15em] text-[10px] uppercase text-[rgba(240,237,232,0.55)]"
              >
                {sliderImages[currentSlide].label}
              </span>
            </div>
          </div>

          {/* ── Stats Row ── */}
          <div ref={statsRef} className="mt-20 grid grid-cols-2 gap-3 md:grid-cols-4" style={{ opacity: 0 }}>
            {[
              { value: "10+",  label: "Years Experience"  },
              { value: "500+", label: "Shipments Monthly" },
              { value: "99%",  label: "On-Time Delivery"  },
              { value: "24/7", label: "Customer Support"  },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="
                  relative rounded-2xl p-5 lg:p-6
                  bg-[rgba(6,12,26,0.52)] border border-white/10 backdrop-blur-[16px]
                  hover:bg-[rgba(6,12,26,0.68)] transition-all duration-300
                "
              >
                {i === 0 && <div className="h-corner-bracket absolute inset-2" />}
                <div
                  className="font-['Bebas_Neue',sans-serif] tracking-[0.02em] mb-1 leading-none text-[#1B4FD8]"
                  style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)" }}
                >
                  {stat.value}
                </div>
                <div className="font-['DM_Sans',sans-serif] text-xs font-medium tracking-[0.06em] uppercase text-[rgba(240,237,232,0.55)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top,var(--background,#fff) 0%,transparent 100%)" }}
        />
      </section>
    </>
  )
}