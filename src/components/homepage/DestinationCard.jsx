import { Heart } from "lucide-react";
import { useState } from "react";

import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useWishlist } from "@/contexts/WishlistContext";

export function DestinationCard({ title, tours, image, variant = "default" }) {
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorited = isInWishlist(title);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    
    if (!user) {
      openAuthModal();
      return;
    }
    
    toggleWishlist({ 
      title, 
      image,
      duration: "Full Day",
      price: "$50",
      rating: "4.7",
      reviews: "150"
    });
  };
  const imageHeightClass = variant === "allTours" ? "h-[8.5rem] xl:h-[9.5rem]" : "h-28 xl:h-32";

  return (
    <Card className="group overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition duration-300 xl:hover:-translate-y-1 xl:hover:shadow-none xl:active:scale-95 xl:active:shadow-[0_1px_2px_rgba(15,23,42,0.06)] cursor-pointer">
      <div className={`relative ${imageHeightClass} overflow-hidden`}>
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
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
        <div className="absolute inset-x-0 bottom-0 p-3 text-white pointer-events-none">
          <p className="text-[18px] font-bold tracking-tight">{title}</p>
          <p className="mt-0.5 text-[12px] text-white/78">{tours}</p>
        </div>
      </div>
    </Card>
  );
}
