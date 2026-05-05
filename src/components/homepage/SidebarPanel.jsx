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
    <div className="mb-[1.1rem] flex items-center justify-between gap-2 md:mb-4">
      <h3 className="text-[20px] font-bold tracking-tight text-slate-900 sm:text-[22px] xl:text-[23px]">{title}</h3>
      <Link
        to={linkTo}
        onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
        className="group shrink-0 text-base font-semibold text-[color:var(--brand-green)] transition hover:text-slate-950 xl:text-sm"
      >
        <span className="relative">
          {t('sections.viewAll')}
          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[color:var(--brand-green)] transition-all duration-300 group-hover:w-full" />
        </span>
      </Link>
    </div>
  );
}

function SwipeableSection({ children, itemCount, originalChildren }) {
  const scrollRef = useRef(null);

  return (
    <>
      {/* Desktop: Grid layout - show original items only */}
      <div className="hidden xl:grid xl:grid-cols-2 xl:gap-3">
        {originalChildren}
      </div>

      {/* Mobile/Tablet: Native horizontal scroll */}
      <div 
        ref={scrollRef}
        className="xl:hidden overflow-x-auto overflow-y-hidden flex gap-3 snap-x snap-mandatory scrollbar-hide"
        style={{ 
          touchAction: 'pan-x',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory'
        }}
      >
        {children}
      </div>
    </>
  );
}

export function SidebarPanel() {
  const { t } = useTranslation();
  const sidebarNewExperiences = [...sidebarTopRated, ...sidebarTopRated.slice(0, 2)];
  
  return (
    <aside className="space-y-[1.7rem] overflow-hidden md:space-y-6 xl:space-y-5">
      <Card className="rounded-[18px] border border-slate-200 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-4 overflow-hidden">
          <PanelHeading title={t('sections.lastMinuteDeals')} linkTo="/tours?category=last-minute-deals" />
          <SwipeableSection 
            itemCount={lastMinuteDeals.length}
            originalChildren={lastMinuteDeals.map((deal) => (
              <div key={deal.title} className="xl:w-auto">
                <SidebarDealCard {...deal} />
              </div>
            ))}
          >
            {lastMinuteDeals.map((deal, index) => (
              <div key={`${deal.title}-${index}`} className="w-[280px] flex-shrink-0 snap-start">
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
          <PanelHeading title={t('sections.newExperiences')} linkTo="/tours?category=new-experiences" />
          <SwipeableSection 
            itemCount={sidebarNewExperiences.length}
            originalChildren={sidebarNewExperiences.map((tour, index) => (
              <div key={`${tour.title}-${index}`} className="xl:w-auto">
                <CompactTourCard {...tour} />
              </div>
            ))}
          >
            {sidebarNewExperiences.map((tour, index) => (
              <div key={`${tour.title}-${index}`} className="w-[280px] flex-shrink-0 snap-start">
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
