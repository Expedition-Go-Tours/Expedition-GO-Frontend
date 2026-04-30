import { Heart } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCurrency } from "@/contexts/CurrencyContext";

export function SidebarDealCard({ title, oldPrice, price, discount, countdown, image }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { convertPrice } = useCurrency();
  const isFavorited = isInWishlist(title);

  // Convert prices
  const convertedOldPrice = convertPrice(oldPrice);
  const convertedPrice = convertPrice(price);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    
    if (!user) {
      openAuthModal();
      return;
    }
    
    toggleWishlist({ 
      title, 
      price, 
      image,
      duration: countdown,
      rating: "4.8",
      reviews: "120"
    });
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
      <div className="relative h-32 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        <span className="absolute left-2 top-2 rounded-md bg-red-500 px-2 py-1 text-[10px] font-bold text-white pointer-events-none">{discount}</span>
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
        <p className="mt-2.5 text-sm text-slate-500">
          {t('common.from')} <span className="line-through">{convertedOldPrice.formatted}</span> <span className="font-bold text-[color:var(--brand-green)]">{convertedPrice.formatted}</span>
        </p>
        <p className="mt-2.5 text-[12px] font-semibold text-orange-500">{countdown}</p>
      </CardContent>
    </Card>
  );
}
