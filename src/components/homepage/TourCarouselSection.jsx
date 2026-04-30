import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { TourCard } from "./TourCard";
import { SectionHeading } from "./SectionHeading";

export function TourCarouselSection({ id, title, subtitle, items }) {
  const scrollContainerRef = useRef(null);
  const dragContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);
  const controls = useAnimation();

  // Triple the items for infinite loop (desktop only)
  const infiniteItems = [...items, ...items, ...items];
  const cardWidth = 280;
  const gap = 12;
  const singleSetWidth = items.length * (cardWidth + gap);

  useEffect(() => {
    // Start at the middle set (desktop only)
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
      id={id} 
      className="py-2.5 xl:py-3"
    >
      <SectionHeading 
        title={title} 
        subtitle={subtitle}
        categoryId={id}
        onScrollLeft={() => scroll('left')}
        onScrollRight={() => scroll('right')}
      />
      
      {/* Desktop: Horizontal scroll with arrow buttons */}
      <div 
        ref={scrollContainerRef}
        className="hidden xl:flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
      >
        {infiniteItems.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="min-w-[280px] snap-start flex-shrink-0"
          >
            <TourCard {...item} />
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
          className={`flex gap-2 xl:gap-3 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} select-none`}
          style={{ 
            touchAction: 'pan-y', 
            x,
            WebkitOverflowScrolling: 'touch',
            willChange: 'transform'
          }}
        >
          {infiniteItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="w-[240px] xl:w-[280px] flex-shrink-0"
            >
              <div className={isDragging ? 'pointer-events-none' : ''}>
                <TourCard {...item} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
