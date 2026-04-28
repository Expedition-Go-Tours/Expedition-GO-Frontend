import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, UtensilsCrossed, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Modal } from "@/components/ui/modal";
import { SectionHeader, sectionMotion } from "./SectionHeader";
import { SwipeCarousel } from "../../../components/homepage/SwipeCarousel";
import { restaurants } from "@/data/restaurants";

export function AvailableRestaurantsSection() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const carouselRef = useRef(null);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [favoritedRestaurants, setFavoritedRestaurants] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favoritedRestaurants');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const handleRestaurantClick = (restaurant) => {
    navigate(`/restaurant/${restaurant.slug}`, { state: { restaurant } });
  };

/**
 * Toggles the favorite status of a restaurant
 * @param {Object} restaurant - The restaurant object to toggle favorite status for
 * @param {Event} e - The click event object
 */
  const toggleRestaurantFavorite = (restaurant, e) => {
  // Prevent event from bubbling up to parent elements
    e.stopPropagation();
  // If user is not logged in, show sign in modal and return
    if (!user) {
      setShowSignInModal(true);
      return;
    }
    
  // Check if restaurant is already favorited
    const isFavorited = favoritedRestaurants.includes(restaurant.slug);
  // Update favorited restaurants array by either removing or adding the restaurant slug
    const updated = isFavorited
      ? favoritedRestaurants.filter(r => r !== restaurant.slug)  // Remove if already favorited
      : [...favoritedRestaurants, restaurant.slug];              // Add if not favorited
    
  // Update state and localStorage with the new favorited restaurants array
    setFavoritedRestaurants(updated);
    localStorage.setItem('favoritedRestaurants', JSON.stringify(updated));
  };

/**
 * Handles horizontal scrolling of a carousel element
 * @param {string} direction - The direction to scroll, either "left" or "right"
 */
  const scroll = (direction) => {
    // Return early if carousel ref is not available
    if (!carouselRef.current) return;

    // Destructure scroll properties from the carousel element
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    const scrollAmount = 400; // Fixed amount to scroll each time
    const maxScrollLeft = scrollWidth - clientWidth; // Maximum scroll position

    if (direction === "left") {
      // If scrolling left, either go to the end or scroll left by scrollAmount
      carouselRef.current.scrollLeft =
        scrollLeft <= 10 ? maxScrollLeft : scrollLeft - scrollAmount;
      return;
    }

    // If scrolling right, either go to the beginning or scroll right by scrollAmount
    carouselRef.current.scrollLeft =
      scrollLeft >= maxScrollLeft - 10 ? 0 : scrollLeft + scrollAmount;
  };

  return (
    <motion.section
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"
      initial="hidden"
      variants={sectionMotion}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeader
        eyebrow="Dining"
        description="Explore standout restaurants near your next stop and open each card for a fuller look at the experience."
        title="Trending Restaurants"
      />

      <div>
        <div className="mb-4 hidden justify-end gap-3 md:flex">
          <button
            onClick={() => scroll("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
            aria-label="Scroll restaurants left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:bg-slate-50 active:scale-95"
            aria-label="Scroll restaurants right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <SwipeCarousel
          ref={carouselRef}
          className="md:[&>*]:min-w-[39%] xl:[&>*]:min-w-[26%]"
          items={restaurants}
          renderItem={(restaurant, index) => (
            <motion.article
              className="min-w-[73vw] cursor-pointer snap-start overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-soft md:min-w-[39%] xl:min-w-[26%]"
              key={restaurant.slug}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              onClick={() => handleRestaurantClick(restaurant)}
            >
              {/* Header Badge */}
              <div className="relative px-3 pt-3 pb-0 flex items-center justify-between">
                <div className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700">
                  <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  {restaurant.provider || "Featured Restaurant"}
                </div>
                <button
                  onClick={(e) => toggleRestaurantFavorite(restaurant, e)}
                  className="flex-shrink-0 rounded-full p-1 hover:bg-slate-100 transition"
                  aria-label={favoritedRestaurants.includes(restaurant.slug) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      favoritedRestaurants.includes(restaurant.slug)
                        ? 'fill-red-500 text-red-500'
                        : 'text-slate-400 hover:text-red-500'
                    }`}
                  />
                </button>
              </div>

              {/* Image */}
              <div className="relative h-44 overflow-hidden mt-2">
                <img
                  alt={restaurant.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  src={restaurant.image}
                />
              </div>

              {/* Colored Bar */}
              <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>

              {/* Content */}
              <div className="space-y-2 p-4">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {restaurant.type || "Dining Experience"}
                  </p>
                  <h3 className="font-display text-base font-bold text-slate-950 mt-1">{restaurant.title}</h3>
                  <p className="mt-1 text-xs text-slate-600">{restaurant.description}</p>
                </div>

                {/* Info Tags */}
                <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1">
                    <UtensilsCrossed className="h-3 w-3 text-primary" />
                    {restaurant.cuisine}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-primary" />
                    {restaurant.location}
                  </span>
                </div>

                {/* Footer with Rating and Price */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-950">
                      {restaurant.rating || "4.9"}
                      <span className="ml-1 text-slate-400">★</span>
                    </span>
                    <span className="text-xs text-slate-500">({restaurant.reviews || "128"})</span>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    From {restaurant.price || "$50"}
                  </span>
                </div>
              </div>
            </motion.article>
          )}
        />
      </div>

      <Modal
        isOpen={showSignInModal}
        onClose={() => setShowSignInModal(false)}
        title="Sign In Required"
        description="Please sign in to your account to add restaurants to your favorites."
        onConfirm={() => navigate('/signin')}
        confirmText="Sign In"
        cancelText="Cancel"
      />
    </motion.section>
  );
}
