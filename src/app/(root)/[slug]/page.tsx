import { ListingContent } from "@/components/client/listing/listing-content";
import { ListingHero } from "@/components/client/listing/listing-hero";
import { ListingSidebar } from "@/components/client/listing/listing-sidebar";

export default function ListingPage() {
  return (
    <div className="min-h-screen">
      <ListingHero />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ListingContent />
          </div>
          <div className="lg:col-span-1">
            <ListingSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
