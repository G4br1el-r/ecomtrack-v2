"use client";

import { ShieldCheck } from "lucide-react";

import { DetailSheet } from "@/components/Modules/Core/DesignSystem/detail-sheet";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PLAN_PERMISSIONS_FORM_ID } from "@/constants/Modules/Plataforma/Planos/plans";
import { usePermissionCatalog } from "@/hooks/Modules/Core/Access/use-permission-catalog";
import { usePlan } from "@/hooks/Modules/Plataforma/Planos/use-plan";
import { usePlanPanelStore } from "@/store/Modules/Plataforma/Planos/plan-panel-store";

import { PlanPermissionsEditor } from "../plan-permissions-editor";

export function PlanPermissionsSheet() {
  const panel = usePlanPanelStore((state) => state.panel);
  const isOpen = usePlanPanelStore((state) => state.isOpen);
  const close = usePlanPanelStore((state) => state.close);
  const open = isOpen && panel?.kind === "permissions";
  const plan = panel?.kind === "permissions" ? panel.plan : null;
  const detail = usePlan(open && plan ? plan.id : null);
  const catalog = usePermissionCatalog(open, "platform");
  const ready = detail.data && catalog.data;

  return (
    <DetailSheet
      open={open}
      onOpenChange={(next) => {
        if (!next) close();
      }}
      icon={ShieldCheck}
      title={plan ? `O que o plano ${plan.name} libera` : "Permissões do plano"}
      description="O que sair do plano para de funcionar na hora em todas as empresas que o usam."
      footer={
        <>
          <Button variant="ghost" onClick={close}>
            Cancelar
          </Button>
          <Button type="submit" form={PLAN_PERMISSIONS_FORM_ID} disabled={!ready}>
            Salvar permissões
          </Button>
        </>
      }
    >
      {detail.isError || catalog.isError ? (
        <ErrorState
          onRetry={() => {
            detail.refetch();
            catalog.refetch();
          }}
        />
      ) : ready ? (
        <PlanPermissionsEditor key={detail.data.id} plan={detail.data} catalog={catalog.data} onSaved={close} />
      ) : (
        <div className="space-y-3" role="status" aria-label="Carregando permissões">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      )}
    </DetailSheet>
  );
}
