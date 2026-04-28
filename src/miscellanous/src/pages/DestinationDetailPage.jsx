import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DestinationDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const destination = location.state?.destination;
  const [isFavorited, setIsFavorited] = useState(false);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Destination not found
          </h1>
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-white shadow-lg">
          {/* Hero Image */}
          <div className="relative h-96 overflow-hidden md:h-[28rem]">
            <img
              alt={destination.title}
              className="h-full w-full object-cover"
              src={destination.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="absolute right-6 top-6 rounded-full bg-white/90 p-2 backdrop-blur-sm hover:bg-white transition"
            >
              <Heart
                className={`h-6 w-6 transition-colors ${
                  isFavorited
                    ? "fill-red-500 text-red-500"
                    : "text-slate-600 hover:text-red-500"
                }`}
              />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 p-6 sm:p-8 md:p-10">
            {/* Header Section */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-950 mb-2">
                    {destination.title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-slate-600 font-medium">
                      {destination.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Destination Info */}
            <div className="space-y-4 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold text-slate-950">
                About this destination
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                Discover the beauty and culture of {destination.title}, one of
                Ghana's most captivating destinations. This remarkable location offers
                unforgettable experiences, rich cultural heritage, and breathtaking
                natural landscapes. Whether you're seeking adventure, relaxation, or
                cultural immersion, {destination.title} has something special to offer
                every traveler.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950">
                Why visit {destination.title}?
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Authentic Experience</p>
                    <p className="text-sm text-slate-600">
                      Immerse yourself in local culture and traditions
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Year-Round Travel</p>
                    <p className="text-sm text-slate-600">
                      Visit any time for unique seasonal experiences
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Best Time to Visit */}
            <div className="space-y-4 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-bold text-slate-950">Best time to visit</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="font-semibold text-slate-900 mb-1">Peak Season</p>
                  <p className="text-sm text-slate-600">December - February</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="font-semibold text-slate-900 mb-1">Shoulder Season</p>
                  <p className="text-sm text-slate-600">March - May & September - November</p>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="font-semibold text-slate-900 mb-1">Temperature</p>
                  <p className="text-sm text-slate-600">24°C - 28°C year-round</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="border-t border-slate-200 pt-6 flex gap-4">
              <Button className="flex-1" size="lg">
                Book a Tour
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                {isFavorited ? "Saved" : "Save Destination"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
