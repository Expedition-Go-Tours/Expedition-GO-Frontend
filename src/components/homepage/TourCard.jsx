import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCurrency } from "@/contexts/CurrencyContext";

export function TourCard({ title, duration, price, rating, reviews, image, discount, disableTracking = false }) {
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

  return (
    <Card 
      onClick={handleCardClick}
      className="group overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm transition duration-300 xl:hover:-translate-y-0.5 xl:hover:shadow-md xl:active:scale-95 xl:active:shadow-sm cursor-pointer"
    >
      <div className="relative h-24 xl:h-28 overflow-hidden">
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
      <CardContent className="p-2.5 xl:p-3">
        <p className="line-clamp-1 text-[14px] font-semibold tracking-tight text-slate-900">{title}</p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-[12px] text-amber-500">
            <Star className="size-3.5 fill-current" />
            <span className="font-semibold text-orange-500">{rating}</span>
            <span className="text-slate-400">({reviews})</span>
          </div>
          <p className="text-[12px] font-semibold text-slate-500">
            {t('common.from')} <span className="text-[14px] text-slate-900">{convertedPrice.formatted}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
