import { CategoriesSection } from "@/components/client/categories-section";
import { ClientFooter } from "@/components/client/client-footer";
import { ClientHeader } from "@/components/client/ClientHeader";
import { CTASection } from "@/components/client/cta-section";
import { FeaturesSection } from "@/components/client/features-section";
import { HeroSection } from "@/components/client/hero-section";
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <ClientHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <CategoriesSection />
        <CTASection />
      </main>
      <ClientFooter />
    </div>
  );
};

export default HomePage;
