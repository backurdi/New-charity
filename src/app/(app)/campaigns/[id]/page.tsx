import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { campaigns } from "../page";

export function generateStaticParams() {
  return campaigns.map((campaign) => ({
    id: campaign.id,
  }));
}

export default function CampaignPage({ params }: { params: { id: string } }) {
  const campaign = campaigns.find((c) => c.id === params.id);

  if (!campaign) {
    return <div className="container py-16">Campaign not found</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[400px]">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover brightness-50"
        />
        <div className="container relative z-10 h-full flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">{campaign.title}</h1>
        </div>
      </div>

      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                About This Campaign
              </h2>
              <p className="text-muted-foreground">{campaign.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Recent Updates</h2>
              {/* <div className="space-y-6">
                {campaign.updates.map((update) => (
                  <div
                    key={update.date}
                    className="border-l-2 border-primary pl-4"
                  >
                    <div className="text-sm text-muted-foreground">
                      {update.date}
                    </div>
                    <h3 className="font-semibold mt-1">{update.title}</h3>
                    <p className="text-muted-foreground">{update.content}</p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
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
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>
                      Raised: ${campaign.stats.revenue.toLocaleString()}
                    </span>
                    <span>Goal: ${campaign.stats.goal.toLocaleString()}</span>
                  </div>
                </div>
                <Button
                  className="bg-secondary hover:bg-secondary/90 text-primary w-full"
                  size="lg"
                >
                  Donate Now
                </Button>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4">Share This Campaign</h3>
              <div className="flex space-x-4">
                <Button variant="outline" className="flex-1">
                  Twitter
                </Button>
                <Button variant="outline" className="flex-1">
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
