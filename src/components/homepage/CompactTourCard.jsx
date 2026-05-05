import { Heart, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCurrency } from "@/contexts/CurrencyContext";

export function CompactTourCard({ title, duration, price, rating, reviews, image }) {
  const { t } = useTranslation();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { convertPrice } = useCurrency();
  const isFavorited = isInWishlist(title);

  // Convert price
  const convertedPrice = convertPrice(price);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    toggleWishlist({ title, duration, price, rating, reviews, image });
  };

  const handleCardClick = () => {
    // Navigate to tour detail page
    // Tracking will happen on the detail page when user actually views it
  };

  return (
    <Card 
      onClick={handleCardClick}
      className="flex h-full min-h-[260px] flex-col overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition duration-300 xl:hover:-translate-y-1 xl:hover:shadow-none xl:active:scale-95 xl:active:shadow-[0_1px_2px_rgba(15,23,42,0.06)] cursor-pointer"
    >
      <div className="relative h-40 overflow-hidden">
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 xl:hover:scale-105" />
        <span className="absolute left-2 top-2 rounded-md bg-slate-900/80 px-2 py-1 text-[11px] font-bold text-white pointer-events-none xl:text-[10px]">{duration}</span>
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
      <CardContent className="flex flex-1 flex-col p-4 xl:p-3.5">
        <p className="min-h-[38px] line-clamp-2 text-[15px] font-semibold leading-tight text-slate-900 xl:text-[14px]">{title}</p>
        <div className="mt-2 min-h-[20px] flex items-center gap-1 text-[13px] xl:text-[12px]">
          <Star className="size-3.5 fill-orange-400 text-orange-400" />
          <span className="font-semibold text-orange-500">{rating}</span>
          <span className="text-slate-400">({reviews})</span>
        </div>
        <p className="mt-auto pt-1.5 text-base font-semibold text-slate-900 xl:text-sm">{t('common.from')} {convertedPrice.formatted}</p>
      </CardContent>
    </Card>
  );
}
