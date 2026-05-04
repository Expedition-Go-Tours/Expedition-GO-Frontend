import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton, DestinationCardSkeleton } from "./CardSkeleton";

export function TourCarouselSkeleton() {
  return (
    <section className="py-4 xl:py-5">
      <Skeleton className="mb-3 h-6 w-48" />
      <div className="hidden xl:flex gap-3 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="min-w-[280px] shrink-0">
            <CardSkeleton />
          </div>
        ))}
      </div>
      <div className="xl:hidden flex gap-3 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-[280px] shrink-0">
            <CardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}

export function DestinationsSkeleton() {
  return (
    <section className="py-4 xl:py-5">
      <Skeleton className="mb-3 h-6 w-48" />
      <div className="hidden xl:flex gap-3 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="min-w-[280px] shrink-0">
            <DestinationCardSkeleton />
          </div>
        ))}
      </div>
      <div className="xl:hidden flex gap-3 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-[280px] shrink-0">
            <DestinationCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
