import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Utensils,
  ShoppingBag,
  Wrench,
  Heart,
  GraduationCap,
  Car,
  Home,
  Briefcase,
  Palette,
  Dumbbell,
  Coffee,
  Scissors,
} from "lucide-react";

export function CategoriesSection() {
  const categories = [
    { icon: Utensils, name: "Restaurants", count: "2,450" },
    { icon: ShoppingBag, name: "Shopping", count: "1,890" },
    { icon: Wrench, name: "Home Services", count: "3,200" },
    { icon: Heart, name: "Health & Medical", count: "1,650" },
    { icon: GraduationCap, name: "Education", count: "890" },
    { icon: Car, name: "Automotive", count: "1,200" },
    { icon: Home, name: "Real Estate", count: "750" },
    { icon: Briefcase, name: "Professional", count: "2,100" },
    { icon: Palette, name: "Arts & Culture", count: "650" },
    { icon: Dumbbell, name: "Fitness", count: "980" },
    { icon: Coffee, name: "Cafes & Bars", count: "1,450" },
    { icon: Scissors, name: "Beauty & Spa", count: "1,100" },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Explore by category
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Browse through our comprehensive categories to find exactly what you
            are looking for.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="border-border hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 group-hover:bg-primary/20 rounded-full mb-4 transition-colors">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">
                  {category.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {category.count} listings
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Categories
          </Button>
        </div>
      </div>
    </section>
  );
}
