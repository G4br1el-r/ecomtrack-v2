import { createColumnHelper } from "@tanstack/react-table";

import type { IntegrationArea } from "@/@types/Modules/Administracao/Integracoes/integration-area";
import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { IntegrationRowActions } from "@/components/Modules/Administracao/Integracoes/integration-row-actions";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { DateTimeCell } from "@/components/Modules/Core/DesignSystem/date-time-cell";
import { Badge } from "@/components/ui/badge";
import { INTEGRATION_COLUMN_SIZE } from "@/constants/Modules/Administracao/Integracoes/integrations";
import {
  DATA_TABLE_ACTIONS_COLUMN_ID,
  DATA_TABLE_UTILITY_COLUMN_OPTIONS,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import type { CompanyIntegration } from "@/schemas/Modules/Administracao/Integracoes/company-integration-schema";

const columnHelper = createColumnHelper<DataTableFeatures, CompanyIntegration>();

export function createIntegrationColumns(area: IntegrationArea): DataTableColumn<CompanyIntegration>[] {
  return columnHelper.columns([
    columnHelper.accessor("name", {
      size: INTEGRATION_COLUMN_SIZE.name,
      meta: { label: "Conexão" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate font-medium">{row.original.name}</span>
          {row.original.isPlatform ? <Badge variant="purple">Padrão da plataforma</Badge> : null}
        </div>
      ),
    }),
    columnHelper.accessor("providerName", {
      size: INTEGRATION_COLUMN_SIZE.provider,
      meta: { label: "Provedor" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
    }),
    columnHelper.accessor("isActive", {
      size: INTEGRATION_COLUMN_SIZE.status,
      meta: { label: "Situação", card: "badge" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) =>
        getValue() ? <Badge variant="success">Ativa</Badge> : <Badge variant="secondary">Pausada</Badge>,
    }),
    columnHelper.accessor("updatedAt", {
      size: INTEGRATION_COLUMN_SIZE.updatedAt,
      meta: { label: "Atualizada em" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <DateTimeCell value={getValue()} />,
    }),
    columnHelper.display({
      ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
      id: DATA_TABLE_ACTIONS_COLUMN_ID,
      size: INTEGRATION_COLUMN_SIZE.actions,
      minSize: INTEGRATION_COLUMN_SIZE.actions,
      meta: { label: "Ações" },
      header: () => <span className="block text-right">Ações</span>,
      cell: ({ row }) => <IntegrationRowActions area={area} integration={row.original} />,
    }),
  ]);
}
