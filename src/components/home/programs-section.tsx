import Image from "next/image";
import { Button } from "../ui/button";

interface Program {
  title: string;
  description: string;
  image: string;
}

const programs: Program[] = [
  {
    title: "Education and Feeding Programs",
    description: "Help children get access to education and daily meals.",
    image: "/placeholder.jpg",
  },
  {
    title: "Health & Healthcare",
    description: "Provide medical support to communities in need.",
    image: "/placeholder.jpg",
  },
  {
    title: "Financial Resources",
    description: "Support families with financial assistance.",
    image: "/placeholder.jpg",
  },
  {
    title: "Basic Needs",
    description: "Deliver essential supplies to those in need.",
    image: "/placeholder.jpg",
  },
];

export function ProgramsSection() {
  return (
    <section className="bg-primary text-white py-16 w-full flex justify-center">
      <div className="container">
        <div>
          <h2 className="text-3xl font-bold mb-8">
            Our programs and initiatives
          </h2>
          <p className="mb-8 w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt
          </p>
          <Button className="bg-secondary hover:bg-secondary/90 text-primary w-fit">
            Read more
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="space-y-4">
            {programs.map((program, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-primary/50 rounded-lg"
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{program.title}</h3>
                  <p className="text-sm opacity-80">{program.description}</p>
                </div>
              </div>
            ))}
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
      </div>
    </section>
  );
}
