"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0f1f] text-white py-16 md:px-32 relative">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Address Section */}
          <div className="space-y-4">
            <div className="text-[#1d9bf0] text-2xl font-bold mb-6">Arsema</div>
            <div className="space-y-1">
              <p>123 Market St. #22B</p>
              <p>Charlottesville, California</p>
              <p>44635</p>
            </div>
            <div className="space-y-2 mt-6">
              <a
                href="tel:(434)546-4356"
                className="block hover:text-[#1d9bf0] underline"
              >
                (434) 546-4356
              </a>
              <a
                href="mailto:contact@lift.agency"
                className="block hover:text-[#1d9bf0] underline"
              >
                contact@lift.agency
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4 pl-4">
            <h3 className="font-semibold text-lg mb-2">Links</h3>
            <nav>
              <ul className="space-y-2">
                {["About", "Growers", "Merchants", "Partners", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`/${item.toLowerCase()}`}
                        className="text-gray-400 hover:text-gray-300 hover:font-bold transition-all duration-200"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4 pl-4">
            <h3 className="font-semibold text-lg mb-2">Connect</h3>
            <nav>
              <ul className="space-y-2">
                {[
                  { name: "Facebook", url: "#" },
                  { name: "Twitter", url: "#" },
                  { name: "LinkedIn", url: "#" },
                  { name: "Instagram", url: "#" },
                ].map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      className="text-gray-400 hover:text-gray-300 hover:font-bold transition-all duration-200"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 text-sm text-gray-400">
          © 2020 Lift Media. All rights reserved.
        </div>

        {/* Back to Top Button */}
        <Button
          onClick={scrollToTop}
          className="absolute md:right-32 right-4 top-16 bg-[#1d9bf0] hover:bg-[#1a8cd8] rounded-full p-2"
          size="icon"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
}
