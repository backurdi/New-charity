"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-white flex justify-center">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2 gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">HopeHarbor</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm hover:text-orange transition-colors"
            >
              Home
            </Link>
            <Link
              href="/campaigns"
              className="text-sm hover:text-orange transition-colors"
            >
              Campaigns
            </Link>
            <Link
              href="/about"
              className="text-sm hover:text-orange transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm hover:text-orange transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-white hover:text-orange">
            Sign In
          </Button>
          <Button className="bg-secondary hover:bg-secondary/90 text-primary">
            Donate Now
          </Button>
        </div>
      </div>
    </header>
  );
}
