import { createColumnHelper } from "@tanstack/react-table";

import type { DataTableColumn, DataTableFeatures } from "@/@types/Modules/Core/DesignSystem/data-table";
import { DataTableSortHeader } from "@/components/Modules/Core/DesignSystem/data-table-sort-header";
import { NumberCell } from "@/components/Modules/Core/DesignSystem/number-cell";
import { PlanRowActions } from "@/components/Modules/Plataforma/Planos/plan-row-actions";
import { DATA_TABLE_UTILITY_COLUMN_OPTIONS } from "@/constants/Modules/Core/DesignSystem/data-table";
import { PLAN_COLUMN_SIZE } from "@/constants/Modules/Plataforma/Planos/plans";
import type { Plan } from "@/schemas/Modules/Plataforma/Planos/plan-schema";

const columnHelper = createColumnHelper<DataTableFeatures, Plan>();

export function createPlanColumns(): DataTableColumn<Plan>[] {
  return columnHelper.columns([
    columnHelper.accessor("name", {
      size: PLAN_COLUMN_SIZE.plan,
      meta: { label: "Plano" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ row }) => (
        <div className="min-w-0" title={row.original.description ?? row.original.name}>
          <p className="truncate font-medium text-sm">{row.original.name}</p>
          {row.original.description ? (
            <p className="truncate text-muted-foreground text-xs">{row.original.description}</p>
          ) : null}
        </div>
      ),
    }),
    columnHelper.accessor("pageCount", {
      size: PLAN_COLUMN_SIZE.pages,
      meta: { label: "Páginas" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="integer" />,
    }),
    columnHelper.accessor("componentCount", {
      size: PLAN_COLUMN_SIZE.components,
      meta: { label: "Ações" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="integer" />,
    }),
    columnHelper.accessor("companyCount", {
      size: PLAN_COLUMN_SIZE.companies,
      meta: { label: "Empresas" },
      header: ({ column }) => <DataTableSortHeader column={column} />,
      cell: ({ getValue }) => <NumberCell value={getValue()} kind="integer" />,
    }),
    columnHelper.display({
      ...DATA_TABLE_UTILITY_COLUMN_OPTIONS,
      id: "actions",
      size: PLAN_COLUMN_SIZE.actions,
      minSize: PLAN_COLUMN_SIZE.actions,
      meta: { label: "Ações" },
      header: () => <span className="block text-right">Ações</span>,
      cell: ({ row }) => <PlanRowActions plan={row.original} />,
    }),
  ]);
}
