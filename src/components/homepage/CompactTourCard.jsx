import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCurrency } from "@/contexts/CurrencyContext";

export function CompactTourCard({ title, duration, price, rating, reviews, image }) {
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
    
    toggleWishlist({ title, duration, price, rating, reviews, image });
  };

  const handleCardClick = () => {
    // Navigate to tour detail page
    // Tracking will happen on the detail page when user actually views it
  };

  return (
    <Card 
      onClick={handleCardClick}
      className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition duration-300 xl:hover:-translate-y-1 xl:hover:shadow-none xl:active:scale-95 xl:active:shadow-[0_1px_2px_rgba(15,23,42,0.06)] cursor-pointer"
    >
      <div className="relative h-36 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <span className="absolute left-2 top-2 rounded-md bg-slate-900/80 px-2 py-1 text-[10px] font-bold text-white pointer-events-none">{duration}</span>
        <button 
          onClick={handleHeartClick}
          className="absolute right-2 top-2 grid size-6 place-items-center rounded-full bg-white/88 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white hover:scale-110 z-10"
        >
          <Heart 
            className={`size-3 transition-colors ${
              isFavorited ? 'fill-red-500 text-red-500' : ''
            }`} 
          />
        </button>
      </div>
      <CardContent className="p-3.5">
        <p className="line-clamp-2 text-[14px] font-semibold leading-tight text-slate-900">{title}</p>
        <div className="mt-2 flex items-center gap-1 text-[12px]">
          <Star className="size-3.5 fill-orange-400 text-orange-400" />
          <span className="font-semibold text-orange-500">{rating}</span>
          <span className="text-slate-400">({reviews})</span>
        </div>
        <p className="mt-1.5 text-sm font-semibold text-slate-900">{t('common.from')} {convertedPrice.formatted}</p>
      </CardContent>
    </Card>
  );
}
