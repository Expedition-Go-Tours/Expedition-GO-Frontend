import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { DestinationsSection } from "@/components/homepage/DestinationsSection";
import { Footer } from "@/components/homepage/Footer";
import { HeroSection } from "@/components/homepage/HeroSection";
import { Navbar } from "@/components/homepage/Navbar";
import { SidebarPanel } from "@/components/homepage/SidebarPanel";
import { TourCarouselSection } from "@/components/homepage/TourCarouselSection";
import { NewsletterSection } from "@/components/homepage/NewsletterSection";
import { FeaturesSection } from "@/components/homepage/FeaturesSection";
import { HomePageSkeleton } from "@/components/homepage/skeletons/HomePageSkeleton";
import { leisureTours, pickupTours, recommendedTours, topRatedTours } from "@/components/homepage/data";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthModal } from "@/components/ui/auth-modal";
import { useAuthModal } from "@/contexts/AuthModalContext";

function HomePageContent() {
  const { isAuthModalOpen, closeAuthModal } = useAuthModal();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen bg-[color:var(--page-bg)] text-slate-900">
        <Navbar />
        <HeroSection />

        <main className="mx-auto max-w-[1520px] px-4 pb-8 sm:px-6 overflow-hidden">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_430px]">
            <div className="space-y-1 pt-3 min-w-0">
              <TourCarouselSection id="tours" title={t('sections.featuredTitle')} items={pickupTours} />
              <DestinationsSection />
              <TourCarouselSection id="recommended" title={t('sections.recommendedTitle')} items={recommendedTours} />
              <TourCarouselSection id="deals" title={t('sections.topRatedTitle')} items={topRatedTours} />
              <TourCarouselSection id="leisure" title={t('sections.likelyToSellOut')} items={leisureTours} />
            </div>
            <div className="pt-3 min-w-0">
              <SidebarPanel />
            </div>
          </div>
        </main>

        {/* Newsletter Section - Full Width */}
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 mb-8">
          <NewsletterSection />
        </div>

        {/* Features Section - Full Width before footer */}
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 mb-8">
          <FeaturesSection />
        </div>

        <Footer />
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
}

function HomePage() {
  return (
    <AuthModalProvider>
      <WishlistProvider>
        <RecentlyViewedProvider>
          <HomePageContent />
        </RecentlyViewedProvider>
      </WishlistProvider>
    </AuthModalProvider>
  );
}

export default HomePage;
