import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[400px]">
        <Image
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3"
          alt="Team working together"
          fill
          className="object-cover brightness-50"
        />
        <div className="container relative z-10 h-full flex items-center">
          <h1 className="text-4xl font-bold text-white">About HopeHarbor</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-6">
                At HopeHarbor, we believe in the power of collective action to
                create lasting positive change. Our mission is to connect
                generous hearts with meaningful causes, making it easier for
                people to contribute to the betterment of our world.
              </p>
              <Button asChild>
                <Link href="/campaigns">View Our Campaigns</Link>
              </Button>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3"
                alt="People helping people"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background-two w-full">
        <div>
          <div className="container">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value) => (
                <div key={value.title} className="text-center">
                  <div className="mb-4">
                    <value.icon className="h-12 w-12 mx-auto text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative h-48 w-48 mx-auto mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { Heart, Shield, Users } from "lucide-react";

const values = [
  {
    title: "Compassion",
    description:
      "We believe in treating everyone with kindness and understanding, recognizing the dignity in every person we serve.",
    icon: Heart,
  },
  {
    title: "Transparency",
    description:
      "We maintain complete openness about our operations and use of funds, ensuring trust with our donors and beneficiaries.",
    icon: Shield,
  },
  {
    title: "Community",
    description:
      "We foster a sense of belonging and collaboration, working together to create positive change in the world.",
    icon: Users,
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Executive Director",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3",
  },
  {
    name: "Michael Chen",
    role: "Operations Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3",
  },
  {
    name: "Emily Rodriguez",
    role: "Program Manager",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
  },
  {
    name: "David Kim",
    role: "Community Outreach",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3",
  },
];
