import { CategoriesSection } from "@/components/client/categories-section";

import { CTASection } from "@/components/client/cta-section";
import { FeaturesSection } from "@/components/client/features-section";
import { HeroSection } from "@/components/client/hero-section";
import React from "react";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <CTASection />
    </>
  );
};

export default HomePage;
