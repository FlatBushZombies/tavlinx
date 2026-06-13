import { HeroSection } from "@/components/home/hero-section"
import { ServicesOverview } from "@/components/home/services-overview"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { ProcessSection } from "@/components/home/process-section"
import { StatsSection } from "@/components/home/stats-section"
import { CTASection } from "@/components/home/cta-section"
import { PromoPopup } from "@/components/home/promo-popup"
import { SocialWall } from "@/components/socialwall"
import { FloatingWhatsAppGroup } from '@/components/whatsapp/floating-group'

export default function HomePage() {
  return (
    <>
      <PromoPopup />
      <FloatingWhatsAppGroup />
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUs />
      <ProcessSection />
      <StatsSection />
      <SocialWall />
      <CTASection />
    </>
  )
}
