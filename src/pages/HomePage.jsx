import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronUp } from "lucide-react";
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
  const [sharedHeroDateRange, setSharedHeroDateRange] = useState({ from: null, to: null });
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Simulate loading time for initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop((prev) => { const next = window.scrollY > 480; return prev === next ? prev : next; });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen bg-[color:var(--page-bg)] text-slate-900">
        <Navbar
          sharedDateRange={sharedHeroDateRange}
          onSharedDateRangeChange={setSharedHeroDateRange}
        />
        <HeroSection
          sharedDateRange={sharedHeroDateRange}
          onSharedDateRangeChange={setSharedHeroDateRange}
        />

        <main className="mx-auto max-w-[1520px] px-4 pb-10 sm:px-6 sm:pb-12 overflow-hidden">
          <div className="grid gap-6 xl:gap-7 xl:grid-cols-[minmax(0,1fr)_430px]">
            <div className="space-y-[0.7rem] pt-4 min-w-0">
              <TourCarouselSection id="tours" title={t('sections.featuredTitle')} items={pickupTours} />
              <div className="space-y-[0.7rem] pt-5">
                <DestinationsSection />
                <TourCarouselSection id="recommended" title={t('sections.recommendedTitle')} items={recommendedTours} />
                <TourCarouselSection id="deals" title={t('sections.topRatedTitle')} items={topRatedTours} />
                <TourCarouselSection id="leisure" title={t('sections.likelyToSellOut')} items={leisureTours} />
              </div>
            </div>
            <div className="pt-4 min-w-0">
              <SidebarPanel />
            </div>
          </div>
        </main>

        {/* Newsletter Section - Full Width */}
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 mb-14">
          <NewsletterSection />
        </div>

        {/* Features Section - Full Width before footer */}
        <div className="mx-auto max-w-[1520px] px-4 sm:px-6 mb-14">
          <FeaturesSection />
        </div>

        <Footer />
        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-5 right-5 z-[60] grid size-11 place-items-center rounded-full border border-slate-200 bg-white text-slate-800 shadow-md transition hover:-translate-y-0.5 hover:bg-slate-50"
            aria-label="Scroll to top"
          >
            <ChevronUp className="size-5" />
          </button>
        )}
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
