
import { MapPin, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroPic from "@/assets/images/hero_pic.jpg";
import { TourCard } from "./TourCard";
import { heroStats } from "./data";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";

export function HeroSection({ sharedDateRange, onSharedDateRangeChange, onSearchBarVisibilityChange }) {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isSearchBarSticky, setIsSearchBarSticky] = useState(false);
  const [searchBarHeight, setSearchBarHeight] = useState(0);
  const scrollContainerRef = useRef(null);
  const searchBarRef = useRef(null);
  const searchBarInitialTop = useRef(null);
  const controls = useAnimation();
  const { recentlyViewed } = useRecentlyViewed();

  // Carousel setup
  const carouselItems = recentlyViewed.length > 0 ? recentlyViewed : [];
  // Triple items for desktop arrow navigation (infinite loop)
  const infiniteItems = carouselItems.length > 4
    ? [...carouselItems, ...carouselItems, ...carouselItems]
    : carouselItems;

  const cardWidth = 224;
  const gap = 10;

  useEffect(() => {
    if (carouselItems.length > 4) {
      // Start at the middle set for seamless infinite scroll (desktop only)
      const middleSetStart = carouselItems.length;
      controls.set({ x: -middleSetStart * (cardWidth + gap) });
      setCurrentIndex(middleSetStart);
    }
  }, [carouselItems.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!searchBarRef.current) return;
      
      // Capture initial position and height only once when component mounts
      if (searchBarInitialTop.current === null) {
        const rect = searchBarRef.current.getBoundingClientRect();
        searchBarInitialTop.current = rect.top + window.scrollY;
        setSearchBarHeight(rect.height);
      }
      
      const scrollPosition = window.scrollY;
      
      // Unstick 150px before reaching original position for snappier feel
      const threshold = searchBarInitialTop.current - 150;
      const shouldBeSticky = scrollPosition >= threshold;
      
      setIsSearchBarSticky(prev => {
        if (prev !== shouldBeSticky) {
          if (onSearchBarVisibilityChange) {
            onSearchBarVisibilityChange(shouldBeSticky);
          }
          return shouldBeSticky;
        }
        return prev;
      });
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onSearchBarVisibilityChange]);

  const handlePrevious = () => {
    if (carouselItems.length <= 4) return;

    const newIndex = currentIndex - 1;
    const targetX = -newIndex * (cardWidth + gap);

    controls.start({
      x: targetX,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
    setCurrentIndex(newIndex);

    // Reset to middle set if we've scrolled too far left
    if (newIndex <= 0) {
      setTimeout(() => {
        const middleIndex = carouselItems.length;
        controls.set({ x: -middleIndex * (cardWidth + gap) });
        setCurrentIndex(middleIndex);
      }, 300);
    }
  };

  const handleNext = () => {
    if (carouselItems.length <= 4) return;

    const newIndex = currentIndex + 1;
    const targetX = -newIndex * (cardWidth + gap);

    controls.start({
      x: targetX,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    });
    setCurrentIndex(newIndex);

    // Reset to middle set if we've scrolled too far right
    if (newIndex >= carouselItems.length * 2) {
      setTimeout(() => {
        const middleIndex = carouselItems.length;
        controls.set({ x: -middleIndex * (cardWidth + gap) });
        setCurrentIndex(middleIndex);
      }, 300);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[80vh] lg:min-h-[calc(100vh-5rem)] flex items-start pt-[12vh] overflow-visible bg-(--brand-green) text-white"
    >
      <div className="absolute inset-0">
        <img
          src={heroPic}
          alt="African safari landscape at sunset"
          className="h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.18)_25%,rgba(122,69,11,0.14)_60%,rgba(0,0,0,0.2)),radial-gradient(circle_at_center,rgba(255,174,58,0.28),transparent_42%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1520px] px-4 py-10 sm:px-6 sm:py-14 md:py-16 overflow-visible">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
          </div>

            <h1
              className="
                mt-4
                mx-auto
                text-center
                text-white
                drop-shadow-[0_6px_20px_rgba(0,0,0,0.55)]
                whitespace-nowrap
                overflow-hidden
                text-ellipsis
                w-full
                max-w-none
                px-2
              "
              style={{
                fontFamily: 'var(--font-hero)',
                fontWeight: 700,
                fontSize: 'clamp(1.75rem, 6vw, 4rem)',
                lineHeight: 'clamp(2rem, 6.5vw, 4.25rem)',
                letterSpacing: '0px'
              }}
            >
              {t('hero.title')}
            </h1>

          <p 
            className="mt-1 text-white/92 drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)] px-2 whitespace-nowrap"
            style={{
              fontFamily: 'GT Eesti Pro Display, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(11px, 3.5vw, 24px)',
              lineHeight: 'clamp(16px, 4.5vw, 30px)',
              letterSpacing: '0px'
            }}
          >
            {t('hero.subtitle')}
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
            <p className="text-xs font-medium tracking-wide text-white/80">
              {t("hero.availability")}
            </p>
          </div>
          
          {/* Hero Search Bar - On mobile: becomes fixed at top. On desktop: fades out when reaching navbar */}
          <div 
            className="relative mt-4 sm:mt-3.5 md:mt-4 max-w-4xl mx-auto"
            style={{ minHeight: searchBarHeight > 0 ? `${searchBarHeight}px` : 'auto' }}
          >
            <div 
              ref={searchBarRef}
              className={`${
                isSearchBarSticky 
                  ? 'fixed top-0 left-0 right-0 z-[60] px-3 py-2 lg:opacity-0 lg:pointer-events-none lg:static lg:px-0 lg:py-0' 
                  : 'static opacity-100'
              }`}
            >
              <div
                id="hero-search-bar"
                className="grid gap-0 rounded-lg border border-slate-200 bg-white sm:grid-cols-[1fr_auto] grid-cols-[1fr_auto] shadow-md max-w-4xl mx-auto"
              >
                <div className="flex items-center gap-2 text-left text-slate-900 px-2 py-1.5">
                  <MapPin className="text-(--brand-green) shrink-0 size-3" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[9px] sm:text-[10px] mb-0">
                      {t('hero.destination')}
                    </p>
                    <Input
                      className="h-auto border-0 px-1 py-0 text-[11px] sm:text-[11px] text-slate-900 placeholder:text-slate-400 shadow-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      style={{ 
                        caretColor: '#01311a',
                        outline: 'none',
                        textAlign: 'left'
                      }}
                      placeholder={t('hero.destinationPlaceholder')}
                    />
                  </div>
                </div>

                <div className="p-1">
                  <Button
                    size="sm"
                    className="h-full w-full rounded-lg min-h-7 text-[10px] px-3 sm:min-h-8 sm:text-[11px] sm:px-4"
                  >
                    <Search className="size-2.5 sm:size-3" />
                    {t('hero.search')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-3.5 md:mt-4 hidden grid-cols-3 gap-2 md:grid">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-2 backdrop-blur-sm"
              >
                <p className="text-base font-black">{stat.value}</p>
                <p className="mt-0.5 text-[10px] text-white/70">
                  {t(`stats.${stat.translationKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-scrolling carousel - only show if there are items */}
        {/* {carouselItems.length > 0 && (
          <div className="mt-[1.275rem] sm:mt-5 md:mt-6 overflow-visible">
            <h2 className="mb-[0.6375rem] text-center text-[12px] font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:mb-3 sm:text-lg">
              {t('sections.pickupTitle')}
            </h2>

            <div className="relative px-0 md:px-16 overflow-visible">
              {carouselItems.length > 4 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="hidden md:grid absolute left-2 top-1/2 z-20 -translate-y-1/2 size-10 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur transition hover:bg-white hover:scale-110"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="size-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="hidden md:grid absolute right-2 top-1/2 z-20 -translate-y-1/2 size-10 place-items-center rounded-full bg-white/90 text-slate-900 shadow-lg backdrop-blur transition hover:bg-white hover:scale-110"
                    aria-label="Next"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}

              <div className="hidden md:block overflow-hidden pb-8">
                <motion.div
                  animate={controls}
                  className={`flex gap-2.5 ${carouselItems.length <= 4 ? 'justify-center' : ''}`}
                  style={{ width: carouselItems.length <= 4 ? "100%" : "fit-content" }}
                >
                  {infiniteItems.map((item, index) => (
                    <motion.div
                      key={`${item.title}-${index}`}
                      className="w-56 shrink-0"
                      whileHover={{
                        scale: 1.08,
                        y: 12,
                        zIndex: 50,
                        transition: { duration: 0.25 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <TourCard {...item} disableTracking={true} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div
                ref={scrollContainerRef}
                className="md:hidden overflow-x-auto scrollbar-hide"
                style={{
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                <div className={`flex gap-2.5 ${carouselItems.length <= 4 ? 'justify-center' : 'px-4'}`}>
                  {carouselItems.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="w-56 shrink-0"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <TourCard {...item} disableTracking={true} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
}