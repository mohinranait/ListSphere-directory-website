import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export function ClientFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">DirectoryPro</h3>
            <p className="text-primary-foreground/80 mb-6 text-pretty">
              Connecting communities with exceptional businesses through trust,
              transparency, and innovation.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-primary-foreground/60 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 hover:text-primary-foreground/60 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-primary-foreground/60 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 hover:text-primary-foreground/60 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Featured
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h4 className="font-semibold mb-4">For Businesses</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  List Your Business
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Premium Listings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Business Tools
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Business St, City, State 12345
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-primary-foreground/60" />
                <span className="text-primary-foreground/80 text-sm">
                  hello@directorypro.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 DirectoryPro. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
