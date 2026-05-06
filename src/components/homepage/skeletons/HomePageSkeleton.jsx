import { Navbar } from "@/components/homepage/Navbar";
import { Footer } from "@/components/homepage/Footer";
import { HeroSkeleton } from "./HeroSkeleton";
import { TourCarouselSkeleton, DestinationsSkeleton } from "./SectionSkeleton";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-[color:var(--page-bg)] text-slate-900">
      <Navbar />
      <HeroSkeleton />

      <main className="mx-auto max-w-[1520px] px-4 pb-[3.4rem] sm:px-6 sm:pb-14 overflow-hidden">
        <div className="grid gap-[2.125rem] md:gap-8 xl:gap-7 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="space-y-[1.7rem] pt-[1.4875rem] min-w-0 md:space-y-6 md:pt-6 xl:space-y-5 xl:pt-5">
            <TourCarouselSkeleton delay={0} />
            <div className="space-y-[1.7rem] pt-0 md:space-y-6 md:pt-4 xl:space-y-4 xl:pt-5">
              <DestinationsSkeleton delay={50} />
              <TourCarouselSkeleton delay={100} />
              <TourCarouselSkeleton delay={150} />
              <TourCarouselSkeleton delay={200} />
            </div>
          </div>
          <div className="pt-[1.7rem] min-w-0 md:pt-6 xl:pt-4">
            <SidebarSkeleton />
          </div>
        </div>
      </main>

      {/* Newsletter Skeleton - Full Width */}
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 mb-[3.4rem] md:mb-14 overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-2 items-stretch rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
          <Skeleton className="h-[280px] lg:h-auto" delay={0} />
          <div className="bg-[color:var(--brand-mist)] p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4">
            <Skeleton className="h-9 w-3/4" delay={20} />
            <Skeleton className="h-4 w-full" delay={40} />
            <Skeleton className="h-4 w-5/6" delay={50} />
            <div className="flex gap-3 mt-4">
              <Skeleton className="h-12 flex-1 rounded-lg" delay={60} />
              <Skeleton className="h-12 w-32 rounded-lg" delay={70} />
            </div>
            <Skeleton className="h-3 w-full mt-2" delay={80} />
          </div>
        </div>
      </div>

      {/* Features Skeleton - Full Width */}
      <div className="mx-auto max-w-[1520px] px-4 sm:px-6 mb-[3.4rem] md:mb-14">
        <div className="py-8">
          <div className="mb-6 text-center">
            <Skeleton className="h-8 w-64 mx-auto mb-2" delay={0} />
            <Skeleton className="h-4 w-96 mx-auto" delay={20} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {[0, 15, 30, 45, 60, 75].map((extraDelay, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <Skeleton className="size-12 sm:size-14 lg:size-16 rounded-full" delay={40 + extraDelay} />
                <Skeleton className="h-4 w-24" delay={50 + extraDelay} />
                <Skeleton className="h-3 w-28" delay={60 + extraDelay} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
