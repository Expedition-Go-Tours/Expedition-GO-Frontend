import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="relative overflow-visible bg-slate-300 text-white pb-10 sm:pb-12.5 md:pb-25.5 animate-pulse">
      <div className="relative mx-auto max-w-380 px-4 py-4 sm:px-6 sm:py-5 md:py-7 overflow-visible">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="flex justify-center">
            <Skeleton className="h-6 w-40 rounded-full" />
          </div>

          {/* Title */}
          <Skeleton className="mt-2 h-8 sm:h-10 md:h-12 w-3/4 mx-auto" />
          
          {/* Subtitle */}
          <Skeleton className="mt-2 h-4 sm:h-5 w-1/2 mx-auto" />

          {/* Search Box */}
          <div className="mx-auto mt-3 sm:mt-3.5 md:mt-4 max-w-4xl">
            <Skeleton className="h-32 sm:h-24 rounded-lg" />
          </div>

          {/* Stats */}
          <div className="mt-3 sm:mt-3.5 md:mt-4 hidden md:grid grid-cols-3 gap-2">
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
