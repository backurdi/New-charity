import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="w-full bg-primary flex justify-center">
      <div className="max-w-[1440px] mx-auto">
        <section className="text-white py-16 h-[calc(100vh-64px)] mb-12">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-7xl font-bold mb-4">
                Small changes do change the future better.
              </h1>
              <p className="mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nulla pariatur..
              </p>
              <Button className="bg-secondary hover:bg-secondary/90 text-primary w-fit">
                Donate Now
              </Button>
            </div>
            <div className="relative h-[300px]">
              <Image
                src="/placeholder.jpg"
                alt="Hero image"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="container mt-32">
            <div className="flex flex-col justify-between gap-4 text-sm opacity-80">
              <span>Trusted by users in 150+ countries</span>
              <div className="flex gap-8">
                {[...Array(6)].map((_, i) => (
                  <Image
                    key={i}
                    src="/placeholder.jpg"
                    alt="Partner"
                    width={80}
                    height={20}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
