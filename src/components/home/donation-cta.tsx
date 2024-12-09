import { Button } from "@/components/ui/button";
import Image from "next/image";

export function DonationCTA() {
  return (
    <div className="w-full bg-background-two">
      <div className="max-w-[1440px] mx-auto">
        <section className="bg-background-two w-full flex justify-center py-20">
          <div className="bg-orange text-white py-12 relative overflow-hidden container rounded-lg h-96">
            <div className="container text-center relative z-10">
              <h2 className="text-2xl font-bold mb-4">
                Donate for people in need!
              </h2>
              <p className="mb-6">
                Join our mission to make a difference in their lives
              </p>
              <Button className="bg-secondary hover:bg-secondary/90 text-primary">
                Donate Now
              </Button>
            </div>
            {/* Decorative leaves */}
            <Image
              src="/placeholder.jpg"
              alt=""
              width={100}
              height={100}
              className="absolute left-0 top-0 opacity-30"
            />
            <Image
              src="/placeholder.jpg"
              alt=""
              width={100}
              height={100}
              className="absolute right-0 bottom-0 opacity-30"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
