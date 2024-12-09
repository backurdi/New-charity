import { Heart, Circle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  stats: {
    supporters: number;
    revenue: number;
    goal: number;
  };
  progressColor: string;
  bgColor: string;
}

const campaigns: Campaign[] = [
  {
    id: "africa-food-aid",
    title: "Help Africa to get basic food aid and education",
    description:
      "Since 2008 we have always been looking for nature and relying on rivers to get drinking water...",
    image: "/placeholder.jpg",
    stats: {
      supporters: 37935,
      revenue: 52028,
      goal: 75000,
    },
    progressColor: "bg-orange",
    bgColor: "bg-[#ffebbd]",
  },
  {
    id: "african-education",
    title: "Help brothers in African countries to help other education",
    description:
      "Since 2008 we have always been looking for nature and relying on rivers to get drinking water...",
    image: "/placeholder.jpg",
    stats: {
      supporters: 40000,
      revenue: 15731,
      goal: 50000,
    },
    progressColor: "bg-green-600",
    bgColor: "bg-[#ffbded]",
  },
  {
    id: "clothes-donation",
    title: "Donate your used clothes to those in need",
    description:
      "Since 2008 we have always been looking for nature and relying on rivers to get drinking water...",
    image: "/placeholder.jpg",
    stats: {
      supporters: 25034,
      revenue: 20531,
      goal: 50000,
    },
    progressColor: "bg-purple-600",
    bgColor: "bg-[#cabdff]",
  },
  {
    id: "education-support",
    title: "Help brothers in African countries to help other education",
    description:
      "Since 2008 we have always been looking for nature and relying on rivers to get drinking water...",
    image: "/placeholder.jpg",
    stats: {
      supporters: 40000,
      revenue: 15731,
      goal: 50000,
    },
    progressColor: "bg-green-600",
    bgColor: "bg-[#ffd1bd]",
  },
];

// Export campaigns for use in other components
export { campaigns };

// Generate static params for all campaign pages
export function generateStaticParams() {
  return campaigns.map((campaign) => ({
    id: campaign.id,
  }));
}

export default function CampaignsPage() {
  return (
    <div className="bg-background-two min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Our Campaigns</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us in making a difference. Browse through our active campaigns
            and help us create positive change in communities around the world.
          </p>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <Link
              href={`/campaigns/${campaign.id}`}
              key={campaign.id}
              className={`rounded-3xl overflow-hidden ${campaign.bgColor} transition-transform hover:scale-105`}
            >
              <div className="relative h-48">
                <Image
                  src={campaign.image}
                  alt={campaign.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{campaign.title}</h3>
                <p className="text-gray-600 text-sm">{campaign.description}</p>

                {/* Progress Bar */}
                <div className={`h-2 rounded-full ${campaign.progressColor}`} />

                {/* Stats */}
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

                {/* Donate Button */}
                <button className="w-full bg-orange text-white py-3 rounded-full hover:bg-orange/90 transition-colors">
                  Donate Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
