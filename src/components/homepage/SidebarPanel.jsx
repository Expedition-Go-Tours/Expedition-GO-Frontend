import { BadgeCheck, CircleDollarSign, Handshake, ShieldCheck, Star, WalletCards } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { CompactTourCard } from "./CompactTourCard";
import { SidebarDealCard } from "./SidebarDealCard";
import { lastMinuteDeals, sidebarTopRated, trustFeatures } from "./data";

const icons = [BadgeCheck, CircleDollarSign, ShieldCheck, Handshake, WalletCards, Star];

function PanelHeading({ title, linkTo }) {
  const { t } = useTranslation();
  
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-[18px] font-bold tracking-tight text-slate-900">{title}</h3>
      <Link to={linkTo} className="text-sm font-semibold text-[color:var(--brand-green)] transition hover:text-[color:var(--brand-green-2)]">
        {t('sections.viewAll')}
      </Link>
    </div>
  );
}

function SwipeableSection({ children, itemCount, originalChildren }) {
  const dragContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [x, setX] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartTime, setDragStartTime] = useState(0);
  const controls = useAnimation();

  // Calculate single set width for infinite loop
  const cardWidth = 160;
  const gap = 12;
  const singleSetWidth = itemCount * (cardWidth + gap);

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
  };

  const handleDragEnd = (event, info) => {
    setIsDragging(false);
    
    // Calculate velocity for momentum
    const dragEndTime = Date.now();
    const timeDelta = dragEndTime - dragStartTime;
    const distance = info.point.x - dragStartX;
    const velocity = distance / timeDelta;
    
    // Apply momentum based on velocity
    const momentumDistance = velocity * 200;
    let finalX = x + info.offset.x + momentumDistance;
    
    // Loop logic: seamlessly wrap around
    if (finalX > -cardWidth) {
      finalX = finalX - singleSetWidth;
    } else if (finalX < -(singleSetWidth * 2) + cardWidth) {
      finalX = finalX + singleSetWidth;
    }
    
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
  };

  return (
    <>
      {/* Desktop: Grid layout - show original items only */}
      <div className="hidden xl:grid xl:grid-cols-2 xl:gap-3">
        {originalChildren}
      </div>

      {/* Mobile/Tablet: Swipeable carousel - show tripled items */}
      <div 
        ref={dragContainerRef}
        className="xl:hidden overflow-hidden relative"
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
          {children}
        </motion.div>
      </div>
    </>
  );
}

export function SidebarPanel() {
  const { t } = useTranslation();
  
  return (
    <aside className="space-y-4 overflow-hidden">
      <Card className="rounded-[18px] border border-slate-200 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-4 overflow-hidden">
          <PanelHeading title={t('sections.lastMinuteDeals')} linkTo="/tours?category=deals" />
          <SwipeableSection 
            itemCount={lastMinuteDeals.length}
            originalChildren={lastMinuteDeals.map((deal) => (
              <div key={deal.title} className="xl:w-auto">
                <SidebarDealCard {...deal} />
              </div>
            ))}
          >
            {[...lastMinuteDeals, ...lastMinuteDeals, ...lastMinuteDeals].map((deal, index) => (
              <div key={`${deal.title}-${index}`} className="w-[160px] flex-shrink-0">
                <div className="pointer-events-auto">
                  <SidebarDealCard {...deal} />
                </div>
              </div>
            ))}
          </SwipeableSection>
        </CardContent>
      </Card>

      <Card className="rounded-[18px] border border-slate-200 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-4 overflow-hidden">
          <PanelHeading title={t('sections.newExperiences')} linkTo="/tours?category=deals" />
          <SwipeableSection 
            itemCount={sidebarTopRated.length}
            originalChildren={sidebarTopRated.map((tour) => (
              <div key={tour.title} className="xl:w-auto">
                <CompactTourCard {...tour} />
              </div>
            ))}
          >
            {[...sidebarTopRated, ...sidebarTopRated, ...sidebarTopRated].map((tour, index) => (
              <div key={`${tour.title}-${index}`} className="w-[160px] flex-shrink-0">
                <div className="pointer-events-auto">
                  <CompactTourCard {...tour} />
                </div>
              </div>
            ))}
          </SwipeableSection>
        </CardContent>
      </Card>

      {/* <Card className="rounded-[18px] border border-slate-200 bg-[#fafaf8] shadow-sm">
        <CardContent className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          {trustFeatures.map((item, index) => {
            const Icon = icons[index];

            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-[color:var(--brand-green)]/12 bg-white text-[color:var(--brand-green)]">
                  <Icon className="size-[18px]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-[13px] leading-6 text-slate-500">{item.description}</p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card> */}
    </aside>
  );
}
