import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCurrency } from "@/contexts/CurrencyContext";

export function SidebarDealCard({ title, oldPrice, price, discount, countdown, image }) {
  const { t } = useTranslation();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { convertPrice } = useCurrency();
  const isFavorited = isInWishlist(title);
  const touchStartRef = useRef({ x: 0, y: 0 });

  // Convert prices
  const convertedOldPrice = convertPrice(oldPrice);
  const convertedPrice = convertPrice(price);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleWishlist({ 
      title, 
      price, 
      image,
      duration: countdown,
      rating: "4.8",
      reviews: "120"
    });
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = {
      x: e.touches?.[0].clientX || 0,
      y: e.touches?.[0].clientY || 0
    };
  };

  const handleCardClick = (e) => {
    // On mobile, check if this was a scroll or a tap
    if (touchStartRef.current.x !== 0 || touchStartRef.current.y !== 0) {
      const moveX = Math.abs((e.clientX || 0) - touchStartRef.current.x);
      const moveY = Math.abs((e.clientY || 0) - touchStartRef.current.y);
      // If movement > 10px, treat as scroll, not tap
      if (moveX > 10 || moveY > 10) {
        touchStartRef.current = { x: 0, y: 0 };
        return;
      }
      touchStartRef.current = { x: 0, y: 0 };
    }
    // Navigate to tour detail page
    // Tracking will happen on the detail page when user actually views it
  };

  return (
    <Card 
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition duration-300 xl:hover:-translate-y-1 xl:hover:shadow-none xl:active:scale-95 xl:active:shadow-[0_1px_2px_rgba(15,23,42,0.06)] cursor-pointer"
    >
      <div className="relative h-36 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 xl:hover:scale-105" />
        <span className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-[11px] font-bold text-white pointer-events-none xl:text-[10px]">{discount}</span>
        <button 
          onClick={handleHeartClick}
          className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-white/88 text-slate-700 shadow-sm backdrop-blur transition xl:hover:bg-white xl:hover:scale-110 z-10"
        >
          <Heart 
            className={`size-3 transition-colors ${
              isFavorited ? 'fill-[color:var(--brand-green)] text-[color:var(--brand-green)]' : ''
            }`} 
          />
        </button>
      </div>
      <CardContent className="p-4 xl:p-3.5">
        <p className="line-clamp-2 text-[15px] font-semibold leading-tight text-slate-900 xl:text-[14px]">{title}</p>
        
        {/* Price and Timer Row */}
        <div className="mt-3 flex items-end justify-between gap-2">
          {/* Price Section */}
          <div className="flex flex-col gap-0.5 flex-1 min-w-0">
            <span className="text-[9px] font-medium text-slate-500 uppercase tracking-wide">{t('common.from')}</span>
            <div className="flex items-baseline gap-1 flex-wrap">
              <span className="text-[8px] text-slate-400 line-through decoration-slate-300">{convertedOldPrice.formatted}</span>
              <span 
                className="font-bold text-[color:var(--brand-green)]"
                style={{ fontSize: 'clamp(0.625rem, 0.6vw + 0.2rem, 0.6875rem)' }}
              >{convertedPrice.formatted}</span>
            </div>
          </div>
          
          {/* Timer Badge */}
          <div className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-50 to-red-50 px-2 py-0.5 border border-orange-200/50 shrink-0">
            <svg className="size-2.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-[9px] font-semibold text-orange-600 whitespace-nowrap">{countdown}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
