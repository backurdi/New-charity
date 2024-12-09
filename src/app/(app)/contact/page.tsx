"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[1440px]">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Have questions? We&apos;d love to hear from you. Send us a message
              and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 w-full flex justify-center text-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="space-y-8">
                <h2 className="text-3xl font-bold">Get in touch</h2>
                <p className="text-gray-300">
                  Fill up the form and our team will get back to you within 24
                  hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-orange" />
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-300">+1 (555) 000-0000</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-orange" />
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-300">hello@hopeharbor.org</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-orange" />
                    <div>
                      <h3 className="font-semibold">Office</h3>
                      <p className="text-gray-300">
                        123 Charity Street, Suite 100
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">First Name</label>
                      <Input placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Last Name</label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      placeholder="Your message here..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button className="w-full bg-orange hover:bg-orange/90 text-white">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 w-full flex justify-center">
          <div className="container">
            <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647069693579!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
