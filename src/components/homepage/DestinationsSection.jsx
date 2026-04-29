import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "./data";
import { DestinationCard } from "./DestinationCard";
import { DestinationsModal } from "./DestinationsModal";

export function DestinationsSection() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const dragContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);
  const controls = useAnimation();

  // Triple the items for infinite loop
  const infiniteDestinations = [...destinations, ...destinations, ...destinations];
  const cardWidth = 280;
  const gap = 12;
  const singleSetWidth = destinations.length * (cardWidth + gap);

  useEffect(() => {
    // Start at the middle set
    setX(-singleSetWidth);
    controls.set({ x: -singleSetWidth });
  }, [singleSetWidth, controls]);

  const handleDragStart = (event, info) => {
    setIsDragging(true);
    setDragStartX(info.point.x);
    setDragStartTime(Date.now());
  };

  const handleDrag = (event, info) => {
    const newX = x + info.delta.x;
    setX(newX);
    // Update controls immediately for smooth dragging
    controls.set({ x: newX });
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    // Calculate velocity for momentum
    const dragEndTime = Date.now();
    const timeDelta = dragEndTime - dragStartTime;
    const distance = info.point.x - dragStartX;
    const velocity = distance / timeDelta;
    
    // Apply momentum based on velocity (reduced for smoother feel)
    const momentumDistance = velocity * 150;
    let finalX = x + info.offset.x + momentumDistance;
    
    // Infinite loop logic with slower return
    let needsReset = false;
    let resetX = finalX;
    
    if (finalX > -cardWidth) {
      resetX = finalX - singleSetWidth;
      needsReset = true;
    } else if (finalX < -(singleSetWidth * 2) + cardWidth) {
      resetX = finalX + singleSetWidth;
      needsReset = true;
    }
    
    if (needsReset) {
      // Slower transition when looping back
      controls.start({ 
        x: finalX, 
        transition: { 
          type: "spring", 
          stiffness: 150,
          damping: 30,
          mass: 1
        } 
      }).then(() => {
        // Instantly reset position after animation
        setX(resetX);
        controls.set({ x: resetX });
      });
    } else {
      setX(finalX);
      controls.start({ 
        x: finalX, 
        transition: { 
          type: "spring", 
          stiffness: 200, 
          damping: 25,
          mass: 0.8
        } 
      });
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 320;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      let newScrollPosition;
      
      if (direction === 'left') {
        newScrollPosition = currentScroll - scrollAmount;
        // If scrolling past the beginning, loop to the end of second set
        if (newScrollPosition < scrollAmount) {
          container.scrollLeft = singleSetWidth + newScrollPosition;
          return;
        }
      } else {
        newScrollPosition = currentScroll + scrollAmount;
        // If scrolling past the end of second set, loop to the beginning of second set
        if (newScrollPosition > singleSetWidth * 2 - scrollAmount) {
          container.scrollLeft = singleSetWidth + (newScrollPosition - singleSetWidth * 2);
          return;
        }
      }
      
      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Initialize desktop scroll position to middle set
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = singleSetWidth;
    }
  }, [singleSetWidth]);

  return (
    <section 
      id="destinations" 
      className="py-2"
    >
      <div className="mb-1.5 xl:mb-2 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[13px] font-bold tracking-tight text-slate-900 sm:text-[14px] xl:text-[17px]">{t('sections.destinations')}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-slate-900 transition hover:text-slate-700"
          >
            {t('sections.viewAll')}
            <ChevronRight className="size-4" />
          </button>
          <div className="hidden items-center gap-2 xl:flex">
            <button 
              onClick={() => scroll('left')}
              className="grid size-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[color:var(--brand-green)] hover:text-[color:var(--brand-green)]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="grid size-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[color:var(--brand-green)] hover:text-[color:var(--brand-green)]"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Desktop: Horizontal scroll with arrow buttons */}
      <div 
        ref={scrollContainerRef}
        className="hidden xl:flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        {infiniteDestinations.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="min-w-[280px] snap-start flex-shrink-0"
          >
            <DestinationCard {...item} />
          </div>
        ))}
      </div>

      {/* Mobile/Tablet: Swipeable carousel */}
      <div 
        ref={dragContainerRef}
        className="xl:hidden overflow-hidden"
      >
        <motion.div
          ref={contentRef}
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          dragElastic={0.05}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          className={`flex gap-3 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
          style={{ 
            touchAction: 'pan-y', 
            x,
            WebkitOverflowScrolling: 'touch',
            willChange: 'transform'
          }}
        >
          {infiniteDestinations.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="w-[280px] flex-shrink-0"
            >
              <div className={isDragging ? 'pointer-events-none' : ''}>
                <DestinationCard {...item} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <DestinationsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
