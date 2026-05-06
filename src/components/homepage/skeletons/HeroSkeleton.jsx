import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="relative overflow-visible bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 text-white pb-10 sm:pb-12.5 md:pb-25.5">
      <div className="relative mx-auto max-w-380 px-4 py-6 sm:px-6 sm:py-8 md:py-10 overflow-visible">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <Skeleton className="h-7 w-48 rounded-full" delay={0} />
          </div>

          {/* Title - Multiple lines for realistic look */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-10 sm:h-12 md:h-14 w-5/6 mx-auto" delay={20} />
            <Skeleton className="h-10 sm:h-12 md:h-14 w-4/6 mx-auto" delay={40} />
          </div>
          
          {/* Subtitle */}
          <Skeleton className="mt-3 h-4 sm:h-5 w-3/5 mx-auto" delay={60} />

          {/* Search Box - More detailed */}
          <div className="mx-auto mt-6 sm:mt-7 md:mt-8 max-w-4xl">
            <div className="rounded-xl border border-slate-300 bg-white p-4 shadow-lg">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" delay={80} />
                  <Skeleton className="h-10 w-full" delay={90} />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-16" delay={100} />
                  <Skeleton className="h-10 w-full" delay={110} />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-24" delay={120} />
                  <Skeleton className="h-10 w-full" delay={130} />
                </div>
              </div>
              <Skeleton className="mt-4 h-12 w-full rounded-lg" delay={150} />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 sm:mt-7 md:mt-8 hidden md:grid grid-cols-3 gap-4">
            {[0, 20, 40].map((extraDelay) => (
              <div key={extraDelay} className="rounded-lg border border-slate-300 bg-white/50 p-4 space-y-2">
                <Skeleton className="h-8 w-20 mx-auto" delay={170 + extraDelay} />
                <Skeleton className="h-3 w-32 mx-auto" delay={190 + extraDelay} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}