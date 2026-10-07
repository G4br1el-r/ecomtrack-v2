import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function HeroCardSkeleton() {
  return (
    <Card className="h-full gap-2" aria-busy="true">
      <CardHeader className="gap-3">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-8 rounded-lg" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-44" />
          </div>
        </div>
        <Skeleton className="h-12 w-72" />
      </CardHeader>
      <CardContent className="h-72 sm:h-80">
        <Skeleton className="h-full w-full" />
      </CardContent>
    </Card>
  );
}
