import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { TourCard } from "@/components/homepage/TourCard";
import { DestinationCard } from "@/components/homepage/DestinationCard";
import { pickupTours, recommendedTours, topRatedTours, leisureTours, destinations } from "@/components/homepage/data";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { AuthModal } from "@/components/ui/auth-modal";
import { useAuthModal } from "@/contexts/AuthModalContext";

function AllToursPageContent() {
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category') || 'all';
  const { isAuthModalOpen, closeAuthModal } = useAuthModal();
  const [sortBy, setSortBy] = useState('featured');
  const [expandedFilters, setExpandedFilters] = useState({
    dates: true,
    duration: true,
    price: true,
    rating: true
  });

  // Map category to tours/destinations data
  const categoryMap = {
    tours: { title: "Pick up from where you left off", items: pickupTours, type: "tours" },
    recommended: { title: "Recommended for You", items: recommendedTours, type: "tours" },
    deals: { title: "Top Rated by Travellers", items: topRatedTours, type: "tours" },
    leisure: { title: "Leisure & Relaxation", items: leisureTours, type: "tours" },
    destinations: { title: "Popular Destinations", items: destinations, type: "destinations" },
    all: { title: "All Tours", items: [...pickupTours, ...recommendedTours, ...topRatedTours, ...leisureTours], type: "tours" }
  };

  const { title, items, type } = categoryMap[category] || categoryMap.all;

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-white text-slate-900">
        <Navbar />
        
        <main className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <aside className="hidden w-72 shrink-0 lg:block">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-slate-900">Filters</h3>
                  
                  {/* Select Dates */}
                  <div className="mb-4 border-b border-slate-200 pb-4">
                    <button
                      onClick={() => toggleFilter('dates')}
                      className="flex w-full items-center justify-between py-2 font-medium text-slate-900"
                    >
                      <span>Select Dates</span>
                      <ChevronDown className={`size-5 transition-transform ${expandedFilters.dates ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFilters.dates && (
                      <div className="mt-3 space-y-2">
                        <input type="date" className="w-full rounded border border-slate-300 px-3 py-2 text-sm" />
                      </div>
                    )}
                  </div>

                  {/* Duration */}
                  <div className="mb-4 border-b border-slate-200 pb-4">
                    <button
                      onClick={() => toggleFilter('duration')}
                      className="flex w-full items-center justify-between py-2 font-medium text-slate-900"
                    >
                      <span>Duration</span>
                      <ChevronDown className={`size-5 transition-transform ${expandedFilters.duration ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFilters.duration && (
                      <div className="mt-3 space-y-3">
                        {['Up to 2 hours', '2 - 5 hours', '5 - 8 hours', 'Full day'].map(duration => (
                          <label key={duration} className="flex items-center gap-3 text-sm">
                            <input type="checkbox" className="rounded border-slate-300" />
                            <span className="text-slate-700">{duration}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4 border-b border-slate-200 pb-4">
                    <button
                      onClick={() => toggleFilter('price')}
                      className="flex w-full items-center justify-between py-2 font-medium text-slate-900"
                    >
                      <span>Price</span>
                      <ChevronDown className={`size-5 transition-transform ${expandedFilters.price ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFilters.price && (
                      <div className="mt-3 space-y-3">
                        <input type="range" min="0" max="500" className="w-full" />
                        <div className="flex gap-2">
                          <input type="number" placeholder="Min" className="w-full rounded border border-slate-300 px-2 py-1 text-sm" />
                          <input type="number" placeholder="Max" className="w-full rounded border border-slate-300 px-2 py-1 text-sm" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="pb-4">
                    <button
                      onClick={() => toggleFilter('rating')}
                      className="flex w-full items-center justify-between py-2 font-medium text-slate-900"
                    >
                      <span>Rating</span>
                      <ChevronDown className={`size-5 transition-transform ${expandedFilters.rating ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFilters.rating && (
                      <div className="mt-3 space-y-3">
                        {[5, 4, 3, 2, 1].map(star => (
                          <label key={star} className="flex items-center gap-3 text-sm">
                            <input type="checkbox" className="rounded border-slate-300" />
                            <span className="text-slate-700">{'⭐'.repeat(star)} & up</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Top Bar */}
              <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
                <p className="text-sm font-medium text-slate-600">{items.length} {type === "destinations" ? t('common.destinations') : t('common.tours')} available</p>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded border border-slate-300 px-3 py-2 text-sm font-medium text-slate-900"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Tours Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((item, index) => (
                  type === "destinations" ? (
                    <DestinationCard key={`${item.title}-${index}`} {...item} />
                  ) : (
                    <TourCard key={`${item.title}-${index}`} {...item} />
                  )
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </>
  );
}

function AllToursPage() {
  return (
    <AuthModalProvider>
      <AllToursPageContent />
    </AuthModalProvider>
  );
}

export default AllToursPage;
