import { Filter, RotateCcw, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function FilterSheet({
  open,
  onOpenChange,
  activeCount,
  clearableCount = activeCount,
  onClear,
  description = "Configure os filtros para refinar a listagem",
  onApply,
  applyLabel = "Aplicar filtros",
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeCount: number;
  clearableCount?: number;
  onClear: () => void;
  description?: string;
  onApply?: () => void;
  applyLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" className="shrink-0 border-input">
          <Filter data-icon="inline-start" aria-hidden="true" />
          Filtros
          {activeCount > 0 ? (
            <Badge variant="default" className="min-w-5 tabular-nums">
              {activeCount}
            </Badge>
          ) : null}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="flex-row items-center gap-3 border-b px-6 py-5 pr-12">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-info-soft text-info">
            <SlidersHorizontal className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 space-y-0.5">
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </div>
        </SheetHeader>
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5">{children}</div>
        {onApply ? (
          <SheetFooter className="flex-row items-center justify-between gap-2 border-t px-6 py-3">
            <Button variant="ghost" disabled={clearableCount === 0} onClick={onClear}>
              <RotateCcw data-icon="inline-start" aria-hidden="true" />
              Limpar tudo
            </Button>
            <Button onClick={onApply}>{applyLabel}</Button>
          </SheetFooter>
        ) : clearableCount > 0 ? (
          <SheetFooter className="border-t px-6 py-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                onClear();
                onOpenChange(false);
              }}
            >
              <X data-icon="inline-start" aria-hidden="true" />
              Limpar filtros ({clearableCount})
            </Button>
          </SheetFooter>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
