"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function ClientHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative">
      {/* Top notification bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm">
        <span>
          {"🎯"} Join thousands of businesses in our directory - List your
          business today!
        </span>
      </div>

      {/* Main header */}
      <div className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-foreground">
                DirectoryPro
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Categories
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Featured
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">List Business</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-4 py-4 space-y-4">
              <a href="#" className="block text-foreground font-medium">
                Home
              </a>
              <a href="#" className="block text-muted-foreground">
                Categories
              </a>
              <a href="#" className="block text-muted-foreground">
                Featured
              </a>
              <a href="#" className="block text-muted-foreground">
                About
              </a>
              <a href="#" className="block text-muted-foreground">
                Contact
              </a>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full bg-transparent">
                  Sign In
                </Button>
                <Button className="w-full">List Business</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
