import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Globe, ChevronRight } from "lucide-react";

export function ListingSidebar() {
  return (
    <div className="space-y-6 lg:sticky lg:top-6">
      {/* Agent Card */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="text-lg">Agent</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-16 w-16 rounded-full bg-muted flex-shrink-0 overflow-hidden">
              <img
                src="/professional-agent.jpg"
                alt="Peter Smith"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold">Peter Smith</h3>
              <p className="text-sm text-muted-foreground">
                Posted on 05 July, 2021
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 text-primary flex-shrink-0" />
              <span>+1 (112) 234-4507</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="truncate">contact@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="truncate">https://www.hotwebsite.com</span>
            </div>
          </div>

          <Button className="w-full bg-primary hover:bg-primary/90">
            View Profile
          </Button>
        </CardContent>
      </Card>

      {/* Opening Hours */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="text-lg">Opening Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { day: "Monday", hours: "24 Hours Open" },
              { day: "Tuesday", hours: "24 Hours Open" },
              { day: "Wednesday", hours: "24 Hours Open" },
              { day: "Thursday", hours: "24 Hours Open" },
              { day: "Friday", hours: "24 Hours Open" },
              { day: "Saturday", hours: "24 Hours Open" },
              { day: "Sunday", hours: "24 Hours Open" },
            ].map((item) => (
              <div
                key={item.day}
                className="flex justify-between text-sm py-2 border-b last:border-0"
              >
                <span className="text-muted-foreground">{item.day}</span>
                <span className="font-medium">{item.hours}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              "Fitness",
              "Health and Medical",
              "Hotel",
              "Real Estate",
              "Restaurant",
              "Shopping",
            ].map((category) => (
              <button
                key={category}
                className="w-full flex items-center justify-between text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors text-left group"
              >
                <span className="text-primary group-hover:underline">
                  {category}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Locations */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="text-lg">Locations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              "Chicago, USA",
              "Dhaka, Bangladesh",
              "London, UK",
              "NewYork, USA",
              "Paris, France",
              "Tokyo, Japan",
            ].map((location) => (
              <button
                key={location}
                className="w-full flex items-center justify-between text-sm py-2 px-3 rounded-md hover:bg-muted transition-colors text-left group"
              >
                <span className="text-primary group-hover:underline">
                  {location}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
