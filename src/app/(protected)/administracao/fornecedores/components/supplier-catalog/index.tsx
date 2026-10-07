"use client";

import { useState } from "react";

import { Combobox } from "@/components/Modules/Core/DesignSystem/combobox";
import { DataTable } from "@/components/Modules/Core/DesignSystem/data-table";
import { EmptyState } from "@/components/Modules/Core/DesignSystem/empty-state";
import { ErrorState } from "@/components/Modules/Core/DesignSystem/error-state";
import { SegmentedFilter } from "@/components/Modules/Core/DesignSystem/segmented-filter";
import {
  CATALOG_SCOPE,
  SUPPLIER_PRODUCTS_TABLE_SETTINGS,
} from "@/constants/Modules/Administracao/Fornecedores/suppliers";
import { ALL_ITEMS_FILTERS } from "@/constants/Modules/Core/Api/http";
import { useSupplierProducts } from "@/hooks/Modules/Administracao/Fornecedores/use-supplier-products";
import { useIntegrations } from "@/hooks/Modules/Administracao/Integracoes/use-integrations";
import { useDataTableServerState } from "@/hooks/Modules/Core/DesignSystem/use-data-table-server-state";
import { createSupplierProductColumns } from "@/lib/Modules/Administracao/Fornecedores/create-supplier-product-columns";

const COLUMNS = createSupplierProductColumns();

type CatalogScope = (typeof CATALOG_SCOPE)[keyof typeof CATALOG_SCOPE];

export function SupplierCatalog() {
  const table = useDataTableServerState(SUPPLIER_PRODUCTS_TABLE_SETTINGS);
  const [scope, setScope] = useState<CatalogScope>(CATALOG_SCOPE.available);
  const [integrationId, setIntegrationId] = useState("");
  const { data: connections } = useIntegrations("supplier", ALL_ITEMS_FILTERS);
  const { data, isPending, isError, refetch } = useSupplierProducts({
    ...table.query,
    IntegrationId: integrationId || undefined,
    IncludeIntegrated: scope === CATALOG_SCOPE.all,
  });

  if (isError) return <ErrorState onRetry={() => refetch()} />;

  const counts = data?.metadata;

  return (
    <DataTable
      columns={COLUMNS}
      data={data?.items ?? []}
      getRowId={(product) => product.id}
      loading={isPending}
      settings={SUPPLIER_PRODUCTS_TABLE_SETTINGS}
      server={table.server(data?.totalCount ?? 0)}
      toolbar={{
        start: (
          <>
            <SegmentedFilter
              label="Itens do catálogo"
              value={scope}
              onValueChange={(next) => {
                setScope(next);
                table.resetPage();
              }}
              options={[
                { value: CATALOG_SCOPE.available, label: "Disponíveis", count: counts?.available },
                {
                  value: CATALOG_SCOPE.all,
                  label: "Todos",
                  count: counts ? counts.available + counts.integrated : undefined,
                },
              ]}
            />
            <Combobox
              label="Filtrar por conexão"
              options={[
                { value: "", label: "Todas as conexões" },
                ...(connections?.items ?? []).map((connection) => ({
                  value: connection.id,
                  label: `${connection.providerName} · ${connection.name}`,
                })),
              ]}
              value={integrationId}
              onValueChange={(next) => {
                setIntegrationId(next);
                table.resetPage();
              }}
              className="h-9 w-56"
            />
          </>
        ),
      }}
      empty={
        <EmptyState
          title="Nenhum item no catálogo"
          description="Conecte um fornecedor na aba Conexões. O catálogo chega na próxima sincronização."
        />
      }
    />
  );
}
