import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { TourCard } from "@/components/homepage/TourCard";
import { useWishlist } from "@/contexts/WishlistContext";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";

function WishlistPageContent() {
  const { t } = useTranslation();
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[color:var(--page-bg)] text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-[1520px] px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[color:var(--brand-green)] transition mb-4"
          >
            <ArrowLeft className="size-4" />
            {t('common.backToHome')}
          </Link>
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-full bg-[color:var(--brand-mist)] text-[color:var(--brand-green)]">
              <Heart className="size-6 fill-current" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">{t('wishlist.title')}</h1>
              <p className="text-sm text-slate-600 mt-1">
                {wishlist.length} {wishlist.length === 1 ? t('wishlist.tourSaved') : t('wishlist.toursSaved')}
              </p>
            </div>
          </div>
        </div>

        {/* Wishlist Content */}
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="grid size-24 place-items-center rounded-full bg-slate-100 text-slate-400 mb-6">
              <Heart className="size-12" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('wishlist.empty')}</h2>
            <p className="text-slate-600 mb-6 text-center max-w-md">
              {t('wishlist.emptyDesc')}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[color:var(--brand-green)] !text-white rounded-lg font-semibold hover:bg-[color:var(--brand-green)]/90 transition"
            >
              {t('wishlist.exploreTours')}
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlist.map((item, index) => (
              <TourCard key={`${item.title}-${index}`} {...item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function WishlistPage() {
  return (
    <AuthModalProvider>
      <RecentlyViewedProvider>
        <WishlistPageContent />
      </RecentlyViewedProvider>
    </AuthModalProvider>
  );
}

export default WishlistPage;
