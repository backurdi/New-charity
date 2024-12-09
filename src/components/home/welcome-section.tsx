import { Button } from "@/components/ui/button";

export function WelcomeSection() {
  return (
    <section className="bg-orange text-white py-12 w-full">
      <div className="container text-center mx-auto">
        <p>let&apos;s start with the first step</p>
        <h2 className="text-4xl font-bold ">Welcome to humanity Charity</h2>
        <h2 className="text-4xl font-bold mb-8">
          Not-for-profit aid focused organization
        </h2>
        <Button className="bg-secondary hover:bg-secondary/90 text-primary">
          Join to volunteer
        </Button>
      </div>
    </section>
  );
}
