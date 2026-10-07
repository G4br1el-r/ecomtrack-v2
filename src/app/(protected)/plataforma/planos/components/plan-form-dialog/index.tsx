"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/animate-ui/components/radix/dialog";
import { usePlanPanelStore } from "@/store/Modules/Plataforma/Planos/plan-panel-store";

import { PlanForm } from "../plan-form";

export function PlanFormDialog() {
  const panel = usePlanPanelStore((state) => state.panel);
  const isOpen = usePlanPanelStore((state) => state.isOpen);
  const close = usePlanPanelStore((state) => state.close);
  const open = isOpen && panel?.kind === "form";
  const plan = panel?.kind === "form" ? panel.plan : null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{plan ? "Editar plano" : "Novo plano"}</DialogTitle>
          <DialogDescription>
            {plan
              ? "Altere o nome e a descrição do plano."
              : "O plano nasce sem páginas. Depois, escolha o que ele libera."}
          </DialogDescription>
        </DialogHeader>
        {open ? <PlanForm key={plan?.id ?? "novo"} plan={plan} onDone={close} /> : null}
      </DialogContent>
    </Dialog>
  );
}
