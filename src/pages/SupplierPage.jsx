import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Star, Heart, Phone, Mail, Globe, MapPin, ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { getTourByTitle, getAllTours } from "@/lib/tourData";

function SupplierPage() {
  const { tourTitle } = useParams();
  const { t } = useTranslation();
  const decodedTitle = decodeURIComponent(tourTitle);
  const { convertPrice } = useCurrency();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [supplierInfoOpen, setSupplierInfoOpen] = useState(false);

  const supplierData = useMemo(() => {
    const tour = getTourByTitle(decodedTitle);
    if (!tour) return null;
    const src = tour;
    const companyName = src?.supplierName || src?.operatorName || "Expedition-Go Tours Ltd";
    return {
      name: companyName,
      logo: "",
      email: src?.supplierEmail || src?.operatorEmail || "contact@expeditiongo.com",
      phone: src?.supplierPhone || src?.operatorPhone || "+233 123 456 789",
      website: src?.supplierWebsite || src?.operatorWebsite || "https://expeditiongo.com",
      address: src?.supplierAddress || src?.operatorAddress || src?.city || "Accra, Ghana",
      description: src?.supplierDescription || src?.operatorDescription || "Expedition-Go Tours is a trusted tour operator based in Accra, Ghana, offering curated cultural, wildlife, and adventure experiences across West Africa.",
      rating: src?.rating || 4.9,
      toursCount: 0,
    };
  }, [decodedTitle]);

  const supplierTours = useMemo(() => {
    if (!supplierData) return [];
    return getAllTours().filter(t => t.title !== decodedTitle);
  }, [supplierData, decodedTitle]);

  if (!supplierData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
        <p className="text-sm text-slate-500">Supplier not found</p>
        <Link to="/" state={{ postAuthSplash: true }} className="text-sm font-semibold text-[color:var(--brand-green)] hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mx-auto max-w-[1520px] px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <Link
          to="/"
          state={{ postAuthSplash: true }}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-900 transition hover:text-[color:var(--brand-green)]"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <div className="flex items-center gap-4">
          <div className="grid size-16 shrink-0 place-items-center rounded-full border border-slate-200 bg-white text-xs font-black text-[color:var(--brand-green)]">
            {supplierData.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 sm:text-2xl">{supplierData.name}</h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-900">{supplierData.rating}</span>
              <span>•</span>
              <span>{supplierTours.length} tours</span>
            </div>
          </div>
        </div>

        <div className="mt-6 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setSupplierInfoOpen(o => !o)}
            className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-[color:var(--brand-green)]"
          >
            About this supplier
            {supplierInfoOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
          {supplierInfoOpen && (
            <div className="pb-5">
              <p className="text-sm leading-7 text-slate-600">{supplierData.description}</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="size-4 text-[color:var(--brand-green)]" />
                  <span className="text-slate-700">{supplierData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 text-[color:var(--brand-green)]" />
                  <a href={`mailto:${supplierData.email}`} className="text-[color:var(--brand-green)] underline-offset-2 hover:underline">{supplierData.email}</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="size-4 text-[color:var(--brand-green)]" />
                  <a href={supplierData.website} target="_blank" rel="noopener noreferrer" className="text-[color:var(--brand-green)] underline-offset-2 hover:underline">{supplierData.website}</a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="size-4 text-[color:var(--brand-green)]" />
                  <span className="text-slate-700">{supplierData.address}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8">
          <h2 className="text-base font-black text-slate-900">All tours by this supplier</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {supplierTours.map((tour) => {
              const detailTo = `/tour/${encodeURIComponent(tour.title)}`;
              const converted = convertPrice(tour.price);
              const reviewsDisplay = tour.reviews ? (typeof tour.reviews === "number" ? String(tour.reviews) : String(tour.reviews).replace(/,/g, "")) : "0";
              const isFav = isInWishlist(tour.title);
              return (
                <article key={tour.title} className="group">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_1px_4px_rgba(15,23,42,0.08)] transition hover:shadow-md">
                    <div className="relative">
                      <Link
                        to={detailTo}
                        className="block overflow-hidden rounded-t-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-green)]"
                      >
                        <div className="relative aspect-[4/3] bg-slate-100">
                          <img
                            src={tour.image}
                            alt=""
                            className="h-full w-full object-cover pointer-events-none transition duration-300 group-hover:scale-105"
                          />
                          <span className="pointer-events-none absolute left-2 top-2 rounded-md bg-slate-700/95 px-2 py-1 text-[11px] font-bold text-white shadow-sm sm:text-[10px]">
                            {tour.duration}
                          </span>
                        </div>
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          toggleWishlist({
                            title: tour.title,
                            slug: tour.slug,
                            duration: tour.duration,
                            price: tour.price,
                            rating: tour.rating,
                            reviews: tour.reviews,
                            image: tour.image,
                          })
                        }
                        className="absolute right-2 top-2 z-10 grid size-9 place-items-center rounded-full border border-slate-200/90 bg-white text-slate-700 shadow-sm transition hover:scale-105"
                        aria-label={t("nav.wishlist")}
                      >
                        <Heart
                          className={`size-4 ${isFav ? "fill-[color:var(--brand-green)] text-[color:var(--brand-green)]" : "fill-none"}`}
                          strokeWidth={2}
                        />
                      </button>
                    </div>

                    <div className="flex flex-1 flex-col px-3 pb-3 pt-2.5 sm:px-3.5 sm:pb-3.5 sm:pt-3">
                      <Link
                        to={detailTo}
                        className="line-clamp-2 min-h-[2.5rem] font-bold leading-snug text-slate-900 hover:underline"
                        style={{ fontSize: "clamp(0.8125rem, 0.6vw + 0.5rem, 0.9375rem)" }}
                      >
                        {tour.title}
                      </Link>

                      <p className="mt-1.5 text-[12px] font-medium leading-snug text-slate-500 sm:text-[11px]">
                        Free cancellation
                        <span className="mx-1 text-slate-400" aria-hidden>•</span>
                        Pickup included
                      </p>

                      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                        <div className="flex min-w-0 items-center gap-1">
                          <Star
                            className="size-4 shrink-0 fill-amber-500 text-amber-500"
                            strokeWidth={1.5}
                            aria-hidden
                          />
                          <span className="text-[13px] font-bold tabular-nums text-slate-900 sm:text-[12px]">
                            {tour.rating}
                          </span>
                          <span className="text-[12px] text-slate-500 sm:text-[11px]">
                            ({reviewsDisplay})
                          </span>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-[11px] font-medium leading-none text-slate-500">From</p>
                          <p className="mt-0.5 text-sm font-bold tabular-nums text-slate-900">{converted.formatted}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default SupplierPage;
