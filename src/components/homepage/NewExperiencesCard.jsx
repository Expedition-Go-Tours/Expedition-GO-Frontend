/**
 * @file NewExperiencesCard.jsx
 * @description Smaller tour card for sidebar and dense layouts. Same data shape as FeaturedExperiencesCard.
 *   Links to /tour/:title with wishlist and currency support.
 */
import { Heart, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCarouselSafeClick } from '@/hooks/useCarouselSafeClick';

import { useWishlist } from '@/contexts/WishlistContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { slugify } from '@/lib/slugify';
import { useNavigationLoader } from '@/contexts/NavigationContext';

/**
 * Compact Tour Card - Vertical layout for sidebar sections
 * @param {"duration" | "new"} badge - Top-left badge: tour duration or localized "New"
 */
export function NewExperiencesCard({
  title,
  slug,
  duration,
  price,
  rating,
  reviews,
  image,
  location,
  discount,
  _disableTracking = false,
  badge = 'duration',
}) {
  const { t } = useTranslation();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { convertPrice } = useCurrency();
  const { navigateWithLoader } = useNavigationLoader();
  const isFavorited = isInWishlist(title);
  const { pointerEventHandlers, lastGestureWasPanRef } = useCarouselSafeClick();

  const convertedPrice = convertPrice(price);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({ title, slug, duration, price, rating, reviews, image, discount });
  };

  const handleDetailLinkClick = (e) => {
    if (lastGestureWasPanRef.current) {
      e.preventDefault();
      lastGestureWasPanRef.current = false;
      return;
    }
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigateWithLoader(detailTo);
  };

  const detailTo = `/tour/${slug || slugify(title)}`;

  return (
    <div
      {...pointerEventHandlers}
      className="group relative h-full contain-none touch-manipulation overflow-hidden rounded-lg border border-slate-200/50 bg-white font-card shadow-sm transition duration-300 hover:shadow-md"
    >
      {/* Vertical Image */}
      <div className="relative z-0 h-44 xl:h-48 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt=""
          aria-hidden={true}
          className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {badge === 'new' ? (
          <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-white/95 px-1.5 py-0.5 text-[10px] font-bold text-slate-900 shadow-sm backdrop-blur-sm">
            {t('sections.newBadge')}
          </span>
        ) : (
          <span className="pointer-events-none absolute left-2 top-2 rounded bg-white/95 px-1.5 py-0.5 text-[10px] font-bold text-slate-900 shadow-sm backdrop-blur-sm">
            {duration}
          </span>
        )}
      </div>

      {/* Vertical Content */}
      <div className="relative z-0 flex flex-1 flex-col p-4 pb-5 gap-2">
        {/* Location (muted, above title) */}
        {location && (
          <div className="flex items-center gap-1">
            <MapPin className="size-3 shrink-0 text-slate-400" />
            <span className="truncate text-[16px] font-bold text-slate-500">{location}</span>
          </div>
        )}

        {/* Title - 3 lines max for long tour names */}
        <h3
          className="line-clamp-3 min-h-[4em] text-[16px] leading-[22px] tracking-normal font-semibold text-slate-900 lg:text-[18px] lg:leading-[24px] lg:font-bold"
        >
          {title}
        </h3>

        {/* Rating & Price Row */}
        <div className="mt-auto flex items-end justify-between gap-2">
          {/* Rating */}
          <div className="flex items-center gap-1 text-[13px] text-[#39AD6C] xl:text-[12px]">
            <Star className="size-4 fill-current" />
            <span className="text-[15px] font-bold text-slate-900 xl:text-[14px]">{rating}</span>
            <span className="text-[13px] text-slate-500 xl:text-[12px]">({reviews})</span>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-[20px] leading-[24px] tracking-normal font-bold text-slate-900">
              <span className="text-[11px] font-normal text-slate-500">{t('common.from')} </span>
              {convertedPrice.formatted}
            </p>
          </div>
        </div>
      </div>
      <Link
        to={detailTo}
        onClick={handleDetailLinkClick}
        aria-label={`${t('common.viewDetails', { defaultValue: 'View details' })}: ${title}`}
        className="absolute inset-0 z-[5] rounded-lg outline-none ring-inset xl:focus-visible:ring-2 xl:focus-visible:ring-slate-400"
      />
      <button
        type="button"
        onClick={handleHeartClick}
        className="absolute right-2 top-2 z-[10] grid size-6 place-items-center rounded-full bg-white/95 text-slate-700 shadow-sm backdrop-blur-sm transition hover:bg-white hover:scale-110"
      >
        <Heart
          className={`size-3 transition-colors ${
            isFavorited ? 'fill-[color:var(--brand-green)] text-[color:var(--brand-green)]' : ''
          }`}
        />
      </button>
    </div>
  );
}
