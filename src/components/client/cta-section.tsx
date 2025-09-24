import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Plus } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Business Owners CTA */}
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/20 rounded-full mb-6">
                <Plus className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                List Your Business
              </h3>
              <p className="text-primary-foreground/80 mb-6 text-pretty">
                Join thousands of successful businesses and reach more customers
                in your area. Get started today with our easy listing process.
              </p>
              <Button variant="secondary" size="lg" className="group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* Customers CTA */}
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-foreground/20 rounded-full mb-6">
                <ArrowRight className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                Find Local Businesses
              </h3>
              <p className="text-primary-foreground/80 mb-6 text-pretty">
                Discover amazing local businesses, read reviews, and connect
                with services that matter to you and your community.
              </p>
              <Button variant="secondary" size="lg" className="group">
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
