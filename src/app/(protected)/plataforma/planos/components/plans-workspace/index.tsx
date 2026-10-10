"use client";

import { Plus } from "lucide-react";

import { ActionLockTooltip } from "@/components/Modules/Core/DesignSystem/action-lock-tooltip";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";
import { Button } from "@/components/ui/button";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { PLANS_TABLE_SETTINGS } from "@/constants/Modules/Plataforma/Planos/plans";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import { useDataTableServerState } from "@/hooks/Modules/Core/DesignSystem/use-data-table-server-state";
import { usePlans } from "@/hooks/Modules/Plataforma/Planos/use-plans";
import { createPlanColumns } from "@/lib/Modules/Plataforma/Planos/create-plan-columns";
import { usePlanPanelStore } from "@/store/Modules/Plataforma/Planos/plan-panel-store";

import { PlanFormDialog } from "../plan-form-dialog";
import { PlanPermissionsSheet } from "../plan-permissions-sheet";

const COLUMNS = createPlanColumns();

export function PlansWorkspace() {
  const table = useDataTableServerState(PLANS_TABLE_SETTINGS);
  const { can } = useCan(API_ENDPOINTS.plans.create.page);
  const open = usePlanPanelStore((state) => state.open);
  const { data, isPending, isError, refetch } = usePlans(table.query);

  return (
    <>
      <PageHeader
        title="Planos"
        description={
          data
            ? `Planos da plataforma e o que cada um libera. ${data.metadata.companies} empresa(s) com plano.`
            : "Planos da plataforma e o que cada um libera."
        }
        actions={
          <ActionLockTooltip locked={!can(API_ENDPOINTS.plans.create.component)}>
            <Button onClick={() => open({ kind: "form", plan: null })}>
              <Plus data-icon="inline-start" aria-hidden="true" />
              Novo plano
            </Button>
          </ActionLockTooltip>
        }
      />
      {isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : (
        <DataTable
          columns={COLUMNS}
          data={data?.items ?? []}
          getRowId={(plan) => plan.id}
          loading={isPending}
          settings={PLANS_TABLE_SETTINGS}
          server={table.server(data?.totalCount ?? 0)}
          empty={
            <EmptyState title="Nenhum plano encontrado" description="Crie um plano para liberar páginas às empresas." />
          }
        />
      )}
      <PlanFormDialog />
      <PlanPermissionsSheet />
    </>
  );
}
