'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-white px-8">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">HopeHarbor</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-sm hover:text-orange transition-colors">
              Home
            </Link>
            <Link href="/campaigns" className="text-sm hover:text-orange transition-colors">
              Campaigns
            </Link>
            <Link href="/about" className="text-sm hover:text-orange transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm hover:text-orange transition-colors">
              Contact
            </Link>
          </nav>
          <Button className="bg-secondary hover:bg-secondary/90 text-primary">Donate Now</Button>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            className="text-white hover:bg-primary-dark"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          'md:hidden fixed left-0 right-0 top-16 bg-primary border-t border-primary-dark transition-all duration-300 ease-in-out z-40',
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full invisible',
        )}
      >
        <div className="container py-4 flex flex-col space-y-4 px-8">
          <Link
            href="/"
            className="text-sm hover:text-orange transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/campaigns"
            className="text-sm hover:text-orange transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Campaigns
          </Link>
          <Link
            href="/about"
            className="text-sm hover:text-orange transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm hover:text-orange transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Button className="bg-secondary hover:bg-secondary/90 text-primary w-full">
            Donate Now
          </Button>
        </div>
      </div>
    </header>
  )
}
