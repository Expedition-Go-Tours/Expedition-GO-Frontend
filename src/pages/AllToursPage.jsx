import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
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
    rating: true,
    people: true,
    timeOfDay: true
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState([]);

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
      <div className="flex flex-col min-h-screen">
        <div className="bg-white text-slate-900">
          <Navbar />
        </div>
        
        <main className="bg-white flex-1 mx-auto w-full max-w-[1520px] px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">{title}</h1>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters - Hidden for destinations */}
            {category !== 'destinations' && (
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
                        <div>
                          <input 
                            type="range" 
                            min="0" 
                            max="500" 
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full"
                          />
                          <div className="mt-2 text-sm text-slate-600">
                            ${priceRange[0]} - ${priceRange[1]}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="number" 
                            placeholder="Min" 
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                            className="w-full rounded border border-slate-300 px-2 py-1 text-sm" 
                          />
                          <input 
                            type="number" 
                            placeholder="Max" 
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500])}
                            className="w-full rounded border border-slate-300 px-2 py-1 text-sm" 
                          />
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

                  {/* Number of People */}
                  <div className="mb-4 border-b border-slate-200 pb-4">
                    <button
                      onClick={() => toggleFilter('people')}
                      className="flex w-full items-center justify-between py-2 font-medium text-slate-900"
                    >
                      <span>Number of People</span>
                      <ChevronDown className={`size-5 transition-transform ${expandedFilters.people ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFilters.people && (
                      <div className="mt-3 space-y-4">
                        <div>
                          <label className="text-sm font-medium text-slate-700 block mb-2">Adults</label>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setAdults(Math.max(1, adults - 1))}
                              className="size-8 rounded border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                            >
                              −
                            </button>
                            <span className="text-sm font-semibold w-8 text-center">{adults}</span>
                            <button
                              onClick={() => setAdults(adults + 1)}
                              className="size-8 rounded border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-700 block mb-2">Children</label>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              className="size-8 rounded border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                            >
                              −
                            </button>
                            <span className="text-sm font-semibold w-8 text-center">{children}</span>
                            <button
                              onClick={() => setChildren(children + 1)}
                              className="size-8 rounded border border-slate-300 flex items-center justify-center hover:bg-slate-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Time of Day */}
                  <div className="mb-4 border-b border-slate-200 pb-4">
                    <button
                      onClick={() => toggleFilter('timeOfDay')}
                      className="flex w-full items-center justify-between py-2 font-medium text-slate-900"
                    >
                      <span>Time of Day</span>
                      <ChevronDown className={`size-5 transition-transform ${expandedFilters.timeOfDay ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFilters.timeOfDay && (
                      <div className="mt-3 space-y-3">
                        {['Morning', 'Afternoon', 'Evening'].map(time => (
                          <label key={time} className="flex items-center gap-3 text-sm">
                            <input 
                              type="checkbox" 
                              className="rounded border-slate-300"
                              checked={selectedTimeOfDay.includes(time)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedTimeOfDay([...selectedTimeOfDay, time]);
                                } else {
                                  setSelectedTimeOfDay(selectedTimeOfDay.filter(t => t !== time));
                                }
                              }}
                            />
                            <span className="text-slate-700">{time} Tours</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>
            )}

            {/* Main Content */}
            <div className={category === 'destinations' ? 'w-full' : 'flex-1'}>
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
