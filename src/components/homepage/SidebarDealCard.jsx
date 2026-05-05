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
      style={{ touchAction: 'auto' }}
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
        <p className="mt-2.5 text-base text-slate-500 xl:text-sm">
          {t('common.from')} <span className="line-through">{convertedOldPrice.formatted}</span> <span className="font-bold text-[color:var(--brand-green)]">{convertedPrice.formatted}</span>
        </p>
        <p className="mt-2.5 text-[13px] font-semibold text-orange-500 xl:text-[12px]">{countdown}</p>
      </CardContent>
    </Card>
  );
}
