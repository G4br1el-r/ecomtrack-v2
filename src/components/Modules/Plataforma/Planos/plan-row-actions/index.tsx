"use client";

import { Pencil, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/animate-ui/components/radix/dropdown-menu";
import { ActionLockedTag } from "@/components/Modules/Core/DesignSystem/action-locked-tag";
import { ConfirmDialog } from "@/components/Modules/Core/DesignSystem/confirm-dialog";
import { RowActionsMenu } from "@/components/Modules/Core/DesignSystem/row-actions-menu";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import { useRemovePlan } from "@/hooks/Modules/Plataforma/Planos/use-remove-plan";
import type { Plan } from "@/schemas/Modules/Plataforma/Planos/plan-schema";
import { usePlanPanelStore } from "@/store/Modules/Plataforma/Planos/plan-panel-store";

export function PlanRowActions({ plan }: { plan: Plan }) {
  const { can } = useCan(API_ENDPOINTS.plans.update.page);
  const open = usePlanPanelStore((state) => state.open);
  const [confirming, setConfirming] = useState(false);
  const canEdit = can(API_ENDPOINTS.plans.update.component);
  const canPermissions = can(API_ENDPOINTS.plans.updatePermissions.component);
  const canRemove = can(API_ENDPOINTS.plans.remove.component);
  const { mutate: remove, isPending } = useRemovePlan({
    onSuccess: () => toast.success("Plano removido", { description: plan.name }),
    onError: (error) => toast.error("Não foi possível remover o plano", { description: error.message }),
  });

  return (
    <>
      <RowActionsMenu label={`Ações do plano ${plan.name}`}>
        <DropdownMenuItem disabled={!canEdit} onSelect={() => open({ kind: "form", plan })}>
          <Pencil aria-hidden="true" />
          Editar
          {canEdit ? null : <ActionLockedTag />}
        </DropdownMenuItem>
        <DropdownMenuItem disabled={!canPermissions} onSelect={() => open({ kind: "permissions", plan })}>
          <ShieldCheck aria-hidden="true" />
          Permissões
          {canPermissions ? null : <ActionLockedTag />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" disabled={!canRemove} onSelect={() => setConfirming(true)}>
          <Trash2 aria-hidden="true" />
          Remover plano
          {canRemove ? null : <ActionLockedTag />}
        </DropdownMenuItem>
      </RowActionsMenu>
      <ConfirmDialog
        open={confirming}
        onOpenChange={setConfirming}
        title={`Remover o plano ${plan.name}?`}
        description={
          plan.companyCount > 0
            ? `${plan.companyCount} empresa(s) usam este plano. Troque o plano delas antes de remover.`
            : "O plano será apagado. Essa ação não pode ser desfeita."
        }
        confirmLabel="Remover plano"
        destructive
        state={isPending ? "loading" : "idle"}
        onConfirm={() => {
          remove(plan.id);
          setConfirming(false);
        }}
      />
    </>
  );
}
