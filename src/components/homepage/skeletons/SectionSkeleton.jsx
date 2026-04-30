import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton, DestinationCardSkeleton } from "./CardSkeleton";

export function TourCarouselSkeleton() {
  return (
    <section className="py-2.5 xl:py-3">
      <Skeleton className="mb-4 h-6 w-48" />
      <div className="flex gap-2 xl:gap-3 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-56 shrink-0">
            <CardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}

export function DestinationsSkeleton() {
  return (
    <section className="py-2.5 xl:py-3">
      <Skeleton className="mb-4 h-6 w-48" />
      <div className="flex gap-2 xl:gap-3 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-56 shrink-0">
            <DestinationCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
