import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Heart, ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useNavigationLoader } from "@/contexts/NavigationContext";
import {
  pickupTours,
  recommendedTours,
  topRatedTours,
  leisureTours,
  lastMinuteDeals,
} from "./data";

const TABS = [
  { key: "more", label: "More Experiences" },
  { key: "attractions", label: "Top Attractions" },
  { key: "nearby", label: "Things to do nearby" },
  { key: "best", label: "Best Experiences" },
  { key: "trending", label: "Trending Destinations" },
];

const TAB_DATA = {
  more: pickupTours.slice(0, 5),
  attractions: recommendedTours.slice(0, 5),
  nearby: topRatedTours.slice(0, 5),
  best: leisureTours.slice(0, 5),
  trending: lastMinuteDeals.slice(0, 5),
};

function ExperienceCard({ tour }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { convertPrice } = useCurrency();
  const isFav = isInWishlist(tour.title);
  const converted = convertPrice(tour.price);
  const detailTo = tour.slug ? `/tour/${tour.slug}` : `/tour/${encodeURIComponent(tour.title)}`;

  return (
    <article className="group flex flex-col">
      <Link to={detailTo} className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({
              title: tour.title,
              slug: tour.slug,
              duration: tour.duration,
              price: tour.price,
              rating: tour.rating,
              reviews: tour.reviews,
              image: tour.image,
            });
          }}
          className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/95 shadow-sm transition hover:scale-105 sm:right-3 sm:top-3 sm:size-9"
        >
          <Heart
            className={`size-3.5 sm:size-4 ${isFav ? "fill-[color:var(--brand-green)] text-[color:var(--brand-green)]" : "fill-none text-slate-600"}`}
            strokeWidth={2}
          />
        </button>
      </Link>
      <div className="mt-2 flex items-center gap-1 text-[12px] text-slate-500 sm:mt-3 sm:gap-1.5 sm:text-[13px]">
        <MapPin className="size-3 shrink-0 sm:size-3.5" />
        <span className="truncate">{tour.location || "Ghana"}</span>
      </div>
      <Link
        to={detailTo}
        className="mt-1 line-clamp-2 text-[13px] font-bold leading-snug text-slate-900 hover:underline sm:mt-1.5 sm:text-[15px]"
      >
        {tour.title}
      </Link>
      <div className="mt-auto flex items-center justify-between pt-1.5 sm:pt-2">
        <div className="flex items-center gap-1 text-[12px] text-slate-500 sm:gap-1.5 sm:text-[13px]">
          <Clock className="size-3 sm:size-3.5" />
          <span>{tour.duration}</span>
        </div>
        <div className="text-[12px] text-slate-600 sm:text-[13px]">
          from <span className="text-sm font-bold text-[color:var(--brand-green)] sm:text-base">{converted.formatted}</span>
        </div>
      </div>
    </article>
  );
}

export function DiscoverExperiencesSection() {
  const { t } = useTranslation();
  const { navigateWithLoader } = useNavigationLoader();
  const [activeTab, setActiveTab] = useState("more");
  const [feedback, setFeedback] = useState(null);
  const items = TAB_DATA[activeTab] || [];

  const handleViewAll = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "auto" });
    navigateWithLoader(`/tours?category=all&title=${encodeURIComponent("Discover experiences your way")}`);
  };

  return (
    <section className="py-6 sm:py-10">
      <div className="mb-4 sm:mb-6">
        <h2 className="relative inline-block text-xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Discover experiences your way
          <span className="absolute bottom-[-8px] left-0 h-1 w-16 rounded-full bg-gradient-to-r from-[color:var(--brand-green)] to-emerald-400 sm:bottom-[-10px] sm:w-20" />
        </h2>
      </div>

      <div className="mb-4 sm:mb-6">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 border-b border-slate-200 pb-0 sm:gap-2">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative shrink-0 whitespace-nowrap px-2.5 py-2 text-[13px] font-medium transition sm:px-3 sm:py-2.5 sm:text-base ${
                    activeTab === tab.key
                      ? "font-bold text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-t bg-[color:var(--brand-green)]" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <Link
            to={`/tours?category=all&title=${encodeURIComponent("Discover experiences your way")}`}
            onClick={handleViewAll}
            className="group relative inline-flex min-h-[44px] shrink-0 touch-manipulation items-center gap-1 whitespace-nowrap py-2 text-[13px] font-semibold text-slate-700 transition hover:text-slate-950 sm:min-h-0 sm:py-1.5 sm:text-[14px]"
          >
            <span className="relative">
              {t("sections.viewAll")}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[color:var(--brand-green)] transition-all duration-300 group-hover:w-full" />
            </span>
            <ChevronRight className="size-4 text-slate-500 transition group-hover:text-[color:var(--brand-green)]" />
          </Link>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:gap-5">
        {items.map((tour) => (
          <div key={tour.title} className="w-[200px] shrink-0 snap-start sm:w-[240px] lg:w-[260px]">
            <ExperienceCard tour={tour} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-4 sm:mt-8 sm:flex-row sm:justify-center sm:gap-5 sm:px-6 sm:py-5">
        {feedback === null ? (
          <>
            <p className="text-center text-[13px] font-semibold text-slate-700 sm:text-sm">
              Were these recommendations helpful?
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setFeedback("up")}
                className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-[color:var(--brand-green)] hover:text-[color:var(--brand-green)] active:scale-95 sm:size-12"
                aria-label="Helpful"
              >
                <ThumbsUp className="size-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => setFeedback("down")}
                className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-red-400 hover:text-red-500 active:scale-95 sm:size-12"
                aria-label="Not helpful"
              >
                <ThumbsDown className="size-5" strokeWidth={2} />
              </button>
            </div>
          </>
        ) : feedback === "up" ? (
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-[color:var(--brand-green)]/10 text-[color:var(--brand-green)] sm:size-10">
              <ThumbsUp className="size-4.5 sm:size-5" strokeWidth={2} />
            </div>
            <p className="text-center text-[13px] font-semibold text-slate-800 sm:text-sm">
              Thanks for your feedback! We're glad you found this helpful.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-red-50 text-red-500 sm:size-10">
              <ThumbsDown className="size-4.5 sm:size-5" strokeWidth={2} />
            </div>
            <p className="text-center text-[13px] font-semibold text-slate-800 sm:text-sm">
              Thanks for letting us know. We'll work on improving these suggestions.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
