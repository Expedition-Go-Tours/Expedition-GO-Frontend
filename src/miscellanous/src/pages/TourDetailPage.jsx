import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Route, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TourDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const tour = location.state?.tour;

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Tour not found</h1>
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </div>
      </div>
    );
  }

  const parseTourDetails = (subtitle) => {
    const parts = subtitle.split(" · ");
    return parts;
  };

  const details = parseTourDetails(tour.subtitle);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-white shadow-lg">
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden md:h-[32rem]">
            <img
              alt={tour.title}
              className="h-full w-full object-cover"
              src={tour.image}
            />
            <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-primary backdrop-blur-sm">
              Recommended
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 p-6 sm:p-8 md:p-10">
            {/* Header */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-950 mb-4">
                {tour.title}
              </h1>

              <div className="flex flex-wrap gap-6 mb-6">
                {details.map((detail, index) => {
                  const icons = [Calendar, MapPin, Users];
                  const Icon = icons[index] || Route;

                  return (
                    <div key={index} className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        {detail}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="inline-block rounded-full bg-primary/10 px-6 py-2">
                <p className="text-2xl font-bold text-primary">{tour.price}</p>
              </div>
            </div>

            {/* Description Section */}
            <div className="space-y-4 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold text-slate-950">About this tour</h2>
              <p className="text-slate-600 leading-relaxed">
                Experience an unforgettable journey with our carefully curated tour. 
                This tour includes all the highlights you need to explore the destination 
                and immerse yourself in the local culture and natural beauty.
              </p>
            </div>

            {/* What's Included */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950">What's included</h2>
              <ul className="space-y-3">
                {[
                  "Professional tour guide",
                  "Transportation",
                  "Meals and refreshments",
                  "Entrance fees",
                  "Travel insurance"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <Button className="flex-1" size="lg">
                Book Now
              </Button>
              <Button variant="outline" className="flex-1" size="lg">
                Save for later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
