import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function KpiCardSkeleton() {
  return (
    <Card className="gap-3 pb-0" aria-busy="true">
      <CardHeader className="gap-2.5">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <Skeleton className="h-10 w-full rounded-none" />
      </CardContent>
    </Card>
  );
}
