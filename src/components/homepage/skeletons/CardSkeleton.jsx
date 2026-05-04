import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function CardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm">
      <Skeleton className="h-40 xl:h-44 w-full rounded-none" />
      <CardContent className="p-3.5 xl:p-4">
        <Skeleton className="h-3 w-24 mb-2" />
        <Skeleton className="h-4 w-5/6 mb-2" />
        <Skeleton className="h-3 w-4/5 mb-3" />
        <div className="flex items-end justify-between gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}

export function CompactCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
      <Skeleton className="h-40 w-full rounded-none" />
      <CardContent className="p-3">
        <Skeleton className="h-3 w-3/4 mb-2" />
        <Skeleton className="h-3 w-20 mb-1" />
        <Skeleton className="h-4 w-16" />
      </CardContent>
    </Card>
  );
}

export function DestinationCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm">
      <Skeleton className="h-32 xl:h-36 w-full rounded-none" />
    </Card>
  );
}
