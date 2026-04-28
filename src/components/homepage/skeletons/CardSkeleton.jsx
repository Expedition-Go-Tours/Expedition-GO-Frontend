import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function CardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-[12px] border border-slate-200 bg-white shadow-sm">
      <Skeleton className="h-24 xl:h-28 w-full rounded-none" />
      <CardContent className="p-2.5 xl:p-3">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}

export function CompactCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-sm">
      <Skeleton className="h-24 w-full rounded-none" />
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
      <Skeleton className="h-24 w-full rounded-none" />
    </Card>
  );
}
