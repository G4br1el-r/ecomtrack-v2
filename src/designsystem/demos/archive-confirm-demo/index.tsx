"use client";

import { Archive } from "lucide-react";
import { toast } from "sonner";

import { ConfirmDialog } from "@/components/Modules/Core/DesignSystem/confirm-dialog";
import { Button } from "@/components/ui/button";

export function ArchiveConfirmDemo() {
  return (
    <ConfirmDialog
      title="Arquivar produto?"
      description="O produto deixa de aparecer na listagem, mas pode ser restaurado depois."
      confirmLabel="Arquivar"
      onConfirm={() => toast.success("Produto arquivado")}
      trigger={
        <Button variant="outline">
          <Archive data-icon="inline-start" aria-hidden="true" />
          Confirmação simples
        </Button>
      }
    />
  );
}
