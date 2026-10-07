import type { LucideIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/animate-ui/components/radix/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function DetailSheet({
  open,
  onOpenChange,
  icon: Icon,
  title,
  description,
  footer,
  size = "default",
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  icon?: LucideIcon;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  size?: "default" | "wide";
  children: React.ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={cn("w-full gap-0", size === "wide" ? "sm:max-w-6xl" : "sm:max-w-xl")}
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader className="border-b px-6 py-5 pr-12">
          <SheetTitle className="flex min-w-0 items-center gap-2.5 text-base">
            {Icon ? (
              <span className="grid size-8 shrink-0 place-items-center rounded-md border bg-muted">
                <Icon className="size-4" aria-hidden="true" />
              </span>
            ) : null}
            <span className="min-w-0 wrap-anywhere">{title}</span>
          </SheetTitle>
          {description ? <SheetDescription className="wrap-anywhere">{description}</SheetDescription> : null}
        </SheetHeader>
        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-7 px-6 py-5 wrap-anywhere">{children}</div>
        </ScrollArea>
        <SheetFooter className="flex-row justify-end gap-2 border-t px-6 py-3">
          {footer ?? (
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
