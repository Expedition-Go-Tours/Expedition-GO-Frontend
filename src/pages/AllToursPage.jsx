import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

  return (
    <>
      <div className="min-h-screen bg-[color:var(--page-bg)] text-slate-900">
        <Navbar />
        
        <main className="mx-auto max-w-[1520px] px-4 py-8 sm:px-6">
          <div className="mb-6">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
            <p className="mt-2 text-sm text-slate-600">{items.length} {type === "destinations" ? t('common.destinations') : t('common.tours')} {t('common.available')}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item, index) => (
              type === "destinations" ? (
                <DestinationCard key={`${item.title}-${index}`} {...item} />
              ) : (
                <TourCard key={`${item.title}-${index}`} {...item} />
              )
            ))}
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
