import { useRef, useEffect, useLayoutEffect, useCallback } from "react";
import { TourCard } from "./TourCard";
import { SectionHeading } from "./SectionHeading";

export function TourCarouselSection({ id, title, subtitle, items }) {
  const scrollContainerRef = useRef(null);

  const infiniteItems = [...items, ...items, ...items];
  const cardWidth = 280;
  const gap = 12;
  const singleSetWidth = items.length * (cardWidth + gap);

  const nudgeInfiniteLoop = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container || items.length === 0) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) return;

    const threshold = Math.max(8, cardWidth * 0.15);

    if (scrollLeft <= threshold) {
      container.scrollLeft = scrollLeft + singleSetWidth;
    } else if (scrollLeft >= maxScroll - threshold) {
      container.scrollLeft = scrollLeft - singleSetWidth;
    }
  }, [items.length, singleSetWidth, cardWidth]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 320;
    const currentScroll = container.scrollLeft;

    let newScrollPosition;

    if (direction === "left") {
      newScrollPosition = currentScroll - scrollAmount;
      if (newScrollPosition < scrollAmount) {
        container.scrollLeft = singleSetWidth + newScrollPosition;
        return;
      }
    } else {
      newScrollPosition = currentScroll + scrollAmount;
      if (newScrollPosition > singleSetWidth * 2 - scrollAmount) {
        container.scrollLeft =
          singleSetWidth + (newScrollPosition - singleSetWidth * 2);
        return;
      }
    }

    container.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  useLayoutEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    el.scrollLeft = Math.min(singleSetWidth, maxScroll);
  }, [singleSetWidth]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = 0;
        nudgeInfiniteLoop();
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [nudgeInfiniteLoop]);

  return (
    <section id={id} className="py-[1.275rem] md:py-4 xl:py-5">
      <SectionHeading
        title={title}
        subtitle={subtitle}
        categoryId={id}
        onScrollLeft={() => scroll("left")}
        onScrollRight={() => scroll("right")}
      />

      {/* Native momentum scrolling on mobile; same track + infinite loop for all breakpoints */}
      <div
        ref={scrollContainerRef}
        className="-mx-1 flex touch-pan-x snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-1 scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {infiniteItems.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="w-[280px] min-w-[280px] shrink-0 snap-start"
          >
            <TourCard {...item} />
          </div>
        ))}
      </div>
    </section>
  );
}
