import { PanelBottom, PanelLeft } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet";
import { Button } from "@/components/ui/button";

export function SideSheetsDemo() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <PanelLeft data-icon="inline-start" aria-hidden="true" />
            Sheet à esquerda
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Navegação</SheetTitle>
            <SheetDescription>Menu lateral no mobile.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <PanelBottom data-icon="inline-start" aria-hidden="true" />
            Sheet inferior (mobile)
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto rounded-t-xl">
          <SheetHeader>
            <SheetTitle>Ações do pedido</SheetTitle>
            <SheetDescription>No mobile, substitui menus e popovers grandes.</SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button>Marcar como enviado</Button>
            <SheetClose asChild>
              <Button variant="outline">Fechar</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
