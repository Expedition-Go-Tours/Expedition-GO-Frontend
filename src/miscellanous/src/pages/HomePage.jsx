import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { DestinationsSection } from "@/components/DestinationsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ToursSection } from "@/components/ToursSection";
import { AvailableRestaurantsSection } from "@/components/AvailableRestaurantsSection";
import { WhyGhanaSection } from "@/components/WhyGhanaSection";
import { StoriesSection } from "@/components/StoriesSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Footer } from "@/components/Footer";
import { TawkChat } from "@/components/tawk";

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <TawkChat />
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
      />

      <main>
        <HeroSection />
        <DestinationsSection />
        <ToursSection />
        <AvailableRestaurantsSection />
        <WhyGhanaSection />
        <StoriesSection activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        <FeaturesSection />
        <NewsletterSection />
       
      </main>

      <Footer />
    </div>
  );
}
