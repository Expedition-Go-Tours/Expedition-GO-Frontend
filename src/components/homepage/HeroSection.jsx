import { CalendarDays, MapPin, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import heroPic from "@/assets/images/hero_pic.jpg";
import { TourCard } from "./TourCard";
import { heroStats } from "./data";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";

export function HeroSection({ sharedDateRange, onSharedDateRangeChange }) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState({ from: null, to: null });
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const calendarRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const controls = useAnimation();
  const { recentlyViewed } = useRecentlyViewed();
  const activeDateRange = sharedDateRange ?? selectedDate;
  const setActiveDateRange = onSharedDateRangeChange ?? setSelectedDate;

  // Carousel setup
  const carouselItems = recentlyViewed.length > 0 ? recentlyViewed : [];
  // Triple items for desktop arrow navigation (infinite loop)
  const infiniteItems = carouselItems.length > 4
    ? [...carouselItems, ...carouselItems, ...carouselItems]
    : carouselItems;
  const cardWidth = 224;
  const gap = 10;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const handleDragEnd = (event, info) => {
    // Not used for mobile/tablet - they use native scroll
  };

  useEffect(() => {
    if (carouselItems.length > 4) {
      // Start at the middle set for seamless infinite scroll (desktop only)
      const middleSetStart = carouselItems.length;
      controls.set({ x: -middleSetStart * (cardWidth + gap) });
      setCurrentIndex(middleSetStart);
    }
  }, [carouselItems.length]);

  const handlePrevious = () => {
    if (carouselItems.length <= 4) return;
    
    const newIndex = currentIndex - 1;
    const targetX = -newIndex * (cardWidth + gap);
    
    controls.start({
      x: targetX,
      transition: { type: "spring", stiffness: 300, damping: 30 }
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
      transition: { type: "spring", stiffness: 300, damping: 30 }
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

  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDateRange = (dateRange) => {
    if (!dateRange || !dateRange.from) return "";
    if (!dateRange.to) return `${formatDate(dateRange.from)}`;
    return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
  };

  const handleDateSelect = (date) => {
    setActiveDateRange(date);
  };

  const toggleCalendar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCalendar(prev => !prev);
  };
  return (
    <section id="home" className="relative overflow-visible bg-(--brand-green) text-white pb-[2.55rem] sm:pb-12.5 md:pb-25.5">
      <div className="absolute inset-0">
        <img
          src={heroPic}
          alt="African safari landscape at sunset"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),rgba(0,0,0,0.18)_25%,rgba(122,69,11,0.14)_60%,rgba(0,0,0,0.2)),radial-gradient(circle_at_center,rgba(255,174,58,0.28),transparent_42%)]" />
      </div>

      <div className="relative mx-auto max-w-380 px-4 py-[1.1rem] sm:px-6 sm:py-5 md:py-7 overflow-visible">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <Badge variant="soft" className="border-white/15 bg-white/10 text-white backdrop-blur text-[12px] px-2.5 py-1 sm:text-[11px] sm:px-2 sm:py-0.5">
              {t('hero.badge')}
            </Badge>
          </div>

          <h1 className="mt-3 text-2xl font-black tracking-tight text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)] sm:text-2xl md:text-3xl">
            {t('hero.title')}
          </h1>
          <p className="mt-1.5 text-[18px] font-medium text-white/92 drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)] sm:text-[18px] md:text-[21px]">
            {t('hero.subtitle')}
          </p>
          <p className="mt-1 text-[15px] font-medium text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)] sm:text-[15px] md:text-[18px]">
            {t('hero.availability')}
          </p>

          <div className="mx-auto mt-4 sm:mt-3.5 md:mt-4 max-w-4xl overflow-visible">
            <div id="hero-search-bar" className="grid gap-0 overflow-visible rounded-lg border border-slate-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:grid-cols-[1fr_1fr_auto]">
              <div className="flex items-center gap-2 border-b border-slate-200 px-2.5 py-2 text-left text-slate-900 sm:border-b-0 sm:border-r">
                <MapPin className="size-3.5 text-(--brand-green)" />
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold sm:text-[10px]">{t('hero.destination')}</p>
                  <Input className="h-auto border-0 px-0 py-0.5 text-[12px] shadow-none ring-0 focus:ring-0 caret-(--brand-green) sm:text-[11px]" placeholder={t('hero.destinationPlaceholder')} />
                </div>
              </div>
              <div className="relative flex items-center gap-2 border-b border-slate-200 px-2.5 py-2 text-left text-slate-900 sm:border-b-0 sm:border-r overflow-visible">
                <button
                  onClick={toggleCalendar}
                  type="button"
                  className="hidden shrink-0 transition hover:scale-110 focus:outline-none lg:inline-flex"
                  aria-label="Open calendar"
                >
                  <CalendarDays className="size-3.5 text-(--brand-green)" />
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold sm:text-[10px]">{t('hero.travelDate')}</p>
                  <Input
                    className="h-auto border-0 px-0 py-0.5 text-[12px] shadow-none ring-0 focus:ring-0 caret-(--brand-green) cursor-pointer sm:text-[11px]"
                    placeholder={t('hero.selectDate')}
                    value={formatDateRange(activeDateRange)}
                    onClick={toggleCalendar}
                    readOnly
                  />
                </div>
                {showCalendar && (
                  <div
                    ref={calendarRef}
                    className="absolute left-0 top-full z-100 mt-2"
                  >
                    <Calendar
                      mode="range"
                      selected={activeDateRange}
                      onSelect={handleDateSelect}
                      onClose={() => setShowCalendar(false)}
                    />
                  </div>
                )}
              </div>
              <div className="p-1.5">
                <Button size="sm" className="h-full min-h-9 w-full rounded-lg px-4 text-[12px] sm:min-h-8 sm:text-[11px]">
                  <Search className="size-3" />
                  {t('hero.search')}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-3.5 md:mt-4 hidden grid-cols-3 gap-2 md:grid">
            {heroStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-black/20 px-2.5 py-2 backdrop-blur-sm">
                <p className="text-base font-black">{stat.value}</p>
                <p className="mt-0.5 text-[10px] text-white/70">{t(`stats.${stat.translationKey}`)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-scrolling carousel - only show if there are items */}
        {carouselItems.length > 0 && (
          <div className="mt-[1.275rem] sm:mt-5 md:mt-6 overflow-visible">
            <h2 className="mb-[0.6375rem] text-center text-[12px] font-bold tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:mb-3 sm:text-lg">
              {t('sections.pickupTitle')}
            </h2>

            <div className="relative px-0 md:px-16 overflow-visible">
              {/* Navigation arrows - only show on desktop if we have more than 4 items */}
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

              {/* Desktop: Infinite loop with motion.div */}
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

              {/* Mobile/Tablet: Simple horizontal scroll */}
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
        )}
      </div>
    </section>
  );
}
