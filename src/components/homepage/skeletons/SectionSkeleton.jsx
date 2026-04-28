import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton, DestinationCardSkeleton } from "./CardSkeleton";

export function TourCarouselSkeleton() {
  return (
    <section className="py-1.5 xl:py-2">
      <Skeleton className="h-6 w-48 mb-3" />
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
    <section className="py-1.5 xl:py-2">
      <Skeleton className="h-6 w-48 mb-3" />
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
