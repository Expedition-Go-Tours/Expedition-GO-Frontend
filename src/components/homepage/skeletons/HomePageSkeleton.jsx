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

      <main className="mx-auto max-w-[1520px] px-4 pb-10 sm:px-6 sm:pb-12 overflow-hidden">
        <div className="grid gap-6 xl:gap-7 xl:grid-cols-[minmax(0,1fr)_430px]">
          <div className="space-y-[0.7rem] pt-4 min-w-0">
            <TourCarouselSkeleton />
            <div className="space-y-[0.7rem] pt-5">
              <DestinationsSkeleton />
              <TourCarouselSkeleton />
              <TourCarouselSkeleton />
              <TourCarouselSkeleton />
            </div>
          </div>
          <div className="pt-4 min-w-0">
            <SidebarSkeleton />
          </div>
        </div>

        {/* Newsletter Skeleton */}
        <div className="mt-12">
          <div className="grid gap-0 lg:grid-cols-2 items-stretch rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
            <Skeleton className="h-[280px] lg:h-auto" />
            <div className="bg-[color:var(--brand-mist)] p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="flex gap-3 mt-4">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 w-32" />
              </div>
              <Skeleton className="h-3 w-full mt-2" />
            </div>
          </div>
        </div>

        {/* Features Skeleton */}
        <div className="mt-12 py-8">
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-2">
                <Skeleton className="size-10 sm:size-12 lg:size-14 rounded-full" />
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-2 w-24" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
