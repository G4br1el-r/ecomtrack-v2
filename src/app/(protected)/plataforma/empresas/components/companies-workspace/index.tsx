"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { ActionLockTooltip } from "@/components/Modules/Core/DesignSystem/action-lock-tooltip";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { PageHeader } from "@/components/Modules/Core/DesignSystem/page-header";
import { SegmentedFilter } from "@/components/Modules/Core/DesignSystem/segmented-filter";
import { Button } from "@/components/ui/button";
import { API_ENDPOINTS } from "@/constants/Modules/Core/Api/api-endpoints";
import { ALL_FILTER_VALUE } from "@/constants/Modules/Core/DesignSystem/segmented-filter";
import { COMPANIES_TABLE_SETTINGS } from "@/constants/Modules/Plataforma/Empresas/companies";
import { useCan } from "@/hooks/Modules/Core/Access/use-can";
import { useDataTableServerState } from "@/hooks/Modules/Core/DesignSystem/use-data-table-server-state";
import { useCompanies } from "@/hooks/Modules/Plataforma/Empresas/use-companies";
import { createCompanyColumns } from "@/lib/Modules/Plataforma/Empresas/create-company-columns";
import type { CompanyStatus } from "@/schemas/Modules/Plataforma/Empresas/company-schema";
import { useCompanyPanelStore } from "@/store/Modules/Plataforma/Empresas/company-panel-store";

import { CompanySheet } from "../company-sheet";

const COLUMNS = createCompanyColumns();

export function CompaniesWorkspace() {
  const table = useDataTableServerState(COMPANIES_TABLE_SETTINGS);
  const { can } = useCan(API_ENDPOINTS.companies.create.page);
  const open = useCompanyPanelStore((state) => state.open);
  const [status, setStatus] = useState<CompanyStatus | typeof ALL_FILTER_VALUE>(ALL_FILTER_VALUE);
  const { data, isPending, isError, refetch } = useCompanies({
    ...table.query,
    Status: status === ALL_FILTER_VALUE ? undefined : status,
  });
  const counts = data?.metadata;

  return (
    <>
      <PageHeader
        title="Empresas"
        description="Empresas da plataforma, plano contratado e situação de acesso."
        actions={
          <ActionLockTooltip locked={!can(API_ENDPOINTS.companies.create.component)}>
            <Button onClick={() => open(null)}>
              <Plus data-icon="inline-start" aria-hidden="true" />
              Nova empresa
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
          getRowId={(company) => company.id}
          loading={isPending}
          settings={COMPANIES_TABLE_SETTINGS}
          server={table.server(data?.totalCount ?? 0)}
          toolbar={{
            start: (
              <SegmentedFilter
                label="Situação da empresa"
                value={status}
                onValueChange={(next) => {
                  setStatus(next);
                  table.resetPage();
                }}
                options={[
                  {
                    value: ALL_FILTER_VALUE,
                    label: "Todas",
                    count: counts ? counts.active + counts.suspended : undefined,
                  },
                  { value: "Active", label: "Ativas", count: counts?.active },
                  { value: "Suspended", label: "Suspensas", count: counts?.suspended },
                ]}
              />
            ),
          }}
          empty={
            <EmptyState title="Nenhuma empresa encontrada" description="Cadastre a primeira empresa da plataforma." />
          }
        />
      )}
      <CompanySheet />
    </>
  );
}
