import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-background to-muted/30">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/abstract-minimal-geometric-pattern.png')] opacity-5 bg-cover bg-center" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance">
          Discover exceptional businesses in your area
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto text-pretty">
          Connect with trusted local businesses, read authentic reviews, and
          find exactly what you need in our comprehensive directory.
        </p>

        {/* Search Form */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="What are you looking for?"
                className="pl-10 h-12 text-base"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input placeholder="Location" className="pl-10 h-12 text-base" />
            </div>
            <Button size="lg" className="h-12 px-8">
              Search
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              25K+
            </div>
            <div className="text-muted-foreground">Businesses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              150K+
            </div>
            <div className="text-muted-foreground">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              500+
            </div>
            <div className="text-muted-foreground">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              50+
            </div>
            <div className="text-muted-foreground">Cities</div>
          </div>
        </div>
      </div>
    </section>
  );
}
