import { createColumnHelper } from "@tanstack/react-table";

import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { DateTimeCell } from "@/components/Modules/Core/DesignSystem/date-time-cell";
import { NumberCell } from "@/components/Modules/Core/DesignSystem/number-cell";
import { CompanyRowActions } from "@/components/Modules/Plataforma/Empresas/company-row-actions";
import { Badge } from "@/components/ui/badge";
import {
  DATA_TABLE_ACTIONS_COLUMN_ID,
  DATA_TABLE_UTILITY_COLUMN_OPTIONS,
} from "@/constants/Modules/Core/DesignSystem/data-table";
import { EMPTY_VALUE } from "@/constants/Modules/Core/DesignSystem/number-format";
import { COMPANY_COLUMN_SIZE, COMPANY_STATUS_BADGE } from "@/constants/Modules/Plataforma/Empresas/companies";
import { formatDocument } from "@/lib/Modules/Plataforma/Empresas/format-document";
import type { Company } from "@/schemas/Modules/Plataforma/Empresas/company-schema";

const columnHelper = createColumnHelper<DataTableFeatures, Company>();

export function createCompanyColumns(): DataTableColumn<Company>[] {
  return columnHelper.columns([
    columnHelper.accessor("name", {
      size: COMPANY_COLUMN_SIZE.name,
      meta: { label: "Empresa" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => (
        <span className="truncate font-medium" title={getValue()}>
          {getValue()}
        </span>
      ),
    }),
    columnHelper.accessor("document", {
      size: COMPANY_COLUMN_SIZE.document,
      meta: { label: "Documento" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <span className="font-mono text-sm">{formatDocument(getValue()) || EMPTY_VALUE}</span>,
    }),
    columnHelper.accessor("planName", {
      size: COMPANY_COLUMN_SIZE.plan,
      meta: { label: "Plano" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => getValue() ?? <span className="text-muted-foreground">Sem plano</span>,
    }),
    columnHelper.accessor("userCount", {
      size: COMPANY_COLUMN_SIZE.users,
      meta: { label: "Usuários" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="integer" />,
    }),
    columnHelper.accessor("status", {
      size: COMPANY_COLUMN_SIZE.status,
      meta: { label: "Situação", card: "badge" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => {
        const status = COMPANY_STATUS_BADGE[getValue()];
        return <Badge variant={status.tone}>{status.label}</Badge>;
      },
    }),
    columnHelper.accessor("createdAt", {
      size: COMPANY_COLUMN_SIZE.createdAt,
      meta: { label: "Criada em" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <DateTimeCell value={getValue()} />,
    }),
    columnHelper.display({
      ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
      id: DATA_TABLE_ACTIONS_COLUMN_ID,
      size: COMPANY_COLUMN_SIZE.actions,
      minSize: COMPANY_COLUMN_SIZE.actions,
      meta: { label: "Ações" },
      header: () => <span className="block text-right">Ações</span>,
      cell: ({ row }) => <CompanyRowActions company={row.original} />,
    }),
  ]);
}
