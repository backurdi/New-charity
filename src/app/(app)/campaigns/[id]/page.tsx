import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import DonationButton from '@/components/DonationButton'

export default async function Page({ params }: { params: { id: string } }) {
  const payload = await getPayloadHMR({
    config,
  })

  const data = await payload.find({
    collection: 'campaigns',
  })

  const campaign = data.docs.find((c) => c.id === params.id)

  if (!campaign) {
    return <div className="container py-16">Campaign not found</div>
  }

  // Handle the campaign.image type
  const imageUrl =
    typeof campaign.image === 'string' && campaign.image.length
      ? campaign.image
      : '/placeholder.jpg'

  return (
    <div className="flex flex-col bg-background-two w-full">
      <div className="max-w-[1000px] mx-auto">
        <div className="relative h-[400px] rounded-b-3xl">
          <Image
            src={imageUrl}
            alt={campaign.title}
            fill
            className="object-cover brightness-50 rounded-b-3xl"
          />
          <div className="container relative z-10 h-full flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">{campaign.title}</h1>
          </div>
        </div>

        <div className="container py-12 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">About This Campaign</h2>
                <p className="">{campaign.description}</p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Recent Updates</h2>
                {/* <div className="space-y-6">
                {campaign.updates.map((update) => (
                  <div
                    key={update.date}
                    className="border-l-2 border-primary pl-4"
                  >
                    <div className="text-sm t">
                      {update.date}
                    </div>
                    <h3 className="font-semibold mt-1">{update.title}</h3>
                    <p className="t">{update.content}</p>
                  </div>
                ))}
              </div> */}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-lg border p-6 bg-white">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{campaign.stats.goal / campaign.stats.revenue}%</span>
                    </div>
                    <Progress
                      value={campaign.stats.goal / campaign.stats.revenue}
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm t">
                      <span>Raised: ${campaign.stats.revenue.toLocaleString()}</span>
                      <span>Goal: ${campaign.stats.goal.toLocaleString()}</span>
                    </div>
                  </div>
                  <DonationButton campaign={campaign} />
                </div>
              </div>

              <div className="rounded-lg border bg-white p-6">
                <h3 className="font-semibold mb-4">Share This Campaign</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1 text-white">
                    Twitter
                  </Button>
                  <Button variant="outline" className="flex-1 text-white">
                    Facebook
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
