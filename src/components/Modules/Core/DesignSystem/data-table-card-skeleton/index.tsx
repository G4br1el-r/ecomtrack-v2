import { Skeleton } from "@/components/ui/skeleton";
import { DATA_TABLE_CARD_SKELETON_FIELDS } from "@/constants/Modules/Core/DesignSystem/data-table";

export function DataTableCardSkeleton({ cards }: { cards: number }) {
  const cardKeys = Array.from({ length: cards }, (_, index) => `card-${index}`);
  const fieldKeys = Array.from({ length: DATA_TABLE_CARD_SKELETON_FIELDS }, (_, index) => `field-${index}`);
  return (
    <div className="space-y-2" aria-busy="true">
      {cardKeys.map((cardKey) => (
        <div key={cardKey} className="space-y-3 rounded-lg border p-4">
          <Skeleton className="h-4 w-2/3" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {fieldKeys.map((fieldKey) => (
              <div key={fieldKey} className="space-y-1.5">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
