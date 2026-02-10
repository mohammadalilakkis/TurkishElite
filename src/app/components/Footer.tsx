import { Facebook, Instagram, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl text-white mb-4">
              <span className="font-serif italic">Turkish</span>
              <span className="text-red-600">Elite</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Your trusted partner for luxury tourism and world-class medical services in Turkey.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="hover:text-red-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#tourist" className="hover:text-red-500 transition-colors">
                  Tourist Tours
                </a>
              </li>
              <li>
                <a href="#medical" className="hover:text-red-500 transition-colors">
                  Medical Tourism
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:text-red-500 transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-red-500 transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-lg mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Luxury Tours
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Dental Care
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Hair Transplant
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Cosmetic Surgery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors">
                  Wellness Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-lg mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive offers and travel tips.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-amber-500"
              />
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} TurkishElite. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-red-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-red-500 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}