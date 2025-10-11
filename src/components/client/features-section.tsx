import { Card, CardContent } from "@/components/ui/card";
import { Shield, Star, MapPin, Clock, Users, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Verified Businesses",
      description:
        "All businesses are thoroughly verified to ensure authenticity and quality standards.",
    },
    {
      icon: Star,
      title: "Authentic Reviews",
      description:
        "Read genuine reviews from real customers to make informed decisions.",
    },
    {
      icon: MapPin,
      title: "Local Focus",
      description:
        "Find businesses in your neighborhood with precise location mapping.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description:
        "Get up-to-date information on hours, availability, and services.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Built by the community, for the community with user-generated content.",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Lightning-fast search with intelligent filtering and recommendations.",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Why choose DirectoryPro?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We connect communities with exceptional businesses through trust,
            transparency, and innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border shadow-none hover:shadow transition-shadow duration-300"
            >
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-pretty">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
