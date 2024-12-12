import { HeroSection } from '@/components/home/hero-section'
import { DonationCTA } from '@/components/home/donation-cta'
import { StatsSection } from '@/components/home/stats-section'
import { ProgramsSection } from '@/components/home/programs-section'
import { WelcomeSection } from '@/components/home/welcome-section'
import { CampaignsSection } from '@/components/home/campaigns-section'
import { MissionSection } from '@/components/home/mission-section'
import { FAQSection } from '@/components/home/faq-section'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export default async function Home() {
  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.find({
    collection: 'campaigns',
  })

  console.log(data)

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full">
        <HeroSection />
        <DonationCTA />
        <StatsSection />
        <ProgramsSection />
        <WelcomeSection />
        <CampaignsSection campaigns={data.docs} />
        <MissionSection />
        <FAQSection />
      </div>
    </div>
  )
}
