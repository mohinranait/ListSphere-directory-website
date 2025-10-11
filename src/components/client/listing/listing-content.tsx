import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, MapPin, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ListingContent() {
  return (
    <div className="space-y-6">
      {/* Description */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Experience unparalleled luxury at Saybrook Point Resort & Marina,
            where coastal elegance meets modern sophistication. Nestled along
            the pristine waterfront, our resort offers breathtaking views and
            world-class amenities that cater to discerning travelers seeking the
            ultimate retreat.
          </p>
          <p>
            Our meticulously designed accommodations blend contemporary comfort
            with timeless charm, featuring premium furnishings and
            state-of-the-art facilities. Each space is thoughtfully crafted to
            provide an oasis of tranquility, whether you're here for business or
            leisure.
          </p>
          <p>
            Indulge in exceptional dining experiences at our signature
            restaurants, unwind at our full-service spa, or explore the marina
            with our exclusive water activities. From sunrise yoga sessions to
            sunset cocktails, every moment at Saybrook Point is designed to
            create lasting memories.
          </p>
        </CardContent>
      </Card>

      {/* Photos */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Photos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-lg overflow-hidden bg-muted"
              >
                <img
                  src={`/luxury-resort-room-.jpg?height=200&width=300&query=luxury resort room ${i}`}
                  alt={`Property photo ${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Videos */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="relative aspect-video rounded-lg overflow-hidden bg-muted group cursor-pointer"
              >
                <img
                  src={`/resort-video-thumbnail-.jpg?height=200&width=400&query=resort video thumbnail ${i}`}
                  alt={`Video ${i}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play
                      className="h-8 w-8 text-primary ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Map */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Location Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src="/map-with-location-marker.png"
              alt="Location map"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
            <span>2 Bridge St Old Saybrook, CT 06475</span>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Amenities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Free WiFi",
              "Swimming Pool",
              "Parking",
              "Restaurant",
              "Spa & Wellness",
              "Fitness Center",
              "Room Service",
              "Bar/Lounge",
              "Marina Access",
            ].map((amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Features */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Additional Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Table className="border">
              <TableBody>
                <TableRow>
                  <TableCell className="border-r">Adults Accepted</TableCell>
                  <TableCell>Yes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r">Payment Methods</TableCell>
                  <TableCell>All major payment methods are allowed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r">Pet Friendly</TableCell>
                  <TableCell>Yes, with restrictions</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Table className="border">
              <TableBody>
                <TableRow>
                  <TableCell className="border-r">Address</TableCell>
                  <TableCell>2 Bridge St Old Saybrook, CT 06475</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r">Phone Number</TableCell>
                  <TableCell>(860) 395-2000</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r">Email Address</TableCell>
                  <TableCell>info@saybrook.com</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border-r">Website</TableCell>
                  <TableCell>https://www.saybrook.com/</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Reviews */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Reviews (2)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="h-5 w-5 fill-yellow-400 text-yellow-400"
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              (Overall 4.5 Out of 5)
            </span>
          </div>

          {/* Review 1 */}
          <div className="flex gap-4 pt-4 border-t">
            <div className="h-12 w-12 rounded-full bg-muted flex-shrink-0 overflow-hidden">
              <img
                src="/diverse-person-avatars.png"
                alt="Robert Cook"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <h4 className="font-semibold">Robert Cook</h4>
                <p className="text-sm text-primary">11 Oct, 2025</p>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Awesome place. I recommend always! The staff was incredibly
                welcoming and the facilities exceeded all expectations. Will
                definitely be returning.
              </p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="flex gap-4 pt-4 border-t">
            <div className="h-12 w-12 rounded-full bg-muted flex-shrink-0 overflow-hidden">
              <img
                src="/diverse-woman-avatar.png"
                alt="Sonia Shikder"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div>
                <h4 className="font-semibold">Sonia Shikder</h4>
                <p className="text-sm text-primary">17 Jul, 2021</p>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I visited this resort last year. It is a very charming place.
                The views are spectacular and the attention to detail is
                remarkable.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write a Review */}
      <Card className="shadow-none rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Write a Review
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <span className="text-primary font-medium cursor-pointer hover:underline">
              Login to Review
            </span>
          </div>
          <Textarea
            placeholder="Share your experience..."
            className="min-h-[120px]"
          />
          <Button className="w-full md:w-auto">Submit Review</Button>
        </CardContent>
      </Card>
    </div>
  );
}
