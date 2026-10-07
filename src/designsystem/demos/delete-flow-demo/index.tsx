"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { ActionState } from "@/@types/Modules/Core/DesignSystem/action-state";
import { ConfirmDialog } from "@/components/Modules/Core/DesignSystem/confirm-dialog";
import { Button } from "@/components/ui/button";
import { DEMO_LOADING_DELAY_MS } from "@/constants/Modules/Core/DesignSystem/ui";

import { wait } from "../../helpers/wait";

export function DeleteFlowDemo() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<ActionState>("idle");

  const handleConfirm = async () => {
    setState("loading");
    await wait(DEMO_LOADING_DELAY_MS);
    setState("idle");
    setOpen(false);
    toast.success("Produto excluído", { description: "Gift Card PlayStation R$ 100 foi removido." });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={setOpen}
      destructive
      state={state}
      title="Excluir produto?"
      description="Gift Card PlayStation R$ 100 será removido permanentemente. Essa ação não pode ser desfeita."
      confirmLabel="Excluir"
      onConfirm={handleConfirm}
      trigger={
        <Button variant="destructive-ghost">
          <Trash2 data-icon="inline-start" aria-hidden="true" />
          Excluir produto
        </Button>
      }
    />
  );
}
