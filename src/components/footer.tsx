import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#FFF8F8] w-full">
      <div className="container mx-auto px-4 py-8">
        {/* Top Section with Contact Info and Newsletter */}
        <div className="flex flex-wrap justify-between items-center py-6 border-b">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <MapPin className="text-orange h-6 w-6" />
              <div>
                <p className="text-sm font-semibold">Full Address</p>
                <p className="text-gray-600">
                  4517 Washington Ave. Manchester, Kentucky 39495
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-orange h-6 w-6" />
              <div>
                <p className="text-sm font-semibold">Number Phone</p>
                <p className="text-gray-600">(603) 555-0123 (603) 555-0234</p>
              </div>
            </div>
          </div>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="px-4 py-2 rounded-l-full bg-white"
            />
            <button className="bg-orange text-white px-6 py-2 rounded-r-full hover:bg-orange/90">
              Submit →
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-6 gap-8 py-12">
          {/* Logo and Description */}
          <div className="col-span-2">
            <Link href="/" className="text-2xl font-bold text-green-800">
              Humanty
            </Link>
            <p className="mt-4 text-gray-600">
              Humanty is a Charity community that aims to break the chain of
              world hunger
            </p>
          </div>

          {/* Navigation Columns */}
          <div>
            <h3 className="font-semibold mb-4">General</h3>
            <ul className="space-y-2">
              {["Home", "Donate", "Service", "Blog", "Contact", "About"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Work</h3>
            <ul className="space-y-2">
              {[
                "Supply Chain",
                "Food assistance",
                "System Nutrion",
                "Education",
                "Training",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Service</h3>
            <ul className="space-y-2">
              {[
                "Stories",
                "News Releases",
                "Videos",
                "Premium Building",
                "Careers",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {["FAQ", "Call Center", "Partner", "Newsletter"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center py-6 text-gray-600 text-sm">
          Humanty © 2021-2022, All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
