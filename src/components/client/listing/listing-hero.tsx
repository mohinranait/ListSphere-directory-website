import {
  MapPin,
  Star,
  Phone,
  Mail,
  Heart,
  Send,
  Flag,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function ListingHero() {
  return (
    <div className="relative h-[400px] md:h-[500px] 2xl:h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/luxury-resort-interior-with-modern-furniture-and-w.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Social Share Buttons - Left Side */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 z-10">
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full bg-white/90 hover:bg-white"
        >
          <Share2 className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="rounded-full bg-white/90 hover:bg-white"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-8 md:pb-12">
        <div className="text-white space-y-3 md:space-y-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            Saybrook Point Resort & Marina
          </h1>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Landson, UK</span>
            </div>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="ml-1">(2 Reviews)</span>
            </div>

            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>(849) 392-5000</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
            <Button
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white text-foreground"
            >
              <Heart className="h-4 w-4 mr-2" />
              Add to Wishlist
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white text-foreground"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white text-foreground"
            >
              <Flag className="h-4 w-4 mr-2" />
              Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
