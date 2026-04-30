import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCurrency } from "@/contexts/CurrencyContext";

export function TourCard({ title, duration, price, rating, reviews, image, discount, disableTracking = false, variant = "default" }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { convertPrice } = useCurrency();
  const isFavorited = isInWishlist(title);

  // Convert price
  const convertedPrice = convertPrice(price);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    
    if (!user) {
      openAuthModal();
      return;
    }
    
    toggleWishlist({ title, duration, price, rating, reviews, image, discount });
  };

  const handleCardClick = () => {
    // Navigate to tour detail page
    // Tracking will happen on the detail page when user actually views it
    navigate(`/tour/${encodeURIComponent(title)}`);
  };
  const imageHeightClass = variant === "allTours" ? "h-44 xl:h-48" : "h-36 xl:h-40";

  return (
    <Card 
      onClick={handleCardClick}
      className="group overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition duration-300 xl:hover:-translate-y-0.5 xl:hover:shadow-none xl:active:scale-95 xl:active:shadow-[0_1px_2px_rgba(15,23,42,0.06)] cursor-pointer"
    >
      <div className={`relative ${imageHeightClass} overflow-hidden`}>
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 to-transparent pointer-events-none" />
        <span className="absolute left-2 top-2 rounded-md bg-slate-900/75 px-2 py-1 text-[10px] font-bold text-white shadow-sm pointer-events-none">
          {duration}
        </span>
        {discount && (
          <span className="absolute left-2 bottom-2 rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm pointer-events-none">
            {discount}
          </span>
        )}
        <button 
          onClick={handleHeartClick}
          className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-white/88 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white hover:scale-110 z-10"
        >
          <Heart 
            className={`size-3.5 transition-colors ${
              isFavorited ? 'fill-red-500 text-red-500' : ''
            }`} 
          />
        </button>
      </div>
      <CardContent className="p-3.5 xl:p-4">
        <p className="line-clamp-1 text-[12px] font-semibold tracking-tight text-slate-700">{duration}</p>
        <p className="mt-1 line-clamp-2 text-[15px] font-bold leading-tight tracking-tight text-slate-900">{title}</p>
        <p className="mt-2 line-clamp-1 text-[12px] font-medium text-slate-700">Skip the line • 6 hours • Pickup available</p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="flex items-center gap-1 text-[12px] text-amber-500">
            <Star className="size-4 fill-current" />
            <span className="text-[14px] font-semibold text-slate-900">{rating}</span>
            <span className="text-[12px] text-slate-500">({reviews})</span>
          </div>
          <p className="text-[12px] font-semibold text-slate-500">
            {t('common.from')} <span className="text-[15px] text-slate-900">{convertedPrice.formatted}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
