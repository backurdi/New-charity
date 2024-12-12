'use client'

import Image from 'next/image'
import { Heart, Circle, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import { Campaign } from 'payload-types'

interface CampaignsSectionProps {
  campaigns: Campaign[]
}

export function CampaignsSection({ campaigns }: CampaignsSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    skipSnaps: false,
    dragFree: true,
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className="bg-background-two w-full flex justify-center text-black">
      <div className="py-16 w-full">
        <div className="w-[95%] mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <p className="text-orange font-semibold mb-2">OUR COURSES PROGRAMS</p>
              <h2 className="text-4xl font-bold">Donate our courses to people in need</h2>
            </div>
            <div className="flex gap-4">
              <button
                onClick={scrollPrev}
                className="rounded-full border p-4 hover:bg-gray-100 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={scrollNext}
                className="rounded-full border p-4 hover:bg-gray-100 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8">
              {campaigns.map((campaign, index) => (
                <div
                  key={index}
                  className={`flex-[0_0_29%] min-w-0 rounded-3xl overflow-hidden p-4 ${campaign.bgColor}`}
                >
                  <div className="relative h-48">
                    <Image
                      src={
                        typeof campaign.image === 'string' && campaign.image.length
                          ? campaign.image
                          : campaign.image || '/placeholder.jpg'
                      }
                      alt={campaign.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold">{campaign.title}</h3>
                    <p className="text-gray-600 text-sm">{campaign.description}</p>
                    <div className={`h-2 rounded-full ${campaign.progressColor}`} />
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        <span className="font-semibold">
                          {campaign.stats.supporters.toLocaleString()} Support
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-4 w-4" />
                        <span className="font-semibold">
                          ${campaign.stats.revenue.toLocaleString()} Revenue from $
                          {campaign.stats.goal.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
