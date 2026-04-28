import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Clock3, MapPin, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRestaurantBySlug } from "@/data/restaurants";

export function RestaurantDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { restaurantSlug } = useParams();
  const restaurant = location.state?.restaurant ?? getRestaurantBySlug(restaurantSlug);

  if (!restaurant) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-slate-900">Restaurant not found</h1>
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="relative h-96 overflow-hidden md:h-[32rem]">
            <img alt={restaurant.title} className="h-full w-full object-cover" src={restaurant.image} />
            <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-primary backdrop-blur-sm">
              {restaurant.priceRange}
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8 md:p-10">
            <div>
              <h1 className="mb-4 text-3xl font-bold text-slate-950 md:text-4xl">{restaurant.title}</h1>

              <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <UtensilsCrossed className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{restaurant.cuisine}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{restaurant.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock3 className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{restaurant.hours}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold text-slate-950">About this restaurant</h2>
              <p className="leading-relaxed text-slate-600">{restaurant.description}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950">Popular highlights</h2>
              <ul className="space-y-3">
                {restaurant.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <Button className="w-full" size="lg">
                Reserve a table
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
