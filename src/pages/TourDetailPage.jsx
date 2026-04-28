import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Star, 
  Heart,
  Check,
  X,
  Info,
  Shield,
  User,
  Truck
} from "lucide-react";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { RecentlyViewedProvider, useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/components/auth/AuthProvider";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useCurrency } from "@/contexts/CurrencyContext";

// Mock data - In production, this would come from an API
const tourData = {
  name: "Adventure in Kenya 4",
  summary: "Experience the wild like never before.",
  description: "A 5-day guided safari through Kenya's top national parks.",
  price: 1200,
  duration: "5 days",
  difficulty: "medium",
  maxGroupSize: 10,
  freeCancellation: true,
  liveGuide: true,
  pickupIncluded: true,
  location: {
    type: "Point",
    coordinates: [36.8219, -1.2921],
    address: "Nairobi",
    description: "Kenya"
  },
  itinerary: [
    {
      type: "Point",
      coordinates: [36.8219, -1.2921],
      description: "Arrival and briefing",
      day: 1
    },
    {
      type: "Point",
      coordinates: [35.1436, -1.4061],
      description: "Game drive in Maasai Mara",
      day: 2
    },
    {
      type: "Point",
      coordinates: [34.7617, -0.0236],
      description: "Lake Victoria exploration",
      day: 3
    }
  ],
  highlights: ["Wildlife safari", "Big Five animals", "Luxury camping"],
  includes: ["Accommodation", "Meals", "Transport", "Guide"],
  notSuitableFor: ["Pregnant women", "Wheelchair users"],
  importantInfo: ["Bring sunscreen", "Carry passport", "Follow guide instructions"],
  imageCover: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1800&q=80",
  images: [
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
  ],
  ratingsAverage: 4.5,
  ratingsQuantity: 128,
  startDates: ["2026-06-01T00:00:00.000Z", "2026-07-15T00:00:00.000Z", "2026-08-10T00:00:00.000Z"]
};

function TourDetailContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { openAuthModal } = useAuthModal();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { convertPrice } = useCurrency();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  // Add to recently viewed when component mounts (user has viewed the page)
  useEffect(() => {
    addToRecentlyViewed({
      title: tourData.name,
      duration: tourData.duration,
      price: `${tourData.price}`,
      rating: tourData.ratingsAverage.toString(),
      reviews: tourData.ratingsQuantity.toString(),
      image: tourData.imageCover
    });
  }, [addToRecentlyViewed]);

  const isFavorited = isInWishlist(tourData.name);
  
  // Convert price
  const convertedPrice = convertPrice(tourData.price);

  const handleWishlistToggle = () => {
    if (!user) {
      openAuthModal();
      return;
    }
    toggleWishlist({
      title: tourData.name,
      duration: tourData.duration,
      price: `$${tourData.price}`,
      rating: tourData.ratingsAverage.toString(),
      reviews: tourData.ratingsQuantity.toString(),
      image: tourData.imageCover
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "hard": return "bg-red-100 text-red-700";
      default: return "bg-slate-100 text-slate-700";
    }
  };
  
  const getDifficultyLabel = (difficulty) => {
    return t(`tourDetail.${difficulty}`);
  };

  return (
    <div className="min-h-screen bg-[color:var(--page-bg)]">
      <Navbar />

      <main className="mx-auto max-w-[1520px] px-4 py-6 sm:px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[color:var(--brand-green)] transition mb-4 cursor-pointer hover:opacity-80"
        >
          <ArrowLeft className="size-4" />
          {t('common.back')}
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column - Tour Details */}
          <div>
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] rounded-2xl overflow-hidden">
                <img
                  src={tourData.images[selectedImage]}
                  alt={tourData.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleWishlistToggle}
                  className="absolute top-4 right-4 grid size-12 place-items-center rounded-full bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white hover:scale-110"
                >
                  <Heart
                    className={`size-6 transition-colors ${
                      isFavorited ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {tourData.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-24 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === index
                        ? "border-[color:var(--brand-green)]"
                        : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tour Info */}
            <div className="mt-8">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">{tourData.name}</h1>
                  <p className="text-lg text-slate-600 mt-2">{tourData.summary}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="size-5 fill-orange-400 text-orange-400" />
                  <span className="text-lg font-semibold">{tourData.ratingsAverage}</span>
                  <span className="text-slate-500">({tourData.ratingsQuantity} reviews)</span>
                </div>
              </div>

              {/* Quick Info Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className={getDifficultyColor(tourData.difficulty)}>
                  {getDifficultyLabel(tourData.difficulty)}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="size-3" />
                  {tourData.duration}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Users className="size-3" />
                  {t('tourDetail.maxPeople')} {tourData.maxGroupSize} {t('tourDetail.people')}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  {tourData.location.address}
                </Badge>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-[color:var(--brand-mist)] rounded-xl">
                {tourData.freeCancellation && (
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="size-5 text-[color:var(--brand-green)]" />
                    <span>{t('features.freeCancellation')}</span>
                  </div>
                )}
                {tourData.liveGuide && (
                  <div className="flex items-center gap-2 text-sm">
                    <User className="size-5 text-[color:var(--brand-green)]" />
                    <span>{t('tourDetail.liveGuide')}</span>
                  </div>
                )}
                {tourData.pickupIncluded && (
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="size-5 text-[color:var(--brand-green)]" />
                    <span>{t('tourDetail.pickupIncluded')}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('tourDetail.aboutTour')}</h2>
                <p className="text-slate-700 leading-relaxed">{tourData.description}</p>
              </div>

              {/* Highlights */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('tourDetail.highlights')}</h2>
                <ul className="space-y-3">
                  {tourData.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="size-5 text-[color:var(--brand-green)] mt-0.5 shrink-0" />
                      <span className="text-slate-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Itinerary */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('tourDetail.itinerary')}</h2>
                <div className="space-y-4">
                  {tourData.itinerary.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-white rounded-lg border border-slate-200">
                      <div className="flex items-center justify-center size-10 rounded-full bg-[color:var(--brand-green)] text-white font-bold shrink-0">
                        {item.day}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{t('tourDetail.day')} {item.day}</h3>
                        <p className="text-slate-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('tourDetail.whatsIncluded')}</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {tourData.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                      <Check className="size-5 text-[color:var(--brand-green)] shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Not Suitable For */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('tourDetail.notSuitableFor')}</h2>
                <div className="space-y-3">
                  {tourData.notSuitableFor.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <X className="size-5 text-red-500 mt-0.5 shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Information */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('tourDetail.importantInfo')}</h2>
                <div className="space-y-3">
                  {tourData.importantInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Info className="size-5 text-blue-600 mt-0.5 shrink-0" />
                      <span className="text-slate-700">{info}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div>
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-900">{convertedPrice.formatted}</span>
                  <span className="text-slate-500">{t('tourDetail.perPerson')}</span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  {t('tourDetail.selectDate')}
                </label>
                <div className="space-y-2">
                  {tourData.startDates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition ${
                        selectedDate === date
                          ? "border-[color:var(--brand-green)] bg-[color:var(--brand-mist)]"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="size-4 text-slate-600" />
                        <span className="text-sm font-medium">{formatDate(date)}</span>
                      </div>
                      {selectedDate === date && (
                        <Check className="size-5 text-[color:var(--brand-green)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book Button */}
              <Button
                className="w-full h-12 bg-[color:var(--brand-green)] hover:bg-[color:var(--brand-green)]/90 !text-white font-semibold text-base"
                disabled={!selectedDate}
              >
                {selectedDate ? t('tourDetail.bookNow') : t('tourDetail.selectDateToBook')}
              </Button>

              <p className="text-xs text-center text-slate-500 mt-4">
                {t('tourDetail.notChargedYet')}
              </p>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Check className="size-4 text-[color:var(--brand-green)]" />
                  <span>{t('tourDetail.freeCancellation')}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Check className="size-4 text-[color:var(--brand-green)]" />
                  <span>{t('tourDetail.reservePayLater')}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Check className="size-4 text-[color:var(--brand-green)]" />
                  <span>{t('tourDetail.instantConfirmation')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function TourDetailPage() {
  return (
    <AuthModalProvider>
      <WishlistProvider>
        <RecentlyViewedProvider>
          <TourDetailContent />
        </RecentlyViewedProvider>
      </WishlistProvider>
    </AuthModalProvider>
  );
}

export default TourDetailPage;
