import { Skeleton } from "@/components/ui/skeleton";

function SidebarDealCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
      <Skeleton className="h-20 w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

function CompactCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
      <Skeleton className="h-24 w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <aside className="space-y-4 overflow-hidden">
      {/* Last Minute Deals Section */}
      <div className="rounded-[18px] border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 overflow-hidden">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-16" />
          </div>
          {/* Desktop: Grid layout */}
          <div className="hidden xl:grid xl:grid-cols-2 xl:gap-3">
            {[...Array(4)].map((_, i) => (
              <SidebarDealCardSkeleton key={i} />
            ))}
          </div>
          {/* Mobile/Tablet: Show 2 cards */}
          <div className="xl:hidden flex gap-3 overflow-hidden">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="w-[160px] flex-shrink-0">
                <SidebarDealCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Experiences Section */}
      <div className="rounded-[18px] border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="p-4 overflow-hidden">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-16" />
          </div>
          {/* Desktop: Grid layout */}
          <div className="hidden xl:grid xl:grid-cols-2 xl:gap-3">
            {[...Array(6)].map((_, i) => (
              <CompactCardSkeleton key={i} />
            ))}
          </div>
          {/* Mobile/Tablet: Show 2 cards */}
          <div className="xl:hidden flex gap-3 overflow-hidden">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="w-[160px] flex-shrink-0">
                <CompactCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
